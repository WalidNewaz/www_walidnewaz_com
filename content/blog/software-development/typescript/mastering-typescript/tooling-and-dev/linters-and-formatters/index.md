---
featured: false
date: "2023-08-14"
series: "Mastering TypeScript Series"
chapter: "3. Tooling and Development Environment"
title: "TypeScript Linters and Formatters"
description: "Enhancing Productivity with TypeScript Linters and Formatters"
hero_image: "typescript-banner.png"
tags: ["dev tools", "typescript"]
read_time: 6 min
related:
  - "Introduction to TypeScript"
  - "Understanding TypeScript Types"
  - "Classes, Interfaces, and Objects in TypeScript"
---

# Enhancing Productivity with TypeScript Linters and Formatters

Code formatters and linters are a standard part of the tooling used within a standard development environment. Integrating linters and formatters like ESLint and Prettier can significantly enhance productivity by enforcing coding standards and automatically formatting code. This article explores how to integrate these tools into both new and existing TypeScript projects.

## Setting Up Linters and Formatters in a New TypeScript Project

### 1. Starting a New TypeScript Project

First, initialize a new Node.js project and add TypeScript:

```bash {numberLines}
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install typescript --save-dev
npx tsc --init
```

This sets up a basic TypeScript environment.

### 2. Adding ESLint

Install ESLint along with the TypeScript parser and plugin:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

Next, create an `.eslintrc.js` file to configure ESLint:

```javascript {numberLines}
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
```

### 3. Adding Prettier

Install Prettier and the ESLint plugin for Prettier:

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Update the `.eslintrc.js` to integrate Prettier:

```javascript {numberLines}
module.exports = {
  // previous configuration...
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
};
```

Create a `.prettierrc` file to configure Prettier options:

```json {numberLines}
{
  "semi": true,
  "singleQuote": true
}
```

This setup enforces semicolons and uses single quotes for strings.

## Integrating Linters and Formatters into an Existing TypeScript Project

Integrating ESLint and Prettier into an existing project follows similar steps, with extra care not to disrupt existing configurations.

### 1. Install Necessary Packages

If not already installed, add ESLint and Prettier to your project:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### 2. Configure ESLint and Prettier

Follow the steps mentioned in the new project setup to create `.eslintrc.js` and `.prettierrc`. If these files already exist, you may need to merge configurations carefully. Ensure that your ESLint configuration extends `plugin:@typescript-eslint/recommended` and `plugin:prettier/recommended`.

### 3. Resolve Conflicts

After integration, run the linter to check for conflicts:

```bash
npx eslint . --ext .ts
```

Resolve any linting errors that arise based on the new rules.

### 4. Format Existing Code

To reformat the existing codebase according to the new Prettier setup, run:

```bash
npx prettier --write .
```

This command formats all files, applying the defined code style consistently across your project.

## Running Linter and Formatter as npm Scripts

Enhance your `package.json` to include scripts that facilitate running ESLint and Prettier across your TypeScript codebase:

```json
"scripts": {
  "lint": "eslint 'src/**/*.{ts,tsx}' --fix",
  "format": "prettier --write 'src/**/*.{ts,tsx}'"
}
```

- **`lint`**: This script runs ESLint on all TypeScript files in your `src` directory, automatically fixing fixable issues.
- **`format`**: This script formats all TypeScript files using Prettier.

### Using the Scripts

To check and fix linting errors, run:

```bash
npm run lint
```

To format your code, run:

```bash
npm run format
```

## Conclusion

Integrating tools like ESLint and Prettier into TypeScript projects standardizes coding practices, reduces bugs, and enhances code readability. This setup is invaluable in team environments, ensuring that all developers adhere to the same coding standards, which is critical for maintaining the quality of the codebase.

For more detailed information and advanced configurations, refer to the following resources:

- <a href="https://typescript-eslint.io/" target="blank">ESLint with TypeScript</a>
- <a href="https://prettier.io/docs/en/index.html" target="blank">Prettier Documentation</a>

By leveraging these tools, you can focus more on solving business problems rather than fixing trivial bugs or debating code styles. Happy coding!
