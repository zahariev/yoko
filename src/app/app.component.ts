import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { BehaviorSubject, Subject } from "rxjs";
import texts from "../assets/trantslation.json";
import { GameService } from "./game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("board") board!: ElementRef;

  TEXT = texts;
  marginTop = 0;
  //   scalings = [1, 0.9, 0.8];
  //   scaleIndex = 0;
  //   minify: boolean = false;
  //   checkboxHide: boolean = true;
  //   checkedIcons: boolean = false;
  //   title = "yoko";
  //   resetBoardSubject: Subject<void> = new Subject<void>();
  //   showAllSubject: Subject<void> = new Subject<void>();
  //   positionResetSubject: Subject<void> = new Subject<void>();
  //   filterSelectedSubject: Subject<void> = new Subject<void>();
  //   minifySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //   flipSubject: Subject<number> = new Subject<number>();

  constructor(public gs: GameService) {}

  ngAfterViewInit() {
    // this.board.nativeElement.style.zoom = this.scalings[this.scaleIndex];
  }

  resetGame() {
    this.toggleZoom(false);
    this.gs.resetGame();
  }

  showAllCards() {
    this.gs.checkboxHide = false;
    this.gs.minify = true;
    this.gs.showAllCards();
  }

  positionReset() {
    this.gs.positionReset();
  }

  toggleZoom(minified?: boolean) {
    this.gs.checkboxHide = true;
    this.gs.minify = minified || !this.gs.minify;
    // this.minifySubject.next(this.minify);
  }
}
