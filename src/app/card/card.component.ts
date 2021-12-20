import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";

import { Observable, Subject, takeUntil } from "rxjs";
import { Card, Deck } from "../shared/models";
import texts from "../../assets/trantslation.json";
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

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() clearEvent!: Observable<void>;
  @Input() positionResetEvent!: Observable<void>;
  @Input() showAllEvent!: Observable<void>;
  @Input() checkboxHide!: boolean;
  @Output() zoomResetEvent = new EventEmitter();

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
  dragged = Array(60).fill({});
  showAllState: boolean = false;
  checkedIcons: boolean = false;

  private componentDestroyed$: Subject<any> = new Subject<void>();
  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {}
  constructor() {
    const openCards = localStorage.getItem("openCards");
    if (openCards) this.cards = JSON.parse(openCards);

    const decks = localStorage.getItem("deckCards");
    if (decks && decks.length > 2) this.decks = JSON.parse(decks);
    this.saveState();
  }

  ngOnInit() {
    this.clearEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.resetDeck());

    this.positionResetEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.positionReset());

    this.showAllEvent
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.showAllCards());

    this.checkAllEmptyDecks();
  }

  ngOnChanges(changes: any) {
    if (changes.checkboxHide != undefined) {
      if (changes.checkboxHide.currentValue) this.showAllState = false;
      else this.showAllState = true;
    }
  }

  getDeckBG(deck: Deck) {
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

  positionReset() {
    this.cards.map((card) => {
      card.position = undefined;
      card.magnified = false;
    });
    this.saveState();
  }
  takeCard(deck: Deck): boolean {
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
  }

  isEmptyDeck(deckId: number): boolean {
    return this.cards.filter((card) => card.deckId === deckId).length > 14;
  }

  allCardsDragged() {
    const dragged = this.cards.filter((card) => card.position !== undefined);
    return dragged.length === this.cards.length;
  }

  showAllCards() {
    this.positionReset();

    this.decks.forEach((deck: Deck) => {
      do {} while (this.takeCard(deck));
    });

    this.hasCheckedIcons();
    this.showAllState = true;
  }

  getDeckState(deckId: number) {
    if (this.deckState[deckId]) return "_front";
    else return "_back";
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

  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkOpened(card: number): boolean {
    return this.openCards[card] === "active";
  }

  leaveSelected() {
    this.showAllState = false;
    this.cards = this.cards.filter((card) => {
      if (card.checked) {
        card.checked = false;
        return true;
      } else return false;
    });
    this.zoomResetEvent.emit();
    this.checkAllEmptyDecks();
    this.hasCheckedIcons();
    this.saveState();
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
  }

  checkAllEmptyDecks() {
    this.decks.forEach((d) => {
      if (!this.isEmptyDeck(d.id)) d.empty = false;
      else d.empty = true;
    });
    this.saveState();
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
    elStyle.zIndex = this.lastZindex;
  }

  dragEnd($event: any, card: Card) {
    const elStyle = $event.source.element.nativeElement.style;

    const smallCard = $event.source.element.nativeElement.clientHeight < 200;
    const el = $event.source.getRootElement().getBoundingClientRect();
    card.position = $event.source.getFreeDragPosition();

    if (!elStyle.position) {
      const firstDrag = this.getPosition($event.source.getRootElement());
      card.position = {
        x:
          el.left -
          (smallCard ? 80 : 50) -
          (window.innerWidth < 415 ? -80 : -20) -
          //   firstDrag.left -
          window.innerWidth / 2.5,
        //   150 +
        //   (card?.position?.x || 0),
        y:
          el.top -
          (window.innerWidth < 415 ? 180 : 0) -
          //   firstDrag.top -
          //   (smallCard ? -80 : 55) -
          window.innerHeight / 3 +
          (smallCard ? 80 : 0),
        //   el.height / 2,
        //   (card?.position?.y || 0),
      };
      //   elStyle.position = "absolute";
    }
    this.saveState();
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  checkToggleCard(card: Card, checked: boolean): void {
    card.checked = checked;
    this.hasCheckedIcons();
  }

  hasCheckedIcons() {
    if (this.cards.filter((card) => card.checked).length)
      this.checkedIcons = true;
    else this.checkedIcons = false;
  }

  saveState() {
    localStorage.setItem("openCards", JSON.stringify(this.cards));
    localStorage.setItem("deckCards", JSON.stringify(this.decks));
  }

  resetDeck() {
    this.cards = [];
    this.decks = [];

    this.saveState();
    this.decks = Decks;
    this.checkAllEmptyDecks();
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
function ObservableInput() {
  throw new Error("Function not implemented.");
}
