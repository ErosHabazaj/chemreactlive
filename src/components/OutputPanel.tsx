import type { ReactionResult } from "@/engine/chemistryEngine";
import ElectronVisualizer from "@/components/ElectronVisualizer";
import StepVisualizer from "@/components/StepVisualizer";
import SingleDisplacementVisualizer from "@/components/SingleDisplacementVisualizer";
import NeutralizationVisualizer from "@/components/NeutralizationVisualizer";
import CombustionVisualizer from "@/components/CombustionVisualizer";
import SynthesisVisualizer from "@/components/SynthesisVisualizer";
import DecompositionVisualizer from "@/components/DecompositionVisualizer";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, FlaskConical, BookOpen, Thermometer, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Acid, Base, Hydrocarbon, PredefinedReaction } from "@/data/reactionData";

interface OutputPanelProps {
  result: ReactionResult;
  metalSymbol?: string;
  saltCationSymbol?: string;
  anionFormula?: string;
  selectedAcid?: Acid;
  selectedBase?: Base;
  selectedCompound?: Hydrocarbon;
  selectedSynthesisReaction?: PredefinedReaction;
  selectedDecompositionReaction?: PredefinedReaction;
}

const OutputPanel = ({ result, metalSymbol, saltCationSymbol, anionFormula, selectedAcid, selectedBase, selectedCompound, selectedSynthesisReaction, selectedDecompositionReaction }: OutputPanelProps) => {
  const { t, language } = useLanguage();

  const hasHalfReactions = result.oxidationHalf && result.reductionHalf;
  const reactionTypeLabels: Record<string, { en: string; sq: string }> = {
    "single-displacement": { en: "Single Displacement", sq: "Zëvendësim i Thjeshtë" },
    "redox": { en: "Redox", sq: "Redoks" },
    "neutralization": { en: "Neutralization", sq: "Neutralizim" },
    "combustion": { en: "Combustion", sq: "Djegie" },
    "synthesis": { en: "Synthesis", sq: "Sintezë" },
    "decomposition": { en: "Decomposition", sq: "Dekompozim" },
  };

  const bi = (text: string | { en: string; sq: string } | undefined): string => {
    if (!text) return "";
    if (typeof text === "string") return text;
    return text[language] || text.en;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Status */}
      <Card className="p-5 bg-card border-border">
        <div className="flex items-center gap-3 mb-3">
          {result.occurs ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-success" />
              <Badge className="bg-success/20 text-success border-success/30 hover:bg-success/20">
                {t("reactionOccurs")}
              </Badge>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-destructive" />
              <Badge variant="destructive">{t("noReaction")}</Badge>
            </>
          )}
          <Badge variant="outline" className="ml-auto">
            {reactionTypeLabels[result.reactionType]?.[language] || result.reactionType}
          </Badge>
        </div>

        {!result.occurs && result.noReactionReason && (
          <p className="text-sm text-muted-foreground leading-relaxed">{bi(result.noReactionReason)}</p>
        )}
      </Card>

      {result.occurs && (
        <>
          {/* Equations */}
          <Card className="p-5 bg-card border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
              <FlaskConical className="w-4 h-4" />
              {t("balancedEquations")}
            </h3>

            {result.generalFormula && (
              <div className="mb-3">
                <span className="text-xs text-muted-foreground">{t("generalFormula")}:</span>
                <p className="font-mono text-sm text-muted-foreground/70 mt-1">{result.generalFormula}</p>
              </div>
            )}

            {result.molecularEquation && (
              <div className="mb-3">
                <span className="text-xs text-muted-foreground">{t("molecular")}</span>
                <p className="font-mono text-base text-foreground mt-1">{result.molecularEquation}</p>
              </div>
            )}

            {result.netIonicEquation && (
              <div className="mb-3">
                <span className="text-xs text-muted-foreground">{t("netIonic")}</span>
                <p className="font-mono text-base text-primary mt-1">{result.netIonicEquation}</p>
              </div>
            )}

            {hasHalfReactions && (
              <>
                <Separator className="my-3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.oxidationHalf && (
                    <div className="rounded-md bg-oxidation/10 border border-oxidation/20 p-3">
                      <span className="text-xs font-semibold text-oxidation">{t("oxidation")}</span>
                      <p className="font-mono text-sm mt-1">{result.oxidationHalf.display}</p>
                    </div>
                  )}
                  {result.reductionHalf && (
                    <div className="rounded-md bg-reduction/10 border border-reduction/20 p-3">
                      <span className="text-xs font-semibold text-reduction">{t("reduction")}</span>
                      <p className="font-mono text-sm mt-1">{result.reductionHalf.display}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>

          {/* Energy Change */}
          {result.energyChange && (
            <Card className="p-5 bg-card border-border">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                <Thermometer className="w-4 h-4" />
                {t("energyChange")}
              </h3>
              <Badge className={
                result.energyChange === "exothermic"
                  ? "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/15"
                  : "bg-blue-500/15 text-blue-500 border-blue-500/30 hover:bg-blue-500/15"
              }>
                {result.energyChange === "exothermic" ? "🔥 " : "❄️ "}
                {t(result.energyChange)}
              </Badge>
            </Card>
          )}

          {/* Single Displacement Particle Visualizer */}
          {result.reactionType === "single-displacement" && metalSymbol && saltCationSymbol && anionFormula && (
            <Card className="p-5 bg-card border-border">
              <SingleDisplacementVisualizer
                result={result}
                metalSymbol={metalSymbol}
                saltCationSymbol={saltCationSymbol}
                anionFormula={anionFormula}
              />
            </Card>
          )}

          {/* Electron Visualizer (for redox-type reactions) */}
          {result.steps && hasHalfReactions && result.oxidationHalf && result.reductionHalf && (
            <Card className="p-5 bg-card border-border">
              <ElectronVisualizer
                steps={result.steps}
                oxidationHalf={result.oxidationHalf}
                reductionHalf={result.reductionHalf}
                netIonicEquation={result.netIonicEquation || ""}
                energyChange={result.energyChange}
              />
            </Card>
          )}

          {/* Neutralization Particle Visualizer */}
          {result.reactionType === "neutralization" && selectedAcid && selectedBase && (
            <Card className="p-5 bg-card border-border">
              <NeutralizationVisualizer
                acid={selectedAcid}
                base={selectedBase}
                isExothermic={result.energyChange === "exothermic"}
              />
            </Card>
          )}

          {/* Combustion Visualizer */}
          {result.reactionType === "combustion" && selectedCompound && (
            <Card className="p-5 bg-card border-border">
              <CombustionVisualizer compound={selectedCompound} />
            </Card>
          )}

          {/* Synthesis Visualizer */}
          {result.reactionType === "synthesis" && selectedSynthesisReaction && (
            <Card className="p-5 bg-card border-border">
              <SynthesisVisualizer reaction={selectedSynthesisReaction} />
            </Card>
          )}

          {/* Decomposition Visualizer */}
          {result.reactionType === "decomposition" && selectedDecompositionReaction && (
            <Card className="p-5 bg-card border-border">
              <DecompositionVisualizer reaction={selectedDecompositionReaction} />
            </Card>
          )}

          {/* Step Visualizer (for non-redox reactions) */}
          {result.steps && !hasHalfReactions && (
            <Card className="p-5 bg-card border-border">
              <StepVisualizer steps={result.steps} />
            </Card>
          )}

          {/* Explanation */}
          {result.explanation && (
            <Card className="p-5 bg-card border-border">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4" />
                {t("whyThisHappens")}
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{bi(result.explanation)}</p>
            </Card>
          )}
        </>
      )}
    </motion.div>
  );
};

export default OutputPanel;
