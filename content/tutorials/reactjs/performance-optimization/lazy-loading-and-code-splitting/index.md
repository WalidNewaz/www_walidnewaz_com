---
featured: false
date: "2023-09-27"

series: "Modern React.js"
part: "V. Performance Optimization"
chapter: "13. Lazy Loading and Code Splitting"

title: "Lazy Loading and Code Splitting"
description: "Lazy loading reduces the initial load time only loading critical code upfront, while dynamically loading rest when required. Code splitting enables code to be distributed among multiple files, rather than a single large application bundle."
hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ['react', 'optimization']
---

# Lazy Loading and Code Splitting with React.lazy and Suspense

**Lazy loading** combined with **code splitting**, allow applications to load only the code needed for a particular part of the app when it’s required. In this article, part of the *Modern React.js* series, we’ll explore how to implement lazy loading and code splitting using React’s built-in tools: `React.lazy` and `Suspense`.

## What is Lazy Loading?

Lazy loading is a design pattern that delays the loading of resources (like components or modules) until they are actually needed. This reduces the initial load time of your application, as only the critical code is loaded upfront, while the rest is loaded dynamically when required. This technique improves performance, especially for large applications.

## What is Code Splitting?

Code splitting is the process of breaking your application’s code into smaller, more manageable chunks. Instead of bundling all your code into a single, large file, code splitting enables you to load only the parts of the application that are currently being used. In React, code splitting is typically achieved with `React.lazy` in combination with Webpack or other bundlers. `Vite` uses `Rollup` as a bundler for instance.

For instance here is what happens when you build an application prior to code splitting:

```bash {numberLines 8-10}
$ npm run build

> react-codeslitting@0.0.0 build
> vite build

vite v6.0.7 building for production...
✓ 54 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-BKOknNkC.css    1.55 kB │ gzip:  0.79 kB
dist/assets/index-DtDfJKGn.js   261.76 kB │ gzip: 84.25 kB
✓ built in 467ms
```

Here is the same application build after code splitting:

```bash {numberLines 8-15}
$ npm run build

> react-codeslitting@0.0.0 build
> vite build

vite v6.0.7 building for production...
✓ 57 modules transformed.
dist/index.html                         0.46 kB │ gzip:  0.30 kB
dist/assets/react-CHdo91hT.svg          4.13 kB │ gzip:  2.05 kB
dist/assets/index-BKOknNkC.css          1.55 kB │ gzip:  0.79 kB
dist/assets/Home-CEONFR8M.js            0.13 kB │ gzip:  0.13 kB
dist/assets/Electronics-1Zlb6VRX.js     0.14 kB │ gzip:  0.14 kB
dist/assets/MobilePhones-C5q9PtNu.js    0.14 kB │ gzip:  0.14 kB
dist/assets/Product-Dq_JqLd3.js         0.22 kB │ gzip:  0.18 kB
dist/assets/index-C3HQEtZO.js         262.76 kB │ gzip: 84.76 kB
✓ built in 483ms
```

A few more asset bundles have been generated after code splitting was implemented.

---

## Setting Up Lazy Loading with React.lazy

React provides the `React.lazy` function to define components that are loaded dynamically. This method enables you to defer loading a component until it’s rendered for the first time.

### Example: Basic Lazy Loading

Here’s an example of how to use `React.lazy` to lazily load a component:

```jsx {numberLines}
import React, { Suspense } from 'react';

// Lazy-load the component
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      {/* Wrap the lazy-loaded component with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

### Key Points:
1. `React.lazy(() => import('./LazyComponent'))` dynamically imports the `LazyComponent` file, returning a Promise.
2. The `Suspense` component acts as a boundary to show a fallback UI (`<div>Loading...</div>`) while the lazy-loaded component is being fetched.

---

## Using Lazy Loading with Routes

Lazy loading is especially useful when working with React Router to split your code by routes. Instead of loading all route components upfront, you can load them only when the user navigates to a specific route.

### Example: Lazy Loading Routes

```jsx {numberLines}
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy-load route components
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

### Key Benefits:
- Each page (or route) is loaded only when the user navigates to it.
- Improves the initial load time of the app by deferring the loading of less critical routes.

---

## Combining Lazy Loading with Error Boundaries

When lazy loading components, errors like missing or incorrect module paths can occur. To handle such errors gracefully, you can pair `React.lazy` with an error boundary.

### Example: Error Handling with Lazy Loading

```jsx {numberLines}
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error loading component:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
```

This ensures that if the lazy-loaded component fails to load, the app doesn’t break and displays a fallback UI or error message instead.

---

## Optimizing Lazy Loading with useTransition

React 18 introduced the `useTransition` hook, which enables smoother UI interactions when loading components asynchronously. It allows you to defer rendering updates while showing a fallback UI.

### Example: Lazy Loading with useTransition

```jsx {numberLines}
import React, { Suspense, useState, useTransition } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setShowComponent(true);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Load Component</button>
      {isPending && <div>Loading...</div>}
      {showComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

export default App;
```

---

## Best Practices for Lazy Loading and Code Splitting

### Identify Critical and Non-Critical Code:
  - Critical code (e.g., homepage) should load upfront.
  - Non-critical code (e.g., less frequently used components or routes) can be lazy-loaded.

### Use Meaningful Fallbacks:
   - Provide fallback UIs that enhance the user experience, such as spinners, skeleton loaders, or contextual messages.

### Test for Performance:
   - Use tools like Lighthouse and Webpack Bundle Analyzer to ensure that lazy loading and code splitting reduce bundle sizes and improve load times.

### Avoid Over-Splitting:
   - Excessive code splitting can lead to performance overhead. Group related components or routes into a single chunk to strike a balance.

### Combine with Server-Side Rendering (SSR):
   - Use SSR with lazy loading for faster initial page loads in server-rendered apps.

---

## Complete Example

A complete example app with lazy loaded page compoents and breadcrumb may be found on <a href="https://github.com/WalidNewaz/react-codeslitting" target="_blank">my Github repository</a>.

## Conclusion

Lazy loading and code splitting are essential techniques for optimizing the performance of React applications. By leveraging `React.lazy` and `Suspense`, you can reduce initial load times, improve perceived performance, and deliver a smoother user experience. These tools, when combined with best practices, empower you to build efficient, scalable React applications. Explore these techniques in your projects to see significant improvements in load performance and user satisfaction.
