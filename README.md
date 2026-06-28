# AI Free Hub - Background Remover

A Vercel-ready React app for removing image backgrounds with the remove.bg API.

## Features

- Drag-and-drop image upload
- Background removal through a Vercel Serverless Function
- Side-by-side original and result preview
- High-quality PNG download
- Arabic and English support
- Responsive React + Tailwind interface
- Privacy-first flow with no local image storage

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Vercel Serverless Functions
- remove.bg API

## Project Structure

```
.
├── api/
│   └── remove.ts              # Vercel Serverless Function
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   └── pages/
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json
└── vite.config.ts
```

## Local Development

```bash
npm install
npm run dev
```

Set the remove.bg API key for Vercel deployments:

```bash
REMOVE_BG_API_KEY=your_remove_bg_api_key
```

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add `REMOVE_BG_API_KEY` in Vercel project environment variables.
4. Deploy.

Vercel builds the frontend with `npm run build` and serves the background removal endpoint at `/api/remove`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

## License

MIT
