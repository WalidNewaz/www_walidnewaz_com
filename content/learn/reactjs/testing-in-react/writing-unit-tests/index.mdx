---
featured: false
date: "2023-09-29"

series: "Modern React.js"
part: "VI. Testing in React"
chapter: "14. Writing unit tests with Jest and React Testing Library"

title: "Writing unit tests"
description: "Unit testing ensures that individual components and functions work as expected, providing confidence in code stability and maintainability. In this article we’ll focus on writing unit tests using Jest and React Testing Library (RTL)."
# hero_image: "lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
tags: ["react", "testing"]
---

# Writing unit tests with Jest and React Testing Library

Testing is an integral part of modern web development. Unit testing ensures that individual components and functions work as expected, providing confidence in code stability and maintainability. In this article we’ll focus on writing unit tests using Jest and React Testing Library (RTL).

Jest is a popular JavaScript testing framework, while React Testing Library complements it by providing utilities to test React components in a way that mimics user interactions. Together, they form a powerful combination for writing robust unit tests in React.

## Setting Up Jest and React Testing Library

Before we dive into writing tests, let’s set up a React project with Jest and React Testing Library.

### Installation

If you're using a project created with `create-react-app`, Jest and React Testing Library come pre-installed. However, if you’re starting from scratch or using a custom setup, you can install the necessary packages:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Additionally, for TypeScript projects, install the type definitions:

```bash
npm install --save-dev @types/jest @types/react @types/react-dom
```

### Configuring Jest

If your project doesn’t already have a Jest configuration, you can initialize it with:

```bash
npx jest --init
```

You’ll also need to set up a `jest.config.js` file if additional configuration is required, for example:

```javascript
module.exports = {
  testEnvironment: "jsdom", // Required for React Testing Library
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Custom setup file
};
```

## Writing Unit Tests with Jest and React Testing Library

Let’s explore how to write tests for React components and functions.

### Example 1: Testing a Simple Component

#### Component: `Button`

```javascript
import React from "react";

function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
```

#### Test for `Button` Component

The test ensures that:

1. The button renders correctly.
2. It handles user interactions.

```javascript {numberLines}
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders Button and handles click", () => {
  const handleClick = jest.fn(); // Mock function for the click handler
  render(<Button label="Click Me" onClick={handleClick} />);

  // Assert that the button is rendered with the correct label
  const button = screen.getByRole("button", { name: /click me/i });
  expect(button).toBeInTheDocument();

  // Simulate a click and assert that the handler is called
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Example 2: Testing a Form with User Interaction

#### Component: `LoginForm`

```javascript {numberLines}
import React, { useState } from "react";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

#### Test for `LoginForm`

```javascript {numberLines}
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("submits login form with correct data", () => {
  const handleSubmit = jest.fn(); // Mock function for the form submit handler
  render(<LoginForm onSubmit={handleSubmit} />);

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // Assert that the handler is called with the correct data
  expect(handleSubmit).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123",
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### Example 3: Testing Asynchronous Code

#### Component: `FetchUser`

```javascript {numberLines}
import React, { useEffect, useState } from "react";

function FetchUser({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data = await response.json();
      setUser(data);
    }
    fetchUserData();
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}

export default FetchUser;
```

#### Test for `FetchUser`

```javascript {numberLines}
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FetchUser from "./FetchUser";

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: "John Doe",
      }),
  })
);

test("fetches and displays user data", async () => {
  render(<FetchUser userId={1} />);

  // Assert that the loading state is displayed
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the user data to be rendered
  await waitFor(() =>
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  );

  // Assert that the fetch API was called with the correct URL
  expect(fetch).toHaveBeenCalledWith(
    "https://jsonplaceholder.typicode.com/users/1"
  );
});
```

## Testing components within Vite

Jest is not fully supported by vite due to how the <a href="https://github.com/vitejs/vite/issues/1955#issuecomment-776009094" target="_blank">plugin system</a> from vite works. However, a suitable alternative to Jest is <a href="https://vitest.dev/" target="_blank">Vitest</a>. It is a Vite native testing framework.

To add Vitest to your project, run the following:

```bash
npm install -D vitest vitest-browser-react @vitest/browser playwright
```

You may need to download the latest Chromium browser to run Playright:

```bash
npx playwright install
```

In order to execute the test, add the following section to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Write your test for a component:

```javascript
import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import Button from './Button';

test('renders Button and handles click', () => {
  const handleClick = vi.fn()

  const { getByText, getByRole } = render(<Button label="Click Me" onClick={handleClick} />)

  // Assert that the button is rendered with the correct label
  const button = getByRole('button', { name: /click me/i })
  await expect.element(button).toBeInTheDocument()

  // Simulate a click and assert that the handler is called
  await button.click()
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

Execute the test:

```bash
npm run test
```

---

## Common Jest Features

### Jest Expect

```javascript
// Basic expectations
expect(value)
  .not
  .toBe(value)
  .toEqual(value)
  .toBeTruthy()

// Boolean
expect(value)
  .toBeFalse()
  .toBeNull()
  .toBeTruthy()
  .toBeUndefined()
  .toBeDefined()

// Object
expect(value)
  .toContain(item)
  .toContainEqual(item)
  .toHaveLength(number)
  .toBeInstanceOf(Class)
  .toMatchObject(object)
  .toHaveProperty(keyPath, value)

// Numbers
expect(value)
  .toBeCloseTo(number,numDigits)
  .toBeGreaterThan(number)
  .toBeGreaterThanOrEqual(number)
  .toBeLessThan(number)
  .toBeLessThanOrEqual(number)

// Strings
expect(value)
  .toMatch(regexpOrString)

// Errors
expect(value)
  .toThrow(error)
  .toThrowErrorMatchingSnapshot()
```

### Jest Mock functions

```javascript
// Mock functions
const fn = jest.fn()
const fn = jest.fn(n => n * n)

// Calls
const fn = jest.fn()
fn(123)
fn(456)

fn.mock.calls.length   // → 2
fn.mock.calls[0][0]    // → 123
fn.mock.calls[1][0]    // → 456

// Return values
const fn = jest.fn(() => 'hello')

jest.fn().mockReturnValue('hello')
jest.fn().mockReturnValueOnce('hello')

// Instances
const Fn = jest.fn()

a = new Fn()
b = new Fn()

Fn.mock.instances
// → [a, b]

// Mock implements
const fn = jest.fn()
  .mockImplementationOnce(() => 1)
  .mockImplementationOnce(() => 2)

fn()    // → 1
fn()    // → 2

// Assertions
expect(fn)
  .toHaveBeenCalled()
  .toHaveBeenCalledTimes(number)
  .toHaveBeenCalledWith(arg1, arg2, ...)
  .toHaveBeenLastCalledWith(arg1, arg2, ...)
  .toHaveBeenCalledWith(expect.anything())
  .toHaveBeenCalledWith(expect.any(constructor))
  .toHaveBeenCalledWith(expect.arrayContaining([ values ]))
  .toHaveBeenCalledWith(expect.objectContaining({ props }))
  .toHaveBeenCalledWith(expect.stringContaining(string))
  .toHaveBeenCalledWith(expect.stringMatching(regexp))
```

## Common Vitest Features

### Vitest Expect

```javascript
// Basic expectations
expect(value)
  .not
  .toBe(value)
  .toEqual(value)
  .toBeTruthy()

// Boolean
expect(value)
  .toBeFalse()
  .toBeNull()
  .toBeTruthy()
  .toBeFalsy()
  .toBeUndefined()
  .toBeDefined()

// Object
expect(value)
  .toContain(item)
  .toContainEqual(item)
  .toHaveLength(number)
  .toBeInstanceOf(Class)
  .toMatchObject(object)
  .toHaveProperty(keyPath, value)

// Numbers
expect(value)
  .toBeCloseTo(number,numDigits)
  .toBeGreaterThan(number)
  .toBeGreaterThanOrEqual(number)
  .toBeLessThan(number)
  .toBeLessThanOrEqual(number)

// Strings
expect(value)
  .toMatch(regexpOrString)

// Errors
expect(value)
  .toThrow(error)
  .toThrowErrorMatchingSnapshot()

// Arrays
expect(['Alice', 'Bob', 'Eve'])
  .toHaveLength(number)
  .toContain('Alice')

// Exception
expect(fn)
  .toThrowError(error)
```

### Vitest Mock functions

```javascript
// Mock functions
const fn = vi.fn()
const fn = vi.fn(n => n * n)

// Calls
const fn = vi.fn()
fn(123)
fn(456)

fn.mock.calls.length   // → 2
fn.mock.calls[0][0]    // → 123
fn.mock.calls[1][0]    // → 456

// Return values
const fn = vi.fn(() => 'hello')

vi.fn().mockReturnValue('hello')
vi.fn().mockReturnValueOnce('hello')

// Assertions
expect(fn)
  .toHaveBeenCalled()
  .toHaveBeenCalledTimes(number)
  .toHaveBeenCalledWith(arg1, arg2, ...)
  .toHaveBeenLastCalledWith(arg1, arg2, ...)
  .toHaveBeenCalledWith(expect.anything())
  .toHaveBeenCalledWith(expect.any(constructor))
  .toHaveBeenCalledWith(expect.arrayContaining([ values ]))
  .toHaveBeenCalledWith(expect.objectContaining({ props }))
  .toHaveBeenCalledWith(expect.stringContaining(string))
  .toHaveBeenCalledWith(expect.stringMatching(regexp))
```

## Best Practices for Testing React Applications

* Test User Behavior, Not Implementation Details:
  * Use React Testing Library’s utilities to mimic real user interactions.
  * Avoid testing internal implementation, focusing instead on the rendered output and behavior.
* Mock External Dependencies:
  * Use Jest’s mocking features to simulate API calls, timers, and other dependencies.
* Measure Test Coverage:
  * Use Jest’s built-in coverage tool to identify untested parts of your code.
* Organize Tests:
  * Place test files alongside their corresponding components using the `.test.tsx` or `.spec.tsx` naming convention.
