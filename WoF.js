let names = []; //player names
let playerMoney = []; //player money
let word = "index"; //word to guess
let board = ""; //WoF board to display on page
let money = false;
let myGuess; //players' guess
let choices = []; //letters guessed
let random = 0;
let totalGuessed = 0;
let turn = 0; //determines which players' turn it is

function addPlayers() {
    document.getElementById("playerNum").innerHTML = parseInt(document.getElementById("playerNum").innerHTML) + 1;
    let newLabel = document.createElement("label");
    let labelContent = document.createTextNode("Player " + document.getElementById("playerNum").innerHTML.toString());
    let newInput = document.createElement("input");
    newLabel.appendChild(labelContent);
    newLabel.appendChild(newInput);
    document.getElementById("players").appendChild(newLabel);
}

function makeName(){ //starts game
    for (let i = 0; i < parseInt(document.getElementById("playerNum").innerHTML); i++){
        names.push(document.getElementById("p" + (i + 1).toString()).value);
        playerMoney.push(0);
    }
    console.log(names);
    console.log(playerMoney);
}

function spinWheel() {
    random = genMoney();
    alert("Player " + (turn+1) + " spins the Wheel... and lands on $" + random + "!");
}

function genMoney(){ //generate a random amount of money
    return Math.floor((Math.random()*1000)+1);
}

function initWord(){ //random word or phrase to guess

}

function addMore(){ //

}

function addMoney(){ //

}

function makeWord() {
    choices = ["i"];
    console.log(word.length);
    console.log(choices.length);
    for (let i = 0; i < word.length; i++){
        for (let j = 0; j < choices.length; j++){
            if (choices[j] === word.charAt(i)){
                board += choices[j];
                console.log(choices[j]);
                console.log(j);
            }
            else{
                board += "_"
            }
        }
    }
    console.log(board);
    console.log(document.getElementById("showWord"));
    document.getElementById("showWord").innerHTML = board;
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

makeWord();