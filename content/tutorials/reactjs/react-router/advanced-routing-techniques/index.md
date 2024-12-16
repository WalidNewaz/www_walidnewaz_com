---
featured: false
date: "2023-09-20"

series: "Modern React.js"
part: "IV. React Router"
chapter: "10. Advanced Routing Techniques: Nested Routes, Dynamic Routing, and Route Guards"

title: "Advanced Routing Techniques: Nested Routes, Dynamic Routing, and Route Guards"
description: "Advanced React routing techniques such as nested routes, dynamic routing, and route guards allow developers to create more complex and feature-rich applications."
hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ['router', 'react']
read_time: 8 min
related: 
  - "React Hooks: A brief introduction"
  - "React Context API"
---

# Advanced Routing Techniques: Nested Routes, Dynamic Routing, and Route Guards

React Router is a powerful library that simplifies navigation and routing in React applications. While basic routing is straightforward, advanced routing techniques such as nested routes, dynamic routing, and route guards allow developers to create more complex and feature-rich applications. In this article, part of the **Modern React.js** series, we’ll explore these advanced routing concepts in depth and demonstrate how to implement them in a React application.

## Nested Routes

Nested routes allow you to define a hierarchy of routes, where child routes are rendered within the context of a parent route. This is particularly useful for structuring applications with multiple levels of navigation, such as a dashboard with different sections.

### Example: Setting Up Nested Routes

#### Directory Structure:

```bash
src/
├── App.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── DashboardHome.jsx
│   ├── Settings.jsx
│   ├── Profile.jsx
```

#### Code Implementation:

1. **Create the Components:**

```jsx {numberLines}
// Dashboard.jsx
import { Outlet, Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/dashboard/profile">Profile</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

// DashboardHome.jsx
export default function DashboardHome() {
  return <h2>Welcome to the Dashboard</h2>;
}

// Profile.jsx
export default function Profile() {
  return <h2>User Profile</h2>;
}

// Settings.jsx
export default function Settings() {
  return <h2>Account Settings</h2>;
}
```

2. **Set Up the Nested Routes:**

```jsx {numberLines}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```

#### How It Works:

- The `Dashboard` component serves as the parent route and uses the `<Outlet />` component to render its child routes.
- The child routes (`DashboardHome`, `Profile`, `Settings`) are defined as nested routes within `/dashboard`.
- The `index` route renders by default when `/dashboard` is accessed.

### Understanding the `<Outlet>` Component in React Router

The `<Outlet>` component is an essential part of React Router, used to render child routes in a nested routing setup. It acts as a placeholder that tells React Router where the child components (defined as nested routes) should be rendered. This enables developers to create layouts with shared components while rendering child-specific content dynamically.

For example, if you are building a dashboard with sections like "Profile" and "Settings," you can use the `<Outlet>` component in the parent route to define where these sections will appear within the layout.

- **Layout example:**

```jsx {numberLines 4,5,6,17}
// Dashboard.jsx
import { Link, Outlet } from 'react-router-dom';

/**
 * Dashboard layout component
 */
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      {/* The child route will be rendered here */}
      <Outlet />
    </div>
  );
}
```

- **Route Configuration:**

```jsx {numberLines}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```

#### How It Works:

- The `Dashboard` component serves as the parent layout, displaying a header and navigation links. It uses the `<Outlet />` component to render the child routes (`Profile` and `Settings`) dynamically.
- When the user navigates to `/dashboard/profile`, React Router will render the Profile component within the `<Outlet />` placeholder in the `Dashboard` component. Similarly, navigating to `/dashboard/settings` renders the `Settings` component.

## Dynamic Routing

