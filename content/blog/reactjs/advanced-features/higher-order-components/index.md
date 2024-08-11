---
featured: false
date: "2023-09-01"
series: "Modern React.js Series"
chapter: "2. Advanced React Features"
title: "Higher-Order Components"
description: "Higher-Order Components (HOCs) and Render Props are two advanced techniques that help in sharing behavior across React components."
hero_image: "lautaro-andreani-UYsBCu9RP3Y-unsplash.jpg"
tags: ['HOCs', 'render props', 'react']
read_time: 7 min
related:
  - "Class and Functional React Components"
  - "React Hooks: A brief introduction"
---

# Higher-Order Components (HOCs) and Render Props

In the React ecosystem, managing complex component logic and reusing that logic across different parts of an application can be challenging. Higher-Order Components (HOCs) and Render Props are two advanced techniques that help in sharing behavior across React components. This article explores both concepts, demonstrating their use cases, benefits, and how to implement them with practical examples.

## Higher-Order Components (HOCs)

Higher-Order Components (HOCs) are an advanced pattern in React that allows developers to reuse component logic. An HOC is a function that takes a component and returns a new component, essentially "enhancing" or "composing" the original component with additional functionality. This pattern is inspired by higher-order functions in functional programming, where functions can take other functions as arguments, or return them.

### Key Concepts of HOCs

1. **Composition**: HOCs make use of the compositional nature of React components. They allow you to wrap or "decorate" any component with additional behavior.
2. **Reusability**: HOCs provide a powerful way to abstract and isolate common functionalities that can be reused across different components.
3. **Abstraction**: By separating the concern of state management or side effects from the presentation, HOCs help keep the components clean and focused on their intended purpose.

### Example: Enhancing Components with Logging

Let’s start with a simple example where an HOC adds logging functionality to any component. This HOC logs information to the console every time the component is mounted or updated.

```jsx {numberLines}
import React, { useEffect } from 'react';

// Logging Higher-Order Component
function withLogging(WrappedComponent) {
    return function (props) {
        useEffect(() => {
            console.log(`${WrappedComponent.name} mounted`);
            return () => {
                console.log(`${WrappedComponent.name} updated`);
            };
        }, []);

        return <WrappedComponent {...props} />;
    };
}

// Simple component
const HelloWorld = () => <h1>Hello World</h1>;

// Enhanced component with logging
const EnhancedHelloWorld = withLogging(HelloWorld);

export default EnhancedHelloWorld;
```

In this example, `withLogging` is an HOC that enhances any component by adding lifecycle logging. The enhanced component logs messages to the console when it mounts or updates.

### Example: With User Authentication

Consider a scenario where multiple components need to display content based on user authentication status. An HOC can be used to inject this behavior.

```jsx {numberLines}
import React from 'react';

// Mock function to check user authentication
function isAuthenticated() {
    return true; // Simplified for demonstration
}

// HOC for user authentication
function withAuth(WrappedComponent) {
    return function (props) {
        if (!isAuthenticated()) {
            return <h1>Please log in to view this content.</h1>;
        }
        return <WrappedComponent {...props} />;
    };
}

// Component that requires authentication
const SecretPage = () => <div>This is a secret page. Only authenticated users can see this.</div>;

// Enhanced component with authentication
const AuthenticatedSecretPage = withAuth(SecretPage);

export default AuthenticatedSecretPage;
```

In this example, the `withAuth` HOC checks if a user is authenticated before rendering the `WrappedComponent`. If not authenticated, it renders a login message instead.

### Benefits of Using HOCs

- **Isolation of concerns**: HOCs can manage things like data fetching, input handling, and animation separately from the main component logic.
- **Avoid code duplication**: By using HOCs, you can avoid duplicating logic across components, adhering to the DRY (Don't Repeat Yourself) principle.
- **Flexibility**: Components enhanced by HOCs can be used just like regular components, providing great flexibility in how they are used throughout an application.

## Render Props

Render props is a technique in React for sharing code between components using a prop whose value is a function. This approach allows you to create components that are dynamic and reusable, by letting the consumer of the component control part of the rendering. Render props provide a way to share logic across components without relying on higher-level abstractions like higher-order components (HOCs).

### Key Concepts of Render Props

1. **Flexibility**: Render props allow you to decouple the logic of state and interactions from the UI, providing the flexibility to use the shared logic with various render outcomes.
2. **Control**: They give more control to the component that uses the render prop by allowing it to determine how aspects of the UI are rendered.
3. **Simplicity**: Unlike HOCs, render props can help prevent "wrapper hell" — a common problem in React applications where components are wrapped inside multiple higher-order components, making the component tree difficult to manage.

### Example: Mouse Position Tracker

Let's consider a simple use case where you want to create a component that tracks the mouse position on the screen and makes this data available to other components.

```jsx {numberLines}
import React, { useState } from 'react';

const MouseTracker = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    return (
        <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
            {children(position)}
        </div>
    );
};

// Usage
const App = () => (
    <MouseTracker>
        {({ x, y }) => (
            <h1>The mouse position is ({x}, {y})</h1>
        )}
    </MouseTracker>
);

export default App;
```

In this example, `MouseTracker` is a component that tracks the mouse position and uses the `children` prop as a function to render the content. This allows any component that uses `MouseTracker` to define how it wants to display the mouse coordinates.

### Example: List Filtering Component

Consider a scenario where you want a component that handles input and filters a list based on the query but leaves the rendering of the filtered list to the consumer of the component.

```jsx {numberLines}
import React, { useState } from 'react';

const ListFilter = ({ items, render }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
            />
            {render(filteredItems)}
        </div>
    );
};

// Usage
const App = () => (
    <ListFilter items={['Apple', 'Banana', 'Orange']} render={items => (
        <ul>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    )} />
);

export default App;
```

In this example, `ListFilter` handles the state and logic for filtering the list based on user input, but it leaves the rendering of the filtered list to the consumer by using the `render` prop.

## Conclusion

Both Higher-Order Components and Render Props serve the purpose of reusing component logic, but they do it in different ways. HOCs are excellent for injecting props and abstracting state management, whereas Render Props offer more flexibility in how components can interact with shared logic. The choice between HOCs and Render Props depends on the particular use case and developer preference.

Understanding when to use each of these patterns will enhance your ability to write clean, maintainable, and efficient React components. For further reading and more in-depth examples, the official React documentation on [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html) and [Render Props](https://reactjs.org/docs/render-props.html) provides comprehensive guides and best practices.


