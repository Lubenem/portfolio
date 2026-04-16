import express from "express";
import path from "node:path";
import fs from "node:fs";

const sites = [
  "portfolio",
  "barber",
  "car-repair",
  "dentist",
  "gym",
  "hvac",
  "plumber",
  "roofing",
  "spa",
  "tattoo",
  "veterinary",
];

const basePrefix = (() => {
  const raw = process.env.BASE_PREFIX;
  if (!raw) return "";
  const trimmed = raw.replace(/^\/|\/$/g, "");
  return trimmed ? `/${trimmed}` : "";
})();

const mountPath = (slug) => `${basePrefix}/${slug}`.replace(/\/+/g, "/");

function availableSites() {
  return sites.map((slug) => {
    const dist = path.resolve("sites", slug, "dist/public");
    return {
      slug,
      dist,
      ready: fs.existsSync(dist),
    };
  });
}

const app = express();
const port = Number(process.env.PORT || 4173);

const siteStatus = availableSites();

siteStatus.forEach(({ slug, dist, ready }) => {
  if (!ready) {
    console.warn(`⚠️  skipping ${slug} (build not found at ${dist})`);
    return;
  }

  const mount = mountPath(slug);
  app.use(mount, express.static(dist, { index: false }));
  app.get([mount, `${mount}/*`], (_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
});

app.get("/", (_req, res) => {
  const rows = siteStatus
    .map(({ slug, ready }) => {
      const status = ready ? "ready" : "missing build";
      const href = `${mountPath(slug)}/`;
      return `<li><a href="${href}">${href}</a> – ${status}</li>`;
    })
    .join("\n");

  res.setHeader("Content-Type", "text/html");
  res.send(`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Portfolio Sites</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.5; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    </style>
  </head>
  <body>
    <h1>Portfolio Sites</h1>
    <p>Built sites are served under <code>${basePrefix || "/"}</code> + slug. Missing ones need <code>npm run build</code>.</p>
    <ul>${rows}</ul>
  </body>
</html>`);
});

app.listen(port, () => {
  console.log(`Serving sites on http://localhost:${port}`);
});
