import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { Hydrocarbon } from "@/data/reactionData";

// ── Types ──

type AtomKind = "C" | "H" | "O";
type MoleculeType = "hydrocarbon" | "O2" | "CO2" | "H2O" | "fragment";

interface Atom {
  id: number;
  kind: AtomKind;
  x: number;
  y: number;
  radius: number;
}

interface Bond {
  from: number;
  to: number;
}

interface Molecule {
  id: number;
  type: MoleculeType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  atoms: Atom[];
  bonds: Bond[];
  opacity: number;
  label: string;
}

type Phase = "initial" | "approaching" | "collision" | "products" | "complete";

// ── Constants ──

const W = 480;
const H = 300;
const ATOM_COLORS: Record<AtomKind, string> = {
  C: "#555555",
  H: "#e8e8e8",
  O: "#ef4444",
};
const ATOM_TEXT: Record<AtomKind, string> = {
  C: "#fff",
  H: "#333",
  O: "#fff",
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// ── Bond energy data (kJ/mol) ──
const BOND_ENERGIES: Record<string, number> = {
  "C-H": 413,
  "C-C": 347,
  "O=O": 498,
  "C=O": 799,
  "O-H": 463,
};

// ── Build molecules ──

function buildHydrocarbon(hc: Hydrocarbon, cx: number, cy: number): Molecule {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  let id = 0;

  const cCount = Math.min(hc.carbonCount, 4); // cap visual atoms
  const hPerC = Math.min(Math.ceil(hc.hydrogenCount / cCount), 3);

  // Carbon chain
  const spacing = 22;
  const chainStartX = cx - ((cCount - 1) * spacing) / 2;
  for (let i = 0; i < cCount; i++) {
    atoms.push({ id: id++, kind: "C", x: chainStartX + i * spacing, y: cy, radius: 10 });
    if (i > 0) bonds.push({ from: id - 2, to: id - 1 });
  }

  // Hydrogens around carbons
  for (let ci = 0; ci < cCount; ci++) {
    const cAtom = atoms[ci];
    for (let hi = 0; hi < hPerC; hi++) {
      const angle = (hi / hPerC) * Math.PI + (ci % 2 === 0 ? -Math.PI / 2 : Math.PI / 2);
      atoms.push({
        id: id++, kind: "H",
        x: cAtom.x + Math.cos(angle) * 16,
        y: cAtom.y + Math.sin(angle) * 16,
        radius: 6,
      });
      bonds.push({ from: ci, to: id - 1 });
    }
  }

  return {
    id: 0, type: "hydrocarbon", x: cx, y: cy,
    vx: 0, vy: 0, atoms, bonds, opacity: 1,
    label: hc.displayFormula,
  };
}

function buildO2(id: number, cx: number, cy: number): Molecule {
  return {
    id, type: "O2", x: cx, y: cy,
    vx: rand(-0.3, -0.8), vy: rand(-0.15, 0.15),
    atoms: [
      { id: 0, kind: "O", x: cx - 8, y: cy, radius: 9 },
      { id: 1, kind: "O", x: cx + 8, y: cy, radius: 9 },
    ],
    bonds: [{ from: 0, to: 1 }],
    opacity: 1, label: "O₂",
  };
}

function buildCO2(id: number, cx: number, cy: number): Molecule {
  return {
    id, type: "CO2", x: cx, y: cy,
    vx: rand(-0.3, 0.3), vy: rand(-0.5, -0.2),
    atoms: [
      { id: 0, kind: "O", x: cx - 14, y: cy, radius: 8 },
      { id: 1, kind: "C", x: cx, y: cy, radius: 9 },
      { id: 2, kind: "O", x: cx + 14, y: cy, radius: 8 },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 1, to: 2 }],
    opacity: 0, label: "CO₂",
  };
}

function buildH2O(id: number, cx: number, cy: number): Molecule {
  const angle = 52.25 * (Math.PI / 180);
  return {
    id, type: "H2O", x: cx, y: cy,
    vx: rand(-0.3, 0.3), vy: rand(-0.5, -0.2),
    atoms: [
      { id: 0, kind: "H", x: cx - Math.sin(angle) * 12, y: cy + Math.cos(angle) * 12, radius: 6 },
      { id: 1, kind: "O", x: cx, y: cy, radius: 8 },
      { id: 2, kind: "H", x: cx + Math.sin(angle) * 12, y: cy + Math.cos(angle) * 12, radius: 6 },
    ],
    bonds: [{ from: 0, to: 1 }, { from: 1, to: 2 }],
    opacity: 0, label: "H₂O",
  };
}

// ── Props ──

interface Props {
  compound: Hydrocarbon;
}

const CombustionVisualizer = ({ compound }: Props) => {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("initial");
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(0.5);
  const phaseRef = useRef<Phase>("initial");

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Bond energy calculations
  const cCount = compound.carbonCount;
  const hCount = compound.hydrogenCount;
  const bondsBreaking = {
    "C-H": hCount,
    "C-C": Math.max(0, cCount - 1),
    "O=O": Math.ceil((cCount * 2 + hCount / 2) / 2),
  };
  const bondsForming = {
    "C=O": cCount * 2,
    "O-H": hCount,
  };

  const energyIn = Object.entries(bondsBreaking).reduce((s, [k, v]) => s + (BOND_ENERGIES[k] || 0) * v, 0);
  const energyOut = Object.entries(bondsForming).reduce((s, [k, v]) => s + (BOND_ENERGIES[k] || 0) * v, 0);
  const netEnergy = energyOut - energyIn;

  const initMolecules = useCallback(() => {
    const mols: Molecule[] = [];
    let molId = 0;

    // Hydrocarbon centered-left
    const hc = buildHydrocarbon(compound, W * 0.28, H / 2);
    hc.id = molId++;
    mols.push(hc);

    // O2 molecules spaced out on the right side (within view)
    const o2Count = Math.min(Math.ceil((cCount * 2 + hCount / 2) / 2), 5);
    for (let i = 0; i < o2Count; i++) {
      const spreadY = (i - (o2Count - 1) / 2) * 35;
      const o2 = buildO2(molId++, W * 0.72 + i * 12, H / 2 + spreadY);
      mols.push(o2);
    }

    // Product molecules (hidden initially)
    const co2Count = Math.min(cCount, 4);
    for (let i = 0; i < co2Count; i++) {
      const co2 = buildCO2(molId++, W / 2 - 30 + i * 30, H / 2 - 20 + rand(-15, 15));
      mols.push(co2);
    }
    const h2oCount = Math.min(Math.floor(hCount / 2), 4);
    for (let i = 0; i < h2oCount; i++) {
      const h2o = buildH2O(molId++, W / 2 - 20 + i * 25, H / 2 + 20 + rand(-10, 10));
      mols.push(h2o);
    }

    return mols;
  }, [compound, cCount, hCount]);

  // Init
  useEffect(() => {
    setMolecules(initMolecules());
    setPhase("initial");
    setEnergyLevel(0);
    setGlowIntensity(0);
    frameRef.current = 0;
  }, [initMolecules]);

  const handleRestart = useCallback(() => {
    setMolecules(initMolecules());
    setPhase("initial");
    setEnergyLevel(0);
    setGlowIntensity(0);
    frameRef.current = 0;
    setPaused(false);
  }, [initMolecules]);

  // Animation loop
  useEffect(() => {
    let running = true;
    let collisionStartFrame = 0;
    let productsStartFrame = 0;

    const tick = () => {
      if (!running) return;
      if (!pausedRef.current) {
        const spd = speedRef.current;
        frameRef.current++;
        const f = frameRef.current;
        const approachFrame = Math.round(40 / spd);

        if (f === approachFrame && phaseRef.current === "initial") setPhase("approaching");

        setMolecules(prev => {
          const mols = prev.map(m => ({
            ...m,
            atoms: m.atoms.map(a => ({ ...a })),
            bonds: m.bonds.map(b => ({ ...b })),
          }));

          const hcMol = mols.find(m => m.type === "hydrocarbon");
          const o2Mols = mols.filter(m => m.type === "O2");

          // Approaching: O2 moves toward hydrocarbon center
          if ((phaseRef.current === "approaching" || phaseRef.current === "initial") && hcMol) {
            let shouldCollide = false;
            for (const mol of o2Mols) {
              if (mol.opacity <= 0) continue;
              const targetX = hcMol.x + 20;
              const targetY = hcMol.y;
              const dx = targetX - mol.x;
              const dy = targetY - mol.y;
              const dist = Math.hypot(dx, dy) || 1;

              if (dist < 35) {
                shouldCollide = true;
              } else {
                const moveSpeed = 0.5 * spd;
                mol.vx = (dx / dist) * moveSpeed;
                mol.vy = (dy / dist) * moveSpeed;
                mol.x += mol.vx;
                mol.y += mol.vy;
                for (const a of mol.atoms) {
                  a.x += mol.vx;
                  a.y += mol.vy;
                }
              }
            }
            if (shouldCollide && phaseRef.current === "approaching") {
              setPhase("collision");
              collisionStartFrame = f;
            }
          }

          // Collision: shake and fade reactants
          if (phaseRef.current === "collision") {
            const elapsed = f - collisionStartFrame;
            const collisionDuration = Math.round(100 / spd);

            for (const mol of mols) {
              if (mol.type === "hydrocarbon" || mol.type === "O2") {
                const progress = elapsed / collisionDuration;
                mol.opacity = Math.max(0, 1 - progress);
                if (mol.opacity > 0.05) {
                  for (const a of mol.atoms) {
                    a.x += rand(-1.5, 1.5) * spd;
                    a.y += rand(-1.5, 1.5) * spd;
                  }
                }
              }
            }

            if (elapsed >= collisionDuration) {
              setPhase("products");
              productsStartFrame = f;
            }
          }

          // Products: fade in CO2 and H2O
          if (phaseRef.current === "products" || phaseRef.current === "complete") {
            for (const mol of mols) {
              if (mol.type === "CO2" || mol.type === "H2O") {
                const elapsed = f - productsStartFrame;
                const fadeDuration = Math.round(80 / spd);
                const progress = Math.min(1, elapsed / fadeDuration);
                mol.opacity = progress;
                mol.x += mol.vx * spd * 0.3;
                mol.y += mol.vy * spd * 0.3;
                for (const a of mol.atoms) {
                  a.x += mol.vx * spd * 0.3;
                  a.y += mol.vy * spd * 0.3;
                }
              }
            }

            if (phaseRef.current === "products") {
              const elapsed = f - productsStartFrame;
              if (elapsed >= Math.round(120 / spd)) {
                setPhase("complete");
              }
            }
          }

          return mols;
        });

        // Energy bar — ramp during collision+products phases
        if (phaseRef.current === "collision" || phaseRef.current === "products") {
          setEnergyLevel(prev => Math.min(1, prev + 0.008 * spd));
        } else if (phaseRef.current === "complete") {
          setEnergyLevel(1);
        }

        // Glow during collision
        if (phaseRef.current === "collision") {
          const elapsed = f - collisionStartFrame;
          const collisionDuration = Math.round(100 / spd);
          setGlowIntensity(Math.sin((elapsed / collisionDuration) * Math.PI));
        } else if (phaseRef.current === "products") {
          setGlowIntensity(prev => Math.max(0, prev - 0.02 * spd));
        } else {
          setGlowIntensity(0);
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, []);

  const phaseLabels: Record<Phase, { en: string; sq: string }> = {
    initial: { en: "Reactants ready — hydrocarbon and O₂", sq: "Reaktantët gati — hidrokarburi dhe O₂" },
    approaching: { en: "O₂ molecules approaching hydrocarbon", sq: "Molekulat O₂ po i afrohen hidrokarburit" },
    collision: { en: "Collision — bonds breaking, energy releasing", sq: "Përplasja — lidhjet po thyhen, energjia po çlirohet" },
    products: { en: "Products forming — CO₂ and H₂O", sq: "Produktet po formohen — CO₂ dhe H₂O" },
    complete: { en: "Complete — combustion products formed", sq: "Përfunduar — produktet e djegies u formuan" },
  };

  // Render a single molecule
  const renderMolecule = (mol: Molecule) => {
    if (mol.opacity <= 0) return null;
    return (
      <g key={mol.id} opacity={mol.opacity}>
        {/* Bonds */}
        {mol.bonds.map((b, i) => {
          const a1 = mol.atoms[b.from];
          const a2 = mol.atoms[b.to];
          if (!a1 || !a2) return null;
          return (
            <line key={`b-${mol.id}-${i}`}
              x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y}
              stroke="hsl(var(--muted-foreground))" strokeWidth={2} opacity={0.5}
            />
          );
        })}
        {/* Atoms */}
        {mol.atoms.map(a => (
          <g key={`a-${mol.id}-${a.id}`}>
            <circle cx={a.x} cy={a.y} r={a.radius}
              fill={ATOM_COLORS[a.kind]} opacity={0.9}
              stroke="hsl(var(--border))" strokeWidth={0.5}
            />
            <text x={a.x} y={a.y + 1} textAnchor="middle" dominantBaseline="central"
              fontSize={a.radius > 7 ? 8 : 6} fontWeight={700}
              fill={ATOM_TEXT[a.kind]}
            >
              {a.kind}
            </text>
          </g>
        ))}
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          {language === "sq" ? "Vizualizimi i Djegies" : "Combustion Visualization"}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">{language === "sq" ? "Shpejtësia" : "Speed"}</span>
            {[0.3, 0.5, 1].map(s => (
              <button key={s} onClick={() => setSpeed(s)}
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

      {/* Main SVG area */}
      <div className="relative rounded-lg border border-border overflow-hidden" style={{ background: "hsl(var(--background))" }}>
        {/* Energy glow overlay */}
        <AnimatePresence>
          {glowIntensity > 0 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle at 35% 50%, hsla(30, 100%, 60%, ${glowIntensity * 0.2}) 0%, hsla(15, 90%, 50%, ${glowIntensity * 0.08}) 40%, transparent 70%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minHeight: 240 }}>
          {/* Background */}
          <rect x={10} y={10} width={W - 20} height={H - 20} rx={8}
            fill="hsla(var(--secondary), 0.3)" stroke="hsl(var(--border))" strokeWidth={0.5} />

          {/* Collision energy burst rings */}
          {glowIntensity > 0 && (
            <>
              {[1, 2, 3].map(i => (
                <circle key={`ring-${i}`}
                  cx={W * 0.3} cy={H / 2}
                  r={20 + i * 25 * glowIntensity}
                  fill="none"
                  stroke={`hsla(30, 90%, 55%, ${glowIntensity * 0.3 / i})`}
                  strokeWidth={2 / i}
                />
              ))}
            </>
          )}

          {/* Render molecules */}
          {molecules.map(renderMolecule)}

          {/* Labels */}
          {phase === "initial" || phase === "approaching" ? (
            <>
              <text x={120} y={H - 15} textAnchor="middle" fontSize={9}
                fill="hsl(var(--muted-foreground))" opacity={0.7}>{compound.displayFormula}</text>
              <text x={W - 60} y={H - 15} textAnchor="middle" fontSize={9}
                fill="hsl(var(--muted-foreground))" opacity={0.7}>O₂</text>
            </>
          ) : phase === "complete" || phase === "products" ? (
            <>
              <text x={W / 2 - 40} y={H - 15} textAnchor="middle" fontSize={9}
                fill="hsl(var(--muted-foreground))" opacity={0.7}>CO₂</text>
              <text x={W / 2 + 40} y={H - 15} textAnchor="middle" fontSize={9}
                fill="hsl(var(--muted-foreground))" opacity={0.7}>H₂O</text>
            </>
          ) : null}
        </svg>
      </div>

      {/* Energy bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{language === "sq" ? "Energjia e çliruar" : "Energy Released"}</span>
          <span className="font-mono">{Math.round(netEnergy * energyLevel)} / {netEnergy} kJ/mol</span>
        </div>
        <div className="h-3 rounded-full bg-secondary border border-border overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(30, 90%, 50%), hsl(0, 80%, 50%))",
            }}
            animate={{ width: `${energyLevel * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Phase description */}
      <div
        className={`rounded-lg border p-3 text-center text-sm ${
          phase === "complete"
            ? "border-success/40 bg-success/5 text-foreground/80"
            : phase === "collision"
              ? "border-destructive/40 bg-destructive/5 text-foreground/80"
              : phase === "products"
                ? "border-primary/40 bg-primary/5 text-foreground/80"
                : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {phaseLabels[phase][language]}
      </div>

      {/* Bond energy comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {language === "sq" ? "Lidhjet e thyera" : "Bonds Broken"} ({language === "sq" ? "energji e thithur" : "energy absorbed"})
          </h4>
          <div className="space-y-1">
            {Object.entries(bondsBreaking).filter(([, v]) => v > 0).map(([bond, count]) => (
              <div key={bond} className="flex justify-between text-[11px]">
                <span className="font-mono text-muted-foreground">{count}× {bond}</span>
                <span className="text-destructive font-medium">+{count * (BOND_ENERGIES[bond] || 0)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-1 flex justify-between text-xs font-bold">
              <span>{language === "sq" ? "Totali" : "Total"}</span>
              <span className="text-destructive">+{energyIn} kJ</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {language === "sq" ? "Lidhjet e formuara" : "Bonds Formed"} ({language === "sq" ? "energji e çliruar" : "energy released"})
          </h4>
          <div className="space-y-1">
            {Object.entries(bondsForming).filter(([, v]) => v > 0).map(([bond, count]) => (
              <div key={bond} className="flex justify-between text-[11px]">
                <span className="font-mono text-muted-foreground">{count}× {bond}</span>
                <span className="text-primary font-medium">−{count * (BOND_ENERGIES[bond] || 0)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-1 flex justify-between text-xs font-bold">
              <span>{language === "sq" ? "Totali" : "Total"}</span>
              <span className="text-primary">−{energyOut} kJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Net energy */}
      {phase === "complete" && (
        <motion.div
          className="flex items-center justify-center gap-2 text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-destructive">ΔH = −{netEnergy} kJ/mol</span>
          <span className="text-muted-foreground text-xs">
            ({language === "sq" ? "ekzotermik" : "exothermic"})
          </span>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { color: ATOM_COLORS.C, label: language === "sq" ? "Karbon (C)" : "Carbon (C)" },
          { color: ATOM_COLORS.H, label: language === "sq" ? "Hidrogjen (H)" : "Hydrogen (H)" },
          { color: ATOM_COLORS.O, label: language === "sq" ? "Oksigjen (O)" : "Oxygen (O)" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombustionVisualizer;
