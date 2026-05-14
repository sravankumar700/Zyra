# ZYRA Viva Preparation

This file contains likely viva questions that external faculty may ask about the **Zyra: AI-Powered Recruitment, Screening, and Interview Management System** project, along with simple and confident sample answers.

## How to Answer in Viva

- Keep answers short, clear, and structured.
- Start with the main point in one sentence.
- Then explain the purpose, working, and benefit.
- If you do not know a deep technical detail, answer honestly and connect it back to the project goal.
- Speak as: problem -> solution -> technology -> result.

## 1. Basic Introduction Questions

### 1. What is your project?
**Answer:**  
Our project is **Zyra**, an AI-powered recruitment and interview management system. It helps companies automate the initial hiring process by handling job applications, resume screening, MCQ tests, optional coding rounds, AI avatar interviews, and HR report generation in one platform.

### 2. Why did you choose this project?
**Answer:**  
We selected this project because recruitment is a real-world problem where companies receive many applications and manual shortlisting takes a lot of time. We wanted to build a system that reduces HR workload, improves screening speed, and gives a more structured evaluation process.

### 3. What problem does Zyra solve?
**Answer:**  
Zyra solves the problem of manual and time-consuming hiring. In traditional recruitment, HR teams must review resumes, schedule tests, and assess candidates manually. Our system automates early-stage screening and gives HR a clear report for final decision-making.

### 4. What is the main objective of your project?
**Answer:**  
The main objective is to automate the first stages of recruitment while still keeping the final hiring decision under human control. We wanted to combine resume analysis, assessments, interview support, and reporting into a single workflow.

## 2. Working and Flow Questions

### 5. Explain the workflow of your project.
**Answer:**  
First, a candidate applies for a job and uploads a resume. The system performs resume screening and calculates an ATS-style score. If the candidate is eligible, login credentials are generated. After login, the candidate takes an MCQ test. Based on performance and HR settings, the candidate may also take a coding round. Then the candidate attends an AI avatar interview. Finally, the system generates a report for HR, and HR makes the final decision.

### 6. Who are the users of your system?
**Answer:**  
There are mainly two users: **candidates** and **HR/admin users**. Candidates apply, take tests, and attend interviews. HR users create jobs, monitor candidates, view reports, and decide whether to shortlist or reject them.

### 7. Why do you generate credentials only after screening?
**Answer:**  
This reduces unnecessary user creation and keeps the process more controlled. Only candidates who pass the initial resume screening move to the next stage, which makes the system more efficient.

### 8. Why is there an optional coding round?
**Answer:**  
Not every role requires coding skills. So we made the coding round optional and mainly useful for technical roles. This keeps the system flexible and role-based.

## 3. Technology Questions

### 9. Which technologies did you use?
**Answer:**  
We used **Python Flask** for the backend, **MongoDB** for database storage, **HTML, CSS, and JavaScript** for the frontend, **Cloudinary/GridFS** for file storage, and **Groq with optional Ollama fallback** for AI-based generation and evaluation tasks.

### 10. Why did you choose Flask?
**Answer:**  
Flask is lightweight, flexible, and suitable for building web applications quickly. It gave us good control over routing, session handling, form processing, and integration with external AI and storage services.

### 11. Why did you choose MongoDB?
**Answer:**  
MongoDB is useful because our project stores different kinds of data such as candidate details, test results, interview records, report data, and file references. Since the schema can vary across stages, MongoDB gives flexibility for handling semi-structured data.

### 12. Why did you use Cloudinary and GridFS?
**Answer:**  
Resume files and media files can be large, so storing them separately is more efficient. Cloudinary is useful for handling media uploads and access. GridFS acts as a fallback when cloud upload is unavailable, so the system remains reliable.

### 13. What is the role of AI in your system?
**Answer:**  
AI is used for resume analysis, MCQ generation, interview question generation, answer evaluation, and report support. It helps automate repetitive screening tasks, but the final hiring decision is still made by HR.

## 4. Design and Architecture Questions

### 14. What type of system is Zyra?
**Answer:**  
Zyra is a **web-based recruitment management system** with AI-assisted evaluation modules. It follows a modular workflow where each stage handles a different part of candidate assessment.

### 15. Explain your input design.
**Answer:**  
The input design collects structured and relevant data. Candidate inputs include personal details, role selection, skills, resume upload, and declarations. HR inputs include job details such as title, department, experience, skills, threshold, and description. Test interfaces also collect answers and proctoring-related permissions.

### 16. Explain your output design.
**Answer:**  
The system outputs application confirmations, candidate credentials, dashboard status, test results, next-stage eligibility, coding round feedback, and HR-only reports with recommendation details.

### 17. What does the Data Flow Diagram represent in your project?
**Answer:**  
The DFD shows how data moves through the system. It begins with job application submission, then resume storage and screening, account generation, tests, interview, report generation, and finally HR review and decision.

### 18. What are the main entities in your UML design?
**Answer:**  
The main entities are **Candidate, Application, Job, Test, Coding Test, Interview, Report, and HR Admin**. These entities model the overall hiring workflow and the relationship between users, assessments, and reports.

## 5. Functional Questions

### 19. How does resume screening work in your system?
**Answer:**  
The system compares the candidate's resume content with the selected job role and required skills, then calculates a relevance or ATS-style score. This helps identify whether the candidate should proceed to the next stage.

### 20. What is an ATS score?
**Answer:**  
ATS stands for Applicant Tracking System. In our project, the ATS score is a screening score that indicates how well a resume matches the required job role, skills, and expectations. It helps automate shortlisting.

### 21. How are MCQ questions generated?
**Answer:**  
MCQ questions are generated based on the candidate's job role and skills. This makes the test more role-specific instead of giving the same general questions to everyone.

### 22. How does the AI avatar interview help?
**Answer:**  
The AI avatar interview provides a structured interview experience by asking generated questions and collecting candidate responses. It helps standardize the interview stage and supports HR with recorded evaluation data.

### 23. What is the purpose of proctoring in your project?
**Answer:**  
Proctoring helps maintain test integrity. It checks factors such as camera or microphone availability and tab-switching behavior. It does not make the final decision by itself, but it helps HR identify suspicious cases for manual review.

### 24. How is the final report generated?
**Answer:**  
The report is generated by combining resume screening performance, test scores, interview responses, and proctoring observations. This gives HR a consolidated view of the candidate before making a decision.

## 6. Security and Ethics Questions

### 25. What security features are included in your system?
**Answer:**  
Our system includes separate candidate and HR login flows, session-based page protection, role-based access for HR users, restricted access to reports, and monitoring during assessment stages. These features help protect candidate data and maintain process integrity.

### 26. How do you protect candidate privacy?
**Answer:**  
We store only relevant candidate information required for recruitment, restrict report access to HR users, and avoid exposing sensitive evaluation details publicly. We also separate large-file storage from standard records for better management.

### 27. Can AI create unfair bias in recruitment?
**Answer:**  
Yes, if not designed carefully, AI can introduce unfair bias. In our project, we focused on role-related factors like skills, resume relevance, assessment performance, and answer quality. Also, the final decision is not fully automated; HR performs the final review.

### 28. Why should HR make the final decision instead of AI?
**Answer:**  
AI is useful for speed and consistency, but hiring is a sensitive human process. HR must make the final decision because human judgment is needed to consider context, fairness, and organizational fit.

## 7. Testing and Performance Questions

### 29. What types of testing did you consider?
**Answer:**  
We considered unit testing, system testing, usability testing, acceptance testing, and regression testing. These help verify that individual modules work correctly and that the complete workflow behaves as expected.

### 30. How do you know your system works correctly?
**Answer:**  
We verified the flow stage by stage: application submission, screening, credential generation, login, test progression, interview unlocking, and HR report access. We also checked the overall workflow with realistic user scenarios.

### 31. What is the performance advantage of your system?
**Answer:**  
The main advantage is reduced manual effort and faster preliminary screening. Instead of manually checking every resume and coordinating every step, the system automates these operations and allows HR to focus on final evaluation.

## 8. Limitations and Future Scope Questions

### 32. What are the limitations of your project?
**Answer:**  
The system still depends on the quality of AI responses and the accuracy of resume parsing. Internet connectivity and third-party service availability can also affect some modules. In future versions, more advanced analytics and stronger evaluation models can be added.

### 33. What future improvements can be made?
**Answer:**  
Future improvements include better anti-cheating methods, more detailed coding test evaluation, multilingual interviews, improved bias monitoring, analytics dashboards, and integration with company HRMS platforms.

### 34. Can this project be used in real companies?
**Answer:**  
Yes, the project can be adapted for real companies, especially for early-stage screening. However, for full production use, it would need stronger scaling, audit logs, stricter compliance controls, and deeper validation.

## 9. Comparison and Justification Questions

### 35. How is your project different from the existing system?
**Answer:**  
Traditional recruitment often depends on manual resume checking and unstructured interviews. Our project centralizes the entire early recruitment flow and adds AI-supported screening, testing, interview handling, and structured HR reporting.

### 36. Why is your system better than manual recruitment?
**Answer:**  
It is faster, more consistent, and more organized. It reduces repetitive HR work, standardizes candidate evaluation, and provides a single dashboard for monitoring the recruitment process.

### 37. Why did you not fully automate selection?
**Answer:**  
Because full automation in hiring can be risky and unfair. We designed Zyra as a decision-support system, not a full replacement for HR judgment.

## 10. External Faculty Style Direct Questions

### 38. If I ask in one line, what is the core idea of your project?
**Answer:**  
Zyra is a web-based AI recruitment system that automates resume screening, assessments, interview support, and HR reporting for faster and more structured hiring.

### 39. What is the most innovative part of your project?
**Answer:**  
The most innovative part is the combination of AI-based screening, role-based testing, optional coding assessment, AI avatar interview, and HR-only recommendation reporting in a single workflow.

### 40. If your AI gives a wrong evaluation, what happens?
**Answer:**  
A wrong AI evaluation should not directly decide hiring. That is why our design keeps HR in control. AI provides support and recommendations, but final review is human-driven.

### 41. What did you learn from this project?
**Answer:**  
We learned how to integrate web development, databases, AI services, storage systems, and access control into a complete real-world application. We also learned that automation must be balanced with fairness, privacy, and human oversight.

## Short 30-Second Project Explanation

**Answer:**  
Our project, Zyra, is an AI-powered recruitment and interview management system. It automates the early hiring stages by allowing candidates to apply for jobs, upload resumes, take role-based MCQ tests, attend optional coding rounds, and complete an AI avatar interview. The system then generates a structured report for HR, which helps reduce manual effort while still keeping the final hiring decision with human reviewers.

## Final Viva Tips

- Do not try to memorize every line; understand the flow.
- Use the project name frequently while answering.
- If asked a technical question, connect it with why that feature is useful.
- If interrupted, answer in one sentence first and then expand.
- Be confident when explaining the objective, workflow, technologies, and ethics.
