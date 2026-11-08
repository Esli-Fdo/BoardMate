# BoardMate Frontend

React frontend for BoardMate, a boarding-place finder and rental management platform for university students.

**Stack:** React (JavaScript), Vite, Tailwind CSS v4, React Router DOM, Axios, Lucide React.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. Before opening a Pull Request, run:

```bash
npm run lint
npm run build
```

Both must finish with no errors.

## Component showcase

While `npm run dev` is running, open **http://localhost:5173/dev/components**.
It shows every shared colour and component. Check it before building anything new.

## Golden rules

1. **Reuse shared components.** Never create your own Button, Input, Card, Modal, Navbar or Sidebar.
2. **Use design tokens, not hex codes.** Write `bg-primary`, not `bg-[#0f6e4f]`.
3. **Follow the Figma design.** Do not invent a different look.
4. **Do not edit `App.jsx`.** Add your pages to your role's routes file (see below).
5. **If a shared component is missing something, ask the team lead.** Do not copy it and change it.

## Folder structure

```
src/
├── components/
│   ├── common/      Shared UI: Button, Input, Card, Badge, Modal, ConfirmDialog
│   └── layout/      Sidebar, TopBar, Navbar, Footer
├── layouts/         Page frames: Public, Auth, Student, Owner, Admin
├── routes/          One routes file per role
├── pages/           Full pages, grouped by role (student, owner, admin, auth, home)
├── features/        Module-specific code (module-1 ... module-5)
├── services/        Axios API calls
├── context/         React context (auth, etc.)
├── hooks/           Custom hooks
├── utils/           Helpers and config (navigation.js holds the sidebar menus)
└── assets/images/   Images
```

**Where does my code go?**
- A full page: `src/pages/<role>/`, for example `src/pages/student/MyBookings.jsx`.
- A component used only inside your module: `src/features/module-X/`.
- A component that two or more modules would use: ask the team lead to add it to `components/common/`.

## Design tokens

Defined once in `src/index.css`. Use them as Tailwind classes.

| Purpose | Classes |
|---|---|
| Main green | `bg-primary`, `text-primary`, `border-primary` |
| Darker green (Approve, Review buttons) | `bg-primary-dark` |
| Mint tint (active menu, icon tiles) | `bg-primary-soft` |
| Page background | `bg-page` |
| Warm grey (table headers, search fill) | `bg-warm` |
| Text | `text-ink` (main), `text-muted` (secondary) |
| Borders | `border-line` |
| Pending / warning | `bg-warning-soft`, `text-warning` |
| Error / danger | `bg-danger`, `bg-danger-soft`, `text-danger` |
| Corners | `rounded-card`, `rounded-control` |
| Shadow | `shadow-card` |

The font is Inter and is applied automatically.

## Shared components

Import from `src/components/common/`.

```jsx
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
```

| Component | Main props | Example |
|---|---|---|
| `Button` | `variant` (primary, dark, secondary, outline, ghost, danger), `size` (sm, md, lg), `leftIcon`, `rightIcon`, `fullWidth`, `as` | `<Button variant="dark">Approve</Button>` |
| `Badge` | `variant` (success, warning, danger, neutral), `dot` | `<Badge variant="warning" dot>Pending</Badge>` |
| `Card` | `padding` (true/false), `className` | `<Card>...</Card>` |
| `Input` | `label`, `error`, `hint`, `leftIcon`, `rightElement`, plus any normal input prop | `<Input label="Email" error="Required" />` |
| `Modal` | `open`, `onClose`, `title`, `size`, `footer` | see below |
| `ConfirmDialog` | `open`, `onClose`, `onConfirm`, `title`, `message`, `confirmLabel`, `variant`, `loading` | see below |

Icons come from Lucide React and are passed as components:

```jsx
import { Plus } from 'lucide-react'
<Button leftIcon={Plus}>Add New Property</Button>
```

A button that navigates:

```jsx
import { Link } from 'react-router-dom'
<Button as={Link} to="/signup">Sign Up</Button>
```

Modal and confirm dialog (the page owns the `open` state):

```jsx
const [open, setOpen] = useState(false)

<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={handleDelete}
  title="Delete property?"
  message="This cannot be undone."
  confirmLabel="Delete"
/>
```

## Layouts

Each role has a layout that already provides the sidebar and top bar (dashboards) or the navbar and footer (public). **Your page only supplies the content.** Do not add your own sidebar or navbar.

| Layout | Used for |
|---|---|
| `PublicLayout` | Guest pages: Navbar + Footer |
| `AuthLayout` | Login, signup, reset password, OTP: split card |
| `StudentLayout` | Student dashboard pages |
| `OwnerLayout` | Owner dashboard pages |
| `AdminLayout` | Admin dashboard pages |

Sidebar menus are defined in `src/utils/navigation.js`. To change a menu, tell the team lead so one person edits it.

## Adding a page

1. Create your page component, for example `src/pages/student/MyBookings.jsx`:

```jsx
import Card from '../../components/common/Card'

function MyBookings() {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <Card className="mt-6">...</Card>
    </div>
  )
}

export default MyBookings
```

2. Open your role's routes file (`src/routes/studentRoutes.jsx`, `ownerRoutes.jsx`, `adminRoutes.jsx`, `publicRoutes.jsx` or `authRoutes.jsx`).
3. Import your page and replace `<PagePlaceholder />` for your path:

```jsx
import MyBookings from '../pages/student/MyBookings'

{ path: 'bookings', element: <MyBookings /> },
```

You never need to touch `App.jsx`.

## Git workflow

- **Never push directly to `main` or `dev`.** Both are protected.
- Create your branch from the latest `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-module-name
```

- Commit small and often, with clear messages such as `feat: add booking request form`.
- Push your branch and open a **Pull Request into `dev`**.
- Pull the latest `dev` into your branch regularly to avoid big merge conflicts:

```bash
git checkout dev
git pull origin dev
git checkout feature/your-module-name
git merge dev
```

## Not done yet

- Authentication: layouts currently use fixed example users (marked with `TODO` comments).
- Backend API integration (Axios services).
- Route protection by role.
- Mobile menu for the public Navbar and mobile layout for dashboards.
- Room photo on the AuthLayout left panel.