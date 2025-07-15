# Welcome to my 1st project

## Project info

**URL**: https://lovable.dev/projects/a8c39d2c-c630-4842-8fdc-d44fc8b2ea9a

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a8c39d2c-c630-4842-8fdc-d44fc8b2ea9a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Investo Tax Solutions

## Modular Folder Structure (Planned)

```
/ (project root)
├── src/
│   ├── api/                # Serverless API endpoints (Vercel/Netlify)
│   │   ├── appointments.ts # Appointment form handler
│   │   ├── documents.ts    # Document upload handler
│   │   ├── reviews.ts      # Reviews form handler
│   │   ├── blogs.ts        # Blog CRUD endpoints
│   │   └── admin/          # Admin-only endpoints (auth, data export)
│   ├── pages/
│   │   ├── Index.tsx       # Landing page
│   │   ├── Services.tsx    # Services listing
│   │   ├── Appointment.tsx # Appointment booking form
│   │   ├── Documents.tsx   # Document submission form
│   │   ├── Blogs.tsx       # Blog list
│   │   ├── BlogDetail.tsx  # Blog detail
│   │   ├── Reviews.tsx     # Customer reviews
│   │   ├── AdminLogin.tsx  # Admin login
│   │   └── AdminDashboard.tsx # Admin dashboard
│   ├── components/
│   │   └── ...             # UI components (reused)
│   └── ...                 # Other frontend code
├── public/                 # Static assets
└── ...
```

## Database Schema (Planned)

### clients
- id (PK)
- name
- email
- phone
- created_at

### appointments
- id (PK)
- client_id (FK)
- service
- preferred_date
- notes
- created_at

### documents
- id (PK)
- client_id (FK)
- file_url
- file_type
- original_name
- uploaded_at

### reviews
- id (PK)
- client_id (FK)
- rating
- comment
- created_at

### blogs
- id (PK)
- title
- content
- author
- created_at

### admin_users
- id (PK)
- username
- password_hash
- created_at

---

This structure supports all planned features: internal forms, admin dashboard, file uploads, and modular expansion.
