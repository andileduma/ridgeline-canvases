/* ==========================================================================
   Ridgeline Studio — Interactive Enquiry & Desk Routing Engine (Salta Sibaya)
   Strictly isolated single-estate controller (zero switcher / outcome-first copy).
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'salta';

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
    var isCapri = pId === 'capri-retiree' || intentLower.includes('capri');
    var isHoaSplit = pId === 'investor-hoa' || intentLower.includes('admin@') || intentLower.includes('yield') || intentLower.includes('cotton') || intentLower.includes('resident');

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: '5-Precinct Frictionless Capture',
        chip: 'Replaces 15-field gform_9 & Markt',
        heading: 'Captures Solara & Capri Without Password Walls',
        summary:
          'Replaces 8–15 field Gravity Forms (which omit Solara Salta) and Capri Village’s 8-char Markt registration wall with instant precinct routing.',
        meta: [
          { label: 'Fixes Live Defect', value: 'Includes Solara Salta directly + eliminates #lf-password-1 Markt gate.' },
          { label: 'Campaign Attribution', value: 'Preserves RainMaker UTM / channel source cleanly for Innova Haus.' }
        ],
        previewTitle: 'Step 01 · Multi-Precinct Captured Dossier',
        previewHtml: renderKvPayload([
          ['Prospect / Resident', form.fullName + ' (' + form.email + ')'],
          ['Phone / WhatsApp', form.phone],
          ['Selected Track', form.intent],
          ['Sub-Development', form.secondary],
          ['Budget / Need', form.tertiary],
          ['Specific Note', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: '3-Way Innova Haus Triage',
        chip: 'Devmco vs RainMaker vs HOA',
        heading: 'Separates Sales, RainMaker CRM & admin@saltasibaya.co.za',
        summary:
          'Routes verified pricing across all 5 villages (eliminating stale 2020-10-30 /sales/ confusion) while stopping HOA tickets from hitting Devmco sales.',
        meta: [
          {
            label: 'Pricing & Facts Matched',
            value: isCapri
              ? 'Capri Phase 4 (52% sold, 77 units): Homes R3.175M+ / Land R1.25M+ · Totalcare · Val’s Café'
              : isHoaSplit
                ? 'Salta Estate R2.95M+ (rentals R15k/pm) / Mt Cotton R1.29M+ (98% sold) vs HOA admin@'
                : 'Solara Salta (87% sold · Land R1.2M / Homes R4.45M+) · Serenity (2 left · R9.1M+)'
          },
          {
            label: 'Destination Assigned',
            value: intentLower.includes('biometrics') || intentLower.includes('resident')
              ? 'Salta HOA Admin (admin@saltasibaya.co.za)'
              : 'Devmco Realty (Ground Floor Innova Haus) + RainMaker CRM (1st Floor)'
          }
        ],
        previewTitle: 'Step 02 · Live Pricing Reconciliation & Desk Split',
        previewHtml: renderHandoffCards([
          {
            title: isCapri ? 'Markt Password Wall Bypassed + Phase 4 Verified' : 'Solara Salta Dropdown Gap Resolved',
            highlight: true,
            body: isCapri
              ? 'Bypassed mandatory 8-char password creation (#lf-password-1) and delivered live Phase 4 pricing (from R3.175M) rather than legacy /sales/ R2.705M banners.'
              : isHoaSplit
                ? 'Split corporate R15,000/pm investment yield queries cleanly to Devmco Realty while isolating biometric/levy questions on admin@saltasibaya.co.za.'
                : 'Captured Solara Salta / Serenity interest directly (fixing its omission from #input_9_10 on saltasibaya.co.za) with live Marine Walk & Playtomic Padel context.'
          },
          {
            title: 'RainMaker Attribution Kept Intact',
            highlight: false,
            body: 'Source, village tag, and budget bracket synced cleanly so Stefan Botha’s team can attribute every campaign conversion accurately.'
          }
        ])
      },
      {
        num: '03',
        time: '01:00s',
        shortTitle: 'Precinct Narrative Email',
        chip: '60-second delivery',
        heading: 'Tailored Sibaya Lifestyle & Floor-Plan Pack',
        summary:
          'Sends ' +
          form.firstName +
          ' exact verified pricing, lifestyle highlights, and downloadable floor plans immediately—with zero login passwords required.',
        meta: [
          { label: 'Recipient', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Delivery SLA', value: '60 seconds' }
        ],
        previewTitle: 'Step 03 · Outbound Precinct Brochure Email',
        previewHtml: renderEmailPreview({
          from: 'Salta Sibaya & Devmco Realty <info@saltasibaya.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isCapri
            ? 'Capri Village Phase 4 Floor Plans, Totalcare & Val’s Café (No Login Needed)'
            : isHoaSplit
              ? 'Salta Estate Rental Yields & Mt Cotton Overview — Sibaya'
              : 'Solara Salta & Serenity Coastal Availability — Salta Sibaya',
          paragraphs: isCapri
            ? [
                'Hi ' + form.firstName + ',',
                'Thank you for enquiring about Capri Village’s active over-50s community at Salta Sibaya. So you can review everything comfortably without creating a portal password, I have attached our direct Final Phase 4 brochure and step-less home floor plans below.',
                'With Phases 1–3 sold out, Final Phase 4 (52% sold across 77 opportunities) offers step-less 2, 3, and 4-bedroom freehold homes from R3.175 million and serviced land from R1.25 million—supported on-site by Totalcare healthcare, Val’s Café, a heated indoor pool, and bowling green, right next to Marine Walk Shopping Centre.',
                'A Devmco Realty specialist from our Innova Haus Sales Centre (open 7 days a week) has your summary ready whenever you wish to visit.'
              ]
            : isHoaSplit
              ? [
                  'Hi ' + form.firstName + ',',
                  'Thank you for your enquiry regarding ' + form.secondary + ' at Salta Sibaya.',
                  'For investment buyers, Salta Estate (98% sold, family homes from R2.95M) currently sees long-term rental demand from R15,000 per month anchored by Marine Walk Shopping Centre, King Shaka Airport proximity, and Umhlanga corporate nodes, alongside remaining single/double-storey stands at Mt Cotton from R1.29M.',
                  'If your query relates to existing homeowner biometrics or levy administration, our HOA office at admin@saltasibaya.co.za handles those directly.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for enquiring about ' + form.secondary + ' at Salta Sibaya. Overlooking the Umdloti River valley and La Mercy Estuary above Marine Walk Shopping Centre, Solara Salta offers north-facing land from R1.2M and 3-bedroom plot-and-plan homes from R4.45M (87% sold), while Serenity Salta has just 2 opulent ocean villas remaining from R9.1M.',
                  'Residents enjoy direct access to Woolworths and SuperSPAR at Marine Walk, family dining at The Press Club, floodlit Playtomic Padel courts (05:00–21:00), and 5 km+ of coastal forest trails.',
                  'I have attached the verified layout pack and connected your brief directly to Devmco Realty at Ground Floor, Innova Haus.'
                ],
          attachments: isCapri
            ? ['Capri-Village-Phase-4-Stepless-Brochure.pdf', 'Totalcare-Healthcare-And-Clubhouse-Guide.pdf']
            : isHoaSplit
              ? ['Salta-Estate-Mt-Cotton-Investor-Fact-Sheet.pdf', 'Marine-Walk-Precinct-Overview.pdf']
              : ['Solara-Salta-Plot-And-Plan-Portfolio.pdf', 'Salta-Sibaya-SDP-And-Finishing-Schedule-V7.pdf']
        })
      },
      {
        num: '04',
        time: '01:10s',
        shortTitle: 'Innova Haus Precision Routing',
        chip: 'Ground Fl + 1st Fl synced',
        heading: '3-Way Handoff: Devmco · RainMaker · HOA Admin',
        summary:
          'Keeps admin@saltasibaya.co.za clean while handing pre-qualified, budget-tagged buyer briefs to Ground Floor sales and First Floor marketing.',
        meta: [
          { label: 'Sales Desk', value: 'Devmco Realty (087 550 1300 · Ground Floor, Innova Haus)' },
          { label: 'Marketing Desk', value: 'Stefan Botha / RainMaker (1st Floor, Innova Haus)' }
        ],
        previewTitle: 'Step 04 · Synchronized 3-Way Desk Routing',
        previewHtml: renderHandoffCards([
          {
            title: 'Devmco Realty Sales Brief (7-Day Sales Centre)',
            highlight: true,
            body:
              'Precinct: ' +
              form.secondary +
              ' · Tier: ' +
              form.tertiary +
              ' · Lead: ' +
              form.fullName +
              ' (' +
              form.phone +
              '). Brochure & verified pricing already delivered in 60s.'
          },
          {
            title: 'RainMaker CRM + HOA Admin Separation',
            highlight: false,
            body: 'Campaign conversion logged to RainMaker attribution dashboard; HOA Admin (admin@saltasibaya.co.za) completely shielded from sales overflow.'
          }
        ])
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Day 1 & 2 Precinct Nurture',
        chip: 'Auto-stops on reply',
        heading: 'Precinct Comparison & Innova Haus Visit Invite',
        summary:
          'Follows up with clear sub-village comparisons on Day 1 and an effortless 7-day Marine Walk Sales Centre invitation on Day 2.',
        meta: [
          { label: 'Day 1 (24h)', value: 'Compares selected village specs & answers top levy/build rules.' },
          { label: 'Day 2 (48h)', value: 'Invites visitor to Ground Floor, Innova Haus (open 7 days at Marine Walk).' }
        ],
        isFollowupStep: true,
        day1: {
          from: 'Devmco Realty · Salta Sibaya <info@devmcorealty.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Quick comparison across ' + form.secondary + ' at Salta Sibaya',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Following yesterday’s pack, buyers comparing ' + form.secondary + ' often ask about estate vs precinct levies, pet policies, and remaining plot orientations.',
            'If you would like specific erf plans or unit breakdowns (' + form.tertiary + '), simply reply here and our on-site specialist will send those straight over.'
          ],
          attachments: []
        },
        day2: {
          from: 'Salta Sibaya Sales Centre <info@saltasibaya.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Marine Walk & Innova Haus Sales Centre — open 7 days',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Whenever you are next in Umdloti, our Devmco Realty Sales Centre on the Ground Floor of Innova Haus at Marine Walk is open 7 days a week—a great base to pair a coffee at The Press Club with a look at the live estate masterplan.',
            'Just reply here if you would like any site details ready ahead of stopping by.'
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