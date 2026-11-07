/**
 * All site copy lives here, taken from the Exsovert AI Engineering
 * ideation blueprint. Components read from this file only.
 */

export type ServiceId = "S01" | "S02" | "S03" | "S04" | "S05" | "S06";
export type ProductId = "P01" | "P02" | "P03" | "P04" | "P05" | "P06";
export type Role = "PRIMARY" | "SUPPORT" | "ALL" | null;

export const site = {
  name: "Exsovert",
  tagline: "Forward-Deployed AI Engineering",
  email: "hello@exsovert.com",
  location: "Remote / Worldwide",

  nav: [
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Process", href: "#process" },
    { label: "Model", href: "#model" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    tag: "FDE / 2026",
    headlineTop: "Forward-Deployed",
    typed: ["AI Engineering", "AI Agents", "AI Systems", "AI Products"],
    headlineBottom: "inside your business.",
    lede: "We discover the problem, design the system, and build and deploy working AI inside your business — then run it for you every month.",
    proof: { value: "6", label: "AI products", value2: "6", label2: "services" },
    ticker: ["DISCOVER", "DESIGN", "DEPLOY"],
  },

  values: {
    heading: ["Less generic AI tools.", "More working AI systems."],
    items: [
      {
        no: "001",
        title: "Built inside your business",
        body: "Engineers embed with your team, audit real workflows and ship AI that fits how you already operate.",
        tag: "Forward-deployed",
        art: "embed",
      },
      {
        no: "002",
        title: "Client-specific, client-owned",
        body: "Private models, custom software and agent workflows running on hardware or cloud accounts you own.",
        tag: "No generic SaaS seat",
        art: "own",
      },
      {
        no: "003",
        title: "Operated every month",
        body: "Managed AI Operations keeps models, queues and workflows monitored, patched and improving.",
        tag: "Monthly management",
        art: "operate",
      },
    ],
  },

  services: [
    {
      id: "S01",
      tag: "Flagship",
      name: "Forward-Deployed AI Engineering",
      short: "Field AI",
      body: "Discover the problem, design the system, build and deploy it inside the client business. S01 leads discovery and deployment on every product.",
      points: ["Workflow audit", "Solution architecture", "On-site deployment"],
    },
    {
      id: "S02",
      tag: "Automation",
      name: "Agentic AI & Automation",
      short: "Agents",
      body: "Agents, workflows and multi-agent systems that take work off your team's plate.",
      points: ["AI agents", "Workflow automation", "Multi-agent systems"],
    },
    {
      id: "S03",
      tag: "Development",
      name: "Custom Software & AI Development",
      short: "Software",
      body: "Web apps, dashboards, internal tools and the backend that ties your AI together.",
      points: ["Web apps", "Dashboards", "Tools & backend"],
    },
    {
      id: "S04",
      tag: "Infrastructure",
      name: "AI Infrastructure & Integration",
      short: "Infra",
      body: "GPU compute, private models, hosting and the APIs that connect them to your systems.",
      points: ["GPU & compute", "Private models", "Hosting & APIs"],
    },
    {
      id: "S05",
      tag: "Growth",
      name: "AI Growth & Creative Systems",
      short: "Growth",
      body: "Marketing, sales and creative AI pipelines — from lead research to video production.",
      points: ["Marketing AI", "Sales pipelines", "Creative production"],
    },
    {
      id: "S06",
      tag: "Monthly",
      name: "Managed AI Operations",
      short: "Operations",
      body: "Monitor, maintain, update and improve. Optional, contracted monthly operation for every product.",
      points: ["Monitoring", "Maintenance", "Improvement"],
    },
  ] as { id: ServiceId; tag: string; name: string; short: string; body: string; points: string[] }[],

  products: [
    {
      id: "P01",
      tag: "Foundation",
      name: "Exsovert Core",
      kicker: "AI control and orchestration",
      body: "AI models, orchestration and integrations — the backbone every other product runs on.",
      features: ["Model orchestration", "Integration APIs", "Permissions & logs"],
    },
    {
      id: "P02",
      tag: "Automation",
      name: "Exsovert Flow",
      kicker: "Autonomous workflow systems",
      body: "Agentic workflows and process automation that research, plan and execute across your tools.",
      features: ["Agent workflows", "Process automation", "Multi-step planning"],
    },
    {
      id: "P03",
      tag: "Communication",
      name: "Exsovert Connect",
      kicker: "AI CRM and communication",
      body: "Support, CRM, messaging and customer agents that keep every conversation in context.",
      features: ["Customer agents", "CRM sync", "Messaging"],
    },
    {
      id: "P04",
      tag: "Analytics",
      name: "Exsovert Insight",
      kicker: "Decision intelligence",
      body: "Dashboards, reporting and business intelligence that turn operational data into decisions.",
      features: ["Dashboards", "Reporting", "Business intelligence"],
    },
    {
      id: "P05",
      tag: "Content",
      name: "Exsovert Studio",
      kicker: "Generative production engine",
      body: "AI video, voice, podcasts and creative production on licensed local models you control.",
      features: ["Voice + video models", "Lip-sync & editing", "Batch render queue"],
    },
    {
      id: "P06",
      tag: "Marketing",
      name: "Exsovert Growth",
      kicker: "Sales and marketing engine",
      body: "Lead generation, campaigns and sales agents with human approval before anything goes out.",
      features: ["Lead research", "Campaigns", "Sales agents"],
    },
  ] as { id: ProductId; tag: string; name: string; kicker: string; body: string; features: string[] }[],

  /** Ownership matrix — rows are products, columns S01…S06. */
  matrix: {
    P01: ["ALL", "SUPPORT", "SUPPORT", "PRIMARY", null, "ALL"],
    P02: ["ALL", "PRIMARY", "SUPPORT", "SUPPORT", null, "ALL"],
    P03: ["ALL", "PRIMARY", "SUPPORT", "SUPPORT", "SUPPORT", "ALL"],
    P04: ["ALL", "SUPPORT", "PRIMARY", "SUPPORT", null, "ALL"],
    P05: ["ALL", null, "SUPPORT", "SUPPORT", "PRIMARY", "ALL"],
    P06: ["ALL", "SUPPORT", "SUPPORT", null, "PRIMARY", "ALL"],
  } as Record<ProductId, Role[]>,

  roles: [
    { role: "PRIMARY", body: "The service accountable for engineering and delivering that product family." },
    { role: "SUPPORT", body: "Additional engineering capabilities needed to deploy or extend the product." },
    { role: "ALL", body: "S01 leads discovery and deployment. S06 provides optional, contracted monthly operation for every product." },
  ],

  process: [
    { no: "001", title: "Discover", body: "Workflow audit, goals, constraints and success metrics." },
    { no: "002", title: "Design", body: "Architecture, model choice, GPU and cost plan." },
    { no: "003", title: "Engineer", body: "Build interfaces, agents, automations and integrations." },
    { no: "004", title: "Deploy", body: "Install, test, secure, document and train users." },
    { no: "005", title: "Operate", body: "Monitor, maintain and improve under an agreed scope." },
  ],

  examples: [
    {
      id: "studio",
      product: "Exsovert Studio",
      title: "AI content production",
      summary: "A private video and podcast engine using approved presenters, repeatable workflows and social publishing.",
      requirement: "Create repeatable branded videos, podcasts and social content without relying on pay-per-video generation tools.",
      deliverable: "A client-operated production platform, powered by appropriately licensed local models and automated workflows.",
      steps: [
        { label: "inputs", owner: "Brand + approvals", items: ["Brand guidelines", "Authorized faces & voices", "Topics and content brief"] },
        { label: "planning", owner: "Exsovert Flow", items: ["Research and outlines", "Scripts and storyboards", "Shot / asset plans"] },
        { label: "generation", owner: "Exsovert Studio", items: ["Voice + video models", "Lip-sync and editing", "Batch render queue"] },
        { label: "quality_gate", owner: "Human approval", items: ["Accuracy and brand checks", "Presenter consent checks", "Final sign-off"] },
        { label: "distribution", owner: "Exsovert Growth", items: ["Captions and metadata", "Scheduling and publishing", "Campaign reporting"] },
      ],
      backbone: "Custom control panel, model orchestration, client GPU or cloud compute, storage, permissions, logs and integration APIs.",
      note: "No artificial per-video credit cap does not mean infinite capacity. Throughput depends on GPUs, processing time, energy, storage and permitted model licenses.",
    },
    {
      id: "growth",
      product: "Exsovert Growth",
      title: "Agentic marketing operations",
      summary: "A connected system that researches leads, prepares content, manages campaigns and updates the CRM.",
      requirement: "Research leads, prepare content, run campaigns and keep the CRM current — without a patchwork of disconnected tools.",
      deliverable: "Exsovert Growth combined with Flow, Connect and Insight into one loop with human approval before anything is sent.",
      steps: [
        { label: "business_goal", owner: "Step 01", items: ["Define audience and offer", "Approval rules", "Measurable KPIs"] },
        { label: "research_agents", owner: "Step 02", items: ["Identify prospects", "Segment them", "Verify useful information"] },
        { label: "content_engine", owner: "Step 03", items: ["Draft campaigns", "Landing pages", "Personalized messages"] },
        { label: "approval_gate", owner: "Step 04", items: ["Outreach review", "Content review", "Brand compliance"] },
        { label: "execution", owner: "Step 05", items: ["Email workflows", "CRM updates", "Social publishing"] },
        { label: "learning_loop", owner: "Step 06", items: ["Analyze conversions", "Feed results back", "Re-plan"] },
      ],
      backbone: "P06 Growth · P02 Flow · P03 Connect · P04 Insight — combined to deliver one product.",
      note: "Responsible automation: permission-based outreach, review checkpoints, platform policy compliance and audit logs.",
    },
  ],

  model: {
    oneTime: {
      label: "One-time / Implementation",
      title: "Custom engineering fee",
      for: "Scoped per engagement",
      items: [
        "Problem discovery and solution architecture",
        "Custom application, model and agent integration",
        "Deployment, validation, documentation and training",
      ],
    },
    recurring: {
      label: "Recurring / Managed AI Operations",
      title: "Monthly service retainer",
      for: "Agreed SLA and scope",
      items: [
        "Monitoring, reliability and troubleshooting",
        "Security patches, model and workflow upkeep",
        "Optimization and agreed feature enhancements",
      ],
    },
    client: {
      title: "Client responsibilities",
      body: "Fund and own the agreed hardware or cloud account, electricity, compute, storage, third-party usage and applicable software/model licenses.",
      foot: "Clear ownership and handover terms belong in the contract.",
    },
    exsovert: {
      title: "Exsovert responsibilities",
      body: "Define deliverables, document the architecture, implement safety and access controls, and set the monthly SLA, response windows and change-request policy.",
      foot: "New modules and unlimited feature requests are scoped separately.",
    },
  },

  principles: [
    {
      label: "Consent",
      title: "Publish only with consent",
      body: "Generated people and voices are used only with the depicted person's consent and an approval process in place.",
      icon: "check",
    },
    {
      label: "Approval",
      title: "Humans sign off",
      body: "Every outreach, content and publishing workflow passes a human review checkpoint before it reaches the outside world.",
      icon: "eye",
    },
    {
      label: "Capacity",
      title: "Honest operating limits",
      body: "No per-video credit cap doesn't mean infinite capacity. Throughput depends on GPUs, processing time, energy, storage and model licenses.",
      icon: "gauge",
    },
    {
      label: "Audit",
      title: "Logged and permissioned",
      body: "Access controls, audit logs and platform-policy compliance are designed in from the start, not bolted on later.",
      icon: "code",
    },
  ],

  faqs: [
    {
      q: "What does “forward-deployed” mean?",
      a: "Our engineers work inside your business rather than handing you a generic tool. We audit your real workflows, design the system around them, build it, deploy it in your environment and train your team to use it.",
    },
    {
      q: "Do we own what you build?",
      a: "You fund and own the hardware or cloud account, compute, storage and model licenses the system runs on. Ownership and handover terms are written clearly into the contract before work starts.",
    },
    {
      q: "Which product do we need?",
      a: "Most engagements start with a workflow audit. From there we map your problem to one or more products — Core, Flow, Connect, Insight, Studio or Growth — and the services that engineer them.",
    },
    {
      q: "Is there a per-video or per-task credit limit?",
      a: "There is no artificial per-video credit cap. That doesn't mean infinite capacity: throughput depends on your GPUs, processing time, energy, storage and the licenses of the models you're permitted to use.",
    },
    {
      q: "What does the monthly retainer cover?",
      a: "Managed AI Operations covers monitoring, reliability and troubleshooting, security patches, model and workflow upkeep, and optimization with agreed feature enhancements — all under a defined SLA and response window.",
    },
    {
      q: "Are new features included?",
      a: "Agreed enhancements are part of the retainer. New modules and open-ended feature requests are scoped separately under the change-request policy, so costs stay predictable.",
    },
  ],

  cta: {
    eyebrow: "Start with a workflow audit",
    top: "Your AI system,",
    typed: "Deployed",
    bottom: "inside your business.",
    button: "Book discovery",
    marquee: ["#FORWARD-DEPLOYED", "#AI-ENGINEERING"],
  },

  footer: {
    blurb: "Working, client-specific AI capabilities — not just access to generic AI tools.",
  },

  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};
