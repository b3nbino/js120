/* 
Rock, Paper, Scissors is a game in which two players each make a choice between the three namesakes of the game. 
The winner is decided by comparing their choices using these rules:
 - If one player chooses rock and the other scissors, the player who chose rock wins
 - If one player chooses scissors and the other paper, the player who chose paper wins
 - If one player chooses paper and the other rock, the player who paper paper wins
 - If both players chose the same, the result is a tie

 Nouns: player, choice, rule
 Verbs: choose, compare

 Player : choose
 Choice : 
 Rule : 

 Referee: compare
*/

let rlsync = require("readline-sync");

function createPlayer() {
  return {
    choice: null,
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let move;

      while (true) {
        console.log("Please choose rock, paper, scissors, spock, or lizard:");
        move = rlsync.question();
        if (["rock", "paper", "scissors", "spock", "lizard"].includes(move))
          break;
        console.log("Sorry, invalid choice.");
      }

      this.choice = move;
    },
  };

  return Object.assign(playerObject, humanObject);
}
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let move;
      const plays = ["rock", "paper", "scissors", "spock", "lizard"];

      this.choice = plays[Math.floor(Math.random() * plays.length)];
    },
  };

  return Object.assign(playerObject, computerObject);
}

const RPSGame = {
  //Properties
  score: [0, 0],
  player1: createHuman(),
  player2: createComputer(),

  //Methods
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

RPSGame.play();
