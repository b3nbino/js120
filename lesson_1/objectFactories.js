function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read: read,

    getDescription() {
      if (this.read) {
        return `${this.title} was written by ${this.author}. I have read it.`;
      }
      return `${this.title} was written by ${this.author}. I haven't read it.`;
    },

    readBook() {
      this.read = true;
    },
  };
}

let book1 = createBook("Mythos", "Stephen Fry");
let book2 = createBook("Me Talk Pretty One Day", "David Sedaris");
let book3 = createBook("Aunts aren't Gentlemen", "PG Wodehouse");

console.log(book1);
console.log(book1.getDescription());
console.log(book2);
console.log(book2.getDescription());
console.log(book3);
console.log(book3.getDescription());
