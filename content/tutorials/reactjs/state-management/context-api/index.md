---
featured: false
date: "2023-09-15"

series: "Modern React.js"
part: "III. State Management in React"
chapter: "8. React Context API"


# series: "Modern React.js Series"
# chapter: "3. State Management in React"
title: "React Context API"
description: "React Context API: Managing Global State Without Redux."
hero_image: "kelly-sikkema-gcHFXsdcmJE-unsplash.jpg"
tags: ['context', 'react']
read_time: 6 min
related: 
  - "Class and Functional React Components"
  - "React Hooks: A brief introduction"
---

# React Context API: Managing Global State Without Redux

State management is a critical aspect of building dynamic and responsive applications. For a long time, React did not offer any application level state management features. Components had to maintain their own states internally, and were able to pass them down to children components via props. Therefore, state values that needed to be shared across components that did not have a direct ancestral relationship, had to be lifted up the component tree to a common ancestor of both components and shared by props.

Redux has been the go-to solution for managing global state in React applications. However, with the introduction of the Context API in React 16.3, developers now have a powerful alternative that simplifies global state management without the need for additional libraries. In this post, we'll explore how to use the Context API to manage global state and compare it to Redux.

## What is the Context API?

The Context API is a feature in React that allows you to share state across the entire application (or part of it) without having to pass props down manually at every level. This makes it ideal for managing global state like user authentication, theme settings, and more.

## When to Use Context API?

The Context API is best suited for:

- **Global state management**: When you need to manage state that is required across multiple components.
- **Simpler applications**: For applications that don't need the full power of Redux.
- **Avoiding prop drilling**: To avoid passing props through multiple layers of components.

## Setting Up the Context API

Let's walk through a simple example to demonstrate how to use the Context API. We'll create a basic application that manages user authentication state.

### Creating the Context

First, we need to create a context. This can be done using `React.createContext()`.

```jsx {numberLines}
import React, { createContext, useState } from 'react';

// Create a context with default value
const AuthContext = createContext(null);

/**
 * Create an auth context provider.
 * This can be wrapped around any component.
 */
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const login = (userData) => setUser(userData);
   const logout = () => setUser(null);

   return (
      <AuthContext.Provider value={{ user, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContext;
```

### Using the Context

Next, we wrap our application (or part of it) with the `AuthProvider` component. This will provide the authentication state to any component within its tree.

```jsx {numberLines}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';

ReactDOM.render(
   <AuthProvider>
      <App />
   </AuthProvider>,
   document.getElementById('root')
);
```

### Consuming the Context

Any component that needs access to the authentication state can now consume the context using the `useContext` hook.

```jsx {numberLines}
import React, { useContext } from 'react';
import AuthContext from './AuthContext';

const UserProfile = () => {
   const { user, logout } = useContext(AuthContext);

   if (!user) {
      return <div>Please log in.</div>;
   }

   return (
    <div>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
    </div>
   );
};

export default UserProfile;
```

### Logging In

We can create a login component that uses the context to update the user state.

```jsx {numberLines}
import React, { useContext } from 'react';
import AuthContext from './AuthContext';

const Login = () => {
   const { login } = useContext(AuthContext);
   const handleLogin = () => {
      const fakeUser = { name: 'John Doe' };
      login(fakeUser);
   };
   return <button onClick={handleLogin}>Login</button>;
};

export default Login;
```

## Using Context.Consumer

Before the `useContext` hook was introduced, the way to consume the content within a component was to use the Consumer sub-component of the context.

```jsx {numberLines}
import React, { useContext } from 'react';
import AuthContext from './AuthContext';

const UserProfile = () => (
  <AuthContext.Consumer>
  {({ user, logout }) => !user
  ? (<div>Please log in.</div>)
  : (
    <div>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
    </div>
    );                
  }
  </AuthContext.Consumer>
);

export default UserProfile;
```

## Overriding context for a part of the component tree

Sometimes, you may need to use a different context value for a part of the component tree. When you need this, you can override the context for part of the tree by wrapping that part in a provider with a different value.

```jsx {numberLines 1,3}
<ThemeContext.Provider value="light">
   ...
   <ThemeContext.Provider value="dark">
      <Footer />
   </ThemeContext.Provider>
   ...
</ThemeContext.Provider>
```

You can nest and override providers as many times as you need. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.

## Context API vs Redux

While both Context API and Redux are used for state management, they have different use cases and trade-offs.

- **Complexity**: Context API is simpler to set up and use compared to Redux, which requires more boilerplate code and setup.
- **Performance**: For smaller applications, Context API is sufficient. However, for larger applications with complex state logic, Redux provides better performance and more predictable state management.
- **Ecosystem**: Redux has a rich ecosystem with middleware and developer tools that make debugging and managing side effects easier.

## Conclusion

The Context API provides a simple and powerful way to manage global state in React applications without the need for Redux. It is ideal for smaller applications and scenarios where you need to avoid prop drilling. However, for larger applications with complex state management needs, Redux remains a robust and efficient solution.

By understanding when and how to use the Context API, you can streamline your development process and create more maintainable and scalable React applications.

## References

1. [createContext](https://react.dev/reference/react/createContext).
2. [useContext](https://react.dev/reference/react/useContext).
3. [React Context for Beginners – The Complete Guide (2021)](https://www.freecodecamp.org/news/react-context-for-beginners/).
