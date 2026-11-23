/* ==========================================================================
   Verified Ground-Truth Configuration: Dunkirk Estate
   Strictly isolated single-estate build (from 3-Lane Research Dossiers).
   ========================================================================== */

window.ESTATES_DATA = {
  "dunkirk": {
    "id": "dunkirk",
    "name": "Dunkirk Estate",
    "location": "Salt Rock, KZN North Coast",
    "domain": "dunkirkestate.co.za",
    "eyebrow": "HOA Reception Shield & Appointed Agent Routing",
    "heroTitle": "Coastal forest hospitality before the floor plans.",
    "heroLead": "Built for an HOA with no in-house sales desk: buyers clicking “Enquire about our available listings” are welcomed with coastal forest life and routed straight to appointed external agents, while HOA Reception stays protected.",
    "metrics": [
      {
        "value": "344 Homes",
        "label": "20-year legacy estate across 42 acres of coastal forest"
      },
      {
        "value": "0 Agents Listed",
        "label": "Homepage cards scroll to 4-field #contact at HOA Reception"
      },
      {
        "value": "2.35 MB .zip",
        "label": "Documents nav forces dunkirk-estate-documents.zip download"
      }
    ],
    "deskTitle": "Dunkirk HOA Reception Desk",
    "deskContact": "HOA Reception · reception@dunkirkestate.co.za · 032 525 4404",
    "deskNuance": "Dunkirk HOA has no in-house sales team and refers property sales to appointed external agents. This system captures buyer details cleanly and dispatches them directly to accredited agents with a read-only HOA audit log.",
    "deskLeakage": "Homepage “Bespoke Houses” and “Apartments & Townhouses” CTAs dump buyers into a flat 4-field form (Name, Email, Phone, single-line Message) hitting reception@dunkirkestate.co.za alongside Ray’s Kitchen and Spa queries.",
    "formTitle": "Dunkirk Intent-Routed Enquiry",
    "secondaryLabel": "Home / Topic Focus",
    "tertiaryLabel": "Timeline / Visit Preference",
    "popiaNote": "Respects Dunkirk Estate Privacy Policy — dispatches buyer briefs strictly to appointed resale/rental agents.",
    "crestSvg": "\n      <svg viewBox=\"0 0 36 36\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\">\n        <path d=\"M5 20c4-4 8-4 12 0s8 4 14 0\"/>\n        <path d=\"M5 26c4-3.5 8-3.5 12 0s8 3.5 14 0\"/>\n        <path d=\"M18 8c3 3 4 6 4 9h-8c0-3 1-6 4-9z\"/>\n      </svg>",
    "heroSvg": "\n      <svg viewBox=\"0 0 72 72\" width=\"52\" height=\"52\" fill=\"none\" stroke=\"#2A5045\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M12 46c7-6 14-6 21 0s14 6 27 0\" stroke=\"#507663\"/>\n        <path d=\"M12 54c7-5 14-5 21 0s14 5 27 0\" stroke=\"#2A5045\"/>\n        <path d=\"M36 14c7 8 10 15 10 21H26c0-6 3-13 10-21z\" fill=\"#E9EFEA\"/>\n        <line x1=\"36\" y1=\"22\" x2=\"36\" y2=\"39\"/>\n        <path d=\"M36 28l5-4M36 33l-5-4\"/>\n      </svg>",
    "intentOptions": [
      "Purchase or Rent via Appointed Agents",
      "HOA Rules, Levies & Architectural Guidelines (June 2026)",
      "Ray’s Kitchen Dining / Laura Channing Spa & Gate Access"
    ],
    "secondaryOptions": [
      "Bespoke Freestanding Forest Home",
      "Apartment or Townhouse (incl. The Saxony)",
      "June 2026 Estate Rules (v2026.1) / 2023 Arch Manual",
      "Ray’s Kitchen Table / Laura Channing Spa Booking"
    ],
    "tertiaryOptions": [
      "Relocating Within 3–6 Months",
      "Exploring Salt Rock Viewing Soon",
      "Immediate Rule / Visitor Query"
    ],
    "personas": [
      {
        "id": "forest-buyer",
        "tag": "Persona 01 · Family Resale Buyer",
        "title": "North Coast Buyer (House vs Apartment)",
        "shortDesc": "Clicked “Enquire about our available listings” for forest homes or townhouses/apartments.",
        "questions": [
          "What resale houses or apartments (like The Saxony) fit our family near Curro Salt Rock or Ashton?",
          "How does resident electronic access & parking at the Salt Rock Beach Clubhouse work?",
          "Which appointed estate agent handles Dunkirk viewings?"
        ],
        "fixSummary": "Responds in <2 minutes with coastal forest & Beach Clubhouse narrative, then routes the qualified Buyer Dossier straight to Dunkirk’s appointed external estate agents with a clean log to Reception.",
        "sample": {
          "fullName": "Natalie & Marc De Villiers",
          "email": "natalie.dev@coastalmove.co.za",
          "phone": "+27 82 771 4520",
          "intent": "Purchase or Rent via Appointed Agents",
          "secondary": "Bespoke Freestanding Forest Home",
          "tertiary": "Relocating Within 3–6 Months",
          "message": "We clicked through from Living at Dunkirk on your homepage. Looking for a 4-bedroom forest home near Curro Salt Rock and wondering about Salt Rock Beach Clubhouse parking and which appointed agent to speak with."
        }
      },
      {
        "id": "rules-lookup",
        "tag": "Persona 02 · Resident / Architect",
        "title": "Mobile Governance & Rules Lookup",
        "shortDesc": "Needs June 2026 Estate Rules or 2023 Architectural Guidelines without downloading a 2.35 MB .zip.",
        "questions": [
          "Can I check pet, alteration, and contractor rules on mobile without unzipping a 2.35 MB file?",
          "What does the 2023 Development Manual require for alterations?",
          "Where are catch-and-release fishing dam and boardwalk rules?"
        ],
        "fixSummary": "Surfaces instant cited excerpts from 2026 Dunkirk Estate Rules v2026.1 (June) and the 2023 Development Manual directly on-screen and by email—zero .zip abandonment.",
        "sample": {
          "fullName": "Siyabonga Khumalo",
          "email": "siya.khumalo@dunkirkresident.co.za",
          "phone": "+27 79 340 1128",
          "intent": "HOA Rules, Levies & Architectural Guidelines (June 2026)",
          "secondary": "June 2026 Estate Rules (v2026.1) / 2023 Arch Manual",
          "tertiary": "Immediate Rule / Visitor Query",
          "message": "On mobile trying to check the June 2026 Estate Rules for a covered patio extension and contractor access times without downloading the large zip archive."
        }
      },
      {
        "id": "dining-spa",
        "tag": "Persona 03 · Public Visitor",
        "title": "Ray’s Kitchen & Laura Channing Spa",
        "shortDesc": "Public restaurant and spa guests currently hitting the same 032 525 4404 HOA Reception queue.",
        "questions": [
          "Are Ray’s Kitchen and Laura Channing Spa & Skin open to non-residents?",
          "How do external guests receive gate access at Dunkirk Estate?",
          "Who handles restaurant bookings vs spa treatment scheduling?"
        ],
        "fixSummary": "Separates hospitality bookings and visitor gate clearance immediately from HOA governance and property resale workflows.",
        "sample": {
          "fullName": "Taryn Moodley",
          "email": "taryn.m@ballitoweekend.co.za",
          "phone": "+27 83 902 6610",
          "intent": "Ray’s Kitchen Dining / Laura Channing Spa & Gate Access",
          "secondary": "Ray’s Kitchen Table / Laura Channing Spa Booking",
          "tertiary": "Immediate Rule / Visitor Query",
          "message": "Hi there, booking a Saturday morning breakfast at Ray’s Kitchen followed by a Laura Channing Spa facial for two guests—could you share direct booking details and visitor gate entry?"
        }
      }
    ],
    "auditRows": [
      {
        "before": "“Available listings” cards scroll to a flat 4-field #contact form (single-line text input, 0 dropdowns).",
        "after": "Intent selector separates Buyers, Rules/Architects, and Ray’s Kitchen / Spa visitors at entry."
      },
      {
        "before": "HOA Reception manually answers and forwards unscreened buyer emails to external agents.",
        "after": "Qualified Buyer Dossiers dispatch directly to appointed external agents with SLA logging for Reception."
      },
      {
        "before": "Clicking Documents forces a 2.35 MB dunkirk-estate-documents.zip download on mobile phones.",
        "after": "Instant searchable Q&A from June 2026 Rules v2026.1 & 2023 Architectural Manual without unzipping."
      }
    ],
    "rulebookFaqs": [
      {
        "q": "What does the private Salt Rock Beach Clubhouse include for residents?",
        "a": "Residents enjoy exclusive electronic tag access to the double-storey clubhouse right on Salt Rock Main Beach, with dedicated off-street resident parking, Beach Café, sun deck, indoor lounge, braai facilities, and outdoor showers overlooking the tidal pool.",
        "source": "dunkirkestate.co.za/beach-clubhouse"
      },
      {
        "q": "What lifestyle amenities sit inside Dunkirk’s 42-acre coastal forest?",
        "a": "42 acres (~17 ha) of preserved indigenous forest with 150+ bird species (including Narina Trogons), raised timber boardwalks, 2 catch-and-release fishing dams, heated lap pool, gym, sauna, steam room, floodlit tennis court, 3 kids’ play areas, Ray’s Kitchen, and Laura Channing Spa & Skin.",
        "source": "dunkirkestate.co.za/forest & /lifestyle"
      },
      {
        "q": "Which documents govern alterations and estate living?",
        "a": "All resident conduct and home upgrades are governed by 2026 Dunkirk Estate Rules Version 2026.1 (June).pdf, Developement Manual & Architectural Guidelines 2023 Updated.pdf, and Dunkirk Estate MOI - 2018.pdf.",
        "source": "dunkirk-estate-documents.zip (Verified Contents)"
      }
    ]
  }
};