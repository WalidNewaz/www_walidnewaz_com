---
featured: true
date: "2023-07-14"
title: "Introduction to React"
description: "Introduction to React: Understanding components, props, and state"
hero_image: "pexels-realtoughcandy-11035471.jpg"
tags: ['beginner', 'react']
series: "Modern React.js Series"
read_time: 10 min
---

# Introduction to React: Understanding components, props, and state

React is a powerful JavaScript library for building user interfaces, particularly for single-page applications. It allows developers to create reusable UI components, manage their state efficiently, and compose complex UIs from small, isolated pieces of code. In this article, we’ll dive into the core concepts of React: components, props, and state.

## What is React?

React, developed and maintained by Facebook, is a declarative, efficient, and flexible JavaScript library for building user interfaces. It allows you to build complex UIs from small and isolated pieces of code called components.

## Components

Components are the building blocks of a React application. They allow you to split the UI into independent, reusable pieces, and think about each piece in isolation. Components can be defined as classes or functions.

### Functional Components

Functional components are simple JavaScript functions. These functions accept props (more on props later) and return React elements describing what should appear on the screen.

```javascript
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome;
```

### Class Components

Class components are more feature-rich than functional components. They can hold and manage state and lifecycle methods.

```javascript
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
```

## Props

Props (short for properties) are the way components communicate with each other. They are read-only data passed from parent to child components. Props allow you to pass data and event handlers down to child components, making your components reusable and dynamic.

### Using Props

Here’s how you can use props in a functional component:

```javascript
import React from 'react';

function Greeting(props) {
  return <h1>{props.message}</h1>;
}

export default Greeting;
```

You can use this component in another component by passing props to it:

```javascript
import React from 'react';
import Greeting from './Greeting';

function App() {
  return (
    <div>
      <Greeting message="Welcome to React!" />
    </div>
  );
}

export default App;
```

### Default Props

You can define default values for props using `defaultProps`:

```javascript
function Greeting(props) {
  return <h1>{props.message}</h1>;
}

Greeting.defaultProps = {
  message: 'Hello, World!',
};
```

## State

State is similar to props, but it is private and fully controlled by the component. State allows you to create components that are dynamic and interactive. When a component's state changes, React automatically re-renders the component.

### Using State in Class Components

To use state in a class component, you need to initialize it in the constructor:

```javascript
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

### Using State in Functional Components

With the introduction of React Hooks, you can use state in functional components:

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

### Updating State

To update the state, you use the `setState` method in class components and the `set` function from the `useState` hook in functional components. React schedules updates to the component state and decides when to re-render the component.

### State vs. Props

- **Props**: Passed to the component, read-only, immutable.
- **State**: Managed within the component, can change, used to create interactive components.

## Lifecycle Methods

Lifecycle methods are special methods in class components that allow you to run code at particular times in the component's lifecycle. The most commonly used lifecycle methods are:

- `componentDidMount()`: Called once after the component is rendered.
- `componentDidUpdate()`: Called after the component updates.
- `componentWillUnmount()`: Called just before the component is destroyed.

Here’s an example of a component with lifecycle methods:

```javascript
import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate() {
    console.log(`Component updated: ${this.state.seconds} seconds`);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

export default Timer;
```

## Conclusion

Understanding components, props, and state is essential for mastering React. Components allow you to break down your UI into reusable pieces, props enable data flow between components, and state makes your components dynamic and interactive. By combining these concepts, you can build complex and efficient user interfaces.

