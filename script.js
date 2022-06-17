stillPlaying = true;
roundNumber = 1;

userWins = 0;
computerWins = 0;

function computerPlay() {
  let plays = ["rock", "paper", "scissors"];
  computerHand = plays[Math.round(Math.random() * (2 - 0) + 0)];
  computerHand = toTitleCase(computerHand);

  return computerHand;
}

function playRound(computerSelection, playerSelection) {
    computerSelection = computerSelection.toLowerCase();
    playerSelection = playerSelection.toLowerCase();
  let winner = "";

  if (computerSelection === "rock") {
    if (playerSelection === "paper") {
      winner = "player";
    } else if (playerSelection === "scissors") {
      winner = "computer";
    } else {
      winner = "tie";
    }
  } else if (computerSelection === "paper") {
    if (playerSelection === "rock") {
      winner = "computer";
    } else if (playerSelection === "scissors") {
      winner = "player";
    } else {
      winner = "tie";
    }
  } else if (computerSelection === "scissors") {
    if (playerSelection === "rock") {
      winner = "player";
    } else if (playerSelection === "paper") {
      winner = "computer";
    } else {
      return "tie";
    }
  }
  return winner;
}

function toTitleCase(userString) {
    userString = userString.toLowerCase()
    firstLetter = userString.charAt(0)
    firstLetterCap = firstLetter.toUpperCase();
    titleCaseString = firstLetterCap + userString.slice(1);

    return titleCaseString;
}

function game() {}



//Main game loop
while (stillPlaying) {
  if (roundNumber > 5) {
    if (userWins > computerWins) {
      console.log(`You won the game!`);
    } else if (userWins === computerWins) {
      console.log("Tie Game.");
    } else {
      console.log(`You lost the game.`);
    }
    console.log(`Final Score: ${userWins} to ${computerWins}`);
    stillPlaying = false;
    break;
  }
  
  console.log(`ROUND: ${roundNumber}\n`)
  userHand = prompt("What's your play? Type 'rock', 'paper', or 'scissors': ");
  userHand = toTitleCase(userHand);

  console.log(`${userHand}`)

  computerHand = computerPlay();
  console.log(`Computer: ${computerHand}`)

  let theWinner = playRound(computerHand, userHand);

  if (theWinner === "player") {
    userWins++;
    console.log(`You win.`);
    
  } else if (theWinner === "computer") {
    computerWins++;
    console.log(`-----COMPUTER WINS-----`);
  }

  // If tie round, do the round over, don't increment it
  if (theWinner === "tie") {
    console.log(`Tie round. Both players chose ${userHand}. Run it back!`);
  } else {
    roundNumber++;
  }
}
