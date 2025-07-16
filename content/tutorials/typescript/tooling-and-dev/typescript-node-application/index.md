---
featured: false
date: "2023-08-02"

series: "Mastering TypeScript"
part: "III. Tooling and Development Environment"
chapter: "7. TypeScript in Node.js"

# series: "Mastering TypeScript Series"
# chapter: "3. Tooling and Development Environment"
title: "TypeScript in Node.js"
description: "TypeScript in Node.js: Writing Your First TypeScript Node Application"
# hero_image: "typescript-banner.png"
tags: ["node.js", "typescript"]
read_time: 15 min
related:
  - "Introduction to TypeScript"
  - "Understanding TypeScript Types"
  - "Classes, Interfaces, and Objects in TypeScript"
---

# TypeScript in Node.js: Writing Your First TypeScript Node Application

Node.js has become a cornerstone of backend development, thanks to its efficiency and the massive ecosystem of packages available through npm. Combining Node.js with TypeScript can enhance your development experience by providing strong typing and the latest ECMAScript features. This guide will walk you through setting up and writing your first TypeScript application in Node.js.

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js (download from [nodejs.org](https://nodejs.org/))
- npm (comes installed with Node.js)
- A text editor or IDE that supports TypeScript (like Visual Studio Code)

## Setting Up Your Project

### Create a new directory for your project and navigate into it

```bash
mkdir my-typescript-app
cd my-typescript-app
```

### Initialize a new npm project

```bash
npm init -y
```

This creates a `package.json` file which manages your project dependencies and scripts.

### Install TypeScript and Node.js types

```bash
npm install --save-dev typescript @types/node
```

`typescript` is the TypeScript compiler, and `@types/node` provides TypeScript definitions for Node.js, which will help with autocompletion and type checking.

### Create a `tsconfig.json` file

This file configures the options for the TypeScript compiler. Create `tsconfig.json` in the root of your project and add the following configuration:

```json {numberLines}
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

- `"module": "commonjs"`: Use CommonJS modules, the standard in Node.js.
- `"esModuleInterop": true`: Enables compatibility with non-ESModule packages.
- `"target": "es6"`: Compile to ES6.
- `"outDir": "dist"`: Store compiled JavaScript files in the `dist` directory.
- `"include": ["src/**/*"]`: Include all files in the `src` directory for compilation.

### Set up your project structure

Create a `src` directory where your TypeScript (`*.ts`) files will live:

```bash
mkdir src
```

## Writing Your TypeScript Code

Instead of using the basic HTTP module from Node.js, let's use Express.js, a popular web application framework for Node.js that simplifies routing and middleware integration. First, you'll need to install Express and its TypeScript definitions:

```bash
npm install express
npm install --save-dev @types/express
```

Create a new file `src/index.ts`. This will be the entry point for your application:

```typescript {numberLines}
// src/index.ts
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from TypeScript in Node.js using Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

In this example:

- We import and use `express`.
- We define a route for the root URL (`'/'`) that sends a response 'Hello World from TypeScript in Node.js using Express!'.
- We start the server to listen on the specified port.

## Adding Scripts to `package.json`

Modify your `package.json` to include a build script and a start script:

```json {numberLines}
"scripts": {
 "build": "tsc",
 "start": "node dist/index.js"
}
```

- `"build"` compiles your TypeScript files using the TypeScript compiler.
- `"start"` runs your compiled application from the `dist` directory.

## Building and Running Your Application

### Compile your TypeScript application

```bash
npm run build
```

This command will create a new `dist` directory with your compiled JavaScript files.

### Run your Node.js application

```bash
npm start
```

This will start the Express server. You can now visit `http://localhost:3000` in your browser to see your application in action.

## Building a realistic example

Let’s create a more realistic example of an application that simulates the retrieval of data from a database and displaying it.

### Create the database files

To keep things simple for the time being, let’s create the database with some static files:

```typescript {numberLines}
// src/db/persons.ts
export default [
  {
    name: "John Doe",
  },
  {
    name: "Jane Doe",
  },
  {
    name: "John Smith",
  },
  {
    name: "Jane Smith",
  },
];
```

```typescript {numberLines}
// src/db/cars.ts
export default [
  {
    id: 1,
    make: "BMW",
    model: "X5",
    year: 2019,
    owner: "John Doe",
  },
  {
    id: 2,
    make: "Audi",
    model: "Q7",
    year: 2018,
    owner: "John Smith",
  },
  {
    id: 3,
    make: "Mercedes",
    model: "GLE",
    year: 2017,
    owner: "Jane Doe",
  },
  {
    id: 4,
    make: "Toyota",
    model: "RAV4",
    year: 2016,
    owner: "Jane Smith",
  },
];
```

### Create the data models

Let’s create some classes to model the entities within these “databases”.

```typescript {numberLines}
// src/model/Car.ts
/**
 * Represents a car in the system.
 */
export default class Car {
  private id: number;
  private make: string;
  private model: string;
  private year: number;
  private owner: string;

  constructor(
    id: number,
    make: string,
    model: string,
    year: number,
    owner: string
  ) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
  }

  public getId(): number {
    return this.id;
  }

  public getMake(): string {
    return this.make;
  }

  public getModel(): string {
    return this.model;
  }

  public getYear(): number {
    return this.year;
  }

  public getOwner(): string {
    return this.owner;
  }
}
```

Here is the final model:

```typescript {numberLines}
// src/model/Person.ts
import Car from "./Car";

/**
 * Represents a person in the system.
 */
export default class Person {
  private id: number;
  private name: string;
  private car: Car;

  constructor(id: number, name: string, car: Car) {
    this.id = id;
    this.name = name;
    this.car = car;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCar(): Car {
    return this.car;
  }

  public greet(): string {
    return `Hello, ${
      this.name
    }. You drive a ${this.car.getYear()} ${this.car.getMake()} ${this.car.getModel()}.`;
  }
}
```

### Create App class to write the business logic

The app class handles the business logic and handles the requests sent to the server:

```typescript {numberLines}
// src/app.ts
// Models
import Person from "./model/Person";
import Car from "./model/Car";

// Static imports
import persons from "./db/persons";
import cars from "./db/cars";

export default class CarApp {
  public greetUser(id: number) {
    const personName = persons[id - 1].name as string;
    if (!personName) {
      return "Person not found";
    }
    const carData = cars.find((car) => car.owner === personName);
    const car = new Car(
      carData.id,
      carData.make,
      carData.model,
      carData.year,
      carData.owner
    );
    const person = new Person(id, personName, car);
    return person.greet();
  }

  public getUser(id: number) {
    const personName = persons[id - 1].name as string;
    if (!personName) {
      return "Person not found";
    }
    const carData = cars.find((car) => car.owner === personName);
    const car = new Car(
      carData.id,
      carData.make,
      carData.model,
      carData.year,
      carData.owner
    );
    return {
      id,
      name: personName,
      car: {
        id: car.getId(),
        make: car.getMake(),
        model: car.getModel(),
        year: car.getYear(),
      },
    };
  }
}
```

### Update the entry point `index.js` file

Let’s add new write handlers to invoke these business methods:

```typescript {numberLines}
import express from "express";

import CarApp from "./app";

const server = express();
const PORT = 3000;
const app = new CarApp();

server.get("/", (req, res) => {
  res.send("Hello World from TypeScript in Node.js using Express!");
});

// Route to greet user
server.get("/greet/:id", (req, res) => {
  let id = parseInt(req.params.id);
  res.send(app.greetUser(id));
});

// Route to get user data
server.get("/user/:id", (req, res) => {
  let id = parseInt(req.params.id);
  res.json(app.getUser(id));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Build and launch the server

```bash
npm run build
npm start
```

You can visit the following URLs to access the new paths:

`http://localhost:3000/greet/2`
and
`http://localhost:3000/user/3`

## Conclusion

You've just set up and created your first Node.js application using TypeScript and Express! Express simplifies the server creation and routing, making it easier to build complex applications. TypeScript provides static typing and other modern language features that enhance the development experience and maintainability of your application.

To further your knowledge and exploration in using TypeScript with Node.js and Express, here are some useful resources:

- [Express.js Official Website](https://expressjs.com/)
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [npm Documentation](https://docs.npmjs.com/)

This combination of Node.js, Express, and TypeScript is a powerful toolkit for building robust web servers and applications. Happy coding!
