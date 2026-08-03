# ECE Placement Intelligence Portal - Project Overview

## 1. WHAT is this site?
The **ECE Placement Intelligence Portal** is a dedicated, interactive web application built specifically for the Department of Electronics & Communication Engineering (ECE) at SRM TRP Engineering College. It acts as a centralized dashboard where students can access critical information required to prepare for their placements and careers. 

Instead of relying on scattered PDFs and Excel sheets, the portal provides a modern, easily searchable interface to explore recruiting companies, required skills, and faculty mentors.

## 2. WHY was it built? (The Purpose)
The primary goal is to bridge the gap between student preparation and industry expectations. 
- **Centralized Information:** To give students a single source of truth for all placement-related data.
- **Targeted Preparation:** By showing exactly what skills (both programming and core hardware) specific companies demand, students can tailor their learning paths.
- **Mentorship Mapping:** To help students easily find and approach the right faculty members based on domain expertise (e.g., if a student wants to learn about Semiconductors or DSP, they know exactly which professor to consult).
- **Opportunity Tracking:** To keep students updated on upcoming hackathons and technical events.

## 3. WHO is involved?
- **Target Audience:** ECE Students, Placement Coordinators, and Faculty of SRM TRP Engineering College.
- **Developers (The Team):** Developed by **Nebula Nexus**.
  - **Lead Developer:** Yogeshwaran P
  - **Co-Developer:** Sivaramakrishnan S

## 4. HOW does it work? (The Technical Architecture)
The site is built as a fast, modern Single Page Application (SPA). It doesn't rely on a complex backend server; instead, it uses structured local data files, making it incredibly fast and easy to host anywhere.

**Tech Stack:**
- **Framework:** React 19 (via Vite for blazing-fast builds)
- **Language:** TypeScript (ensures code quality and prevents errors)
- **Styling:** Tailwind CSS v4 (provides the modern, responsive, and sleek UI)
- **Animations:** Framer Motion (used for smooth page transitions and interactive elements)
- **Icons:** Lucide React
- **Data Storage:** The data is securely stored within the app's source code in the `src/data` folder (`companies.ts`, `hackathons.ts`, `faculty.json`). 

## 5. SITE STRUCTURE (The Features)
The portal is divided into several key sections, accessible via the top navigation bar:

* **Home (`/`):** The landing page providing a high-level overview of the portal's capabilities.
* **Companies (`/companies`):** A detailed directory of past and current recruiters. It shows:
  * Company Name, Role, CTC, and Offer Type (Regular/Dream/Super Dream).
  * Interview Process stages (Aptitude, Tech Interview, HR, etc.).
  * Required Programming Skills (C++, Python, DSA, etc.) and Core Skills (VLSI, Embedded C, MATLAB, etc.).
* **Skill Match (`/skill-match`):** An interactive utility where students can check off the skills they currently possess, and the system dynamically filters and suggests which companies they are a strong match for.
* **Events & Competitions (`/hackathons`):** A tracker for upcoming, ongoing, and completed hackathons to encourage student participation in external events.
* **Faculty Profiles (`/faculty`):** Also known as the Faculty Matrix. This section lists the department's professors, their specific domains (e.g., Semiconductor, Communication, Digital Signal Processing), and their proficiency in various software tools (MATLAB, Xilinx, Cadence) and hardware components (Arduino, Raspberry Pi, FPGA).
* **About (`/about`):** Details about the platform's vision, disclaimer, and developer credits.

---
**Summary for an Elevator Pitch:**
*"This is a React-based Placement Intelligence Portal for SRM TRP's ECE department. It helps students figure out exactly what skills companies are looking for, matches their current skills to potential recruiters, tracks hackathons, and connects them with the right faculty mentors based on specific tech domains."*
