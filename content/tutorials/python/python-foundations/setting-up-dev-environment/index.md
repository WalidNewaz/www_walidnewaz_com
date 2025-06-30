---
featured: false
date: "2023-10-16"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "1. Setting Up Your Python Development Environment"

title: "Development Environment Setup"
description: "Before diving into writing Python code, it’s essential to have a clean, efficient, and testable development environment. This chapter covers, Installing Python, Setting up virtual environments, Choosing the right IDE or editor, Creating your first Python script, Writing and running your first unit test."
hero_image: "python-tutorial-banner.png"
tags: ["fundamentals", "python"]
---

# Chapter 1: Setting Up Your Python Development Environment

Before diving into writing Python code, it’s essential to have a **clean, efficient, and testable development environment**. This chapter covers:

* Installing Python
* Setting up virtual environments
* Choosing the right IDE or editor
* Managing dependencies
* Creating your first Python script
* Writing and running your first unit test

## 1.1 Installing Python

Python frequently updates with new features, security patches, and performance improvements. Installing a **current and supported version (Python 3.11 or higher)** ensures compatibility with modern frameworks like **FastAPI**, **Django**, and **scikit-learn**.

### Download Python:

Official website: [https://www.python.org/downloads/](https://www.python.org/downloads/)

### Installation Settings:

   * On Windows: Make sure to check **"Add Python to PATH"**.
   * On Mac/Linux: Use `brew install python3` (Mac) or your Linux package manager.

### Verify Installation:

```bash
python --version
```

Expected Output:

```
Python 3.11.x
```

## 1.2 Setting Up Virtual Environments

A Python Virtual Environment is an isolated environment that allows you to manage dependencies, packages, and even Python versions on a per-project basis—without affecting the global Python installation on your system.

### Why Use Virtual Environments?

1. **Dependency Isolation**: Different projects may require different versions of the same package (e.g., Django 2.x vs 3.x). Virtual environments keep these dependencies separate.
2. **Prevent Package Conflicts**: Installing packages globally can lead to conflicts between projects.
3. **Environment Reproducibility**: Helps ensure that your production environment and local development environment use the exact same package versions.
4. **Safe Experimentation**: Easily install, update, or remove packages within a project without risking breaking other Python projects.

### Popular Tools for Managing Virtual Environments

- `venv` (built-in with Python 3.3+)
- `virtualenv` (third-party, older but still widely used)
- `pipenv` (combines `pip` + `venv`, adds dependency management via `Pipfile`)
- `Poetry` (modern dependency management and packaging tool)

#### Using `venv` (Built-in for Python 3.3+):

```bash
# Create a virtual environment
python -m venv venv

# Activate it:
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

#### Confirm the Environment:

```bash
which python
```

or on Windows:

```bash
where python
```

## 1.3 Choosing Your IDE / Editor

Choosing the right **Integrated Development Environment (IDE)** can greatly enhance your productivity as a Python developer. IDEs offer helpful features like syntax highlighting, code completion, linting, debugging tools, virtual environment management, and built-in terminals.

Popular choices:

| IDE / Editor                           | Description                          | Best For                                           |
| -------------------------------------- | ------------------------------------ | -------------------------------------------------- |
| **VS Code (Visual Studio Code)**       | Lightweight, extensible, widely used | Full-stack development, beginners to pros          |
| **PyCharm (Community / Professional)** | Feature-rich Python-specific IDE     | Professional Python and Django projects            |
| **Jupyter Notebook / JupyterLab**      | Interactive notebook-style coding    | Data science, machine learning, exploratory coding |
| **Spyder**                             | Scientific Python development        | Data analysis and scientific computing             |
| **Sublime Text / Atom**                | Lightweight code editors             | Quick scripting and light projects                 |
| **Thonny**                             | Beginner-friendly Python IDE         | New Python learners and students                   |

Throughout ths tutorial we will primarily use `PyCharm` and `Jupyter Notebook`. Instruction for downloading and setting up PyCharm may be found <a href="https://www.jetbrains.com/pycharm/" target="_blank">here</a>. Instruction for downloading and setting up Jupyter Notebook may be found <a href="https://docs.jupyter.org/en/latest/" target="_blank">here</a>.

## 1.4 Managing Dependencies

Keeping track of dependencies is crucial for testability and reproducibility.

### Install packages:

```bash
pip install requests
```

`pip` is the package installer for Python. The command above install the `requests` library.

### Freeze dependencies:

```bash
pip freeze > requirements.txt
```

The command `pip freeze > requirements.txt` is used to create a file named `requirements.txt` that lists all the packages installed in your current Python environment and their exact versions. 

### Install from requirements later:

```bash
pip install -r requirements.txt
```

This command is used to install all the Python packages listed in a file named `requirements.txt`.

For larger projects: Consider using **`pipenv`** or **`poetry`** for better dependency management.

## **1.5 Your First Python Script**

Let’s create a simple Python script: `greet.py`

### File: `greet.py`

To start open PyCharm. Click on the `File` menu. Select `New Project...`. Create a `Pure Python` project.

When a new project created click on the `File` menu, and select `New File or Directory`. Select `File` from the dropdown on the `Project` pane, and enter file name `greet.py`. Once the file is created, enter the following code in the file.

```python
def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    user_name = input("Enter your name: ")
    print(greet(user_name))
```

### Run it:

To run the program, click on the terminal icon on the left hand side of the IDE. Type the following command in the terminal.

```bash
python greet.py
```

**Expected Output:**

```
Enter your name: Walid Newaz
Hello, Walid Newaz!
```

## 1.6 Writing Your First Unit Test

Let’s test the `greet` function using `pytest`.

### Step 1: Install pytest:

Enter the following command in your terminal.

```bash
pip install pytest
```

This will install the `pytest` library.

### Step 2: Create a test file: `test_greet.py`

Enter the following code in the file:

```python
from greet import greet

def test_greet():
    assert greet("Alice") == "Hello, Alice!"
    assert greet("Bob") == "Hello, Bob!"
```

### Step 3: Run your test:

Run all tests in the current directory by typing the following command in your terminal:

```bash
pytest
```

### Expected Test Output:

```
collected 1 item

test_greet.py .                                  [100%]

1 passed in 0.00s
```

## 1.7 Optional: Setting Up Git for Version Control

### Basic Git Workflow:

```bash
git init
git add .
git commit -m "Initial commit with greet function and test"
```

Consider pushing to GitHub later for backup and collaboration.

## **Conclusion**

You now have:

* Python installed and configured
* A virtual environment running
* A dependency management workflow
* Your first Python script and test case

## **What’s Next:**

In **Chapter 2: Python Syntax and Core Concepts**, we’ll cover:

* Variables
* Loops
* Conditionals
* Functions
* Building your first CLI calculator (with tests)
