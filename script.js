let stillPlaying = true;
let roundNumber = 1;

let userWins = 0;
let computerWins = 0;



function generateRandomHand() {
  let plays = ["rock", "paper", "scissors"];
  computerHand = plays[Math.round(Math.random() * (2 - 0) + 0)];
  // computerHand = toTitleCase(computerHand);

  return computerHand;
}

function playRound() {
  const computersHand = generateRandomHand();
  changeComputerHand(computersHand)

  const playersHand = document.querySelector('.active-hand').getAttribute('id')
  
  let winner = "";


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
      return "tie";
    }
  }
  console.log(winner)
}

// function toTitleCase(userString) {
//     userString = userString.toLowerCase()
//     firstLetter = userString.charAt(0)
//     firstLetterCap = firstLetter.toUpperCase();
//     titleCaseString = firstLetterCap + userString.slice(1);

//     return titleCaseString;
// }



//TODO--1. play a single round with 4 functioning buttons: rock, scissors, paper, and strike. Output results to console. Use background image 

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

function changePlayerHand() {
  const playerHandGraphic = document.querySelector('.player-hand');
  const newHandId = this.getAttribute('id');

  playerHandGraphic.src = `./assets/images/player/player-${newHandId}.png`;
  playerHandGraphic.classList.add('active-hand')
  playerHandGraphic.id = newHandId;
}

function changeComputerHand(hand) {
  const computerHandGraphic = document.querySelector('.computer-hand');
  computerHandGraphic.src = `./assets/images/computer/computer-${hand}.png`;
 
}


// Add event listeners for action buttons
const buttons = document.querySelectorAll(".buttons");
buttons.forEach(button => button.addEventListener('click', changePlayerHand))

const strikeButton = document.querySelector('.strike-button');
strikeButton.addEventListener('click', playRound)
  


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
