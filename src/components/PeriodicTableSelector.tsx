import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  row: number;
  col: number;
  enabled: boolean;
}

const PERIODIC_ELEMENTS: Element[] = [
  // Period 1
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, row: 1, col: 1, enabled: false },
  { symbol: "He", name: "Helium", atomicNumber: 2, row: 1, col: 18, enabled: false },
  // Period 2
  { symbol: "Li", name: "Lithium", atomicNumber: 3, row: 2, col: 1, enabled: true },
  { symbol: "Be", name: "Beryllium", atomicNumber: 4, row: 2, col: 2, enabled: false },
  { symbol: "B", name: "Boron", atomicNumber: 5, row: 2, col: 13, enabled: false },
  { symbol: "C", name: "Carbon", atomicNumber: 6, row: 2, col: 14, enabled: false },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, row: 2, col: 15, enabled: false },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, row: 2, col: 16, enabled: false },
  { symbol: "F", name: "Fluorine", atomicNumber: 9, row: 2, col: 17, enabled: false },
  { symbol: "Ne", name: "Neon", atomicNumber: 10, row: 2, col: 18, enabled: false },
  // Period 3
  { symbol: "Na", name: "Sodium", atomicNumber: 11, row: 3, col: 1, enabled: true },
  { symbol: "Mg", name: "Magnesium", atomicNumber: 12, row: 3, col: 2, enabled: true },
  { symbol: "Al", name: "Aluminium", atomicNumber: 13, row: 3, col: 13, enabled: true },
  { symbol: "Si", name: "Silicon", atomicNumber: 14, row: 3, col: 14, enabled: false },
  { symbol: "P", name: "Phosphorus", atomicNumber: 15, row: 3, col: 15, enabled: false },
  { symbol: "S", name: "Sulfur", atomicNumber: 16, row: 3, col: 16, enabled: false },
  { symbol: "Cl", name: "Chlorine", atomicNumber: 17, row: 3, col: 17, enabled: false },
  { symbol: "Ar", name: "Argon", atomicNumber: 18, row: 3, col: 18, enabled: false },
  // Period 4
  { symbol: "K", name: "Potassium", atomicNumber: 19, row: 4, col: 1, enabled: true },
  { symbol: "Ca", name: "Calcium", atomicNumber: 20, row: 4, col: 2, enabled: true },
  { symbol: "Sc", name: "Scandium", atomicNumber: 21, row: 4, col: 3, enabled: false },
  { symbol: "Ti", name: "Titanium", atomicNumber: 22, row: 4, col: 4, enabled: false },
  { symbol: "V", name: "Vanadium", atomicNumber: 23, row: 4, col: 5, enabled: false },
  { symbol: "Cr", name: "Chromium", atomicNumber: 24, row: 4, col: 6, enabled: true },
  { symbol: "Mn", name: "Manganese", atomicNumber: 25, row: 4, col: 7, enabled: true },
  { symbol: "Fe", name: "Iron", atomicNumber: 26, row: 4, col: 8, enabled: true },
  { symbol: "Co", name: "Cobalt", atomicNumber: 27, row: 4, col: 9, enabled: false },
  { symbol: "Ni", name: "Nickel", atomicNumber: 28, row: 4, col: 10, enabled: true },
  { symbol: "Cu", name: "Copper", atomicNumber: 29, row: 4, col: 11, enabled: true },
  { symbol: "Zn", name: "Zinc", atomicNumber: 30, row: 4, col: 12, enabled: true },
  { symbol: "Ga", name: "Gallium", atomicNumber: 31, row: 4, col: 13, enabled: false },
  { symbol: "Ge", name: "Germanium", atomicNumber: 32, row: 4, col: 14, enabled: false },
  { symbol: "As", name: "Arsenic", atomicNumber: 33, row: 4, col: 15, enabled: false },
  { symbol: "Se", name: "Selenium", atomicNumber: 34, row: 4, col: 16, enabled: false },
  { symbol: "Br", name: "Bromine", atomicNumber: 35, row: 4, col: 17, enabled: false },
  { symbol: "Kr", name: "Krypton", atomicNumber: 36, row: 4, col: 18, enabled: false },
  // Period 5 (partial)
  { symbol: "Rb", name: "Rubidium", atomicNumber: 37, row: 5, col: 1, enabled: false },
  { symbol: "Sr", name: "Strontium", atomicNumber: 38, row: 5, col: 2, enabled: false },
  { symbol: "Ag", name: "Silver", atomicNumber: 47, row: 5, col: 11, enabled: true },
  { symbol: "Cd", name: "Cadmium", atomicNumber: 48, row: 5, col: 12, enabled: false },
  { symbol: "In", name: "Indium", atomicNumber: 49, row: 5, col: 13, enabled: false },
  { symbol: "Sn", name: "Tin", atomicNumber: 50, row: 5, col: 14, enabled: true },
  // Period 6 (partial)
  { symbol: "Cs", name: "Caesium", atomicNumber: 55, row: 6, col: 1, enabled: false },
  { symbol: "Ba", name: "Barium", atomicNumber: 56, row: 6, col: 2, enabled: true },
  { symbol: "Pt", name: "Platinum", atomicNumber: 78, row: 6, col: 10, enabled: true },
  { symbol: "Au", name: "Gold", atomicNumber: 79, row: 6, col: 11, enabled: true },
  { symbol: "Hg", name: "Mercury", atomicNumber: 80, row: 6, col: 12, enabled: true },
  { symbol: "Tl", name: "Thallium", atomicNumber: 81, row: 6, col: 13, enabled: false },
  { symbol: "Pb", name: "Lead", atomicNumber: 82, row: 6, col: 14, enabled: true },
  { symbol: "Bi", name: "Bismuth", atomicNumber: 83, row: 6, col: 15, enabled: false },
];

interface PeriodicTableSelectorProps {
  value: string;
  onSelect: (symbol: string) => void;
  allowedSymbols?: string[];
  label?: string;
}

const PeriodicTableSelector = ({ value, onSelect, allowedSymbols, label }: PeriodicTableSelectorProps) => {
  const { t } = useLanguage();

  const isEnabled = (el: Element) => {
    if (allowedSymbols) return allowedSymbols.includes(el.symbol);
    return el.enabled;
  };

  const maxRow = 6;
  const maxCol = 18;

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-foreground block">{label}</label>}
      <div
        className="grid gap-[3px] w-full"
        style={{
          gridTemplateColumns: `repeat(${maxCol}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: maxRow * maxCol }, (_, i) => {
          const row = Math.floor(i / maxCol) + 1;
          const col = (i % maxCol) + 1;
          const el = PERIODIC_ELEMENTS.find(e => e.row === row && e.col === col);

          if (!el) {
            return <div key={i} className="aspect-square" />;
          }

          const enabled = isEnabled(el);
          const selected = value === el.symbol;

          return (
            <button
              key={el.symbol}
              disabled={!enabled}
              onClick={() => enabled && onSelect(el.symbol)}
              title={`${el.atomicNumber} — ${el.name}`}
              className={cn(
                "aspect-square rounded-sm flex flex-col items-center justify-center text-[10px] sm:text-xs leading-tight transition-all relative border",
                enabled
                  ? selected
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_8px_hsl(var(--primary)/0.5)] font-bold scale-110 z-10"
                    : "bg-secondary/80 text-foreground border-border hover:bg-primary/20 hover:border-primary/50 cursor-pointer"
                  : "bg-muted/30 text-muted-foreground/30 border-transparent cursor-default"
              )}
            >
              <span className="text-[7px] sm:text-[8px] leading-none opacity-60">{el.atomicNumber}</span>
              <span className="font-semibold leading-none">{el.symbol}</span>
            </button>
          );
        })}
      </div>
      {value && (
        <p className="text-xs text-muted-foreground font-mono mt-1">
          {label ? label.replace("...", "") : t("selectMetal").replace("...", "")}: <span className="text-primary font-semibold">{value}</span> — {PERIODIC_ELEMENTS.find(e => e.symbol === value)?.name}
        </p>
      )}
    </div>
  );
};

export default PeriodicTableSelector;
