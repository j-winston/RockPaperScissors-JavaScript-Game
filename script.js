
let stillPlaying = true;


function generateLifeBars(){
  for(let x=0; x < 5; x++) {
    // Draw player life units 
    const lifeUnit = document.createElement('div');
    lifeUnit.classList.add('player-life-unit');
    const lifeBar = document.querySelector('.player-life-bar');
    lifeBar.appendChild(lifeUnit);

    //Draw cpu life units 
    const cpuLifeUnit = document.createElement('div');
    cpuLifeUnit.classList.add('cpu-life-unit');
    const cpuLifeBar = document.querySelector('.cpu-life-bar');
    cpuLifeBar.appendChild(cpuLifeUnit);
  }

}


function reduceLife(target){
  if(target == 'player') {
    const lifeBar = document.querySelector('.player-life-bar');
    const remainingLife = lifeBar.querySelector('div:not(.inactive)');
    remainingLife.classList.add('inactive');

    // Set game to end if no lives
    const totalRemainingLives = lifeBar.querySelectorAll('div:not(.inactive)');
    if(totalRemainingLives.length < 1) stillPlaying = false;
    
    
  }else {
    const cpuLifeBar = document.querySelector('.cpu-life-bar');
    const cpuRemainingLife = cpuLifeBar.querySelector('div:not(.inactive)');
    cpuRemainingLife.classList.add('inactive');
    // End game if no more energy units 
    const totalCpuRemainingLives = cpuLifeBar.querySelectorAll('div:not(.inactive)');
    if(totalCpuRemainingLives.length < 1) stillPlaying = false;
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

function deactivateInterface(){
    // Deactivate all buttons 
    const btns = document.querySelectorAll(".buttons");
    const strikeButton = document.querySelector(".strike-button");
    btns.forEach(button => button.disabled = true);
    strikeButton.disabled = true;

    // Gray out energy bar
    const lifeBar = document.querySelector('.player-life-bar');
    const cpuLifeBar = document.querySelector('.cpu-life-bar');

    lifeBar.style.opacity = .2;
    cpuLifeBar.style.opacity = .2;

    // Gray out background
    const background = document.querySelector('body');
    background.classList.add('dither-background');

    // Gray out user hands
    document.querySelector(".player-hand").classList.add('graywash');
    document.querySelector(".computer-hand").classList.add('graywash');

    // Gray out buttons 
    const buttons = document.querySelectorAll(".buttons");
    buttons.forEach(button => button.classList.add('graywash'));


}


function endGame(winningPlayer){
  // Display end of game message
  const message = document.querySelector('.game-text');
  const messageSubtext = document.querySelector('.game-subtext');
  
  if(winningPlayer == 'computer'){
    message.textContent = "You're hurt, but don't give up!";
    messageSubtext.textContent = "Think about Mariane!";
   
  } else{
    message.textContent = "With one last crushing blow, you dispatch Willy.";
    messageSubtext.textContent = "Hours later, you find Marianne, shaken but unhurt";
  }

  // Gray out background and disable buttons 
  deactivateInterface();


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
  if(winner == 'player') {
    reduceLife('computer');
  }else if(winner == 'computer') {
    reduceLife('player');
  }

  if(stillPlaying==false) endGame(winner);


  }


// Main events

  // Give each player 5 bars of life
  generateLifeBars();

  // Activate rock, paper, scissors buttons 
  const buttons = document.querySelectorAll(".buttons");
  buttons.forEach((button) => button.addEventListener("click", activateButton));

  // Every time 'strike' button is hit, play a round
  const strikeButton = document.querySelector(".strike-button");
  strikeButton.addEventListener("click", playRound);



 
 

  



  









