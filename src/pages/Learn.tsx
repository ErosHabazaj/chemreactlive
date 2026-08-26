import {
  ArrowRightLeft,
  Atom,
  Beaker,
  Combine,
  Flame,
  SplitSquareHorizontal,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import { METALS } from "@/data/chemistryData";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language, TranslationKey } from "@/i18n/translations";

type LocalizedText = Record<Language, string>;

interface ReactionLesson {
  id: string;
  titleKey: TranslationKey;
  icon: LucideIcon;
  color: string;
  iconBackground: string;
  equation: string;
  pattern: string;
  summary: LocalizedText;
  explanation: LocalizedText;
  takeaway: LocalizedText;
}

const reactionLessons: ReactionLesson[] = [
  {
    id: "single-displacement",
    titleKey: "singleDisplacement",
    icon: ArrowRightLeft,
    color: "text-oxidation",
    iconBackground: "reaction-card--oxidation",
    equation: "Zn + CuSO₄ → ZnSO₄ + Cu",
    pattern: "A + BC → AC + B",
    summary: {
      en: "One element replaces a less reactive element in a compound.",
      sq: "Një element zëvendëson një element më pak reaktiv në një përbërje.",
    },
    explanation: {
      en: "Zinc sits above copper in the activity series, so zinc atoms lose electrons and enter the solution as Zn²⁺. Copper ions gain those electrons and form solid copper. A displacement only occurs when the free metal is more reactive than the metal in the compound.",
      sq: "Zinku gjendet mbi bakrin në serinë e aktivitetit, prandaj atomet e zinkut humbin elektrone dhe hyjnë në tretësirë si Zn²⁺. Jonet e bakrit i fitojnë ato elektrone dhe formojnë bakër të ngurtë. Zëvendësimi ndodh vetëm kur metali i lirë është më reaktiv se metali në përbërje.",
    },
    takeaway: {
      en: "Check the activity series before predicting the products.",
      sq: "Kontrollo serinë e aktivitetit para se të parashikosh produktet.",
    },
  },
  {
    id: "redox",
    titleKey: "redoxElectronTransfer",
    icon: Atom,
    color: "text-reduction",
    iconBackground: "reaction-card--reduction",
    equation: "Zn + Cu²⁺ → Zn²⁺ + Cu",
    pattern: "oxidation + reduction",
    summary: {
      en: "Electrons move from one species to another in paired half-reactions.",
      sq: "Elektronet lëvizin nga një specie te tjetra në gjysmë-reaksione të çiftuara.",
    },
    explanation: {
      en: "Oxidation and reduction always happen together. Zinc is oxidized because it loses two electrons, while Cu²⁺ is reduced because it gains those same two electrons. The electrons cancel when the half-reactions are added, leaving the balanced net ionic equation.",
      sq: "Oksidimi dhe reduktimi ndodhin gjithmonë së bashku. Zinku oksidohet sepse humb dy elektrone, ndërsa Cu²⁺ reduktohet sepse fiton të njëjtat dy elektrone. Elektronet anulohen kur mblidhen gjysmë-reaksionet, duke lënë ekuacionin jonik neto të balancuar.",
    },
    takeaway: {
      en: "Track oxidation numbers to identify the electron donor and acceptor.",
      sq: "Ndiq numrat e oksidimit për të gjetur dhuruesin dhe pranuesin e elektroneve.",
    },
  },
  {
    id: "neutralization",
    titleKey: "neutralization",
    icon: Beaker,
    color: "text-primary",
    iconBackground: "reaction-card--primary",
    equation: "HCl + NaOH → NaCl + H₂O",
    pattern: "acid + base → salt + water",
    summary: {
      en: "An acid and a base react to form water and a salt.",
      sq: "Një acid dhe një bazë reagojnë për të formuar ujë dhe kripë.",
    },
    explanation: {
      en: "The essential change is H⁺ combining with OH⁻ to make H₂O. Sodium and chloride ions remain unchanged in solution, so they are spectator ions. At equal acid and base amounts, the solution moves toward neutral pH.",
      sq: "Ndryshimi kryesor është bashkimi i H⁺ me OH⁻ për të formuar H₂O. Jonet e natriumit dhe klorurit mbeten të pandryshuara në tretësirë, prandaj janë jone spektatore. Me sasi të barabarta acidi dhe baze, tretësira shkon drejt pH-së neutrale.",
    },
    takeaway: {
      en: "The net ionic equation is H⁺ + OH⁻ → H₂O.",
      sq: "Ekuacioni jonik neto është H⁺ + OH⁻ → H₂O.",
    },
  },
  {
    id: "combustion",
    titleKey: "combustion",
    icon: Flame,
    color: "text-destructive",
    iconBackground: "reaction-card--combustion",
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    pattern: "hydrocarbon + O₂ → CO₂ + H₂O",
    summary: {
      en: "A fuel reacts rapidly with oxygen and releases energy.",
      sq: "Një lëndë djegëse reagon shpejt me oksigjenin dhe çliron energji.",
    },
    explanation: {
      en: "In complete hydrocarbon combustion, carbon atoms become carbon dioxide and hydrogen atoms become water. Strong product bonds release more energy than is needed to break the reactant bonds, so the reaction is exothermic.",
      sq: "Në djegien e plotë të hidrokarbureve, atomet e karbonit bëhen dioksid karboni dhe atomet e hidrogjenit bëhen ujë. Lidhjet e forta të produkteve çlirojnë më shumë energji sesa nevojitet për të thyer lidhjet e reaktantëve, prandaj reaksioni është ekzotermik.",
    },
    takeaway: {
      en: "Balance carbon first, hydrogen second, and oxygen last.",
      sq: "Balanco fillimisht karbonin, pastaj hidrogjenin dhe në fund oksigjenin.",
    },
  },
  {
    id: "synthesis",
    titleKey: "synthesis",
    icon: Combine,
    color: "text-success",
    iconBackground: "reaction-card--success",
    equation: "2Na + Cl₂ → 2NaCl",
    pattern: "A + B → AB",
    summary: {
      en: "Two or more reactants combine into one compound.",
      sq: "Dy ose më shumë reaktantë bashkohen në një përbërje.",
    },
    explanation: {
      en: "Sodium transfers electrons to chlorine, producing oppositely charged ions that attract and form an ionic lattice. Synthesis reactions have multiple reactants but one main product, making the product pattern easy to recognize.",
      sq: "Natriumi transferon elektrone te klori, duke prodhuar jone me ngarkesa të kundërta që tërhiqen dhe formojnë një rrjetë jonike. Reaksionet e sintezës kanë disa reaktantë, por një produkt kryesor.",
    },
    takeaway: {
      en: "Use ion charges to determine the product formula, then balance it.",
      sq: "Përdor ngarkesat e joneve për të gjetur formulën e produktit, pastaj balancoje.",
    },
  },
  {
    id: "decomposition",
    titleKey: "decomposition",
    icon: SplitSquareHorizontal,
    color: "text-electron",
    iconBackground: "reaction-card--electron",
    equation: "2H₂O → 2H₂ + O₂",
    pattern: "AB → A + B",
    summary: {
      en: "One compound separates into two or more simpler substances.",
      sq: "Një përbërje ndahet në dy ose më shumë substanca më të thjeshta.",
    },
    explanation: {
      en: "Energy is supplied to break bonds inside the original compound. The atoms then rearrange into more stable elemental or molecular products. Heat, light, or electrical energy often drives decomposition reactions.",
      sq: "Jepet energji për të thyer lidhjet brenda përbërjes fillestare. Atomet pastaj riorganizohen në produkte elementare ose molekulare më të qëndrueshme. Nxehtësia, drita ose energjia elektrike shpesh i nxisin këto reaksione.",
    },
    takeaway: {
      en: "Look for one reactant splitting into several products.",
      sq: "Kërko një reaktant që ndahet në disa produkte.",
    },
  },
];

const Learn = () => {
  const { t, language } = useLanguage();
  const localize = (text: LocalizedText) => text[language];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{t("learnTitle")}</h1>
        </header>

        <section className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold text-primary">{t("oxidationVsReduction")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="reaction-card--oxidation rounded-lg p-4">
                <strong className="text-oxidation">Oxidation</strong>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{t("oxidationExplanation")}</p>
              </div>
              <div className="reaction-card--reduction rounded-lg p-4">
                <strong className="text-reduction">Reduction</strong>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{t("reductionExplanation")}</p>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-secondary/60 px-4 py-3 font-mono text-sm text-muted-foreground">
              {t("mnemonic")} <strong>{t("oilRig")}</strong>
            </p>
          </Card>

          <Card className="border-border bg-card p-6">
            <h2 className="mb-3 text-xl font-bold text-primary">{t("activitySeries")}</h2>
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">{t("activitySeriesExplanation")}</p>
            <div className="flex flex-wrap gap-1.5">
              {METALS.map((metal) => (
                <span key={metal.symbol} className="rounded-md bg-secondary px-2.5 py-1.5 text-xs">
                  <strong className="text-foreground">{metal.symbol}</strong>
                  <span className="ml-1 text-muted-foreground">{metal.name}</span>
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("mostReactive")}</p>
          </Card>
        </section>

        <section aria-labelledby="reaction-library-title">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 id="reaction-library-title" className="text-2xl font-bold text-foreground">
                {language === "sq" ? "Biblioteka e reaksioneve" : "Reaction library"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {language === "sq"
                  ? "Kliko një reaksion për të hapur shpjegimin e plotë."
                  : "Select a reaction to expand its full explanation."}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">6 {language === "sq" ? "lloje" : "reaction types"}</span>
          </div>

          <Accordion type="single" collapsible className="grid gap-3">
            {reactionLessons.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <AccordionItem
                  key={lesson.id}
                  value={lesson.id}
                  className="overflow-hidden rounded-xl bg-card px-5 shadow-lg shadow-black/10 transition-colors data-[state=open]:bg-secondary"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline">
                    <span className="flex min-w-0 items-start gap-4">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${lesson.iconBackground}`}>
                        <Icon className={`h-5 w-5 ${lesson.color}`} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground">{t(lesson.titleKey)}</span>
                        <span className="mt-1 block text-sm font-normal text-muted-foreground">{localize(lesson.summary)}</span>
                        <span className="mt-2 block font-mono text-xs font-normal text-foreground/70">{lesson.equation}</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="grid gap-5 pt-5 md:grid-cols-[1.45fr_0.75fr]">
                      <div>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                          {language === "sq" ? "Si funksionon" : "How it works"}
                        </h3>
                        <p className="text-sm leading-relaxed text-foreground/80">{localize(lesson.explanation)}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-lg bg-secondary/60 p-3">
                          <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {language === "sq" ? "Modeli" : "Pattern"}
                          </span>
                          <code className="mt-1 block text-sm text-foreground">{lesson.pattern}</code>
                        </div>
                        <div className="reaction-card--primary rounded-lg p-3 text-xs leading-relaxed text-foreground/80">
                          <strong className="text-primary">{language === "sq" ? "Ideja kryesore: " : "Key idea: "}</strong>
                          {localize(lesson.takeaway)}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>

        <Card className="mt-10 border-border bg-card p-6">
          <h2 className="mb-3 text-xl font-bold text-primary">{t("spectatorIons")}</h2>
          <p className="text-sm leading-relaxed text-foreground/80">
            {t("spectatorExplanation")} <span className="font-mono text-primary">Zn + Cu²⁺ → Zn²⁺ + Cu</span>.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Learn;
