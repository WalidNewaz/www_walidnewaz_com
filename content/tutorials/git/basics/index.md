---
featured: false
date: "2023-10-13"

series: "Git Mastery Series"
part: "I. Git basics"
chapter: "1. Git Basics — Understanding Version Control"

title: "Understanding Version Control"
description: "In this chapter, we'll cover what Git is, why developers and DevOps engineers need it, and how to start tracking code for a real project."
hero_image: "git-chapter-banner.png"
tags: ["basics", "git"]
---

# Chapter 1: Git Basics — Understanding Version Control

In this chapter, we'll cover **what Git is**, **why developers and DevOps engineers need it**, and **how to start tracking code for a real project**.

We’ll kick off the series by creating a simple Node.js API project called **"TaskTracker API"**, which we’ll evolve and version throughout the series.

## What is Git (Quick and Developer-Focused)?

* **Git** is a distributed version control system.
* It helps you **track file changes**, **collaborate**, and **rollback mistakes**.
* It’s like a **save button for your code**, but with a **timeline, branches, and multiplayer support**.

## Installing Git

If you haven’t already:

**Windows / macOS / Linux:**

[<a href="https://git-scm.com/downloads" target="_blank">https://git-scm.com/downloads</a>](https://git-scm.com/downloads)

After installing, check:

```bash
git --version
```

## Setting Up Git for the First Time

Git needs your name and email for tagging commits.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Verify:

```bash
git config --list
```

## Starting Our Project: TaskTracker API

Let’s build something real: a basic Node.js API for task management.

### 1. Create the project directory:

```bash
mkdir task-tracker-api
cd task-tracker-api
```

### 2. Initialize a Git repository:

```bash
git init
```

Output:

```
Initialized empty Git repository in /path/to/task-tracker-api/.git/
```

### 3. Create some starter files:

```bash
npm init -y
touch index.js
```

Add a simple Express server:

**`index.js`**

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Task Tracker API is running!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

Also install express:

```bash
npm install express
```

### 4. Add files to `.gitignore` (important for Node projects):

**`.gitignore`**

```
node_modules
.env
```

### 5. Check Git status:

```bash
git status
```

You should see:

```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	index.js
	package.json
	package-lock.json
	.gitignore
```

### 6. Stage and Commit Initial Code:

```bash
git add .
git commit -m "Initial commit: Setup TaskTracker API with Express"
```

## Inspecting the Commit History:

```bash
git log
```

Output:

```
commit a1b2c3d4e5f6g7h8 (HEAD -> main)
Author: Your Name <you@example.com>
Date:   Today

    Initial commit: Setup TaskTracker API with Express
```

## Summary (What We Did):

- Installed and configured Git
- Initialized a Git repository
- Created and committed our first working API skeleton
- Added a `.gitignore` to avoid tracking unwanted files

Next, we’ll **dive deeper into commits**, look at how Git **tracks file changes**, and **visualize history** as we start building more features for the TaskTracker API.

We’ll also cover:

* Staging individual files
* Amending commits
* Viewing diffs
* Ignoring files globally