/**
 * CHEMISTRY ENGINE
 * ================
 * Core logic for simulating single displacement and redox reactions.
 * Extended with bilingual support and new reaction type definitions.
 */

import {
  type Metal, type Salt, type Cation, type BiText,
  getMetal, getCation, buildSalt,
  formatCharge, formatChargeSuper, subscript,
  METALS,
} from '@/data/chemistryData';

// ----- RESULT TYPES -----

export interface HalfReaction {
  type: 'oxidation' | 'reduction';
  species: string;
  product: string;
  electrons: number;
  coefficient: number;
  display: string;
  oxidationStateBefore: number;
  oxidationStateAfter: number;
}

export interface VisualizerStep {
  title: BiText;
  description: BiText;
  highlight?: 'oxidation' | 'reduction' | 'electron' | 'result' | 'reactant' | 'product';
}

export interface ReactionResult {
  occurs: boolean;
  reactionType: 'single-displacement' | 'redox' | 'neutralization' | 'combustion' | 'synthesis' | 'decomposition';

  noReactionReason?: BiText;

  molecularEquation?: string;
  netIonicEquation?: string;

  oxidationHalf?: HalfReaction;
  reductionHalf?: HalfReaction;

  steps?: VisualizerStep[];
  explanation?: BiText;

  energyChange?: 'exothermic' | 'endothermic';
  generalFormula?: string;
}

// ----- ACTIVITY SERIES CHECK -----

export function canDisplace(metal: Metal, saltCation: Cation): boolean {
  const targetMetal = getMetal(saltCation.symbol);
  if (!targetMetal) return false;
  return metal.activityRank < targetMetal.activityRank;
}

// ----- HALF-REACTION GENERATION -----

function makeOxidationHalf(metal: Metal): HalfReaction {
  const charge = metal.charge;
  const ionDisplay = `${metal.symbol}${formatChargeSuper(charge)}`;
  return {
    type: 'oxidation',
    species: metal.symbol,
    product: ionDisplay,
    electrons: charge,
    coefficient: 1,
    display: `${metal.symbol} → ${ionDisplay} + ${charge}e⁻`,
    oxidationStateBefore: 0,
    oxidationStateAfter: charge,
  };
}

function makeReductionHalf(cation: Cation): HalfReaction {
  const charge = cation.charge;
  return {
    type: 'reduction',
    species: cation.display,
    product: cation.symbol,
    electrons: charge,
    coefficient: 1,
    display: `${cation.display} + ${charge}e⁻ → ${cation.symbol}`,
    oxidationStateBefore: charge,
    oxidationStateAfter: 0,
  };
}

function balanceElectrons(
  oxHalf: HalfReaction,
  redHalf: HalfReaction
): { oxidation: HalfReaction; reduction: HalfReaction; totalElectrons: number } {
  const lcm = lcmHelper(oxHalf.electrons, redHalf.electrons);
  const oxCoeff = lcm / oxHalf.electrons;
  const redCoeff = lcm / redHalf.electrons;

  const balancedOx: HalfReaction = {
    ...oxHalf,
    coefficient: oxCoeff,
    display: formatHalfDisplay(oxHalf, oxCoeff, 'oxidation'),
  };

  const balancedRed: HalfReaction = {
    ...redHalf,
    coefficient: redCoeff,
    display: formatHalfDisplay(redHalf, redCoeff, 'reduction'),
  };

  return { oxidation: balancedOx, reduction: balancedRed, totalElectrons: lcm };
}

function formatHalfDisplay(half: HalfReaction, coeff: number, type: 'oxidation' | 'reduction'): string {
  const c = coeff > 1 ? `${coeff}` : '';
  const e = coeff * half.electrons;
  if (type === 'oxidation') {
    return `${c}${half.species} → ${c}${half.product} + ${e}e⁻`;
  } else {
    return `${c}${half.species} + ${e}e⁻ → ${c}${half.product}`;
  }
}

// ----- MAIN REACTION FUNCTIONS -----

export function simulateSingleDisplacement(metal: Metal, salt: Salt): ReactionResult {
  const saltCation = salt.cation;
  const reactionType = 'single-displacement' as const;

  if (!canDisplace(metal, saltCation)) {
    const targetMetal = getMetal(saltCation.symbol)!;
    return {
      occurs: false,
      reactionType,
      noReactionReason: {
        en: `${metal.name} (${metal.symbol}) is LESS reactive than ${targetMetal.name} (${targetMetal.symbol}) in the activity series. ${metal.symbol} cannot displace ${saltCation.display} from solution. Activity series position: ${metal.symbol} = ${metal.activityRank + 1}, ${targetMetal.symbol} = ${targetMetal.activityRank + 1} (lower = more reactive).`,
        sq: `${metal.name} (${metal.symbol}) është MË PAK reaktiv se ${targetMetal.name} (${targetMetal.symbol}) në serinë e aktivitetit. ${metal.symbol} nuk mund të zëvendësojë ${saltCation.display} nga tretësira. Pozicioni në seri: ${metal.symbol} = ${metal.activityRank + 1}, ${targetMetal.symbol} = ${targetMetal.activityRank + 1} (më i ulët = më reaktiv).`,
      },
    };
  }

  const productCation: Cation = { symbol: metal.symbol, charge: metal.charge, display: `${metal.symbol}${formatChargeSuper(metal.charge)}` };
  const productSalt = buildSalt(productCation, salt.anion);
  const displacedMetal = getMetal(saltCation.symbol)!;

  const molecularEquation = buildMolecularEquation(metal, salt, productSalt, displacedMetal);
  const netIonicEquation = buildNetIonicEquation(metal, saltCation, productCation, displacedMetal);

  const oxRaw = makeOxidationHalf(metal);
  const redRaw = makeReductionHalf(saltCation);
  const { oxidation, reduction, totalElectrons } = balanceElectrons(oxRaw, redRaw);

  const steps = buildSteps(metal, saltCation, displacedMetal, oxidation, reduction, totalElectrons);

  return {
    occurs: true,
    reactionType,
    molecularEquation,
    netIonicEquation,
    oxidationHalf: oxidation,
    reductionHalf: reduction,
    steps,
    energyChange: 'exothermic',
    explanation: {
      en: `${metal.name} is higher in the activity series than ${displacedMetal.name}, meaning it has a stronger tendency to lose electrons. When ${metal.symbol}(s) is placed in a solution of ${salt.displayFormula}, it donates electrons to ${saltCation.display} ions. The ${saltCation.display} ions gain electrons and become solid ${displacedMetal.symbol}, while ${metal.symbol} dissolves as ${metal.symbol}${formatChargeSuper(metal.charge)} ions. The ${salt.anion.display} ions are spectators.`,
      sq: `${metal.nameAlbanian} është më lart në serinë e aktivitetit se ${displacedMetal.nameAlbanian}, që do të thotë se ka tendencë më të fortë për të humbur elektrone. Kur ${metal.symbol}(s) vendoset në tretësirën e ${salt.displayFormula}, ai dhuron elektrone tek jonet ${saltCation.display}. Jonet ${saltCation.display} fitojnë elektrone dhe bëhen ${displacedMetal.symbol} i ngurtë, ndërsa ${metal.symbol} tretet si jone ${metal.symbol}${formatChargeSuper(metal.charge)}. Jonet ${salt.anion.display} janë spektatorë.`,
    },
  };
}

export function simulateRedox(oxidizedMetal: Metal, reducedCation: Cation): ReactionResult {
  const reactionType = 'redox' as const;

  if (!canDisplace(oxidizedMetal, reducedCation)) {
    const targetMetal = getMetal(reducedCation.symbol)!;
    return {
      occurs: false,
      reactionType,
      noReactionReason: {
        en: `${oxidizedMetal.name} (${oxidizedMetal.symbol}) cannot reduce ${reducedCation.display} because ${oxidizedMetal.symbol} is less reactive than ${targetMetal.symbol}. In the activity series, a metal can only reduce ions of metals below it.`,
        sq: `${oxidizedMetal.nameAlbanian} (${oxidizedMetal.symbol}) nuk mund të reduktojë ${reducedCation.display} sepse ${oxidizedMetal.symbol} është më pak reaktiv se ${targetMetal.symbol}. Në serinë e aktivitetit, një metal mund të reduktojë vetëm jonet e metaleve poshtë tij.`,
      },
    };
  }

  const productCation: Cation = {
    symbol: oxidizedMetal.symbol,
    charge: oxidizedMetal.charge,
    display: `${oxidizedMetal.symbol}${formatChargeSuper(oxidizedMetal.charge)}`,
  };
  const displacedMetal = getMetal(reducedCation.symbol)!;

  const oxRaw = makeOxidationHalf(oxidizedMetal);
  const redRaw = makeReductionHalf(reducedCation);
  const { oxidation, reduction, totalElectrons } = balanceElectrons(oxRaw, redRaw);

  const oxCoeff = oxidation.coefficient > 1 ? `${oxidation.coefficient}` : '';
  const redCoeff = reduction.coefficient > 1 ? `${reduction.coefficient}` : '';
  const netIonicEquation =
    `${oxCoeff}${oxidizedMetal.symbol} + ${redCoeff}${reducedCation.display} → ${oxCoeff}${productCation.display} + ${redCoeff}${displacedMetal.symbol}`;

  const steps = buildSteps(oxidizedMetal, reducedCation, displacedMetal, oxidation, reduction, totalElectrons);

  return {
    occurs: true,
    reactionType,
    netIonicEquation,
    oxidationHalf: oxidation,
    reductionHalf: reduction,
    steps,
    energyChange: 'exothermic',
    explanation: {
      en: `${oxidizedMetal.name} is more reactive than ${displacedMetal.name}, so it donates electrons to ${reducedCation.display} ions. ${oxidizedMetal.symbol} is oxidized (loses ${oxidation.coefficient * oxidation.electrons} electron${oxidation.coefficient * oxidation.electrons > 1 ? 's' : ''}), going from oxidation state 0 to +${oxidizedMetal.charge}. ${reducedCation.display} is reduced (gains ${reduction.coefficient * reduction.electrons} electron${reduction.coefficient * reduction.electrons > 1 ? 's' : ''}), going from +${reducedCation.charge} to 0.`,
      sq: `${oxidizedMetal.nameAlbanian} është më reaktiv se ${displacedMetal.nameAlbanian}, prandaj dhuron elektrone tek jonet ${reducedCation.display}. ${oxidizedMetal.symbol} oksidomet (humb ${oxidation.coefficient * oxidation.electrons} elektron${oxidation.coefficient * oxidation.electrons > 1 ? 'e' : ''}), duke kaluar nga gjendja e oksidimit 0 në +${oxidizedMetal.charge}. ${reducedCation.display} reduktohet (fiton ${reduction.coefficient * reduction.electrons} elektron${reduction.coefficient * reduction.electrons > 1 ? 'e' : ''}), duke kaluar nga +${reducedCation.charge} në 0.`,
    },
  };
}

// ----- EQUATION BUILDERS -----

function buildMolecularEquation(metal: Metal, reactantSalt: Salt, productSalt: Salt, displacedMetal: Metal): string {
  const oxCharge = metal.charge;
  const redCharge = reactantSalt.cation.charge;
  const lcm = lcmHelper(oxCharge, redCharge);
  const metalCoeff = lcm / oxCharge;
  const saltCoeff = lcm / redCharge;
  const mc = metalCoeff > 1 ? `${metalCoeff}` : '';
  const sc = saltCoeff > 1 ? `${saltCoeff}` : '';
  return `${mc}${metal.symbol} + ${sc}${reactantSalt.displayFormula} → ${mc}${productSalt.displayFormula} + ${sc}${displacedMetal.symbol}`;
}

function buildNetIonicEquation(metal: Metal, saltCation: Cation, productCation: Cation, displacedMetal: Metal): string {
  const oxCharge = metal.charge;
  const redCharge = saltCation.charge;
  const lcm = lcmHelper(oxCharge, redCharge);
  const metalCoeff = lcm / oxCharge;
  const ionCoeff = lcm / redCharge;
  const mc = metalCoeff > 1 ? `${metalCoeff}` : '';
  const ic = ionCoeff > 1 ? `${ionCoeff}` : '';
  return `${mc}${metal.symbol} + ${ic}${saltCation.display} → ${mc}${productCation.display} + ${ic}${displacedMetal.symbol}`;
}

// ----- STEP BUILDER -----

function buildSteps(
  oxidizedMetal: Metal,
  reducedCation: Cation,
  displacedMetal: Metal,
  oxidation: HalfReaction,
  reduction: HalfReaction,
  totalElectrons: number
): VisualizerStep[] {
  return [
    {
      title: { en: "Identify Species", sq: "Identifiko Speciet" },
      description: {
        en: `${oxidizedMetal.symbol} (solid, oxidation state 0) will be oxidized. ${reducedCation.display} (in solution, oxidation state +${reducedCation.charge}) will be reduced.`,
        sq: `${oxidizedMetal.symbol} (i ngurtë, gjendje oksidimi 0) do të oksidomet. ${reducedCation.display} (në tretësirë, gjendje oksidimi +${reducedCation.charge}) do të reduktohet.`,
      },
      highlight: 'oxidation',
    },
    {
      title: { en: "Oxidation Half-Reaction", sq: "Gjysmë-reaksioni i Oksidimit" },
      description: {
        en: `${oxidation.display} — ${oxidizedMetal.symbol} loses ${oxidation.electrons} electron${oxidation.electrons > 1 ? 's' : ''} per atom, going from 0 to +${oxidizedMetal.charge}.`,
        sq: `${oxidation.display} — ${oxidizedMetal.symbol} humb ${oxidation.electrons} elektron${oxidation.electrons > 1 ? 'e' : ''} për atom, duke kaluar nga 0 në +${oxidizedMetal.charge}.`,
      },
      highlight: 'oxidation',
    },
    {
      title: { en: "Reduction Half-Reaction", sq: "Gjysmë-reaksioni i Reduktimit" },
      description: {
        en: `${reduction.display} — ${reducedCation.display} gains ${reduction.electrons} electron${reduction.electrons > 1 ? 's' : ''} per ion, going from +${reducedCation.charge} to 0.`,
        sq: `${reduction.display} — ${reducedCation.display} fiton ${reduction.electrons} elektron${reduction.electrons > 1 ? 'e' : ''} për jon, duke kaluar nga +${reducedCation.charge} në 0.`,
      },
      highlight: 'reduction',
    },
    {
      title: { en: "Balance Electrons", sq: "Balanco Elektronet" },
      description: {
        en: oxidation.coefficient === 1 && reduction.coefficient === 1
          ? `Both half-reactions already involve ${totalElectrons} electron${totalElectrons > 1 ? 's' : ''}. No multiplying needed.`
          : `Multiply oxidation by ${oxidation.coefficient} and reduction by ${reduction.coefficient} so both transfer ${totalElectrons} electrons total.`,
        sq: oxidation.coefficient === 1 && reduction.coefficient === 1
          ? `Të dy gjysmë-reaksionet përfshijnë tashmë ${totalElectrons} elektron${totalElectrons > 1 ? 'e' : ''}. Nuk nevojitet shumëzim.`
          : `Shumëzo oksidimin me ${oxidation.coefficient} dhe reduktimin me ${reduction.coefficient} që të dy transferojnë ${totalElectrons} elektrone gjithsej.`,
      },
      highlight: 'electron',
    },
    {
      title: { en: "Cancel Electrons", sq: "Anulo Elektronet" },
      description: {
        en: `${totalElectrons}e⁻ produced in oxidation cancel with ${totalElectrons}e⁻ consumed in reduction. Electrons don't appear in the final equation.`,
        sq: `${totalElectrons}e⁻ të prodhuara në oksidim anulohen me ${totalElectrons}e⁻ të konsumuara në reduktim. Elektronet nuk shfaqen në ekuacionin përfundimtar.`,
      },
      highlight: 'electron',
    },
    {
      title: { en: "Net Ionic Equation", sq: "Ekuacioni Jonik Neto" },
      description: {
        en: `Combined: the electrons cancel and we get the net ionic equation showing only the species that changed.`,
        sq: `Kombinuar: elektronet anulohen dhe marrim ekuacionin jonik neto që tregon vetëm speciet që ndryshuan.`,
      },
      highlight: 'result',
    },
  ];
}

// ----- MATH -----

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcmHelper(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

// ----- SAMPLE REACTIONS -----

export const SAMPLE_REACTIONS = [
  {
    description: "Zinc displaces Copper from CuSO₄",
    input: { metal: "Zn", saltCation: "Cu", saltAnion: "SO4" },
    expected: { occurs: true, molecular: "Zn + CuSO₄ → ZnSO₄ + Cu", netIonic: "Zn + Cu²⁺ → Zn²⁺ + Cu" },
  },
  {
    description: "Iron displaces Copper from CuCl₂",
    input: { metal: "Fe", saltCation: "Cu", saltAnion: "Cl" },
    expected: { occurs: true, molecular: "Fe + CuCl₂ → FeCl₂ + Cu", netIonic: "Fe + Cu²⁺ → Fe²⁺ + Cu" },
  },
  {
    description: "Copper cannot displace Zinc from ZnSO₄",
    input: { metal: "Cu", saltCation: "Zn", saltAnion: "SO4" },
    expected: { occurs: false },
  },
  {
    description: "Aluminium displaces Silver from AgNO₃ (charge balancing needed)",
    input: { metal: "Al", saltCation: "Ag", saltAnion: "NO3" },
    expected: { occurs: true, netIonic: "Al + 3Ag⁺ → Al³⁺ + 3Ag" },
  },
];
