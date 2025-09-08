---
featured: false
date: "2023-11-03"

series: "Python Foundations"
part: "II. Error Handling, Debugging and Testing"
chapter: "5. Error Handling in Python"

title: "Error Handling in Python"
description: "This chapter explores how to handle errors gracefully, log application behavior, and debug issues efficiently in Python."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["fundamentals", "Python"]
---

# Chapter 5: Error Handling in Python

Bugs are inevitable—but crashes don’t have to be. This chapter explores how to handle errors gracefully.

## 5.1 Python Exceptions

Python provides a rich set of built-in exceptions that help developers gracefully handle unexpected conditions.

### Common Built-in Exceptions

| Exception           | Trigger                                   |
| ------------------- | ----------------------------------------- |
| `ValueError`        | Invalid value for a function or operation |
| `TypeError`         | Wrong data type used                      |
| `ZeroDivisionError` | Division by zero                          |
| `FileNotFoundError` | Missing file reference                    |
| `IndexError`        | Invalid list index                        |
| `KeyError`          | Missing key in dictionary                 |

### Basic Try-Except Block

```python
# ValueError
try:
    x = int("abc")
except ValueError as e:
    print("ValueError:", e)

# TypeError
try:
    length = len(42)
except TypeError as e:
    print("TypeError:", e)

# ZeroDivisionError
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print("ZeroDivisionError:", e)

# FileNotFoundError
try:
    with open("missing.txt", "r") as f:
        content = f.read()
except FileNotFoundError as e:
    print("FileNotFoundError:", e)

# IndexError
try:
    nums = [1, 2, 3]
    print(nums[5])
except IndexError as e:
    print("IndexError:", e)

# KeyError
try:
    person = {"name": "Alice"}
    print(person["age"])
except KeyError as e:
    print("KeyError:", e)
```

## 5.2 Raising Custom Exceptions

In Python, you can create your own custom exceptions by defining a new class that inherits from Python's built-in `Exception` class (or any of its subclasses). This allows you to raise and catch errors that are specific to your application's domain logic.

We talk about subclasses in details in the next chapter.

### Example: Custom Exception

```python
import math

class NegativeInputError(Exception):
    """Raised when a negative number is provided where not allowed."""
    pass

def calculate_square_root(x):
    if x < 0:
        raise NegativeInputError("Cannot compute square root of a negative number.")
    return math.sqrt(x)
```

- `NegativeInputError` is your custom exception.
- It inherits from Python's built-in `Exception`.
- The `pass` keyword here is a placeholder indicating no additional logic is being added yet. The `pass` statement in Python is a no-op — it does nothing when executed.
- The `raise` keyword is used to raise an exception of a specific type, be they built-in or custom.

**Output:**

```bash
Traceback (most recent call last):
  File "/.../custom_exception.py", line 16, in <module>
    rt2 = calculate_square_root(-5)
          ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.../custom_exception.py", line 10, in calculate_square_root
    raise NegativeInputError("Cannot compute square root of a negative number.")
NegativeInputError: Cannot compute square root of a negative number.
```

A stack trace similar to the above is produced when the earlier code is executed.

### Adding More to Your Custom Exception

You can also customize your exception further by overriding the `__init__` or `__str__` methods:

```python
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

raise ValidationError("username", "Must not be empty")
```

**Output:**

```
ValidationError: username: Must not be empty
```

## 5.5 Refactoring the Calculator: Fault-Tolerant Version

Here’s a **refactored CLI calculator** with logging and error handling.

### `calculator.py`

```python
def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b

def main():
    try:
        operation = input("Choose operation (add/subtract/multiply/divide): ").strip().lower()
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))

        if operation == "add":
            result = add(num1, num2)
        elif operation == "subtract":
            result = subtract(num1, num2)
        elif operation == "multiply":
            result = multiply(num1, num2)
        elif operation == "divide":
            result = divide(num1, num2)
        else:
            return

        print(f"Result: {result}")

    except ValueError as ve:
        print(f"Value error: {ve}")
    except Exception as e:
        print("An unexpected error occurred.")

if __name__ == "__main__":
    main()
```

## 5.6 Unit Testing Expected Exceptions

We’ll now test for normal results and for expected failures using `pytest`.

### `test_calculator.py`

```python
import pytest
from calculator import add, subtract, multiply, divide

def test_add():
    assert add(1, 2) == 3

def test_subtract():
    assert subtract(5, 2) == 3

def test_multiply():
    assert multiply(3, 3) == 9

def test_divide():
    assert divide(6, 2) == 3

def test_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero."):
        divide(10, 0)
```

