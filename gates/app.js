/* ==========================================================================
   Ridgeline Studio — Interactive Enquiry & Desk Routing Engine (The Gates at Hilton)
   Strictly isolated single-estate controller (zero switcher / outcome-first copy).
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'gates';

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
    var isArch = pId === 'architect' || intentLower.includes('architect') || intentLower.includes('arc') || intentLower.includes('rev-');
    var isRes = pId === 'resident' || intentLower.includes('resident') || intentLower.includes('clubhouse');
    var phaseCode = intentLower.includes('rev-k') ? 'Building-Design-Code-Phase-1-Rev-K.pdf' : 'Building-Design-Code-Phase-2-Rev-D.pdf';

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: 'Zero-Drop Office Capture',
        chip: 'Replaces 0-form /contact-us/',
        heading: 'Instant Capture From gatesathilton.co.za',
        summary:
          'Captures structured visitor intent directly on the website instead of dumping an unformatted email onto office@gwenstream.co.za.',
        meta: [
          { label: 'Captured Source', value: 'gatesathilton.co.za · Structured Triage Form (replaces 4 lines of plain static text)' },
          { label: 'Intent Tagged', value: form.intent + ' (' + form.secondary + ')' },
          { label: 'Marketing Boundary', value: 'Respects existing marketing team — operates strictly inside Estate Office support.' }
        ],
        previewTitle: 'Step 01 · Captured Office Log Entry',
        previewHtml: renderKvPayload([
          ['Enquirer', form.fullName + ' (' + form.email + ')'],
          ['Phone / WhatsApp', form.phone],
          ['Classified Lane', form.intent],
          ['Phase / Focus', form.secondary],
          ['Timeline', form.tertiary],
          ['Raw Message', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: 'Instant Document & Rulebook Match',
        chip: 'Indexes 16 /downloads/ files',
        heading: 'Cross-References Gates Governance & Club Rules',
        summary:
          'The routing engine cross-references the exact statutory PDFs already living on gatesathilton.co.za/downloads/ to resolve routine policy facts before Denise ever sees the ticket.',
        meta: [
          {
            label: 'Documents Verified',
            value: isArch
              ? phaseCode + ', ARC-Submission-Form.pdf, Building_Procedures_20_03_15.pdf, Rules-for-Contractors.pdf'
              : isRes
                ? 'THE-GATES-AT-HILTON-Rules-for-Residents.pdf, The-Gates-Security-Protocol.pdf'
                : 'Resale-Agreement-18.7.25-1.pdf, MOI.pdf, Fleur-de-Lys Club & 1,762 ha Reserve Rules'
          },
          {
            label: 'Decision Logic',
            value: isArch
              ? 'Confirmed Cape Dutch code + TMJ Attorneys R20,000 builder deposit workflow.'
              : isRes
                ? 'Resolved autonomously against Resident Rules — zero manual desk work needed.'
                : 'Verified ~2,000 sqm stand context & weekday Reserve limits; escalated qualified Buyer Brief to Denise.'
          }
        ],
        previewTitle: 'Step 02 · Real-Time Rule Verification Engine',
        previewHtml: renderHandoffCards([
          {
            title: 'Official Documents Matched (Zero Guesswork)',
            highlight: true,
            body: isArch
              ? 'Matched ' + phaseCode + ' with mandatory ARC submission fee rules (paid to Gwens Stream Estates) and TMJ Attorneys R20,000 builder deposit requirement.'
              : isRes
                ? 'Matched Estate Clubhouse (unlicensed), quiet curfew (21:00 Sun–Thu / 23:00 Fri–Sat), contractor gate start (07:00 weekdays / 08:00 weekends), pool glass ban, and motorbike ban.'
                : 'Matched 81 homes on 44.3 ha bordering the 1,762 ha Hilton College Nature Reserve (~300 bird species), annual Fleur-de-Lys Club membership, and mandatory Resale-Agreement-18.7.25-1.pdf.'
          },
          {
            title: 'Office Workload Impact',
            highlight: false,
            body: isRes
              ? '100% deflected from Denise’s manual inbox with an optional read-only log entry.'
              : 'Eliminated 3–4 rounds of manual PDF attachments and rule clarification emails.'
          }
        ])
      },
      {
        num: '03',
        time: '01:08s',
        shortTitle: 'Sub-2-Min Narrative Reply',
        chip: 'Sent to ' + form.email,
        heading: 'Warm Midlands Narrative Email + Exact Attachments',
        summary:
          'Instead of a cold auto-receipt (or waiting hours for a manual office reply), ' +
          form.firstName +
          ' receives a personal, grounded response in just over a minute.',
        meta: [
          { label: 'Recipient', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Delivery SLA', value: '68 seconds from website submission' }
        ],
        previewTitle: 'Step 03 · Outbound Prospect / Resident Email (<2 Min)',
        previewHtml: renderEmailPreview({
          from: 'Estate Office · The Gates at Hilton <office@gwenstream.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isArch
            ? 'Phase Design Code & ARC Pack — The Gates at Hilton'
            : isRes
              ? 'Estate Clubhouse & Resident Guidelines — The Gates at Hilton'
              : 'Welcome to The Gates at Hilton — Fleur-de-Lys Club & Resale Overview',
          paragraphs: isArch
            ? [
                'Hi ' + form.firstName + ',',
                'Thank you for reaching out regarding ' + form.secondary + ' at The Gates at Hilton. To save you searching through the downloads page, I have attached the matching Cape Dutch Design Code alongside the ARC Submission Form and Building Procedures.',
                'As a quick note for your project checklist: plans require Architectural Review Committee approval with Gwens Stream Estates, boundary pegs must be verified on site, and contractor builder deposits (R20,000) are lodged with TMJ Attorneys prior to breaking ground.',
                'Our Estate Office has received your submission summary and will confirm any erf-specific query promptly.'
              ]
            : isRes
              ? [
                  'Hi ' + form.firstName + ',',
                  'Thanks for your message. Here is a quick summary from the Residents’ Rules for your upcoming gathering: the on-site Estate Clubhouse and pool area are available for resident bookings (please note the clubhouse is unlicensed, and glass containers are not permitted near the pool).',
                  'For reference, quiet hours begin at 21:00 Sunday–Thursday and 23:00 Friday–Saturday, contractor access opens at 07:00 weekdays (08:00 weekends), and non-parent Fleur-de-Lys Club members enjoy regulated weekday access to the Hilton College Nature Reserve during term time.',
                  'I have attached the Residents’ Rules and Security Protocol below for easy reference.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for getting in touch with The Gates at Hilton. With 81 homes set across 44.3 hectares right beside the 1,762-hectare Hilton College Estate and Gwens Stream Gorge, families looking for quiet Midlands heritage living and effortless school proximity tend to feel right at home here.',
                  'Homeowners may apply for annual Fleur-de-Lys Club membership (covering the licensed campus clubhouse, squash courts, pool, driving range, and walking/cycling trails, with regulated weekday Nature Reserve access during term time), alongside our own on-estate Clubhouse and pool.',
                  'Because resales follow our standardised HOA process, I have attached the mandatory Resale Offer to Purchase (18.7.25) and Memorandum of Incorporation. I have also passed a clean summary of your enquiry to Denise Venter in our Estate Office so she has full context when assisting you next.'
                ],
          attachments: isArch
            ? [phaseCode, 'ARC-Submission-Form.pdf', 'Building_Procedures_20_03_15.pdf', 'The-Gates-RULES-FOR-CONTRACTORS.pdf']
            : isRes
              ? ['THE-GATES-AT-HILTON-Rules-for-Residents.pdf', 'The-Gates-Security-Protocol.pdf']
              : ['Resale-Agreement-18.7.25-1.pdf', 'Memorandum-of-Incorporation-Updated-15.8.18.pdf']
        })
      },
      {
        num: '04',
        time: '01:15s',
        shortTitle: 'Clean Denise Desk Brief',
        chip: 'Zero marketing overlap',
        heading: 'Executive Handoff to Denise (office@gwenstream.co.za)',
        summary:
          'Denise never has to dig through vague inbox threads. She receives one crisp, pre-qualified operational brief showing the exact documents and guidance already sent.',
        meta: [
          { label: 'Delivered To', value: 'Denise Venter — Gwens Stream Estates (office@gwenstream.co.za)' },
          { label: 'Marketing Isolation', value: 'Zero interference with your existing external marketing person.' }
        ],
        previewTitle: 'Step 04 · Internal Brief Delivered to Denise',
        previewHtml: renderHandoffCards([
          {
            title: '1-Paragraph Executive Brief — ' + form.fullName,
            highlight: true,
            body:
              'Intent: ' +
              form.intent +
              ' (' +
              form.secondary +
              ', ' +
              form.tertiary +
              '). Contact: ' +
              form.email +
              ' / ' +
              form.phone +
              '. Summary: “' +
              form.message +
              '” Action already completed: Sub-2-minute warm response sent with matching official PDFs attached.'
          },
          {
            title: 'Recommended Next Step for Denise',
            highlight: false,
            body: isRes
              ? 'Log only — no manual reply required unless resident requests a specific Clubhouse date reservation.'
              : 'Reply directly when ready with current levy schedule / stand clearance confirmation (zero basic FAQ repetition needed).'
          }
        ])
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Day 1 & 2 Follow-Ups',
        chip: 'Auto-stops on reply',
        heading: 'Gentle Follow-Ups That Stop the Moment They Reply',
        summary:
          'Keeps enquiries warm without manual chasing—and cancels automatically the second ' +
          form.firstName +
          ' replies to Denise or the office.',
        meta: [
          { label: 'Day 1 (24h)', value: 'Checks that the attached PDFs and estate guidelines came through clearly.' },
          { label: 'Day 2 (48h)', value: 'Offers office assistance from Gwens Stream Estates whenever ready.' },
          { label: 'Stop Rule', value: 'Auto-cancels immediately upon any inbound reply from ' + form.email + '.' }
        ],
        isFollowupStep: true,
        day1: {
          from: 'Estate Office · The Gates at Hilton <office@gwenstream.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Checking you received The Gates at Hilton documents',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Just a quick note to make sure the PDF documents we sent yesterday arrived cleanly and answered your initial questions on ' + form.secondary + '.',
            'If you would like any detail on HOA levies, architectural review timelines, or Fleur-de-Lys Club guidelines clarified, simply hit reply here and our office will gladly help.'
          ],
          attachments: []
        },
        day2: {
          from: 'Denise Venter · Gwens Stream Estates <office@gwenstream.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Midlands visit or office questions — The Gates at Hilton',
          paragraphs: [
            'Hi ' + form.firstName + ',',
            'Whenever you are next in Hilton along Hilton College Avenue and have questions for the Estate Office regarding ' + form.intent + ', feel free to reply to this email or call us on (+27) 33 383 3014.',
            'Warm regards, Estate Office — Gwens Stream Estates'
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