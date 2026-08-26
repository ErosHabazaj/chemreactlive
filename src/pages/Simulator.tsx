import { useState } from "react";
import { FlaskConical, Play, Atom, ArrowRightLeft, Flame, Beaker, Combine, SplitSquareHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OutputPanel from "@/components/OutputPanel";
import Navbar from "@/components/Navbar";
import PeriodicTableSelector from "@/components/PeriodicTableSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  METALS, CATIONS, ANIONS, getAllSalts,
  getMetal, getCation, getAnion, buildSalt,
  type Salt,
} from "@/data/chemistryData";
import {
  simulateSingleDisplacement, simulateRedox,
  type ReactionResult,
} from "@/engine/chemistryEngine";
import {
  simulateNeutralization, simulateCombustion,
  simulateSynthesis, simulateDecomposition,
} from "@/engine/reactionEngines";
import { ACIDS, BASES, HYDROCARBONS, SYNTHESIS_REACTIONS, DECOMPOSITION_REACTIONS, findSynthesisReaction, getSynthesisPartners, ALL_SYNTHESIS_SYMBOLS } from "@/data/reactionData";

const metalSymbols = METALS.map(m => m.symbol);
const cationSymbols = CATIONS.map(c => c.symbol);

type ReactionType = "single-displacement" | "redox" | "neutralization" | "combustion" | "synthesis" | "decomposition";

const Simulator = () => {
  const { t, language } = useLanguage();
  const [reactionType, setReactionType] = useState<ReactionType>("single-displacement");

  // Single displacement
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedSaltCation, setSelectedSaltCation] = useState("");
  const [selectedAnion, setSelectedAnion] = useState("");

  // Redox
  const [oxidizedMetal, setOxidizedMetal] = useState("");
  const [reducedCation, setReducedCation] = useState("");

  // Neutralization
  const [selectedAcid, setSelectedAcid] = useState("");
  const [selectedBase, setSelectedBase] = useState("");

  // Combustion
  const [selectedCompound, setSelectedCompound] = useState("");

  // Synthesis / Decomposition
  const [selectedSynthesis, setSelectedSynthesis] = useState("");
  const [synthElementA, setSynthElementA] = useState("");
  const [synthElementB, setSynthElementB] = useState("");
  const [selectedDecomposition, setSelectedDecomposition] = useState("");

  const [result, setResult] = useState<ReactionResult | null>(null);

  const currentSalt = (() => {
    const cation = getCation(selectedSaltCation);
    const anion = getAnion(selectedAnion);
    if (!cation || !anion) return null;
    return buildSalt(cation, anion);
  })();

  const handleRun = () => {
    if (reactionType === "single-displacement") {
      const metal = getMetal(selectedMetal);
      if (!metal || !currentSalt) return;
      setResult(simulateSingleDisplacement(metal, currentSalt));
    } else if (reactionType === "redox") {
      const metal = getMetal(oxidizedMetal);
      const cation = getCation(reducedCation);
      if (!metal || !cation) return;
      setResult(simulateRedox(metal, cation));
    } else if (reactionType === "neutralization") {
      const acid = ACIDS.find(a => a.formula === selectedAcid);
      const base = BASES.find(b => b.formula === selectedBase);
      if (!acid || !base) return;
      setResult(simulateNeutralization(acid, base));
    } else if (reactionType === "combustion") {
      const compound = HYDROCARBONS.find(h => h.formula === selectedCompound);
      if (!compound) return;
      setResult(simulateCombustion(compound));
    } else if (reactionType === "synthesis") {
      const reaction = findSynthesisReaction(synthElementA, synthElementB);
      if (!reaction) return;
      setResult(simulateSynthesis(reaction));
    } else if (reactionType === "decomposition") {
      const reaction = DECOMPOSITION_REACTIONS.find(r => r.id === selectedDecomposition);
      if (!reaction) return;
      setResult(simulateDecomposition(reaction));
    }
  };

  const canRun = (() => {
    switch (reactionType) {
      case "single-displacement": return selectedMetal && currentSalt;
      case "redox": return oxidizedMetal && reducedCation;
      case "neutralization": return selectedAcid && selectedBase;
      case "combustion": return !!selectedCompound;
      case "synthesis": return synthElementA && synthElementB && !!findSynthesisReaction(synthElementA, synthElementB);
      case "decomposition": return !!selectedDecomposition;
      default: return false;
    }
  })();

  const reactionTypeOptions: { value: ReactionType; label: string; icon: React.ReactNode }[] = [
    { value: "single-displacement", label: t("singleDisplacement"), icon: <ArrowRightLeft className="w-4 h-4" /> },
    { value: "redox", label: t("redox"), icon: <Atom className="w-4 h-4" /> },
    { value: "neutralization", label: t("neutralization"), icon: <Beaker className="w-4 h-4" /> },
    { value: "combustion", label: t("combustion"), icon: <Flame className="w-4 h-4" /> },
    { value: "synthesis", label: t("synthesis"), icon: <Combine className="w-4 h-4" /> },
    { value: "decomposition", label: t("decomposition"), icon: <SplitSquareHorizontal className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t("reactionSimulator")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Reaction Type Selector */}
            <Card className="p-5 bg-card border-border">
              <label className="text-sm font-medium text-foreground block mb-2">{t("selectReactionType")}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {reactionTypeOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setReactionType(opt.value); setResult(null); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                      reactionType === opt.value
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-secondary/50 text-foreground border-border hover:bg-secondary hover:border-primary/30"
                    }`}
                  >
                    {opt.icon}
                    <span className="truncate">{opt.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Input panels per type */}
            {reactionType === "single-displacement" && (
              <div className="space-y-4">
                <Card className="p-5 bg-card border-border">
                  <PeriodicTableSelector
                    label={t("solidMetal")}
                    value={selectedMetal}
                    onSelect={setSelectedMetal}
                    allowedSymbols={metalSymbols}
                  />
                </Card>
                <Card className="p-5 bg-card border-border space-y-4">
                  <label className="text-sm font-medium text-foreground block">{t("saltAqueous")}</label>
                  <PeriodicTableSelector
                    label={`${t("ionToReduce")} (${t("saltAqueous")})`}
                    value={selectedSaltCation}
                    onSelect={setSelectedSaltCation}
                    allowedSymbols={cationSymbols}
                  />
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("selectAnion")}</label>
                    <Select value={selectedAnion} onValueChange={setSelectedAnion}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder={t("selectAnion")} />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {ANIONS.map(a => (
                          <SelectItem key={a.formula} value={a.formula}>{a.display}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {currentSalt && (
                    <p className="text-xs text-muted-foreground font-mono">
                      {t("ionicParts")}: {currentSalt.cation.display} + {currentSalt.anion.display} → {currentSalt.displayFormula}
                    </p>
                  )}
                </Card>
              </div>
            )}

            {reactionType === "redox" && (
              <div className="space-y-4">
                <Card className="p-5 bg-card border-border">
                  <PeriodicTableSelector
                    label={t("metalToOxidize")}
                    value={oxidizedMetal}
                    onSelect={setOxidizedMetal}
                    allowedSymbols={metalSymbols}
                  />
                </Card>
                <Card className="p-5 bg-card border-border">
                  <PeriodicTableSelector
                    label={t("ionToReduce")}
                    value={reducedCation}
                    onSelect={setReducedCation}
                    allowedSymbols={cationSymbols}
                  />
                </Card>
              </div>
            )}

            {reactionType === "neutralization" && (
              <div className="space-y-4">
                <Card className="p-5 bg-card border-border">
                  <label className="text-sm font-medium text-foreground mb-2 block">{t("selectAcid")}</label>
                  <Select value={selectedAcid} onValueChange={setSelectedAcid}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder={t("selectAcid")} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {ACIDS.map(a => (
                        <SelectItem key={a.formula} value={a.formula}>
                          {a.displayFormula} — {a.name[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Card>
                <Card className="p-5 bg-card border-border">
                  <label className="text-sm font-medium text-foreground mb-2 block">{t("selectBase")}</label>
                  <Select value={selectedBase} onValueChange={setSelectedBase}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder={t("selectBase")} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {BASES.map(b => (
                        <SelectItem key={b.formula} value={b.formula}>
                          {b.displayFormula} — {b.name[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Card>
              </div>
            )}

            {reactionType === "combustion" && (
              <Card className="p-5 bg-card border-border">
                <label className="text-sm font-medium text-foreground mb-2 block">{t("selectCompound")}</label>
                <Select value={selectedCompound} onValueChange={setSelectedCompound}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder={t("selectCompound")} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {HYDROCARBONS.map(h => (
                      <SelectItem key={h.formula} value={h.formula}>
                        {h.displayFormula} — {h.name[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
            )}

            {reactionType === "synthesis" && (
              <div className="space-y-4">
                <Card className="p-5 bg-card border-border">
                  <PeriodicTableSelector
                    label={language === "sq" ? "Elementi A" : "Element A"}
                    value={synthElementA}
                    onSelect={(s) => {
                      setSynthElementA(s);
                      // Reset B if it's no longer a valid partner
                      if (synthElementB && !getSynthesisPartners(s).includes(synthElementB)) {
                        setSynthElementB("");
                      }
                    }}
                    allowedSymbols={ALL_SYNTHESIS_SYMBOLS}
                  />
                </Card>
                <Card className="p-5 bg-card border-border">
                  <PeriodicTableSelector
                    label={language === "sq" ? "Elementi B" : "Element B"}
                    value={synthElementB}
                    onSelect={setSynthElementB}
                    allowedSymbols={synthElementA ? getSynthesisPartners(synthElementA) : ALL_SYNTHESIS_SYMBOLS}
                  />
                </Card>
                {synthElementA && synthElementB && (
                  <div className="text-xs text-muted-foreground font-mono px-1">
                    {findSynthesisReaction(synthElementA, synthElementB)
                      ? `${findSynthesisReaction(synthElementA, synthElementB)!.displayEquation}`
                      : (language === "sq" ? "Nuk ka reaksion të njohur për këtë çift" : "No known reaction for this pair")}
                  </div>
                )}
              </div>
            )}

            {reactionType === "decomposition" && (
              <Card className="p-5 bg-card border-border">
                <label className="text-sm font-medium text-foreground mb-2 block">{t("selectReaction")}</label>
                <Select value={selectedDecomposition} onValueChange={setSelectedDecomposition}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder={t("selectReaction")} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {DECOMPOSITION_REACTIONS.map(r => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
            )}

            <Button
              className="w-full h-12 text-base font-semibold gap-2"
              disabled={!canRun}
              onClick={handleRun}
            >
              <Play className="w-5 h-5" />
              {t("runReaction")}
            </Button>
          </div>

          <div>
            {result ? (
              <OutputPanel
                result={result}
                metalSymbol={reactionType === "single-displacement" ? selectedMetal : undefined}
                saltCationSymbol={reactionType === "single-displacement" ? selectedSaltCation : undefined}
                anionFormula={reactionType === "single-displacement" ? selectedAnion : undefined}
                selectedAcid={reactionType === "neutralization" ? ACIDS.find(a => a.formula === selectedAcid) : undefined}
                selectedBase={reactionType === "neutralization" ? BASES.find(b => b.formula === selectedBase) : undefined}
                selectedCompound={reactionType === "combustion" ? HYDROCARBONS.find(h => h.formula === selectedCompound) : undefined}
                selectedSynthesisReaction={reactionType === "synthesis" ? findSynthesisReaction(synthElementA, synthElementB) : undefined}
                selectedDecompositionReaction={reactionType === "decomposition" ? DECOMPOSITION_REACTIONS.find(r => r.id === selectedDecomposition) : undefined}
              />
            ) : (
              <Card className="p-12 bg-card border-border flex flex-col items-center justify-center text-center min-h-[300px]">
                <FlaskConical className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">{t("emptyStateMsg")}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
