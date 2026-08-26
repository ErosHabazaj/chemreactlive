export type Language = "en" | "sq";

export const translations = {
  // Navbar
  home: { en: "Home", sq: "Kryefaqja" },
  simulator: { en: "Simulator", sq: "Simulatori" },
  learn: { en: "Learn", sq: "Mëso" },
  about: { en: "About", sq: "Rreth" },
  elementExplorer: { en: "Explorer", sq: "Eksploro" },
  explorerSubtitle: {
    en: "Click any element to view its detailed properties.",
    sq: "Kliko çdo element për të parë vetitë e tij të detajuara.",
  },

  // Explorer UI labels
  propAtomicMass: { en: "Atomic Mass", sq: "Masa Atomike" },
  propBlock: { en: "Block", sq: "Blloku" },
  propPeriod: { en: "Period", sq: "Perioda" },
  propGroup: { en: "Group", sq: "Grupi" },
  propProtons: { en: "Protons", sq: "Protone" },
  propNeutrons: { en: "Neutrons", sq: "Neutrone" },
  propElectrons: { en: "Electrons", sq: "Elektrone" },
  propElectronegativity: { en: "Electronegativity", sq: "Elektronegativiteti" },
  propAtomicRadius: { en: "Atomic Radius", sq: "Rrezja Atomike" },
  propIonizationEnergy: { en: "Ionization Energy", sq: "Energjia e Jonizimit" },
  propDensity: { en: "Density", sq: "Dendësia" },
  propStandardState: { en: "Standard State", sq: "Gjendja Standarde" },
  propMeltingPoint: { en: "Melting Point", sq: "Pika e Shkrirjes" },
  propBoilingPoint: { en: "Boiling Point", sq: "Pika e Vlimit" },
  propDiscovered: { en: "Discovered", sq: "Zbuluar" },
  propOxidationStates: { en: "Oxidation States", sq: "Gjendjet e Oksidimit" },
  propElectronConfig: { en: "Electron Configuration", sq: "Konfigurimi Elektronik" },
  ancient: { en: "Ancient", sq: "Antik" },

  // Explorer legend
  legendAlkaliMetal: { en: "Alkali Metal", sq: "Metal Alkalin" },
  legendAlkalineEarth: { en: "Alkaline Earth", sq: "Alkalino-tokësor" },
  legendTransitionMetal: { en: "Transition Metal", sq: "Metal Tranzicioni" },
  legendPostTransition: { en: "Post-Transition", sq: "Pas-tranzicioni" },
  legendMetalloid: { en: "Metalloid", sq: "Gjysmëmetal" },
  legendNonmetal: { en: "Nonmetal", sq: "Jometal" },
  legendHalogen: { en: "Halogen", sq: "Halogjen" },
  legendNobleGas: { en: "Noble Gas", sq: "Gaz Fisnik" },
  legendLanthanide: { en: "Lanthanide", sq: "Lantanid" },
  legendActinide: { en: "Actinide", sq: "Aktinid" },
  lanthanideLabel: { en: "Lanthanides (57–71)", sq: "Lantanidet (57–71)" },
  actinideLabel: { en: "Actinides (89–103)", sq: "Aktinidet (89–103)" },

  // Categories (for modal)
  catAlkaliMetal: { en: "Alkali Metal", sq: "Metal Alkalin" },
  catAlkalineEarthMetal: { en: "Alkaline Earth Metal", sq: "Metal Alkalino-tokësor" },
  catTransitionMetal: { en: "Transition Metal", sq: "Metal Tranzicioni" },
  catPostTransitionMetal: { en: "Post-Transition Metal", sq: "Metal Pas-tranzicioni" },
  catMetalloid: { en: "Metalloid", sq: "Gjysmëmetal" },
  catNonmetal: { en: "Nonmetal", sq: "Jometal" },
  catHalogen: { en: "Halogen", sq: "Halogjen" },
  catNobleGas: { en: "Noble Gas", sq: "Gaz Fisnik" },
  catLanthanide: { en: "Lanthanide", sq: "Lantanid" },
  catActinide: { en: "Actinide", sq: "Aktinid" },
  catUnknown: { en: "Unknown", sq: "I panjohur" },

  // Standard states
  stateSolid: { en: "Solid", sq: "I ngurtë" },
  stateLiquid: { en: "Liquid", sq: "I lëngshëm" },
  stateGas: { en: "Gas", sq: "Gaz" },
  stateUnknown: { en: "Unknown", sq: "I panjohur" },

  // Index
  highSchoolChemistry: { en: "High-School Chemistry", sq: "Kimi për Gjimnaz" },
  heroTitle: { en: "Visualizer", sq: "Vizualizues" },
  heroSubtitle: {
    en: "Simulate chemical reactions, visualize electron transfer, and understand oxidation & reduction — step by step.",
    sq: "Simulo reaksione kimike, vizualizuo transferimin e elektroneve dhe kupto oksidimin & reduktimin — hap pas hapi.",
  },
  singleDisplacement: { en: "Single Displacement", sq: "Zëvendësim i Thjeshtë" },
  singleDisplacementDesc: {
    en: "A reactive metal replaces a less reactive metal from its salt solution.",
    sq: "Një metal reaktiv zëvendëson një metal më pak reaktiv nga tretësira e kripës së tij.",
  },
  redoxElectronTransfer: { en: "Redox (Electron Transfer)", sq: "Redoks (Transferim Elektronesh)" },
  redoxDesc: {
    en: "Visualize electron transfer between species with half-reactions.",
    sq: "Vizualizoni transferimin e elektroneve midis specieve me gjysmë-reaksione.",
  },
  tryIt: { en: "Try it", sq: "Provoje" },

  // New reaction types
  neutralization: { en: "Neutralization", sq: "Neutralizim" },
  neutralizationDesc: {
    en: "An acid reacts with a base to produce salt and water.",
    sq: "Një acid reagon me një bazë për të prodhuar kripë dhe ujë.",
  },
  combustion: { en: "Combustion", sq: "Djegie" },
  combustionDesc: {
    en: "A hydrocarbon burns in oxygen to produce CO₂ and H₂O.",
    sq: "Një hidrokarbon digjet në oksigjen për të prodhuar CO₂ dhe H₂O.",
  },
  synthesis: { en: "Synthesis", sq: "Sintezë" },
  synthesisDesc: {
    en: "Two or more substances combine to form a single product.",
    sq: "Dy ose më shumë substanca kombinohen për të formuar një produkt të vetëm.",
  },
  decomposition: { en: "Decomposition", sq: "Dekompozim" },
  decompositionDesc: {
    en: "A compound breaks down into simpler substances.",
    sq: "Një përbërje zbërthehet në substanca më të thjeshta.",
  },

  // Simulator
  reactionSimulator: { en: "Reaction Simulator", sq: "Simulatori i Reaksioneve" },
  simulatorSubtitle: {
    en: "Choose a reaction type, select your reactants, and run the simulation.",
    sq: "Zgjidh llojin e reaksionit, zgjidh reaktantët dhe nis simulimin.",
  },
  redox: { en: "Redox", sq: "Redoks" },
  solidMetal: { en: "Solid Metal (reactant)", sq: "Metal i Ngurtë (reaktant)" },
  selectMetal: { en: "Select a metal...", sq: "Zgjidh një metal..." },
  saltAqueous: { en: "Salt (aqueous)", sq: "Kripë (në tretësirë)" },
  selectSalt: { en: "Select a salt...", sq: "Zgjidh një kripë..." },
  ionicParts: { en: "Ionic parts", sq: "Pjesët jonike" },
  metalToOxidize: { en: "Metal to Oxidize (loses e⁻)", sq: "Metali që Oksidomet (humb e⁻)" },
  ionToReduce: { en: "Ion to Reduce (gains e⁻)", sq: "Joni që Reduktohet (fiton e⁻)" },
  selectIon: { en: "Select an ion...", sq: "Zgjidh një jon..." },
  selectedElement: { en: "Selected", sq: "Zgjedhur" },
  selectAnion: { en: "Select anion", sq: "Zgjidh anionin" },
  clickElementToSelect: { en: "Click an element to select it", sq: "Kliko një element për ta zgjedhur" },
  runReaction: { en: "Run Reaction", sq: "Nis Reaksionin" },
  emptyStateMsg: {
    en: 'Select reactants and click "Run Reaction" to see results.',
    sq: 'Zgjidh reaktantët dhe kliko "Nis Reaksionin" për të parë rezultatet.',
  },
  selectReactionType: { en: "Select Reaction Type", sq: "Zgjidh Llojin e Reaksionit" },
  selectAcid: { en: "Select Acid", sq: "Zgjidh Acidin" },
  selectBase: { en: "Select Base", sq: "Zgjidh Bazën" },
  selectCompound: { en: "Select Compound", sq: "Zgjidh Përbërjen" },
  selectReaction: { en: "Select Reaction", sq: "Zgjidh Reaksionin" },
  acid: { en: "Acid", sq: "Acid" },
  base: { en: "Base", sq: "Bazë" },
  compound: { en: "Compound", sq: "Përbërje" },

  // Output Panel
  reactionOccurs: { en: "Reaction Occurs ✓", sq: "Reaksioni Ndodh ✓" },
  noReaction: { en: "No Reaction", sq: "Nuk Ka Reaksion" },
  balancedEquations: { en: "Balanced Equations", sq: "Ekuacione të Balansuara" },
  molecular: { en: "Molecular:", sq: "Molekulare:" },
  netIonic: { en: "Net Ionic:", sq: "Jonike Neto:" },
  oxidation: { en: "Oxidation:", sq: "Oksidim:" },
  reduction: { en: "Reduction:", sq: "Reduktim:" },
  whyThisHappens: { en: "Why This Happens", sq: "Pse Ndodh Kjo" },
  energyChange: { en: "Energy Change", sq: "Ndryshimi i Energjisë" },
  exothermic: { en: "Exothermic (releases heat)", sq: "Ekzotermik (çliron nxehtësi)" },
  endothermic: { en: "Endothermic (absorbs heat)", sq: "Endotermik (thith nxehtësi)" },
  generalFormula: { en: "General Formula", sq: "Formula e Përgjithshme" },
  reactionTypeLabel: { en: "Reaction Type", sq: "Lloji i Reaksionit" },
  stepsTitle: { en: "Step by Step", sq: "Hap pas Hapi" },

  // Electron Visualizer
  electronTransferStepByStep: { en: "Electron Transfer — Step by Step", sq: "Transferimi i Elektroneve — Hap pas Hapi" },
  donor: { en: "Donor", sq: "Dhurues" },
  acceptor: { en: "Acceptor", sq: "Pranues" },
  prev: { en: "Prev", sq: "Para" },
  next: { en: "Next", sq: "Pas" },

  // Engine steps
  stepIdentifySpecies: { en: "Identify Species", sq: "Identifiko Speciet" },
  stepOxidationHalf: { en: "Oxidation Half-Reaction", sq: "Gjysmë-reaksioni i Oksidimit" },
  stepReductionHalf: { en: "Reduction Half-Reaction", sq: "Gjysmë-reaksioni i Reduktimit" },
  stepBalanceElectrons: { en: "Balance Electrons", sq: "Balanco Elektronet" },
  stepCancelElectrons: { en: "Cancel Electrons", sq: "Anulo Elektronet" },
  stepNetIonic: { en: "Net Ionic Equation", sq: "Ekuacioni Jonik Neto" },

  // Learn page
  learnTitle: { en: "Learn: Six Core Reactions", sq: "Mëso: Gjashtë Reaksione Kryesore" },
  oxidationVsReduction: { en: "Oxidation vs Reduction", sq: "Oksidimi kundër Reduktimit" },
  oxidationExplanation: {
    en: "is the loss of electrons. When a metal atom gives up electrons, it becomes a positively charged ion. Its oxidation state increases (e.g., Zn: 0 → +2).",
    sq: "është humbja e elektroneve. Kur një atom metali jep elektrone, bëhet jon me ngarkesë pozitive. Gjendja e tij e oksidimit rritet (p.sh., Zn: 0 → +2).",
  },
  reductionExplanation: {
    en: "is the gain of electrons. When an ion accepts electrons, it becomes a neutral metal atom. Its oxidation state decreases (e.g., Cu²⁺: +2 → 0).",
    sq: "është fitimi i elektroneve. Kur një jon pranon elektrone, bëhet atom metalik neutral. Gjendja e tij e oksidimit zvogëlohet (p.sh., Cu²⁺: +2 → 0).",
  },
  mnemonic: { en: "Mnemonic:", sq: "Mnemonikë:" },
  oilRig: {
    en: "OIL RIG — Oxidation Is Loss, Reduction Is Gain (of electrons).",
    sq: "OIL RIG — Oxidation Is Loss, Reduction Is Gain (i elektroneve).",
  },
  activitySeries: { en: "Activity Series", sq: "Seria e Aktivitetit" },
  activitySeriesExplanation: {
    en: "The activity series ranks metals by how easily they lose electrons. A metal higher in the series can displace a metal lower in the series from its salt solution.",
    sq: "Seria e aktivitetit rendit metalet sipas lehtësisë me të cilën humbasin elektrone. Një metal më lart në seri mund të zëvendësojë një metal më poshtë nga tretësira e kripës.",
  },
  mostReactive: { en: "← Most reactive … Least reactive →", sq: "← Më reaktiv … Më pak reaktiv →" },
  spectatorIons: { en: "Spectator Ions", sq: "Jonet Spektatore" },
  spectatorExplanation: {
    en: 'Spectator ions are ions present in solution that do not participate in the reaction. For example, in Zn + CuSO₄ → ZnSO₄ + Cu, the SO₄²⁻ ion is a spectator — it appears on both sides unchanged. That\'s why the net ionic equation removes it:',
    sq: 'Jonet spektatore janë jone të pranishme në tretësirë që nuk marrin pjesë në reaksion. Për shembull, në Zn + CuSO₄ → ZnSO₄ + Cu, joni SO₄²⁻ është spektator — shfaqet në të dy anët pa ndryshuar. Prandaj ekuacioni jonik neto e heq atë:',
  },

  // About page
  aboutTitle: { en: "About", sq: "Rreth" },
  aboutDescription: {
    en: "An educational web simulator built for high-school chemistry. This tool helps students understand chemical reactions through interactive step-by-step visualization.",
    sq: "Një simulator edukativ ueb i ndërtuar për kiminë e gjimnazit. Ky mjet ndihmon nxënësit të kuptojnë reaksionet kimike përmes vizualizimit interaktiv hap pas hapi.",
  },
  howChemistryWorks: { en: "How the chemistry logic works:", sq: "Si funksionon logjika e kimisë:" },
  chemLogic1: {
    en: "Uses a built-in activity series (Li → Au) with 19 metals to determine displacement reactions",
    sq: "Përdor serinë e integruar të aktivitetit (Li → Au) me 19 metale për të përcaktuar reaksionet e zëvendësimit",
  },
  chemLogic2: {
    en: "Generates balanced molecular and net ionic equations",
    sq: "Gjeneron ekuacione molekulare dhe jonike neto të balansuara",
  },
  chemLogic3: {
    en: "Splits reactions into oxidation and reduction half-reactions",
    sq: "Ndan reaksionet në gjysmë-reaksione oksidimi dhe reduktimi",
  },
  chemLogic4: {
    en: "Balances electron transfer using least common multiples of charges",
    sq: "Balancon transferimin e elektroneve duke përdorur shumëfishin më të vogël të përbashkët të ngarkesave",
  },
  chemLogic5: {
    en: "Supports 6 reaction types: displacement, redox, neutralization, combustion, synthesis, and decomposition",
    sq: "Mbështet 6 lloje reaksionesh: zëvendësim, redoks, neutralizim, djegie, sintezë dhe dekompozim",
  },
  groupMembers: { en: "Group Members", sq: "Anëtarët e Grupit" },
  disclaimer: {
    en: "This is an educational simulator covering a focused set of chemical reactions. Results are accurate within the supported species and reaction types.",
    sq: "Ky është një simulator edukativ që mbulon një grup të fokusuar reaksionesh kimike. Rezultatet janë të sakta brenda specieve dhe llojeve të reaksioneve të mbështetura.",
  },

  // 404
  pageNotFound: { en: "Oops! Page not found", sq: "Oops! Faqja nuk u gjet" },
  returnHome: { en: "Return to Home", sq: "Kthehu në Kryefaqje" },
} as const;

export type TranslationKey = keyof typeof translations;
