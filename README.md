# Personal Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, full-stack personal portfolio website designed to showcase projects and skills with a premium user experience. Built with **Next.js 15**, **Tailwind CSS 4**, and **MongoDB**, it features a secure admin panel, dynamic content management, and immersive 3D elements.

![Project Screenshot](./screenshot/Screenshot%202025-12-03%20155036.png)

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **🎨 Modern & Responsive Design**: Built with **Tailwind CSS** and **Shadcn/ui** for a sleek, accessible, and fully responsive interface across all devices.
- **🚀 Dynamic Project Showcase**: Projects are fetched dynamically from a **MongoDB** database, allowing for real-time updates without redeploying.
- **📝 Markdown Support**: Detailed project descriptions are rendered using `@uiw/react-md-editor`, supporting rich text formatting.
- **🔐 Secure Admin Panel**: Protected routes using **NextAuth.js** allow authorized users to Create, Read, Update, and Delete (CRUD) projects.
- **☁️ Cloudinary Integration**: Optimized image hosting and delivery for high-performance project visuals.
- **📧 Contact Form**: Integrated with **Resend** to handle email submissions directly from the portfolio.
- **✨ Animations & 3D**: Enhanced user experience with **Framer Motion** animations and **Three.js** (@react-three/fiber) elements.
- **🔔 Toast Notifications**: Real-time feedback for user actions using **Sonner**.

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend

- **API**: Next.js API Routes
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### Tools & Services

- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Email Service**: [Resend](https://resend.com/)
- **Markdown**: `@uiw/react-md-editor`
- **Linting**: ESLint

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (admin)/       # Protected admin routes (Dashboard, Project Management)
│   ├── (main)/        # Public facing routes (Home, Projects, Contact)
│   ├── api/           # Backend API endpoints
│   ├── globals.css    # Global styles and Tailwind directives
│   └── layout.tsx     # Root layout
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and database connections
├── types/             # TypeScript type definitions
└── middleware.ts      # Auth middleware
```

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB
MONGODB_URI="your_mongodb_connection_string"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret" # Generate using `openssl rand -base64 32`

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Resend (Email)
RESEND_API_KEY="your_resend_api_key"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Deployment

The application is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables in the Vercel dashboard.
4.  Deploy!

For more details, check the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.
