---
featured: false
date: "2023-11-22"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "14. Building Command-Line Applications with Python"

title: "Building Command-Line Applications"
description: "Python’s true power lies in its vast ecosystem of third-party packages, enabling developers to quickly build applications without reinventing the wheel. This chapter teaches you how to work with 3rd party libraries, create your own Python package, understand dependencies and version management."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["CLI Apps", "Python"]
---

# Chapter 14: Building Command-Line Applications with Python

Python excels at creating **command-line interface (CLI)** applications thanks to its extensive standard library and clean syntax. CLI apps are ideal for scripting, DevOps tools, data wrangling utilities, and developer-facing tools.

In this chapter, we will cover:

* Benefits of CLI apps
* Argument parsing with `argparse` and `click`
* Structuring a CLI app
* Incorporating **design patterns** (e.g., Command, Strategy)
* Two example projects:
  * Task Manager CLI (with Command Pattern)
  * File Processor CLI (with Strategy Pattern)

## 14.1 Why Build CLI Apps in Python?

* Easy to build and share scripts
* Fast execution and low overhead
* Great for automation and tooling
* Portable across platforms
* Easier to test compared to GUIs

## 14.2 Parsing Arguments with argparse

Python's `argparse` is built-in and powerful for parsing command-line arguments.

### Example: Simple Calculator

```python
import argparse

parser = argparse.ArgumentParser(description="Simple CLI Calculator")
parser.add_argument("a", type=int, help="First number")
parser.add_argument("b", type=int, help="Second number")
parser.add_argument("--operation", choices=["add", "sub"], default="add")

args = parser.parse_args()

if args.operation == "add":
    print(args.a + args.b)
else:
    print(args.a - args.b)
```

Run it like:

```bash
python calc.py 5 3 --operation sub
```

## 14.3 A More Ergonomic CLI with Click

For more ergonomic CLI apps, use <a href="https://click.palletsprojects.com/" target="_blank">click</a>, which supports nested commands, colorful help, and validation.

### Example: Greet

```python
import click

@click.command()
@click.option('--name', prompt='Your name', help='The person to greet.')
def hello(name):
    click.echo(f'Hello, {name}!')

if __name__ == '__main__':
    hello()
```

Install with:

```bash
pip install click
```

## 14.4 Design Patterns in CLI Apps

Let’s explore [Command](../design-patterns/#heading-3-command-pattern) and [Strategy](../design-patterns/#heading-3-strategy-pattern) patterns through practical CLI apps.

## 14.5 Example Project: Task Manager CLI (Command Pattern)

We will create a CLI app to manage tasks using the **Command Pattern**, which encapsulates commands as objects.

### Command Pattern Overview

* **Encapsulates a request as an object**
* Allows undo/redo, macro commands
* Decouples sender from receiver

### Project Structure: Task Manager

```bash
task_manager/
│
├── main.py
├── commands/
│   ├── base.py
│   ├── add.py
│   └── list.py
└── tasks.json
```

**`task_manager/commands/base.py`**

```python
class Command:
    def execute(self):
        raise NotImplementedError("Execute must be implemented.")
```

**`task_manager/commands/add.py`**

```python
import json
from commands.base import Command

class AddTaskCommand(Command):
    def __init__(self, task, file='tasks.json'):
        self.task = task
        self.file = file

    def execute(self):
        try:
            with open(self.file, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            data = []

        data.append({"task": self.task})
        with open(self.file, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Task added: {self.task}")
```

**`task_manager/commands/list.py`**

```python
import json
from commands.base import Command

class ListTasksCommand(Command):
    def __init__(self, file='tasks.json'):
        self.file = file

    def execute(self):
        try:
            with open(self.file, 'r') as f:
                data = json.load(f)
            for i, item in enumerate(data):
                print(f"{i + 1}. {item['task']}")
        except FileNotFoundError:
            print("No tasks found.")
```

**`task_manager/main.py`**

```python
import argparse
from commands.add import AddTaskCommand
from commands.list import ListTasksCommand

parser = argparse.ArgumentParser()
parser.add_argument("command", choices=["add", "list"])
parser.add_argument("--task", help="Task description (for add command)")

args = parser.parse_args()

if args.command == "add":
    cmd = AddTaskCommand(task=args.task)
elif args.command == "list":
    cmd = ListTasksCommand()

cmd.execute()
```

**`task_manager/tasks.json`**

```json
[]
```

**Run it**

```bash
python main.py add --task "Write chapter on CLI apps"
python main.py list
```

## 14.6 Example Project: File Processor (Strategy Pattern)

We will create a CLI that processes files using pluggable strategies.

### Strategy Pattern Overview

* Defines a **family of algorithms**
* Makes them **interchangeable at runtime**
* Promotes **Open/Closed Principle**

### Project Structure: File Processor

```bash
file_processor/
│
├── main.py
├── strategies/
│   ├── base.py
│   ├── uppercase.py
│   └── reverse.py
└── input.txt
```

**`file_processor/strategies/base.py`**

```python
class ProcessorStrategy:
    def process(self, data):
        raise NotImplementedError()
```

**`file_processor/strategies/uppercase.py`**

```python
class UppercaseStrategy(ProcessorStrategy):
    def process(self, data):
        return data.upper()
```

**`file_processor/strategies/reverse.py`**

```python
class ReverseStrategy(ProcessorStrategy):
    def process(self, data):
        return data[::-1]
```

**`file_processor/main.py`**

```python
import argparse
from strategies import UppercaseStrategy, ReverseStrategy

strategies = {
    "uppercase": UppercaseStrategy,
    "reverse": ReverseStrategy
}

parser = argparse.ArgumentParser()
parser.add_argument("input")
parser.add_argument("output")
parser.add_argument("--strategy", choices=strategies.keys(), required=True)

args = parser.parse_args()

with open(args.input, 'r') as f:
    data = f.read()

strategy = strategies[args.strategy]()
result = strategy.process(data)

with open(args.output, 'w') as f:
    f.write(result)

print(f"File processed using {args.strategy}.")
```

**`file_processor/input.txt`**

```
this is an all lower case text.
```

**Run It**

```bash
python file_processor.py input.txt output.txt --strategy uppercase
```

This will create a file `output.txt` with the text of the file `input.txt` based on the specified strategy.

## 14.7 Testing CLI Apps

### Use `pytest` with `subprocess`

```python
import subprocess

def test_task_add_and_list():
    subprocess.run(["python", "main.py", "add", "--task", "Test CLI"], check=True)
    result = subprocess.run(["python", "main.py", "list"], capture_output=True, text=True)
    assert "Test CLI" in result.stdout
```

## 14.8 Packaging CLI Tools

So far, we’ve written Python scripts that can be run locally with `python script.py`. But if you want your command-line app to be installed and executed like **real CLI tools** (`git`, `pytest`, `black`), you’ll need to package and distribute it.

Packaging your CLI tool allows users to run it with a simple command, e.g.:

```bash
$ mycli init
$ mycli run --debug
```

instead of:

```bash
$ python path/to/mycli/main.py run --debug
```

Let’s go step by step.

### Step 1: Project Layout

A clean project structure helps with packaging:

```bash
mycli/
├── pyproject.toml
├── src/
│   └── mycli/
│       ├── __init__.py
│       ├── cli.py         # CLI entry point
│       └── commands.py    # command implementations
├── tests/
│   └── test_commands.py
```

### Step 2: Define an Entry Point

Inside `cli.py`, write your CLI entry point function:

```python
# src/mycli/cli.py
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: mycli [init|run|deploy]")
        return

    command = sys.argv[1]
    if command == "init":
        print("Initializing project...")
    elif command == "run":
        print("Running project...")
    elif command == "deploy":
        print("Deploying project...")
    else:
        print(f"Unknown command: {command}")
```

### Step 3: Configure `pyproject.toml`

Modern Python packaging uses **PEP 621** with `pyproject.toml`.
Here’s a minimal config to turn your CLI app into an installable tool:

```cs
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mycli"
version = "0.1.0"
description = "A simple CLI demo tool"
readme = "README.md"
authors = [{ name="Your Name", email="you@example.com" }]
license = { text = "MIT" }
dependencies = []

[project.scripts]
mycli = "mycli.cli:main"
```

The **key part** is:

```cs
[project.scripts]
mycli = "mycli.cli:main"
```

This tells Python packaging tools that when `mycli` is installed, a console script should be created that points to `mycli.cli.main`.

### Step 4: Build and Install Locally

Use `pip` or `build` to test packaging:

```bash
$ pip install --upgrade build
$ python -m build
```

This will create `dist/mycli-0.1.0.tar.gz` and `dist/mycli-0.1.0-py3-none-any.whl`.

Install it locally:

```bash
$ pip install dist/mycli-0.1.0-py3-none-any.whl
```

Now run your tool directly:

```bash
$ mycli run
Running project...
```

### Step 5: Distribute

You can publish your tool to **PyPI** so others can install it via `pip install mycli`.

```bash
$ pip install --upgrade twine
$ twine upload dist/*
```

### Step 6: Extras (Best Practices)

* **Use `argparse` or `click`**: For real-world CLI apps, rely on libraries like [`argparse`](https://docs.python.org/3/library/argparse.html) (in stdlib) or [`click`](https://click.palletsprojects.com/) for parsing flags and options.
* **Add version command**: Users expect `mycli --version`.
* **Logging over print**: Replace `print` with the `logging` module for configurable verbosity.
* **Testing CLI tools**: Use `pytest` with `subprocess.run` or `typer.testing.CliRunner` if you use [Typer](https://typer.tiangolo.com/).

## Conclusion

You’ve learned:

* How to build CLI apps with `argparse` and `click`
* How to use design patterns like **Command** and **Strategy**
* How to write reusable, testable CLI utilities
* How to package your tools for reuse

## Assignment — Workflow Runner MVP (CLI-first)

### Goal

Build an **MVP job runner** plus **job queue** and **scheduler** you can run locally as three cooperating CLI processes. The runner executes **containerized tasks** (Python or JavaScript) and reports results. The scheduler reads a **YAML workflow**, builds a simple **DAG (no fan-in/out)**, and enqueues runnable nodes. The queue is a lightweight broker (filesystem or SQLite). All three tools should be usable as **standalone CLIs** and as **daemon-like loops**.

Readers have already learned how to structure and package CLI tools and tests; apply those practices here. &#x20;

### Deliverables

You will produce three installable CLI apps (or one multi-command CLI):

* **`wf-runner`** — executes a single `job_desc` in a container, returns a `job_result`.
* **`wf-queue`** — provides two queues: `job_request`, `job_result`.
* **`wf-scheduler`** — parses a YAML workflow into a DAG (single-dependency nodes), enqueues ready jobs, and advances when dependencies complete.

### Required CLI commands

Each tool should expose subcommands (argparse/click ok—your chapter shows both options). &#x20;

#### `wf-runner`

* `init` — probe environment (Docker availability), initialize logs/dirs.
* `validate JOB_DESC.json` — schema check for a job description.
* `prepare JOB_DESC.json` — pre-pull image, warm cache if needed.
* `run JOB_DESC.json` — run the job and print a JSON `job_result` to stdout.
* `status` — (optional) show last N results from log/store.
* `cleanup` — prune temp dirs/artifacts.
* `discover` — print available “plugins” (serializers/queue backends).

#### `wf-queue`

* `listen` — start a loop that pulls from `job_request`, launches `wf-runner run`, and pushes a `job_result`.
* `enqueue JOB_DESC.json` — push a job request manually.
* `drain` — (optional) show and clear pending queues.
* `stats` — basic queue metrics.

#### `wf-scheduler`

* `validate WORKFLOW.yaml`
* `plan WORKFLOW.yaml` — print a topological order preview (single-dependency DAG).
* `start WORKFLOW.yaml` — enqueue initial runnable nodes and keep advancing as results arrive.

### Interfaces & Schemas

**Job description** (`JOB_DESC.json`)

```json
{
  "id": "job-123",
  "image": "python:3.10-slim",
  "cmd": ["python", "script.py"],
  "mounts": [{"host": "/abs/path/myproj", "container": "/work", "mode": "ro"}],
  "workdir": "/work",
  "env": {"FOO": "bar"},
  "timeout_sec": 60,
  "resources": {"cpus": 1, "memory": "256m"}
}
```

**Job result** (stdout of `wf-runner run` and the payload stored in `job_result`)

```json
{
  "id": "job-123",
  "status": "SUCCEEDED | FAILED | TIMEOUT",
  "exit_code": 0,
  "stdout": "…",
  "stderr": "…",
  "started_at": "2025-08-18T00:12:25Z",
  "ended_at": "2025-08-18T00:12:27Z",
  "runtime_ms": 2010,
  "artifacts": [{"path": "/work/out.json"}],
  "metadata": {"image": "python:3.10-slim"}
}
```

**Workflow** (`WORKFLOW.yaml`)

```yaml
workflow: example
nodes:
  fetch:
    job: jobs/fetch.json
    depends_on: null
  transform:
    job: jobs/transform.json
    depends_on: fetch
  save:
    job: jobs/save.json
    depends_on: transform
```

> Constraint: **Single dependency per node** (no fan-in/out).

### Queue Contract

The Job Queue is a **transparent message pipeline**. It does **not** schedule jobs, track state, or retry failures. Its only responsibility is to **accept job requests**, allow **workers to dequeue them**, and accept results that schedulers (or other consumers) can read back.

#### Backends

Pick one lightweight local backend:

- **Filesystem (default)**
  - Two dirs:
    - `./queue/job_request/`
    - `./queue/job_result/`
  - Each message is a JSON file named {id}.json.
  - Use atomic writes (e.g., os.rename) to avoid partial reads.
- **SQLite (optional)**
  - Tables:
    - `job_request(id TEXT PK, payload TEXT, ts INTEGER)`
    - `job_result(id TEXT PK, payload TEXT, ts INTEGER)`

#### Message Envelope (same for request/result)

```json
{
  "id": "job-123",
  "kind": "job_request | job_result",
  "payload": { /* job_desc or job_result */ },
  "ts": 1755497545230
}
```
#### Commands

- `wf-queue enqueue --queue job_request payload.json` → enqueue a job request
- `wf-queue dequeue --queue job_request → dequeue` the oldest job request
- `wf-queue enqueue --queue job_result result.json` → enqueue a job result
- `wf-queue dequeue --queue job_result → dequeue` the oldest job result

#### Daemon Mode

- wf-queue start starts a simple listen loop that exposes enqueue/dequeue operations.
- Workers and schedulers interact by invoking enqueue/dequeue against this daemon (or directly against the backend).

### Scheduler Algorithm (single-dependency DAG)

1. Parse YAML into nodes: `{name, job_path, depends_on}`.
2. Maintain state maps: `state[name] ∈ {PENDING,RUNNING,DONE,FAILED}` and `dependency[name]`.
3. On `start`:
   * Enqueue all nodes with `depends_on: null`.
   * Subscribe to `job_result`.
   * When a `job_result` for node **X** arrives:
     * Mark `X` as `DONE` or `FAILED`.
     * For each node **Y** whose `depends_on == X` and all dependencies are `DONE` (single parent here), enqueue **Y**.
4. Stop when all nodes are terminal.

### Logging & Packaging

* Use **`logging`** (not bare prints) with configurable verbosity (`--verbose`, `--quiet`), as recommended in your chapter.&#x20;
* Package each CLI with a **console script** entry point in `pyproject.toml`:

```cs
[project.scripts]
wf-runner = "wf_runner.cli:main"
wf-queue = "wf_queue.cli:main"
wf-scheduler = "wf_scheduler.cli:main"
```

So users can install and call them like real tools (`wf-runner run …`).&#x20;

### Testing Guidance

* **Unit**: parse/validate job/workflow; queue I/O adapters; command builders.
* **Integration (local)**:
  * Start `wf-queue listen` in a background process.
  * Run `wf-scheduler start WORKFLOW.yaml`.
  * Assert that `job_result` files/rows appear in order `fetch → transform → save`.
* Use `pytest` and `subprocess.run` to drive CLI binaries, as shown in the chapter.&#x20;
* For packaging tests, keep the chapter’s **project layout** and **entry point** pattern.&#x20;

### Hints & Tips

* **Arg parsing**: Keep subcommands simple (`argparse` is enough; `click`/Typer optional).&#x20;
* **Safer subprocess**: always set `text=True`, `capture_output=True`, and handle timeouts.
* **Determinism**: seed any randomness and use temp dirs under `./.tmp/`.
* **Idempotency**: generating `{id}.json` files allows re-runs without duplication.
* **Observability**: log the **selected strategy** (sequential/none here; parallel is future work), **queue pop/push**, **runner start/stop**, and **node state changes**.
* **Daemon mode**: implement `--loop` (or a `listen` subcommand) that `while True: work(); sleep(…);` and supports `SIGINT` clean shutdown.
* **Local "multi-process" demo**: open three terminals:
  1. `wf-queue listen`
  2. `wf-scheduler start WORKFLOW.yaml`
  3. `tail -f logs/*.log`
     Or script it with `tmux`/`make`.

### Acceptance Criteria

* Installing the package(s) provides **three console commands** (or one multi-command tool).
* Running:
  1. `wf-queue listen`
  2. `wf-scheduler start demo.yaml`
  3. (Optionally) manual `wf-queue enqueue jobs/*.json`
     results in **completed results** appearing in `job_result`, with logs showing the pipeline progress.
* `wf-runner run` returns a **valid `job_result` JSON** to stdout even on failure (non-zero `exit_code` + `status: FAILED`).

