/* ==========================================================================
   Ridgeline Studio — Interactive Enquiry & Desk Routing Engine (Plantations Estate)
   Strictly isolated single-estate controller (zero switcher / outcome-first copy).
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'plantations';

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
    var isPiazza = pId === 'piazza-visitor' || intentLower.includes('piazza') || intentLower.includes('round house') || intentLower.includes('spa') || intentLower.includes('montessori');
    var isGov = pId === 'governance-agent' || intentLower.includes('conduct rules') || intentLower.includes('governance') || intentLower.includes('agent reg');
    var hasPets = intentLower.includes('dog') || intentLower.includes('cat');

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: '4-Lane PHOA Capture',
        chip: 'Replaces 4-field Ninja Form + POPIA',
        heading: 'Instant Village, Pet & Piazza Visitor Capture',
        summary:
          'Replaces the flat 4-field Ninja Form (#nf-form-1-cont on /contact/) with village selection, pet compatibility, La Piazza visitor routing, and POPIA consent.',
        meta: [
          { label: 'Fixes Live Defect', value: 'Adds missing dropdowns, pet filter, and POPIA gate (26.11.25 Policy).' },
          { label: 'Detected Track', value: form.intent }
        ],
        previewTitle: 'Step 01 · Structured PHOA Intake Payload',
        previewHtml: renderKvPayload([
          ['Enquirer', form.fullName + ' (' + form.email + ')'],
          ['Phone / WhatsApp', form.phone],
          ['Selected Track', form.intent],
          ['Village / Topic', form.secondary],
          ['Pet / Urgency', form.tertiary],
          ['Note', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: 'Village Pet & Rule Matchmaker',
        chip: 'Unlocks 5 unlabeled PDFs',
        heading: 'Checks 6-Village Pet Policy & Nov 2025 PDFs',
        summary:
          'Separates dog/cat families (Freehold & La Vigna) from sectional lock-up-and-go options, or routes La Piazza retail and accredited agent queries away from Louise.',
        meta: [
          {
            label: 'Verified Knowledge Used',
            value: isPiazza
              ? 'La Piazza 5 Tenants + 24/7 K9, CCTV & Facial-Recognition Visitor Gate Protocol'
              : isGov
                ? 'PHOA-conduct-rules-version20_NOV-2025.pdf + Arch Guidelines 20th Ed + Agent Reg June 2025'
                : hasPets
                  ? 'Freehold (300+) & La Vigna (42 pet-friendly gardens) vs sectional rules'
                  : '6 Villages (669+ homes) + 38-ha Conservancy + Little Seedlings Montessori'
          },
          {
            label: 'Switchboard Protection',
            value: 'Zero public dining/spa/Montessori or basic rule lookup calls sent to (031) 765 8968.'
          }
        ],
        previewTitle: 'Step 02 · Automated Pet-Policy & Desk Triage',
        previewHtml: renderHandoffCards([
          {
            title: isPiazza ? 'La Piazza Visitor Self-Service Matched' : isGov ? 'Unindexed /documents/ PDFs Unlocked' : hasPets ? 'Pet-Friendly Village Match Confirmed' : '6-Village Portfolio Matched',
            highlight: true,
            body: isPiazza
              ? 'Identified La Piazza tenant enquiry (The Round House / Fleur De Lis Spa Unit 200 / New Images / Le Petit Playhouse / Little Seedlings). Prepared visitor gate & underground parking guide without touching Louise’s inbox.'
              : isGov
                ? 'Solved the /documents/ image-only PNG problem (43.png–47.png) by pulling exact Nov 2025 Conduct Rules, 20th Ed Architectural Design Guidelines, and June 2025 Agent SOP requirements.'
                : hasPets
                  ? 'Detected dog/cat household. Prioritized Freehold (300+ homes) and La Vigna (42 homes with private, pet-friendly gardens) while flagging body corporate limits in dense La Piazza apartments.'
                  : 'Matched buyer/tenant preference across 6 villages with Little Seedlings Montessori walk-to-school and 38-ha conservancy trail context.'
          },
          {
            title: 'Blank /registered-agents/ Fix',
            highlight: false,
            body: 'Because /registered-agents/ is blank and PHOA has no in-house brokerage, qualified buyers route straight to PHOA-registered external estate agents.'
          }
        ])
      },
      {
        num: '03',
        time: '01:04s',
        shortTitle: 'Tuscan Village Narrative Reply',
        chip: '64-second delivery',
        heading: 'Sub-2-Minute Narrative Response + Exact PDFs',
        summary:
          'Sends ' +
          form.firstName +
          ' a grounded Tuscan conservancy welcome, village & pet fit guide, or direct La Piazza visitor protocol within ~64 seconds.',
        meta: [
          { label: 'Recipient', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Delivery SLA', value: '64 seconds' }
        ],
        previewTitle: 'Step 03 · Outbound Narrative Email Preview',
        previewHtml: renderEmailPreview({
          from: 'Plantations Estate Concierge <support@plantationsestate.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isPiazza
            ? 'Visiting La Piazza at Plantations Estate — Dining, Spa & Gate Access'
            : isGov
              ? 'Plantations HOA Conduct Rules (Nov 2025), Arch Guidelines & Agent Pack'
              : 'Plantations Estate Village Guide — 38-Ha Conservancy & Pet-Friendly Fit',
          paragraphs: isPiazza
            ? [
                'Hi ' + form.firstName + ',',
                'We look forward to welcoming you into La Piazza at 47 Shongweni Road, Hillcrest. Our village square hosts The Round House restaurant, Fleur De Lis Spa (Unit 200), New Images Salon, Le Petit Playhouse, and Little Seedlings Montessori—all supported by shaded underground parking.',
                'Because our estate maintains 24/7 manned guarding, K9 patrols, CCTV, and controlled visitor/facial-recognition access, please coordinate your booking directly with your chosen La Piazza venue ahead of arrival so your visitor entry clearance is smooth at the gate.',
                'Direct visitor guidelines and parking notes are attached below—no HOA office follow-up required.'
              ]
            : isGov
              ? [
                  'Hi ' + form.firstName + ',',
                  'Thank you for your enquiry. To save you hunting through the thumbnail icons on our documents page, I have attached the official November 2025 PHOA Conduct Rules (Version 20), the 2025 Architectural Design Guidelines (20th Edition), and the June 2025 Estate Agents Registration Form.',
                  'For external practitioners registering to market homes at Plantations, please ensure your NQF4/5 certificate, valid Fidelity Fund Certificate (FFC), ID copy, signed SOP acknowledgement, and mandatory seller defect disclosure checklist are included (note: the R3,500 annual admin fee remains suspended pending High Court action).',
                  'Our admin team at admin@plantationsestate.co.za receives completed packs cleanly.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for enquiring about living at Plantations Estate. Set across 86 hectares in Hillcrest—including a 38-hectare private indigenous conservancy with walking trails, stream, duiker, and birdlife—families love being able to walk safely to Little Seedlings Montessori (12 months–5 years) and enjoy three age-zoned play parks and La Piazza village square.',
                  hasPets
                    ? 'Because you are moving with dogs or cats, our village guide focuses specifically on Freehold homes (300+ standalone properties) and La Vigna (42 double-storey homes featuring private, pet-friendly gardens), while explaining sectional conduct rules across La Piazza, Vecchio, Sorrento, and Duo.'
                    : 'Whether you prefer spacious Freehold homes (300+ properties) or lock-up-and-go Tuscan village living in La Piazza, Vecchio, La Vigna, Sorrento, or Duo, I have attached our November 2025 Conduct Rules pet & levy summary below.',
                  'Because PHOA works exclusively through accredited external real estate agents, I have routed your pre-qualified village brief to a PHOA-registered agent so they can share matching homes directly.'
                ],
          attachments: isPiazza
            ? ['La-Piazza-Visitor-Gate-And-Parking-Guide.pdf']
            : isGov
              ? ['PHOA-conduct-rules-version20_NOV-2025.pdf', '2025-PHOA-ARCH-DESIGN-GUIDELINES-20th-Edition-.pdf', 'AGENTS-REGISTRATION-FORM-JUNE-2025.pdf']
              : ['PHOA-conduct-rules-version20_NOV-2025.pdf', 'Plantations-6-Villages-And-Conservancy-Overview.pdf']
        })
      },
      {
        num: '04',
        time: '01:14s',
        shortTitle: 'Registered Agent & Louise Split',
        chip: 'Protects support@ & (031) 765 8968',
        heading: 'External Agent Routing + Clean Log for Louise',
        summary:
          'Keeps switchboard calls and routine PDF requests completely away from Louise while ensuring buyers reach PHOA-registered agents cleanly.',
        meta: [
          { label: 'Buyer / Tenant Route', value: 'PHOA-Registered External Real Estate Agents' },
          { label: 'HOA Office (Louise)', value: 'support@plantationsestate.co.za (Structured Summary Only)' }
        ],
        previewTitle: 'Step 04 · PHOA Desk Relief & Agent Handoff',
        previewHtml: renderHandoffCards([
          {
            title: isPiazza || isGov ? '100% Deflected From Louise’s Manual Queue' : 'Registered Agent Dossier Dispatched',
            highlight: true,
            body: isPiazza || isGov
              ? form.fullName + ' received verified ' + (isPiazza ? 'La Piazza gate/venue guide' : 'Nov 2025 Conduct & Agent Reg PDFs') + ' automatically. Zero manual reply needed from Louise de Méziéres.'
              : 'Buyer: ' + form.fullName + ' (' + form.phone + ') · Fit: ' + form.secondary + ' · Household: ' + form.tertiary + '. Pre-qualified against Conduct Rules v20 and dispatched to accredited Plantations agents.'
          },
          {
            title: 'Louise de Méziéres Oversight Log (support@plantationsestate.co.za)',
            highlight: false,
            body: 'Mon–Thu 07:30–16:00 / Fri 07:30–15:00 office desk stays focused on true homeowner governance and compliance escalations.'
          }
        ])
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Day 1 & 2 Village Follow-Ups',
        chip: 'Auto-stops on reply',
        heading: 'Agent Connection Check + Round House Visit Invite',
        summary:
          'Confirms accredited agent follow-through on Day 1 and invites families to experience La Piazza and the 38-ha conservancy on Day 2.',
        meta: [
          { label: 'Day 1 (24h)', value: 'Checks registered agent contact & pet/levy clarity.' },
          { label: 'Day 2 (48h)', value: 'Suggests pairing a viewing with coffee at The Round House in La Piazza.' }
        ],
        isFollowupStep: true,
        day1: {
          from: 'Plantations Estate Concierge <support@plantationsestate.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Checking your Plantations village & agent match',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Just checking in to confirm our PHOA-registered agent reached out with options matching ' + form.secondary + ' (' + form.tertiary + ').',
            'If you need any detail from the November 2025 Conduct Rules or Architectural Guidelines before viewing, simply reply here.'
          ],
          attachments: []
        },
        day2: {
          from: 'Plantations Estate Concierge <support@plantationsestate.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Experiencing La Piazza & the 38-ha conservancy',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'When you arrange your viewing through your registered Plantations agent, leave time for a walk down to La Piazza square and a coffee at The Round House—seeing parents walk from Little Seedlings Montessori and spotting duiker along the gorge trails brings the estate’s rhythm to life.',
            'Reply anytime if our HOA team can help further.'
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