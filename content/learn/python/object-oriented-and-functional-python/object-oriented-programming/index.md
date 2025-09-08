---
featured: false
date: "2023-11-05"

series: "Python Foundations"
part: "III. Object-Oriented and Functional Python"
chapter: "8. Object-Oriented Programming"

title: "Object-Oriented Programming"
description: "As applications grow, you’ll need ways to organize code around data and behavior. That’s where Object-Oriented Programming (OOP) comes in."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["OOP", "Python"]
---

# Chapter 8: Object-Oriented Programming (OOP)

As applications grow, you’ll need ways to **organize code around data and behavior**. That’s where **Object-Oriented Programming (OOP)** comes in.

In this chapter, we’ll cover:

* Classes and Objects
* Attributes and Methods
* Inheritance
* Dunder (Magic) Methods like `__str__` and `__repr__`
* A practical project: **Task Manager class**
* Writing **unit tests** for class behaviors

## 8.1 Understanding Classes and Objects

### What is a Class?

A **class** is a blueprint for creating objects that encapsulate **data (attributes)** and **behavior (methods)**.

### Simple Class Example

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"
```

This is the constructor method, called automatically when you create a new `Dog` object.

`__init__` is a special method in Python (known as a dunder or "double underscore" method).

It takes three arguments:
 - `self`: A reference to the current object being created.
 - `name`: The name of the dog (e.g., "Buddy").
 - `breed`: The breed of the dog (e.g., "Labrador").

### Creating an Object

```python
dog1 = Dog("Rex", "German Shepherd")
print(dog1.bark())  # Output: Rex says Woof!
```

## 8.2 Attributes and Methods

* **Attributes** = Variables associated with the object (`self.name`, `self.breed`)
* **Methods** = Functions defined inside a class that operate on its data (`bark()`)

## 8.3 Inheritance

Inheritance allows you to **extend existing classes**.

**Example:**

```python
class Animal:
    def speak(self):
        return "Some sound"

class Cat(Animal):
    def speak(self):
        return "Meow"

cat = Cat()
print(cat.speak())  # Output: Meow
```

Here `Cat` is the child class, and `Animal` is the parent class.

## 8.4 Dunder Methods (`__str__`, `__repr__`)

**Dunder methods** (also called **magic methods**) are special methods that Python uses to enable the behavior of **built-in operations** such as:

* Object creation
* Arithmetic
* Comparisons
* String conversion
* Iteration

They are always surrounded by **double underscores**, e.g., `__init__`, `__str__`, `__len__`.

These methods allow you to define how **custom objects behave like built-in types**.

### Commonly Used Dunder Methods (With Examples)

| Dunder Method              | Purpose                                | Example                                |
| -------------------------- | -------------------------------------- | -------------------------------------- |
| `__init__`                 | Constructor: initialize an object      | `__init__(self)`                       |
| `__str__`                  | String representation (`str(obj)`)     | `__str__(self)`                        |
| `__repr__`                 | Developer representation (`repr(obj)`) | `__repr__(self)`                       |
| `__len__`                  | Used by `len(obj)`                     | `__len__(self)`                        |
| `__getitem__`              | Indexing: `obj[index]`                 | `__getitem__(self, index)`             |
| `__setitem__`              | Set value at index: `obj[index] = x`   | `__setitem__(self, index, value)`      |
| `__eq__`, `__lt__`, etc.   | Comparisons: `==`, `<`, etc.           | `__eq__(self, other)`                  |
| `__add__`, `__mul__`, etc. | Arithmetic operations                  | `__add__(self, other)`                 |
| `__call__`                 | Make object callable like a function   | `__call__(self, *args)`                |
| `__enter__`, `__exit__`    | Context managers (`with` block)        | `__enter__(self), __exit__(self, ...)` |

**Example:**

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f"'{self.title}' by {self.author}"

    def __eq__(self, other):
        return self.title == other.title and self.author == other.author

    def __repr__(self):
        return f"Book(title='{self.title}', author='{self.author}')"

book = Book("1984", "George Orwell")
print(book)            # Output: '1984' by George Orwell
print(repr(book))      # Output: Book(title='1984', author='George Orwell')
book2 = Book("1984", "George Orwell")
print(book == book2)   # Output: True
```

## 8.5 Practical Project: Task Manager Class

Let’s build a simple **Task Manager** where you can:

* Add tasks
* Mark tasks as done
* List all tasks
* Search tasks by status

### File: `task_manager.py`

```python
class Task:
    def __init__(self, title, description=""):
        self.title = title
        self.description = description
        self.completed = False

    def mark_done(self):
        self.completed = True

    def __str__(self):
        status = "Done" if self.completed else "Pending"
        return f"[{status}] {self.title}{ ": " + self.description if len(self.description) > 0 else "" }"

class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, title, description=""):
        task = Task(title, description)
        self.tasks.append(task)
        return task

    def list_tasks(self):
        return [str(task) for task in self.tasks]

    def get_pending_tasks(self):
        return [str(task) for task in self.tasks if not task.completed]

    def get_completed_tasks(self):
        return [str(task) for task in self.tasks if task.completed]
```

### Usage Example

```python
if __name__ == "__main__":
    manager = TaskManager()

    manager.add_task("Write unit tests", "For the task manager app")
    manager.add_task("Refactor code")

    manager.tasks[0].mark_done()

    print("\nAll Tasks:")
    print("\n".join(manager.list_tasks()))

    print("\nPending Tasks:")
    print(manager.get_pending_tasks())
```

**Expected Output:**

```
All Tasks:
[Done] Write unit tests: For the task manager application
[Pending] Refactor code

Pending Tasks:
[<__main__.Task object at 0x...>]
```

> You can improve the pending tasks output by adding a `__repr__` method to the `Task` class if needed.

## 8.6 Writing Unit Tests for the Task Manager

### File: `test_task_manager.py`

```python
import pytest
from task_manager import TaskManager

@pytest.fixture
def manager():
    return TaskManager()

def test_add_task(manager):
    task = manager.add_task("Test Task", "Description")
    assert len(manager.tasks) == 1
    assert task.title == "Test Task"
    assert task.description == "Description"
    assert task.completed is False

def test_mark_task_done(manager):
    task = manager.add_task("Complete me")
    task.mark_done()
    assert task.completed is True

def test_list_tasks(manager):
    manager.add_task("Task 1")
    manager.add_task("Task 2")
    task_list = manager.list_tasks()
    assert "[Pending] Task 1" in task_list[0]
    assert "[Pending] Task 2" in task_list[1]

def test_filter_tasks(manager):
    t1 = manager.add_task("Task 1")
    t2 = manager.add_task("Task 2")
    t1.mark_done()

    pending = manager.get_pending_tasks()
    completed = manager.get_completed_tasks()

    assert t2 in pending
    assert t1 in completed
```

### Run Your Tests

```bash
pytest
```

Expected result:

```
collected 4 items

test_task_manager.py ....                      [100%]

4 passed in 0.03s
```

## 8.7 Why This Matters for Web and API Development

OOP is essential when you start building:

* **Models** in Django
* **Service layers** in FastAPI
* **Domain logic** in larger apps
* **Serializable objects** for APIs

The **Task Manager class** you just built could easily become part of a **REST API backend** or a **database model**.

## Conclusion

You’ve learned:

* How to create classes and objects
* How to work with attributes, methods, and inheritance
* How to add dunder methods for better object representation
* How to write and test OOP-style Python code

## What is Next

In **Chapter 6: Advanced Object-Oriented Programming in Python**, we’ll build:

* Inheritance and Polymorphism
* Duck Typing and Dynamic Behavior
* Abstract Base Classes (ABCs)
* Composition vs. Inheritance