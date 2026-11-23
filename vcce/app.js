/* ==========================================================================
   Ridgeline Studio — Interactive Enquiry & Desk Routing Engine (VCCE)
   Strictly isolated single-estate controller (zero switcher / outcome-first copy).
   ========================================================================== */

(function () {
  'use strict';

  var ESTATE_ID = 'vcce';

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
      'Every bottleneck below comes from a read-only inspection of vcce.co.za, victoria.co.za, and VCCE’s 14 statutory PDFs.';

    dom.auditRowsContainer.innerHTML = estate.auditRows
      .map(function (row) {
        return (
          '<div class="audit-row">' +
          '<div class="audit-before"><span class="audit-tag">Observed Live Today</span>' +
          escapeHtml(row.before) +
          '</div>' +
          '<div class="audit-after"><span class="audit-tag">With 3-Lane Desk Router</span>' +
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
            '<p style="margin-top:6px; font-size:13.5px; line-height:1.6;">' +
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
    var isClub =
      form.personaId === 'vcc-club' ||
      intentLower.includes('victoria country club') ||
      intentLower.includes('padel') ||
      intentLower.includes('function') ||
      intentLower.includes('egret');
    var isArcOrRes =
      !isClub &&
      (form.personaId === 'resident-arc' ||
        intentLower.includes('glo cms') ||
        intentLower.includes('architect') ||
        intentLower.includes('arc') ||
        intentLower.includes('contractor'));

    return [
      {
        num: '01',
        time: '00:02s',
        shortTitle: '3-Lane Intent Capture',
        chip: 'Replaces 3-field fl-contact-form',
        heading: 'Structured Capture on vcce.co.za',
        summary:
          'Captures visitor intent, village/precinct context, and compliance checks upfront instead of dumping unformatted text from /contact-us/ onto Charles Newham’s MHOA desk.',
        meta: [
          {
            label: 'Boundary Protection',
            value: isClub
              ? 'Tagged for Victoria Country Club (independent member club — zero MHOA admin touch).'
              : isArcOrRes
                ? 'Tagged for specialist MHOA Operations / ARC / Glovent GLO CMS desk.'
                : 'Tagged for Resident-Appointed External Agencies / Owners (0% sales noise on estatemanager@vcce.co.za).'
          },
          { label: 'Classified Lane', value: form.intent },
          { label: 'Precinct / Focus', value: form.secondary }
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
        time: '00:16s',
        shortTitle: 'Rulebook & Desk Match',
        chip: 'Indexes 14 /documents/ PDFs',
        heading: 'Cross-References VCCE House Rules, ARC & VCC Boundaries',
        summary:
          'Matches the enquiry against VCCE’s exact statutory rules and department directory before a single staff member opens their inbox.',
        meta: [
          {
            label: 'Verified Documents Matched',
            value: isClub
              ? 'HOUSE-RULES-LATEST-2019.pdf (§6.1 VCC boundary) & victoria.co.za Desk Directory'
              : isArcOrRes
                ? 'Architectural-Guidelines-Revised-Sep-2016.pdf, VCCE-Paint-Chart.pdf, Plant-Palette-Nov-2015.pdf, VCCE Onboarding User Guide (Aug 2025), Contractor Conduct Rules'
                : 'HOUSE-RULES-LATEST-2019.pdf (§6.1, §7.1, §8.2–8.5, §18.10), Application-for-MHOA-membership-VCCE-Oct-2015.pdf'
          },
          {
            label: 'Live Leak Repaired',
            value: isClub
              ? 'Bypasses broken [ddownload id="70"] shortcode on /vcc-golf-course/ directly to membership@victoria.co.za.'
              : isArcOrRes
                ? 'Replaces dead portal.vcce.co.za/ptguest (NXDOMAIN) with live Glovent GLO CMS Mobile App onboarding.'
                : 'Replaces missing agent directory & zero-signage friction (§18.10) with direct appointed-agency routing.'
          }
        ],
        previewTitle: 'Step 02 · Governance Rule Verification',
        previewHtml: renderHandoffCards([
          {
            title: 'Exact VCCE Governance Citations Checked',
            highlight: true,
            body: isClub
              ? 'Separated Victoria Country Club (Par 71 Top-100 #33 golf, PADEL PMB @ VCC, 200-guest Main Function Room, The Egret Restaurant, Reggie’s Bar, 3 ensuite rooms) from VCCE MHOA administration.'
              : isArcOrRes
                ? 'Verified SACAP architect requirement (§2.1), R8,000 ARC fee (§2.3), mandatory Town Bush Valley geotechnical + structural engineer sign-off (§3.1–3.3), Natal Victorian vernacular, Kikuyu grass ban (§16.11), and weekday contractor (07:00–17:00) / delivery (07:30–16:00) windows.'
                : 'Verified compulsory VCC membership for all MHOA owners (§6.1) + legal entity nomination for Montrose Park offices (§7.1), by-appointment accompanied viewings with zero Show House boards (§18.10), and pet limits (max 2 dogs <=20 kg, zero tenant pets, QEP Reserve ban under §8.2–8.5).'
          },
          {
            title: 'Desk Workload Protection',
            highlight: false,
            body: isClub
              ? '100% routed straight to Victoria Country Club staff — zero calls or emails misdirected to +27 33 347 5599.'
              : isArcOrRes
                ? 'Eliminates manual PDF hunting and broken-portal calls ahead of the December holiday rush.'
                : 'Honours Charles Newham’s boundary: 0% property sales or rental enquiries sent to estatemanager@vcce.co.za.'
          }
        ])
      },
      {
        num: '03',
        time: '01:04s',
        shortTitle: 'Sub-2-Min Narrative Reply',
        chip: 'Sent to ' + form.email,
        heading: 'Tailored Town Bush Valley Reply + Exact Rule Citations',
        summary:
          form.firstName +
          ' receives a calm, authoritative response in just over a minute with exact rule sections, working links, and the matching statutory PDFs.',
        meta: [
          { label: 'Recipient', value: form.fullName + ' <' + form.email + '>' },
          { label: 'Delivery SLA', value: '64 seconds from submission (zero inbox wait)' }
        ],
        previewTitle: 'Step 03 · Outbound Visitor Narrative Email (<2 Min)',
        previewHtml: renderEmailPreview({
          from: isClub
            ? 'Victoria Country Club Desk <events@victoria.co.za>'
            : isArcOrRes
              ? 'VCCE Building & Resident Operations <buildingcompilance@vcce.co.za>'
              : 'Victoria Country Club Estate · Buyer & Agency Concierge <concierge@vcce-routing.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isClub
            ? 'Your Victoria Country Club Golf, Padel, Venue & Membership Pack'
            : isArcOrRes
              ? 'VCCE ARC Submission Checklist, Geotechnical Rules & Glovent GLO CMS Guide'
              : 'Welcome to Victoria Country Club Estate — Buyer Rules Pack & Viewing Arrangement',
          paragraphs: isClub
            ? [
                'Hi ' + form.firstName + ',',
                'Thank you for getting in touch with Victoria Country Club. Because the Club operates independently inside Victoria Country Club Estate, we have routed your request straight to our Club team so you do not have to chase multiple numbers.',
                'Jae Govender (events@victoria.co.za) has received your 64-guest Main Function Room brief (capacity up to 200 guests / 150 seated with dance floor), Chris Cordier in the Pro Shop (golfdirector@victoria.co.za · 033 347 1394) is checking Par 71 tee-time blocks alongside PADEL PMB @ VCC court availability, and our accommodation desk (ops@victoria.co.za) is holding availability details for our 3 ensuite guest rooms.',
                'Because the download shortcode on vcce.co.za/vcc-golf-course/ is currently offline, Michell Wells (membership@victoria.co.za) has also been copied with the live VCC Membership Application Pack attached below.'
              ]
            : isArcOrRes
              ? [
                  'Hi ' + form.firstName + ',',
                  'Thank you for your Cascades Village ARC enquiry. To save time ahead of the December office period, we have attached the Architectural Guidelines (Sep 2016), VCCE Paint Chart, Plant Palette (indigenous species only; Kikuyu grass is prohibited under §16.11), and Building Performance Agreement.',
                  'Key Town Bush Valley checkpoints for your submission: plans must be lodged by a SACAP-registered architect in our modernised Natal Victorian vernacular (charcoal/dark grey pitched roof >=70%), accompanied by the R8,000 ARC review fee (covering up to 3 submissions) and mandatory plot-specific geotechnical testing plus registered structural engineer foundation sign-off (§3.1–3.3). Contractors operate strictly Mon–Fri 07:00–17:00 and deliveries 07:30–16:00 (off-site by 16:30).',
                  'For your client’s resident access: the old portal.vcce.co.za/ptguest link has been retired. Please download the Glovent GLO CMS Mobile App (“Victoria Country Club Estate” on App Store, Google Play, or AppGallery) and book Cascades facial biometric enrolment through coordinator@vcce.co.za (Mon–Fri 07:00–16:00).'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Thank you for your interest in Victoria Country Club Estate. Set across 230 hectares in Town Bush Valley bordering the 93-hectare Queen Elizabeth Park Nature Reserve, VCCE offers five residential villages (including Fairways Lifestyle Village for over-55s overlooking the 18th fairway) alongside 28 A-grade office sites on Montrose Park Boulevard.',
                  'Three key governance points upfront: (1) Under House Rules §6.1, all property owners hold compulsory membership of Victoria Country Club (and Montrose Park legal entities nominate a natural-person representative under §7.1); (2) Homeowners may keep up to 2 dogs <=20 kg with prior written MHOA approval (your two terriers fall within the weight limit, though note tenants may not keep pets under §8.5 and dogs are strictly prohibited inside Queen Elizabeth Park Nature Reserve under §8.18.2); and (3) Under §18.10, VCCE permits zero Show House or For Sale boards—all viewings are strictly by appointment with resident-appointed estate agencies.',
                  'Because VCCE’s Master Homeowners Association does not run an in-house sales desk, we have forwarded your pre-qualified brief directly to active VCCE external agencies (handling freehold, Fairways Lifestyle Village, and Montrose Park Boulevard) and attached the official Buyer Rules Pack below.'
                ],
          attachments: isClub
            ? ['VCC-Membership-Application-Pack.pdf', 'VCC-Functions-200-Guest-Venue-Specs.pdf', 'PADEL-PMB-and-Clubhouse-Hours.pdf']
            : isArcOrRes
              ? [
                  'Architectural-Guidelines-Revised-Sep-2016.pdf',
                  'VCCE-Paint-Chart.pdf',
                  'Plant-Palette-Nov-2015.pdf',
                  'Victoria-Country-Club-Estate-Onboarding-User-Guide.pdf',
                  'Conduct-rules-for-contractors-VCCE-Aug-2015.pdf'
                ]
              : [
                  'HOUSE-RULES-LATEST-2019.pdf',
                  'Application-for-MHOA-membership-VCCE-Oct-2015.pdf',
                  'VCCE-Villages-and-Fairways-Overview.pdf'
                ]
        })
      },
      {
        num: '04',
        time: '01:14s',
        shortTitle: 'Exact Specialist Desk Brief',
        chip: isClub ? 'Routed to VCC' : isArcOrRes ? 'Routed to MHOA Desk' : '0% Noise to MHOA',
        heading: isClub
          ? 'Structured Brief Delivered to Victoria Country Club'
          : isArcOrRes
            ? 'Structured Compliance Brief to MHOA Specialist Desks'
            : 'Pre-Qualified Buyer Brief to Resident-Appointed Agencies',
        summary: isClub
          ? 'Club staff receive one unified brief covering golf, padel, functions, rooms, and membership—with zero MHOA switchboard overlap.'
          : isArcOrRes
            ? 'Routes straight to buildingcompilance@vcce.co.za and coordinator@vcce.co.za without cluttering Charles Newham’s Estate Manager inbox.'
            : 'Delivers a ready-to-book buyer dossier directly to resident-appointed external agencies and owners—keeping Charles Newham’s MHOA desk 100% clear of sales traffic.',
        meta: [
          {
            label: 'Primary Recipient Desk',
            value: isClub
              ? 'Jae Govender (events@victoria.co.za), Chris Cordier (golfdirector@victoria.co.za), Michell Wells (membership@victoria.co.za), ops@victoria.co.za'
              : isArcOrRes
                ? 'Building & ARC Compliance (buildingcompilance@vcce.co.za) + Access Control (coordinator@vcce.co.za / secadmin@vcce.co.za)'
                : 'Resident-Appointed External Agencies (Pam Golding Midlands 033 342 8108 / Seeff / RE/MAX / In2Assets) — ZERO sales email to estatemanager@vcce.co.za'
          },
          {
            label: 'Charles Newham Impact',
            value: 'estatemanager@vcce.co.za receives zero routine sales, GLO CMS, or Club clutter (only genuine Estate Manager escalations).'
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
              '” Sub-2-minute narrative reply and exact statutory PDFs already dispatched.'
          },
          {
            title: 'Recommended Next Action (Zero Basic FAQ Repetition)',
            highlight: false,
            body: isClub
              ? 'Confirm 64-player Par 71 tee block + Main Function Room date + 3 ensuite rooms; Michell Wells to issue VCC membership onboarding directly.'
              : isArcOrRes
                ? 'buildingcompilance@vcce.co.za to log SACAP sketch-plan intake once R8,000 ARC fee & geotechnical certificate are attached; coordinator@vcce.co.za to schedule Cascades facial biometric enrolment.'
                : 'External agency to contact ' + form.firstName + ' directly for a by-appointment accompanied viewing (§18.10) across freehold, Fairways Lifestyle Village, and Montrose Park Boulevard.'
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
          'Confirms the visitor connected with the right desk or external agency and cancels automatically the moment ' +
          form.firstName +
          ' replies.',
        meta: [
          {
            label: 'Day 1 (24h)',
            value: isClub
              ? 'Confirms VCC events, Pro Shop, and membership desks connected cleanly.'
              : isArcOrRes
                ? 'Confirms ARC guidelines, Paint Chart, and Glovent GLO CMS app setup worked smoothly.'
                : 'Confirms a resident-appointed VCCE agent reached out for a by-appointment viewing.'
          },
          {
            label: 'Day 2 (48h)',
            value: 'Extends a calm pre-December cue (pairing a viewing with lunch at The Egret Restaurant / Reggie’s Bar, or locking contractor passes before holiday shutdown).'
          },
          { label: 'Stop Rule', value: 'Cancels immediately on any reply from ' + form.email + '.' }
        ],
        isFollowupStep: true,
        day1: {
          from: isClub
            ? 'Victoria Country Club Desk <events@victoria.co.za>'
            : isArcOrRes
              ? 'VCCE Building & Resident Operations <buildingcompilance@vcce.co.za>'
              : 'Victoria Country Club Estate · Buyer & Agency Concierge <concierge@vcce-routing.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isClub
            ? 'Checking your Victoria Country Club booking & membership pack arrived'
            : isArcOrRes
              ? 'Checking you received the VCCE ARC pack & Glovent GLO CMS guide'
              : 'Checking your VCCE Rules Pack arrived & viewing agent connected',
          paragraphs: isClub
            ? [
                'Hi ' + form.firstName + ',',
                'Just a quick note to confirm you received the Victoria Country Club venue, golf, PMB Padel, and membership pack yesterday without any trouble.',
                'If you need any adjustment to the 64-guest tee block, Main Function Room layout, or 3 ensuite guest rooms, simply reply here and Jae or Chris will assist directly.'
              ]
            : isArcOrRes
              ? [
                  'Hi ' + form.firstName + ',',
                  'Just checking that the Sep 2016 Architectural Guidelines, Paint Chart, Plant Palette, and Glovent GLO CMS onboarding guide arrived cleanly yesterday.',
                  'If your client still needs a Cascades biometric enrolment slot at the Security Office (07:00–16:00 Mon–Fri), simply reply here and coordinator@vcce.co.za will confirm a time.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Just a quick check-in to make sure the VCCE House Rules Pack arrived clearly and that an active external VCCE estate agent has been in touch regarding your by-appointment viewing across freehold homes, Fairways Lifestyle Village, and Montrose Park Boulevard.',
                  'If you have any further questions on compulsory VCC membership (§6.1) or pet registration (§8.2), simply reply to this note.'
                ],
          attachments: []
        },
        day2: {
          from: isClub
            ? 'Victoria Country Club <manager@victoria.co.za>'
            : isArcOrRes
              ? 'VCCE Operations & Access Desk <coordinator@vcce.co.za>'
              : 'Victoria Country Club Estate · Visitor Concierge <concierge@vcce-routing.co.za>',
          to: form.fullName + ' <' + form.email + '>',
          subject: isClub
            ? 'Pre-December dates at Victoria Country Club & The Egret Restaurant'
            : isArcOrRes
              ? 'Locking in pre-December contractor passes & ARC review slots — VCCE'
              : 'Pairing your VCCE viewing with lunch at The Egret or Reggie’s Bar',
          paragraphs: isClub
            ? [
                'Hi ' + form.firstName + ',',
                'December dates fill quickly across our Par 71 championship course, PADEL PMB @ VCC courts, and 200-guest Main Function Room. Whenever you are ready to pencil in your corporate day or visit The Egret Restaurant for a site walk, reply here or call the Pro Shop on 033 347 1394.',
                'Warm regards, Victoria Country Club'
              ]
            : isArcOrRes
              ? [
                  'Hi ' + form.firstName + ',',
                  'With the December holiday contractor shutdown approaching, locking in SACAP ARC plan submissions and 24-hour advance contractor passes (Mon–Fri 07:00–17:00; deliveries 07:30–16:00) early keeps site handovers stress-free.',
                  'Reply anytime if you need a quick confirmation from buildingcompilance@vcce.co.za or coordinator@vcce.co.za.'
                ]
              : [
                  'Hi ' + form.firstName + ',',
                  'Many relocating families love pairing a morning by-appointment tour of Town Bush Valley and Fairways Lifestyle Village with coffee or lunch overlooking the 18th green at The Egret Restaurant or Reggie’s Bar.',
                  'Whenever you are next in Pietermaritzburg ahead of the December holidays, reply here and we will coordinate seamlessly with your appointed viewing agent.'
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
      'Select any of VCCE’s three real visitor lanes below to auto-fill realistic Town Bush Valley details, or enter your own question and click Submit.';
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
      ' (vcce.co.za) — nothing built upfront on your live website.';
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