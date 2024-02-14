// function Circle(radius) {
//   this.radius = radius;
// }
// Circle.prototype.area = function () {
//   return Math.PI * (this.radius * this.radius);
// };

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2));
// console.log(b.area().toFixed(2));
// console.log(a.hasOwnProperty("area"));
// // a.area().toFixed(2); // => 28.27
// // b.area().toFixed(2); // => 50.27
// // a.hasOwnProperty("area"); // => false

// let ninjaA;

// {
//   const Ninja = function () {
//     this.swung = false;
//   };

//   ninjaA = new Ninja();
// }

// // create a `ninjaB` object here; don't change anything else
// let ninjaB = new ninjaA.constructor();

// console.log(ninjaA.constructor === ninjaB.constructor); // => true

function User(first, last) {
  if (this) {
    this.first = first;
    this.last = last;
    this.fame = function () {
      return `${this.first} ${this.last}`;
    };
  } else {
    return { first: first, last: last };
  }
}

let iname = "Jane Doe";
let user1 = new User("John", "Doe");
let user2 = User("John", "Doe");

console.log(iname); // => Jane Doe
console.log(user1.fame); // => John Doe
console.log(user2.fame); // => John Doe
