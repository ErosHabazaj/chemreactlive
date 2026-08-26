import type { VisualizerStep } from "@/engine/chemistryEngine";
import { useState } from "react";
import { ChevronRight, ChevronLeft, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

interface StepVisualizerProps {
  steps: VisualizerStep[];
}

const highlightColors: Record<string, string> = {
  oxidation: "border-oxidation/50 bg-oxidation/10",
  reduction: "border-reduction/50 bg-reduction/10",
  electron: "border-electron/50 bg-electron/10",
  result: "border-success/50 bg-success/10",
  reactant: "border-primary/50 bg-primary/10",
  product: "border-accent/50 bg-accent/10",
};

const StepVisualizer = ({ steps }: StepVisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t, language } = useLanguage();

  const step = steps[currentStep];

  const bi = (text: string | { en: string; sq: string }): string => {
    if (typeof text === "string") return text;
    return text[language] || text.en;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <ListChecks className="w-4 h-4 text-primary" />
        {t("stepsTitle")}
      </h3>

      <div
        key={currentStep}
        className={`rounded-lg border p-4 ${highlightColors[step.highlight || 'result']}`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono bg-background/50 rounded px-2 py-0.5">
            {currentStep + 1}/{steps.length}
          </span>
          <h4 className="font-semibold text-sm">{bi(step.title)}</h4>
        </div>
        <p className="text-sm text-foreground/80 font-mono leading-relaxed">{bi(step.description)}</p>
      </div>

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

export default StepVisualizer;
