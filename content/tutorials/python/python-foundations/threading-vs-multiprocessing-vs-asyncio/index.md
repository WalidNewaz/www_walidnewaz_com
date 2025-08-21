---
featured: false
date: "2023-11-14"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "10. Concurrency in Python – threading vs multiprocessing vs asyncio"

title: "threading vs multiprocessing vs asyncio"
description: "This chapter continues the discussion of concurrency in Python by introducing two additional concepts, threading and asyncio. After reading this chapter the reader should have basic, yet functional knowlege of the wide range of options available to developers when writing programs that execute concurrent tasks."
has_quiz: true
tags: ["Concurrency", "Python"]
---

# Chapter 10: Concurrency in Python – `threading` vs `multiprocessing` vs `asyncio`

Before we deleve into additional programming concepts, we should examine concurrency in Python a bit further. As your Python applications grow, you’ll encounter tasks that are **CPU-bound**, **I/O-bound**, or **require concurrency**. Python offers several tools to handle these efficiently:

* `threading`: Good for I/O-bound concurrency
* `multiprocessing`: Ideal for CPU-bound tasks
* `asyncio`: Best suited for high-level structured network or I/O tasks using coroutines

We have examined `multiprocessing` in the previous chapter in much detail. In this chapter, we’ll compare the `threading` and `asyncio` and demonstrate when to use each.

## 10.1 Threading

Threads and processes look similar on the surface (both allow concurrent execution), but the way the **operating system (OS)** and **CPU cores** handle them is very different:

### Processes

* **Definition:** A process is an independent program with its own memory space (heap, stack, code, data).
* **Isolation:** Processes do not share memory by default; they must use **inter-process communication (IPC)** like pipes, sockets, shared memory, or `multiprocessing.Manager`.
* **OS Handling:** The OS scheduler manages processes, assigning them CPU time slices. Context switching between processes is relatively **heavyweight** (saving/restoring full memory mappings, registers, etc.).
* **Core Utilization:** Multiple processes can truly run in parallel across different **cores** of a CPU.
* **Example in Python:** `multiprocessing.Process` — used for CPU-bound tasks (e.g., image/video processing, ML computations).

### Threads

* **Definition:** Threads are lightweight units of execution that live **inside a process** and share the same memory space.
* **Sharing:** Threads share the process’s memory (global variables, heap), which makes communication easier but introduces risks like **race conditions**.
* **OS Handling:** The OS scheduler treats threads almost like processes but with much **lighter context switching** (since memory is shared).
* **Core Utilization:** On most languages/runtimes, threads can run in true parallel across cores.
  * ⚠️ In **CPython**, the **GIL (Global Interpreter Lock)** prevents multiple threads from executing Python bytecode simultaneously, so Python threads are best for **I/O-bound** tasks (network calls, disk reads).
* **Example in Python:** `threading.Thread` — great for handling many concurrent I/O requests.

### Example: Web Crawl Simulation

```python
import threading
import time

def crawl(url):
    print(f"Visiting {url}...")
    time.sleep(2)  # Sleep for 2 seconds
    print(f"Finished visiting {url}.")


threads = []
links = [
    "https://www.google.com/",
    "https://www.youtube.com/",
    "https://www.mit.edu/"
]

if __name__ == "__main__":
    start = time.time()
    # Create the threads
    for link in links:
        thread = threading.Thread(target=crawl, args=(link,))
        threads.append(thread)

    # Start all the threads
    for thread in threads:
        thread.start()

    # Join all threads
    for thread in threads:
        thread.join()

    print(f"Time taken to visit {len(links)} links: {time.time() - start:.2f} seconds.")
```

**Output:**

```bash
Visiting https://www.google.com/...
Visiting https://www.youtube.com/...
Visiting https://www.mit.edu/...
Finished visiting https://www.google.com/.
Finished visiting https://www.youtube.com/.
Finished visiting https://www.mit.edu/.
Time taken to visit 3 links: 2.01 seconds.
```

> **Good for:** I/O-bound operations like downloading files, reading from disk, or handling socket streams, essentially serializing access to any shared resource.

## 10.2 The Global Interpreter Lock

The **Global Interpreter Lock (GIL)** is a mutex (mutual exclusion lock) that protects access to Python objects, ensuring that only **one thread executes Python bytecode at a time** within a process.

### Why does the GIL exist?

* **Memory safety**: Python’s memory management (including reference counting for garbage collection) isn’t thread-safe by default.
* **Simplicity**: The GIL makes CPython’s C implementation simpler and faster for single-threaded programs.

### GIL Downsides

* **Thread contention**: Even on a multi-core CPU, only one Python thread can run Python code at once. Multiple threads contend for the GIL, creating performance bottlenecks.
* **CPU-bound tasks suffer**: Using `threading` to parallelize heavy computations doesn’t improve performance — it may even slow things down.

### How the GIL works internally

1. The **main interpreter** acquires the GIL.
2. Only the thread holding the GIL can execute Python bytecode.
3. Other threads wait until the GIL is released.
4. The GIL is periodically released to allow other threads a chance to run (e.g., every few milliseconds or after certain bytecode instructions).
5. For I/O-bound tasks (like network or file operations), threads can release the GIL early, allowing other threads to progress.

> Only one thread at a time can hold the GIL and execute Python code. Other threads must wait until the GIL is released. Even if multiple cores are available, the GIL forces execution to serialize at the Python bytecode level. Native extensions like NumPy can release the GIL during heavy computation, which allows true multi-core execution underneath.

## 10.3 asyncio

`asyncio` is a framework for writing **asynchronous I/O-bound code** using `async` and `await`. Instead of running tasks in parallel on multiple CPU cores (like `multiprocessing`), `asyncio` uses a **single-threaded event loop** to rapidly switch between tasks that are waiting on I/O.

### `async` and `await` Explained

* **`async`**
  Used to define a *coroutine function*. Coroutines are like special functions that can pause execution at certain points (`await`) and resume later.

```python
async def fetch_data():
    return "data"
```

* **`await`**
  Used inside an `async` function to *pause* until another coroutine or async operation finishes.
  While waiting, control is returned to the **event loop**, which can run other tasks instead of blocking.

```python
async def main():
    result = await fetch_data()
    print(result)
```

Together, `async` + `await` allow Python to **handle many I/O operations concurrently** without creating new threads or processes.

### Example: Async HTTP simulation

```python
import asyncio

async def fetch(name):
    print(f"Fetching {name}...")
    await asyncio.sleep(2)  # simulates network I/O
    print(f"Done fetching {name}")

async def main():
    await asyncio.gather(fetch("page1"), fetch("page2"), fetch("page3"))

asyncio.run(main())
```

**Output:**

```bash
Fetching page1...
Fetching page2...
Fetching page3...
Done fetching page1
Done fetching page2
Done fetching page3...
```

Here, all tasks *appear to run at the same time*, but really the event loop is quickly switching between them whenever one is waiting.

### Key Features of `asyncio`

* **Event loop**: The engine that schedules and runs tasks cooperatively.
* **Coroutines (`async def`)**: Special functions that can `await` I/O without blocking.
* **Tasks**: Wrappers around coroutines that run concurrently on the event loop.
* **Futures**: Low-level building blocks for asynchronous results.

### Analogy with JavaScript Event Loop

If you’ve used Node.js:

* Python’s `asyncio` behaves like **JavaScript’s async/await** with its event loop.
* Both allow **non-blocking I/O** where functions yield control when they `await` something.
* Difference: Python also gives you **multiprocessing** for true parallelism, while Node mostly leans on async I/O.

## 10.4 Performance Comparison

| Task Type    | Best Tool                | Reason                                   |
| ------------ | ------------------------ | ---------------------------------------- |
| File I/O     | `threading`              | Simple and easy to use for parallel I/O  |
| CPU-bound    | `multiprocessing`        | Bypasses GIL by using multiple processes |
| Network I/O  | `asyncio`                | Event loop handles thousands of tasks    |
| Web scraping | `asyncio` or `threading` | Lightweight and fast concurrency         |

## 10.5 Chapter Assignment: Comparing Concurrency Models

In this assignment, you will extend the idea of running code in isolated environments, but now experiment with **threading**, **multiprocessing**, and **asyncio** to see how each handles different workloads.

### **Assignment Requirements**

1. **Problem Definition:**
   * Write a program that simulates fetching or processing multiple files (e.g., 10 `.txt` files, each with random content).
   * Each file should require \~2 seconds of "work" (simulated with `time.sleep()` for I/O, or CPU-bound text processing like word counts).
2. **Implement Three Variants:**
   * **Threading-based** solution: Use `threading.Thread` to process all files concurrently.
   * **Multiprocessing-based** solution: Use `multiprocessing.Pool` to distribute work across CPU cores.
   * **Asyncio-based** solution: Use `asyncio` with `async def` + `await asyncio.sleep()` to simulate I/O-bound processing.
3. **Measure Performance:**
   * Log the start and end time of each approach.
   * Compare total runtime for threading, multiprocessing, and asyncio.
   * Explain why the results differ (e.g., GIL for threads, true parallelism with processes, event loop for async).
4. **Enhance with OOP Structure (optional advanced):**
   * Create an abstract base class `AbstractFileProcessor` with a method `process_files(files)`.
   * Implement three subclasses:
     * `ThreadedFileProcessor`
     * `MultiprocessingFileProcessor`
     * `AsyncioFileProcessor`
   * Each subclass must override `process_files()` with its concurrency model.
5. **Output & Reporting:**
   * Save all logs to `/logs/concurrency_results.log`.
   * Print a performance comparison table at the end, e.g.:

| Model           | Total Time (s) | Notes (CPU-bound vs I/O-bound) |
| --------------- | -------------- | ------------------------------ |
| Threading       | …              | Best for I/O tasks             |
| Multiprocessing | …              | Best for CPU-bound tasks       |
| Asyncio         | …              | Best for network-style I/O     |

### **Hints & Resources**

* Use `time.perf_counter()` for precise timing.
* For asyncio: `await asyncio.gather(*tasks)` is key to running coroutines concurrently.
* For multiprocessing: prefer `Pool.map()` to distribute work evenly.
* Remember the **GIL**: only multiprocessing achieves true parallelism in CPython.
