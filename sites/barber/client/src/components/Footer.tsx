import { SiFacebook, SiInstagram } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  const logo = `${import.meta.env.BASE_URL}assets/favicon.jpg`;

  return (
    <footer className="py-12 bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Latinos Barbershop Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
            <span className="font-display text-xl text-foreground tracking-wide">
              Latinos Barbershop
            </span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/LatinosBarbershopLR/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Facebook"
              data-testid="footer-link-facebook"
            >
              <SiFacebook className="w-5 h-5 text-foreground" />
            </a>
            <a
              href="https://www.instagram.com/LatinosBarbershopandSalonLLC/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Instagram"
              data-testid="footer-link-instagram"
            >
              <SiInstagram className="w-5 h-5 text-foreground" />
            </a>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            &copy; 2025 {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
