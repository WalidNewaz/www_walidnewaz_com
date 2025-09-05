---
featured: false
date: "2023-11-07"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "6. Advanced Object-Oriented Programming"

title: "Advanced Object-Oriented Programming"
description: "This chapter explores advanced object-oriented programming (OOP) concepts in Python to help you build more flexible, reusable, and scalable software systems."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["OOP", "Python"]
---

# Chapter 6: Advanced Object-Oriented Programming in Python

This chapter explores advanced object-oriented programming (OOP) concepts in Python to help you build more flexible, reusable, and scalable software systems. We'll cover:

* Inheritance and polymorphism
* Duck typing and dynamic behavior
* Abstract base classes
* Composition vs inheritance
* Real-world example and test cases

## 6.1 Inheritance

Inheritance allows a class to reuse code from another class.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Makes a sound"

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

dog = Dog("Fido")
print(dog.speak())  # Fido says Woof!
```

> **Note**: `Dog` inherits the `__init__` method from `Animal` and overrides `speak`.

## 6.2 Polymorphism

The term *polymorphism* means "many forms." In Python OOP, it refers to the **ability of different object types to respond to the same method or interface**.

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

animals = [Dog(), Cat()]
for animal in animals:
    print(animal.speak())
```

**Output:**

```
Woof!
Meow!
```

This is polymorphism: you call `speak()` on each object **without knowing or caring what their specific class is.**

## 6.3 Duck Typing

Python uses **duck typing**: if an object has the expected method or behavior, it's valid — regardless of its actual type.

> “If it walks like a duck and quacks like a duck, it's a duck.”

```python
class Bird:
    def fly(self):
        return "Flap flap"

class Airplane:
    def fly(self):
        return "Jet sounds"

def make_it_fly(flier):
    print(flier.fly())

make_it_fly(Bird())       # Flap flap
make_it_fly(Airplane())   # Jet sounds
```

Python does not care about class inheritance. It just checks if the method exists **at runtime**.

## 6.4 Method Overriding

In class inheritance, **subclasses can override methods** from their parent class. This is another form of polymorphism.

```python
class Shape:
    def area(self):
        raise NotImplementedError()

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

shapes = [Circle(3), Square(4)]
for shape in shapes:
    print(shape.area())
```

**Output:**

```
28.26
16
```

Each shape implements its own `area()` logic.

## 6.5 Abstract Base Classes (ABCs)

Sometimes, you want to **enforce an interface** across subclasses. Python’s `abc` module lets you do that.

```python
from abc import ABC, abstractmethod

class Exporter(ABC):
    @abstractmethod
    def export(self, data):
        pass
```

Any subclass of `Exporter` **must implement** the `export()` method.

```python
class JSONExporter(Exporter):
    def export(self, data):
        import json
        return json.dumps(data)

class CSVExporter(Exporter):
    def export(self, data):
        import csv
        from io import StringIO

        output = StringIO()
        writer = csv.DictWriter(output, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
        return output.getvalue()

def save_data(exporter: Exporter, data):
    output = exporter.export(data)
    print(output)

data = [{"name": "ALice", "age": 30}, {"name": "Bob", "age": 25}]

save_data(JSONExporter(), data)
save_data(CSVExporter(), data)
```

### ABCs with Default Implementations

You can provide concrete methods alongside abstract ones:

```python
class Exporter(ABC):
    @abstractmethod
    def export(self, data):
        pass

    def validate(self, data):
        if not data:
            raise ValueError("Data must not be empty")
```

Subclasses inherit `validate()` as-is but must still implement `export()`.

## 6.6 Composition vs. Inheritance

Instead of inheriting behavior, sometimes it’s better to **compose** classes from smaller parts.

```python
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()

    def start(self):
        return self.engine.start()

car = Car()
print(car.start())  # Engine started
```

Use *composition* when the relationship is **"has-a"**; use *inheritance* when the relationship is defined by **"is-a"**.

## 6.7 Testing Inheritance and Polymorphism

```python
import pytest

class Parent:
    def greet(self):
        return "Hello from Parent"

class Child(Parent):
    def greet(self):
        return "Hello from Child"

def test_polymorphism():
    obj: Parent = Child()
    assert obj.greet() == "Hello from Child"

def test_inheritance():
    child = Child()
    assert isinstance(child, Parent)
```

## Chapter Assignment

For this chapter we're going to extend the `TaskManager` example from the previous chapter and incorporate some of the new concepts we've learned here.

- Create an ABC called `BaseTask` that can be extended by task classes such as `SimpleTask` that have the attributes of the existing `Task` class, and a new `DeadlineTask` that also have a `due_date` attribute.
- Update the `TaskManager` to work with a list of `BaseTask`.
- Create a `TaskNotifier` class to determine which one of the tasks within the list of tasks managed by the `TaskManager` have expired.
- **Bonus**: Try adding a `RecurringTask` that inherits from `BaseTask` but includes recurrence logic (e.g., daily/weekly).
- **Hint**: Use duck typing to allow third-party task types as long as they implement `__str__` and `mark_done`.

