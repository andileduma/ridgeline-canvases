/* ==========================================================================
   Verified Ground-Truth Configuration: Plantations Estate
   Strictly isolated single-estate build (from 3-Lane Research Dossiers).
   ========================================================================== */

window.ESTATES_DATA = {
  "plantations": {
    "id": "plantations",
    "name": "Plantations Estate",
    "location": "47 Shongweni Rd, Hillcrest · Upper Highway",
    "domain": "plantationsestate.co.za",
    "eyebrow": "PHOA Desk Relief · 6 Villages & La Piazza Concierge",
    "heroTitle": "Tuscan village calm—without Louise acting as a switchboard.",
    "heroLead": "Matches Upper Highway buyers and tenants to pet-compatible villages across 669+ homes, deflects La Piazza restaurant/spa/Montessori visitors with direct gate access info, and unlocks 5 unlabeled PDFs on /documents/.",
    "metrics": [
      {
        "value": "669+ Homes",
        "label": "300+ Freehold + 5 sectional villages & 38-ha conservancy"
      },
      {
        "value": "Blank Agents",
        "label": "/registered-agents/ is empty & “Find Your Home” ends on /about/"
      },
      {
        "value": "5 Unlabeled PDFs",
        "label": "/documents/ shows PNG thumbnails (43.png–47.png) with alt=\"\""
      }
    ],
    "deskTitle": "Plantations HOA Support Desk (PHOA)",
    "deskContact": "Louise de Méziéres · support@plantationsestate.co.za · (031) 765 8968",
    "deskNuance": "PHOA has no in-house brokerage—accredited external agents handle sales/rentals while Louise handles HOA operations (Mon–Thu 07:30–16:00, Fri 07:30–15:00). This system routes qualified buyers to accredited agents and keeps Piazza retail visitors self-served.",
    "deskLeakage": "Only one flat 4-field Ninja Form on /contact/ (0 dropdowns, 0 POPIA gate). 5 La Piazza businesses have zero contact links on the homepage, and unindexed PNG rulebook icons drive constant calls to Louise.",
    "formTitle": "PHOA 4-Lane Village, Pet & Concierge Triage",
    "secondaryLabel": "Village Fit / Business / Document",
    "tertiaryLabel": "Household Pet Policy / Urgency",
    "popiaNote": "Linked to POLICY-STATEMENT-AND-MANUAL-26.11.25.pdf — replaces Ninja Form #1’s missing POPIA consent gate.",
    "crestSvg": "\n      <svg viewBox=\"0 0 36 36\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\">\n        <path d=\"M18 28V15\"/>\n        <path d=\"M18 19c-5-1-8-5-8-10 5 1 8 5 8 10z\"/>\n        <path d=\"M18 15c5-1 8-5 8-10-5 1-8 5-8 10z\"/>\n        <path d=\"M9 28h18\"/>\n      </svg>",
    "heroSvg": "\n      <svg viewBox=\"0 0 72 72\" width=\"52\" height=\"52\" fill=\"none\" stroke=\"#2D4A3A\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M14 58V32c0-10 8-18 22-18s22 8 22 18v26\" fill=\"#F1F0EA\"/>\n        <path d=\"M26 58V38c0-5.5 4.5-10 10-10s10 4.5 10 10v20\" stroke=\"#6F7D51\"/>\n        <path d=\"M36 48V35M36 41c-3.5-.5-5.5-3-5.5-6 3.5.5 5.5 3 5.5 6z\" stroke=\"#2D4A3A\"/>\n        <line x1=\"8\" y1=\"58\" x2=\"64\" y2=\"58\"/>\n      </svg>",
    "intentOptions": [
      "Buy or Rent — Village & Pet-Policy Matchmaker",
      "La Piazza Visitor (Round House, Spa, Salon, Playhouse, Montessori)",
      "Resident, Architect & External Agent Governance Self-Service"
    ],
    "secondaryOptions": [
      "Freehold (300+) or La Vigna (42 · Pet-Friendly Gardens)",
      "La Piazza (199), Vecchio (107), Sorrento (13) or Duo (8)",
      "The Round House / Fleur De Lis Spa / Little Seedlings / Playhouse",
      "PHOA Conduct Rules v20 (Nov 2025) / Arch 20th Ed / Agent Reg"
    ],
    "tertiaryOptions": [
      "Moving With Dog(s) or Cat(s)",
      "No Pets — Lock-Up-and-Go Preference",
      "Day Visitor / Resident / External Agent"
    ],
    "personas": [
      {
        "id": "pet-family",
        "tag": "Persona 01 · Village & Pet Match",
        "title": "Upper Highway Family (Village & Pets)",
        "shortDesc": "Matches dog/cat owners to Freehold or La Vigna vs lock-up-and-go buyers to La Piazza / Vecchio.",
        "questions": [
          "Which of Plantations’ 6 villages permit dogs or cats under PHOA & sectional conduct rules?",
          "How does Little Seedlings Montessori walk-to-school inside the estate work?",
          "Which PHOA-registered external agents handle rentals and sales (since /registered-agents/ is blank)?"
        ],
        "fixSummary": "Runs instant pet-compatibility matching (steering dog/cat owners toward Freehold or La Vigna’s private pet-friendly gardens), sends the 38-ha conservancy pack, and routes to PHOA-registered agents with a log copy for Louise.",
        "sample": {
          "fullName": "Jessica & Dylan Pretorius",
          "email": "jess.pretorius@highwayfamily.co.za",
          "phone": "+27 83 650 1844",
          "intent": "Buy or Rent — Village & Pet-Policy Matchmaker",
          "secondary": "Freehold (300+) or La Vigna (42 · Pet-Friendly Gardens)",
          "tertiary": "Moving With Dog(s) or Cat(s)",
          "message": "Relocating to Hillcrest with a toddler (interested in Little Seedlings Montessori) and two medium dogs. Which villages allow dogs cleanly, what are the dual PHOA + sectional levies, and which registered agent can assist?"
        }
      },
      {
        "id": "piazza-visitor",
        "tag": "Persona 02 · Switchboard Relief",
        "title": "La Piazza Retail, Spa & Montessori",
        "shortDesc": "Self-serves dining, spa, salon, playhouse, and pre-school gate access without calling 031 765 8968.",
        "questions": [
          "How do non-residents enter the 24/7 K9 & facial-recognition gate to visit The Round House or Fleur De Lis Spa?",
          "Where do we park for New Images Salon or Le Petit Playhouse children’s parties?",
          "How do parents enquire about Little Seedlings Montessori (12 months – 5 years)?"
        ],
        "fixSummary": "Gives immediate tenant routing and La Piazza underground parking / visitor gate instructions—stopping public restaurant, spa, and party queries from hitting Louise’s inbox.",
        "sample": {
          "fullName": "Megan Pillay",
          "email": "megan.p@kloofparents.co.za",
          "phone": "+27 82 319 7704",
          "intent": "La Piazza Visitor (Round House, Spa, Salon, Playhouse, Montessori)",
          "secondary": "The Round House / Fleur De Lis Spa / Little Seedlings / Playhouse",
          "tertiary": "Day Visitor / Resident / External Agent",
          "message": "Booking a treatment at Fleur De Lis Spa (Unit 200) and lunch at The Round House, and also looking at Le Petit Playhouse for a birthday party. Can non-residents drive in via Shongweni Rd without pre-issued resident codes?"
        }
      },
      {
        "id": "governance-agent",
        "tag": "Persona 03 · Docs & Agent Reg",
        "title": "Resident, Architect & External Agent",
        "shortDesc": "Unlocks Nov 2025 Conduct Rules, 20th Ed Arch Guidelines, and June 2025 Agent Accreditation.",
        "questions": [
          "Where are the Nov 2025 PHOA Conduct Rules & 20th Ed Architectural Design Guidelines (hidden in PNG tiles)?",
          "What NQF4/5 and Fidelity Fund documents are needed in AGENTS-REGISTRATION-FORM-JUNE-2025.pdf?",
          "What is the current status of the annual agent registration fee?"
        ],
        "fixSummary": "Instantly cites and attaches PHOA-conduct-rules-version20_NOV-2025.pdf, 2025-PHOA-ARCH-DESIGN-GUIDELINES-20th-Edition-.pdf, or AGENTS-REGISTRATION-FORM-JUNE-2025.pdf with zero manual lookup by Louise.",
        "sample": {
          "fullName": "Rohan Naicker (Registered Property Practitioner)",
          "email": "rohan@upperhighwayrealty.co.za",
          "phone": "+27 84 912 5530",
          "intent": "Resident, Architect & External Agent Governance Self-Service",
          "secondary": "PHOA Conduct Rules v20 (Nov 2025) / Arch 20th Ed / Agent Reg",
          "tertiary": "Day Visitor / Resident / External Agent",
          "message": "Submitting accreditation to market a home in Vecchio Village. Please confirm the June 2025 Registered Agents Form checklist (NQF4/5, FFC, seller defect disclosure) and latest Conduct Rules v20 PDF."
        }
      }
    ],
    "auditRows": [
      {
        "before": "Flat 4-field Ninja Form (#nf-form-1-cont) on /contact/ has 0 dropdowns, 0 POPIA box, and blank /registered-agents/.",
        "after": "4-lane Village & Pet Matchmaker screens dogs/cats, pre-qualifies Freehold vs La Vigna vs La Piazza, and logs POPIA."
      },
      {
        "before": "5 La Piazza businesses promoted on homepage with zero contact links—turning Louise into an unpaid switchboard.",
        "after": "Instant visitor gate, underground parking, and business routing keeps dining, spa, and party traffic off support@."
      },
      {
        "before": "/documents/ renders 5 Nov 2025 PDFs as unlabeled PNGs (43.png–47.png, alt=\"\") invisible to site search.",
        "after": "Indexed Rulebook Q&A answers Conduct Rules v20 & 20th Ed Design questions with direct clickable PDF links."
      }
    ],
    "rulebookFaqs": [
      {
        "q": "How do Plantations’ 6 residential villages differ on gardens and pets?",
        "a": "300+ Freehold homes feature private gardens; La Vigna (42 double-storey homes) explicitly highlights private, pet-friendly gardens; Vecchio (107 duplexes), Sorrento (13), and La Piazza Duo (8) have private gardens subject to sectional rules; La Piazza (199 apartments/simplexes/duplexes) sits above the retail square under strict body corporate conduct rules.",
        "source": "plantationsestate.co.za/about/ & PHOA Conduct Rules v20"
      },
      {
        "q": "What security and on-site amenities exist for families?",
        "a": "24/7 manned guarding, CCTV, electric fencing, K9 patrols, and facial recognition. Inside the estate: 38-hectare private conservancy gorge with trails, Little Seedlings Montessori (12 months–5 years), 3 age-zoned play parks + mini football court, and La Piazza retail (The Round House, Fleur De Lis Spa Unit 200, New Images Salon, Le Petit Playhouse).",
        "source": "plantationsestate.co.za/"
      },
      {
        "q": "What does PHOA require from external real estate agents?",
        "a": "Agents must submit AGENTS-REGISTRATION-FORM-JUNE-2025.pdf with NQF4/5 or intern proof, valid FFC, ID, signed SOP acknowledgement, and mandatory seller defect disclosure forms (annual R3,500 fee suspended pending High Court action).",
        "source": "AGENTS-REGISTRATION-FORM-JUNE-2025.pdf"
      }
    ]
  }
};