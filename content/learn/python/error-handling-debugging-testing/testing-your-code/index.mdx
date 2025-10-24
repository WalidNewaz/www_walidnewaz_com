---
featured: false
date: "2023-11-05"

series: "Python Foundations"
part: "II. Error Handling, Debugging and Testing"
chapter: "7. Testing Your Code"

title: "Testing Your Code"
description: "This chapter explores how to handle errors gracefully, log application behavior, and debug issues efficiently in Python."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["testing", "Python"]
---

# Chapter 7: Testing Your Code

Testing ensures your programs work as expected and continue working as you add new features. In professional software development, writing tests is not optional—it’s a best practice.

In this chapter, we’ll cover:

* Basics of **unit testing** in Python using `unittest` and `pytest`.
* Using **fixtures**, **mocks**, and **parameterized tests** to write cleaner tests.
* The **Test-Driven Development (TDD)** mindset.

By the end, you’ll know how to structure, run, and maintain tests for your Python applications.

## 7.1 Unit Testing with `unittest`

Python includes a built-in testing framework called **`unittest`**.

Example: testing a simple calculator.

```python
# calculator.py
def add(a: int, b: int) -> int:
    """Return the sum of two numbers."""
    return a + b
```

Now a `unittest` test case:

```python
# test_calculator_unittest.py
import unittest
from calculator import add

class TestCalculator(unittest.TestCase):
    def test_add(self):
        # Arrange: set up inputs
        a, b = 2, 3
        # Act: call the function
        result = add(a, b)
        # Assert: verify result
        self.assertEqual(result, 5)

if __name__ == "__main__":
    unittest.main()
```

* `unittest.TestCase` is the base class for all test cases.
* Each method starting with `test_` is run as a separate test.
* We used the **AAA pattern**: Arrange → Act → Assert.
* Running `python test_calculator_unittest.py` executes the test.

## 7.2 Testing with `pytest`

`pytest` is a **third-party testing framework** that is more concise and powerful.

```python
# test_calculator_pytest.py
from calculator import add

def test_add():
    # Arrange
    a, b = 2, 3
    # Act
    result = add(a, b)
    # Assert
    assert result == 5
```

* No class or inheritance required—just functions prefixed with `test_`.
* `assert` is used for comparisons.
* Run with `pytest` command in the terminal; pytest finds tests automatically.

## 7.3 Fixtures in `pytest`

Fixtures help you set up and tear down test resources.

```python
# test_contacts.py
import pytest

@pytest.fixture
def sample_contacts():
    """Provide a sample contact dictionary before each test."""
    return {"Alice": {"phone": "123", "email": "alice@example.com"}}

def test_contact_lookup(sample_contacts):
    # Act
    contact = sample_contacts.get("Alice")
    # Assert
    assert contact["phone"] == "123"
```

* `@pytest.fixture` marks a function as a fixture.
* Any test function that **accepts the fixture as a parameter** automatically receives the fixture’s return value.
* Fixtures reduce duplication and make tests cleaner.

## 7.4 Mocks

Sometimes you want to **replace real dependencies** with fake ones. Example: testing a function that sends email.

```python
# notifier.py
def send_email(address: str, subject: str) -> str:
    """Pretend to send an email (in real apps this would call an API)."""
    return f"Email sent to {address} with subject '{subject}'"
```

Now, mock it in tests:

```python
# test_notifier.py
from unittest.mock import patch
from notifier import send_email

def test_send_email_mocked():
    with patch("notifier.send_email", return_value="Mocked!") as mock_send:
        result = send_email("bob@example.com", "Hello")
        assert result == "Mocked!"
        mock_send.assert_called_once_with("bob@example.com", "Hello")
```

* `patch` replaces `send_email` temporarily with a mock function.
* The test doesn’t actually send an email, but it checks that the **right call was made**.

## 7.5 Parameterized Tests

Instead of writing multiple test functions, you can parametrize one test with different inputs.

```python
# test_math.py
import pytest
from calculator import add

@pytest.mark.parametrize(
    "a, b, expected",
    [
        (1, 2, 3),   # case 1
        (0, 0, 0),   # case 2
        (-1, 1, 0),  # case 3
    ],
)
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected
```

* `@pytest.mark.parametrize` runs the same test with multiple input sets.
* This reduces boilerplate and ensures you test edge cases.

## 7.6 Test-Driven Development (TDD) Mindset

TDD is a workflow where you:

1. **Write a failing test** for new functionality.
2. **Implement the minimal code** to make the test pass.
3. **Refactor** the code and tests to improve quality.

Example workflow:

* Write `test_calculator.py` with `test_subtract()`.
* Run tests → it fails (function doesn’t exist).
* Implement `subtract()` in `calculator.py`.
* Run tests again → they pass.
* Refactor if needed.

This ensures tests guide your design and prevent regression bugs.

## Summary

* `unittest` is the **built-in framework**, while `pytest` is the **community favorite** for power and simplicity.
* Fixtures, mocks, and parameterized tests let you **write robust and maintainable test suites**.
* TDD encourages writing tests **before code**, improving design and reliability.

Next, we’ll explore **Object-Oriented Programming (OOP)**, where tests will continue to play a critical role.
