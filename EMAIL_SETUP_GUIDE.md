# Email Setup Guide (Local + Production)

This project has a Vite/React frontend and an Express backend (`backend/`). Emails work in development because both services run locally, but production requires an explicit SMTP configuration and a public backend URL that the frontend can call.

---

## 1. Backend Environment Variables

Create `backend/.env` with the exact values used in the working local setup, then add **the same env vars** to your hosting provider (Render, Railway, etc.). Example:

```env
# SMTP configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=hotel-owner@gmail.com

# Server configuration
PORT=5000
```

> **Why?** The controller reads `process.env.SMTP_*` and `process.env.ADMIN_EMAIL`. If any are missing in production, `nodemailer` fails silently and emails never send.

### Gmail Notes
1. Enable 2FA on the Gmail account.
2. Generate an App Password (Google Account → Security → 2-Step Verification → App Passwords).
3. Use that 16-character app password in `SMTP_PASSWORD`.

### Other Providers
- Outlook: `SMTP_HOST=smtp-mail.outlook.com`
- Yahoo: `SMTP_HOST=smtp.mail.yahoo.com`
- Use TLS ports 587 or 465 depending on provider (set `secure` flag accordingly if you switch to 465).

---

## 2. Production Backend Checklist
1. **Deploy** the Express server somewhere public (Render, Railway, VPS, etc.).
2. **Set env vars** in that platform’s dashboard using the same keys as `.env`.
3. **Trigger a redeploy/restart** so the new env vars load.
4. (Optional) Add logging in `emailControllers.js` to confirm `process.env` values are present—but never log the password.

---

## 3. Frontend → Backend URL

The frontend currently defaults to `window.location.origin`. On Vercel this points to the static site (`https://www.blueimpulse.in`) which doesn’t host the API. Set `VITE_API_BASE_URL` so the SPA calls your deployed backend:

```env
# frontend/.env
VITE_API_BASE_URL=https://your-backend-domain.com
```

Add the same variable in Vercel Project Settings → Environment Variables, then redeploy the frontend.

---

## 4. End-to-End Test Plan
1. **Local**: `cd backend && npm start`; in another terminal `npm run dev`. Submit a booking → verify two emails (customer + admin).
2. **Production**:
   - Visit `https://your-backend-domain.com/email/handleSubmit` with `curl -I`. Expect `404`/`405` (means server is reachable); avoid `DEPLOYMENT_NOT_FOUND`.
   - On `https://www.blueimpulse.in`, open DevTools Network, submit the booking. Confirm POST goes to your backend host and returns 200.
   - Check both inboxes.

---

## 5. Troubleshooting Matrix
| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `DEPLOYMENT_NOT_FOUND` | Frontend still calling Vercel host | Update `VITE_API_BASE_URL` |
| `Missing request body` | Backend not receiving JSON | Ensure `express.json()` is before routes (already done) |
| `Authentication failed` | Wrong SMTP password or 2FA missing | Regenerate Gmail app password |
| Customer email only | `ADMIN_EMAIL` missing/typo | Set correct admin address |
| No emails | SMTP env vars absent in production | Recreate `.env` entries in hosting dashboard |

---

## 6. Key Files
- `backend/controllers/emailControllers.js` – Nodemailer transporter and send logic.
- `backend/server.js` – Express setup + CORS.
- `src/components/BookingForm.tsx` – Calls `POST /email/handleSubmit` using `VITE_API_BASE_URL`.

With the environment mirrored in production (SMTP vars + API base URL), emails will send just like they do locally. 🎉
