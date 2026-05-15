export type BlogSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedOn: string;
  sections: BlogSection[];
};

export type ServiceCity = {
  slug: string;
  name: string;
  description: string;
  intro: string;
  localAdvantages: string[];
  commonJobs: string[];
  nearby: string[];
};

export type IndustryPage = {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  intro: string;
  valuePoints: string[];
  commonJobs: string[];
  pricingGuidance: string[];
  priorClients: string[];
  process: string[];
  ctaTitle: string;
  ctaCopy: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "junk-removal-cost-seattle-eastside",
    title: "How Much Does Junk Removal Cost in Seattle and the Eastside?",
    description:
      "A clear breakdown of what affects junk removal pricing across Seattle and Eastside cities, from item count to access and disposal type.",
    excerpt:
      "Most customers want a straight answer on price. Here is the clean version of what actually moves the number up or down.",
    category: "Pricing",
    readTime: "5 min read",
    publishedOn: "April 28, 2026",
    sections: [
      {
        title: "The short answer",
        paragraphs: [
          "Junk removal pricing usually depends on the number of items, the amount of labor, how easy the pickup is, and what kind of material needs to be disposed of.",
          "A simple curbside pickup is usually cheaper than an inside pickup with stairs, difficult access, or heavy debris. That is why the fastest accurate quote usually comes from a few photos plus the address.",
        ],
      },
      {
        title: "What affects the price the most",
        bullets: [
          "How many items need to go",
          "Whether the pickup is curbside or inside",
          "Stairs, long carries, gates, or tight paths",
          "Heavy materials like debris, dirt, or concrete",
          "Whether furniture needs to be broken down first",
          "The exact city and service address for tax and route planning",
        ],
      },
      {
        title: "How to get the fastest quote",
        paragraphs: [
          "If you want the cleanest pricing conversation, text clear photos, include your ZIP code, and say whether the items are curbside, inside, or behind stairs or gates.",
          "That gives the crew enough context to reply fast without the back-and-forth that makes national services feel frustrating.",
        ],
      },
    ],
  },
  {
    slug: "what-affects-junk-removal-pricing",
    title: "What Affects Junk Removal Pricing the Most?",
    description:
      "A simple guide to the biggest pricing factors in junk removal, including labor, access, volume, disposal type, and specialty items.",
    excerpt:
      "Customers usually assume the item itself sets the price. In reality, access and labor often matter just as much.",
    category: "How-To",
    readTime: "4 min read",
    publishedOn: "April 28, 2026",
    sections: [
      {
        title: "Volume matters, but it is not the whole story",
        paragraphs: [
          "The amount of space your junk takes up is a major pricing factor, especially on larger mixed loads. But two jobs with the same volume can still price differently if one is much harder to remove.",
        ],
      },
      {
        title: "Labor and access are big drivers",
        bullets: [
          "Curbside pickups are usually the easiest",
          "Inside home pickups take more time",
          "Stairs add labor",
          "Long walks, steep driveways, gates, and awkward layouts can increase difficulty",
          "Disassembly adds extra handling time",
        ],
      },
      {
        title: "Material type changes disposal cost",
        paragraphs: [
          "Yard waste, construction debris, concrete, appliances, and electronics do not all dispose the same way. Some materials cost more to handle or must be separated out.",
          "That is why specialty or heavy-material jobs are often best confirmed with photos instead of relying only on a generic item list.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-the-fastest-junk-removal-quote",
    title: "How to Get the Fastest Junk Removal Quote",
    description:
      "A simple step-by-step guide to getting a fast junk removal quote without wasting time on back-and-forth messages.",
    excerpt:
      "If you want a fast answer, there is a right way to send the request. A few details upfront makes quoting much faster.",
    category: "Tips",
    readTime: "3 min read",
    publishedOn: "April 28, 2026",
    sections: [
      {
        title: "Send photos first",
        paragraphs: [
          "Wide photos help us understand how much there is, and close photos help us identify the material. Both matter.",
        ],
      },
      {
        title: "Include the details that save the most time",
        bullets: [
          "Your ZIP code or full address",
          "Whether the items are curbside or inside",
          "Whether there are stairs",
          "Whether anything is especially heavy or oversized",
          "Whether you need same-day or next-day service",
        ],
      },
      {
        title: "Use the instant quote tool when the job is straightforward",
        paragraphs: [
          "For standard furniture, mattresses, misc piles, electronics, and other common pickups, the instant quote tool gives you a quick estimate range and speeds up the next step.",
          "If the pickup is more unusual, text or call and we will help price it directly.",
        ],
      },
    ],
  },
  {
    slug: "what-we-take-and-what-needs-approval",
    title: "What We Take and What Needs Special Approval",
    description:
      "A guide to common junk removal items, specialty pickups, and restricted materials that require approval before scheduling.",
    excerpt:
      "Most furniture, appliances, electronics, yard waste, and debris are straightforward. Some items need approval first.",
    category: "Guide",
    readTime: "4 min read",
    publishedOn: "April 28, 2026",
    sections: [
      {
        title: "Common pickups are usually easy",
        bullets: [
          "Couches and loveseats",
          "Mattresses and box springs",
          "Dressers, desks, tables, and cabinets",
          "Appliances and electronics",
          "Yard waste and misc cleanup piles",
          "Garage, storage unit, and move-out cleanouts",
        ],
      },
      {
        title: "Some jobs need a custom look",
        paragraphs: [
          "Hot tubs, oversized commercial fixtures, unusually heavy debris, and awkward teardown work are usually better handled with a direct quote.",
        ],
      },
      {
        title: "Items that need approval or special handling",
        bullets: [
          "Hazardous chemicals",
          "Paints and solvents",
          "Asbestos-containing material",
          "Biohazard waste",
          "Pressurized tanks",
        ],
      },
    ],
  },
];

export const industryPages: IndustryPage[] = [
  {
    slug: "contractors",
    name: "Contractors",
    shortLabel: "Contractors",
    description:
      "Fast contractor junk removal, light demo support, post-construction cleaning, and debris haul-away for remodels, punch lists, and jobsite resets across Seattle and the Eastside.",
    intro:
      "Contractor jobs need reliable turnaround, simple communication, and pricing that makes sense without dragging out the cleanup side of the project. The best fit is when you need a crew that can help clear the mess, keep the site moving, and make the next phase easier.",
    valuePoints: [
      "Fast debris haul-away so crews can keep moving",
      "Straightforward scheduling for remodel, light demo, post-construction cleanup, and punch-list jobs",
      "Photos and job details can be quoted quickly without long back-and-forth",
      "Local coverage across Seattle and Eastside routes",
      "Helpful for site resets when another trade is coming in next",
    ],
    commonJobs: [
      "Demo debris cleanup",
      "Light demolition support and teardown haul-away",
      "Wood, drywall, and mixed remodel waste",
      "Post-construction cleanup after the heavy work is done",
      "Garage, basement, and property reset cleanups",
      "Fixture, cabinet, and material haul-away",
    ],
    pricingGuidance: [
      "Construction debris starts around $350 per ton depending on material and access",
      "Light demo and post-construction cleanup jobs are usually scoped by labor, material, and disposal mix",
      "Smaller mixed cleanup jobs can often be priced from photos before arrival",
      "Bigger contractor loads are typically quoted by volume, weight, and labor conditions",
    ],
    priorClients: ["Absher", "Pivotal"],
    process: [
      "Send site photos or material details",
      "Get a quick range and scheduling window",
      "We load, haul, and clear the space so the next trade can move in",
    ],
    ctaTitle: "Need a faster contractor cleanup partner?",
    ctaCopy:
      "Text jobsite photos and the address, and we can usually quote the cleanup faster than a long call chain or generic dispatch service.",
  },
  {
    slug: "real-estate-agents",
    name: "Real Estate Agents",
    shortLabel: "Real Estate",
    description:
      "Responsive cleanup support for real estate agents who need listings cleared, garages cleaned out, and properties market-ready fast.",
    intro:
      "Agents often need a fast cleanup partner that helps listings show better without turning a simple prep job into a slow scheduling project. The real value is getting a property looking cleaner, more open, and more market-ready with fewer vendors to juggle.",
    valuePoints: [
      "Fast-response property cleanup designed to help listings hit the market quicker",
      "Reliable communication and scheduling that makes coordination easy for agents, sellers, and vendors",
      "Clean, efficient removal of unwanted furniture, garage clutter, storage overflow, and move-out debris",
      "Curb appeal support through exterior cleanup, landscape refresh coordination, and pressure washing services",
      "Quick, hassle-free estimates from photos and property information - reducing delays and keeping projects moving",
    ],
    commonJobs: [
      "Listing preparation cleanouts and fast-turn property resets",
      "Exterior refresh support including light landscaping, debris removal, and curb appeal cleanup",
      "Pressure washing coordination and presentation-focused property cleanup",
      "Garage, shed, and storage space cleanouts for smoother property transitions",
      "Move-out junk removal and leftover item haul-away services",
      "Furniture removal and pre-staging cleanup to help homes show cleaner and more open",
    ],
    pricingGuidance: [
      "Smaller pickup jobs can often be quoted from photos",
      "Common listing-prep cleanouts are typically priced by item mix, access, labor, and the amount of property-ready prep needed",
      "Exterior refresh and market-ready work is usually scoped by photos and actual condition first",
      "Bigger move-out jobs are generally quoted by load size and actual conditions",
    ],
    priorClients: ["Windamere"],
    process: [
      "Send photos and property details",
      "Get a quote range and service window",
      "We clear the clutter so the property can show cleaner and faster",
    ],
    ctaTitle: "Need a property cleaned up before it hits the market?",
    ctaCopy:
      "Send a few photos, the address, and your timing. We can help agents move faster on listing prep without a complicated booking experience.",
  },
  {
    slug: "retail-companies",
    name: "Retail Companies",
    shortLabel: "Retail",
    description:
      "Retail junk removal support for stores, backrooms, fixture swaps, overstock cleanup, and haul-away jobs that need to stay fast and simple.",
    intro:
      "Retail teams need speed, clear pricing, and a crew that understands how to work around operating stores, storage areas, and changing fixtures.",
    valuePoints: [
      "Fast response for store cleanouts and fixture haul-away",
      "Good fit for backroom overflow, packaging, shelving, and mixed retail junk",
      "Easy coordination for single-store or repeat service needs",
      "Local crews instead of remote call-center scheduling",
      "Helpful for post-reset, light teardown, and reopen-ready cleanup support",
    ],
    commonJobs: [
      "Fixture and display removal",
      "Backroom and packaging cleanup",
      "Storage overflow and mixed junk pickup",
      "Light fixture breakdown and haul-away during resets",
      "Post-reset and post-remodel haul-away",
    ],
    pricingGuidance: [
      "Smaller store pickups can often be quoted from photos or item lists",
      "Mixed retail cleanup jobs are typically priced by volume, access, and labor",
      "Repeat retail work can be scoped around the actual store flow and timing needs",
    ],
    priorClients: ["Dollar Store", "Floor & Decor", "Claddagh"],
    process: [
      "Send photos or a quick item summary",
      "Get a simple quote range and pickup window",
      "We load and haul without dragging down store operations",
    ],
    ctaTitle: "Need faster retail haul-away support?",
    ctaCopy:
      "Send store photos or a quick summary of what needs to go, and we can help line up a fast retail pickup without the big-company hassle.",
  },
  {
    slug: "property-management",
    name: "Property Management",
    shortLabel: "Property Mgmt",
    description:
      "Property management junk removal for turnovers, common area cleanups, storage overflows, and bulky haul-away across Seattle and the Eastside.",
    intro:
      "Property managers need fast turn support, reliable communication, and crews that understand access, tenant timing, and building logistics.",
    valuePoints: [
      "Turnover cleanup support for units, garages, and storage spaces",
      "Helpful for abandoned items, tenant leftovers, and common area junk",
      "Responsive scheduling for time-sensitive property needs",
      "Simple quoting from photos, addresses, and access details",
      "Helpful when properties need to look cleaner and more rentable fast",
    ],
    commonJobs: [
      "Apartment and rental turnovers",
      "Storage and garage cleanouts",
      "Common area junk removal",
      "Move-out leftover cleanup before maintenance or leasing",
      "Bulky furniture and abandoned-item haul-away",
    ],
    pricingGuidance: [
      "Smaller turnover jobs can often be priced from photos before arrival",
      "Larger cleanouts are usually scoped by volume, labor, and building access",
      "Multi-stop or repeat property work can be coordinated around route timing",
    ],
    priorClients: ["West Coast Self-Storage"],
    process: [
      "Text photos, address, and access details",
      "Get a quote range and scheduling options",
      "We clear the unit or area so the next step can happen faster",
    ],
    ctaTitle: "Need a cleaner turnover process?",
    ctaCopy:
      "We can help with fast haul-away for properties that need to reset quickly, without making the cleanup side harder than it should be.",
  },
  {
    slug: "municipalities-government",
    name: "Municipalities & Government",
    shortLabel: "Municipal",
    description:
      "Reliable municipal and government-related junk removal support for cleanup, bulky haul-away, and special project assistance where local response matters.",
    intro:
      "Public-facing and civic jobs often need reliability, professionalism, and clear communication, especially when access, timing, or site conditions are sensitive.",
    valuePoints: [
      "Professional local crews with simple communication",
      "Helpful for bulky material, cleanup support, and time-sensitive haul-away",
      "Clear scope conversations before scheduling",
      "Good fit for projects that need speed without confusion",
      "Useful for straightforward civic cleanup support where a local response matters",
    ],
    commonJobs: [
      "Bulky haul-away support",
      "Cleanup after small projects or site work",
      "Park, facility, or storage-area cleanup support when scope fits",
      "Mixed debris and material pickup",
      "On-call local cleanup assistance when scope fits",
    ],
    pricingGuidance: [
      "Public-sector style jobs are usually best scoped from photos and site details first",
      "Pricing depends on volume, material, access, and labor conditions",
      "Special handling, documentation, or access requirements can affect scheduling and quote range",
    ],
    priorClients: [],
    process: [
      "Share scope, photos, and access details",
      "We review the fit and provide a straightforward range",
      "The crew shows up, loads out, and clears the site efficiently",
    ],
    ctaTitle: "Need dependable local cleanup support?",
    ctaCopy:
      "If the project fits our scope, we can help with responsive haul-away and straightforward coordination without adding extra friction.",
  },
];
export const resourceLinks = [
  {
    href: "/blog",
    title: "Junk Removal Tips",
    copy: "Helpful articles about pricing, prep, and how to make pickup day easier.",
  },
  {
    href: "/business-services",
    title: "Business Services",
    copy: "Targeted service pages for contractors, retail, real estate, property management, and public-sector cleanup support.",
  },
];
