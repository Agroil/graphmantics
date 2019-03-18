(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./share/keylines/angular-keylines.ts":
/*!********************************************!*\
  !*** ./share/keylines/angular-keylines.ts ***!
  \********************************************/
/*! exports provided: KlComponentsService, KlComponent, KlComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KlComponentsService", function() { return KlComponentsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KlComponent", function() { return KlComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KlComponents", function() { return KlComponents; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
//
//     Angular components KeyLines v5.2.1-23282
//
//     Copyright © 2011-2019 Cambridge Intelligence Limited.
//     All rights reserved.
//
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path='./keylines.d.ts'/>

// Promisify Keylines
KeyLines.promisify(Promise);
var KlComponentsService = /** @class */ (function () {
    function KlComponentsService() {
    }
    KlComponentsService.prototype._klPaths = function (base, images) {
        if (base === void 0) { base = ""; }
        var paths = {
            images: base // default if not separately defined
        };
        if (images) {
            paths.images = images;
        }
        return paths;
    };
    KlComponentsService.prototype.create = function (klComponents, klBasePath, klImagesPath) {
        // KeyLines paths configuration
        var paths = this._klPaths(klBasePath, klImagesPath);
        KeyLines.paths(paths);
        // KeyLines create components
        return KeyLines.create(klComponents);
    };
    KlComponentsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], KlComponentsService);
    return KlComponentsService;
}());

var KlComponent = /** @class */ (function () {
    // constructor
    function KlComponent(el) {
        this.id = ""; //optional
        this.type = "chart"; // optional
        this.options = {}; // optional
        this.containerClass = ""; // optional
        this.klReady = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); // optional
        this.klEvents = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); // optional
        // Remove KL id to the parent
        el.nativeElement.removeAttribute("id");
    }
    KlComponent.prototype.isChart = function (component) {
        return this.type === "chart";
    };
    // lifecycle hooks
    KlComponent.prototype.ngOnChanges = function (changes) {
        var options = changes.options;
        // Refresh the options when necessary
        if (options && !options.isFirstChange()) {
            this.refreshOptions(options.currentValue);
        }
    };
    KlComponent.prototype.ngOnDestroy = function () {
        if (this.component) {
            // unbind all the events
            this.component.unbind("all");
        }
    };
    // Kl instructions
    KlComponent.prototype.getHeader = function () {
        return {
            element: this.containerElement
                ? this.containerElement.nativeElement
                : undefined,
            type: this.type,
            options: this.options
        };
    };
    KlComponent.prototype.setUpComponent = function (component) {
        // save the reference of the component
        this.component = component;
        // resize the component
        this.onResize(false /* don't fit to the chart */);
        // trigger a klReady event with the component reference
        this.klReady.emit(component);
        // bind the component events
        this.registerEvent();
    };
    KlComponent.prototype.registerEvent = function () {
        var _this = this;
        if (this.component) {
            this.component.bind("all", function (name) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (name !== "redraw") {
                    // define the event
                    var klEvent = { name: name, args: args, preventDefault: false };
                    // dispatch the event to the parent
                    _this.klEvents.emit(klEvent);
                    // return the preventDefault value
                    return klEvent.preventDefault;
                }
                return false;
            });
        }
    };
    KlComponent.prototype.refreshOptions = function (options) {
        if (this.component) {
            // Use type guard to allow TypeScript to infer type and prevent errors
            if (this.isChart(this.component)) {
                this.component.options(options);
            }
            else {
                this.component.options(options);
            }
        }
    };
    KlComponent.prototype.onResize = function (doFit) {
        if (doFit === void 0) { doFit = true; }
        if (this.component && this.containerElement) {
            // find containing dimensions
            var w = this.containerElement.nativeElement.offsetWidth;
            var h = this.containerElement.nativeElement.offsetHeight;
            var _a = this.containerElement.nativeElement.children[0], width = _a.width, height = _a.height;
            if (w > 0 && h > 0 && (w !== width || h !== height)) {
                KeyLines.setSize(this.containerElement.nativeElement, w, h);
                if (doFit && this.isChart(this.component)) {
                    this.component.zoom("fit");
                }
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], KlComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])("ngStyle"),
        __metadata("design:type", Object)
    ], KlComponent.prototype, "style", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])("klType"),
        __metadata("design:type", String)
    ], KlComponent.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])("klOptions"),
        __metadata("design:type", Object)
    ], KlComponent.prototype, "options", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])("klContainerClass"),
        __metadata("design:type", String)
    ], KlComponent.prototype, "containerClass", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])("klReady"),
        __metadata("design:type", Object)
    ], KlComponent.prototype, "klReady", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])("klEvents"),
        __metadata("design:type", Object)
    ], KlComponent.prototype, "klEvents", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("container"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], KlComponent.prototype, "containerElement", void 0);
    KlComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "kl-component",
            template: '<div [ngClass]="containerClass"><div [attr.id]="id" #container><div [ngStyle]="style"></div></div></div>'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], KlComponent);
    return KlComponent;
}());

var KlComponents = /** @class */ (function () {
    // constructor
    function KlComponents(KlComponentsService) {
        this.basePath = ""; // optional
        this.imagesPath = ""; // optional
        this.klReady = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); // optional
        this.KlComponentsService = KlComponentsService;
    }
    // lifecycle hooks
    KlComponents.prototype.ngAfterViewInit = function () {
        if (this.components === undefined)
            throw "Could not find kl-component declaration";
        // iterate over the list of children components to create the KeyLines definition of components
        var toCreate = this.components.map(function (component) { return component.getHeader(); });
        this.makeComponents(toCreate);
    };
    // KL instructions
    KlComponents.prototype.makeComponents = function (componentsToCreate) {
        var _this = this;
        // use the KeyLines service to create the components
        this.KlComponentsService.create(componentsToCreate, this.basePath, this.imagesPath)
            .then(function (components) {
            return _this.notifyComponents(components);
        })
            .catch(function (error) { return error; });
    };
    KlComponents.prototype.notifyComponents = function (components) {
        // ensure that we have an array of components
        if (!Array.isArray(components)) {
            components = [components];
        }
        // emit the ready events
        this.klReady.emit(components);
        // for each components registered as children
        // we finalise the set up of the component
        if (this.components) {
            this.components.forEach(function (component, index) {
                return component.setUpComponent(components[index]);
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])("klBasePath"),
        __metadata("design:type", String)
    ], KlComponents.prototype, "basePath", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])("klImagesPath"),
        __metadata("design:type", String)
    ], KlComponents.prototype, "imagesPath", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])("klReady"),
        __metadata("design:type", Object)
    ], KlComponents.prototype, "klReady", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(KlComponent),
        __metadata("design:type", Array)
    ], KlComponents.prototype, "components", void 0);
    KlComponents = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "kl-components",
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [KlComponentsService])
    ], KlComponents);
    return KlComponents;
}());



/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _keylines_keylines_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keylines/keylines.component */ "./src/app/keylines/keylines.component.ts");
/* harmony import */ var _popoto_popoto_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popoto/popoto.component */ "./src/app/popoto/popoto.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: "**", redirectTo: "/keylines", pathMatch: "full" },
    { path: "keylines", component: _keylines_keylines_component__WEBPACK_IMPORTED_MODULE_2__["KeylinesComponent"] },
    { path: "popoto", component: _popoto_popoto_component__WEBPACK_IMPORTED_MODULE_3__["PopotoComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_neo4j__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-neo4j */ "./node_modules/angular-neo4j/esm5/angular-neo4j.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _keylines_keylines_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keylines/keylines.component */ "./src/app/keylines/keylines.component.ts");
/* harmony import */ var _popoto_popoto_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popoto/popoto.component */ "./src/app/popoto/popoto.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _share_keylines_angular_keylines__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../share/keylines/angular-keylines */ "./share/keylines/angular-keylines.ts");
/* harmony import */ var _services_neo4j_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/neo4j.service */ "./src/app/services/neo4j.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _keylines_keylines_component__WEBPACK_IMPORTED_MODULE_6__["KeylinesComponent"],
                _popoto_popoto_component__WEBPACK_IMPORTED_MODULE_7__["PopotoComponent"],
                _share_keylines_angular_keylines__WEBPACK_IMPORTED_MODULE_9__["KlComponent"],
                _share_keylines_angular_keylines__WEBPACK_IMPORTED_MODULE_9__["KlComponents"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                angular_neo4j__WEBPACK_IMPORTED_MODULE_2__["AngularNeo4jModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"]
            ],
            providers: [_share_keylines_angular_keylines__WEBPACK_IMPORTED_MODULE_9__["KlComponentsService"], _services_neo4j_service__WEBPACK_IMPORTED_MODULE_10__["Neo4jService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/keylines/keylines.component.html":
/*!**************************************************!*\
  !*** ./src/app/keylines/keylines.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav>\n  <div class=\"nav-wrapper\">\n    <a\n      href=\"https://preview.graphmantics.com/\"\n      _target=\"blank\"\n      class=\"brand-logo\"\n      >GraphMantics</a\n    >\n  </div>\n</nav>\n<div class=\"container\">\n  <div class=\"row\" style=\"margin-top:10px;\">\n    <div class=\"col s2\">\n      <div class=\"valign-wrapper\">\n        <a\n          class=\"waves-effect waves-light btn\"\n          (click)=\"getData('MATCH (n:EET) RETURN n LIMIT 25')\"\n          >EET</a\n        >\n      </div>\n    </div>\n    <div class=\"col s2\">\n      <div class=\"valign-wrapper\">\n        <a\n          class=\"waves-effect waves-light btn\"\n          (click)=\"getData('MATCH (n:BO) RETURN n LIMIT 25')\"\n          >BO</a\n        >\n      </div>\n    </div>\n    <div class=\"col s2\">\n      <div class=\"valign-wrapper\">\n        <a\n          class=\"waves-effect waves-light btn\"\n          (click)=\"getData('MATCH (n:CC) RETURN n LIMIT 25')\"\n          >CC</a\n        >\n      </div>\n    </div>\n    <div class=\"col s2\">\n      <div class=\"valign-wrapper\">\n        <a\n          class=\"waves-effect waves-light btn\"\n          (click)=\"getData('MATCH (n:EE) RETURN n LIMIT 25')\"\n          >EE</a\n        >\n      </div>\n    </div>\n    <div class=\"col s2\">\n      <div class=\"valign-wrapper\">\n        <a\n          class=\"waves-effect waves-light btn\"\n          (click)=\"getData('MATCH (n:E) RETURN n LIMIT 25')\"\n          >E</a\n        >\n      </div>\n    </div>\n    <div class=\"col s2\">\n      <div class=\"valign-wrapper\">\n        <a\n          class=\"waves-effect waves-light btn\"\n          (click)=\"getData('MATCH (n:PLT) RETURN n LIMIT 25')\"\n          >PLT</a\n        >\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s6\">\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <input [(ngModel)]=\"query\" id=\"query\" type=\"text\" class=\"validate\" />\n          <label class=\"active\" for=\"query\">Please eneter a query</label>\n        </div>\n      </div>\n    </div>\n    <div class=\"col s2\" style=\"margin-top:14px;\">\n      <a class=\"waves-effect waves-light btn\" (click)=\"getData()\"\n        >Execute Query</a\n      >\n    </div>\n\n    <div class=\"col s4\" style=\"margin-top:14px;\">\n      <select\n        class=\"browser-default\"\n        [(ngModel)]=\"layoutKind\"\n        (ngModelChange)=\"updateLayer(layoutKind)\"\n      >\n        <option value=\"\" disabled selected>Choose layout view</option>\n        <option *ngFor=\"let item of layoutNames\" [value]=\"item\">{{\n          item\n        }}</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <kl-components (klReady)=\"klReady($event)\">\n        <kl-component\n          id=\"kl\"\n          klType=\"chart\"\n          klContainerClass=\"chart-container\"\n          (window:resize)=\"setChartSize()\"\n        >\n        </kl-component>\n      </kl-components>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <ul class=\"collection with-header\">\n        <li class=\"collection-header\"><h4>Rsults</h4></li>\n        <li class=\"collection-item\" *ngFor=\"let item of propertiesData\">\n          <pre>\n                  {{ item | json }}\n              </pre\n          >\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n<footer class=\"page-footer\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col l6 s12\">\n        <h5 class=\"white-text\">Footer Content</h5>\n        <p class=\"grey-text text-lighten-4\">\n          You can use rows and columns here to organize your footer content.\n        </p>\n      </div>\n      <div class=\"col l4 offset-l2 s12\">\n        <h5 class=\"white-text\">Links</h5>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer-copyright\">\n    <div class=\"container\">\n      © 2019 Graphmantics\n      <a class=\"grey-text text-lighten-4 right\" href=\"#!\">More Links</a>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/keylines/keylines.component.scss":
/*!**************************************************!*\
  !*** ./src/app/keylines/keylines.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".chart-container {\n  width: 800px;\n  height: 600px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAva2V5bGluZXMvRDpcXHByb2plY3RzXFxncm10eF91aV9rbFxcdWkvc3JjXFxhcHBcXGtleWxpbmVzXFxrZXlsaW5lcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQVk7RUFDWixjQUFhLEVBQ2QiLCJmaWxlIjoic3JjL2FwcC9rZXlsaW5lcy9rZXlsaW5lcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGFydC1jb250YWluZXIge1xyXG4gICAgd2lkdGg6IDgwMHB4O1xyXG4gICAgaGVpZ2h0OiA2MDBweDtcclxuICB9Il19 */"

/***/ }),

/***/ "./src/app/keylines/keylines.component.ts":
/*!************************************************!*\
  !*** ./src/app/keylines/keylines.component.ts ***!
  \************************************************/
/*! exports provided: KeylinesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeylinesComponent", function() { return KeylinesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_neo4j__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-neo4j */ "./node_modules/angular-neo4j/esm5/angular-neo4j.es5.js");
/* harmony import */ var _services_neo4j_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/neo4j.service */ "./src/app/services/neo4j.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KeyLines = window.KeyLines;
var url = "bolt://localhost:7687";
var username = "neo4j";
var password = "demo";
var encrypted = true;
var colors = [
    "#8dd3c7",
    "#bebada",
    "#fb8072",
    "#80b1d3",
    "#fdb462",
    "#b3de69",
    "#fccde5",
    "#bc80bd"
];
var KeylinesComponent = /** @class */ (function () {
    function KeylinesComponent(neo4j, neo4jService) {
        var _this = this;
        this.neo4j = neo4j;
        this.neo4jService = neo4jService;
        this.propertiesData = [];
        this.layoutKind = "";
        this.layoutNames = [
            "standard",
            "hierarchy",
            "sequential",
            "lens",
            "organic",
            "radial",
            "structural",
            "tweak"
        ];
        this.options = {
            logo: { u: "../../assets/logo.png", p: "se", x: 20, y: 20 },
            navigation: { shown: true },
            selfLinks: true
        };
        this.data = {
            type: "LinkChart",
            items: []
        };
        this.Neo4j = function () {
            var api = {
                // Only the functions of this object will be accessible to the rest of the application.
                query: function (cypherQuery, params, callback) {
                    var request = prepareRequest(cypherQuery, params);
                    fetch(request, callback);
                }
            };
            var prepareRequest = function (query, params) {
                //  This will create an object that will be sent to the Neo4j api.
                return {
                    statements: [
                        {
                            statement: query,
                            parameters: params || {},
                            resultDataContents: ["graph"]
                        }
                    ]
                };
            };
            var fetch = function (request, callback) {
                _this.neorequest = JSON.stringify(request);
                _this.neo4jService.getData(_this.neorequest).subscribe(function (response) {
                    _this.rawData = response.results[0].data;
                    console.log(_this.rawData);
                    callback(null, parseResponse(response));
                }, function (error) {
                    callback("Unable to connect to Neo4j Server, check your password is correct.  If you are running Neo4j locally over https, please login to the console first at https://localhost:7473/.");
                });
            };
            var parseResponse = function (response) {
                _this.neoresponse = JSON.stringify(response);
                var items = [];
                // Get the data from the Neo response
                var data = response.results[0].data;
                for (var i = 0; i < data.length; i++) {
                    var entryGraph = data[i].graph;
                    // iterate through the list of nodes
                    for (var j = 0; j < entryGraph.nodes.length; j++) {
                        // Convert node to KeyLines format and add it to the items array.
                        var node = makeNode(entryGraph.nodes[j]);
                        _this.propertiesData.push(entryGraph.nodes[j].properties);
                        items.push(node);
                    }
                    // iterate through the list of links (also known as edges or relationships)
                    for (var k = 0; k < entryGraph.relationships.length; k++) {
                        // Convert link to KeyLines format and add it to the items array.
                        var link = makeLink(entryGraph.relationships[k]);
                        items.push(link);
                    }
                }
                return items;
            };
            var makeNode = function (neoItem) {
                var data = neoItem.properties.name;
                var isTheEET = data === "EET";
                var color = colors[neoItem % colors.length];
                return {
                    id: neoItem.id,
                    c: color,
                    e: isTheEET ? 2 : 1,
                    type: "node",
                    t: data
                };
            };
            var makeLink = function (neoItem) {
                return {
                    id: "link_" + neoItem.id,
                    type: "link",
                    id1: neoItem.startNode,
                    id2: neoItem.endNode // Node id link connects to.
                };
            };
            return api;
        };
    }
    KeylinesComponent.prototype.setChartSize = function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var border = 16;
        KeyLines.setSize("kl", w - border, h - border);
        this.chart.zoom("fit");
    };
    KeylinesComponent.prototype.klReady = function (_a) {
        var chart = _a[0];
        this.chart = chart;
        chart.options(this.options);
        this.setChartSize();
    };
    KeylinesComponent.prototype.ngOnInit = function () { };
    KeylinesComponent.prototype.ngAfterViewInit = function () {
        this.getData();
    };
    KeylinesComponent.prototype.updateLayer = function (name) {
        this.chart.layout(name);
    };
    KeylinesComponent.prototype.getData = function (query) {
        var _this = this;
        if (query === void 0) { query = "MATCH p=()-[r:`BO-RELATED_TO-BO`]->() RETURN p LIMIT 25"; }
        var neo4j = this.Neo4j();
        var params = {};
        if (this.query !== "" && this.query !== undefined) {
            query = this.query;
        }
        neo4j.query(query, params, function (error, items) {
            _this.data.items = items;
            console.log(items);
            _this.chart.load(_this.data);
            _this.chart.layout();
        });
    };
    KeylinesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-keylines",
            template: __webpack_require__(/*! ./keylines.component.html */ "./src/app/keylines/keylines.component.html"),
            styles: [__webpack_require__(/*! ./keylines.component.scss */ "./src/app/keylines/keylines.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_neo4j__WEBPACK_IMPORTED_MODULE_1__["AngularNeo4jService"],
            _services_neo4j_service__WEBPACK_IMPORTED_MODULE_2__["Neo4jService"]])
    ], KeylinesComponent);
    return KeylinesComponent;
}());



/***/ }),

/***/ "./src/app/popoto/popoto.component.html":
/*!**********************************************!*\
  !*** ./src/app/popoto/popoto.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ppt-body\">\n  <nav class=\"top-nav grey lighten-1\">\n    <div class=\"container\">\n      <div class=\"nav-wrapper valign-wrapper\">\n        <h2 class=\"center-align\">Graphmantics</h2>\n      </div>\n    </div>\n  </nav>\n\n  <div class=\"row\">\n    <form\n      class=\"col s12\"\n      [formGroup]=\"queryForm\"\n      novalidate\n      (ngSubmit)=\"doQuery()\"\n    >\n      <div class=\"row\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <input\n              id=\"db_query\"\n              type=\"text\"\n              class=\"validate\"\n              formControlName=\"db_query\"\n            />\n            <label for=\"db_query\">Query</label>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div style=\"padding: 20px\">\n    <ul class=\"collapsible popout\" data-collapsible=\"expandable\">\n      <li class=\"active\">\n        <div class=\"collapsible-header active grey darken-4\">\n          <i class=\"material-icons\">timeline</i>Graph\n        </div>\n        <div class=\"collapsible-body\" style=\"display: block;\">\n          <div\n            id=\"popoto-taxonomy\"\n            class=\"ppt-taxo-nav\"\n            style=\"height: 600px; color: white;\"\n          ></div>\n          <div id=\"popoto-graph\" class=\"ppt-div-graph\"></div>\n        </div>\n      </li>\n      <li class=\"active\">\n        <div class=\"collapsible-header grey darken-4\">\n          <i class=\"material-icons\">search</i>Query\n        </div>\n        <div class=\"collapsible-body\" style=\"display: block;\">\n          <div id=\"popoto-cypher\" class=\"ppt-div-cypher center-align\"></div>\n        </div>\n      </li>\n      <li class=\"active\">\n        <div class=\"collapsible-header grey darken-4\">\n          <i class=\"material-icons\">view_quilt</i>Results\n          <span id=\"result-total-count\" class=\"ppt-count\"></span>\n        </div>\n        <div class=\"collapsible-body\">\n          <div class=\"ppt-div-results\">\n            <div class=\"ppt-div-results col s12\" id=\"popoto-results\"></div>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/popoto/popoto.component.scss":
/*!**********************************************!*\
  !*** ./src/app/popoto/popoto.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Remove outline on collapsible headers */\n.collapsible-header:focus {\n  outline: 0; }\n#popoto-graph {\n  height: 600px; }\n#popoto-graph:-webkit-full-screen {\n  width: 100%;\n  height: 100%; }\n#popoto-graph:-moz-full-screen {\n  width: 100%;\n  height: 100%; }\n#popoto-graph:-ms-fullscreen {\n  width: 100%;\n  height: 100%; }\n#popoto-graph:fullscreen {\n  width: 100%;\n  height: 100%; }\n#popoto-graph:-webkit-full-screen {\n  width: 100%;\n  height: 100%; }\n#popoto-graph:-moz-full-screen {\n  width: 100%;\n  height: 100%; }\n#popoto-graph:-ms-fullscreen {\n  width: 100%;\n  height: 100%; }\nnav.top-nav {\n  height: auto;\n  box-shadow: none; }\nnav.top-nav a.page-title {\n  font-size: 48px; }\nbody {\n  background-color: #fcfcfc; }\n.ppt-div-cypher {\n  background-color: #22252a;\n  border-radius: 5px 5px;\n  padding: 18px; }\n.ppt-div-results {\n  background-color: #22252a;\n  padding: 5px;\n  border-radius: 5px 5px; }\n.ppt-result {\n  color: #fff; }\nfooter.page-footer {\n  padding-bottom: 20px; }\n.text-box {\n  fill: #68bdf6;\n  stroke: #5ca8db;\n  stroke-width: 2px;\n  opacity: 0.7; }\n.text-box.value {\n  fill: #f0b017;\n  stroke: #db9a17; }\n.text-box.choose {\n  fill: #6dce9e;\n  stroke: #60b58b; }\n.text-box.selected-value {\n  fill: #f0b017;\n  stroke: #db9a17; }\n.text-box.disabled {\n  fill: #d3d3d3;\n  stroke: #c7c7c7;\n  stroke-width: 2px;\n  opacity: 0.7; }\n.ppt-body {\n  margin: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wb3RvL0Q6XFxwcm9qZWN0c1xcZ3JtdHhfdWlfa2xcXHVpL3NyY1xcYXBwXFxwb3BvdG9cXHBvcG90by5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyQ0FBMkM7QUFDM0M7RUFDSSxXQUFVLEVBQ1g7QUFDRDtFQUNFLGNBQWEsRUFDZDtBQUNEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUhEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUhEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUhEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUNEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUNEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUNEO0VBQ0UsWUFBVztFQUNYLGFBQVksRUFDYjtBQUNEO0VBQ0UsYUFBWTtFQUNaLGlCQUFnQixFQUNqQjtBQUNEO0VBQ0UsZ0JBQWUsRUFDaEI7QUFDRDtFQUNFLDBCQUF5QixFQUMxQjtBQUNEO0VBQ0UsMEJBQXlCO0VBQ3pCLHVCQUFzQjtFQUN0QixjQUFhLEVBQ2Q7QUFDRDtFQUNFLDBCQUF5QjtFQUN6QixhQUFZO0VBQ1osdUJBQXNCLEVBQ3ZCO0FBQ0Q7RUFDRSxZQUFXLEVBQ1o7QUFDRDtFQUNFLHFCQUFvQixFQUNyQjtBQUNEO0VBQ0UsY0FBYTtFQUNiLGdCQUFlO0VBQ2Ysa0JBQWlCO0VBQ2pCLGFBQVksRUFDYjtBQUNEO0VBQ0UsY0FBYTtFQUNiLGdCQUFlLEVBQ2hCO0FBQ0Q7RUFDRSxjQUFhO0VBQ2IsZ0JBQWUsRUFDaEI7QUFDRDtFQUNFLGNBQWE7RUFDYixnQkFBZSxFQUNoQjtBQUNEO0VBQ0UsY0FBYTtFQUNiLGdCQUFlO0VBQ2Ysa0JBQWlCO0VBQ2pCLGFBQVksRUFDYjtBQUNEO0VBQ0UsVUFBUyxFQUNWIiwiZmlsZSI6InNyYy9hcHAvcG9wb3RvL3BvcG90by5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFJlbW92ZSBvdXRsaW5lIG9uIGNvbGxhcHNpYmxlIGhlYWRlcnMgKi9cclxuLmNvbGxhcHNpYmxlLWhlYWRlcjpmb2N1cyB7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gIH1cclxuICAjcG9wb3RvLWdyYXBoIHtcclxuICAgIGhlaWdodDogNjAwcHg7XHJcbiAgfVxyXG4gICNwb3BvdG8tZ3JhcGg6ZnVsbHNjcmVlbiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiAgI3BvcG90by1ncmFwaDotd2Via2l0LWZ1bGwtc2NyZWVuIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuICAjcG9wb3RvLWdyYXBoOi1tb3otZnVsbC1zY3JlZW4ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG4gICNwb3BvdG8tZ3JhcGg6LW1zLWZ1bGxzY3JlZW4ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG4gIG5hdi50b3AtbmF2IHtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgfVxyXG4gIG5hdi50b3AtbmF2IGEucGFnZS10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDQ4cHg7XHJcbiAgfVxyXG4gIGJvZHkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcclxuICB9XHJcbiAgLnBwdC1kaXYtY3lwaGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI1MmE7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggNXB4O1xyXG4gICAgcGFkZGluZzogMThweDtcclxuICB9XHJcbiAgLnBwdC1kaXYtcmVzdWx0cyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyNTJhO1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4IDVweDtcclxuICB9XHJcbiAgLnBwdC1yZXN1bHQge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgfVxyXG4gIGZvb3Rlci5wYWdlLWZvb3RlciB7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcclxuICB9XHJcbiAgLnRleHQtYm94IHtcclxuICAgIGZpbGw6ICM2OGJkZjY7XHJcbiAgICBzdHJva2U6ICM1Y2E4ZGI7XHJcbiAgICBzdHJva2Utd2lkdGg6IDJweDtcclxuICAgIG9wYWNpdHk6IDAuNztcclxuICB9XHJcbiAgLnRleHQtYm94LnZhbHVlIHtcclxuICAgIGZpbGw6ICNmMGIwMTc7XHJcbiAgICBzdHJva2U6ICNkYjlhMTc7XHJcbiAgfVxyXG4gIC50ZXh0LWJveC5jaG9vc2Uge1xyXG4gICAgZmlsbDogIzZkY2U5ZTtcclxuICAgIHN0cm9rZTogIzYwYjU4YjtcclxuICB9XHJcbiAgLnRleHQtYm94LnNlbGVjdGVkLXZhbHVlIHtcclxuICAgIGZpbGw6ICNmMGIwMTc7XHJcbiAgICBzdHJva2U6ICNkYjlhMTc7XHJcbiAgfVxyXG4gIC50ZXh0LWJveC5kaXNhYmxlZCB7XHJcbiAgICBmaWxsOiAjZDNkM2QzO1xyXG4gICAgc3Ryb2tlOiAjYzdjN2M3O1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAycHg7XHJcbiAgICBvcGFjaXR5OiAwLjc7XHJcbiAgfVxyXG4gIC5wcHQtYm9keSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/popoto/popoto.component.ts":
/*!********************************************!*\
  !*** ./src/app/popoto/popoto.component.ts ***!
  \********************************************/
/*! exports provided: PopotoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopotoComponent", function() { return PopotoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var popoto = window.popoto;
var d3 = window.d3;
var autoComplete = window.autoComplete;
var PopotoComponent = /** @class */ (function () {
    function PopotoComponent(_fb) {
        this._fb = _fb;
        this.queryForm = this._fb.group({
            db_query: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
        // (<any>window).popoto.rest.post = (function (initial) {
        //   return function (statements) {
        //     return initial.apply(this, arguments);
        //   };
        // })((<any>window).popoto.rest.post);
    }
    PopotoComponent.prototype.ngOnInit = function () {
        /** graph configs */
        popoto.graph.node.DONUTS_MARGIN = 5;
        popoto.graph.node.DONUT_WIDTH = 10;
        popoto.graph.node.PAGE_SIZE = 10;
        popoto.graph.DISABLE_COUNT = false;
        popoto.graph.link.SHOW_MARKER = false;
        popoto.graph.WHEEL_ZOOM_ENABLED = true;
        /** graph configs */
        /** tools */
        popoto.tools.TOGGLE_TAXONOMY = true;
        popoto.tools.SAVE_GRAPH = true;
        popoto.graph.USE_FIT_TEXT = true;
        /** tools */
        popoto.logger.LEVEL = popoto.logger.LogLevels.INFO;
        popoto.graph.link.SHOW_MARKER = true;
        popoto.query.COLLECT_RELATIONS_WITH_VALUES = true;
        // Demo Neo4j database settings hosted on GrapheneDb
        popoto.rest.CYPHER_URL = "http://34.224.5.60:33321/db/data/transaction/commit";
        popoto.rest.AUTHORIZATION = "Basic bmVvNGo6cmFpbHdheXMtYnJ1c2gtanVyaXNkaWN0aW9ucw==";
        // Use known min and max amount but should be extracted from data in a real application
        var maxAmount = 141396;
        var minAmount = 3044;
        // Generate size and CSS classes scales based on data using d3.
        var sizeScale = d3
            .scaleQuantize()
            .domain([minAmount, maxAmount])
            .range([50, 75, 100, 125, 150]);
        var strokeCSSScale = d3
            .scaleQuantize()
            .domain([minAmount, maxAmount])
            .range(["very-thin", "thin", "medium", "thick", "very-thick"]);
        popoto.provider.node.Provider = {
            EET: {
                children: ["CC", "PLT", "E", "S"],
                returnAttributes: [
                    "code",
                    "color",
                    "hlevel",
                    "count",
                    "linId",
                    "entobj",
                    "descr",
                    "first_activity",
                    "last_ativity",
                    "size",
                    "name",
                    "value",
                    "key"
                ],
                autoExpandRelations: true,
                isAutoLoadValue: false,
                constraintAttribute: "key",
                resultOrderByAttribute: "name",
                valueOrderByAttribute: "name",
                isValueOrderAscending: true,
                displayAttribute: "code",
                getDisplayType: function (node) {
                    return popoto.provider.node.DisplayTypes.IMAGE;
                },
                getImagePath: function (node) {
                    return "assets/blue_triangle.png";
                },
                getImageWidth: function (node) {
                    return popoto.provider.node.getSize(node);
                },
                getImageHeight: function (node) {
                    return popoto.provider.node.getSize(node);
                },
                getTextValue: function (node, maxLength) {
                    return "Enterprise Entity Type";
                }
            },
            AA: {
                parent: ["TO"],
                returnAttributes: ["name", "descr", "code", "value", "linId", "key"],
                autoExpandRelations: true,
                getTextValue: function (node, maxLength) {
                    return "Application Areas";
                }
            },
            BO: {
                children: [
                    "ASSET",
                    "CUSTOMER",
                    "MATERIAL",
                    "PURCH_ORDER",
                    "SALES_ORDER",
                    "VENDOR"
                ],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ],
                autoExpandRelations: true,
                getDisplayType: function (node) {
                    return popoto.provider.node.DisplayTypes.IMAGE;
                },
                getImagePath: function (node) {
                    return "assets/yellow_circle.png";
                },
                getImageWidth: function (node) {
                    return popoto.provider.node.getSize(node);
                },
                getImageHeight: function (node) {
                    return popoto.provider.node.getSize(node);
                },
                getTextValue: function (node, maxLength) {
                    return "Business Objects";
                }
            },
            CC: {
                parent: ["EET"],
                returnAttributes: [
                    "code",
                    "color",
                    "hlevel",
                    "count",
                    "linId",
                    "entobj",
                    "descr",
                    "first_activity",
                    "last_ativity",
                    "size",
                    "name",
                    "value",
                    "key"
                ],
                autoExpandRelations: true,
                getTextValue: function (node, maxLength) {
                    return "Company Code";
                }
            },
            E: {
                parent: ["EET"],
                returnAttributes: ["name", "entobj", "descr", "code", "value", "key"],
                autoExpandRelations: true,
                getTextValue: function (node, maxLength) {
                    return "Enterprise";
                }
            },
            ASSET: {
                parent: ["BO"],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ]
            },
            CUSTOMER: {
                parent: ["BO"],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ]
            },
            MATERIAL: {
                parent: ["BO"],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ]
            },
            PURCH_ORDER: {
                parent: ["BO"],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ]
            },
            SALES_ORDER: {
                parent: ["BO"],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ]
            },
            VENDOR: {
                parent: ["BO"],
                returnAttributes: [
                    "tcode",
                    "descr",
                    "first_activity",
                    "last_activity",
                    "app_area",
                    "name",
                    "count",
                    "CMT",
                    "value",
                    "table",
                    "key",
                    "linId"
                ]
            },
            PLT: {
                parent: ["EET"],
                returnAttributes: [
                    "code",
                    "color",
                    "hlevel",
                    "count",
                    "linId",
                    "entobj",
                    "descr",
                    "first_activity",
                    "last_ativity",
                    "size",
                    "name",
                    "value",
                    "key"
                ],
                autoExpandRelations: false,
                getTextValue: function (node, maxLength) {
                    return "Plant";
                }
            },
            // S: {
            //   parent: ["EET"],
            //   returnAttributes: ["name", "entobj", "descr", "code", "value", "key"],
            //   autoExpandRelations: false,
            //   getTextValue: function(node, maxLength) {
            //     return "Systems";
            //   }
            // },
            // SAP_ECC: {
            //   parent: ["BO"],
            //   returnAttributes: ["name", "entobj", "descr", "code", "value", "key"],
            //   autoExpandRelations: false,
            //   getTextValue: function(node, maxLength) {
            //     return "SAP ECC";
            //   }
            // },
            SI: {
                parent: ["BO"],
                returnAttributes: ["name", "entobj", "descr", "code", "value", "key"],
                autoExpandRelations: false,
                getTextValue: function (node, maxLength) {
                    return "System Instance";
                }
            },
            TABLE: {
                parent: ["TO"],
                returnAttributes: [
                    "name",
                    "entobj",
                    "descr",
                    "code",
                    "value",
                    "key",
                    "count",
                    "linId"
                ],
                autoExpandRelations: false
            },
            TO: {
                children: ["AA", "TABLE"],
                returnAttributes: [
                    "name",
                    "entobj",
                    "descr",
                    "code",
                    "value",
                    "key",
                    "count",
                    "linId"
                ],
                autoExpandRelations: false,
                getDisplayType: function (node) {
                    return popoto.provider.node.DisplayTypes.IMAGE;
                },
                getImagePath: function (node) {
                    return "assets/red_square.png";
                },
                getImageWidth: function (node) {
                    return popoto.provider.node.getSize(node);
                },
                getImageHeight: function (node) {
                    return popoto.provider.node.getSize(node);
                },
                getTextValue: function (node, maxLength) {
                    return "Technical Objects";
                }
            }
        };
        popoto.provider.link.Provider = {
            // Customize the text displayed on links:
            getTextValue: function (link) {
                if (link.type === popoto.graph.link.LinkTypes.RELATION ||
                    link.type === popoto.graph.link.LinkTypes.SEGMENT) {
                    var targetName = "";
                    if (link.type === popoto.graph.link.LinkTypes.SEGMENT) {
                        targetName = " " + popoto.provider.node.getTextValue(link.target);
                    }
                    switch (link.label) {
                        case "BO-BELONGS_TO-AA":
                            return "belongs to" + targetName;
                        case "BO-RELATED_TO-BO":
                            return "related to" + targetName;
                        case "BO-STORED_IN-TABLE":
                            return "stored in" + targetName;
                        case "BO-STORED_IN_HEADER-TABLE":
                            return "stored in header" + targetName;
                        case "BO-USED_BY-EE":
                            return "used by" + targetName;
                        case "CC-OWNED_BY-E":
                            return "owned by" + targetName;
                        case "IS_A":
                            return "is a" + targetName;
                        case "PLT-MANUFACTURES_OR_DISTRIBUTES_FOR-CC":
                            return "manufacturers or distributes for" + targetName;
                        case "SYSTEM_INSTANCE":
                            return "system instance" + targetName;
                        case "SYSTEM_TYPE":
                            return "system type" + targetName;
                        case "TABLE-BELONGS_TO-AA":
                            return "belongs to" + targetName;
                        case "USED_BY":
                            return "used by" + targetName;
                        case "USED_IN":
                            return "used in" + targetName;
                        default:
                            return "Unexpected relation";
                    }
                }
                else {
                    return "";
                }
            }
        };
        popoto.provider.taxonomy.Provider = {
            getCSSClass: function (label, element) {
                var labelAsCSSName = label.replace(/[^0-9a-z\-_]/gi, "");
                var cssClass = "ppt-taxo__" + element;
                return cssClass + " " + labelAsCSSName;
            }
        };
        popoto.result.onTotalResultCount(function (count) {
            document.getElementById("result-total-count").innerHTML =
                "(" + count + ")";
        });
        // Start the generation using parameter as root label of the query.
        popoto.start("EET");
    };
    PopotoComponent.prototype.ngAfterViewInit = function () { };
    PopotoComponent.prototype.doQuery = function () {
        if (this.queryForm.invalid) {
            console.error("Please enter the query");
            return;
        }
        var rootLabel = (this.queryForm.value.db_query.match(/^.*?\:\`?([\w_-\d]+)[\`\s\{,\)]?/i) || ["", popoto.graph.mainLabel])[1];
        var limit = (this.queryForm.value.db_query.match(/LIMIT\s(\d+)?/i) || [
            "",
            25
        ])[1];
        var statements = [
            {
                statement: this.queryForm.value.db_query,
                appQuery: true,
                parameters: { limit: limit },
                resultDataContents: ["row"]
            }
        ];
        popoto.rest
            .post({
            statements: statements
        })
            .done(function (data) {
            var finaleRes = {
                label: rootLabel,
                rel: []
            };
            data.results[0].data.forEach(function (data) {
                if (data.meta[0] || data.meta[0].length) {
                    var buffer_1 = {};
                    var meta = Array.isArray(data.meta[0]) ? data.meta[0] : data.meta;
                    var row_1 = Array.isArray(data.row[0]) ? data.row[0] : data.row;
                    meta.forEach(function (metaItem, i) {
                        if (metaItem) {
                            if (metaItem.type === "node") {
                                buffer_1.label = row_1[i].code;
                                buffer_1.value = Object.assign({}, row_1[i]);
                            }
                            else if (metaItem.type === "relationship") {
                                buffer_1.rel = {
                                    label: row_1[i].code,
                                    target: {
                                        label: row_1[i + 1].code,
                                        value: Object.assign({}, row_1[i + 1])
                                    }
                                };
                            }
                        }
                    });
                    finaleRes.rel.push(buffer_1);
                }
            });
            popoto.graph.mainLabel = finaleRes;
            popoto.tools.reset();
        })
            .fail(function (xhr, textStatus, errorThrown) {
            console.error(xhr, textStatus, errorThrown);
        });
    };
    PopotoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-popoto",
            template: __webpack_require__(/*! ./popoto.component.html */ "./src/app/popoto/popoto.component.html"),
            styles: [__webpack_require__(/*! ./popoto.component.scss */ "./src/app/popoto/popoto.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], PopotoComponent);
    return PopotoComponent;
}());



/***/ }),

/***/ "./src/app/services/neo4j.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/neo4j.service.ts ***!
  \*******************************************/
/*! exports provided: Neo4jService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Neo4jService", function() { return Neo4jService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var url = "http://34.224.5.60:33321/db/data/transaction/commit";
var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        "Content-Type": "application/json",
        Authorization: "Basic bmVvNGo6cmFpbHdheXMtYnJ1c2gtanVyaXNkaWN0aW9ucw==",
        dataType: "json"
    })
};
var Neo4jService = /** @class */ (function () {
    function Neo4jService(http) {
        this.http = http;
    }
    Neo4jService.prototype.getData = function (query) {
        return this.http.post(url, query, httpOptions);
    };
    Neo4jService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], Neo4jService);
    return Neo4jService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\projects\grmtx_ui_kl\ui\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map