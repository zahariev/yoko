import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Component, HostListener, Input, OnInit } from "@angular/core";

import { Observable, Subject, takeUntil } from "rxjs";
import { Card, Deck } from "../shared/models";

const Decks: Deck[] = [
  {
    id: 1,
    title: "",
    color: "red",
    backSide: false,
    empty: false,
    accentIcons: ["f", "b", 0, 1, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14],
    accentColor: "white",
    iconColor: "black",
  },
  {
    id: 2,
    title: "",
    color: "blue",
    backSide: false,
    empty: false,
    accentIcons: [],
    accentColor: "white",
    iconColor: "black",
  },
  {
    id: 3,
    title: "",
    color: "yellow",
    backSide: false,
    empty: false,
    accentIcons: [],
    accentColor: "white",
    iconColor: "black",
  },
  {
    id: 4,
    title: "",
    color: "green",
    backSide: false,
    empty: false,
    accentIcons: [],
    accentColor: "white",
    iconColor: "black",
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

    if (decks && decks.length > 2) this.decks = JSON.parse(decks);
  }

  ngOnInit() {
    this.clearEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.resetDeck());

    // this.showAllEvent
    //   .pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe(() => this.showAllCards());
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

  getIconColor(card: any): string {
    console.log(card);

    const deck = this.decks.filter((d) => d.id === card.deckId)[0];
    console.log(deck);

    if (deck.accentIcons?.includes(card.id)) return deck.accentColor;
    else return deck.iconColor;
  }

  getDeckColor(deck: Deck): string {
    console.log(deck.accentIcons.includes("f"));

    if (
      (deck.backSide && deck.accentIcons.includes("b")) ||
      deck.accentIcons.includes("f")
    )
      return deck.accentColor;
    else return deck.iconColor;
  }

  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkOpened(card: number): boolean {
    return this.openCards[card] === "active";
  }

  removeCard(card: Card) {
    const cardIdx = this.cards.findIndex((c) => c.id === card.id);
    const deckIdx = this.decks.findIndex((c) => c.id === card.deckId);

    if (cardIdx != -1) {
      //   card.magnified = false;
      this.cards.splice(cardIdx, 1);

      if (!this.isEmptyDeck(card.deckId)) this.decks[deckIdx].empty = false;
      else this.decks[deckIdx].empty = true;
      this.saveState();
    }
  }

  magnify(event: any, card: Card) {
    card.magnified = !card.magnified;
    const elStyle = event.path[2].style;
    this.lastZindex += 10;
    elStyle.zIndex = this.lastZindex;
    this.saveState();
  }

  dragMove(event: any, card: Card) {
    const elStyle = event.source.element.nativeElement.style;

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

    card.position = $event.source.getFreeDragPosition();
    elStyle.position = "fixed";
    this.saveState();

    console.log(elStyle.position);
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.decks));
    localStorage.setItem("draggedCard", JSON.stringify(this.dragged));
  }

  resetDeck() {
    this.cards = [];
    this.decks = [];
    this.dragged = [];

    this.saveState();
    this.decks = Decks;
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
