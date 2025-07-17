(self["webpackChunkface_detection_app"] = self["webpackChunkface_detection_app"] || []).push([[792],{

/***/ 365:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.video-container {
  position: relative;
  display: inline-block;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#video {
  display: block;
  transform: scaleX(-1);
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(-1);
}

.controls {
  margin: 20px 0;
}

.mode-selector {
  margin-bottom: 15px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mode-selector label {
  margin: 0 15px;
  cursor: pointer;
  font-size: 14px;
}

.mode-selector input[type="radio"] {
  margin-right: 5px;
  cursor: pointer;
}

.threshold-control {
  margin-top: 15px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.threshold-control label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
}

.threshold-control input[type="range"] {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

#thresholdValue {
  color: #3498db;
  font-weight: bold;
}

.btn {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #e74c3c;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #c0392b;
}

.stats {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.stats p {
  margin: 10px 0;
  font-size: 14px;
}

.error {
  background-color: #fee;
  color: #c33;
  padding: 20px;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 600px;
}

.loading {
  text-align: center;
  padding: 50px;
}

.loading h2 {
  color: #666;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .video-container {
    width: 100%;
    max-width: 400px;
  }

  #video, #overlay {
    width: 100%;
    height: auto;
  }

  .btn {
    padding: 8px 16px;
    font-size: 14px;
  }
}

/* Pro Mode Styles */
.pro-controls {
  margin-top: 15px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.pro-controls h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
  text-align: center;
}

.pro-controls label {
  display: block;
  margin: 8px 0;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 0;
}

.pro-controls label:hover {
  color: #3498db;
}

.pro-controls input[type="checkbox"] {
  margin-right: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
}

/* Pro mode canvas styling */
.video-container.pro-mode {
  border: 2px solid #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
}

/* Animation for landmark transitions */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.landmark-point {
  animation: pulse 2s ease-in-out infinite;
}

/* Expression labels styling */
.expression-label {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

/* Stats styling for pro mode */
.stats.pro-mode {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stats.pro-mode p {
  color: white;
}

.stats.pro-mode strong {
  color: #ffd700;
}

/* Camera Selector Styles */
.camera-selector {
  margin: 10px 0;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

.camera-selector label {
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
}

.camera-selector select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  min-width: 200px;
}

.camera-selector select:hover {
  border-color: #3498db;
}

.camera-selector select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;AACxB;;AAEA;EACE,SAAS;EACT,yGAAyG;EACzG,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,cAAc;EACd,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,wCAAwC;AAC1C;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,qBAAqB;AACvB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,wCAAwC;AAC1C;;AAEA;EACE,cAAc;EACd,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,wCAAwC;AAC1C;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,iCAAiC;AACnC;;AAEA;EACE,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,WAAW;AACb;;AAEA;EACE;IACE,aAAa;EACf;;EAEA;IACE,WAAW;IACX,gBAAgB;EAClB;;EAEA;IACE,WAAW;IACX,YAAY;EACd;;EAEA;IACE,iBAAiB;IACjB,eAAe;EACjB;AACF;;AAEA,oBAAoB;AACpB;EACE,gBAAgB;EAChB,aAAa;EACb,uBAAuB;EACvB,kBAAkB;EAClB,wCAAwC;EACxC,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,aAAa;EACb,eAAe;EACf,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,eAAe;EACf,WAAW;EACX,YAAY;AACd;;AAEA,4BAA4B;AAC5B;EACE,yBAAyB;EACzB,4CAA4C;AAC9C;;AAEA,uCAAuC;AACvC;EACE;IACE,mBAAmB;IACnB,UAAU;EACZ;EACA;IACE,qBAAqB;IACrB,YAAY;EACd;EACA;IACE,mBAAmB;IACnB,UAAU;EACZ;AACF;;AAEA;EACE,wCAAwC;AAC1C;;AAEA,8BAA8B;AAC9B;EACE,oCAAoC;EACpC,YAAY;EACZ,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;AACnB;;AAEA,+BAA+B;AAC/B;EACE,6DAA6D;EAC7D,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;AAChB;;AAEA,2BAA2B;AAC3B;EACE,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;EACtB,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;EACf,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,6CAA6C;AAC/C","sourcesContent":["* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n  background-color: #f5f5f5;\n  color: #333;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n  text-align: center;\n}\n\nh1 {\n  color: #2c3e50;\n  margin-bottom: 30px;\n}\n\n.video-container {\n  position: relative;\n  display: inline-block;\n  margin: 20px auto;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n#video {\n  display: block;\n  transform: scaleX(-1);\n}\n\n#overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: scaleX(-1);\n}\n\n.controls {\n  margin: 20px 0;\n}\n\n.mode-selector {\n  margin-bottom: 15px;\n  padding: 15px;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.mode-selector label {\n  margin: 0 15px;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n.mode-selector input[type=\"radio\"] {\n  margin-right: 5px;\n  cursor: pointer;\n}\n\n.threshold-control {\n  margin-top: 15px;\n  padding: 15px;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.threshold-control label {\n  display: block;\n  margin-bottom: 10px;\n  font-weight: 500;\n  font-size: 14px;\n}\n\n.threshold-control input[type=\"range\"] {\n  width: 100%;\n  max-width: 300px;\n  margin: 0 auto;\n  display: block;\n}\n\n#thresholdValue {\n  color: #3498db;\n  font-weight: bold;\n}\n\n.btn {\n  padding: 10px 20px;\n  margin: 0 10px;\n  border: none;\n  border-radius: 5px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n\n.btn-primary {\n  background-color: #3498db;\n  color: white;\n}\n\n.btn-primary:hover:not(:disabled) {\n  background-color: #2980b9;\n}\n\n.btn-secondary {\n  background-color: #e74c3c;\n  color: white;\n}\n\n.btn-secondary:hover:not(:disabled) {\n  background-color: #c0392b;\n}\n\n.stats {\n  background-color: white;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  margin-top: 20px;\n}\n\n.stats p {\n  margin: 10px 0;\n  font-size: 14px;\n}\n\n.error {\n  background-color: #fee;\n  color: #c33;\n  padding: 20px;\n  border-radius: 8px;\n  margin: 20px auto;\n  max-width: 600px;\n}\n\n.loading {\n  text-align: center;\n  padding: 50px;\n}\n\n.loading h2 {\n  color: #666;\n}\n\n@media (max-width: 768px) {\n  .container {\n    padding: 10px;\n  }\n\n  .video-container {\n    width: 100%;\n    max-width: 400px;\n  }\n\n  #video, #overlay {\n    width: 100%;\n    height: auto;\n  }\n\n  .btn {\n    padding: 8px 16px;\n    font-size: 14px;\n  }\n}\n\n/* Pro Mode Styles */\n.pro-controls {\n  margin-top: 15px;\n  padding: 15px;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  text-align: left;\n}\n\n.pro-controls h3 {\n  margin: 0 0 15px 0;\n  color: #2c3e50;\n  font-size: 16px;\n  text-align: center;\n}\n\n.pro-controls label {\n  display: block;\n  margin: 8px 0;\n  cursor: pointer;\n  font-size: 14px;\n  padding: 5px 0;\n}\n\n.pro-controls label:hover {\n  color: #3498db;\n}\n\n.pro-controls input[type=\"checkbox\"] {\n  margin-right: 8px;\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n}\n\n/* Pro mode canvas styling */\n.video-container.pro-mode {\n  border: 2px solid #3498db;\n  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);\n}\n\n/* Animation for landmark transitions */\n@keyframes pulse {\n  0% {\n    transform: scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: scale(1.1);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n\n.landmark-point {\n  animation: pulse 2s ease-in-out infinite;\n}\n\n/* Expression labels styling */\n.expression-label {\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n/* Stats styling for pro mode */\n.stats.pro-mode {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\n.stats.pro-mode p {\n  color: white;\n}\n\n.stats.pro-mode strong {\n  color: #ffd700;\n}\n\n/* Camera Selector Styles */\n.camera-selector {\n  margin: 10px 0;\n  padding: 10px;\n  background: #f9f9f9;\n  border-radius: 5px;\n}\n\n.camera-selector label {\n  display: inline-block;\n  margin-right: 10px;\n  font-weight: bold;\n}\n\n.camera-selector select {\n  padding: 5px 10px;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  background: white;\n  font-size: 14px;\n  cursor: pointer;\n  min-width: 200px;\n}\n\n.camera-selector select:hover {\n  border-color: #3498db;\n}\n\n.camera-selector select:focus {\n  outline: none;\n  border-color: #3498db;\n  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 551:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 1234:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 3556:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 4530:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 5281:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 5817:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 7244:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 7291:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 7291;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 8074:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 8108:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 8331:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// UNUSED EXPORTS: FaceDetectionApp

// EXTERNAL MODULE: ./node_modules/@vladmandic/face-api/dist/face-api.esm.js
var face_api_esm = __webpack_require__(1909);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(365);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/config.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Application configuration module
 * Handles runtime configuration including prefix support
 */

var AppConfig = /*#__PURE__*/function () {
  function AppConfig() {
    _classCallCheck(this, AppConfig);
    this.config = this.loadConfig();
  }
  return _createClass(AppConfig, [{
    key: "loadConfig",
    value: function loadConfig() {
      // Default configuration
      var defaultConfig = {
        prefix: '',
        modelPath: '/models',
        basePath: ''
      };

      // Try to load from window.APP_CONFIG (injected by nginx/entrypoint)
      if (typeof window !== 'undefined' && window.APP_CONFIG) {
        return _objectSpread(_objectSpread({}, defaultConfig), window.APP_CONFIG);
      }

      // Fallback: Try to detect prefix from current URL path
      if (typeof window !== 'undefined' && window.location) {
        var path = window.location.pathname;
        var pathParts = path.split('/').filter(Boolean);

        // Simple heuristic: if we're not at root and the first part doesn't look like a file
        if (pathParts.length > 0 && !pathParts[0].includes('.')) {
          var detectedPrefix = "/".concat(pathParts[0]);
          return _objectSpread(_objectSpread({}, defaultConfig), {}, {
            prefix: detectedPrefix,
            modelPath: "".concat(detectedPrefix, "/models"),
            basePath: detectedPrefix
          });
        }
      }
      return defaultConfig;
    }
  }, {
    key: "prefix",
    get: function get() {
      return this.config.prefix;
    }
  }, {
    key: "modelPath",
    get: function get() {
      return this.config.modelPath;
    }
  }, {
    key: "basePath",
    get: function get() {
      return this.config.basePath;
    }

    /**
     * Get full URL for a given path, with prefix support
     * @param {string} path - The path to prefix
     * @returns {string} - Full prefixed path
     */
  }, {
    key: "getPath",
    value: function getPath(path) {
      // Remove leading slash from path
      var cleanPath = path.replace(/^\//, '');

      // If no prefix, just return the path with leading slash
      if (!this.config.prefix) {
        return "/".concat(cleanPath);
      }

      // Return prefixed path
      return "".concat(this.config.prefix, "/").concat(cleanPath);
    }

    /**
     * Get model URL for face-api.js
     * @returns {string} - Model path URL
     */
  }, {
    key: "getModelUrl",
    value: function getModelUrl() {
      return this.config.modelPath;
    }

    /**
     * Debug information
     * @returns {object} - Current configuration
     */
  }, {
    key: "debug",
    value: function debug() {
      return {
        config: this.config,
        currentPath: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
        currentHost: typeof window !== 'undefined' ? window.location.host : 'N/A'
      };
    }
  }]);
}();

// Export singleton instance
var appConfig = new AppConfig();

// Export for backward compatibility
/* harmony default export */ const config = ((/* unused pure expression or super */ null && (appConfig)));
;// ./src/faceDetection.js
function faceDetection_typeof(o) { "@babel/helpers - typeof"; return faceDetection_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, faceDetection_typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function faceDetection_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function faceDetection_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? faceDetection_ownKeys(Object(t), !0).forEach(function (r) { faceDetection_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : faceDetection_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function faceDetection_defineProperty(e, r, t) { return (r = faceDetection_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function faceDetection_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function faceDetection_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, faceDetection_toPropertyKey(o.key), o); } }
function faceDetection_createClass(e, r, t) { return r && faceDetection_defineProperties(e.prototype, r), t && faceDetection_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function faceDetection_toPropertyKey(t) { var i = faceDetection_toPrimitive(t, "string"); return "symbol" == faceDetection_typeof(i) ? i : i + ""; }
function faceDetection_toPrimitive(t, r) { if ("object" != faceDetection_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != faceDetection_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var FaceDetector = /*#__PURE__*/function () {
  function FaceDetector() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    faceDetection_classCallCheck(this, FaceDetector);
    this.options = faceDetection_objectSpread({
      modelPath: options.modelPath || appConfig.getModelUrl(),
      detectionThreshold: options.detectionThreshold || 0.5,
      inputSize: options.inputSize || 416
    }, options);
    this.isModelLoaded = false;
    this.detector = null;
  }
  return faceDetection_createClass(FaceDetector, [{
    key: "loadModel",
    value: function () {
      var _loadModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return face_api_esm/* nets */.B0.tinyFaceDetector.loadFromUri(this.options.modelPath);
            case 1:
              this.detector = new face_api_esm/* TinyFaceDetectorOptions */.ex({
                inputSize: this.options.inputSize,
                scoreThreshold: this.options.detectionThreshold
              });
              this.isModelLoaded = true;
              return _context.a(2, true);
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Failed to load face detection model:', _t);
              throw new Error('Model loading failed: ' + _t.message);
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function loadModel() {
        return _loadModel.apply(this, arguments);
      }
      return loadModel;
    }()
  }, {
    key: "detect",
    value: function () {
      var _detect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(input) {
        var detections, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (this.isModelLoaded) {
                _context2.n = 1;
                break;
              }
              throw new Error('Model not loaded. Call loadModel() first.');
            case 1:
              _context2.p = 1;
              _context2.n = 2;
              return face_api_esm/* detectAllFaces */.R(input, this.detector);
            case 2:
              detections = _context2.v;
              return _context2.a(2, detections);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error('Face detection failed:', _t2);
              return _context2.a(2, []);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function detect(_x) {
        return _detect.apply(this, arguments);
      }
      return detect;
    }()
  }, {
    key: "detectWithLandmarks",
    value: function () {
      var _detectWithLandmarks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(input) {
        var detections, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (this.isModelLoaded) {
                _context3.n = 1;
                break;
              }
              throw new Error('Model not loaded. Call loadModel() first.');
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return face_api_esm/* detectAllFaces */.R(input, this.detector).withFaceLandmarks();
            case 2:
              detections = _context3.v;
              return _context3.a(2, detections);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              console.error('Face detection with landmarks failed:', _t3);
              return _context3.a(2, []);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function detectWithLandmarks(_x2) {
        return _detectWithLandmarks.apply(this, arguments);
      }
      return detectWithLandmarks;
    }()
  }, {
    key: "setDetectionThreshold",
    value: function setDetectionThreshold(threshold) {
      if (threshold < 0 || threshold > 1) {
        throw new Error('Threshold must be between 0 and 1');
      }
      this.options.detectionThreshold = threshold;
      this.detector = new face_api_esm/* TinyFaceDetectorOptions */.ex({
        inputSize: this.options.inputSize,
        scoreThreshold: threshold
      });
    }
  }, {
    key: "setInputSize",
    value: function setInputSize(size) {
      var validSizes = [128, 160, 224, 320, 416, 512, 608];
      if (!validSizes.includes(size)) {
        throw new Error("Input size must be one of: ".concat(validSizes.join(', ')));
      }
      this.options.inputSize = size;
      this.detector = new face_api_esm/* TinyFaceDetectorOptions */.ex({
        inputSize: size,
        scoreThreshold: this.options.detectionThreshold
      });
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return faceDetection_objectSpread({}, this.options);
    }
  }, {
    key: "isReady",
    value: function isReady() {
      return this.isModelLoaded;
    }
  }]);
}();
/* harmony default export */ const faceDetection = (FaceDetector);
;// ./src/drawingUtils.js
function drawingUtils_typeof(o) { "@babel/helpers - typeof"; return drawingUtils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, drawingUtils_typeof(o); }
function drawingUtils_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function drawingUtils_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, drawingUtils_toPropertyKey(o.key), o); } }
function drawingUtils_createClass(e, r, t) { return r && drawingUtils_defineProperties(e.prototype, r), t && drawingUtils_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function drawingUtils_toPropertyKey(t) { var i = drawingUtils_toPrimitive(t, "string"); return "symbol" == drawingUtils_typeof(i) ? i : i + ""; }
function drawingUtils_toPrimitive(t, r) { if ("object" != drawingUtils_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != drawingUtils_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DrawingUtils = /*#__PURE__*/function () {
  function DrawingUtils() {
    var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    drawingUtils_classCallCheck(this, DrawingUtils);
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
  }
  return drawingUtils_createClass(DrawingUtils, [{
    key: "setCanvas",
    value: function setCanvas(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "drawBoundingBox",
    value: function drawBoundingBox(box) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#00ff00';
      var lineWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
      if (!this.ctx) return;
      var x = box.x,
        y = box.y,
        width = box.width,
        height = box.height;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.strokeRect(x, y, width, height);
    }
  }, {
    key: "drawFilledBox",
    value: function drawFilledBox(box) {
      var fillColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgba(0, 255, 0, 0.2)';
      var borderColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#00ff00';
      var borderWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
      if (!this.ctx) return;
      var x = box.x,
        y = box.y,
        width = box.width,
        height = box.height;

      // Fill
      this.ctx.fillStyle = fillColor;
      this.ctx.fillRect(x, y, width, height);

      // Border
      if (borderWidth > 0) {
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = borderWidth;
        this.ctx.strokeRect(x, y, width, height);
      }
    }
  }, {
    key: "drawText",
    value: function drawText(text, x, y) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!this.ctx) return;
      var _options$color = options.color,
        color = _options$color === void 0 ? '#ffffff' : _options$color,
        _options$font = options.font,
        font = _options$font === void 0 ? '16px Arial' : _options$font,
        _options$align = options.align,
        align = _options$align === void 0 ? 'left' : _options$align,
        _options$baseline = options.baseline,
        baseline = _options$baseline === void 0 ? 'top' : _options$baseline,
        _options$backgroundCo = options.backgroundColor,
        backgroundColor = _options$backgroundCo === void 0 ? null : _options$backgroundCo,
        _options$padding = options.padding,
        padding = _options$padding === void 0 ? 0 : _options$padding,
        _options$borderRadius = options.borderRadius,
        borderRadius = _options$borderRadius === void 0 ? 0 : _options$borderRadius;
      this.ctx.font = font;
      this.ctx.textAlign = align;
      this.ctx.textBaseline = baseline;

      // Measure text for background
      var metrics = this.ctx.measureText(text);
      var textWidth = metrics.width;
      var textHeight = parseInt(font); // Approximate height

      // Draw background if specified
      if (backgroundColor) {
        if (borderRadius > 0) {
          this.drawRoundedRect(x - padding, y - padding, textWidth + padding * 2, textHeight + padding * 2, borderRadius, backgroundColor);
        } else {
          this.ctx.fillStyle = backgroundColor;
          this.ctx.fillRect(x - padding, y - padding, textWidth + padding * 2, textHeight + padding * 2);
        }
      }

      // Draw text
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, x, y);
    }
  }, {
    key: "drawRoundedRect",
    value: function drawRoundedRect(x, y, width, height, radius, fillColor) {
      if (!this.ctx) return;
      this.ctx.fillStyle = fillColor;
      this.ctx.beginPath();
      this.ctx.moveTo(x + radius, y);
      this.ctx.lineTo(x + width - radius, y);
      this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.ctx.lineTo(x + width, y + height - radius);
      this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.ctx.lineTo(x + radius, y + height);
      this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.ctx.lineTo(x, y + radius);
      this.ctx.quadraticCurveTo(x, y, x + radius, y);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }, {
    key: "drawPoint",
    value: function drawPoint(x, y) {
      var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
      var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#ff0000';
      if (!this.ctx) return;
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }, {
    key: "drawLine",
    value: function drawLine(x1, y1, x2, y2) {
      var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#00ff00';
      var lineWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      if (!this.ctx) return;
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }, {
    key: "drawPolygon",
    value: function drawPolygon(points) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.ctx || !points || points.length < 3) return;
      var _options$fillColor = options.fillColor,
        fillColor = _options$fillColor === void 0 ? null : _options$fillColor,
        _options$strokeColor = options.strokeColor,
        strokeColor = _options$strokeColor === void 0 ? '#00ff00' : _options$strokeColor,
        _options$lineWidth = options.lineWidth,
        lineWidth = _options$lineWidth === void 0 ? 1 : _options$lineWidth,
        _options$closed = options.closed,
        closed = _options$closed === void 0 ? true : _options$closed;
      this.ctx.beginPath();
      this.ctx.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i].x, points[i].y);
      }
      if (closed) {
        this.ctx.closePath();
      }
      if (fillColor) {
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
      }
      if (strokeColor && lineWidth > 0) {
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
      }
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y, radius) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!this.ctx) return;
      var _options$fillColor2 = options.fillColor,
        fillColor = _options$fillColor2 === void 0 ? null : _options$fillColor2,
        _options$strokeColor2 = options.strokeColor,
        strokeColor = _options$strokeColor2 === void 0 ? '#00ff00' : _options$strokeColor2,
        _options$lineWidth2 = options.lineWidth,
        lineWidth = _options$lineWidth2 === void 0 ? 1 : _options$lineWidth2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      if (fillColor) {
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
      }
      if (strokeColor && lineWidth > 0) {
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
      }
    }
  }, {
    key: "drawImage",
    value: function drawImage(image, x, y) {
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      if (!this.ctx) return;
      if (width && height) {
        this.ctx.drawImage(image, x, y, width, height);
      } else {
        this.ctx.drawImage(image, x, y);
      }
    }
  }, {
    key: "setGlobalAlpha",
    value: function setGlobalAlpha(alpha) {
      if (!this.ctx) return;
      this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    }
  }, {
    key: "save",
    value: function save() {
      if (!this.ctx) return;
      this.ctx.save();
    }
  }, {
    key: "restore",
    value: function restore() {
      if (!this.ctx) return;
      this.ctx.restore();
    }
  }, {
    key: "measureText",
    value: function measureText(text) {
      var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '16px Arial';
      if (!this.ctx) return {
        width: 0,
        height: 0
      };
      var previousFont = this.ctx.font;
      this.ctx.font = font;
      var metrics = this.ctx.measureText(text);
      this.ctx.font = previousFont;
      return {
        width: metrics.width,
        height: parseInt(font) // Approximate height
      };
    }
  }]);
}();
/* harmony default export */ const drawingUtils = ((/* unused pure expression or super */ null && (DrawingUtils)));
;// ./src/cameraUtils.js
function cameraUtils_typeof(o) { "@babel/helpers - typeof"; return cameraUtils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, cameraUtils_typeof(o); }
function cameraUtils_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return cameraUtils_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (cameraUtils_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, cameraUtils_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, cameraUtils_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), cameraUtils_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", cameraUtils_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), cameraUtils_regeneratorDefine2(u), cameraUtils_regeneratorDefine2(u, o, "Generator"), cameraUtils_regeneratorDefine2(u, n, function () { return this; }), cameraUtils_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (cameraUtils_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function cameraUtils_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } cameraUtils_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { cameraUtils_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, cameraUtils_regeneratorDefine2(e, r, n, t); }
function cameraUtils_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function cameraUtils_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { cameraUtils_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { cameraUtils_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function cameraUtils_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function cameraUtils_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? cameraUtils_ownKeys(Object(t), !0).forEach(function (r) { cameraUtils_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : cameraUtils_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function cameraUtils_defineProperty(e, r, t) { return (r = cameraUtils_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function cameraUtils_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function cameraUtils_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, cameraUtils_toPropertyKey(o.key), o); } }
function cameraUtils_createClass(e, r, t) { return r && cameraUtils_defineProperties(e.prototype, r), t && cameraUtils_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function cameraUtils_toPropertyKey(t) { var i = cameraUtils_toPrimitive(t, "string"); return "symbol" == cameraUtils_typeof(i) ? i : i + ""; }
function cameraUtils_toPrimitive(t, r) { if ("object" != cameraUtils_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != cameraUtils_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CameraManager = /*#__PURE__*/function () {
  function CameraManager() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    cameraUtils_classCallCheck(this, CameraManager);
    this.options = cameraUtils_objectSpread({
      preferredWidth: options.preferredWidth || 640,
      preferredHeight: options.preferredHeight || 480,
      facingMode: options.facingMode || 'user'
    }, options);
    this.stream = null;
    this.videoElement = null;
    this.isActive = false;
  }
  return cameraUtils_createClass(CameraManager, [{
    key: "startCamera",
    value: function () {
      var _startCamera = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee(videoElement) {
        var constraints, _t;
        return cameraUtils_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!this.isActive) {
                _context.n = 1;
                break;
              }
              console.warn('Camera is already active');
              return _context.a(2, this.stream);
            case 1:
              this.videoElement = videoElement;
              _context.p = 2;
              if (!(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
                _context.n = 3;
                break;
              }
              throw new Error('getUserMedia is not supported in this browser');
            case 3:
              // Get constraints using the updated method
              constraints = this.getCameraConstraints();
              _context.n = 4;
              return navigator.mediaDevices.getUserMedia(constraints);
            case 4:
              this.stream = _context.v;
              // Attach stream to video element
              this.videoElement.srcObject = this.stream;

              // Wait for video to be ready
              _context.n = 5;
              return this.waitForVideoReady();
            case 5:
              this.isActive = true;
              return _context.a(2, this.stream);
            case 6:
              _context.p = 6;
              _t = _context.v;
              this.handleCameraError(_t);
              throw _t;
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[2, 6]]);
      }));
      function startCamera(_x) {
        return _startCamera.apply(this, arguments);
      }
      return startCamera;
    }()
  }, {
    key: "waitForVideoReady",
    value: function () {
      var _waitForVideoReady = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee2() {
        var _this = this;
        return cameraUtils_regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, new Promise(function (resolve, reject) {
                if (_this.videoElement.readyState >= 2) {
                  resolve();
                  return;
                }
                var timeout = setTimeout(function () {
                  reject(new Error('Video loading timeout'));
                }, 10000);
                _this.videoElement.addEventListener('loadedmetadata', function () {
                  clearTimeout(timeout);
                  resolve();
                }, {
                  once: true
                });
                _this.videoElement.addEventListener('error', function (error) {
                  clearTimeout(timeout);
                  reject(error);
                }, {
                  once: true
                });
              }));
          }
        }, _callee2);
      }));
      function waitForVideoReady() {
        return _waitForVideoReady.apply(this, arguments);
      }
      return waitForVideoReady;
    }()
  }, {
    key: "handleCameraError",
    value: function handleCameraError(error) {
      var errorMessage = 'Camera access error: ';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage += 'Camera permission denied. Please allow camera access.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage += 'Camera is already in use by another application.';
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMessage += 'Camera does not support the requested resolution.';
      } else if (error.name === 'TypeError') {
        errorMessage += 'Invalid camera constraints.';
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }, {
    key: "stopCamera",
    value: function () {
      var _stopCamera = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee3() {
        return cameraUtils_regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (this.stream) {
                // Stop all tracks
                this.stream.getTracks().forEach(function (track) {
                  track.stop();
                });

                // Clear video source
                if (this.videoElement) {
                  this.videoElement.srcObject = null;
                }
                this.stream = null;
                this.isActive = false;
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function stopCamera() {
        return _stopCamera.apply(this, arguments);
      }
      return stopCamera;
    }()
  }, {
    key: "switchCamera",
    value: function () {
      var _switchCamera = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee4() {
        return cameraUtils_regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this.isActive) {
                _context4.n = 1;
                break;
              }
              throw new Error('Camera is not active');
            case 1:
              // Toggle facing mode
              this.options.facingMode = this.options.facingMode === 'user' ? 'environment' : 'user';

              // Stop current camera
              _context4.n = 2;
              return this.stopCamera();
            case 2:
              _context4.n = 3;
              return this.startCamera(this.videoElement);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function switchCamera() {
        return _switchCamera.apply(this, arguments);
      }
      return switchCamera;
    }()
  }, {
    key: "getAvailableCameras",
    value: function () {
      var _getAvailableCameras = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee5() {
        var tempStream, devices, cameras, _t2, _t3;
        return cameraUtils_regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              if (this.stream) {
                _context5.n = 4;
                break;
              }
              _context5.p = 1;
              _context5.n = 2;
              return navigator.mediaDevices.getUserMedia({
                video: true
              });
            case 2:
              tempStream = _context5.v;
              tempStream.getTracks().forEach(function (track) {
                return track.stop();
              });
              _context5.n = 4;
              break;
            case 3:
              _context5.p = 3;
              _t2 = _context5.v;
              // User denied permission or no cameras available
              console.warn('Camera permission not granted:', _t2);
            case 4:
              _context5.n = 5;
              return navigator.mediaDevices.enumerateDevices();
            case 5:
              devices = _context5.v;
              cameras = devices.filter(function (device) {
                return device.kind === 'videoinput';
              }); // Add friendly names if labels are empty
              return _context5.a(2, cameras.map(function (camera, index) {
                return {
                  deviceId: camera.deviceId,
                  label: camera.label || "Camera ".concat(index + 1),
                  groupId: camera.groupId
                };
              }));
            case 6:
              _context5.p = 6;
              _t3 = _context5.v;
              console.error('Failed to enumerate devices:', _t3);
              return _context5.a(2, []);
          }
        }, _callee5, this, [[1, 3], [0, 6]]);
      }));
      function getAvailableCameras() {
        return _getAvailableCameras.apply(this, arguments);
      }
      return getAvailableCameras;
    }()
  }, {
    key: "selectCamera",
    value: function () {
      var _selectCamera = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee6(deviceId) {
        return cameraUtils_regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (deviceId) {
                _context6.n = 1;
                break;
              }
              throw new Error('Device ID is required');
            case 1:
              this.options.deviceId = deviceId;
              if (!this.isActive) {
                _context6.n = 3;
                break;
              }
              _context6.n = 2;
              return this.stopCamera();
            case 2:
              _context6.n = 3;
              return this.startCamera(this.videoElement);
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function selectCamera(_x2) {
        return _selectCamera.apply(this, arguments);
      }
      return selectCamera;
    }()
  }, {
    key: "getCameraConstraints",
    value: function getCameraConstraints() {
      var constraints = {
        video: {
          width: {
            ideal: this.options.preferredWidth
          },
          height: {
            ideal: this.options.preferredHeight
          }
        }
      };
      if (this.options.deviceId) {
        constraints.video.deviceId = {
          exact: this.options.deviceId
        };
      } else {
        constraints.video.facingMode = this.options.facingMode;
      }
      return constraints;
    }
  }, {
    key: "getStreamInfo",
    value: function getStreamInfo() {
      if (!this.stream || !this.stream.active) {
        return null;
      }
      var videoTrack = this.stream.getVideoTracks()[0];
      if (!videoTrack) {
        return null;
      }
      var settings = videoTrack.getSettings();
      return {
        width: settings.width,
        height: settings.height,
        frameRate: settings.frameRate,
        deviceId: settings.deviceId,
        facingMode: settings.facingMode,
        label: videoTrack.label
      };
    }
  }, {
    key: "isStreamActive",
    value: function isStreamActive() {
      return this.isActive && this.stream && this.stream.active;
    }
  }, {
    key: "takeSnapshot",
    value: function () {
      var _takeSnapshot = cameraUtils_asyncToGenerator(/*#__PURE__*/cameraUtils_regenerator().m(function _callee7() {
        var canvas, ctx;
        return cameraUtils_regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!(!this.videoElement || !this.isActive)) {
                _context7.n = 1;
                break;
              }
              throw new Error('Camera is not active');
            case 1:
              canvas = document.createElement('canvas');
              canvas.width = this.videoElement.videoWidth;
              canvas.height = this.videoElement.videoHeight;
              ctx = canvas.getContext('2d');
              ctx.drawImage(this.videoElement, 0, 0);
              return _context7.a(2, canvas.toDataURL('image/png'));
          }
        }, _callee7, this);
      }));
      function takeSnapshot() {
        return _takeSnapshot.apply(this, arguments);
      }
      return takeSnapshot;
    }()
  }]);
}();
/* harmony default export */ const cameraUtils = ((/* unused pure expression or super */ null && (CameraManager)));
;// ./src/performanceMonitor.js
function performanceMonitor_typeof(o) { "@babel/helpers - typeof"; return performanceMonitor_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, performanceMonitor_typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function performanceMonitor_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return performanceMonitor_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (performanceMonitor_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, performanceMonitor_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, performanceMonitor_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), performanceMonitor_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", performanceMonitor_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), performanceMonitor_regeneratorDefine2(u), performanceMonitor_regeneratorDefine2(u, o, "Generator"), performanceMonitor_regeneratorDefine2(u, n, function () { return this; }), performanceMonitor_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (performanceMonitor_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function performanceMonitor_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } performanceMonitor_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { performanceMonitor_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, performanceMonitor_regeneratorDefine2(e, r, n, t); }
function performanceMonitor_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function performanceMonitor_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { performanceMonitor_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { performanceMonitor_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function performanceMonitor_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function performanceMonitor_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? performanceMonitor_ownKeys(Object(t), !0).forEach(function (r) { performanceMonitor_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : performanceMonitor_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function performanceMonitor_defineProperty(e, r, t) { return (r = performanceMonitor_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function performanceMonitor_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function performanceMonitor_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, performanceMonitor_toPropertyKey(o.key), o); } }
function performanceMonitor_createClass(e, r, t) { return r && performanceMonitor_defineProperties(e.prototype, r), t && performanceMonitor_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function performanceMonitor_toPropertyKey(t) { var i = performanceMonitor_toPrimitive(t, "string"); return "symbol" == performanceMonitor_typeof(i) ? i : i + ""; }
function performanceMonitor_toPrimitive(t, r) { if ("object" != performanceMonitor_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != performanceMonitor_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PerformanceMonitor = /*#__PURE__*/function () {
  function PerformanceMonitor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    performanceMonitor_classCallCheck(this, PerformanceMonitor);
    this.options = performanceMonitor_objectSpread({
      sampleSize: options.sampleSize || 60,
      // Keep last 60 frames for FPS calculation
      warningThreshold: options.warningThreshold || 15
    }, options);
    this.reset();
  }
  return performanceMonitor_createClass(PerformanceMonitor, [{
    key: "reset",
    value: function reset() {
      this.frameTimes = [];
      this.frameStartTime = 0;
      this.lastFrameTime = 0;
      this.totalFrames = 0;
      this.metrics = new Map();
      this.startTime = performance.now();
    }
  }, {
    key: "startFrame",
    value: function startFrame() {
      this.frameStartTime = performance.now();
    }
  }, {
    key: "endFrame",
    value: function endFrame() {
      if (this.frameStartTime === 0) return;
      var frameTime = performance.now() - this.frameStartTime;
      this.frameTimes.push(frameTime);

      // Keep only the last N samples
      if (this.frameTimes.length > this.options.sampleSize) {
        this.frameTimes.shift();
      }
      this.lastFrameTime = performance.now();
      this.totalFrames++;
      this.frameStartTime = 0;
    }
  }, {
    key: "getCurrentFPS",
    value: function getCurrentFPS() {
      if (this.frameTimes.length < 2) return 0;
      var averageFrameTime = this.getAverageFrameTime();
      if (averageFrameTime === 0) return 0;
      return Math.round(1000 / averageFrameTime);
    }
  }, {
    key: "getAverageFrameTime",
    value: function getAverageFrameTime() {
      if (this.frameTimes.length === 0) return 0;
      var sum = this.frameTimes.reduce(function (acc, time) {
        return acc + time;
      }, 0);
      return sum / this.frameTimes.length;
    }
  }, {
    key: "getMinFrameTime",
    value: function getMinFrameTime() {
      if (this.frameTimes.length === 0) return 0;
      return Math.min.apply(Math, _toConsumableArray(this.frameTimes));
    }
  }, {
    key: "getMaxFrameTime",
    value: function getMaxFrameTime() {
      if (this.frameTimes.length === 0) return 0;
      return Math.max.apply(Math, _toConsumableArray(this.frameTimes));
    }
  }, {
    key: "start",
    value: function start(label) {
      this.metrics.set(label, {
        startTime: performance.now(),
        endTime: null,
        duration: null
      });
    }
  }, {
    key: "end",
    value: function end(label) {
      var metric = this.metrics.get(label);
      if (!metric || metric.endTime !== null) {
        console.warn("Performance metric \"".concat(label, "\" not started or already ended"));
        return 0;
      }
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      return metric.duration;
    }
  }, {
    key: "measure",
    value: function measure(label, fn) {
      var _this = this;
      this.start(label);
      try {
        var result = fn();
        if (result instanceof Promise) {
          return result["finally"](function () {
            return _this.end(label);
          });
        }
        this.end(label);
        return result;
      } catch (error) {
        this.end(label);
        throw error;
      }
    }
  }, {
    key: "measureAsync",
    value: function () {
      var _measureAsync = performanceMonitor_asyncToGenerator(/*#__PURE__*/performanceMonitor_regenerator().m(function _callee(label, asyncFn) {
        var result, _t;
        return performanceMonitor_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              this.start(label);
              _context.p = 1;
              _context.n = 2;
              return asyncFn();
            case 2:
              result = _context.v;
              this.end(label);
              return _context.a(2, result);
            case 3:
              _context.p = 3;
              _t = _context.v;
              this.end(label);
              throw _t;
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function measureAsync(_x, _x2) {
        return _measureAsync.apply(this, arguments);
      }
      return measureAsync;
    }()
  }, {
    key: "getMetric",
    value: function getMetric(label) {
      var metric = this.metrics.get(label);
      if (!metric || metric.duration === null) {
        return null;
      }
      return metric.duration;
    }
  }, {
    key: "getAllMetrics",
    value: function getAllMetrics() {
      var results = {};
      var _iterator = _createForOfIteratorHelper(this.metrics),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            label = _step$value[0],
            metric = _step$value[1];
          if (metric.duration !== null) {
            results[label] = metric.duration;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return results;
    }
  }, {
    key: "getSummary",
    value: function getSummary() {
      var fps = this.getCurrentFPS();
      var avgFrameTime = this.getAverageFrameTime();
      var minFrameTime = this.getMinFrameTime();
      var maxFrameTime = this.getMaxFrameTime();
      var totalTime = performance.now() - this.startTime;
      return {
        fps: fps,
        avgFrameTime: avgFrameTime,
        minFrameTime: minFrameTime,
        maxFrameTime: maxFrameTime,
        totalFrames: this.totalFrames,
        totalTime: totalTime,
        averageFPS: this.totalFrames / (totalTime / 1000),
        isPerformanceGood: fps >= this.options.warningThreshold,
        metrics: this.getAllMetrics()
      };
    }
  }, {
    key: "getFrameTimeDistribution",
    value: function getFrameTimeDistribution() {
      if (this.frameTimes.length === 0) return {};
      var buckets = {
        '<16ms': 0,
        '16-33ms': 0,
        '33-50ms': 0,
        '50-100ms': 0,
        '>100ms': 0
      };
      this.frameTimes.forEach(function (time) {
        if (time < 16) buckets['<16ms']++;else if (time < 33) buckets['16-33ms']++;else if (time < 50) buckets['33-50ms']++;else if (time < 100) buckets['50-100ms']++;else buckets['>100ms']++;
      });
      return buckets;
    }
  }, {
    key: "getPerformanceScore",
    value: function getPerformanceScore() {
      var fps = this.getCurrentFPS();
      var avgFrameTime = this.getAverageFrameTime();

      // Score based on FPS (0-50 points)
      var fpsScore = Math.min(50, fps / 60 * 50);

      // Score based on frame time consistency (0-50 points)
      var minTime = this.getMinFrameTime();
      var maxTime = this.getMaxFrameTime();
      var variance = maxTime - minTime;
      var consistencyScore = Math.max(0, 50 - variance);
      return Math.round(fpsScore + consistencyScore);
    }
  }, {
    key: "logSummary",
    value: function logSummary() {
      var summary = this.getSummary();
      console.group('Performance Summary');
      console.log("FPS: ".concat(summary.fps));
      console.log("Average Frame Time: ".concat(summary.avgFrameTime.toFixed(2), "ms"));
      console.log("Frame Time Range: ".concat(summary.minFrameTime.toFixed(2), "ms - ").concat(summary.maxFrameTime.toFixed(2), "ms"));
      console.log("Total Frames: ".concat(summary.totalFrames));
      console.log("Total Time: ".concat((summary.totalTime / 1000).toFixed(2), "s"));
      console.log("Performance Score: ".concat(this.getPerformanceScore(), "/100"));
      var distribution = this.getFrameTimeDistribution();
      console.log('Frame Time Distribution:', distribution);
      if (Object.keys(summary.metrics).length > 0) {
        console.log('Custom Metrics:', summary.metrics);
      }
      console.groupEnd();
    }
  }]);
}();

// Static instance for global performance monitoring
PerformanceMonitor.global = new PerformanceMonitor();
/* harmony default export */ const performanceMonitor = ((/* unused pure expression or super */ null && (PerformanceMonitor)));
;// ./src/liteMode.js
function liteMode_typeof(o) { "@babel/helpers - typeof"; return liteMode_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, liteMode_typeof(o); }
function liteMode_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return liteMode_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (liteMode_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, liteMode_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, liteMode_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), liteMode_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", liteMode_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), liteMode_regeneratorDefine2(u), liteMode_regeneratorDefine2(u, o, "Generator"), liteMode_regeneratorDefine2(u, n, function () { return this; }), liteMode_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (liteMode_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function liteMode_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } liteMode_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { liteMode_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, liteMode_regeneratorDefine2(e, r, n, t); }
function liteMode_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function liteMode_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { liteMode_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { liteMode_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function liteMode_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function liteMode_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? liteMode_ownKeys(Object(t), !0).forEach(function (r) { liteMode_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : liteMode_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function liteMode_defineProperty(e, r, t) { return (r = liteMode_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function liteMode_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function liteMode_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, liteMode_toPropertyKey(o.key), o); } }
function liteMode_createClass(e, r, t) { return r && liteMode_defineProperties(e.prototype, r), t && liteMode_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function liteMode_toPropertyKey(t) { var i = liteMode_toPrimitive(t, "string"); return "symbol" == liteMode_typeof(i) ? i : i + ""; }
function liteMode_toPrimitive(t, r) { if ("object" != liteMode_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != liteMode_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var LiteModeDetector = /*#__PURE__*/function () {
  function LiteModeDetector() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    liteMode_classCallCheck(this, LiteModeDetector);
    this.options = liteMode_objectSpread({
      targetFPS: options.targetFPS || 30,
      frameSkip: options.frameSkip || 0,
      showConfidence: options.showConfidence !== false,
      boundingBoxColor: options.boundingBoxColor || '#00ff00',
      boundingBoxWidth: options.boundingBoxWidth || 2,
      confidenceThreshold: options.confidenceThreshold || 0.5
    }, options);
    this.detector = new faceDetection({
      detectionThreshold: this.options.confidenceThreshold
    });
    this.drawingUtils = new DrawingUtils();
    this.cameraManager = new CameraManager();
    this.performanceMonitor = new PerformanceMonitor();
    this.video = null;
    this.canvas = null;
    this.isRunning = false;
    this.frameCount = 0;
    this.animationId = null;
  }
  return liteMode_createClass(LiteModeDetector, [{
    key: "initialize",
    value: function () {
      var _initialize = liteMode_asyncToGenerator(/*#__PURE__*/liteMode_regenerator().m(function _callee(videoElement, canvasElement) {
        return liteMode_regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.video = videoElement;
              this.canvas = canvasElement;

              // Load the face detection model
              _context.n = 1;
              return this.detector.loadModel();
            case 1:
              _context.n = 2;
              return this.cameraManager.startCamera(this.video);
            case 2:
              // Adjust canvas size to match video
              this.adjustCanvasSize();

              // Initialize drawing utils with canvas
              this.drawingUtils.setCanvas(this.canvas);
              return _context.a(2, true);
          }
        }, _callee, this);
      }));
      function initialize(_x, _x2) {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "adjustCanvasSize",
    value: function adjustCanvasSize() {
      if (this.video && this.canvas) {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
      }
    }
  }, {
    key: "start",
    value: function start() {
      if (this.isRunning) {
        console.warn('Lite mode detection is already running');
        return;
      }
      this.isRunning = true;
      this.frameCount = 0;
      this.performanceMonitor.reset();
      this.detectLoop();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isRunning = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }

      // Clear the canvas
      this.drawingUtils.clear();

      // Log performance summary
      var summary = this.performanceMonitor.getSummary();
      console.log('Performance Summary:', summary);
    }
  }, {
    key: "detectLoop",
    value: function () {
      var _detectLoop = liteMode_asyncToGenerator(/*#__PURE__*/liteMode_regenerator().m(function _callee2() {
        var _this = this;
        var detections, displaySize, resizedDetections, _t;
        return liteMode_regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (this.isRunning) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this.performanceMonitor.startFrame();

              // Skip frames if configured
              if (!(this.options.frameSkip > 0 && this.frameCount % (this.options.frameSkip + 1) !== 0)) {
                _context2.n = 2;
                break;
              }
              this.frameCount++;
              this.animationId = requestAnimationFrame(function () {
                return _this.detectLoop();
              });
              return _context2.a(2);
            case 2:
              _context2.p = 2;
              _context2.n = 3;
              return this.detector.detect(this.video);
            case 3:
              detections = _context2.v;
              // Resize results to match display size
              displaySize = {
                width: this.video.videoWidth,
                height: this.video.videoHeight
              };
              resizedDetections = face_api_esm/* resizeResults */.Lz(detections, displaySize); // Clear previous drawings
              this.drawingUtils.clear();

              // Draw bounding boxes for each detection
              resizedDetections.forEach(function (detection) {
                var box = detection.box || detection.detection.box;
                var score = detection.score || detection.detection.score;

                // Draw bounding box
                _this.drawingUtils.drawBoundingBox(box, _this.options.boundingBoxColor, _this.options.boundingBoxWidth);

                // Draw confidence score if enabled
                if (_this.options.showConfidence) {
                  var confidence = Math.round(score * 100);
                  _this.drawingUtils.drawText("".concat(confidence, "%"), box.x, box.y - 5, {
                    color: _this.options.boundingBoxColor,
                    font: '14px Arial',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: 2
                  });
                }
              });

              // Update performance metrics
              this.performanceMonitor.endFrame();
              this.updatePerformanceDisplay();
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              console.error('Detection error:', _t);
            case 5:
              this.frameCount++;
              this.animationId = requestAnimationFrame(function () {
                return _this.detectLoop();
              });
            case 6:
              return _context2.a(2);
          }
        }, _callee2, this, [[2, 4]]);
      }));
      function detectLoop() {
        return _detectLoop.apply(this, arguments);
      }
      return detectLoop;
    }()
  }, {
    key: "updatePerformanceDisplay",
    value: function updatePerformanceDisplay() {
      var fps = this.performanceMonitor.getCurrentFPS();
      var avgDetectionTime = this.performanceMonitor.getAverageFrameTime();

      // Draw FPS counter
      this.drawingUtils.drawText("FPS: ".concat(fps), 10, 25, {
        color: fps >= 15 ? '#00ff00' : '#ff0000',
        font: '16px Arial',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 5
      });

      // Draw detection time
      this.drawingUtils.drawText("Detection: ".concat(avgDetectionTime.toFixed(1), "ms"), 10, 50, {
        color: '#00ff00',
        font: '14px Arial',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 5
      });
    }
  }, {
    key: "setDetectionThreshold",
    value: function setDetectionThreshold(threshold) {
      this.options.confidenceThreshold = threshold;
      this.detector.setDetectionThreshold(threshold);
    }
  }, {
    key: "setFrameSkip",
    value: function setFrameSkip(skip) {
      if (skip < 0) {
        throw new Error('Frame skip must be non-negative');
      }
      this.options.frameSkip = skip;
    }
  }, {
    key: "setBoundingBoxStyle",
    value: function setBoundingBoxStyle(color, width) {
      if (color) this.options.boundingBoxColor = color;
      if (width) this.options.boundingBoxWidth = width;
    }
  }, {
    key: "getPerformanceStats",
    value: function getPerformanceStats() {
      return this.performanceMonitor.getSummary();
    }
  }, {
    key: "cleanup",
    value: function () {
      var _cleanup = liteMode_asyncToGenerator(/*#__PURE__*/liteMode_regenerator().m(function _callee3() {
        return liteMode_regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.stop();
              _context3.n = 1;
              return this.cameraManager.stopCamera();
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function cleanup() {
        return _cleanup.apply(this, arguments);
      }
      return cleanup;
    }()
  }]);
}();
/* harmony default export */ const liteMode = ((/* unused pure expression or super */ null && (LiteModeDetector)));
;// ./src/landmarkDrawing.js
function landmarkDrawing_slicedToArray(r, e) { return landmarkDrawing_arrayWithHoles(r) || landmarkDrawing_iterableToArrayLimit(r, e) || landmarkDrawing_unsupportedIterableToArray(r, e) || landmarkDrawing_nonIterableRest(); }
function landmarkDrawing_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function landmarkDrawing_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function landmarkDrawing_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function landmarkDrawing_toConsumableArray(r) { return landmarkDrawing_arrayWithoutHoles(r) || landmarkDrawing_iterableToArray(r) || landmarkDrawing_unsupportedIterableToArray(r) || landmarkDrawing_nonIterableSpread(); }
function landmarkDrawing_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function landmarkDrawing_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return landmarkDrawing_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? landmarkDrawing_arrayLikeToArray(r, a) : void 0; } }
function landmarkDrawing_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function landmarkDrawing_arrayWithoutHoles(r) { if (Array.isArray(r)) return landmarkDrawing_arrayLikeToArray(r); }
function landmarkDrawing_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Advanced Landmark Drawing Utilities for Pro Mode
 * Handles 68-point facial landmarks visualization with connections
 */

// Define landmark point indices for different facial regions
var FACIAL_REGIONS = {
  jawline: landmarkDrawing_toConsumableArray(Array(17).keys()),
  // 0-16
  rightEyebrow: landmarkDrawing_toConsumableArray(Array(5).keys()).map(function (i) {
    return i + 17;
  }),
  // 17-21
  leftEyebrow: landmarkDrawing_toConsumableArray(Array(5).keys()).map(function (i) {
    return i + 22;
  }),
  // 22-26
  nose: landmarkDrawing_toConsumableArray(Array(9).keys()).map(function (i) {
    return i + 27;
  }),
  // 27-35
  rightEye: landmarkDrawing_toConsumableArray(Array(6).keys()).map(function (i) {
    return i + 36;
  }),
  // 36-41
  leftEye: landmarkDrawing_toConsumableArray(Array(6).keys()).map(function (i) {
    return i + 42;
  }),
  // 42-47
  outerMouth: landmarkDrawing_toConsumableArray(Array(12).keys()).map(function (i) {
    return i + 48;
  }),
  // 48-59
  innerMouth: landmarkDrawing_toConsumableArray(Array(8).keys()).map(function (i) {
    return i + 60;
  }) // 60-67
};

// Define connections between landmarks
var LANDMARK_CONNECTIONS = [].concat(landmarkDrawing_toConsumableArray(FACIAL_REGIONS.jawline.slice(0, -1).map(function (i, idx) {
  return [i, i + 1];
})), landmarkDrawing_toConsumableArray(FACIAL_REGIONS.rightEyebrow.slice(0, -1).map(function (i, idx) {
  return [i, i + 1];
})), landmarkDrawing_toConsumableArray(FACIAL_REGIONS.leftEyebrow.slice(0, -1).map(function (i, idx) {
  return [i, i + 1];
})), [
// Nose connections
[27, 28], [28, 29], [29, 30],
// Nose bridge
[30, 33],
// Nose tip
[31, 32], [32, 33], [33, 34], [34, 35],
// Nostrils
[31, 35]], landmarkDrawing_toConsumableArray(FACIAL_REGIONS.rightEye.map(function (i, idx) {
  return [i, FACIAL_REGIONS.rightEye[(idx + 1) % 6]];
})), landmarkDrawing_toConsumableArray(FACIAL_REGIONS.leftEye.map(function (i, idx) {
  return [i, FACIAL_REGIONS.leftEye[(idx + 1) % 6]];
})), landmarkDrawing_toConsumableArray(FACIAL_REGIONS.outerMouth.map(function (i, idx) {
  return [i, FACIAL_REGIONS.outerMouth[(idx + 1) % 12]];
})), landmarkDrawing_toConsumableArray(FACIAL_REGIONS.innerMouth.map(function (i, idx) {
  return [i, FACIAL_REGIONS.innerMouth[(idx + 1) % 8]];
})));
function drawLandmarks(ctx, landmarks, style) {
  var positions = landmarks.positions;

  // Draw landmark points
  positions.forEach(function (point, index) {
    var region = getRegionForPoint(index);
    var color = style.regionColors[region] || style.landmarkColor;

    // Draw point with glow effect
    ctx.beginPath();
    ctx.arc(point.x, point.y, style.landmarkSize + 1, 0, 2 * Math.PI);
    ctx.fillStyle = color + '40'; // Semi-transparent glow
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point.x, point.y, style.landmarkSize, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Draw connections between landmarks
  ctx.strokeStyle = style.connectionColor + '80'; // Semi-transparent connections
  ctx.lineWidth = 1;
  LANDMARK_CONNECTIONS.forEach(function (_ref) {
    var _ref2 = landmarkDrawing_slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];
    if (positions[start] && positions[end]) {
      ctx.beginPath();
      ctx.moveTo(positions[start].x, positions[start].y);
      ctx.lineTo(positions[end].x, positions[end].y);
      ctx.stroke();
    }
  });
}
function drawFaceContours(ctx, landmarks, style) {
  var positions = landmarks.positions;

  // Draw smooth contours for major facial features
  ctx.strokeStyle = style.contourColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Draw jawline contour
  drawSmoothCurve(ctx, FACIAL_REGIONS.jawline.map(function (i) {
    return positions[i];
  }));

  // Draw eyebrow contours
  drawSmoothCurve(ctx, FACIAL_REGIONS.rightEyebrow.map(function (i) {
    return positions[i];
  }));
  drawSmoothCurve(ctx, FACIAL_REGIONS.leftEyebrow.map(function (i) {
    return positions[i];
  }));

  // Draw eye contours
  drawSmoothCurve(ctx, FACIAL_REGIONS.rightEye.map(function (i) {
    return positions[i];
  }), true);
  drawSmoothCurve(ctx, FACIAL_REGIONS.leftEye.map(function (i) {
    return positions[i];
  }), true);

  // Draw mouth contours
  drawSmoothCurve(ctx, FACIAL_REGIONS.outerMouth.map(function (i) {
    return positions[i];
  }), true);
  drawSmoothCurve(ctx, FACIAL_REGIONS.innerMouth.map(function (i) {
    return positions[i];
  }), true);
}
function drawExpressions(ctx, expressions, box) {
  var sortedExpressions = Object.entries(expressions).filter(function (_ref3) {
    var _ref4 = landmarkDrawing_slicedToArray(_ref3, 2),
      _ = _ref4[0],
      value = _ref4[1];
    return value > 0.1;
  }) // Only show expressions above 10% confidence
  .sort(function (_ref5, _ref6) {
    var _ref7 = landmarkDrawing_slicedToArray(_ref5, 2),
      _ = _ref7[0],
      a = _ref7[1];
    var _ref8 = landmarkDrawing_slicedToArray(_ref6, 2),
      __ = _ref8[0],
      b = _ref8[1];
    return b - a;
  }).slice(0, 3); // Show top 3 expressions

  // Position expressions below the face box
  var yOffset = box.y + box.height + 20;
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  sortedExpressions.forEach(function (_ref9) {
    var _ref0 = landmarkDrawing_slicedToArray(_ref9, 2),
      expression = _ref0[0],
      value = _ref0[1];
    var percentage = Math.round(value * 100);
    var text = "".concat(expression, ": ").concat(percentage, "%");

    // Draw background for better readability
    var textWidth = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(box.x, yOffset - 14, textWidth + 10, 18);

    // Draw expression text
    ctx.fillStyle = getExpressionColor(expression, value);
    ctx.fillText(text, box.x + 5, yOffset);
    yOffset += 20;
  });
}
function drawAgeGender(ctx, age, gender, box) {
  var ageText = "Age: ".concat(Math.round(age));
  var genderText = "Gender: ".concat(gender, " (").concat(Math.round(gender === 'male' ? age * 0.95 : age * 1.05), "% confidence)");

  // Position above the face box
  var yPosition = box.y - 10;
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';

  // Draw background
  var maxWidth = Math.max(ctx.measureText(ageText).width, ctx.measureText(genderText).width);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(box.x, yPosition - 35, maxWidth + 10, 40);

  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.fillText(ageText, box.x + 5, yPosition - 20);
  ctx.fillText(genderText, box.x + 5, yPosition - 5);
}

// Helper function to draw smooth curves through points
function drawSmoothCurve(ctx, points) {
  var closed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  // Use quadratic curves for smoother lines
  for (var i = 1; i < points.length - 1; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  // Last point
  if (closed && points.length > 2) {
    var _xc = (points[points.length - 1].x + points[0].x) / 2;
    var _yc = (points[points.length - 1].y + points[0].y) / 2;
    ctx.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, _xc, _yc);
    ctx.quadraticCurveTo(_xc, _yc, points[0].x, points[0].y);
  } else {
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  }
  ctx.stroke();
}

// Helper function to determine which facial region a landmark belongs to
function getRegionForPoint(index) {
  if (FACIAL_REGIONS.rightEye.includes(index)) return 'rightEye';
  if (FACIAL_REGIONS.leftEye.includes(index)) return 'leftEye';
  if (FACIAL_REGIONS.nose.includes(index)) return 'nose';
  if (FACIAL_REGIONS.outerMouth.includes(index) || FACIAL_REGIONS.innerMouth.includes(index)) return 'mouth';
  if (FACIAL_REGIONS.jawline.includes(index)) return 'jawline';
  return 'default';
}

// Helper function to get color based on expression
function getExpressionColor(expression, value) {
  var colors = {
    happy: '#00ff00',
    sad: '#0000ff',
    angry: '#ff0000',
    surprised: '#ffff00',
    disgusted: '#ff00ff',
    fearful: '#ff8800',
    neutral: '#ffffff'
  };
  return colors[expression] || '#ffffff';
}

// Export additional utilities for landmark manipulation
function animateLandmarks(currentLandmarks, targetLandmarks, progress) {
  if (!currentLandmarks || !targetLandmarks) return currentLandmarks;
  var positions = currentLandmarks.positions.map(function (current, i) {
    var target = targetLandmarks.positions[i];
    return {
      x: current.x + (target.x - current.x) * progress,
      y: current.y + (target.y - current.y) * progress
    };
  });
  return {
    positions: positions
  };
}
function getLandmarkRegions() {
  return FACIAL_REGIONS;
}
function getLandmarkConnections() {
  return LANDMARK_CONNECTIONS;
}
;// ./src/proMode.js
function proMode_typeof(o) { "@babel/helpers - typeof"; return proMode_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, proMode_typeof(o); }
function proMode_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function proMode_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? proMode_ownKeys(Object(t), !0).forEach(function (r) { proMode_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : proMode_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function proMode_defineProperty(e, r, t) { return (r = proMode_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function proMode_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return proMode_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (proMode_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, proMode_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, proMode_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), proMode_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", proMode_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), proMode_regeneratorDefine2(u), proMode_regeneratorDefine2(u, o, "Generator"), proMode_regeneratorDefine2(u, n, function () { return this; }), proMode_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (proMode_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function proMode_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } proMode_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { proMode_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, proMode_regeneratorDefine2(e, r, n, t); }
function proMode_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function proMode_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { proMode_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { proMode_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function proMode_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function proMode_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, proMode_toPropertyKey(o.key), o); } }
function proMode_createClass(e, r, t) { return r && proMode_defineProperties(e.prototype, r), t && proMode_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function proMode_toPropertyKey(t) { var i = proMode_toPrimitive(t, "string"); return "symbol" == proMode_typeof(i) ? i : i + ""; }
function proMode_toPrimitive(t, r) { if ("object" != proMode_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != proMode_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Pro Mode Implementation for Face Detection
 * Advanced features including landmarks, expressions, age/gender estimation
 */




var ProMode = /*#__PURE__*/function () {
  function ProMode() {
    proMode_classCallCheck(this, ProMode);
    this.modelsLoaded = false;
    this.modelPromise = null;
    this.detectionOptions = null;
    this.features = {
      landmarks: true,
      expressions: true,
      ageGender: true,
      faceRecognition: true,
      contours: true,
      regions: true
    };
    this.visualizationStyle = {
      landmarkSize: 2,
      landmarkColor: '#00ff00',
      connectionColor: '#00ffff',
      contourColor: '#ff00ff',
      regionColors: {
        leftEye: '#ff0000',
        rightEye: '#ff0000',
        nose: '#00ff00',
        mouth: '#0000ff',
        jawline: '#ffff00'
      }
    };
  }
  return proMode_createClass(ProMode, [{
    key: "loadModels",
    value: function () {
      var _loadModels = proMode_asyncToGenerator(/*#__PURE__*/proMode_regenerator().m(function _callee2() {
        var _this = this;
        return proMode_regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this.modelsLoaded) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (!this.modelPromise) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, this.modelPromise);
            case 2:
              this.modelPromise = proMode_asyncToGenerator(/*#__PURE__*/proMode_regenerator().m(function _callee() {
                var MODEL_URL, _t;
                return proMode_regenerator().w(function (_context) {
                  while (1) switch (_context.p = _context.n) {
                    case 0:
                      _context.p = 0;
                      MODEL_URL = appConfig.getModelUrl();
                      console.log('Pro mode loading models from:', MODEL_URL);

                      // Load all required models for Pro mode
                      _context.n = 1;
                      return Promise.all([face_api_esm/* nets */.B0.ssdMobilenetv1.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.faceLandmark68Net.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.faceExpressionNet.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.ageGenderNet.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.faceRecognitionNet.loadFromUri(MODEL_URL)]);
                    case 1:
                      // Configure detection options for higher accuracy
                      _this.detectionOptions = new face_api_esm/* SsdMobilenetv1Options */.Np({
                        minConfidence: 0.5,
                        maxResults: 10
                      });
                      _this.modelsLoaded = true;
                      console.log('Pro mode models loaded successfully');
                      _context.n = 3;
                      break;
                    case 2:
                      _context.p = 2;
                      _t = _context.v;
                      console.error('Error loading Pro mode models:', _t);
                      throw _t;
                    case 3:
                      return _context.a(2);
                  }
                }, _callee, null, [[0, 2]]);
              }))();
              return _context2.a(2, this.modelPromise);
          }
        }, _callee2, this);
      }));
      function loadModels() {
        return _loadModels.apply(this, arguments);
      }
      return loadModels;
    }()
  }, {
    key: "detectFaces",
    value: function () {
      var _detectFaces = proMode_asyncToGenerator(/*#__PURE__*/proMode_regenerator().m(function _callee3(video, canvas) {
        var detections, _t2;
        return proMode_regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (this.modelsLoaded) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return this.loadModels();
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return face_api_esm/* detectAllFaces */.R(video, this.detectionOptions).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
            case 2:
              detections = _context3.v;
              return _context3.a(2, detections);
            case 3:
              _context3.p = 3;
              _t2 = _context3.v;
              console.error('Pro mode detection error:', _t2);
              return _context3.a(2, []);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function detectFaces(_x, _x2) {
        return _detectFaces.apply(this, arguments);
      }
      return detectFaces;
    }()
  }, {
    key: "drawDetections",
    value: function drawDetections(canvas, detections, video) {
      var _this2 = this;
      var ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      detections.forEach(function (detection) {
        var faceDetection = detection.detection,
          landmarks = detection.landmarks,
          expressions = detection.expressions,
          age = detection.age,
          gender = detection.gender;

        // Draw bounding box
        _this2.drawBoundingBox(ctx, faceDetection.box);

        // Draw facial landmarks with connections
        if (_this2.features.landmarks && landmarks) {
          drawLandmarks(ctx, landmarks, _this2.visualizationStyle);
        }

        // Draw face contours
        if (_this2.features.contours && landmarks) {
          drawFaceContours(ctx, landmarks, _this2.visualizationStyle);
        }

        // Draw expressions
        if (_this2.features.expressions && expressions) {
          drawExpressions(ctx, expressions, faceDetection.box);
        }

        // Draw age and gender
        if (_this2.features.ageGender && age !== undefined && gender) {
          drawAgeGender(ctx, age, gender, faceDetection.box);
        }
      });
      return detections;
    }
  }, {
    key: "drawBoundingBox",
    value: function drawBoundingBox(ctx, box) {
      var x = box.x,
        y = box.y,
        width = box.width,
        height = box.height;
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Draw corner accents
      var cornerLength = 20;
      ctx.lineWidth = 3;

      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(x, y + cornerLength);
      ctx.lineTo(x, y);
      ctx.lineTo(x + cornerLength, y);
      ctx.stroke();

      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(x + width - cornerLength, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + cornerLength);
      ctx.stroke();

      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(x, y + height - cornerLength);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + cornerLength, y + height);
      ctx.stroke();

      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(x + width - cornerLength, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x + width, y + height - cornerLength);
      ctx.stroke();
    }
  }, {
    key: "toggleFeature",
    value: function toggleFeature(feature) {
      if (this.features.hasOwnProperty(feature)) {
        this.features[feature] = !this.features[feature];
      }
    }
  }, {
    key: "updateVisualizationStyle",
    value: function updateVisualizationStyle(style) {
      this.visualizationStyle = proMode_objectSpread(proMode_objectSpread({}, this.visualizationStyle), style);
    }
  }, {
    key: "exportDetectionData",
    value: function exportDetectionData(detections) {
      return detections.map(function (detection) {
        return {
          boundingBox: detection.detection.box,
          landmarks: detection.landmarks ? detection.landmarks.positions.map(function (p) {
            return {
              x: p.x,
              y: p.y
            };
          }) : null,
          expressions: detection.expressions || null,
          age: detection.age || null,
          gender: detection.gender || null,
          confidence: detection.detection.score
        };
      });
    }
  }, {
    key: "getPerformanceTarget",
    value: function getPerformanceTarget() {
      var _this3 = this;
      return {
        targetFPS: 20,
        mode: 'pro',
        features: Object.keys(this.features).filter(function (f) {
          return _this3.features[f];
        })
      };
    }
  }]);
}();
/* harmony default export */ const proMode = ((/* unused pure expression or super */ null && (ProMode)));
// EXTERNAL MODULE: ./node_modules/@tensorflow/tfjs/dist/index.js + 884 modules
var dist = __webpack_require__(8962);
// EXTERNAL MODULE: ./node_modules/@tensorflow/tfjs-backend-wasm/dist/index.js + 168 modules
var tfjs_backend_wasm_dist = __webpack_require__(6554);
;// ./src/wasmBackend.js
function wasmBackend_typeof(o) { "@babel/helpers - typeof"; return wasmBackend_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, wasmBackend_typeof(o); }
function wasmBackend_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return wasmBackend_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (wasmBackend_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, wasmBackend_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, wasmBackend_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), wasmBackend_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", wasmBackend_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), wasmBackend_regeneratorDefine2(u), wasmBackend_regeneratorDefine2(u, o, "Generator"), wasmBackend_regeneratorDefine2(u, n, function () { return this; }), wasmBackend_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (wasmBackend_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function wasmBackend_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } wasmBackend_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { wasmBackend_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, wasmBackend_regeneratorDefine2(e, r, n, t); }
function wasmBackend_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function wasmBackend_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, wasmBackend_toPropertyKey(o.key), o); } }
function wasmBackend_createClass(e, r, t) { return r && wasmBackend_defineProperties(e.prototype, r), t && wasmBackend_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function wasmBackend_toPropertyKey(t) { var i = wasmBackend_toPrimitive(t, "string"); return "symbol" == wasmBackend_typeof(i) ? i : i + ""; }
function wasmBackend_toPrimitive(t, r) { if ("object" != wasmBackend_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != wasmBackend_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function wasmBackend_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function wasmBackend_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { wasmBackend_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { wasmBackend_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * WASM Backend Module
 * Handles TensorFlow.js WASM backend initialization and configuration
 */





/**
 * Configure WASM paths for model loading
 */
function configureWASMPaths() {
  // Use CDN for WASM files or local path if available
  var wasmPath = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@latest/dist/';
  (0,tfjs_backend_wasm_dist/* setWasmPaths */.zj)(wasmPath);
}

/**
 * Detect WASM features available in the browser
 */
function detectWASMFeatures() {
  return _detectWASMFeatures.apply(this, arguments);
}

/**
 * Configure optimal thread count based on hardware
 */
function _detectWASMFeatures() {
  _detectWASMFeatures = wasmBackend_asyncToGenerator(/*#__PURE__*/wasmBackend_regenerator().m(function _callee() {
    var features, simdTest, tfFeatures, _t;
    return wasmBackend_regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          features = {
            simdSupport: false,
            threadsSupport: false,
            backendName: 'unknown'
          };
          _context.p = 1;
          // Check for SIMD support
          if (typeof WebAssembly !== 'undefined' && WebAssembly.validate) {
            // SIMD detection using WebAssembly.validate
            simdTest = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x05, 0x01, 0x60, 0x00, 0x01, 0x7b, 0x03, 0x02, 0x01, 0x00, 0x0a, 0x0a, 0x01, 0x08, 0x00, 0x41, 0x00, 0xfd, 0x0f, 0x0b]);
            features.simdSupport = WebAssembly.validate(simdTest);
          }

          // Check for threads support (SharedArrayBuffer)
          features.threadsSupport = typeof SharedArrayBuffer !== 'undefined';

          // Get current backend
          if (dist.getBackend) {
            features.backendName = dist.getBackend();
          }

          // Check TensorFlow.js environment features
          _context.n = 2;
          return dist.env().getAsync('WEBGL_PACK');
        case 2:
          tfFeatures = _context.v;
          features.webglPack = tfFeatures;
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.warn('Error detecting WASM features:', _t);
        case 4:
          return _context.a(2, features);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _detectWASMFeatures.apply(this, arguments);
}
function configureWASMThreads() {
  return _configureWASMThreads.apply(this, arguments);
}

/**
 * Initialize WASM backend with optimal configuration
 */
function _configureWASMThreads() {
  _configureWASMThreads = wasmBackend_asyncToGenerator(/*#__PURE__*/wasmBackend_regenerator().m(function _callee2() {
    var config, numCores, optimalThreads;
    return wasmBackend_regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          config = {
            threads: 1,
            multithreading: false
          };
          try {
            // Check if SharedArrayBuffer is available
            if (typeof SharedArrayBuffer !== 'undefined') {
              // Get number of logical processors
              numCores = navigator.hardwareConcurrency || 4; // Use half the cores for optimal performance (leave room for main thread)
              optimalThreads = Math.max(1, Math.floor(numCores / 2));
              (0,tfjs_backend_wasm_dist/* setThreadsCount */.DK)(optimalThreads);
              config.threads = optimalThreads;
              config.multithreading = true;
              console.log("WASM threads configured: ".concat(optimalThreads, " threads"));
            } else {
              console.log('SharedArrayBuffer not available, using single-threaded WASM');
            }
          } catch (error) {
            console.warn('Error configuring WASM threads:', error);
          }
          return _context2.a(2, config);
      }
    }, _callee2);
  }));
  return _configureWASMThreads.apply(this, arguments);
}
function initializeWASMBackend() {
  return _initializeWASMBackend.apply(this, arguments);
}

/**
 * Get backend performance characteristics
 */
function _initializeWASMBackend() {
  _initializeWASMBackend = wasmBackend_asyncToGenerator(/*#__PURE__*/wasmBackend_regenerator().m(function _callee3() {
    var result, threadConfig, currentBackend, testTensor, startTime, resultTensor, endTime, testTime, _t2, _t3;
    return wasmBackend_regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          console.group('🚀 WASM Backend Initialization');
          console.log('Starting WebAssembly backend setup...');
          result = {
            backend: 'wasm',
            fallback: false,
            features: {},
            error: null
          };
          _context3.p = 1;
          // Log WebAssembly availability
          console.log('WebAssembly available:', typeof WebAssembly !== 'undefined');

          // Configure WASM paths
          console.log('Configuring WASM paths...');
          configureWASMPaths();

          // Configure threads
          console.log('Configuring WASM threads...');
          _context3.n = 2;
          return configureWASMThreads();
        case 2:
          threadConfig = _context3.v;
          console.log('Thread configuration:', threadConfig);

          // Set WASM as the backend
          console.log('Setting WASM backend...');
          _context3.n = 3;
          return dist.setBackend('wasm');
        case 3:
          _context3.n = 4;
          return dist.ready();
        case 4:
          // Verify backend is set correctly
          currentBackend = dist.getBackend();
          console.log('✅ Current backend:', currentBackend);
          if (!(currentBackend !== 'wasm')) {
            _context3.n = 5;
            break;
          }
          throw new Error("Backend mismatch: expected 'wasm', got '".concat(currentBackend, "'"));
        case 5:
          _context3.n = 6;
          return detectWASMFeatures();
        case 6:
          result.features = _context3.v;
          console.log('WASM Features detected:', result.features);

          // Performance test
          console.log('Running WASM performance test...');
          testTensor = dist.randomNormal([100, 100]);
          startTime = performance.now();
          resultTensor = dist.matMul(testTensor, testTensor);
          _context3.n = 7;
          return resultTensor.data();
        case 7:
          endTime = performance.now();
          testTime = endTime - startTime;
          console.log("WASM MatMul (100x100) completed in: ".concat(testTime.toFixed(2), "ms"));
          testTensor.dispose();
          resultTensor.dispose();
          console.log('✅ WASM backend initialized successfully!');
          console.log('WASM is ACTIVE - Enjoy 8-20X faster inference! 🎯');
          _context3.n = 15;
          break;
        case 8:
          _context3.p = 8;
          _t2 = _context3.v;
          console.error('❌ Failed to initialize WASM backend:', _t2);
          result.error = _t2.message;

          // Fallback to WebGL
          _context3.p = 9;
          _context3.n = 10;
          return dist.setBackend('webgl');
        case 10:
          _context3.n = 11;
          return dist.ready();
        case 11:
          result.backend = 'webgl';
          result.fallback = true;
          console.log('Fallback to WebGL backend successful');
          _context3.n = 15;
          break;
        case 12:
          _context3.p = 12;
          _t3 = _context3.v;
          console.error('WebGL fallback also failed:', _t3);
          // Final fallback to CPU
          _context3.n = 13;
          return dist.setBackend('cpu');
        case 13:
          _context3.n = 14;
          return dist.ready();
        case 14:
          result.backend = 'cpu';
          result.fallback = true;
        case 15:
          console.groupEnd();
          return _context3.a(2, result);
      }
    }, _callee3, null, [[9, 12], [1, 8]]);
  }));
  return _initializeWASMBackend.apply(this, arguments);
}
function getBackendPerformance() {
  var backend = dist.getBackend();
  var memory = dist.memory();
  return {
    backend: backend,
    memory: {
      numTensors: memory.numTensors,
      numDataBuffers: memory.numDataBuffers,
      numBytes: memory.numBytes,
      unreliable: memory.unreliable
    },
    features: {
      simd: dist.env().getBool('WASM_HAS_SIMD_SUPPORT'),
      threads: dist.env().getBool('WASM_HAS_MULTITHREAD_SUPPORT')
    }
  };
}

/**
 * Handle WASM-specific errors
 */
function handleWASMError(_x) {
  return _handleWASMError.apply(this, arguments);
}

/**
 * Warm up the backend with a small operation
 */
function _handleWASMError() {
  _handleWASMError = wasmBackend_asyncToGenerator(/*#__PURE__*/wasmBackend_regenerator().m(function _callee4(error) {
    var errorInfo;
    return wasmBackend_regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          errorInfo = {
            message: error.message,
            fallback: 'webgl',
            recommendation: ''
          };
          if (error.message.includes('SharedArrayBuffer')) {
            errorInfo.recommendation = 'Enable CORS headers: Cross-Origin-Embedder-Policy and Cross-Origin-Opener-Policy';
          } else if (error.message.includes('SIMD')) {
            errorInfo.recommendation = 'Browser does not support WASM SIMD. Performance may be reduced.';
          } else if (error.message.includes('WebAssembly')) {
            errorInfo.recommendation = 'WebAssembly not supported. Please use a modern browser.';
            errorInfo.fallback = 'cpu';
          }
          return _context4.a(2, errorInfo);
      }
    }, _callee4);
  }));
  return _handleWASMError.apply(this, arguments);
}
function warmupBackend() {
  return _warmupBackend.apply(this, arguments);
}

/**
 * Monitor backend performance during runtime
 */
function _warmupBackend() {
  _warmupBackend = wasmBackend_asyncToGenerator(/*#__PURE__*/wasmBackend_regenerator().m(function _callee5() {
    var warmupData, result;
    return wasmBackend_regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          warmupData = dist.randomNormal([1, 224, 224, 3]);
          result = dist.conv2d(warmupData, dist.randomNormal([3, 3, 3, 16]), 1, 'same'); // Clean up
          warmupData.dispose();
          result.dispose();
          console.log('Backend warmed up');
        case 1:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return _warmupBackend.apply(this, arguments);
}
var BackendMonitor = /*#__PURE__*/function () {
  function BackendMonitor() {
    wasmBackend_classCallCheck(this, BackendMonitor);
    this.metrics = {
      inferenceCount: 0,
      totalInferenceTime: 0,
      memorySnapshots: []
    };
  }
  return wasmBackend_createClass(BackendMonitor, [{
    key: "startInference",
    value: function startInference() {
      return performance.now();
    }
  }, {
    key: "endInference",
    value: function endInference(startTime) {
      var duration = performance.now() - startTime;
      this.metrics.inferenceCount++;
      this.metrics.totalInferenceTime += duration;

      // Take memory snapshot every 10 inferences
      if (this.metrics.inferenceCount % 10 === 0) {
        this.metrics.memorySnapshots.push({
          timestamp: Date.now(),
          memory: dist.memory()
        });
      }
    }
  }, {
    key: "getAverageInferenceTime",
    value: function getAverageInferenceTime() {
      if (this.metrics.inferenceCount === 0) return 0;
      return this.metrics.totalInferenceTime / this.metrics.inferenceCount;
    }
  }, {
    key: "getReport",
    value: function getReport() {
      return {
        backend: dist.getBackend(),
        inferenceCount: this.metrics.inferenceCount,
        averageInferenceTime: this.getAverageInferenceTime(),
        currentMemory: dist.memory(),
        memoryTrend: this.metrics.memorySnapshots
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      this.metrics = {
        inferenceCount: 0,
        totalInferenceTime: 0,
        memorySnapshots: []
      };
    }
  }]);
}();
/* harmony default export */ const wasmBackend = ({
  initializeWASMBackend: initializeWASMBackend,
  detectWASMFeatures: detectWASMFeatures,
  configureWASMThreads: configureWASMThreads,
  getBackendPerformance: getBackendPerformance,
  handleWASMError: handleWASMError,
  warmupBackend: warmupBackend,
  BackendMonitor: BackendMonitor
});
;// ./src/index-wasm.js
function index_wasm_typeof(o) { "@babel/helpers - typeof"; return index_wasm_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, index_wasm_typeof(o); }
function index_wasm_slicedToArray(r, e) { return index_wasm_arrayWithHoles(r) || index_wasm_iterableToArrayLimit(r, e) || index_wasm_unsupportedIterableToArray(r, e) || index_wasm_nonIterableRest(); }
function index_wasm_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function index_wasm_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return index_wasm_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? index_wasm_arrayLikeToArray(r, a) : void 0; } }
function index_wasm_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function index_wasm_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function index_wasm_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function index_wasm_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return index_wasm_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (index_wasm_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, index_wasm_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, index_wasm_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), index_wasm_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", index_wasm_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), index_wasm_regeneratorDefine2(u), index_wasm_regeneratorDefine2(u, o, "Generator"), index_wasm_regeneratorDefine2(u, n, function () { return this; }), index_wasm_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (index_wasm_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function index_wasm_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } index_wasm_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { index_wasm_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, index_wasm_regeneratorDefine2(e, r, n, t); }
function index_wasm_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function index_wasm_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { index_wasm_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { index_wasm_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function index_wasm_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function index_wasm_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, index_wasm_toPropertyKey(o.key), o); } }
function index_wasm_createClass(e, r, t) { return r && index_wasm_defineProperties(e.prototype, r), t && index_wasm_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function index_wasm_toPropertyKey(t) { var i = index_wasm_toPrimitive(t, "string"); return "symbol" == index_wasm_typeof(i) ? i : i + ""; }
function index_wasm_toPrimitive(t, r) { if ("object" != index_wasm_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != index_wasm_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Face Detection App with WASM Support
 * Uses @vladmandic/face-api for TensorFlow.js 2.x compatibility
 */

// Use @vladmandic/face-api instead of face-api.js for WASM support









var FaceDetectionApp = /*#__PURE__*/function () {
  function FaceDetectionApp() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    index_wasm_classCallCheck(this, FaceDetectionApp);
    this.video = null;
    this.canvas = null;
    this.isModelLoaded = false;
    this.isVideoReady = false;
    this.detectionInterval = null;
    this.currentMode = 'full';
    this.liteModeDetector = null;
    this.proMode = null;
    this.performanceMonitor = new PerformanceMonitor();
    this.cameraManager = new CameraManager();
    this.availableCameras = [];
    this.currentCameraId = null;

    // WASM configuration
    this.config = {
      preferredBackend: options.preferredBackend || 'wasm',
      enableSIMD: options.enableSIMD !== false,
      enableThreads: options.enableThreads !== false
    };
    this.backendType = null;
    this.backendMonitor = new BackendMonitor();
  }
  return index_wasm_createClass(FaceDetectionApp, [{
    key: "init",
    value: function () {
      var _init = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee() {
        var _t;
        return index_wasm_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this.initializeBackend();
            case 1:
              _context.n = 2;
              return this.loadModels();
            case 2:
              this.setupUI();
              _context.n = 3;
              return this.setupCamera();
            case 3:
              if (!(this.currentMode === 'lite')) {
                _context.n = 5;
                break;
              }
              this.liteModeDetector = new LiteModeDetector({
                targetFPS: 30,
                frameSkip: 0,
                showConfidence: true,
                boundingBoxColor: '#00ff00',
                confidenceThreshold: 0.5
              });
              this.liteModeDetector.video = this.video;
              this.liteModeDetector.canvas = this.canvas;
              this.liteModeDetector.drawingUtils.setCanvas(this.canvas);
              _context.n = 4;
              return this.liteModeDetector.detector.loadModel();
            case 4:
              _context.n = 6;
              break;
            case 5:
              if (!(this.currentMode === 'pro')) {
                _context.n = 6;
                break;
              }
              this.proMode = new ProMode();
              _context.n = 6;
              return this.proMode.loadModels();
            case 6:
              this.startDetection();
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              console.error('Failed to initialize app:', _t);
              this.showError('Failed to initialize the application. Please check your camera permissions.');
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[0, 7]]);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "initializeBackend",
    value: function () {
      var _initializeBackend = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee2() {
        var backendResult;
        return index_wasm_regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              console.log('Initializing backend with preference:', this.config.preferredBackend);

              // Initialize face-api environment
              _context2.n = 1;
              return face_api_esm/* env */._K.monkeyPatch({
                Canvas: HTMLCanvasElement,
                Image: HTMLImageElement,
                ImageData: ImageData,
                Video: HTMLVideoElement,
                createCanvasElement: function createCanvasElement() {
                  return document.createElement('canvas');
                },
                createImageElement: function createImageElement() {
                  return document.createElement('img');
                }
              });
            case 1:
              if (!(this.config.preferredBackend === 'wasm')) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return initializeWASMBackend();
            case 2:
              backendResult = _context2.v;
              this.backendType = backendResult.backend;
              if (backendResult.fallback) {
                console.warn('WASM initialization failed, using fallback:', this.backendType);
              } else {
                console.log('WASM backend initialized successfully');
              }

              // Update UI with backend info
              this.updateBackendDisplay();
              _context2.n = 4;
              break;
            case 3:
              this.backendType = this.config.preferredBackend;
              console.log('Using backend:', this.backendType);
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function initializeBackend() {
        return _initializeBackend.apply(this, arguments);
      }
      return initializeBackend;
    }()
  }, {
    key: "loadModels",
    value: function () {
      var _loadModels = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee3() {
        var MODEL_URL, modelPromises, perfInfo, _t2;
        return index_wasm_regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              MODEL_URL = appConfig.getModelUrl();
              _context3.p = 1;
              console.log('Loading face detection models from:', MODEL_URL);
              console.log('App configuration:', appConfig.debug());
              console.log('Using backend:', this.backendType);

              // Load models with progress tracking
              modelPromises = [face_api_esm/* nets */.B0.tinyFaceDetector.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.ssdMobilenetv1.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.faceLandmark68Net.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.faceExpressionNet.loadFromUri(MODEL_URL), face_api_esm/* nets */.B0.ageGenderNet.loadFromUri(MODEL_URL)];
              _context3.n = 2;
              return Promise.all(modelPromises);
            case 2:
              this.isModelLoaded = true;
              console.log('Face detection models loaded successfully');

              // Log backend performance after model loading
              perfInfo = getBackendPerformance();
              console.log('Backend performance:', perfInfo);
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t2 = _context3.v;
              console.error('Failed to load models:', _t2);
              throw new Error('Failed to load face detection models: ' + _t2.message);
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function loadModels() {
        return _loadModels.apply(this, arguments);
      }
      return loadModels;
    }()
  }, {
    key: "setupUI",
    value: function setupUI() {
      var _this = this;
      var app = document.getElementById('app');
      app.innerHTML = "\n      <div class=\"container\">\n        <h1>Face Detection App</h1>\n        <div class=\"backend-info\" id=\"backend-info\"></div>\n        <div class=\"video-container\">\n          <video id=\"video\" autoplay muted></video>\n          <canvas id=\"overlay\"></canvas>\n        </div>\n        <div class=\"controls\">\n          <div class=\"mode-selector\">\n            <label>\n              <input type=\"radio\" name=\"mode\" value=\"lite\" ".concat(this.currentMode === 'lite' ? 'checked' : '', ">\n              Lite Mode (Bounding Boxes)\n            </label>\n            <label>\n              <input type=\"radio\" name=\"mode\" value=\"pro\" ").concat(this.currentMode === 'pro' ? 'checked' : '', ">\n              Pro Mode (Advanced Features)\n            </label>\n            <label>\n              <input type=\"radio\" name=\"mode\" value=\"full\" ").concat(this.currentMode === 'full' ? 'checked' : '', ">\n              Full Mode (All Features)\n            </label>\n          </div>\n          <div id=\"pro-controls\" class=\"pro-controls\" style=\"display: ").concat(this.currentMode === 'pro' ? 'block' : 'none', ";\">\n            <h3>Pro Mode Features</h3>\n            <label><input type=\"checkbox\" id=\"landmarks\" checked> 68-point Landmarks</label>\n            <label><input type=\"checkbox\" id=\"expressions\" checked> Facial Expressions</label>\n            <label><input type=\"checkbox\" id=\"ageGender\" checked> Age & Gender</label>\n            <label><input type=\"checkbox\" id=\"contours\" checked> Face Contours</label>\n            <label><input type=\"checkbox\" id=\"regions\" checked> Region Highlighting</label>\n          </div>\n          <button id=\"startBtn\" class=\"btn btn-primary\">Start Detection</button>\n          <button id=\"stopBtn\" class=\"btn btn-secondary\" disabled>Stop Detection</button>\n          <div id=\"camera-selector\" class=\"camera-selector\" style=\"display: none;\">\n            <label for=\"cameraSelect\">Camera:</label>\n            <select id=\"cameraSelect\">\n              <option value=\"\">Loading cameras...</option>\n            </select>\n          </div>\n          <div class=\"threshold-control\">\n            <label for=\"threshold\">Detection Threshold: <span id=\"thresholdValue\">0.5</span></label>\n            <input type=\"range\" id=\"threshold\" min=\"0.1\" max=\"0.9\" step=\"0.1\" value=\"0.5\">\n          </div>\n          <div class=\"backend-selector\">\n            <label for=\"backendSelect\">Backend:</label>\n            <select id=\"backendSelect\">\n              <option value=\"wasm\" ").concat(this.backendType === 'wasm' ? 'selected' : '', ">WASM</option>\n              <option value=\"webgl\" ").concat(this.backendType === 'webgl' ? 'selected' : '', ">WebGL</option>\n              <option value=\"cpu\" ").concat(this.backendType === 'cpu' ? 'selected' : '', ">CPU</option>\n            </select>\n          </div>\n        </div>\n        <div id=\"stats\" class=\"stats\"></div>\n      </div>\n    ");
      this.video = document.getElementById('video');
      this.canvas = document.getElementById('overlay');

      // Event listeners
      document.getElementById('startBtn').onclick = function () {
        return _this.startDetection();
      };
      document.getElementById('stopBtn').onclick = function () {
        return _this.stopDetection();
      };

      // Mode switching
      document.querySelectorAll('input[name="mode"]').forEach(function (radio) {
        radio.addEventListener('change', function (e) {
          _this.switchMode(e.target.value);
          document.getElementById('pro-controls').style.display = e.target.value === 'pro' ? 'block' : 'none';
        });
      });

      // Pro mode feature toggles
      if (this.currentMode === 'pro') {
        this.setupProModeControls();
      }

      // Threshold control
      var thresholdSlider = document.getElementById('threshold');
      thresholdSlider.addEventListener('input', function (e) {
        var value = parseFloat(e.target.value);
        document.getElementById('thresholdValue').textContent = value.toFixed(1);
        _this.updateThreshold(value);
      });

      // Camera selector
      var cameraSelect = document.getElementById('cameraSelect');
      cameraSelect.addEventListener('change', /*#__PURE__*/function () {
        var _ref = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee4(e) {
          return index_wasm_regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (!e.target.value) {
                  _context4.n = 1;
                  break;
                }
                _context4.n = 1;
                return _this.switchCamera(e.target.value);
              case 1:
                return _context4.a(2);
            }
          }, _callee4);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      // Backend selector
      var backendSelect = document.getElementById('backendSelect');
      backendSelect.addEventListener('change', /*#__PURE__*/function () {
        var _ref2 = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee5(e) {
          return index_wasm_regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _context5.n = 1;
                return _this.switchBackend(e.target.value);
              case 1:
                return _context5.a(2);
            }
          }, _callee5);
        }));
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());

      // Load available cameras
      this.loadCameraList();

      // Update backend display
      this.updateBackendDisplay();
    }
  }, {
    key: "setupCamera",
    value: function () {
      var _setupCamera = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee6() {
        var streamInfo, _t3;
        return index_wasm_regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              if (this.video) {
                _context6.n = 1;
                break;
              }
              throw new Error('Video element not found');
            case 1:
              _context6.n = 2;
              return this.cameraManager.startCamera(this.video);
            case 2:
              streamInfo = this.cameraManager.getStreamInfo();
              if (streamInfo && streamInfo.deviceId) {
                this.currentCameraId = streamInfo.deviceId;
              }
              this.isVideoReady = true;
              this.adjustCanvas();
              _context6.n = 3;
              return this.loadCameraList();
            case 3:
              _context6.n = 5;
              break;
            case 4:
              _context6.p = 4;
              _t3 = _context6.v;
              throw new Error('Camera access denied or not available: ' + _t3.message);
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 4]]);
      }));
      function setupCamera() {
        return _setupCamera.apply(this, arguments);
      }
      return setupCamera;
    }()
  }, {
    key: "adjustCanvas",
    value: function adjustCanvas() {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
    }
  }, {
    key: "setupProModeControls",
    value: function setupProModeControls() {
      var _this2 = this;
      var features = ['landmarks', 'expressions', 'ageGender', 'contours', 'regions'];
      features.forEach(function (feature) {
        var checkbox = document.getElementById(feature);
        if (checkbox) {
          checkbox.addEventListener('change', function (e) {
            if (_this2.proMode) {
              _this2.proMode.toggleFeature(feature);
            }
          });
        }
      });
    }
  }, {
    key: "startDetection",
    value: function () {
      var _startDetection = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee9() {
        var _this3 = this;
        var startTime;
        return index_wasm_regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              // Track inference time with backend monitor
              startTime = this.backendMonitor.startInference();
              if (!(this.currentMode === 'lite')) {
                _context9.n = 2;
                break;
              }
              if (this.liteModeDetector) {
                _context9.n = 1;
                break;
              }
              console.error('Lite mode detector not initialized');
              return _context9.a(2);
            case 1:
              document.getElementById('startBtn').disabled = true;
              document.getElementById('stopBtn').disabled = false;
              this.liteModeDetector.start();
              _context9.n = 6;
              break;
            case 2:
              if (!(this.currentMode === 'pro')) {
                _context9.n = 4;
                break;
              }
              if (!(!this.proMode || !this.isVideoReady)) {
                _context9.n = 3;
                break;
              }
              console.error('Pro mode or video not ready');
              return _context9.a(2);
            case 3:
              document.getElementById('startBtn').disabled = true;
              document.getElementById('stopBtn').disabled = false;
              this.performanceMonitor.start();
              this.detectionInterval = setInterval(/*#__PURE__*/index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee7() {
                return index_wasm_regenerator().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      _context7.n = 1;
                      return _this3.detectFacesPro();
                    case 1:
                      return _context7.a(2);
                  }
                }, _callee7);
              })), 50); // 20 FPS target for pro mode
              _context9.n = 6;
              break;
            case 4:
              if (!(!this.isModelLoaded || !this.isVideoReady)) {
                _context9.n = 5;
                break;
              }
              console.error('Models or video not ready');
              return _context9.a(2);
            case 5:
              document.getElementById('startBtn').disabled = true;
              document.getElementById('stopBtn').disabled = false;
              this.detectionInterval = setInterval(/*#__PURE__*/index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee8() {
                return index_wasm_regenerator().w(function (_context8) {
                  while (1) switch (_context8.n) {
                    case 0:
                      _context8.n = 1;
                      return _this3.detectFaces();
                    case 1:
                      return _context8.a(2);
                  }
                }, _callee8);
              })), 100);
            case 6:
              // Record inference completion
              this.backendMonitor.endInference(startTime);
            case 7:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function startDetection() {
        return _startDetection.apply(this, arguments);
      }
      return startDetection;
    }()
  }, {
    key: "stopDetection",
    value: function stopDetection() {
      if (this.currentMode === 'lite' && this.liteModeDetector) {
        this.liteModeDetector.stop();
      } else if (this.detectionInterval) {
        clearInterval(this.detectionInterval);
        this.detectionInterval = null;
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.currentMode === 'pro') {
          this.performanceMonitor.stop();
        }
      }
      document.getElementById('startBtn').disabled = false;
      document.getElementById('stopBtn').disabled = true;
    }
  }, {
    key: "detectFaces",
    value: function () {
      var _detectFaces = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee0() {
        var startTime, detections, displaySize, resizedDetections, ctx;
        return index_wasm_regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              startTime = this.backendMonitor.startInference();
              _context0.n = 1;
              return face_api_esm/* detectAllFaces */.R(this.video, new face_api_esm/* TinyFaceDetectorOptions */.ex()).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
            case 1:
              detections = _context0.v;
              displaySize = {
                width: this.video.videoWidth,
                height: this.video.videoHeight
              };
              resizedDetections = face_api_esm/* resizeResults */.Lz(detections, displaySize);
              ctx = this.canvas.getContext('2d');
              ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

              // Draw detections
              face_api_esm/* draw */.$2.drawDetections(this.canvas, resizedDetections);
              face_api_esm/* draw */.$2.drawFaceLandmarks(this.canvas, resizedDetections);
              face_api_esm/* draw */.$2.drawFaceExpressions(this.canvas, resizedDetections);

              // Draw age and gender
              resizedDetections.forEach(function (detection) {
                var age = detection.age,
                  gender = detection.gender,
                  genderProbability = detection.genderProbability;
                var _detection$detection$ = detection.detection.box,
                  x = _detection$detection$.x,
                  y = _detection$detection$.y,
                  width = _detection$detection$.width,
                  height = _detection$detection$.height;
                ctx.font = '18px Arial';
                ctx.fillStyle = '#00ff00';
                ctx.fillText("".concat(Math.round(age), " years, ").concat(gender, " (").concat(Math.round(genderProbability * 100), "%)"), x, y - 10);
              });
              this.updateStats(detections.length);
              this.backendMonitor.endInference(startTime);
            case 2:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function detectFaces() {
        return _detectFaces.apply(this, arguments);
      }
      return detectFaces;
    }()
  }, {
    key: "detectFacesPro",
    value: function () {
      var _detectFacesPro = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee1() {
        var startTime, inferenceStart, detections, frameTime, _t4;
        return index_wasm_regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              if (this.proMode) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2);
            case 1:
              startTime = performance.now();
              inferenceStart = this.backendMonitor.startInference();
              _context1.p = 2;
              _context1.n = 3;
              return this.proMode.detectFaces(this.video, this.canvas);
            case 3:
              detections = _context1.v;
              this.proMode.drawDetections(this.canvas, detections, this.video);
              frameTime = performance.now() - startTime;
              this.performanceMonitor.recordFrame(frameTime, detections.length);
              this.updateProStats(detections);
              this.backendMonitor.endInference(inferenceStart);
              _context1.n = 5;
              break;
            case 4:
              _context1.p = 4;
              _t4 = _context1.v;
              console.error('Pro mode detection error:', _t4);
            case 5:
              return _context1.a(2);
          }
        }, _callee1, this, [[2, 4]]);
      }));
      function detectFacesPro() {
        return _detectFacesPro.apply(this, arguments);
      }
      return detectFacesPro;
    }()
  }, {
    key: "updateStats",
    value: function updateStats(faceCount) {
      var stats = document.getElementById('stats');
      var backendReport = this.backendMonitor.getReport();
      stats.innerHTML = "\n      <p>Faces detected: <strong>".concat(faceCount, "</strong></p>\n      <p>Model: TinyFaceDetector</p>\n      <p>Backend: <strong>").concat(this.backendType, "</strong></p>\n      <p>Features: Landmarks, Expressions, Age & Gender</p>\n      <p>Avg Inference: <strong>").concat(backendReport.averageInferenceTime.toFixed(2), "ms</strong></p>\n      <p>Memory: <strong>").concat((backendReport.currentMemory.numBytes / 1024 / 1024).toFixed(2), "MB</strong></p>\n    ");
    }
  }, {
    key: "updateProStats",
    value: function updateProStats(detections) {
      var stats = document.getElementById('stats');
      var perfData = this.performanceMonitor.getMetrics();
      var backendReport = this.backendMonitor.getReport();
      var expressionsSummary = '';
      if (detections.length > 0 && detections[0].expressions) {
        var topExpression = Object.entries(detections[0].expressions).sort(function (_ref5, _ref6) {
          var _ref7 = index_wasm_slicedToArray(_ref5, 2),
            a = _ref7[1];
          var _ref8 = index_wasm_slicedToArray(_ref6, 2),
            b = _ref8[1];
          return b - a;
        })[0];
        expressionsSummary = "<p>Top Expression: <strong>".concat(topExpression[0], " (").concat(Math.round(topExpression[1] * 100), "%)</strong></p>");
      }
      stats.innerHTML = "\n      <p>Faces detected: <strong>".concat(detections.length, "</strong></p>\n      <p>Mode: <strong>Pro Mode</strong></p>\n      <p>Model: SSD MobileNet v1</p>\n      <p>Backend: <strong>").concat(this.backendType, "</strong></p>\n      <p>Features: 68-point landmarks, Expressions, Age/Gender</p>\n      ").concat(expressionsSummary, "\n      <p>FPS: <strong>").concat(perfData.fps.toFixed(1), "</strong> (Target: 20)</p>\n      <p>Frame Time: <strong>").concat(perfData.avgFrameTime.toFixed(1), "ms</strong></p>\n      <p>Avg Inference: <strong>").concat(backendReport.averageInferenceTime.toFixed(2), "ms</strong></p>\n    ");
    }
  }, {
    key: "showError",
    value: function showError(message) {
      var app = document.getElementById('app');
      app.innerHTML = "\n      <div class=\"error\">\n        <h2>Error</h2>\n        <p>".concat(message, "</p>\n      </div>\n    ");
    }
  }, {
    key: "switchMode",
    value: function () {
      var _switchMode = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee10(mode) {
        var _t5;
        return index_wasm_regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              this.stopDetection();
              if (!(this.currentMode === 'lite' && this.liteModeDetector)) {
                _context10.n = 2;
                break;
              }
              _context10.n = 1;
              return this.liteModeDetector.cleanup();
            case 1:
              this.liteModeDetector = null;
              _context10.n = 3;
              break;
            case 2:
              if (this.currentMode === 'pro' && this.proMode) {
                this.proMode = null;
              }
            case 3:
              this.currentMode = mode;
              console.log("Switching to ".concat(mode, " mode"));
              _context10.p = 4;
              if (!(mode === 'lite')) {
                _context10.n = 6;
                break;
              }
              this.liteModeDetector = new LiteModeDetector({
                targetFPS: 30,
                frameSkip: 0,
                showConfidence: true,
                boundingBoxColor: '#00ff00',
                confidenceThreshold: parseFloat(document.getElementById('threshold').value)
              });
              _context10.n = 5;
              return this.liteModeDetector.initialize(this.video, this.canvas);
            case 5:
              this.isModelLoaded = true;
              this.isVideoReady = true;
              _context10.n = 10;
              break;
            case 6:
              if (!(mode === 'pro')) {
                _context10.n = 8;
                break;
              }
              this.proMode = new ProMode();
              _context10.n = 7;
              return this.proMode.loadModels();
            case 7:
              this.isModelLoaded = true;
              this.isVideoReady = true;
              this.setupProModeControls();
              _context10.n = 10;
              break;
            case 8:
              if (this.isModelLoaded) {
                _context10.n = 9;
                break;
              }
              _context10.n = 9;
              return this.loadModels();
            case 9:
              if (this.isVideoReady) {
                _context10.n = 10;
                break;
              }
              _context10.n = 10;
              return this.setupCamera();
            case 10:
              _context10.n = 12;
              break;
            case 11:
              _context10.p = 11;
              _t5 = _context10.v;
              console.error('Failed to switch mode:', _t5);
              this.showError('Failed to switch mode. Please try again.');
            case 12:
              return _context10.a(2);
          }
        }, _callee10, this, [[4, 11]]);
      }));
      function switchMode(_x3) {
        return _switchMode.apply(this, arguments);
      }
      return switchMode;
    }()
  }, {
    key: "updateThreshold",
    value: function updateThreshold(value) {
      if (this.currentMode === 'lite' && this.liteModeDetector) {
        this.liteModeDetector.setDetectionThreshold(value);
      }
    }
  }, {
    key: "loadCameraList",
    value: function () {
      var _loadCameraList = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee11() {
        var _this4 = this;
        var cameras, cameraSelect, cameraSelector, _t6;
        return index_wasm_regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return this.cameraManager.getAvailableCameras();
            case 1:
              cameras = _context11.v;
              this.availableCameras = cameras;
              cameraSelect = document.getElementById('cameraSelect');
              cameraSelector = document.getElementById('camera-selector');
              if (!(!cameraSelect || !cameraSelector)) {
                _context11.n = 2;
                break;
              }
              return _context11.a(2);
            case 2:
              if (cameras.length > 1) {
                cameraSelector.style.display = 'block';
                cameraSelect.innerHTML = '';
                cameras.forEach(function (camera) {
                  var option = document.createElement('option');
                  option.value = camera.deviceId;
                  option.textContent = camera.label;
                  option.selected = camera.deviceId === _this4.currentCameraId;
                  cameraSelect.appendChild(option);
                });
              } else {
                cameraSelector.style.display = 'none';
              }
              _context11.n = 4;
              break;
            case 3:
              _context11.p = 3;
              _t6 = _context11.v;
              console.error('Failed to load camera list:', _t6);
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 3]]);
      }));
      function loadCameraList() {
        return _loadCameraList.apply(this, arguments);
      }
      return loadCameraList;
    }()
  }, {
    key: "switchCamera",
    value: function () {
      var _switchCamera = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee12(deviceId) {
        var wasDetecting, _t7;
        return index_wasm_regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              wasDetecting = this.detectionInterval || this.liteModeDetector && this.liteModeDetector.isRunning;
              if (wasDetecting) {
                this.stopDetection();
              }
              _context12.n = 1;
              return this.cameraManager.selectCamera(deviceId);
            case 1:
              this.currentCameraId = deviceId;
              this.adjustCanvas();
              if (!wasDetecting) {
                _context12.n = 2;
                break;
              }
              _context12.n = 2;
              return this.startDetection();
            case 2:
              _context12.n = 4;
              break;
            case 3:
              _context12.p = 3;
              _t7 = _context12.v;
              console.error('Failed to switch camera:', _t7);
              this.showError('Failed to switch camera. Please try again.');
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 3]]);
      }));
      function switchCamera(_x4) {
        return _switchCamera.apply(this, arguments);
      }
      return switchCamera;
    }()
  }, {
    key: "switchBackend",
    value: function () {
      var _switchBackend = index_wasm_asyncToGenerator(/*#__PURE__*/index_wasm_regenerator().m(function _callee13(backend) {
        var tf, _t8;
        return index_wasm_regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              console.log('Switching backend to:', backend);

              // Stop detection
              this.stopDetection();

              // Clear models
              this.isModelLoaded = false;

              // Switch backend
              _context13.p = 1;
              _context13.n = 2;
              return Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 8962));
            case 2:
              tf = _context13.v;
              _context13.n = 3;
              return tf.setBackend(backend);
            case 3:
              _context13.n = 4;
              return tf.ready();
            case 4:
              this.backendType = backend;
              this.updateBackendDisplay();

              // Reload models with new backend
              _context13.n = 5;
              return this.loadModels();
            case 5:
              // Reset backend monitor
              this.backendMonitor.reset();
              console.log('Backend switched successfully to:', backend);
              _context13.n = 7;
              break;
            case 6:
              _context13.p = 6;
              _t8 = _context13.v;
              console.error('Failed to switch backend:', _t8);
              this.showError("Failed to switch to ".concat(backend, " backend"));
            case 7:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 6]]);
      }));
      function switchBackend(_x5) {
        return _switchBackend.apply(this, arguments);
      }
      return switchBackend;
    }()
  }, {
    key: "updateBackendDisplay",
    value: function updateBackendDisplay() {
      var backendInfo = document.getElementById('backend-info');
      if (backendInfo) {
        var perfInfo = getBackendPerformance();
        var isWASM = this.backendType === 'wasm';
        var color = isWASM ? '#28a745' : '#6c757d';
        backendInfo.innerHTML = "\n        <div class=\"backend-status\" style=\"\n          background-color: ".concat(color, ";\n          color: white;\n          padding: 10px 15px;\n          border-radius: 8px;\n          margin-bottom: 15px;\n          text-align: center;\n          font-family: monospace;\n        \">\n          <div style=\"font-size: 18px; font-weight: bold; margin-bottom: 5px;\">\n            ").concat(isWASM ? '🚀 WASM ACTIVE' : this.backendType.toUpperCase() + ' MODE', "\n          </div>\n          <div style=\"font-size: 14px;\">\n            Backend: <strong>").concat(this.backendType, "</strong>\n            ").concat(perfInfo.features.simd ? ' | SIMD ✓' : ' | SIMD ✗', "\n            ").concat(perfInfo.features.threads ? ' | Threads ✓' : ' | Threads ✗', "\n          </div>\n          ").concat(isWASM ? '<div style="font-size: 12px; margin-top: 5px;">8-20X faster inference</div>' : '', "\n        </div>\n      ");
      }
    }
  }, {
    key: "getBackendInfo",
    value: function getBackendInfo() {
      return {
        name: this.backendType,
        features: getBackendPerformance().features,
        performance: this.backendMonitor.getReport()
      };
    }

    // Methods for test compatibility
  }, {
    key: "getLiteModeOptions",
    value: function getLiteModeOptions() {
      return {
        inputSize: 320,
        scoreThreshold: 0.5
      };
    }
  }, {
    key: "getProModeOptions",
    value: function getProModeOptions() {
      return {
        minConfidence: 0.5,
        maxResults: 10
      };
    }
  }]);
}();

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  var app = new FaceDetectionApp();
  app.init();
  // Expose app instance for testing
  window.app = app;
});

/***/ }),

/***/ 8590:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 9893:
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [96], () => (__webpack_exec__(8331)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.0ff7a212535608528375.js.map