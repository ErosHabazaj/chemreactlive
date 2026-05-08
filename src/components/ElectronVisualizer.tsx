import { motion, AnimatePresence } from "framer-motion";
import type { VisualizerStep, HalfReaction } from "@/engine/chemistryEngine";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Zap, Flame, Snowflake, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

interface ElectronVisualizerProps {
  steps: VisualizerStep[];
  oxidationHalf: HalfReaction;
  reductionHalf: HalfReaction;
  netIonicEquation: string;
  energyChange?: "exothermic" | "endothermic";
}

const highlightColors: Record<string, string> = {
  oxidation: "border-oxidation/50 bg-oxidation/10",
  reduction: "border-reduction/50 bg-reduction/10",
  electron: "border-electron/50 bg-electron/10",
  result: "border-success/50 bg-success/10",
  reactant: "border-primary/50 bg-primary/10",
  product: "border-accent/50 bg-accent/10",
};

const ElectronVisualizer = ({
  steps,
  oxidationHalf,
  reductionHalf,
  netIonicEquation,
  energyChange,
}: ElectronVisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t, language } = useLanguage();

  const step = steps[currentStep];

  const bi = (text: string | { en: string; sq: string }): string => {
    if (typeof text === "string") return text;
    return text[language] || text.en;
  };

  // Derive animation phase from step
  const showOxidation = currentStep >= 1;
  const showReduction = currentStep >= 2;
  const showElectronFlow = currentStep >= 1 && currentStep <= 4;
  const showResult = currentStep >= 5;

  // Oxidation state values that animate
  const oxStateBefore = oxidationHalf.oxidationStateBefore;
  const oxStateAfter = oxidationHalf.oxidationStateAfter;
  const redStateBefore = reductionHalf.oxidationStateBefore;
  const redStateAfter = reductionHalf.oxidationStateAfter;

  const oxStateDisplay = showOxidation ? (showResult ? oxStateAfter : oxStateBefore) : oxStateBefore;
  const redStateDisplay = showReduction ? (showResult ? redStateAfter : redStateBefore) : redStateBefore;

  const totalElectrons = Math.min(oxidationHalf.electrons * oxidationHalf.coefficient, 8);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <Zap className="w-4 h-4 text-electron" />
        {t("electronTransferStepByStep")}
      </h3>

      {/* Main visualization SVG */}
      <div className="relative rounded-lg bg-secondary/50 border border-border overflow-hidden">
        <svg viewBox="0 0 480 230" className="w-full" style={{ maxHeight: 250 }}>
          {/* Oxidation glow */}
          {showOxidation && (
            <motion.circle
              cx={100} cy={125} r={50}
              fill="none"
              stroke="hsl(var(--oxidation))"
              strokeWidth={2}
              initial={{ opacity: 0, r: 38 }}
              animate={{ opacity: [0.2, 0.5, 0.2], r: [46, 52, 46] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Reduction glow */}
          {showReduction && (
            <motion.circle
              cx={380} cy={125} r={50}
              fill="none"
              stroke="hsl(var(--reduction))"
              strokeWidth={2}
              initial={{ opacity: 0, r: 38 }}
              animate={{ opacity: [0.2, 0.5, 0.2], r: [46, 52, 46] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          )}

          {/* Oxidized species sphere */}
          <motion.circle
            cx={100} cy={125} r={36}
            fill={showOxidation ? "hsl(0, 75%, 60%)" : "hsl(var(--muted))"}
            opacity={0.2}
            animate={{ opacity: showOxidation ? 0.25 : 0.12 }}
            transition={{ duration: 0.5 }}
          />
          <circle cx={100} cy={125} r={34}
            fill="none"
            stroke={showOxidation ? "hsl(var(--oxidation))" : "hsl(var(--muted-foreground))"}
            strokeWidth={showOxidation ? 2.5 : 1.5}
            opacity={showOxidation ? 0.8 : 0.3}
          />
          <text x={100} y={130} textAnchor="middle" dominantBaseline="central"
            fontSize={18} fontWeight={700}
            fill={showOxidation ? "hsl(0, 75%, 65%)" : "hsl(var(--muted-foreground))"}
          >
            {oxidationHalf.species}
          </text>

          {/* Oxidation state badge — well above the sphere */}
          <AnimatePresence mode="wait">
            <motion.g key={`ox-${oxStateDisplay}`}>
              <rect x={72} y={52} width={56} height={22} rx={6}
                fill={showOxidation ? "hsl(0, 75%, 60%)" : "hsl(var(--muted))"}
                opacity={0.15}
              />
              <motion.text
                x={100} y={64} textAnchor="middle" dominantBaseline="central"
                fontSize={12} fontWeight={700}
                fill={showOxidation ? "hsl(0, 75%, 70%)" : "hsl(var(--muted-foreground))"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {oxStateDisplay === 0 ? "0" : `+${oxStateDisplay}`}
              </motion.text>
            </motion.g>
          </AnimatePresence>

          {/* Oxidation state change indicator (text arrow, not SVG marker) */}
          {showOxidation && !showResult && (
            <motion.text
              x={100} y={42} textAnchor="middle" dominantBaseline="central"
              fontSize={14} fontWeight={700}
              fill="hsl(var(--oxidation))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              ↑
            </motion.text>
          )}

          {/* Label under oxidized species */}
          <text x={100} y={175} textAnchor="middle" fontSize={9}
            fill={showOxidation ? "hsl(0, 75%, 65%)" : "hsl(var(--muted-foreground))"}
            opacity={0.7}
          >
            {showOxidation
              ? (language === "sq" ? "Oksidomet" : "Oxidized")
              : (language === "sq" ? "Dhurues" : "Donor")}
          </text>
          {showOxidation && (
            <text x={100} y={188} textAnchor="middle" fontSize={8}
              fill="hsl(var(--oxidation))" opacity={0.6}
            >
              {`0 → +${oxStateAfter}`}
            </text>
          )}

          {/* Connection line */}
          <line x1={140} y1={125} x2={340} y2={125}
            stroke="hsl(var(--border))" strokeWidth={1} opacity={0.4}
          />

          {/* Electron flow particles */}
          {showElectronFlow && (
            <>
              {Array.from({ length: totalElectrons }).map((_, i) => (
                <motion.circle
                  key={i}
                  r={3.5}
                  fill="hsl(var(--electron))"
                  initial={{ cx: 140, cy: 125, opacity: 0 }}
                  animate={{
                    cx: [140, 200 + i * 8, 340],
                    cy: [125, 112 + (i % 3) * 8, 125],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.18,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              ))}
              {/* Electron count label */}
              <rect x={218} y={96} width={44} height={18} rx={4}
                fill="hsl(var(--background))" opacity={0.8}
              />
              <text x={240} y={107} textAnchor="middle" dominantBaseline="central"
                fontSize={10} fontWeight={600} fill="hsl(var(--electron))"
              >
                {oxidationHalf.coefficient * oxidationHalf.electrons}e⁻
              </text>
            </>
          )}

          {/* Reduced species sphere */}
          <motion.circle
            cx={380} cy={125} r={36}
            fill={showReduction ? "hsl(174, 72%, 50%)" : "hsl(var(--muted))"}
            opacity={0.2}
            animate={{ opacity: showReduction ? 0.2 : 0.12 }}
            transition={{ duration: 0.5 }}
          />
          <circle cx={380} cy={125} r={34}
            fill="none"
            stroke={showReduction ? "hsl(var(--reduction))" : "hsl(var(--muted-foreground))"}
            strokeWidth={showReduction ? 2.5 : 1.5}
            opacity={showReduction ? 0.8 : 0.3}
          />
          <text x={380} y={130} textAnchor="middle" dominantBaseline="central"
            fontSize={18} fontWeight={700}
            fill={showReduction ? "hsl(174, 72%, 55%)" : "hsl(var(--muted-foreground))"}
          >
            {reductionHalf.species}
          </text>

          {/* Reduction state badge — well above the sphere */}
          <AnimatePresence mode="wait">
            <motion.g key={`red-${redStateDisplay}`}>
              <rect x={352} y={52} width={56} height={22} rx={6}
                fill={showReduction ? "hsl(174, 72%, 50%)" : "hsl(var(--muted))"}
                opacity={0.15}
              />
              <motion.text
                x={380} y={64} textAnchor="middle" dominantBaseline="central"
                fontSize={12} fontWeight={700}
                fill={showReduction ? "hsl(174, 72%, 60%)" : "hsl(var(--muted-foreground))"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {redStateDisplay === 0 ? "0" : `+${redStateDisplay}`}
              </motion.text>
            </motion.g>
          </AnimatePresence>

          {/* Reduction state change indicator (text arrow) */}
          {showReduction && !showResult && (
            <motion.text
              x={380} y={42} textAnchor="middle" dominantBaseline="central"
              fontSize={14} fontWeight={700}
              fill="hsl(var(--reduction))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              ↓
            </motion.text>
          )}

          {/* Label under reduced species */}
          <text x={380} y={175} textAnchor="middle" fontSize={9}
            fill={showReduction ? "hsl(174, 72%, 55%)" : "hsl(var(--muted-foreground))"}
            opacity={0.7}
          >
            {showReduction
              ? (language === "sq" ? "Reduktohet" : "Reduced")
              : (language === "sq" ? "Pranues" : "Acceptor")}
          </text>
          {showReduction && (
            <text x={380} y={188} textAnchor="middle" fontSize={8}
              fill="hsl(var(--reduction))" opacity={0.6}
            >
              {`+${redStateBefore} → 0`}
            </text>
          )}
        </svg>
      </div>

      {/* Side panels: Oxidation & Reduction summary + Energy */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Oxidized species panel */}
        <motion.div
          className="rounded-lg border border-oxidation/30 bg-oxidation/5 p-3"
          animate={{ opacity: showOxidation ? 1 : 0.4 }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <ArrowUp className="w-3.5 h-3.5 text-oxidation" />
            <span className="text-xs font-semibold text-oxidation uppercase">
              {language === "sq" ? "Oksidomet" : "Oxidized"}
            </span>
          </div>
          <p className="text-sm font-mono font-bold text-foreground">{oxidationHalf.species}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {language === "sq" ? "Humb" : "Loses"} {oxidationHalf.electrons * oxidationHalf.coefficient}e⁻
          </p>
          <p className="text-[10px] font-mono text-oxidation/70 mt-0.5">
            0 → +{oxStateAfter}
          </p>
        </motion.div>

        {/* Energy change panel */}
        <motion.div
          className={`rounded-lg border p-3 flex flex-col items-center justify-center ${
            energyChange === "exothermic"
              ? "border-destructive/30 bg-destructive/5"
              : "border-blue-500/30 bg-blue-500/5"
          }`}
          animate={{ opacity: showOxidation ? 1 : 0.4 }}
        >
          {energyChange === "exothermic" ? (
            <Flame className="w-5 h-5 text-destructive mb-1" />
          ) : (
            <Snowflake className="w-5 h-5 text-blue-400 mb-1" />
          )}
          <span className="text-xs font-semibold text-foreground">
            {energyChange === "exothermic"
              ? (language === "sq" ? "Ekzotermike" : "Exothermic")
              : (language === "sq" ? "Endotermike" : "Endothermic")}
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5">
            {energyChange === "exothermic"
              ? (language === "sq" ? "Lëshon energji" : "Releases energy")
              : (language === "sq" ? "Absorbon energji" : "Absorbs energy")}
          </span>
        </motion.div>

        {/* Reduced species panel */}
        <motion.div
          className="rounded-lg border border-reduction/30 bg-reduction/5 p-3"
          animate={{ opacity: showReduction ? 1 : 0.4 }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <ArrowDown className="w-3.5 h-3.5 text-reduction" />
            <span className="text-xs font-semibold text-reduction uppercase">
              {language === "sq" ? "Reduktohet" : "Reduced"}
            </span>
          </div>
          <p className="text-sm font-mono font-bold text-foreground">{reductionHalf.species}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {language === "sq" ? "Fiton" : "Gains"} {reductionHalf.electrons * reductionHalf.coefficient}e⁻
          </p>
          <p className="text-[10px] font-mono text-reduction/70 mt-0.5">
            +{redStateBefore} → 0
          </p>
        </motion.div>
      </div>

      {/* Step description */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg border p-4 ${highlightColors[step.highlight || 'result']}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono bg-background/50 rounded px-2 py-0.5">
            {currentStep + 1}/{steps.length}
          </span>
          <h4 className="font-semibold text-sm">{bi(step.title)}</h4>
        </div>
        <p className="text-sm text-foreground/80 font-mono leading-relaxed">{bi(step.description)}</p>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> {t("prev")}
        </Button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          {t("next")} <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ElectronVisualizer;
