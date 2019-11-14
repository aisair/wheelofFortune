let names = []; //player names
let playerMoney = []; //player money
let word = "index"; //word to guess
let choices = []; //letters already guessed
let randomMoney = 0; //amount of money spun, also determines if player has spun yet
let turn = 0; //determines which players' turn it is

function addPlayers() { //adds more name input fields so many players can play
    let number = parseInt(document.getElementById("playerNum").innerHTML) + 1;
    let newLabel = document.createElement("label");
    document.getElementById("playerNum").innerHTML = number.toString();
    newLabel.appendChild(document.createTextNode("Player " + number.toString()));
    let newInput = document.createElement("input");
    newInput.setAttribute("id", "p" + number.toString());
    newLabel.appendChild(newInput);
    document.getElementById("players").appendChild(newLabel);
}

function makeName(){ //starts game
    //gets names
    for (let i = 0; i < parseInt(document.getElementById("playerNum").innerHTML); i++){
        names.push(document.getElementById("p" + (i + 1).toString()).value);
        playerMoney.push(0);
    }

    //cute player introduction
    let alertNames = "";
    if (names.length === 2){
        alertNames = names[0] + " and " + names[1];
    }
    else{
        for (let i = 0; i < names.length; i++){
            if (i === names.length - 1){
                alertNames += "and " + names[i] + ".";
            }
            else {
                alertNames += names[i] + ", ";
            }
        }
    }
    alert("Welcome to Wheel of Fortune, " + alertNames);

    //create name and score listing
    for (let i = 0; i < names.length; i++){
        let nameSpan = document.createElement("span");
        nameSpan.appendChild(document.createTextNode(names[i].toString() + " (Score: "));
        let scoreSpan = document.createElement("span");
        scoreSpan.setAttribute("id", "p" + (i + 1) + "score");
        scoreSpan.appendChild(document.createTextNode("0"));
        nameSpan.appendChild(scoreSpan);
        nameSpan.innerHTML += "), ";
        document.getElementById("playerNames").appendChild(nameSpan);
    }

    //hide intro panel and reveal game panel
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.visibility = "visible";

    //choose word category
    let wordType;
    let valid = false;
    while (valid === false){
        wordType = prompt("What category of word would you like to play? (noun, verb, adjective)").toLowerCase();
        if (wordType === "noun" || wordType === "adjective" || wordType === "verb"){
            valid = true
        }
        else{
            alert("Input was not valid. Please try again.")
        }
    }
    word = randomWord(wordType);
    updateBoard();
}

function randomWord(category){ //chooses random word from large array of words
    let categories = [];
    let type; //0: verb, 1: noun, 2: adjective
    switch (category) {
        case "verb":
            type = 0;
            break;
        case "noun":
            type = 1;
            break;
        case "adjective":
            type = 2;
            break;
        default:
            type = 0;
    }
    categories[0] = ["travel", "decay", "shade", "ski", "bathe", "record", "wobble", "dare", "raise", "prefer", "radiate", "play", "prevent", "queue", "work", "attract", "reflect", "compare", "yell", "spare", "squeak", "meddle", "polish", "curl", "part", "escape", "note", "detect", "plant", "stitch", "invent", "whip", "twist", "admit", "unite", "avoid", "wander", "suggest", "scratch", "stretch", "deliver", "blind", "challenge", "knock", "share", "repair", "squeal", "grate", "battle", "explode", "announce", "tip", "trap", "suspend", "kiss", "x-ray", "rub", "float", "tap", "clip", "mine", "snow", "watch", "lock", "rejoice", "pull", "stay", "embarrass", "trust", "peep", "bare", "hope", "retire", "train", "change", "report", "shelter", "contain", "intend", "trot", "relax", "attend", "unlock", "interrupt", "sail", "moor", "buzz", "peck", "connect", "use", "strengthen", "whine", "dress", "face", "destroy", "suspect", "stain", "tire", "signal", "unfasten"];
    categories[1] = ["fly", "sneeze", "hat", "finger", "discovery", "alarm", "daughter", "temper", "comparison", "hope", "voyage", "dinosaurs", "view", "muscle", "teaching", "tail", "wren", "finger", "wood", "smash", "tongue", "mark", "song", "pollution", "cast", "pizzas", "achiever", "card", "existence", "move", "snail", "year", "laborer", "winter", "scale", "crate", "oranges", "monkey", "respect", "suit", "force", "day", "rule", "air", "donkey", "hall", "frog", "humor", "store", "scent", "twig", "trouble", "button", "exchange", "writing", "kick", "cobweb", "transport", "ghost", "collar", "education", "son", "fire", "suggestion", "knowledge", "system", "limit", "roll", "curtain", "pin", "church", "ray", "texture", "aunt", "weather", "farm", "squirrel", "veil", "seed", "waste", "top", "kitty", "wing", "bite", "shake", "vegetable", "sleep", "home", "quilt", "guide", "effect", "name", "sea", "animal", "zinc", "substance", "fang", "dogs", "liquid", "nerve"];
    categories[2] = ["nebulous", "scattered", "wet", "devilish", "certain", "agreeable", "dead", "shut", "used", "aback", "perpetual", "wakeful", "incredible", "acceptable", "adventurous", "naughty", "macho", "thoughtless", "far", "abstracted", "unsightly", "glamorous", "equal", "industrious", "remarkable", "aggressive", "miscreant", "terrific", "quarrelsome", "purring", "barbarous", "tall", "longing", "utopian", "worried", "ambiguous", "red", "broad", "domineering", "labored", "unequaled", "internal", "untidy", "whimsical", "sick", "bright", "unhealthy", "versed", "like", "imaginary", "steadfast", "cheerful", "sore", "muddled", "assorted", "whispering", "vulgar", "standing", "calm", "unkempt", "homely", "omniscient", "frail", "burly", "stereotyped", "aboard", "ill-informed", "jittery", "regular", "stingy", "jobless", "woozy", "profuse", "anxious", "fallacious", "annoyed", "fancy", "wide", "axiomatic", "dashing", "reminiscent", "wealthy", "future", "lying", "slim", "full", "plain", "mundane", "incompetent", "yellow", "obese", "mindless", "brash", "amusing", "military", "envious", "fertile", "shaky", "ten", "disgusted"];
    return categories[type][Math.floor(Math.random()*99)] //random word from the category the players chose
}

function updateBoard() { //updates game board
    //game board
    let board = "";
    for (let i = 0; i < word.length; i++){ //checks for matches between letters already chosen and actual word
        for (let j = 0; j < choices.length; j++){
            if (word[i] === choices[j]){
                board += choices[j].toString();
            }
        }
        if (board[i] === undefined){ //inserts an underscore if letter has not been guessed yet
            board += "_";
        }
    }
    board = board.split("").join(" "); //spaces out the string for visibility
    document.getElementById("showWord").innerHTML = "GameBoard: " + board; //prints board on page

    //player scores
    for (let i = 0; i < names.length; i++){ //loops through each player to set the money to the array playerMoney
        document.getElementById("p" + (i + 1) + "score").innerHTML = playerMoney[i]
    }

    //check for game end
    if (board === word.split("").join(" ")){
        alert("The word has been guessed! It was " + word +"!");
        document.getElementById("playAgain").style.display = "block"; //show the play again button
    }
}

function spinWheel() { //spins wheel to get a pseudorandom amount of money
    const boardValues = [500, 30, 200, 100, 500, 400, 300, 200, 100, 200, 850, 450, 200, 700, 250, 150, 400, 600, 250, 350, 500, 900, -1, 500];
    let randomNumber = Math.floor(Math.random()*24);
    let deg = -(randomNumber / 24);
    randomMoney = boardValues[randomNumber];
    document.getElementById("wheel").style.transform = "rotate(" + deg + "turn)";
    if (randomMoney !== -1) { //check for bankrupt tile
        alert(names[turn] + " spins the Wheel... and lands on $" + randomMoney + "!");

        //disable more spinning
        document.getElementById("guess").removeAttribute("disabled");
        document.getElementById("spin").setAttribute("disabled", "");
    }
    else{ //oops!
        alert(names[turn] + " spins the Wheel... and becomes bankrupt! Their amount of money has been set to 0.");
        playerMoney[turn] = 0;
        nextPlayer();
    }
}

function playAgain() { //soft reset of game
    document.getElementById("playAgain").style.display = "none"; //hides button
    word = randomWord(); //new word!
    choices = []; //reset letters used
    turn = 0; //reset turn
    updateBoard(); //and update the board
}

function guess(){ //executes when a guess is made, controls game play
    if (randomMoney !== 0) { //redundant check if player has spun
        document.getElementById("guess").setAttribute("disabled", ""); //disables guess button so player cannot guess again
        let playerGuess = prompt("What letter would you like to guess?");
        if (choices.indexOf(playerGuess) === -1) { //checks if the letter has already been chosen
            choices.push(playerGuess); //adds guessed letter to the already chosen array
            if (word.indexOf(playerGuess) === -1) { //checks if letter is in the word
                alert(names[turn] + " didn't guess a letter correctly. Turn has been passed to the next player, " + names[turn + 1] + "!");
                nextPlayer();
            }
            else{ //if letter is in the word
                playerMoney[turn] += randomMoney; //adds previously rolled random value to the player's score/money
                alert(names[turn] + " guessed a letter correctly and got $" + randomMoney + "! They now have $" + playerMoney[turn] + ".")
            }
            updateBoard(); //update the board
        }
        else{ //if the letter was already chosen
            alert("This letter was already guessed!");
        }
        randomMoney = 0; //resets random $ amount back to zero to indicate that wheel has not been spun
        document.getElementById("spin").removeAttribute("disabled"); //enable the spin button
    } else { //if the player somehow clicked the guess button before clicking spin
        alert("I don't know how you just pressed this button, but please click the spin button first!");
    }
}

function nextPlayer(){ //switch to next player's turn
    if (turn + 1 < names.length){ //add turn as long it is not the last player in the array
        turn++
    }
    else{ //come back to first player after last player's turn
        turn = 0
    }
}