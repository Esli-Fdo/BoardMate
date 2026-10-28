BoardMate - Module 4: Reviews, Safety, Trust & Fraud Detection

This repository contains the frontend implementation and business logic for **Module 4** of the BoardMate platform. 
📖 Overview
Module 4 focuses on building trust and ensuring safety within the platform. It provides students with a reliable way to review accommodations, report issues, and view safety metrics, while giving administrators the tools to moderate content, track complaints (with SLAs), and calculate property trust scores using a rule-based algorithm (No AI/ML).

⚙️ Core Features Implemented
*   Multi-Criteria Review System: Students can submit verified-stay reviews based on 6 specific criteria (Cleanliness, Safety, Location, Facilities, Value, Owner Behaviour).
*   Rule-based Trust Score Calculation: A mathematical algorithm calculates the property's Trust Score based on approved reviews. Valid complaints deduct points dynamically.
*   Admin Moderation Queue: A dedicated interface for administrators to approve or reject submitted reviews before they are published.
*   Fraud & Complaint Reporting: Workflow for students to report fake listings, deposit fraud, or harassment.
*   SLA Tracking: Complaint escalation matrix with a 24-hour SLA timer for admin investigations.
*   Safety & Emergency Info: Property safety heatmap UI and emergency contact details displayed on the property details page.

💻 Tech Stack (Frontend)
*   React.js (Vite): UI Library
*   Tailwind CSS: Styling and Responsive Design
*   React Router DOM: Navigation and Routing
*   JavaScript (ES6+): Core Logic
*   Local Storage: Temporary data persistence (Simulating a Database for the prototype)
