/* Ridgeline Studio — Interactive Controls (Vanilla JS, Zero External Dependencies) */

(function () {
  // 1. Mobile Navigation Drawer
  const menuBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function setDrawer(open) {
    if (!mobileDrawer || !menuBtn) return;
    mobileDrawer.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '✕' : '☰';
  }

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      setDrawer(!mobileDrawer.classList.contains('open'));
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawer(false));
    });
  }

  // 2. Work Index Filter Pills
  const filterPills = document.querySelectorAll('.filter-pill');
  const workCards = document.querySelectorAll('.work-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      workCards.forEach((card) => {
        const type = card.dataset.type;
        const show = filter === 'all' || type === filter;
        card.classList.toggle('hidden-card', !show);
      });
    });
  });

  // 3. Audience Tabs (Estate Managers / HOA Boards / Developers)
  const audienceTabs = document.querySelectorAll('.audience-tab');
  const audiencePanels = document.querySelectorAll('.audience-panel');

  audienceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.audience;
      audienceTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      audiencePanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.audience === target);
      });
    });
  });

  // 4. Interactive Enquiry Desk Live Reply Preview
  const scenarios = {
    family: {
      route: 'Sorted to: Private Sales Desk + Plain-English Rule Answer',
      timing: 'Replied in 1 min 18 sec · Sunday 19:42',
      subject: 'Your question on pets, school runs, and viewing the estate',
      body:
        'Good evening Sarah,\n\nThank you for writing to us. Yes — two family dogs are welcomed per residence, provided the garden is enclosed in line with our simple perimeter guideline. You also asked about build timelines: owners have 24 months from transfer to commence construction.\n\nOur senior sales consultant has your note and preferred Saturday morning window ready, and will confirm your private gate pass first thing tomorrow.',
      followup:
        'Day 1 lifestyle note: shares morning trail routes and nearby independent school drive times. Day 2 note: invites a quiet Saturday coffee at the clubhouse.'
    },
    viewing: {
      route: 'Sorted to: Accredited Sales Agent (Pre-Briefed)',
      timing: 'Replied in 54 sec · Tuesday 20:15',
      subject: 'Your private viewing request for a north-facing family stand',
      body:
        'Good evening David,\n\nWe have received your enquiry for a four-bedroom family home or north-facing stand overlooking the valley. Because our office is closed for the evening, we have reserved a brief for our sales desk so they can confirm your Thursday afternoon viewing as soon as the doors open at 08:00.\n\nIn the meantime, here is a clear summary of current monthly levies and what they cover — security, trail maintenance, and estate landscaping.',
      followup:
        'Day 1 lifestyle note: highlights golden-hour views and estate security overview. Day 2 note: gentle check-in with two open viewing slots.'
    },
    architect: {
      route: 'Sorted to: HOA & Architectural Review Desk',
      timing: 'Replied in 1 min 05 sec · Thursday 11:20',
      subject: 'Roof pitch, natural stone palette, and plan submission steps',
      body:
        'Hello Michael,\n\nThank you for reaching out regarding Stand 42. Rather than sending a 60 MB archive to sift through, here are the three points you asked for: double-pitched roofs between 22° and 30° in muted charcoal, natural stone or warm limewash facades, and plan submission cut-off on the first Tuesday of each month.\n\nYour message has been routed straight to our architectural compliance coordinator so reception did not have to forward it by hand.',
      followup:
        'No sales follow-up triggered — cleanly separated from home-buyer communications so your compliance desk stays focused.'
    }
  };

  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  const routeEl = document.getElementById('desk-route');
  const timingEl = document.getElementById('desk-timing');
  const subjectEl = document.getElementById('desk-subject');
  const bodyEl = document.getElementById('desk-body');
  const followupEl = document.getElementById('desk-followup');

  function renderScenario(key) {
    const s = scenarios[key];
    if (!s || !routeEl) return;
    routeEl.textContent = s.route;
    timingEl.textContent = s.timing;
    subjectEl.textContent = s.subject;
    bodyEl.textContent = s.body;
    followupEl.textContent = s.followup;
  }

  scenarioBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderScenario(btn.dataset.scenario);
    });
  });

  // 5. FAQ Accordion
  document.querySelectorAll('.faq-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // 6. Case Study, Journal & Legal Modal
  const modal = document.getElementById('site-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  const modalEntries = {
    'farm-walkthrough': {
      badge: 'Walkthrough · Built from public information',
      title: 'Farm Estate Walkthrough',
      facts: [
        ['Setting', '750 ha Working Agrihood, KZN Midlands'],
        ['What we made', 'Lifestyle homepage + 5-part enquiry desk'],
        ['Status', 'Prepared from public information only']
      ],
      sections: [
        ['The challenge we noticed', 'Public estate pages often read like administrative notice boards, burying working farm life, trails, and school proximity beneath long specification lists while sending every enquiry to a single shared inbox.'],
        ['The lifestyle story we shaped', 'We structured the visit around daily rhythm — morning mist across open pasture, safe family cycling paths, farm-gate produce, and calm security — before inviting a private viewing.'],
        ['How the enquiry desk responds', 'A family asking about small-holding rules, pets, and weekend viewings receives a warm plain-English reply within two minutes, sorted straight to Sales while HOA questions stay with Estate Management.'],
        ['What we will measure together', 'First-reply speed (under two minutes), share of enquiries reaching the right desk on the first touch, and booked private viewings from evening and weekend visitors.']
      ]
    },
    'klipdrift': {
      badge: 'Ridgeline concept · Golf Estate',
      title: 'Klipdrift Links & Country Club',
      facts: [
        ['Estate archetype', 'Championship Golf & Country Club'],
        ['Audience', 'Golf families & multigenerational buyers'],
        ['Status', 'Ridgeline Studio concept flagship']
      ],
      sections: [
        ['The challenge', 'Established golf estates often feel like member scorecard portals, mixing restaurant bookings, tee times, and R10M+ home enquiries in one reception inbox.'],
        ['The lifestyle story', 'Dawn fairways, warm stone clubhouse terraces, and safe wetland trails for children — giving both golfers and non-golfing partners a clear picture of life on the estate.'],
        ['Sample enquiry desk reply', 'Separates non-resident golf membership queries from fairway home buyers immediately, explaining architectural stone guidelines in plain English and scheduling a Day 1 clubhouse lifestyle follow-up.']
      ]
    },
    'oakhaven': {
      badge: 'Ridgeline concept · Farm-Like Estate',
      title: 'Oakhaven Farmstead',
      facts: [
        ['Estate archetype', 'Working Farm & Equestrian Country Estate'],
        ['Audience', 'Semigrating families & acreage buyers'],
        ['Status', 'Ridgeline Studio concept flagship']
      ],
      sections: [
        ['The challenge', 'Country and equestrian estates sell space and serenity, yet static brochures leave relocating families guessing about stabling, boreholes, and drive times to independent schools.'],
        ['The lifestyle story', 'A calm narrative walking visitors through morning paddock rides, open orchards, and verified school and hospital drive times before showing available homestead stands.'],
        ['Sample enquiry desk reply', 'Answers equestrian stabling and barn-style building questions in plain English, routes buyers to Sales and stabling queries to the Farm Manager, and captures Sunday family viewing requests.']
      ]
    },
    'atelier44': {
      badge: 'Ridgeline concept · Modern Apartment Complex',
      title: 'Atelier 44 Residences',
      facts: [
        ['Estate archetype', 'Lock-up-and-go Apartment Sanctuary'],
        ['Audience', 'Executives, downsizers & investors'],
        ['Status', 'Ridgeline Studio concept flagship']
      ],
      sections: [
        ['The challenge', 'Modern apartment complexes juggle three very different conversations — unit purchasers, executive tenants, and body corporate resident requests — often all landing on one stressed desk.'],
        ['The lifestyle story', 'Focuses on effortless daily living: biometric security, backup power and water, quiet work lounges, and evening terrace views.'],
        ['Sample enquiry desk reply', 'Sorts sales, letting, and body corporate queries immediately, explains short-term letting and pet rules in plain English, and follows up on Day 1 with suite availability.']
      ]
    },
    'tideline': {
      badge: 'Ridgeline concept · Coastal Estate',
      title: 'Tideline Dune Sanctuary',
      facts: [
        ['Estate archetype', 'Eco-Coastal Forest & Beachfront Estate'],
        ['Audience', 'Coastal semigrants & holiday homeowners'],
        ['Status', 'Ridgeline Studio concept flagship']
      ],
      sections: [
        ['The challenge', 'Coastal estates see their heaviest browsing over weekends and school holidays when offices are closed, while conservation rules sit locked inside large downloadable files.'],
        ['The lifestyle story', 'Elevated milkwood boardwalks, barefoot beach club mornings, and low-impact coastal architecture that earns trust before presenting ocean-view stands.'],
        ['Sample enquiry desk reply', 'Captures holiday and Sunday evening enquiries immediately, answers dune-height and indigenous planting questions in clear English, and has Monday viewing briefs ready at 08:00.']
      ]
    },
    'veridian': {
      badge: 'Ridgeline concept · New Development',
      title: 'Veridian Ridge Precinct',
      facts: [
        ['Estate archetype', 'Multi-Phase Off-Plan New Development'],
        ['Audience', 'First-phase buyers & long-term investors'],
        ['Status', 'Ridgeline Studio concept flagship']
      ],
      sections: [
        ['The challenge', 'Off-plan buyers hesitate when phases, transfer duty, and completion dates feel unclear or buried inside sales brochures.'],
        ['The lifestyle story', 'Separates what is completed today, under construction, and planned for future phases with calm architectural transparency and clear plot-and-plan options.'],
        ['Sample enquiry desk reply', 'Explains deposit structure, no-transfer-duty savings, and Phase 1 handover dates in plain English, routing serious buyers straight to the developer sales director.']
      ]
    },
    'note-1': {
      badge: 'Journal · Estate Hospitality',
      title: 'What a prospective family feels in the first two minutes',
      facts: [
        ['Reading time', '2 minutes'],
        ['For', 'Estate Managers & Sales Directors'],
        ['Focus', 'First impressions']
      ],
      sections: [
        ['Emotion arrives before specifications', 'A family relocating to KZN or the Western Cape rarely falls in love with a table of stand sizes. They picture morning coffee on the veranda, safe afternoon cycling, and how calm the gatehouse feels.'],
        ['The two-minute silence test', 'When a family finally writes in, waiting 36 hours for a reply cools the warmth they just felt. A composed, personal estate-branded reply within two minutes signals that the community is run with care.']
      ]
    },
    'note-2': {
      badge: 'Journal · HOA & Compliance',
      title: 'Why dumping a 60 MB rulebook cools down serious buyers',
      facts: [
        ['Reading time', '2 minutes'],
        ['For', 'HOA Boards & Estate Offices'],
        ['Focus', 'Clear answers']
      ],
      sections: [
        ['One simple question, forty pages of rules', 'Most buyers and architects only want a straight answer to one question — pets, roof pitch, or levy inclusions. Sending a massive downloadable archive feels bureaucratic and slows the decision.'],
        ['Plain English builds trust', 'When your enquiry desk is trained on your real conduct rules and guidelines, it replies with three clear sentences answering the exact question, while keeping your office team out of repetitive email chains.']
      ]
    },
    'note-3': {
      badge: 'Journal · Weekend Viewings',
      title: 'How Sunday evening browsing decides Monday morning viewings',
      facts: [
        ['Reading time', '2 minutes'],
        ['For', 'Developers & Sales Teams'],
        ['Focus', 'After-hours cover']
      ],
      sections: [
        ['Families research together after hours', 'Couples compare estates after dinner and on Sunday afternoons — right when estate offices are closed. If they hear nothing until Tuesday, they have already booked viewings elsewhere.'],
        ['Starting Monday ahead', 'With calm after-hours and weekend cover, every evening enquiry is acknowledged warmly, answered clearly, and placed on your sales team’s desk before Monday morning coffee.']
      ]
    },
    'privacy': {
      badge: 'POPIA & Privacy',
      title: 'Privacy Policy',
      facts: [
        ['Jurisdiction', 'South Africa (POPIA)'],
        ['Region', 'KwaZulu-Natal & Western Cape'],
        ['Commitment', 'Zero third-party sharing']
      ],
      sections: [
        ['How we handle your enquiry', 'Details shared through our conversation form are used solely to respond to your estate enquiry. We never sell, rent, or pass contact details to external brokers or mailing lists.'],
        ['Estate data care', 'When we set up an enquiry desk for a residential estate, all resident and buyer messages remain under the estate’s governance in line with the Protection of Personal Information Act (POPIA).']
      ]
    },
    'terms': {
      badge: 'Studio Standards',
      title: 'Terms of Engagement',
      facts: [
        ['Ownership', '100% Estate-Owned'],
        ['Concepts', 'Clearly labelled walkthroughs'],
        ['Transparency', 'Written scope before work begins']
      ],
      sections: [
        ['Honest showcase labelling', 'Every project in our Work index is clearly marked as a walkthrough built from public information or a Ridgeline Studio concept. We never present concept work as a past client contract.'],
        ['Full client ownership', 'Commissioned estate websites, domains, photography, and written copy belong entirely to the estate or developer upon handover.']
      ]
    }
  };

  function openModal(id) {
    const entry = modalEntries[id];
    if (!entry || !modal || !modalBody) return;
    const factsHtml = entry.facts
      .map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`)
      .join('');
    const sectionsHtml = entry.sections
      .map(([h, p]) => `<div class="modal-reply-box"><strong>${h}</strong><p style="margin:8px 0 0">${p}</p></div>`)
      .join('');

    modalBody.innerHTML = `
      <p class="eyebrow">${entry.badge}</p>
      <h3>${entry.title}</h3>
      <div class="modal-facts">${factsHtml}</div>
      ${sectionsHtml}
      <div style="margin-top:22px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <a href="#conversation" class="btn-pill btn-dark" id="modal-cta-link">Start a conversation <span class="arrow-circle">→</span></a>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const cta = document.getElementById('modal-cta-link');
    if (cta) {
      cta.addEventListener('click', () => closeModal());
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modal));
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      setDrawer(false);
    }
  });

  // 7. Low-Pressure "Start a conversation" Form
  const convForm = document.getElementById('conversation-form');
  const convSuccess = document.getElementById('conversation-success');
  const convReset = document.getElementById('conversation-reset');

  if (convForm && convSuccess) {
    convForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('conv-name')?.value || '').trim();
      const estate = (document.getElementById('conv-estate')?.value || '').trim();
      const contact = (document.getElementById('conv-contact')?.value || '').trim();

      const summary = document.getElementById('conv-summary');
      if (summary) {
        summary.textContent = `Thank you, ${name}. We have noted your message for ${estate} and will reply to ${contact} in plain English.`;
      }
      convForm.style.display = 'none';
      convSuccess.classList.add('visible');
    });
  }

  if (convReset && convForm && convSuccess) {
    convReset.addEventListener('click', () => {
      convForm.reset();
      convForm.style.display = 'flex';
      convSuccess.classList.remove('visible');
    });
  }
})();
