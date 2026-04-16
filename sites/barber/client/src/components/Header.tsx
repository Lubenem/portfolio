import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logo = `${import.meta.env.BASE_URL}assets/favicon.jpg`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: t.nav.home, id: "hero" },
    { label: t.nav.services, id: "services" },
    { label: t.nav.gallery, id: "gallery" },
    { label: t.nav.contact, id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Latinos Barbershop Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              data-testid="img-logo"
            />
            <span className="font-display text-xl md:text-2xl text-white tracking-wide hidden sm:block">
              Latinos Barbershop
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "en" ? "ua" : "en")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
              aria-label="Toggle language"
              data-testid="button-language-toggle"
            >
              <span className={language === "en" ? "opacity-100" : "opacity-50"}>EN</span>
              <span className="opacity-50">/</span>
              <span className={language === "ua" ? "opacity-100" : "opacity-50"}>UA</span>
            </button>

            <Button
              onClick={() => scrollToSection("appointment")}
              className="hidden sm:flex bg-primary text-primary-foreground font-semibold uppercase tracking-wide text-sm"
              data-testid="button-book-now"
            >
              {t.nav.bookNow}
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle mobile menu"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          data-testid="nav-mobile"
        >
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider py-3 text-left"
                data-testid={`nav-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("appointment")}
              className="mt-4 w-full bg-primary text-primary-foreground font-semibold uppercase tracking-wide text-sm"
              data-testid="button-book-now-mobile"
            >
              {t.nav.bookNow}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
