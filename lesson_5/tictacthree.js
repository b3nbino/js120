/**
 * TIC TAC TOE: THREE - Classical boogaloo
 * Tic tac toe is a game played by two players on a board/grid with nine squares. Each player takes turns deciding where to place their marker.
 * Each player's objective is to place three of their respective markers in a row. The first player to do this wins!
 * -The first player uses an "X" as their marker
 * -The second player uses an "O" as their marker
 * -The board size can vary but it traditionally is a 3x3 grid
 * -The board must be in a grid shape
 * -The markers can be vertical, horizontal, or diagonal in order to secure a win
 * -This version of the game is played between one human player and one computer player
 *
 * Nouns:
 * game, player, board, grid, marker, human, computer, row
 *
 * Verbs:
 * place, turn, play
 *
 * Game:
 * Board:
 * Marker:
 * Row:
 * Square:
 * Player:
 * play, mark, human, computer
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
  }

  displayWelcome() {
    console.log("Welcome to Tic-Tac-Toe 3.0: Clasical Code");
  }

  humanTurn() {
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

  play() {
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
  }
}

let game = new TTTGame();
game.play();
