import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Component, HostListener, Input, OnInit } from "@angular/core";

import { Observable, Subject, takeUntil } from "rxjs";

const DragConfig = {
  dragStartThreshold: 0,
  pointerDirectionChangeThreshold: 5,
  zIndex: 10000,
};

const FullDeck = [
  [],
  [
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
  ],
  [
    43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
    62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
  ],
  [
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102,
  ],
  [
    103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,

    115, 116, 117, 118, 119,

    120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132,
  ],
];
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() clearEvent!: Observable<void>;
  @Input() showAllEvent!: Observable<void>;
  @Input() flipDeckEvent!: Observable<number>;
  lastZindex = 0;
  width!: number;
  height!: number;
  deckState: number[] = Array(5).fill(0);
  cards: number[] = [];
  deckCards: number[] = [];
  openCards: string[] = Array(56).fill("inactive");
  mousePosition = { x: 0, y: 0 };
  magnifiedCard = -1;

  private componentDestroyed$: Subject<any> = new Subject<void>();
  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.magnifiedCard = -1;
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

    this.flipDeckEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((ev) => this.flipDeck(ev));

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
    for (var i = 1; i < 5; i++) {
      if (this.checkEmptyDeck(i)) this.setDefaultBG(i);
      else this.getCard(i);
    }
  }

  flipDeck(id: number) {
    if (this.deckState[id]) {
      this.deckState[id] = 0;
      this.deckCards[id]--;
    } else {
      this.deckState[id] = 1;
      this.deckCards[id]++;
    }

    this.saveState();
  }

  flipCard(cardIdx: number) {
    const card = this.cards[cardIdx];
    if (card % 2 == 0) this.cards[cardIdx]--;
    else this.cards[cardIdx]++;
    this.saveState();
  }

  setDefaultBG(deck: number) {
    let state = deck;
    if (this.deckState[deck]) state++;
    this.deckCards[deck] = state;
  }

  takeCard(deck: number = 0) {
    this.cards.push(this.deckCards[deck]);
    // console.log(this.cards.sort());
    if (this.checkEmptyDeck(deck)) {
      this.setDefaultBG(deck);
      return;
    }
    this.getCard(deck);
    this.saveState();
  }

  getCard(deck: number = 0): void {
    if (this.checkEmptyDeck(deck)) return;
    //   this.deckCards[deck] = deck + (this.deck[deck] ? 1 : 0);
    // if (this.cards.length > 14) return;
    //   this.deckCards[deck] = deck + (this.deck[deck] ? 1 : 0);
    let card;
    let rand;
    let i = 0;
    do {
      i++;
      rand = this.randomIntFromInterval(1, 15);
      card = 12 + 30 * (deck - 1) + rand * 2 + (this.deckState[deck] ? 0 : -1);
      console.log(card);
    } while (this.cards.includes(card)); //(i < 30); //

    this.deckCards[deck] = card;
  }

  checkEmptyDeck(deck: number): boolean {
    return (
      FullDeck[deck].filter((val: any) => this.cards.includes(val)).length > 14
    );
  }

  entered(event: CdkDragEnter) {
    this.magnifiedCard = -1;

    moveItemInArray(this.cards, event.item.data, event.container.data);
    this.saveState();
  }

  //   dropCard(event: any) {
  //     moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  //     this.saveState();
  //   }

  showAllCards() {
    // do {
    //   this.takeCard(1);
    // } while (this.cards.length < 14);
  }

  magnify(card: number) {
    if (this.magnifiedCard === card) this.magnifiedCard = -1;
    else this.magnifiedCard = card;
  }

  getDeckState(deckId: number) {
    if (this.deckState[deckId]) return "_front";
    else return "_back";
  }

  deal($event: any) {
    this.takeCard();
  }

  getIconColor(card: number): string {
    if (
      [
        1, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32,
        33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 47, 49, 51, 53, 57, 59, 61,
        63, 65, 67, 69, 71, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121,
        123, 125, 127, 129, 131,
      ].includes(card)
    )
      return "white";
    else return "black";
  }
  resetDeck() {
    this.cards = [];
    this.deckState = [];

    this.saveState();
  }

  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkOpened(card: number): boolean {
    return this.openCards[card] === "active";
  }

  removeCard(item: number) {
    var index = this.cards.indexOf(item);
    if (index !== -1) {
      this.cards.splice(index, 1);

      this.saveState();
    }
  }

  dragMove(event: any, i: number) {
    const elStyle = event.source.element.nativeElement.style;
    this.lastZindex += 10;
    console.log(event);
    // console.log(event.currentIndex);

    // moveItemInArray(this.cards, i, this.cards.length - 1);
    // elStyle.position = "absolute";
    elStyle.zIndex = this.lastZindex;
  }

  dragEnd($event: any) {
    const elStyle = $event.source.element.nativeElement.style;

    elStyle.position = "fixed";
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.deckCards));
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
