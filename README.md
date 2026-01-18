# ⚡ Personal Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, high-performance full-stack portfolio website built to showcase projects and skills with a premium user experience. Leveraging the power of **Next.js 15**, **Tailwind CSS 4**, and **MongoDB**, it features a secure admin panel, dynamic content management, immersive 3D elements, and seamless animations.

![Project Screenshot](./screenshot/Screenshot%202025-12-03%20155917.png)

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 👤 User Features

- **🎨 Modern & Responsive Design**: Crafted with **Tailwind CSS 4** and **Shadcn/ui** for a sleek, accessible, and fully responsive interface across all devices.
- **🚀 Dynamic Project Showcase**: Projects are fetched dynamically from a **MongoDB** database, ensuring content is always up-to-date.
- **✨ Immersive Animations**: Enhanced user experience with **Framer Motion** for smooth transitions and **Three.js** (@react-three/fiber) for 3D elements.
- **📝 Rich Content**: Detailed project descriptions rendered using `@uiw/react-md-editor` with markdown support.
- **📧 Contact Integration**: Fully functional contact form powered by **Resend** for direct email submissions.
- **🔔 Real-time Notifications**: Interactive toast notifications using **Sonner**.
- **🤖 AI Chat Assistant**: Intelligent chatbot powered by **Google Gemini** to answer questions about the portfolio.

### 🛡️ Admin Features

- **🔐 Secure Authentication**: Protected admin routes using **NextAuth.js** to ensure only authorized access.
- **📊 Dashboard Overview**: comprehensive view of projects and content.
- **🛠️ Project Management**: Full CRUD (Create, Read, Update, Delete) capabilities for managing portfolio projects.
- **✋ Drag & Drop Reordering**: Intuitive **Drag and Drop** interface (powered by `@dnd-kit`) to easily reorder skills and projects, giving you full control over how content is displayed.
- **☁️ Media Management**: Seamless image uploads and hosting via **Cloudinary**.

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Typewriter Effect](https://github.com/tameemsafi/typewriterjs)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)

### Backend

- **API**: Next.js API Routes
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **AI**: [Google Generative AI](https://ai.google.dev/)

### Tools & Services

- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Email Service**: [Resend](https://resend.com/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Linting**: ESLint

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (admin)/       # Protected admin routes (Dashboard, Project/Skill Management)
│   ├── (main)/        # Public facing routes (Home, Projects, Contact)
│   ├── api/           # Backend API endpoints (Projects, Skills, Auth, Email)
│   ├── globals.css    # Global styles and Tailwind directives
│   └── layout.tsx     # Root layout
├── components/        # Reusable UI components (Buttons, Cards, Modals)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions, DB connection, Cloudinary config
├── models/            # Mongoose database models (Project, Skill, User)
├── types/             # TypeScript type definitions
└── middleware.ts      # Authentication middleware
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

# Google Gemini AI
GOOGLE_API_KEY="your_google_api_key"
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
