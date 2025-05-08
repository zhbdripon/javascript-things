///// Private properties in JavaScript can be created using WeakMap or Symbol

// Symbol is a primitive data type that is unique and immutable. It can be used to create private properties in objects.
// Symbols are not accessible outside the scope in which they are created, making them ideal for creating private properties.
const _color = Symbol(); // private property

class Shape {
  constructor(color) {
    this[_color] = color; // set private property
  }

  getColor() {
    return this[_color]; // get private property
  }
}

const shape = new Shape("red");
console.log(shape.getColor()); // red

// WeakMap is a collection of key-value pairs where the keys are objects and the values can be any value.
// WeakMap allows you to create private properties that are not accessible outside the class.
const _name = new WeakMap(); // private property

class Person {
  constructor(name) {
    _name.set(this, name); // set private property
  }

  getName() {
    return _name.get(this); // get private property
  }
}

const person = new Person("Ripon");
console.log(person.getName()); // Ripon
