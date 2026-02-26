# Krishna Reddy Portfolio

Premium personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Pages
- `/` Home
- `/projects` Projects index
- `/projects/[slug]` Project detail pages
- `/resume` Resume + download button
- `/contact` Contact with `mailto`, LinkedIn, and optional API form

## Features
- Modern gradient + glass-card visual system
- Recruiter-friendly outcomes and case studies
- SEO metadata + OpenGraph + `sitemap.xml` + `robots.txt`
- Accessible semantics and keyboard-friendly actions
- Fully deployable on Vercel Free Tier

## Local Development
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build Check
```bash
npm run build
```

## Resume File
A placeholder resume file is included at:
- `public/resume.pdf`

Replace it with your actual resume PDF when ready.

## Free Deployment on Vercel
1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Deploy on the free plan.
4. Use the generated free domain: `*.vercel.app`.

## Create a Separate GitHub Repo Locally
Run these commands on your machine (after `gh auth login`):
```bash
git init
git add .
git commit -m "Initial portfolio build"
gh repo create krishna-reddy-portfolio --public --source=. --remote=origin --push
```
