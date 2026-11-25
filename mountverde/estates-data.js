/* ==========================================================================
   Verified Ground-Truth Configuration: Mount Verde Estate (Hilton, KZN)
   W-28 / R-20 Breathing & Word-Cap Compliant Single-Estate Build.
   ========================================================================== */

window.ESTATES_DATA = {
  "mountverde": {
    "id": "mountverde",
    "name": "Mount Verde Estate",
    "location": "9 Mount Verde Avenue · Hilton, KZN Midlands",
    "domain": "mountverde.co.za",
    "eyebrow": "Warm Visitor Replies & Team Sorting",
    "heroTitle": "Where 750 Hectares of Hilton Farmland Meets Effortless Enquiry.",
    "heroLead": "Supports Deirdre’s marketing and Reallist, answering Growers Collective and 2025 building rules clearly so families arrive at Brigid’s viewing ready.",
    "metrics": [
      {
        "value": "750 ha Agrihood",
        "label": "42 Ridge Farmettes & 247 ha Village"
      },
      {
        "value": "Plain-English Replies",
        "label": "Clear answers from your May 2025 rules"
      },
      {
        "value": "Evenings & Weekends",
        "label": "Warm replies ready for Brigid at 08:00 AM"
      }
    ],
    "deskTitle": "Reallist, Marketing & MVMA",
    "deskContact": "Brigid Scheuer · brigid@mountverde.co.za · 033 343 4303",
    "deskNuance": "Deirdre’s marketing and Reallist stay untouched. We simply help your website visitors get warm answers and reach Brigid.",
    "deskLeakage": "We also fix your three broken homepage links, missing Contact Us and Meadows B15 forms, and mobile call button.",
    "formTitle": "Mount Verde Enquiry Form",
    "secondaryLabel": "Precinct / Desk Focus",
    "tertiaryLabel": "Viewing Window",
    "popiaNote": "Aligned with Mount Verde POPIA terms — used solely for this private walkthrough preview.",
    "crestSvg": "\n      <svg viewBox=\"0 0 36 36\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M6 25l12-14 12 14\"/>\n        <path d=\"M12 25l6-7 6 7\"/>\n        <path d=\"M6 28h24\"/>\n      </svg>",
    "heroSvg": "\n      <svg viewBox=\"0 0 72 72\" width=\"48\" height=\"48\" fill=\"none\" stroke=\"#CCB180\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <rect x=\"10\" y=\"10\" width=\"52\" height=\"52\" rx=\"8\" fill=\"rgba(204,177,128,0.08)\"/>\n        <path d=\"M18 47l18-20 18 20\"/>\n        <path d=\"M26 47l10-11 10 11\" stroke=\"#F9F7F2\"/>\n        <path d=\"M18 52h36\"/>\n      </svg>",
    "intentOptions": [
      "Farmette & Meadows B15 Buyer (Reallist)",
      "Village Home or Village Square Lease (Marketing + Sales)",
      "Architect, Builder or Resident Rule Check (MVMA)"
    ],
    "secondaryOptions": [
      "Meadows B15 (R3,904,250 incl. VAT) & Ridge Farmettes",
      "247 ha Mount Verde Village & Village Square Leases",
      "May 2025 Development Controls & Claridge Gate"
    ],
    "tertiaryOptions": [
      "Weekday Viewing (Next 2 Weeks)",
      "Weekend / After-Hours Request",
      "Sketch Plan / Compliance Check"
    ],
    "personas": [
      {
        "id": "reallist-brigid",
        "tag": "Persona 01 · Reallist (Brigid)",
        "title": "Farmette & Meadows B15 Buyer",
        "shortDesc": "Asks about Growers Collective farming, two homesteads, no transfer duty, and levies.",
        "questions": [
          "Must I farm myself, or does Growers Collective manage the land?",
          "Can we build two homesteads and a barn with no deadline?",
          "How do deposits, boreholes, and the R5,500 monthly levy work?"
        ],
        "fixSummary": "Sends a clear plain-English guide in two minutes and hands Brigid a viewing-ready brief.",
        "sample": {
          "fullName": "Alistair van Wyk",
          "email": "alistair@vanwykfamily.co.za",
          "phone": "+27 82 541 9104",
          "intent": "Farmette & Meadows B15 Buyer (Reallist)",
          "secondary": "Meadows B15 (R3,904,250 incl. VAT) & Ridge Farmettes",
          "tertiary": "Weekend / After-Hours Request",
          "message": "We saw Meadows B15 at R3,904,250. Could you explain Growers Collective rental, two homesteads, boreholes, and monthly levies before we visit?"
        }
      },
      {
        "id": "marketing-deirdre",
        "tag": "Persona 02 · Marketing (Deirdre)",
        "title": "Village & Square Lease Enquirer",
        "shortDesc": "Compares 247 ha Village clusters and 35–1,000 sqm heritage-barn commercial spaces.",
        "questions": [
          "How do Village hamlets differ from the larger Ridge Farmettes?",
          "How close is Mount Verde to Hilton schools and Life Hospital?",
          "Which heritage-barn retail spaces are available in The Village Square?"
        ],
        "fixSummary": "Answers Village life upfront, routes buyers to Brigid, and copies Deirdre on Village Square leases.",
        "sample": {
          "fullName": "Claire Henderson",
          "email": "claire@midlandstable.co.za",
          "phone": "+27 83 412 6680",
          "intent": "Village Home or Village Square Lease (Marketing + Sales)",
          "secondary": "247 ha Mount Verde Village & Village Square Leases",
          "tertiary": "Weekday Viewing (Next 2 Weeks)",
          "message": "Our children start at Hilton College soon. We are comparing Village homes and a 180 sqm heritage barn lease in The Village Square."
        }
      },
      {
        "id": "mvma-architect",
        "tag": "Persona 03 · MVMA & Architects",
        "title": "Architect & HOA Rule Check",
        "shortDesc": "Checks May 2025 barn rules, Claridge Gate trucks, deposits, and pet limits.",
        "questions": [
          "What barn materials and energy targets apply under May 2025 Controls?",
          "Which gate handles >3.5t trucks, and what is the builder deposit?",
          "What are the second-dwelling levy tiers, pet limits, and rental rules?"
        ],
        "fixSummary": "Resolves May 2025 rules straight to MVMA—keeping Brigid’s sales calendar completely free of admin.",
        "sample": {
          "fullName": "Pieter Nel (PrArch)",
          "email": "pieter@midlandsbarnstudio.co.za",
          "phone": "+27 82 708 4412",
          "intent": "Architect, Builder or Resident Rule Check (MVMA)",
          "secondary": "May 2025 Development Controls & Claridge Gate",
          "tertiary": "Sketch Plan / Compliance Check",
          "message": "Preparing Ridge Boulevard sketch plans. Please confirm May 2025 barn rules, second-dwelling levies, R10,000 deposit, and Claridge Gate access."
        }
      }
    ],
    "auditRows": [
      {
        "before": "Three homepage links (Village Square, Property, Sustainability) currently lead to a broken page.",
        "after": "We reconnect every homepage link cleanly so interested buyers reach your enquiry form."
      },
      {
        "before": "Contact Us and Meadows B15 have no form, and the mobile phone link fails.",
        "after": "Simple enquiry forms and a working phone button let families reach you easily."
      },
      {
        "before": "Buyers must read 162 pages of heavy PDF booklets for simple farming or rule answers.",
        "after": "Clear written replies answer their exact questions within two minutes, day or night."
      }
    ],
    "rulebookFaqs": [
      {
        "q": "Must Farmette owners farm themselves, or how does Growers Collective work?",
        "a": "No. While 90% of each Farmette remains agricultural, hands-off owners can lease their farmland to Growers Collective (Pty) Ltd, which farms sustainably and pays market-related rental, or hire an approved contractor.",
        "source": "Growers Collective & May 2025 Controls"
      },
      {
        "q": "What are Farmette purchase terms, homestead allowances, and monthly levies?",
        "a": "Ridge Farmettes range from R2.05M to R6.8M ex VAT (Meadows B15 R3,904,250 incl. VAT) with no transfer duty, 10% deposit, no build-by date, 2 homesteads + 1 barn, boreholes, and ~R5,500/mo levy.",
        "source": "Farmettes For Sale & Featured Farmette"
      },
      {
        "q": "What May 2025 building, gate, second-dwelling levy, and pet rules apply?",
        "a": "Contemporary barns use corrugated metal, stone, and timber with a R10,000 deposit and Claridge Gate (>3.5t trucks). Second dwellings add +25% (<500 sqm) or +50% (>501 sqm); 4 dogs and 2 cats allowed.",
        "source": "May 2025 Development Controls (Sec. 4.11)"
      }
    ]
  }
};