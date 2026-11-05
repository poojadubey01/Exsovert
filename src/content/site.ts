/**
 * All site copy lives here. Replace the placeholder text with real
 * Exsovert content — components read from this file only.
 */

export const site = {
  name: "Exsovert",
  email: "hello@exsovert.com",
  location: "Remote / Worldwide",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  founded: "2026",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Independent digital studio",
    lede: "We design and build websites and products for teams who care how things feel, not only how they look.",
  },

  statement:
    "Most of the internet looks the same now. We start from the problem, cut everything that doesn't serve it, then spend our time on the details people actually notice — the timing of a transition, the weight of a headline, how fast the page answers back.",

  work: [
    { title: "Northline", discipline: "Brand, Website", year: "2026", tone: "#c9c2b2" },
    { title: "Halden Labs", discipline: "Product Design", year: "2026", tone: "#2f3b34" },
    { title: "Oru Studio", discipline: "WebGL, Development", year: "2025", tone: "#e8461e" },
    { title: "Field Notes", discipline: "Editorial Platform", year: "2025", tone: "#56514a" },
  ] as { title: string; discipline: string; year: string; tone: string; image?: string }[],

  services: [
    {
      title: "Strategy",
      body: "Positioning, information architecture, and a clear brief before anything gets drawn.",
      tags: ["Research", "Workshops", "Content"],
    },
    {
      title: "Design",
      body: "Identity systems, interface design and motion direction that hold together at every size.",
      tags: ["Identity", "UI", "Motion"],
    },
    {
      title: "Development",
      body: "Fast, accessible front-ends with Next.js, WebGL where it earns its place, and a CMS your team will use.",
      tags: ["Next.js", "Three.js", "CMS"],
    },
    {
      title: "Support",
      body: "We stay after launch — measuring, fixing and improving instead of handing over a zip file.",
      tags: ["Analytics", "Iteration", "Care"],
    },
  ],

  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};
