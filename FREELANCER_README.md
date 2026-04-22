# Coasting Properties — Content Tools
## Freelancer Handoff Guide

---

## What you are building

A private, password-protected web app hosted on Vercel with two tools:
- **Social Content Agent** — generates Facebook, Instagram, TikTok, Newsletter, Blog, and Nextdoor content
- **Blog Generator** — generates full SEO blog articles with HTML export

The app sits behind a login screen. The Anthropic API key lives only on the server and is never exposed to the browser.

---

## What the owner will provide to you (via Vercel dashboard only)

The owner will add the following as **Vercel Environment Variables** directly.  
**You will never see or handle the API key.** The owner adds it themselves after you deploy.

| Variable | Who sets it |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Owner adds in Vercel after deploy |
| `REACT_APP_PASSWORD_HASH` | Owner generates and adds |
| `REACT_APP_SALT` | Owner generates and adds |
| `REACT_APP_SESSION_SECRET` | Owner generates and adds |
| `SESSION_SECRET` | Owner generates and adds |

---

## Your job as the freelancer

1. Set up the project on Vercel
2. Connect it to the owner's domain or subdomain
3. Confirm the login screen works
4. Confirm both tools load correctly after login
5. Hand back access to the owner

You do not need to modify the application code. Do not add any third-party analytics, tracking, or logging tools.

---

## Step-by-step deployment

### 1. Prerequisites
- Node.js 18+ installed
- Your own free Vercel account at vercel.com (you deploy first, then transfer to owner)
- Vercel CLI: `npm install -g vercel`

### 2. Install dependencies
```bash
cd coasting-content-tools
npm install
```

### 3. Test locally (without API key)
```bash
npm start
```
The login screen should appear at `http://localhost:3000`.  
You won't be able to test generation without the API key — that's fine. Confirm the login screen loads and both tool tabs are visible after a dummy login attempt.

### 4. Deploy to your Vercel account
```bash
vercel
```
Follow the prompts:
- Link to your own Vercel account
- Create a new project named `coasting-content-tools`
- Accept default settings

This gives you a live URL like `coasting-content-tools.vercel.app`. Share this URL with the owner.

### 5. Notify the owner to add environment variables
Tell the owner:
> "The app is live at [your URL]. Please add your environment variables in Vercel → Project → Settings → Environment Variables, then let me know when done."

The owner will add their API key and password variables themselves — you will not see these. Once they confirm variables are set, trigger a final redeploy:
```bash
vercel --prod
```

### 6. Confirm the app works
Ask the owner to test their password login and confirm both tools generate content correctly. Do not proceed to transfer until the owner confirms everything is working.

### 7. Transfer the project to the owner ⬅ CRITICAL STEP
Once the owner confirms the app is working:

1. In your Vercel dashboard, open the `coasting-content-tools` project
2. Go to **Settings** (bottom of left sidebar)
3. Scroll to the very bottom → find **Transfer Project**
4. Enter the owner's Vercel account email (they will provide this)
5. Click **Transfer**
6. The owner will receive an email to accept the transfer
7. Once they accept, the project moves to their account and you lose all access automatically

After transfer, the owner owns the deployment, the URL, and all settings. Your job is complete.

### 8. Custom domain (if requested)
The owner handles this themselves after transfer via **Vercel Dashboard → Project → Settings → Domains**. You do not need to configure the domain.

---

## Security requirements — please follow exactly

- **Do not** add any `console.log` statements that output user input or API responses
- **Do not** install any additional npm packages without owner approval
- **Do not** add Google Analytics, Mixpanel, Hotjar, or any tracking/analytics tools
- **Do not** store or export any of the application content, prompts, or outputs
- **Do not** share the Vercel project URL publicly before handoff
- **Do not** create any additional Vercel API routes beyond `api/generate.js`
- **Do not** modify `api/generate.js` — the security validation logic must remain intact
- The `.gitignore` file must remain in place — never commit `.env.local` or any file containing real credentials
- If you use GitHub to deploy, the repository must be **private**

---

## File structure

```
coasting-content-tools/
├── api/
│   └── generate.js          ← Secure server proxy (DO NOT MODIFY)
├── public/
│   └── index.html           ← HTML shell
├── scripts/
│   └── generate-password-hash.js  ← Owner runs this to create password hash
├── src/
│   ├── App.jsx              ← Main app with auth gate and tab nav
│   ├── Login.jsx            ← Password screen
│   ├── CoastingContentAgent.jsx   ← Social content tool
│   └── CoastingBlogGenerator.jsx  ← Blog tool
├── .env.local.example       ← Template (no real values)
├── .gitignore               ← Prevents secrets from being committed
├── package.json
└── vercel.json              ← Security headers + routing config
```

---

## How the password system works (for your reference)

The owner chooses a password and runs:
```bash
node scripts/generate-password-hash.js theirPassword
```
This outputs hashed values they paste into Vercel. The actual password is never stored anywhere — only its hash. The freelancer never learns the password. After deploy, the owner can change the password at any time by regenerating the hash and updating the Vercel env vars.

---

## Handoff checklist

Before marking the job complete, confirm:

- [ ] App deploys successfully to your Vercel account
- [ ] Login screen appears at the live URL
- [ ] Owner has added all environment variables in Vercel
- [ ] After redeploy, owner confirms login works with their password
- [ ] Social Content Agent loads and Generate button works
- [ ] Blog Generator loads and Generate button works
- [ ] **Project has been transferred to owner's Vercel account**
- [ ] Owner has confirmed they received and accepted the transfer
- [ ] You no longer have access to the project
- [ ] No tracking or analytics code was added
- [ ] GitHub repo is set to private (if used) and owner has been added before you remove yourself

---

## Questions?

Direct all questions to: **hello@coastingproperties.com**  
Do not contact Anthropic or attempt to access any API keys.
