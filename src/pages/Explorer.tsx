import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Wind, FlaskConical, Atom } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { ELEMENTS, type PeriodicElement } from "@/data/elements";
import { elementTranslationsAlbanian } from "@/data/elementsAlbanian";
import type { TranslationKey } from "@/i18n/translations";

const AtomicModel3D = lazy(() => import("@/components/AtomicModel3D"));

// Periodic table layout: row (period), col (group) — with lanthanides/actinides in rows 8-9
function getGridPosition(el: PeriodicElement): { row: number; col: number } {
  if (el.category === "lanthanide") {
    const offset = el.atomicNumber - 57;
    return { row: 8, col: 3 + offset };
  }
  if (el.category === "actinide") {
    const offset = el.atomicNumber - 89;
    return { row: 9, col: 3 + offset };
  }
  if (el.group === null) return { row: el.period, col: 3 };
  return { row: el.period, col: el.group };
}

const CATEGORY_COLORS: Record<string, string> = {
  "alkali metal": "bg-red-500/20 border-red-500/40 hover:bg-red-500/30",
  "alkaline earth metal": "bg-orange-500/20 border-orange-500/40 hover:bg-orange-500/30",
  "transition metal": "bg-yellow-500/20 border-yellow-500/40 hover:bg-yellow-500/30",
  "post-transition metal": "bg-green-500/20 border-green-500/40 hover:bg-green-500/30",
  "metalloid": "bg-teal-500/20 border-teal-500/40 hover:bg-teal-500/30",
  "nonmetal": "bg-sky-500/20 border-sky-500/40 hover:bg-sky-500/30",
  "halogen": "bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30",
  "noble gas": "bg-purple-500/20 border-purple-500/40 hover:bg-purple-500/30",
  "lanthanide": "bg-pink-500/20 border-pink-500/40 hover:bg-pink-500/30",
  "actinide": "bg-rose-500/20 border-rose-500/40 hover:bg-rose-500/30",
  "unknown": "bg-muted/40 border-muted-foreground/20 hover:bg-muted/60",
};

const CATEGORY_DOT_COLORS: Record<string, string> = {
  "alkali metal": "bg-red-500",
  "alkaline earth metal": "bg-orange-500",
  "transition metal": "bg-yellow-500",
  "post-transition metal": "bg-green-500",
  "metalloid": "bg-teal-500",
  "nonmetal": "bg-sky-500",
  "halogen": "bg-blue-500",
  "noble gas": "bg-purple-500",
  "lanthanide": "bg-pink-500",
  "actinide": "bg-rose-500",
  "unknown": "bg-muted-foreground",
};

const CATEGORY_TRANSLATION_KEY: Record<string, TranslationKey> = {
  "alkali metal": "catAlkaliMetal",
  "alkaline earth metal": "catAlkalineEarthMetal",
  "transition metal": "catTransitionMetal",
  "post-transition metal": "catPostTransitionMetal",
  "metalloid": "catMetalloid",
  "nonmetal": "catNonmetal",
  "halogen": "catHalogen",
  "noble gas": "catNobleGas",
  "lanthanide": "catLanthanide",
  "actinide": "catActinide",
  "unknown": "catUnknown",
};

const STATE_TRANSLATION_KEY: Record<string, TranslationKey> = {
  solid: "stateSolid",
  liquid: "stateLiquid",
  gas: "stateGas",
  unknown: "stateUnknown",
};

const STATE_ICON: Record<string, typeof Atom> = {
  solid: Droplets,
  liquid: FlaskConical,
  gas: Wind,
  unknown: Atom,
};

function useElementLocale(el: PeriodicElement) {
  const { language } = useLanguage();
  if (language === "sq") {
    const tr = elementTranslationsAlbanian[el.atomicNumber];
    if (tr) return { name: tr.name, description: tr.description };
  }
  return { name: el.name, description: el.description };
}

function ElementCell({ el, onClick }: { el: PeriodicElement; onClick: () => void }) {
  const pos = getGridPosition(el);
  const colorClass = CATEGORY_COLORS[el.category] || CATEGORY_COLORS["unknown"];
  const { name } = useElementLocale(el);

  return (
    <motion.button
      whileHover={{ scale: 1.15, zIndex: 20 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`border rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors relative ${colorClass}`}
      style={{
        gridRow: pos.row,
        gridColumn: pos.col,
      }}
      title={`${el.atomicNumber} — ${name}`}
    >
      <span className="text-[7px] sm:text-[8px] leading-none opacity-50">{el.atomicNumber}</span>
      <span className="text-[10px] sm:text-xs font-bold leading-none text-foreground">{el.symbol}</span>
      <span className="text-[6px] sm:text-[7px] leading-none opacity-40 hidden md:block">{name.length > 8 ? name.slice(0, 7) + "…" : name}</span>
    </motion.button>
  );
}

function DetailModal({ el, onClose }: { el: PeriodicElement; onClose: () => void }) {
  const { t, language } = useLanguage();
  const { name, description } = useElementLocale(el);
  const StateIcon = STATE_ICON[el.standardState] || Atom;
  const dotColor = CATEGORY_DOT_COLORS[el.category] || CATEGORY_DOT_COLORS["unknown"];
  const categoryKey = CATEGORY_TRANSLATION_KEY[el.category] || "catUnknown";
  const stateKey = STATE_TRANSLATION_KEY[el.standardState] || "stateUnknown";

  const discoveredValue = el.yearDiscovered === "Ancient"
    ? t("ancient")
    : el.yearDiscovered ?? "—";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold ${CATEGORY_COLORS[el.category] || ""}`}>
            {el.symbol}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
              <span className="text-xs text-muted-foreground">{t(categoryKey)}</span>
              <span className="text-xs text-muted-foreground">• #{el.atomicNumber}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5">{description}</p>

        {/* 3D Atomic Model */}
        <div className="mb-5">
          <Suspense fallback={<div className="w-full aspect-square max-h-[280px] rounded-lg bg-secondary/20 flex items-center justify-center text-muted-foreground text-xs">Loading 3D model…</div>}>
            <AtomicModel3D protons={el.protons} neutrons={el.neutrons} electrons={el.electrons} />
          </Suspense>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Prop label={t("propAtomicMass")} value={`${el.atomicMass} u`} />
          <Prop label={t("propBlock")} value={el.block.toUpperCase()} />
          <Prop label={t("propPeriod")} value={el.period} />
          <Prop label={t("propGroup")} value={el.group ?? "—"} />
          <Prop label={t("propProtons")} value={el.protons} />
          <Prop label={t("propNeutrons")} value={el.neutrons} />
          <Prop label={t("propElectrons")} value={el.electrons} />
          <Prop label={t("propElectronegativity")} value={el.electronegativity ?? "—"} />
          <Prop label={t("propAtomicRadius")} value={el.atomicRadius ? `${el.atomicRadius} pm` : "—"} />
          <Prop label={t("propIonizationEnergy")} value={el.ionizationEnergy ? `${el.ionizationEnergy} kJ/mol` : "—"} />
          <Prop label={t("propDensity")} value={el.density ? `${el.density} g/cm³` : "—"} />
          <Prop label={t("propStandardState")} value={<span className="flex items-center gap-1"><StateIcon className="w-3.5 h-3.5" />{t(stateKey)}</span>} />
          <Prop label={t("propMeltingPoint")} value={el.meltingPoint ? `${el.meltingPoint} K` : "—"} />
          <Prop label={t("propBoilingPoint")} value={el.boilingPoint ? `${el.boilingPoint} K` : "—"} />
          <Prop label={t("propDiscovered")} value={discoveredValue} />
          <Prop label={t("propOxidationStates")} value={el.oxidationStates.map(s => s > 0 ? `+${s}` : String(s)).join(", ")} />
        </div>

        {/* Electron configuration */}
        <div className="mt-5 space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("propElectronConfig")}</h3>
          <p className="font-mono text-sm text-foreground bg-secondary/50 rounded-md px-3 py-2">{el.electronConfiguration}</p>
          <p className="font-mono text-xs text-muted-foreground bg-secondary/30 rounded-md px-3 py-1.5">{el.electronConfigurationNobleGas}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Prop({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-secondary/30 rounded-md px-3 py-2">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">{label}</span>
      <span className="text-foreground font-medium text-sm">{typeof value === "object" ? value : String(value)}</span>
    </div>
  );
}

const LEGEND_KEYS: { key: string; translationKey: TranslationKey }[] = [
  { key: "alkali metal", translationKey: "legendAlkaliMetal" },
  { key: "alkaline earth metal", translationKey: "legendAlkalineEarth" },
  { key: "transition metal", translationKey: "legendTransitionMetal" },
  { key: "post-transition metal", translationKey: "legendPostTransition" },
  { key: "metalloid", translationKey: "legendMetalloid" },
  { key: "nonmetal", translationKey: "legendNonmetal" },
  { key: "halogen", translationKey: "legendHalogen" },
  { key: "noble gas", translationKey: "legendNobleGas" },
  { key: "lanthanide", translationKey: "legendLanthanide" },
  { key: "actinide", translationKey: "legendActinide" },
];

const Explorer = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<PeriodicElement | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("elementExplorer")}</h1>
          <p className="text-muted-foreground">{t("explorerSubtitle")}</p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {LEGEND_KEYS.map(({ key, translationKey }) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={`w-2.5 h-2.5 rounded-full ${CATEGORY_DOT_COLORS[key]}`} />
              {t(translationKey)}
            </div>
          ))}
        </div>

        {/* Periodic table grid */}
        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-[2px] min-w-[800px]"
            style={{
              gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
              gridTemplateRows: "repeat(9, minmax(32px, 42px))",
            }}
          >
            {ELEMENTS.map((el) => (
              <ElementCell key={el.atomicNumber} el={el} onClick={() => setSelected(el)} />
            ))}
          </div>
        </div>

        {/* Lanthanide/Actinide label */}
        <div className="min-w-[800px] mt-1 flex gap-2 text-[10px] text-muted-foreground pl-[calc(2/18*100%)]">
          <span>* {t("lanthanideLabel")}</span>
          <span>** {t("actinideLabel")}</span>
        </div>
      </div>

      <AnimatePresence>
        {selected && <DetailModal el={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Explorer;
