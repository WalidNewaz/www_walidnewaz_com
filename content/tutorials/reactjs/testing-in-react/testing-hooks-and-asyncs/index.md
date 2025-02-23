---
featured: false
date: "2023-10-01"

series: "Modern React.js"
part: "VI. Testing in React"
chapter: "15. Testing Hooks and Asynchronous Code in React"

title: "Unit testing Hooks and Asynchronous Code in React"
description: "In React, developers often need to test hooks, and other asynchronous code effectively to ensure their applications behave as expected. This article dives into techniques and tools for testing hooks, and asynchronous code using popular libraries like Jest and React Testing Library (RTL)."
hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ["react", "testing"]
---

# Testing Hooks and Asynchronous Code in React

In React, developers often need to test hooks, and other asynchronous code effectively to ensure their applications behave as expected. In this chapter we will dive into techniques and tools for testing hooks, and asynchronous code using popular libraries like Jest and React Testing Library (RTL). Some of the examples provided below use Vitest rather than Jest.

---

## Tools for Testing React Hooks

The following tools are widely used for testing React applications:

- **Jest**: A powerful testing framework with built-in utilities for mocking, assertion, and snapshot testing.
- **React Testing Library (RTL)**: A library focused on testing React components from the perspective of the user.
- **@testing-library/react-hooks**: A utility library for testing custom React hooks.

If you haven't already installed these tools, you can do so with the following command:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/react-hooks
```

---

## Testing React Hooks

React hooks encapsulate reusable logic in functional components. Testing hooks ensures that they behave as expected in various scenarios.

### Example: Custom Hook

Here’s a simple custom hook `useCounter`:

```javascript
import { useState } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

This hook returns the internal `count` state as well as various functions to alter the state. We need to test the functions that modify the state. You can use `@testing-library/react-hooks` to test the behavior of this custom hook:

```javascript
import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('should initialize with the default value', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
});

test('should increment the count', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('should decrement the count', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(-1);
});

test('should reset the count', () => {
  const { result } = renderHook(() => useCounter(5));

  act(() => {
    result.current.increment();
    result.current.reset();
  });

  expect(result.current.count).toBe(5);
});
```

The result of the `renderHook` method allows us to interact with the hook's current state, and methods exposed by the hook. For instance you can invoke the `increment()` and `decrement()` functions returned by `useCounter()` by using `result.current.increment()`, and `result.current.decrement()`, and test the `count` value by evaluating `result.current.count`.

### Key Points:

- `renderHook` renders the hook in isolation for testing.
- `act` ensures that updates to state or props are applied and reflected in the test.

---

## Testing Asynchronous Code

Let’s say you have the following service method that fetches a user’s information from an API endpoint based on a user id.

```javascript
// ./UserService.js

export function fetchUserById(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
              .then((response) => response.json()
  );
}
```

We don't need to unit test `fetch`. However we do need to test the effect of any response returned from `fetch` by mocking the response. In this instance you can mock the returned value of `fetchUserById` which happens to be a `Promise` that resolves to the response of `fetch`.

```javascript
import { vi, expect, it, describe } from "vitest";
import { getUserById } from "./userService";

vi.mock("./userService", { spy: true });

describe("userService", () => {
 it("should return user by id", async () => {
   vi.mocked(getUserById).mockResolvedValue(
     new Promise((resolve) => resolve({ name: "John Doe" }))
   );

   const user = await getUserById(1);
   expect(user).toMatchObject({ name: "John Doe" });
 });
});
```

However this is not very interesting. It would be more useful to test how a component using the async method would behave.

### Example: FetchUser Component

Here’s a component that fetches user data and displays the data:

```javascript
import React, { useEffect, useState } from "react";

import { getUserById } from "../../services/userService";

function UserInfo({ userId }) {
 const [user, setUser] = useState(null);

 useEffect(() => {
   async function fetchUserData() {
     const data = await getUserById(userId);
     setUser(data);
   }
   fetchUserData();
 }, [userId]);

 if (!user) return <p>Loading...</p>;
 return <div>{user.name}</div>;
}

export default UserInfo;
```

We're going to use <a href="https://vitest.dev/" target="_blank">Vitest</a> and <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank">React Testing Library</a> to test the `UserInfo` component:

```javascript
import { vi, test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { waitFor } from "@testing-library/react";
import UserInfo from "../../components/testable/UserInfo";
import { getUserById } from "../../services/userService";

// Mock the userService
vi.mock("../../services/userService", { spy: true });

test("displays loading state and fetches user data", async () => {
 vi.mocked(getUserById).mockResolvedValue(
   new Promise((resolve) => resolve({ name: "John Doe" }))
 );

 const { getByText } = render(<UserInfo userId={1} />);

 // Assert loading state
 const loadingContent = getByText(/loading/i);
 await expect.element(loadingContent).toBeInTheDocument();

 // Wait for the user data to be rendered
 await waitFor(() =>
   expect.element(getByText(/John Doe/i)).toBeInTheDocument()
 );
});
```

Just as before, you can test the async method with mock data, and also test how a component would behave when the async data is loaded.

---

## Best Practices for Testing React Applications

- **Test Behavior, Not Implementation**:
   - Focus on how the user interacts with the app, rather than testing internal implementation details.
- **Mock External Dependencies**:
   - Mock APIs, timers, and other dependencies to ensure tests are isolated and predictable.
- **Use `act` for State Updates**:
   - Wrap state updates and asynchronous calls inside `act` to ensure React processes them correctly.
- **Maintain Test Coverage**:
   - Use Jest’s built-in coverage tool to monitor which parts of your code are tested.
- **Refactor code**:
   - Refactor code into units that allow the code to be tested in isolation.
- **Organize Tests**:
   - Place test files alongside their respective components or hooks using the `.test.tsx` naming convention.

---

## Complete Example

A complete example app with nested routes, and breadcrumb may be found on <a href="https://github.com/WalidNewaz/react-codeslitting" target="_blank">my Github repository</a>.

---

## Conclusion

Testing hooks, components, and asynchronous code is crucial for building reliable and maintainable React applications. By using tools like `Jest`, `Vitest`, and `React Testing Library`, you can write tests that mimic real-world user interactions and catch bugs before they reach production. With the examples provided in this article, you’re now equipped to test various parts of your React application effectively. Start incorporating these techniques into your workflow to ensure a robust development experience.
