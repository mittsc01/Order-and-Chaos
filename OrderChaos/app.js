document.addEventListener('DOMContentLoaded', () => {
  const squares=document.querySelectorAll(".grid div")
  const selectXO=document.querySelectorAll("#mode-toggle div");
  const result=document.querySelector("#result")
  const displayCurrentPlayer=document.querySelector("#current-player")
  const displayMode=document.querySelector("#player-mode")
  const displayRd=document.querySelector("#round");
  const displayScore=document.querySelector("#score")
  const displayChaosQuote=document.querySelector('#chaos-quote');
  const displayOrderQuote=document.querySelector('#order-quote')
  let rdCount=1;
  let empties=36;
  let currentPlayer="Order";
  let playerMode="o";
  let score={p1:0,p2:0};
  squares.forEach(square=>{
    square.addEventListener('click',clickOutcome)
  })
  selectXO.forEach(square=>{
    square.addEventListener('click',toggleX)
  })
  function toggleX(e){
    const XOArray=Array.from(selectXO);
    const index=XOArray.indexOf(e.target);
    if (index===0){
      playerMode="x";
    }
    else {
      playerMode='o';
    }
    displayMode.innerHTML=playerMode;
    selectXO[index].style.backgroundColor="teal";
    selectXO[(index+1)%2].style.backgroundColor="grey";
  }
  function clickOutcome(e){
    const squareArray=Array.from(squares);
    const index=squareArray.indexOf(e.target);

    if (!squares[index].classList.contains('taken')){
      squares[index].classList.add(playerMode,'taken')
      empties-=1;

      //update display if one player wins.




        if (orderWins(playerMode)){
          displayOrderQuote.style.visibility="visible"
          if (rdCount===1){
            score.p1=empties
            displayScore.innerHTML=` Player1: ${score.p1} Player2: 0`
            displayRd.innerHTML="2"
            empties=36
            squares.forEach(square=>square.classList.remove('x','o','taken'))
            rdCount+=1;
            currentPlayer="Order"

          }
          else{
            score.p2+=empties
            displayScore.innerHTML=` Player1: ${score.p1} Player2: ${score.p2}`
            if (score.p2>score.p1){
              result.innerHTML=`p2 wins ${score.p2} to ${score.p1}`;
            }
            else if (score.p2===score.p1){
              result.innerHTML=`Tie ${score.p2} to ${score.p1}`
            }
            else {
              result.innerHTML=`p1 wins ${score.p1} to ${score.p2}`
            }
            squares.forEach(square=>square.classList.add('taken'))
          }
        }
        else if (chaosWins()){
          displayChaosQuote.style.visibility="visible"
          if (rdCount===1){
            score.p2=empties
            displayScore.innerHTML=` Player1: ${score.p1} Player2: ${score.p2}`
            displayRd.innerHTML="2"
            empties=36
            squares.forEach(square=>square.classList.remove('x','o','taken'))
            rdCount+=1;
            currentPlayer="Order"
          }
          else{

            score.p1+=empties
            displayScore.innerHTML=` Player1: ${score.p1} Player2: ${score.p2}`
            if (score.p2>score.p1){
              result.innerHTML=`p2 wins ${score.p2} to ${score.p1}`;
            }
            else if (score.p2===score.p1){
              result.innerHTML=`Tie ${score.p2} to ${score.p1}`
            }
            else {
              result.innerHTML=`p1 wins ${score.p1} to ${score.p2}`
            }
            squares.forEach(square=>square.classList.add('taken'))
          }
        }
        else {
          displayChaosQuote.style.visibility="collapse"
          displayOrderQuote.style.visibility="collapse"
          if (currentPlayer==="Order"){
            currentPlayer="Chaos"
          }
          else {
            currentPlayer="Order"
          }
          displayCurrentPlayer.innerHTML=currentPlayer;

        }





    }
    else {alert("You can't go there!")}
  }
  //checks board to see if there are 5 in a row. Still need only check the most recent letter played.
  //TODO: finish updating numbers for 6x6 board.
  function orderWins(player){

    for (let i=0;i<36;i++){
      if (squares[i].classList.contains(player)){
        if (i%6<2){
          if (checkRight(i,player)){
            return true
          }
        }
        if (i/6<2){
          if (checkDown(i,player)){
            return true
          }
        }
        if ([0,1,6,7].includes(i)){
          if (checkSE(i,player)){
            return true
          }
        }
        if ([4,5,10,11].includes(i)){
          if (checkSW(i,player)){
            return true
          }
        }
      }
    }

  }
  function checkRight(n,player){
    for (let i=1;i<=4;i++){
      if (!squares[n+i].classList.contains(player)){
        return false
      }
    }
    return true
  }
  function checkDown(n,player){
    for (let i=1;i<=4;i++){
      if (!squares[n+6*i].classList.contains(player)){
        return false
      }
    }
    return true
  }

  function checkSE(n,player){
    for (let i=1;i<=4;i++){
      if (!squares[n+7*i].classList.contains(player)){
        return false
      }
    }
    return true
  }

  function checkSW(n,player){
    for (let i=1;i<=4;i++){
      if (!squares[n+5*i].classList.contains(player)){
        return false
      }
    }
    return true
  }

  //Chaos check
  function chaosWins(){
    let players=["o","x"];
    for (let n=0;n<2;n++){
      let player=players[n];
      let opp=players[(n+1)%2];
      for (let i=0;i<36;i++){
        if (!squares[i].classList.contains(opp)){
          if (i%6<2){
            if (!chaosCheckE(i,player,opp)){

              return false
            }
          }
          if (i/6<2){
            if (!chaosCheckS(i,player,opp)){

              return false
            }
          }
          if ([0,1,6,7].includes(i)){
            if (!chaosCheckSE(i,player,opp)){

              return false
            }
          }
          if ([4,5,10,11].includes(i)){
            if (!chaosCheckSW(i,player,opp)){

              return false
            }
          }
        }
      }

    }
    return true
  }
  //these 'checks' return false if 5 in a row of player (e.g. x or o) is possible
  function chaosCheckE(n,player,opp){

    for (let i=1;i<=4;i++){
      if (squares[n+i].classList.contains(opp)){
        return true
      }

    }
    return false
  }
  function chaosCheckS(n,player,opp){

    for (let i=1;i<=4;i++){
      if (squares[n+6*i].classList.contains(opp)){
        return true
      }

    }
    return false
  }
  function chaosCheckSE(n,player,opp){

    for (let i=1;i<=4;i++){
      if (squares[n+7*i].classList.contains(opp)){
        return true
      }

    }
    return false
  }
  function chaosCheckSW(n,player,opp){

    for (let i=1;i<=4;i++){
      if (squares[n+5*i].classList.contains(opp)){
        return true
      }

    }
    return false
  }





})
