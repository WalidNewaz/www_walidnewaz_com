---
featured: false
date: "2023-10-18"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "2. Python Syntax and Core Concepts"

title: "Syntax and Core Concepts"
description: "Before diving into writing Python code, it’s essential to have a clean, efficient, and testable development environment. This chapter covers, Installing Python, Setting up virtual environments, Choosing the right IDE or editor, Creating your first Python script, Writing and running your first unit test."
hero_image: "python-tutorial-banner.png"
tags: ["fundamentals", "Python"]
---

# Chapter 2: Python Syntax and Core Concepts

Now that your development environment is ready, it’s time to get hands-on with Python syntax and core programming concepts. In this chapter, we’ll cover:

* Variables and Data Types
* Conditional Statements
* Loops
* Functions and Modules
* A practical project: Building a simple **CLI-based calculator**
* Writing **unit tests** for your calculator

## 2.1 Variables and Data Types

### Python Data Types

| **Category** | **Data Type** | **Description**                      | **Example**                              |
| ------------ | ------------- | ------------------------------------ | ---------------------------------------- |
| Numeric      | `int`         | Integer numbers                      | `x = 5`                                  |
|              | `float`       | Floating-point (decimal) numbers     | `y = 3.14`                               |
|              | `complex`     | Complex numbers (real + imaginary)   | `z = 2 + 3j`                             |
| Sequence     | `str`         | Text/string data                     | `name = "Python"`                        |
|              | `list`        | Ordered, mutable collection          | `fruits = ["apple", "banana"]`           |
|              | `tuple`       | Ordered, immutable collection        | `coords = (10.0, 20.0)`                  |
|              | `range`       | Sequence of numbers (used in loops)  | `r = range(5)`                           |
| Mapping      | `dict`        | Key-value pairs                      | `person = {"name": "Alice", "age": 25}`  |
| Set          | `set`         | Unordered, unique elements           | `colors = {"red", "green"}`              |
|              | `frozenset`   | Immutable set                        | `f_colors = frozenset(["red", "green"])` |
| Boolean      | `bool`        | Boolean value (`True` or `False`)    | `is_active = True`                       |
| Binary       | `bytes`       | Immutable byte sequence              | `data = b'hello'`                        |
|              | `bytearray`   | Mutable byte sequence                | `ba = bytearray([65, 66])`               |
|              | `memoryview`  | Memory-efficient view of binary data | `mv = memoryview(ba)`                    |
| None Type    | `NoneType`    | Represents absence of value          | `result = None`                          |
| User-defined | Custom Class  | Classes defined by developers        | `class Dog: pass`<br>`d = Dog()`         |

### Python Variables

In Python, a **variable** is a name that refers to a value stored in memory. Variables allow you to store, retrieve, and manipulate data in your programs.

#### Key Features of Python Variables

| Feature                     | Explanation                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| **Dynamically Typed**       | You don’t need to declare the variable type explicitly. Python infers it automatically. |
| **No Explicit Declaration** | Simply assign a value to create a variable.                                             |
| **Reassignment Allowed**    | You can change the value and even the type of data a variable holds later in your code. |
| **Case Sensitive**          | `name` and `Name` are treated as two different variables.  

#### Example Variable Declarations

```python
# Integer variable
age = 25

# String variable
name = "Alice"

# Float variable
price = 19.99

# Boolean variable
is_active = True
```

#### Variable Naming Rules

1. Variable names can contain **letters**, **numbers**, and **underscores**.
2. They **cannot start with a number**.
3. No spaces allowed.
4. Reserved keywords like `class`, `if`, `return`, etc., cannot be used as variable names.

✅ Valid examples:

```python
user_name = "Bob"
userAge = 30
_user_location = "NY"
```

❌ Invalid examples:

```python
2user = "Error"      # Starts with a number
user-name = "Error"  # Contains a hyphen
class = "Error"      # Reserved keyword
```

#### Dynamic Typing Example

```python
x = 10          # x is an integer
x = "Hello"     # x is now a string
x = 3.14        # x is now a float
```

Python doesn’t require you to declare the type beforehand.

#### Multiple Variable Assignment

```python
a, b, c = 1, 2, 3

# Or assign the same value to multiple variables
x = y = z = 0
```

#### Swapping Variables

Python makes it easy to swap values without a temporary variable:

```python
x, y = 5, 10
x, y = y, x
print(x, y)  # Output: 10 5
```

#### Type Checking:

You can check the type of a variable using:

```python
name = "Alice"
print(type(name))  # Output: <class 'str'>
```

#### Notes:

* **Type Checking:** Use `type(x)` or `isinstance(x, DataType)`
* **Type Conversion:** Built-in functions like `int()`, `str()`, `float()`
* **Further Reading:**
  [Python Standard Types - Official Docs](https://docs.python.org/3/library/stdtypes.html)

## 2.2 Conditional Statements

Python uses indentation (not curly braces) for blocks of code.

```python
x = 10

if x > 5:
    print("x is greater than 5")
elif x == 5:
    print("x equals 5")
else:
    print("x is less than 5")
```

## 2.3 Loops

### For Loop

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

### While Loop:

```python
count = 0

while count < 3:
    print(f"Count is {count}")
    count += 1
```

### Loop Control Statements:

* `break`: Exit the loop early
* `continue`: Skip to the next iteration

## 2.4 Functions and Modules

The `def` keyword is used to define a function in Python. Functions help **organize and reuse** your code.

```python
def add(a, b):
    return a + b

result = add(2, 3)
print(result)  # Output: 5
```

You can also **import functions from modules** (files).

Example: If you had a file `math_utils.py`:

```python
# math_utils.py
def multiply(a, b):
    return a * b
```

You can import and use it like this:

```python
from math_utils import multiply

print(multiply(3, 4))  # Output: 12
```

## Example Project: CLI-Based Calculator

Let’s build a simple command-line calculator supporting **addition**, **subtraction**, **multiplication**, and **division**.

### File: `calculator.py`

```python {numberLines}
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def main():
    print("Simple CLI Calculator")
    print("Operations: add, subtract, multiply, divide")

    operation = input("Enter operation: ").strip().lower()
    try:
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
            print("Invalid operation")
            return

        print(f"Result: {result}")

    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

### Running the Calculator

```bash
python calculator.py
```

**Example interaction:**

```
Simple CLI Calculator
Operations: add, subtract, multiply, divide
Enter operation: add
Enter first number: 10
Enter second number: 5
Result: 15.0
```

## 2.6 Writing Unit Tests for the Calculator

Now, let's create a unit test file.

### File: `test_calculator.py`

```python
import pytest
from calculator import add, sub, mul, div

def test_addition():
    assert add(1, 2) == 3

def test_subtraction():
    assert sub(5, 2) == 3

def test_multiplication():
    assert mul(2, 3) == 6

def test_division():
    assert div(6, 2) == 3

def test_division_by_zero():
    with pytest.raises(ValueError, match="Division by zero"):
        div(2, 0)
```

### Running Your Tests:

```bash
pytest
```

### Expected Output:

```
collected 5 items

test_calculator.py .....                       [83%]

5 passed in 0.03s
```

The reason why the test coverage isn't 100% is because the `main()` function in the module wasn't tested. We could achieve 100% test coverage of the business logic by moving the arithmatic functions into a separate module, `calculator_operations.py` for instance, and writing tests for it.

## 2.7 How This Ties to Web Development Later

Understanding **data types**, **control structures**, and **functions** lays the groundwork for writing API routes, services, and business logic layers in frameworks like **FastAPI** and **Django**.

For example:

* The `main()` function above mirrors a simple web controller
* Validation logic (like checking for divide by zero) will later appear in API request validation

## Conclusion

You’ve learned:

* Python variables and types
* Conditionals and loops
* Functions and modules
* How to write and test a simple calculator app

---

## What’s Next

In **Chapter 3: Working with Files and Data Serialization**, we’ll cover:

* Reading and writing files
* Parsing JSON and CSV
* Practical example: **Log file parser that outputs JSON**

