BoardMate - Module 4: Reviews, Safety, Trust & Fraud Detection

This repository contains the frontend implementation and business logic for Module 4 of the BoardMate platform. 

⚙️ Core Features Implemented
*   Multi-criteria Review System: Allows students to submit ratings based on 6 specific criteria (Cleanliness, Safety, Location, Facilities, Value, Owner Behaviour).
*   Admin Moderation Queue: A dedicated interface for administrators to approve or reject submitted reviews before they go public.
*   Rule-based Trust Score Calculation: A mathematical algorithm that calculates the property's Trust Score based on verified reviews and complaint history (Implemented without AI/ML as per project scope).
*   SLA Tracking: Complaint escalation matrix with a 24-hour SLA timer for admin investigations.
*   Fraud & Complaint Reporting: Workflow for students to report fake listings, deposit fraud, or harassment.
*   Safety & Emergency Info: Property safety heatmaps and emergency contact details displayed on the property details page.

🔄 System Workflow (Module Logic)
1.  Student submits a review/report.
2.  The review is saved to the database with a `pending` status.
3.  Admin reviews the submission and approves it.
4.  Once approved, the Trust Score is dynamically recalculated using the rule-based formula.

 
