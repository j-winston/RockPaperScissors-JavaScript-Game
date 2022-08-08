
// Globals 
let stillPlaying = true;
// Used to kill timer later on
let gameTimer; 

// Used to track index of intro screen text
let i = 0;
const introText = [
  "NYC: Sept 24, 2041..",
  "Willy and his thugs have captured Marianne..",
  "You'll have to fight him with your hands to save her...",
  "Get ready..",
];

const songList = {
  "intro":"assets/music/title-screen-2.mp3",
  "action-time":"assets/music/boss-time.mp3",
  "ending": "assets/music/8-bit-adventure-fesliyanstudios.mp3",
  "press-enter": "assets/sfx/press-enter-2.mp3",
  "soundtrack": "assets/music/soundtrack.mp3"
   };

const backgrounds = {
  "title":"/assets/images/title-screen.png",
  "intro": "/assets/images/double-dragon-intro.png",
  "game": "/assets/images/double-dragon-garage.png"
};


function loadTitleScreen(){
  const elBackground = document.querySelector(".background");
  elBackground.style.backgroundImage = "url('./assets/images/title-screen.png')";
  elBackground.style.backgroundSize = 'contain';
  elBackground.style.backgroundRepeat = 'no-repeat';

}


function loadIntro() {
    musicBox.loadSong('soundtrack');
    musicBox.playTime = 23;
    musicBox.play();
    
  changeBackground('intro');
 
  // Fade-in blue garage background
  document.querySelector(".background").classList.add("fade-in");
  displayOpeningText();
  

  function displayOpeningText() {
    typeWriter(0);
    
  
    function typeWriter(index){
      if(i < introText[index].length) {
        document.querySelector('.game-text').textContent += introText[index].charAt(i);
        setTimeout(typeWriter, 100,index);
        i++;
      }else{
        index++;
        i=0;
        // Reset text on screen
        document.querySelector('.game-text').textContent = "";
        setTimeout(typeWriter, 10, index);
      }
    }
    }
    musicBox.loadSong('intro');
    musicBox.play('intro');
  
    
}


function changeBackground(stage){
  const elBackground = document.querySelector(".background");
  elBackground.style.backgroundImage = `url("${backgrounds[stage]}")`;
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

  // Clear screen of all messages
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

  musicBox.switchSongs("action-time")


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
  elAudio.setAttribute("preload", "auto");
  const soundBank = {};
  let nowPlaying = '';
  elAudio.muted = true;
  elAudio.volume = 1;
  
  
  function toggle(){
    const elClassList = this.classList;
    // Toggle music on
    if(elClassList.contains('fa-volume-xmark')){
        elClassList.remove('fa-volume-xmark');
        elClassList.add('fa-volume-high');
        
        elAudio.play(); //  play on click for first time due to autoplay policy
        elAudio.muted = false;

      // Toggle music off
    } else {
      elClassList.remove('fa-volume-high');
      elClassList.add('fa-volume-xmark');
      elAudio.muted = true;
      
    }
  }

  function play(){
      
      elAudio.play()
      nowPlaying = elAudio.src
    }
    
  function pause (){
    elAudio.pause();
  }


  function addNewSong(src, scene) {
    soundBank[scene] = src;
    elAudio.src = src;
   
  }
  
  function addNewSongs(songList) {
    for(let scene in songList) {
      soundBank[scene] = songList[scene]
    }
      
    }

  function loadSong(scene){
    elAudio.src = soundBank[scene];
  
  
  }

  function fadeOut(interval) {

    timerID = setInterval(reduceVolume, interval);

    function reduceVolume(){
      if(elAudio.volume >= 0){
      elAudio.volume -=0.10
      }else{
        // Kill timer once volume hits 0
        clearInterval(timerID);
      }
    }
    
  }

  function fadeIn(interval) {
    elAudio.volume = 0;
    timerID = setInterval(increaseVolume, interval);
    
    function increaseVolume(){
      if(elAudio.volume <= .95){
      elAudio.volume +=0.02
      }else{
        // Kill timer once volume hits target
        clearInterval(timerID);
      }
    }
    
  }

  function switchSongs(scene) {
    
    loadSong(scene);
    // Fade in new song
    fadeIn(100);
    elAudio.play()
    
    


  }
  return { toggle, play, addNewSong, addNewSongs, loadSong, fadeOut, fadeIn, switchSongs}

}

function startOnEnter(e) {
 
  if(e.key === "Enter"){
    musicBox.loadSong('press-enter');
    musicBox.play('press-enter');
    document.removeEventListener('keydown',startOnEnter);
    // allow time to play sound
    setTimeout(loadIntro, 600);
    

  }
}



// MAIN

// Load title screen
window.onload = loadTitleScreen;

// Load intro screen on 'Enter' 
document.addEventListener('keydown', startOnEnter);




// // Wait till text concludes then start game up
// setTimeout(initializeGame, 14000);

// Feed songs to audio engine 
const musicBox = jukeBox();

musicBox.addNewSongs(songList);

 // // Add event listener to music button
 const elMusicToggle = document.querySelector('.toggle-music');
 elMusicToggle.addEventListener('click', musicBox.toggle);

// Play intro music 
musicBox.switchSongs("intro");











