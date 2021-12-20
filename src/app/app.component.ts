import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { BehaviorSubject, Subject } from "rxjs";
import texts from "../assets/trantslation.json";
import { GameService } from "./game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("board") board!: ElementRef;

  TEXT = texts;
  marginTop = 0;

  constructor(public gs: GameService) {}

  resetGame() {
    this.toggleZoom(false);
    this.gs.resetGame();
  }

  showAllCards() {
    if (this.gs.checkedIcons) return;
    this.gs.checkboxHide = false;
    this.gs.minify = true;
    this.gs.showAllCards();
  }

  positionReset() {
    this.gs.positionReset();
  }

  filterSelected() {
    this.toggleZoom(false);
    this.gs.filterSelected();
  }

  toggleZoom(minified?: boolean) {
    this.gs.checkboxHide = true;
    this.gs.minify = minified !== undefined ? minified : !this.gs.minify;
    // this.minifySubject.next(this.minify);
  }
}
