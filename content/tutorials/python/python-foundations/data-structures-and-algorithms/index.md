---
featured: false
date: "2023-11-08"

series: "Python for Modern Developers"
part: "I. Python Foundations"
chapter: "7. Data Structures and Algorithms"

title: "Data Structures and Algorithms"
description: "Understanding DSA is essential for building efficient applications, preparing for technical interviews, and writing production-grade backend systems."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["DSA", "Python"]
---

This chapter introduces the fundamentals of **Data Structures and Algorithms (DSA)** using Python. Understanding DSA is essential for building efficient applications, preparing for technical interviews, and writing production-grade backend systems.

We’ll cover:

* Core built-in Python data structures
* Algorithmic operations like searching and sorting
* Time and space complexity basics
* Simple DSA-focused examples with testable code

## 7.1 Python’s Built-in Data Structures

| Type    | Description                             | Example             |
| ------- | --------------------------------------- | ------------------- |
| `list`  | Ordered, mutable collection             | `[1, 2, 3]`         |
| `tuple` | Ordered, immutable collection           | `(1, 2, 3)`         |
| `set`   | Unordered collection of unique elements | `{1, 2, 3}`         |
| `dict`  | Key-value store                         | `{"name": "Alice"}` |
| `str`   | Sequence of Unicode characters          | `"Hello"`           |

### Example: Stack using a List

```python
stack = []
stack.append(1)
stack.append(2)
print(stack.pop())  # Output: 2
```

## 7.2 Time and Space Complexity (Big-O Notation)

As you develop algorithms and write more advanced code, it’s essential to evaluate **how efficiently your code runs**. This is where **Big-O Notation** comes into play. It helps us describe how an algorithm **scales** with input size.

### What is Big-O Notation?

**Big-O Notation** is a mathematical notation that describes the **upper bound** of an algorithm's running time or space usage in the worst-case scenario.

Think of it as answering:

> **"How does performance change as input size grows?"**

### Time Complexity

Time complexity describes **how long** an algorithm takes to run based on the size of the input (`n`).

| Big-O Notation | Name             | Example Algorithm                       |
| -------------- | ---------------- | --------------------------------------- |
| `O(1)`         | Constant Time    | Accessing an element by index           |
| `O(log n)`     | Logarithmic Time | Binary search in a sorted list          |
| `O(n)`         | Linear Time      | Iterating through a list                |
| `O(n log n)`   | Log-linear Time  | Merge sort, quicksort average case      |
| `O(n^2)`       | Quadratic Time   | Nested loops (e.g., bubble sort)        |
| `O(2^n)`       | Exponential Time | Recursive Fibonacci without memoization |
| `O(n!)`        | Factorial Time   | Solving the traveling salesman problem  |

### Space Complexity

Space complexity refers to **how much memory** an algorithm uses as the input size grows.

For example:

```python
def sum_list(nums):
    total = 0  # O(1) space
    for num in nums:
        total += num
    return total
```

* Time complexity: `O(n)` – we loop over `n` elements
* Space complexity: `O(1)` – only one `total` variable is used

### Additional Examples

#### Constant Time - O(1)

```python
def get_first_item(lst):
    return lst[0]
```

This takes the same amount of time no matter how big `lst` is.

#### Linear Time - O(n)

```python
def print_items(lst):
    for item in lst:
        print(item)
```

As `n` grows, the number of operations grows linearly.

#### Quadratic Time - O(n^2)

```python
def print_pairs(lst):
    for i in lst:
        for j in lst:
            print(i, j)
```

For each element, we iterate again over the list.

#### Logarithmic Time - O(log n)

```python
def binary_search(sorted_list, target):
    low, high = 0, len(sorted_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_list[mid] == target:
            return mid
        elif sorted_list[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

Each iteration halves the search space.

### Comparing Time Complexities with Growth

Imagine you're processing a list of 1,000 elements:

* O(1): 1 step
* O(log n): \~10 steps
* O(n): 1,000 steps
* O(n log n): \~10,000 steps
* O(n²): 1,000,000 steps

> This is why choosing the right algorithm matters!

## 7.3 Common Algorithms in Python

Now that we've discussed the Big-O Notation, let's review some common algorithms in Python.

### Linear Search

```python
def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1
```

**Time Complexity**

Best Case: `O(1)`
- If the target is the first element in the list.

Worst Case: `O(n)`
- If the target is at the end or not in the list at all.

Average Case: `O(n)`
- On average, the target will be found halfway through the list (assuming uniform distribution).

**Space Complexity**

Average Case: `O(1)` — constant space.
- The algorithm only uses a few variables (`i`, `value`, and `target`) regardless of input size.
- It does not use any additional data structures or recursive calls.

### Binary Search

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

> **Note**: Requires the array to be sorted.

**Time Complexity**

Best Case: `O(1)`
- if the target is the middle left element.

Worst Case: `O(log n)`
- The array is halved in each step, so the maximum number of iterations is logarithmic in base 2.

Average Case: `O(log n)`
- Even if the element is found randomly or not found at all, it still goes through log(n) comparisons.

**Space Complexity**

Average Case: `O(1)`
- The algorithm only uses a few variables (`left`, `right`, and `mid`) regardless of input size.
- It does not use any additional data structures or recursive calls.

### Bubble Sort

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
```

**Time Complexity**

Best Case: `O(n)`
-  When the array is already sorted and **you optimize the algorithm** to detect no swaps and break early (your version **does not do this**, so technically it's still `O(n²)`).
- If optimized: one pass, no swaps → detect sorted → exit early.

Average Case: `O(n²)`
- Regardless of data distribution, you'll generally end up doing around `n*(n-1)/2` comparisons and swaps.

Worst Case: `O(n²)`
- The array is sorted in reverse. Every pass makes `n-i-1` comparisons.
- Total comparisons:

```
  (n-1) + (n-2) + ... + 1 = n(n-1) / 2
```

## 7.4 Additional Useful Data Structures in Python

In addition to Python's built-in types (`list`, `set`, `tuple`, `dict`), there are several other useful data structures in the `collections` and `heapq` modules that are worth looking into further.

| Structure              | Source Module | Description                                                                                                        |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `deque`                | `collections` | Double-ended queue with O(1) append and pop operations on both ends. Great for queues and sliding window problems. |
| `defaultdict`          | `collections` | Dictionary with a default value factory. Excellent for frequency counts and grouping items.                        |
| `OrderedDict`          | `collections` | Dict that preserves insertion order (mostly obsolete after Python 3.7 where dicts do the same).                    |
| `Counter`              | `collections` | Dict subclass for counting hashable items.                                                                         |
| `namedtuple`           | `collections` | Immutable and self-documenting tuple subclass with named fields.                                                   |
| `heapq`                | `heapq`       | Binary heap implementation, useful for priority queues and efficient minimum retrieval.                            |
| `queue.Queue`          | `queue`       | Thread-safe FIFO queue, useful in concurrency contexts.                                                            |
| `array.array`          | `array`       | Compact storage of basic C-style data types (int, float).                                                          |
| `set` and `frozenset`  | built-in      | Mutable and immutable sets with fast membership tests.                                                             |
| `bitarray` (3rd-party) | `bitarray`    | Efficient arrays of booleans or bits (optional, if using external libraries).                                      |


---

Problem solving in Computer Science revolves around data structures and algorithms. Structuring a problem using optimal data structures and using the correct algorithms to solve the problem have great impact on the performance and usability for the software.



