// Globals 
let stillPlaying = true;
// Used to track index of intro screen text
let i = 0;
const introText = [
  // "NYC: Sept 24, 2041..",
  // "Willy and the dark warriors have once again captured Marian..",
  // "This time, however, he's willing to fight you in a game of rock, paper, scissors...",
  // "Prepare to fight..",
];

//TODO-1. Fix game buttons and reactivate them 
//TODO-2. Clear game message screen
//TODO-3. Fix game hands 

function generateLifeBars() {
  const lifeBar = document.querySelector(".player-life-bar");
  const cpuLifeBar = document.querySelector(".cpu-life-bar");

  // Presence of .life-unit class tells us it's a continued game 
  if(document.querySelector('.cpu-life-unit') || document.querySelector('.player-life-unit')){
    // So we can just reset the little life boxes 
    const playerLifeUnits = document.querySelectorAll('.player-life-unit');
    const cpuLifeUnits = document.querySelectorAll('.cpu-life-unit');
    playerLifeUnits.forEach((bar)=> bar.classList.remove('inactive'));
    cpuLifeUnits.forEach((bar)=> bar.classList.remove('inactive'));

  } else {
    // But if new game, create a fresh energy bar for both players!
    for (let x = 0; x < 5; x++) {
      const lifeUnit = document.createElement("div");
      lifeUnit.classList.add("player-life-unit");
      lifeBar.appendChild(lifeUnit);

      const cpuLifeUnit = document.createElement("div");
      cpuLifeUnit.classList.add("cpu-life-unit");
      cpuLifeBar.appendChild(cpuLifeUnit);
    }

  }
}



function reduceLife(target) {
  if (target == "player") {
    // Reduce player life by 1
    const lifeBar = document.querySelector(".player-life-bar");
    const remainingLife = lifeBar.querySelector("div:not(.inactive)");
    remainingLife.classList.add("inactive");

    // Set game to end if no lives
    const totalRemainingLives = lifeBar.querySelectorAll("div:not(.inactive)");
    if (totalRemainingLives.length < 1) stillPlaying = false;
  } else { // Reduce cpu life by 1
    const cpuLifeBar = document.querySelector(".cpu-life-bar");
    const cpuRemainingLife = cpuLifeBar.querySelector("div:not(.inactive)");
    cpuRemainingLife.classList.add("inactive");
 
    // End game if no more energy units
    const totalCpuRemainingLives =
      cpuLifeBar.querySelectorAll("div:not(.inactive)");
    if (totalCpuRemainingLives.length < 1) stillPlaying = false;
  }
}

function generateRandomHand() {
  let plays = ["rock", "paper", "scissors"];
  computerHand = plays[Math.round(Math.random() * (2 - 0) + 0)];

  return computerHand;
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
  let result = "";
  let stat = "";

  if (winner == "player") {
    result = "You win!";
    stat = `${playersHand.toUpperCase()} beats ${computersHand}!`;
  } else if (winner == "tie") {
    result = "Tie round.";
    stat = "Run it back!";
  } else {
    result = "You lose!";
    stat = `${computersHand.toUpperCase()} beats ${playersHand}!`;
  }

  const winnerMessage = document.querySelector(".game-text");
  const statDisplay = document.querySelector(".game-subtext");

  winnerMessage.textContent = result;
  statDisplay.textContent = stat;
}

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
  if (document.querySelector(".active-item")) {
    const prevItem = document.querySelector(".active-item");
    prevItem.classList.remove("active-item");
  }
  const activeId = e.target.id;
  const activeButton = document.getElementById(activeId);
  activeButton.classList.add("active-item");
}




function displayEnding(winningPlayer) {
  // Display end of game message
  const message = document.querySelector(".game-text");
  const messageSubtext = document.querySelector(".game-subtext");

  // Display victory or defeat message
  if (winningPlayer == "computer") {
    message.textContent = "You're hurt, but don't give up!";
    messageSubtext.textContent = "Think about Mariane!";
  } else {
    message.textContent = " Well done! With one last crushing blow, you defeat Willy.", 
    "Hours later, you find Marianne, shaken but unhurt";
  }
  
  // Gray out background and disable buttons
  deactivateInterface();

  // Give option to continue
  playAgain();
}

function playAgain() {
  // display continue message 
  const mesg = "Do you wish to play again? Hit Y or N";
  document.querySelector('.game-text').textContent = mesg;

  // Get user input 
  document.addEventListener('keydown', (event)=> {

    // Reset game if need be
    const key = event.key;
    if (key.toLowerCase() == 'y'){
      initializeGame();
    }else { 
      //terminate game here

    }
  });

}

function playRound() {
  // Display random cpu hand
  const cpuHand = generateRandomHand();
  changeComputerHand(cpuHand);

  // Display player's hand
  const userHand = document.querySelector(".active-item").getAttribute("id");
  changePlayerHand(userHand);

  // Decide winner and display message
  let winner = decideWinner(userHand, cpuHand);
  displayMessage(winner, userHand, cpuHand);

  // Reduce life of loser
  if (winner == "player") {
    reduceLife("computer");
  } else if (winner == "computer") {
    reduceLife("player");
  }

  if (stillPlaying == false) displayEnding(winner);
}


function loadGameOpening() {
  // Fade-in introduction background
  document.querySelector(".background").classList.add("fade-in");
  displayOpeningText();

}



function displayOpeningText() {
typeWriter(0);
}


function typeWriter(index){
  if(i < introText[index].length) {
    document.querySelector('.game-text').textContent += introText[index].charAt(i);
    setTimeout(typeWriter, 150,index);
    i++;
  }else{
    index++;
    i=0;
    // Reset text on screen
    document.querySelector('.game-text').textContent = "";
    setTimeout(typeWriter, 10, index);
  }
}

function deactivateInterface() {
  // Deactivate all buttons
  const btns = document.querySelectorAll(".buttons");
  const strikeButton = document.querySelector(".strike-button");
  btns.forEach((button) => (button.disabled = true));
  strikeButton.disabled = true;

  // Gray out energy bar
  const lifeBar = document.querySelector(".player-life-bar");
  const cpuLifeBar = document.querySelector(".cpu-life-bar");

  lifeBar.classList.add('graywash');
  cpuLifeBar.classList.add('graywash');

  // Gray out background
  const background = document.querySelector(".background");
  background.classList.add("dither-background");

  // Gray out user hands
  document.querySelector(".player-hand").classList.add("graywash");
  document.querySelector(".computer-hand").classList.add("graywash");

  // Gray out buttons
  const buttons = document.querySelectorAll(".buttons");
  buttons.forEach((button) => button.classList.add("graywash"));
}


function initializeGame() {
  // Enable all buttons 
  const btns = document.querySelectorAll(".buttons");
  const strikeButton = document.querySelector(".strike-button");
  btns.forEach((button) => (button.disabled = false));
  strikeButton.disabled = false;

  // Awaken grayed out interface components

  // Energy bar
  const lifeBar = document.querySelector(".player-life-bar");
  const cpuLifeBar = document.querySelector(".cpu-life-bar");
  lifeBar.classList.remove('graywash');
  cpuLifeBar.classList.remove('graywash');
  
  //Buttons
  btns.forEach((button) => button.classList.remove("graywash"));

  // Background
  document.querySelector(".background").classList.remove('dither-background');

  // Hands
  document.querySelector(".player-hand").classList.add("normal-color");
  document.querySelector(".computer-hand").classList.add("normal-color");

  // Rock scissors paper buttons
  const buttons = document.querySelectorAll(".buttons");
  buttons.forEach((button)=> button.classList.remove('.gray-wash'));
  
  
  // Initialize new game stuff 
  // Give each player 5 bars of life
  generateLifeBars();

  // Reveal main background
  document.querySelector(".background").classList.add('garage-background');

  // Reveal life bars
  document.querySelector(".life-container").classList.add("fade-in");

  // Reveal buttons
  document.querySelector(".game-container").classList.add("fade-in");
  document.querySelector(".strike-button-container").classList.add("fade-in");

  // Reveal hands
  const playerHand = document.querySelector(".player-hand");
  const computerHand = document.querySelector(".computer-hand");
  computerHand.classList.add("fade-in");
  playerHand.classList.add("fade-in");

  // Set up rock paper scissors buttons
  buttons.forEach((button) => button.addEventListener("click", activateButton));

  // Set up 'strike' button to play a round each click
  strikeButton.addEventListener("click", playRound);

}

// Main events

window.onload = loadGameOpening;

// Put pause here before starting game 
setTimeout(initializeGame);

