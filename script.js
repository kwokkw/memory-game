const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const savedScore = JSON.parse(localStorage.getItem("lowScore"));

if (savedScore) {
  document.querySelector("#best-score").innerText = savedScore;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length; // counter = 10, 9, 8, ...

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--; // counter = 9, 8, 7, ...

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardsInPlay = [];
let cardsFlipped = 0;
let lowScore = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //const cardNodesList = event.target.parentElement.childNodes;

  if (cardsInPlay.length === 2) {
    return;
  }
  if (event.target.classList.contains("flipped")) {
    return;
  }

  // Clicking a card should change the background color to be the color of the class it has.
  const clickedEl = event.target;
  const color = event.target.classList[0];
  clickedEl.style.backgroundColor = color;
  clickedEl.classList.add("flipped");

  score += 1;

  cardsInPlay.push(clickedEl);

  const card1 = cardsInPlay[0];
  const card2 = cardsInPlay[1];

  if (cardsInPlay.length === 2) {
    console.log(card1.className);
    if (card1.className === card2.className) {
      console.log("MATCH");
      cardsInPlay = [];
      cardsFlipped += 2;
    } else {
      console.log("try again");
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        cardsInPlay = [];
      }, 2000);
    }
  }
  if (cardsFlipped === COLORS.length) {
    console.log("game over");
  }

  localStorage.setItem("lowScore", score);
}

///////////// Further Study /////////////

startBtn.addEventListener("click", function () {
  const openingEl = document.querySelector("#opening");
  openingEl.style.display = "none";
  gameContainer.style.display = "block";
});

// when the DOM loads
createDivsForColors(shuffledColors);
