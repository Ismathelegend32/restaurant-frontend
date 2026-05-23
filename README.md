# New Jubba Restaurant (React + Vite)

Public menu, cart, checkout, contact form, and staff admin.

## Local run

```bash
npm install
cp .env.example .env
# Edit .env (API URL, Static Forms, Cloudinary)
npm run dev
```

## Deploy on Vercel (free)

1. Push this folder to its own GitHub repo (`restaurant-frontend`).
2. Import the repo on [vercel.com](https://vercel.com).
3. Framework: **Vite** — Build: `npm run build` — Output: `dist`.
4. Add environment variables (see [DEPLOYMENT.md](../DEPLOYMENT.md)).
5. Set `VITE_API_BASE_URL` to your Render API URL + `/api`.
