import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Eye, EyeOff } from "lucide-react";
import type { PredefinedReaction } from "@/data/reactionData";

// ── Element data for visualization ──

interface ElementVizData {
  symbol: string;
  valenceElectrons: number;
  color: string;
  radius: number;
  electronegativity: number;
  bondType: "ionic" | "covalent";
}

const ELEMENT_VIZ: Record<string, ElementVizData> = {
  H:  { symbol: "H",  valenceElectrons: 1, color: "#e8e8e8", radius: 22, electronegativity: 2.2, bondType: "covalent" },
  C:  { symbol: "C",  valenceElectrons: 4, color: "#555555", radius: 28, electronegativity: 2.55, bondType: "covalent" },
  N:  { symbol: "N",  valenceElectrons: 5, color: "#3b82f6", radius: 26, electronegativity: 3.04, bondType: "covalent" },
  O:  { symbol: "O",  valenceElectrons: 6, color: "#ef4444", radius: 25, electronegativity: 3.44, bondType: "covalent" },
  S:  { symbol: "S",  valenceElectrons: 6, color: "#eab308", radius: 30, electronegativity: 2.58, bondType: "covalent" },
  Cl: { symbol: "Cl", valenceElectrons: 7, color: "#22c55e", radius: 27, electronegativity: 3.16, bondType: "ionic" },
  Na: { symbol: "Na", valenceElectrons: 1, color: "#a855f7", radius: 32, electronegativity: 0.93, bondType: "ionic" },
  Mg: { symbol: "Mg", valenceElectrons: 2, color: "#06b6d4", radius: 30, electronegativity: 1.31, bondType: "ionic" },
  Al: { symbol: "Al", valenceElectrons: 3, color: "#94a3b8", radius: 29, electronegativity: 1.61, bondType: "ionic" },
  Fe: { symbol: "Fe", valenceElectrons: 2, color: "#b45309", radius: 30, electronegativity: 1.83, bondType: "ionic" },
  K:  { symbol: "K",  valenceElectrons: 1, color: "#c084fc", radius: 34, electronegativity: 0.82, bondType: "ionic" },
};

type Phase = "separated" | "approaching" | "bonding" | "stable";

const W = 480;
const H = 280;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Electron dot positions around an atom (Lewis positions: top, right, bottom, left, + corners)
function electronPositions(cx: number, cy: number, r: number, count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  // 8 positions around the atom in pairs (top, right, bottom, left, then diagonals)
  const slots = [
    { x: 0, y: -1 },    // top
    { x: 1, y: 0 },     // right
    { x: 0, y: 1 },     // bottom
    { x: -1, y: 0 },    // left
    { x: 0.7, y: -0.7 }, // top-right
    { x: 0.7, y: 0.7 },  // bottom-right
    { x: -0.7, y: 0.7 }, // bottom-left
    { x: -0.7, y: -0.7 },// top-left
  ];
  const dist = r + 12;
  for (let i = 0; i < Math.min(count, 8); i++) {
    const s = slots[i];
    positions.push({ x: cx + s.x * dist, y: cy + s.y * dist });
  }
  return positions;
}

interface Props {
  reaction: PredefinedReaction;
}

const SynthesisVisualizer = ({ reaction }: Props) => {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("separated");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [showLewis, setShowLewis] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1 animation progress
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(0.5);
  const phaseRef = useRef<Phase>("separated");

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const elA = ELEMENT_VIZ[reaction.elementA || "Na"] || ELEMENT_VIZ.Na;
  const elB = ELEMENT_VIZ[reaction.elementB || "Cl"] || ELEMENT_VIZ.Cl;

  // Determine bond type
  const enDiff = Math.abs(elA.electronegativity - elB.electronegativity);
  const bondType = enDiff > 1.7 ? "ionic" : "covalent";
  const bondLabel = bondType === "ionic"
    ? { en: "Ionic Bond (electron transfer)", sq: "Lidhje Jonike (transferim elektronesh)" }
    : { en: "Covalent Bond (electron sharing)", sq: "Lidhje Kovalente (ndarje elektronesh)" };

  // Positions
  const separatedAx = W * 0.25;
  const separatedBx = W * 0.75;
  const centerY = H * 0.45;
  const bondedGap = (elA.radius + elB.radius) * 0.9;
  const bondedAx = W / 2 - bondedGap / 2;
  const bondedBx = W / 2 + bondedGap / 2;

  // Smooth easing for position interpolation
  const eased = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
  const ax = separatedAx + (bondedAx - separatedAx) * eased;
  const bx = separatedBx + (bondedBx - separatedBx) * eased;

  // Electron transfer progress (for ionic: electron moves from metal to nonmetal)
  const transferProgress = phase === "bonding" || phase === "stable" ? Math.min(1, (progress - 0.6) / 0.3) : 0;

  const handleRestart = useCallback(() => {
    setPhase("separated");
    setProgress(0);
    frameRef.current = 0;
    setPaused(false);
  }, []);

  // Animation loop
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      if (!pausedRef.current) {
        const spd = speedRef.current;
        frameRef.current++;

        setProgress(prev => {
          const delta = 0.002 * spd;
          const next = Math.min(1, prev + delta);

          // Phase transitions
          if (next < 0.15) {
            if (phaseRef.current !== "separated") setPhase("separated");
          } else if (next < 0.6) {
            if (phaseRef.current !== "approaching") setPhase("approaching");
          } else if (next < 0.9) {
            if (phaseRef.current !== "bonding") setPhase("bonding");
          } else {
            if (phaseRef.current !== "stable") setPhase("stable");
          }

          return next;
        });
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, []);

  // Valence electron dots for each atom
  const aElectrons = electronPositions(ax, centerY, elA.radius, elA.valenceElectrons);
  const bElectrons = electronPositions(bx, centerY, elB.radius, elB.valenceElectrons);

  // For ionic: build transfer paths for EACH electron moving from A to B's empty slots
  const numTransferring = bondType === "ionic" ? Math.min(elA.valenceElectrons, 2) : 0;
  const transferPaths = (() => {
    if (numTransferring === 0) return [];
    const allBSlots = electronPositions(bx, centerY, elB.radius, 8);
    return Array.from({ length: numTransferring }, (_, i) => ({
      fromX: aElectrons[i]?.x ?? ax,
      fromY: aElectrons[i]?.y ?? centerY,
      toX: allBSlots[elB.valenceElectrons + i]?.x ?? bx,
      toY: allBSlots[elB.valenceElectrons + i]?.y ?? centerY,
    }));
  })();

  const phaseLabels: Record<Phase, { en: string; sq: string }> = {
    separated: { en: "Separate atoms with valence electrons", sq: "Atome të ndara me elektrone valence" },
    approaching: { en: "Atoms approaching — electron interaction begins", sq: "Atomet po afrohen — ndërveprimi i elektroneve fillon" },
    bonding: bondType === "ionic"
      ? { en: "Electron transfer — ionic bond forming", sq: "Transferimi i elektronit — lidhja jonike po formohet" }
      : { en: "Electron sharing — covalent bond forming", sq: "Ndarja e elektroneve — lidhja kovalente po formohet" },
    stable: { en: "Stable product — bond formed", sq: "Produkt i qëndrueshëm — lidhja u formua" },
  };

  // Glow intensity during bonding
  const bondGlow = phase === "bonding" ? Math.sin(transferProgress * Math.PI) * 0.6 : phase === "stable" ? 0.3 : 0;

  // Render electron dot
  const renderElectronDot = (x: number, y: number, key: string, color: string, opacity = 1) => (
    <g key={key}>
      <circle cx={x} cy={y} r={3.5} fill={color} opacity={opacity * 0.9} />
      <circle cx={x} cy={y} r={5} fill={color} opacity={opacity * 0.2} />
    </g>
  );

  // Render atom with label and optional charge
  const renderAtom = (
    cx: number, cy: number, el: ElementVizData,
    charge?: string, glowColor?: string, glowAmount?: number
  ) => (
    <g>
      {/* Glow ring */}
      {glowAmount && glowAmount > 0 && (
        <circle cx={cx} cy={cy} r={el.radius + 12}
          fill="none" stroke={glowColor || el.color}
          strokeWidth={2} opacity={glowAmount}
        />
      )}
      {/* Atom body */}
      <circle cx={cx} cy={cy} r={el.radius}
        fill={el.color} opacity={0.85}
        stroke="hsl(var(--border))" strokeWidth={1}
      />
      {/* Symbol */}
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central"
        fontSize={14} fontWeight={700}
        fill={["H", "C", "Fe", "S"].includes(el.symbol) ? "#fff" : "#1a1a1a"}
      >
        {el.symbol}
      </text>
      {/* Charge — positioned well above the atom, clear of electrons */}
      {charge && (
        <text x={cx} y={cy - el.radius - 18}
          textAnchor="middle" fontSize={11} fontWeight={700}
          fill="hsl(var(--primary))"
        >
          {charge}
        </text>
      )}
    </g>
  );

  // Lewis dot structure labels
  const lewisA = showLewis ? `${elA.symbol}: ${elA.valenceElectrons} valence e⁻` : "";
  const lewisB = showLewis ? `${elB.symbol}: ${elB.valenceElectrons} valence e⁻` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {language === "sq" ? "Vizualizimi i Sintezës" : "Synthesis Visualization"}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLewis(p => !p)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              showLewis
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {showLewis ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            Lewis
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">{language === "sq" ? "Shpejtësia" : "Speed"}</span>
            {[0.3, 0.5, 1].map(s => (
              <button key={s} onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  speed === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >{s === 0.3 ? "0.3×" : s === 0.5 ? "0.5×" : "1×"}</button>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPaused(p => !p)}>
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleRestart}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* SVG visualization */}
      <div className="relative rounded-lg border border-border overflow-hidden" style={{ background: "hsl(var(--background))" }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: 240 }}>
          {/* Background */}
          <rect x={10} y={10} width={W - 20} height={H - 20} rx={8}
            fill="hsla(var(--secondary), 0.3)" stroke="hsl(var(--border))" strokeWidth={0.5} />

          {/* Bond glow at center */}
          {bondGlow > 0 && (
            <>
              <circle cx={W / 2} cy={centerY} r={30 + bondGlow * 20}
                fill="none" stroke={bondType === "ionic" ? "hsl(var(--primary))" : "hsl(45, 90%, 55%)"}
                strokeWidth={2} opacity={bondGlow * 0.5}
              />
              <circle cx={W / 2} cy={centerY} r={15 + bondGlow * 10}
                fill={bondType === "ionic" ? "hsla(var(--primary), 0.1)" : "hsla(45, 90%, 55%, 0.1)"}
              />
            </>
          )}

          {/* Bond line (forms during bonding phase) */}
          {progress > 0.6 && (
            <line x1={ax + elA.radius * 0.7} y1={centerY}
              x2={bx - elB.radius * 0.7} y2={centerY}
              stroke={bondType === "ionic" ? "hsl(var(--primary))" : "hsl(45, 80%, 50%)"}
              strokeWidth={3}
              opacity={Math.min(1, (progress - 0.6) / 0.2)}
              strokeLinecap="round"
            />
          )}
          {/* Double bond indicator for covalent */}
          {bondType === "covalent" && progress > 0.65 && (
            <line x1={ax + elA.radius * 0.7} y1={centerY + 6}
              x2={bx - elB.radius * 0.7} y2={centerY + 6}
              stroke="hsl(45, 80%, 50%)"
              strokeWidth={2}
              opacity={Math.min(1, (progress - 0.65) / 0.2) * 0.5}
              strokeLinecap="round"
              strokeDasharray="4 3"
            />
          )}

          {/* Atom A */}
          {renderAtom(ax, centerY, elA,
            phase === "stable" && bondType === "ionic" ? (elA.valenceElectrons <= 2 ? `${elA.valenceElectrons}+` : "") : undefined,
            bondType === "ionic" ? "#ef4444" : "hsl(45, 80%, 50%)",
            bondGlow
          )}

          {/* Atom B */}
          {renderAtom(bx, centerY, elB,
            phase === "stable" && bondType === "ionic" ? (elA.valenceElectrons <= 2 ? `${elA.valenceElectrons}−` : "") : undefined,
            bondType === "ionic" ? "#3b82f6" : "hsl(45, 80%, 50%)",
            bondGlow
          )}

          {/* Valence electrons for A */}
          {aElectrons.map((e, i) => {
            // For ionic: each electron transfers individually to B's empty slot
            if (bondType === "ionic" && i < numTransferring && transferProgress > 0) {
              const path = transferPaths[i];
              if (path) {
                // Stagger each electron slightly
                const stagger = i * 0.15;
                const tp = Math.max(0, Math.min(1, (transferProgress - stagger) / (1 - stagger)));
                const easedTp = tp < 0.5 ? 2 * tp * tp : 1 - Math.pow(-2 * tp + 2, 2) / 2;
                const tx = path.fromX + (path.toX - path.fromX) * easedTp;
                const ty = path.fromY + (path.toY - path.fromY) * easedTp;
                return renderElectronDot(tx, ty, `ae-${i}`, "#fbbf24", 1);
              }
            }
            // Hide transferred electrons in stable state
            if (bondType === "ionic" && phase === "stable" && i < numTransferring) {
              return null;
            }
            return renderElectronDot(e.x, e.y, `ae-${i}`, "#fbbf24");
          })}

          {/* Valence electrons for B */}
          {bElectrons.map((e, i) => renderElectronDot(e.x, e.y, `be-${i}`, "#60a5fa"))}

          {/* Gained electrons on B (for ionic, after transfer) */}
          {bondType === "ionic" && phase === "stable" && (
            <>
              {Array.from({ length: numTransferring }).map((_, i) => {
                const allBSlots = electronPositions(bx, centerY, elB.radius, 8);
                const slotIndex = elB.valenceElectrons + i;
                const gx = allBSlots[slotIndex]?.x || bx;
                const gy = allBSlots[slotIndex]?.y || centerY;
                return renderElectronDot(gx, gy, `gained-${i}`, "#fbbf24");
              })}
            </>
          )}

          {/* Shared electron pair visual for covalent bonding */}
          {bondType === "covalent" && progress > 0.6 && (
            <>
              <circle cx={(ax + bx) / 2 - 4} cy={centerY - 5}
                r={3} fill="#fbbf24" opacity={Math.min(1, (progress - 0.6) / 0.2)} />
              <circle cx={(ax + bx) / 2 + 4} cy={centerY - 5}
                r={3} fill="#60a5fa" opacity={Math.min(1, (progress - 0.6) / 0.2)} />
            </>
          )}

          {/* Lewis dot labels */}
          {showLewis && (
            <>
              <text x={ax} y={centerY + elA.radius + 38} textAnchor="middle"
                fontSize={9} fill="hsl(var(--muted-foreground))" fontFamily="monospace">
                {lewisA}
              </text>
              <text x={bx} y={centerY + elB.radius + 38} textAnchor="middle"
                fontSize={9} fill="hsl(var(--muted-foreground))" fontFamily="monospace">
                {lewisB}
              </text>
              {/* Electron config display */}
              {phase === "stable" && (
                <text x={W / 2} y={H - 20} textAnchor="middle"
                  fontSize={9} fill="hsl(var(--primary))" fontWeight={600}>
                  {bondType === "ionic"
                    ? (language === "sq" ? "Transferim elektronesh — Lidhje Jonike" : "Electron transfer — Ionic Bond")
                    : (language === "sq" ? "Ndarje elektronesh — Lidhje Kovalente" : "Electron sharing — Covalent Bond")}
                </text>
              )}
            </>
          )}

          {/* Atom labels below — pushed further down to avoid electron overlap */}
          <text x={ax} y={centerY + elA.radius + 26} textAnchor="middle"
            fontSize={10} fill="hsl(var(--muted-foreground))" opacity={0.7}>
            {elA.symbol}
          </text>
          <text x={bx} y={centerY + elB.radius + 26} textAnchor="middle"
            fontSize={10} fill="hsl(var(--muted-foreground))" opacity={0.7}>
            {elB.symbol}
          </text>

          {/* Equation at top */}
          <text x={W / 2} y={22} textAnchor="middle"
            fontSize={11} fontWeight={600} fill="hsl(var(--foreground))" fontFamily="monospace">
            {reaction.displayEquation}
          </text>
        </svg>
      </div>

      {/* Phase indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className={`rounded-lg border p-3 text-center text-sm ${
            phase === "stable"
              ? "border-success/40 bg-success/5 text-foreground/80"
              : phase === "bonding"
                ? "border-primary/40 bg-primary/5 text-foreground/80"
                : "border-border bg-secondary/30 text-muted-foreground"
          }`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          {phaseLabels[phase][language]}
        </motion.div>
      </AnimatePresence>

      {/* Bond info panel */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`rounded-lg border p-3 text-center transition-all ${
          phase === "separated" ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/20"
        }`}>
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {language === "sq" ? "Para" : "Before"}
          </div>
          <div className="text-xs text-foreground/80">
            {elA.symbol} ({elA.valenceElectrons}e⁻) + {elB.symbol} ({elB.valenceElectrons}e⁻)
          </div>
        </div>
        <div className={`rounded-lg border p-3 text-center transition-all ${
          phase === "bonding" ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/20"
        }`}>
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {language === "sq" ? "Lidhja" : "Bonding"}
          </div>
          <div className="text-xs text-foreground/80">
            {bondLabel[language]}
          </div>
        </div>
        <div className={`rounded-lg border p-3 text-center transition-all ${
          phase === "stable" ? "border-success/40 bg-success/5" : "border-border bg-secondary/20"
        }`}>
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {language === "sq" ? "Produkti" : "Product"}
          </div>
          <div className="text-xs text-foreground/80 font-mono">
            {reaction.displayEquation.split("→")[1]?.trim() || ""}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { color: "#fbbf24", label: language === "sq" ? `e⁻ nga ${elA.symbol}` : `e⁻ from ${elA.symbol}` },
          { color: "#60a5fa", label: language === "sq" ? `e⁻ nga ${elB.symbol}` : `e⁻ from ${elB.symbol}` },
          { color: bondType === "ionic" ? "hsl(var(--primary))" : "hsl(45, 80%, 50%)",
            label: bondType === "ionic" ? (language === "sq" ? "Lidhje jonike" : "Ionic bond") : (language === "sq" ? "Lidhje kovalente" : "Covalent bond") },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, opacity: 0.85 }} />
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SynthesisVisualizer;
