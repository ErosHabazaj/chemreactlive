/**
 * NEW REACTION ENGINES
 * ====================
 * Engines for neutralization, combustion, synthesis, and decomposition.
 */

import type { BiText } from "@/data/chemistryData";
import { subscript } from "@/data/chemistryData";
import type { Acid, Base, Hydrocarbon, PredefinedReaction } from "@/data/reactionData";
import type { ReactionResult, VisualizerStep } from "./chemistryEngine";

// ----- NEUTRALIZATION -----

export function simulateNeutralization(acid: Acid, base: Base): ReactionResult {
  const hFromAcid = acid.hCount;
  const ohFromBase = base.ohCount;

  const lcm = lcmHelper(hFromAcid, ohFromBase);
  const acidCoeff = lcm / hFromAcid;
  const baseCoeff = lcm / ohFromBase;
  const waterCoeff = lcm;

  // Build salt formula: cation from base + anion from acid
  const cationCharge = base.cationCharge;
  const anionCharge = Math.abs(acid.anionCharge);
  const saltLcm = lcmHelper(cationCharge, anionCharge);
  const cationsPerSalt = saltLcm / cationCharge;
  const anionsPerSalt = saltLcm / anionCharge;

  // Build salt display
  const cationPart = cationsPerSalt > 1
    ? `${base.cationSymbol}${subscript(cationsPerSalt)}`
    : base.cationSymbol;

  let anionPart: string;
  if (anionsPerSalt > 1 && acid.anionFormula.length > 2) {
    anionPart = `(${formatAnionDisplay(acid.anionFormula)})${subscript(anionsPerSalt)}`;
  } else if (anionsPerSalt > 1) {
    anionPart = `${formatAnionDisplay(acid.anionFormula)}${subscript(anionsPerSalt)}`;
  } else {
    anionPart = formatAnionDisplay(acid.anionFormula);
  }

  const saltDisplay = `${cationPart}${anionPart}`;

  // Build balanced equation
  const ac = acidCoeff > 1 ? `${acidCoeff}` : "";
  const bc = baseCoeff > 1 ? `${baseCoeff}` : "";
  const wc = waterCoeff > 1 ? `${waterCoeff}` : "";

  const equation = `${ac}${acid.displayFormula} + ${bc}${base.displayFormula} → ${saltDisplay} + ${wc}H₂O`;

  const steps: VisualizerStep[] = [
    {
      title: { en: "Identify Acid and Base", sq: "Identifiko Acidin dhe Bazën" },
      description: {
        en: `Acid: ${acid.displayFormula} provides ${hFromAcid} H⁺ ion${hFromAcid > 1 ? "s" : ""}. Base: ${base.displayFormula} provides ${ohFromBase} OH⁻ ion${ohFromBase > 1 ? "s" : ""}.`,
        sq: `Acidi: ${acid.displayFormula} jep ${hFromAcid} jon${hFromAcid > 1 ? "e" : ""} H⁺. Baza: ${base.displayFormula} jep ${ohFromBase} jon${ohFromBase > 1 ? "e" : ""} OH⁻.`,
      },
      highlight: "reactant",
    },
    {
      title: { en: "Balance H⁺ and OH⁻", sq: "Balanco H⁺ dhe OH⁻" },
      description: {
        en: `Need equal H⁺ and OH⁻: ${acidCoeff > 1 ? `${acidCoeff} molecules of acid provide ${lcm} H⁺` : `1 molecule of acid provides ${hFromAcid} H⁺`}, ${baseCoeff > 1 ? `${baseCoeff} molecules of base provide ${lcm} OH⁻` : `1 molecule of base provides ${ohFromBase} OH⁻`}.`,
        sq: `Duhen H⁺ dhe OH⁻ të barabarta: ${acidCoeff > 1 ? `${acidCoeff} molekula acidi japin ${lcm} H⁺` : `1 molekulë acidi jep ${hFromAcid} H⁺`}, ${baseCoeff > 1 ? `${baseCoeff} molekula baze japin ${lcm} OH⁻` : `1 molekulë baze jep ${ohFromBase} OH⁻`}.`,
      },
      highlight: "electron",
    },
    {
      title: { en: "Form Water", sq: "Formo Ujin" },
      description: {
        en: `H⁺ + OH⁻ → H₂O. Each pair of H⁺ and OH⁻ ions combines to form one water molecule. Total: ${waterCoeff} H₂O.`,
        sq: `H⁺ + OH⁻ → H₂O. Çdo çift jonesh H⁺ dhe OH⁻ kombinohet për të formuar një molekulë uji. Totali: ${waterCoeff} H₂O.`,
      },
      highlight: "product",
    },
    {
      title: { en: "Form Salt", sq: "Formo Kripën" },
      description: {
        en: `The remaining ions (${base.cationSymbol}${cationCharge > 1 ? `${cationCharge}⁺` : "⁺"} and ${acid.anionDisplay}) combine to form the salt ${saltDisplay}.`,
        sq: `Jonet e mbetura (${base.cationSymbol}${cationCharge > 1 ? `${cationCharge}⁺` : "⁺"} dhe ${acid.anionDisplay}) kombinohen për të formuar kripën ${saltDisplay}.`,
      },
      highlight: "product",
    },
    {
      title: { en: "Balanced Equation", sq: "Ekuacioni i Balansuar" },
      description: {
        en: equation,
        sq: equation,
      },
      highlight: "result",
    },
  ];

  return {
    occurs: true,
    reactionType: "neutralization",
    molecularEquation: equation,
    netIonicEquation: `H⁺ + OH⁻ → H₂O`,
    energyChange: "exothermic",
    generalFormula: "Acid + Base → Salt + H₂O",
    steps,
    explanation: {
      en: `${acid.name.en} reacts with ${base.name.en} in a neutralization reaction. The H⁺ ions from the acid combine with OH⁻ ions from the base to form water (H₂O), while the remaining ions form the salt ${saltDisplay}. Neutralization reactions are always exothermic — they release heat.`,
      sq: `${acid.name.sq} reagon me ${base.name.sq} në një reaksion neutralizimi. Jonet H⁺ nga acidi kombinohen me jonet OH⁻ nga baza për të formuar ujë (H₂O), ndërsa jonet e mbetura formojnë kripën ${saltDisplay}. Reaksionet e neutralizimit janë gjithmonë ekzotermike — çlirojnë nxehtësi.`,
    },
  };
}

// ----- COMBUSTION -----

export function simulateCombustion(compound: Hydrocarbon): ReactionResult {
  const n = compound.carbonCount;
  const m = compound.hydrogenCount;
  const k = compound.oxygenCount;

  // CₙHₘOₖ + (4n + m - 2k)/4 O₂ → n CO₂ + m/2 H₂O
  // Multiply all by 4: 4CₙHₘOₖ + (4n+m-2k)O₂ → 4nCO₂ + 2mH₂O
  let compCoeff = 4;
  let o2Coeff = 4 * n + m - 2 * k;
  let co2Coeff = 4 * n;
  let h2oCoeff = 2 * m;

  const g = gcd4(compCoeff, o2Coeff, co2Coeff, h2oCoeff);
  compCoeff /= g;
  o2Coeff /= g;
  co2Coeff /= g;
  h2oCoeff /= g;

  const cc = compCoeff > 1 ? `${compCoeff}` : "";
  const oc = o2Coeff > 1 ? `${o2Coeff}` : "";
  const coc = co2Coeff > 1 ? `${co2Coeff}` : "";
  const hc = h2oCoeff > 1 ? `${h2oCoeff}` : "";

  const equation = `${cc}${compound.displayFormula} + ${oc}O₂ → ${coc}CO₂ + ${hc}H₂O`;

  const steps: VisualizerStep[] = [
    {
      title: { en: "Identify Fuel", sq: "Identifiko Karburantin" },
      description: {
        en: `${compound.name.en} (${compound.displayFormula}) contains ${n} carbon atom${n > 1 ? "s" : ""} and ${m} hydrogen atom${m > 1 ? "s" : ""}${k > 0 ? ` and ${k} oxygen atom${k > 1 ? "s" : ""}` : ""}.`,
        sq: `${compound.name.sq} (${compound.displayFormula}) përmban ${n} atom${n > 1 ? "e" : ""} karboni dhe ${m} atom${m > 1 ? "e" : ""} hidrogjeni${k > 0 ? ` dhe ${k} atom${k > 1 ? "e" : ""} oksigjeni` : ""}.`,
      },
      highlight: "reactant",
    },
    {
      title: { en: "Balance Carbon → CO₂", sq: "Balanco Karbonin → CO₂" },
      description: {
        en: `Each carbon atom produces one CO₂ molecule: ${n} C → ${coc}CO₂.`,
        sq: `Çdo atom karboni prodhon një molekulë CO₂: ${n} C → ${coc}CO₂.`,
      },
      highlight: "product",
    },
    {
      title: { en: "Balance Hydrogen → H₂O", sq: "Balanco Hidrogjenin → H₂O" },
      description: {
        en: `Every 2 hydrogen atoms produce one H₂O: ${m} H → ${hc}H₂O.`,
        sq: `Çdo 2 atome hidrogjeni prodhojnë një H₂O: ${m} H → ${hc}H₂O.`,
      },
      highlight: "product",
    },
    {
      title: { en: "Balance Oxygen (O₂)", sq: "Balanco Oksigjenin (O₂)" },
      description: {
        en: `Total oxygen needed on product side: ${co2Coeff * 2} (from CO₂) + ${h2oCoeff} (from H₂O) = ${co2Coeff * 2 + h2oCoeff} atoms${k > 0 ? `, minus ${k * compCoeff} from fuel` : ""}. This requires ${oc}O₂.`,
        sq: `Oksigjeni total i nevojshëm: ${co2Coeff * 2} (nga CO₂) + ${h2oCoeff} (nga H₂O) = ${co2Coeff * 2 + h2oCoeff} atome${k > 0 ? `, minus ${k * compCoeff} nga karburanti` : ""}. Kjo kërkon ${oc}O₂.`,
      },
      highlight: "electron",
    },
    {
      title: { en: "Balanced Equation", sq: "Ekuacioni i Balansuar" },
      description: { en: equation, sq: equation },
      highlight: "result",
    },
  ];

  return {
    occurs: true,
    reactionType: "combustion",
    molecularEquation: equation,
    energyChange: "exothermic",
    generalFormula: "CₙHₘ + O₂ → CO₂ + H₂O",
    steps,
    explanation: {
      en: `Complete combustion of ${compound.name.en}: the compound reacts with excess oxygen (O₂) to produce carbon dioxide (CO₂) and water (H₂O). Combustion reactions are always exothermic — they release heat and light energy. This is the basis of how fuels provide energy.`,
      sq: `Djegia e plotë e ${compound.name.sq}: përbërja reagon me oksigjen të tepërt (O₂) për të prodhuar dioksid karboni (CO₂) dhe ujë (H₂O). Reaksionet e djegies janë gjithmonë ekzotermike — çlirojnë energji nxehtësie dhe drite. Kjo është baza e mënyrës se si karburantet japin energji.`,
    },
  };
}

// ----- SYNTHESIS (predefined) -----

export function simulateSynthesis(reaction: PredefinedReaction): ReactionResult {
  const steps: VisualizerStep[] = [
    {
      title: { en: "Identify Reactants", sq: "Identifiko Reaktantët" },
      description: {
        en: `Two or more simple substances combine to form a single, more complex product.`,
        sq: `Dy ose më shumë substanca të thjeshta kombinohen për të formuar një produkt të vetëm, më kompleks.`,
      },
      highlight: "reactant",
    },
    {
      title: { en: "General Pattern", sq: "Modeli i Përgjithshëm" },
      description: {
        en: `Synthesis follows the pattern: A + B → AB. Elements or simple compounds join together.`,
        sq: `Sinteza ndjek modelin: A + B → AB. Elementet ose përbërjet e thjeshta bashkohen.`,
      },
      highlight: "electron",
    },
    {
      title: { en: "Balanced Equation", sq: "Ekuacioni i Balansuar" },
      description: { en: reaction.displayEquation, sq: reaction.displayEquation },
      highlight: "result",
    },
  ];

  return {
    occurs: true,
    reactionType: "synthesis",
    molecularEquation: reaction.displayEquation,
    energyChange: reaction.energyChange,
    generalFormula: reaction.generalFormula,
    steps,
    explanation: reaction.explanation,
  };
}

// ----- DECOMPOSITION (predefined) -----

export function simulateDecomposition(reaction: PredefinedReaction): ReactionResult {
  const steps: VisualizerStep[] = [
    {
      title: { en: "Identify Compound", sq: "Identifiko Përbërjen" },
      description: {
        en: `A single compound breaks down into two or more simpler substances, usually requiring energy input (heat, electricity, or light).`,
        sq: `Një përbërje e vetme zbërthehet në dy ose më shumë substanca më të thjeshta, zakonisht duke kërkuar furnizim me energji (nxehtësi, elektricitet ose dritë).`,
      },
      highlight: "reactant",
    },
    {
      title: { en: "General Pattern", sq: "Modeli i Përgjithshëm" },
      description: {
        en: `Decomposition follows the pattern: AB → A + B. A compound splits into its component parts.`,
        sq: `Dekompozimi ndjek modelin: AB → A + B. Një përbërje ndahet në përbërësit e saj.`,
      },
      highlight: "electron",
    },
    {
      title: { en: "Balanced Equation", sq: "Ekuacioni i Balansuar" },
      description: { en: reaction.displayEquation, sq: reaction.displayEquation },
      highlight: "result",
    },
  ];

  return {
    occurs: true,
    reactionType: "decomposition",
    molecularEquation: reaction.displayEquation,
    energyChange: reaction.energyChange,
    generalFormula: reaction.generalFormula,
    steps,
    explanation: reaction.explanation,
  };
}

// ----- HELPERS -----

function formatAnionDisplay(formula: string): string {
  return formula.replace(/(\d+)/g, (match) => subscript(Number(match)));
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

function lcmHelper(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function gcd4(a: number, b: number, c: number, d: number): number {
  return gcd(gcd(a, b), gcd(c, d));
}
