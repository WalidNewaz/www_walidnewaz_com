---
featured: false
date: "2023-09-18"

series: "Modern React.js"
part: "IV. React Router"
chapter: "9. Setting up React Router for Navigation"

title: "Setting up React Router for Navigation"
description: "React Router is a powerful library that enables navigation and dynamic routing in React applications. Whether you're building a single-page application (SPA) or a complex, multi-page app."
# hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ['react router']
read_time: 5 min
related: 
  - "React Hooks: A brief introduction"
  - "React Context API"
---

# Setting up React Router for Navigation

React Router is a powerful library that enables navigation and dynamic routing in React applications. Whether you're building a single-page application (SPA) or a complex, multi-page app, React Router provides the tools you need to handle navigation and routing seamlessly. This article, part of the `Modern React.js` series, will guide you through the process of setting up React Router, configuring basic routes, and implementing navigation for your React application.

## What is React Router?

React Router is a declarative library that enables dynamic routing in React. Unlike traditional web applications where navigation typically triggers a full-page reload, React Router allows you to handle navigation within your app while preserving a seamless user experience.

### Key Features of React Router:

- `Dynamic Routing`: Routes are defined as components, which makes them highly dynamic and composable.
- `Nested Routing`: Support for hierarchies of routes for more complex applications.
- `Declarative Navigation`: Links and navigation actions are handled using simple, reusable components.
- `History Management`: Works seamlessly with the browser's history API for back/forward navigation.

## Setting Up React Router

Let’s walk through the process of integrating React Router into your React application, starting from scratch.

### Step 1: Install React Router

If you don’t already have a React project, create one using Vite or Create React App:

```bash
# Using Vite
npm create vite@latest my-app --template react
cd my-app
npm install

# Or using Create React App
npx create-react-app my-app
cd my-app
```

### Step 2: Set Up a Basic Router

React Router uses the `BrowserRouter` component to manage the routing of your application. Here's how you can set up basic routes for your app.

#### Directory Structure:

```bash
src/
├── App.jsx
├── index.jsx
├── components/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
```

#### Code Implementation:

1. **Create Pages**: Define the components for the pages you want to navigate to.

```jsx
// src/components/Home.jsx
export default function Home() {
  return <h1>Welcome to the Home Page</h1>
}

// src/components/About.jsx
export default function About() {
  return <h1>About Us</h1>
}

// src/components/Contact.jsx
export default function Contact() {
  return <h1>Contact Us</h1>
}
```

2. Set Up Routing in **App.jsx**:

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
```

3. Update **index.jsx**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 3: Start the Application

Run your development server to test the setup:

```bash
npm run dev  # For Vite
npm start    # For Create React App
```

You should now be able to navigate between the `Home`, `About`, and `Contact` pages using the links in the navigation bar.

## Enhancing the Router Setup

### Adding a 404 Page (Catch-All Route)

React Router allows you to define a fallback route for when a user navigates to a non-existent page.

```jsx
import NotFound from './components/NotFound';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

The `NotFound` component might look like this:

```jsx
// src/components/NotFound.jsx
export default function NotFound() {
  return <h1>404 - Page Not Found</h1>
}
```

### Using Nested Routes

For more complex applications, you can define nested routes to handle hierarchical navigation.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />}>
    <Route path="team" element={<Team />} />
    <Route path="history" element={<History />} />
  </Route>
</Routes>
```

### Navigating Programmatically

In some cases, you may need to navigate programmatically (e.g., after a form submission). Use the `useNavigate` hook for this:

```jsx
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Perform form logic
    navigate('/success');
  };

  return (
    <button onClick={handleSubmit}>
      Submit
    </button>
  );
}
```

### Conclusion

React Router is an essential tool for building modern React applications with intuitive navigation. By setting up a basic router, adding dynamic and nested routes, and handling edge cases like 404 pages, you can create a seamless user experience. As you grow your application, React Router’s flexibility and robust features will support your needs.

For more information, check out the [official React Router documentation](https://reactrouter.com/). Stay tuned for more tutorials in the Modern React.js series!