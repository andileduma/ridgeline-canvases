/* ==========================================================================
   Ridgeline Studio — Interactive Enquiry & Desk Routing Engine (Dunkirk Estate)
   Strictly isolated single-estate controller (zero switcher / outcome-first copy).
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'dunkirk';

  var state = {
    personaIndex: 0,
    submitted: false,
    activeStep: 1,
    activeFollowupDay: 'day1',
    animTimers: [],
    payload: null
  };

  var dom = {
    brandCrest: document.getElementById('brandCrest'),
    brandName: document.getElementById('brandName'),
    brandLocation: document.getElementById('brandLocation'),
    heroEyebrow: document.getElementById('heroEyebrow'),
    heroDomain: document.getElementById('heroDomain'),
    heroTitle: document.getElementById('heroTitle'),
    heroLead: document.getElementById('heroLead'),
    heroMetricsStrip: document.getElementById('heroMetricsStrip'),
    heroArchitecturalSvg: document.getElementById('heroArchitecturalSvg'),
    deskCardTitle: document.getElementById('deskCardTitle'),
    deskCardContact: document.getElementById('deskCardContact'),
    deskNuanceCopy: document.getElementById('deskNuanceCopy'),
    deskLeakageCopy: document.getElementById('deskLeakageCopy'),
    phase1Subtitle: document.getElementById('phase1Subtitle'),
    personaLanes: document.getElementById('personaLanes'),
    formCardTitle: document.getElementById('formCardTitle'),
    inputFullName: document.getElementById('inputFullName'),
    inputEmail: document.getElementById('inputEmail'),
    inputPhone: document.getElementById('inputPhone'),
    inputIntent: document.getElementById('inputIntent'),
    inputSecondary: document.getElementById('inputSecondary'),
    inputTertiary: document.getElementById('inputTertiary'),
    labelSecondary: document.getElementById('labelSecondary'),
    labelTertiary: document.getElementById('labelTertiary'),
    inputMessage: document.getElementById('inputMessage'),
    inputPopia: document.getElementById('inputPopia'),
    popiaCopy: document.getElementById('popiaCopy'),
    simulatorForm: document.getElementById('simulatorForm'),
    fillSampleBtn: document.getElementById('fillSampleBtn'),
    contextPanelTitle: document.getElementById('contextPanelTitle'),
    contextPanelDesc: document.getElementById('contextPanelDesc'),
    contextQuestionsList: document.getElementById('contextQuestionsList'),
    contextFixSummary: document.getElementById('contextFixSummary'),
    phaseCanvas: document.getElementById('phase-canvas'),
    simStatusPill: document.getElementById('simStatusPill'),
    routeProgressFill: document.getElementById('routeProgressFill'),
    routeNodesGrid: document.getElementById('routeNodesGrid'),
    stageStepBadge: document.getElementById('stageStepBadge'),
    stageTimeChip: document.getElementById('stageTimeChip'),
    stageHeading: document.getElementById('stageHeading'),
    stageSummary: document.getElementById('stageSummary'),
    stageMetaCards: document.getElementById('stageMetaCards'),
    prevStepBtn: document.getElementById('prevStepBtn'),
    nextStepBtn: document.getElementById('nextStepBtn'),
    previewWindowTitle: document.getElementById('previewWindowTitle'),
    followupTabs: document.getElementById('followupTabs'),
    previewBody: document.getElementById('previewBody'),
    replayRouteBtn: document.getElementById('replayRouteBtn'),
    resetCanvasBtn: document.getElementById('resetCanvasBtn'),
    resetSimHeaderBtn: document.getElementById('resetSimHeaderBtn'),
    auditSectionSubtitle: document.getElementById('auditSectionSubtitle'),
    auditRowsContainer: document.getElementById('auditRowsContainer'),
    rulebookFaqList: document.getElementById('rulebookFaqList'),
    footerAttribution: document.getElementById('footerAttribution')
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function clearAnimTimers() {
    while (state.animTimers.length) {
      clearTimeout(state.animTimers.pop());
    }
  }

  function renderSelectOptions(selectEl, options, selectedValue) {
    selectEl.innerHTML = options
      .map(function (opt) {
        return '<option value="' + escapeHtml(opt) + '">' + escapeHtml(opt) + '</option>';
      })
      .join('');
    if (selectedValue && options.includes(selectedValue)) {
      selectEl.value = selectedValue;
    }
  }

  function applySampleData(persona) {
    var s = persona.sample;
    dom.inputFullName.value = s.fullName;
    dom.inputEmail.value = s.email;
    dom.inputPhone.value = s.phone;
    dom.inputIntent.value = s.intent;
    dom.inputSecondary.value = s.secondary;
    dom.inputTertiary.value = s.tertiary;
    dom.inputMessage.value = s.message;
    dom.inputPopia.checked = true;
  }

  function renderPersonaContext() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    var persona = estate.personas[state.personaIndex] || estate.personas[0];

    dom.contextPanelTitle.textContent = persona.title;
    dom.contextPanelDesc.textContent = persona.shortDesc;
    dom.contextQuestionsList.innerHTML = persona.questions
      .map(function (q) {
        return '<li>' + escapeHtml(q) + '</li>';
      })
      .join('');
    dom.contextFixSummary.textContent = persona.fixSummary;
  }

  function renderPersonaLanes() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    dom.personaLanes.innerHTML = estate.personas
      .map(function (p, idx) {
        var activeClass = idx === state.personaIndex ? ' is-active' : '';
        return (
          '<button type="button" role="tab" aria-selected="' +
          (idx === state.personaIndex ? 'true' : 'false') +
          '" class="persona-card' +
          activeClass +
          '" data-persona-idx="' +
          idx +
          '">' +
          '<span class="persona-card-tag">' +
          escapeHtml(p.tag) +
          '</span>' +
          '<span class="persona-card-title">' +
          escapeHtml(p.title) +
          '</span>' +
          '<span class="persona-card-desc">' +
          escapeHtml(p.shortDesc) +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function renderAuditAndFaqs(estate) {
    dom.auditSectionSubtitle.textContent =
      'Every bottleneck below comes from a read-only inspection of ' +
      estate.domain +
      ' and its live statutory documents.';

    dom.auditRowsContainer.innerHTML = estate.auditRows
      .map(function (row) {
        return (
          '<div class="audit-row">' +
          '<div class="audit-before"><span class="audit-tag">Observed Today</span>' +
          escapeHtml(row.before) +
          '</div>' +
          '<div class="audit-after"><span class="audit-tag">With Smart Desk Routing</span>' +
          escapeHtml(row.after) +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    dom.rulebookFaqList.innerHTML = estate.rulebookFaqs
      .map(function (item, idx) {
        var isOpen = idx === 0;
        return (
          '<div class="faq-item">' +
          '<button type="button" class="faq-trigger" aria-expanded="' +
          (isOpen ? 'true' : 'false') +
          '" data-faq-idx="' +
          idx +
          '">' +
          '<span>' +
          escapeHtml(item.q) +
          '</span>' +
          '<span aria-hidden="true">' +
          (isOpen ? '−' : '+') +
          '</span>' +
          '</button>' +
          '<div class="faq-panel"' +
          (isOpen ? '' : ' hidden') +
          '>' +
          '<p>' +
          escapeHtml(item.a) +
          '</p>' +
          '<span class="faq-source-chip">Verified Source: ' +
          escapeHtml(item.source) +
          '</span>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  function readFormPayload() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    var persona = estate.personas[state.personaIndex] || estate.personas[0];
    return {
      fullName: dom.inputFullName.value.trim() || persona.sample.fullName,
      email: dom.inputEmail.value.trim() || persona.sample.email,
      phone: dom.inputPhone.value.trim() || persona.sample.phone,
      intent: dom.inputIntent.value || persona.sample.intent,
      secondary: dom.inputSecondary.value || persona.sample.secondary,
      tertiary: dom.inputTertiary.value || persona.sample.tertiary,
      message: dom.inputMessage.value.trim() || persona.sample.message,
      personaId: persona.id,
      personaTitle: persona.title,
      firstName: (dom.inputFullName.value.trim() || persona.sample.fullName).split(/\s+/)[0]
    };
  }

  function renderKvPayload(pairs) {
    return (
      '<div class="payload-kv-grid">' +
      pairs
        .map(function (pair) {
          return (
            '<div class="payload-kv">' +
            '<span class="mono-label">' +
            escapeHtml(pair[0]) +
            '</span>' +
            '<strong>' +
            escapeHtml(pair[1]) +
            '</strong>' +
            '</div>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function renderHandoffCards(cards) {
    return (
      '<div class="handoff-split-box">' +
      cards
        .map(function (c) {
          return (
            '<div class="handoff-card' +
            (c.highlight ? ' is-highlight' : '') +
            '">' +
            '<span class="mono-label">' +
            escapeHtml(c.title) +
            '</span>' +
            '<p style="margin-top:6px; font-size:14px; line-height:1.6;">' +
            escapeHtml(c.body) +
            '</p>' +
            '</div>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function renderEmailPreview(mail) {
    var attachmentsHtml =
      mail.attachments && mail.attachments.length
        ? '<div class="attachment-chips">' +
          mail.attachments
            .map(function (file) {
              return '<span class="attachment-chip">&#128206; ' + escapeHtml(file) + '</span>';
            })
            .join('') +
          '</div>'
        : '';

    return (
      '<div class="email-header-block">' +
      '<div class="email-header-row"><span class="email-header-label">From</span><span>' +
      escapeHtml(mail.from) +
      '</span></div>' +
      '<div class="email-header-row"><span class="email-header-label">To</span><span>' +
      escapeHtml(mail.to) +
      '</span></div>' +
      '<div class="email-subject">' +
      escapeHtml(mail.subject) +
      '</div>' +
      '</div>' +
      '<div class="email-narrative">' +
      mail.paragraphs
        .map(function (p) {
          return '<p>' + escapeHtml(p) + '</p>';
        })
        .join('') +
      attachmentsHtml +
      '</div>'
    );
  }

  function buildDynamicRoute(estate, form) {
    var pId = form.personaId;
    var intentLower = (form.intent + ' ' + form.secondary + ' ' + form.tertiary).toLowerCase();
    var isRules = pId === 'rules-lookup' || intentLower.includes('rules') || intentLower.includes('2026') || intentLower.includes('manual');
    var isDining = pId === 'dining-spa' || intentLower.includes('ray') || intentLower.includes('spa') || intentLower.includes('dining');

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: 'HOA Reception Shield',
        chip: 'Replaces flat 4-field #contact',
        heading: 'Instant Intent Capture Before Inbox Dump',
        summary:
          'Replaces the generic 4-field Discover Dunkirk form (Name, Email, Phone, single-line Message) with upfront buyer vs rulebook vs hospitality routing.',
        meta: [
          { label: 'Captured Source', value: 'dunkirkestate.co.za · Replaced unrouted form.cform -> POST /process' },
          { label: 'Detected Track', value: isDining ? 'Public Hospitality (Ray’s Kitchen / Spa)' : isRules ? 'Governance / Mobile Rule Lookup' : 'Resale / Rental Buyer Lead' }
        ],
        previewTitle: 'Step 01 · Intent-Tagged Intake Payload',
        previewHtml: renderKvPayload([
          ['Visitor', form.fullName + ' (' + form.email + ')'],
          ['Phone / WhatsApp', form.phone],
          ['Selected Intent', form.intent],
          ['Property / Topic', form.secondary],
          ['Timeline', form.tertiary],
          ['Enquiry Note', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: 'Buyer vs HOA Separation',
        chip: 'Eliminates manual forwarding',
        heading: 'Separates Sales, 2026 Rules & Public Visitors',
        summary:
          'Because Dunkirk HOA has no in-house sales team, the desk router immediately flags whether to dispatch to appointed external agents or answer directly from 2026 Rules.',
        meta: [
          {
            label: 'Verified Knowledge Used',
            value: isRules
              ? '2026 Dunkirk Estate Rules Version 2026.1 (June).pdf + 2023 Development Manual'
              : isDining
                ? 'Ray’s Kitchen & Laura Channing Spa & Skin visitor protocol (Clubhouse)'
                : '344 homes · 42-acre coastal forest · Salt Rock Beach Clubhouse · Appointed Agent Desk'
          },
          {
            label: 'Reception Burden Removed',
            value: '0 manual forwarding emails required from reception@dunkirkestate.co.za.'
          }
        ],
        previewTitle: 'Step 02 · Automated Routing Classification',
        previewHtml: renderHandoffCards([
          {
            title: isDining ? 'Hospitality Deflection Triggered' : isRules ? '2.35 MB .zip Bypassed on Mobile' : 'Appointed External Agent Routing Triggered',
            highlight: true,
            body: isDining
              ? 'Recognised non-resident Ray’s Kitchen / Laura Channing Spa request. Kept completely out of HOA governance and resale queues.'
              : isRules
                ? 'Pulled exact sections from June 2026 Estate Rules (v2026.1) and 2023 Architectural Guidelines without forcing a 2.35 MB zip download.'
                : 'Captured buyer preference (' + form.secondary + ', ' + form.tertiary + ') and prepared a structured dossier for Dunkirk’s appointed external resale agents.'
          },
          {
            title: 'HOA Audit Trail',
            highlight: false,
            body: 'Clean read-only summary logged for HOA Reception oversight (032 525 4404) without cluttering their active inbox.'
          }
        ])
      },
      {
        num: '03',
        time: '01:05s',
        shortTitle: 'Coastal Forest Narrative Reply',
        chip: 'Sent in 65 seconds',
        heading: 'Sub-2-Minute Narrative Response to ' + form.firstName,
        summary:
          'Welcomes prospective buyers with the 42-acre coastal forest, 150+ bird species, and Salt Rock Beach Clubhouse—or gives instant mobile rule/dining answers.',
        meta: [
          { label: 'Recipient', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Tone Match', value: 'Calm coastal editorial voice matching dunkirkestate.co.za' }
        ],
        previewTitle: 'Step 03 · Instant Narrative Email Preview',
        previewHtml: renderEmailPreview({
          from: 'Dunkirk Estate Concierge <concierge@dunkirkestate.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isDining
            ? 'Visiting Ray’s Kitchen & Laura Channing Spa at Dunkirk Estate'
            : isRules
              ? 'Your Dunkirk Estate June 2026 Rules & Architectural Summary'
              : 'Welcome to Dunkirk Estate — Forest Living & Salt Rock Beach Clubhouse',
          paragraphs: isDining
            ? [
                'Hi ' + form.firstName + ',',
                'Thank you for getting in touch about visiting Dunkirk Estate. Both Ray’s Kitchen (overlooking the indigenous coastal forest) and Laura Channing Spa & Skin (inside our main Estate Clubhouse) welcome external guests.',
                'Please use the direct venue booking channels below to confirm your table or spa treatment time, and have your driver’s licence ready for smooth visitor sign-in at our main Salt Rock gate opposite New Salt Rock City.',
                'We look forward to welcoming you into the forest.'
              ]
            : isRules
              ? [
                  'Hi ' + form.firstName + ',',
                  'Instead of making you download and unzip the 2.35 MB archive on your phone, here are the exact answers from our June 2026 Estate Rules (Version 2026.1) and 2023 Development Manual regarding your enquiry.',
                  'External alterations require Architectural Review submission per the 2023 Development Manual, and standard estate contractor gate hours apply. I have attached the clean individual PDFs below so you can open only what you need directly.',
                  'If formal HOA sign-off is needed, your summary has been logged with Reception.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for enquiring about ' + form.secondary + ' at Dunkirk Estate. Built around 42 acres of preserved indigenous coastal forest with over 150 recorded bird species, timber boardwalks, and two catch-and-release dams, daily life here feels worlds away while sitting just 1 km from New Salt Rock City and minutes from Curro Salt Rock, Ashton, and Reddam.',
                  'As a homeowner, you also enjoy exclusive electronic access to the private double-storey Salt Rock Beach Clubhouse right on Salt Rock Main Beach—complete with dedicated resident off-street parking, Beach Café, sun deck, and braai facilities.',
                  'Because Dunkirk HOA works closely with appointed external real estate agents rather than an internal sales desk, I have forwarded your complete buyer brief to our accredited agent on duty so they can share matching current listings with you directly.'
                ],
          attachments: isDining
            ? ['Dunkirk-Visitor-Gate-Pass-Guide.pdf']
            : isRules
              ? ['2026 Dunkirk Estate Rules Version 2026.1 (June).pdf', 'Developement Manual & Architectural Guidelines 2023 Updated.pdf']
              : ['Dunkirk-Coastal-Forest-And-Beach-Clubhouse-Overview.pdf', 'Dunkirk Estate MOI - 2018.pdf']
        })
      },
      {
        num: '04',
        time: '01:12s',
        shortTitle: 'Appointed Agent Dispatch',
        chip: 'Zero Reception manual sorting',
        heading: 'Direct Agent Handoff + Read-Only HOA Log',
        summary:
          'Routes property leads directly to Dunkirk’s appointed external agents while giving HOA Reception clear visibility without inbox clutter.',
        meta: [
          { label: 'Primary Route', value: isDining ? 'Ray’s Kitchen / Spa Booking Desk' : isRules ? 'HOA Governance Archive (Self-Served)' : 'Appointed External Resale/Rental Agent' },
          { label: 'HOA Copy', value: 'Read-only audit ticket to reception@dunkirkestate.co.za' }
        ],
        previewTitle: 'Step 04 · Agent Dispatch & HOA Audit Split',
        previewHtml: renderHandoffCards([
          {
            title: isRules || isDining ? 'HOA Reception Protected' : 'Qualified Buyer Dossier Dispatched to Appointed Agent',
            highlight: true,
            body: isRules || isDining
              ? 'Visitor / rule enquiry (' + form.fullName + ') was resolved immediately with zero manual email reply required from HOA Reception staff.'
              : 'Buyer: ' + form.fullName + ' (' + form.phone + ') · Typology: ' + form.secondary + ' · Horizon: ' + form.tertiary + '. Note: “' + form.message + '”. Estate welcome pack already delivered.'
          },
          {
            title: 'HOA Reception Audit Log (reception@dunkirkestate.co.za)',
            highlight: false,
            body: 'Status: Routed cleanly · SLA tracker armed (48h agent check-in).'
          }
        ])
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Day 1 & 2 Check-In + SLA',
        chip: 'Protects buyer experience',
        heading: 'Buyer Check-In + Appointed Agent SLA Alert',
        summary:
          'Verifies the buyer heard back from the appointed agent on Day 1, and triggers a lifestyle follow-up (or gentle SLA alert to HOA) on Day 2.',
        meta: [
          { label: 'Day 1 (24h)', value: 'Confirms our appointed Dunkirk agent made contact and shares Beach Clubhouse highlights.' },
          { label: 'Day 2 (48h)', value: 'Shares school/location proximity and cancels instantly once buyer replies.' }
        ],
        isFollowupStep: true,
        day1: {
          from: 'Dunkirk Estate Concierge <concierge@dunkirkestate.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Checking our appointed Dunkirk agent connected with you',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Just checking in to make sure one of our appointed Dunkirk estate agents has been in touch with current options matching ' + form.secondary + '.',
            'If you would like any practical details ahead of a visit—from school commutes to Salt Rock Beach Clubhouse tag access—just reply here anytime.'
          ],
          attachments: []
        },
        day2: {
          from: 'Dunkirk Estate Concierge <concierge@dunkirkestate.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'A morning walk through Dunkirk’s 42-acre coastal forest',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Whenever you are planning to tour ' + form.secondary + ' in Salt Rock, we always recommend leaving ten minutes for a quiet coffee at Ray’s Kitchen or a walk along the forest boardwalks to feel the pace of the estate firsthand.',
            'Reply whenever it suits you if you need anything from our team.'
          ],
          attachments: []
        }
      }
    ];
  }

  function renderRouteStage() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    var form = state.payload || readFormPayload();
    var steps = buildDynamicRoute(estate, form);
    var activeIdx = Math.max(0, Math.min(4, state.activeStep - 1));
    var currentStep = steps[activeIdx];

    dom.routeProgressFill.style.width = state.activeStep * 20 + '%';
    dom.routeNodesGrid.innerHTML = steps
      .map(function (step, idx) {
        var stepNum = idx + 1;
        var cls = 'route-node-btn';
        if (stepNum <= state.activeStep) cls += ' is-reached';
        if (stepNum === state.activeStep) cls += ' is-active';
        return (
          '<button type="button" role="tab" aria-selected="' +
          (stepNum === state.activeStep ? 'true' : 'false') +
          '" class="' +
          cls +
          '" data-step-num="' +
          stepNum +
          '">' +
          '<div class="node-top">' +
          '<span class="node-step-num">Step ' +
          escapeHtml(step.num) +
          '</span>' +
          '<span class="node-time-tag">' +
          escapeHtml(step.time) +
          '</span>' +
          '</div>' +
          '<span class="node-title">' +
          escapeHtml(step.shortTitle) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    dom.stageStepBadge.textContent = 'Step ' + currentStep.num + ' · ' + currentStep.time;
    dom.stageTimeChip.textContent = currentStep.chip;
    dom.stageHeading.textContent = currentStep.heading;
    dom.stageSummary.textContent = currentStep.summary;
    dom.stageMetaCards.innerHTML = currentStep.meta
      .map(function (m) {
        return (
          '<div class="stage-meta-card">' +
          '<span class="mono-label">' +
          escapeHtml(m.label) +
          '</span>' +
          '<p>' +
          escapeHtml(m.value) +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    dom.prevStepBtn.disabled = state.activeStep <= 1;
    dom.nextStepBtn.disabled = state.activeStep >= 5;

    if (currentStep.isFollowupStep) {
      dom.followupTabs.hidden = false;
      dom.previewWindowTitle.textContent =
        state.activeFollowupDay === 'day1'
          ? 'Step 05 · Day 1 Automated Follow-Up (24h)'
          : 'Step 05 · Day 2 Automated Follow-Up (48h)';
      var mailData = state.activeFollowupDay === 'day1' ? currentStep.day1 : currentStep.day2;
      dom.previewBody.innerHTML = renderEmailPreview(mailData);
    } else {
      dom.followupTabs.hidden = true;
      dom.previewWindowTitle.textContent = currentStep.previewTitle;
      dom.previewBody.innerHTML = currentStep.previewHtml;
    }

    dom.previewBody.style.animation = 'none';
    void dom.previewBody.offsetWidth;
    dom.previewBody.style.animation = '';

    dom.simStatusPill.textContent = state.submitted
      ? 'Live Routing Active · Step 0' + state.activeStep + ' of 05'
      : 'Preview Mode · Submit Form Above to Run';
  }

  function runRouteAnimation() {
    clearAnimTimers();
    state.submitted = true;
    state.payload = readFormPayload();
    state.activeStep = 1;
    renderRouteStage();

    var stepSequence = [2, 3];
    stepSequence.forEach(function (stepNum, idx) {
      var timer = setTimeout(function () {
        state.activeStep = stepNum;
        renderRouteStage();
      }, (idx + 1) * 850);
      state.animTimers.push(timer);
    });
  }

  function bootEstate() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    document.body.setAttribute('data-estate', ESTATE_ID);
    document.title = estate.name + ' — Enquiry & Desk Routing Walkthrough | Ridgeline Studio';

    dom.brandCrest.innerHTML = estate.crestSvg;
    dom.brandName.textContent = estate.name;
    dom.brandLocation.textContent = estate.location;
    dom.heroEyebrow.textContent = estate.eyebrow;
    dom.heroDomain.textContent = estate.domain;
    dom.heroTitle.textContent = estate.heroTitle;
    dom.heroLead.textContent = estate.heroLead;

    dom.heroMetricsStrip.innerHTML = estate.metrics
      .map(function (m) {
        return (
          '<div class="metric-cell">' +
          '<span class="metric-value">' +
          escapeHtml(m.value) +
          '</span>' +
          '<span class="metric-label">' +
          escapeHtml(m.label) +
          '</span>' +
          '</div>'
        );
      })
      .join('');

    dom.heroArchitecturalSvg.innerHTML = estate.heroSvg;
    dom.deskCardTitle.textContent = estate.deskTitle;
    dom.deskCardContact.textContent = estate.deskContact;
    dom.deskNuanceCopy.textContent = estate.deskNuance;
    dom.deskLeakageCopy.textContent = estate.deskLeakage;

    dom.phase1Subtitle.textContent =
      'Select any visitor scenario below to auto-fill realistic ' +
      estate.name +
      ' details, or enter your own question and click Submit.';
    dom.formCardTitle.textContent = estate.formTitle;
    dom.labelSecondary.textContent = estate.secondaryLabel;
    dom.labelTertiary.textContent = estate.tertiaryLabel;
    dom.popiaCopy.textContent = estate.popiaNote;

    renderSelectOptions(dom.inputIntent, estate.intentOptions, estate.personas[0].sample.intent);
    renderSelectOptions(dom.inputSecondary, estate.secondaryOptions, estate.personas[0].sample.secondary);
    renderSelectOptions(dom.inputTertiary, estate.tertiaryOptions, estate.personas[0].sample.tertiary);

    renderPersonaLanes();
    renderPersonaContext();
    applySampleData(estate.personas[0]);
    renderRouteStage();
    renderAuditAndFaqs(estate);

    dom.footerAttribution.textContent =
      'Enquiry & Desk Routing Walkthrough tailored to ' +
      estate.name +
      ' (' +
      estate.domain +
      ') — nothing built upfront on your live website.';
  }

  dom.personaLanes.addEventListener('click', function (e) {
    var card = e.target.closest('[data-persona-idx]');
    if (!card) return;
    var idx = Number(card.getAttribute('data-persona-idx'));
    var estate = window.ESTATES_DATA[ESTATE_ID];
    if (!estate.personas[idx]) return;

    state.personaIndex = idx;
    renderPersonaLanes();
    renderPersonaContext();
    applySampleData(estate.personas[idx]);

    if (state.submitted) {
      state.payload = readFormPayload();
      renderRouteStage();
    } else {
      state.payload = null;
      renderRouteStage();
    }
  });

  dom.fillSampleBtn.addEventListener('click', function () {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    applySampleData(estate.personas[state.personaIndex] || estate.personas[0]);
  });

  dom.simulatorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!dom.inputPopia.checked) {
      dom.inputPopia.focus();
      dom.simStatusPill.textContent = 'Please confirm POPIA consent before running walkthrough';
      return;
    }
    runRouteAnimation();
    dom.phaseCanvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  dom.routeNodesGrid.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-step-num]');
    if (!btn) return;
    clearAnimTimers();
    state.activeStep = Number(btn.getAttribute('data-step-num'));
    renderRouteStage();
  });

  dom.prevStepBtn.addEventListener('click', function () {
    clearAnimTimers();
    if (state.activeStep > 1) {
      state.activeStep -= 1;
      renderRouteStage();
    }
  });

  dom.nextStepBtn.addEventListener('click', function () {
    clearAnimTimers();
    if (state.activeStep < 5) {
      state.activeStep += 1;
      renderRouteStage();
    }
  });

  dom.followupTabs.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-day]');
    if (!tab) return;
    state.activeFollowupDay = tab.getAttribute('data-day');
    dom.followupTabs.querySelectorAll('.followup-tab').forEach(function (t) {
      t.classList.toggle('is-active', t === tab);
    });
    renderRouteStage();
  });

  dom.replayRouteBtn.addEventListener('click', function () {
    runRouteAnimation();
  });

  function resetToCapture() {
    clearAnimTimers();
    state.submitted = false;
    state.activeStep = 1;
    state.payload = null;
    renderRouteStage();
    document.getElementById('phase-capture').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  dom.resetCanvasBtn.addEventListener('click', resetToCapture);
  dom.resetSimHeaderBtn.addEventListener('click', resetToCapture);

  dom.rulebookFaqList.addEventListener('click', function (e) {
    var trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;
    var expanded = trigger.getAttribute('aria-expanded') === 'true';
    var panel = trigger.nextElementSibling;
    trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    trigger.lastElementChild.textContent = expanded ? '+' : '−';
    panel.hidden = expanded;
  });

  bootEstate();
})();