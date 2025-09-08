---
featured: false
date: "2023-11-01"

series: "Python for Modern Developers"
part: "I. Core Python Language"
chapter: "4. Working with Files and Data Serialization"

title: "Files and Data Serialization"
description: "This chapter demonstrates how Python applications read, write, and serialize data into and from files. We will handle text, binary, CSV, JSON, and other common file formats."
# hero_image: "python-tutorial-banner.png"
has_quiz: true
tags: ["fundamentals", "Python"]
---

# Chapter 4: Working with Files and Data Serialization

Modern Python applications frequently read, write, and serialize data. From logs and configuration files to API responses and datasets, the ability to handle different file formats is crucial. In this chapter, you’ll learn how to:

* Read and write files using different modes (`r`, `w`, `a`, `x`, `b`)
* Handle text, CSV, JSON, Pickle, and YAML formats
* Create and delete files and directories
* Implement a practical **log parser** that exports structured JSON
* Write **testable file I/O logic** using temp directories

## 4.1 File Modes, Creation, and Directory Operations

### File Modes in Python

| Mode  | Description                           |
| ----- | ------------------------------------- |
| `'r'` | Read (default); file must exist       |
| `'w'` | Write; overwrites or creates new file |
| `'a'` | Append to file                        |
| `'x'` | Create file; fails if it exists       |
| `'b'` | Binary mode                           |
| `'t'` | Text mode (default)                   |

### Reading a Text File:

Let's say you have a text file with the following content:

```
This is a simple text file.
This is the second line of the text file.
This is the last line of the text file.
```

Here is a small python program that reads the content of the file into a variable and prints it on the console.

```python {numberLines}
file_path = 'sample.txt'

try:
    # File opened in read mode
    with open(file_path, 'r') as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print(f"File {file_path} not found.")
```

### Writing to a Text File:

The following program demonstrates writing a string into a text file.

```python
output_path = 'output.txt'

# File opened in write mode
with open(output_path, 'w') as file:
    file.write("This is a new line.\nAnother line.")
```

> **Tip:** Use **`with open()`** to ensure the file closes automatically.

### Creating and Deleting Files

```python
# Create
with open("temp.txt", "x") as f:
    f.write("Sample text")

# Delete
import os
if os.path.exists("temp.txt"):
    os.remove("temp.txt")
```

### Working with Directories

```python
import os

# Create directory
os.makedirs("logs", exist_ok=True)

# List directory
print(os.listdir("logs"))

# Remove empty directory
os.rmdir("logs")
```

Use `os.path.join()` for safe cross-platform paths.

## 4.2 Working with Structured Formats: JSON, CSV, Pickle, YAML

### JSON files

```python
import json

data = {"name": "Alice", "skills": ["Python", "ML"]}

# Write
with open("user.json", "w") as f:
    json.dump(data, f, indent=2)

# Read
with open("user.json", "r") as f:
    print(json.load(f))
```

### CSV files

```python
import csv

rows = [["Name", "Age"], ["Alice", 30], ["Bob", 25]]

# Write CSV
with open("people.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# Read CSV
with open("people.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
```

### Pickle

Python's Pickle module serializes Python objects to binary.

```python
import pickle

data = {"x": 1, "y": 2}

# Save binary
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

# Load binary
with open("data.pkl", "rb") as f:
    restored = pickle.load(f)
    print(restored)
```

> ⚠️ **Warning**: Never unpickle untrusted data. It may execute arbitrary code.

### YAML

YAML is human-readable and common in configuration files. Requires `pyyaml`:

```bash
pip install pyyaml
```

Reading and writing YAML files.

```python
import yaml

data = {"server": {"port": 8000, "debug": True}}

# Write YAML
with open("config.yaml", "w") as f:
    yaml.dump(data, f)

# Read YAML
with open("config.yaml", "r") as f:
    loaded = yaml.safe_load(f)
    print(loaded)
```

## 4.3 Example: Log Parser Saving Output as JSON

### Input: `server.log`

```
[INFO] Service started
[WARNING] Disk space low
[ERROR] Failed to connect
```

### Parser: `log_parser.py`

```python
import os
import json

def parse_log_file(input_path, output_path):
    if not os.path.exists(input_path):
        raise FileNotFoundError("Log file not found.")

    entries = []
    with open(input_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("[") and "]" in line:
                level_end = line.index("]")
                level = line[1:level_end]
                message = line[level_end+1:].strip()
                entries.append({"level": level, "message": message})

    with open(output_path, "w") as out:
        json.dump(entries, out, indent=2)

    return entries

if __name__ == "__main__":
    parse_log_file(sys.argv[1], sys.argv[2])
```

### Run the Parser

```bash
python log_parser.py server.log server_log.json
```

Expected output (saved in `server_log.json`):

```json
[
  { "level": "INFO", "message": "Service started" },
  { "level": "WARNING", "message": "Disk space low" },
  { "level": "ERROR", "message": "Failed to connect" }
]
```

## 4.4 Testing File I/O with Temp Directories

Test file I/O safely with `pytest` and `tmp_path`.

### File: `test_log_parser.py`

```python
import json
from log_parser import parse_log_file

def test_log_parser(tmp_path):
    log_file = tmp_path / "server.log"
    output_file = tmp_path / "server.json"

    log_file.write_text("[INFO] Test log\n[ERROR] Crash")

    results = parse_log_file(log_file, output_file)

    assert results[0]["level"] == "INFO"
    assert results[1]["message"] == "Crash"

    saved = json.loads(output_file.read_text())
    assert saved == results
```

```bash
pytest
```

## 4.5 Python file/directory manipulation functions

### File I/O – Text Files

| Function / Method        | Description                                              | Example                        |
| ------------------------ | -------------------------------------------------------- | ------------------------------ |
| `open(file, mode='r')`   | Opens a file in a given mode                             | `open("file.txt", "w")`        |
| `file.read()`            | Reads the entire content of a file                       | `data = f.read()`              |
| `file.readline()`        | Reads a single line                                      | `line = f.readline()`          |
| `file.readlines()`       | Reads all lines into a list                              | `lines = f.readlines()`        |
| `file.write(data)`       | Writes a string to the file                              | `f.write("Hello\n")`           |
| `file.writelines(lines)` | Writes a list of strings to a file                       | `f.writelines(["a\n", "b\n"])` |
| `file.close()`           | Closes the file (not needed with `with open(...) as f:`) | `f.close()`                    |
| `with open(...)`         | Context manager for safe file handling                   | `with open(...) as f:`         |

### File I/O – Binary Files

| Function / Method   | Description                               | Example                            |
| ------------------- | ----------------------------------------- | ---------------------------------- |
| `open(file, 'rb')`  | Opens file for **reading** in binary mode | `with open("img.jpg", "rb") as f:` |
| `open(file, 'wb')`  | Opens file for **writing** in binary mode | `with open("img.jpg", "wb") as f:` |
| `file.read(size)`   | Reads binary data (optional size)         | `data = f.read(1024)`              |
| `file.write(bytes)` | Writes binary data                        | `f.write(b'\x00\x01')`             |

### File & Directory Utilities (`os`, `shutil`, `pathlib`)

| Function / Method      | Description                      | Example                       |
| ---------------------- | -------------------------------- | ----------------------------- |
| `os.path.exists(path)` | Check if path exists             | `os.path.exists("file.txt")`  |
| `os.remove(path)`      | Delete a file                    | `os.remove("file.txt")`       |
| `os.rename(src, dst)`  | Rename file or directory         | `os.rename("a.txt", "b.txt")` |
| `os.listdir(path)`     | List directory contents          | `os.listdir(".")`             |
| `os.makedirs(path)`    | Create directories recursively   | `os.makedirs("logs/errors")`  |
| `os.rmdir(path)`       | Remove **empty** directory       | `os.rmdir("logs")`            |
| `shutil.rmtree(path)`  | Remove **non-empty** directory   | `shutil.rmtree("logs")`       |
| `os.getcwd()`          | Get current working directory    | `os.getcwd()`                 |
| `os.chdir(path)`       | Change current working directory | `os.chdir("/tmp")`            |

### Path Handling (`os.path`, `pathlib`)

| Function / Method             | Description                            | Example                              |
| ----------------------------- | -------------------------------------- | ------------------------------------ |
| `os.path.join(a, b)`          | Join paths safely                      | `os.path.join("folder", "file.txt")` |
| `os.path.basename(path)`      | Get file name                          | `os.path.basename("/x/y/z.txt")`     |
| `os.path.dirname(path)`       | Get directory path                     | `os.path.dirname("/x/y/z.txt")`      |
| `pathlib.Path(path).exists()` | Check path exists (modern alternative) | `Path("file.txt").exists()`          |
| `pathlib.Path(path).unlink()` | Delete file (like `os.remove`)         | `Path("file.txt").unlink()`          |
| `pathlib.Path(path).mkdir()`  | Create directory                       | `Path("dir").mkdir(exist_ok=True)`   |
| `pathlib.Path(path).rmdir()`  | Remove directory                       | `Path("dir").rmdir()`                |

### JSON Files (`json` module)

| Function                | Description                           | Example                                   |
| ----------------------- | ------------------------------------- | ----------------------------------------- |
| `json.load(file)`       | Parses JSON from a file object        | `data = json.load(open("file.json"))`     |
| `json.loads(string)`    | Parses JSON from a string             | `json.loads('{"a":1}')`                   |
| `json.dump(data, file)` | Writes JSON to file                   | `json.dump(data, open("file.json", "w"))` |
| `json.dumps(data)`      | Converts Python object to JSON string | `json.dumps({"a":1})`                     |

### Pickle Module (`pickle`) – Binary Object Serialization

| Function / Method         | Description                                                | Example                                                  |
| ------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| `pickle.dump(obj, file)`  | Serialize and write an object to a binary file             | `pickle.dump(data, open("data.pkl", "wb"))`              |
| `pickle.load(file)`       | Read and deserialize an object from a binary file          | `data = pickle.load(open("data.pkl", "rb"))`             |
| `pickle.dumps(obj)`       | Serialize object to a bytes object                         | `b = pickle.dumps(data)`                                 |
| `pickle.loads(bytes_obj)` | Deserialize object from bytes                              | `data = pickle.loads(b)`                                 |
| `pickle.HIGHEST_PROTOCOL` | Constant for the most efficient (and recent) pickle format | `pickle.dump(data, f, protocol=pickle.HIGHEST_PROTOCOL)` |

> **Use Case:** Best for Python-only data persistence, such as storing trained ML models or temporary cache structures.
> **Warning:** Pickle is **not secure** against untrusted sources.

### YAML Module (`PyYAML`) – Human-Readable Serialization

To use YAML in Python, install **PyYAML** first:

```bash
pip install pyyaml
```

| Function / Method          | Description                                              | Example                                       |
| -------------------------- | -------------------------------------------------------- | --------------------------------------------- |
| `yaml.dump(data, file)`    | Write Python object to YAML file                         | `yaml.dump(data, open("file.yaml", "w"))`     |
| `yaml.dump(data)`          | Convert object to YAML string                            | `yaml_string = yaml.dump(data)`               |
| `yaml.safe_dump(data)`     | Safer version for basic Python objects                   | `yaml.safe_dump(data, open("f.yaml", "w"))`   |
| `yaml.load(file, Loader)`  | Read YAML file (can execute arbitrary code – **unsafe**) | `data = yaml.load(f, Loader=yaml.FullLoader)` |
| `yaml.safe_load(file)`     | Safely read YAML content into Python object              | `data = yaml.safe_load(open("f.yaml"))`       |
| `yaml.safe_load_all(file)` | Load multiple YAML documents from a single file          | `docs = yaml.safe_load_all(open("f.yaml"))`   |

> **Use Case:** Ideal for configuration files (e.g., Docker, Kubernetes, CI/CD pipelines) and human-editable data.
> **Security Tip:** Always prefer `safe_load()` over `load()` when parsing YAML.


## Summary

You’ve now mastered how to:

* Handle text, binary, and structured files (CSV, JSON, YAML, Pickle)
* Use proper file modes and directory operations
* Build and test a real-world file parser

## What is Next?

In **Chapter 4: Error Handling and Debugging**, we’ll explore:

* Python’s built-in exception handling
* Logging strategies
* Using `pdb` and IDE debuggers
* Enhancing robustness in real-world code
