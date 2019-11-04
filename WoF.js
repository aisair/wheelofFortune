let names = []; //player names
let nameCount = 2; //amount of players
let word; //word to guess
let board; //WoF board to display on page
let money = false;
let myGuess; //players' guess
let choices = []; //letters guessed
let random;
let myMoney1 = 0;
let myMoney2 = 0;
let totalGuessed = 0;
let turn = 0; //determines which players' turn it is

function makeName(){ //starts game
    for (let i = 0; i < nameCount; i++){
        names[i] = document.getElementById("txtName" + i.toString()).value();
    }
}

function initWord(){ //random word or phrase to guess

}

function addMore(){ //

}

function addMoney(){ //

}

function makeWord() {

}

function guess(){ //executes when a guess is made, controls game play
    if (money !== false) {
        money = false; //set bool back to false to prevent unwanted repetition (for next spin)
        myGuess = prompt("What letter would you like to guess?");
        choices.push(myGuess); //adds guessed letter to the already chosen array
        alert(choices.join(",")); //for debugging
        makeWord(); //call the function to display updated word
    } else {
        alert("Please click the spin button!");
    }
}

function switchPlayer(){

}

function genDollar(){ //generate a random amount of money
    return Math.floor((Math.random()*1000)+1);
}