import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Component, HostListener, Input, OnInit } from "@angular/core";

import { empty, Observable, Subject, takeUntil } from "rxjs";
import { Card, Deck } from "../shared/models";

const Decks: Deck[] = [
  {
    id: 1,
    title: "",
    color: "red",
    backSide: false,
    empty: false,
  },
  {
    id: 2,
    title: "",
    color: "blue",
    backSide: false,
    empty: false,
  },
  {
    id: 3,
    title: "",
    color: "yellow",
    backSide: false,
    empty: false,
  },
  {
    id: 4,
    title: "",
    color: "green",
    backSide: false,
    empty: false,
  },
];

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() clearEvent!: Observable<void>;
  @Input() showAllEvent!: Observable<void>;
  //   @Input() flipDeckEvent!: Observable<number>;
  lastZindex = 0;
  width!: number;
  height!: number;
  deckState: string[] = Array(5).fill("");
  cards: Card[] = [];
  decks = Decks;
  openCards: string[] = Array(60).fill("inactive");
  mousePosition = { x: 0, y: 0 };
  magnifiedCard = Array(60).fill(false);
  dragged = Array(60).fill({});

  private componentDestroyed$: Subject<any> = new Subject<void>();
  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    // this.magnifiedCard = -1;
  }
  constructor() {
    const openCards = localStorage.getItem("openCards");
    if (openCards) this.cards = JSON.parse(openCards);

    const draggedCard = localStorage.getItem("draggedCard");
    if (draggedCard) this.dragged = JSON.parse(draggedCard);

    const decks = localStorage.getItem("deckCards");
    if (decks) this.decks = JSON.parse(decks);
  }

  ngOnInit() {
    this.clearEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.resetDeck());

    // this.showAllEvent
    //   .pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe(() => this.showAllCards());

    // this.flipDeckEvent
    //   .pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe((ev) => this.flipDeck(ev));
  }

  getDeckBG(deck: Deck) {
    // if (deck.empty) return "";
    // else
    return (
      "url(./assets/cards/deck_" +
      deck.id +
      (deck.backSide ? "b" : "") +
      ".jpg)"
    );
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

  // setDefaultBG(deckId: number) {

  //   this.decks[deckId]. = state;
  // }

  takeCard(deck: Deck) {
    this.getCard(deck);
    this.saveState();
    if (this.isEmptyDeck(deck.id)) {
      deck.empty = true;
      return;
    }
  }

  getCard(deck: Deck): void {
    if (this.isEmptyDeck(deck.id)) return;

    let newCardId;
    let rand;
    let i = 0;

    do {
      i++;
      newCardId = this.randomIntFromInterval(0, 14);
    } while (
      this.cards
        .filter((card) => card.deckId === deck.id)
        .map((card) => card.id)
        .includes(newCardId)
    );

    this.cards.push(new Card(newCardId, deck.backSide ? "b" : "", deck.id));
  }

  isEmptyDeck(deckId: number): boolean {
    console.log(this.cards.filter((card) => card.deckId === deckId).length);

    return this.cards.filter((card) => card.deckId === deckId).length > 14;
  }

  showAllCards() {
    // do {
    //   this.takeCard(1);
    // } while (this.cards.length < 14);
  }

  getDeckState(deckId: number) {
    if (this.deckState[deckId]) return "_front";
    else return "_back";
  }

  getIconColor(cardId: any): string {
    if (
      [
        1, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32,
        33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 47, 49, 51, 53, 57, 59, 61,
        63, 65, 67, 69, 71, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121,
        123, 125, 127, 129, 131,
      ].includes(cardId)
    )
      return "white";
    else return "black";
  }

  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkOpened(card: number): boolean {
    return this.openCards[card] === "active";
  }

  removeCard(card: Card) {
    const cardIndex = this.cards.findIndex((c) => c.id === card.id);
    const deckId = card.id;
    if (cardIndex != -1) {
      //   card.magnified = false;
      this.cards.splice(cardIndex, 1);

      if (!this.isEmptyDeck(deckId)) this.decks[card.deckId - 1].empty = false;
      else this.decks[card.deckId - 1].empty = true;
      this.saveState();
    }
  }

  magnify(event: any, card: Card) {
    console.log(event);

    const elStyle = event.target.nativeElement.style;
    this.lastZindex += 10;
    elStyle.zIndex = this.lastZindex;
    card.magnified = !card.magnified;
  }

  dragMove(event: any, card: Card) {
    const elStyle = event.source.element.nativeElement.style;
    console.log(event);
    console.log(elStyle);

    this.lastZindex += 10;
    // console.log(event);

    // moveItemInArray(this.cards, i, this.cards.length - 1);
    // elStyle.position = "relative";
    elStyle.zIndex = this.lastZindex;
  }

  dragEnd($event: any, card: Card) {
    const elStyle = $event.source.element.nativeElement.style;
    console.log(elStyle.position);
    console.log($event.dropPoint);
    console.log($event.source.getFreeDragPosition());
    // if (elStyle.position === "relative") elStyle.position = "fixed";
    // else
    this.dragged[card.id] = $event.dropPoint;
    if (!elStyle.position) elStyle.position = "fixed";
    console.log(elStyle.position);
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.decks));
    localStorage.setItem("draggedCard", JSON.stringify(this.dragged));
  }

  resetDeck() {
    this.cards = [];
    this.decks = Decks;
    this.dragged = [];

    this.saveState();
  }

  mouseDown($event: any) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(0);
    this.componentDestroyed$.complete();
  }
}
