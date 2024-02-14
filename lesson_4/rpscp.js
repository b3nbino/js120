let rlsync = require("readline-sync");

function Player() {
  this.choice = null;
}

function Human() {
  Player.call(this);
}

Human.prototype.choose = function () {
  let move;

  while (true) {
    console.log("Please choose rock, paper, scissors, spock, or lizard:");
    move = rlsync.question();
    if (["rock", "paper", "scissors", "spock", "lizard"].includes(move)) break;
    console.log("Sorry, invalid choice.");
  }

  this.choice = move;
};

function Computer() {
  Player.call(this);
}

Computer.prototype.choose = function () {
  let move;
  const plays = ["rock", "paper", "scissors", "spock", "lizard"];

  this.choice = plays[Math.floor(Math.random() * plays.length)];
};

function RPSGame() {
  this.player1 = new Human();
  this.player2 = new Computer();
  this.score = [0, 0];
}

RPSGame.prototype = {
  displayWelcome() {
    console.log("Welcome to Rock, Paper, Scissors, Spock, Lizard!");
  },
  displayGoodbye() {
    console.log("Thanks for playing! Come Again!");
  },

  displayWinner() {
    let p1Choice = this.player1.choice;
    let p2Choice = this.player2.choice;

    console.log(`Player one chose ${p1Choice}`);
    console.log(`Player two chose ${p2Choice}`);

    if (
      (p1Choice === "rock" &&
        (p2Choice === "scissors" || p2Choice === "lizard")) ||
      (p1Choice === "paper" && (p2Choice === "rock" || p2Choice === "spock")) ||
      (p1Choice === "scissors" &&
        (p2Choice === "paper" || p2Choice === "lizard")) ||
      (p1Choice === "spock" &&
        (p2Choice === "scissors" || p2Choice === "rock")) ||
      (p1Choice === "lizard" && (p2Choice === "spock" || p2Choice === "paper"))
    ) {
      console.log("You win!");
      this.score[0] += 1;
    } else if (
      (p1Choice === "rock" && (p2Choice === "paper" || p2Choice === "spock")) ||
      (p1Choice === "paper" &&
        (p2Choice === "scissors" || p2Choice === "lizard")) ||
      (p1Choice === "scissors" &&
        (p2Choice === "rock" || p2Choice === "spock")) ||
      (p1Choice === "spock" &&
        (p2Choice === "lizard" || p2Choice === "paper")) ||
      (p1Choice === "lizard" &&
        (p2Choice === "rock" || p2Choice === "scissors"))
    ) {
      console.log("Computer wins!");
      this.score[1] += 1;
    } else {
      console.log("Look like we have a tie!");
    }
    ``;
    console.log(`The score is now ${this.score[0]} to ${this.score[1]}`);
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = rlsync.question();
    return answer.toLowerCase()[0] === "y";
  },

  play() {
    do {
      console.clear();
      this.displayWelcome();
      this.player1.choose();
      this.player2.choose();
      this.displayWinner();
    } while (this.playAgain());
    this.displayGoodbye();
  },
};

RPSGame.prototype.constructor = RPSGame;

let game = new RPSGame();
game.play();
