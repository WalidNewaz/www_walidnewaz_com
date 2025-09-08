---
featured: false
date: "2023-08-21"

series: "Mastering TypeScript"
part: "IV. Advanced Topics"
chapter: "12. TypeScript Decorators"


# series: "Mastering TypeScript Series"
# chapter: "4. Advanced Topics"
slug: /decorators
title: "TypeScript Decorators"
description: "TypeScript decorators provide a powerful and expressive way to modify and annotate class declarations and members. Decorators can be attached to a class declaration, method, accessor, property, or parameter. In this article, we'll explore how decorators work, how to use them effectively, and real-world scenarios where they can significantly enhance your application's architecture."
# hero_image: "mohammad-rahmani-_Fx34KeqIEw-unsplash.jpg"
tags: ["decorators", "typescript"]
read_time: 20 min
related:
  - "Introduction to TypeScript"
  - "Understanding TypeScript Types"
  - "Classes, Interfaces, and Objects in TypeScript"
---

# TypeScript Decorators: Leveraging Metadata in Your Applications

TypeScript decorators provide a powerful and expressive way to modify and annotate class declarations and members. Decorators can be attached to a class declaration, method, accessor, property, or parameter. In this article, we'll explore how decorators work, how to use them effectively, and real-world scenarios where they can significantly enhance your application's architecture.

## What Are Decorators?

Decorators are a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

To enable experimental support for decorators in TypeScript, you need to enable the `experimentalDecorators` compiler option in your `tsconfig.json`:

```json {numberLines}
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## Basic Example of a Decorator

Here’s a simple example of a class decorator:

```typescript {numberLines}
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

The `@sealed` decorator will seal both the constructor and its prototype so that no new properties can be added to them.

## Decorator Factories

If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A decorator factory is simply a function that returns the expression that will be called by the decorator at runtime.

```typescript {numberLines}
function color(value: string) {
  return function (constructor: Function) {
    constructor.prototype.color = value;
  }
}

@color('blue')
class Car {
  model: string;
  constructor(model: string) {
    this.model = model;
  }
}
```

In this example, `@color('blue')` is a decorator factory. When `Car` class is instantiated, it will have an additional `color` property set to 'blue'.

## Types of Decorators and Their Usage

TypeScript supports several types of decorators:

### 1. Class Decorators

Class decorators are applied to the constructor of the class and can be used to modify or replace the class definition.

```typescript {numberLines}
function sealed(constructor: Function) {
  console.log('Sealing the constructor');
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

#### How It's Used

- The `@sealed` decorator is applied directly before the class definition.
- When an instance of `Greeter` is created, the class constructor and its prototype are sealed, meaning no new properties can be added to them, and existing properties cannot be removed. This is useful for finalizing an API of a class to ensure stability and consistency.

#### Real-World Use Case

Imagine you are developing a library or a framework where you need to ensure that the consumers do not accidentally modify the structure of core classes. Using a sealed decorator can prevent such modifications, thereby preventing potential bugs and ensuring that everyone uses the API as intended. This is especially useful in scenarios where stability and consistency of the API are critical, such as in SDKs for third-party use or in large-scale enterprise applications where multiple teams are working on the same codebase.

### 2. Method Decorators

Method decorators are applied to method definitions and can observe, modify, or replace method definitions.

```typescript {numberLines}
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

#### How It's Used

The `@enumerable(false)` decorator modifies the `enumerable` attribute of the `greet` method. This means the `greet` method will not show up if the object’s methods are iterated over in a `for...in` loop. This can be useful for methods that should be hidden from certain types of introspection.

#### Real-World Use Case: Caching values

Creating a cacheable method decorator in TypeScript can enhance the performance of your application by avoiding redundant executions of expensive function calls. This decorator will check if the result of the method is already cached; if so, it retrieves the result from the cache, otherwise, it executes the method and caches the result.

Here is an example of how you might implement the cacheable decorator:

```typescript {numberLines}
function cacheable(cacheKey: string) {
    return function (
        target: any,
        propertyName: string,
        descriptor: PropertyDescriptor
    ) {
        const method = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const cache = target.constructor.cache = target.constructor.cache || {};
            const key = `${cacheKey}_${JSON.stringify(args)}`;

            if (cache[key] !== undefined) {
                console.log(`Cache hit for key: ${key}`);
                return cache[key];
            }

            console.log(`Cache miss for key: ${key}. Computing and caching result.`);
            const result = method.apply(this, args);
            cache[key] = result;
            return result;
        };
    };
}

class MathOperations {
    @cacheable('add')
    add(x: number, y: number): number {
        console.log(`Performing addition: ${x} + ${y}`);
        return x + y;
    }

    @cacheable('multiply')
    multiply(x: number, y: number): number {
        console.log(`Performing multiplication: ${x} * ${y}`);
        return x * y;
    }
}
```

#### Usage

```typescript {numberLines}
const math = new MathOperations();

console.log(math.add(5, 3));  // Cache miss, performs addition
console.log(math.add(5, 3));  // Cache hit, returns cached result

console.log(math.multiply(4, 2));  // Cache miss, performs multiplication
console.log(math.multiply(4, 2));  // Cache hit, returns cached result
```

### 3. Accessor Decorators

Accessor decorators are similar to method decorators but are specifically used to observe, modify, or replace accessors (getters/setters).

```typescript {numberLines}
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() { return this._x; }

  @configurable(false)
  get y() { return this._y; }
}
```

#### How It's Used

The `@configurable(false)` decorator makes the getter properties for `x` and `y` non-configurable, meaning these properties cannot be deleted or changed to another property descriptor. This is crucial for encapsulation in object-oriented design where some properties must remain immutable.

#### Real-world example: User Profile Management System

Consider a user profile management system where you need to ensure that:

1. Email addresses are always stored in a standardized format.
2. Usernames must adhere to specific validation rules.

This is an ideal case for using accessor decorators, as they can help encapsulate the validation and normalization logic directly within the class that represents a user profile.

#### Implementing Accessor Decorators

First, let's define a couple of decorator functions, validateEmail and formatUsername, which will be used to decorate accessors:

```typescript {numberLines}
function validateEmail(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;

    descriptor.set = function(value: string) {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            throw new Error('Invalid email format');
        }
        originalSet.call(this, value.toLowerCase());  // Normalize email to lowercase
    };
}

function formatUsername(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;

    descriptor.set = function(value: string) {
        if (value.length < 3 || value.length > 20) {
            throw new Error('Username must be between 3 and 20 characters');
        }
        originalSet.call(this, value.trim());  // Trim whitespace
    };
}
```

#### User Class with Decorated Accessors

Now, we apply these decorators to a User class:

```typescript {numberLines}
class User {
    private _email: string;
    private _username: string;

    constructor(email: string, username: string) {
        this.email = email;  // Using setter
        this.username = username;  // Using setter
    }

    @validateEmail
    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    @formatUsername
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }
}
```

#### Usage

```typescript {numberLines}
try {
    const user = new User("JohnDoe@example.com", " JohnDoe ");
    console.log(user.email);  // Output: johndoe@example.com
    console.log(user.username);  // Output: JohnDoe
    user.email = "bad-email";  // This will throw an error
} catch (error) {
    console.error(error.message);
}
```

#### Explanation

1. **Email Validation and Normalization**: The `validateEmail` decorator is used to ensure that any email address set on a User instance is valid according to a specified regex pattern. If the email is valid, it normalizes the email to lowercase before setting it.
2. **Username Formatting**: The `formatUsername` decorator checks that the username is within a specific length and removes any leading or trailing whitespace.

### 4. Property Decorators

Property decorators are used to modify the properties of a class.

```typescript {numberLines}
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() { return formatString; },
      set(newVal) {
        formatString = newVal;
      }
    });
  };
}

class DateRange {
  @format('YYYY-MM-DD')
  startDate: string;
  endDate: string;
}
```

#### How It's Used

The `@format` decorator dynamically changes the getter and setter of the `startDate` property to enforce a specific string format. Whenever `startDate` is accessed, it returns a format string, and when a new value is set, it updates the format string. This ensures data consistency, especially useful for properties that require validation or a specific format (like dates or phone numbers).

#### Real-world example: E-commerce Application with Product Rating

Imagine you're developing an e-commerce platform, and you want to ensure that all product ratings fall within a specific range before being assigned to a product. This is critical to maintain data integrity and prevent invalid operations. A property decorator can be used to validate and modify the product rating as it's assigned.

#### Implementing Property Decorators

First, let's define a `validateRating` property decorator that ensures the rating is within the allowed range (1 to 5):

```typescript {numberLines}
function validateRating(target: any, key: string): any {
    let value: number = target[key];

    const getter = () => value;
    const setter = (newVal: number) => {
        if (newVal < 1 || newVal > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        console.log(`Setting rating to ${newVal}`);
        value = newVal;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}
```

#### Product Class with Decorated Property

Now, apply this decorator to a `Product` class:

```typescript {numberLines}
class Product {
    @validateRating
    public rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }
}
```

#### Usage

```typescript {numberLines}
try {
    const product = new Product(4);
    console.log(product.rating);  // Output: 4

    product.rating = 2;
    console.log(product.rating);  // Output: 2

    product.rating = 6;  // This will throw an error
} catch (error) {
    console.error(error.message);
}
```

#### Explanation

- **Rating Validation**: The `validateRating` decorator intercepts any assignment to the `rating` property. It validates the new value to ensure it falls within the acceptable range (1 to 5). If the value is out of range, it throws an error, preventing the assignment.


### 5. Parameter Decorators

Parameter decorators are applied to the parameters of class methods or constructors.

```typescript {numberLines}
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} on ${propertyKey.toString()} is required.`);
}

class User {
  login(@required username: string, @required password: string) {
    console.log(`${username} is logging in with ${password}`);
  }
}
```

#### How It's Used

- The `@required` decorator can be used to log, validate, or enforce rules whenever certain parameters are used in methods or constructors. In this example, it logs a message indicating that the parameters `username` and `password` are required, which could be expanded to throw an error if these parameters are not provided, enhancing the robustness of method implementations.

#### Real-world example: API Development in NestJS

Let's consider a practical scenario in a RESTful API developed using NestJS, a popular framework for building efficient, reliable, and scalable server-side applications. NestJS heavily utilizes decorators for various purposes, including routing, dependency injection, and custom middleware.

In this example, we'll create a parameter decorator that automatically extracts and validates a specific query parameter from an API request.

#### Implementing a Parameter Decorator

We'll define a parameter decorator called `ReqQuery` which checks if a required query parameter is present in the request. It will throw an error if the parameter is missing, ensuring that the subsequent controller method only runs when all necessary parameters are provided.

Here's how you might implement such a decorator:

```typescript {numberLines}
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.query[data];
    if (!value) {
      throw new Error(`Query parameter "${data}" is required.`);
    }
    return value;
  }
);
```

#### Usage in a NestJS Controller

Now, let's use the `ReqQuery` decorator in a NestJS controller to handle a specific route where a query parameter is mandatory:

```typescript {numberLines}
import { Controller, Get } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get()
  search(@ReqQuery('term') searchTerm: string) {
    return `Searching for: ${searchTerm}`;
  }
}
```

#### Explanation

- **Parameter Extraction and Validation**: The `ReqQuery` decorator abstracts the logic for fetching and validating a query parameter. When the `search` method is called, it ensures that the `term` query parameter is present in the request. If the parameter is missing, it throws an error before the method body executes.
- **Decoupling**: This approach keeps the validation logic decoupled from the business logic in the controller, leading to cleaner and more maintainable code.

## Conclusion

TypeScript decorators offer a declarative and flexible way to add metadata and modify the behavior of classes, properties, methods, and parameters. By understanding how to effectively use each type of decorator, developers can write more maintainable, readable, and robust TypeScript applications. Decorators encapsulate functionality that can be reused and are particularly useful in large-scale applications, frameworks, and libraries where consistent behavior across different parts of the application is crucial.

## References

- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [Understanding TypeScript’s decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)

By understanding and leveraging decorators, TypeScript developers can write more concise, readable, and maintainable code that encapsulates complex logic around how properties and methods behave. Decorators provide an elegant way to clearly separate concerns and extend functionality in a maintainable manner.
