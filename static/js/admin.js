// Admin Dashboard Logic - backed by /api/admin/applications.
(function () {
  const state = {
    pending: [],
    selected: [],
    rejected: [],
    reports: []
  };

  const demoJobs = [
    { title: 'Frontend Developer', dept: 'Engineering', location: 'Remote' },
    { title: 'Backend Developer', dept: 'Engineering', location: 'Remote' },
    { title: 'Primary School Teacher', dept: 'Education', location: 'On-site' },
    { title: 'Finance Manager', dept: 'Finance', location: 'Hybrid' },
    { title: 'Front Office Executive', dept: 'Hospitality', location: 'On-site' }
  ];

  function contentEl() {
    return document.getElementById('admin-content');
  }

  function setTitle(text) {
    const title = document.getElementById('main-title');
    if (title) title.textContent = text;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function fullName(item) {
    return [item.first_name, item.last_name].filter(Boolean).join(' ').trim() || 'Candidate';
  }

  function valueOrDash(value) {
    if (value === undefined || value === null || value === '') return '-';
    return value;
  }

  function score(value, suffix = '%') {
    if (value === undefined || value === null || value === '') return '-';
    const num = Number(value);
    if (Number.isNaN(num)) return escapeHtml(value);
    return `${Math.round(num * 10) / 10}${suffix}`;
  }

  function dateText(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleString([], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  function listItems(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return '<li>No details available.</li>';
    return values.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  }

  function interviewEvidenceItems(items) {
    const values = Array.isArray(items) ? items.filter(Boolean).slice(0, 4) : [];
    if (!values.length) return '<li>No answer evidence available.</li>';
    return values.map(item => `
      <li>
        <strong>${escapeHtml(item.question || 'Interview question')}</strong>
        <span>${escapeHtml(item.summary || item.answer || 'No usable answer captured.')}</span>
      </li>
    `).join('');
  }

  function detailItems(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return '<li>No behavior details available.</li>';
    return values.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  }

  function qaItems(items) {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return '<li>No AI interview questions and answers available yet.</li>';
    return values.map((item, index) => `
      <li>
        <strong>Q${index + 1}. ${escapeHtml(item.question || 'Interview question')}</strong>
        <span><b>Answer:</b> ${escapeHtml(item.answer || 'No usable answer captured.')}</span>
        <span>${escapeHtml(item.description || '')}</span>
      </li>
    `).join('');
  }

  function metric(label, value) {
    return `
      <div class="admin-metric">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(valueOrDash(value))}</strong>
      </div>
    `;
  }

  function renderLoading() {
    const el = contentEl();
    if (el) el.innerHTML = '<div class="admin-empty">Loading HR dashboard data...</div>';
  }

  function renderEmpty(message) {
    const el = contentEl();
    if (el) el.innerHTML = `<div class="admin-empty">${escapeHtml(message)}</div>`;
  }

  async function fetchDashboardData() {
    renderLoading();
    const response = await fetch('/api/admin/applications');
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 403) window.location.href = 'hr_login.html';
      throw new Error(data.error || 'Unable to load dashboard data.');
    }
    state.pending = Array.isArray(data.pending) ? data.pending : [];
    state.selected = Array.isArray(data.selected) ? data.selected : [];
    state.rejected = Array.isArray(data.rejected) ? data.rejected : [];
    state.reports = Array.isArray(data.reports) ? data.reports : [];
  }

  function renderJobs() {
    setTitle('Job Listings');
    const all = [...state.pending, ...state.selected, ...state.rejected];
    const grouped = new Map();

    demoJobs.forEach(job => {
      grouped.set(job.title.toLowerCase(), {
        title: job.title,
        dept: job.dept,
        location: job.location,
        pending: 0,
        shortlisted: 0,
        rejected: 0
      });
    });

    all.forEach(item => {
      const title = String(item.job_role || 'Unassigned Role').trim();
      const key = title.toLowerCase();
      if (!grouped.has(key)) {
        grouped.set(key, {
          title,
          dept: 'Recruitment',
          location: 'Open',
          pending: 0,
          shortlisted: 0,
          rejected: 0
        });
      }
      const row = grouped.get(key);
      if (item.status === 'pending') row.pending++;
      else if (item.status === 'rejected') row.rejected++;
      else row.shortlisted++;
    });

    const rows = Array.from(grouped.values());
    const el = contentEl();
    if (!el) return;
    el.innerHTML = `
      <table class="job-table">
        <tbody>
          ${rows.map(row => `
            <tr class="job-row">
              <td class="job-cell">
                <div class="job-cell-label">Job Title</div>
                <div class="job-cell-value">${escapeHtml(row.title)}</div>
              </td>
              <td class="job-cell">
                <div class="job-cell-label">Department</div>
                <div class="job-cell-value">${escapeHtml(row.dept)}</div>
              </td>
              <td class="job-cell">
                <div class="job-cell-label">Location</div>
                <div class="job-cell-value">${escapeHtml(row.location)}</div>
              </td>
              <td class="job-cell">
                <div class="job-cell-label">Applicants</div>
                <div class="job-cell-value">${row.pending + row.shortlisted + row.rejected}</div>
              </td>
              <td class="job-cell">
                <div class="job-cell-label">Pipeline</div>
                <div class="job-cell-value">
                  <span class="status-badge">Shortlisted ${row.shortlisted}</span>
                  <span class="status-badge status-warning">Pending ${row.pending}</span>
                  <span class="status-badge status-danger">Rejected ${row.rejected}</span>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderApplicantList(title, items, emptyMessage, statusLabel) {
    setTitle(title);
    if (!items.length) {
      renderEmpty(emptyMessage);
      return;
    }

    const el = contentEl();
    if (!el) return;
    el.innerHTML = `
      <div class="admin-list">
        ${items.map(item => `
          <article class="admin-applicant-card">
            <div class="admin-applicant-head">
              <div>
                <h3>${escapeHtml(fullName(item))}</h3>
                <p>${escapeHtml(valueOrDash(item.job_role))}</p>
              </div>
              <span class="status-badge ${statusLabel === 'Rejected' ? 'status-danger' : ''}">${escapeHtml(statusLabel)}</span>
            </div>
            <div class="admin-detail-grid">
              ${metric('Email', item.email)}
              ${metric('Phone', item.phone)}
              ${metric('ATS Score', score(item.ats_score))}
              ${metric('MCQ Score', score(item.mcq_score_percent))}
              ${metric('AI Avatar', item.virtual_taken ? `${score(item.virtual_score, '/10')}` : 'Not completed')}
              ${metric('Applied/Updated', dateText(item.updated_at || item.created_at))}
            </div>
            <div class="admin-summary">
              <strong>Skills</strong>
              <p>${escapeHtml(valueOrDash(item.skills))}</p>
            </div>
            <div class="admin-summary">
              <strong>Screening Summary</strong>
              <p>${escapeHtml(valueOrDash(item.ats_summary || item.virtual_feedback || item.status))}</p>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderReports() {
    setTitle('Candidate Interview Reports');
    if (!state.reports.length) {
      renderEmpty('No candidate assessment reports are available yet.');
      return;
    }

    const el = contentEl();
    if (!el) return;
    el.innerHTML = `
      <div class="admin-list">
        ${state.reports.map(candidate => {
          const report = candidate.candidate_report || {};
          const virtualReport = candidate.virtual_report || {};
          const stageScores = report.stage_scores || {};
          const hrRecommendation = report.hr_recommendation || {};
          const answerEvidence = report.answer_evidence || {};
          const candidateDetails = report.candidate_details || {};
          const mcqTest = report.mcq_test || {};
          const aptitudeTest = report.aptitude_test || {};
          const aiInterview = report.ai_interview || {};
          const finalZyra = report.final_zyra_recommendation || {};
          return `
            <article class="admin-report-card" data-report-card>
              <button class="admin-report-summary" type="button" data-report-toggle aria-expanded="false">
                <div class="admin-applicant-head">
                  <div>
                    <h3>${escapeHtml(fullName(candidate))}</h3>
                    <p>${escapeHtml(valueOrDash(candidate.job_role))} - ${escapeHtml(valueOrDash(candidate.assessment_track))}</p>
                  </div>
                  <span class="status-badge">${escapeHtml(valueOrDash(report.shortlist_decision || candidate.status))}</span>
                </div>

                <div class="admin-detail-grid">
                  ${metric('Email', candidate.email)}
                  ${metric('Phone', candidate.phone)}
                  ${metric('Overall Score', score(report.overall_score))}
                  ${metric('MCQ', score(candidate.mcq_score_percent))}
                  ${metric('Aptitude', score(candidate.aptitude_score_percent))}
                  ${metric('AI Avatar', candidate.virtual_taken ? score(candidate.virtual_score, '/10') : 'Pending')}
                </div>
                <span class="report-expand-indicator">Click to view complete candidate report</span>
              </button>

              <div class="admin-report-expanded">
                <div class="admin-report-section">
                  <h4>Zyra Project Interview Report</h4>
                  <div class="admin-detail-grid">
                    ${metric('Name', candidateDetails.name || fullName(candidate))}
                    ${metric('Applicant ID', candidateDetails.applicant_id || candidate.application_id || candidate._id)}
                    ${metric('Email', candidateDetails.email || candidate.email)}
                    ${metric('ATS Score', score(candidateDetails.ats_score ?? candidate.ats_score))}
                    ${metric('Login ID', candidateDetails.credential_login_id || candidate.credential_username)}
                    ${metric('Password', candidateDetails.credential_password || candidate.credential_plaintext)}
                  </div>
                </div>

                <div class="admin-report-score-row">
                  ${metric('Resume', score(stageScores.resume_screening?.score))}
                  ${metric('MCQ', score(candidate.mcq_score_percent))}
                  ${metric('Aptitude', score(candidate.aptitude_score_percent))}
                  ${metric('AI Avatar', candidate.virtual_taken ? score(candidate.virtual_score, '/10') : 'Pending')}
                  ${metric('Zyra Score', score(report.zyra_score_out_of_10, '/10'))}
                </div>

                <div class="admin-report-section">
                  <h4>MCQ Test</h4>
                  <p><strong>Score:</strong> ${score(mcqTest.score ?? candidate.mcq_score_percent)} (${escapeHtml(valueOrDash(mcqTest.raw_score ?? candidate.mcq_raw_score))}/${escapeHtml(valueOrDash(mcqTest.total_questions ?? candidate.mcq_total_questions))})</p>
                  <p><strong>Tab switched while writing:</strong> ${escapeHtml(valueOrDash(mcqTest.behavior?.tab_switched_while_writing ?? candidate.mcq_proctoring_violations ?? 0))}</p>
                  <p>${escapeHtml(valueOrDash(mcqTest.description))}</p>
                  <ul>${detailItems(mcqTest.behavior?.details)}</ul>
                </div>

                <div class="admin-report-section">
                  <h4>Aptitude Test</h4>
                  <p><strong>Score:</strong> ${score(aptitudeTest.score ?? candidate.aptitude_score_percent)} (${escapeHtml(valueOrDash(aptitudeTest.raw_score ?? candidate.aptitude_raw_score))}/${escapeHtml(valueOrDash(aptitudeTest.total_questions ?? candidate.aptitude_total_questions))})</p>
                  <p><strong>Tab switched while writing:</strong> ${escapeHtml(valueOrDash(aptitudeTest.behavior?.tab_switched_while_writing ?? candidate.aptitude_proctoring_violations ?? 0))}</p>
                  <p>${escapeHtml(valueOrDash(aptitudeTest.description))}</p>
                  <ul>${detailItems(aptitudeTest.behavior?.details)}</ul>
                </div>

                <div class="admin-report-section">
                  <h4>AI Interview</h4>
                  <p><strong>Questions asked:</strong> ${escapeHtml(valueOrDash(aiInterview.questions_asked ?? candidate.virtual_question_count))}, <strong>Answers given:</strong> ${escapeHtml(valueOrDash(aiInterview.answers_given ?? candidate.virtual_answered_count))}</p>
                  <p><strong>Proctoring warnings:</strong> ${escapeHtml(valueOrDash(aiInterview.behavior?.violations ?? candidate.virtual_proctoring_violations ?? 0))}</p>
                  <ul class="admin-answer-evidence">${qaItems(aiInterview.question_answer_details || report.interview_evidence)}</ul>
                </div>

                <div class="admin-report-two-col">
                  <div class="admin-report-section">
                    <h4>Strengths</h4>
                    <ul>${listItems(report.strengths || virtualReport.strengths)}</ul>
                  </div>
                  <div class="admin-report-section">
                    <h4>Improvements</h4>
                    <ul>${listItems(report.weaknesses || virtualReport.improvements)}</ul>
                  </div>
                </div>

                <div class="admin-report-section">
                  <h4>Final Zyra Recommendation</h4>
                  <p><strong>${escapeHtml(valueOrDash(finalZyra.recommendation || hrRecommendation.action || report.shortlist_decision))}</strong></p>
                  <p>${escapeHtml(valueOrDash(finalZyra.description || hrRecommendation.reason || report.hiring_rationale || virtualReport.performance_summary || candidate.virtual_feedback))}</p>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
    bindReportExpansion();
  }

  function bindReportExpansion() {
    document.querySelectorAll('[data-report-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('[data-report-card]');
        if (!card) return;
        const expanded = card.classList.toggle('is-expanded');
        button.setAttribute('aria-expanded', String(expanded));
        const label = button.querySelector('.report-expand-indicator');
        if (label) label.textContent = expanded ? 'Click to collapse candidate report' : 'Click to view complete candidate report';
      });
    });
  }

  function renderView(view) {
    if (view === 'Job Listings') renderJobs();
    if (view === 'Shortlisted') renderApplicantList('Shortlisted Applicants', state.selected, 'No shortlisted applicants yet.', 'Shortlisted');
    if (view === 'Rejected') renderApplicantList('Rejected Applicants', state.rejected, 'No rejected applicants yet.', 'Rejected');
    if (view === 'Reports') renderReports();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const btns = document.querySelectorAll('.sidebar-btn[data-view]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.style.opacity = '0.7');
        btn.style.opacity = '1';
        renderView(btn.getAttribute('data-view'));
      });
    });

    const newJobBtn = document.getElementById('new-job-btn');
    if (newJobBtn) {
      newJobBtn.addEventListener('click', () => {
        alert('New job creation is handled from the backend job API. This dashboard currently focuses on applicant pipeline views.');
      });
    }

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('zyra_admin_state');
        window.location.href = '/admin/logout';
      });
    }

    try {
      await fetchDashboardData();
      renderJobs();
    } catch (error) {
      renderEmpty(error.message || 'Unable to load HR dashboard data.');
    }
  });
})();
