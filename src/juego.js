import _, { map } from "underscore";

export default class Juego {
  constructor() {
    this.deck = [];
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;
    this.scoreLimit = 21;
    this.card = "";
    this.turnPlayer = true;
    this.numberCard = 0;
  }

  getCard() {
    return this.card;
  }

  getScorePlay() {
    return (this.turnPlayer) ? this.scorePlayer1 : this.scorePlayer2;
  }

  getScorePlay1() {
    return this.scorePlayer1;
  }

  getScorePlay2() {
    return this.scorePlayer2;
  }

  getTurnPlayer() {
    return this.turnPlayer;
  }

  setTurnPlayer(isTurn) {
    this.turnPlayer = isTurn;
  }

  setScorePlay(scorecard) {
    if (this.turnPlayer) this.scorePlayer1 += scorecard;
    else this.scorePlayer2 += scorecard;
  }

  newDeck({ types, specials }) {
    types.forEach(type => {
      for (let i = 2; i < 11; i++) {
        this.deck.push(`${i}${type}`);
      }
      specials.forEach(special => {
        this.deck.push(`${special}${type}`);
      });
    });
    this.shuffleDeck();
  }

  shuffleDeck() {
    this.deck = _.shuffle(this.deck);
  }

  takeCard() {
    this.card = this.deck.pop();
    this.valueCard();
  }

  valueCard() {
    const card = this.card.substring(0, this.card.length - 1);
    (isNaN(card))
      ? (card === "A") ? this.numberCard = 11 : this.numberCard = 10
      : this.numberCard = card * 1;

    this.setScorePlay(this.numberCard);
  }

  message() {
    if (this.scorePlayer1 > 21) return "Perdiste vuelve a intentarlo";
    if (this.scorePlayer1 === 21) return "Ganaste, Felicidades";
    else if (this.scorePlayer1 > this.scorePlayer2) return "Ganaste, Felicidades";
    else if (this.scorePlayer2 > 21) return "Ganaste, Felicidades";
    else return "Perdiste vuelve a intentarlo!";
  }
}
