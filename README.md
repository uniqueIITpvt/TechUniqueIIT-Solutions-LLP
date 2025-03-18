Lateset One With Production Mode
# TechUniqueIIT-Solutions-LLP

A modern, full-stack web application for TechUniqueIIT Solutions LLP, featuring a corporate website with blog management, case studies, and an admin dashboard.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

TechUniqueIIT-Solutions-LLP is a comprehensive web platform that showcases the company's services, blogs, case studies, and provides an admin dashboard for content management. The application is built with a modern tech stack including Next.js for the frontend and Node.js/Express for the backend.

## ✨ Features

### Public Features

- **Home Page**: Company introduction, services overview, and featured content
- **Services**: Detailed information about offered services
- **Blog**: Articles and posts with categories and tags
- **Case Studies**: Showcase of successful projects
- **About Us**: Company information, team, and mission
- **Contact**: Contact form and information

### Admin Features

- **Dashboard**: Overview of site statistics and activity
- **Blog Management**: Create, edit, and delete blog posts
- **Case Study Management**: Create, edit, and delete case studies
- **Analytics**: View site traffic and user engagement metrics
- **User Management**: Manage admin and author accounts

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Fetching**: SWR
- **UI Components**: Custom components with Framer Motion animations

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **API**: RESTful API

## 📁 Project Structure

```
TechUniqueIIT-Website/
├── frontend/                  # Next.js frontend application
│   ├── public/                # Static assets
│   ├── src/                   # Source code
│   │   ├── app/               # Next.js app router
│   │   │   ├── (public)/      # Public routes
│   │   │   ├── api/           # API routes
│   │   │   ├── dashboard/     # Dashboard routes
│   │   ├── components/        # React components
│   │   ├── services/          # API service functions
│   │   ├── styles/            # Global styles
│   │   ├── utils/             # Utility functions
│   ├── package.json           # Frontend dependencies
│
├── backend/                   # Express.js backend application
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── utils/                 # Utility functions
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── package.json           # Backend dependencies
│
├── .env                       # Environment variables (create from .env.example)
├── .gitignore                 # Git ignore file
├── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/TechUniqueIIT-Website.git
   cd TechUniqueIIT-Website
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the backend directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)

Create a `.env.local` file in the frontend directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🏃‍♂️ Running the Application

### Development Mode

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on http://localhost:5000

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:3000

### Production Build

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   npm start
   ```

2. Run the backend in production mode:
   ```bash
   cd backend
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Blog Endpoints

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:slug` - Get a single blog by slug
- `POST /api/blogs` - Create a new blog (protected)
- `PUT /api/blogs/:id` - Update a blog (protected)
- `DELETE /api/blogs/:id` - Delete a blog (protected)

### Case Study Endpoints

- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:slug` - Get a single case study by slug
- `POST /api/case-studies` - Create a new case study (protected)
- `PUT /api/case-studies/:id` - Update a case study (protected)
- `DELETE /api/case-studies/:id` - Delete a case study (protected)

### User Endpoints

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a single user (admin or owner)
- `PUT /api/users/:id` - Update a user (admin or owner)
- `DELETE /api/users/:id` - Delete a user (admin only)

### Upload Endpoints

- `POST /api/upload` - Upload a file to Cloudinary (protected)

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set up the environment variables
3. Deploy the frontend

### Backend Deployment (Railway/Heroku/DigitalOcean)

1. Set up your preferred hosting platform
2. Configure environment variables
3. Deploy the backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check your MongoDB URI in the .env file
   - Ensure your IP address is whitelisted in MongoDB Atlas

2. **JWT Authentication Issues**

   - Verify the JWT_SECRET in your .env file
   - Check token expiration settings

3. **Image Upload Problems**

   - Confirm Cloudinary credentials are correct
   - Check file size limits in the backend configuration

4. **API Connection Issues**
   - Ensure backend is running and accessible
   - Verify CORS settings in the backend

### Support

For additional help, please open an issue on the GitHub repository or contact the development team.
