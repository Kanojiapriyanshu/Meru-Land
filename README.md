## Meru Land Private Limited – Website

This is a Next.js (React) marketing site for **Meru Land Private Limited**, styled with an Adobe Creative Cloud–inspired dark theme and yellow accent.

Built with:
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

### Local development

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in your browser.

The main landing page is implemented in `src/app/page.tsx`.

### Deploying on Vercel

This project is ready to deploy directly on **Vercel**.

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to the Vercel dashboard and create a **New Project**.
3. Import your repository.
4. Vercel will auto-detect **Next.js** and use the default settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Click **Deploy**.

After deployment, Vercel will give you a production URL for your Meru Land website.

### Notes

- The contact form currently only handles submission in the browser and shows a confirmation message. Connect it to your preferred backend, email service, or CRM when you are ready.
- All styling is done using Tailwind CSS utility classes configured via `src/app/globals.css`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
