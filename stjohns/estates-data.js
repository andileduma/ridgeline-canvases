/* ==========================================================================
   Verified Ground-Truth Configuration: St John's Village (Howick, KZN)
   Strictly isolated single-estate build (from 3-Lane Research Dossiers).
   ========================================================================== */

window.ESTATES_DATA = {
  "stjohns": {
    "id": "stjohns",
    "name": "St John's Village",
    "location": "Karkloof Road P141 · Howick, KZN Midlands",
    "domain": "stjohnsvillage.co.za · sjvresidents.co.za",
    "eyebrow": "Smart Desk Routing & Multi-Desk Concierge",
    "heroTitle": "Protecting Lucy’s sales desk and Deanne’s HOA inbox across every St John’s Village enquiry.",
    "heroLead": "Built to work alongside your existing marketing agency and PropCon listings—connecting your nine residential villages, 26-bed Care Centre, hidden sjvresidents.co.za rules, and Building Control into one calm desk router that pre-qualifies buyers and deflects repeat inbox clutter in under two minutes.",
    "metrics": [
      {
        "value": "161.5 ha · 9 Villages",
        "label": "Multi-generational freehold, Over-55s cottages, 3 dams & ~60 Nguni cattle"
      },
      {
        "value": "5 Distinct Desks",
        "label": "On-site Sales, HOA Admin, Building Control, Care Centre & Cenprop"
      },
      {
        "value": "Zero Agency Overlap",
        "label": "Supports your marketing team & PropCon without touching social or listings"
      }
    ],
    "deskTitle": "St John's Village Sales & HOA Desks",
    "deskContact": "Lucy Blackman · lucy@stjohnsvillage.co.za · 033 032 0590",
    "deskNuance": "Your external marketing and social media team stays untouched, and PropCon listings stay live. This routing layer sits strictly on enquiry intake—separating All-Ages/Over-55s buyers, Care Centre clinic calls, and Oct 2026 building submissions before they land on Lucy or Deanne’s desk.",
    "deskLeakage": "Verified live: PropCon has zero link to noindex sjvresidents.co.za; Lucy’s “Sell or Lease” button hits a /contact/ soft-404; Google Drive holds 30+ raw PDFs; LeadBubble & UC106 lack CAPTCHA/POPIA; and Deanne’s HOA form mixes 22 unrouted categories.",
    "formTitle": "St John's Village Smart Desk Router",
    "secondaryLabel": "Village / Desk Focus",
    "tertiaryLabel": "Pre-Screen / Rulebook Check",
    "popiaNote": "Aligned with St John's Village HOA NPC POPIA handling (adminoffice@stjohnsvillage.co.za) — used solely for this interactive desk routing walkthrough.",
    "crestSvg": "\n      <svg viewBox=\"0 0 36 36\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M6 25c4-5 20-5 24 0\"/>\n        <path d=\"M18 7v14\"/>\n        <path d=\"M12 13l6-6 6 6\"/>\n        <circle cx=\"18\" cy=\"17\" r=\"2\"/>\n      </svg>",
    "heroSvg": "\n      <svg viewBox=\"0 0 72 72\" width=\"48\" height=\"48\" fill=\"none\" stroke=\"#F5F4F0\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <rect x=\"12\" y=\"12\" width=\"48\" height=\"48\" rx=\"10\" fill=\"rgba(245,244,240,0.08)\"/>\n        <path d=\"M20 46c6-7 26-7 32 0\" stroke=\"#EBD2BE\"/>\n        <path d=\"M36 20v20\"/>\n        <path d=\"M26 30l10-10 10 10\"/>\n        <circle cx=\"36\" cy=\"33\" r=\"2.5\" fill=\"#EBD2BE\"/>\n      </svg>",
    "intentOptions": [
      "Relocating All-Ages or Over-55s Buyer",
      "Care Centre, Assisted Living & Clinic Enquiry",
      "Architect, Accredited Builder or SJV Estate Agent"
    ],
    "secondaryOptions": [
      "All-Ages Freehold (Meadows, Wetlands, Pinelands, Vineyards)",
      "Over-55s Villages (Arboretum, Jersey Cottages, Orchards) & Meadow Ridge Check",
      "26-Bed Care Centre, Respite Recovery & Weekday Clinic (10:00–12:00)",
      "2 Oct 2026 Architectural Guidelines & Plan Approval (build@)",
      "Sec. 17 Estate Agent Accreditation & Appointment Gate Pass"
    ],
    "tertiaryOptions": [
      "Pre-Screened: Meadow Ridge Age Check + Sec. 17 Appointment & 30 km/h",
      "Pre-Screened: 10:00–12:00 Clinic Hours & Non-Emergency Private-Home Limit",
      "Pre-Screened: Oct 2026 Guidelines, Mthokozisi Chiliza (build@) & R10k/R15k Fees"
    ],
    "personas": [
      {
        "id": "relocating-buyer",
        "tag": "Lane 01 · On-Site Sales Desk",
        "title": "Relocating All-Ages / Over-55s Buyer",
        "shortDesc": "Clarifies Meadow Ridge age rules, levies, pet limits, Sec. 17 appointment-only viewings, and 30 km/h gate cameras before routing to Lucy Blackman & Gerard Robinson.",
        "questions": [
          "Is Meadow Ridge all-ages (per PropCon) or exclusively Over-55s (per the Resident Useful Information PDF)?",
          "Why are there no For Sale or Show House boards on Karkloof Road, and how do we book an accompanied viewing?",
          "What are the 2026 Freehold (R2,540) vs. Sectional Title HOA + Body Corporate levies, pet rules, and 30 km/h visitor speed camera rules?"
        ],
        "fixSummary": "Delivers an accurate buyer brief in under 2 minutes, resolves the Meadow Ridge document conflict upfront, and hands Lucy Blackman & Gerard Robinson a viewing-ready buyer with zero off-site Google Drive confusion.",
        "sample": {
          "fullName": "Grant & Claire Botha",
          "email": "grant.botha@midlandsfamily.co.za",
          "phone": "+27 82 541 8820",
          "intent": "Relocating All-Ages or Over-55s Buyer",
          "secondary": "Over-55s Villages (Arboretum, Jersey Cottages, Orchards) & Meadow Ridge Check",
          "tertiary": "Pre-Screened: Meadow Ridge Age Check + Sec. 17 Appointment & 30 km/h",
          "message": "We are relocating to Howick and comparing a freehold stand in The Pinelands against a sectional title unit in Meadow Ridge or Jersey Cottages for my parents. We saw conflicting notes on whether Meadow Ridge is Over-55s or all-ages, and we have two neutered dogs. Could you confirm levies, pet rules, and how to book an appointment?"
        }
      },
      {
        "id": "care-centre",
        "tag": "Lane 02 · Care Centre & Clinic Desk",
        "title": "Care Centre & Assisted Living / Clinic Enquiry",
        "shortDesc": "Routes directly to Sr Terry Wilson (care@sjvcare.co.za) while clarifying 10:00–12:00 weekday clinic hours and private-home emergency boundaries.",
        "questions": [
          "Does the 26-bed Care Centre dispatch emergency medical staff to private homes across the estate?",
          "What are the exact weekday resident clinic hours (10:00–12:00) versus full-time or respite bed admissions?",
          "Which Care Centre email is current (care@sjvcare.co.za vs. Terry@sjvcare.co.za vs. care@stjohnsvillage.co.za)?"
        ],
        "fixSummary": "Stops Care Centre calls and family admissions from landing in Lucy’s sales inbox or Deanne’s HOA admin queue—routing straight to Sr Terry Wilson with clinic and non-emergency boundaries clearly stated.",
        "sample": {
          "fullName": "Dr. Ingrid Vermaak",
          "email": "ingrid.vermaak@kznhealth.co.za",
          "phone": "+27 83 619 4052",
          "intent": "Care Centre, Assisted Living & Clinic Enquiry",
          "secondary": "26-Bed Care Centre, Respite Recovery & Weekday Clinic (10:00–12:00)",
          "tertiary": "Pre-Screened: 10:00–12:00 Clinic Hours & Non-Emergency Private-Home Limit",
          "message": "Enquiring on behalf of my father who is recovering after hip surgery and considering a Jersey Cottage nearby. Could you clarify private en-suite respite availability in the 26-bed Care Centre, weekday clinic hours, and whether Care Centre nurses respond to private-home medical emergencies?"
        }
      },
      {
        "id": "architect-builder-agent",
        "tag": "Lane 03 · Building Control & Sec. 17 Accreditation",
        "title": "Architect, Accredited Builder or SJV Agent",
        "shortDesc": "Replaces outdated Sept 2024 portal docs with the 2 Oct 2026 Guidelines, routes build queries to Mthokozisi Chiliza (build@), and handles Sec. 17 agent accreditation.",
        "questions": [
          "sjvresidents.co.za still lists Sept 2024 guidelines and Lesley Sharp (buildsec@)—who reviews plans under the 2 Oct 2026 rules?",
          "What are the HOA plan approval fees (R10,000 freehold / R20,000 ST), R15,000 deposit, 30-month completion window, and Dec 2026 builder shutdown dates?",
          "What does Conduct Rules Sec. 17 require for external estate agents (induction, annual fee, 0.25% sales levy, zero signboards)?"
        ],
        "fixSummary": "Protects Deanne L’Estrange’s before-10:00 AM walk-in window and routes structured compliance packs directly to Building Officer Mthokozisi Blessing Chiliza (build@stjohnsvillage.co.za) or HOA Management.",
        "sample": {
          "fullName": "Willem van der Merwe (PrArch)",
          "email": "willem@midlandsveranda.co.za",
          "phone": "+27 82 704 3319",
          "intent": "Architect, Accredited Builder or SJV Agent",
          "secondary": "2 Oct 2026 Architectural Guidelines & Plan Approval (build@)",
          "tertiary": "Pre-Screened: Oct 2026 Guidelines, Mthokozisi Chiliza (build@) & R10k/R15k Fees",
          "message": "Preparing Natal Veranda sketch plans for a client stand in The Pinelands and coordinating with their external estate agent. Please confirm the 2 Oct 2026 Architectural Guidelines, current Building Officer contact, R10,000 plan fee / R15,000 deposit checklist, and the December 2026 builder shutdown window."
        }
      }
    ],
    "auditRows": [
      {
        "before": "Public stjohnsvillage.co.za (PropCon) has zero link to sjvresidents.co.za (set to noindex, nofollow), leaving buyers and architects on outdated Sept 2024 docs and broken @stjohnsvillage.za emails.",
        "after": "Unified Smart Desk Router bridges PropCon and current HOA rules—citing the 2 Oct 2026 Guidelines and routing straight to Mthokozisi Chiliza (build@stjohnsvillage.co.za)."
      },
      {
        "before": "On Lucy Blackman’s profile, “Sell or Lease a Property” points to /contact/ (missing -us), hitting a Page Not Found soft-404, while Developer Sales pushes visitors into raw Google Drive folders.",
        "after": "Clean on-page intake replaces the broken /contact/ path and delivers curated buyer, levy, and village summaries without dumping visitors into 30+ unindexed Drive PDFs."
      },
      {
        "before": "LeadBubble & UC106 listing modal have zero CAPTCHA, zero POPIA consent, and zero intent triage—while sjvresidents.co.za dumps 22 categories into one Gravity Form hitting Deanne’s inbox.",
        "after": "3-Lane Router separates Sales (Lucy & Gerard), Care Centre (Sr Terry Wilson), and Building Control/HOA with POPIA consent upfront—protecting Deanne’s before-10:00 AM admin window."
      },
      {
        "before": "Meadow Ridge age rules conflict across PropCon (“all ages”) vs. Resident PDF (“Over 55s”), and visitors trigger 112 of 125 speed-camera fines (R250–R1,000) billed to hosts.",
        "after": "Sub-2-minute narrative replies flag the Meadow Ridge verification check, Sec. 17 appointment-only viewing rules, and the strict 30 km/h speed limit before guests arrive at the gate."
      }
    ],
    "rulebookFaqs": [
      {
        "q": "Which of the 9 villages are All-Ages vs. Over-55s, and what about Meadow Ridge?",
        "a": "All-Ages Freehold villages are The Meadows (96 sites), The Wetlands (54 waterfront sites), The Pinelands (39 sites), and The Vineyards (72 sites), plus All-Ages Sectional Title Dairy Mews (12 units). Over-55s villages are The Arboretum (52 freehold sites), Jersey Cottages (40 sectional title cottages near the Care Centre), and The Orchards (47 built resales). Note: Meadow Ridge (22 sectional title units) is marketed as all-ages on PropCon and omits an Over-55s clause in Conduct Rules Sec. 7.2, while an older Resident PDF states Over-55s—the router flags this for Lucy Blackman’s written confirmation.",
        "source": "PropCon Villages Directory, HOA Conduct Rules Sec. 7.2 & Resident Useful Info PDF"
      },
      {
        "q": "How do Sec. 17 viewing rules, 30 km/h cameras, levies, and pet limits work?",
        "a": "Under Conduct Rules Sec. 17, zero For Sale, To Let, or Show House signboards are permitted anywhere on the estate—all viewings are strictly accompanied by appointment with on-site or SJV-accredited agents. Estate speed cameras enforce 30 km/h (fines of R250 to R1,000 are billed to the host/owner). 2025/2026 Freehold HOA levy is R2,540/month; Sectional Title HOA levies range from R1,444.50 to R1,960/month plus Body Corporate levies. Pets: max 2 dogs or 1 cat (max 2 total), spayed/neutered, cats must wear an audible bell, and Jersey Cottages applies a 20 kg dog limit.",
        "source": "HOA Conduct Rules Sec. 17, 2025/2026 Levy Schedule & Nov 2026 Newsletter"
      },
      {
        "q": "What are the Care Centre clinic hours and private-home emergency boundaries?",
        "a": "The 26-bed Care Centre (14 private en-suite rooms plus 6 shared respite/recovery rooms, managed by Sr Terry Wilson at care@sjvcare.co.za / 033 239 0766) runs a resident weekday clinic from 10:00 to 12:00. Crucially, the Care Centre is not staffed to attend private-home medical emergencies—all in-home emergencies route to residents’ panic buttons, Mi7, or EMS via Main Gate (033 032 0500) / Trustforce Control (033 001 9291).",
        "source": "St John's Village Care Centre Protocol & Resident Useful Info PDF"
      },
      {
        "q": "Who handles plan submissions under the 2 Oct 2026 Architectural Guidelines?",
        "a": "Building Officer Mthokozisi Blessing Chiliza (appointed 1 Sep 2026, build@stjohnsvillage.co.za / 072 650 1025) oversees plan compliance under the 2 Oct 2026 Architectural Guidelines (Natal Veranda / Farm style: Chromadek greys/slate, red-range brick/stone, no IBR, steel windows, or precast walling). Accredited architects and builders are mandatory; HOA plan approval is R10,000 freehold (R20,000 ST) with a R15,000 building deposit (50% non-refundable), a 30-month completion period, and a builder shutdown from 15 Dec 2026 to 11 Jan 2027.",
        "source": "Architectural Guidelines (2 Oct 2026) & Nov 2026 HOA Newsletter"
      }
    ]
  }
};
