/**
 * TIC TAC TOE: SIX - Bonus boogaloo
 */

let rlsync = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";
  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(mark) {
    this.marker = mark;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let i = 1; i < 10; i++) {
      this.squares[String(i)] = new Square();
    }
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter((key) => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  unusedSquares(index) {
    let keys = Object.keys(this.squares);
    return keys.filter((key) => this.squares[key].isUnused());
  }

  markSquare(squareChoice, playerMarker) {
    this.squares[squareChoice].setMarker(playerMarker);
  }

  display() {
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
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"], // top row of board
    ["4", "5", "6"], // center row of board
    ["7", "8", "9"], // bottom row of board
    ["1", "4", "7"], // left column of board
    ["2", "5", "8"], // middle column of board
    ["3", "6", "9"], // right column of board
    ["1", "5", "9"], // diagonal: top-left to bottom-right
    ["3", "5", "7"], // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.playAgain = true;
    this.score = [0, 0];
  }

  displayWelcome() {
    console.log("Welcome to Tic-Tac-Toe 6.0: Clasical Code");
    console.log(
      `The score is:    Human: ${this.score[0]}     Computer: ${this.score[1]}`
    );
  }

  humanTurn() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = rlsync.question(
        `Please choose a square (${
          validChoices.length > 1
            ? validChoices.slice(0, validChoices.length - 1).join(", ") +
              ` or ${validChoices[validChoices.length - 1]}`
            : validChoices[0]
        }): `
      );

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquare(choice, this.human.getMarker());
  }

  computerTurn() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor(Math.random() * 9 + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquare(choice, this.computer.getMarker());
  }

  boardFull() {
    let unusedSquares = this.board.unusedSquares();
    return unusedSquares.length === 0;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayWinner() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some((row) => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  displayGoodbye() {
    console.log("Thanks for playing! Goodbye!");
  }

  gameOver() {
    return this.boardFull() || this.someoneWon();
  }

  askPlayAgain() {
    let answer = rlsync.question("Would you like to play again? (y/n): ");

    while (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "n") {
      answer = rlsync.question("Invalid Answer, please enter either y or n. ");
    }

    if (answer.toLowerCase() === "y") {
      this.board = new Board();
      this.score = [0, 0];
    } else if (answer.toLowerCase() === "n") {
      this.playAgain = false;
    }
  }

  increaseScore() {
    if (this.isWinner(this.human)) {
      this.score[0] += 1;
    } else if (this.isWinner(this.computer)) {
      this.score[1] != 1;
    }
  }

  play() {
    while (this.playAgain === true) {
      while (this.score[0] < 3 && this.score[1] < 3) {
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
        this.increaseScore();
        this.board = new Board();
      }
      this.askPlayAgain();
    }
    this.displayGoodbye();
  }
}

let game = new TTTGame();
game.play();
