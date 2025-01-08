---
featured: false
date: "2023-09-22"

series: "Modern React.js"
part: "IV. React Router"
chapter: "11. Implementing breadcrumbs and navigation patterns"

title: "Implementing breadcrumbs and navigation patterns"
description: "Breadcrumbs and navigation patterns provide users with contextual information about their current location within the app and allow them to navigate efficiently."
hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ['react router', 'breadcrumb']
read_time: 8 min
related: 
  - "React Hooks: A brief introduction"
  - "React Context API"
---

# Implementing Breadcrumbs and Navigation Patterns

Breadcrumbs and navigation patterns are essential for improving the usability and user experience of web applications. They provide users with contextual information about their current location within the app and allow them to navigate efficiently. In React applications, React Router makes implementing these patterns seamless with its powerful routing capabilities. In this article, we’ll explore how to implement breadcrumbs and other navigation patterns using the React Router.

## Why Use Breadcrumbs?

Breadcrumbs are a navigational aid that display the hierarchy of the user's current page relative to the app's structure. For example, in an e-commerce application, breadcrumbs might look like this:

**Home > Electronics > Mobile Phones > Product Name**

This structure helps users:
1. Understand their current location in the app.
2. Navigate back to higher-level pages easily.

---

## Implementing Breadcrumbs in React Router

React Router doesn't have a built-in breadcrumb component, but we can implement one by leveraging the `useLocation` and `useMatches` hooks. The `useLocation` hook gives us access to the current URL path, while `useMatches` helps retrieve route metadata for dynamically generating breadcrumb items.

### Example: Breadcrumb Component

1. **Set Up Routes with Metadata**

Each route in the configuration should include a `breadcrumb` property for generating breadcrumbs dynamically. The `breadcrumb` property is added as a child of the `handle` property of each route. Any value is allowed within the `handle` property, and therefore we add our `breadcrumb` value there.

```jsx {numberLines}
import Home from "./pages/Home";
import Electronics from "./pages/Electronics";
import MobilePhones from "./pages/MobilePhones";
import Product from "./pages/Product";
import Layout from "./Layout";
import NotFound from "./404";

const routes = [
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        id: "home",
        path: "/",
        element: <HomePage />,
        handle: { breadcrumb: "Home" },
        children: [
          {
            id: "electronics",
            path: "electronics",
            element: <ElectronicsPage />,
            handle: { breadcrumb: "Electronics" },
            children: [
              {
                id: "mobile-phones",
                path: "mobile-phones",
                element: <MobilePhonesPage />,
                handle: { breadcrumb: "Mobile Phones" },
                children: [
                  {
                    id: "product",
                    path: ":productId",
                    element: <ProductPage />,
                    handle: { breadcrumb: "Product Details" },
                  }
                ],
              }
            ],
          }
        ],
      },
    ],
  },
];
export default routes;
```

2. **Create the Breadcrumb Component**

```jsx {numberLines}
import { Link, useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
  const matches = useMatches();

  return (
    <nav aria-label="breadcrumb">
      <ol>
        {matches.map((match, index) => (
          <li key={index}>
            {index < matches.length - 1 ? (
              <Link to={match.pathname}>{match.handle.breadcrumb}</Link>
            ) : (
              <span>{match.handle.breadcrumb}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

3. **Pass Metadata to Routes**

The breadcrumb metadata needs to be passed using the `handle` property in the route configuration:

```jsx {numberLines}
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import Breadcrumbs from './components/Breadcrumbs';

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
```

---

## Navigation Patterns in React Router

In addition to breadcrumbs, React Router offers several tools for creating efficient navigation patterns. Let’s explore some common patterns and how to implement them.

### 1. Persistent Navigation with Layout Components

For apps with shared navigation (e.g., a sidebar or top navbar), layout components can ensure consistent navigation across routes.

```jsx {numberLines}
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/electronics">Electronics</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Usage in Route Config
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'electronics', element: <Electronics /> },
    ],
  },
];
```

---

### 2. Dynamic Navigation with Programmatic Redirects

Dynamic navigation allows developers to navigate users programmatically based on certain conditions, such as form submissions or authentication status.

```jsx {numberLines}
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    navigate('/dashboard');
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
}
```

---

### 3. Route Guards for Protected Navigation

For applications with protected routes, you can use route guards to restrict access based on user roles or authentication.

```jsx {numberLines}
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

// Usage in Route Config
const routes = [
  {
    path: '/dashboard',
    element: <PrivateRoute isAuthenticated={true} />,
    children: [
      { path: '', element: <Dashboard /> },
    ],
  },
];
```

---

## Complete Example

A complete example app with nested routes, and breadcrumb may be found on <a href="https://github.com/WalidNewaz/react-breadcrumb" target="_blank">my Github repository</a>.

## Conclusion

Breadcrumbs and navigation patterns significantly enhance the user experience by making navigation intuitive and seamless. With React Router, you can implement dynamic breadcrumbs, persistent layouts, and advanced navigation patterns like route guards or programmatic redirects. These tools not only make your app easier to navigate but also provide a solid foundation for scalable, maintainable front-end applications.
