export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#who-we-are" },
  { label: "Product", href: "#product-overview" },
  { label: "Benefits", href: "#key-benefits" },
  { label: "Applications", href: "#applications" },
  { label: "Specs", href: "#technical-specs" },
  { label: "Assembly", href: "#assembly" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 1965, label: "Established", prefix: "", suffix: "", countFrom: 1900 },
  { value: 60, label: "Years of Excellence", prefix: "", suffix: "+", countFrom: 0 },
  { value: 5000, label: "Tanks Installed", prefix: "", suffix: "+", countFrom: 0 },
  { value: 100, label: "Client Satisfaction", prefix: "", suffix: "%", countFrom: 0 },
] as const;

export const BENEFITS = [
  { icon: "🛡️", title: "Corrosion-Free", desc: "FRP resists rust and chemical corrosion permanently." },
  { icon: "☀️", title: "UV Stabilized", desc: "Engineered resin protects against UV degradation." },
  { icon: "🔧", title: "Modular Design", desc: "Easy expansion — add panels as your needs grow." },
  { icon: "💧", title: "Potable Water Safe", desc: "Certified for drinking water storage applications." },
  { icon: "🏗️", title: "Lightweight Panels", desc: "Easy transport and installation — no heavy cranes." },
  { icon: "🌡️", title: "Thermal Insulation", desc: "Maintains water temperature in extreme climates." },
  { icon: "⚡", title: "Quick Assembly", desc: "Install in days, not weeks — bolt-on panel system." },
  { icon: "🔒", title: "Leak-Proof Sealing", desc: "EPDM gaskets ensure zero-leak performance." },
  { icon: "🌊", title: "High Capacity", desc: "From 1,000L to over 1,000,000 litres capacity." },
  { icon: "🏔️", title: "Earthquake Resistant", desc: "Flexible joints absorb seismic movement." },
  { icon: "💰", title: "Cost Effective", desc: "Lower lifetime cost than concrete or steel tanks." },
  { icon: "♻️", title: "Eco-Friendly", desc: "Recyclable materials with minimal environmental impact." },
] as const;

export const APPLICATIONS = [
  {
    icon: "🏥",
    name: "Hospitals & Healthcare",
    desc: "Hygienic potable water storage for medical facilities and patient care.",
    gradient: "from-teal-500/20 to-cyan-600/10",
  },
  {
    icon: "🏨",
    name: "Hotels & Hospitality",
    desc: "Reliable large-capacity water supply for guest comfort and operations.",
    gradient: "from-amber-500/20 to-yellow-600/10",
  },
  {
    icon: "🛡️",
    name: "Defence & Military",
    desc: "Durable field-deployable water storage for defence installations.",
    gradient: "from-slate-500/20 to-gray-600/10",
  },
  {
    icon: "🏭",
    name: "Industrial & Manufacturing",
    desc: "Chemical-resistant tanks for process water and industrial liquids.",
    gradient: "from-orange-500/20 to-red-600/10",
  },
  {
    icon: "🏢",
    name: "Commercial Buildings",
    desc: "Scalable water storage solutions for offices and retail complexes.",
    gradient: "from-blue-500/20 to-indigo-600/10",
  },
  {
    icon: "🏫",
    name: "Schools & Universities",
    desc: "Safe, clean water supply for educational institutions campus-wide.",
    gradient: "from-green-500/20 to-emerald-600/10",
  },
  {
    icon: "🌾",
    name: "Agriculture & Farming",
    desc: "Irrigation water storage built to withstand rural environments.",
    gradient: "from-lime-500/20 to-green-600/10",
  },
  {
    icon: "🏠",
    name: "Residential Estates",
    desc: "Community water storage for housing developments and apartments.",
    gradient: "from-pink-500/20 to-rose-600/10",
  },
] as const;

export const PANEL_PARTS = [
  { id: "roof", label: "Roof Panel", desc: "FRP top cover with water-tight seal", x: 0, y: -80 },
  { id: "air-vent", label: "Air Vent", desc: "Pressure equalization ventilation", x: 60, y: -90 },
  { id: "wall-left", label: "Side Wall (L)", desc: "Bolted FRP panel wall section", x: -100, y: 0 },
  { id: "wall-right", label: "Side Wall (R)", desc: "Bolted FRP panel wall section", x: 100, y: 0 },
  { id: "inlet", label: "Inlet Pipe", desc: "Water inlet with valve connection", x: -110, y: -40 },
  { id: "outlet", label: "Outlet Pipe", desc: "Water outlet with valve connection", x: 110, y: 40 },
  { id: "bracing", label: "Tie Rods & Bracing", desc: "SS304/SS316 internal bracing", x: 0, y: 0 },
  { id: "ladder", label: "External Ladder", desc: "Access ladder for maintenance", x: 120, y: -20 },
  { id: "base", label: "Base Frame", desc: "Steel support base structure", x: 0, y: 80 },
  { id: "manhole", label: "Manhole Cover", desc: "Access point for cleaning and inspection", x: -60, y: -70 },
] as const;

export const SPECS = [
  { param: "Material", value: "Fiber Reinforced Polymer (FRP)", bar: null, badge: null },
  { param: "Tensile Strength", value: "≥ 100 MPa", bar: 70, badge: null },
  { param: "Flexural Strength", value: "≥ 150 MPa", bar: 75, badge: null },
  { param: "Operating Temperature", value: "-20°C to +70°C", bar: null, badge: null, dual: true },
  { param: "pH Range", value: "2 – 12", bar: null, badge: null, dual: true },
  { param: "Panel Thickness", value: "8mm – 13mm", bar: 40, badge: null },
  { param: "Bracing Material", value: "SS304 / SS316", bar: null, badge: ["SS304", "SS316"] },
  { param: "Sealing", value: "EPDM Gasket", bar: null, badge: ["EPDM"] },
  { param: "Capacity Range", value: "1,000L – 1M+ L", bar: 95, badge: null },
  { param: "Water Quality", value: "Potable Compliant", bar: null, badge: ["Potable"] },
  { param: "UV Protection", value: "UV Stabilized Resin", bar: null, badge: ["UV Stabilized"] },
  { param: "Warranty", value: "Per Agreement", bar: null, badge: null },
] as const;

export const FRP_ADVANTAGES = [
  "Zero corrosion — lasts decades without rusting",
  "Lightweight panels — no heavy crane required",
  "Modular & expandable on-site",
  "Potable water certified",
  "UV stabilized resin coating",
  "Quick bolt-on assembly in days",
  "Earthquake-resistant flexible joints",
  "Minimal maintenance required",
] as const;

export const TRADITIONAL_DISADVANTAGES = [
  "Corrodes and rusts over time",
  "Heavy — requires cranes & heavy transport",
  "Fixed size — cannot be expanded",
  "Risk of contamination from rust",
  "Degrades under UV exposure",
  "Weeks of welding and construction",
  "Rigid joints crack under seismic stress",
  "Requires frequent painting & upkeep",
] as const;

export const ASSEMBLY_STEPS = [
  {
    step: 1,
    title: "Foundation Preparation",
    desc: "Level concrete base with embedded anchor bolts for precise panel alignment.",
  },
  {
    step: 2,
    title: "Panel Installation",
    desc: "Bolt FRP panels together using SS304 hardware — walls, then internal bracing.",
  },
  {
    step: 3,
    title: "Bracing & Tie Rods",
    desc: "Install stainless steel tie rods and cross-bracing for structural integrity.",
  },
  {
    step: 4,
    title: "Gasket Sealing & Testing",
    desc: "Apply EPDM gaskets at all joints, then hydrostatic pressure test for zero leaks.",
  },
] as const;

export const ASSEMBLY_FEATURES = [
  { icon: "🔩", text: "No Welding Required" },
  { icon: "🏗️", text: "No Heavy Equipment" },
  { icon: "⏱️", text: "2–5 Days Install" },
  { icon: "📐", text: "Precision Engineered" },
  { icon: "✅", text: "Pressure Tested" },
] as const;

export const CONTACT_INFO = {
  address: "Nyerere Road, Dar Es Salaam, Tanzania",
  phone: "+255 799 056 641",
  email: "info@neomech.co.tz",
  whatsapp: "https://wa.me/255799056641",
} as const;

export const SOCIAL_LINKS = [
  { name: "WhatsApp", href: "https://wa.me/255799056641", color: "#25D366" },
  { name: "LinkedIn", href: "#", color: "#0A66C2" },
  { name: "Facebook", href: "#", color: "#1877F2" },
] as const;

export const FOOTER_LINKS = [
  { label: "About Us", href: "#who-we-are" },
  { label: "Products", href: "#product-overview" },
  { label: "Benefits", href: "#key-benefits" },
  { label: "Specifications", href: "#technical-specs" },
  { label: "Contact", href: "#contact" },
] as const;
