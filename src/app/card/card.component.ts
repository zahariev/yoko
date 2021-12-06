import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from "@angular/core";

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
  openCards: string[] = Array(56).fill("inactive");
  mousePosition = { x: 0, y: 0 };

  private componentDestroyed$: Subject<any> = new Subject<void>();

  constructor() {}

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
  }

  flipDeck(id: number) {
    if (this.deck[id]) this.deck[id] = 0;
    else this.deck[id] = 1;
    this.saveState();
  }

  flipCard(cardIdx: number) {
    const card = this.cards[cardIdx];
    if (card % 2 == 0) this.cards[cardIdx]--;
    else this.cards[cardIdx]++;
  }

  takeCard(deck: number = 0): void {
    if (this.cards.length > 14) return;
    let card;
    let rand;
    do {
      rand = this.randomIntFromInterval(0, 14);
      card = 30 * deck - 17 + rand * 2 + (this.deck[deck] ? 1 : 0);
    } while (this.cards.includes(card));

    this.cards.push(card);
    this.saveState();
  }

  dropCard(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  showAllCards() {
    // do {
    //   this.takeCard(1);
    // } while (this.cards.length < 14);
  }

  getDeckState(deckId: number) {
    if (this.deck[deckId]) return "_front";
    else return "_back";
  }

  dragMove($event: any) {
    const elStyle = $event.source.element.nativeElement.style;
    this.lastZindex += 10;
    // elStyle.position = "fixed";
    elStyle.zIndex = this.lastZindex;
  }

  deal($event: any) {
    this.takeCard();
  }

  getIconColor(card: number): string {
    if ([6, 19, 20, 24, 33, 34, 36, 41, 42, 44, 46, 50].includes(card))
      return "white";
    else if (card === 4) return "red";
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

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
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
