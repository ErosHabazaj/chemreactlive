/**
 * REACTION DATA MODULE
 * ====================
 * Acids, bases, hydrocarbons, and predefined reactions
 * for neutralization, combustion, synthesis, and decomposition.
 * All data includes bilingual (English/Albanian) text.
 */

import type { BiText } from "./chemistryData";

// ----- ACIDS -----

export interface Acid {
  formula: string;
  displayFormula: string;
  name: BiText;
  hCount: number;
  anionFormula: string;
  anionDisplay: string;
  anionCharge: number;
}

export const ACIDS: Acid[] = [
  { formula: "HCl", displayFormula: "HCl", name: { en: "Hydrochloric acid", sq: "Acid klorhidrik" }, hCount: 1, anionFormula: "Cl", anionDisplay: "Cl⁻", anionCharge: -1 },
  { formula: "H2SO4", displayFormula: "H₂SO₄", name: { en: "Sulfuric acid", sq: "Acid sulfurik" }, hCount: 2, anionFormula: "SO4", anionDisplay: "SO₄²⁻", anionCharge: -2 },
  { formula: "HNO3", displayFormula: "HNO₃", name: { en: "Nitric acid", sq: "Acid nitrik" }, hCount: 1, anionFormula: "NO3", anionDisplay: "NO₃⁻", anionCharge: -1 },
  { formula: "H3PO4", displayFormula: "H₃PO₄", name: { en: "Phosphoric acid", sq: "Acid fosforik" }, hCount: 3, anionFormula: "PO4", anionDisplay: "PO₄³⁻", anionCharge: -3 },
  { formula: "CH3COOH", displayFormula: "CH₃COOH", name: { en: "Acetic acid", sq: "Acid acetik" }, hCount: 1, anionFormula: "CH3COO", anionDisplay: "CH₃COO⁻", anionCharge: -1 },
];

// ----- BASES -----

export interface Base {
  formula: string;
  displayFormula: string;
  name: BiText;
  ohCount: number;
  cationSymbol: string;
  cationCharge: number;
}

export const BASES: Base[] = [
  { formula: "NaOH", displayFormula: "NaOH", name: { en: "Sodium hydroxide", sq: "Hidroksid natriumi" }, ohCount: 1, cationSymbol: "Na", cationCharge: 1 },
  { formula: "KOH", displayFormula: "KOH", name: { en: "Potassium hydroxide", sq: "Hidroksid kaliumi" }, ohCount: 1, cationSymbol: "K", cationCharge: 1 },
  { formula: "Ca(OH)2", displayFormula: "Ca(OH)₂", name: { en: "Calcium hydroxide", sq: "Hidroksid kalciumi" }, ohCount: 2, cationSymbol: "Ca", cationCharge: 2 },
  { formula: "Ba(OH)2", displayFormula: "Ba(OH)₂", name: { en: "Barium hydroxide", sq: "Hidroksid bariumi" }, ohCount: 2, cationSymbol: "Ba", cationCharge: 2 },
  { formula: "Mg(OH)2", displayFormula: "Mg(OH)₂", name: { en: "Magnesium hydroxide", sq: "Hidroksid magnezi" }, ohCount: 2, cationSymbol: "Mg", cationCharge: 2 },
  { formula: "Al(OH)3", displayFormula: "Al(OH)₃", name: { en: "Aluminium hydroxide", sq: "Hidroksid alumini" }, ohCount: 3, cationSymbol: "Al", cationCharge: 3 },
];

// ----- HYDROCARBONS / ORGANIC COMPOUNDS -----

export interface Hydrocarbon {
  formula: string;
  displayFormula: string;
  name: BiText;
  carbonCount: number;
  hydrogenCount: number;
  oxygenCount: number;
}

export const HYDROCARBONS: Hydrocarbon[] = [
  { formula: "CH4", displayFormula: "CH₄", name: { en: "Methane", sq: "Metan" }, carbonCount: 1, hydrogenCount: 4, oxygenCount: 0 },
  { formula: "C2H6", displayFormula: "C₂H₆", name: { en: "Ethane", sq: "Etan" }, carbonCount: 2, hydrogenCount: 6, oxygenCount: 0 },
  { formula: "C3H8", displayFormula: "C₃H₈", name: { en: "Propane", sq: "Propan" }, carbonCount: 3, hydrogenCount: 8, oxygenCount: 0 },
  { formula: "C4H10", displayFormula: "C₄H₁₀", name: { en: "Butane", sq: "Butan" }, carbonCount: 4, hydrogenCount: 10, oxygenCount: 0 },
  { formula: "C2H4", displayFormula: "C₂H₄", name: { en: "Ethene", sq: "Eten" }, carbonCount: 2, hydrogenCount: 4, oxygenCount: 0 },
  { formula: "C6H6", displayFormula: "C₆H₆", name: { en: "Benzene", sq: "Benzen" }, carbonCount: 6, hydrogenCount: 6, oxygenCount: 0 },
  { formula: "C2H5OH", displayFormula: "C₂H₅OH", name: { en: "Ethanol", sq: "Etanol" }, carbonCount: 2, hydrogenCount: 6, oxygenCount: 1 },
  { formula: "C8H18", displayFormula: "C₈H₁₈", name: { en: "Octane", sq: "Oktan" }, carbonCount: 8, hydrogenCount: 18, oxygenCount: 0 },
];

// ----- PREDEFINED REACTIONS -----

export interface PredefinedReaction {
  id: string;
  name: BiText;
  displayEquation: string;
  energyChange: "exothermic" | "endothermic";
  explanation: BiText;
  generalFormula: string;
  /** For synthesis: the two element symbols that combine */
  elementA?: string;
  elementB?: string;
}

export const SYNTHESIS_REACTIONS: PredefinedReaction[] = [
  {
    id: "syn-1",
    name: { en: "Iron + Sulfur → Iron(II) sulfide", sq: "Hekur + Squfur → Sulfur hekuri(II)" },
    displayEquation: "Fe + S → FeS",
    energyChange: "exothermic",
    explanation: {
      en: "Iron reacts with sulfur to form iron(II) sulfide, releasing heat and light. This is a classic example of two elements combining to form a single compound.",
      sq: "Hekuri reagon me squfurin për të formuar sulfur hekuri(II), duke çliruar nxehtësi dhe dritë. Ky është një shembull klasik i dy elementeve që kombinohen për të formuar një përbërje të vetme.",
    },
    generalFormula: "A + B → AB",
    elementA: "Fe", elementB: "S",
  },
  {
    id: "syn-2",
    name: { en: "Sodium + Chlorine → Sodium chloride", sq: "Natrium + Klor → Klorur natriumi" },
    displayEquation: "2Na + Cl₂ → 2NaCl",
    energyChange: "exothermic",
    explanation: {
      en: "Sodium, a highly reactive alkali metal, reacts vigorously with chlorine gas to form sodium chloride (table salt). This highly exothermic reaction produces a bright yellow flame.",
      sq: "Natriumi, një metal alkalin shumë reaktiv, reagon me forcë me gazin klor për të formuar klorur natriumi (kripën e tryezës). Ky reaksion shumë ekzotermik prodhon një flakë të ndritshme të verdhë.",
    },
    generalFormula: "A + B → AB",
    elementA: "Na", elementB: "Cl",
  },
  {
    id: "syn-3",
    name: { en: "Hydrogen + Oxygen → Water", sq: "Hidrogjen + Oksigjen → Ujë" },
    displayEquation: "2H₂ + O₂ → 2H₂O",
    energyChange: "exothermic",
    explanation: {
      en: "Hydrogen gas burns in oxygen to produce water. This highly exothermic reaction releases significant energy, which is why hydrogen is explored as a clean fuel.",
      sq: "Gazi hidrogjen digjet në oksigjen për të prodhuar ujë. Ky reaksion shumë ekzotermik çliron energji të konsiderueshme, prandaj hidrogjeni studiohet si karburant i pastër.",
    },
    generalFormula: "A + B → AB",
    elementA: "H", elementB: "O",
  },
  {
    id: "syn-4",
    name: { en: "Nitrogen + Hydrogen → Ammonia (Haber)", sq: "Azot + Hidrogjen → Amoniakë (Haber)" },
    displayEquation: "N₂ + 3H₂ → 2NH₃",
    energyChange: "exothermic",
    explanation: {
      en: "The Haber process combines nitrogen from air with hydrogen under high pressure and temperature using an iron catalyst to produce ammonia. Essential for fertilizer production worldwide.",
      sq: "Procesi Haber kombinon azotin nga ajri me hidrogjenin nën presion dhe temperaturë të lartë duke përdorur katalizator hekuri për të prodhuar amoniakë. Thelbësor për prodhimin e plehrave në mbarë botën.",
    },
    generalFormula: "A + B → AB",
    elementA: "N", elementB: "H",
  },
  {
    id: "syn-5",
    name: { en: "Magnesium + Oxygen → Magnesium oxide", sq: "Magnez + Oksigjen → Oksid magnezi" },
    displayEquation: "2Mg + O₂ → 2MgO",
    energyChange: "exothermic",
    explanation: {
      en: "Magnesium burns in oxygen with an intense white flame to produce magnesium oxide (a white powder). This is a classic lab demonstration of a synthesis reaction.",
      sq: "Magnezi digjet në oksigjen me një flakë të bardhë intensive për të prodhuar oksid magnezi (një pluhur i bardhë). Ky është një demonstrim klasik laboratorik i reaksionit të sintezës.",
    },
    generalFormula: "A + B → AB",
    elementA: "Mg", elementB: "O",
  },
  {
    id: "syn-6",
    name: { en: "Aluminium + Oxygen → Aluminium oxide", sq: "Alumin + Oksigjen → Oksid alumini" },
    displayEquation: "4Al + 3O₂ → 2Al₂O₃",
    energyChange: "exothermic",
    explanation: {
      en: "Aluminium reacts with oxygen to form aluminium oxide (alumina). In nature, this oxide layer forms spontaneously and protects aluminium from further corrosion.",
      sq: "Alumini reagon me oksigjenin për të formuar oksid alumini (alumina). Në natyrë, kjo shtresë oksidi formohet spontanisht dhe mbron aluminin nga korrozioni i mëtejshëm.",
    },
    generalFormula: "A + B → AB",
    elementA: "Al", elementB: "O",
  },
  {
    id: "syn-7",
    name: { en: "Carbon + Oxygen → Carbon dioxide", sq: "Karbon + Oksigjen → Dioksid karboni" },
    displayEquation: "C + O₂ → CO₂",
    energyChange: "exothermic",
    explanation: {
      en: "Carbon burns in excess oxygen to form carbon dioxide. This is the fundamental reaction in burning coal and charcoal, and a key process in the carbon cycle.",
      sq: "Karboni digjet në oksigjen të tepërt për të formuar dioksid karboni. Ky është reaksioni themelor në djegien e qymyrit, dhe një proces kyç në ciklin e karbonit.",
    },
    generalFormula: "A + B → AB",
    elementA: "C", elementB: "O",
  },
];

/** All unique element symbols used in synthesis reactions */
export const SYNTHESIS_ELEMENT_A_SYMBOLS = [...new Set(SYNTHESIS_REACTIONS.map(r => r.elementA!))];
export const SYNTHESIS_ELEMENT_B_SYMBOLS = [...new Set(SYNTHESIS_REACTIONS.map(r => r.elementB!))];
export const ALL_SYNTHESIS_SYMBOLS = [...new Set([...SYNTHESIS_ELEMENT_A_SYMBOLS, ...SYNTHESIS_ELEMENT_B_SYMBOLS])];

/** Find a synthesis reaction matching two elements (order-independent) */
export function findSynthesisReaction(a: string, b: string): PredefinedReaction | undefined {
  return SYNTHESIS_REACTIONS.find(r =>
    (r.elementA === a && r.elementB === b) ||
    (r.elementA === b && r.elementB === a)
  );
}

/** Get valid partner elements for a given element */
export function getSynthesisPartners(symbol: string): string[] {
  return SYNTHESIS_REACTIONS
    .filter(r => r.elementA === symbol || r.elementB === symbol)
    .map(r => r.elementA === symbol ? r.elementB! : r.elementA!);
}

export const DECOMPOSITION_REACTIONS: PredefinedReaction[] = [
  {
    id: "dec-1",
    name: { en: "Water electrolysis", sq: "Elektroliza e ujit" },
    displayEquation: "2H₂O → 2H₂ + O₂",
    energyChange: "endothermic",
    explanation: {
      en: "Water decomposes into hydrogen and oxygen gas when an electric current passes through it. This endothermic process requires continuous energy input and is used in green hydrogen production.",
      sq: "Uji dekompozohet në gaz hidrogjen dhe oksigjen kur kalon rrymë elektrike. Ky proces endotermik kërkon furnizim të vazhdueshëm me energji dhe përdoret në prodhimin e hidrogjenit të gjelbër.",
    },
    generalFormula: "AB → A + B",
  },
  {
    id: "dec-2",
    name: { en: "Calcium carbonate decomposition", sq: "Dekompozimi i karbonatit të kalciumit" },
    displayEquation: "CaCO₃ → CaO + CO₂",
    energyChange: "endothermic",
    explanation: {
      en: "Calcium carbonate (limestone) decomposes upon strong heating to produce calcium oxide (quicklime) and carbon dioxide gas. This is the basis of cement and lime manufacturing.",
      sq: "Karbonati i kalciumit (guri gëlqeror) dekompozohet me nxehje të fortë për të prodhuar oksid kalciumi (gëlqere) dhe dioksid karboni. Kjo është baza e prodhimit të çimentos dhe gëlqeres.",
    },
    generalFormula: "AB → A + B",
  },
  {
    id: "dec-3",
    name: { en: "Potassium chlorate decomposition", sq: "Dekompozimi i kloratit të kaliumit" },
    displayEquation: "2KClO₃ → 2KCl + 3O₂",
    energyChange: "exothermic",
    explanation: {
      en: "Potassium chlorate decomposes when heated to produce potassium chloride and oxygen gas. A catalyst (MnO₂) can significantly lower the activation temperature.",
      sq: "Klorati i kaliumit dekompozohet kur nxehet për të prodhuar klorur kaliumi dhe gaz oksigjen. Një katalizator (MnO₂) mund të ulë ndjeshëm temperaturën e aktivizimit.",
    },
    generalFormula: "AB → A + B",
  },
  {
    id: "dec-4",
    name: { en: "Hydrogen peroxide decomposition", sq: "Dekompozimi i peroksidit të hidrogjenit" },
    displayEquation: "2H₂O₂ → 2H₂O + O₂",
    energyChange: "exothermic",
    explanation: {
      en: "Hydrogen peroxide naturally decomposes into water and oxygen. This process is accelerated by catalysts like manganese dioxide or the enzyme catalase found in living cells.",
      sq: "Peroksidi i hidrogjenit dekompozohet natyrshëm në ujë dhe oksigjen. Ky proces përshpejtohet nga katalizatorë si dioksidi i manganit ose enzima katalazë që gjendet në qelizat e gjalla.",
    },
    generalFormula: "AB → A + B",
  },
  {
    id: "dec-5",
    name: { en: "Sodium bicarbonate decomposition", sq: "Dekompozimi i bikarbonatit të natriumit" },
    displayEquation: "2NaHCO₃ → Na₂CO₃ + H₂O + CO₂",
    energyChange: "endothermic",
    explanation: {
      en: "Baking soda (sodium bicarbonate) decomposes when heated to form sodium carbonate, water, and carbon dioxide. The CO₂ gas produced is what makes baked goods rise.",
      sq: "Soda e bukës (bikarbonati i natriumit) dekompozohet kur nxehet për të formuar karbonat natriumi, ujë dhe dioksid karboni. Gazi CO₂ i prodhuar është ai që i bën produktet e pjekura të fryhen.",
    },
    generalFormula: "AB → A + B",
  },
  {
    id: "dec-6",
    name: { en: "Mercury(II) oxide decomposition", sq: "Dekompozimi i oksidit të mërkurit(II)" },
    displayEquation: "2HgO → 2Hg + O₂",
    energyChange: "endothermic",
    explanation: {
      en: "Mercury(II) oxide decomposes when heated strongly, producing liquid mercury and oxygen gas. Historically significant — Joseph Priestley discovered oxygen through this reaction in 1774.",
      sq: "Oksidi i mërkurit(II) dekompozohet kur nxehet fort, duke prodhuar mërkur të lëngshëm dhe gaz oksigjen. Historikisht i rëndësishëm — Joseph Priestley zbuloi oksigjenin përmes këtij reaksioni në 1774.",
    },
    generalFormula: "AB → A + B",
  },
];
