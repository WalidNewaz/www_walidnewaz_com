---
featured: false
date: "2023-10-09"

series: "Modern React.js"
part: "VII. Deploying React Apps"
chapter: "18. Deploying React Applications on various Platforms"

title: "Deploying React Applications on various Platforms"
description: "Deploying a React application has never been easier, thanks to modern platforms like Vercel, Netlify, and AWS Amplify. These services offer continuous deployment (CI/CD), edge caching, custom domain management, HTTPS, and serverless functions — all out of the box."
hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ["react", "deployment"]
---

# Deploying React Applications on Platforms like Vercel, Netlify, and AWS

Deploying a React application has never been easier, thanks to modern platforms like **Vercel**, **Netlify**, and **AWS Amplify**. These services offer continuous deployment (CI/CD), edge caching, custom domain management, HTTPS, and serverless functions — all out of the box.

This article explores how to deploy React apps on each of these platforms, with code examples, setup steps, and key features to consider.

---

## Preparing Your React App for Deployment

Before deploying, ensure your React app is [production-ready](/tutorials/reactjs/deploying-react-apps/best-practices/).

## Deployment on Vercel

<a href="https://vercel.com/" target="_blank">Vercel</a> is the platform behind Next.js but works seamlessly with Create React App (CRA) and other frameworks.

### Steps

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Login to Vercel and import your repo.
3. Set **Build and Output Settings** (Vercel auto-detects React apps):
    - Framework preset: **Create React App**
    - Build command: `npm run build`
    - Output directory: `build`
4. Add any required environment variables.
5. Click **Deploy**.

### Features

- Instant rollback
- Edge functions (deployed globally)
- Serverless API support (aka **Vercel Functions**, deployed into specific regions)
- Custom domains with HTTPS
- Git-based deployments

### Example

After deployment, you'll get a live preview URL like:

[<a href="https://react-breadcrumb.vercel.app/" target="_blank">https://react-breadcrumb.vercel.app/</a>](https://react-breadcrumb.vercel.app/)

Vercel also provides preview deployments on every pull request.

## Deployment on Netlify

<a href="https://www.netlify.com/" target="_blank">Netlify</a> is a powerful JAMstack platform with built-in CI/CD and form handling features.

### Steps

1. Push your app to a Git repo.
2. Login to Netlify and click **"Add new project > Import an existing project"**.
3. Choose your repository.
4. Set these build options:
    - Branch to deploy: `main`
    - Build command: `npm run build`
    - Publish directory: `dist`
5. Add any required environment variables.
6. Click **Deploy {Project name}**.

### CLI Option

You can also deploy directly using the Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Features

* Branch-based deploys
* Edge functions & serverless functions
* Built-in form and auth handling
* Global CDN and atomic deploys

After deployment:

[<a href="https://reactbreadcrumb.netlify.app/" target="_blank">https://reactbreadcrumb.netlify.app/</a>](https://reactbreadcrumb.netlify.app/)

## Deployment on AWS Amplify

[AWS Amplify](https://aws.amazon.com/amplify/) is a full-stack platform backed by AWS services.

### Steps

1. Push your code to GitHub.
2. Login to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home).
3. Click `Deploy an app`
4. Connect your GitHub repo and branch.
5. Amplify auto-detects React and sets:
   * Build command: `npm run build`
   * Output directory: `dist`
6. Click `Next`.
7. Click **Save and Deploy**.

### Features

* Built-in auth (Cognito), GraphQL (AppSync), and storage (S3)
* CI/CD for frontend and backend
* Custom domains with Route53
* Environment-specific deployments
* Server-side rendering (SSR) for Next.js

### Example

After deployment:

[<a href="https://main.d3non2510mgjty.amplifyapp.com/" target="_blank">https://main.d3non2510mgjty.amplifyapp.com/</a>](https://main.d3non2510mgjty.amplifyapp.com/)

You can also configure backend services (auth, DB, APIs) via Amplify CLI or Admin UI.

## Comparison Table

| Feature                | Vercel             | Netlify       | AWS Amplify        |
| ---------------------- | ------------------ | ------------- | ------------------ |
| Free Tier              | ✅ Generous         | ✅ Generous    | ✅ Generous         |
| CI/CD Integration      | ✅ Built-in         | ✅ Built-in    | ✅ Built-in         |
| Custom Domains & HTTPS | ✅ Easy             | ✅ Easy        | ✅ With Route53     |
| Serverless Functions   | ✅                  | ✅             | ✅                  |
| SSR Support            | ✅ Best for Next.js | ✅ via plugins | ✅ (Next.js SSR)    |
| Backend Integration    | ❌                  | ❌             | ✅ Cognito, S3, etc |

## Tips for Production-Ready Deployments

* Use `.env.production` for secrets and config.
* Enable gzip compression (done automatically by most platforms).
* Avoid committing build artifacts (`/build`).
* Monitor performance via tools like <a href="https://web.dev/measure/" target="_blank">Lighthouse</a>.
* Use <a href="https://create-react-app.dev/docs/production-build/#generating-source-maps" target="_blank">source maps</a> carefully.

## Resources

* <a href="https://vercel.com/docs/frameworks/react" target="_blank">Vercel Docs – React</a>
* <a href="https://docs.netlify.com/frameworks/react/" target="_blank">Netlify Docs – React</a>
* <a href="https://docs.amplify.aws/" target="_blank">AWS Amplify Docs</a>
* <a href="https://create-react-app.dev/docs/deployment/" target="_blank">React Deployment Guide (CRA)</a>
* <a href="https://web.dev/measure/" target="_blank">Lighthouse</a>
* <a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv – Env Variable Management</a>
