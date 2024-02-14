class Greeting {
  greet(string) {
    console.log(string);
  }
}

class Hello extends Greeting {
  hello() {
    this.greeting("hi");
  }
}
class Goobye extends Greeting {
  bye() {
    this.greeting("bye");
  }
}
