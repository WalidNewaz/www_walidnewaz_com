---
featured: false
date: "2023-10-05"

series: "Modern React.js"
part: "VII. Deploying React Apps"
chapter: "17. Best Practices for Building Production-Ready React Apps"

title: "Best Practices for Building Production-Ready React Apps"
description: "End-to-end (E2E) testing is a crucial aspect of modern web development, ensuring that applications function correctly from the user's perspective. Cypress is a powerful and user-friendly JavaScript testing framework that simplifies E2E testing for React applications."
# hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ["react", "deployment"]
---

# Best Practices for Building Production-Ready React Apps  

In the previous chapters we have focused on writing high quality React applications and testing them for reliability. However, before you publish your application into a production environment you should ensure that your application is ready for production, which involves more than just writing functional code. To ensure maintainability, scalability, and performance, you should also follow industry best practices, optimize your application, and implement security measures. In this article, we’ll explore key strategies to make your React app production-ready.

## Code Organization and Maintainability  

### Use a Scalable Project Structure

As your project grows, a well-organized structure helps with maintainability. Consider couple of options outlined below:

#### 1. Features Based Approach

The **Feature-Based Approach** structures the application based on individual features rather than separating code by file type (e.g., all components in a `components/` folder, all hooks in a `hooks/` folder, etc.).

**Folder Structure Example**

```plaintext
src/
├── features/            # Each feature is a self-contained module
│   ├── auth/            # Authentication feature
│   │   ├── components/  # UI components related to authentication
│   │   ├── hooks/       # Custom hooks for authentication
│   │   ├── api/         # API requests for authentication
│   │   ├── context/     # Context API for managing authentication state
│   │   ├── authSlice.ts # Redux slice (if using Redux Toolkit)
│   │   ├── index.ts     # Barrel file exporting everything from auth
│   │   ├── AuthPage.tsx # Main page related to authentication
│   ├── dashboard/       # Dashboard feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── DashboardPage.tsx
│   ├── users/           # User management feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── UserList.tsx
│   ├── notifications/   # Notifications feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── NotificationList.tsx
│
├── shared/              # Shared components, hooks, and utilities
│   ├── components/      # Generic UI components used across features
│   ├── hooks/           # Reusable hooks
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│
├── app/                 # Global state, routes, and layout
│   ├── store.ts         # Redux store (if using Redux)
│   ├── routes.tsx       # Centralized route definitions
│   ├── App.tsx          # Main entry point
│
└── index.tsx            # Application entry file
```

**Key Concepts of Feature-Based Organization**

1. **Encapsulation**: Each feature contains everything it needs—components, styles, hooks, state management, and API calls—reducing dependencies across the project.  
2. **Scalability**: New features can be easily added without affecting other parts of the codebase.  
3. **Readability & Maintainability**: Developers can quickly locate files related to a feature instead of searching across multiple directories.

#### 2. Atomic Design

Proposed by **Brad Frost**, <a href="https://atomicdesign.bradfrost.com/" target="_blank">Atomic Design</a> structures UI components **by reusability and composition**, breaking down UI elements into **Atoms, Molecules, Organisms, Templates, and Pages**.

**Folder Structure Example**

```plaintext
components/
│── atoms/      # Smallest UI elements (buttons, inputs, labels)
│── molecules/  # Groups of atoms forming functional units (search bar, form fields)
│── organisms/  # More complex UI blocks (header, sidebar, product card)
│── templates/  # Page layouts using organisms
│── pages/      # Final, fully composed pages
```

**Key concepts of Atomic Design**

1. **Reusability**: Each component is designed once and reused to build more complex components.
2. **Consistency**: Components are used consistently across the application to give it a consistent look-and-feel.

<table>
  <caption>
    Comparing the Two Approaches
  </caption>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Feature-Based Organization</th>
      <th>Atomic Design</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Primary Focus</td>
      <td>Organizing code based on **features** (functional concerns).</td>
      <td>Organizing code based on **UI hierarchy** and reusability.</td>
    </tr>
    <tr>
      <td>Best For</td>
      <td>Large applications with distinct modules (Auth, Dashboard, etc.).</td>
      <td>Component libraries, design systems, and UI-heavy apps.</td>
    </tr>
    <tr>
      <td>Code Reusability</td>
      <td>Reusable within features, but may lead to duplication.</td>
      <td>Maximizes UI reusability across the application.</td>
    </tr>
    <tr>
      <td>Scalability</td>
      <td>Scales well by adding new feature modules.</td>
      <td>Works well for scalable UI but can be hard to navigate.</td>
    </tr>
    <tr>
      <td>Maintainability</td>
      <td>Easier to maintain in applications with complex business logic.</td>
      <td>Better for maintaining consistent UI across an app.</td>
    </tr>
    <tr>
      <td>State Management</td>
      <td>Encapsulated within a feature.</td>
      <td>Encourages component-driven state management.</td>
    </tr>
    <tr>
      <td>Learning Curve</td>
      <td>Easier for developers familiar with modular structures.</td>
      <td>Requires understanding of Atomic Design principles.</td>
    </tr>
  </tbody>
</table>

#### 3. Hybrid Approach

You can organize your code in such a way that your features remain encapsulated and isolated, while taking advantage of the **reusability** of Atomic Design.

```plaintext
src/
│── features/
│   ├── auth/
│   ├── chat/
│── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│── store/
│── graphql/
│── pages/
│── templates/  # (for Gatsby)
```

### Keep Components Small and Reusable

Follow the **Single Responsibility Principle (SRP)** by breaking components into smaller, reusable units.

```javascript
// Bad: Monolithic component
const Dashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
};

// Good: Modular approach
const Dashboard = () => (
  <>
    <Header />
    <Sidebar />
    <MainContent />
    <Footer />
  </>
);
```

The primary difference between the two approaches is not just about enclosing components with `<div>` or fragments, but how modularity and separation of concerns are being approached. You should always strive to build components whose behavior and appearance is independent from the rest of the component tree. Therefore it does not matter whether the `<Header>` component is enclosed within a `<div>` tag or not; it should render and behave consistently.

---

## Performance Optimization 

### Use React.memo, useCallback, and useMemo

Memoization prevents unnecessary re-renders.

#### React.memo

`React.memo` is a higher-order component (HOC) used to memoize functional components. It wraps a functional component and prevents it from re-rendering if its props haven't changed.

Use `React.memo` when you have functional components that are expensive to render, especially if their props don't change frequently.

```javascript
const MemoizedComponent = React.memo(({ data }) => {
  console.log("Re-rendered");
  return <div>{data}</div>;
});
```

#### useMemo

`useMemo` is a **React Hook** used to memoize the result of expensive calculations or values within a functional component. React caches the result of the function call and reuses it in subsequent renders as long as the dependencies don't change.

Use `useMemo` when you have computationally intensive operations within a component that shouldn't be recomputed on every render.

```javascript
const MyComponent = ({ prop1, prop2 }) => {
  const memoizedVal = useMemo(() => {
    // Expensive calculations
    return computeComplexStuff(prop1, prop2)
  }, [prop1, prop2])  // Dependencies

  return <div>{memoizedVal}</div>
}
```

#### useCallback

`useCallback` is a **React Hook** used to memoize the function definition itself, ensuring the function reference remains stable across renders unless its dependencies change.

`useCallback` is particularly beneficial when passing callbacks as props to child components that rely on referential equality to prevent unnecessary re-renders.

```javascript
import React, { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(count + 1), [count]);

  return <Child onClick={increment} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Increment</button>;
}
```

#### Important Considerations

**Don't overuse memoization**: Memoization adds overhead, so only use it when you observe performance issues and can identify specific areas that benefit from memoization.

**Dependencies are crucial**: Always specify the correct dependencies to ensure the memoized value or function updates when needed.

### Code Splitting with React.lazy and Suspense

Reduce initial bundle size by dynamically loading components.

```javascript
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>;
```

### Optimize Performance with Virtualization

The key idea behind React virtualization is that you don't need to render all the list items at once, especially when the list is long. Instead, only a small subset of items is rendered, which results in faster page load times and smoother scrolling, especially in applications that deal with large datasets.

Use libraries like **react-window**, or **react-virtualized** for rendering large lists efficiently.

```javascript
import { FixedSizeList as List } from "react-window";

<List height={500} itemCount={1000} itemSize={35} width={300}>
  {({ index, style }) => <div style={style}>Item {index}</div>}
</List>;
```

Some of these techniques have been discussed in details in [earlier chapters](/tutorials/reactjs/performance-optimization/techniqueues-for-optimizing-performance/).

---

## Security Best Practices

### Avoid Storing Sensitive Data in Local Storage

Use HTTP-only cookies instead for storing tokens.

### Escape and Sanitize User Input

Prevent **Cross-Site Scripting (XSS)** attacks using libraries like **DOMPurify**.

```javascript
import DOMPurify from "dompurify";
const sanitizedHTML = DOMPurify.sanitize(userInput);
```

### Implement Content Security Policy (CSP)

CSP headers help prevent cross-site scripting (XSS) attacks and other code injection vulnerabilities. CSP is an HTTP security header that allows developers to define rules regarding the sources from which a web page can load resources such as scripts, styles, images, and other assets. This helps prevent malicious content injection, including XSS attacks.

Configure CSP headers to prevent malicious script execution.

#### How to Implement CSP in a React Application

There are multiple ways to implement CSP in a React application, depending on where the application is hosted and served from. It is best that you seek out the documentation of your apps hosting provider for additional documentation.

However you should start by analyzing your app's current security posture by running a scan using the <a href="https://developer.mozilla.org/en-US/observatory" target="_blank">HTTP Observatory</a>, and the <a href="https://csp-evaluator.withgoogle.com/" target="_blank">CSP Evaluator</a>.

#### 1. Implementing CSP in a Next.js App
If you're using Next.js, you can define CSP headers in the `next.config.js` file or via a custom server.
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';",
          },
        ],
      },
    ];
  },
};
```

#### 2. Implementing CSP in a Gatsby Site
If you're using Gatsby to build your site, you can use the plugin `gatsby-plugin-csp`.

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-csp`]
};
```

#### 3. Implementing CSP in a Create React App (CRA)
For applications using Create React App, CSP can be implemented via the server (e.g., Express, Nginx) or by configuring the **meta tag** in `index.html`.
Add a `<meta>` tag inside `public/index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';">
```

---

## Error Handling and Logging  

### Implement Global Error Boundaries

Use React Error Boundaries to catch and handle UI errors.

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

### Log Errors in Production

Use services like **Sentry** or **LogRocket** to monitor errors.

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

---

## SEO and Accessibility  

### Use React Helmet for SEO

Optimize metadata for search engines.

```javascript
import { Helmet } from "react-helmet";

<Helmet>
  <title>My React App</title>
  <meta name="description" content="A production-ready React app" />
</Helmet>;
```

### Improve Accessibility with ARIA Attributes

Use proper semantic elements and ARIA attributes.

```javascript
<button aria-label="Close menu">X</button>
```

---

## Conclusion  

Building a production-ready React app requires more than just functional components. By focusing on **code maintainability**, **performance optimization**, **security**, **error handling**, **deployment strategies**, and **SEO**, you can ensure a scalable and efficient React application.  

For further reading, check out:  
- <a href="https://legacy.reactjs.org/docs/optimizing-performance.html" target="_blank">React Docs: Optimizing Performance</a>
- <a href="https://github.com/nfl/react-helmet" target="_blank">React Helmet</a>
- <a href="https://www.cypress.io/" target="_blank">Cypress for End-to-End Testing</a>
- <a href="https://csp-evaluator.withgoogle.com/" target="_blank">Content Security Policy Checker</a>