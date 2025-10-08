# Personal Portfolio Website

This is a full-stack personal portfolio website built with Next.js, Tailwind CSS, and MongoDB. It features an admin panel for managing projects, dynamic project pages, and a clean, modern design.

![image](./screenshot/Screenshot%202025-10-08%20234106.png)

## Features

-   **Dynamic Project Showcase**: Display projects from a MongoDB database.
-   **Detailed Project Pages**: Each project has its own page with a detailed description (Markdown supported), tech stack, and links.
-   **Admin Panel**: A secure section to perform CRUD (Create, Read, Update, Delete) operations on projects.
-   **Cloudinary Integration**: Handles image uploads for project showcases, optimizing storage and delivery.
-   **Authentication**: Secure admin routes using NextAuth.js.
-   **Responsive Design**: Fully responsive layout for all device sizes, built with Tailwind CSS and Shadcn/ui.
-   **API Routes**: Backend logic is handled by Next.js API routes.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **Image Management**: [Cloudinary](https://cloudinary.com/)
-   **Markdown Rendering**: [`@uiw/react-md-editor`](https://www.npmjs.com/package/@uiw/react-md-editor)
-   **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

### 2. Install Dependencies

Install the necessary packages using npm (or your preferred package manager):

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following environment variables. You will need to get these credentials from their respective services.

```env
# MongoDB Connection String
MONGODB_URI="your_mongodb_connection_string"

# NextAuth.js Credentials
RESEND_API_KEY=
NEXTAUTH_SECRET=

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Base URL for your application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Run the Development Server

Once the setup is complete, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Make sure to set up the environment variables in your Vercel project settings.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.