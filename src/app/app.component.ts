import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("board") board!: ElementRef;

  marginTop = 0;
  scalings = [1, 0.9, 0.8];
  scaleIndex = 0;
  minify: boolean = false;
  title = "yoko";
  resetBoardSubject: Subject<void> = new Subject<void>();
  showAllSubject: Subject<void> = new Subject<void>();
  positionResetSubject: Subject<void> = new Subject<void>();
  //   flipSubject: Subject<number> = new Subject<number>();

  constructor() {}

  ngAfterViewInit() {
    const zoom = localStorage.getItem("zoom");

    if (zoom !== undefined) {
      this.scaleIndex = Number(zoom);
    }

    // this.board.nativeElement.style.zoom = this.scalings[this.scaleIndex];
  }

  resetGame() {
    this.resetBoardSubject.next();
  }

  showAllCards() {
    this.minify = true;
    // this.minify = !this.minify;
    this.showAllSubject.next();
  }

  reload() {
    this.positionResetSubject.next();
  }

  //   flipDeck(id: number) {
  //     this.flipSubject.next(id);
  //   }

  zoomOut() {
    this.minify = !this.minify;
  }

  zoomIn() {
    this.minify = !this.minify;
  }

  zoomReset() {
    if (this.scaleIndex === 1) return;
    this.scaleIndex = 1;
    this.marginTop = 0;
    this.setScale(this.scaleIndex, this.marginTop, this.marginTop);
  }

  setScale(scale: any, marginTop: number = 0, marginRight: number = 0) {
    this.board.nativeElement.style.marginTop = marginTop + "px";
    this.board.nativeElement.style.marginRight = -marginRight + "px";
    this.board.nativeElement.style.zoom = this.scalings[scale];
    this.board.nativeElement.style.transform =
      "scale(" + this.scalings[scale] + ")";
    localStorage.setItem("zoom", scale);
  }
}
