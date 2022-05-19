// Setup GameData
const wordSet = new Set();
fetch("/wordslist.txt")
  .then((response) => response.text())
  .then((text) => text.split("\n"))
  .then((wordlist) => {
    wordlist.forEach((word) => wordSet.add(word.toUpperCase()));
  });

var answerWord;
fetch("/acceptable_answers.txt")
  .then((resp) => resp.text())
  .then((text) => text.split("\n"))
  .then(
    (answerlist) =>
      (answerWord = answerlist[Math.floor(Math.random() * answerlist.length)])
  );

console.log(wordSet);
console.log(answerWord);

//Setup Input Listeners
keys = document.getElementsByClassName("key");
for (i = 0; i < keys.length; i++) {
  keys[i].onclick = (event) =>
    gameinput(event.srcElement.innerText.toUpperCase());
}

document.onkeydown = (event) => gameinput(event.key.toUpperCase());

// Setup GameBoard
const board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

function redrawGrid() {
  rows = document.getElementsByClassName("row");
  for (r = 0; r < 6; r++) {
    letters = rows[r].getElementsByClassName("letter");
    for (c = 0; c < 5; c++) {
      letters[c].innerText = board[r][c];
    }
  }
}

var attempt = 0;
var letterPos = 0;

var used_keys = [];
var yellow_keys = [];
var green_keys_index = [];
var matches = ["", "", "", "", ""];


function gameinput(key) {
  console.log(key);

  // Press Alphabet
  if (key.match(/^[A-Z]{1}$/) && letterPos < 5) {
    board[attempt][letterPos] = key;
    letterPos++;
  }

  // Press Backspace
  if (
    (key === "BACKSPACE" || key === "DEL" || key == "DELETE") &&
    letterPos > 0
  ) {
    board[attempt][letterPos - 1] = "";
    letterPos--;
  }

  // Submit Guess
  if (key === "ENTER" && letterPos === 5) {

    let word = board[attempt].join("").toUpperCase();
    if (!wordSet.has(word)) {
      alert("Invalid word"); 
      return;
    };

    /* COLOR KEYS */
    // grey keys
    for(i=0;i<5;i++) {
      document.getElementById(word[i]).classList.add("bg-used")
    }
    // green keys 
    for (i = 0; i < 5; i++) {
      if (word[i] === answerWord[i]) {
        matches[i] = "g";
        document.getElementById(word[i]).classList.add("bg-green");
        green_keys_index.push(i);
      }
    }
    // yellow keys
    for (i = 0; i < 5; i++) {
      for (j = 0; j < 5; j++) {
        if (green_keys_index.includes(j) || yellow_keys.includes(j)) continue; //console.log("Match at ", i, j);
        if (word[i] == answerWord[j]) {
          matches[i] = "y";
          yellow_keys.push(j);
          document.getElementById(word[i]).classList.add("bg-yellow");
        }
      }
    }
    
    for (i = 0; i < 5; i++) {
      document
        .getElementsByClassName("row")
        [attempt].getElementsByClassName("letter")
        [i].classList.add(
          matches[i] == "y"
            ? "bg-yellow"
            : matches[i] == "g"
            ? "bg-green"
            : "bg-used"
        );
    }

    /* WIN CONDITION */
    if (word === answerWord ) {
      endgame("win")
      return;
    } else if (attempt == 5) {
      endgame("lose")
      return;
    }

    /* Setup for next attempt */
    attempt++;
    letterPos = 0;
    green_keys_index = [];
    yellow_keys = [];
    matches = [];
  }

  redrawGrid();
}

function endgame(result) {
  alert(result)
}