# Investo Tax Solutions

## Project Overview

Investo Tax Solutions is a modular web application for managing tax-related services, client appointments, document uploads, reviews, and blogs. The platform is built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui, and uses internal API endpoints for all business logic and data storage.

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js (API endpoints)
- MySQL (database)

## Folder Structure

```
/ (project root)
├── src/
│   ├── api/                # Serverless API endpoints (Vercel/Netlify)
│   │   ├── appointments.ts # Appointment form handler
│   │   ├── documents.ts    # Document upload handler
│   │   ├── reviews.ts      # Reviews form handler
│   │   ├── blogs.ts        # Blog CRUD endpoints
│   │   └── admin/          # Admin-only endpoints (auth, data export)
│   ├── pages/              # Main React pages
│   ├── components/         # UI components (reused)
│   └── ...                 # Other frontend code
├── public/                 # Static assets
└── ...
```

## API Endpoints

All forms and admin actions are handled via internal API endpoints:

- `POST /api/appointments` — Book a client appointment
- `POST /api/admin/documents` — Upload client documents
- `POST /api/reviews` — Submit a client review
- `GET/POST/PUT/DELETE /api/admin/blogs` — Manage blog posts (admin only)
- `POST /api/admin/login` — Admin authentication

## Internal Forms

All user and admin forms are implemented as React components and submit data to the above API endpoints. No external services (like Google Forms) are used.

## Deployment

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables for SMTP and database access (see API handler docs).
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Deploy to Vercel, Netlify, or your preferred platform.

## Database Schema

See `/README.md` for planned schema. Tables include: clients, appointments, documents, reviews, blogs, admin_users.

## Modular Design

- All business logic is handled via internal API endpoints.
- The frontend is fully decoupled from backend logic.
- Easily extendable for new features and endpoints.

---

For questions or contributions, please contact the project maintainer.
