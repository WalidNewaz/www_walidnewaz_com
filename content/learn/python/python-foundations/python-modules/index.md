---
featured: false
date: "2023-11-20"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "13. 3rd Party Python Modules, and Publishing Modules"

title: "Python Modules"
description: "Python’s true power lies in its vast ecosystem of third-party packages, enabling developers to quickly build applications without reinventing the wheel. This chapter teaches you how to work with 3rd party libraries, create your own Python package, understand dependencies and version management."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["Modules", "Python"]
---

# Chapter 13: Using 3rd Party Python Modules, and Publishing Your Own Modules

Python’s true power lies in its vast ecosystem of third-party packages, enabling developers to quickly build applications without reinventing the wheel. This chapter will teach you how to:

* Install and use third-party packages from PyPI
* Understand dependency and version management
* Explore popular third-party modules
* Create your own Python package
* Publish your package to PyPI

## 13.1 Installing and Using 3rd Party Modules

Python comes with a **batteries-included** philosophy — its standard library provides modules for files, networking, math, concurrency, and more. However, real-world development almost always requires **third-party packages**: reusable libraries published by other developers to **extend Python’s capabilities**.

Examples include:

* **Requests** for making HTTP requests.
* **Pandas** for data analysis.
* **Flask / FastAPI / Django** for building web apps.
* **Pydantic** for data validation.
* **Numpy** for numerical computing.

These libraries are distributed through the **Python Package Index (PyPI)** and installed using **pip**, Python’s package manager.

### Installing Packages with pip

To install a package, use the `pip install` command:

```bash
# Install the popular "requests" HTTP library
pip install requests
```

This will:

1. Download the latest version of `requests` from PyPI.
2. Install it into your current Python environment.

### Specifying Versions

For reproducibility, it’s often better to lock versions:

```bash
# Install exactly version 2.28.1
pip install requests==2.28.1

# Install any version >=2.0 but <3.0
pip install "requests>=2.0,<3.0"
```

### Importing and Using Installed Modules

Once installed, you can use the module with a standard `import`:

```python
import requests

response = requests.get("https://api.github.com")
print("Status code:", response.status_code)
print("Headers:", response.headers["content-type"])
print("Body:", response.json())
```

Here:

* `requests.get()` performs an HTTP GET request.
* `.status_code` gives the HTTP status (e.g., 200 for success).
* `.json()` parses JSON responses into Python dictionaries.

## 13.2 Virtual Environments for Dependency Isolation

If you install everything globally, dependencies from different projects can **conflict**. For example, one project may need `Django==3.2` and another `Django==4.1`.

**Virtual environments** solve this by isolating dependencies per project.

```bash
# Create a virtual environment in the folder `.venv`
python -m venv .venv

# Activate it (Mac/Linux)
source .venv/bin/activate

# Activate it (Windows)
.venv\Scripts\activate

# Now all installs will be isolated
pip install requests
```

Deactivate the environment with:

```bash
deactivate
```

### `requirements.txt`

Projects typically declare dependencies in a `requirements.txt` file:

```
requests==2.28.1
pandas>=1.5,<2.0
fastapi
```

Install all at once:

```bash
pip install -r requirements.txt
```

This makes projects reproducible for other developers.

### Pipfile and Pipenv

Traditionally, Python projects used `requirements.txt` for dependency management. While simple, it lacks support for environments, dev dependencies, and reproducible builds. **Pipenv** improves this by introducing the `Pipfile` and `Pipfile.lock`.

#### Pipfile: Key Features

* `Pipfile`: replaces `requirements.txt`, splitting dependencies into `[packages]` and `[dev-packages]`.
* `Pipfile.lock`: ensures **reproducibility** with pinned versions and hashes.
* Built-in support for **virtual environments**.
* Simplifies dependency resolution.

#### Example: Pipfile

```cs
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
requests = "*"
pydantic = "2.11"

[dev-packages]
pytest = "8.4"

[requires]
python_version = "3.10"
```

#### Pipfile: Usage

```bash
# Install pipenv
pip install pipenv

# Install dependencies
pipenv install

# Install dev dependencies
pipenv install --dev pytest

# Spawn shell in virtualenv
pipenv shell

# Deactivate the environment
deactivate
```

#### Why It Matters

* Cleaner than raw `requirements.txt`.
* Tracks both human-readable intent (`Pipfile`) and machine-pinned reproducibility (`Pipfile.lock`).
* Common in teams/projects that want lightweight but structured dependency management.

### Poetry

<a href="https://python-poetry.org/" target="_blank">Poetry</a> is a modern dependency manager and packaging tool for Python, widely adopted for libraries and applications.

#### Poetry: Key Features

* Uses `pyproject.toml` as its single source of truth.
* Handles dependencies, virtual environments, packaging, and publishing to PyPI.
* Provides lockfile (`poetry.lock`) for reproducibility.
* Supports semantic versioning (`^`, `~`, exact pins).

#### Example: pyproject.toml with Poetry

```cs
[tool.poetry]
name = "myapp"
version = "0.1.0"
description = "An example Python app using Poetry"
authors = ["Your Name <you@example.com>"]
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.10"
requests = "^2.31"
pydantic = "^2.0"

[tool.poetry.group.dev.dependencies]
pytest = "^8.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

#### Poetry: Usage

```bash
# Install Poetry
pip install poetry

# Create new project
poetry new myapp

# Install deps (creates venv automatically)
poetry install

# Add a dependency
poetry add fastapi

# Run code inside poetry venv
poetry run python main.py

# Publish to PyPI
poetry publish --build
```

#### Why It Matters

* All-in-one: dependency management + build + publish.
* Preferred by many OSS maintainers.
* Reduces boilerplate (no `setup.py`, `requirements.txt`, `MANIFEST.in` mess).

### `pyproject.toml` (PEP 518 and beyond)

PEP 518 introduced **`pyproject.toml`** as the **unified build system config file** for Python projects. It’s now the **standard entry point** for tool configuration (like Black, Ruff, Mypy, Poetry, Flit).

#### Key aspects of `pyproject.toml`

- **Centralized Configuration:** It serves as a single source of truth for various project configurations, replacing older methods like `setup.py` or `setup.cfg`.
- **Build System Definition:** The `[build-system]` table specifies the tools required to build the project, such as `setuptools` or `hatchling`.
- **Project Metadata:** The `[project]` table contains essential metadata about the project, including its `name`, `version`, `description`, `license`, `authors`, and `dependencies`.
- **Tool-Specific Settings:** The `[tool]` table allows for configuring settings for various development tools like linters (e.g., Ruff, MyPy), formatters, or package managers (e.g., Poetry).
- **Dependency Management:** It defines project dependencies within the `[project.dependencies]` or `[tool.poetry.dependencies]` sections, including optional dependencies for development or testing.
- **Standardization:** Introduced by PEP 518, it promotes a consistent and predictable approach to Python project management, aligning with modern engineering principles.

#### Example: `pyproject.toml`

```cs
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "finance-app"
version = "0.1.0"
description = "Personal Finance CLI app"
authors = [{ name = "Walid Newaz", email = "walid@example.com" }]
dependencies = ["requests", "pydantic"]

[tool.black]
line-length = 100

[tool.ruff]
select = ["E", "F"]
ignore = ["E501"]

[tool.mypy]
python_version = "3.10"
strict = true
```

#### Usage

```bash
# Build a package from pyproject.toml
pip install build
python -m build

# Install a project (PEP 660 editable installs)
pip install -e .
```

#### Why It Matters

* **Future-proof**: PEP-backed standard across Python ecosystem.
* One file to configure **all tools + build metadata**.
* Adopted by Poetry, Flit, Hatch, Setuptools.

## 13.3 Creating Your Own Python Module

So far, we’ve seen how to install and use **third-party modules** from PyPI. But one of Python’s biggest strengths is how easy it is to **write and share your own modules**. This section walks you through:

1. Writing a simple **functional module**.
2. Using it inside another project on the same computer.
3. Packaging and publishing it to **PyPI** so others can install it with `pip install`.

### Step 1: Writing a Simple Functional Module

A **module** is just a `.py` file containing functions, classes, or variables. Let’s write a small module called `mathutils.py`:

```python
# mathutils.py
"""
A small utility module for math operations.
"""

def add(a: float, b: float) -> float:
    return a + b

def subtract(a: float, b: float) -> float:
    return a - b

def multiply(a: float, b: float) -> float:
    return a * b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Division by zero is not allowed")
    return a / b
```

At this point, `mathutils.py` is just a file. You can import and use it in **any script** in the same directory:

```python
from mathutils import add, divide

print(add(3, 5))       # 8
print(divide(10, 2))   # 5.0
```

### Step 2: Using the Module in Another Project (Locally)

To reuse the module in another project, you can:

#### Option 1: Copy the file

Copy `mathutils.py` into your new project’s folder. This works for quick experiments but is messy.

#### Option 2: Install it in “editable” mode

Create a **package structure**:

```bash
mathutils/
    mathutils/
        __init__.py
        operations.py
    pyproject.toml
```

Move functions into `operations.py`:

```python
# mathutils/operations.py
def add(a, b): return a + b
def subtract(a, b): return a - b
```

And expose them in `__init__.py`:

```python
# mathutils/__init__.py
from .operations import add, subtract
```

Now, install your package locally in **editable mode**:

```bash
pip install -e .
```

This tells Python to use the module from your source folder. Any edits to the code will immediately reflect in projects that import it:

```python
from mathutils import add
print(add(2, 3))   # 5
```

### Step 3: Building and Publishing the Module

To share your module with the world, you need to publish it to **PyPI** (Python Package Index).

#### Add Metadata (`pyproject.toml`)

Create a `pyproject.toml` file at the root of your package:

```cs
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mathutils-walid"  # unique name on PyPI
version = "0.1.0"
description = "A small math utility module"
authors = [{ name = "Walid Newaz", email = "you@example.com" }]
readme = "README.md"
license = { text = "MIT" }
dependencies = []

[tool.setuptools.packages.find]
where = ["mathutils"]
```

#### Build the Package

```bash
pip install build twine
python -m build
```

This creates:

```bash
dist/
  mathutils_walid-0.1.0.tar.gz
  mathutils_walid-0.1.0-py3-none-any.whl
```

#### Publish to TestPyPI

First, test publishing to the sandbox index:

```bash
twine upload --repository testpypi dist/*
```

Visit: [https://test.pypi.org/project/](https://test.pypi.org/project/) to see your package.

#### Publish to PyPI

When ready, push to the real PyPI:

```bash
twine upload dist/*
```

Then anyone can install your module:

```bash
pip install mathutils-walid
```

#### Key Takeaways

* A **module** is just a `.py` file; a **package** is a directory with `__init__.py`.
* Use `pip install -e .` for local development.
* Use `pyproject.toml` and tools like **setuptools**, **build**, and **twine** to publish.
* PyPI is the global repository — but always test with **TestPyPI** first.

## Conclusion

You’ve learned how to:

* Use third-party libraries via `pip` and PyPI
* Manage dependencies with virtual environments
* Build and publish your own Python packages
* Follow best practices for Python module packaging