"use strict";
(self["webpackChunkyoko"] = self["webpackChunkyoko"] || []).push([["main"],{

/***/ 2050:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card/card.component */ 648);






const _c0 = ["board"];
class AppComponent {
    constructor() {
        this.marginTop = 0;
        this.scalings = [1, 0.9, 0.8];
        this.scaleIndex = 0;
        this.title = "yoko";
        this.resetSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.showAllSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.flipSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    }
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
    flipDeck(id) {
        this.flipSubject.next(id);
    }
    zoomOut() {
        if (this.scaleIndex === this.scalings.length - 1)
            return;
        this.scaleIndex++;
        // this.marginTop -= 80;
        this.setScale(this.scaleIndex, this.marginTop, this.marginTop);
    }
    zoomIn() {
        if (this.scaleIndex === 0)
            return;
        this.scaleIndex--;
        // this.marginTop += 80;
        this.setScale(this.scaleIndex, this.marginTop, this.marginTop);
    }
    zoomReset() {
        if (this.scaleIndex === 0)
            return;
        this.scaleIndex = 0;
        this.marginTop = 0;
        this.setScale(this.scaleIndex, this.marginTop, this.marginTop);
    }
    setScale(scale, marginTop = 0, marginRight = 0) {
        this.board.nativeElement.style.marginTop = marginTop + "px";
        this.board.nativeElement.style.marginRight = -marginRight + "px";
        this.board.nativeElement.style.zoom = this.scalings[scale];
        this.board.nativeElement.style.transform =
            "scale(" + this.scalings[scale] + ")";
        localStorage.setItem("zoom", scale);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.board = _t.first);
    } }, decls: 25, vars: 6, consts: [["id", "content", "role", "main"], ["board", ""], ["id", "menu", "mat-icon-button", "", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "click"], [1, "resetIcon"], [3, "flipDeckEvent", "clearEvent", "showAllEvent"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-menu", null, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_7_listener() { return ctx.reload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "restart_alt");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Position reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_12_listener() { return ctx.showAllCards(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "apps");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Show all");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppComponent_Template_button_click_17_listener() { return ctx.resetGame(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Clear board");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "app-card", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("margin-top", ctx.marginTop);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("flipDeckEvent", ctx.flipSubject.asObservable())("clearEvent", ctx.resetSubject.asObservable())("showAllEvent", ctx.showAllSubject.asObservable());
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__.MatMenuTrigger, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_4__.MatMenuItem, _card_card_component__WEBPACK_IMPORTED_MODULE_0__.CardComponent], styles: ["[_nghost-%COMP%] {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 14px;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  position: relative;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  background-color: #7b9093;\n  color: white;\n  font-weight: 600;\n  padding-left: 40px;\n  z-index: 999999;\n}\n\n#content[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  padding: 0 16px;\n  flex-direction: column;\n  align-items: center;\n}\n\nmat-icon[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\nfooter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n#menu[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0px;\n  z-index: 99999;\n}\n\n\n\nfooter[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #1976d2;\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDBKQUFBO0VBRUEsZUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtFQUNBLG1DQUFBO0VBQ0Esa0NBQUE7QUFBRjs7QUFHQTs7Ozs7O0VBTUUsYUFBQTtBQUFGOztBQUdBO0VBQ0UsU0FBQTtBQUFGOztBQUdBO0VBQ0UsT0FBQTtBQUFGOztBQUdBO0VBRUUsa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUVBLGVBQUE7RUFFQSxzQkFBQTtFQUNBLG1CQUFBO0FBSEY7O0FBTUE7RUFDRSxlQUFBO0FBSEY7O0FBTUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFIRjs7QUFNQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7QUFIRjs7QUFNQSxzQkFBQTs7QUFFQTtFQUNFLFlBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7QUFKRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBIZWx2ZXRpY2EsXG4gICAgQXJpYWwsIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjMzMzO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2IHtcbiAgbWFyZ2luOiA4cHggMDtcbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLnNwYWNlciB7XG4gIGZsZXg6IDE7XG59XG5cbi50b29sYmFyIHtcbiAgLy8gICBwb3NpdGlvbjogZml4ZWQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiA2MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2I5MDkzO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmctbGVmdDogNDBweDtcbiAgei1pbmRleDogOTk5OTk5O1xufVxuXG4jY29udGVudCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgLy8gICBtYXJnaW46IDYycHggYXV0byAzMnB4O1xuICBwYWRkaW5nOiAwIDE2cHg7XG4gIC8vICAgbWF4LXdpZHRoOiA5NjBweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxubWF0LWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmZvb3RlciBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI21lbnUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDBweDtcbiAgei1pbmRleDogOTk5OTk7XG59XG5cbi8qIFJlc3BvbnNpdmUgU3R5bGVzICovXG5cbmZvb3RlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE5NzZkMjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwJTtcbiAgYm90dG9tOiAwO1xufVxuIl19 */"] });


/***/ }),

/***/ 4750:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 4744);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ 2650);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 2050);
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card/card.component */ 648);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);










class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.BrowserAnimationsModule,
            _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.DragDropModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _card_card_component__WEBPACK_IMPORTED_MODULE_1__.CardComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__.BrowserAnimationsModule,
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_5__.DragDropModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_8__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__.MatMenuModule] }); })();


/***/ }),

/***/ 648:
/*!****************************************!*\
  !*** ./src/app/card/card.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardComponent": () => (/* binding */ CardComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 4744);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6567);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8267);







function CardComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("cdkDragStarted", function CardComponent_div_21_Template_div_cdkDragStarted_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.dragMove($event); })("cdkDropListDropped", function CardComponent_div_21_Template_div_cdkDropListDropped_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.dropCard($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function CardComponent_div_21_Template_div_mousedown_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.mouseDown($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_div_21_Template_mat_icon_click_2_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const i_r2 = restoredCtx.index; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r7.flipCard(i_r2); return $event.stopPropagation(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "360");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_div_21_Template_mat_icon_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const card_r1 = restoredCtx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.removeCard(card_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const card_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background-image", "url(./assets/cards/YOKO-BG_" + card_r1 + ".jpg)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("color", ctx_r0.getIconColor(card_r1));
} }
const DragConfig = {
    dragStartThreshold: 0,
    pointerDirectionChangeThreshold: 5,
    zIndex: 10000,
};
class CardComponent {
    constructor() {
        this.lastZindex = 0;
        this.deck = Array(5).fill(0);
        this.cards = [];
        this.openCards = Array(56).fill("inactive");
        this.mousePosition = { x: 0, y: 0 };
        this.componentDestroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    }
    ngOnInit() {
        this.clearEvent
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.componentDestroyed$))
            .subscribe(() => this.resetDeck());
        this.showAllEvent
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.componentDestroyed$))
            .subscribe(() => this.showAllCards());
        this.flipDeckEvent
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.componentDestroyed$))
            .subscribe((ev) => this.flipDeck(ev));
        const openCards = localStorage.getItem("openCards");
        if (openCards)
            this.cards = JSON.parse(openCards);
        const deck = localStorage.getItem("deck");
        if (deck)
            this.deck = JSON.parse(deck);
    }
    flipDeck(id) {
        if (this.deck[id])
            this.deck[id] = 0;
        else
            this.deck[id] = 1;
        this.saveState();
    }
    flipCard(cardIdx) {
        const card = this.cards[cardIdx];
        if (card % 2 == 0)
            this.cards[cardIdx]--;
        else
            this.cards[cardIdx]++;
    }
    takeCard(deck = 0) {
        if (this.cards.length > 14)
            return;
        let card;
        let rand;
        do {
            rand = this.randomIntFromInterval(0, 14);
            card = 30 * deck - 17 + rand * 2 + (this.deck[deck] ? 1 : 0);
        } while (this.cards.includes(card));
        this.cards.push(card);
        this.saveState();
    }
    dropCard(event) {
        (0,_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.moveItemInArray)(this.cards, event.previousIndex, event.currentIndex);
    }
    showAllCards() {
        // do {
        //   this.takeCard(1);
        // } while (this.cards.length < 14);
    }
    getDeckState(deckId) {
        if (this.deck[deckId])
            return "_front";
        else
            return "_back";
    }
    dragMove($event) {
        const elStyle = $event.source.element.nativeElement.style;
        this.lastZindex += 10;
        // elStyle.position = "fixed";
        elStyle.zIndex = this.lastZindex;
    }
    deal($event) {
        this.takeCard();
    }
    getIconColor(card) {
        if ([6, 19, 20, 24, 33, 34, 36, 41, 42, 44, 46, 50].includes(card))
            return "white";
        else if (card === 4)
            return "red";
        else
            return "black";
    }
    resetDeck() {
        this.cards = [];
        this.deck = [];
        this.saveState();
    }
    randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    checkOpened(card) {
        return this.openCards[card] === "active";
    }
    removeCard(item) {
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
    mouseDown($event) {
        this.mousePosition.x = $event.screenX;
        this.mousePosition.y = $event.screenY;
    }
    ngOnDestroy() {
        this.componentDestroyed$.next(0);
        this.componentDestroyed$.complete();
    }
}
CardComponent.ɵfac = function CardComponent_Factory(t) { return new (t || CardComponent)(); };
CardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CardComponent, selectors: [["app-card"]], inputs: { clearEvent: "clearEvent", showAllEvent: "showAllEvent", flipDeckEvent: "flipDeckEvent" }, decls: 22, vars: 9, consts: [[1, "card-container", "tp-wrapper"], [1, "deck", 3, "click"], ["mat-icon-button", "", 1, "flip"], [3, "click"], [1, "clear"], ["class", "tp-box", "cdkDrag", "", "cdkDropList", "", "cdkDropListOrientation", "horizontal", "cdkDragBoundary", "body", 3, "cdkDragStarted", "cdkDropListDropped", 4, "ngFor", "ngForOf"], ["cdkDrag", "", "cdkDropList", "", "cdkDropListOrientation", "horizontal", "cdkDragBoundary", "body", 1, "tp-box", 3, "cdkDragStarted", "cdkDropListDropped"], ["cdkDropList", "", 1, "card", 3, "mousedown"], [1, "flip", "left", 3, "click"], [1, "delete", 3, "click"]], template: function CardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_div_click_1_listener() { return ctx.takeCard(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_mat_icon_click_3_listener($event) { ctx.flipDeck(1); return $event.stopPropagation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "360");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_div_click_6_listener() { return ctx.takeCard(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_mat_icon_click_8_listener($event) { ctx.flipDeck(2); return $event.stopPropagation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "360");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_div_click_10_listener() { return ctx.takeCard(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_mat_icon_click_12_listener($event) { ctx.flipDeck(3); return $event.stopPropagation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "360");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_div_click_15_listener() { return ctx.takeCard(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CardComponent_Template_mat_icon_click_17_listener($event) { ctx.flipDeck(4); return $event.stopPropagation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "360");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, CardComponent_div_21_Template, 6, 4, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url(./assets/red" + ctx.getDeckState(1) + ".jpg)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url(./assets/blue" + ctx.getDeckState(2) + ".jpg)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url(./assets/yellow" + ctx.getDeckState(3) + ".jpg)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("background", "url(./assets/green" + ctx.getDeckState(4) + ".jpg)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.cards);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.CdkDrag, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_3__.CdkDropList], styles: [".tp-box[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 258px;\n  margin: 10px;\n}\n\n.card[_ngcontent-%COMP%] {\n  background-size: contain !important;\n  height: 255px;\n  width: 185px;\n  background-color: #465658;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  border-radius: 12px;\n  color: #fff;\n  text-align: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  z-index: 1;\n}\n\n.card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0;\n}\n\n.clear[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  margin: 0;\n  padding: 0;\n}\n\n.deck[_ngcontent-%COMP%] {\n  all: unset;\n  border-radius: 12px;\n  position: relative;\n  background-size: contain !important;\n  background-repeat: no-repeat;\n  height: 217px;\n  width: 148px;\n  margin: 10px 8px 16px;\n  padding: 16px;\n  display: flex;\n  cursor: pointer;\n  z-index: 999;\n}\n\n.delete[_ngcontent-%COMP%] {\n  color: black;\n  display: none;\n  position: absolute;\n  top: 0px;\n  right: 5px;\n  cursor: pointer;\n}\n\n.flip[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 999999;\n  top: 0px;\n}\n\n.left[_ngcontent-%COMP%] {\n  color: black;\n  display: none;\n  position: absolute;\n  top: 0px;\n  left: 5px;\n  cursor: pointer;\n}\n\n.card[_ngcontent-%COMP%]:hover   .delete[_ngcontent-%COMP%], .card[_ngcontent-%COMP%]:hover   .flip[_ngcontent-%COMP%] {\n  display: block;\n}\n\n@media screen and (max-width: 700px), screen and (max-height: 500px) {\n  .deck[_ngcontent-%COMP%] {\n    left: 8%;\n    height: 115px;\n    width: 72px;\n  }\n\n  .tp-box[_ngcontent-%COMP%] {\n    height: 148px;\n    width: 103px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    height: 145px;\n    width: 100px;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    top: -10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDRjs7QUFZQTtFQUNFLG1DQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLDBDQUFBO0VBRUEsbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFFQSxlQUFBO0VBQ0EseUJBQUE7RUFHQSxpQkFBQTtFQUNBLFVBQUE7QUFYRjs7QUFjQTtFQUdFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7QUFiRjs7QUFnQkE7RUFDRSxlQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQWJGOztBQWdCQTtFQUNFLFVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBR0EsbUNBQUE7RUFDQSw0QkFBQTtFQUVBLGFBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBaEJGOztBQW1CQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7QUFoQkY7O0FBbUJBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtBQWhCRjs7QUFtQkE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBaEJGOztBQW1CQTs7RUFFRSxjQUFBO0FBaEJGOztBQW1CQTtFQUNFO0lBR0UsUUFBQTtJQUNBLGFBQUE7SUFDQSxXQUFBO0VBbEJGOztFQXFCQTtJQUNFLGFBQUE7SUFDQSxZQUFBO0VBbEJGOztFQXFCQTtJQUNFLGFBQUE7SUFDQSxZQUFBO0VBbEJGOztFQXFCQTtJQUNFLFVBQUE7RUFsQkY7QUFDRiIsImZpbGUiOiJjYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRwLWJveCB7XG4gIHdpZHRoOiAxODBweDtcbiAgaGVpZ2h0OiAyNThweDtcbiAgbWFyZ2luOiAxMHB4O1xuICAvLyAgIHBvc2l0aW9uOiBzdGF0aWM7XG59XG5cbi8vIC5maXJzdENhcmQge1xuLy8gICBoZWlnaHQ6IDI1NXB4O1xuLy8gICB3aWR0aDogMTc2cHg7XG4vLyAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbi8vICAgcG9zaXRpb246IGFic29sdXRlO1xuXG4vLyAgIHotaW5kZXg6IDA7XG4vLyB9XG5cbi5jYXJkIHtcbiAgYmFja2dyb3VuZC1zaXplOiBjb250YWluICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMjU1cHg7XG4gIHdpZHRoOiAxODVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ2NTY1ODtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAvLyAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG5cbi5jYXJkLWNvbnRhaW5lciB7XG4gIC8vICAgdG9wOiAwcHg7XG4gIC8vICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KDpsYXN0LWNoaWxkKSB7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cblxuLmNsZWFyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uZGVjayB7XG4gIGFsbDogdW5zZXQ7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY1NjU4O1xuICAvLyAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbiAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXG4gIGhlaWdodDogMjE3cHg7XG4gIHdpZHRoOiAxNDhweDtcbiAgbWFyZ2luOiAxMHB4IDhweCAxNnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHotaW5kZXg6IDk5OTtcbn1cblxuLmRlbGV0ZSB7XG4gIGNvbG9yOiBibGFjaztcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDBweDtcbiAgcmlnaHQ6IDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZmxpcCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogOTk5OTk5O1xuICB0b3A6IDBweDtcbn1cblxuLmxlZnQge1xuICBjb2xvcjogYmxhY2s7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwcHg7XG4gIGxlZnQ6IDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2FyZDpob3ZlciAuZGVsZXRlLFxuLmNhcmQ6aG92ZXIgLmZsaXAge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzAwcHgpLCBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA1MDBweCkge1xuICAuZGVjayB7XG4gICAgLy8gbGVmdDogMzdweDtcblxuICAgIGxlZnQ6IDglO1xuICAgIGhlaWdodDogMTE1cHg7XG4gICAgd2lkdGg6IDcycHg7XG4gIH1cblxuICAudHAtYm94IHtcbiAgICBoZWlnaHQ6IDE0OHB4O1xuICAgIHdpZHRoOiAxMDNweDtcbiAgfVxuXG4gIC5jYXJkIHtcbiAgICBoZWlnaHQ6IDE0NXB4O1xuICAgIHdpZHRoOiAxMDBweDtcbiAgfVxuXG4gIC5jYXJkLWNvbnRhaW5lciB7XG4gICAgdG9wOiAtMTBweDtcbiAgfVxufVxuIl19 */"] });


/***/ }),

/***/ 8260:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 271:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 4750);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 8260);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(1111), __webpack_exec__(271)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map