/* Oakhaven Farmstead — Quiet Interactive Behaviour */

(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  /* 1. Floating Header Hide-on-Scroll */
  const header = document.querySelector("[data-site-header]");
  if (header) {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 180 && currentY > lastScrollY + 6) {
        header.classList.add("is-hidden");
      } else if (currentY < lastScrollY - 4 || currentY <= 120) {
        header.classList.remove("is-hidden");
      }
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 2. Mobile Navigation Drawer */
  const menuOpenBtn = document.querySelector("[data-menu-open]");
  const menuCloseBtn = document.querySelector("[data-menu-close]");
  const drawer = document.querySelector("[data-mobile-drawer]");

  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (menuOpenBtn) {
      menuOpenBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (menuOpenBtn && drawer) {
    menuOpenBtn.addEventListener("click", () => setDrawer(true));
  }
  if (menuCloseBtn && drawer) {
    menuCloseBtn.addEventListener("click", () => setDrawer(false));
  }
  if (drawer) {
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setDrawer(false));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) {
        setDrawer(false);
      }
    });
  }

  /* 3. Quiet IntersectionObserver Reveals */
  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (revealNodes.length > 0) {
    const revealInView = (el) => el.classList.add("is-visible");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealInView(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      revealNodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          revealInView(el);
        } else {
          observer.observe(el);
        }
      });
    } else {
      revealNodes.forEach(revealInView);
    }
  }

  /* 4. Orchard Tabbed Explorers (Daily Rituals & Barn Design Guidelines) */
  document.querySelectorAll("[data-orchard-tabs]").forEach((group) => {
    const tabs = Array.from(group.querySelectorAll("[data-tab-target]"));
    const panels = Array.from(group.querySelectorAll("[data-tab-panel]"));

    const selectTab = (key) => {
      tabs.forEach((tab) => {
        const active = tab.getAttribute("data-tab-target") === key;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      panels.forEach((panel) => {
        const active = panel.getAttribute("data-tab-panel") === key;
        panel.classList.toggle("is-active", active);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => selectTab(tab.getAttribute("data-tab-target")));
    });
  });

  /* 5. Verified Midlands Drive-Time Filter */
  const driveFilter = document.querySelector("[data-drive-directory]");
  if (driveFilter) {
    const tabs = Array.from(driveFilter.querySelectorAll("[data-drive-tab]"));
    const rows = Array.from(driveFilter.querySelectorAll("[data-drive-category]"));

    const applyDrive = (cat) => {
      tabs.forEach((tab) => {
        const active = tab.getAttribute("data-drive-tab") === cat;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      rows.forEach((row) => {
        const match = cat === "all" || row.getAttribute("data-drive-category") === cat;
        row.classList.toggle("is-hidden-row", !match);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => applyDrive(tab.getAttribute("data-drive-tab")));
    });
  }

  /* 6. Filterable Borehole & Acreage Release Ledger (Smallholdings) */
  const releaseLedger = document.querySelector("[data-release-ledger]");
  if (releaseLedger) {
    const tabs = Array.from(releaseLedger.querySelectorAll("[data-status-filter]"));
    const rows = Array.from(releaseLedger.querySelectorAll("[data-release-status]"));

    const applyFilter = (val) => {
      tabs.forEach((tab) => {
        const active = tab.getAttribute("data-status-filter") === val;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      rows.forEach((row) => {
        const status = row.getAttribute("data-release-status");
        const collection = row.getAttribute("data-release-collection");
        const match = val === "all" || status === val || collection === val;
        row.classList.toggle("is-hidden-row", !match);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => applyFilter(tab.getAttribute("data-status-filter")));
    });
  }

  /* 7. Interactive 3-Way Desk Routing & 2-Minute Plain-English Reply Preview */
  const deskData = {
    "acreage-buyer": {
      label: "Acreage & Homestead Buyer",
      deskName: "Estate Sales Desk",
      advisor: "Rory MacLeod · Farmstead Sales Director",
      responsePromise: "Personal plain-English reply within two minutes",
      summary:
        "For buyers comparing Orchard Acreage, Paddock Ridge stands, borehole yields, levies, and private land walks.",
      selectLabel: "Smallholding Interest",
      selectOptions: [
        "Orchard Acreage (2.2 to 3.5 ha)",
        "Paddock Ridge Stands (4.0 to 6.0 ha)",
        "Upcoming Completed Barn Homestead"
      ],
      namePlaceholder: "e.g. Claire Henderson",
      emailPlaceholder: "name@example.co.za",
      phonePlaceholder: "+27 82 000 0000",
      dateLabel: "Preferred Visit Window",
      datePlaceholder: "Weekday morning or Saturday",
      submitCta: "Send to Estate Sales Desk",
      replySubject: "Oakhaven smallholding availability, borehole yields & visit times",
      replyFrom: "Rory MacLeod · Oakhaven Estate Sales Desk",
      replyTiming: "Delivered within two minutes",
      replyBody:
        "Good day, and thank you for your interest in Oakhaven Farmstead. We currently have Portions 05 and 08 available in Orchard Acreage (2.4 to 3.2 hectares, tested boreholes at 3,800 to 4,600 litres per hour) and Portions 16 and 19 on Paddock Ridge (4.6 to 5.8 hectares, tested at 5,400 to 6,100 litres per hour). Monthly farmstead levies are R 3,850 per holding, covering twenty-four-hour gatehouse security, gravel road upkeep, bridle trails, and shared orchard management. I have open farm-walk slots this Friday morning and Saturday morning — reply with what suits your family and bring comfortable walking shoes.",
      routedTo: "Estate Sales Desk (Rory MacLeod)",
      priority: "Smallholding Buyer · Borehole & Land Walk",
      preparedAction:
        "Print borehole test certificates for Portions 05, 08, 16, and 19 and prepare farm bakkie for boundary walk."
    },
    "equestrian-visit": {
      label: "Equestrian & Stabling Visit",
      deskName: "Stable Master & Sales Desk",
      advisor: "Hanna Cloete · Head Stable Master",
      responsePromise: "Personal plain-English reply within two minutes",
      summary:
        "For riders asking about eighteen-stall barn livery, private home paddocks, arenas, bridle trails, and horsebox access.",
      selectLabel: "Stabling Preference",
      selectOptions: [
        "Private Paddocks on Own Stand",
        "Full Livery at Main Timber Barn",
        "Combination of Both"
      ],
      namePlaceholder: "e.g. Nomsa Dlamini",
      emailPlaceholder: "rider@example.co.za",
      phonePlaceholder: "+27 83 000 0000",
      dateLabel: "Preferred Stable Walk Time",
      datePlaceholder: "e.g. Saturday 09:00",
      submitCta: "Send to Stable Master & Sales",
      replySubject: "Oakhaven stabling, private paddocks & bridle-trail visit",
      replyFrom: "Hanna Cloete · Oakhaven Stable Master",
      replyTiming: "Delivered within two minutes",
      replyBody:
        "Hello, and lovely to hear from a fellow rider. At Oakhaven you can keep horses directly on your own fenced Kikuyu paddocks (up to two horses on Orchard Acreage and four on Paddock Ridge) or place them in full livery at our eighteen-stall timber barn, where four boxes are currently open for incoming owners. Full livery includes daily turnout, Midlands eragrostis hay, grooming, and access to our all-weather dressage arena, grass jumping paddock, and fourteen kilometres of bridle trails. I would be glad to walk you through the barn and show you the trail gates alongside Rory from sales whenever you visit.",
      routedTo: "Stable Master & Sales Desk (Hanna Cloete + Rory MacLeod)",
      priority: "Equestrian Buyer · Barn & Paddock Inspection",
      preparedAction:
        "Schedule joint tour of the 18-stall timber barn, dressage arena, and Paddock Ridge trailhead gates."
    },
    "architect-guidelines": {
      label: "Architect & Barn Guidelines",
      deskName: "Architectural Review Desk",
      advisor: "Willem Kruger · Estate Review Architect",
      responsePromise: "Personal plain-English reply within two minutes",
      summary:
        "For buyers and architects wanting a clear plain-English summary of fieldstone, roof pitch, timber, and approval timelines.",
      selectLabel: "Current Stage",
      selectOptions: [
        "Evaluating Stand Feasibility",
        "Preparing Concept Sketches",
        "Ready for Review Submission"
      ],
      namePlaceholder: "e.g. Studio Karoo Architects",
      emailPlaceholder: "architect@example.co.za",
      phonePlaceholder: "+27 84 000 0000",
      dateLabel: "Preferred Call or Site Briefing",
      datePlaceholder: "e.g. Wednesday afternoon call",
      submitCta: "Send to Architectural Review Desk",
      replySubject: "Oakhaven barn guidelines in plain English & review turnaround",
      replyFrom: "Willem Kruger · Oakhaven Architectural Review Desk",
      replyTiming: "Delivered within two minutes",
      replyBody:
        "Good day, and thank you for reaching out early in your planning. Our guidelines are straightforward: homes follow honest contemporary barn proportions using local Midlands fieldstone, muted earth-toned bagged masonry, natural timber verandahs, and pitched charcoal corrugated iron roofs between twenty-five and thirty-five degrees. Maximum footprint sits at 650 sqm including outbuildings and private stables, with zero suburban plaster boxes or solid perimeter walls. Concept sketch reviews take ten working days and are collaborative from day one. Reply with the stand number you are considering and we can book a twenty-minute call to talk through orientation and setbacks.",
      routedTo: "Architectural Review Desk (Willem Kruger)",
      priority: "Design Briefing · Barn Guidelines & Setbacks",
      preparedAction:
        "Send concise two-page material palette sheet and stand contour map ahead of architect briefing call."
    }
  };

  document.querySelectorAll("[data-desk-router]").forEach((router) => {
    const laneButtons = Array.from(router.querySelectorAll("[data-lane-trigger]"));
    const elDeskName = router.querySelector("[data-out-desk]");
    const elAdvisor = router.querySelector("[data-out-advisor]");
    const elSummary = router.querySelector("[data-out-summary]");
    const elReplySubject = router.querySelector("[data-out-subject]");
    const elReplyFrom = router.querySelector("[data-out-from]");
    const elReplyTiming = router.querySelector("[data-out-timing]");
    const elReplyBody = router.querySelector("[data-out-body]");
    const elRoutedTo = router.querySelector("[data-out-routed]");
    const elPriority = router.querySelector("[data-out-priority]");
    const elAction = router.querySelector("[data-out-action]");

    const form = router.querySelector("[data-desk-form]");
    const selectLabel = router.querySelector("[data-form-select-label]");
    const selectInput = router.querySelector("[data-form-select]");
    const nameInput = router.querySelector("[data-form-name]");
    const emailInput = router.querySelector("[data-form-email]");
    const phoneInput = router.querySelector("[data-form-phone]");
    const dateLabel = router.querySelector("[data-form-date-label]");
    const dateInput = router.querySelector("[data-form-date]");
    const submitBtn = router.querySelector("[data-form-submit]");
    const feedback = router.querySelector("[data-form-feedback]");

    let currentLaneId = "acreage-buyer";

    const renderLane = (laneId) => {
      const data = deskData[laneId] || deskData["acreage-buyer"];
      currentLaneId = laneId in deskData ? laneId : "acreage-buyer";

      laneButtons.forEach((btn) => {
        const active = btn.getAttribute("data-lane-trigger") === currentLaneId;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (elDeskName) elDeskName.textContent = data.deskName;
      if (elAdvisor) elAdvisor.textContent = data.advisor;
      if (elSummary) elSummary.textContent = data.summary;
      if (elReplySubject) elReplySubject.textContent = data.replySubject;
      if (elReplyFrom) elReplyFrom.textContent = data.replyFrom;
      if (elReplyTiming) elReplyTiming.textContent = data.replyTiming;
      if (elReplyBody) elReplyBody.textContent = data.replyBody;
      if (elRoutedTo) elRoutedTo.textContent = data.routedTo;
      if (elPriority) elPriority.textContent = data.priority;
      if (elAction) elAction.textContent = data.preparedAction;

      if (selectLabel) selectLabel.textContent = data.selectLabel;
      if (selectInput) {
        selectInput.innerHTML = "";
        data.selectOptions.forEach((opt) => {
          const option = document.createElement("option");
          option.value = opt;
          option.textContent = opt;
          selectInput.appendChild(option);
        });
      }
      if (nameInput) nameInput.placeholder = data.namePlaceholder;
      if (emailInput) emailInput.placeholder = data.emailPlaceholder;
      if (phoneInput) phoneInput.placeholder = data.phonePlaceholder;
      if (dateLabel) dateLabel.textContent = data.dateLabel;
      if (dateInput) dateInput.placeholder = data.datePlaceholder;
      if (submitBtn) submitBtn.textContent = data.submitCta;
      if (feedback) feedback.classList.remove("is-visible");
    };

    laneButtons.forEach((btn) => {
      btn.addEventListener("click", () => renderLane(btn.getAttribute("data-lane-trigger")));
    });

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = deskData[currentLaneId];
        const guestName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Guest";
        if (feedback) {
          feedback.textContent =
            "Thank you, " +
            guestName +
            ". Your note has been routed directly to " +
            data.routedTo +
            ". Preview your two-minute reply beside this form.";
          feedback.classList.add("is-visible");
        }
      });
    }

    const params = new URLSearchParams(window.location.search);
    const paramLane = params.get("lane");
    const hashLane = window.location.hash ? window.location.hash.replace("#", "") : "";
    const initialLane =
      paramLane && paramLane in deskData
        ? paramLane
        : hashLane && hashLane in deskData
        ? hashLane
        : "acreage-buyer";

    renderLane(initialLane);
  });
})();
