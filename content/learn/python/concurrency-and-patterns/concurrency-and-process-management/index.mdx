---
featured: false
date: "2023-11-12"

series: "Python Foundations"
part: "V. Concurrency and Patterns"
chapter: "14. Concurrency and Process Management"

title: "Concurrency and Process Management"
description: "Python's standard library provides a wide array of modules that cover everything from file handling and math to networking and concurrency. These libraries help developers avoid reinventing the wheel and build powerful applications quickly."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["Concurrency", "Python"]
---

# Chapter 14: Concurrency and Process Management

Python offers powerful tools for running external programs (`subprocess`) and for executing code in parallel (`multiprocessing`). This chapter will help you:

* Understand how to call external commands using `subprocess`
* Run code in parallel using the `multiprocessing` module
* Share data between processes
* Manage process pools for efficient task distribution
* Build and test an example: A parallel file compressor

## 14.1 Running External Commands with `subprocess`

### Why Use `subprocess`?

The `subprocess` module allows you to spawn new processes, connect to their input/output/error pipes, and obtain their return codes.

### Run a Shell Command

```python
import subprocess

# Run a command and capture its output
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)

print("Exit Code:", result.returncode)
print("Output:\n", result.stdout)
```

* `capture_output=True`: Captures stdout and stderr.
* `text=True`: Returns string instead of bytes.

### Handle Errors

```python
try:
    subprocess.run(["ls", "nonexistent_folder"], check=True)
except subprocess.CalledProcessError as e:
    print("🛑 Failed:", e)
```

### Redirect Output to File

```python
with open("output.txt", "w") as f:
    subprocess.run(["echo", "Hello, subprocess!"], stdout=f)
```

> ⚠️ `subprocess` runs external programs; it does not execute Python code directly unless you call `python`.

### Passing Input to a Subprocess

```python
result = subprocess.run(['grep', 'hello'], input='hello world\nbye', text=True, capture_output=True)
print(result.stdout)
```

### Advanced Use: Using `Popen`

`Popen` is similar to `run` but offers more flexibility for complex or uncommon cases.

```python
process = subprocess.Popen(['echo', 'Hello'], stdout=subprocess.PIPE)
stdout, stderr = process.communicate()
print(stdout.decode())
```

### Use Cases for `subprocess`

* Running shell commands from Python
* Automating OS-level tasks (e.g., compressing files, invoking Git, calling `ffmpeg`)
* Logging or interacting with CLI tools

### Example: Run a Docker Container

Let's look at a more realistic and complex example. We want to run some ad-hoc Python code, generated within a Python program. Running this code within the same environment as the parent program may impose some security risks. To mitigate such risks, we could run the generated code within an isolated Docker container. The following example does just that:

This example assumes:

* You have **Docker** installed and running.
* You have a **Python base image** available locally or downloadable (e.g., `python:3.10-slim`).
* Your local system can run `docker` commands without `sudo`.

```python
import subprocess
import os
import tempfile
import textwrap

# Step 1: Define the Python code to be run inside the container
python_code = textwrap.dedent("""
    print("Hello from inside Docker!")
    for i in range(5):
        print(f"Processing item {i+1}")
""")

# Step 2: Create a temporary Python file
temp_dir = tempfile.mkdtemp()
python_file_path = os.path.join(temp_dir, "app.py")

with open(python_file_path, "w") as f:
    f.write(python_code)

print(f"[INFO] Created Python file at {python_file_path}")

# Step 3: Launch a Docker container in detached mode
container_name = "python_subprocess_demo"

print("[INFO] Starting Docker container...")
subprocess.run(
    ["docker", "run", "-d", "--name", container_name, "python:3.10-slim", "sleep", "60"],
    check=True
)

# Step 4: Copy Python file into the container
print("[INFO] Copying file into container...")
subprocess.run(
    ["docker", "cp", python_file_path, f"{container_name}:/app.py"],
    check=True
)

# Step 5: Run the Python program inside the container
print("[INFO] Executing Python program inside container...")
result = subprocess.run(
    ["docker", "exec", container_name, "python", "app.py"],
    capture_output=True,
    text=True
)

print("[INFO] Output from container:\n", result.stdout)

# Step 6: Cleanup - Stop and remove the container
print("[INFO] Stopping and removing container...")
subprocess.run(["docker", "rm", "-f", container_name], check=True)

# Step 7: Remove temporary file
os.remove(python_file_path)
os.rmdir(temp_dir)
print("[INFO] Cleanup complete.")
```

### What This Code Does

1. **Creates a Python file** dynamically in a temporary folder.
2. **Starts a Docker container** from `python:3.10-slim` in the background.
3. **Copies** the generated Python script into the container.
4. **Executes** the script inside the container using `docker exec`.
5. **Captures and prints** the container’s output.
6. **Cleans up** by stopping/removing the container and deleting temporary files.

### Key Points

* `subprocess.run(..., check=True)` ensures the program fails immediately if any Docker command fails.
* We **decouple** the container lifecycle from the main program — meaning the container exists just long enough to run the script.
* This approach could be expanded to **deploy AI models**, **run integration tests in isolation**, or **simulate production environments**.

## 14.2 Parallel Execution with `multiprocessing`

Python’s `multiprocessing` module enables **true parallelism** using **separate processes** (unlike threads, which are limited by the Global Interpreter Lock).

### Basic Example

```python
from multiprocessing import Process

def greet(name):
    print(f"Hello, {name}")

if __name__ == '__main__':
    p = Process(target=greet, args=('Alice',))
    p.start()
    p.join()
```

* `target=greet` → tells the process to run the `greet` function.
* `args=('Alice',)` → arguments passed to the function.

#### Note

- Protecting the main block: `if __name__ == '__main__':`
  - This is **critical** in Windows (and recommended for all platforms) when using `multiprocessing`.
  - Without this guard, the child process might **re-import the module**, leading to infinite process creation.
- Even if there’s only one argument, the value passed as `args` must be a tuple (hence the comma after `'Alice'`).
- If you don’t `join()`, the main program might exit before the child process finishes running.

### Execution Flow: `Process`

1. Main process creates `p` (a new process object).
2. `p.start()` → New process begins and executes `greet('Alice')`.
3. `p.join()` → Main process pauses until the greeting process finishes.
4. Output is printed from the **child process**.

### Use Cases for `multiprocessing`

* CPU-bound tasks (e.g., image processing, data transformation)
* Parallel computation
* Scaling out a task across multiple cores

### Using a Pool of Workers

Python’s **`multiprocessing.Pool`** is used to run the same function on multiple pieces of data in parallel.

```python
from multiprocessing import Pool

def square(n):
    return n * n

if __name__ == '__main__':
    with Pool(4) as pool:
        results = pool.map(square, [1, 2, 3, 4, 5])
        print(results)
```

* `Pool` creates a **pool of worker processes**.
* Automatically handles process creation and joining.
* Instead of manually creating `Process` objects for each task, `Pool` lets you easily distribute work across multiple processes.
* `with` ensures the pool is **automatically closed and cleaned up** when done (no need to call `pool.close()` or `pool.join()` manually).

#### Distributing tasks with `map`

```python
results = pool.map(square, [1, 2, 3, 4, 5])
```

* `pool.map()` works like the built-in `map()`, but **runs in parallel** using multiple processes.
* It splits the list `[1, 2, 3, 4, 5]` into chunks and assigns them to available workers.
* Each worker runs `square(n)` on its assigned numbers.
* The results are collected and returned in the **same order as the input**.

### Execution Flow: `Pool`

1. Main process starts.
2. Pool of 4 worker processes is created.
3. `map()` distributes list elements across workers.
4. Each worker computes the square and sends results back.
5. Main process collects results and prints them.

### When to use `Pool`

* You have **many items to process** and the work is **CPU-bound**.
* Instead of manually creating and managing many `Process` objects, you can:
  * Limit the number of workers (avoiding CPU overload).
  * Let `Pool` handle task distribution and result gathering.

### Sharing State Between Processes

```python
from multiprocessing import Process, Value

def increment(counter):
    for _ in range(1000):
        counter.value += 1

if __name__ == '__main__':
    counter = Value('i', 0)
    processes = [Process(target=increment, args=(counter,)) for _ in range(4)]

    for p in processes: p.start()
    for p in processes: p.join()

    print(f"Counter value: {counter.value}")
```

> Warning: This is an example of **shared state, race conditions, and synchronization** in `multiprocessing`. The current code “works sometimes,” but it’s actually **racy**.

`counter.value += 1` is **not atomic**. Two processes can read the same old value and both write back, losing increments. You might print something less than `4000`.

**What’s going wrong?**

* `Value('i', 0)` gives a `int` in shared memory with an associated **lock**, but **you’re not using the lock**.
* `+= 1` compiles to multiple steps (read → add → write). Without a lock, increments can collide.

#### Fix 1: Use the built‑in lock around each increment (correct but slower)

```python
from multiprocessing import Value, Process

def increment(counter, n_increments):
    for _ in range(n_increments):
        with counter.get_lock():              # acquire/release per increment
            counter.value += 1

if __name__ == '__main__':
    N_PROC = 4
    N = 1000
    counter = Value('i', 0)                   # 'i' = 32-bit signed int
    procs = [Process(target=increment, args=(counter,)) for _ in range(4)]
    for p in procs: p.start()
    for p in procs: p.join()
    print(counter.value)                      # reliably 4000
```

**Pros:** correct.

**Cons:** heavy lock contention → poor scalability. If you increase the value of `N` the program execution slows down significantly.

#### Fix 2: Batch updates (much faster, still correct)

Do the work locally in each process, then **add once** (or a few times) under the lock.

```python
from multiprocessing import Value, Process

def increment_batched(counter, n_increments, batch=1000):
    # all local work, no locking here
    local_count = n_increments
    # single critical section
    with counter.get_lock():
        counter.value += local_count

if __name__ == '__main__':
    N_PROC = 4
    N = 1000
    counter = Value('i', 0)
    procs = [Process(target=increment_batched, args=(counter, N)) for _ in range(N_PROC)]
    for p in procs: p.start()
    for p in procs: p.join()
    print(counter.value)  # 4000, with minimal lock time
```

If you really need per‑increment semantics, you can chunk (e.g., add every 100 or 1000) to balance accuracy and contention.

#### Fix 3: Use an explicit `Lock`

`Value` can share a lock, but you can also **share one `Lock`** across multiple shared values/arrays.

```python
from multiprocessing import Value, Process, Lock

def increment(counter, lock, n):
    for _ in range(n):
        with lock:
            counter.value += 1

if __name__ == '__main__':
    lock = Lock()
    counter = Value('i', 0, lock=False)  # no per-Value lock; we use our own
    procs = [Process(target=increment, args=(counter, lock, 1000)) for _ in range(4)]
    for p in procs: p.start()
    for p in procs: p.join()
    print(counter.value)  # 4000
```

This performs similar to **Fix 1** shown earlier, because the computational complexity of both versions of the `increment()` functions is **linear**. The computational complexity of **Fix 2** is **constant** because of the simplification of the iteration into a single operation, albeit spread out over 4 separate processes.

This is why choosing efficient **data structures and algorithms (DSA)** matters in parallel and distributed computing.

> **Note:** A discussion of efficient parallel and distributed algorithms design is beyond the scope of this chapter, which focuses on Python and related frameworks.

### Using a Manager for Shared Dict or List

`multiprocessing.Manager` in Python's standard library provides a way to create and share Python objects among multiple processes, enabling inter-process communication (IPC) and synchronization. `Manager` creates proxy objects such as `list`, `dict`, and `Queue`.

Other processes receive proxy objects for these managed objects. Any operations performed on these proxies are automatically communicated to the original object managed by the server process.

```python
from multiprocessing import Process, Manager

def add_value(shared_list):
    shared_list.append(42)

if __name__ == '__main__':
    with Manager() as manager:
        shared = manager.list()
        p = Process(target=add_value, args=(shared,))
        p.start()
        p.join()
        print(shared)
```

**How this Works:**

- `Manager()` starts a server process in the background.
- When you call manager.list(), it doesn’t give you a normal Python list. Instead,
  it gives you a proxy object to a list that lives inside the Manager’s server process.
- When `add_value()` calls `shared_list.append(42)`, the proxy sends a message to the Manager server telling it to append `42` to the real list.
- The manager server modifies the single shared list instance in its own memory space.
- When the parent process later prints `shared`, the proxy fetches the latest contents from the server.

> **Note:** Managers use IPC (Inter-Process Communication) under the hood (pipes/sockets + pickling). This makes it easy but slower than raw shared memory (`Value`, `Array`), because of serialization overhead.

### Practical Example: `multiprocessing`

Let's build a mini utility that compresses multiple files using `gzip` in parallel using `multiprocessing`.

#### **Step 1: `compress.py`**

```python
import gzip
import shutil
from multiprocessing import Pool
from pathlib import Path

def compress_file(file_path):
    compressed_path = f"{file_path}.gz"
    with open(file_path, 'rb') as f_in, gzip.open(compressed_path, 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out)
    return compressed_path

def get_files(directory):
    return [str(p) for p in Path(directory).glob('*.log')]

if __name__ == '__main__':
    files = get_files('data')
    with Pool() as pool:
        results = pool.map(compress_file, files)
    print(f"Compressed: {results}")
```

#### **Step 2: Create Sample Files `sample_data.py`**

```python
from pathlib import Path

Path("data").mkdir(exist_ok=True)

for i in range(5):
    with open(f"data/sample_{i}.log", 'w') as f:
        f.write("This is some text data.\n" * 1000)
```

#### **Run It**

```bash
python compress.py
```

Check the `data/` directory — you should see `.gz` files created in parallel.

## 14.3 Testing your parallel code

```python
# test_counter.py
from multiprocessing import Value, Process

def increment(counter, n):
    for _ in range(n):
        with counter.get_lock():
            counter.value += 1

def test_multiprocessing_counter():
    counter = Value('q', 0)  # 64-bit
    procs = [Process(target=increment, args=(counter, 10_000)) for _ in range(8)]
    for p in procs: p.start()
    for p in procs: p.join()
    assert counter.value == 80_000
```

The test code scaffolds the main execution function and invokes the test function.

## 14.4 Chapter Assignment:

Rewrite the **Docker Container** example with the following changes:

- Encapsulate the logic using OOP paradigms. The refactored code should use an Abstract Base Class (`AbstractDockerCodeRunner`). Extend the base class to be able to run both **Python** and **JavaScript** code.
- Allow the user to run code within a `/scripts` directory **sequentially** or **simultaneously**.
- Log all application and container outputs in a `/logs` directory. Each log file should be rotated every 24 hours (**hint:** Check out the <u>[previous](../python-standard-libraries/#heading-2-84-real-world-example-log-archiver-utility)</u> chapter on Python Standard LIbraries.
- Use proper error handling (e.g. if the code fails due to **syntax error**).
- Ensure that your code is fully tested.
