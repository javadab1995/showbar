# ShowBar

ShowBar is a freight management platform that helps manage transportation requests, loads, vehicles, and drivers.

Built with React, TypeScript, Vite, Supabase, and modern frontend tools.

## Features

- Public load listing and filtering
- Load details and request submission
- Driver request management
- Driver and vehicle management
- Admin dashboard
- Authentication and protected admin routes
- Supabase database integration
- SMS notification support through Supabase Edge Functions
- Currency information display
- Progressive Web App (PWA) support
- Responsive UI for desktop and mobile

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack React Query
- React Hook Form
- Zod
- Tailwind CSS

### Backend & Services

- Supabase
  - Authentication
  - Database
  - Edge Functions
  - Storage

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

The production files will be generated in the `dist/` directory.

## Routes

### Public

- `/loads`
- `/loads/:id`
- `/basket`
- `/request`
- `/request/success`
- `/notify/:id`

### Admin Dashboard

- `/admin/login`
- `/admin`
- `/admin/loads`
- `/admin/loads/new`
- `/admin/loads/:id`
- `/admin/loads/:id/edit`
- `/admin/requests`
- `/admin/requests/:id`
- `/admin/vehicles`
- `/admin/vehicles/:id`
- `/admin/drivers`
- `/admin/settings`

## Data & Authentication

ShowBar uses a real backend architecture.

The application uses Supabase for:

- Authentication
- Database operations
- Driver, vehicle, load, and request management

Client-side storage is only used for temporary features such as maintaining the driver's basket.

## Deployment

The project is prepared for deployment using a production server environment with Docker, Nginx, and SSL.