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

  title = "yoko";
  resetSubject: Subject<void> = new Subject<void>();
  showAllSubject: Subject<void> = new Subject<void>();
  flipSubject: Subject<number> = new Subject<number>();

  constructor() {}

  ngAfterViewInit() {
    const zoom = localStorage.getItem("zoom");

    if (zoom !== undefined) {
      this.scaleIndex = Number(zoom);
    }

    this.board.nativeElement.style.zoom = this.scalings[this.scaleIndex];
  }

  resetGame() {
    this.resetSubject.next();
  }

  showAllCards() {
    this.showAllSubject.next();
  }

  reload() {
    window.location.reload();
  }

  flipDeck(id: number) {
    this.flipSubject.next(id);
  }

  zoomOut() {
    if (this.scaleIndex === this.scalings.length - 1) return;
    this.scaleIndex++;
    // this.marginTop -= 80;
    this.setScale(this.scaleIndex, this.marginTop, this.marginTop);
  }

  zoomIn() {
    if (this.scaleIndex === 0) return;
    this.scaleIndex--;
    // this.marginTop += 80;
    this.setScale(this.scaleIndex, this.marginTop, this.marginTop);
  }

  zoomReset() {
    if (this.scaleIndex === 0) return;
    this.scaleIndex = 0;
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
