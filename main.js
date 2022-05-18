const wordSet = new Set();
fetch("/wordslist.txt")
  .then((response) => response.text())
  .then((text) => text.split("\n"))
  .then(wordlist=>{
    for(const word in wordlist) {
      wordSet.add(wordlist[word])
    }
  })

console.log(wordSet);

keys = document.getElementsByClassName("key");
for (i = 0; i < keys.length; i++) {
  keys[i].onclick = (event) =>
    gameinput(event.srcElement.innerText.toUpperCase());
}

document.onkeydown = (event) => gameinput(event.key.toUpperCase());

const board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
used_keys = [];
yellow_keys = [];
green_keys_index = [];
attempt = 0;
letterPos = 0;

function mainloop() {
  rows = document.getElementsByClassName("row");
  for (r = 0; r < 6; r++) {
    letters = rows[r].getElementsByClassName("letter");
    for (c = 0; c < 5; c++) {
      letters[c].innerText = board[r][c];
    }
  }
}

function gameinput(key) {
  console.log(key);
  if (key.match(/^[A-Z]{1}$/) && letterPos < 5) {
    board[attempt][letterPos] = key;
    letterPos++;
  }
  if (letterPos === 5 && key === "ENTER") {
    attempt++;
    letterPos = 0;
  }
  if (
    (key === "BACKSPACE" || key === "DEL" || key == "DELETE") &&
    letterPos > 0
  ) {
    board[attempt][letterPos - 1] = "";
    letterPos--;
  }
  mainloop();
}
