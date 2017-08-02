"use strict";
let correct = [];
let choices = [];
let counter = 0;
let choicesLeft = counter+1;
let move = [];
let moving = "";

let currentGame={
	counter : 0,
	picks : [1,2,3,4],
	gameSound: {
		1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
		2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
		3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
		4: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	},
	computerMove : [],
	playerMove: [],
    on: false,
	hard: false
}
function changeButton(ele, state){
    if(!state){
        $(ele).html("On").removeClass("btn-danger").addClass("active btn-success");
    }
    else{
        $(ele).html("Off").removeClass("active btn-success").addClass("btn-danger");
    }
}
function onOff(ele){
   
    switch(ele.id){
        case "on": 
            if(!currentGame.on){
                currentGame.on = true;
                changeButton(ele, false);
                
            }       
            else{
                currentGame.on = false;
                changeButton(ele,true);
                
            }
            break;
        case "strict":
            if(!currentGame.hard){
                currentGame.hard = true;
                changeButton(ele, false);
                
            }       
            else{
                currentGame.hard = false;
                changeButton(ele,true);
            }
            break;
            
     }
    
    
}
function clearGame(){
	
    $("#counterBox").innerHtml = 0;
	currentGame.counter = 0;
	currentGame.computerMove = [];
	currentGame.playerMove = [];
    document.getElementById("scoreAlert").style.display="hidden";
	clearPlayer();
	
}
function clearPlayer(){
	currentGame.playerMove = [];
}
function checkPick(){
	if(currentGame.playerMove[currentGame.counter] == currentGame.computerMove[currentGame.counter]){
		currentGame.counter++;
		
	}
	else{
		document.getElementById("scoreAlert").innerHTML='<div class="alert alert-danger" role="alert"><strong>Wrong! Try Again!</div>';
		clearPlayer();
		lightBoard();
        
		//clearGame();
		//clearPlayer();
	}
	
	if(currentGame.counter == currentGame.computerMove.length){
	  $("#counterBox").html(currentGame.counter);
		currentGame.counter = 0;
        document.getElementById("scoreAlert").innerHTML='<div class="alert alert-success" role="alert">Good job, keep it up!</div>';
		clearPlayer();
		generateMove();
	}
    
    if(currentGame.counter == 20){
        document.getElementById("scoreAlert").innerHTML='<div class="alert alert-success" role="alert">You\'ve won! Good work! Hit Start to play again!</div>';
		clearPlayer();
    }
}
function lightBoard(){
	var x = 0;
    clearInterval(moving);
	moving = setInterval(function(){
		
		thereWasLight(document.getElementById(currentGame.computerMove[x]), currentGame.computerMove[x]);
		x++;
		if (x >= currentGame.computerMove.length){
			clearInterval(moving);
		}
	},600);
    
    clearPlayer();
	
}
function thereWasLight(ele, idx){
	$(ele).addClass("bright");
	
    currentGame.gameSound[idx].play();
    
	setTimeout(function(){
      $(ele).removeClass("bright");
			
  }, 400);
}

function generateMove(){
	var x = Math.floor(Math.random()*4);
	currentGame.computerMove.push(currentGame.picks[x]);
	
	lightBoard()
	
}
$(document).ready(function(){
    $(".box").click(function(){
    if(currentGame.on){
        currentGame.playerMove.push(this.id);
        currentGame.gameSound[this.id].play();
	   checkPick();
    }
	else{
        thereWasLight(this, this.id);
    }
});
$("#start").click(function(){
	if(currentGame.on){
       clearGame();
	   generateMove();
    }
    
});
$("#reset").click(function(){
	clearGame();
    clearInterval(moving);
	currentGame.highScore = 0;
});
/*
$("#on").click(function(){
   if(this.ariapressed = "true"){
       currentGame.on = true;
   }
   else{
       currentGame.on = false;
       clearGame();
       clearPlayer();
       
   }
});*/
});
