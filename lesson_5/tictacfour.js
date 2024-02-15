//TIC TAC TOE: FOUR - Prototypal Boogaloo
//Refactor code from tic tac three to use constructors and prototypes

let rlsync = require("readline-sync");

function Square(marker = " ") {
  this.marker = marker;
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

Square.prototype.getMarker = function () {
  return this.marker;
};

Square.prototype.setMarker = function (mark) {
  this.marker = mark;
};

Square.prototype.isUnused = function () {
  return this.marker === Square.UNUSED_SQUARE;
};

function Board() {
  this.squares = {};
  for (let i = 1; i < 10; i++) {
    this.squares[String(i)] = new Square();
  }
}

Board.prototype.countMarkersFor = function (player, keys) {
  let markers = keys.filter((key) => {
    return this.squares[key].getMarker() === player.getMarker();
  });

  return markers.length;
};

Board.prototype.unusedSquares = function (index) {
  let keys = Object.keys(this.squares);
  return keys.filter((key) => this.squares[key].isUnused());
};

Board.prototype.markSquare = function (squareChoice, playerMarker) {
  this.squares[squareChoice].setMarker(playerMarker);
};

Board.prototype.display = function () {
  console.log("");
  console.log("     |     |");
  console.log(
    `  ${this.squares["1"].getMarker()}  |  ${this.squares[
      "2"
    ].getMarker()}  |  ${this.squares["3"].getMarker()}`
  );
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(
    `  ${this.squares["4"].getMarker()}  |  ${this.squares[
      "5"
    ].getMarker()}  |  ${this.squares["6"].getMarker()}`
  );
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(
    `  ${this.squares["7"].getMarker()}  |  ${this.squares[
      "8"
    ].getMarker()}  |  ${this.squares["9"].getMarker()}`
  );
  console.log("     |     |");
  console.log("");
};

function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function () {
  return this.marker;
};

function Human() {
  Player.call(this, Square.HUMAN_MARKER);
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_MARKER);
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  ["1", "2", "3"], // top row of board
  ["4", "5", "6"], // center row of board
  ["7", "8", "9"], // bottom row of board
  ["1", "4", "7"], // left column of board
  ["2", "5", "8"], // middle column of board
  ["3", "6", "9"], // right column of board
  ["1", "5", "9"], // diagonal: top-left to bottom-right
  ["3", "5", "7"], // diagonal: bottom-left to top-right
];

TTTGame.prototype.displayWelcome = function () {
  console.log("Welcome to Tic-Tac-Toe 3.0: Clasical Code");
};

TTTGame.prototype.humanTurn = function () {
  let choice;

  while (true) {
    let validChoices = this.board.unusedSquares();
    choice = rlsync.question(
      `Please choose a square (${validChoices.join(", ")}): `
    );

    if (validChoices.includes(choice)) break;

    console.log("Sorry, that's not a valid choice.");
    console.log("");
  }

  this.board.markSquare(choice, this.human.getMarker());
};

TTTGame.prototype.computerTurn = function () {
  let validChoices = this.board.unusedSquares();
  let choice;

  do {
    choice = Math.floor(Math.random() * 9 + 1).toString();
  } while (!validChoices.includes(choice));

  this.board.markSquare(choice, this.computer.getMarker());
};

TTTGame.prototype.boardFull = function () {
  let unusedSquares = this.board.unusedSquares();
  return unusedSquares.length === 0;
};

TTTGame.prototype.someoneWon = function () {
  return this.isWinner(this.human) || this.isWinner(this.computer);
};

TTTGame.prototype.displayWinner = function () {
  if (this.isWinner(this.human)) {
    console.log("You won! Congratulations!");
  } else if (this.isWinner(this.computer)) {
    console.log("I won! I won! Take that, human!");
  } else {
    console.log("A tie game. How boring.");
  }
};

TTTGame.prototype.isWinner = function (player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some((row) => {
    return this.board.countMarkersFor(player, row) === 3;
  });
};

TTTGame.prototype.displayGoodbye = function () {
  console.log("Thanks for playing! Goodbye!");
};

TTTGame.prototype.gameOver = function () {
  return this.boardFull() || this.someoneWon();
};

TTTGame.prototype.play = function () {
  while (true) {
    console.clear();
    this.displayWelcome();
    this.board.display();

    this.humanTurn();
    if (this.gameOver()) break;

    this.computerTurn();
    if (this.gameOver()) break;
  }

  this.displayWinner();
  this.displayGoodbye();
};

let game = new TTTGame();
game.play();
