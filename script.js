let stillPlaying = true;
let roundNumber = 1;

let userWins = 0;
let computerWins = 0;

function generateRandomHand() {
  let plays = ["rock", "paper", "scissors"];
  computerHand = plays[Math.round(Math.random() * (2 - 0) + 0)];

  return computerHand;
}

function playRound() {
  const cpuHand = generateRandomHand();
  changeComputerHand(cpuHand);

  const userHand = document.querySelector(".active-item").getAttribute("id");
  changePlayerHand(userHand);

  let winner = decideWinner(userHand, cpuHand);

  displayMessage(winner, userHand, cpuHand);

}

function decideWinner(playersHand, computersHand) {
  if (computersHand === "rock") {
    if (playersHand === "paper") {
      winner = "player";
    } else if (playersHand === "scissors") {
      winner = "computer";
    } else {
      winner = "tie";
    }
  } else if (computersHand === "paper") {
    if (playersHand === "rock") {
      winner = "computer";
    } else if (playersHand === "scissors") {
      winner = "player";
    } else {
      winner = "tie";
    }
  } else if (computersHand === "scissors") {
    if (playersHand === "rock") {
      winner = "player";
    } else if (playersHand === "paper") {
      winner = "computer";
    } else {
      winner = "tie";
    }
  }
  return winner;

}
  
function displayMessage(winner, playersHand, computersHand) {
  let result = '';
  let stat = '';

  if (winner == 'player') {
    result = 'You win!';
    stat = `${playersHand.toUpperCase()} beats ${computersHand}!`
  }else if (winner == 'tie'){
    result = 'Tie round.';
    stat = 'Run it back!';
  } else{
    result = 'You lose!';
    stat = `${computersHand.toUpperCase()} beats ${playersHand}!`
  }
  
  const winnerMessage = document.querySelector('.game-text');
  const statDisplay = document.querySelector('.game-subtext');
  
  winnerMessage.textContent = result;
  statDisplay.textContent = stat;



}



//Main game loop

// while (stillPlaying) {
//     // Decide who wins over the course of 5 rounds
//   if (roundNumber > 5) {
//     if (userWins > computerWins) {
//       console.log(`You won the game!`);
//     } else if (userWins === computerWins) {
//       console.log("Tie Game.");
//     } else {
//       console.log(`You lost the game.`);
//     }
//     console.log(`Final Score: ${userWins} to ${computerWins}`);
//     stillPlaying = false;
//     break;
//   }

function changePlayerHand(hand) {
  const playersChoice = hand;
  const playerHandGraphic = document.querySelector(".player-hand");

  playerHandGraphic.src = `./assets/images/player/player-${playersChoice}.png`;
  
}

function changeComputerHand(hand) {
  const computersChoice = hand;
  const computerHandGraphic = document.querySelector(".computer-hand");
  computerHandGraphic.src = `./assets/images/computer/computer-${computersChoice}.png`;
}

function activateButton(e) {
  if( document.querySelector('.active-item') ){
    const prevItem = document.querySelector('.active-item');
    prevItem.classList.remove('active-item');

  }
  const activeId = e.target.id; 
  const activeButton = document.getElementById(activeId);
  activeButton.classList.add('active-item');

}


// Player controls 

const buttons = document.querySelectorAll(".buttons");
buttons.forEach((button) => button.addEventListener("click", activateButton));

const strikeButton = document.querySelector(".strike-button");
strikeButton.addEventListener("click", playRound);

// if (theWinner === "player") {
//   userWins++;
//   console.log(`You win.`);

// } else if (theWinner === "computer") {
//   computerWins++;
//   console.log(`-----COMPUTER WINS-----`);
// }

// // If tie round, do the round over, don't increment it
// if (theWinner === "tie") {
//   console.log(`Tie round. Both players chose ${userHand}. Run it back!`);
// } else {
//   roundNumber++;
// }
//end while
