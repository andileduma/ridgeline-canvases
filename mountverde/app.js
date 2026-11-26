/* ==========================================================================
   Ridgeline Studio — Pre-Viewing & Desk Routing Engine (Mount Verde Estate)
   W-28 / R-20 Breathing & Word-Cap Compliant Controller.
   Zero dashes (-, –, —) in outbound email subjects and narrative bodies.
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'mountverde';

  var PHOTOS = {
    farmette: 'https://mountverde.co.za/wp-content/uploads/2025/10/Agrihood-Estate-1080x810.jpg',
    village: 'https://mountverde.co.za/wp-content/uploads/2025/09/TheVillageSquare-1080x810.jpg',
    architecture: 'https://mountverde.co.za/wp-content/uploads/2025/10/Property-for-Sale-1080x810.jpg'
  };

  var state = {
    personaIndex: 0,
    submitted: false,
    activeStep: 1,
    activeFollowupDay: 'day1',
    animTimers: [],
    payload: null
  };

  var els = {
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
    els.inputFullName.value = s.fullName;
    els.inputEmail.value = s.email;
    els.inputPhone.value = s.phone;
    els.inputIntent.value = s.intent;
    els.inputSecondary.value = s.secondary;
    els.inputTertiary.value = s.tertiary;
    els.inputMessage.value = s.message;
    els.inputPopia.checked = true;
  }

  function renderPersonaContext() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    var persona = estate.personas[state.personaIndex] || estate.personas[0];

    els.contextPanelTitle.textContent = persona.title;
    els.contextPanelDesc.textContent = persona.shortDesc;
    els.contextQuestionsList.innerHTML = persona.questions
      .map(function (q) {
        return '<li>' + escapeHtml(q) + '</li>';
      })
      .join('');
    els.contextFixSummary.textContent = persona.fixSummary;
  }

  function renderPersonaLanes() {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    els.personaLanes.innerHTML = estate.personas
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
    els.auditSectionSubtitle.textContent =
      'Observed on mountverde.co.za while preparing where your enquiry desk connects.';

    els.auditRowsContainer.innerHTML = estate.auditRows
      .map(function (row) {
        return (
          '<div class="audit-row">' +
          '<div class="audit-before"><span class="audit-tag">Observed Today</span>' +
          escapeHtml(row.before) +
          '</div>' +
          '<div class="audit-after"><span class="audit-tag">With Your New Enquiry Desk</span>' +
          escapeHtml(row.after) +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    els.rulebookFaqList.innerHTML = estate.rulebookFaqs
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
          '<span class="faq-source-chip">Source: ' +
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
    var rawName = els.inputFullName.value.trim() || persona.sample.fullName;
    return {
      fullName: rawName,
      email: els.inputEmail.value.trim() || persona.sample.email,
      phone: els.inputPhone.value.trim() || persona.sample.phone,
      intent: els.inputIntent.value || persona.sample.intent,
      secondary: els.inputSecondary.value || persona.sample.secondary,
      tertiary: els.inputTertiary.value || persona.sample.tertiary,
      message: els.inputMessage.value.trim() || persona.sample.message,
      personaId: persona.id,
      personaTitle: persona.title,
      firstName: rawName.split(/\s+/)[0]
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
            '<p style="margin-top:6px; font-size:13.5px; line-height:1.58;">' +
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
    var photoHtml = mail.photo
      ? '<div class="email-photo-card">' +
        '<img src="' + escapeHtml(mail.photo.src) + '" alt="' + escapeHtml(mail.photo.alt) + '">' +
        '<div class="email-photo-caption">' + escapeHtml(mail.photo.caption) + '</div>' +
        '</div>'
      : '';

    var pillsHtml =
      mail.pills && mail.pills.length
        ? '<div class="attachment-chips">' +
          mail.pills
            .map(function (label) {
              return '<span class="attachment-chip">' + escapeHtml(label) + '</span>';
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
      photoHtml +
      pillsHtml +
      '</div>'
    );
  }

  function buildDynamicRoute(estate, form) {
    var intentLower = (form.intent + ' ' + form.secondary + ' ' + form.message).toLowerCase();
    var isVillage =
      form.personaId === 'marketing-deirdre' ||
      intentLower.includes('village square') ||
      intentLower.includes('lease');
    var isMvma =
      !isVillage &&
      (form.personaId === 'mvma-architect' ||
        intentLower.includes('architect') ||
        intentLower.includes('claridge') ||
        intentLower.includes('mvma'));

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: 'Warm Capture',
        chip: 'Forms & Links Fixed',
        heading: 'Instant Warm Confirmation on mountverde.co.za',
        summary:
          'Captures buyer context from Contact Us, Meadows B15, and your repaired homepage links in seconds.',
        meta: [
          { label: 'Captured Lane', value: form.intent },
          { label: 'Focus', value: form.secondary }
        ],
        previewTitle: 'Step 01 · Captured Enquiry Record',
        previewHtml: renderKvPayload([
          ['Visitor', form.fullName + ' (' + form.email + ')'],
          ['Phone / WhatsApp', form.phone],
          ['Lane', form.intent],
          ['Focus', form.secondary],
          ['Timing', form.tertiary],
          ['Question', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: 'Smart Sorting',
        chip: isMvma ? 'Routed to MVMA' : isVillage ? 'Brigid + CC Deirdre' : 'Direct to Brigid',
        heading: 'Routes Cleanly to Brigid, Deirdre, or MVMA',
        summary:
          'Separates Farmette buyers, Village Square leases, and architect rules before anyone is disturbed.',
        meta: [
          {
            label: 'Target Desk',
            value: isVillage
              ? 'Brigid Scheuer (Reallist) + CC Deirdre (Marketing)'
              : isMvma
                ? 'MVMA Office (info@mountverde.co.za) — off Brigid’s calendar'
                : 'Brigid Scheuer at Reallist (brigid@mountverde.co.za)'
          },
          {
            label: 'Why It Helps',
            value: isMvma
              ? 'Building paperwork never interrupts Brigid’s viewing calendar.'
              : 'No manual forwarding between Mount Verde inboxes.'
          }
        ],
        previewTitle: 'Step 02 · Desk Sorting Decision',
        previewHtml: renderHandoffCards([
          {
            title: isMvma
              ? 'Sent Straight to MVMA Office'
              : isVillage
                ? 'Brigid (Reallist) + CC Deirdre (Marketing)'
                : 'Priority Farmette Viewing → Brigid (Reallist)',
            highlight: true,
            body: isVillage
              ? 'Brigid leads the Village and lease viewing while Deirdre stays copied on Village Square tenant mix.'
              : isMvma
                ? 'May 2025 architectural rules and Claridge Gate queries go straight to MVMA—protecting Brigid’s calendar.'
                : 'Meadows B15 and Growers Collective buyers land exclusively on Brigid’s Reallist viewing desk.'
          },
          {
            title: 'Your Team Roles Stay Untouched',
            highlight: false,
            body: 'Deirdre’s marketing and Reallist’s exclusive sales role stay completely untouched.'
          }
        ])
      },
      {
        num: '03',
        time: '01:05s',
        shortTitle: 'Clear Reply',
        chip: 'Clear Written Reply',
        heading: 'Warm Plain-English Answer in Under Two Minutes',
        summary:
          form.firstName +
          ' receives a warm, clear explanation from your May 2025 rules—without heavy PDF booklets.',
        meta: [
          { label: 'Sent To', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Why It Helps', value: 'Buyers arrive informed without downloading heavy booklets on their phone.' }
        ],
        previewTitle: 'Step 03 · Outbound Plain-English Email (<2 Min)',
        previewHtml: renderEmailPreview({
          from: isMvma
            ? 'Mount Verde MVMA <info@mountverde.co.za>'
            : 'Brigid Scheuer Reallist <brigid@mountverde.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isVillage
            ? 'Your Mount Verde Village and Square Overview'
            : isMvma
              ? 'Your Mount Verde May 2025 Rules Summary'
              : 'Your Mount Verde Farmette and Viewing Guide',
          paragraphs: isVillage
            ? [
                'Hi ' + form.firstName + ', thank you for reaching out about Mount Verde Village and The Village Square.',
                'Mount Verde Village spans 247 hectares of acre homes, clusters, and senior living just 1.5 kilometres from Hilton Village and minutes from Hilton College, St Annes, and Life Hospital.',
                'The Village Square offers 35 to 1,000 square metre heritage barn leases. Brigid and Deirdre have your note and will arrange your visit.'
              ]
            : isMvma
              ? [
                  'Hi ' + form.firstName + ', thank you for checking Mount Verde Estates May 2025 Development Controls before submitting plans.',
                  'Homes follow a contemporary barn palette with corrugated metal, stone, natural timber, and 20 percent energy savings. Second dwellings add 25 percent under 500 square metres or 50 percent above.',
                  'Builds need a R10,000 deposit, R1,000 monthly levy, and Claridge Gate access for trucks over 3.5 tonnes. MVMA will confirm your review slot.'
                ]
              : [
                  'Hi ' + form.firstName + ', thank you for enquiring about Meadows B15 at Mount Verde in Hilton.',
                  'You never have to farm yourself. Growers Collective manages the farmland and pays market rental. Each Farmette allows two homesteads plus one barn, permissible boreholes, and no build deadline.',
                  'There is no transfer duty and a R5,500 monthly base levy. Brigid Scheuer at Reallist will confirm your viewing.'
                ],
          photo: isVillage
            ? { src: PHOTOS.village, alt: 'The Village Square heritage barns', caption: 'The Village Square · 247 ha Mount Verde Village' }
            : isMvma
              ? { src: PHOTOS.architecture, alt: 'Mount Verde contemporary barn architecture', caption: 'Ridge Farmettes · May 2025 Barn Controls' }
              : { src: PHOTOS.farmette, alt: 'Mount Verde 750 hectare rolling farmland', caption: '750 ha Hilton Agrihood · Meadows & Ridge' },
          pills: isVillage
            ? ['Confirm Village Tour', 'View Square Spaces']
            : isMvma
              ? ['Book MVMA Review', 'Claridge Gate Info']
              : ['Book Meadows B15 Tour', 'Speak With Brigid']
        })
      },
      {
        num: '04',
        time: '01:12s',
        shortTitle: 'Team Brief',
        chip: 'Evenings & Weekends',
        heading: isMvma
          ? 'Clear Rule Brief Delivered to MVMA'
          : 'Short Viewing Brief & 08:00 AM Queue',
        summary: isMvma
          ? 'MVMA receives a crisp brief while Brigid’s viewing calendar stays free of admin.'
          : 'Brigid opens one short summary, including night and weekend enquiries ready for 08:00 AM.',
        meta: [
          {
            label: 'Delivered To',
            value: isMvma
              ? 'MVMA Office (info@mountverde.co.za)'
              : isVillage
                ? 'Brigid Scheuer + CC Deirdre Kallmeyer-Mooljee'
                : 'Brigid Scheuer · Reallist (brigid@mountverde.co.za)'
          },
          {
            label: 'Evenings & Weekends',
            value: 'Night and weekend buyers answered warmly, ready for 08:00 AM.'
          }
        ],
        previewTitle: 'Step 04 · Team Brief & After-Hours Queue',
        previewHtml: renderHandoffCards([
          {
            title: 'Short Viewing Summary — ' + form.fullName,
            highlight: true,
            body:
              form.intent +
              ' | ' +
              form.secondary +
              ' | ' +
              form.phone +
              '. Clear 2025 overview already sent; visitor is ready for next steps.'
          },
          {
            title: 'Evenings & 08:00 AM Viewing Handoff',
            highlight: false,
            body: isMvma
              ? 'MVMA office to confirm sketch-plan review slot; Brigid’s Reallist calendar stays untouched.'
              : 'Even if submitted Sunday night, the buyer already received warm answers and is ready for Brigid at 08:00 AM Monday.'
          }
        ])
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Follow-Ups',
        chip: 'Stops on Reply',
        heading: 'Gentle Follow-Ups That Stop When They Reply',
        summary:
          'Gentle Day 1 and Day 2 Midlands notes bring silent buyers back to book with Brigid.',
        meta: [
          { label: 'Day 1 (24h)', value: 'Checks that the plain-English overview arrived cleanly.' },
          { label: 'Day 2 (48h)', value: 'Invites a relaxed Hilton tour; cancels instantly on reply.' }
        ],
        isFollowupStep: true,
        day1: {
          from: isMvma
            ? 'Mount Verde MVMA <info@mountverde.co.za>'
            : 'Brigid Scheuer Reallist <brigid@mountverde.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Checking your Mount Verde overview arrived cleanly',
          paragraphs: [
            'Hi ' + form.firstName + ', just checking that our plain English overview arrived cleanly yesterday.',
            'If any questions came up around levies, building rules, or timing your move to Hilton, simply reply here.',
            'We would love to help you plan your next step whenever you are ready.'
          ],
          photo: isVillage
            ? { src: PHOTOS.village, alt: 'The Village Square', caption: 'Mount Verde Village · Hilton' }
            : { src: PHOTOS.farmette, alt: 'Mount Verde rolling hills', caption: 'Mount Verde Estate · 750 ha Agrihood' },
          pills: ['Reply to Team', 'Pick Viewing Day']
        },
        day2: {
          from: isMvma
            ? 'Mount Verde MVMA <info@mountverde.co.za>'
            : 'Brigid Scheuer Reallist <brigid@mountverde.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: 'Walking the Hilton pastures at Mount Verde in person',
          paragraphs: [
            'Hi ' + form.firstName + ', photos show the hills well, yet standing above the dams in morning mist is what makes families fall in love with Mount Verde.',
            'Whenever you are next in Hilton, reply with a preferred morning or afternoon.',
            'Brigid will arrange your private gate access and unhurried tour.'
          ],
          photo: { src: PHOTOS.architecture, alt: 'Mount Verde Midlands view', caption: 'Private Viewings · By Appointment' },
          pills: ['Book Morning Tour', 'Book Afternoon Tour']
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

    els.routeProgressFill.style.width = state.activeStep * 20 + '%';
    els.routeNodesGrid.innerHTML = steps
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

    els.stageStepBadge.textContent = 'Step ' + currentStep.num + ' · ' + currentStep.time;
    els.stageTimeChip.textContent = currentStep.chip;
    els.stageHeading.textContent = currentStep.heading;
    els.stageSummary.textContent = currentStep.summary;
    els.stageMetaCards.innerHTML = currentStep.meta
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

    els.prevStepBtn.disabled = state.activeStep <= 1;
    els.nextStepBtn.disabled = state.activeStep >= 5;

    if (currentStep.isFollowupStep) {
      els.followupTabs.hidden = false;
      els.previewWindowTitle.textContent =
        state.activeFollowupDay === 'day1'
          ? 'Step 05 · Day 1 Lifestyle Follow-Up (24h)'
          : 'Step 05 · Day 2 Lifestyle Follow-Up (48h)';
      var mailData = state.activeFollowupDay === 'day1' ? currentStep.day1 : currentStep.day2;
      els.previewBody.innerHTML = renderEmailPreview(mailData);
    } else {
      els.followupTabs.hidden = true;
      els.previewWindowTitle.textContent = currentStep.previewTitle;
      els.previewBody.innerHTML = currentStep.previewHtml;
    }

    els.previewBody.style.animation = 'none';
    void els.previewBody.offsetWidth;
    els.previewBody.style.animation = '';

    els.simStatusPill.textContent = state.submitted
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
    document.title = estate.name + ' — Pre-Viewing & Desk Routing Walkthrough | Ridgeline Studio';

    els.brandCrest.innerHTML = estate.crestSvg;
    els.brandName.textContent = estate.name;
    els.brandLocation.textContent = estate.location;
    els.heroEyebrow.textContent = estate.eyebrow;
    els.heroDomain.textContent = estate.domain;
    els.heroTitle.textContent = estate.heroTitle;
    els.heroLead.textContent = estate.heroLead;

    els.heroMetricsStrip.innerHTML = estate.metrics
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

    els.heroArchitecturalSvg.innerHTML = estate.heroSvg;
    els.deskCardTitle.textContent = estate.deskTitle;
    els.deskCardContact.textContent = estate.deskContact;
    els.deskNuanceCopy.textContent = estate.deskNuance;
    els.deskLeakageCopy.textContent = estate.deskLeakage;

    els.phase1Subtitle.textContent =
      'Select any visitor scenario below to auto-fill realistic Mount Verde details, or enter your own question.';
    els.formCardTitle.textContent = estate.formTitle;
    els.labelSecondary.textContent = estate.secondaryLabel;
    els.labelTertiary.textContent = estate.tertiaryLabel;
    els.popiaCopy.textContent = estate.popiaNote;

    renderSelectOptions(els.inputIntent, estate.intentOptions, estate.personas[0].sample.intent);
    renderSelectOptions(els.inputSecondary, estate.secondaryOptions, estate.personas[0].sample.secondary);
    renderSelectOptions(els.inputTertiary, estate.tertiaryOptions, estate.personas[0].sample.tertiary);

    renderPersonaLanes();
    renderPersonaContext();
    applySampleData(estate.personas[0]);
    renderRouteStage();
    renderAuditAndFaqs(estate);

    els.footerAttribution.textContent =
      'Prepared privately for Brigid Scheuer (Reallist) and Deirdre Kallmeyer-Mooljee (Mount Verde Estate) — nothing altered on mountverde.co.za.';
  }

  els.personaLanes.addEventListener('click', function (e) {
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

  els.fillSampleBtn.addEventListener('click', function () {
    var estate = window.ESTATES_DATA[ESTATE_ID];
    applySampleData(estate.personas[state.personaIndex] || estate.personas[0]);
  });

  els.simulatorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!els.inputPopia.checked) {
      els.inputPopia.focus();
      els.simStatusPill.textContent = 'Please confirm POPIA consent before running walkthrough';
      return;
    }
    runRouteAnimation();
    els.phaseCanvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  els.routeNodesGrid.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-step-num]');
    if (!btn) return;
    clearAnimTimers();
    state.activeStep = Number(btn.getAttribute('data-step-num'));
    renderRouteStage();
  });

  els.prevStepBtn.addEventListener('click', function () {
    clearAnimTimers();
    if (state.activeStep > 1) {
      state.activeStep -= 1;
      renderRouteStage();
    }
  });

  els.nextStepBtn.addEventListener('click', function () {
    clearAnimTimers();
    if (state.activeStep < 5) {
      state.activeStep += 1;
      renderRouteStage();
    }
  });

  els.followupTabs.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-day]');
    if (!tab) return;
    state.activeFollowupDay = tab.getAttribute('data-day');
    els.followupTabs.querySelectorAll('.followup-tab').forEach(function (t) {
      t.classList.toggle('is-active', t === tab);
    });
    renderRouteStage();
  });

  els.replayRouteBtn.addEventListener('click', function () {
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

  els.resetCanvasBtn.addEventListener('click', resetToCapture);
  els.resetSimHeaderBtn.addEventListener('click', resetToCapture);

  els.rulebookFaqList.addEventListener('click', function (e) {
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