import { Link } from "react-router-dom";
import { ArrowRightLeft, Atom, ArrowRight, Beaker, Flame, Combine, SplitSquareHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const reactionTypes = [
    {
      title: t("singleDisplacement"),
      icon: ArrowRightLeft,
      description: t("singleDisplacementDesc"),
      example: "Zn + CuSO₄ → ZnSO₄ + Cu",
      color: "text-oxidation",
      surface: "reaction-card--oxidation",
    },
    {
      title: t("redoxElectronTransfer"),
      icon: Atom,
      description: t("redoxDesc"),
      example: "Zn + Cu²⁺ → Zn²⁺ + Cu",
      color: "text-reduction",
      surface: "reaction-card--reduction",
    },
    {
      title: t("neutralization"),
      icon: Beaker,
      description: t("neutralizationDesc"),
      example: "HCl + NaOH → NaCl + H₂O",
      color: "text-primary",
      surface: "reaction-card--primary",
    },
    {
      title: t("combustion"),
      icon: Flame,
      description: t("combustionDesc"),
      example: "CH₄ + 2O₂ → CO₂ + 2H₂O",
      color: "text-destructive",
      surface: "reaction-card--combustion",
    },
    {
      title: t("synthesis"),
      icon: Combine,
      description: t("synthesisDesc"),
      example: "2Na + Cl₂ → 2NaCl",
      color: "text-success",
      surface: "reaction-card--success",
    },
    {
      title: t("decomposition"),
      icon: SplitSquareHorizontal,
      description: t("decompositionDesc"),
      example: "2H₂O → 2H₂ + O₂",
      color: "text-electron",
      surface: "reaction-card--electron",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-16 pb-16 sm:pb-24">
        <div className="text-center mb-16">
          <div className="infinity-orbit mx-auto mb-16" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span key={dot} className="infinity-orbit__dot" />
            ))}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-4 leading-tight">
            <span className="brand-wordmark">ChemReact</span> {t("heroTitle")}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reactionTypes.map((r) => (
            <div key={r.title}>
              <Link to="/simulator">
                <Card className={`reaction-card p-6 transition-colors cursor-pointer group h-full ${r.surface}`}>
                  <r.icon className={`w-10 h-10 ${r.color} mb-4`} />
                  <h2 className="text-lg font-bold text-foreground mb-2">{r.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{r.description}</p>
                  <div className="font-mono text-sm text-foreground/70 bg-background/50 rounded-xl px-3 py-2 mb-4">
                    {r.example}
                  </div>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium ${r.color} group-hover:gap-2 transition-all`}>
                    {t("tryIt")} <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
