import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ReactionResult } from "@/engine/chemistryEngine";
import { getMetal, METALS } from "@/data/chemistryData";

// Element color mapping for spheres
const ELEMENT_COLORS: Record<string, string> = {
  Li: "#cc80ff", K: "#8f40d4", Ba: "#00c900", Ca: "#3dff00",
  Na: "#ab5cf2", Mg: "#8aff00", Al: "#bfa6a6", Mn: "#9c7ac7",
  Zn: "#7d80b0", Cr: "#8a99c7", Fe: "#e06633", Ni: "#50d050",
  Sn: "#668080", Pb: "#575961", Cu: "#c88033", Hg: "#b8b8d0",
  Ag: "#c0c0c0", Pt: "#d0d0e0", Au: "#ffd123",
  S: "#ffff30", O: "#ff0d0d", Cl: "#1ff01f", N: "#3050f8",
  H: "#ffffff", P: "#ff8000",
};

function getColor(symbol: string): string {
  return ELEMENT_COLORS[symbol] || "#aaaaaa";
}

/** Abbreviation for anion display */
function anionLabel(formula: string): string {
  const map: Record<string, string> = {
    SO4: "SO₄", Cl: "Cl", NO3: "NO₃", OH: "OH", CO3: "CO₃", PO4: "PO₄",
  };
  return map[formula] || formula;
}

interface Props {
  result: ReactionResult;
  metalSymbol: string;
  saltCationSymbol: string;
  anionFormula: string;
}

type Phase = "before" | "approach" | "exchange" | "after";

const PHASE_DURATION = 2200;

const SingleDisplacementVisualizer = ({ result, metalSymbol, saltCationSymbol, anionFormula }: Props) => {
  const { t, language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("before");
  const [auto, setAuto] = useState(true);

  const incomingMetal = getMetal(metalSymbol);
  const displacedMetal = getMetal(saltCationSymbol);
  const occurs = result.occurs;

  // Activity series bar data
  const activityData = useMemo(() => {
    const sorted = [...METALS].sort((a, b) => a.activityRank - b.activityRank);
    return sorted.map(m => ({
      symbol: m.symbol,
      rank: m.activityRank,
      isIncoming: m.symbol === metalSymbol,
      isDisplaced: m.symbol === saltCationSymbol,
    }));
  }, [metalSymbol, saltCationSymbol]);

  // Auto-advance phases
  useEffect(() => {
    if (!auto || !occurs) return;
    const phases: Phase[] = ["before", "approach", "exchange", "after"];
    const idx = phases.indexOf(phase);
    if (idx < phases.length - 1) {
      const timer = setTimeout(() => setPhase(phases[idx + 1]), PHASE_DURATION);
      return () => clearTimeout(timer);
    } else {
      // Loop
      const timer = setTimeout(() => setPhase("before"), PHASE_DURATION * 1.5);
      return () => clearTimeout(timer);
    }
  }, [phase, auto, occurs]);

  const phaseLabels: Record<Phase, { en: string; sq: string }> = {
    before: { en: "Initial State", sq: "Gjendja Fillestare" },
    approach: { en: "Metal Approaches", sq: "Metali Afrohet" },
    exchange: { en: "Bond Exchange", sq: "Shkëmbimi i Lidhjeve" },
    after: { en: "Products Formed", sq: "Produktet e Formuara" },
  };

  const phaseDescriptions: Record<Phase, { en: string; sq: string }> = {
    before: {
      en: `${metalSymbol} (solid) is placed near a solution of ${saltCationSymbol}${anionLabel(anionFormula)}.`,
      sq: `${metalSymbol} (i ngurtë) vendoset pranë tretësirës së ${saltCationSymbol}${anionLabel(anionFormula)}.`,
    },
    approach: {
      en: `${metalSymbol} approaches the ${saltCationSymbol}-${anionLabel(anionFormula)} compound.`,
      sq: `${metalSymbol} afrohet tek komponimi ${saltCationSymbol}-${anionLabel(anionFormula)}.`,
    },
    exchange: {
      en: occurs
        ? `${metalSymbol} donates electrons and bonds with ${anionLabel(anionFormula)}. ${saltCationSymbol} is displaced.`
        : `${metalSymbol} cannot displace ${saltCationSymbol} — not reactive enough.`,
      sq: occurs
        ? `${metalSymbol} dhuron elektrone dhe lidhet me ${anionLabel(anionFormula)}. ${saltCationSymbol} zëvendësohet.`
        : `${metalSymbol} nuk mund të zëvendësojë ${saltCationSymbol} — nuk është mjaft reaktiv.`,
    },
    after: {
      en: occurs
        ? `Products: ${metalSymbol}${anionLabel(anionFormula)} (new salt) + ${saltCationSymbol} (solid).`
        : `No reaction occurs.`,
      sq: occurs
        ? `Produktet: ${metalSymbol}${anionLabel(anionFormula)} (kripë e re) + ${saltCationSymbol} (i ngurtë).`
        : `Nuk ndodh reagim.`,
    },
  };

  // Position calculations for the particle visualization (SVG coords)
  const svgW = 560;
  const svgH = 240;
  const centerY = svgH / 2;

  // Incoming metal position
  const incomingX = phase === "before" ? 70 : phase === "approach" ? 170 : phase === "exchange" ? 230 : (occurs ? 270 : 70);
  const incomingY = centerY;

  // Salt cation position (bonded to anion initially)
  const saltCatX = phase === "before" ? 320 : phase === "approach" ? 320 : phase === "exchange" ? (occurs ? 390 : 320) : (occurs ? 430 : 320);
  const saltCatY = phase === "after" && occurs ? centerY + 40 : centerY;

  // Anion position
  const anionX = phase === "before" ? 380 : phase === "approach" ? 380 : phase === "exchange" ? (occurs ? 340 : 380) : (occurs ? 340 : 380);
  const anionY = centerY;

  // Bond line between salt cation and anion
  const showOldBond = phase === "before" || phase === "approach" || (!occurs && (phase === "exchange" || phase === "after"));
  const showNewBond = occurs && (phase === "exchange" || phase === "after");

  // Electron dots moving from incoming to salt cation
  const showElectrons = phase === "exchange" && occurs;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {language === "sq" ? "Vizualizimi i Grimcave" : "Particle Visualization"}
        </h3>
        <div className="flex gap-2">
          {(["before", "approach", "exchange", "after"] as Phase[]).map(p => (
            <button
              key={p}
              onClick={() => { setPhase(p); setAuto(false); }}
              className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                phase === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {phaseLabels[p][language]}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Animation Area */}
      <div className="rounded-lg bg-background/50 border border-border overflow-hidden">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ maxHeight: 260 }}>
          {/* Background solution tint */}
          <rect x={190} y={20} width={350} height={svgH - 40} rx={12} fill="hsl(210, 60%, 50%)" opacity={0.06} />
          <text x={365} y={38} textAnchor="middle" fontSize={9} fill="hsl(210, 40%, 60%)" opacity={0.5}>
            {language === "sq" ? "tretësirë" : "solution"}
          </text>

          {/* Old bond (dashed when breaking) */}
          {showOldBond && (
            <motion.line
              x1={saltCatX} y1={saltCatY} x2={anionX} y2={anionY}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray={phase === "exchange" && occurs ? "4 4" : "0"}
              opacity={phase === "exchange" && occurs ? 0.3 : 0.6}
              initial={false}
              animate={{ x1: saltCatX, y1: saltCatY, x2: anionX, y2: anionY }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}

          {/* New bond */}
          {showNewBond && (
            <motion.line
              x1={incomingX} y1={incomingY} x2={anionX} y2={anionY}
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, x1: incomingX, x2: anionX }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}

          {/* Electron dots */}
          {showElectrons && (
            <>
              {[0, 1, 2].map(i => (
                <motion.circle
                  key={i}
                  r={3}
                  fill="#ffcc00"
                  initial={{ cx: incomingX + 20, cy: centerY - 8 + i * 8, opacity: 0 }}
                  animate={{
                    cx: [incomingX + 20, (incomingX + saltCatX) / 2, saltCatX - 20],
                    cy: [centerY - 8 + i * 8, centerY - 15 + i * 10, saltCatY - 8 + i * 8],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.8, delay: i * 0.25, ease: "easeInOut", repeat: Infinity }}
                />
              ))}
              <text
                x={(incomingX + saltCatX) / 2}
                y={centerY - 28}
                textAnchor="middle"
                fontSize={9}
                fill="#ffcc00"
                fontWeight={600}
              >
                e⁻
              </text>
            </>
          )}

          {/* Incoming metal atom */}
          <motion.g
            animate={{ x: incomingX, y: incomingY }}
            initial={{ x: incomingX, y: incomingY }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <circle
              r={22}
              fill={getColor(metalSymbol)}
              opacity={0.85}
              stroke={phase === "exchange" && occurs ? "#ffcc00" : "transparent"}
              strokeWidth={2}
            />
            <text
              textAnchor="middle" dominantBaseline="central"
              fontSize={13} fontWeight={700} fill="#111"
              y={1}
            >
              {metalSymbol}
            </text>
            {phase === "before" && (
              <text y={36} textAnchor="middle" fontSize={8} fill="hsl(var(--muted-foreground))">
                {language === "sq" ? "(i ngurtë)" : "(solid)"}
              </text>
            )}
          </motion.g>

          {/* Salt cation */}
          <motion.g
            animate={{ x: saltCatX, y: saltCatY }}
            initial={{ x: saltCatX, y: saltCatY }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <circle
              r={20}
              fill={getColor(saltCationSymbol)}
              opacity={phase === "after" && occurs ? 0.9 : 0.7}
              stroke={phase === "exchange" && occurs ? "#ffcc00" : "transparent"}
              strokeWidth={2}
            />
            <text
              textAnchor="middle" dominantBaseline="central"
              fontSize={12} fontWeight={700} fill="#111"
              y={1}
            >
              {saltCationSymbol}
              {(phase === "before" || phase === "approach") && (
                <tspan fontSize={8} dy={-6}>
                  {result.reductionHalf?.oxidationStateBefore ? `+${result.reductionHalf.oxidationStateBefore}` : ""}
                </tspan>
              )}
            </text>
            {phase === "after" && occurs && (
              <motion.text
                y={34}
                textAnchor="middle" fontSize={8} fill="hsl(var(--muted-foreground))"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                {language === "sq" ? "(i ngurtë)" : "(solid)"}
              </motion.text>
            )}
          </motion.g>

          {/* Anion */}
          <motion.g
            animate={{ x: anionX, y: anionY }}
            initial={{ x: anionX, y: anionY }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <circle
              r={18}
              fill="hsl(210, 50%, 55%)" opacity={0.6}
            />
            <text
              textAnchor="middle" dominantBaseline="central"
              fontSize={10} fontWeight={600} fill="#fff"
              y={1}
            >
              {anionLabel(anionFormula)}
            </text>
          </motion.g>

          {/* No reaction X overlay */}
          {!occurs && phase === "exchange" && (
            <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
              <line x1={200} y1={60} x2={260} y2={140} stroke="hsl(var(--destructive))" strokeWidth={3} strokeLinecap="round" />
              <line x1={260} y1={60} x2={200} y2={140} stroke="hsl(var(--destructive))" strokeWidth={3} strokeLinecap="round" />
            </motion.g>
          )}
        </svg>
      </div>

      {/* Phase description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          className="text-sm text-foreground/80 leading-relaxed text-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {phaseDescriptions[phase][language]}
        </motion.p>
      </AnimatePresence>

      {/* Activity Series Bar */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {language === "sq" ? "Seria e Aktivitetit" : "Activity Series"}
        </p>
        <div className="flex items-end gap-[2px] h-12">
          {activityData.map(m => {
            const height = Math.max(12, 48 - m.rank * 2.2);
            const isHighlighted = m.isIncoming || m.isDisplaced;
            return (
              <div key={m.symbol} className="flex flex-col items-center" style={{ width: 22 }}>
                <motion.div
                  className="rounded-sm w-full"
                  style={{
                    height,
                    backgroundColor: m.isIncoming
                      ? "hsl(var(--primary))"
                      : m.isDisplaced
                        ? "hsl(var(--destructive))"
                        : "hsl(var(--muted))",
                    opacity: isHighlighted ? 1 : 0.4,
                  }}
                  layout
                />
                <span
                  className="text-[7px] mt-0.5"
                  style={{
                    fontWeight: isHighlighted ? 700 : 400,
                    color: isHighlighted ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {m.symbol}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[8px] text-muted-foreground px-1">
          <span>← {language === "sq" ? "Më reaktiv" : "More reactive"}</span>
          <span>{language === "sq" ? "Më pak reaktiv" : "Less reactive"} →</span>
        </div>
      </div>

      {/* Play/Pause */}
      <div className="flex justify-center">
        <button
          onClick={() => { setAuto(!auto); if (!auto) setPhase("before"); }}
          className="text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
        >
          {auto
            ? (language === "sq" ? "⏸ Ndalo" : "⏸ Pause")
            : (language === "sq" ? "▶ Luaj" : "▶ Play")}
        </button>
      </div>
    </div>
  );
};

export default SingleDisplacementVisualizer;
