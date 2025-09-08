---
featured: false
date: "2023-10-11"

series: "Modern React.js"
part: "VII. Deploying React Apps"
chapter: "19. CI/CD Pipelines for React Projects"

title: "CI/CD Pipelines for React Projects"
description: "Continuous Integration (CI) and Continuous Deployment (CD) pipelines are essential for modern web development workflows. In this article, we’ll explore how to set up CI/CD pipelines for React projects, with practical examples."
# hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ["react", "deployment"]
---

# CI/CD Pipelines for React Projects

Continuous Integration (CI) and Continuous Deployment (CD) pipelines are essential for modern web development workflows, especially when building and deploying React applications at scale. CI/CD pipelines automate the process of building, testing, and deploying your code, making sure that every code change passes checks before it goes live.

In this tutorial, we’ll walk through setting up a CI/CD pipeline for deploying a React app to AWS S3 (for hosting static files) with CloudFront (for CDN distribution), using GitHub Actions.

---

## Why CI/CD Matters for React Apps

* ✅ Automatically catch build errors and test failures before deployment
* ✅ Ensure code quality with automated linting and tests
* ✅ Automate deployment steps to staging and production
* ✅ Speed up feedback loops for developers
* ✅ Reduce manual deployment errors

## Typical CI/CD Workflow for React Projects

Here’s a high-level overview of what a CI/CD pipeline for a React app usually looks like:

1. **Trigger**: Code is pushed to a Git branch (e.g., `main`, `develop`)
2. **Install Dependencies**: Install Node.js modules
3. **Run Tests**: Run Jest unit tests, React Testing Library tests, or Cypress E2E tests
4. **Lint & Format Check**: Run ESLint and Prettier checks
5. **Build the React App**: Run `npm run build` or `vite build`
6. **Deploy**: Upload build output to S3 (AWS)

## Setting Up CI with GitHub Actions

### Project Structure Assumption

```plaintext
my-react-app/
├── src/
├── public/
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
├── tsconfig.json
└── vite.config.ts (or webpack.config.js)
```

### Example GitHub Actions Workflow: `.github/workflows/ci.yml`

```yaml
name: Deploy React App to AWS S3

on:
  push:
    branches:
      - main  # Trigger on push to main branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build the React app
        run: npm run build

      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@v0.5.1
        with:
          args: --acl public-read --delete
        env:
          AWS_S3_BUCKET: your-s3-bucket-name
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1  # Update if needed
          SOURCE_DIR: ./build  # Or ./dist for Vite
```

## Optional Step: CloudFront Cache Invalidation

If you're deploying to **AWS S3 with CloudFront**, you can add deployment steps using AWS CLI.

```yaml
      - name: Invalidate CloudFront Cache
        uses: chetan/invalidate-cloudfront-action@v1
        with:
          distribution-id: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
          paths: '/*'
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## CI/CD Pipeline Diagram

```plaintext
[Git Push] → [GitHub Actions: Build & Deploy] → [AWS S3] → [CloudFront CDN] → [End Users]
```

## Additional Tips

* You can run `npm run test` before the build step to run unit tests.
* Monitor S3 bucket policies and CloudFront invalidation limits for cost control.
* Use versioned builds or deploy folders like `/v1`, `/v2` for safer deployments.

## References:

* [GitHub Actions Documentation](https://docs.github.com/en/actions)
* [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
* [CloudFront Invalidation API](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
* [jakejarvis/s3-sync-action](https://github.com/jakejarvis/s3-sync-action)
* [chetan/invalidate-cloudfront-action](https://github.com/chetan/invalidate-cloudfront-action)

## Conclusion

This concludes the React tutorial series, for web application developement. The topic of web development, as well as React is vast, and mastering them takes time and experience. However the previous chapters cover enough topics with examples that should set you up with a solid foundation for developing web application using React.js.

Future tutorial series would cover additional topics that would include more topics related to web development and React.