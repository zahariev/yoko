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
  deck: number[] = Array(5).fill(0);
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

    const deck = localStorage.getItem("deck");
    if (deck) this.deck = JSON.parse(deck);

    this.saveState();

    // const deckCards = localStorage.getItem("deckCards");
    // if (deckCards) this.deckCards = JSON.parse(deckCards);
    // else
  }

  initDeck() {
    this.getCard(1);
    this.getCard(2);
    this.getCard(3);
    this.getCard(4);
  }

  flipDeck(id: number) {
    if (this.deck[id]) {
      this.deck[id] = 0;
      this.deckCards[id]--;
    } else {
      this.deck[id] = 1;
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

  takeCard(deck: number = 0) {
    this.cards.push(this.deckCards[deck]);

    this.getCard(deck);
    this.saveState();
  }

  getCard(deck: number = 0): void {
    if (this.cards.length > 14) return;
    let card;
    let rand;
    do {
      rand = this.randomIntFromInterval(0, 14);
      card = 30 * deck - 17 + rand * 2 + (this.deck[deck] ? 1 : 0);
    } while (this.cards.includes(card));

    this.deckCards[deck] = card;
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
    if (this.deck[deckId]) return "_front";
    else return "_back";
  }

  deal($event: any) {
    this.takeCard();
  }

  getIconColor(card: number): string {
    if (
      [
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 32,
        33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 47, 49, 51, 53, 57, 59, 61,
        63, 65, 67, 69, 71, 97, 103, 105, 107, 109, 111, 113, 115, 117, 119,
        121, 123, 125, 127, 129, 131,
      ].includes(card)
    )
      return "white";
    else return "black";
  }
  resetDeck() {
    this.cards = [];
    this.deck = [];

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

  dragMove($event: any) {
    const elStyle = $event.source.element.nativeElement.style;
    this.lastZindex += 10;
    // elStyle.position = "fixed";
    elStyle.zIndex = this.lastZindex;
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.deckCards));
    localStorage.setItem("deck", JSON.stringify(this.deck));
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
