---
featured: false
date: "2023-07-19"

series: "Mastering TypeScript"
part: "I. Introduction and Basics"
chapter: "3. Understanding TypeScript Types"


title: "Understanding TypeScript Types"
description: "TypeScript Fundamentals: Understanding Types and Interfaces. Learn how to write more type-safe and manageable code."
# hero_image: "typescript-banner.png"
tags: ["beginner", "typescript"]
read_time: 15 min
related: 
  - "Introduction to TypeScript"
  - "Environment setup for TypeScript"
---


# TypeScript Fundamentals: Understanding Types and Interfaces

TypeScript adds powerful features to JavaScript, enabling developers to write more reliable and maintainable code. One of the core features of TypeScript is its type system, which helps catch errors at compile time. In this article, we'll explore TypeScript's types and interfaces, understand their usage, and see how they can improve your development workflow. We'll also include code examples and tests using Jest to illustrate their practical application.

## Basic Types

TypeScript provides several basic types that you can use to annotate your variables and function parameters.

### Boolean

This basic data type expresses a simple `true`/`false` value.

```typescript
let isDone: boolean = true;
```

### Number

In JavaScript, as well as TypeScript, all numbers are either floating point values or BigIntegers. The floating point numbers are designated the type `number`, while BigIntegers are designated the type `bigint`. In addition to decimal and hexadecimal literals, TypeScript also supports binary and octal literals introduced in ECMAScript 2015.

```typescript {numberLines}
let decimal: number = 11;
let hex: number = 0xf00d;
let binary: number = 0b1011;
let octal: number = 0o744;
let bigNumber: bigint = 100n;
```

### String

Text data in JavaScript is generally represented as data of type `string`. This is also the case in TypeScript.

```typescript {numberLines}
let color: string = "blue";
color = 'red';
let sentence: string = `Hello ${name}!`;
```

### Array

JavaScript allows an array to be an ordered collection of values, of any type. However TypeScript allows enforcing the type of data that is contained within an array. Here are the ways an array may be declared in TypeScript:

```typescript {numberLines}
let list: number[] = [0, 1, 3];
let evens: Array<number> = [2, 4, 6];
```

### Tuple

Tuples are arrays with a fixed number of elements whose types are known. You can use tuples to express values such as the positions x, y, z in Cartesian coordinates, or longitude, latitude values representing geographic data.

```typescript {numberLines}
let x: [string, number];
key = ["key", 1001];  // OK
key = [10001, "key"]; // Error
```

### Enum

Many high level languages such as C# and Java has had enumerated data types since their inception. JavaScript does not. TypeScript adds this feature which allows a more friendly way to assign names to a set of numeric values.

```typescript {numberLines}
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
```

It is also possible to manually set the values in the enum:

```typescript {numberLines}
enum Position {
  First = 1,
  Second = 2,
  Third = 3,
}

let myPosition: Position = Position.Second;
```

The names of the enum values can be accessed by indexing into the enum as shown below:

```typescript {numberLines}
enum Color {
  Red,
  Green,
  Blue,
}

let name: string = Color[2];
// Displays 'Green'
console.log(name);
```

### Unknown

At times we may need to declare a variable whose type isn't known at compile time. For instance the value may come from dynamic content such as value returned from an API. In this instance, we want to instruct the compiler as well as future readers of the code that this variable could be anything, so we give it the `unknown` type.

```typescript {numberLines}
let notSure: unknown = 4;
notSure = "maybe a string instead";
 
// OK, definitely a boolean
notSure = false;
```

`unknown` types cannot be directly assigned to another variable without performing a type check, such as a [type guard](#type-guards):

```typescript {numberLines}
declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;
// Type 'unknown' is not assignable to type 'number'.

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
  //Type 'boolean' is not assignable to type 'string'.
}
```

### Any

Sometimes you may need to opt-out of type checking all together, either when the type data is not available, or would take an inordinate amount of time to specify. In these scenarios, we label the variables with `any` type.

```typescript {numberLines}
declare function getValue(key: string): any;
// OK, return value of 'getValue' is not checked
const str: string = getValue("myString");
```

The `any` type is a powerful way to work with existing JavaScript source code, and gradually opt-into the TypeScript typing system.

Unlike `unknown`, variables of type `any` can access arbitrary properties, without any errors. This is similar to how JavaScript has been handling object properties.

All properties of an `any` type object are also of type `any`:

```typescript {numberLines}
let looselyTyped: any = {};
let d = looselyTyped.a.b.c.d;
// `d` is of type `any`
```

### Null and Undefined

On their own, `undefined` and `null` are not terribly useful. However, `null` and `undefined` are subtypes of all other types. Therefore, you can assign `null` or `undefined` to a variable of any other type, such as a `string`.

However, when using the `strictNullChecks` flag in `tsconfig.json`, applications of `null` and `undefined` are limited. This helps avoid many common errors.

### Never

The `never` type represents the type of values that never occur. As an example, `never` is the return type of a function that always throws an error, or never returns.

```typescript {numberLines}
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}
 
// Inferred return type is never
function fail() {
  return error("Something failed");
}
 
// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

### Object

`object` is a type that represents composite types, i.e. anything that are not `number`, `string`, `boolean`, `bigint`, `symbol`, `null`, or `undefined`.

```typescript {numberLines}
declare function create(o: object | null): void;
// OK
create({ prop: 0 });
// Argument of type 'number' is not assignable to parameter of type 'object'
create(42)
```

### About `Number`, `String`, `Boolean`, `Symbol` and `Object`

The types `Number`, `String`, `Boolean`, `Symbol` and `Object` are not equivalent to their lowercase versions. These types do not refer to the language primitives, and should almost never be used as types.

```typescript {numberLines}
function reverse(s: String): String {
  return s.split("").reverse().join("");
}
 
reverse("hello world");
```

## Type Annotations

You can explicitly specify the types of variables and function parameters to make your code more predictable and readable.

```typescript {numberLines}
function greet(name: string): string {
  return `Hello, ${name}!`;
}

let greeting: string = greet('Alice');
```

## Type assertions

Type assertions are a way to tell the compiler "trust me". A type assertion is like a type cast in other languages, but it performs no special checking or restructuring of data. It has no runtime impact, and is simply used by the compiler.

Assertions have two forms.

`as`-syntax:

```typescript {numberLines}
let someValue: unknown = "Hello World!";
let strLen: number = (someValue as string).length;
```

"angle-bracket" syntax:

```typescript {numberLines}
let someValue: unknown = "Hello World!";
let strLen: number = (<string>someValue).length;
```

:::tip
When using TypeScript with JSX, only `as`-style assertions are allowed.
:::

## Interfaces

Interfaces are used to define the shape of objects, making your code more expressive and enforcing a contract for your objects.

```typescript {numberLines}
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(): User {
  return {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  };
}

let user: User = getUser();
```

## Type Aliases

Type aliases are similar to interfaces, but they can also represent primitive types, union types, and more.

```typescript {numberLines}
type ID = number;
type Status = 'active' | 'inactive';

interface Product {
  id: ID;
  name: string;
  status: Status;
}

function getProduct(): Product {
  return {
    id: 101,
    name: 'Laptop',
    status: 'active'
  };
}

let product: Product = getProduct();
```

## Combining Types and Interfaces

You can combine types and interfaces to create more complex types.

```typescript {numberLines}
type Address = {
  street: string;
  city: string;
  zipcode: string;
};

interface Customer {
  id: ID;
  name: string;
  address: Address;
}

function getCustomer(): Customer {
  return {
    id: 202,
    name: 'Jane Doe',
    address: {
      street: '123 Main St',
      city: 'Somewhere',
      zipcode: '12345'
    }
  };
}

let customer: Customer = getCustomer();
```

## Type Guards

TypeScript type guards are functions or expressions that allow you to narrow down the type of a variable within a conditional block. They help the TypeScript compiler understand the specific type of a variable, enabling more precise type checking and preventing runtime errors.

Here are some common types of type guards and examples to illustrate their usage:

### `typeof` Type Guards

The `typeof` operator can be used to narrow down types to primitive types such as `string`, `number`, `boolean`, and `symbol`.

```typescript {numberLines}
function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(`String value: ${value}`);
  } else if (typeof value === "number") {
    console.log(`Number value: ${value}`);
  }
}

printValue("Hello, World!"); // String value: Hello, World!
printValue(42);              // Number value: 42
```

### `instanceof` Type Guards

The `instanceof` operator can be used to narrow down types to specific classes.

```typescript {numberLines}
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else if (animal instanceof Cat) {
    animal.meow();
  }
}

const dog = new Dog();
const cat = new Cat();

makeSound(dog); // Woof!
makeSound(cat); // Meow!
```

### User-Defined Type Guards

User-defined type guards use a function to check whether a value is of a specific type. These functions return a boolean value and have a specific return type called a type predicate.

```typescript {numberLines}
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return (animal as Bird).fly !== undefined;
}

function makeAnimalMove(animal: Bird | Fish): void {
  if (isBird(animal)) {
    animal.fly();
  } else {
    animal.swim();
  }
}

const bird: Bird = {
  fly: () => console.log("Flying")
};

const fish: Fish = {
  swim: () => console.log("Swimming")
};

makeAnimalMove(bird); // Flying
makeAnimalMove(fish); // Swimming
```

### `in` Operator Type Guards

The `in` operator can be used to check whether an object has a specific property.

```typescript {numberLines}
interface Car {
  drive(): void;
}

interface Boat {
  sail(): void;
}

function moveVehicle(vehicle: Car | Boat): void {
  if ("drive" in vehicle) {
    vehicle.drive();
  } else if ("sail" in vehicle) {
    vehicle.sail();
  }
}

const car: Car = {
  drive: () => console.log("Driving")
};

const boat: Boat = {
  sail: () => console.log("Sailing")
};

moveVehicle(car);  // Driving
moveVehicle(boat); // Sailing
```

### Combining Type Guards

You can combine different type guards to handle complex type narrowing scenarios.

```typescript {numberLines}
interface Admin {
  admin: true;
  manage: () => void;
}

interface User {
  admin: false;
  view: () => void;
}

function isAdmin(person: Admin | User): person is Admin {
  return person.admin === true;
}

function isUser(person: Admin | User): person is User {
  return person.admin === false;
}

function handlePerson(person: Admin | User): void {
  if (isAdmin(person)) {
    person.manage();
  } else if (isUser(person)) {
    person.view();
  }
}

const admin: Admin = {
  admin: true,
  manage: () => console.log("Managing")
};

const user: User = {
  admin: false,
  view: () => console.log("Viewing")
};

handlePerson(admin); // Managing
handlePerson(user);  // Viewing
```

## Conclusion

Understanding types and interfaces is fundamental to mastering TypeScript. By defining explicit types and using interfaces to describe the shape of your objects, you can write more reliable and maintainable code. These practices also help catch errors early in the development process, improving your overall development workflow.

If you're new to TypeScript, I encourage you to start by annotating your variables and functions with types and gradually move on to defining interfaces for your objects. As you become more comfortable with TypeScript's type system, you'll find that it significantly enhances your productivity and code quality.

For further reading and in-depth tutorials, check out these resources:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

Happy coding!