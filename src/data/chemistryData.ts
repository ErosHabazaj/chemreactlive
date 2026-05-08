/**
 * CHEMISTRY DATA MODULE
 * =====================
 * All chemistry data used by the ChemReact Visualizer.
 * Expanded activity series with 19 metals, 12 cations, 6 anions.
 */

// ----- TYPES -----

export interface Metal {
  symbol: string;
  name: string;
  nameAlbanian: string;
  charge: number;
  activityRank: number;
}

export interface Anion {
  formula: string;
  charge: number;
  display: string;
}

export interface Cation {
  symbol: string;
  charge: number;
  display: string;
}

export interface Salt {
  formula: string;
  displayFormula: string;
  cation: Cation;
  anion: Anion;
  cationCount: number;
  anionCount: number;
}

export type BiText = { en: string; sq: string };

// ----- ACTIVITY SERIES (expanded) -----

export const METALS: Metal[] = [
  { symbol: "Li", name: "Lithium",    nameAlbanian: "Litium",     charge: 1, activityRank: 0 },
  { symbol: "K",  name: "Potassium",  nameAlbanian: "Kalium",     charge: 1, activityRank: 1 },
  { symbol: "Ba", name: "Barium",     nameAlbanian: "Barium",     charge: 2, activityRank: 2 },
  { symbol: "Ca", name: "Calcium",    nameAlbanian: "Kalcium",    charge: 2, activityRank: 3 },
  { symbol: "Na", name: "Sodium",     nameAlbanian: "Natrium",    charge: 1, activityRank: 4 },
  { symbol: "Mg", name: "Magnesium",  nameAlbanian: "Magnez",     charge: 2, activityRank: 5 },
  { symbol: "Al", name: "Aluminium",  nameAlbanian: "Alumin",     charge: 3, activityRank: 6 },
  { symbol: "Mn", name: "Manganese",  nameAlbanian: "Mangan",     charge: 2, activityRank: 7 },
  { symbol: "Zn", name: "Zinc",       nameAlbanian: "Zink",       charge: 2, activityRank: 8 },
  { symbol: "Cr", name: "Chromium",   nameAlbanian: "Krom",       charge: 3, activityRank: 9 },
  { symbol: "Fe", name: "Iron",       nameAlbanian: "Hekur",      charge: 2, activityRank: 10 },
  { symbol: "Ni", name: "Nickel",     nameAlbanian: "Nikel",      charge: 2, activityRank: 11 },
  { symbol: "Sn", name: "Tin",        nameAlbanian: "Kallaj",     charge: 2, activityRank: 12 },
  { symbol: "Pb", name: "Lead",       nameAlbanian: "Plumb",      charge: 2, activityRank: 13 },
  { symbol: "Cu", name: "Copper",     nameAlbanian: "Bakër",      charge: 2, activityRank: 14 },
  { symbol: "Hg", name: "Mercury",    nameAlbanian: "Mërkur",     charge: 2, activityRank: 15 },
  { symbol: "Ag", name: "Silver",     nameAlbanian: "Argjend",    charge: 1, activityRank: 16 },
  { symbol: "Pt", name: "Platinum",   nameAlbanian: "Platin",     charge: 2, activityRank: 17 },
  { symbol: "Au", name: "Gold",       nameAlbanian: "Ar",         charge: 3, activityRank: 18 },
];

// ----- ANIONS (expanded) -----

export const ANIONS: Anion[] = [
  { formula: "SO4",  charge: -2, display: "SO₄²⁻" },
  { formula: "Cl",   charge: -1, display: "Cl⁻" },
  { formula: "NO3",  charge: -1, display: "NO₃⁻" },
  { formula: "OH",   charge: -1, display: "OH⁻" },
  { formula: "CO3",  charge: -2, display: "CO₃²⁻" },
  { formula: "PO4",  charge: -3, display: "PO₄³⁻" },
];

// ----- CATIONS (expanded) -----

export const CATIONS: Cation[] = [
  { symbol: "Mn", charge: 2, display: "Mn²⁺" },
  { symbol: "Zn", charge: 2, display: "Zn²⁺" },
  { symbol: "Cr", charge: 3, display: "Cr³⁺" },
  { symbol: "Fe", charge: 2, display: "Fe²⁺" },
  { symbol: "Ni", charge: 2, display: "Ni²⁺" },
  { symbol: "Sn", charge: 2, display: "Sn²⁺" },
  { symbol: "Pb", charge: 2, display: "Pb²⁺" },
  { symbol: "Cu", charge: 2, display: "Cu²⁺" },
  { symbol: "Hg", charge: 2, display: "Hg²⁺" },
  { symbol: "Ag", charge: 1, display: "Ag⁺" },
  { symbol: "Pt", charge: 2, display: "Pt²⁺" },
  { symbol: "Au", charge: 3, display: "Au³⁺" },
];

// ----- HELPERS -----

export function getMetal(symbol: string): Metal | undefined {
  return METALS.find(m => m.symbol === symbol);
}

export function getCation(symbol: string): Cation | undefined {
  return CATIONS.find(c => c.symbol === symbol);
}

export function getAnion(formula: string): Anion | undefined {
  return ANIONS.find(a => a.formula === formula);
}

export function buildSalt(cation: Cation, anion: Anion): Salt {
  const posCharge = cation.charge;
  const negCharge = Math.abs(anion.charge);
  const lcm = leastCommonMultiple(posCharge, negCharge);
  const cationCount = lcm / posCharge;
  const anionCount = lcm / negCharge;

  let anionPart: string;
  let anionDisplay: string;
  if (anionCount > 1 && anion.formula.length > 2) {
    anionPart = `(${anion.formula})${anionCount}`;
    anionDisplay = `(${anionFormulaDisplay(anion.formula)})${subscript(anionCount)}`;
  } else if (anionCount > 1) {
    anionPart = `${anion.formula}${anionCount}`;
    anionDisplay = `${anionFormulaDisplay(anion.formula)}${subscript(anionCount)}`;
  } else {
    anionPart = anion.formula;
    anionDisplay = anionFormulaDisplay(anion.formula);
  }

  return {
    formula: `${cationCount > 1 ? `${cation.symbol}${cationCount}` : cation.symbol}${anionPart}`,
    displayFormula: `${cationCount > 1 ? `${cation.symbol}${subscript(cationCount)}` : cation.symbol}${anionDisplay}`,
    cation,
    anion,
    cationCount,
    anionCount,
  };
}

export function getAllSalts(): Salt[] {
  const salts: Salt[] = [];
  for (const cation of CATIONS) {
    for (const anion of ANIONS) {
      salts.push(buildSalt(cation, anion));
    }
  }
  return salts;
}

// ----- UNICODE HELPERS -----

const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻',
};

const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
};

export function superscript(s: string | number): string {
  return String(s).split('').map(c => SUPERSCRIPT_MAP[c] || c).join('');
}

export function subscript(n: number): string {
  if (n <= 1) return '';
  return String(n).split('').map(c => SUBSCRIPT_MAP[c] || c).join('');
}

export function formatCharge(charge: number): string {
  if (charge === 0) return '0';
  const sign = charge > 0 ? '+' : '−';
  const magnitude = Math.abs(charge);
  return magnitude === 1 ? sign : `${magnitude}${sign}`;
}

export function formatChargeSuper(charge: number): string {
  return superscript(formatCharge(charge));
}

function anionFormulaDisplay(formula: string): string {
  return formula.replace(/(\d+)/g, (match) => subscript(Number(match)));
}

// ----- MATH HELPERS -----

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function leastCommonMultiple(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}
