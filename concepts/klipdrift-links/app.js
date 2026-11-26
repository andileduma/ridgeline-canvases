/* Klipdrift Links & Country Club — Quiet Interactive Behaviour */

(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  /* 1. Floating Header Hide-on-Scroll & Scrolled State */
  const header = document.querySelector("[data-site-header]");
  if (header) {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 40) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

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

  /* 4. Brixsa 3-Lane Lifestyle Flex-Accordion */
  const brixsaContainer = document.querySelector("[data-brixsa-lanes]");
  if (brixsaContainer) {
    const lanes = Array.from(brixsaContainer.querySelectorAll("[data-brixsa-lane]"));
    const activateLane = (target) => {
      lanes.forEach((lane) => {
        const isCurrent = lane === target;
        lane.classList.toggle("is-active", isCurrent);
        lane.setAttribute("aria-expanded", isCurrent ? "true" : "false");
      });
    };

    lanes.forEach((lane) => {
      lane.addEventListener("mouseenter", () => activateLane(lane));
      lane.addEventListener("focusin", () => activateLane(lane));
      lane.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        activateLane(lane);
      });
    });
  }

  /* 5. 50/50 Synced Crossfade Daily Experiences Stage */
  const ritualStage = document.querySelector("[data-ritual-stage]");
  if (ritualStage) {
    const triggers = Array.from(ritualStage.querySelectorAll("[data-ritual-index]"));
    const slides = Array.from(ritualStage.querySelectorAll("[data-ritual-slide]"));

    const selectRitual = (idx) => {
      triggers.forEach((btn) => {
        const active = btn.getAttribute("data-ritual-index") === idx;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      slides.forEach((slide) => {
        const active = slide.getAttribute("data-ritual-slide") === idx;
        slide.classList.toggle("is-active", active);
      });
    };

    triggers.forEach((btn) => {
      btn.addEventListener("click", () => selectRitual(btn.getAttribute("data-ritual-index")));
      btn.addEventListener("mouseenter", () => selectRitual(btn.getAttribute("data-ritual-index")));
    });
  }

  /* 6. Orchard Tabbed Drive-Time Directory */
  const driveDir = document.querySelector("[data-drive-directory]");
  if (driveDir) {
    const tabs = Array.from(driveDir.querySelectorAll("[data-drive-tab]"));
    const rows = Array.from(driveDir.querySelectorAll("[data-drive-category]"));

    const filterDrive = (cat) => {
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
      tab.addEventListener("click", () => filterDrive(tab.getAttribute("data-drive-tab")));
    });
  }

  /* 7. Loggia Collection Switcher (Index) & Filterable Ledger (Residences) */
  const loggiaSwitcher = document.querySelector("[data-loggia-switcher]");
  if (loggiaSwitcher) {
    const tabs = Array.from(loggiaSwitcher.querySelectorAll("[data-loggia-tab]"));
    const panels = Array.from(loggiaSwitcher.querySelectorAll("[data-loggia-panel]"));

    const selectLoggia = (key) => {
      tabs.forEach((tab) => {
        const active = tab.getAttribute("data-loggia-tab") === key;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      panels.forEach((panel) => {
        const active = panel.getAttribute("data-loggia-panel") === key;
        panel.classList.toggle("is-active", active);
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => selectLoggia(tab.getAttribute("data-loggia-tab")));
    });
  }

  const releaseLedger = document.querySelector("[data-release-ledger]");
  if (releaseLedger) {
    const filterTabs = Array.from(releaseLedger.querySelectorAll("[data-status-filter]"));
    const rows = Array.from(releaseLedger.querySelectorAll("[data-release-status]"));

    const applyFilter = (statusVal) => {
      filterTabs.forEach((tab) => {
        const active = tab.getAttribute("data-status-filter") === statusVal;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });
      rows.forEach((row) => {
        const rowStatus = row.getAttribute("data-release-status");
        const rowCollection = row.getAttribute("data-release-collection");
        const match = statusVal === "all" || rowStatus === statusVal || rowCollection === statusVal;
        row.classList.toggle("is-hidden-row", !match);
      });
    };

    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => applyFilter(tab.getAttribute("data-status-filter")));
    });
  }

  /* 8. Interactive 3-Way Desk Routing & 2-Minute Plain-English Reply Preview */
  const deskData = {
    "fairway-buyer": {
      label: "Fairway Home Buyer",
      deskName: "Private Sales Desk",
      advisor: "Marius Botha · Senior Estate Advisor",
      responsePromise: "Personal plain-English reply within two minutes",
      summary: "For buyers comparing Fairway Ridge stands, completed villas, current levies, and private site walks.",
      selectLabel: "Collection of Interest",
      selectOptions: [
        "Fairway Ridge Stands",
        "Multigenerational Villas",
        "Clubhouse Courtyard Waitlist"
      ],
      namePlaceholder: "e.g. Pieter van der Merwe",
      emailPlaceholder: "name@example.co.za",
      phonePlaceholder: "+27 82 000 0000",
      dateLabel: "Preferred Visit Window",
      datePlaceholder: "Weekday morning or Saturday",
      submitCta: "Send to Private Sales Desk",
      replySubject: "Your Klipdrift Fairway Ridge visit & current stand summary",
      replyFrom: "Marius Botha · Klipdrift Private Sales Desk",
      replyTiming: "Delivered within two minutes",
      replyBody:
        "Good day, and thank you for reaching out to Klipdrift Links. Stands 14 and 19 on Fairway Ridge are both currently available, along with Villas 04 and 07 for buyers preferring a completed residence. Monthly estate levies sit at R 4,450, which covers twenty-four-hour security, wetland and fairway upkeep, and resident clubhouse access. I have reserved two quiet morning viewing slots this Thursday and Saturday so we can walk the north-facing stands together by electric cart. Simply reply with the morning that suits you best, and I will arrange your gate clearance and coffee on the terrace.",
      routedTo: "Private Sales Desk (Marius Botha)",
      priority: "Property Buyer · Site Walk & Release Sheet",
      preparedAction:
        "Prepare stand boundary map, current levy breakdown, and electric cart for morning fairway tour."
    },
    "family-tour": {
      label: "Multigenerational Family Tour",
      deskName: "Family Advisory Desk",
      advisor: "Lindiwe Nkosi · Family Relocation & Estate Host",
      responsePromise: "Personal plain-English reply within two minutes",
      summary:
        "For extended families exploring dual-living villas, school bus routes, healthcare proximity, and relaxed weekend visits.",
      selectLabel: "Who Will Be Visiting",
      selectOptions: [
        "Parents & Children",
        "Three Generations Together",
        "Grandparents Exploring Garden Suite"
      ],
      namePlaceholder: "e.g. Annelize & Johan Pretorius",
      emailPlaceholder: "family@example.co.za",
      phonePlaceholder: "+27 83 000 0000",
      dateLabel: "Preferred Visit Window",
      datePlaceholder: "Saturday morning with terrace lunch",
      submitCta: "Send to Family Advisory Desk",
      replySubject: "Planning your Klipdrift family tour & dual-living villa walk",
      replyFrom: "Lindiwe Nkosi · Klipdrift Family Advisory Desk",
      replyTiming: "Delivered within two minutes",
      replyBody:
        "Warm greetings from Klipdrift Links. We love hosting whole families together, and we keep our tours relaxed and unhurried. During your visit we can walk Villa 04 so your parents can see the level-entry garden suite first-hand, take a gentle loop along the wetland boardwalk, and finish with a table on the sandstone terrace. I will also bring the current private school bus timetable and nearby medical directory so every practical question is answered over coffee. Let me know how many family members are joining and whether you prefer Friday afternoon or Saturday morning.",
      routedTo: "Family Advisory Desk (Lindiwe Nkosi)",
      priority: "Multigenerational Tour · Dual-Living & Schools",
      preparedAction:
        "Book six-seater estate cart, open Villa 04 garden suite, prepare school bus sheet, and hold north terrace table."
    },
    "club-desk": {
      label: "Non-Resident Golf & Clubhouse",
      deskName: "Pro Shop & Club Desk",
      advisor: "Gareth Williams · Head Golf Professional & Club Host",
      responsePromise: "Personal plain-English reply within two minutes",
      summary:
        "For visiting golfers booking tee times, small corporate fourballs, or non-resident lunch on the sandstone terrace.",
      selectLabel: "Club Request",
      selectOptions: [
        "Visitor Fourball Tee Time",
        "Clubhouse Terrace Dining",
        "Small Golf Day Enquiry"
      ],
      namePlaceholder: "e.g. David Mokoena",
      emailPlaceholder: "golfer@example.co.za",
      phonePlaceholder: "+27 84 000 0000",
      dateLabel: "Preferred Date & Group Size",
      datePlaceholder: "e.g. Next Friday, 4 players",
      submitCta: "Send to Pro Shop & Club Desk",
      replySubject: "Your Klipdrift Links visitor tee time & clubhouse welcome",
      replyFrom: "Gareth Williams · Klipdrift Pro Shop & Club Desk",
      replyTiming: "Delivered within two minutes",
      replyBody:
        "Good day, and welcome to Klipdrift Links. Visitor fourballs are hosted Tuesday through Friday from 08:30 and on Sunday afternoons after resident morning play. Visitor green fees are R 890 per player, with electric carts available at R 460 per cart and warm breakfast rolls served on the sandstone terrace from 07:00. Please arrive via the dedicated Club Entrance off Klipdrift Valley Road, where our valet team will collect your bags. Reply with your preferred tee window and handicap details, and we will lock in your fourball immediately.",
      routedTo: "Pro Shop & Club Desk (Gareth Williams)",
      priority: "Visitor Hospitality · Tee Sheet & Dining",
      preparedAction:
        "Check visitor tee sheet, reserve electric carts, and alert terrace dining host without routing to property sales."
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

    let currentLaneId = "fairway-buyer";

    const renderLane = (laneId) => {
      const data = deskData[laneId] || deskData["fairway-buyer"];
      currentLaneId = laneId in deskData ? laneId : "fairway-buyer";

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
        : "fairway-buyer";

    renderLane(initialLane);
  });
})();
