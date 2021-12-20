import { Component, HostListener, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { Card, Deck } from "../shared/models";
import { GameService } from "../game.service";
import texts from "../../assets/trantslation.json";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  private componentDestroyed$: Subject<any> = new Subject<void>();

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {}

  TEXT = texts;
  mousePosition = { x: 0, y: 0 };
  lastZindex = 0;
  dragEvent = false;

  constructor(public gs: GameService) {}

  ngOnInit() {
    this.gs.checkAllEmptyDecks();
    this.gs.checkOnlyOneDeckOpen();
  }

  dragMove(event: any, card: Card) {
    const elStyle = event.source.element.nativeElement.style;
    this.dragEvent = true;
    this.lastZindex += 10;
    elStyle.zIndex = this.lastZindex;
  }

  showAllCards(deck: Deck) {
    this.gs.showAllCards(deck);
  }

  dragEnd($event: any, card: Card) {
    this.dragEvent = false;

    const elStyle = $event.source.element.nativeElement.style;

    const smallCard = $event.source.element.nativeElement.clientHeight < 200;
    const el = $event.source.getRootElement().getBoundingClientRect();
    card.position = $event.source.getFreeDragPosition();

    if (!elStyle.position) {
      //   const firstDrag = this.getPosition($event.source.getRootElement());
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
    this.gs.dropCard.emit();
    this.gs.saveState();
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

  mouseDown($event: MouseEvent) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(0);
    this.componentDestroyed$.complete();
  }
}
