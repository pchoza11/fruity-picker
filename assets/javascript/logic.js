// Global Variables
//==========================================================================
// Arrays and variables for holding data
var wordOptions = ["paul", "tom", "henderson", "stephanie", "laurel", "yanny", "mike", "clark", "paige", "elton", "bethany", "kendra", "lauren"]
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; // l _ _ _ _ _
var wrongLetters = [];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// Functions (Reusable blocks of code, that will be called upon as needed)
//===========================================================================

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    //reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //populate blanks and successes
    for (var i = 0; i < numBlanks; i++){
    blanksAndSuccesses.push("_");
    }

    //change html to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;



    //test
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
    
    
}

function checkLetters(letter) {
    //check if letter exists in code at all
    var isLetterInWord = false;

    for ( var i = 0; i < numBlanks; i++){
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }

    }

    //check where in word letter exists
    if (isLetterInWord){
        for ( var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }

    }
    //letter not found
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    //test
    console.log(blanksAndSuccesses);
}

function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + "| Guesses Left " + guessesLeft)

    //update HTML to show most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join("  ");
    
    //

    //check if won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        //update win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;
        document.getElementById("wrongGuesses").innerHTML = 0; 
        

        startGame();
    }

    //check if lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost!");

        //update HTML
        document.getElementById("lossCounter").innerHTML = lossCount; 
        document.getElementById("wrongGuesses").innerHTML = 0; 
        
        startGame();
    }

}


// Main Process
//===========================================================================

//initiates code for the first time
startGame();

// register keyclicks

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    
    //test
    console.log(letterGuessed);
}
