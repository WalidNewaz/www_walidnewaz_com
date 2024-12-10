---
featured: false
date: "2023-07-26"


series: "Mastering TypeScript"
part: "II. Intermediate Topics"
chapter: "5. Unions, Intersections, and Generics"


# series: "Mastering TypeScript Series"
# chapter: "2. Intermediate Topics"
title: "Unions, Intersections, and Generics"
description: "Advanced TypeScript Types: Unions, Intersections, and Generics."
hero_image: "mohammad-rahmani-_Fx34KeqIEw-unsplash.jpg"
tags: ["object oriented", "typescript"]
read_time: 15 min
related: 
  - "Introduction to TypeScript"
  - "Understanding TypeScript Types"
  - "Classes, Interfaces, and Objects in TypeScript"
---

# Advanced TypeScript Types: Unions, Intersections, and Generics

TypeScript's type system is one of its most powerful features, providing a robust way to define the structure and behavior of data in your applications. In this article, we'll dive into three advanced TypeScript types: unions, intersections, and generics. We'll explore how these types work, provide real-world examples, and discuss best practices for using them to build scalable enterprise solutions. Additionally, we'll touch on polymorphism, function overloading, and utility types.

## Unions

Union types allow you to define a variable that can hold multiple types. This is particularly useful when a value can be one of several types.

```typescript {numberLines}
function printId(id: number | string): void {
  if (typeof id === "string") {
    console.log(`Your ID is: ${id.toUpperCase()}`);
  } else {
    console.log(`Your ID is: ${id}`);
  }
}

printId(123);        // Your ID is: 123
printId("abc123");   // Your ID is: ABC123
```

In this example:
- The `printId` function accepts a parameter `id` that can be either a `number` or a `string`.
- We use type guards (`typeof`) to handle each type differently.

### Real-World Use Case: API Responses

Union types are useful when dealing with API responses that can return different types based on the request.

```typescript {numberLines}
type ApiResponse = SuccessResponse | ErrorResponse;

interface SuccessResponse {
  success: true;
  data: any;
}

interface ErrorResponse {
  success: false;
  error: string;
}

function handleApiResponse(response: ApiResponse): void {
  if (response.success) {
    console.log("Data:", response.data);
  } else {
    console.error("Error:", response.error);
  }
}
```

## Intersections

Intersection types allow you to combine multiple types into one. This is useful when you want a variable to conform to multiple type constraints.

### Example: Intersection Types

```typescript {numberLines}
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "John Doe",
  employeeId: 12345,
};

console.log(employee); // { name: "John Doe", employeeId: 12345 }
```

In this example:
- The `EmployeePerson` type is an intersection of `Person` and `Employee`.
- An `employee` object must have properties from both `Person` and `Employee`.

### Real-World Use Case: Combining Interfaces

Intersection types are beneficial when combining multiple interfaces to create a more complex type.

```typescript {numberLines}
interface Admin {
  permissions: string[];
}

type AdminEmployee = Person & Employee & Admin;

const adminEmployee: AdminEmployee = {
  name: "Jane Smith",
  employeeId: 67890,
  permissions: ["read", "write", "delete"],
};

console.log(adminEmployee);
// { name: "Jane Smith", employeeId: 67890, permissions: ["read", "write", "delete"] }
```

## Generics

Generics allow you to create reusable components that work with any data type. They provide a way to define functions, classes, and interfaces that are type-safe and flexible.

### Generic Functions

A generic function allows you to define a function that can work with any data type.

```typescript {numberLines}
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<number>(42));    // 42
console.log(identity<string>("Hello")); // Hello
```

In this example:
- The `identity` function is a generic function that accepts a parameter of type `T` and returns a value of the same type.
- We can call `identity` with different types (e.g., `number`, `string`).

#### Generic Functions with Constraints

You can use constraints to restrict the types that can be used with your generic function.

```typescript {numberLines}
function loggingIdentity<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("Hello, World!"); // 13
loggingIdentity([1, 2, 3, 4, 5]); // 5
loggingIdentity({ length: 10, value: "foo" }); // 10

// loggingIdentity(42); // Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

In this example:
- The `loggingIdentity` function is constrained to types that have a `length` property.
- This allows you to use the function with strings, arrays, or any other type that has a `length` property.

#### Generic Functions with Multiple Type Parameters

You can define generic functions with multiple type parameters to handle more complex scenarios.

```typescript {numberLines}
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
console.log(merged); // { name: "Alice", age: 30 }
```

In this example:
- The `merge` function takes two generic type parameters, `T` and `U`.
- It returns a new object that is the intersection of `T` and `U`.

### Generic Classes

A generic class allows you to create a class that can work with different data types.

```typescript {numberLines}
class Box<T> {
  contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("Hello, World!");

console.log(numberBox.getContents()); // 123
console.log(stringBox.getContents()); // Hello, World!
```

In this example:
- The `Box` class has a generic type parameter `T`.
- The `contents` property and the `getContents` method both use the type `T`.

#### Generic Classes with Constraints

You can also use constraints with generic classes to restrict the types that can be used.

```typescript {numberLines}
interface Identifiable {
  id: number;
}

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}

interface User extends Identifiable {
  name: string;
}

const userRepository = new Repository<User>();

userRepository.add({ id: 1, name: "Alice" });
userRepository.add({ id: 2, name: "Bob" });

const user = userRepository.getById(1);
console.log(user); // { id: 1, name: "Alice" }
```

In this example:
- The `Repository` class is constrained to types that extend the `Identifiable` interface.
- The `add` method adds an item to the repository.
- The `getById` method retrieves an item by its ID.

#### Generic Classes with Multiple Type Parameters

You can also define generic classes with multiple type parameters.

```typescript {numberLines}
class Pair<T, U> {
  constructor(public first: T, public second: U) {}

  getFirst(): T {
    return this.first;
  }

  getSecond(): U {
    return this.second;
  }
}

const pair = new Pair<string, number>("Hello", 42);
console.log(pair.getFirst()); // Hello
console.log(pair.getSecond()); // 42
```

In this example:
- The `Pair` class has two generic type parameters, `T` and `U`.
- The class has two properties, `first` and `second`, which are of types `T` and `U`, respectively.

### Generic Interfaces

Generic interfaces in TypeScript allow you to create flexible and reusable components that can work with different data types.

```typescript {numberLines}
interface Container<T> {
  value: T;
}

const stringContainer: Container<string> = { value: "Hello, World!" };
const numberContainer: Container<number> = { value: 42 };

console.log(stringContainer.value); // Hello, World!
console.log(numberContainer.value); // 42
```

In this example:
- The `Container` interface has a generic type parameter `T`.
- The `value` property is of type `T`, making the container adaptable to any type.

#### Generic Interfaces with Multiple Generic Types

You can define an interface with multiple generic type parameters to handle more complex scenarios.

```typescript {numberLines}
interface Pair<T, U> {
  first: T;
  second: U;
}

const stringNumberPair: Pair<string, number> = { first: "One", second: 1 };
const booleanStringPair: Pair<boolean, string> = { first: true, second: "True" };

console.log(stringNumberPair); // { first: "One", second: 1 }
console.log(booleanStringPair); // { first: true, second: "True" }
```

In this example:
- The `Pair` interface has two generic type parameters, `T` and `U`.
- This allows you to create pairs of different types.

#### Generic Interface for Functions

You can also use generic interfaces to define function types that are flexible with their parameter and return types.

```typescript {numberLines}
interface Transformer<T, U> {
  (input: T): U;
}

const stringToNumber: Transformer<string, number> = (input) => parseInt(input, 10);
const numberToString: Transformer<number, string> = (input) => input.toString();

console.log(stringToNumber("123")); // 123
console.log(numberToString(456)); // "456"
```

In this example:
- The `Transformer` interface defines a function type that transforms a value of type `T` to a value of type `U`.
- This can be useful for creating functions that perform type-safe transformations.

#### Real-World Example: Generic Repository Pattern

A common use case for generic interfaces is implementing the repository pattern in a way that works with various data models.

```typescript {numberLines}
interface Repository<T> {
  add(item: T): void;
  getAll(): T[];
}

class MemoryRepository<T> implements Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

interface User {
  id: number;
  name: string;
}

const userRepository: Repository<User> = new MemoryRepository<User>();

userRepository.add({ id: 1, name: "Alice" });
userRepository.add({ id: 2, name: "Bob" });

console.log(userRepository.getAll());
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

In this example:
- The `Repository` interface defines methods for adding and retrieving items.
- The `MemoryRepository` class implements the `Repository` interface.
- This allows you to create repositories for different data models, like `User`, in a type-safe manner.

#### Using Generic Constraints

Sometimes you want to impose constraints on the types that can be used with your generic interface. You can achieve this using `extends`.

```typescript {numberLines}
interface Identifiable {
  id: number;
}

interface Repository<T extends Identifiable> {
  add(item: T): void;
  getAll(): T[];
}

class MemoryRepository<T extends Identifiable> implements Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

interface User extends Identifiable {
  name: string;
}

const userRepository: Repository<User> = new MemoryRepository<User>();

userRepository.add({ id: 1, name: "Alice" });
userRepository.add({ id: 2, name: "Bob" });

console.log(userRepository.getAll());
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
```

In this example:
- The `Identifiable` interface defines an `id` property.
- The `Repository` and `MemoryRepository` interfaces use `T extends Identifiable` to enforce that the generic type `T` must have an `id` property.

## Polymorphism

Polymorphism is a core concept in object-oriented programming that allows objects to be treated as instances of their parent class rather than their actual class. In TypeScript, polymorphism is achieved through inheritance and interfaces.

### Example: Polymorphism with Classes

```typescript {numberLines}
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }
}

function createAnimalSound(animal: Animal): void {
  animal.makeSound();
}

const dog = new Dog();
const cat = new Cat();

createAnimalSound(dog); // Woof!
createAnimalSound(cat); // Meow!
```

In this example:
- `Animal` is an abstract class with an abstract method `makeSound`.
- `Dog` and `Cat` extend `Animal` and implement `makeSound`.
- The `createAnimalSound` function accepts any `Animal` type and calls the `makeSound` method, demonstrating polymorphism.

## Function Overloading

Function overloading allows you to define multiple signatures for a function, providing different ways to call it based on the argument types.

```typescript {numberLines}
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

console.log(add(1, 2));         // 3
console.log(add("Hello, ", "World!")); // Hello, World!
```

In this example:
- The `add` function has two overloads: one for adding numbers and one for concatenating strings.
- The implementation combines both cases using `any` type.

## Utility Types

TypeScript provides several utility types to facilitate common type transformations. These utility types can help simplify and manage types in large codebases.

### Example: Partial, Readonly, and Pick

```typescript {numberLines}
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserNameAndEmail = Pick<User, "name" | "email">;

const user: PartialUser = { id: 1 };
const readonlyUser: ReadonlyUser = { id: 1, name: "John", email: "john@example.com" };
const userNameAndEmail: UserNameAndEmail = { name: "John", email: "john@example.com" };

console.log(user);            // { id: 1 }
console.log(readonlyUser);    // { id: 1, name: "John", email: "john@example.com" }
console.log(userNameAndEmail); // { name: "John", email: "john@example.com" }
```

### Utility Types Overview

- **Partial<T>**: Makes all properties in `T` optional.
- **Readonly<T>**: Makes all properties in `T` read-only.
- **Pick<T, K>**: Creates a type by picking a set of properties `K` from `T`.

For a comprehensive list of utility types and more detailed examples, refer to the [TypeScript documentation on Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

## Best Practices

### Type Guards

When using union types, it's essential to use type guards to ensure type safety.

```typescript {numberLines}
function isString(value: any): value is string {
  return typeof value === "string";
}

function printValue(value: number | string): void {
  if (isString(value)) {
    console.log(`String value: ${value}`);
  } else {
    console.log(`Number value: ${value}`);
  }
}
```

### Use Intersections Wisely

While intersection types are powerful, overusing them can lead to complex and hard-to-maintain code. Use them when you need to combine types logically.

### Embrace Generics

Generics are crucial for writing reusable and type-safe code. Use them for creating flexible and generic data structures and algorithms.

## Conclusion

Understanding and leveraging advanced TypeScript types like unions, intersections, and generics can significantly enhance your ability to build and manage scalable enterprise solutions. Polymorphism and function overloading further extend the flexibility and reusability of your code. Utility types simplify type transformations, making your codebase more maintainable.

By following best practices and using these types effectively, you can create robust and maintainable TypeScript applications. For further learning, consider exploring the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) and other TypeScript resources.
