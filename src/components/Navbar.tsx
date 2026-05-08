import { Link, useLocation } from "react-router-dom";
import { Atom, FlaskConical, BookOpen, Info, Globe, Table2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: "/", label: t("home"), icon: Atom },
    { path: "/simulator", label: t("simulator"), icon: FlaskConical },
    { path: "/explorer", label: t("elementExplorer"), icon: Table2 },
    { path: "/learn", label: t("learn"), icon: BookOpen },
    { path: "/about", label: t("about"), icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg">
          <Atom className="w-6 h-6" />
          <span className="hidden sm:inline">ChemReact</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === path
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "sq" : "en")}
            className="ml-2 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">{language === "en" ? "SQ" : "EN"}</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
