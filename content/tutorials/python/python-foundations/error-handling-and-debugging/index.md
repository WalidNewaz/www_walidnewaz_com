---
featured: false
date: "2023-11-03"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "4. Error Handling and Debugging"

title: "Error Handling and Debugging"
description: "This chapter explores how to handle errors gracefully, log application behavior, and debug issues efficiently in Python."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["fundamentals", "Python"]
---

# Chapter 4: Error Handling and Debugging

Bugs are inevitable—but crashes don’t have to be. This chapter explores how to handle errors gracefully, log application behavior, and debug issues efficiently in Python. These are critical skills for building robust, production-ready applications.

## 4.1 Python Exceptions

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

## 4.2 Raising Custom Exceptions

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

## 4.3 Logging in Python

Python’s built-in `logging` module provides a flexible framework for emitting log messages from your code. It's far superior to using `print()` statements for:

- Debugging
- Tracking errors
- Auditing system events
- Application monitoring in production

### Basic Logging Example

```python
import logging

logging.basicConfig(level=logging.INFO)
logging.info("App started")
```

**Output:**

```
INFO:root:App started
```

### Log Levels and Usage

| Level      | Use Case Example                     |
| ---------- | ------------------------------------ |
| `DEBUG`    | Internal state for developers        |
| `INFO`     | Successful operations                |
| `WARNING`  | Recoverable problems or deprecations |
| `ERROR`    | Serious problems that need attention |
| `CRITICAL` | Application is unusable              |


### Changing Output Format

```python
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
```

**Output:**

```
2023-07-17 16:21:10,200 - INFO - App started
```

### Writing Logs to a File

```python
logging.basicConfig(
    filename='app.log',
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
```

### Logging in Functions

```python
def divide(a, b):
    if b == 0:
        logging.error("Attempted to divide by zero")
        return None
    return a / b

divide(10, 0)
```

### Logging Exceptions

```python
try:
    1 / 0
except ZeroDivisionError:
    logging.exception("Something went wrong!")
```

**Output:**

```bash
2023-07-17 01:26:40,389 - ERROR - Something went wrong!
Traceback (most recent call last):
  File "/.../basic_logging.py", line 11, in <module>
    1 / 0
    ~~^~~
ZeroDivisionError: division by zero
```

## 4.4 Debugging with `pdb` and IDE Tools

The Python Debugger, or `pdb` lets you pause program execution and step through code interactively.

```python
import pdb

def debug_demo():
    a = 10
    b = 0
    pdb.set_trace()
    return a / b

debug_demo()
```

The program pauses after the `set_trace()` function is executed:

```bash
> /.../pdb_demo.py(7)debug_demo()
-> return a / b
(Pdb) 
```

### Code stepping using PDB

* `n` – next line
* `s` – step into function
* `p var` – print variable
* `q` – quit debugger

### IDE Debugging

Most modern IDEs (e.g., **PyCharm**, **VS Code**) natively support:

* Breakpoints
* Step over/into
* Variable watching
* Call stack inspection

Instead of **running** the python program you need to **debug** the program.

## 4.5 Refactoring the Calculator: Fault-Tolerant Version

Here’s a **refactored CLI calculator** with logging and error handling.

### `calculator.py`

```python
import logging

logging.basicConfig(
    filename='calculator.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def add(a, b): return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b

def divide(a, b):
    if b == 0:
        logging.error("Division by zero attempted.")
        raise ValueError("Cannot divide by zero.")
    return a / b

def main():
    print("CLI Calculator (With Logging and Exception Handling)")
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
            logging.warning(f"Invalid operation: {operation}")
            return

        logging.info(f"{operation}({num1}, {num2}) = {result}")
        print(f"Result: {result}")

    except ValueError as ve:
        logging.error(f"Value error: {ve}")
        print(f"Value error: {ve}")
    except Exception as e:
        logging.critical(f"Unexpected error: {e}", exc_info=True)
        print("An unexpected error occurred.")

if __name__ == "__main__":
    main()
```

## 4.6 Unit Testing Expected Exceptions

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

## 4.7 Why This Matters for Web Development

In production systems built with **FastAPI**, **Django**, or **Flask**:

* Logging allows you to trace request handling and errors
* Exception handling prevents server crashes
* Custom exceptions help return appropriate **HTTP status codes**
* Debugging speeds up your development feedback loop

## Conclusion

In this chapter, you learned:

* How to handle built-in and custom exceptions
* How to use logging effectively
* How to debug with `pdb` and IDEs
* How to test for expected exceptions

## What is Next?

In **Chapter 5: Object-Oriented Programming in Python**, we’ll introduce:

* Classes and objects
* Inheritance and composition
* Dunder (magic) methods
* A practical class-based task manager
* Unit tests for class behavior

