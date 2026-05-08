import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { METALS } from "@/data/chemistryData";
import { useLanguage } from "@/i18n/LanguageContext";

const Learn = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-8">{t("learnTitle")}</h1>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-primary mb-3">{t("oxidationVsReduction")}</h2>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                <strong className="text-oxidation">Oxidation</strong> {t("oxidationExplanation")}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                <strong className="text-reduction">Reduction</strong> {t("reductionExplanation")}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {t("mnemonic")} <strong>{t("oilRig")}</strong>
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-primary mb-3">{t("activitySeries")}</h2>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                {t("activitySeriesExplanation")}
              </p>
              <div className="flex flex-wrap gap-2">
                {METALS.map((m, i) => (
                  <div
                    key={m.symbol}
                    className="flex items-center gap-1 rounded-md bg-secondary border border-border px-3 py-2 text-sm"
                  >
                    <span className="font-bold text-foreground">{m.symbol}</span>
                    <span className="text-xs text-muted-foreground">{m.name}</span>
                    {i < METALS.length - 1 && <span className="text-muted-foreground ml-1">&gt;</span>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">{t("mostReactive")}</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-primary mb-3">{t("spectatorIons")}</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {t("spectatorExplanation")} <span className="font-mono text-primary">Zn + Cu²⁺ → Zn²⁺ + Cu</span>.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learn;
