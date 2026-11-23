/* ==========================================================================
   Verified Ground-Truth Configuration: Salta Sibaya
   Strictly isolated single-estate build (from 3-Lane Research Dossiers).
   ========================================================================== */

window.ESTATES_DATA = {
  "salta": {
    "id": "salta",
    "name": "Salta Sibaya",
    "location": "1 Salta Blvd, Sibaya / Umdloti · Innova Haus",
    "domain": "saltasibaya.co.za",
    "eyebrow": "3-Way Split: Devmco Realty · RainMaker · HOA Admin",
    "heroTitle": "Five Sibaya coastal lifestyles, zero form friction.",
    "heroLead": "Fixes the Solara Salta dropdown omission, bypasses Capri Village’s 8-character Markt password wall for 50+ buyers, and cleanly splits Devmco Realty developer sales, RainMaker CRM attribution, and HOA Admin.",
    "metrics": [
      {
        "value": "5 Precincts",
        "label": "Serenity R9.1M+, Solara R1.2M+, Capri 50+ R3.175M+, Salta, Mt Cotton"
      },
      {
        "value": "15-Field Forms",
        "label": "4 Gravity Forms + missing Solara option in #input_9_10 dropdown"
      },
      {
        "value": "Markt Wall",
        "label": "Capri 50+ forces 8+ char password before viewing floor plans"
      }
    ],
    "deskTitle": "Innova Haus 3-Desk Split (Marine Walk)",
    "deskContact": "RainMaker (1st Fl) hello@rainmakermarketing.co.za · Devmco (Grnd Fl) info@devmcorealty.co.za · HOA admin@saltasibaya.co.za",
    "deskNuance": "Devmco Realty handles 7-day plot and turnkey sales (Ground Floor, Innova Haus), RainMaker Marketing owns campaigns & Markt CRM (First Floor), while admin@saltasibaya.co.za handles HOA governance.",
    "deskLeakage": "Gravity Form #9 omits Solara Salta from “Interested in*” and lacks a message box; caprivillagesalta.co.za forces 50+ buyers to create a Markt password; /sales/ displays a stale 2020-10-30 Capri R2.705M notice.",
    "formTitle": "5-Precinct Frictionless Triage",
    "secondaryLabel": "Preferred Sibaya Precinct",
    "tertiaryLabel": "Budget / Intent Tier",
    "popiaNote": "Replaces 15-field Gravity Forms with transparent routing between Devmco Realty (Sales) and Salta HOA Admin.",
    "crestSvg": "\n      <svg viewBox=\"0 0 36 36\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\">\n        <path d=\"M6 25l12-13 12 13\"/>\n        <path d=\"M11 25h14M6 30c6-2.5 18-2.5 24 0\"/>\n      </svg>",
    "heroSvg": "\n      <svg viewBox=\"0 0 72 72\" width=\"52\" height=\"52\" fill=\"none\" stroke=\"#1F232E\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <rect x=\"12\" y=\"28\" width=\"24\" height=\"24\" rx=\"2\" fill=\"#E7F0F0\"/>\n        <rect x=\"30\" y=\"18\" width=\"28\" height=\"34\" rx=\"2\" fill=\"#FFFFFF\" stroke=\"#8BACAD\"/>\n        <line x1=\"8\" y1=\"58\" x2=\"64\" y2=\"58\" stroke=\"#121D2E\"/>\n        <path d=\"M10 64c12-3 40-3 52 0\" stroke=\"#8BACAD\"/>\n      </svg>",
    "intentOptions": [
      "Solara Salta & Serenity Luxury Homes / Land (Devmco)",
      "Capri Village 50+ Phase 4 Step-Less Living (Zero Password)",
      "Salta Estate / Mt Cotton Yield or HOA Admin (admin@)"
    ],
    "secondaryOptions": [
      "Solara Salta (87% sold · Land R1.2M / Homes R4.45M+)",
      "Serenity Salta (2 of 13 Ocean Villas left · R9.1M+)",
      "Capri Village Phase 4 (52% sold · Homes R3.175M+ / Land R1.25M+)",
      "Salta Estate / Mt Cotton (R2.95M+ / R15k pm yield) or HOA Admin"
    ],
    "tertiaryOptions": [
      "R1.2M – R3.0M (Stands & Resales)",
      "R3.175M – R6.5M (Capri Phase 4 / Solara)",
      "R9.1M+ (Serenity Ocean Villa)",
      "Existing Resident / Contractor Biometrics"
    ],
    "personas": [
      {
        "id": "solara-buyer",
        "tag": "Persona 01 · Fixes Missing Dropdown",
        "title": "Solara Salta & Serenity Family Buyer",
        "shortDesc": "Selects Solara Salta directly (currently omitted from gform_9) or final Serenity ocean villas.",
        "questions": [
          "Why isn’t Solara Salta selectable in the main homepage form dropdown?",
          "Which 3-bed plot-and-plan homes (from R4.45M) or Serenity ocean villas (from R9.1M) remain?",
          "How close are Marine Walk, The Press Club, and Playtomic Padel courts?"
        ],
        "fixSummary": "Fixes the missing Solara option immediately, delivers a sub-2-min precinct brochure + Marine Walk/Padel guide, and routes straight to Devmco Realty with full RainMaker campaign attribution.",
        "sample": {
          "fullName": "Darren & Priya Naidoo",
          "email": "darren.naidoo@jozicape.co.za",
          "phone": "+27 82 511 9043",
          "intent": "Solara Salta & Serenity Luxury Homes / Land (Devmco)",
          "secondary": "Solara Salta (87% sold · Land R1.2M / Homes R4.45M+)",
          "tertiary": "R3.175M – R6.5M (Capri Phase 4 / Solara)",
          "message": "Relocating from Sandton and specifically looking at Solara Salta 3-bedroom plot-and-plan options overlooking the estuary (it was missing from the website dropdown), plus proximity to Marine Walk and padel courts."
        }
      },
      {
        "id": "capri-retiree",
        "tag": "Persona 02 · Zero Password Wall",
        "title": "Capri Village 50+ Buyer / Adult Child",
        "shortDesc": "Gets live Phase 4 step-less pricing (R3.175M+) & Totalcare details without creating a Markt password.",
        "questions": [
          "Do we really have to create an 8-character password on Markt just to view Phase 4 floor plans?",
          "Is the price R2.705M (per /sales/) or R3.175M (per Phase 4 on caprivillagesalta.co.za)?",
          "What Totalcare healthcare and clubhouse facilities (Val’s Café, heated pool, bowls) are included?"
        ],
        "fixSummary": "Eliminates the Markt password wall (#lf-password-1) and reconciles stale /sales/ pricing—sending clean Phase 4 availability and Totalcare specs in <2 minutes.",
        "sample": {
          "fullName": "Beverley & Alan Mitchell",
          "email": "bev.mitchell@kznretire.co.za",
          "phone": "+27 83 398 2219",
          "intent": "Capri Village 50+ Phase 4 Step-Less Living (Zero Password)",
          "secondary": "Capri Village Phase 4 (52% sold · Homes R3.175M+ / Land R1.25M+)",
          "tertiary": "R3.175M – R6.5M (Capri Phase 4 / Solara)",
          "message": "Helping our parents look at Final Phase 4 step-less homes in Capri Village. We stopped at the Markt password registration screen—could you send current Phase 4 availability, Totalcare details, and pet/garden rules?"
        }
      },
      {
        "id": "investor-hoa",
        "tag": "Persona 03 · Yield vs HOA Split",
        "title": "Rental Investor vs. HOA Admin Split",
        "shortDesc": "Routes R15,000/pm rental investors to Devmco Realty while deflecting biometrics/levies to admin@.",
        "questions": [
          "How do rental demand from R15,000/pm and Mt Cotton stands (98% sold) perform near Marine Walk?",
          "Who handles resident biometric gate access and contractor approvals (Devmco vs admin@saltasibaya.co.za)?",
          "Why is admin@saltasibaya.co.za listed above the consumer developer sales form?"
        ],
        "fixSummary": "Keeps HOA biometric, levy, and trail enquiries cleanly on admin@saltasibaya.co.za while sending R15k/pm investor packs and Devmco Realty briefs to Ground Floor Innova Haus.",
        "sample": {
          "fullName": "Keagan Pillay",
          "email": "kpillay@northcoastcapital.co.za",
          "phone": "+27 76 884 1902",
          "intent": "Salta Estate / Mt Cotton Yield or HOA Admin (admin@)",
          "secondary": "Salta Estate / Mt Cotton (R2.95M+ / R15k pm yield) or HOA Admin",
          "tertiary": "R1.2M – R3.0M (Stands & Resales)",
          "message": "Comparing Salta Estate homes (from R2.95M) and remaining Mt Cotton stands (from R1.29M) for long-term corporate rental demand from R15,000/pm near Marine Walk & King Shaka Airport."
        }
      }
    ],
    "auditRows": [
      {
        "before": "Homepage Gravity Form #9 demands 8 fields with no message box and completely omits Solara Salta.",
        "after": "All 5 villages (incl. Solara Salta & Serenity) selectable in 1 click with tailored precinct matching."
      },
      {
        "before": "Capri Village (caprivillagesalta.co.za) gates floor plans behind an 8+ char Markt password (#lf-password-1).",
        "after": "Zero password barrier—live Phase 4 pricing (R3.175M+), Totalcare, and Val’s Café pack delivered instantly."
      },
      {
        "before": "admin@saltasibaya.co.za sits above developer sales forms, and /sales/ shows stale 2020-10-30 Capri R2.705M data.",
        "after": "Clean 3-way split: Sales to Devmco Realty, attribution to RainMaker CRM, HOA tickets to admin@saltasibaya.co.za."
      }
    ],
    "rulebookFaqs": [
      {
        "q": "What are the verified price brackets across Salta Sibaya’s 5 villages?",
        "a": "Solara Salta: land from R1.2M / 3-bed plot-and-plan from R4.45M (87% sold). Serenity Salta: 2 of 13 ocean villas remain from R9.1M. Capri Village 50+ Phase 4: step-less homes from R3.175M / land from R1.25M (52% sold). Salta Estate: homes from R2.95M (rentals from R15,000/pm). Mt Cotton: stands from R1.29M (98% sold).",
        "source": "saltasibaya.co.za, solarasalta.co.za & caprivillagesalta.co.za"
      },
      {
        "q": "Where do visitors find Marine Walk, The Press Club, and Padel Courts?",
        "a": "Marine Walk Shopping Centre sits right at the Salta gate (Woolworths, SuperSPAR, Dis-Chem, Mr Price, and Devmco Realty at Ground Floor Innova Haus). The Press Club restaurant and floodlit Playtomic Padel courts (05:00–21:00 daily) operate at 124 Mt Cotton Boulevard.",
        "source": "Salta Sibaya Lane 1 & 3 Verified Directory"
      },
      {
        "q": "Who handles what between Innova Haus Ground Floor, First Floor, and HOA?",
        "a": "Devmco Realty (Ground Floor, Innova Haus, 087 550 1300) handles 7-day sales & viewings; RainMaker Marketing (First Floor, Innova Haus, +27 31 101 3100) runs campaigns & Markt CRM; HOA Admin (admin@saltasibaya.co.za) handles residents, levies, and biometrics.",
        "source": "Lane 3 Verified Desk Split"
      }
    ]
  }
};