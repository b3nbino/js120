function createProduct(id, name, stock, price) {
  return {
    id: id,
    name: name,
    stock: stock,
    price: price,

    setPrice(p) {
      if (p < 0) {
        console.log("Price entered is invalid");
        return;
      }
      this.price = p;
    },
    describe() {
      console.log("ID: " + this.id);
      console.log("Name: " + this.name);
      console.log("Stock: " + this.stock);
      console.log("Price: " + this.price);
    },
  };
}

createProduct(0, "Scissors", 8, 10);
createProduct(1, "Cordless Drill", 15, 45);
