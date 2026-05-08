import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Thermometer } from "lucide-react";
import type { PredefinedReaction } from "@/data/reactionData";

// ── Decomposition molecule configs ──

interface AtomDef {
  symbol: string;
  color: string;
  radius: number;
  offsetX: number;
  offsetY: number;
}

interface MoleculeConfig {
  atoms: AtomDef[];
  bonds: { from: number; to: number }[];
  productGroups: number[][]; // indices grouped into products
  productLabels: string[];
}

const MOLECULE_CONFIGS: Record<string, MoleculeConfig> = {
  "dec-1": { // 2H₂O → 2H₂ + O₂
    atoms: [
      { symbol: "O", color: "#ef4444", radius: 24, offsetX: -30, offsetY: 0 },
      { symbol: "H", color: "#e8e8e8", radius: 18, offsetX: -55, offsetY: -20 },
      { symbol: "H", color: "#e8e8e8", radius: 18, offsetX: -55, offsetY: 20 },
      { symbol: "O", color: "#ef4444", radius: 24, offsetX: 30, offsetY: 0 },
      { symbol: "H", color: "#e8e8e8", radius: 18, offsetX: 55, offsetY: -20 },
      { symbol: "H", color: "#e8e8e8", radius: 18, offsetX: 55, offsetY: 20 },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 0, to: 2 }, { from: 3, to: 4 }, { from: 3, to: 5 }],
    productGroups: [[1, 2], [4, 5], [0, 3]],
    productLabels: ["H₂", "H₂", "O₂"],
  },
  "dec-2": { // CaCO₃ → CaO + CO₂
    atoms: [
      { symbol: "Ca", color: "#06b6d4", radius: 26, offsetX: -45, offsetY: 0 },
      { symbol: "C", color: "#555555", radius: 22, offsetX: 0, offsetY: 0 },
      { symbol: "O", color: "#ef4444", radius: 22, offsetX: -22, offsetY: -20 },
      { symbol: "O", color: "#ef4444", radius: 22, offsetX: 22, offsetY: -20 },
      { symbol: "O", color: "#ef4444", radius: 22, offsetX: 0, offsetY: 24 },
    ],
    bonds: [{ from: 0, to: 2 }, { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }],
    productGroups: [[0, 4], [1, 2, 3]],
    productLabels: ["CaO", "CO₂"],
  },
  "dec-3": { // 2KClO₃ → 2KCl + 3O₂
    atoms: [
      { symbol: "K", color: "#c084fc", radius: 26, offsetX: -50, offsetY: 0 },
      { symbol: "Cl", color: "#22c55e", radius: 24, offsetX: -20, offsetY: 0 },
      { symbol: "O", color: "#ef4444", radius: 20, offsetX: 10, offsetY: -22 },
      { symbol: "O", color: "#ef4444", radius: 20, offsetX: 30, offsetY: 0 },
      { symbol: "O", color: "#ef4444", radius: 20, offsetX: 10, offsetY: 22 },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }],
    productGroups: [[0, 1], [2, 3, 4]],
    productLabels: ["KCl", "O₂"],
  },
  "dec-4": { // 2H₂O₂ → 2H₂O + O₂
    atoms: [
      { symbol: "H", color: "#e8e8e8", radius: 18, offsetX: -50, offsetY: -18 },
      { symbol: "O", color: "#ef4444", radius: 22, offsetX: -25, offsetY: 0 },
      { symbol: "O", color: "#ef4444", radius: 22, offsetX: 5, offsetY: 0 },
      { symbol: "H", color: "#e8e8e8", radius: 18, offsetX: 30, offsetY: -18 },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }],
    productGroups: [[0, 1], [2, 3]],
    productLabels: ["H₂O", "·O·"],
  },
  "dec-5": { // 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂
    atoms: [
      { symbol: "Na", color: "#a855f7", radius: 24, offsetX: -55, offsetY: 0 },
      { symbol: "H", color: "#e8e8e8", radius: 16, offsetX: -30, offsetY: -22 },
      { symbol: "C", color: "#555555", radius: 20, offsetX: 0, offsetY: 0 },
      { symbol: "O", color: "#ef4444", radius: 20, offsetX: 25, offsetY: -18 },
      { symbol: "O", color: "#ef4444", radius: 20, offsetX: 25, offsetY: 18 },
      { symbol: "O", color: "#ef4444", radius: 20, offsetX: -20, offsetY: 18 },
    ],
    bonds: [{ from: 0, to: 5 }, { from: 1, to: 5 }, { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }],
    productGroups: [[0, 5], [1], [2, 3, 4]],
    productLabels: ["Na₂CO₃", "H₂O", "CO₂"],
  },
  "dec-6": { // 2HgO → 2Hg + O₂
    atoms: [
      { symbol: "Hg", color: "#94a3b8", radius: 28, offsetX: -30, offsetY: 0 },
      { symbol: "O", color: "#ef4444", radius: 22, offsetX: 30, offsetY: 0 },
    ],
    bonds: [{ from: 0, to: 1 }],
    productGroups: [[0], [1]],
    productLabels: ["Hg", "O₂"],
  },
};

// Fallback config
const DEFAULT_CONFIG: MoleculeConfig = {
  atoms: [
    { symbol: "A", color: "#94a3b8", radius: 24, offsetX: -25, offsetY: 0 },
    { symbol: "B", color: "#eab308", radius: 24, offsetX: 25, offsetY: 0 },
  ],
  bonds: [{ from: 0, to: 1 }],
  productGroups: [[0], [1]],
  productLabels: ["A", "B"],
};

type Phase = "stable" | "heating" | "breaking" | "separated";

const W = 480;
const H = 320;
const CX = W / 2;
const CY = H * 0.42;

interface Props {
  reaction: PredefinedReaction;
}

const DecompositionVisualizer = ({ reaction }: Props) => {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("stable");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(0.5);
  const phaseRef = useRef<Phase>("stable");

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const config = MOLECULE_CONFIGS[reaction.id] || DEFAULT_CONFIG;
  const isEndothermic = reaction.energyChange === "endothermic";

  const handleRestart = useCallback(() => {
    setPhase("stable");
    setProgress(0);
    setPaused(false);
  }, []);

  // Animation loop
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      if (!pausedRef.current) {
        setProgress(prev => {
          const delta = 0.0018 * speedRef.current;
          const next = Math.min(1, prev + delta);
          if (next < 0.15) {
            if (phaseRef.current !== "stable") setPhase("stable");
          } else if (next < 0.55) {
            if (phaseRef.current !== "heating") setPhase("heating");
          } else if (next < 0.85) {
            if (phaseRef.current !== "breaking") setPhase("breaking");
          } else {
            if (phaseRef.current !== "separated") setPhase("separated");
          }
          return next;
        });
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, []);

  // Temperature (0–1 mapped to progress)
  const temperature = Math.min(1, progress * 1.2);
  const tempCelsius = Math.round(25 + temperature * 775); // 25°C → 800°C

  // Vibration during heating/breaking
  const vibrationAmp = phase === "heating"
    ? ((progress - 0.15) / 0.4) * 3
    : phase === "breaking"
      ? 3 + ((progress - 0.55) / 0.3) * 2
      : 0;

  // Bond opacity (fade out during breaking)
  const bondOpacity = phase === "breaking"
    ? Math.max(0, 1 - ((progress - 0.55) / 0.25))
    : phase === "separated" ? 0 : 1;

  // Bond glow (red during breaking)
  const bondGlow = phase === "breaking"
    ? Math.sin(((progress - 0.55) / 0.3) * Math.PI) * 0.8
    : phase === "heating"
      ? ((progress - 0.15) / 0.4) * 0.3
      : 0;

  // Separation spread — longer duration for smoother motion
  const separationProgress = phase === "separated"
    ? Math.min(1, (progress - 0.85) / 0.15)
    : phase === "breaking"
      ? Math.max(0, (progress - 0.7) / 0.15) * 0.3
      : 0;

  // Smooth cubic ease-out for separation
  const easedSep = 1 - Math.pow(1 - separationProgress, 3);

  // Product group centers (spread apart)
  const groupCount = config.productGroups.length;
  const getProductOffset = (groupIndex: number) => {
    const spread = 70;
    const startX = -(groupCount - 1) * spread / 2;
    return {
      dx: (startX + groupIndex * spread) * easedSep,
      dy: (groupIndex % 2 === 0 ? -1 : 1) * 15 * easedSep,
    };
  };

  // Find which product group an atom belongs to
  const getAtomGroupIndex = (atomIndex: number): number => {
    for (let g = 0; g < config.productGroups.length; g++) {
      if (config.productGroups[g].includes(atomIndex)) return g;
    }
    return 0;
  };

  // Compute atom positions
  const getAtomPos = (atomIndex: number, frameCount: number) => {
    const atom = config.atoms[atomIndex];
    const groupIdx = getAtomGroupIndex(atomIndex);
    const offset = getProductOffset(groupIdx);
    const vx = vibrationAmp > 0 ? Math.sin(frameCount * 0.15 + atomIndex * 2.1) * vibrationAmp : 0;
    const vy = vibrationAmp > 0 ? Math.cos(frameCount * 0.18 + atomIndex * 1.7) * vibrationAmp : 0;
    return {
      x: CX + atom.offsetX + offset.dx + vx,
      y: CY + atom.offsetY + offset.dy + vy,
    };
  };

  // Use a frame counter for vibration
  const frameCountRef = useRef(0);
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      if (!pausedRef.current) frameCountRef.current++;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { running = false; };
  }, []);

  // Force re-render for vibration
  const [, forceRender] = useState(0);
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      if (!pausedRef.current && vibrationAmp > 0) forceRender(v => v + 1);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { running = false; };
  }, [vibrationAmp]);

  const phaseLabels: Record<Phase, { en: string; sq: string }> = {
    stable: { en: "Stable compound — bonds intact", sq: "Përbërje e qëndrueshme — lidhjet e paprekura" },
    heating: { en: "Heat energy input — molecules vibrating", sq: "Furnizim me energji termike — molekulat po dridhen" },
    breaking: { en: "Bonds weakening and breaking apart", sq: "Lidhjet po dobësohen dhe po shkëputen" },
    separated: { en: "Decomposition complete — products formed", sq: "Dekompozimi i plotë — produktet u formuan" },
  };

  // Heat wave particles — spread across the full bottom
  const heatParticles = phase === "heating" || phase === "breaking" ? Array.from({ length: 18 }).map((_, i) => {
    const t = (progress * 3.5 + i * 0.17) % 1;
    const x = 30 + (i / 17) * (W - 60) + Math.sin(i * 1.3 + progress * 6) * 12;
    const y = H - 25 - t * (H * 0.45) + Math.sin(t * Math.PI * 2.5 + i * 0.9) * 6;
    const opacity = Math.sin(t * Math.PI) * 0.6;
    const size = 2 + Math.sin(i * 0.7) * 1;
    return { x, y, opacity, size };
  }) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {language === "sq" ? "Vizualizimi i Dekompozimit" : "Decomposition Visualization"}
        </h3>
        <div className="flex items-center gap-2">
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
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: 260 }}>
          {/* Background with heat tint */}
          <rect x={10} y={10} width={W - 20} height={H - 20} rx={8}
            fill="hsla(var(--secondary), 0.3)" stroke="hsl(var(--border))" strokeWidth={0.5} />
          {/* Heat overlay */}
          {temperature > 0.1 && (
            <rect x={10} y={10} width={W - 20} height={H - 20} rx={8}
              fill={`hsla(0, 80%, 50%, ${temperature * 0.06})`} />
          )}

          {/* Equation at top */}
          <text x={W / 2} y={26} textAnchor="middle"
            fontSize={11} fontWeight={600} fill="hsl(var(--foreground))" fontFamily="monospace">
            {reaction.displayEquation}
          </text>

          {/* Heat wave particles rising from bottom */}
          {heatParticles.map((p, i) => (
            <g key={`heat-${i}`} opacity={p.opacity}>
              <circle cx={p.x} cy={p.y} r={p.size}
                fill={i % 3 === 0 ? "hsl(0, 75%, 55%)" : i % 3 === 1 ? "hsl(25, 90%, 55%)" : "hsl(45, 90%, 60%)"}
              />
            </g>
          ))}

          {/* Bond lines */}
          {config.bonds.map((bond, i) => {
            const from = getAtomPos(bond.from, frameCountRef.current);
            const to = getAtomPos(bond.to, frameCountRef.current);

            // Check if this bond crosses product groups (it's a breaking bond)
            const fromGroup = getAtomGroupIndex(bond.from);
            const toGroup = getAtomGroupIndex(bond.to);
            const isBreakingBond = fromGroup !== toGroup;

            const thisOpacity = isBreakingBond ? bondOpacity : 1;
            const thisGlow = isBreakingBond ? bondGlow : 0;

            if (thisOpacity <= 0) return null;

            return (
              <g key={`bond-${i}`}>
                {/* Bond glow (red for breaking) */}
                {thisGlow > 0 && (
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="hsl(0, 80%, 55%)" strokeWidth={8}
                    opacity={thisGlow * 0.3} strokeLinecap="round"
                  />
                )}
                {/* Bond line */}
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={isBreakingBond && bondGlow > 0
                    ? `hsl(${30 - bondGlow * 30}, 80%, 55%)`
                    : "hsl(var(--muted-foreground))"}
                  strokeWidth={isBreakingBond ? 3 : 2.5}
                  opacity={thisOpacity * 0.7}
                  strokeLinecap="round"
                  strokeDasharray={isBreakingBond && phase === "breaking"
                    ? `${6 - bondOpacity * 4} ${2 + (1 - bondOpacity) * 6}`
                    : "none"}
                />
              </g>
            );
          })}

          {/* Atoms */}
          {config.atoms.map((atom, i) => {
            const pos = getAtomPos(i, frameCountRef.current);
            const groupIdx = getAtomGroupIndex(i);
            const isProductHighlight = phase === "separated";
            return (
              <g key={`atom-${i}`}>
                {/* Product highlight ring */}
                {isProductHighlight && (
                  <circle cx={pos.x} cy={pos.y} r={atom.radius + 6}
                    fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5}
                    opacity={0.3}
                  />
                )}
                {/* Atom body */}
                <circle cx={pos.x} cy={pos.y} r={atom.radius}
                  fill={atom.color} opacity={0.85}
                  stroke="hsl(var(--border))" strokeWidth={1}
                />
                {/* Symbol */}
                <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central"
                  fontSize={atom.radius > 22 ? 12 : 10} fontWeight={700}
                  fill={["H", "C", "Fe", "Hg", "S"].includes(atom.symbol) ? "#fff" : "#1a1a1a"}
                >
                  {atom.symbol}
                </text>
              </g>
            );
          })}

          {/* Product labels after separation */}
          {phase === "separated" && config.productGroups.map((group, gi) => {
            // Average position of group atoms
            const positions = group.map(ai => getAtomPos(ai, frameCountRef.current));
            const avgX = positions.reduce((s, p) => s + p.x, 0) / positions.length;
            const maxY = Math.max(...positions.map(p => p.y)) + config.atoms[group[0]].radius;
            return (
              <text key={`label-${gi}`} x={avgX} y={maxY + 18}
                textAnchor="middle" fontSize={10} fontWeight={600}
                fill="hsl(var(--primary))" opacity={0.9}>
                {config.productLabels[gi]}
              </text>
            );
          })}

          {/* Bond break pulse — centered on molecule centroid */}
          {phase === "breaking" && bondGlow > 0.3 && (() => {
            const allPos = config.atoms.map((_, i) => getAtomPos(i, frameCountRef.current));
            const centroidX = allPos.reduce((s, p) => s + p.x, 0) / allPos.length;
            const centroidY = allPos.reduce((s, p) => s + p.y, 0) / allPos.length;
            return (
              <>
                <circle cx={centroidX} cy={centroidY} r={15 + bondGlow * 30}
                  fill="none" stroke="hsl(0, 75%, 55%)" strokeWidth={2}
                  opacity={bondGlow * 0.35}
                />
                <circle cx={centroidX} cy={centroidY} r={8 + bondGlow * 15}
                  fill="hsl(0, 75%, 55%)" opacity={bondGlow * 0.08}
                />
              </>
            );
          })()}

          {/* Temperature indicator — gradient bar */}
          <g>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(200, 70%, 55%)" />
                <stop offset="40%" stopColor="hsl(45, 85%, 55%)" />
                <stop offset="70%" stopColor="hsl(25, 90%, 50%)" />
                <stop offset="100%" stopColor="hsl(0, 85%, 50%)" />
              </linearGradient>
              <clipPath id="tempClip">
                <rect x={W - 48} y={40 + 100 * (1 - temperature)} width={16}
                  height={100 * temperature} rx={4} />
              </clipPath>
            </defs>
            {/* Bar background */}
            <rect x={W - 48} y={40} width={16} height={100} rx={8}
              fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth={0.5} />
            {/* Gradient fill */}
            <rect x={W - 48} y={40} width={16} height={100} rx={8}
              fill="url(#tempGrad)" clipPath="url(#tempClip)" />
            {/* Glow overlay at top of fill */}
            {temperature > 0.2 && (
              <circle cx={W - 40} cy={40 + 100 * (1 - temperature) + 4} r={6}
                fill={`hsl(${Math.max(0, 40 - temperature * 40)}, 85%, 60%)`}
                opacity={0.25}
              />
            )}
            {/* Thermometer bulb */}
            <circle cx={W - 40} cy={146} r={9}
              fill={`hsl(${Math.max(0, 40 - temperature * 40)}, 85%, 50%)`}
              stroke="hsl(var(--border))" strokeWidth={0.5}
            />
            <text x={W - 40} y={147} textAnchor="middle" dominantBaseline="central"
              fontSize={7} fontWeight={700} fill="#fff">
              °C
            </text>
            {/* Temp value */}
            <text x={W - 40} y={163} textAnchor="middle"
              fontSize={9} fontWeight={600} fill="hsl(var(--muted-foreground))">
              {tempCelsius}°
            </text>
            {/* Tick marks */}
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
              <line key={`tick-${i}`} x1={W - 32} y1={40 + 100 * (1 - t)} x2={W - 29} y2={40 + 100 * (1 - t)}
                stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} opacity={0.4} />
            ))}
          </g>

          {/* Endothermic / Exothermic indicator */}
          {(phase === "heating" || phase === "breaking") && (
            <g>
              <text x={35} y={42} fontSize={9} fontWeight={600}
                fill={isEndothermic ? "hsl(200, 70%, 55%)" : "hsl(0, 70%, 55%)"}>
                {isEndothermic ? "▲" : "▼"} {language === "sq" ? "Energji" : "Energy"}
              </text>
              <text x={35} y={54} fontSize={8}
                fill={isEndothermic ? "hsl(200, 70%, 55%)" : "hsl(0, 70%, 55%)"}>
                {isEndothermic
                  ? (language === "sq" ? "Thithet" : "Absorbed")
                  : (language === "sq" ? "Lirohet" : "Released")}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Phase indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className={`rounded-lg border p-3 text-center text-sm ${
            phase === "separated"
              ? "border-primary/40 bg-primary/5 text-foreground/80"
              : phase === "breaking"
                ? "border-destructive/40 bg-destructive/5 text-foreground/80"
                : phase === "heating"
                  ? "border-orange-500/40 bg-orange-500/5 text-foreground/80"
                  : "border-border bg-secondary/30 text-muted-foreground"
          }`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          {phaseLabels[phase][language]}
        </motion.div>
      </AnimatePresence>

      {/* Info panels */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { phase: "stable" as Phase, label: { en: "Compound", sq: "Përbërja" }, detail: reaction.displayEquation.split("→")[0]?.trim() },
          { phase: "heating" as Phase, label: { en: "Heating", sq: "Nxehja" }, detail: `${tempCelsius}°C` },
          { phase: "breaking" as Phase, label: { en: "Breaking", sq: "Shkëputja" }, detail: { en: "Bonds break", sq: "Lidhjet shkëputen" } },
          { phase: "separated" as Phase, label: { en: "Products", sq: "Produktet" }, detail: reaction.displayEquation.split("→")[1]?.trim() },
        ].map(item => (
          <div key={item.phase} className={`rounded-lg border p-2 text-center transition-all ${
            phase === item.phase
              ? item.phase === "breaking"
                ? "border-destructive/40 bg-destructive/5"
                : "border-primary/40 bg-primary/5"
              : "border-border bg-secondary/20"
          }`}>
            <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
              {item.label[language]}
            </div>
            <div className="text-[10px] text-foreground/70 font-mono">
              {typeof item.detail === "string" ? item.detail : item.detail[language]}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { color: "hsl(0, 80%, 55%)", label: language === "sq" ? "Lidhje që thyhet" : "Breaking bond" },
          { color: "hsl(30, 90%, 55%)", label: language === "sq" ? "Energji termike" : "Heat energy" },
          { color: "hsl(var(--primary))", label: language === "sq" ? "Produkt i ndarë" : "Separated product" },
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

export default DecompositionVisualizer;
