stillPlaying = true;
roundNumber = 1;

userWins = 0;
computerWins = 0;



function computerPlay() {
    let plays = ['rock', 'paper', 'scissors'];
    computerHand = plays[Math.round(Math.random() * (2 - 0) + 0)];

    return computerHand;
}

function playRound(computerSelection, playerSelection) {
    let winner = '';

    if (computerSelection === 'rock') {
        if (playerSelection === 'paper') {
            winner = 'player';
        }
        else if (playerSelection === 'scissors') {
            winner = 'computer';
        }
        else {
            winner = 'tie';
        }
    }
    else if (computerSelection === 'paper') {
        if (playerSelection === 'rock') {
            winner = 'computer';
        }
        else if (playerSelection === 'scissors') {
            winner = 'player';
        } else {
            winner = 'tie';
        }  
    }

    else if (computerSelection === 'scissors') {
        if (playerSelection === 'rock') {
            winner = 'player';
        }
        else if (playerSelection === 'paper') {
            winner = 'computer';
        } else {
            return 'tie';
        }  
    
    
    }
    return winner;
}
//Main game loop
while (stillPlaying) {
    if (roundNumber > 5) {
        if ( userWins > computerWins) {
            console.log(`${computerWins} to ${userWins}', you win!`);
        }
        else if (userWins === computerWins) {
            console.log("It's a tie.");
        } else {
            console.log(`${computerWins} to ${userWins}. You lost.`);
        }

        stillPlaying = false;
    }


        userHand = prompt("What's your hand? Type 'rock', 'paper', or 'scissors': ");
        computerHand = computerPlay();

        let theWinner = playRound(computerHand, userHand);

        if (theWinner === 'player') {
            console.log(`You:${userHand}`);
            console.log(`Computer: ${computerHand}`);
            console.log(`${theWinner} wins!`)
        } else if (theWinner === 'computer') {
            console.log(`You: ${userHand}`);
            console.log(`Computer: ${computerHand}`);
            console.log(`${theWinner} wins!`)
        }

        // If tie round, do the round over, don't increment it
        if (theWinner === 'tie'){
            console.log(`Tie round. Both players chose ${userHand}`);
        }
        else {
            roundNumber ++;
        }

    

}