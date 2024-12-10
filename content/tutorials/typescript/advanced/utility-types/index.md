---
featured: false
date: "2023-08-28"

series: "Mastering TypeScript"
part: "IV. Advanced Topics"
chapter: "14. TypeScript Utility Types"


# series: "Mastering TypeScript Series"
# chapter: "4. Advanced Topics"
title: "TypeScript Utility Types"
description: "TypeScript offers a powerful feature set for building robust applications, and one of the most versatile aspects of TypeScript is its ability to perform type manipulation using utility types. These built-in utility types provide flexible ways to transform types in your applications, enhancing reusability, maintainability, and scalability of your codebase. This article delves into several commonly used utility types, demonstrating their practical applications with examples."
hero_image: "swiss-army-knife-152396_1920.png"
tags: ["typescript"]
read_time: 7 min
related:
  - "Introduction to TypeScript"
  - "Classes, Interfaces, and Objects in TypeScript"
  - "TypeScript Modules and Namespaces"
---

# Type Manipulation with Utility Types

TypeScript offers a powerful feature set for building robust applications, and one of the most versatile aspects of TypeScript is its ability to perform type manipulation using utility types. These built-in utility types provide flexible ways to transform types in your applications, enhancing reusability, maintainability, and scalability of your codebase. This article delves into several commonly used utility types, demonstrating their practical applications with examples.

## What are Utility Types?

Utility types in TypeScript are a set of generic types defined in the language's standard library. They are used to transform existing types into new, modified types. This is particularly useful in complex applications where you need more control over the typing of variables without repeating type definitions, thus adhering to the DRY (Don't Repeat Yourself) principle.

## Common Utility Types and Their Applications

Let’s explore some of the most commonly used utility types in TypeScript:

### 1. `Partial<T>`

The `Partial<T>` utility type takes a type `T` and makes all of its properties optional. This is useful when you want to create objects that do not include all the properties of the original type.

```typescript {numberLines}
interface User {
    id: number;
    name: string;
    email: string;
}

function updateUser(id: number, changes: Partial<User>) {
    // Imagine this function updates a user in the database
}

updateUser(1, { name: "John Doe" }); // Only update the name, leave other properties unchanged
```

### 2. `Readonly<T>`

`Readonly<T>` makes all properties of type `T` read-only, meaning the properties of an object cannot be reassigned.

```typescript {numberLines}
interface Task {
    title: string;
    description: string;
}

const task: Readonly<Task> = {
    title: "Finish article",
    description: "Complete the TypeScript article"
};

task.title = "Start a new article"; // Error: Cannot assign to 'title' because it is a read-only property
```

### 3. `Record<K, T>`

`Record<K, T>` creates a type with a set of properties `K` of type `T`. This is useful for objects that act as dictionaries.

```typescript {numberLines}
interface CatInfo {
    age: number;
    breed: string;
}

const cats: Record<string, CatInfo> = {
    Felix: { age: 3, breed: "Tabby" },
    Garfield: { age: 5, breed: "Persian" }
};

console.log(cats.Felix.breed); // Output: Tabby
```

### 4. `Pick<T, K>`

`Pick<T, K>` creates a type by picking the set of properties `K` from `T`. It is useful when you want to create a new type that only includes a subset of the properties of another type.

```typescript {numberLines}
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

type ProductPreview = Pick<Product, 'name' | 'price'>;

const productPreview: ProductPreview = {
    name: "Laptop",
    price: 999
};
```

### 5. `Exclude<T, U>`

`Exclude<T, U>` constructs a type by excluding from `T` all properties that are assignable to `U`.

```typescript {numberLines}
type AvailableDrinks = "Coffee" | "Tea" | "Orange Juice" | "Lemonade";
type HotDrinks = Exclude<AvailableDrinks, "Orange Juice" | "Lemonade">;

const myDrink: HotDrinks = "Coffee"; // Valid
const coldDrink: HotDrinks = "Orange Juice"; // Error: Type '"Orange Juice"' is not assignable to type 'HotDrinks'.
```

### 6. `ReturnType<T>`

Obtains the return type of a function type. This is useful when you need to use the return type of a function elsewhere in your code.

```typescript {numberLines}
function getAge(): number {
    return 30;
}

type Age = ReturnType<typeof getAge>;  // number
```

### 7. `Parameters<T>`

Extracts the types of parameters from a function type as a tuple type.

```typescript {numberLines}
function greet(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old.`;
}

type GreetParameters = Parameters<typeof greet>;  // [string, number]
```

## Conclusion

Utility types are a powerful feature in TypeScript for manipulating types in ways that enhance flexibility and reusability of your code. By leveraging utility types, developers can write more maintainable and robust applications, reducing errors and improving developer productivity.

For more detailed information and additional utility types, refer to the [TypeScript Utility Types documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html). This resource provides a comprehensive overview and examples that can help you master type manipulation in TypeScript.
