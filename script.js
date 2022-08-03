// Globals 
let stillPlaying = true;
// Used to kill timer later on
let gameTimer; 

// Used to track index of intro screen text
let i = 0;
const introText = [
  // "NYC: Sept 24, 2041..",
  // "Willy and his thugs have captured Marianne..",
  // "And this time he's willing to fight you in a game of rock, paper, scissors...",
  // "Prepare to fight..",
];

//TODO-1. Remove 'time' from intro screen
// TODO-2. Add 'You've been hurt. Don't give up! 

function loadGameOpening() {
  // Fade-in blue garage background
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


function initializeGame() {
  // Reset game loop 
  stillPlaying = true;

  // Kill timer just in case
  killTimer(gameTimer);

  // Reset both hands to rock 
  changeComputerHand('rock');
  changePlayerHand('rock');

  // Add 1 player credit
  document.querySelector('.credit-text').textContent = "0 CREDIT"

  // //Clear screen of all messages
  const userMessages = document.querySelector('.game-text');
  const userSubtext = document.querySelector('.game-subtext');
  clearScreen();

  // Display kickstart message
  userMessages.classList.add('restart-game');
  userMessages.textContent = "LET'S DO IT!";
  
  // Get rid of kickstart message after a few sec
  setTimeout(()=> { 
    userMessages.textContent = "";userMessages.classList.remove('restart-game')}, 3000);

  // Enable all buttons 
  const btns = document.querySelectorAll(".buttons");
  const strikeButton = document.querySelector(".strike-button");
  btns.forEach((button) => (button.disabled = false));
  strikeButton.disabled = false;

  // Reactivate UI components for continued games

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
  document.querySelector(".player-hand").classList.remove("graywash");
  document.querySelector(".computer-hand").classList.remove("graywash");

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
  buttons.forEach((button) => button.addEventListener("click", showActiveButton));

  // Set up 'strike' button to play a round each click
  strikeButton.addEventListener("click", playRound);

  // Start timer 
  CountDownTimer(25);

}


function CountDownTimer(timeRemaining){
  const timerText = document.querySelector('.countdown-text');
  const timerCount = document.querySelector('.timer');

  if(timeRemaining >= 0) {
  // Call timer every 1 second 
  timerText.textContent = "TIME";
  timerCount.textContent = `${timeRemaining}`;
  gameTimer = setTimeout(CountDownTimer, 1000, --timeRemaining);
  } else {
    // kill the game and timer once its finished
    timerText.textContent = "";
    setGameToEnd();
    displayWinner("timeOut")
  }
}


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
    // But if a new game, create a fresh energy bar for both players!
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


function playRound() {
  // Display random cpu hand
  const cpuHand = generateRandomHand();
  changeComputerHand(cpuHand);

  // Display player's hand
  const userHand = document.querySelector(".active-item").getAttribute("id");
  changePlayerHand(userHand);

  // Decide winner and display message
  let winner = decideWinner(userHand, cpuHand);
  showRoundResult(winner, userHand, cpuHand);

  // Reduce life of loser
  if (winner == "player") {
    reduceLife("computer");
  } else if (winner == "computer") {
    reduceLife("player");
  }

  // Check for loop kill switch!
  if (stillPlaying == false) displayWinner(winner);
}


function changeComputerHand(hand) {
  const computersChoice = hand;
  const computerHandGraphic = document.querySelector(".computer-hand");
  computerHandGraphic.src = `./assets/images/computer/computer-${computersChoice}.png`;
}


function generateRandomHand() {
  let plays = ["rock", "paper", "scissors"];
  computerHand = plays[Math.round(Math.random() * (2 - 0) + 0)];

  return computerHand;
}


function changePlayerHand(hand) {
  const playersChoice = hand;
  const playerHandGraphic = document.querySelector(".player-hand");

  playerHandGraphic.src = `./assets/images/player/player-${playersChoice}.png`;
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


function reduceLife(target) {
  if (target == "player") {
    // Reduce player life by 1
    const lifeBar = document.querySelector(".player-life-bar");
    const remainingLife = lifeBar.querySelector("div:not(.inactive)");
    remainingLife.classList.add("inactive");

    // Set game to end if no lives
    const totalRemainingLives = lifeBar.querySelectorAll("div:not(.inactive)");
    if (totalRemainingLives.length < 1) setGameToEnd();
  } else { // Reduce cpu life by 1
    const cpuLifeBar = document.querySelector(".cpu-life-bar");
    const cpuRemainingLife = cpuLifeBar.querySelector("div:not(.inactive)");
    cpuRemainingLife.classList.add("inactive");
    
    // Set game to end if no more energy units
    const totalCpuRemainingLives =
      cpuLifeBar.querySelectorAll("div:not(.inactive)");
    if (totalCpuRemainingLives.length < 1) setGameToEnd();
  }
}

function setGameToEnd(){
  stillPlaying = false;
}


function showRoundResult(winner, playersHand, computersHand) {
  let result = "";
  let stat = "";

  if (winner == "player") {
    result = "You win!";
    stat = `${playersHand.toUpperCase()} beats ${computersHand}!`;
  } else if (winner == "tie") {
    result = "Tie round.";
    stat = "Try again!";
  } else {
    result = "You lose!";
    stat = `${computersHand.toUpperCase()} beats ${playersHand}!`;
  }

  const winnerMessage = document.querySelector(".game-text");
  const statDisplay = document.querySelector(".game-subtext");

  winnerMessage.textContent = result;
  statDisplay.textContent = stat;
}


function showActiveButton(e) {
  if (document.querySelector(".active-item")) {
    const prevItem = document.querySelector(".active-item");
    prevItem.classList.remove("active-item");
  }
  const activeId = e.target.id;
  const activeButton = document.getElementById(activeId);
  activeButton.classList.add("active-item");
}


function displayWinner(winningPlayer) {

  const message = document.querySelector(".ending-text");
  const messageSubtext = document.querySelector(".game-subtext");
  

  // Gray out background and disable buttons
  deactivateInterface();
  killTimer(gameTimer);

  // message.classList.add('ending-text');
  // Display victory or defeat message
  if (winningPlayer == "computer") {
    message.textContent = "You're hurt, but don't give up! Think about Marianne";
  } else if (winningPlayer == "player") {
    message.textContent = "Well done! With one last crushing blow, you defeat Willy." + 
    "Hours later, you find Marianne, shaken but unhurt.";
  }else if(winningPlayer == "timeOut") {
    message.textContent = "Time's up!";
  }
  
  // Give option to continue
  playAgain();
}


function playAgain() {
  const mesg = "Hit Y to continue, Q to quit";
  document.querySelector('.game-subtext').textContent = mesg;

  // Get user input 
  document.addEventListener('keydown', (event)=> {

    // Reset game if need be
    const key = event.key;
    if (key.toLowerCase() == 'y'){
      initializeGame();
    }else if(key.toLowerCase() == 'q') { 
      gameOverScreen();

    }
  });

}


function gameOverScreen(){
  clearScreen();
  killTimer(gameTimer);

  document.querySelector('.credit-text').textContent = "INSERT COIN";
  document.querySelector('.game-over').textContent = "GAME OVER";



}



function clearScreen(){
  const mesgNodes = document.querySelector('.message-container').childNodes;
  mesgNodes.forEach((node)=>node.textContent="");
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

  // // Gray out buttons
  // const buttons = document.querySelectorAll(".buttons");
  // buttons.forEach((button) => button.classList.add("graywash"));

}


function killTimer(timer){
  clearTimeout(timer);
  // const countText = document.querySelector('.timer');
  const timerText = document.querySelector('.timer');
  const countText = document.querySelector('.countdown-text');
  countText.textContent = "";
  timerText.textContent = "";

}






function jukeBox(){

  const elAudio = document.createElement("audio");
  elAudio.src = "/assets/music/boss-time.mp3";
  elAudio.setAttribute("preload", "auto");


  function toggle(){

    const elClassList = this.classList;
    // Toggle music on
    if(elClassList.contains('fa-volume-xmark')){
        elClassList.remove('fa-volume-xmark');
        elClassList.add('fa-volume-high');
        play();

      // Toggle music off
    } else {
      elClassList.remove('fa-volume-high');
      elClassList.add('fa-volume-xmark');
      pause();
    }
  }

  function play(){
    elAudio.play();
  }

  function pause() {
    elAudio.pause();
  }

  function load(src) {
    

  }
  return { toggle, play, load}


  
}

// function playSong(mObject, file) {
//   mObject.src =  file;
//   mObject.setAttribute("preload", "auto")
//   mObject.play();

// }
// MAIN
window.onload = loadGameOpening;

// Pause for dramatic transition
setTimeout(initializeGame, 1);

// // Set background tunes
// let elMusic = document.createElement("audio");

// playSong(elMusic, "assets/music/boss-time.mp3");
// USER NEEDS TO INTERACT FIRST 

const musicBox = jukeBox();

// // Add event listener to music button
const elMusicToggle = document.querySelector('.toggle-music')
elMusicToggle.addEventListener('click', musicBox.toggle);
