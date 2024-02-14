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

class Board {
  constructor() {
    //How will the board be modeled? Perhaps a collection of rows
  }
}

class Row {
  constructor() {
    //A collection of squares?
  }
}

class Square {
  constructor() {
    //Place to store player markers
  }
}

class Marker {
  constructor() {
    //Way to track player choices on board
  }
}

class Player {
  constructor() {
    //Way to keep track of players marker
  }

  play() {
    //Way to keep track of turns
  }

  mark() {
    //Way to mark board during turn
  }
}

class Human extends Player {
  constructor() {
    //Has own play/mark method
  }
}

class Computer extends Player {
  constructor() {
    //Has own play/mark method
  }
}

class TTTgame {
  constructor() {
    //Need a board and two players
  }

  play() {
    //Orchestrate gameplay
  }
}

let game = new TTTgame();
game.play();
