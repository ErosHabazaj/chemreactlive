import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { Acid, Base } from "@/data/reactionData";

// ── Particle types ──

interface Particle {
  id: number;
  type: "H+" | "OH-" | "H2O" | "cation" | "anion";
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  color: string;
  radius: number;
  opacity: number;
  merging?: boolean;
  mergeTarget?: number;
  mergeProgress?: number; // 0→1 tracks how close to combining
}

// ── Colors ──
const COLORS = {
  "H+": "#ff6b6b",
  "OH-": "#4dabf7",
  "H2O": "#74c0fc",
  cation: "#ffd43b",
  anion: "#69db7c",
  water: "hsla(210, 60%, 50%, 0.06)",
};

// ── Helpers ──
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// ── Props ──
interface Props {
  acid: Acid;
  base: Base;
  isExothermic: boolean;
}

const W = 440;
const H = 260;
const PARTICLE_AREA = { x: 50, y: 10, w: W - 100, h: H - 20 };

const NeutralizationVisualizer = ({ acid, base, isExothermic }: Props) => {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<"mixing" | "reacting" | "complete">("mixing");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [pH, setPH] = useState(3);
  const [heatFlash, setHeatFlash] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(0.5); // 0.5 = slow default
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const pausedRef = useRef(false);
  const speedRef = useRef(0.5);

  // How many ions to show (keep it manageable)
  const hCount = Math.min(acid.hCount, 3);
  const ohCount = Math.min(base.ohCount, 3);

  // Initialize particles
  const initParticles = useCallback(() => {
    const ps: Particle[] = [];
    let id = 0;

    // H+ ions (left side)
    for (let i = 0; i < hCount * 2; i++) {
      ps.push({
        id: id++, type: "H+", label: "H⁺",
        x: rand(PARTICLE_AREA.x, PARTICLE_AREA.x + PARTICLE_AREA.w * 0.4),
        y: rand(PARTICLE_AREA.y + 20, PARTICLE_AREA.y + PARTICLE_AREA.h - 20),
        vx: rand(-0.4, 0.4), vy: rand(-0.4, 0.4),
        color: COLORS["H+"], radius: 10, opacity: 1,
      });
    }

    // OH- ions (right side)
    for (let i = 0; i < ohCount * 2; i++) {
      ps.push({
        id: id++, type: "OH-", label: "OH⁻",
        x: rand(PARTICLE_AREA.x + PARTICLE_AREA.w * 0.6, PARTICLE_AREA.x + PARTICLE_AREA.w),
        y: rand(PARTICLE_AREA.y + 20, PARTICLE_AREA.y + PARTICLE_AREA.h - 20),
        vx: rand(-0.4, 0.4), vy: rand(-0.4, 0.4),
        color: COLORS["OH-"], radius: 12, opacity: 1,
      });
    }

    // Cation from base (spectator)
    ps.push({
      id: id++, type: "cation", label: `${base.cationSymbol}⁺`,
      x: rand(PARTICLE_AREA.x + PARTICLE_AREA.w * 0.6, PARTICLE_AREA.x + PARTICLE_AREA.w),
      y: rand(PARTICLE_AREA.y + 30, PARTICLE_AREA.y + PARTICLE_AREA.h - 30),
      vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
      color: COLORS.cation, radius: 13, opacity: 0.85,
    });

    // Anion from acid (spectator)
    ps.push({
      id: id++, type: "anion", label: acid.anionDisplay,
      x: rand(PARTICLE_AREA.x, PARTICLE_AREA.x + PARTICLE_AREA.w * 0.4),
      y: rand(PARTICLE_AREA.y + 30, PARTICLE_AREA.y + PARTICLE_AREA.h - 30),
      vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
      color: COLORS.anion, radius: 13, opacity: 0.85,
    });

    return ps;
  }, [acid, base, hCount, ohCount]);

  // Keep refs in sync
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  // Start / reset
  useEffect(() => {
    const ps = initParticles();
    setParticles(ps);
    particlesRef.current = ps;
    setPhase("mixing");
    setPH(3);
    setHeatFlash(0);
    frameRef.current = 0;
  }, [initParticles]);

  // Restart handler
  const handleRestart = useCallback(() => {
    const ps = initParticles();
    setParticles(ps);
    particlesRef.current = ps;
    setPhase("mixing");
    setPH(3);
    setHeatFlash(0);
    frameRef.current = 0;
    setPaused(false);
  }, [initParticles]);

  // Animation loop
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;

      if (!pausedRef.current) {
        const spd = speedRef.current;
        frameRef.current++;

        setParticles(prev => {
          const ps = prev.map(p => ({ ...p }));

          // Move particles (Brownian-ish) scaled by speed
          for (const p of ps) {
            if (p.type === "H2O" && p.opacity <= 0) continue;
            if (p.opacity <= 0) continue;

            // If merging, steer toward partner instead of random walk
            if (p.merging && p.mergeTarget != null) {
              const partner = ps.find(pp => pp.id === p.mergeTarget);
              if (partner && partner.opacity > 0) {
                const dx = partner.x - p.x;
                const dy = partner.y - p.y;
                const dist = Math.hypot(dx, dy) || 1;
                // Accelerate toward partner
                const pullStrength = 0.12 * spd;
                p.vx += (dx / dist) * pullStrength;
                p.vy += (dy / dist) * pullStrength;
              }
            } else {
              // Normal Brownian jitter
              p.vx += rand(-0.08, 0.08) * spd;
              p.vy += rand(-0.08, 0.08) * spd;
            }

            p.vx *= 0.97;
            p.vy *= 0.97;
            const maxSpeed = 1.2 * spd;
            const s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (s > maxSpeed) { p.vx *= maxSpeed / s; p.vy *= maxSpeed / s; }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < PARTICLE_AREA.x + p.radius) { p.x = PARTICLE_AREA.x + p.radius; p.vx *= -0.8; }
            if (p.x > PARTICLE_AREA.x + PARTICLE_AREA.w - p.radius) { p.x = PARTICLE_AREA.x + PARTICLE_AREA.w - p.radius; p.vx *= -0.8; }
            if (p.y < PARTICLE_AREA.y + p.radius) { p.y = PARTICLE_AREA.y + p.radius; p.vy *= -0.8; }
            if (p.y > PARTICLE_AREA.y + PARTICLE_AREA.h - p.radius) { p.y = PARTICLE_AREA.y + PARTICLE_AREA.h - p.radius; p.vy *= -0.8; }
          }

          // Check merging pairs: if close enough, complete the merge
          for (const p of ps) {
            if (p.merging && p.mergeTarget != null && (p.type === "H+" || p.type === "OH-")) {
              const partner = ps.find(pp => pp.id === p.mergeTarget);
              if (!partner || partner.opacity <= 0) {
                // Partner gone — unmark
                p.merging = false;
                p.mergeTarget = undefined;
                p.mergeProgress = undefined;
                continue;
              }
              const dist = Math.hypot(p.x - partner.x, p.y - partner.y);
              const progress = Math.max(0, 1 - dist / 120);
              p.mergeProgress = progress;
              partner.mergeProgress = progress;

              if (dist < 20) {
                // They've met — convert H+ to H2O, hide OH-
                const hP = p.type === "H+" ? p : partner;
                const ohP = p.type === "OH-" ? p : partner;
                const midX = (hP.x + ohP.x) / 2;
                const midY = (hP.y + ohP.y) / 2;

                hP.type = "H2O";
                hP.label = "H₂O";
                hP.color = COLORS["H2O"];
                hP.radius = 14;
                hP.x = midX;
                hP.y = midY;
                hP.vx = rand(-0.2, 0.2) * spd;
                hP.vy = rand(-0.2, 0.2) * spd;
                hP.merging = false;
                hP.mergeTarget = undefined;
                hP.mergeProgress = undefined;
                hP.opacity = 1;

                ohP.opacity = 0;
                ohP.type = "H2O";
                ohP.radius = 0;
                ohP.merging = false;
                ohP.mergeTarget = undefined;
                ohP.mergeProgress = undefined;
              }
            }
          }

          // Pick new pairs to start merging (only unpaired ions)
          const reactInterval = Math.max(20, Math.round(60 / spd));
          if (frameRef.current > Math.round(120 / spd) && frameRef.current % reactInterval === 0) {
            const hIons = ps.filter(p => p.type === "H+" && !p.merging && p.opacity > 0);
            const ohIons = ps.filter(p => p.type === "OH-" && !p.merging && p.opacity > 0);

            if (hIons.length > 0 && ohIons.length > 0) {
              let bestDist = Infinity;
              let bestH: Particle | null = null;
              let bestOH: Particle | null = null;
              for (const h of hIons) {
                for (const oh of ohIons) {
                  const d = Math.hypot(h.x - oh.x, h.y - oh.y);
                  if (d < bestDist) { bestDist = d; bestH = h; bestOH = oh; }
                }
              }

              if (bestH && bestOH) {
                const hp = ps.find(p => p.id === bestH!.id)!;
                const op = ps.find(p => p.id === bestOH!.id)!;
                hp.merging = true;
                hp.mergeTarget = op.id;
                hp.mergeProgress = 0;
                op.merging = true;
                op.mergeTarget = hp.id;
                op.mergeProgress = 0;
              }
            }
          }

          // Determine completion: no more possible reactions
          const remainingH = ps.filter(p => p.type === "H+" && p.opacity > 0 && !p.merging).length;
          const remainingOH = ps.filter(p => p.type === "OH-" && p.opacity > 0 && !p.merging).length;
          const mergingCount = ps.filter(p => p.merging && (p.type === "H+" || p.type === "OH-")).length;
          const waterFormed = ps.filter(p => p.type === "H2O" && p.opacity > 0 && p.radius > 0).length;

          if (waterFormed > 0 && mergingCount === 0 && (remainingH === 0 || remainingOH === 0)) {
            setPhase("complete");
            // pH depends on excess ions
            if (remainingH === 0 && remainingOH === 0) {
              setPH(7);
            } else if (remainingH > 0) {
              // Excess acid — pH stays low
              setPH(Math.max(1, 7 - remainingH));
            } else {
              // Excess base — pH goes high
              setPH(Math.min(14, 7 + remainingOH));
            }
          } else if (waterFormed > 0) {
            setPhase("reacting");
            const totalIons = remainingH + remainingOH + mergingCount;
            const ratio = waterFormed / (waterFormed + totalIons);
            setPH(Math.round(3 + ratio * 4));
          }

          particlesRef.current = ps;
          return ps;
        });
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, []);

  // Heat flash effect when reaction completes
  useEffect(() => {
    if (phase === "complete" && isExothermic) {
      setHeatFlash(1);
      const t = setTimeout(() => setHeatFlash(0), 1500);
      return () => clearTimeout(t);
    }
  }, [phase, isExothermic]);

  // pH scale colors
  const phColors = [
    "#ff0000", "#ff4400", "#ff8800", "#ffbb00",
    "#ffee00", "#ccff00", "#66ff00",
    "#00cc00",  // neutral
    "#00cc66", "#00ccaa", "#0099cc",
    "#0066cc", "#0033cc", "#0000cc",
  ];

  const completeLabel = pH === 7
    ? { en: "Complete — Neutral solution with salt + water", sq: "Përfunduar — Tretësirë neutrale me kripë + ujë" }
    : pH < 7
      ? { en: `Complete — Acidic solution (excess H⁺) with salt + water`, sq: `Përfunduar — Tretësirë acide (tepricë H⁺) me kripë + ujë` }
      : { en: `Complete — Basic solution (excess OH⁻) with salt + water`, sq: `Përfunduar — Tretësirë bazike (tepricë OH⁻) me kripë + ujë` };

  const phaseLabels = {
    mixing: { en: "Mixing — H⁺ and OH⁻ ions in solution", sq: "Përzierja — jonet H⁺ dhe OH⁻ në tretësirë" },
    reacting: { en: "Reacting — H⁺ + OH⁻ → H₂O forming", sq: "Reagimi — H⁺ + OH⁻ → H₂O po formohet" },
    complete: completeLabel,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {language === "sq" ? "Vizualizimi Molekular" : "Molecular Visualization"}
        </h3>
        <div className="flex items-center gap-2">
          {/* Speed control */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">{language === "sq" ? "Shpejtësia" : "Speed"}</span>
            {[0.3, 0.5, 1].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  speed === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {s === 0.3 ? "0.3×" : s === 0.5 ? "0.5×" : "1×"}
              </button>
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

      <div className="flex gap-3">
        {/* Main particle area */}
        <div className="flex-1 relative rounded-lg border border-border overflow-hidden" style={{ background: "hsl(var(--background))" }}>
          {/* Heat flash overlay */}
          <AnimatePresence>
            {heatFlash > 0 && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: "radial-gradient(circle, hsla(0, 80%, 55%, 0.15) 0%, transparent 70%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            )}
          </AnimatePresence>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: 220 }}>
            {/* Water background */}
            <rect x={PARTICLE_AREA.x - 2} y={PARTICLE_AREA.y} width={PARTICLE_AREA.w + 4} height={PARTICLE_AREA.h}
              rx={8} fill={COLORS.water} stroke="hsl(var(--border))" strokeWidth={0.5} />

            {/* Subtle water wave lines */}
            {[0.25, 0.5, 0.75].map((f, i) => (
              <line key={i}
                x1={PARTICLE_AREA.x + 10} y1={PARTICLE_AREA.y + PARTICLE_AREA.h * f}
                x2={PARTICLE_AREA.x + PARTICLE_AREA.w - 10} y2={PARTICLE_AREA.y + PARTICLE_AREA.h * f}
                stroke="hsl(210, 50%, 50%)" strokeWidth={0.3} opacity={0.15}
                strokeDasharray="8 12"
              />
            ))}

            {/* Particles */}
            {particles.filter(p => p.opacity > 0 && p.radius > 0).map(p => (
              <g key={p.id}>
                {/* Glow for H2O when just formed */}
                {p.type === "H2O" && (
                  <circle cx={p.x} cy={p.y} r={p.radius + 6}
                    fill="hsla(210, 80%, 60%, 0.12)" />
                )}
                <circle
                  cx={p.x} cy={p.y} r={p.radius}
                  fill={p.color}
                  opacity={p.opacity * 0.85}
                  stroke={p.type === "H2O" ? "hsla(210, 60%, 70%, 0.5)" : "transparent"}
                  strokeWidth={1.5}
                />
                <text
                  x={p.x} y={p.y + 1}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={p.type === "anion" ? 7 : 8}
                  fontWeight={700}
                  fill={p.type === "H+" || p.type === "cation" ? "#222" : "#fff"}
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* Labels */}
            <text x={PARTICLE_AREA.x + 5} y={PARTICLE_AREA.y + PARTICLE_AREA.h + 16}
              fontSize={8} fill="hsl(var(--muted-foreground))" opacity={0.6}>
              {acid.displayFormula}
            </text>
            <text x={PARTICLE_AREA.x + PARTICLE_AREA.w - 5} y={PARTICLE_AREA.y + PARTICLE_AREA.h + 16}
              fontSize={8} fill="hsl(var(--muted-foreground))" opacity={0.6} textAnchor="end">
              {base.displayFormula}
            </text>

            {/* Heat shimmer particles */}
            {heatFlash > 0 && isExothermic && (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.circle
                    key={`heat-${i}`}
                    r={2}
                    fill="hsl(var(--destructive))"
                    initial={{ cx: W / 2 + rand(-40, 40), cy: H / 2, opacity: 0.6 }}
                    animate={{ cy: H / 2 - 60, opacity: 0 }}
                    transition={{ duration: 1.5, delay: i * 0.15 }}
                  />
                ))}
              </>
            )}
          </svg>
        </div>

        {/* pH Scale */}
        <div className="flex flex-col items-center gap-1" style={{ width: 42 }}>
          <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-wider">pH</span>
          <div className="relative flex-1 w-5 rounded-full overflow-hidden border border-border"
            style={{ minHeight: 180 }}>
            {/* Gradient bar */}
            <div className="absolute inset-0 flex flex-col">
              {phColors.map((c, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: c, opacity: 0.7 }} />
              ))}
            </div>
            {/* pH indicator */}
            <motion.div
              className="absolute left-0 right-0 h-[3px] rounded-full"
              style={{ backgroundColor: "#fff", boxShadow: "0 0 4px rgba(255,255,255,0.8)" }}
              animate={{ top: `${((14 - pH) / 14) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          {/* pH number */}
          <motion.span
            className="text-sm font-bold"
            style={{ color: phColors[pH] || phColors[7] }}
            animate={{ color: phColors[pH] || phColors[7] }}
          >
            {pH}
          </motion.span>
          <span className="text-[7px] text-muted-foreground">
            {pH < 5 ? (language === "sq" ? "Acid" : "Acidic") :
             pH > 9 ? (language === "sq" ? "Bazik" : "Basic") :
             (language === "sq" ? "Neutral" : "Neutral")}
          </span>
        </div>
      </div>

      {/* Phase description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className={`rounded-lg border p-3 text-center text-sm ${
            phase === "complete"
              ? "border-success/40 bg-success/5 text-foreground/80"
              : phase === "reacting"
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

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { color: COLORS["H+"], label: "H⁺" },
          { color: COLORS["OH-"], label: "OH⁻" },
          { color: COLORS["H2O"], label: "H₂O" },
          { color: COLORS.cation, label: base.cationSymbol + "⁺" },
          { color: COLORS.anion, label: acid.anionDisplay },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, opacity: 0.85 }} />
            <span className="text-[10px] text-muted-foreground font-mono">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Exothermic indicator */}
      {isExothermic && phase === "complete" && (
        <motion.div
          className="flex items-center justify-center gap-2 text-xs text-destructive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>🔥</span>
          <span>{language === "sq" ? "Reagimi lëshon nxehtësi (ekzotermik)" : "Reaction releases heat (exothermic)"}</span>
        </motion.div>
      )}
    </div>
  );
};

export default NeutralizationVisualizer;
