# ZYRA: AI-POWERED RECRUITMENT, SCREENING, AND INTERVIEW MANAGEMENT SYSTEM

## TABLE OF CONTENTS

| S.NO | CHAPTERS | PAGE.NO |
|---:|---|:---:|
| 1. | **Chapter 1: INTRODUCTION** | **1** |
|  | 1.1 Introduction | 1 |
|  | 1.2 Research Motivation | 2 |
|  | 1.3 Problem Definition | 3 |
|  | 1.4 Significance | 4 |
|  | 1.5 Applications | 5 |
|  | 1.6 Objectives of the Project | 6 |
| 2. | **Chapter 2: LITERATURE SURVEY** | **7** |
|  | 2.1 Overview of Existing Studies | 7 |
| 3. | **Chapter 3: SYSTEM ANALYSIS (EXISTING SYSTEM)** | **9** |
|  | 3.1 Manual Record-Keeping System | 9 |
|  | 3.2 Isolated Departmental Software | 10 |
|  | 3.3 Telephonic and Paper-Based Coordination | 11 |
|  | 3.4 Basic Spreadsheet-Based Tracking | 12 |
|  | 3.5 Overall Drawbacks of Traditional Systems | 13 |
| 4. | **Chapter 4: PROPOSED SYSTEM** | **15** |
|  | 4.1 System Overview | 15 |
|  | 4.2 Key Features and Functionalities | 15 |
|  | 4.3 Advantages of Proposed System | 16 |
| 5. | **Chapter 5: SYSTEM REQUIREMENTS** | **17** |
|  | 5.1 Hardware Requirements | 17 |
|  | 5.2 Software Requirements | 17 |
|  | 5.3 Functional Requirements | 18 |
|  | 5.4 Non-Functional Requirements | 18 |
| 6. | **Chapter 6: TECHNOLOGY DESCRIPTION** | **19** |
|  | 6.1 Python and Django Framework | 19 |
|  | 6.1.1 Features of Django | 20 |
|  | 6.3 Database Models | 21 |
|  | 6.4 Image Processing and Digital Records | 23 |
|  | 6.5 Steps in System Workflow | 24 |
| 7. | **Chapter 7: SYSTEM DESIGN AND DIAGRAMS** | **25** |
|  | 7.1 Input Design | 25 |
|  | 7.2 Output Design | 25 |
|  | 7.3 Data Flow Diagram | 26 |
|  | 7.4 UML Class Diagram | 27 |
|  | 7.5 Use Case Diagram | 28 |
|  | 7.6 Sequence Diagram | 29 |
|  | 7.7 Activity Diagram | 30 |
|  | 7.8 ER Diagram | 31 |
|  | 7.9 System Architecture | 32 |
|  | 7.10 Matching and Classification Logic | 33 |
| 8. | **Chapter 8: SAMPLE CODE** | **34** |
| 9. | **Chapter 9: TESTING** | **40** |
|  | 9.1 Basics of Software Testing | 40 |
|  | 9.2 Types of Testing | 40 |
| 10. | **Chapter 10: RESULTS AND DISCUSSION** | **42** |
| 11. | **Chapter 11: PERFORMANCE ANALYSIS** | **49** |
| 12. | **Chapter 12: CONCLUSION AND FUTURE SCOPE** | **51** |
| 13. | **Chapter 13: REFERENCES** | **52** |

---

## LIST OF FIGURES

| S.NO | FIGURE NAME | PAGE.NO |
|---:|---|:---:|
| 1. | 1.2.1 AI Recruitment Workflow | 2 |
| 2. | 1.2.2 Candidate Application Flow | 3 |
| 3. | 1.3.1 Security Features of Zyra | 5 |
| 4. | 1.4.1 Block Diagram of Zyra Recruitment System | 6 |
| 5. | 3.5.1 Modules Flow Diagram | 14 |
| 6. | 5.1.1 Flask Application Architecture | 18 |
| 7. | 5.5.1 Cloudinary and MongoDB Storage Flow | 23 |
| 8. | 6.3.1 Data Flow Diagram | 25 |
| 9. | 6.4.1 UML Diagram | 26 |
| 10. | 6.5.1 Use Case Diagram | 27 |
| 11. | 6.6.1 Sequence Diagram | 28 |
| 12. | 6.7.1 Activity Diagram | 29 |
| 13. | 6.8.1 System Design Flow Diagram | 30 |
| 14. | 10.1 Performance Analysis Flow Chart | 46 |

---

## LIST OF SCREENSHOTS

| S.NO | LIST OF FIGURES | PAGE.NO |
|---:|---|:---:|
| 1. | 9.1.1 Landing Page | 41 |
| 2. | 9.2.1 Job Application Page | 41 |
| 3. | 9.3.1 Candidate Dashboard | 42 |
| 4. | 9.4.1 MCQ Test Page | 42 |
| 5. | 9.4.2 Coding Assessment Page | 42 |
| 6. | 9.5.1 AI Avatar Interview Page | 43 |
| 7. | 9.6.1 HR Dashboard Report Page | 43 |
| 8. | 9.7.1 Candidate Selection Result | 44 |

---

## LIST OF ACRONYMS

| ACRONYM | EXPANSION |
|---|---|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| ATS | Applicant Tracking System |
| CSS | Cascading Style Sheets |
| DB | Database |
| DFD | Data Flow Diagram |
| D-ID | Digital Human / Avatar API Provider |
| DOM | Document Object Model |
| GUI | Graphical User Interface |
| HR | Human Resources |
| HTML | Hyper Text Markup Language |
| HTTP | Hyper Text Transfer Protocol |
| JSON | JavaScript Object Notation |
| LLM | Large Language Model |
| MCQ | Multiple Choice Question |
| MVC | Model View Controller |
| NLP | Natural Language Processing |
| PDF | Portable Document Format |
| REST | Representational State Transfer |
| SMTP | Simple Mail Transfer Protocol |
| UI | User Interface |
| UML | Unified Modeling Language |
| UX | User Experience |

---

## LIST OF TABLES

| S.NO | TABLE NAME | PAGE.NO |
|---:|---|:---:|
| 1. | 4.2 Hardware Requirements | 15 |
| 2. | 4.3 Software Requirements | 15 |
| 3. | 8.1 Testing Summary | 39 |
| 4. | 10.1 Performance Analysis | 45 |

---

## LIST OF SYMBOLS

| S.NO | SYMBOL | NAME |
|---:|---|---|
| 1. | Oval | Use Case / Process Start |
| 2. | Stick Figure | Actor |
| 3. | Vertical Dashed Line | Lifeline |
| 4. | Arrow | Directed Association |
| 5. | Horizontal Arrow | Message |
| 6. | Rectangle | Class / Process |
| 7. | Dashed Arrow | Reply Message |

---

# CHAPTER 1: INTRODUCTION

## 1.1 Introduction

Zyra is an AI-powered recruitment, screening, and interview management system designed to automate the early stages of hiring. The system helps candidates apply for jobs, upload PDF resumes, complete MCQ assessments, attend an AI avatar interview, and allows HR to review detailed candidate reports from a centralized dashboard.

Traditional recruitment workflows require manual resume checking, repeated communication, manual test scheduling, and subjective interview evaluation. Zyra reduces this workload by combining resume analysis, automated credential generation, role-based assessments, proctoring, and HR-only reporting. The project is implemented as a Flask-based web application with MongoDB as the database, Cloudinary/GridFS for large files, Groq and optional Ollama support for AI generation, and a responsive HTML, CSS, and JavaScript frontend.

## 1.2 AI-Driven Recruitment

AI-driven recruitment uses automated analysis to support hiring decisions. In Zyra, AI is used to:

- Analyze resume relevance against the selected job role.
- Generate MCQ questions based on the candidate's role and skills.
- Support optional coding assessment for technical candidates.
- Generate AI avatar interview questions.
- Evaluate candidate interview answers.
- Prepare HR recommendations and reports.

The system is not intended to replace HR completely. Instead, it supports HR by filtering candidates, organizing evidence, identifying review cases, and presenting structured reports for final human review.

## 1.2.1 Ethical Provisions Against Unfair Screening

Recruitment systems must avoid unfair rejection based on irrelevant personal details. Zyra is designed to focus on role-related information such as skills, resume score, MCQ performance, answer quality, and proctoring behavior. The final recommendation is shown only to HR so that a human reviewer can make the final decision.

Important ethical principles followed by the system are:

- Candidate evaluation should be based on relevant job requirements.
- Reports should explain why a candidate is recommended or rejected.
- Candidate data must be protected from unnecessary exposure.
- Proctoring flags should trigger manual review instead of automatic final hiring.
- Automated decisions should support HR review, not blindly replace it.

## 1.2.2 Storage of Resume and Candidate Data

Zyra stores candidate applications, resume metadata, test results, proctoring details, and interview reports in MongoDB. Resume files and proctoring video files can be stored in Cloudinary, while MongoDB stores links and structured records. If video upload to Cloudinary fails, the system can store the recording in MongoDB GridFS as a fallback. This design keeps large files separate from application records where possible while still allowing HR to access required evidence.

## 1.2.3 Reason for Selecting the Project

The project was selected because recruitment is a practical real-world problem. Companies receive many applications and need a faster way to shortlist suitable candidates. Zyra demonstrates how modern web development, database systems, AI question generation, proctoring, and dashboard reporting can be combined into a complete hiring workflow.

## 1.3 Security Features of Zyra

Security and test integrity are important in online assessments. Zyra includes:

- Candidate and HR login separation.
- Session-based page protection.
- HR-only report access.
- Role-based HR actions for admin, HR, and recruiter users.
- Camera and microphone requirement during test interfaces.
- Tab switching detection.
- Multiple-user camera warning support.
- Proctoring warning count.
- Automatic submission after repeated violations.
- PDF resume required during application.
- Configurable login attempt limits for promoted candidates.
- Demo user support without persistent test data.

## 1.4 Objectives of the Project

The main objectives of Zyra are:

To provide a complete web-based recruitment platform.
To provide a shared job catalog for HR and candidate application flow.
To allow candidates to apply for jobs with PDF resume upload.
To analyze resumes and generate candidate credentials automatically.
To conduct AI-generated MCQ tests with 20 questions.
To support a technical coding round when HR promotes technical candidates.
To conduct AI avatar interviews with 15 to 20 questions.
To prevent repeated questions in interview stages.
To monitor candidate behavior through proctoring.
To store candidate results and reports securely.
To display detailed reports only to HR.
To provide HR with a recommendation based on resume, MCQ, coding, interview, and proctoring evidence.

---

# CHAPTER 2: LITERATURE SURVEY

Recruitment management systems have evolved from manual paper-based processes to web-based applicant tracking systems. Modern systems use resume parsing, keyword matching, online assessments, video interviews, proctoring, and AI-based screening to improve hiring efficiency.

Applicant Tracking Systems are widely used to store candidate profiles and manage hiring stages. However, many traditional ATS tools still require manual resume reading and do not provide an integrated test and interview workflow. Online assessment platforms provide tests but may not include resume screening or HR reporting in the same system.

AI interview systems use natural language models to generate questions and analyze responses. These systems help create role-specific interviews, but they must be used carefully because recruitment decisions require transparency, explainability, and human review. Zyra combines these ideas into one platform by integrating resume analysis, MCQ screening, optional technical coding assessment, avatar interviews, proctoring, and HR reporting.

The literature survey shows that an effective recruitment system should support:

- Candidate application collection.
- Resume screening.
- Automated assessments.
- Technical coding checks where needed.
- Interview evaluation.
- Proctoring and test integrity.
- HR decision support.
- Secure storage of candidate data.

Zyra implements these features in a compact project suitable for academic demonstration and practical extension.

---

# CHAPTER 3: SYSTEM ANALYSIS

## 3.1 Purpose

The purpose of Zyra is to reduce manual recruitment effort and provide a structured digital hiring workflow. It helps HR manage applications and helps candidates complete the required assessment stages from a browser.

## 3.2 Scope

The scope of the project includes:

- Landing page and job application form.
- Shared job catalog with role details.
- Resume upload and validation.
- ATS-style resume score calculation.
- Automatic credential generation for shortlisted candidates.
- Candidate login and dashboard.
- AI MCQ test generation.
- Optional coding assessment for technical roles.
- AI avatar interview.
- Proctoring during test interfaces.
- HR dashboard for shortlisted, rejected, and report views.
- HR-only candidate reports with recommendation.

## 3.3 Existing System

In the existing manual recruitment system, candidates submit resumes through email or forms. HR teams manually review resumes, schedule tests, conduct interviews, and prepare reports. This process takes more time and may be inconsistent across candidates.

## 3.3.1 Disadvantages of Existing System

- Manual resume checking is time-consuming.
- Test scheduling requires repeated communication.
- Interview questions may be inconsistent.
- Candidate reports are often subjective.
- It is difficult to track cheating in online tests.
- HR must manually maintain shortlisted and rejected candidate lists.
- Data may be scattered across emails, spreadsheets, and documents.

## 3.4 Proposed System

Zyra provides a unified recruitment system with automated candidate screening and HR reporting. Candidates apply through a structured form, upload a resume, receive credentials when qualified, and complete online assessments. HR can view applicant status and final reports from one dashboard.

## 3.4.1 Introduction

The proposed system uses Flask for backend routing, MongoDB for database storage, Groq LLM with optional Ollama and deterministic fallback logic for question generation and evaluation support, Cloudinary/GridFS for file storage, SMTP for email communication, and vanilla JavaScript for frontend interactivity.

## 3.4.2 Advantages of Proposed System

- Reduces manual HR effort.
- Provides structured candidate data.
- Generates role-based MCQ and avatar interview questions.
- Supports technical and non-technical assessment tracks.
- Provides optional coding round support for technical candidates.
- Avoids repeated interview questions.
- Locks reports to HR only.
- Supports test proctoring.
- Automatically submits tests after repeated violations.
- Provides evidence-based HR recommendations.
- Allows modular future development.

## 3.5 Modules

The main modules are:

1. **Landing Page Module:** Displays the Zyra introduction and navigation to Apply, HR login, and User login.
2. **Application Module:** Collects candidate details, selected job role, skills, and required PDF resume file.
3. **Resume Screening Module:** Extracts resume data and calculates role suitability.
4. **Credential Generation Module:** Creates candidate login credentials when the resume score meets the required threshold.
5. **Candidate Dashboard Module:** Shows MCQ, coding, and AI avatar interview access based on candidate progress.
6. **MCQ Test Module:** Generates 20 role-based questions and records candidate answers.
7. **Coding Assessment Module:** Provides coding questions and evaluation for technical candidates when HR enables the round.
8. **Proctoring Module:** Monitors tab switching, camera availability, warnings, and automatic submission.
9. **AI Avatar Interview Module:** Generates 15 to 20 interview questions, captures responses, and submits answers.
10. **HR Dashboard Module:** Shows jobs, shortlisted candidates, rejected candidates, and reports.
11. **Report Module:** Generates HR-only candidate description, stage scores, strengths, improvements, evidence, and recommendation.

---

# CHAPTER 4: SYSTEM REQUIREMENTS

## 4.1 Introduction

System requirements describe the hardware, software, and functional needs required to run and maintain Zyra.

## 4.2 Hardware Requirements

| COMPONENT | MINIMUM REQUIREMENT |
|---|---|
| Processor | Intel i3 or equivalent |
| RAM | 4 GB minimum, 8 GB recommended |
| Storage | 1 GB free space for project files |
| Camera | Required for proctored tests |
| Microphone | Required for avatar interview |
| Network | Stable internet connection |

## 4.3 Software Requirements

| SOFTWARE | REQUIREMENT |
|---|---|
| Operating System | Windows / Linux / macOS |
| Backend | Python 3.x |
| Framework | Flask |
| Database | MongoDB / MongoDB Atlas |
| Frontend | HTML, CSS, JavaScript |
| AI Provider | Groq API, optional Ollama, deterministic fallback |
| File Storage | Cloudinary with MongoDB GridFS fallback for recordings |
| PDF Parsing | pypdf / PyPDF2 fallback |
| Email Service | SMTP |
| Browser | Chrome or Edge recommended |

## 4.4 Functional Requirements

- Candidate can apply for a job.
- Candidate can select a role from the shared job catalog.
- PDF resume must be uploaded during application.
- HR can log in to dashboard.
- Candidate can log in with generated credentials.
- MCQ test must generate 20 questions.
- Technical candidates can be promoted to a coding assessment.
- Avatar interview must generate 15 to 20 questions.
- Questions should not repeat across interview stages.
- Proctoring violations must be recorded.
- Test must auto-submit after repeated violations.
- HR can view shortlisted, rejected, and completed report lists.
- Candidate report must not be visible to users.

## 4.5 Non-Functional Requirements

- The system should be responsive on desktop and mobile screens.
- The UI should be simple, clean, and easy to use.
- Candidate data should be protected.
- The system should handle API failures with fallback logic.
- External service configuration should remain outside source code.
- Reports should be readable and useful for HR.
- The backend should validate important actions.

---

# CHAPTER 5: TECHNOLOGY DESCRIPTION

## 5.1 Python and Flask

Python is used as the primary backend programming language. Flask is used to define routes, process requests, handle sessions, connect to MongoDB, and return JSON responses to the frontend.

## 5.1.1 Features

Important Flask features used in Zyra:

- Route management.
- Session-based authentication.
- JSON API responses.
- Template rendering.
- File upload handling.
- Integration with external services.

## 5.2 MongoDB

MongoDB is a NoSQL database used to store flexible candidate records. It supports document-based storage, which is suitable for applications, users, test data, and reports.

## 5.2.1 Collections

Main collections used:

- `applications`: Stores candidate applications and resume screening results.
- `users`: Stores candidate accounts, progress, scores, and reports.
- `tests`: Stores MCQ test sessions and questions.
- `coding_tests`: Stores coding round sessions, questions, answers, scores, and feedback if enabled.
- `jobs`: Stores job role data.
- GridFS collections: Store proctoring video files when Cloudinary upload is unavailable.

## 5.3 Groq, Ollama, and AI Fallback Integration

Groq LLM is used for AI-powered generation and evaluation tasks. Optional Ollama support can be used for local MCQ generation when configured. If external AI services are unavailable, Zyra uses deterministic fallback questions so that the assessment flow can still continue during demonstrations or temporary API failures.

In Zyra, AI support is used for:

- MCQ question generation.
- AI avatar interview question generation.
- Coding question generation and evaluation support.
- Interview evaluation.
- Candidate report support.

The backend normalizes generated questions, removes duplicate or highly similar questions, and limits the virtual interview to the configured 15 to 20 question range.

## 5.4 HTML, CSS, and JavaScript

The frontend is built using HTML, CSS, and vanilla JavaScript. HTML defines the page structure, CSS provides the premium Zyra UI design, and JavaScript handles form validation, API calls, dashboard rendering, job catalog previews, MCQ test logic, avatar interview controls, proctoring behavior, and logout actions.

## 5.5 Cloudinary, GridFS, SMTP, and Supporting Services

Cloudinary is used to store uploaded resumes and proctoring recordings. If a proctoring recording cannot be uploaded to Cloudinary, MongoDB GridFS can store the video as a fallback. SMTP is used to send credentials and application updates to candidates. Environment variables in `.env` keep sensitive configuration separate from the source code.

The project also supports D-ID-related configuration for avatar media workflows and serves a local interview avatar video through the Flask route `/media/interview-avatar`.

---

# CHAPTER 6: SYSTEM DESIGN AND DEVELOPMENT

## 6.1 Input Design

The input forms are designed to collect accurate and structured data. Candidate input includes personal information, selected job role, skills, PDF resume file, and required declarations. HR input includes job creation fields such as title, department, location, experience, required skills, threshold, and description. Test interfaces collect MCQ answers, coding answers when enabled, video/audio permissions, proctoring metadata, and avatar interview text responses.

## 6.2 Output Design

The system outputs:

- Application submission confirmation.
- Candidate credentials through email.
- Candidate dashboard status.
- MCQ result and next-stage unlock status.
- Coding round score and feedback for technical candidates.
- HR dashboard lists.
- HR-only candidate reports with final recommendation.

## 6.3 Data Flow Diagram

Textual DFD representation:

1. Candidate submits application.
2. System stores application and resume data.
3. Resume screening module calculates score.
4. If score is eligible, candidate account is generated.
5. Candidate logs in and takes MCQ test.
6. If qualified, avatar interview is unlocked.
7. If HR promotes a technical candidate for extra review, coding assessment can be enabled before the avatar interview.
8. Interview answers and proctoring data are stored.
9. HR dashboard retrieves report data.
10. HR makes final decision.

## 6.4 UML Diagram

Main classes and entities:

- Candidate
- Application
- Job
- Test
- Coding Test
- Interview
- Report
- HR Admin

Relationships:

- Candidate submits Application.
- Application belongs to Job.
- Candidate takes Test.
- Candidate may take Coding Test for technical roles.
- Candidate attends Interview.
- Report is generated for Candidate.
- HR Admin reviews Report.

## 6.5 Use Case Diagram

Actors:

- Candidate
- HR Admin
- AI Service
- Storage Service

Use cases:

- Apply for job.
- Upload resume.
- Receive credentials.
- Take MCQ test.
- Complete coding assessment if enabled.
- Attend avatar interview.
- View HR dashboard.
- Shortlist or reject candidate.
- View final report.

## 6.6 Sequence Diagram

Candidate assessment sequence:

1. Candidate logs in.
2. Candidate opens dashboard.
3. System checks candidate stage.
4. Candidate starts MCQ.
5. System generates questions.
6. Candidate submits answers.
7. System evaluates score.
8. If qualified, avatar interview unlocks.
9. If HR requires a technical coding check, candidate completes the coding round.
10. Candidate starts avatar interview.
11. System generates interview questions.
12. Candidate submits responses.
13. System stores final report.
14. HR views report.

## 6.7 Activity Diagram

Activity flow:

Start -> Apply for Job -> Upload Resume -> ATS Screening -> Credentials Generated -> Candidate Login -> MCQ Test -> Score Check -> Optional Coding Round -> Avatar Interview -> Proctoring and Answer Capture -> HR Report -> HR Decision -> End

## 6.8 System Design

Zyra follows a modular design:

- Frontend pages are stored inside `templates`.
- Static assets are stored inside `static/css` and `static/js`.
- Backend routes and business logic are mainly in `app.py`.
- AI-related helper files are stored inside `ai`.
- Additional interview API routes are stored inside `api`.
- Configuration is loaded from `.env` through `config.py`.

Important implemented pages include `index.html`, `apply.html`, `user_login.html`, `user_dashboard.html`, `mcq_test.html`, `avatar_interview.html`, `hr_login.html`, `admin_dashboard.html`, and `report.html`.

## 6.9 Resume Screening and ATS Scoring

The resume screening module extracts text from PDF resumes using `pypdf` with a fallback parser if available. It compares the resume text and candidate skills with the selected job role, required skills, and job description. The score is used to decide whether credentials should be generated automatically. The default auto-credential threshold is 60%, and job-level thresholds can also be configured.

## 6.10 AI MCQ and Avatar Interview

The MCQ test contains at least 20 questions. Questions are generated using the candidate's job role and skills. The AI avatar interview contains 15 to 20 questions based on configuration. The first questions focus on professional background, and the remaining questions are role-based. The system avoids repeated and similar questions across MCQ and avatar stages.

## 6.11 Technical Coding Round

Zyra includes a coding assessment API for technical candidates. HR can manually promote a technical candidate to the coding round when more evidence is needed before the avatar interview. The system generates two coding questions, stores the coding session, evaluates submitted answers, records score and feedback, and then unlocks the virtual interview.

## 6.12 Candidate Classification and HR Report

After assessment completion, the system generates HR-only reports. The report contains:

- Overall score.
- Resume, MCQ, coding, and avatar interview scores where applicable.
- Weighted stage scores for standard and technical tracks.
- Candidate strengths.
- Improvement areas.
- Proctoring warnings.
- Answer evidence.
- HR recommendation.

The candidate cannot view this report. Report routes and dashboard APIs require HR/admin session access.

---

# CHAPTER 7: SAMPLE CODE

## 7.1 Candidate Login Session

```python
@app.route("/api/candidate/login", methods=["POST"])
def candidate_login():
    data = request.get_json() or {}
    username = str(data.get("username", "")).strip().lower()
    password = str(data.get("password", "")).strip()
    user = users.find_one({"username": username})
    if not user:
        return jsonify({"error": "Invalid username"}), 401
    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid password"}), 401
    session.clear()
    session["candidate_id"] = str(user["_id"])
    return jsonify({"message": "Login successful"})
```

## 7.2 HR Dashboard API

```python
@app.route("/api/admin/applications")
def get_applications():
    if not session.get("admin"):
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({
        "pending": pending,
        "selected": selected,
        "rejected": rejected,
        "reports": reports
    })
```

## 7.3 MCQ Submission Logic

```python
score_percent = round((score_raw / total_questions) * 100, 1)
auto_qualified = score_percent >= MCQ_PROMOTION_THRESHOLD_PERCENT
users.update_one(
    {"_id": ObjectId(session["candidate_id"])},
    {"$set": {
        "interview_taken": True,
        "mcq_score_percent": score_percent,
        "virtual_round_enabled": bool(auto_qualified)
    }}
)
```

## 7.4 Proctoring Auto Submit

```javascript
recordViolation(reason) {
  this.violations += 1;
  if (this.violations >= 3 && !this.autoSubmitStarted) {
    this.autoSubmitStarted = true;
    this.onAutoSubmit?.();
  }
}
```

## 7.5 HR Report Recommendation

```python
if high_risk_proctoring or violation_count >= 3:
    action = "Manual review required before any hiring decision"
elif live_interview_score >= 7.5 and overall_score >= 70:
    action = "Advance to HR or final interview"
elif live_interview_score >= 5.5 and overall_score >= 55:
    action = "Keep on hold for focused HR review"
else:
    action = "Reject or place in backup pool"
```

## 7.6 Coding Round Enablement

```python
assessment_track = user.get(
    "assessment_track",
    resolve_assessment_track(user.get("job_role"), user.get("skills"), user)
)
enable_coding = assessment_track == "technical" and not user.get("coding_taken")

if enable_coding:
    update_fields.update({
        "coding_round_enabled": True,
        "virtual_round_enabled": False,
        "virtual_decision": "pending_coding",
    })
else:
    update_fields.update({
        "virtual_round_enabled": True,
        "virtual_decision": "promoted",
    })
```

---

# CHAPTER 8: TESTING

## 8.1 Basics of Software Testing

Testing is performed to verify that the system behaves correctly and does not fail during important user actions. Zyra was tested through backend compilation, JavaScript syntax checking, login flow testing, route guard testing, dashboard loading checks, PDF resume validation, and assessment flow checks.

## 8.1.1 Black Box Testing

Black box testing was used to verify system behavior without checking internal code. Examples:

- Login with valid and invalid credentials.
- Access protected pages without login.
- Submit application without resume.
- Submit application with a non-PDF resume.
- Open dashboard buttons.
- Verify HR-only report access.

## 8.1.2 White Box Testing

White box testing was used to check backend logic and route conditions. Examples:

- Candidate session clearing.
- HR route authorization.
- MCQ completion state.
- Coding round authorization.
- Avatar lock conditions.
- Report visibility restrictions.

## 8.2 Types of Testing

| TEST CASE | EXPECTED RESULT | STATUS |
|---|---|---|
| HR login | Opens HR dashboard | Passed |
| Candidate login | Opens user dashboard | Passed |
| User logout | Clears backend session | Passed |
| HR logout | Clears backend session | Passed |
| Protected HR route without login | Redirects to HR login | Passed |
| Protected candidate route without login | Redirects to candidate login | Passed |
| Candidate report access | Redirects to HR login/dashboard | Passed |
| Resume without PDF format | Shows validation error | Passed |
| Technical coding route without permission | Shows authorization/round error | Passed |
| JS syntax check | No syntax errors | Passed |
| Python compile check | No syntax errors | Passed |

## 8.2.1 Unit Testing

Individual logic units such as score calculation, question normalization, duplicate question prevention, route guards, coding round checks, and report generation were checked separately.

## 8.2.2 System Testing

The complete system was tested from login to dashboard access using real HTTP requests.

## 8.2.3 Usability Testing

The UI was checked for clear navigation, visible buttons, dashboard layout, and test page flow.

## 8.2.4 Acceptance Testing

The project meets the expected academic and functional requirements: application, login, MCQ, optional coding assessment, avatar interview, proctoring, and HR report.

## 8.2.5 Regression Testing

After fixing login, report visibility, dashboard behavior, and assessment flow changes, previous features were rechecked to ensure they still worked.

---

# CHAPTER 9: RESULTS

## 9.1 Landing Page

The landing page shows the Zyra brand, main action buttons, service cards, and navigation to Apply, HR login, and candidate login.

## 9.2 Job Application Page

The application page allows candidates to choose a job, review role details, enter personal details, provide skills, upload a required PDF resume, and submit the application.

## 9.3 Candidate Login and Dashboard

Candidate login validates credentials and opens the user dashboard. The dashboard displays MCQ, coding, and avatar interview modules based on candidate progress and assessment status.

## 9.4 MCQ Test Interface

The MCQ page displays generated questions, answer options, timer, proctoring video, and submit controls. The test contains 20 questions by default.

## 9.4.1 Coding Assessment Interface

The coding assessment interface is available for technical candidates when HR enables the round. It displays generated coding questions, answer fields, and submission controls, then stores score and feedback.

## 9.5 AI Avatar Interview Interface

The avatar interview page displays the AI avatar video, generated question, response text box, microphone controls, timer, and proctoring feed. The interview begins only when the candidate clicks Start Interview and is protected by candidate session and stage checks.

## 9.6 HR Dashboard and Reports

The HR dashboard displays job listings, pending applications, shortlisted candidates, rejected candidates, and completed reports. HR can create jobs, accept or reject candidates, promote candidates to the next assessment stage, resend credentials, and open detailed reports.

## 9.7 Final Result

Zyra successfully automates the recruitment screening workflow and provides HR with a structured recommendation based on resume score, MCQ performance, optional coding evidence, avatar interview answers, and proctoring behavior.

---

# CHAPTER 10: PERFORMANCE ANALYSIS

| MODULE | PERFORMANCE FACTOR | ANALYSIS |
|---|---|---|
| Landing Page | Load speed | Lightweight HTML/CSS gives fast loading. |
| Application Form | Validation | Resume required and form fields are checked. |
| Resume Screening | Accuracy | Uses role and skill matching to produce ATS score. |
| MCQ Generation | Relevance | Questions are generated from candidate job role and skills. |
| Coding Round | Technical depth | Provides extra evidence for technical candidates when enabled. |
| Avatar Interview | Question quality | Uses AI generation and duplicate prevention. |
| Proctoring | Integrity | Detects tab switching, camera issues, multiple-user warnings, and warning count. |
| HR Dashboard | Usability | Left panel is fixed and right panel scrolls. |
| Report Generation | Decision support | Gives HR recommendation with stage scores, answer evidence, and proctoring context. |

The system is suitable for small to medium recruitment workflows. Performance depends on internet connectivity, MongoDB response time, AI API response time, browser camera permissions, SMTP availability, and external storage availability. Deterministic fallback logic improves reliability when AI providers are temporarily unavailable.

---

# CHAPTER 11: CONCLUSION

Zyra is a complete AI-powered recruitment, screening, and interview management system. It supports job management, application collection, resume screening, candidate credentials, MCQ tests, optional coding assessment, avatar interviews, proctoring, and HR-only reporting. The system reduces manual effort and improves consistency in early-stage hiring.

The project demonstrates integration of Flask, MongoDB, Groq LLM, optional Ollama generation, Cloudinary, GridFS fallback, SMTP, and vanilla frontend technologies. It also includes important security and usability features such as session separation, route protection, proctoring warnings, automatic test submission, HR-only reports, and configurable fallback behavior.

---

# CHAPTER 12: FUTURE SCOPE

Future improvements can include:

- Advanced face detection using a dedicated computer vision model.
- Browser-based identity verification.
- Downloadable PDF reports for HR.
- Role-specific competency frameworks.
- Stronger coding assessment editor with test cases.
- Multi-language interview support.
- Calendar integration for final HR interviews.
- Analytics dashboard for recruitment trends.
- More detailed bias and fairness review.
- Mobile application support.
- Integration with job portals.

---

# CHAPTER 13: REFERENCES

1. Flask Documentation, for backend web application development.
2. MongoDB Documentation, for NoSQL database storage.
3. PyMongo Documentation, for Python and MongoDB integration.
4. Groq API Documentation, for LLM-based question generation and evaluation.
5. Ollama Documentation, for optional local AI generation.
6. Cloudinary Documentation, for file and video storage.
7. pypdf Documentation, for PDF resume text extraction.
8. HTML, CSS, and JavaScript web standards.
9. Software Engineering principles for system analysis, design, testing, and documentation.
10. UML modeling concepts for use case, sequence, activity, and class diagrams.
11. Applicant Tracking System concepts used in recruitment management.
12. Online proctoring principles for remote test integrity.
