import { Injectable } from "@angular/core";
import { Card, Deck } from "./shared/models";
import texts from "../assets/trantslation.json";
const Decks: Deck[] = [
  {
    id: 1,
    title: texts.deck1,
    color: "#d4412d",
    backSide: false,
    empty: false,
    accentIcons: [0, 1, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14],
    accentColor: "whitesmoke",
    iconColor: "black",
  },
  {
    id: 2,
    title: texts.deck2,
    color: "#0b4790",
    backSide: false,
    empty: false,
    accentIcons: [],
    accentColor: "whitesmoke",
    iconColor: "black",
  },
  {
    id: 3,
    title: texts.deck3,
    color: "#f9cb16",
    backSide: false,
    empty: false,
    accentIcons: [],
    accentColor: "whitesmoke",
    iconColor: "black",
  },
  {
    id: 4,
    title: texts.deck4,
    color: "#1d7543",
    backSide: false,
    empty: false,
    accentIcons: [],
    accentColor: "whitesmoke",
    iconColor: "black",
  },
];

@Injectable({
  providedIn: "root",
})
export class GameService {
  TEXT = texts;
  lastZindex = 0;
  width!: number;
  height!: number;
  deckState: string[] = Array(5).fill("");
  cards: Card[] = [];
  decks = Decks;
  openCards: string[] = Array(60).fill("inactive");
  mousePosition = { x: 0, y: 0 };
  magnifiedCard = Array(60).fill(false);
  minify: boolean = false;
  dragged = Array(60).fill({});
  showAllState: boolean = false;
  checkboxHide: boolean = true;
  checkedIcons: boolean = false;

  constructor() {
    const openCards = localStorage.getItem("openCards");
    if (openCards) this.cards = JSON.parse(openCards);

    const decks = localStorage.getItem("deckCards");
    if (decks && decks.length > 2) this.decks = JSON.parse(decks);
    this.saveState();
  }

  checkToggleCard(card: Card, checked: boolean): void {
    card.checked = checked;
    this.hasCheckedIcons();
  }

  hasCheckedIcons() {
    if (this.cards.filter((card) => card.checked).length) {
      this.checkedIcons = true;
    } else this.checkedIcons = false;
  }

  checkAllEmptyDecks() {
    this.decks.forEach((d) => {
      if (!this.isEmptyDeck(d.id)) d.empty = false;
      else d.empty = true;
    });
    this.saveState();
  }

  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkOpened(card: number): boolean {
    return this.openCards[card] === "active";
  }

  filterSelected() {
    this.showAllState = false;
    this.cards = this.cards.filter((card) => {
      if (card.checked) {
        card.checked = false;
        return true;
      } else return false;
    });

    this.checkAllEmptyDecks();
    this.hasCheckedIcons();
    this.saveState();
  }

  showAllCards(deck?: Deck) {
    if (deck && !this.deckCardsLeft(deck)) return;
    console.log(deck);

    this.positionReset();
    this.cards.forEach((card) => (card.checked = true));
    if (deck) {
      do {} while (this.takeCard(deck));
    } else
      this.decks.forEach((deck1: Deck) => {
        do {} while (this.takeCard(deck1));
      });

    this.hasCheckedIcons();
    this.showAllState = true;
  }

  deckCardsLeft(deck: Deck): boolean {
    const openedCards = this.cards.filter((c: Card) => c.deckId === deck.id);
    console.log(openedCards);
    const left = 15 - openedCards.length;
    if (left > 0) return true;
    else return false;
  }
  positionReset() {
    this.cards.map((card) => {
      card.position = undefined;
      card.magnified = false;
    });
    this.saveState();
  }

  flipDeck(deck: Deck) {
    deck.backSide = !deck.backSide;
    this.saveState();
  }

  flipCard(card: Card) {
    if (card.side) card.side = "";
    else card.side = "b";
    this.saveState();
  }

  takeCard(deck: Deck): boolean {
    if (this.checkedIcons) return false;
    this.getCard(deck);
    this.saveState();
    if (this.isEmptyDeck(deck.id)) {
      deck.empty = true;
      return false;
    } else return true;
  }

  getCard(deck: Deck): void {
    if (this.isEmptyDeck(deck.id)) return;
    let newCardId;
    do {
      newCardId = this.randomIntFromInterval(0, 14);
    } while (
      this.cards
        .filter((card) => card.deckId === deck.id)
        .map((card) => card.id)
        .includes(newCardId)
    );

    this.cards.push(new Card(newCardId, deck.backSide ? "b" : "", deck.id));
    this.checkOnlyOneDeckOpen();
  }

  checkOnlyOneDeckOpen() {
    if (this.onlyOneDeckOpen()) {
      this.showAllState = true;
    } else this.showAllState = false;
  }

  isEmptyDeck(deckId: number): boolean {
    return this.cards.filter((card) => card.deckId === deckId).length > 14;
  }

  allCardsDragged() {
    const dragged = this.cards.filter((card) => card.position !== undefined);
    return dragged.length === this.cards.length;
  }

  getDeckState(deckId: number) {
    if (this.deckState[deckId]) return "_front";
    else return "_back";
  }

  getDeckBG(deck: Deck) {
    return (
      "url(./assets/cards/deck_" +
      deck.id +
      (deck.backSide ? "b" : "") +
      ".jpg)"
    );
  }

  getIconColor(card: any): string {
    const deck = this.decks.filter((d) => d.id === card.deckId)[0];

    if (deck.accentIcons?.includes(card.id)) return deck.accentColor;
    else return deck.iconColor;
  }

  getDeckColor(deck: Deck): string {
    if (
      (deck.backSide && deck.accentIcons.includes("b")) ||
      deck.accentIcons.includes("f")
    )
      return deck.accentColor;
    else return deck.iconColor;
  }

  removeCard(card: Card) {
    const cardIdx = this.cards.findIndex(
      (c) => c.id === card.id && c.deckId === card.deckId
    );
    const deckIdx = this.decks.findIndex((c) => c.id === card.deckId);

    if (cardIdx != -1) {
      this.cards.splice(cardIdx, 1);

      if (!this.isEmptyDeck(card.deckId)) this.decks[deckIdx].empty = false;
      else this.decks[deckIdx].empty = true;
      this.saveState();
    }
    this.checkOnlyOneDeckOpen();
  }

  onlyOneDeckOpen(): boolean {
    if (this.cards.length !== 15) return false;
    const deck = this.cards
      .map((c) => c.deckId)
      .filter((v, i, a) => a.indexOf(v) === i);

    if (deck.length != 1) return false;
    else return true;
  }

  magnify(event: any, card: Card) {
    card.magnified = !card.magnified;
    const elStyle = event.path[2].style;
    this.lastZindex += 10;
    elStyle.zIndex = this.lastZindex;
    this.saveState();
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.decks));
  }

  resetGame() {
    this.cards = [];
    this.decks = [];
    this.checkedIcons = false;
    this.saveState();
    this.decks = Decks;
    this.checkAllEmptyDecks();
  }
}
