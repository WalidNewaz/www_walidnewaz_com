---
featured: false
date: "2023-07-24"

series: "Mastering TypeScript"
part: "II. Intermediate Topics"
chapter: "4. Classes, Interfaces, and Objects in TypeScript"


# series: "Mastering TypeScript Series"
# chapter: "2. Intermediate Topics"
title: "Classes, Interfaces, and Objects in TypeScript"
description: "Using classes, interfaces, and objects in TypeScript to build scalable applications."
# hero_image: "mohammad-rahmani-_Fx34KeqIEw-unsplash.jpg"
tags: ["object oriented", "typescript"]
read_time: 15 min
related: 
  - "Introduction to TypeScript"
  - "Understanding TypeScript Types"
---

# Classes, Interfaces, and Objects in TypeScript

TypeScript, a statically typed superset of JavaScript, brings powerful features like classes, interfaces, and robust type-checking to the table. These features are particularly beneficial for building scalable and maintainable enterprise solutions. In this article, we will explore classes, interfaces, and objects in TypeScript, using real-world examples and test code to illustrate their usage and benefits.

## Classes in TypeScript

Classes in TypeScript are blueprints for creating objects. They encapsulate data and behavior and provide a structured way to define and manipulate objects.

### Access Modifiers

Access modifiers in TypeScript control the visibility of class members (properties and methods). They help enforce encapsulation, which is the principle of restricting access to certain components of an object.

- **Public**: Public members are accessible from anywhere. By default, all class members in TypeScript are public.
- **Private**: Private members are only accessible within the class they are defined. They cannot be accessed or modified outside the class.
- **Protected**: Protected members are similar to private members but can also be accessed within derived classes (subclasses).

```typescript {numberLines}
class Person {
  public name: string;
  private age: number;
  protected email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  protected getEmail(): string {
    return this.email;
  }
}

const person = new Person("Alice", 30, "alice@example.com");
console.log(person.greet()); // Hello, my name is Alice and I am 30 years old.
// console.log(person.age); // Error: Property 'age' is private and only accessible within class 'Person'.
// console.log(person.email); // Error: Property 'email' is protected and only accessible within class 'Person' and its subclasses.
```

### Constructors

Constructors are special methods in a class responsible for initializing the class's properties when an instance of the class is created. In TypeScript, the `constructor` keyword is used to define a constructor. You can have one or more parameters in the constructor to set up the initial state of the object.

```typescript {numberLines}
class Car {
  private make: string;
  private model: string;
  private year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public displayInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

const car = new Car("Tesla", "Model S", 2022);
console.log(car.displayInfo()); // 2022 Tesla Model S
```

## Interfaces in TypeScript

Interfaces define the shape of an object, specifying the properties and methods that the object must implement. They are essential for defining contracts and ensuring type safety in large codebases.

```typescript {numberLines}
interface Animal {
  name: string;
  sound(): string;
}

class Dog implements Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public sound(): string {
    return "Woof!";
  }
}

class Cat implements Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public sound(): string {
    return "Meow!";
  }
}

const dog: Animal = new Dog("Buddy");
console.log(dog.sound()); // Woof!
const cat: Animal = new Cat("Tommy");
console.log(cat.sound()); // Meow!
```

### Things to Watch Out For

- **Optional Properties**: Use the `?` syntax to define optional properties in interfaces.
- **Readonly Properties**: Use the `readonly` keyword to define properties that cannot be modified after initialization.

## Abstract Classes

An abstract class is a class that is meant to be extended by other classes but never instantiated directly. Abstract classes can contain both implementation and abstract methods (methods without implementation). They are declared using the `abstract` keyword.

### Key Features of Abstract Classes:

1. **Cannot be instantiated**: You cannot create an instance of an abstract class.
2. **Can contain abstract methods**: Abstract methods must be implemented by derived classes.
3. **Can contain implemented methods**: Abstract classes can also have methods with actual implementation that derived classes can inherit.

```typescript {numberLines}
abstract class Animal {
  constructor(public name: string) {}

  // Abstract method (must be implemented in derived classes)
  abstract makeSound(): void;

  // Regular method
  move(): void {
    console.log(`${this.name} is moving.`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // Woof! Woof!
dog.move();      // Buddy is moving.
```

In this example:
- `Animal` is an abstract class with an abstract method `makeSound` and a regular method `move`.
- `Dog` extends `Animal` and provides an implementation for the `makeSound` method.

### Abstract Methods

Abstract methods are methods that are declared in an abstract class but do not contain any implementation. Derived classes are required to implement these methods.

```typescript {numberLines}
abstract class Shape {
  abstract area(): number;

  display(): void {
    console.log(`The area is ${this.area()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
circle.display(); // The area is 78.53981633974483
```

## Abstract Classes vs Interfaces

Both abstract classes and interfaces are used to define the structure of a class. However, they have some key differences:

- **Abstract Classes**:
  - Can contain implementation (concrete methods).
  - Can have access modifiers (public, private, protected).
  - Can have fields and constructors.
  - A class can extend only one abstract class.

- **Interfaces**:
  - Cannot contain implementation; they only define method signatures and properties.
  - All members are implicitly public.
  - Cannot have fields or constructors.
  - A class can implement multiple interfaces.

## Objects in TypeScript

Objects in TypeScript are instances of classes or interfaces. They can also be defined using object literals.

```typescript {numberLines}
interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number; // Optional property
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 1200,
};

console.log(product.name); // Laptop
```

## Using Classes, Interfaces, and Objects in Enterprise Solutions

Classes, interfaces, and objects in TypeScript provide a robust framework for building and managing scalable enterprise solutions. They help enforce type safety, improve code readability, and facilitate maintenance.

### Example: An E-Commerce System

#### Defining Interfaces

```typescript {numberLines}
interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Order {
  orderId: number;
  customerId: number;
  product: Product;
  quantity: number;
}
```

#### Implementing Classes

```typescript {numberLines}
class ECommerceSystem {
  private customers: Customer[] = [];
  private orders: Order[] = [];

  public addCustomer(customer: Customer): void {
    this.customers.push(customer);
  }

  public placeOrder(order: Order): void {
    this.orders.push(order);
  }

  public listOrders(): Order[] {
    return this.orders;
  }
}

const system = new ECommerceSystem();

const customer: Customer = { id: 1, name: "John Doe", email: "john@example.com" };
system.addCustomer(customer);

const order: Order = { orderId: 1, customerId: 1, product: product, quantity: 2 };
system.placeOrder(order);

console.log(system.listOrders());
```

### Testing with Jest

#### Example: Testing the E-Commerce System

```typescript {numberLines}
import { ECommerceSystem, Customer, Order, Product } from './ecommerce-system';

test('should add a customer and place an order', () => {
  const system = new ECommerceSystem();

  const customer: Customer = { id: 1, name: "John Doe", email: "john@example.com" };
  system.addCustomer(customer);

  const product: Product = { id: 1, name: "Laptop", price: 1200 };
  const order: Order = { orderId: 1, customerId: 1, product: product, quantity: 2 };
  system.placeOrder(order);

  expect(system.listOrders()).toHaveLength(1);
  expect(system.listOrders()[0]).toMatchObject(order);
});
```

## Conclusion

Classes, interfaces, and objects in TypeScript provide powerful constructs for building scalable and maintainable applications. They enhance type safety, improve code organization, and facilitate the development of enterprise solutions. By leveraging these features, along with best practices and tools, developers can build robust applications with confidence.

Remember, TypeScript's strong typing system is there to help you catch errors early and write more predictable code. Whether you're building small applications or large-scale enterprise systems, understanding and utilizing TypeScript's classes, interfaces, and objects will undoubtedly enhance your development experience.

