import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();
  const heroBg = `${import.meta.env.BASE_URL}assets/interior-banner.jpg`;

  const scrollToAppointment = () => {
    const element = document.getElementById("appointment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroBg}')` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider mb-6 animate-fade-up"
          data-testid="text-hero-headline"
        >
          {t.hero.headline}
        </h1>
        <p 
          className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
          data-testid="text-hero-subheadline"
        >
          {t.hero.subheadline}
        </p>
        <Button
          onClick={scrollToAppointment}
          size="lg"
          className="bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-base md:text-lg px-8 py-6 backdrop-blur-md"
          data-testid="button-hero-cta"
        >
          {t.hero.cta}
        </Button>
      </div>

      <button
        onClick={() => {
          const element = document.getElementById("services");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to services"
        data-testid="button-scroll-down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
