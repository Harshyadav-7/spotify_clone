const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
}

updateScoreElement();

// if(!score){
//     score = { 
//         wins: 0,
//         losses: 0,
//         ties: 0,
//     };
// }

    function playGame(playerMove){
   const computerMove = pickComputerMOve();
   
   let result = '';

   if(playerMove === 'scissor'){
   if(computerMove === 'Rock'){
       result = 'you lose';
   }else if(computerMove === 'Paper'){
       result = 'you win';
   }else if(computerMove === 'Scissor'){
       result = 'tie';
   }
}else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
        result = 'you win';
    }else if(computerMove === 'Paper'){
        result = 'tie';
    }else if(computerMove === 'Scissor'){
        result = 'you lose';
    } 
}else{
    if(computerMove === 'rock'){
        result = 'tie';
    }else if(computerMove === 'Paper'){
        result = 'You lose';
    }else if(computerMove === 'Scissor'){
        result = 'you win';
    }

}


if(result === 'you win'){
    score.wins += 1;
}else if(result === 'you lose'){
    score.losses += 1;
}else if(result === 'tie'){
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));


updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves')
.innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
    // console.log(`Image path: images/${computerMove}-emoji.png`);

}


function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}
function pickComputerMOve(){
    const randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove ='rock';
    }else if (randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }else if(randomNumber >= 2/3 && randomNumber < 1 ){
        computerMove = 'scissor';
    }
    return computerMove;
}
    