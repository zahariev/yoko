import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Component, HostListener, Input, OnInit } from "@angular/core";

import { Observable, Subject, takeUntil } from "rxjs";
import { Deck } from "../shared/models";

const Decks: Deck[] = [
  {
    id: 1,
    title: "",
    color: "red",
    backSide: false,
  },
  {
    id: 2,
    title: "",
    color: "blue",
    backSide: false,
  },
  {
    id: 3,
    title: "",
    color: "yellow",
    backSide: false,
  },
  {
    id: 4,
    title: "",
    color: "green",
    backSide: false,
  },
];

interface Card {
  id: number;
  side: string;
}

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
  draggedCard = Array(60).fill({});

  private componentDestroyed$: Subject<any> = new Subject<void>();
  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    // this.magnifiedCard = -1;
  }
  constructor() {
    this.initDeck();
  }

  ngOnInit() {
    this.clearEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.resetDeck());

    this.showAllEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.showAllCards());

    // this.flipDeckEvent
    //   .pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe((ev) => this.flipDeck(ev));

    const openCards = localStorage.getItem("openCards");
    if (openCards) this.cards = JSON.parse(openCards);

    const deckState = localStorage.getItem("deckState");
    if (deckState) this.deckState = JSON.parse(deckState);

    this.saveState();

    // const deckCards = localStorage.getItem("deckCards");
    // if (deckCards) this.deckCards = JSON.parse(deckCards);
    // else
  }

  initDeck() {
    // for (var i = 1; i < 5; i++) {
    //   if (this.checkEmptyDeck(i)) this.setDefaultBG(i);
    //   else this.getCard(i);
    // }
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

  //   setDefaultBG(deckId: number) {
  //     let state = deck;
  //     if (this.deckState[deckId]) state++;
  //     this.deckCards[deck] = state;
  //   }

  takeCard(deckId: number = 0) {
    // this.cards.push({ id: this.deckCards[deck], side: this.deckState[deck] });
    // // console.log(this.cards.sort());
    // if (this.checkEmptyDeck(deckId)) {
    //   this.setDefaultBG(deckId);
    //   return;
    // }
    this.getCard(deckId);
    this.saveState();
  }

  getCard(deckId: number = 0): void {
    if (this.checkEmptyDeck(deckId)) return;

    let newCardId;
    let rand;
    let i = 0;
    do {
      i++;
      rand = this.randomIntFromInterval(0, 14);
      newCardId = deckId * rand;
      console.log(newCardId);
    } while (this.cards.map((card) => card.id).includes(newCardId)); //(i < 30); //
  }

  checkEmptyDeck(deck: number): boolean {
    return (
      Array.from(Array(15))
        .map((e, i) => (deck - 1) * 15 + i + 1)
        .filter((val: any) => this.cards.includes(val)).length > 14
    );
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

  deal($event: any) {
    this.takeCard();
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
  resetDeck() {
    this.cards = [];
    this.deckState = [];
    this.openCards = [];
    this.saveState();
  }

  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkOpened(card: number): boolean {
    return this.openCards[card] === "active";
  }

  removeCard(item: Card) {
    var index = this.cards.indexOf(item);
    if (index !== -1) {
      this.magnifiedCard[item.id] = false;
      this.cards.splice(index, 1);

      this.saveState();
    }
  }

  magnify(card: number) {
    if (this.magnifiedCard[card]) this.magnifiedCard[card] = false;
    else this.magnifiedCard[card] = true;
  }

  dragMove(event: any, card: Card) {
    const elStyle = event.source.element.nativeElement.style;
    this.lastZindex += 10;
    console.log(event);

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
    this.draggedCard[card.id] = $event.dropPoint;
    if (!elStyle.position) elStyle.position = "fixed";
    console.log(elStyle.position);
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.decks));
    localStorage.setItem("draggedCard", JSON.stringify(this.draggedCard));
    localStorage.setItem("deck", JSON.stringify(this.deckState));
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
