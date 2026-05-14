// AI Avatar Interview Logic - starts only after the candidate clicks Start Interview.
(function () {
  let questions = [];
  let currentQ = 0;
  let isRecording = false;
  let answers = [];
  let proctor = null;
  let startedAt = Date.now();
  let submitting = false;
  let seconds = 45 * 60;
  let timerInterval = null;
  let recognition = null;
  let finalTranscript = '';
  let interviewStarted = false;
  let pendingAutoSubmit = false;
  let totalQuestions = 0;
  let loadingNextQuestion = false;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function getResponseBox() {
    return document.getElementById('response-text');
  }

  function setHint(text) {
    const hint = document.getElementById('speech-placeholder');
    if (hint) hint.textContent = text;
  }

  function setSpeechMode(text) {
    const label = document.getElementById('speech-mode-label');
    if (label) label.textContent = text;
  }

  function setInterviewControlsDisabled(disabled) {
    document.querySelectorAll('.mic-start,.mic-stop,#submit-answer-btn,#repeat-btn,#next-question-btn').forEach(btn => {
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.55' : '';
    });
    const responseBox = getResponseBox();
    if (responseBox) responseBox.disabled = disabled;
  }

  function setSubmittingState(message) {
    setInterviewControlsDisabled(true);
    const el = document.getElementById('ai-question-text');
    if (el) el.textContent = message || 'Submitting interview...';
    const startBtn = document.getElementById('start-interview-btn');
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.textContent = 'Submitting...';
    }
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function showSubmissionPopup({ title, message, redirectUrl = 'user_dashboard.html' }) {
    const existing = document.querySelector('.submission-popup-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.className = 'submission-popup-backdrop';
    backdrop.innerHTML = `
      <div class="submission-popup" role="dialog" aria-modal="true" aria-labelledby="submission-title">
        <div class="submission-check" aria-hidden="true"></div>
        <h2 id="submission-title">${escapeHtml(title || 'Interview Submitted')}</h2>
        <p>${escapeHtml(message || 'Your interview has been submitted successfully.')}</p>
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
    const el = document.getElementById('avatar-timer');
    if (!el) return;
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    el.textContent = m + ':' + s;
    if (seconds < 300) el.style.color = '#ef4444';
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
        completeInterview(true);
      }
    }, 1000);
  }

  function resetResponseBox() {
    finalTranscript = '';
    const responseBox = getResponseBox();
    if (responseBox) responseBox.value = '';
    setHint('Start the microphone to capture your answer as text.');
    setSpeechMode('Text');
  }

  function loadQuestion(idx) {
    if (submitting) return;
    const el = document.getElementById('ai-question-text');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = questions[idx] || 'Question unavailable';
        el.style.opacity = '1';
        el.style.transition = 'opacity 0.4s';
      }, 200);
    }
    const progEl = document.getElementById('q-progress');
    if (progEl) progEl.textContent = `Question ${idx + 1} of ${totalQuestions || questions.length}`;
    updateQuestionButtons();
  }

  function updateQuestionButtons() {
    const nextBtn = document.getElementById('next-question-btn');
    const submitBtn = document.getElementById('submit-answer-btn');
    const isFinal = totalQuestions > 0 && currentQ >= totalQuestions - 1;
    if (nextBtn) nextBtn.textContent = isFinal ? 'Submit' : 'Next';
    if (submitBtn) submitBtn.textContent = isFinal ? 'Submit Interview' : 'Submit Answer';
  }

  async function loadQuestions() {
    const el = document.getElementById('ai-question-text');
    if (el) el.textContent = 'Preparing your first interview question...';

    const response = await fetch('/api/virtual/questions', { method: 'POST' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Unable to load avatar interview questions.');

    questions = Array.isArray(data.questions) ? data.questions : [];
    if (!questions.length) throw new Error('No avatar interview questions were generated.');

    totalQuestions = Number(data.planned_questions || data.total_questions) || questions.length;
    seconds = Number(data.duration_seconds) || seconds;
    currentQ = 0;
    answers = [];
    if (pendingAutoSubmit) return;
    resetResponseBox();
    loadQuestion(0);
    startTimer();
  }

  function resetAvatarVideo() {
    const video = document.getElementById('avatar-video');
    if (!video) return;
    video.pause();
    video.muted = true;
    try {
      video.currentTime = 0;
    } catch {}
  }

  function playAvatarVideoFromStart() {
    const video = document.getElementById('avatar-video');
    if (!video) return;
    video.pause();
    video.muted = true;
    video.loop = true;
    try {
      video.currentTime = 0;
    } catch {}
    video.play().catch(() => {});
  }

  function speakQuestion() {
    if (submitting || loadingNextQuestion) return;
    const question = questions[currentQ];
    if ('speechSynthesis' in window && question) {
      window.speechSynthesis.cancel();
      resetAvatarVideo();
      const utter = new SpeechSynthesisUtterance(question);
      utter.rate = 0.9;
      utter.pitch = 1;
      utter.onstart = playAvatarVideoFromStart;
      utter.onend = resetAvatarVideo;
      utter.onerror = resetAvatarVideo;
      window.speechSynthesis.speak(utter);
    } else {
      resetAvatarVideo();
    }
  }

  function createRecognition() {
    if (!SpeechRecognition) {
      setHint('Speech-to-text is not supported in this browser. You can type your response in the box.');
      return null;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0]?.transcript || '';
        if (event.results[i].isFinal) {
          finalTranscript += transcript.trim() + ' ';
        } else {
          interim += transcript;
        }
      }
      const responseBox = getResponseBox();
      if (responseBox) responseBox.value = (finalTranscript + interim).trim();
    };

    rec.onerror = () => {
      setHint('Speech capture paused. You can keep typing or start the microphone again.');
      setSpeechMode('Text');
    };

    rec.onend = () => {
      if (isRecording && !submitting) {
        try {
          rec.start();
        } catch {
          setHint('Speech capture paused. You can keep typing or start the microphone again.');
        }
      }
    };

    return rec;
  }

  function toggleMic(state) {
    if (!interviewStarted || !questions.length) {
      setHint('Click Start Interview before using the microphone.');
      return;
    }

    isRecording = state;
    const startBtns = document.querySelectorAll('.mic-start');
    const stopBtns = document.querySelectorAll('.mic-stop');

    startBtns.forEach(b => b.classList.toggle('active', state));
    stopBtns.forEach(b => b.classList.toggle('active', !state));

    if (state) {
      const responseBox = getResponseBox();
      finalTranscript = responseBox?.value ? responseBox.value.trim() + ' ' : '';
      recognition = recognition || createRecognition();
      if (recognition) {
        try {
          recognition.start();
          setHint('Listening. Your answer will appear in the text box.');
          setSpeechMode('Listening');
        } catch {
          setHint('Microphone is already listening.');
        }
      }
    } else {
      try {
        recognition?.stop();
      } catch {}
      setHint('Answer recorded. You can edit the text before submitting.');
      setSpeechMode('Text');
    }
  }

  function storeCurrentAnswer() {
    const responseText = getResponseBox()?.value || '';
    answers[currentQ] = responseText.trim();
  }

  async function submitAnswer() {
    if (!interviewStarted || !questions.length || submitting || loadingNextQuestion) return;
    storeCurrentAnswer();
    toggleMic(false);

    if (currentQ >= totalQuestions - 1) {
      completeInterview(false);
      return;
    }

    const currentAnswer = answers[currentQ] || '';
    if (!currentAnswer.trim()) {
      setHint('Please answer this question before moving to the next one.');
      return;
    }

    loadingNextQuestion = true;
    setInterviewControlsDisabled(true);
    const el = document.getElementById('ai-question-text');
    if (el) el.textContent = 'Reviewing your answer and preparing the next question...';

    try {
      const response = await fetch('/api/virtual/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questions[currentQ],
          answer: currentAnswer,
          next_index: currentQ + 1
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to prepare the next question.');
      if (!data.next_question) throw new Error('The next interview question was not generated.');
      totalQuestions = Number(data.planned_questions || totalQuestions) || totalQuestions;
      questions[currentQ + 1] = data.next_question;
      currentQ++;
      resetResponseBox();
      loadQuestion(currentQ);
      loadingNextQuestion = false;
      setInterviewControlsDisabled(false);
      speakQuestion();
    } catch (error) {
      setHint(error.message || 'Unable to prepare the next question. Please try again.');
      if (el) el.textContent = questions[currentQ] || 'Question unavailable';
      setInterviewControlsDisabled(false);
    } finally {
      loadingNextQuestion = false;
    }
  }

  async function completeInterview(autoSubmitted) {
    if (autoSubmitted && (!interviewStarted || !questions.length)) {
      pendingAutoSubmit = true;
      setSubmittingState('Violation limit reached. Auto-submitting as soon as interview questions are ready...');
      return;
    }
    if (submitting) return;
    submitting = true;
    setSubmittingState(autoSubmitted ? 'Violation limit reached. Auto-submitting interview...' : 'Submitting interview...');
    isRecording = false;
    clearInterval(timerInterval);
    window.speechSynthesis?.cancel();
    resetAvatarVideo();
    try {
      recognition?.stop();
    } catch {}

    if (interviewStarted && questions.length) storeCurrentAnswer();

    try {
      await proctor?.stopAndUpload({ auto_submitted: Boolean(autoSubmitted), answered_count: answers.filter(Boolean).length });
      const response = await fetch('/api/virtual/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          duration_seconds: Math.round((Date.now() - startedAt) / 1000),
          proctoring_violations: proctor?.violations || 0,
          auto_submitted: Boolean(autoSubmitted)
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to submit interview.');
      localStorage.removeItem('zyra_avatar_answers');
      localStorage.setItem('zyra_candidate_state', JSON.stringify({
        ...(JSON.parse(localStorage.getItem('zyra_candidate_state') || '{}')),
        virtual_taken: true,
        virtual_round_enabled: true
      }));
      showSubmissionPopup({
        title: 'Interview Submitted',
        message: 'Your AI avatar interview was submitted successfully. HR will review your responses.'
      });
    } catch (error) {
      submitting = false;
      if (seconds > 0 && interviewStarted) startTimer();
      alert(error.message || 'Unable to submit interview.');
    }
  }

  async function startInterview() {
    if (interviewStarted || submitting) return;
    const startBtn = document.getElementById('start-interview-btn');
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.textContent = 'Starting...';
    }

    try {
      await loadQuestions();

      proctor = new window.ZyraProctor({
        assessmentType: 'avatar',
        videoElement: document.getElementById('proctor-video'),
        onAutoSubmit: () => completeInterview(true)
      });
      try {
        await proctor.start();
      } catch (proctorError) {
        const status = document.getElementById('proctor-status');
        if (status) status.textContent = proctorError.message || 'Camera and microphone access is required for proctoring.';
      }

      startedAt = Date.now();
      if (pendingAutoSubmit) {
        questions = questions.length ? questions : [];
        totalQuestions = totalQuestions || questions.length;
        interviewStarted = true;
        await completeInterview(true);
        return;
      }
      interviewStarted = true;
      setInterviewControlsDisabled(false);
      speakQuestion();
      if (startBtn) startBtn.textContent = 'Interview Started';
    } catch (error) {
      const el = document.getElementById('ai-question-text');
      if (el) el.textContent = error.message || 'Camera and microphone access is required to start the interview.';
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Start Interview';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTimer();
    setInterviewControlsDisabled(true);

    document.getElementById('start-interview-btn')?.addEventListener('click', startInterview);

    document.querySelectorAll('.mic-start').forEach(b => {
      b.addEventListener('click', () => toggleMic(true));
    });

    document.querySelectorAll('.mic-stop').forEach(b => {
      b.addEventListener('click', () => toggleMic(false));
    });

    document.getElementById('repeat-btn')?.addEventListener('click', speakQuestion);
    document.getElementById('submit-answer-btn')?.addEventListener('click', submitAnswer);
    document.getElementById('next-question-btn')?.addEventListener('click', submitAnswer);
  });
})();
