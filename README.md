# Falak HR | فلك للموارد البشرية

[![React](https://img.shields.io/badge/React-18.3-%2361DAFB?logo=react)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-5.1-%23092E20?logo=django)](https://www.djangoproject.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-%233178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-%23646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-%2306B6D4?logo=tailwindcss)](https://tailwindcss.com/)

Falak HR is a full-stack, monolingual (Arabic) Human Resources and Project Management platform. It is designed to streamline company operations, from managing corporate structures and employees to overseeing projects and tasks. The application features a public-facing website for service requests and talent acquisition, alongside a comprehensive private dashboard for internal management.

## ✨ Features

The application is divided into a public site and a secure admin/user dashboard.

### 🌐 Public-Facing Site
- **Homepage:** Engaging introduction to Falak HR's services.
- **Service & Subscription Forms:**
    - **Service Request:** For new companies to request services like setting up a primary or branch facility.
    - **Talent Subscription:** Forms for Trainers, Trainees, and Job Seekers to join the Falak HR network.
- **Informational Pages:** About Us, Remote Work solutions, and Contact Us page with a working contact form.
- **User Authentication:** Login page for employees and administrators to access the dashboard.
- **Responsive Design:** Fully responsive and accessible on all devices.

### 🔒 Authenticated Dashboard
- **Dashboard Overview:** At-a-glance view of key metrics and activities.
- **Company Management:**
    - Full CRUD operations for companies.
    - Support for parent-child company hierarchies.
- **User Management:**
    - Full CRUD for user profiles.
    - Role-based access control (Admin, Manager, Employee).
- **Project Management:**
    - Create, read, update, and delete projects.
    - Assign project managers and team members.
- **Task Management:**
    - Full CRUD for tasks within projects.
    - Assign tasks to specific employees.
- **Submissions Management:** View and manage all incoming inquiries, service requests, and subscription applications from the public site.
- **Data Tables:** Robust, searchable, and paginated tables for all major modules.

## 🚀 Tech Stack

This project is a monorepo containing a React frontend and a Django backend.

### **Frontend**
- **Framework:** [React](https://reactjs.org/) (with TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/UI](https://ui.shadcn.com/) for components
- **State Management:** React Context API (`AuthContext`)
- **Data Fetching:** [Axios](https://axios-http.com/) & TanStack Query (inferred from custom hooks)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization:** [Recharts](https://recharts.org/)

### **Backend**
- **Framework:** [Django](https://www.djangoproject.com/)
- **API:** [Django REST Framework](https://www.django-rest-framework.org/)
- **Authentication:** [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) for token-based authentication
- **Database:** [SQLite](https://www.sqlite.org/index.html) (for development, can be swapped)
- **CORS:** [django-cors-headers](https://github.com/adamchainz/django-cors-headers)
- **Environment Variables:** [python-dotenv](https://pypi.org/project/python-dotenv/)

## 📂 Project Structure

A high-level overview of the project's structure:

```
abubakr-alsheikh-falak-hr/
├── backend/                  # Django project root
│   ├── falak_hr_backend/     # Main Django project config
│   ├── companies/            # Django app for companies
│   ├── users/                # Django app for users
│   ├── projects/             # Django app for projects
│   ├── tasks/                # ...and so on for other apps
│   ├── manage.py             # Django's command-line utility
│   └── requirements.txt      # Python dependencies
│
├── src/                      # React/Vite project root
│   ├── api/                  # Axios client and API service calls
│   ├── components/           # Reusable React components (UI, Forms, etc.)
│   ├── contexts/             # React context providers (e.g., AuthContext)
│   ├── hooks/                # Custom hooks for data and logic
│   ├── layouts/              # Top-level layout components (Public, Dashboard)
│   ├── pages/                # Page components, mapped to routes
│   ├── routes/               # Main application routing configuration
│   ├── types/                # TypeScript type definitions
│   └── main.tsx              # Application entry point
│
├── package.json              # Frontend dependencies and scripts
└── vite.config.ts            # Vite configuration
```

## 📄 API Documentation

The backend exposes a RESTful API for all the core features.

- **Authentication:** The API uses JWT (JSON Web Tokens). Obtain `access` and `refresh` tokens from the `/api/token/` endpoint. All subsequent requests to protected endpoints must include the `Authorization: Bearer <access_token>` header.
- **Endpoints:**
  - `/api/companies/`
  - `/api/users/`
  - `/api/projects/`
  - `/api/tasks/`
  - `/api/inquiries/`
  - `/api/subscriptions/`
  - `/api/service-requests/`

The API supports standard CRUD operations, filtering, searching, and pagination on list endpoints. For a more detailed guide, refer to the API documentation or explore the code in `backend/<app_name>/views.py`.
