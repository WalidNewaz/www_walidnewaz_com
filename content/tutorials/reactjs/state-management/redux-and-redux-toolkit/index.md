---
featured: false
date: "2023-09-08"

series: "Modern React.js"
part: "III. State Management in React"
chapter: "7. Redux and Redux Toolkit"


# series: "Modern React.js Series"
# chapter: "3. State Management in React"
title: "Redux and Redux Toolkit"
description: "In the realm of React development, managing state effectively is crucial for building responsive and maintainable applications. Redux has long been a cornerstone of the React ecosystem, providing a predictable state container for JavaScript apps. The Redux Toolkit, introduced more recently, offers a more efficient, powerful way to write Redux logic."
hero_image: "kelly-sikkema-gcHFXsdcmJE-unsplash.jpg"
tags: ['redux', 'react']
read_time: 6 min
related: 
  - "Building your first React component"
  - "Class and Functional React Components"
  - "React Context API"
---

# State Management with Redux and Redux Toolkit

In the realm of React development, managing state effectively is crucial for building responsive and maintainable applications. Redux has long been a cornerstone of the React ecosystem, providing a predictable state container for JavaScript apps. The Redux Toolkit, introduced more recently, offers a more efficient, powerful way to write Redux logic. This article, part of the "Modern React.js Series" under "State Management in React," explores how to leverage Redux and Redux Toolkit to streamline your state management practices.

## Introduction to Redux

Redux is a state management library that helps you manage the state of your application in a single global object, which Redux refers to as the "store." Redux is most commonly used with React, but it can be used with any other JavaScript framework or library.

### Core Concepts of Redux

Redux revolves around three fundamental principles:

#### 1. **Single Source of Truth**
The state of your entire application is stored in an object tree within a single store. This makes it easier to debug or inspect an application at any point in time.

#### 2. **State is Read-only**
The only way to change the state is to emit an action, an object describing what happened. This ensures that neither the views nor the network callbacks will ever write directly to the state.

#### 3. **Changes are Made with Pure Functions**
To specify how the state tree is transformed by actions, you write pure reducers. Reducers are pure functions that take the previous state and an action, and return the next state.

### Implementing Redux in a React Application

To demonstrate how Redux works within a React application, let's walk through a simple example where we will create a counter that increments or decrements based on user interaction.

#### Step 1: Setting Up

Let us first create a React application. We will use [Vite](https://vitejs.dev/) to setup the scaffold of a React application using JavaScript.

Follow the instructions on the [Getting Started](https://vitejs.dev/guide/) to setup the project. With that out of the way. we'll install Redux and React-Redux:

```bash
npm install redux react-redux
```

#### Step 2: Create Redux Store

Create a file named `store.js`:

```javascript {numberLines}
import { createStore } from 'redux';

// Reducer function
const counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

// Create Redux store
const store = createStore(counterReducer);

export default store;
```

This reducer handles two actions: incrementing and decrementing the count.

#### Step 3: Provide Store to React

In your root component file (usually `main.jsx` or `App.jsx`), use the `Provider` from `react-redux` to pass the Redux store to your React components:

```javascript {numberLines}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
```

#### Step 4: Connecting React Components

Now, let's create a `Counter` component that connects to the Redux store:

```javascript {numberLines}
import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count = useSelector((state) => state.count); // Access state from the store
  const dispatch = useDispatch(); // To dispatch actions

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => dispatch({ type: "INCREMENT" })}
        style={{ margin: "1rem" }}
      >
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: "DECREMENT" })}
        style={{ margin: "1rem" }}
      >
        Decrement
      </button>
    </div>
  );
}

export default Counter;
```

This component uses `useSelector` to read from the state and `useDispatch` to dispatch actions.

#### Step 5: Use the component in the Application

Update the `App.jsx` to use the component:

```javascript {numberLines}
function App() {
  return (
    <>
      // ...
      <div className="card">
        <Counter />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      // ...
    </>
  )
}
```

## Introduction to Redux Toolkit

Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It is intended to be the standard way to write Redux logic. It was created to address the complexities and repetitive patterns that Redux can often entail, and to provide a simplified API for working with Redux.

### Why Use Redux Toolkit?

Redux Toolkit simplifies Redux application development and incorporates best practices automatically. Here are some of its benefits:

- **Simplification**: Provides utilities that simplify common use cases like store setup, creating reducers, immutable update logic, and more.
- **Performance**: Automatically uses the `immer` library to allow you to write simpler immutable update logic by mutating state in a "draft state".
- **Best Practices**: Encourages good Redux architecture and offers features like built-in Thunk support for async logic and other useful addons.

### Integrating Redux Toolkit in a React Application

Let's upgrade the basic Redux example from the previous section by incorporating Redux Toolkit. We will update our increment/decrement counter application built using React and Vite.


#### Step 1: Install Redux Toolkit and React-Redux

First, install Redux Toolkit and React-Redux if they are not already included:

```bash
npm install @reduxjs/toolkit react-redux
```

#### Step 2: Create Redux Store with Redux Toolkit

Use Redux Toolkit's `configureStore()` to create the Redux store. This function automatically sets up the Redux DevTools extension and thunk middleware.

```javascript {numberLines}
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Reducers will go here
  },
});
```

#### Step 3: Define Slice using `createSlice()`

Redux Toolkit utilizes the concept of "slices" of state, which typically correspond to a piece of the state and the reducer logic needed to manage it. The `createSlice()` function automatically generates action creators and action types that correspond to the reducers and state.

```javascript {numberLines}
// src/reducers/incdec/incdecSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const incdecSlice = createSlice({
  name: "incdec",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.count += 1;
    },
    decrement: (state, action) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = incdecSlice.actions;
export default incdecSlice.reducer;
```

#### Step 4: Add the Reducer to the Store

Now integrate the todo slice reducer into the store.

```javascript {numberLines}
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import incdecReducer from './reducers/incdec/incdecSlice';

export const store = configureStore({
  reducer: {
    incdec: incdecReducer,
  },
});
```

#### Step 5: Set Up the Provider in the App

Wrap your application in the `Provider` component from `react-redux` and pass in the store.

```javascript {numberLines}
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

#### Step 6: Use Redux State and Actions in React Components

Now, you can use Redux state and dispatch actions in your React components using hooks provided by `react-redux`.

```javascript {numberLines}
// src/components/Counter.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from "../reducers/incdec/incdecSlice";

function App() {
  const count = useSelector((state) => state.incdec.count); // Access state from the store
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => dispatch(increment())}
        style={{ margin: "1rem" }}
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        style={{ margin: "1rem" }}
      >
        Decrement
      </button>
    </div>
  );
}

export default App;
```

In a future tutorial series I will elaborate further on developing React application using Redux and Redux ToolKit. For now, these simple demonstrations of state management should be sufficient to get a project off the ground.

## Conclusion

Managing state in large React applications can be challenging, but Redux and Redux Toolkit provide powerful tools to manage state more efficiently and with less code. Whether you are maintaining a large-scale project or building a new app from scratch, integrating Redux Toolkit can help you write more readable and maintainable code. For more information and advanced use cases, check out the [Redux Toolkit documentation](https://redux-toolkit.js.org/introduction/getting-started).

By incorporating these tools into your React projects as part of the "Modern React.js Series," you ensure that your applications are scalable, maintainable, and up-to-date with the latest practices in React state management.


