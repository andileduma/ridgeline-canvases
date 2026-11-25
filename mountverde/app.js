/* ==========================================================================
   Ridgeline Studio — Pre-Viewing & Desk Routing Walkthrough (Mount Verde Estate)
   Option A: 100% Outcome-First, Zero Feature Selling, Zero Tech Jargon.
   Strictly isolated single-estate controller (zero multi-estate switcher).
   Zero dashes (-, –, —) in outbound email preview subjects & narrative bodies.
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'mountverde';

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
      'mountverde.co.za already inspires families with the Hilton agrihood vision. When we connect your Pre-Viewing Desk, we fix these 4 silent last-mile dead-ends as part of one unified step.';

    dom.auditRowsContainer.innerHTML = estate.auditRows
      .map(function (row) {
        return (
          '<div class="audit-row">' +
          '<div class="audit-before"><span class="audit-tag">Quiet Leak Today</span>' +
          escapeHtml(row.before) +
          '</div>' +
          '<div class="audit-after"><span class="audit-tag">Fixed With Option A</span>' +
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
    var rawName = dom.inputFullName.value.trim() || persona.sample.fullName;
    return {
      fullName: rawName,
      email: dom.inputEmail.value.trim() || persona.sample.email,
      phone: dom.inputPhone.value.trim() || persona.sample.phone,
      intent: dom.inputIntent.value || persona.sample.intent,
      secondary: dom.inputSecondary.value || persona.sample.secondary,
      tertiary: dom.inputTertiary.value || persona.sample.tertiary,
      message: dom.inputMessage.value.trim() || persona.sample.message,
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

  function renderHandoffCards(cards, afterHoursBanner) {
    var bannerHtml = afterHoursBanner
      ? '<div class="afterhours-banner">' +
        '<span class="mono-label">' +
        escapeHtml(afterHoursBanner.label) +
        '</span>' +
        '<p>' +
        escapeHtml(afterHoursBanner.text) +
        '</p>' +
        '</div>'
      : '';

    return (
      bannerHtml +
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
            '<p style="margin-top:6px; font-size:13.4px; line-height:1.62;">' +
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
    var badgeHtml = mail.badge
      ? '<div class="plain-english-badge">&#10003; ' + escapeHtml(mail.badge) + '</div>'
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
      badgeHtml +
      '</div>'
    );
  }

  function buildDynamicRoute(estate, form) {
    var intentLower = (form.intent + ' ' + form.secondary + ' ' + form.message).toLowerCase();
    var isVillage =
      form.personaId === 'village-commercial' ||
      intentLower.includes('village square') ||
      intentLower.includes('hamlets') ||
      intentLower.includes('lease');
    var isMvma =
      !isVillage &&
      (form.personaId === 'mvma-architect-rules' ||
        intentLower.includes('architect') ||
        intentLower.includes('contractor') ||
        intentLower.includes('claridge') ||
        intentLower.includes('development controls') ||
        intentLower.includes('may 2025'));

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: 'Warm Confirmation',
        chip: 'Repaired Last-Mile Capture',
        heading: 'Instant Warm Confirmation & Clean Entry Capture',
        summary:
          'Visitors coming from the repaired homepage cards, Contact Us, Meadows B15, or Farmettes For Sale never hit a dead end—they get an immediate warm greeting while their exact interest is captured clearly.',
        meta: [
          {
            label: 'Last-Mile Leak Closed',
            value: isVillage
              ? 'Replaces the broken Village Square 404 card and captures Village residential vs. commercial lease intent on one page.'
              : isMvma
                ? 'Replaces the dead /contact-us/#cont-form link on the Architecture page so architects reach MVMA without ringing sales.'
                : 'Replaces the missing form on Contact Us and Meadows B15 (R3,904,250) and adds full context to the 4-field Farmettes form.'
          },
          { label: 'Visitor Interest', value: form.intent },
          { label: 'Focus Area', value: form.secondary }
        ],
        previewTitle: 'Step 01 · Captured Enquiry & Warm Welcome',
        previewHtml: renderKvPayload([
          ['Visitor', form.fullName + ' (' + form.email + ')'],
          ['Mobile / WhatsApp', form.phone],
          ['Enquiry Type', form.intent],
          ['Mount Verde Focus', form.secondary],
          ['Pre-Viewing Need', form.tertiary],
          ['Exact Question Asked', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: 'Smart Desk Sorting',
        chip: isMvma ? 'Deflected to MVMA' : isVillage ? 'Brigid + CC Deirdre' : 'Direct to Brigid',
        heading: 'Right Person Every Time (Brigid, Deirdre, or MVMA)',
        summary:
          'Separates serious property buyers, Village Square commercial interest, and architectural or contractor admin in seconds—so Brigid’s sales calendar stays focused exclusively on viewings and deals.',
        meta: [
          {
            label: 'Assigned Mount Verde Desk',
            value: isVillage
              ? 'Primary: Brigid Scheuer (Reallist · brigid@mountverde.co.za) with automatic CC to Deirdre Kallmeyer-Mooljee (marketing@mountverde.co.za) for Village Square commercial and community alignment.'
              : isMvma
                ? 'Routed straight to MVMA Estate & Development Controls Office (info@mountverde.co.za) — 100% deflected off Brigid Scheuer’s sales calendar.'
                : 'Routed exclusively to Brigid Scheuer at Reallist (brigid@mountverde.co.za) as a high-intent Farmette viewing candidate.'
          },
          {
            label: 'Time Saved for the Team',
            value: isMvma
              ? 'Zero architect rules, Claridge Gate truck permits, or pet queries interrupting Brigid’s buyer appointments.'
              : 'Zero manual email forwarding between info@mountverde.co.za, Marketing, and Reallist.'
          }
        ],
        previewTitle: 'Step 02 · Exact Desk Routing Decision',
        previewHtml: renderHandoffCards([
          {
            title: isMvma
              ? 'Deflected Off Sales Calendar → MVMA Governance Desk'
              : isVillage
                ? 'Dual Alignment → Brigid Scheuer (Reallist) + CC Deirdre (Marketing)'
                : 'Exclusive Sales Priority → Brigid Scheuer (Reallist)',
            highlight: true,
            body: isVillage
              ? 'Because this visitor is enquiring about Mount Verde Village residential life and a 180 sqm Village Square heritage-barn lease, Brigid leads the property and lease conversation while Deirdre stays copied for brand and Village Square tenant mix visibility.'
              : isMvma
                ? 'Because this enquiry is about May 2025 Development Controls, Claridge Gate heavy-truck access, and construction deposits, it goes straight to MVMA (info@mountverde.co.za). Brigid never loses viewing hours to compliance admin.'
                : 'Because this family is evaluating Meadows B15 (R3,904,250 incl. VAT) and Growers Collective hands-off farming, it is flagged as a priority Farmette viewing for Brigid Scheuer under Reallist’s exclusive on-site mandate.'
          },
          {
            title: 'Respecting Mount Verde’s Existing Team',
            highlight: false,
            body: 'Deirdre’s marketing campaigns and brand storytelling stay 100% untouched, and Reallist remains the sole sales partner. The desk simply makes sure every enquiry lands cleanly with the right person.'
          }
        ])
      },
      {
        num: '03',
        time: '01:05s',
        shortTitle: 'Clear Written Answer',
        chip: 'Zero 60 MB PDF Dumping',
        heading: 'Plain-English Answer Directly in Their Inbox (No 60 MB PDF Wall)',
        summary:
          'Taught Mount Verde’s May 2025 Development Controls, Farmette purchase terms, and Growers Collective model, the desk writes ' +
          form.firstName +
          ' a warm, accurate plain-English explanation of exactly what they asked—so they arrive informed without struggling through 162 pages of PDFs on their phone.',
        meta: [
          { label: 'Sent Directly To', value: form.fullName + ' <' + form.email + '>' },
          {
            label: 'Why Buyers Love This',
            value: 'Zero locked 2022 flipbooks or 15 MB downloads forced on mobile—every question is answered clearly right inside the message.'
          }
        ],
        previewTitle: 'Step 03 · Clear Written Pre-Viewing Reply (<2 Min)',
        previewHtml: renderEmailPreview({
          from: isMvma
            ? 'Mount Verde Management Association <info@mountverde.co.za>'
            : 'Mount Verde Sales Desk Reallist <brigid@mountverde.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isVillage
            ? 'Your Mount Verde Village and Village Square Lease Overview'
            : isMvma
              ? 'Your Mount Verde May 2025 Architectural and Estate Rules Summary'
              : 'Your Mount Verde Farmette and Growers Collective Viewing Guide',
          paragraphs: isVillage
            ? [
                'Hi ' + form.firstName + ',',
                'Thank you for getting in touch with Mount Verde Estate in Hilton. It is wonderful to hear your family is planning a move to the Midlands schools and exploring a space in The Village Square.',
                'To clarify the two residential environments upfront: Mount Verde Ridge spans 454 hectares of larger 3 to 7 hectare Farmettes, whereas Mount Verde Village spans 247 hectares surrounding The Village Square with intimate residential clusters from 700 to 4,000 square metres and up to just under 2 hectares. Village options include acre homes, cluster homes, row houses, apartments, and senior living, all within 1.5 kilometres of Hilton Village, 1.7 kilometres of the N3, and minutes from Hilton College, St Annes, Michaelhouse, and Life Hilton Private Hospital.',
                'In The Village Square, repurposed heritage farm barns offer flexible commercial and artisanal spaces from 35 to 1,000 square metres for farm to table eateries, bakeries, studios, and offices. Brigid Scheuer at Reallist has your brief alongside Deirdre from our estate marketing team and will reach out to arrange your estate tour and walk you through current Village Square lease availability.'
              ]
            : isMvma
              ? [
                  'Hi ' + form.firstName + ',',
                  'Thank you for checking Mount Verde Estates current building and governance standards ahead of your Ridge Boulevard sketch plans. Here is a clear summary directly from the updated May 2025 Development Controls Version 103 so you do not have to sift through older 2022 downloads.',
                  'Mount Verde follows a contemporary Midlands barn vernacular featuring corrugated sheet metal roofing and vertical cladding, local stone walls, unpainted concrete, natural timber, copper patina, and a single restrained accent colour, paired with a mandatory 20 percent reduction in operational energy and water against SANS baselines. Under Section 4.11 of the May 2025 Controls, a second dwelling carries a plus 25 percent levy adjustment when under 500 square metres and plus 50 percent when over 501 square metres on top of the approximately R5,500 monthly base MVMA levy.',
                  'For site preparation, individual stands require a R10,000 refundable damage deposit, a R1,000 monthly construction levy, and an MVMA appointed Environmental Control Officer. All construction vehicles over 3.5 tonnes enter strictly via Claridge Gate, while contractor teams register for biometric access through Maqwood Gate. Farmettes allow up to 4 dogs, 2 cats, and horses, and residential stays must exceed 30 days with prior MVMA consent. Our MVMA office has received your project details and will confirm your sketch plan review slot.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for enquiring about Meadows B15 and life on our 750 hectare Hilton agrihood. Many families relocating from Johannesburg ask the exact same questions before visiting, so here is a clear overview ahead of your viewing with Brigid Scheuer.',
                  'First, you never have to farm the land yourself. While 90 percent of each Farmette remains preserved for agriculture, landowners who prefer a completely hands off lifestyle can lease their farmland to Growers Collective, our dedicated on site agricultural company, which farms the land sustainably and pays you a market related rental. Second, each Farmette allows two homesteads plus one barn inside the 10 percent residential footprint, making multigenerational living effortless, and there is no calendar deadline to start building.',
                  'Meadows B15 is one of the last two Farmettes available in The Meadows at R3,904,250 including VAT, while wider Ridge Farmettes range from R2.05M to R6.8M excluding VAT. Purchases carry zero transfer duties, can be structured as a going concern, and require a 10 percent deposit with 30 days for finance. Boreholes are permissible alongside rainwater harvesting, and the base MVMA monthly levy is approximately R5,500. Brigid Scheuer at Reallist has received your note and will confirm your private estate viewing.'
                ],
          badge: 'Plain-English Answer Directly in Email Body · Zero 60 MB PDF Attachments Forced on Mobile'
        })
      },
      {
        num: '04',
        time: '01:12s',
        shortTitle: 'Viewing Brief & 24/7',
        chip: 'Includes After-Hours & Weekend',
        heading: isMvma
          ? 'Clean Compliance Brief to MVMA (Brigid Stays Uninterrupted)'
          : 'Pre-Briefed Viewing Card for Brigid + After-Hours Coverage',
        summary: isMvma
          ? 'MVMA receives one concise compliance brief while Brigid’s Reallist desk sees zero architectural admin—protecting her viewing hours.'
          : 'Brigid opens one clean summary knowing ' +
            form.firstName +
            ' already understands Mount Verde’s agrihood rules, terms, and lifestyle—even when the enquiry arrived at 9:30 PM on a Sunday evening.',
        meta: [
          {
            label: 'Who Receives This Summary',
            value: isMvma
              ? 'MVMA Estate & Development Controls Office (info@mountverde.co.za)'
              : isVillage
                ? 'Brigid Scheuer (brigid@mountverde.co.za) + CC Deirdre Kallmeyer-Mooljee (marketing@mountverde.co.za)'
                : 'Brigid Scheuer · Lead Property Consultant, Reallist (brigid@mountverde.co.za)'
          },
          {
            label: 'After-Hours & Weekend Protection',
            value: 'Evening and weekend Gauteng semigration buyers receive warm answers immediately while the office is closed, so Brigid starts Monday morning with ready-to-book viewings.'
          }
        ],
        previewTitle: 'Step 04 · Pre-Briefed Viewing Card & After-Hours Capture',
        previewHtml: renderHandoffCards(
          [
            {
              title: '1-Paragraph Pre-Briefed Summary — ' + form.fullName,
              highlight: true,
              body:
                'Interest: ' +
                form.intent +
                ' | Focus: ' +
                form.secondary +
                ' | Contact: ' +
                form.email +
                ' / ' +
                form.phone +
                '. Visitor question: “' +
                form.message +
                '” Clear written explanation from Mount Verde’s May 2025 rules and purchase terms already sent—visitor is informed and ready for next steps.'
            },
            {
              title: 'Ready-to-Act Next Step (Zero Repetitive FAQ Calls)',
              highlight: false,
              body: isMvma
                ? 'MVMA office to confirm sketch-plan submission dates and ECO allocation with Pieter Nel; Brigid’s sales calendar remains 100% untouched.'
                : isVillage
                  ? 'Brigid to confirm Mount Verde Village hamlet tour times and share current 180 sqm Village Square heritage-barn lease availability (Deirdre copied for tenant mix alignment).'
                  : 'Brigid to confirm a private Meadows B15 and Ridge Boulevard viewing slot—buyer already understands Growers Collective rental, 2 homesteads + 1 barn, 10% deposit, and ~R5,500/mo levy.'
            }
          ],
          {
            label: 'After-Hours & Weekend Pre-Viewing System Active (Mon–Fri After 17:00 & Weekends)',
            text: 'When a Johannesburg family browses Meadows B15 on Sunday at 20:45 while the Hilton office is closed, they still receive Mount Verde’s warm plain-English reply within two minutes—so they stay excited about Mount Verde instead of enquiring elsewhere, and Brigid wakes up Monday with a pre-briefed viewing booking.'
          }
        )
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Lifestyle Follow-Ups',
        chip: 'Stops Instantly on Reply',
        heading: 'Lifestyle-Driven Midlands Agrihood Follow-Up Emails',
        summary:
          'If a busy family reads their reply on Sunday night and gets pulled into Monday work, warm Day 1 and Day 2 notes re-engage them around life on the 750 ha Hilton estate and invite them back to book a viewing with Brigid—stopping the moment they reply.',
        meta: [
          {
            label: 'Day 1 Follow-Up (24h)',
            value: isMvma
              ? 'Confirms the May 2025 architectural and Claridge Gate summary arrived cleanly and offers direct MVMA support.'
              : 'Checks gently that the plain-English overview arrived and invites them to pick a morning or afternoon viewing with Brigid.'
          },
          {
            label: 'Day 2 Follow-Up (48h)',
            value: 'Paints the real Midlands lifestyle—morning light over the dams, Maqwood Farms, horse trails, and 1.5 km to Hilton Village—bringing silent buyers back to book.'
          },
          {
            label: 'Zero Pressure Guarantee',
            value: 'Cancels automatically the instant ' + form.email + ' replies or books a viewing.'
          }
        ],
        isFollowupStep: true,
        day1: {
          from: isMvma
            ? 'Mount Verde Management Association <info@mountverde.co.za>'
            : 'Brigid Scheuer Mount Verde Reallist <brigid@mountverde.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isVillage
            ? 'Checking your Mount Verde Village and Village Square note arrived'
            : isMvma
              ? 'Checking your May 2025 Mount Verde Controls summary arrived'
              : 'Checking your Meadows B15 and Growers Collective guide arrived',
          paragraphs: isVillage
            ? [
                'Hi ' + form.firstName + ',',
                'Just a quick note to make sure our overview of Mount Verde Village and the heritage barn spaces in The Village Square arrived cleanly yesterday.',
                'Whenever you are next in Hilton for school visits, simply reply with a day that suits your family and Brigid will arrange a relaxed walk through the Village and Village Square.'
              ]
            : isMvma
              ? [
                  'Hi ' + form.firstName + ',',
                  'Just confirming that our plain English summary of the May 2025 Development Controls, second dwelling levy tiers, and Claridge Gate contractor rules reached you yesterday.',
                  'Reply anytime if you would like our MVMA office to pencil in a pre submission check for your Ridge Boulevard plans.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Just a warm note to check that our overview of Meadows B15, Growers Collective farming, and the two homestead allowance arrived cleanly yesterday.',
                  'If any further questions came up around the 10 percent footprint, boreholes, or timing your move from Johannesburg, simply reply here and Brigid will assist directly.'
                ]
        },
        day2: {
          from: isMvma
            ? 'Mount Verde Management Association <info@mountverde.co.za>'
            : 'Brigid Scheuer Mount Verde Reallist <brigid@mountverde.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isVillage
            ? 'Seeing Hilton Village proximity and The Village Square in person'
            : isMvma
              ? 'Keeping your Mount Verde sketch plan review moving smoothly'
              : 'Walking the pastures and dams at Mount Verde in person',
          paragraphs: isVillage
            ? [
                'Hi ' + form.firstName + ',',
                'Families relocating for Hilton College and St Annes often tell us that standing inside The Village Square and driving the three minutes to Hilton Village makes the decision feel effortless.',
                'Whenever you are ready to experience Mount Verde Village in person, reply with a preferred morning or afternoon and Brigid will prepare your gate access.'
              ]
            : isMvma
              ? [
                  'Hi ' + form.firstName + ',',
                  'Early alignment on contemporary barn materials, SANS energy targets, and Environmental Control Officer allocation helps every Ridge Boulevard build move smoothly from sketch plan to site handover.',
                  'Simply reply whenever your client is ready for MVMA review.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Photos capture the rolling Hilton hills well, yet standing above the dam on Meadows B15 with the morning mist clearing over Maqwood Farms and the Karkloof Valley is what makes families fall in love with Mount Verde.',
                  'Whenever you are next down in the Midlands, reply with a preferred morning or afternoon and Brigid will arrange a private, unhurried tour across The Meadows and Ridge Boulevard.'
                ]
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
          ? 'Step 05 · Day 1 Lifestyle Follow-Up (24h)'
          : 'Step 05 · Day 2 Lifestyle Follow-Up (48h)';
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
      ? 'Walkthrough Active · Step 0' + state.activeStep + ' of 05'
      : 'Preview Mode · Send a Test Enquiry Above';
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
    document.title = estate.name + ' — Pre-Viewing & Enquiry Desk Walkthrough | Ridgeline Studio';

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
      'Choose any of Mount Verde’s three real visitor situations below to see the exact plain-English answer and desk brief, or enter your own question and click Send Test Enquiry.';
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
      'Prepared privately for Brigid Scheuer (Reallist) and Deirdre Kallmeyer-Mooljee (Mount Verde Estate) — zero changes made to mountverde.co.za.';
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
