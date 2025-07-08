# Portfolio Website

## Overview
This is a modern portfolio website built using Next.js, TypeScript, and Tailwind CSS. The website is designed to showcase projects, provide contact functionality, and offer a visually appealing and responsive user experience. It is deployed on Vercel and integrates with Neon (Vercel Postgres) for database functionality.

## Features
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Modern UI/UX**: Includes sticky sections, animations, and scroll effects.
- **Projects Section**: Displays a grid of projects with detailed information.
- **Contact Form**: Allows users to submit messages, which are saved to a Neon Postgres database.
- **API Integration**: Serverless API routes for handling contact form submissions and database connectivity.
- **Deployment**: Hosted on Vercel with custom domain and DNS configuration.

## Technologies Used
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Serverless API routes in Next.js
- **Database**: Neon (Vercel Postgres)
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio_website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
1. Create a `.env.local` file in the root directory and add your Neon Postgres connection string:
   ```env
   DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deployment
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set the `DATABASE_URL` environment variable in the Vercel dashboard.
4. Deploy the project.

## Folder Structure
```
portfolio_website/
├── app/
│   ├── Contact/
│   │   └── page.tsx
│   ├── Projects/
│   │   └── page.tsx
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   │  
│   │
│   └── page.tsx
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.ts
├── package.json
└── vercel.json
```

## Environment Variables
- `DATABASE_URL`: Connection string for Neon Postgres.

## API Routes
- `/api/contact`: Handles contact form submissions and saves data to the database.
- `/api/test-db`: Tests database connectivity.

## Deployment Notes
- Ensure `next build` is used for deployment (no static export).
- Verify environment variables are correctly set in Vercel.
- Use Vercel's DNS management for custom domain setup.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Documentation](https://vercel.com/docs)

