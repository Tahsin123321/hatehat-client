# HateHat (হাতে হাত)

**Live site:** https://YOUR-CLIENT-URL.vercel.app
**Server repo:** https://github.com/YOUR-USERNAME/hatehat-server

HateHat is a community platform where neighbours create, join and track social
service events such as winter clothes distributions, blanket drives, cleanups
and plantation days across Bangladesh.

## Features

- **Email + password and Google login** with Better Auth (MongoDB adapter), password rules (uppercase, lowercase, 6+ characters) and toast feedback.
- **JWT-protected API.** The Next.js app issues a JWT through Better Auth, and the Express server verifies it against the app's public JWKS before any create, update, delete or join.
- **Create, update and delete events.** Only the creator can change or remove an event, enforced on the server. Dates in the past are rejected.
- **Upcoming Events** with search, event-type filter and sort. Events whose date has passed never appear.
- **Join Event** stored in the database with user and event data, duplicate joins blocked, plus a **Joined Events** page sorted by date.
- **Light / dark theme** toggle that saves your choice and applies before first paint (no flash).
- **Loading skeletons** on every data page, and a **profile page** to update your name and photo.
- Fully responsive layout, equal-height cards, kantha-stitch visual identity, no default browser alerts (react-hot-toast and SweetAlert2 only).

## Tech stack

Next.js 16 (App Router, JavaScript), Tailwind CSS 4, DaisyUI 5, Better Auth (MongoDB adapter + JWT plugin), react-hot-toast, SweetAlert2, react-icons.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in MongoDB, secret and (optionally) Google keys
npm run dev                  # http://localhost:3000
```

Start the Express server from the `hatehat-server` repo as well (default `http://localhost:5000`).

## Environment variables

See `.env.example`. `BETTER_AUTH_URL` must equal the URL the site is served from, and the server's `AUTH_URL` must point to the same value.
