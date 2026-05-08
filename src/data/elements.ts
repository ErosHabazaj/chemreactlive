/**
 * COMPLETE PERIODIC TABLE DATA
 * ============================
 * All 118 elements with detailed properties.
 * Data sourced from IUPAC and standard chemistry references.
 */

export interface PeriodicElement {
  atomicNumber: number;
  name: string;
  symbol: string;
  atomicMass: number;
  group: number | null;       // null for lanthanides/actinides
  period: number;
  block: "s" | "p" | "d" | "f";
  category: string;
  electronConfiguration: string;
  electronConfigurationNobleGas: string;
  protons: number;
  neutrons: number;           // most common isotope
  electrons: number;
  electronegativity: number | null;
  atomicRadius: number | null;  // in pm
  ionizationEnergy: number | null; // in kJ/mol
  standardState: "solid" | "liquid" | "gas" | "unknown";
  meltingPoint: number | null;  // in K
  boilingPoint: number | null;  // in K
  density: number | null;       // in g/cm³ (or g/L for gases)
  oxidationStates: number[];
  yearDiscovered: number | string | null; // "Ancient" for elements known since antiquity
  description: string;
}

export const ELEMENTS: PeriodicElement[] = [
  {
    atomicNumber: 1, name: "Hydrogen", symbol: "H", atomicMass: 1.008,
    group: 1, period: 1, block: "s", category: "nonmetal",
    electronConfiguration: "1s¹", electronConfigurationNobleGas: "1s¹",
    protons: 1, neutrons: 0, electrons: 1,
    electronegativity: 2.20, atomicRadius: 53, ionizationEnergy: 1312,
    standardState: "gas", meltingPoint: 14.01, boilingPoint: 20.28, density: 0.00008988,
    oxidationStates: [-1, 1], yearDiscovered: 1766,
    description: "The lightest and most abundant element in the universe, essential for water and organic chemistry."
  },
  {
    atomicNumber: 2, name: "Helium", symbol: "He", atomicMass: 4.0026,
    group: 18, period: 1, block: "s", category: "noble gas",
    electronConfiguration: "1s²", electronConfigurationNobleGas: "1s²",
    protons: 2, neutrons: 2, electrons: 2,
    electronegativity: null, atomicRadius: 31, ionizationEnergy: 2372,
    standardState: "gas", meltingPoint: null, boilingPoint: 4.22, density: 0.0001785,
    oxidationStates: [0], yearDiscovered: 1868,
    description: "A colorless, odorless noble gas used in balloons and cryogenics."
  },
  {
    atomicNumber: 3, name: "Lithium", symbol: "Li", atomicMass: 6.941,
    group: 1, period: 2, block: "s", category: "alkali metal",
    electronConfiguration: "1s² 2s¹", electronConfigurationNobleGas: "[He] 2s¹",
    protons: 3, neutrons: 4, electrons: 3,
    electronegativity: 0.98, atomicRadius: 167, ionizationEnergy: 520,
    standardState: "solid", meltingPoint: 453.65, boilingPoint: 1615, density: 0.534,
    oxidationStates: [1], yearDiscovered: 1817,
    description: "The lightest metal, widely used in rechargeable batteries and psychiatric medicine."
  },
  {
    atomicNumber: 4, name: "Beryllium", symbol: "Be", atomicMass: 9.0122,
    group: 2, period: 2, block: "s", category: "alkaline earth metal",
    electronConfiguration: "1s² 2s²", electronConfigurationNobleGas: "[He] 2s²",
    protons: 4, neutrons: 5, electrons: 4,
    electronegativity: 1.57, atomicRadius: 112, ionizationEnergy: 900,
    standardState: "solid", meltingPoint: 1560, boilingPoint: 2742, density: 1.85,
    oxidationStates: [2], yearDiscovered: 1798,
    description: "A lightweight, strong metal used in aerospace materials and X-ray windows."
  },
  {
    atomicNumber: 5, name: "Boron", symbol: "B", atomicMass: 10.81,
    group: 13, period: 2, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p¹", electronConfigurationNobleGas: "[He] 2s² 2p¹",
    protons: 5, neutrons: 6, electrons: 5,
    electronegativity: 2.04, atomicRadius: 87, ionizationEnergy: 801,
    standardState: "solid", meltingPoint: 2349, boilingPoint: 4200, density: 2.34,
    oxidationStates: [3], yearDiscovered: 1808,
    description: "A metalloid used in glass, ceramics, and as a neutron absorber in nuclear reactors."
  },
  {
    atomicNumber: 6, name: "Carbon", symbol: "C", atomicMass: 12.011,
    group: 14, period: 2, block: "p", category: "nonmetal",
    electronConfiguration: "1s² 2s² 2p²", electronConfigurationNobleGas: "[He] 2s² 2p²",
    protons: 6, neutrons: 6, electrons: 6,
    electronegativity: 2.55, atomicRadius: 77, ionizationEnergy: 1087,
    standardState: "solid", meltingPoint: 3823, boilingPoint: 4098, density: 2.267,
    oxidationStates: [-4, -3, -2, -1, 0, 1, 2, 3, 4], yearDiscovered: "Ancient",
    description: "The basis of all known life, forming more compounds than any other element."
  },
  {
    atomicNumber: 7, name: "Nitrogen", symbol: "N", atomicMass: 14.007,
    group: 15, period: 2, block: "p", category: "nonmetal",
    electronConfiguration: "1s² 2s² 2p³", electronConfigurationNobleGas: "[He] 2s² 2p³",
    protons: 7, neutrons: 7, electrons: 7,
    electronegativity: 3.04, atomicRadius: 75, ionizationEnergy: 1402,
    standardState: "gas", meltingPoint: 63.15, boilingPoint: 77.36, density: 0.0012506,
    oxidationStates: [-3, -2, -1, 1, 2, 3, 4, 5], yearDiscovered: 1772,
    description: "Makes up 78% of Earth's atmosphere and is essential for amino acids and DNA."
  },
  {
    atomicNumber: 8, name: "Oxygen", symbol: "O", atomicMass: 15.999,
    group: 16, period: 2, block: "p", category: "nonmetal",
    electronConfiguration: "1s² 2s² 2p⁴", electronConfigurationNobleGas: "[He] 2s² 2p⁴",
    protons: 8, neutrons: 8, electrons: 8,
    electronegativity: 3.44, atomicRadius: 73, ionizationEnergy: 1314,
    standardState: "gas", meltingPoint: 54.36, boilingPoint: 90.20, density: 0.001429,
    oxidationStates: [-2, -1, 1, 2], yearDiscovered: 1774,
    description: "Essential for respiration and combustion, the most abundant element in Earth's crust."
  },
  {
    atomicNumber: 9, name: "Fluorine", symbol: "F", atomicMass: 18.998,
    group: 17, period: 2, block: "p", category: "halogen",
    electronConfiguration: "1s² 2s² 2p⁵", electronConfigurationNobleGas: "[He] 2s² 2p⁵",
    protons: 9, neutrons: 10, electrons: 9,
    electronegativity: 3.98, atomicRadius: 71, ionizationEnergy: 1681,
    standardState: "gas", meltingPoint: 53.53, boilingPoint: 85.03, density: 0.001696,
    oxidationStates: [-1], yearDiscovered: 1886,
    description: "The most electronegative and reactive of all elements."
  },
  {
    atomicNumber: 10, name: "Neon", symbol: "Ne", atomicMass: 20.180,
    group: 18, period: 2, block: "p", category: "noble gas",
    electronConfiguration: "1s² 2s² 2p⁶", electronConfigurationNobleGas: "[He] 2s² 2p⁶",
    protons: 10, neutrons: 10, electrons: 10,
    electronegativity: null, atomicRadius: 38, ionizationEnergy: 2081,
    standardState: "gas", meltingPoint: 24.56, boilingPoint: 27.07, density: 0.0008999,
    oxidationStates: [0], yearDiscovered: 1898,
    description: "A noble gas famous for its use in brightly colored neon signs."
  },
  {
    atomicNumber: 11, name: "Sodium", symbol: "Na", atomicMass: 22.990,
    group: 1, period: 3, block: "s", category: "alkali metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s¹", electronConfigurationNobleGas: "[Ne] 3s¹",
    protons: 11, neutrons: 12, electrons: 11,
    electronegativity: 0.93, atomicRadius: 190, ionizationEnergy: 496,
    standardState: "solid", meltingPoint: 370.95, boilingPoint: 1156, density: 0.971,
    oxidationStates: [-1, 1], yearDiscovered: 1807,
    description: "A highly reactive alkali metal essential for nerve function; found in table salt."
  },
  {
    atomicNumber: 12, name: "Magnesium", symbol: "Mg", atomicMass: 24.305,
    group: 2, period: 3, block: "s", category: "alkaline earth metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s²", electronConfigurationNobleGas: "[Ne] 3s²",
    protons: 12, neutrons: 12, electrons: 12,
    electronegativity: 1.31, atomicRadius: 145, ionizationEnergy: 738,
    standardState: "solid", meltingPoint: 923, boilingPoint: 1363, density: 1.738,
    oxidationStates: [2], yearDiscovered: 1755,
    description: "A lightweight metal used in alloys and fireworks; essential for chlorophyll in plants."
  },
  {
    atomicNumber: 13, name: "Aluminium", symbol: "Al", atomicMass: 26.982,
    group: 13, period: 3, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p¹", electronConfigurationNobleGas: "[Ne] 3s² 3p¹",
    protons: 13, neutrons: 14, electrons: 13,
    electronegativity: 1.61, atomicRadius: 118, ionizationEnergy: 578,
    standardState: "solid", meltingPoint: 933.47, boilingPoint: 2792, density: 2.698,
    oxidationStates: [3], yearDiscovered: 1825,
    description: "The most abundant metal in Earth's crust, widely used in packaging and construction."
  },
  {
    atomicNumber: 14, name: "Silicon", symbol: "Si", atomicMass: 28.086,
    group: 14, period: 3, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p²", electronConfigurationNobleGas: "[Ne] 3s² 3p²",
    protons: 14, neutrons: 14, electrons: 14,
    electronegativity: 1.90, atomicRadius: 111, ionizationEnergy: 786,
    standardState: "solid", meltingPoint: 1687, boilingPoint: 3538, density: 2.3296,
    oxidationStates: [-4, 4], yearDiscovered: 1824,
    description: "A semiconductor essential for computer chips and solar cells."
  },
  {
    atomicNumber: 15, name: "Phosphorus", symbol: "P", atomicMass: 30.974,
    group: 15, period: 3, block: "p", category: "nonmetal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p³", electronConfigurationNobleGas: "[Ne] 3s² 3p³",
    protons: 15, neutrons: 16, electrons: 15,
    electronegativity: 2.19, atomicRadius: 98, ionizationEnergy: 1012,
    standardState: "solid", meltingPoint: 317.30, boilingPoint: 553.65, density: 1.82,
    oxidationStates: [-3, 3, 5], yearDiscovered: 1669,
    description: "Essential for DNA, RNA, and ATP; used in fertilizers and matches."
  },
  {
    atomicNumber: 16, name: "Sulfur", symbol: "S", atomicMass: 32.06,
    group: 16, period: 3, block: "p", category: "nonmetal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁴", electronConfigurationNobleGas: "[Ne] 3s² 3p⁴",
    protons: 16, neutrons: 16, electrons: 16,
    electronegativity: 2.58, atomicRadius: 88, ionizationEnergy: 1000,
    standardState: "solid", meltingPoint: 388.36, boilingPoint: 717.87, density: 2.067,
    oxidationStates: [-2, 2, 4, 6], yearDiscovered: "Ancient",
    description: "A yellow nonmetal essential for proteins; used in sulfuric acid production."
  },
  {
    atomicNumber: 17, name: "Chlorine", symbol: "Cl", atomicMass: 35.45,
    group: 17, period: 3, block: "p", category: "halogen",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁵", electronConfigurationNobleGas: "[Ne] 3s² 3p⁵",
    protons: 17, neutrons: 18, electrons: 17,
    electronegativity: 3.16, atomicRadius: 79, ionizationEnergy: 1251,
    standardState: "gas", meltingPoint: 171.65, boilingPoint: 239.11, density: 0.003214,
    oxidationStates: [-1, 1, 3, 5, 7], yearDiscovered: 1774,
    description: "A toxic greenish-yellow gas used for water purification and in PVC production."
  },
  {
    atomicNumber: 18, name: "Argon", symbol: "Ar", atomicMass: 39.948,
    group: 18, period: 3, block: "p", category: "noble gas",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶", electronConfigurationNobleGas: "[Ne] 3s² 3p⁶",
    protons: 18, neutrons: 22, electrons: 18,
    electronegativity: null, atomicRadius: 71, ionizationEnergy: 1521,
    standardState: "gas", meltingPoint: 83.80, boilingPoint: 87.30, density: 0.0017837,
    oxidationStates: [0], yearDiscovered: 1894,
    description: "The third most abundant gas in the atmosphere, used in welding and lighting."
  },
  {
    atomicNumber: 19, name: "Potassium", symbol: "K", atomicMass: 39.098,
    group: 1, period: 4, block: "s", category: "alkali metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹", electronConfigurationNobleGas: "[Ar] 4s¹",
    protons: 19, neutrons: 20, electrons: 19,
    electronegativity: 0.82, atomicRadius: 243, ionizationEnergy: 419,
    standardState: "solid", meltingPoint: 336.53, boilingPoint: 1032, density: 0.862,
    oxidationStates: [1], yearDiscovered: 1807,
    description: "An essential nutrient for cells; highly reactive alkali metal that reacts violently with water."
  },
  {
    atomicNumber: 20, name: "Calcium", symbol: "Ca", atomicMass: 40.078,
    group: 2, period: 4, block: "s", category: "alkaline earth metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²", electronConfigurationNobleGas: "[Ar] 4s²",
    protons: 20, neutrons: 20, electrons: 20,
    electronegativity: 1.00, atomicRadius: 194, ionizationEnergy: 590,
    standardState: "solid", meltingPoint: 1115, boilingPoint: 1757, density: 1.54,
    oxidationStates: [2], yearDiscovered: 1808,
    description: "Essential for bones and teeth; the fifth most abundant element in Earth's crust."
  },
  {
    atomicNumber: 21, name: "Scandium", symbol: "Sc", atomicMass: 44.956,
    group: 3, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹ 4s²", electronConfigurationNobleGas: "[Ar] 3d¹ 4s²",
    protons: 21, neutrons: 24, electrons: 21,
    electronegativity: 1.36, atomicRadius: 184, ionizationEnergy: 633,
    standardState: "solid", meltingPoint: 1814, boilingPoint: 3109, density: 2.989,
    oxidationStates: [3], yearDiscovered: 1879,
    description: "A rare transition metal used in aerospace alloys and high-intensity lamps."
  },
  {
    atomicNumber: 22, name: "Titanium", symbol: "Ti", atomicMass: 47.867,
    group: 4, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d² 4s²", electronConfigurationNobleGas: "[Ar] 3d² 4s²",
    protons: 22, neutrons: 26, electrons: 22,
    electronegativity: 1.54, atomicRadius: 176, ionizationEnergy: 659,
    standardState: "solid", meltingPoint: 1941, boilingPoint: 3560, density: 4.54,
    oxidationStates: [2, 3, 4], yearDiscovered: 1791,
    description: "A strong, lightweight, corrosion-resistant metal used in aerospace and medical implants."
  },
  {
    atomicNumber: 23, name: "Vanadium", symbol: "V", atomicMass: 50.942,
    group: 5, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d³ 4s²", electronConfigurationNobleGas: "[Ar] 3d³ 4s²",
    protons: 23, neutrons: 28, electrons: 23,
    electronegativity: 1.63, atomicRadius: 171, ionizationEnergy: 651,
    standardState: "solid", meltingPoint: 2183, boilingPoint: 3680, density: 6.11,
    oxidationStates: [2, 3, 4, 5], yearDiscovered: 1801,
    description: "A hard, silvery-grey metal used to strengthen steel alloys."
  },
  {
    atomicNumber: 24, name: "Chromium", symbol: "Cr", atomicMass: 51.996,
    group: 6, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹", electronConfigurationNobleGas: "[Ar] 3d⁵ 4s¹",
    protons: 24, neutrons: 28, electrons: 24,
    electronegativity: 1.66, atomicRadius: 166, ionizationEnergy: 653,
    standardState: "solid", meltingPoint: 2180, boilingPoint: 2944, density: 7.15,
    oxidationStates: [2, 3, 6], yearDiscovered: 1797,
    description: "A hard, lustrous metal used for chrome plating and in stainless steel."
  },
  {
    atomicNumber: 25, name: "Manganese", symbol: "Mn", atomicMass: 54.938,
    group: 7, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s²", electronConfigurationNobleGas: "[Ar] 3d⁵ 4s²",
    protons: 25, neutrons: 30, electrons: 25,
    electronegativity: 1.55, atomicRadius: 161, ionizationEnergy: 717,
    standardState: "solid", meltingPoint: 1519, boilingPoint: 2334, density: 7.44,
    oxidationStates: [2, 3, 4, 7], yearDiscovered: 1774,
    description: "Essential for steel production and found in many enzymes in living organisms."
  },
  {
    atomicNumber: 26, name: "Iron", symbol: "Fe", atomicMass: 55.845,
    group: 8, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²", electronConfigurationNobleGas: "[Ar] 3d⁶ 4s²",
    protons: 26, neutrons: 30, electrons: 26,
    electronegativity: 1.83, atomicRadius: 156, ionizationEnergy: 762,
    standardState: "solid", meltingPoint: 1811, boilingPoint: 3134, density: 7.874,
    oxidationStates: [2, 3], yearDiscovered: "Ancient",
    description: "The most used metal on Earth, essential for hemoglobin and steel production."
  },
  {
    atomicNumber: 27, name: "Cobalt", symbol: "Co", atomicMass: 58.933,
    group: 9, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁷ 4s²", electronConfigurationNobleGas: "[Ar] 3d⁷ 4s²",
    protons: 27, neutrons: 32, electrons: 27,
    electronegativity: 1.88, atomicRadius: 152, ionizationEnergy: 760,
    standardState: "solid", meltingPoint: 1768, boilingPoint: 3200, density: 8.86,
    oxidationStates: [2, 3], yearDiscovered: 1735,
    description: "A hard, lustrous metal used in superalloys, magnets, and lithium-ion batteries."
  },
  {
    atomicNumber: 28, name: "Nickel", symbol: "Ni", atomicMass: 58.693,
    group: 10, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸ 4s²", electronConfigurationNobleGas: "[Ar] 3d⁸ 4s²",
    protons: 28, neutrons: 30, electrons: 28,
    electronegativity: 1.91, atomicRadius: 149, ionizationEnergy: 737,
    standardState: "solid", meltingPoint: 1728, boilingPoint: 3186, density: 8.912,
    oxidationStates: [2, 3], yearDiscovered: 1751,
    description: "A corrosion-resistant metal used in coins, stainless steel, and rechargeable batteries."
  },
  {
    atomicNumber: 29, name: "Copper", symbol: "Cu", atomicMass: 63.546,
    group: 11, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s¹",
    protons: 29, neutrons: 34, electrons: 29,
    electronegativity: 1.90, atomicRadius: 145, ionizationEnergy: 745,
    standardState: "solid", meltingPoint: 1357.77, boilingPoint: 2835, density: 8.96,
    oxidationStates: [1, 2], yearDiscovered: "Ancient",
    description: "An excellent conductor of electricity and heat, used in wiring and plumbing."
  },
  {
    atomicNumber: 30, name: "Zinc", symbol: "Zn", atomicMass: 65.38,
    group: 12, period: 4, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s²",
    protons: 30, neutrons: 35, electrons: 30,
    electronegativity: 1.65, atomicRadius: 142, ionizationEnergy: 906,
    standardState: "solid", meltingPoint: 692.68, boilingPoint: 1180, density: 7.134,
    oxidationStates: [2], yearDiscovered: "Ancient",
    description: "Used to galvanize steel against corrosion and as an essential trace element in biology."
  },
  {
    atomicNumber: 31, name: "Gallium", symbol: "Ga", atomicMass: 69.723,
    group: 13, period: 4, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p¹", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s² 4p¹",
    protons: 31, neutrons: 38, electrons: 31,
    electronegativity: 1.81, atomicRadius: 136, ionizationEnergy: 579,
    standardState: "solid", meltingPoint: 302.91, boilingPoint: 2477, density: 5.907,
    oxidationStates: [3], yearDiscovered: 1875,
    description: "A soft metal that melts near room temperature, used in semiconductors and LEDs."
  },
  {
    atomicNumber: 32, name: "Germanium", symbol: "Ge", atomicMass: 72.630,
    group: 14, period: 4, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p²", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s² 4p²",
    protons: 32, neutrons: 41, electrons: 32,
    electronegativity: 2.01, atomicRadius: 125, ionizationEnergy: 762,
    standardState: "solid", meltingPoint: 1211.40, boilingPoint: 3106, density: 5.323,
    oxidationStates: [2, 4], yearDiscovered: 1886,
    description: "A semiconductor used in fiber optics, infrared optics, and transistors."
  },
  {
    atomicNumber: 33, name: "Arsenic", symbol: "As", atomicMass: 74.922,
    group: 15, period: 4, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p³", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s² 4p³",
    protons: 33, neutrons: 42, electrons: 33,
    electronegativity: 2.18, atomicRadius: 114, ionizationEnergy: 947,
    standardState: "solid", meltingPoint: 1090, boilingPoint: 887, density: 5.776,
    oxidationStates: [-3, 3, 5], yearDiscovered: "Ancient",
    description: "A toxic metalloid historically used as a poison; now used in semiconductors."
  },
  {
    atomicNumber: 34, name: "Selenium", symbol: "Se", atomicMass: 78.971,
    group: 16, period: 4, block: "p", category: "nonmetal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁴", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s² 4p⁴",
    protons: 34, neutrons: 45, electrons: 34,
    electronegativity: 2.55, atomicRadius: 103, ionizationEnergy: 941,
    standardState: "solid", meltingPoint: 494, boilingPoint: 958, density: 4.809,
    oxidationStates: [-2, 4, 6], yearDiscovered: 1817,
    description: "An essential trace element used in photocopiers and solar cells."
  },
  {
    atomicNumber: 35, name: "Bromine", symbol: "Br", atomicMass: 79.904,
    group: 17, period: 4, block: "p", category: "halogen",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁵", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s² 4p⁵",
    protons: 35, neutrons: 45, electrons: 35,
    electronegativity: 2.96, atomicRadius: 94, ionizationEnergy: 1140,
    standardState: "liquid", meltingPoint: 265.80, boilingPoint: 332.00, density: 3.122,
    oxidationStates: [-1, 1, 3, 5], yearDiscovered: 1826,
    description: "One of only two elements that are liquid at room temperature; used in flame retardants."
  },
  {
    atomicNumber: 36, name: "Krypton", symbol: "Kr", atomicMass: 83.798,
    group: 18, period: 4, block: "p", category: "noble gas",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶", electronConfigurationNobleGas: "[Ar] 3d¹⁰ 4s² 4p⁶",
    protons: 36, neutrons: 48, electrons: 36,
    electronegativity: 3.00, atomicRadius: 88, ionizationEnergy: 1351,
    standardState: "gas", meltingPoint: 115.79, boilingPoint: 119.93, density: 0.003733,
    oxidationStates: [0, 2], yearDiscovered: 1898,
    description: "A noble gas used in photographic flashes and some fluorescent lamps."
  },
  {
    atomicNumber: 37, name: "Rubidium", symbol: "Rb", atomicMass: 85.468,
    group: 1, period: 5, block: "s", category: "alkali metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s¹", electronConfigurationNobleGas: "[Kr] 5s¹",
    protons: 37, neutrons: 48, electrons: 37,
    electronegativity: 0.82, atomicRadius: 265, ionizationEnergy: 403,
    standardState: "solid", meltingPoint: 312.46, boilingPoint: 961, density: 1.532,
    oxidationStates: [1], yearDiscovered: 1861,
    description: "A soft, silvery alkali metal used in atomic clocks and specialty glass."
  },
  {
    atomicNumber: 38, name: "Strontium", symbol: "Sr", atomicMass: 87.62,
    group: 2, period: 5, block: "s", category: "alkaline earth metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 5s²", electronConfigurationNobleGas: "[Kr] 5s²",
    protons: 38, neutrons: 50, electrons: 38,
    electronegativity: 0.95, atomicRadius: 219, ionizationEnergy: 549,
    standardState: "solid", meltingPoint: 1050, boilingPoint: 1655, density: 2.64,
    oxidationStates: [2], yearDiscovered: 1790,
    description: "Produces brilliant red flames in fireworks and flares."
  },
  {
    atomicNumber: 39, name: "Yttrium", symbol: "Y", atomicMass: 88.906,
    group: 3, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹ 5s²", electronConfigurationNobleGas: "[Kr] 4d¹ 5s²",
    protons: 39, neutrons: 50, electrons: 39,
    electronegativity: 1.22, atomicRadius: 212, ionizationEnergy: 600,
    standardState: "solid", meltingPoint: 1799, boilingPoint: 3609, density: 4.469,
    oxidationStates: [3], yearDiscovered: 1794,
    description: "Used in LEDs, superconductors, and as a component in camera lenses."
  },
  {
    atomicNumber: 40, name: "Zirconium", symbol: "Zr", atomicMass: 91.224,
    group: 4, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d² 5s²", electronConfigurationNobleGas: "[Kr] 4d² 5s²",
    protons: 40, neutrons: 51, electrons: 40,
    electronegativity: 1.33, atomicRadius: 206, ionizationEnergy: 640,
    standardState: "solid", meltingPoint: 2128, boilingPoint: 4682, density: 6.506,
    oxidationStates: [4], yearDiscovered: 1789,
    description: "Highly resistant to corrosion; used in nuclear reactors and surgical instruments."
  },
  {
    atomicNumber: 41, name: "Niobium", symbol: "Nb", atomicMass: 92.906,
    group: 5, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁴ 5s¹", electronConfigurationNobleGas: "[Kr] 4d⁴ 5s¹",
    protons: 41, neutrons: 52, electrons: 41,
    electronegativity: 1.60, atomicRadius: 198, ionizationEnergy: 652,
    standardState: "solid", meltingPoint: 2750, boilingPoint: 5017, density: 8.57,
    oxidationStates: [3, 5], yearDiscovered: 1801,
    description: "A superconducting metal used in MRI magnets and jet engines."
  },
  {
    atomicNumber: 42, name: "Molybdenum", symbol: "Mo", atomicMass: 95.95,
    group: 6, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s¹", electronConfigurationNobleGas: "[Kr] 4d⁵ 5s¹",
    protons: 42, neutrons: 54, electrons: 42,
    electronegativity: 2.16, atomicRadius: 190, ionizationEnergy: 684,
    standardState: "solid", meltingPoint: 2896, boilingPoint: 4912, density: 10.22,
    oxidationStates: [2, 3, 4, 5, 6], yearDiscovered: 1781,
    description: "A high-melting-point metal used in high-strength steel alloys."
  },
  {
    atomicNumber: 43, name: "Technetium", symbol: "Tc", atomicMass: 98,
    group: 7, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁵ 5s²", electronConfigurationNobleGas: "[Kr] 4d⁵ 5s²",
    protons: 43, neutrons: 55, electrons: 43,
    electronegativity: 1.90, atomicRadius: 183, ionizationEnergy: 702,
    standardState: "solid", meltingPoint: 2430, boilingPoint: 4538, density: 11.5,
    oxidationStates: [4, 7], yearDiscovered: 1937,
    description: "The first artificially produced element; used in medical imaging."
  },
  {
    atomicNumber: 44, name: "Ruthenium", symbol: "Ru", atomicMass: 101.07,
    group: 8, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁷ 5s¹", electronConfigurationNobleGas: "[Kr] 4d⁷ 5s¹",
    protons: 44, neutrons: 57, electrons: 44,
    electronegativity: 2.20, atomicRadius: 178, ionizationEnergy: 710,
    standardState: "solid", meltingPoint: 2607, boilingPoint: 4423, density: 12.37,
    oxidationStates: [2, 3, 4, 6, 8], yearDiscovered: 1844,
    description: "A rare platinum group metal used in electrical contacts and catalysts."
  },
  {
    atomicNumber: 45, name: "Rhodium", symbol: "Rh", atomicMass: 102.91,
    group: 9, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d⁸ 5s¹", electronConfigurationNobleGas: "[Kr] 4d⁸ 5s¹",
    protons: 45, neutrons: 58, electrons: 45,
    electronegativity: 2.28, atomicRadius: 173, ionizationEnergy: 720,
    standardState: "solid", meltingPoint: 2237, boilingPoint: 3968, density: 12.41,
    oxidationStates: [3], yearDiscovered: 1803,
    description: "One of the rarest and most valuable precious metals; used in catalytic converters."
  },
  {
    atomicNumber: 46, name: "Palladium", symbol: "Pd", atomicMass: 106.42,
    group: 10, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰", electronConfigurationNobleGas: "[Kr] 4d¹⁰",
    protons: 46, neutrons: 60, electrons: 46,
    electronegativity: 2.20, atomicRadius: 169, ionizationEnergy: 804,
    standardState: "solid", meltingPoint: 1828.05, boilingPoint: 3236, density: 12.02,
    oxidationStates: [2, 4], yearDiscovered: 1803,
    description: "A precious metal used in catalytic converters, electronics, and jewelry."
  },
  {
    atomicNumber: 47, name: "Silver", symbol: "Ag", atomicMass: 107.87,
    group: 11, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s¹", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s¹",
    protons: 47, neutrons: 61, electrons: 47,
    electronegativity: 1.93, atomicRadius: 165, ionizationEnergy: 731,
    standardState: "solid", meltingPoint: 1234.93, boilingPoint: 2435, density: 10.501,
    oxidationStates: [1], yearDiscovered: "Ancient",
    description: "The best conductor of electricity; used in jewelry, photography, and electronics."
  },
  {
    atomicNumber: 48, name: "Cadmium", symbol: "Cd", atomicMass: 112.41,
    group: 12, period: 5, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s²", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s²",
    protons: 48, neutrons: 64, electrons: 48,
    electronegativity: 1.69, atomicRadius: 161, ionizationEnergy: 868,
    standardState: "solid", meltingPoint: 594.22, boilingPoint: 1040, density: 8.69,
    oxidationStates: [2], yearDiscovered: 1817,
    description: "A toxic heavy metal formerly used in batteries and pigments."
  },
  {
    atomicNumber: 49, name: "Indium", symbol: "In", atomicMass: 114.82,
    group: 13, period: 5, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p¹", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s² 5p¹",
    protons: 49, neutrons: 66, electrons: 49,
    electronegativity: 1.78, atomicRadius: 156, ionizationEnergy: 558,
    standardState: "solid", meltingPoint: 429.75, boilingPoint: 2345, density: 7.31,
    oxidationStates: [3], yearDiscovered: 1863,
    description: "A soft metal used in touchscreens (as indium tin oxide) and solders."
  },
  {
    atomicNumber: 50, name: "Tin", symbol: "Sn", atomicMass: 118.71,
    group: 14, period: 5, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p²", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s² 5p²",
    protons: 50, neutrons: 69, electrons: 50,
    electronegativity: 1.96, atomicRadius: 145, ionizationEnergy: 709,
    standardState: "solid", meltingPoint: 505.08, boilingPoint: 2875, density: 7.287,
    oxidationStates: [2, 4], yearDiscovered: "Ancient",
    description: "Known since ancient times; used in tin cans, solder, and bronze alloys."
  },
  {
    atomicNumber: 51, name: "Antimony", symbol: "Sb", atomicMass: 121.76,
    group: 15, period: 5, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p³", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s² 5p³",
    protons: 51, neutrons: 71, electrons: 51,
    electronegativity: 2.05, atomicRadius: 133, ionizationEnergy: 834,
    standardState: "solid", meltingPoint: 903.78, boilingPoint: 1860, density: 6.685,
    oxidationStates: [-3, 3, 5], yearDiscovered: "Ancient",
    description: "A metalloid used in flame retardants, batteries, and semiconductor devices."
  },
  {
    atomicNumber: 52, name: "Tellurium", symbol: "Te", atomicMass: 127.60,
    group: 16, period: 5, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁴", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s² 5p⁴",
    protons: 52, neutrons: 76, electrons: 52,
    electronegativity: 2.10, atomicRadius: 123, ionizationEnergy: 869,
    standardState: "solid", meltingPoint: 722.66, boilingPoint: 1261, density: 6.232,
    oxidationStates: [-2, 2, 4, 6], yearDiscovered: 1783,
    description: "A rare metalloid used in solar panels and thermoelectric devices."
  },
  {
    atomicNumber: 53, name: "Iodine", symbol: "I", atomicMass: 126.90,
    group: 17, period: 5, block: "p", category: "halogen",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁵", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s² 5p⁵",
    protons: 53, neutrons: 74, electrons: 53,
    electronegativity: 2.66, atomicRadius: 115, ionizationEnergy: 1008,
    standardState: "solid", meltingPoint: 386.85, boilingPoint: 457.55, density: 4.93,
    oxidationStates: [-1, 1, 3, 5, 7], yearDiscovered: 1811,
    description: "Essential for thyroid hormones; used as a disinfectant and in photography."
  },
  {
    atomicNumber: 54, name: "Xenon", symbol: "Xe", atomicMass: 131.29,
    group: 18, period: 5, block: "p", category: "noble gas",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶", electronConfigurationNobleGas: "[Kr] 4d¹⁰ 5s² 5p⁶",
    protons: 54, neutrons: 77, electrons: 54,
    electronegativity: 2.60, atomicRadius: 108, ionizationEnergy: 1170,
    standardState: "gas", meltingPoint: 161.36, boilingPoint: 165.03, density: 0.005887,
    oxidationStates: [0, 2, 4, 6], yearDiscovered: 1898,
    description: "A noble gas used in flash lamps, ion propulsion, and medical imaging."
  },
  {
    atomicNumber: 55, name: "Caesium", symbol: "Cs", atomicMass: 132.91,
    group: 1, period: 6, block: "s", category: "alkali metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s¹", electronConfigurationNobleGas: "[Xe] 6s¹",
    protons: 55, neutrons: 78, electrons: 55,
    electronegativity: 0.79, atomicRadius: 298, ionizationEnergy: 376,
    standardState: "solid", meltingPoint: 301.59, boilingPoint: 944, density: 1.873,
    oxidationStates: [1], yearDiscovered: 1860,
    description: "The most electropositive stable element; used in atomic clocks that define the second."
  },
  {
    atomicNumber: 56, name: "Barium", symbol: "Ba", atomicMass: 137.33,
    group: 2, period: 6, block: "s", category: "alkaline earth metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 6s²",
    protons: 56, neutrons: 81, electrons: 56,
    electronegativity: 0.89, atomicRadius: 253, ionizationEnergy: 503,
    standardState: "solid", meltingPoint: 1000, boilingPoint: 2170, density: 3.594,
    oxidationStates: [2], yearDiscovered: 1808,
    description: "Used in medical X-ray imaging (barium meal) and in fireworks for green color."
  },
  {
    atomicNumber: 57, name: "Lanthanum", symbol: "La", atomicMass: 138.91,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 5d¹ 6s²", electronConfigurationNobleGas: "[Xe] 5d¹ 6s²",
    protons: 57, neutrons: 82, electrons: 57,
    electronegativity: 1.10, atomicRadius: 195, ionizationEnergy: 538,
    standardState: "solid", meltingPoint: 1193, boilingPoint: 3737, density: 6.145,
    oxidationStates: [3], yearDiscovered: 1839,
    description: "The first lanthanide, used in camera lenses and catalytic converters."
  },
  {
    atomicNumber: 58, name: "Cerium", symbol: "Ce", atomicMass: 140.12,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹ 5s² 5p⁶ 5d¹ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹ 5d¹ 6s²",
    protons: 58, neutrons: 82, electrons: 58,
    electronegativity: 1.12, atomicRadius: 185, ionizationEnergy: 534,
    standardState: "solid", meltingPoint: 1068, boilingPoint: 3716, density: 6.77,
    oxidationStates: [3, 4], yearDiscovered: 1803,
    description: "The most abundant rare earth element; used in catalytic converters and glass polishing."
  },
  {
    atomicNumber: 59, name: "Praseodymium", symbol: "Pr", atomicMass: 140.91,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f³ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f³ 6s²",
    protons: 59, neutrons: 82, electrons: 59,
    electronegativity: 1.13, atomicRadius: 247, ionizationEnergy: 527,
    standardState: "solid", meltingPoint: 1208, boilingPoint: 3793, density: 6.773,
    oxidationStates: [3, 4], yearDiscovered: 1885,
    description: "Used in strong permanent magnets and to create yellow-green glass."
  },
  {
    atomicNumber: 60, name: "Neodymium", symbol: "Nd", atomicMass: 144.24,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁴ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f⁴ 6s²",
    protons: 60, neutrons: 84, electrons: 60,
    electronegativity: 1.14, atomicRadius: 206, ionizationEnergy: 533,
    standardState: "solid", meltingPoint: 1297, boilingPoint: 3347, density: 7.007,
    oxidationStates: [3], yearDiscovered: 1885,
    description: "Used in the strongest permanent magnets (NdFeB) found in headphones and motors."
  },
  {
    atomicNumber: 61, name: "Promethium", symbol: "Pm", atomicMass: 145,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁵ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f⁵ 6s²",
    protons: 61, neutrons: 84, electrons: 61,
    electronegativity: 1.13, atomicRadius: 205, ionizationEnergy: 540,
    standardState: "solid", meltingPoint: 1315, boilingPoint: 3273, density: 7.26,
    oxidationStates: [3], yearDiscovered: 1945,
    description: "A radioactive rare earth element; all isotopes are unstable."
  },
  {
    atomicNumber: 62, name: "Samarium", symbol: "Sm", atomicMass: 150.36,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁶ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f⁶ 6s²",
    protons: 62, neutrons: 88, electrons: 62,
    electronegativity: 1.17, atomicRadius: 238, ionizationEnergy: 545,
    standardState: "solid", meltingPoint: 1345, boilingPoint: 2067, density: 7.52,
    oxidationStates: [2, 3], yearDiscovered: 1879,
    description: "Used in samarium-cobalt magnets and in nuclear reactor control rods."
  },
  {
    atomicNumber: 63, name: "Europium", symbol: "Eu", atomicMass: 151.96,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁷ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f⁷ 6s²",
    protons: 63, neutrons: 89, electrons: 63,
    electronegativity: 1.20, atomicRadius: 231, ionizationEnergy: 547,
    standardState: "solid", meltingPoint: 1099, boilingPoint: 1802, density: 5.243,
    oxidationStates: [2, 3], yearDiscovered: 1901,
    description: "The most reactive rare earth; used in red phosphors for TVs and Euro banknote security."
  },
  {
    atomicNumber: 64, name: "Gadolinium", symbol: "Gd", atomicMass: 157.25,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁷ 5s² 5p⁶ 5d¹ 6s²", electronConfigurationNobleGas: "[Xe] 4f⁷ 5d¹ 6s²",
    protons: 64, neutrons: 93, electrons: 64,
    electronegativity: 1.20, atomicRadius: 233, ionizationEnergy: 593,
    standardState: "solid", meltingPoint: 1585, boilingPoint: 3546, density: 7.895,
    oxidationStates: [3], yearDiscovered: 1880,
    description: "Used as MRI contrast agent and has unusual magnetic properties."
  },
  {
    atomicNumber: 65, name: "Terbium", symbol: "Tb", atomicMass: 158.93,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f⁹ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f⁹ 6s²",
    protons: 65, neutrons: 94, electrons: 65,
    electronegativity: 1.20, atomicRadius: 225, ionizationEnergy: 566,
    standardState: "solid", meltingPoint: 1629, boilingPoint: 3503, density: 8.229,
    oxidationStates: [3, 4], yearDiscovered: 1843,
    description: "Used in green phosphors for displays and in solid-state devices."
  },
  {
    atomicNumber: 66, name: "Dysprosium", symbol: "Dy", atomicMass: 162.50,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁰ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁰ 6s²",
    protons: 66, neutrons: 97, electrons: 66,
    electronegativity: 1.22, atomicRadius: 228, ionizationEnergy: 573,
    standardState: "solid", meltingPoint: 1680, boilingPoint: 2840, density: 8.55,
    oxidationStates: [3], yearDiscovered: 1886,
    description: "Used in neodymium magnets to improve high-temperature performance."
  },
  {
    atomicNumber: 67, name: "Holmium", symbol: "Ho", atomicMass: 164.93,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹¹ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹¹ 6s²",
    protons: 67, neutrons: 98, electrons: 67,
    electronegativity: 1.23, atomicRadius: 226, ionizationEnergy: 581,
    standardState: "solid", meltingPoint: 1734, boilingPoint: 2993, density: 8.795,
    oxidationStates: [3], yearDiscovered: 1878,
    description: "Has the highest magnetic moment of any element; used in medical lasers."
  },
  {
    atomicNumber: 68, name: "Erbium", symbol: "Er", atomicMass: 167.26,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹² 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹² 6s²",
    protons: 68, neutrons: 99, electrons: 68,
    electronegativity: 1.24, atomicRadius: 226, ionizationEnergy: 589,
    standardState: "solid", meltingPoint: 1802, boilingPoint: 3141, density: 9.066,
    oxidationStates: [3], yearDiscovered: 1842,
    description: "Used to amplify signals in fiber optic cables and to color glass pink."
  },
  {
    atomicNumber: 69, name: "Thulium", symbol: "Tm", atomicMass: 168.93,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹³ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹³ 6s²",
    protons: 69, neutrons: 100, electrons: 69,
    electronegativity: 1.25, atomicRadius: 222, ionizationEnergy: 597,
    standardState: "solid", meltingPoint: 1818, boilingPoint: 2223, density: 9.321,
    oxidationStates: [2, 3], yearDiscovered: 1879,
    description: "The rarest naturally occurring lanthanide; used in portable X-ray devices."
  },
  {
    atomicNumber: 70, name: "Ytterbium", symbol: "Yb", atomicMass: 173.05,
    group: null, period: 6, block: "f", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 6s²",
    protons: 70, neutrons: 103, electrons: 70,
    electronegativity: 1.10, atomicRadius: 222, ionizationEnergy: 603,
    standardState: "solid", meltingPoint: 1097, boilingPoint: 1469, density: 6.965,
    oxidationStates: [2, 3], yearDiscovered: 1878,
    description: "Used in improving stainless steel grain refinement and in atomic clocks."
  },
  {
    atomicNumber: 71, name: "Lutetium", symbol: "Lu", atomicMass: 174.97,
    group: null, period: 6, block: "d", category: "lanthanide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹ 6s²",
    protons: 71, neutrons: 104, electrons: 71,
    electronegativity: 1.27, atomicRadius: 217, ionizationEnergy: 524,
    standardState: "solid", meltingPoint: 1925, boilingPoint: 3675, density: 9.84,
    oxidationStates: [3], yearDiscovered: 1907,
    description: "The last lanthanide; used in PET scan detectors and petroleum cracking catalysts."
  },
  {
    atomicNumber: 72, name: "Hafnium", symbol: "Hf", atomicMass: 178.49,
    group: 4, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d² 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d² 6s²",
    protons: 72, neutrons: 106, electrons: 72,
    electronegativity: 1.30, atomicRadius: 208, ionizationEnergy: 659,
    standardState: "solid", meltingPoint: 2506, boilingPoint: 4876, density: 13.31,
    oxidationStates: [4], yearDiscovered: 1923,
    description: "Used in nuclear control rods and high-temperature alloys."
  },
  {
    atomicNumber: 73, name: "Tantalum", symbol: "Ta", atomicMass: 180.95,
    group: 5, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d³ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d³ 6s²",
    protons: 73, neutrons: 108, electrons: 73,
    electronegativity: 1.50, atomicRadius: 200, ionizationEnergy: 761,
    standardState: "solid", meltingPoint: 3290, boilingPoint: 5731, density: 16.654,
    oxidationStates: [5], yearDiscovered: 1802,
    description: "A corrosion-resistant metal used in electronic capacitors and surgical instruments."
  },
  {
    atomicNumber: 74, name: "Tungsten", symbol: "W", atomicMass: 183.84,
    group: 6, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁴ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d⁴ 6s²",
    protons: 74, neutrons: 110, electrons: 74,
    electronegativity: 2.36, atomicRadius: 193, ionizationEnergy: 770,
    standardState: "solid", meltingPoint: 3695, boilingPoint: 5828, density: 19.25,
    oxidationStates: [2, 4, 6], yearDiscovered: 1783,
    description: "Has the highest melting point of all elements; used in light bulb filaments."
  },
  {
    atomicNumber: 75, name: "Rhenium", symbol: "Re", atomicMass: 186.21,
    group: 7, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁵ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d⁵ 6s²",
    protons: 75, neutrons: 111, electrons: 75,
    electronegativity: 1.90, atomicRadius: 188, ionizationEnergy: 760,
    standardState: "solid", meltingPoint: 3459, boilingPoint: 5869, density: 21.02,
    oxidationStates: [4, 7], yearDiscovered: 1925,
    description: "One of the rarest elements in Earth's crust; used in jet engine superalloys."
  },
  {
    atomicNumber: 76, name: "Osmium", symbol: "Os", atomicMass: 190.23,
    group: 8, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁶ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d⁶ 6s²",
    protons: 76, neutrons: 114, electrons: 76,
    electronegativity: 2.20, atomicRadius: 185, ionizationEnergy: 840,
    standardState: "solid", meltingPoint: 3306, boilingPoint: 5285, density: 22.587,
    oxidationStates: [2, 3, 4, 8], yearDiscovered: 1803,
    description: "The densest naturally occurring element; used in fountain pen nibs and electrical contacts."
  },
  {
    atomicNumber: 77, name: "Iridium", symbol: "Ir", atomicMass: 192.22,
    group: 9, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁷ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d⁷ 6s²",
    protons: 77, neutrons: 115, electrons: 77,
    electronegativity: 2.20, atomicRadius: 180, ionizationEnergy: 880,
    standardState: "solid", meltingPoint: 2719, boilingPoint: 4701, density: 22.562,
    oxidationStates: [3, 4], yearDiscovered: 1803,
    description: "The most corrosion-resistant metal; anomalous iridium layer linked to dinosaur extinction."
  },
  {
    atomicNumber: 78, name: "Platinum", symbol: "Pt", atomicMass: 195.08,
    group: 10, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d⁹ 6s¹", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    protons: 78, neutrons: 117, electrons: 78,
    electronegativity: 2.28, atomicRadius: 177, ionizationEnergy: 870,
    standardState: "solid", meltingPoint: 2041.40, boilingPoint: 4098, density: 21.46,
    oxidationStates: [2, 4], yearDiscovered: 1735,
    description: "A precious metal used in catalytic converters, jewelry, and anticancer drugs."
  },
  {
    atomicNumber: 79, name: "Gold", symbol: "Au", atomicMass: 196.97,
    group: 11, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s¹", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    protons: 79, neutrons: 118, electrons: 79,
    electronegativity: 2.54, atomicRadius: 174, ionizationEnergy: 890,
    standardState: "solid", meltingPoint: 1337.33, boilingPoint: 3129, density: 19.282,
    oxidationStates: [1, 3], yearDiscovered: "Ancient",
    description: "A precious metal prized for its beauty and resistance to corrosion since antiquity."
  },
  {
    atomicNumber: 80, name: "Mercury", symbol: "Hg", atomicMass: 200.59,
    group: 12, period: 6, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    protons: 80, neutrons: 121, electrons: 80,
    electronegativity: 2.00, atomicRadius: 171, ionizationEnergy: 1007,
    standardState: "liquid", meltingPoint: 234.32, boilingPoint: 629.88, density: 13.5336,
    oxidationStates: [1, 2], yearDiscovered: "Ancient",
    description: "The only metal liquid at room temperature; formerly used in thermometers."
  },
  {
    atomicNumber: 81, name: "Thallium", symbol: "Tl", atomicMass: 204.38,
    group: 13, period: 6, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p¹", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    protons: 81, neutrons: 123, electrons: 81,
    electronegativity: 1.62, atomicRadius: 156, ionizationEnergy: 589,
    standardState: "solid", meltingPoint: 577, boilingPoint: 1746, density: 11.85,
    oxidationStates: [1, 3], yearDiscovered: 1861,
    description: "A highly toxic heavy metal; historically used as a rat poison."
  },
  {
    atomicNumber: 82, name: "Lead", symbol: "Pb", atomicMass: 207.2,
    group: 14, period: 6, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p²", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    protons: 82, neutrons: 125, electrons: 82,
    electronegativity: 2.33, atomicRadius: 154, ionizationEnergy: 716,
    standardState: "solid", meltingPoint: 600.61, boilingPoint: 2022, density: 11.342,
    oxidationStates: [2, 4], yearDiscovered: "Ancient",
    description: "A dense, toxic metal once widely used in pipes and paint; now used in batteries."
  },
  {
    atomicNumber: 83, name: "Bismuth", symbol: "Bi", atomicMass: 208.98,
    group: 15, period: 6, block: "p", category: "post-transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p³", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    protons: 83, neutrons: 126, electrons: 83,
    electronegativity: 2.02, atomicRadius: 143, ionizationEnergy: 703,
    standardState: "solid", meltingPoint: 544.55, boilingPoint: 1837, density: 9.807,
    oxidationStates: [3, 5], yearDiscovered: 1753,
    description: "Forms beautiful rainbow-colored crystals; used in Pepto-Bismol and cosmetics."
  },
  {
    atomicNumber: 84, name: "Polonium", symbol: "Po", atomicMass: 209,
    group: 16, period: 6, block: "p", category: "metalloid",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁴", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    protons: 84, neutrons: 125, electrons: 84,
    electronegativity: 2.00, atomicRadius: 135, ionizationEnergy: 812,
    standardState: "solid", meltingPoint: 527, boilingPoint: 1235, density: 9.32,
    oxidationStates: [-2, 2, 4, 6], yearDiscovered: 1898,
    description: "A highly radioactive element discovered by Marie Curie; used in antistatic devices."
  },
  {
    atomicNumber: 85, name: "Astatine", symbol: "At", atomicMass: 210,
    group: 17, period: 6, block: "p", category: "halogen",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁵", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    protons: 85, neutrons: 125, electrons: 85,
    electronegativity: 2.20, atomicRadius: 127, ionizationEnergy: 920,
    standardState: "solid", meltingPoint: 575, boilingPoint: 610, density: null,
    oxidationStates: [-1, 1, 3, 5], yearDiscovered: 1940,
    description: "The rarest naturally occurring element on Earth; highly radioactive halogen."
  },
  {
    atomicNumber: 86, name: "Radon", symbol: "Rn", atomicMass: 222,
    group: 18, period: 6, block: "p", category: "noble gas",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶", electronConfigurationNobleGas: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    protons: 86, neutrons: 136, electrons: 86,
    electronegativity: null, atomicRadius: 120, ionizationEnergy: 1037,
    standardState: "gas", meltingPoint: 202, boilingPoint: 211.45, density: 0.00973,
    oxidationStates: [0], yearDiscovered: 1900,
    description: "A radioactive noble gas that seeps from soil; a health hazard in poorly ventilated buildings."
  },
  {
    atomicNumber: 87, name: "Francium", symbol: "Fr", atomicMass: 223,
    group: 1, period: 7, block: "s", category: "alkali metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 7s¹", electronConfigurationNobleGas: "[Rn] 7s¹",
    protons: 87, neutrons: 136, electrons: 87,
    electronegativity: 0.70, atomicRadius: 348, ionizationEnergy: 380,
    standardState: "solid", meltingPoint: 300, boilingPoint: 950, density: null,
    oxidationStates: [1], yearDiscovered: 1939,
    description: "The second rarest natural element; extremely radioactive with a half-life of 22 minutes."
  },
  {
    atomicNumber: 88, name: "Radium", symbol: "Ra", atomicMass: 226,
    group: 2, period: 7, block: "s", category: "alkaline earth metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 7s²",
    protons: 88, neutrons: 138, electrons: 88,
    electronegativity: 0.90, atomicRadius: 283, ionizationEnergy: 509,
    standardState: "solid", meltingPoint: 973, boilingPoint: 2010, density: 5.5,
    oxidationStates: [2], yearDiscovered: 1898,
    description: "A radioactive element discovered by the Curies; formerly used in luminous paint."
  },
  {
    atomicNumber: 89, name: "Actinium", symbol: "Ac", atomicMass: 227,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d¹ 7s²", electronConfigurationNobleGas: "[Rn] 6d¹ 7s²",
    protons: 89, neutrons: 138, electrons: 89,
    electronegativity: 1.10, atomicRadius: 260, ionizationEnergy: 499,
    standardState: "solid", meltingPoint: 1323, boilingPoint: 3471, density: 10.07,
    oxidationStates: [3], yearDiscovered: 1899,
    description: "A radioactive element that glows blue in the dark; used in radiation therapy research."
  },
  {
    atomicNumber: 90, name: "Thorium", symbol: "Th", atomicMass: 232.04,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 6s² 6p⁶ 6d² 7s²", electronConfigurationNobleGas: "[Rn] 6d² 7s²",
    protons: 90, neutrons: 142, electrons: 90,
    electronegativity: 1.30, atomicRadius: 237, ionizationEnergy: 587,
    standardState: "solid", meltingPoint: 2115, boilingPoint: 5061, density: 11.72,
    oxidationStates: [4], yearDiscovered: 1829,
    description: "A potential nuclear fuel; more abundant than uranium and produces less waste."
  },
  {
    atomicNumber: 91, name: "Protactinium", symbol: "Pa", atomicMass: 231.04,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f² 6s² 6p⁶ 6d¹ 7s²", electronConfigurationNobleGas: "[Rn] 5f² 6d¹ 7s²",
    protons: 91, neutrons: 140, electrons: 91,
    electronegativity: 1.50, atomicRadius: 243, ionizationEnergy: 568,
    standardState: "solid", meltingPoint: 1841, boilingPoint: 4300, density: 15.37,
    oxidationStates: [4, 5], yearDiscovered: 1913,
    description: "A rare, radioactive actinide; one of the rarest and most expensive natural elements."
  },
  {
    atomicNumber: 92, name: "Uranium", symbol: "U", atomicMass: 238.03,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f³ 6s² 6p⁶ 6d¹ 7s²", electronConfigurationNobleGas: "[Rn] 5f³ 6d¹ 7s²",
    protons: 92, neutrons: 146, electrons: 92,
    electronegativity: 1.38, atomicRadius: 240, ionizationEnergy: 598,
    standardState: "solid", meltingPoint: 1405.30, boilingPoint: 4404, density: 18.95,
    oxidationStates: [3, 4, 5, 6], yearDiscovered: 1789,
    description: "The primary fuel for nuclear power plants and the heaviest naturally abundant element."
  },
  {
    atomicNumber: 93, name: "Neptunium", symbol: "Np", atomicMass: 237,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁴ 6s² 6p⁶ 6d¹ 7s²", electronConfigurationNobleGas: "[Rn] 5f⁴ 6d¹ 7s²",
    protons: 93, neutrons: 144, electrons: 93,
    electronegativity: 1.36, atomicRadius: 221, ionizationEnergy: 605,
    standardState: "solid", meltingPoint: 917, boilingPoint: 4273, density: 20.45,
    oxidationStates: [3, 4, 5, 6, 7], yearDiscovered: 1940,
    description: "The first transuranic element; named after the planet Neptune."
  },
  {
    atomicNumber: 94, name: "Plutonium", symbol: "Pu", atomicMass: 244,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁶ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f⁶ 7s²",
    protons: 94, neutrons: 150, electrons: 94,
    electronegativity: 1.28, atomicRadius: 243, ionizationEnergy: 585,
    standardState: "solid", meltingPoint: 912.50, boilingPoint: 3501, density: 19.84,
    oxidationStates: [3, 4, 5, 6, 7], yearDiscovered: 1940,
    description: "Used in nuclear weapons and as fuel for space probes; extremely toxic."
  },
  {
    atomicNumber: 95, name: "Americium", symbol: "Am", atomicMass: 243,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁷ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f⁷ 7s²",
    protons: 95, neutrons: 148, electrons: 95,
    electronegativity: 1.30, atomicRadius: 244, ionizationEnergy: 578,
    standardState: "solid", meltingPoint: 1449, boilingPoint: 2880, density: 13.69,
    oxidationStates: [3, 4, 5, 6], yearDiscovered: 1944,
    description: "Found in household smoke detectors; named after the Americas."
  },
  {
    atomicNumber: 96, name: "Curium", symbol: "Cm", atomicMass: 247,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁷ 6s² 6p⁶ 6d¹ 7s²", electronConfigurationNobleGas: "[Rn] 5f⁷ 6d¹ 7s²",
    protons: 96, neutrons: 151, electrons: 96,
    electronegativity: 1.30, atomicRadius: 245, ionizationEnergy: 581,
    standardState: "solid", meltingPoint: 1613, boilingPoint: 3383, density: 13.51,
    oxidationStates: [3, 4], yearDiscovered: 1944,
    description: "Named after Marie and Pierre Curie; used as a power source in space missions."
  },
  {
    atomicNumber: 97, name: "Berkelium", symbol: "Bk", atomicMass: 247,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f⁹ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f⁹ 7s²",
    protons: 97, neutrons: 150, electrons: 97,
    electronegativity: 1.30, atomicRadius: 244, ionizationEnergy: 601,
    standardState: "solid", meltingPoint: 1259, boilingPoint: 2900, density: 14.79,
    oxidationStates: [3, 4], yearDiscovered: 1949,
    description: "Named after Berkeley, California; produced in very small quantities for research."
  },
  {
    atomicNumber: 98, name: "Californium", symbol: "Cf", atomicMass: 251,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁰ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁰ 7s²",
    protons: 98, neutrons: 153, electrons: 98,
    electronegativity: 1.30, atomicRadius: 245, ionizationEnergy: 608,
    standardState: "solid", meltingPoint: 1173, boilingPoint: 1743, density: 15.1,
    oxidationStates: [2, 3, 4], yearDiscovered: 1950,
    description: "Used as a neutron source for detecting gold and silver ores and in cancer treatment."
  },
  {
    atomicNumber: 99, name: "Einsteinium", symbol: "Es", atomicMass: 252,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹¹ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹¹ 7s²",
    protons: 99, neutrons: 153, electrons: 99,
    electronegativity: 1.30, atomicRadius: 245, ionizationEnergy: 619,
    standardState: "solid", meltingPoint: 1133, boilingPoint: 1269, density: 8.84,
    oxidationStates: [2, 3], yearDiscovered: 1952,
    description: "Named after Albert Einstein; first identified in debris from a hydrogen bomb test."
  },
  {
    atomicNumber: 100, name: "Fermium", symbol: "Fm", atomicMass: 257,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹² 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹² 7s²",
    protons: 100, neutrons: 157, electrons: 100,
    electronegativity: 1.30, atomicRadius: null, ionizationEnergy: 627,
    standardState: "solid", meltingPoint: 1800, boilingPoint: null, density: null,
    oxidationStates: [2, 3], yearDiscovered: 1952,
    description: "Named after Enrico Fermi; can only be produced in particle accelerators or nuclear explosions."
  },
  {
    atomicNumber: 101, name: "Mendelevium", symbol: "Md", atomicMass: 258,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹³ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹³ 7s²",
    protons: 101, neutrons: 157, electrons: 101,
    electronegativity: 1.30, atomicRadius: null, ionizationEnergy: 635,
    standardState: "solid", meltingPoint: 1100, boilingPoint: null, density: null,
    oxidationStates: [2, 3], yearDiscovered: 1955,
    description: "Named after Dmitri Mendeleev, creator of the periodic table."
  },
  {
    atomicNumber: 102, name: "Nobelium", symbol: "No", atomicMass: 259,
    group: null, period: 7, block: "f", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 7s²",
    protons: 102, neutrons: 157, electrons: 102,
    electronegativity: 1.30, atomicRadius: null, ionizationEnergy: 642,
    standardState: "solid", meltingPoint: 1100, boilingPoint: null, density: null,
    oxidationStates: [2, 3], yearDiscovered: 1966,
    description: "Named after Alfred Nobel; the most stable isotope has a half-life of 58 minutes."
  },
  {
    atomicNumber: 103, name: "Lawrencium", symbol: "Lr", atomicMass: 262,
    group: null, period: 7, block: "d", category: "actinide",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 7s² 7p¹", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 7s² 7p¹",
    protons: 103, neutrons: 159, electrons: 103,
    electronegativity: 1.30, atomicRadius: null, ionizationEnergy: 470,
    standardState: "solid", meltingPoint: 1900, boilingPoint: null, density: null,
    oxidationStates: [3], yearDiscovered: 1961,
    description: "The last actinide; named after Ernest O. Lawrence, inventor of the cyclotron."
  },
  {
    atomicNumber: 104, name: "Rutherfordium", symbol: "Rf", atomicMass: 267,
    group: 4, period: 7, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d² 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d² 7s²",
    protons: 104, neutrons: 163, electrons: 104,
    electronegativity: null, atomicRadius: null, ionizationEnergy: 580,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [4], yearDiscovered: 1969,
    description: "Named after Ernest Rutherford; a synthetic superheavy element."
  },
  {
    atomicNumber: 105, name: "Dubnium", symbol: "Db", atomicMass: 268,
    group: 5, period: 7, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d³ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d³ 7s²",
    protons: 105, neutrons: 163, electrons: 105,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [5], yearDiscovered: 1970,
    description: "Named after Dubna, Russia; a synthetic element with a half-life of about 28 hours."
  },
  {
    atomicNumber: 106, name: "Seaborgium", symbol: "Sg", atomicMass: 269,
    group: 6, period: 7, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁴ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d⁴ 7s²",
    protons: 106, neutrons: 163, electrons: 106,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [6], yearDiscovered: 1974,
    description: "Named after Glenn Seaborg; a synthetic superheavy element."
  },
  {
    atomicNumber: 107, name: "Bohrium", symbol: "Bh", atomicMass: 270,
    group: 7, period: 7, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁵ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d⁵ 7s²",
    protons: 107, neutrons: 163, electrons: 107,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [7], yearDiscovered: 1981,
    description: "Named after Niels Bohr; a synthetic element produced in particle accelerators."
  },
  {
    atomicNumber: 108, name: "Hassium", symbol: "Hs", atomicMass: 277,
    group: 8, period: 7, block: "d", category: "transition metal",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁶ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d⁶ 7s²",
    protons: 108, neutrons: 169, electrons: 108,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [8], yearDiscovered: 1984,
    description: "Named after the German state of Hesse; a synthetic superheavy element."
  },
  {
    atomicNumber: 109, name: "Meitnerium", symbol: "Mt", atomicMass: 278,
    group: 9, period: 7, block: "d", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁷ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d⁷ 7s²",
    protons: 109, neutrons: 169, electrons: 109,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [3, 4, 6], yearDiscovered: 1982,
    description: "Named after Lise Meitner, who co-discovered nuclear fission."
  },
  {
    atomicNumber: 110, name: "Darmstadtium", symbol: "Ds", atomicMass: 281,
    group: 10, period: 7, block: "d", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁸ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d⁸ 7s²",
    protons: 110, neutrons: 171, electrons: 110,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [2, 4, 6], yearDiscovered: 1994,
    description: "Named after Darmstadt, Germany; a synthetic element with a half-life of seconds."
  },
  {
    atomicNumber: 111, name: "Roentgenium", symbol: "Rg", atomicMass: 282,
    group: 11, period: 7, block: "d", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d⁹ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d⁹ 7s²",
    protons: 111, neutrons: 171, electrons: 111,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [3, 5], yearDiscovered: 1994,
    description: "Named after Wilhelm Röntgen, discoverer of X-rays."
  },
  {
    atomicNumber: 112, name: "Copernicium", symbol: "Cn", atomicMass: 285,
    group: 12, period: 7, block: "d", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s²",
    protons: 112, neutrons: 173, electrons: 112,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [2], yearDiscovered: 1996,
    description: "Named after Nicolaus Copernicus; predicted to be a volatile liquid metal."
  },
  {
    atomicNumber: 113, name: "Nihonium", symbol: "Nh", atomicMass: 286,
    group: 13, period: 7, block: "p", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p¹", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹",
    protons: 113, neutrons: 173, electrons: 113,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [1, 3], yearDiscovered: 2003,
    description: "Named after Japan (Nihon); the first element discovered in Asia."
  },
  {
    atomicNumber: 114, name: "Flerovium", symbol: "Fl", atomicMass: 289,
    group: 14, period: 7, block: "p", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p²", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²",
    protons: 114, neutrons: 175, electrons: 114,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [2, 4], yearDiscovered: 1998,
    description: "Named after the Flerov Laboratory; predicted to be near an 'island of stability'."
  },
  {
    atomicNumber: 115, name: "Moscovium", symbol: "Mc", atomicMass: 290,
    group: 15, period: 7, block: "p", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p³", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³",
    protons: 115, neutrons: 175, electrons: 115,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [1, 3], yearDiscovered: 2003,
    description: "Named after Moscow Oblast; a synthetic superheavy element."
  },
  {
    atomicNumber: 116, name: "Livermorium", symbol: "Lv", atomicMass: 293,
    group: 16, period: 7, block: "p", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁴", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴",
    protons: 116, neutrons: 177, electrons: 116,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [2, 4], yearDiscovered: 2000,
    description: "Named after Lawrence Livermore National Laboratory."
  },
  {
    atomicNumber: 117, name: "Tennessine", symbol: "Ts", atomicMass: 294,
    group: 17, period: 7, block: "p", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁵", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
    protons: 117, neutrons: 177, electrons: 117,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [1, 3, 5], yearDiscovered: 2010,
    description: "Named after Tennessee; the second-newest element to be named."
  },
  {
    atomicNumber: 118, name: "Oganesson", symbol: "Og", atomicMass: 294,
    group: 18, period: 7, block: "p", category: "unknown",
    electronConfiguration: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 4f¹⁴ 5s² 5p⁶ 5d¹⁰ 5f¹⁴ 6s² 6p⁶ 6d¹⁰ 7s² 7p⁶", electronConfigurationNobleGas: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶",
    protons: 118, neutrons: 176, electrons: 118,
    electronegativity: null, atomicRadius: null, ionizationEnergy: null,
    standardState: "unknown", meltingPoint: null, boilingPoint: null, density: null,
    oxidationStates: [0, 2, 4], yearDiscovered: 2006,
    description: "The heaviest known element; named after nuclear physicist Yuri Oganessian."
  },
];

// ----- HELPER FUNCTIONS -----

/** Look up an element by atomic number */
export function getElementByNumber(atomicNumber: number): PeriodicElement | undefined {
  return ELEMENTS.find(e => e.atomicNumber === atomicNumber);
}

/** Look up an element by symbol */
export function getElementBySymbol(symbol: string): PeriodicElement | undefined {
  return ELEMENTS.find(e => e.symbol === symbol);
}

/** Look up an element by name (case-insensitive) */
export function getElementByName(name: string): PeriodicElement | undefined {
  const lower = name.toLowerCase();
  return ELEMENTS.find(e => e.name.toLowerCase() === lower);
}

/** Get all elements in a given period */
export function getElementsByPeriod(period: number): PeriodicElement[] {
  return ELEMENTS.filter(e => e.period === period);
}

/** Get all elements in a given group */
export function getElementsByGroup(group: number): PeriodicElement[] {
  return ELEMENTS.filter(e => e.group === group);
}

/** Get all elements by category */
export function getElementsByCategory(category: string): PeriodicElement[] {
  const lower = category.toLowerCase();
  return ELEMENTS.filter(e => e.category.toLowerCase() === lower);
}

/** Get all elements by block */
export function getElementsByBlock(block: "s" | "p" | "d" | "f"): PeriodicElement[] {
  return ELEMENTS.filter(e => e.block === block);
}
