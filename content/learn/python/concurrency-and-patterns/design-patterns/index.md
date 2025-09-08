---
featured: false
date: "2023-11-16"

series: "Python for Modern Developers"
part: "V. Concurrency and Patterns"
chapter: "16. Python Design Patterns"

title: "Python Design Patterns"
description: "Design patterns are tried-and-tested solutions to common software design problems. This chapter introduces core design patterns in Python, with real-world examples and use cases for each."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["Design Patterns", "Python"]
---

# Chapter 16: Python Design Patterns

Design patterns are tried-and-tested solutions to common software design problems. They provide structure and best practices, allowing you to write **cleaner, scalable, and maintainable** code.

This chapter introduces core design patterns in Python, with real-world examples and use cases for each.

## 16.1 Why Design Patterns Matter

* Improve **code reusability** and **readability**
* Solve recurring problems in a structured way
* Help with **team collaboration** via shared terminology
* Ease the transition from design to implementation

## 16.2 Categories of Design Patterns

| Category   | Purpose                       |
| ---------- | ----------------------------- |
| Creational | Object creation logic         |
| Structural | Relationships between objects |
| Behavioral | Communication between objects |

## 16.3 Creational Patterns

Creational Design Patterns are a category of software design patterns that deal with object creation mechanisms, aiming to make a system independent of how its objects are created, composed, and represented. Instead of instantiating classes directly with `new` (or equivalent in Python, `ClassName()`), these patterns provide flexible ways to delegate the instantiation process. This helps in managing complexity, especially when objects require intricate setup, need to be reused, or when the system should remain loosely coupled to specific classes. Common examples include **Singleton** (ensures only one instance of a class exists), **Factory Method** (delegates instantiation to subclasses), **Abstract Factory** (creates families of related objects), **Builder** (constructs complex objects step by step), and **Prototype** (creates objects by cloning existing ones). They are commonly used in frameworks, dependency injection systems, UI toolkits, and applications that need configurable or extensible object creation workflows. In practice, Creational Patterns improve flexibility, promote reusability, and simplify code maintenance by separating object construction from its use.

### Singleton Pattern

Ensures a class has only **one instance**, and provides a global point of access to it.

```python
class Singleton:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

a = Singleton()
b = Singleton()
print(a is b)  # True
```

**Use case:** Logging, configuration managers, database connections.

### Factory Pattern

Creates objects **without specifying the exact class**. For instance, in a workflow management system you often have many task types (HTTP call, SQL query, Spark job, Docker task…). A factory method lets the scheduler/loader create the correct concrete class from a spec (YAML/JSON/UI) without hard‑coding class names everywhere.

```python
class Task(ABC):
    @abstractmethod
    def run(self): ...

class HttpTask(Task): ...
class SqlTask(Task): ...
class SparkTask(Task): ...

class TaskFactory:
    _registry = {
        "http": HttpTask,
        "sql": SqlTask,
        "spark": SparkTask,
    }

    @classmethod
    def create(cls, spec: dict) -> Task:
        kind = spec["type"]
        return cls._registry[kind](**spec["params"])

task1 = TaskFactory.create({'type': "http", 'params': {}})
task1.run()
task2 = TaskFactory.create({'type': "sql", 'params': {}})
task2.run()
```

### Abstract Factory Pattern

Abstract Factory provides an interface for creating **families of related objects** without specifying their concrete classes. It’s useful when your code must remain agnostic to the specific concrete types it instantiates, but you still need these objects to be compatible with each other.

#### Example: A Car Parts Factory

A car, like any complex machine, is made up of various parts. You need a **consistent family of parts**—engine, wheels, interior, infotainment, battery/ECU—where the pieces must be compatible with each other and with the specific model/trim/market. That coordination is exactly where **Abstract Factory** shines.

With **Abstract Factory**, you define an interface that creates an entire *family of related parts* (`create_engine`, `create_wheels`, `create_infotainment`, …). Each concrete factory represents a model/trim (e.g., `Model3Factory`, `CorollaFactory`) and guarantees that all produced parts belong to the same family and work together. The client (assembler) never hardcodes which concrete parts to use; it receives a factory and assembles a car from whatever parts that factory yields.

**1) Define part interfaces**

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass

# Part interfaces
class Engine(ABC):
    @abstractmethod
    def spec(self) -> str: ...

class Wheels(ABC):
    @abstractmethod
    def spec(self) -> str: ...

class Infotainment(ABC):
    @abstractmethod
    def spec(self) -> str: ...
```

**2) Concrete parts per model**

```python
# Tesla Model 3 parts
class Model3Engine(Engine):
    def spec(self) -> str:
        return "Dual-motor electric, 258 kW, 75 kWh pack"

class Model3Wheels(Wheels):
    def spec(self) -> str:
        return "19-inch aero wheels, EV-rated tires"

class Model3Infotainment(Infotainment):
    def spec(self) -> str:
        return "17-inch center screen, Tesla OS"

# Toyota Corolla parts
class CorollaEngine(Engine):
    def spec(self) -> str:
        return "1.8L I4 hybrid, 103 kW combined"

class CorollaWheels(Wheels):
    def spec(self) -> str:
        return "16-inch alloy wheels, all-season tires"

class CorollaInfotainment(Infotainment):
    def spec(self) -> str:
        return "8-inch touchscreen, Toyota Audio Multimedia"
```

**3) Abstract Factory for “families of parts”**

```python
class PartsFactory(ABC):
    @abstractmethod
    def create_engine(self) -> Engine: ...
    @abstractmethod
    def create_wheels(self) -> Wheels: ...
    @abstractmethod
    def create_infotainment(self) -> Infotainment: ...
```

**4) Concrete factories per car model (family)**

```python
class Model3Factory(PartsFactory):
    def create_engine(self) -> Engine:
        return Model3Engine()
    def create_wheels(self) -> Wheels:
        return Model3Wheels()
    def create_infotainment(self) -> Infotainment:
        return Model3Infotainment()

class CorollaFactory(PartsFactory):
    def create_engine(self) -> Engine:
        return CorollaEngine()
    def create_wheels(self) -> Wheels:
        return CorollaWheels()
    def create_infotainment(self) -> Infotainment:
        return CorollaInfotainment()
```

**5) The assembler (client) stays model-agnostic**

```python
@dataclass
class Car:
    model: str
    engine: Engine
    wheels: Wheels
    infotainment: Infotainment

class CarAssembler:
    def __init__(self, factory: PartsFactory, model_name: str):
        self.factory = factory
        self.model_name = model_name

    def assemble(self) -> Car:
        engine = self.factory.create_engine()
        wheels = self.factory.create_wheels()
        infotainment = self.factory.create_infotainment()
        return Car(
            model=self.model_name,
            engine=engine,
            wheels=wheels,
            infotainment=infotainment,
        )

# Usage
car1 = CarAssembler(Model3Factory(), "Tesla Model 3").assemble()
car2 = CarAssembler(CorollaFactory(), "Toyota Corolla").assemble()

print(car1.model, "|", car1.engine.spec(), "|", car1.wheels.spec(), "|", car1.infotainment.spec())
print(car2.model, "|", car2.engine.spec(), "|", car2.wheels.spec(), "|", car2.infotainment.spec())
```

**Benefits of the *Abstract Factory* in this scenario:**

* **Compatibility & Consistency:** A Model 3’s wheels, battery pack, and infotainment head unit match by construction.
* **Easy swaps:** Change the whole family at once (e.g., export market vs domestic market) by swapping factories.
* **Scaling:** Add new models/variants by adding one new factory, not editing existing logic everywhere.
* **Testing:** Provide a `TestPartsFactory` or `MockPartsFactory` for deterministic builds in unit tests.

**A quick variant example: “Performance” trims**

Add a new factory without touching existing ones:

```python
class Model3PerformanceWheels(Wheels):
    def spec(self) -> str:
        return "20-inch performance wheels, summer tires"

class Model3PerformanceFactory(Model3Factory):
    def create_wheels(self) -> Wheels:
        return Model3PerformanceWheels()  # engine & infotainment inherited
```

Swap it in:

```python
perf = CarAssembler(Model3PerformanceFactory(), "Tesla Model 3 Performance").assemble()
```

Everything stays compatible by construction.

### Builder Pattern

When a “thing” has many optional parts, must be assembled in steps, or requires validation between parts, a **Builder** separates **construction** from **representation**. Instead of a single constructor with dozens of parameters (a “telescoping constructor”), the Builder exposes small, readable steps (often fluent), and a final `build()` that returns the finished product.

#### When to use Builder (vs Factory / Abstract Factory)

* **Factory Method**: picks *which subclass to create* based on input (focus: **selection**).
* **Abstract Factory**: creates **families of related objects** (engines, tires, dashboards) that should work well together (focus: **cohesive product families**).
* **Builder**: **assembles one complex object** step-by-step, often with **optional parts**, constraints, or order-sensitive assembly (focus: **construction process**).

You’ll often see **Abstract Factory + Builder** together: the abstract factory supplies compatible parts, while the builder assembles them into a finished car.

#### A simple Builder for cars

Let’s say a `Car` can have many optional features: engine, transmission, tires, infotainment, color, and safety package. Some combinations must be validated (e.g., Performance engine requires Sport tires).

```python
from dataclasses import dataclass
from typing import Optional

# Part interfaces

@dataclass(frozen=True)
class Engine:
    name: str
    hp: int

@dataclass(frozen=True)
class Transmission:
    type: str  # "manual" | "automatic"

@dataclass(frozen=True)
class Tires:
    name: str
    rating: str  # "touring" | "sport"

@dataclass(frozen=True)
class Infotainment:
    screen_in: float
    supports_carplay: bool

# Abstract car

@dataclass(frozen=True)
class Car:
    model: str
    engine: Engine
    transmission: Transmission
    tires: Tires
    color: str
    infotainment: Optional[Infotainment] = None
    safety_pkg: Optional[str] = None  # "standard" | "advanced" | None


class CarBuilder:
    def __init__(self, model: str):
        self._model = model
        self._engine: Optional[Engine] = None
        self._transmission: Optional[Transmission] = None
        self._tires: Optional[Tires] = None
        self._color: Optional[str] = None
        self._infotainment: Optional[Infotainment] = None
        self._safety_pkg: Optional[str] = None

    # Fluent steps
    def with_engine(self, name: str, hp: int):
        self._engine = Engine(name, hp)
        return self

    def with_transmission(self, type_: str):
        self._transmission = Transmission(type_)
        return self

    def with_tires(self, name: str, rating: str):
        self._tires = Tires(name, rating)
        return self

    def painted(self, color: str):
        self._color = color
        return self

    def with_infotainment(self, screen_in: float, supports_carplay: bool = True):
        self._infotainment = Infotainment(screen_in, supports_carplay)
        return self

    def with_safety(self, pkg: str):
        self._safety_pkg = pkg
        return self

    # Validation lives here
    def _validate(self):
        if not all([self._engine, self._transmission, self._tires, self._color]):
            raise ValueError("Engine, transmission, tires, and color are required")

        # Example cross-part constraints:
        if self._engine.hp >= 350 and self._tires.rating != "sport":
            raise ValueError("High-HP build requires sport tires")

        if self._transmission.type == "manual" and self._engine.name == "EV":
            raise ValueError("Manual transmission not available for EV")

    def build(self) -> Car:
        self._validate()
        return Car(
            model=self._model,
            engine=self._engine,               # type: ignore[arg-type]
            transmission=self._transmission,   # type: ignore[arg-type]
            tires=self._tires,                 # type: ignore[arg-type]
            color=self._color,                 # type: ignore[arg-type]
            infotainment=self._infotainment,
            safety_pkg=self._safety_pkg,
        )
```

**Usage:**

```python
sport_sedan = (
    CarBuilder("Falcon S")
    .with_engine("V6 Turbo", 380)
    .with_transmission("automatic")
    .with_tires("Eagle F1", "sport")
    .painted("Midnight Blue")
    .with_infotainment(12.0, True)
    .with_safety("advanced")
    .build()
)
```

#### Director (optional)

**Director** is not a design pattern, however, if you have repeated recipes (e.g., “base economy”, “performance pack”), a **Director** encodes the build steps.

```python
class CarDirector:
    def build_economy(self, model: str) -> Car:
        return (
            CarBuilder(model)
            .with_engine("I4", 150)
            .with_transmission("automatic")
            .with_tires("AllSeason", "touring")
            .painted("Silver")
            .with_safety("standard")
            .build()
        )

    def build_performance(self, model: str) -> Car:
        return (
            CarBuilder(model)
            .with_engine("V6 Turbo", 380)
            .with_transmission("automatic")
            .with_tires("Eagle F1", "sport")
            .painted("Red")
            .with_infotainment(12.0)
            .with_safety("advanced")
            .build()
        )
```

#### Builder + Abstract Factory: families of parts + assembly

**Abstract Factory** ensures compatible families of parts (e.g., **Eco** vs **Performance**). The **Builder** then assembles them into a car.

```python
from abc import ABC, abstractmethod

# ----- Abstract Factory for parts -----
class PartsFactory(ABC):
    @abstractmethod
    def create_engine(self) -> Engine: ...
    @abstractmethod
    def create_transmission(self) -> Transmission: ...
    @abstractmethod
    def create_tires(self) -> Tires: ...

class EcoPartsFactory(PartsFactory):
    def create_engine(self) -> Engine:
        return Engine("I4 Hybrid", 180)
    def create_transmission(self) -> Transmission:
        return Transmission("automatic")
    def create_tires(self) -> Tires:
        return Tires("EcoGrip", "touring")

class PerformancePartsFactory(PartsFactory):
    def create_engine(self) -> Engine:
        return Engine("V8 Supercharged", 520)
    def create_transmission(self) -> Transmission:
        return Transmission("automatic")
    def create_tires(self) -> Tires:
        return Tires("TrackMax", "sport")

# ----- Builder that can accept factory-provided parts -----
class FactoryAwareCarBuilder(CarBuilder):
    def with_parts_from(self, factory: PartsFactory):
        self._engine = factory.create_engine()
        self._transmission = factory.create_transmission()
        self._tires = factory.create_tires()
        return self

# Usage:
eco_car = (
    FactoryAwareCarBuilder("Falcon E")
    .with_parts_from(EcoPartsFactory())
    .painted("Pearl White")
    .with_safety("standard")
    .build()
)

track_car = (
    FactoryAwareCarBuilder("Falcon R")
    .with_parts_from(PerformancePartsFactory())
    .painted("Racing Yellow")
    .with_infotainment(10.0)
    .with_safety("advanced")
    .build()
)
```

Here the **Abstract Factory** guarantees consistent, compatible part families; the **Builder** controls assembly order/validation and optional features.

## 16.4 Structural Patterns

Structural patterns describe **how classes and objects can be combined** to form larger, more complex structures while keeping them **flexible, reusable, and efficient**. They help define **composition over inheritance**, which often leads to cleaner and more extensible designs.

### Adapter Pattern

The **Adapter Pattern** allows incompatible interfaces to work together. Think of it as a “translator” between two systems.

#### Example: Notification

Imagine you’re building a system that needs to **send notifications**.
Your app expects a `Notifier` interface, but you have multiple third-party services with very different APIs (e.g., Slack, Email, SMS).

Instead of rewriting your app for each provider, you write **adapters** to normalize them to a common interface.

**Step 1: Define a Common Interface**

```python
class Notifier:
    def send(self, message: str):
        raise NotImplementedError
```

**Step 2: Third-Party APIs (Incompatible Interfaces)**

```python
# Pretend this is a library you can't change
class SlackAPI:
    def post_message(self, channel: str, text: str):
        print(f"[Slack] #{channel}: {text}")

class EmailAPI:
    def send_email(self, to: str, subject: str, body: str):
        print(f"[Email] To:{to} | {subject}: {body}")
```

Notice:

* Slack wants `(channel, text)`
* Email wants `(to, subject, body)`
* Neither matches `Notifier.send(message)`.

**Step 3: Create Adapters**

```python
class SlackAdapter(Notifier):
    def __init__(self, slack_api: SlackAPI, channel: str):
        self.slack_api = slack_api
        self.channel = channel

    def send(self, message: str):
        self.slack_api.post_message(self.channel, message)


class EmailAdapter(Notifier):
    def __init__(self, email_api: EmailAPI, recipient: str):
        self.email_api = email_api
        self.recipient = recipient

    def send(self, message: str):
        subject = "Notification"
        self.email_api.send_email(self.recipient, subject, message)
```

**Step 4: Client Code (No Changes!)**

```python
def notify_all(notifiers: list[Notifier], message: str):
    for notifier in notifiers:
        notifier.send(message)

# Usage
slack = SlackAdapter(SlackAPI(), channel="dev-team")
email = EmailAdapter(EmailAPI(), recipient="admin@example.com")

notifiers = [slack, email]
notify_all(notifiers, "Adapter Pattern makes integrations easy!")
```

**Output**

```
[Slack] #dev-team: Adapter Pattern makes integrations easy!
[Email] To:admin@example.com | Notification: Adapter Pattern makes integrations easy!
```

**Why is this usable?**

* **Decouples your app** from third-party APIs.
* You can **swap providers** without changing your core logic.
* Works in real-life systems: integrating **payment gateways, APIs, cloud services**, etc.
* Client code (`notify_all`) doesn’t care where the message goes — Slack, Email, SMS, or something new.

### Decorator Pattern

The **Decorator Pattern** lets you dynamically **add behavior** to an object **without modifying its class**.
Think of it like “wrapping” an object with extra functionality.

#### Example: File Reader

Imagine you’re building a **file reader** system.
You want to support **basic file reading**, but also be able to:

* **Encrypt/Decrypt** the data
* **Compress/Decompress** the data
* **Log** whenever a file is accessed

Instead of stuffing all of that into one `FileReader`, you build decorators.

**Step 1: Define a Common Interface**

```python
class DataSource:
    def read(self) -> str:
        raise NotImplementedError
```

**Step 2: Concrete Implementation**

```python
class FileDataSource(DataSource):
    def __init__(self, filename: str):
        self.filename = filename

    def read(self) -> str:
        with open(self.filename, "r") as f:
            return f.read()
```

**Step 3: Base Decorator**

```python
class DataSourceDecorator(DataSource):
    def __init__(self, wrappee: DataSource):
        self.wrappee = wrappee

    def read(self) -> str:
        return self.wrappee.read()
```

This ensures all decorators behave like a `DataSource`.

**Step 4: Concrete Decorators**

```python
class EncryptionDecorator(DataSourceDecorator):
    def read(self) -> str:
        data = self.wrappee.read()
        return "".join(chr(ord(c) + 1) for c in data)  # simple shift encryption


class CompressionDecorator(DataSourceDecorator):
    def read(self) -> str:
        data = self.wrappee.read()
        return data.replace(" ", "")  # naive "compression"


class LoggingDecorator(DataSourceDecorator):
    def read(self) -> str:
        print(f"[LOG] Reading from {self.wrappee.__class__.__name__}")
        return self.wrappee.read()
```

**Step 5: Client Code**

```python
# Suppose "example.txt" contains: "hello world"
source = FileDataSource("example.txt")

# Add decorators dynamically
decorated = LoggingDecorator(
    CompressionDecorator(
        EncryptionDecorator(source)
    )
)

print(decorated.read())
```

**Output**

```bash
[LOG] Reading from EncryptionDecorator
ifmmpxpsme   # "hello world" encrypted and compressed
```

**Why is this usable?**

* You can **stack behaviors dynamically** at runtime.
* Each decorator adds a feature (logging, compression, encryption) without touching `FileDataSource`.
* You can reconfigure: maybe just logging, maybe logging + compression, etc.


### Composite Pattern

The **Composite Pattern** lets you treat **individual objects (leaves)** and **groups of objects (composites)** **uniformly**. You define a common interface so a client can call the same methods on a single item or a whole tree of items. It’s perfect for **hierarchies** like file systems, UI widgets, BOMs (bill of materials), and workflow step groups.

#### Example 1: Car Parts BOM (Cost & Weight Aggregation)

**Goal:** compute **total cost** and **total weight** of a car from nested assemblies (engine, chassis, wheels…), where each assembly can contain parts or other assemblies.

```python
from abc import ABC, abstractmethod
from typing import List

# ----- 1) Component -----
class CarComponent(ABC):
    @abstractmethod
    def total_cost(self) -> float: ...
    @abstractmethod
    def total_weight(self) -> float: ...
    @abstractmethod
    def describe(self, indent: int = 0) -> str: ...

# ----- 2) Leaf -----
class Part(CarComponent):
    def __init__(self, name: str, cost: float, weight: float):
        self.name = name
        self._cost = cost
        self._weight = weight

    def total_cost(self) -> float:
        return self._cost

    def total_weight(self) -> float:
        return self._weight

    def describe(self, indent: int = 0) -> str:
        pad = " " * indent
        return f"{pad}- Part: {self.name} | cost=${self._cost:.2f}, weight={self._weight:.1f}kg"

# ----- 3) Composite -----
class Assembly(CarComponent):
    def __init__(self, name: str):
        self.name = name
        self._children: List[CarComponent] = []

    def add(self, component: CarComponent) -> None:
        self._children.append(component)

    def remove(self, component: CarComponent) -> None:
        self._children.remove(component)

    def total_cost(self) -> float:
        return sum(c.total_cost() for c in self._children)

    def total_weight(self) -> float:
        return sum(c.total_weight() for c in self._children)

    def describe(self, indent: int = 0) -> str:
        pad = " " * indent
        lines = [f"{pad}+ Assembly: {self.name}"]
        for c in self._children:
            lines.append(c.describe(indent + 2))
        return "\n".join(lines)

# ---- Usage ---------------------------------------------------------
if __name__ == "__main__":
    # Leaves
    piston = Part("Piston", 40.0, 1.2)
    spark_plug = Part("Spark Plug", 8.0, 0.1)
    block = Part("Engine Block", 500.0, 90.0)
    wheel = Part("Wheel", 120.0, 12.0)

    # Sub-assemblies
    cylinder = Assembly("Cylinder")
    cylinder.add(piston)
    cylinder.add(spark_plug)

    engine = Assembly("Engine")
    engine.add(block)
    engine.add(cylinder)

    wheels = Assembly("Wheel Set")
    for _ in range(4):
        wheels.add(wheel)

    # Top-level assembly (car)
    car = Assembly("Car")
    car.add(engine)
    car.add(wheels)

    print(car.describe())
    print(f"\nTOTAL COST:  ${car.total_cost():.2f}")
    print(f"TOTAL WEIGHT: {car.total_weight():.1f} kg")
```

**Why this is useful**

* You can **nest** as deep as needed.
* The client doesn’t care if it’s a `Part` or `Assembly`; it calls `total_cost()` either way.
* Adding/removing parts doesn’t require changing the aggregation logic.

#### Example 2: Workflow Engine — Grouping Tasks

Goal: compose **tasks** into **sequences** (or even trees) and execute them with a single `run()` call. Each task returns a result; groups aggregate results.

```python
from abc import ABC, abstractmethod
from typing import Any, List

# 1) Component
class Task(ABC):
    @abstractmethod
    def run(self) -> Any: ...

# 2) Leaf Task
class PrintTask(Task):
    def __init__(self, message: str):
        self.message = message

    def run(self) -> str:
        # Side-effect could be logging, HTTP call, etc.
        output = f"[PrintTask] {self.message}"
        print(output)
        return output

# Another leaf
class AddTask(Task):
    def __init__(self, a: int, b: int):
        self.a, self.b = a, b

    def run(self) -> int:
        return self.a + self.b

# 3) Composite (sequence of tasks)
class TaskGroup(Task):
    def __init__(self, name: str):
        self.name = name
        self._children: List[Task] = []

    def add(self, task: Task) -> None:
        self._children.append(task)

    def remove(self, task: Task) -> None:
        self._children.remove(task)

    def run(self) -> List[Any]:
        results = []
        print(f"[TaskGroup] Starting: {self.name}")
        for t in self._children:
            results.append(t.run())
        print(f"[TaskGroup] Finished: {self.name}")
        return results

# ---- Usage ---------------------------------------------------------
if __name__ == "__main__":
    t1 = PrintTask("Validate input")
    t2 = AddTask(40, 2)
    t3 = PrintTask("Persist to DB")

    sub_pipeline = TaskGroup("Preprocess")
    sub_pipeline.add(t1)
    sub_pipeline.add(t2)

    pipeline = TaskGroup("Main Workflow")
    pipeline.add(sub_pipeline)
    pipeline.add(t3)

    all_results = pipeline.run()
    print("Results:", all_results)
```

**Why this is useful**

* A **single interface** (`Task.run`) for both simple tasks and grouped tasks.
* You can **nest groups** and plug them together to form complex workflows.
* Easy to extend: add parallel groups, conditional groups, retries, etc., without changing client code.

### Proxy Pattern

The **Proxy Pattern** provides a surrogate or placeholder object that controls access to another object. Instead of calling the real object directly, clients interact with the proxy, which decides how and when to delegate requests.

This is especially useful when:

* You want to **add access control** (authorization, rate limiting).
* You want to **lazy-load heavy resources** (database connections, APIs).
* You want to **add caching or logging** without modifying the real object.

#### Example: Secured Task Execution

Imagine a workflow engine that executes tasks. Some tasks may require **special authorization** or **restricted access** (e.g., “Approve Payment”).

```python
# filename: workflow/proxy_pattern.py
from abc import ABC, abstractmethod


class Task(ABC):
    """Abstract base class for workflow tasks."""

    @abstractmethod
    def execute(self, user: str) -> str:
        """Execute the task with the given user context."""
        raise NotImplementedError


class RealTask(Task):
    """The real implementation of a workflow task."""

    def __init__(self, name: str) -> None:
        self.name = name

    def execute(self, user: str) -> str:
        return f"Task '{self.name}' executed by {user}..."


class TaskProxy(Task):
    """Proxy for Task that enforces role-based access."""

    def __init__(self, real_task: RealTask, allowed_roles: list[str]) -> None:
        self._real_task = real_task
        self._allowed_roles = allowed_roles

    def execute(self, user: str, role: str | None = None) -> str:
        if role not in self._allowed_roles:
            return f"Access denied for {user} with role={role}!"
        return self._real_task.execute(user)

if __name__ == "__main__":
    approve_payment = RealTask("Approve Payment")
    proxy = TaskProxy(approve_payment, allowed_roles=["Manager", "Admin"])

    print(proxy.execute("Alice", role="Employee"))
    print(proxy.execute("Bob", role="Manager"))
```

**Output:**

```
Access denied for Alice with role=Employee!
Task 'Approve Payment' executed by Bob...
```

**Why Proxy Works Well Here**

* The client code (`workflow engine`) doesn’t know whether it’s using a real task or a proxy.
* Security checks (roles) are **separated from business logic**.
* You can easily extend proxies for **logging, caching, or monitoring** without changing `RealTask`.

## 16.5 Behavioral Patterns

**Behavioral design patterns** focus on **how objects interact and communicate**.
They define **responsibilities, control flow, and message passing** between objects.

Whereas creational patterns deal with **object creation** and structural patterns deal with **object composition**, **behavioral patterns** ensure that **work gets done in flexible and reusable ways**.

### Chain of Responsibility

The **Chain of Responsibility (CoR)** pattern is a **behavioral design pattern** that allows a request to be **passed along a chain of handlers**, where each handler decides **whether to process it** or **pass it to the next handler**.

* **Problem it solves:**
  Avoids hardcoding request handling logic into one giant method. Instead, responsibility is spread across independent handlers.
* **When to use:**
  * Processing pipelines (e.g., car assembly steps).
  * Event handling systems.
  * Request validation / middleware (like in web servers).
  * Workflow orchestration (different actions depending on context).

#### Example: Workflow Engine

In a **Workflow Engine** a request moves through multiple processors — *authentication*, *validation*, *execution*, *logging*. Each processor either handles or forwards the request.

```python
class WorkflowHandler(ABC):
    def __init__(self, next_handler=None):
        self.next_handler = next_handler

    @abstractmethod
    def handle(self, request: dict) -> dict:
        pass


class AuthHandler(WorkflowHandler):
    def handle(self, request: dict) -> dict:
        if not request.get("authenticated", False):
            raise Exception("User not authenticated!")
        print("Authentication passed")
        return self.next_handler.handle(request) if self.next_handler else request


class ValidationHandler(WorkflowHandler):
    def handle(self, request: dict) -> dict:
        if "query" not in request:
            raise Exception("Invalid request: missing query!")
        print("Request validated")
        return self.next_handler.handle(request) if self.next_handler else request


class ExecutionHandler(WorkflowHandler):
    def handle(self, request: dict) -> dict:
        request["results"] = ["case-1", "case-2"]
        print("Workflow executed, results attached")
        return request


if __name__ == "__main__":
    chain = AuthHandler(ValidationHandler(ExecutionHandler()))

    request = {"authenticated": True, "query": "find cases"}
    response = chain.handle(request)
    print("Final Response:", response)
```

**Output:**

```
Authentication passed
Request validated
Workflow executed, results attached
Final Response: {'authenticated': True, 'query': 'find cases', 'results': ['case-1', 'case-2']}
```

All the middlewares used in the chain to process the request execute sequentially. The final response is a transformed request.

### Observer Pattern

The **Observer Pattern** is a **behavioral design pattern** where an object, called the **Subject**, maintains a list of dependents, called **Observers**, and automatically **notifies them of state changes**.

* **Problem it solves:**
  Keeps objects **loosely coupled**. The subject doesn’t need to know about the observers’ implementation, only that they implement a `notify` method (or equivalent).
* **When to use:**
  * GUI frameworks (update UI when model changes).
  * Event-driven systems (pub/sub).
  * Workflow orchestration engines (notify subscribers when a job’s state changes).
  * Monitoring systems (alert observers on new events).

#### Example: Workflow Orchestration Notifications

Imagine a **workflow engine** where tasks execute, and multiple subsystems (UI, logging, monitoring) need updates whenever a task finishes. Instead of tightly coupling task execution with all those systems, we use the **Observer Pattern**.

```python
from abc import ABC, abstractmethod


# --- Subject (Publisher) ---
class WorkflowTask:
    def __init__(self, name: str):
        self.name = name
        self._observers = []

    def attach(self, observer: "Observer"):
        self._observers.append(observer)

    def detach(self, observer: "Observer"):
        self._observers.remove(observer)

    def notify(self, status: str):
        for observer in self._observers:
            observer.update(self.name, status)

    def run(self):
        print(f"Running task: {self.name}")
        # Simulate execution
        self.notify("started")
        self.notify("completed")


# --- Observer Interface ---
class Observer(ABC):
    @abstractmethod
    def update(self, task_name: str, status: str):
        pass


# --- Concrete Observers ---
class LoggerObserver(Observer):
    def update(self, task_name: str, status: str):
        print(f"[Logger] Task {task_name} -> {status}")


class UIObserver(Observer):
    def update(self, task_name: str, status: str):
        print(f"[UI] Updating dashboard: Task {task_name} is {status}")


class AlertObserver(Observer):
    def update(self, task_name: str, status: str):
        if status == "completed":
            print(f"[Alert] Task {task_name} finished successfully!")


# --- Usage Example ---
if __name__ == "__main__":
    task = WorkflowTask("Data Ingestion")

    # Attach observers
    task.attach(LoggerObserver())
    task.attach(UIObserver())
    task.attach(AlertObserver())

    # Run task
    task.run()
```

**Output:**

```bash
️Running task: Data Ingestion
[Logger] Task Data Ingestion -> started
[UI] Updating dashboard: Task Data Ingestion is started
[Logger] Task Data Ingestion -> completed
[UI] Updating dashboard: Task Data Ingestion is completed
[Alert] Task Data Ingestion finished successfully!
```

**Key Benefits:**

- **Loose coupling** — Subject knows nothing about observers’ internal logic.
- **Dynamic subscription** — Observers can subscribe/unsubscribe at runtime.
- **Scalability** — Multiple observers can react to the same event independently.

### Strategy Pattern

The **Strategy Pattern** is a **behavioral design pattern** that defines a family of algorithms, encapsulates each one, and makes them interchangeable. The client code can choose which strategy to use at runtime, without changing the logic of the client itself.

* **Problem it solves:**
  Avoids hard-coding a specific algorithm into a class, allowing the algorithm to be swapped out dynamically.
* **When to use:**
  * Choosing different scheduling strategies (e.g., parallel vs sequential).
  * Switching between different pricing models (e.g., flat rate vs tiered).
  * Selecting different sorting algorithms (e.g., quicksort vs mergesort).

#### Example: Workflow Engine (Parallel vs Sequential Execution)

Imagine a workflow orchestration system where tasks can be executed **sequentially** or **in parallel**. Instead of hardcoding execution logic into the workflow, we define a **Strategy interface** and multiple implementations.

```python
from abc import ABC, abstractmethod
import asyncio
import time


# --- Strategy Interface ---
class ExecutionStrategy(ABC):
    @abstractmethod
    def execute(self, tasks):
        pass


# --- Concrete Strategies ---
class SequentialExecution(ExecutionStrategy):
    def execute(self, tasks):
        print("Running tasks sequentially...")
        start = time.perf_counter()
        results = []
        for task in tasks:
            results.append(task())
        elapsed = time.perf_counter() - start
        return results, elapsed


class ParallelExecution(ExecutionStrategy):
    def execute(self, tasks):
        print("Running tasks in parallel with asyncio...")
        async def runner():
            start = time.perf_counter()
            coroutines = [asyncio.to_thread(task) for task in tasks]
            results = await asyncio.gather(*coroutines)
            elapsed = time.perf_counter() - start
            return results, elapsed

        return asyncio.run(runner())


# --- Context (Workflow Engine) ---
class WorkflowEngine:
    def __init__(self, strategy: ExecutionStrategy):
        self.strategy = strategy

    def set_strategy(self, strategy: ExecutionStrategy):
        self.strategy = strategy

    def run(self, tasks):
        return self.strategy.execute(tasks)


# --- Example Tasks ---
def task_a():
    print("Task A running...")
    time.sleep(1)
    return "Result A"

def task_b():
    print("Task B running...")
    time.sleep(2)
    return "Result B"

def task_c():
    print("Task C running...")
    time.sleep(1)
    return "Result C"


# --- Usage Example ---
if __name__ == "__main__":
    tasks = [task_a, task_b, task_c]

    engine = WorkflowEngine(SequentialExecution())
    seq_results, seq_time = engine.run(tasks)
    print(f"Sequential Results: {seq_results}, Time: {seq_time:.2f}s")
    # Reuse the same engine by change the strategy
    engine.set_strategy(ParallelExecution())
    par_results, par_time = engine.run(tasks)
    print(f"Parallel Results: {par_results}, Time: {par_time:.2f}s")
```

**Output:**

```bash
Running tasks sequentially...
Task A running...
Task B running...
Task C running...
Sequential Results: ['Result A', 'Result B', 'Result C'], Time: 4.01s
Running tasks in parallel with asyncio...
Task A running...
Task B running...
Task C running...

Parallel Results: ['Result A', 'Result B', 'Result C'], Time: 2.01s
```

**Key Benefits**

- **Interchangeable execution strategies** (sequential vs parallel).
- **Open/Closed Principle** — new strategies can be added without modifying existing code.
- **Flexible workflows** — engine can switch strategies at runtime.

### Command Pattern

The **Command Pattern** encapsulates a request as an object so you can **queue**, **log**, **undo/redo**, or **defer** operations without the caller needing to know how they’re performed.

* **Problem it solves:** Decouples *what* needs to be done (a request) from *how/when/where* it’s executed.
* **When to use:**
  * You need **undo/redo** (editors, financial adjustments).
  * You want to **queue** work (background runners, schedulers).
  * You want to **audit/log** actions (compliance, ops).
  * You want to **script/macro** sequences (batch actions).

**Roles:**
* **Command**: Interface with `execute()` (optionally `undo()`).
* **ConcreteCommand**: Implements the request.
* **Receiver**: The thing that actually does the work.
* **Invoker**: Triggers the command (can queue, schedule).
* **Client**: Builds the command and hands it to the invoker.

#### Example: Workflow Engine Commands (Run, Cancel, Retry) with Queue + Undo

Below is a minimal but *useful* example that would fit a workflow orchestration engine. We’ll support:

* **RunTask**, **CancelTask**, **RetryTask**
* A **CommandBus** (Invoker) that can execute immediately or **enqueue**
* A **history stack** for **undo**
* A **MacroCommand** for batching

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, List, Optional
import queue
import threading
import time


# ----- Receiver ---------------------------------------------------------------
class TaskRunner:
    """Receiver: knows how to run/cancel/retry tasks."""
    def __init__(self):
        self.state: Dict[str, str] = {}  # task_id -> status (e.g., "PENDING", "RUNNING", "DONE", "CANCELLED", "FAILED")

    def run(self, task_id: str) -> str:
        self.state[task_id] = "RUNNING"
        # Simulate work
        time.sleep(0.1)
        self.state[task_id] = "DONE"
        return f"Task {task_id} completed"

    def cancel(self, task_id: str) -> str:
        if self.state.get(task_id) in {"PENDING", "RUNNING"}:
            self.state[task_id] = "CANCELLED"
            return f"Task {task_id} cancelled"
        return f"Task {task_id} not cancellable"

    def retry(self, task_id: str) -> str:
        # If failed, retry; otherwise noop for demo
        if self.state.get(task_id) == "FAILED":
            return self.run(task_id)
        return f"Task {task_id} not in FAILED state"


# ----- Command Interface ------------------------------------------------------
class Command(ABC):
    @abstractmethod
    def execute(self, runner: TaskRunner) -> Any: ...

    def undo(self, runner: TaskRunner) -> None:
        """Optional: not all commands need undo, but we support it when it makes sense."""
        pass


# ----- Concrete Commands ------------------------------------------------------
@dataclass
class RunTaskCommand(Command):
    task_id: str
    _prev_state: Optional[str] = None

    def execute(self, runner: TaskRunner) -> str:
        self._prev_state = runner.state.get(self.task_id)
        return runner.run(self.task_id)

    def undo(self, runner: TaskRunner) -> None:
        # For demo: restore previous state (a lightweight "memento")
        if self._prev_state is None:
            runner.state.pop(self.task_id, None)
        else:
            runner.state[self.task_id] = self._prev_state


@dataclass
class CancelTaskCommand(Command):
    task_id: str
    _prev_state: Optional[str] = None

    def execute(self, runner: TaskRunner) -> str:
        self._prev_state = runner.state.get(self.task_id)
        return runner.cancel(self.task_id)

    def undo(self, runner: TaskRunner) -> None:
        if self._prev_state is None:
            runner.state.pop(self.task_id, None)
        else:
            runner.state[self.task_id] = self._prev_state


@dataclass
class RetryTaskCommand(Command):
    task_id: str
    _prev_state: Optional[str] = None

    def execute(self, runner: TaskRunner) -> str:
        self._prev_state = runner.state.get(self.task_id)
        return runner.retry(self.task_id)

    def undo(self, runner: TaskRunner) -> None:
        if self._prev_state is None:
            runner.state.pop(self.task_id, None)
        else:
            runner.state[self.task_id] = self._prev_state


# ----- Macro (Composite) Command ---------------------------------------------
@dataclass
class MacroCommand(Command):
    commands: List[Command]

    def execute(self, runner: TaskRunner) -> List[Any]:
        results = []
        for cmd in self.commands:
            results.append(cmd.execute(runner))
        return results

    def undo(self, runner: TaskRunner) -> None:
        # Undo in reverse order
        for cmd in reversed(self.commands):
            cmd.undo(runner)


# ----- Invoker: CommandBus ----------------------------------------------------
class CommandBus:
    """Invoker: can execute commands now, or enqueue them for worker threads."""
    def __init__(self, runner: TaskRunner):
        self.runner = runner
        self.history: List[Command] = []
        self.q: "queue.Queue[Command]" = queue.Queue()
        self._stop = threading.Event()
        self._worker: Optional[threading.Thread] = None

    # Immediate execution (returns result)
    def dispatch(self, cmd: Command) -> Any:
        result = cmd.execute(self.runner)
        self.history.append(cmd)
        return result

    # Enqueue for background worker
    def enqueue(self, cmd: Command) -> None:
        self.q.put(cmd)

    def start_worker(self) -> None:
        if self._worker and self._worker.is_alive():
            return

        def worker():
            while not self._stop.is_set():
                try:
                    cmd = self.q.get(timeout=0.1)
                except queue.Empty:
                    continue
                cmd.execute(self.runner)
                self.history.append(cmd)
                self.q.task_done()

        self._worker = threading.Thread(target=worker, daemon=True)
        self._worker.start()

    def stop_worker(self) -> None:
        self._stop.set()
        if self._worker:
            self._worker.join(timeout=1)

    def undo_last(self) -> None:
        if not self.history:
            return
        cmd = self.history.pop()
        cmd.undo(self.runner)

# ----- Usage ------------------------------------------------------------------
if __name__ == "__main__":
    runner = TaskRunner()
    bus = CommandBus(runner)

    # Immediate execution
    print(bus.dispatch(RunTaskCommand("task-1")))     # -> Task task-1 completed
    print(bus.dispatch(CancelTaskCommand("task-1")))  # -> Task task-1 cancelled

    # Undo the last action (cancel)
    bus.undo_last()
    print("State after undo:", runner.state["task-1"])  # Restored state

    # Batch/macro (e.g., mass operations)
    macro = MacroCommand([
        RunTaskCommand("job-100"),
        RunTaskCommand("job-101"),
        CancelTaskCommand("job-100"),
    ])
    print(bus.dispatch(macro))  # list of results

    # Queue + background worker
    bus.start_worker()
    for i in range(3):
        bus.enqueue(RunTaskCommand(f"job-{i}"))
    bus.q.join()
    bus.stop_worker()

    print("Final state:", runner.state)
```

**Output:**

```bash
Task task-1 completed
Task task-1 not cancellable
State after undo: DONE
['Task job-100 completed', 'Task job-101 completed', 'Task job-100 not cancellable']
Final state: {'task-1': 'DONE', 'job-100': 'DONE', 'job-101': 'DONE', 'job-0': 'DONE', 'job-1': 'DONE', 'job-2': 'DONE'}
```

### Visitor Pattern

The **Visitor Pattern** is a **behavioral design pattern** that allows you to add new operations to a group of related objects without modifying their classes.

Instead of embedding multiple operations inside each class, you define a separate **visitor** object that "visits" elements of your object structure and performs actions on them.

This pattern is especially useful when:

* You have a complex **hierarchy of objects** (like AST nodes, file system objects, workflow steps).
* You want to **separate algorithms from the object structure**.
* You want to add new operations **without altering existing classes**.

#### Structure

1. **Element (interface/protocol)**
   Defines an `accept(visitor)` method that accepts a visitor.
2. **Concrete Elements**
   Implement the `accept` method, passing themselves to the visitor.
3. **Visitor (interface/protocol)**
   Declares a set of visit methods for each element type.
4. **Concrete Visitor**
   Implements operations that should be applied to elements.

#### Example: An Expression Tree (AST) with Multiple Visitors

We’ll build a small arithmetic expression tree with nodes like `Number`, `Var`, `Add`, and `Mul`. Then we’ll write three visitors:

1. **Evaluator**: computes the numeric result using a variable environment.
2. **PrettyPrinter**: produces a human-readable string.
3. **NodeCounter**: counts nodes for diagnostics.

**1) Node hierarchy (the “elements”)**

```python
from dataclasses import dataclass
from abc import ABC, abstractmethod
from typing import Any, Dict

# ----- Element interface ------------------------------------------------------
class Expr(ABC):
    @abstractmethod
    def accept(self, visitor: "Visitor") -> Any:
        ...

# ----- Concrete nodes ---------------------------------------------------------
@dataclass(frozen=True)
class Number(Expr):
    value: float
    def accept(self, visitor: "Visitor") -> Any:
        return visitor.visit_Number(self)

@dataclass(frozen=True)
class Var(Expr):
    name: str
    def accept(self, visitor: "Visitor") -> Any:
        return visitor.visit_Var(self)

@dataclass(frozen=True)
class Add(Expr):
    left: Expr
    right: Expr
    def accept(self, visitor: "Visitor") -> Any:
        return visitor.visit_Add(self)

@dataclass(frozen=True)
class Mul(Expr):
    left: Expr
    right: Expr
    def accept(self, visitor: "Visitor") -> Any:
        return visitor.visit_Mul(self)
```

> Each node implements `accept(self, visitor)` and forwards control to a type-specific `visitor.visit_<ClassName>(self)` method. That’s the **double-dispatch**: the runtime type of the node picks which visitor method to run.

**2) Visitor base class with safe fallback**

```python
class Visitor(ABC):
    """Base visitor with a safe fallback."""
    def generic_visit(self, node: Expr) -> Any:
        raise NotImplementedError(f"No visit method for {type(node).__name__}")

    # Optional: generic dispatcher if a node forgets to override accept()
    def visit(self, node: Expr) -> Any:
        meth_name = f"visit_{type(node).__name__}"
        meth = getattr(self, meth_name, self.generic_visit)
        return meth(node)
```

> Our nodes call `visit_*` directly. The `visit()` helper is handy if you have nodes that don’t implement `accept()` (or for internal recursion).

**3) Concrete visitors**

- **Evaluator**: compute value with variables

```python
class Evaluator(Visitor):
    def __init__(self, env: Dict[str, float] | None = None):
        self.env = env or {}

    def visit_Number(self, node: Number) -> float:
        return node.value

    def visit_Var(self, node: Var) -> float:
        if node.name not in self.env:
            raise NameError(f"Undefined variable: {node.name}")
        return self.env[node.name]

    def visit_Add(self, node: Add) -> float:
        return node.left.accept(self) + node.right.accept(self)

    def visit_Mul(self, node: Mul) -> float:
        return node.left.accept(self) * node.right.accept(self)
```

- **PrettyPrinter**: generate a readable string

```python
class PrettyPrinter(Visitor):
    def visit_Number(self, node: Number) -> str:
        # Render integers nicely (no trailing .0)
        v = int(node.value) if node.value.is_integer() else node.value
        return str(v)

    def visit_Var(self, node: Var) -> str:
        return node.name

    def visit_Add(self, node: Add) -> str:
        return f"({node.left.accept(self)} + {node.right.accept(self)})"

    def visit_Mul(self, node: Mul) -> str:
        # Multiplication binds tighter than addition, but we’re simple here
        return f"({node.left.accept(self)} * {node.right.accept(self)})"
```

- **NodeCounter**: tally nodes (useful for diagnostics or cost models)

```python
class NodeCounter(Visitor):
    def __init__(self):
        self.counts: Dict[str, int] = {}

    def _bump(self, cls_name: str):
        self.counts[cls_name] = self.counts.get(cls_name, 0) + 1

    def visit_Number(self, node: Number) -> int:
        self._bump("Number")
        return 1

    def visit_Var(self, node: Var) -> int:
        self._bump("Var")
        return 1

    def visit_Add(self, node: Add) -> int:
        self._bump("Add")
        return 1 + node.left.accept(self) + node.right.accept(self)

    def visit_Mul(self, node: Mul) -> int:
        self._bump("Mul")
        return 1 + node.left.accept(self) + node.right.accept(self)
```

- Using the visitors on a nested structure

Let’s build an expression:

$(2 + x) \times (3 + 4)$

```python
# Build a nested AST
ast = Mul(
    Add(Number(2), Var("x")),
    Add(Number(3), Number(4))
)

# Pretty print
pp = PrettyPrinter()
print("Expr:", ast.accept(pp))
# -> Expr: ((2 + x) * (3 + 4))

# Evaluate with a variable environment
ev = Evaluator({"x": 10})
print("Value:", ast.accept(ev))
# -> Value: 2 + 10 = 12; 3 + 4 = 7; 12 * 7 = 84

# Count nodes
nc = NodeCounter()
total = ast.accept(nc)
print("Total nodes:", total, "| breakdown:", nc.counts)
```

**Variations & Pythonic Notes**

* **Fallback dispatch**: Our `Visitor.generic_visit()` and `Visitor.visit()` give you a safe default and a reflective dispatcher.
* **`functools.singledispatch` alternative**: You can implement visitor-like logic with `@singledispatch` functions on node types—handy when you don’t control the node classes, but you’ll lose the explicit `accept()` double dispatch.
* **Immutability**: The example uses `@dataclass(frozen=True)` for nodes—this makes ASTs safer to share and reason about.
* **Graphs vs Trees**: Visitor is simplest on trees. For DAGs, ensure you don’t **revisit** nodes accidentally (cache/memoize by node id) if that matters.



## 16.6 Conclusion

In this chapter, you explored the three major families of design patterns — **Creational, Structural, and Behavioral** — and saw how they apply directly to real-world Python development.

* **Creational patterns** (Singleton, Factory, Abstract Factory, Builder) let you separate **object creation** from **object usage**, improving flexibility and testability.
* **Structural patterns** (Adapter, Decorator, Composite, Proxy) help you assemble larger systems from smaller components, while keeping code extensible and reusable.
* **Behavioral patterns** (Chain of Responsibility, Observer, Strategy, Command) define **interaction rules** between objects, giving you cleaner, more maintainable workflows.

Design patterns are not rigid “rules.” They are **guides** that help you recognize common problems and apply proven solutions. As you build larger Python systems—especially frameworks, workflow engines, or distributed systems—you’ll find yourself returning to these patterns again and again.

## 16.7 Chapter Assignment: Workflow Engine with Patterns

In this assignment you’ll extend your Docker runner into a **mini workflow engine** that demonstrates how multiple design patterns (Command, Strategy, Chain of Responsibility, Observer) fit together.

### Requirements

1. **Tasks as Commands**
   * Implement at least two tasks that wrap your existing Docker runners:
     * `RunPythonTask` (runs a `.py` script inside a Python container).
     * `RunJavaScriptTask` (runs a `.js` script inside a Node.js container).
   * Each task should implement a common `Task` interface with an `execute(context)` method.
2. **Execution Strategies (Strategy Pattern)**
   * Implement two workflow execution strategies:
     * **Sequential**: tasks run one after the other.
     * **Parallel (asyncio)**: tasks run concurrently.
   * Let the user choose the strategy when starting the workflow.
3. **Pipeline (Chain of Responsibility)**
   * Before running tasks, all requests should pass through a pipeline of handlers:
     * **AuthHandler** (checks for an API key in the context).
     * **ValidationHandler** (ensures script paths exist).
     * **LoggingHandler** (logs before/after execution).
   * If any handler fails, stop the workflow.
4. **Observers**
   * Implement observers such as:
     * `LoggerObserver`: prints events to the console.
     * `FileObserver`: writes task events to a log file.
   * Observers should be notified whenever a task starts or completes.
5. **Workflow Context**
   * Store data (e.g. paths, environment vars, execution results) in a shared context dictionary.
   * Ensure one task’s output can be added to the context and used by the next.

### Hints

* Start with a `Task` base class or ABC, then subclass it for Python/JS tasks.
* Use `asyncio.gather()` for parallel execution.
* Chain of Responsibility can be implemented by linking handlers together: each calls `next.handle(context)` if successful.
* Observers are just listeners attached to the workflow engine. Call `observer.update(event)` whenever a task changes state.
* Use your existing Docker runner code for the core `execute()` logic of each task.
* Keep the workflow small (2–3 tasks) so you can run it end-to-end in under a minute.
