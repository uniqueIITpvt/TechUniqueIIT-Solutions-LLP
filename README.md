# TechUniqueIIT-Solutions-LLP

Full-stack project with:

- Frontend: Next.js 14 in `frontend/`
- Backend: Express/MongoDB API in `backend/`

## Local Development

Use this when you want to see UI and API changes on your own machine without pushing code.

```bash
npm run dev
```

This starts both services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Health API: `http://localhost:5000/api/health`

Frontend changes hot reload through Next.js. Backend changes restart through nodemon.

## Local Environment

Local-only env files are ignored by git:

- `frontend/.env.development.local`
- `backend/.env.development.local`

Current local frontend API target:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Current local backend target:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

Keep secrets in ignored env files only. Use these tracked examples when setting up another machine:

- `frontend/.env.example`
- `backend/.env.example`

## Separate Commands

Run only frontend:

```bash
npm run dev:frontend
```

Run only backend:

```bash
npm run dev:backend
```

Type-check frontend:

```bash
npm run type-check
```

## Production

Production should use hosting-provider environment variables, not local `.env.development.local` files.

Frontend production env should point to the deployed backend:

```env
NEXT_PUBLIC_API_URL=https://your-production-backend-url
NEXT_PUBLIC_SITE_URL=https://your-production-frontend-url
```

Backend production env should include:

```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_strong_secret
FRONTEND_URL=https://your-production-frontend-url
BACKEND_URL=https://your-production-backend-url
```

Build frontend:

```bash
npm run build
```

Start frontend production server locally after build:

```bash
npm run start:frontend
```

Start backend production server locally with production env:

```bash
npm run start:backend
```

## Install

If dependencies are missing:

```bash
npm install --prefix frontend
npm install --prefix backend
```

Root scripts do not install dependencies automatically.
