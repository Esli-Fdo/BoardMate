# BoardMate - University Student Accommodation & Boarding Platform (Sri Lanka)

BoardMate is a modern front-end web application built for University Student Accommodation & Boarding management in Sri Lanka. It features two interconnected portals:
1. **Property Owner Portal** (Logged in as *Ruwan Perera*, initials `RP`)
2. **Student Accommodation Portal** (Logged in as *Piyu Hansi*, initials `PH`)

Both portals share live React state through a centralized Context (`AppContext.jsx`), enabling end-to-end workflows:
- Student booking inquiry submissions directly sync with Owner booking requests.
- Viewing appointments schedule date/time slots with live calendar updates.
- Owner rental agreement generation dispatches standard leases to the student portal with interactive digital signature drawing.
- Executed agreements dynamically unlock the 5-item move-in inspection checklist.
- Security deposits in escrow and student payments sync seamlessly.

---

## Technology Stack

- **Framework**: React 18 with Vite
- **Language**: Pure JavaScript & JSX (Strictly no TypeScript, interfaces, or TSX)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: `lucide-react`
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Mock State**: React Context (`AppContext.jsx`) with realistic Sri Lankan tenancy data

---

## 15 Implemented Screens

### A) Property Owner Portal (`/owner/...`)
1. **`/owner/bookings/requests`** - Booking Requests: Applicant review table with inline Approve and Reject actions, awaiting counter, and status pill badges.
2. **`/owner/bookings/viewings`** - Viewing Appointments: April 2025 mini calendar, daily appointment list, rescheduling modal, and "Visited — Ready for Agreement" cards.
3. **`/owner/bookings/generate-agreement`** - Generate Agreement: Step 1 tenancy form, duration options, Sri Lanka university housing clauses, and legal trust disclaimers.
4. **`/owner/tenants`** - Tenants & Rent Tracking: Expected/Collected/Overdue stat cards, tenant contact table, and one-click payment reminders.
5. **`/owner/tenants/payments`** - Payments & Income: Monthly revenue breakdown, platform commission, and transaction history ledger.
6. **`/owner/tenants/deposits`** - Deposits & Refunds: Security bonds in escrow trust, status indicators, and refund authorization modal.
7. **`/owner/messages`** - Owner Messages: 2-pane tenant chat with Piyu Hansi, message composer, and auto-sync indicator.

### B) Student Accommodation Portal (`/student/...`)
8. **`/student/notifications`** - Notifications: Unread alert feed with instant links to agreements, messages, and receipts.
9. **`/student/messages`** - Student Messages: Direct communication with verified landlord Ruwan Perera with pinned property context.
10. **`/student/bookings/request`** - Request Booking: Inquiry application with date picker, duration options, and live character counter.
11. **`/student/bookings/schedule-viewing`** - Schedule a Viewing: Weekday interactive calendar date selection, 6 tour slots, live appointment summary, and visitor tips.
12. **`/student/bookings/my-bookings`** - My Bookings: Tenancy status ledger with search filtering and direct action navigation.
13. **`/student/tenancy/agreement`** - Rental Agreement: Legal clauses, summary metrics, and HTML5 canvas for mouse/touch digital signatures.
14. **`/student/tenancy/payments`** - Student Payments: Summary cards, tabbed transaction categories, statement export, and payment modal.
15. **`/student/tenancy/move-in-checklist`** - Move-in Checklist: 5 essential room amenities inspection items, live completion progress bar, photo attachment with previews, and work order reporting.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
Clone or navigate to the repository directory:
```bash
cd boardmate
npm install
```

### Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Production Build
Create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## Role & Portal Switcher

You can easily switch between the **Owner Portal** and the **Student Portal** at any time:
- Click the **"Switch to Student / Owner"** button in the top navigation bar.
- Or click the **"● Owner / Student Portal Active"** badge at the bottom of the sidebar.
- Root path `/` redirects automatically to `/owner/bookings/requests`.
