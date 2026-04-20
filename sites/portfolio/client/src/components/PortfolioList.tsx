import { ArrowUpRight } from "lucide-react";

const sites = [
  { slug: "barber", name: "Barber" },
  { slug: "car-repair", name: "Car Repair" },
  { slug: "dentist", name: "Dentist" },
  { slug: "gym", name: "Gym" },
  { slug: "hvac", name: "HVAC" },
  { slug: "plumber", name: "Plumber" },
  { slug: "roofing", name: "Roofing" },
  { slug: "spa", name: "Spa" },
  { slug: "tattoo", name: "Tattoo" },
  { slug: "veterinary", name: "Veterinary" },
];

export function PortfolioList() {
  const base = import.meta.env.BASE_URL || "/";
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-10" data-aos="fade-up">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Demo sites by niche</h2>
            <p className="text-muted-foreground mt-2">Click a card to open the live preview for that niche.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {sites.map((site) => (
            <div key={site.slug} data-aos="fade-up">
              <a
                href={`${base}${site.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-transform transition-shadow duration-150 ease-out hover:scale-[1.04] hover:shadow-lg"
              >
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img
                    src={`${base}${site.slug}.png`}
                    alt={`${site.name} preview`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                  <div className="absolute inset-0 hidden">
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="w-24 h-24 rounded-lg bg-muted-foreground/10 border border-dashed border-muted-foreground/40 flex items-center justify-center text-muted-foreground text-xs uppercase tracking-wide text-center leading-tight">
                        Screenshot
                        <br />
                        coming soon
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 pointer-events-none" />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Preview</p>
                    <p className="text-lg font-semibold">{site.name}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
