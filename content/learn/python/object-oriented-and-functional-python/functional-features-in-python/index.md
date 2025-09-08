---
featured: false
date: "2023-11-09"

series: "Python for Modern Developers"
part: "III. Object-Oriented and Functional Python"
chapter: "10. Functional Features in Python"

title: "Functional Features in Python"
description: "This chapter explores advanced object-oriented programming (OOP) concepts in Python to help you build more flexible, reusable, and scalable software systems."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["OOP", "Python"]
---

# Chapter 10: Functional Features in Python

Python is a **multi-paradigm language**: it supports object-oriented, imperative, and functional programming styles. Functional features in Python make it easier to write concise, expressive, and reusable code.

In this chapter, we will explore:

* First-class functions
* Anonymous functions (lambdas) and higher-order tools: `map`, `filter`, and `reduce`
* Closures and decorators
* A project: **Decorator-based Logger**

## 10.1 First-Class Functions

In Python, functions are **first-class citizens**:

* They can be assigned to variables.
* They can be passed as arguments.
* They can be returned from other functions.

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Assign a function to a variable
say_hello = greet
print(say_hello("Alice"))  # Hello, Alice!

# Pass a function as an argument
def run_function(fn, value):
    return fn(value)

print(run_function(greet, "Bob"))  # Hello, Bob!
```

> **Key Idea:** Functions behave like any other object in Python.

## 10.2 Lambdas and Higher-Order Functions

### Lambda Functions

Lambdas are **anonymous functions**—small one-liners often used with higher-order functions.

```python
square = lambda x: x * x
print(square(5))  # 25
```

### `map()`

Applies a function to each element in an iterable.

```python
numbers = [1, 2, 3, 4]
squares = list(map(lambda x: x * x, numbers))
print(squares)  # [1, 4, 9, 16]
```

### `filter()`

Filters elements based on a predicate (function returning `True`/`False`).

```python
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]
```

### `reduce()`

Reduces an iterable to a single value by repeatedly applying a function.
Note: `reduce` is in `functools`.

```python
from functools import reduce

numbers = [1, 2, 3, 4]
total = reduce(lambda acc, x: acc + x, numbers, 0)
print(total)  # 10
```

## 10.3 Closures

A closure is a function that **remembers the variables** from the scope in which it was created, even if that scope is gone.

```python
def multiplier(factor):
    def multiply_by(x):
        return x * factor
    return multiply_by

times3 = multiplier(3)
print(times3(10))  # 30
```

Here, `multiply_by` retains access to `factor` even after `multiplier` has returned.

## 10.4 Decorators

A **decorator** is a function that takes another function and returns a new function with added behavior.
Common use cases: logging, timing, caching, access control.

```python
def simple_decorator(fn):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = fn(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@simple_decorator
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
```

**Output:**

```
Before function call
After function call
Hello, Alice!
```

## 10.5 Example: Decorator-based Logger

Let’s build a **logging decorator** to automatically log function calls.

```python
import logging
from functools import wraps

# Configure logging
logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def log_function_call(fn):
    """Decorator that logs function calls and their arguments."""
    @wraps(fn)  # preserves original function name/docs
    def wrapper(*args, **kwargs):
        logging.info("Called %s with args=%s kwargs=%s", fn.__name__, args, kwargs)
        result = fn(*args, **kwargs)
        logging.info("%s returned %s", fn.__name__, result)
        return result
    return wrapper

# Example usage
@log_function_call
def add(a, b):
    return a + b

@log_function_call
def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(add(2, 3))       # 5
    print(greet("Alice"))  # Hello, Alice!
```

* The `log_function_call` decorator wraps any function.
* Each time the function is called, logs are written before and after execution.
* The `@wraps` decorator ensures the wrapped function keeps its metadata (`__name__`, docstring).

### Sample Log Output (`app.log`)

```
2023-11-05 12:34:10,001 - INFO - Called add with args=(2, 3) kwargs={}
2023-11-05 12:34:10,002 - INFO - add returned 5
2023-11-05 12:34:10,003 - INFO - Called greet with args=('Alice',) kwargs={}
2023-11-05 12:34:10,004 - INFO - greet returned Hello, Alice!
```

## Summary

* **First-class functions**: Functions can be treated like data.
* **Lambdas**: Small anonymous functions for concise expressions.
* **map, filter, reduce**: Functional programming tools.
* **Closures**: Inner functions that remember outer scope.
* **Decorators**: Add reusable behavior to functions.
* **Project**: A logging decorator that records function calls.

Next, we’ll move into **Data Structures and Algorithms in Python**, building efficient code with Python’s built-in collections.

