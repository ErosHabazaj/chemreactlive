import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Atom } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-8">{t("aboutTitle")}</h1>

          <Card className="p-6 bg-card border-border space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Atom className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">ChemReact {t("heroTitle")}</h2>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {t("aboutDescription")}
            </p>

            <div className="bg-secondary rounded-lg p-4 text-sm space-y-2">
              <h3 className="font-semibold text-foreground">{t("howChemistryWorks")}</h3>
              <ul className="list-disc list-inside text-foreground/70 space-y-1">
                <li>{t("chemLogic1")}</li>
                <li>{t("chemLogic2")}</li>
                <li>{t("chemLogic3")}</li>
                <li>{t("chemLogic4")}</li>
                <li>{t("chemLogic5")}</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground border-t border-border pt-4">
              ⚠️ <strong>Disclaimer:</strong> {t("disclaimer")}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
