// Aptitude Assessment Logic - backed by /api/aptitude/start.
(function () {
  let questions = [];
  let currentQ = 1;
  let answers = {};
  let testId = null;
  let timerInterval;
  let seconds = 20 * 60;
  let proctor = null;
  let submitting = false;
  let pendingAutoSubmit = false;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function lockForSubmit(message) {
    document.querySelectorAll('button, input').forEach(el => {
      el.disabled = true;
    });
    const qText = document.getElementById('q-text');
    if (qText) qText.textContent = message || 'Submitting aptitude assessment...';
  }

  function showSubmissionPopup({ title, message, scoreText, redirectUrl = 'user_dashboard.html' }) {
    const existing = document.querySelector('.submission-popup-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.className = 'submission-popup-backdrop';
    backdrop.innerHTML = `
      <div class="submission-popup" role="dialog" aria-modal="true" aria-labelledby="submission-title">
        <div class="submission-check" aria-hidden="true"></div>
        <h2 id="submission-title">${escapeHtml(title || 'Assessment Submitted')}</h2>
        <p>${escapeHtml(message || 'Your answers have been submitted successfully.')}</p>
        ${scoreText ? `<strong>${escapeHtml(scoreText)}</strong>` : ''}
        <button type="button" class="submission-popup-btn">Back to Dashboard</button>
      </div>
    `;
    document.body.appendChild(backdrop);

    const finish = () => {
      window.location.href = redirectUrl;
    };
    backdrop.querySelector('.submission-popup-btn')?.addEventListener('click', finish);
    setTimeout(finish, 2600);
  }

  function renderTimer() {
    const el = document.getElementById('timer');
    if (!el) return;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    el.textContent = m + ':' + s;
    if (seconds < 180) el.style.color = '#ef4444';
  }

  function startTimer() {
    clearInterval(timerInterval);
    renderTimer();
    timerInterval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        renderTimer();
      } else {
        clearInterval(timerInterval);
        submitTest(true);
      }
    }, 1000);
  }

  function renderNav() {
    const nav = document.getElementById('q-nav');
    if (!nav) return;
    nav.innerHTML = '';
    questions.forEach((question, index) => {
      const qNumber = index + 1;
      const btn = document.createElement('button');
      btn.className = 'q-num' + (qNumber === currentQ ? ' active' : '') + (answers[question.id] !== undefined ? ' answered' : '');
      btn.textContent = qNumber;
      btn.addEventListener('click', () => goToQ(qNumber));
      nav.appendChild(btn);
    });
  }

  function goToQ(n) {
    if (submitting) return;
    currentQ = Math.max(1, Math.min(n, questions.length));
    loadQuestion(currentQ);
    renderNav();
  }

  function loadQuestion(n) {
    const q = questions[n - 1];
    const qText = document.getElementById('q-text');
    const optsCont = document.getElementById('options-container');
    const qNum = document.getElementById('q-num-label');
    const category = document.getElementById('aptitude-category');
    if (!q) return;

    if (category) category.textContent = q.category || 'Aptitude';
    if (qText) qText.textContent = q.question;
    if (qNum) qNum.textContent = n + '/' + questions.length;

    const progress = document.getElementById('aptitude-progress');
    if (progress) progress.textContent = `Question ${n} of ${questions.length}`;

    if (optsCont) {
      optsCont.innerHTML = '';
      (q.options || []).forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn' + (answers[q.id] === i ? ' selected' : '');
        btn.innerHTML = `<span class="option-radio">${answers[q.id] === i ? '&#10003;' : ''}</span>${escapeHtml(opt)}`;
        btn.addEventListener('click', () => selectOption(q.id, i, btn));
        optsCont.appendChild(btn);
      });
    }
  }

  function selectOption(questionId, optIdx, clickedBtn) {
    if (submitting) return;
    answers[questionId] = optIdx;
    document.querySelectorAll('.option-btn').forEach(button => {
      button.classList.remove('selected');
      const radio = button.querySelector('.option-radio');
      if (radio) radio.textContent = '';
    });
    clickedBtn.classList.add('selected');
    const radio = clickedBtn.querySelector('.option-radio');
    if (radio) radio.innerHTML = '&#10003;';
    renderNav();

    setTimeout(() => {
      if (currentQ < questions.length) goToQ(currentQ + 1);
    }, 300);
  }

  async function startTest() {
    const qText = document.getElementById('q-text');
    if (qText) qText.textContent = 'Generating aptitude assessment questions...';

    try {
      const response = await fetch('/api/aptitude/start', { method: 'POST' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Unable to start aptitude assessment.');
      }
      testId = data.test_id;
      questions = Array.isArray(data.questions) ? data.questions : [];
      if (!questions.length) throw new Error('No aptitude questions were generated.');
      seconds = Number(data.duration_seconds) || seconds;
      currentQ = 1;
      answers = {};
      loadQuestion(1);
      renderNav();
      if (pendingAutoSubmit) {
        submitTest(true);
      } else {
        startTimer();
      }
      return true;
    } catch (error) {
      if (qText) qText.textContent = error.message || 'Unable to load aptitude questions.';
      if (String(error.message || '').toLowerCase().includes('unauthorized')) {
        setTimeout(() => { window.location.href = 'user_login.html'; }, 1200);
      }
      return false;
    }
  }

  async function submitTest(autoTriggered = false) {
    if (!testId) {
      if (autoTriggered) {
        pendingAutoSubmit = true;
        lockForSubmit('Violation limit reached. Auto-submitting as soon as the test is ready...');
      }
      return;
    }
    if (submitting) return;
    clearInterval(timerInterval);
    submitting = true;
    lockForSubmit(autoTriggered ? 'Violation limit reached. Auto-submitting aptitude assessment...' : 'Submitting aptitude assessment...');

    const payload = {
      test_id: testId,
      answers: questions.map(q => ({
        id: q.id,
        answer: answers[q.id] ?? null
      })),
      proctoring_violations: proctor?.violations || 0,
      auto_submitted: Boolean(autoTriggered)
    };

    try {
      await proctor?.stopAndUpload({ test_id: testId, auto_submitted: Boolean(autoTriggered) });
      const response = await fetch('/api/aptitude/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit aptitude assessment.');
      }
      const cached = JSON.parse(localStorage.getItem('zyra_candidate_state') || '{}');
      localStorage.setItem('zyra_candidate_state', JSON.stringify({
        ...cached,
        aptitude_taken: true,
        aptitude_score_percent: data.score_percent,
        virtual_round_enabled: Boolean(data.promoted_to_virtual),
        virtual_taken: false
      }));
      showSubmissionPopup({
        title: 'Aptitude Assessment Submitted',
        message: data.promoted_to_virtual
          ? 'Your aptitude assessment was submitted successfully. The AI interview is now unlocked.'
          : 'Your aptitude assessment was submitted successfully. Your result has been sent to HR for review.',
        scoreText: `Score: ${data.score_percent}%`
      });
    } catch (error) {
      alert(error.message || 'Unable to submit aptitude assessment.');
      submitting = false;
      document.querySelectorAll('button, input').forEach(el => {
        el.disabled = false;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const testStarted = await startTest();
    if (!testStarted) return;

    try {
      proctor = new window.ZyraProctor({
        assessmentType: 'aptitude',
        videoElement: document.getElementById('proctor-video'),
        onAutoSubmit: () => submitTest(true)
      });
      await proctor.start();
    } catch (error) {
      const status = document.getElementById('proctor-status');
      if (status) status.textContent = error.message || 'Camera and microphone access is required for proctoring.';
    }

    document.getElementById('submit-test-btn')?.addEventListener('click', () => submitTest(false));
    document.getElementById('review-later-btn')?.addEventListener('click', () => {
      if (currentQ < questions.length) goToQ(currentQ + 1);
    });
  });
})();
