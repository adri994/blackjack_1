import Juego from "./juego";

// Variables
const typeCard = {
  types: ["C", "H", "D", "S"],
  specials: ["A", "J", "Q", "K"]
};

let newPlay;

// Referencia al DOM
const result = document.querySelectorAll("small");

const takeCard = document.getElementById("takeCard");
const stopGame = document.getElementById("stopGame");
const newGame2 = document.getElementById("newGame");

const cardsPlayer1 = document.getElementById("cards-one");
const cardsPlayer2 = document.getElementById("cards-two");

// Eventos

addEventListener("load", () => {
  newGame();
});

takeCard.addEventListener("click", () => {
  newPlay.takeCard();
  scoreResult(newPlay.getScorePlay(), newPlay.getTurnPlayer());
  cardImg(newPlay.getCard(), newPlay.getTurnPlayer());

  if (newPlay.getScorePlay() > 21 || newPlay.getScorePlay() === 21) {
    takeCard.disabled = true;
    stopGame.disabled = true;
    newPlay.setTurnPlayer(false);
    turnPC();
  }
});

stopGame.addEventListener("click", () => {
  takeCard.disabled = true;
  newPlay.setTurnPlayer(false);
  turnPC();
});

newGame2.addEventListener("click", () => {
  newGame();
});

// Funciones
const newGame = () => {
  newPlay = new Juego();
  newPlay.newDeck(typeCard);

  cardsPlayer1.innerHTML = "";
  cardsPlayer2.innerHTML = "";

  result[0].innerText = 0;
  result[1].innerText = 0;

  takeCard.disabled = false;
  stopGame.disabled = false;
};

const cardImg = (card, turn) => {
  const img = document.createElement("img");
  img.src = `/${card}.png`;
  img.className = "card";
  if (turn) cardsPlayer1.appendChild(img);
  else cardsPlayer2.appendChild(img);
};

const scoreResult = (value, turn) => {
  if (turn) result[0].innerText = value;
  else result[1].innerText = value;
};

const turnPC = () => {
  do {
    newPlay.takeCard();
    scoreResult(newPlay.getScorePlay(), newPlay.getTurnPlayer());
    cardImg(newPlay.getCard(), newPlay.getTurnPlayer());
  } while (newPlay.getScorePlay1() >= newPlay.getScorePlay2() && newPlay.getScorePlay1() <= 21);

  const message = newPlay.message();
  alert(message);
};
