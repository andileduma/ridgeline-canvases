/* ==========================================================================
   Ridgeline Studio — Interactive Enquiry & Desk Routing Engine (St John's Village)
   Strictly isolated single-estate controller (zero switcher / outcome-first copy).
   Zero dashes in outbound email preview subjects and narrative bodies.
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'stjohns';

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
      'Every bottleneck below comes from a read-only inspection of stjohnsvillage.co.za, sjvresidents.co.za, and St John’s Village HOA documents.';

    dom.auditRowsContainer.innerHTML = estate.auditRows
      .map(function (row) {
        return (
          '<div class="audit-row">' +
          '<div class="audit-before"><span class="audit-tag">Observed Today</span>' +
          escapeHtml(row.before) +
          '</div>' +
          '<div class="audit-after"><span class="audit-tag">Smart Desk Routing</span>' +
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
            '<p style="margin-top:6px; font-size:13.2px; line-height:1.62;">' +
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
    var intentLower = (form.intent + ' ' + form.secondary + ' ' + form.message).toLowerCase();
    var isCare =
      form.personaId === 'care-centre' ||
      intentLower.includes('care centre') ||
      intentLower.includes('assisted living') ||
      intentLower.includes('clinic') ||
      intentLower.includes('respite');
    var isBuildOrAgent =
      !isCare &&
      (form.personaId === 'architect-builder-agent' ||
        intentLower.includes('architect') ||
        intentLower.includes('builder') ||
        intentLower.includes('guidelines') ||
        intentLower.includes('accredit'));

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: '3-Lane Intent Capture',
        chip: 'Replaces LeadBubble & 22-option form',
        heading: 'Structured Capture Across PropCon & HOA Rules',
        summary:
          'Captures visitor intent, village or desk focus, and POPIA consent upfront instead of dumping unformatted LeadBubble messages onto Lucy Blackman or 22-option Gravity Form submissions onto Deanne L’Estrange.',
        meta: [
          {
            label: 'Desk Protection',
            value: isCare
              ? 'Tagged directly for Sr Terry Wilson at St John’s Village Care Centre (zero sales or HOA inbox overlap).'
              : isBuildOrAgent
                ? 'Tagged for Building Officer Mthokozisi Blessing Chiliza (build@stjohnsvillage.co.za) and HOA accreditation.'
                : 'Tagged for On-Site Sales Desk (Lucy Blackman & Gerard Robinson) with Meadow Ridge and Sec. 17 pre-screening.'
          },
          { label: 'Classified Lane', value: form.intent },
          { label: 'Village / Desk Focus', value: form.secondary }
        ],
        previewTitle: 'Step 01 · Structured Intake Record',
        previewHtml: renderKvPayload([
          ['Visitor', form.fullName + ' (' + form.email + ')'],
          ['Mobile / WhatsApp', form.phone],
          ['Assigned Lane', form.intent],
          ['Village / Desk Focus', form.secondary],
          ['Pre-Screen Tag', form.tertiary],
          ['Visitor Question', form.message]
        ])
      },
      {
        num: '02',
        time: '00:15s',
        shortTitle: 'Rulebook & Desk Match',
        chip: 'Unifies 30+ Drive & HOA PDFs',
        heading: 'Cross-References Conduct Rules, Oct 2026 Guidelines & Desks',
        summary:
          'Checks the enquiry against verified St John’s Village HOA documents, levy schedules, Care Centre protocols, and the updated Sep/Oct 2026 staff directory before any inbox is touched.',
        meta: [
          {
            label: 'Verified Documents Matched',
            value: isCare
              ? 'Care Centre Admissions Protocol, 10:00–12:00 Weekday Clinic Schedule & Gatehouse Emergency Routing'
              : isBuildOrAgent
                ? 'Architectural Guidelines (2 Oct 2026), Nov 2026 Newsletter (Mthokozisi Chiliza appointment), Conduct Rules Sec. 17'
                : 'HOA Conduct Rules (Sec. 7.2 & Sec. 17), 2025/2026 Levy Schedule, Pet Rules & 30 km/h Speed Camera Notice'
          },
          {
            label: 'Live Leak Repaired',
            value: isCare
              ? 'Resolves split Care Centre emails (care@sjvcare.co.za vs. stjohnsvillage.co.za) and clarifies non-emergency private-home limits.'
              : isBuildOrAgent
                ? 'Replaces outdated Sept 2024 sjvresidents.co.za PDFs and retired Lesley Sharp buildsec@ listing with current build@ routing.'
                : 'Eliminates raw Google Drive hunting, flags the Meadow Ridge age discrepancy, and bypasses the broken /contact/ soft-404.'
          }
        ],
        previewTitle: 'Step 02 · Governance & Desk Verification',
        previewHtml: renderHandoffCards([
          {
            title: 'Verified St John’s Village Rules Checked',
            highlight: true,
            body: isCare
              ? 'Confirmed 26-bed Care Centre capacity (14 private en-suite + 6 shared respite/recovery rooms), weekday resident clinic hours (10:00–12:00), and strict boundary that Care Centre staff do not attend private-home emergencies (route via panic button / Mi7 / EMS / Main Gate 033 032 0500).'
              : isBuildOrAgent
                ? 'Verified 2 Oct 2026 Natal Veranda / Farm style guidelines (Chromadek greys/slate, red-range brick/stone, no IBR/steel windows/precast walling), R10,000 HOA plan fee (R20,000 ST), R15,000 building deposit (50% non-refundable), 30-month completion rule, 15 Dec 2026 – 11 Jan 2027 builder shutdown, and Sec. 17 agent accreditation (0.25% sales levy).'
                : 'Verified 9 villages (All-Ages vs. Over-55s + Meadow Ridge document check), Freehold levy R2,540/month vs. ST HOA + Body Corporate levies, pet limits (max 2 dogs or 1 cat, spayed/neutered, audible bell on cats, 20 kg limit at Jersey Cottages), Sec. 17 no-signboard / appointment-only viewings, and 30 km/h speed cameras.'
          },
          {
            title: 'Agency & Staff Workload Protection',
            highlight: false,
            body: isCare
              ? '100% routed straight to Sr Terry Wilson (care@sjvcare.co.za) — zero Care Centre queries landing on Lucy’s sales line or Deanne’s HOA desk.'
              : isBuildOrAgent
                ? 'Protects Deanne L’Estrange’s before-10:00 AM walk-in window by sending structured plans straight to Mthokozisi Chiliza (build@stjohnsvillage.co.za).'
                : 'Works alongside your external marketing agency and PropCon listings—delivering a pre-screened buyer brief straight to Lucy Blackman and Gerard Robinson.'
          }
        ])
      },
      {
        num: '03',
        time: '01:02s',
        shortTitle: 'Sub-2-Min Narrative Reply',
        chip: 'Sent to ' + form.email,
        heading: 'Tailored Howick Midlands Reply + Exact Rule Citations',
        summary:
          form.firstName +
          ' receives a warm, clear narrative reply in just over a minute with verified rules, accurate contacts, and the exact documents needed—without digging through Google Drive.',
        meta: [
          { label: 'Recipient', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Delivery SLA', value: '62 seconds from submission (zero inbox wait)' }
        ],
        previewTitle: 'Step 03 · Outbound Visitor Narrative Email (<2 Min)',
        previewHtml: renderEmailPreview({
          from: isCare
            ? 'St Johns Village Care Centre <care@sjvcare.co.za>'
            : isBuildOrAgent
              ? 'St Johns Village Building Control <build@stjohnsvillage.co.za>'
              : 'St Johns Village Sales Desk <info@stjohnsvillage.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isCare
            ? 'Your St Johns Village Care Centre Admissions and Weekday Clinic Pack'
            : isBuildOrAgent
              ? 'St Johns Village 2 Oct 2026 Architectural Guidelines and Plan Submission Pack'
              : 'Welcome to St Johns Village Howick Village Rules and Viewing Guide',
          paragraphs: isCare
            ? [
                'Hi ' + form.firstName + ',',
                'Thank you for reaching out to the St Johns Village Care Centre in Howick. We have routed your enquiry directly to Sr Terry Wilson and our Care Centre team so you do not have to chase multiple numbers.',
                'Our 26 bed Care Centre offers 14 private ensuite rooms and 6 shared respite and recovery rooms close to Jersey Cottages, alongside our resident weekday clinic operating from 10:00 to 12:00. Please note that while our nursing team supports Care Centre residents and scheduled clinic visits, the Care Centre is not staffed to attend private home medical emergencies across the estate. All private home emergencies route directly to resident panic buttons, Mi7, or EMS via Main Gate on 033 032 0500.',
                'Sr Terry Wilson has received your note regarding post surgery respite availability and will contact you directly from care@sjvcare.co.za or 033 239 0766 with current room dates.'
              ]
            : isBuildOrAgent
              ? [
                  'Hi ' + form.firstName + ',',
                  'Thank you for your architectural submission enquiry for The Pinelands at St Johns Village. Because the resident portal still carries an older September 2024 copy, we have attached the current 2 October 2026 Architectural Guidelines directly below.',
                  'Your brief has been routed to our Building Officer, Mthokozisi Blessing Chiliza (build@stjohnsvillage.co.za and 072 650 1025). Key checkpoints for Natal Veranda and Farm style submissions include Chromadek grey or slate roofing, red range brick or stone, accredited architect and builder registration, the R10,000 freehold HOA plan approval fee (R20,000 for sectional title), and the R15,000 building deposit (50% non refundable). Builds carry a 30 month completion window, and our annual builder shutdown runs from 15 December 2026 to 11 January 2027.',
                  'For the external estate agent coordinating with your client, Conduct Rules Section 17 requires SJV accreditation, annual induction, and the 0.25% sales levy, with zero signboards or show houses permitted on the estate.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for your interest in St Johns Village in Howick. Set across 161.5 hectares on Karkloof Road with three dams, free roaming Nguni cattle, and nine distinct villages, we offer both all ages freehold options such as The Pinelands and dedicated Over 55s communities including Jersey Cottages and The Arboretum.',
                  'Three helpful clarifications upfront: first, while Meadow Ridge is marketed for all ages on our website and omits an Over 55s clause in Conduct Rules Section 7.2, an older resident guide mentions Over 55s, so Lucy Blackman will confirm the exact current Body Corporate rule for you in writing. Second, 2025/2026 Freehold HOA levies are R2,540 per month, while Sectional Title HOA levies run from R1,444.50 to R1,960 per month plus the village Body Corporate levy. Third, households may keep up to two neutered dogs (with a 20 kg limit at Jersey Cottages) or one cat wearing an audible bell.',
                  'Under Conduct Rules Section 17, St Johns Village has zero For Sale or Show House boards and all viewings are strictly by appointment. Lucy Blackman and Gerard Robinson have received your brief and will confirm a viewing slot along with your MyEstateLife gate code. Please remember our estate speed cameras strictly enforce 30 km/h for all visitors.'
                ],
          attachments: isCare
            ? ['SJV_Care_Centre_Admissions_Overview.pdf', 'Weekday_Clinic_and_Emergency_Numbers.pdf']
            : isBuildOrAgent
              ? [
                  'SJV_Architectural_Guidelines_2_Oct_2026.pdf',
                  'Accredited_Architects_and_Builders_Checklist.pdf',
                  'Conduct_Rules_Sec17_Agent_Accreditation.pdf'
                ]
              : [
                  'SJV_Nine_Villages_and_Levy_Summary_2026.pdf',
                  'HOA_Conduct_Rules_Pets_and_Sec17_Viewings.pdf',
                  'Visitor_Gate_and_30kmh_Arrival_Guide.pdf'
                ]
        })
      },
      {
        num: '04',
        time: '01:12s',
        shortTitle: 'Exact Specialist Desk Brief',
        chip: isCare ? 'Routed to Care Centre' : isBuildOrAgent ? 'Routed to build@' : 'Routed to Lucy & Gerard',
        heading: isCare
          ? 'Structured Admissions Brief Delivered to Sr Terry Wilson'
          : isBuildOrAgent
            ? 'Structured Build & Sec. 17 Brief to Mthokozisi Chiliza'
            : 'Viewing-Ready Buyer Dossier to Lucy Blackman & Gerard Robinson',
        summary: isCare
          ? 'Sr Terry Wilson receives one clean admissions brief with clinic and non-emergency rules already explained—keeping Care calls off Sales and HOA lines.'
          : isBuildOrAgent
            ? 'Building Officer Mthokozisi Chiliza receives exact Pinelands submission context while Deanne L’Estrange’s before-10:00 AM HOA admin desk stays completely protected.'
            : 'Lucy Blackman and Gerard Robinson receive a pre-screened buyer dossier—supporting your existing marketing agency’s lead flow without adding manual admin.',
        meta: [
          {
            label: 'Primary Recipient Desk',
            value: isCare
              ? 'Sr Terry Wilson · Care Centre Manager (care@sjvcare.co.za / 033 239 0766)'
              : isBuildOrAgent
                ? 'Mthokozisi Blessing Chiliza · Building Officer (build@stjohnsvillage.co.za / 072 650 1025) + HOA GM Gary McDowell (manager@stjohnsvillage.co.za) if Sec. 17 accreditation applies'
                : 'Lucy Blackman (lucy@stjohnsvillage.co.za / 082 547 8798) & Gerard Robinson (082 552 8622)'
          },
          {
            label: 'Inbox Clutter Prevented',
            value: 'Deanne L’Estrange (adminoffice@stjohnsvillage.co.za) receives zero misdirected sales, Care Centre, or basic architectural PDF requests.'
          }
        ],
        previewTitle: 'Step 04 · Internal Specialist Desk Brief',
        previewHtml: renderHandoffCards([
          {
            title: '1-Paragraph Specialist Brief — ' + form.fullName,
            highlight: true,
            body:
              'Lane: ' +
              form.intent +
              ' | Focus: ' +
              form.secondary +
              ' | Contact: ' +
              form.email +
              ' / ' +
              form.phone +
              '. Pre-screen status: ' +
              form.tertiary +
              '. Summary: “' +
              form.message +
              '” Sub-2-minute narrative reply and exact 2026 PDFs already dispatched.'
          },
          {
            title: 'Recommended Next Action (Zero Basic FAQ Repetition)',
            highlight: false,
            body: isCare
              ? 'Sr Terry Wilson to confirm current private en-suite respite availability and schedule a Care Centre tour via Main Gate appointment.'
              : isBuildOrAgent
                ? 'Mthokozisi Chiliza to confirm sketch-plan intake date ahead of the 15 Dec 2026 – 11 Jan 2027 builder shutdown; HOA office to send Sec. 17 agent accreditation form if needed.'
                : 'Lucy Blackman or Gerard Robinson to confirm written Meadow Ridge age status and book an accompanied Sec. 17 viewing with MyEstateLife gate code.'
          }
        ])
      },
      {
        num: '05',
        time: 'Day 1 & 2',
        shortTitle: 'Day 1 & 2 Follow-Ups',
        chip: 'Auto-stops on reply',
        heading: 'Automated Day 1 & Day 2 Follow-Ups (Zero Manual Chasing)',
        summary:
          'Confirms the visitor received their verified pack and connected with the right St John’s Village desk—cancelling automatically the moment ' +
          form.firstName +
          ' replies.',
        meta: [
          {
            label: 'Day 1 (24h)',
            value: isCare
              ? 'Confirms the Care Centre admissions & weekday clinic pack arrived and Sr Terry Wilson connected.'
              : isBuildOrAgent
                ? 'Confirms the 2 Oct 2026 Architectural Guidelines arrived and Mthokozisi Chiliza’s desk is in touch.'
                : 'Confirms the Village & Levy Summary arrived and Lucy or Gerard reached out for a viewing time.'
          },
          {
            label: 'Day 2 (48h)',
            value: 'Sends a warm Midlands cue (Orchard House & dam walk during viewing, Care Centre tour slot, or locking plan intake before the 15 Dec shutdown).'
          },
          { label: 'Stop Rule', value: 'Cancels immediately on any reply from ' + form.email + '.' }
        ],
        isFollowupStep: true,
        day1: {
          from: isCare
            ? 'St Johns Village Care Centre <care@sjvcare.co.za>'
            : isBuildOrAgent
              ? 'St Johns Village Building Control <build@stjohnsvillage.co.za>'
              : 'St Johns Village Sales Desk <info@stjohnsvillage.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isCare
            ? 'Checking your St Johns Village Care Centre guide arrived cleanly'
            : isBuildOrAgent
              ? 'Checking you received the 2 Oct 2026 Architectural Guidelines'
              : 'Checking your St Johns Village Rules Pack and viewing note arrived',
          paragraphs: isCare
            ? [
                'Hi ' + form.firstName + ',',
                'Just a quick note to confirm that our Care Centre admissions overview and weekday clinic guide arrived cleanly yesterday.',
                'If you would like to confirm respite room dates or arrange a calm tour with Sr Terry Wilson, simply reply here or call 033 239 0766.'
              ]
            : isBuildOrAgent
              ? [
                  'Hi ' + form.firstName + ',',
                  'Just checking that the 2 October 2026 Architectural Guidelines and accredited builder checklist arrived without any trouble yesterday.',
                  'If you need any clarification on the R10,000 plan approval fee, R15,000 deposit, or Section 17 agent induction, simply reply here and Mthokozisi Chiliza will assist directly.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Just a quick check in to make sure the St Johns Village levy summary, pet rules, and viewing guide arrived cleanly yesterday.',
                  'If you have any further questions on The Pinelands, Jersey Cottages, or Meadow Ridge ahead of your Howick visit, simply reply here and Lucy Blackman or Gerard Robinson will assist directly.'
                ],
          attachments: []
        },
        day2: {
          from: isCare
            ? 'Sr Terry Wilson Care Centre <care@sjvcare.co.za>'
            : isBuildOrAgent
              ? 'St Johns Village Building Control <build@stjohnsvillage.co.za>'
              : 'Lucy Blackman St Johns Village <lucy@stjohnsvillage.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isCare
            ? 'Arranging a quiet visit to the St Johns Village Care Centre'
            : isBuildOrAgent
              ? 'Planning submissions ahead of the 15 December builder shutdown'
              : 'Experiencing St Johns Village and Orchard House on your Howick visit',
          paragraphs: isCare
            ? [
                'Hi ' + form.firstName + ',',
                'Families often find it reassuring to walk through the Care Centre wing and nearby Jersey Cottages in person before confirming respite dates. Whenever you are ready for a quiet appointment, reply here and we will issue your MyEstateLife gate code.',
                'Warm regards, St Johns Village Care Centre'
              ]
            : isBuildOrAgent
              ? [
                  'Hi ' + form.firstName + ',',
                  'With the annual builder shutdown running from 15 December 2026 to 11 January 2027, lodging compliant sketch plans early keeps municipal timelines moving smoothly into the new year.',
                  'Reply anytime if you would like Mthokozisi Chiliza to pencil in a pre submission check.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Many relocating families enjoy seeing Fish Eagle Dam, the Arboretum, and Orchard House during their accompanied estate tour before popping next door to St Johns Village Lifestyle Centre.',
                  'Whenever you are next in the KZN Midlands, reply with a preferred morning or afternoon and we will arrange your appointment and gate access.'
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
      'Select any of St John’s Village’s three real visitor lanes below to auto-fill realistic Howick details, or enter your own question and click Submit.';
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
      ' (stjohnsvillage.co.za) — built to protect Lucy Blackman, Deanne L’Estrange, and your existing marketing agency.';
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
