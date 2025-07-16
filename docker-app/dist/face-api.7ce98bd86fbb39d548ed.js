"use strict";
(self["webpackChunkface_detection_app"] = self["webpackChunkface_detection_app"] || []).push([[299],{

/***/ 564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Np: () => (/* reexport */ SsdMobilenetv1Options_SsdMobilenetv1Options),
  ex: () => (/* reexport */ TinyFaceDetectorOptions),
  R: () => (/* reexport */ detectFaces_detectAllFaces),
  $2: () => (/* reexport */ draw_namespaceObject),
  B0: () => (/* reexport */ nets),
  Lz: () => (/* reexport */ resizeResults)
});

// UNUSED EXPORTS: AgeGenderNet, BoundingBox, Box, ComposableTask, ComputeAllFaceDescriptorsTask, ComputeFaceDescriptorsTaskBase, ComputeSingleFaceDescriptorTask, DetectAllFaceLandmarksTask, DetectAllFacesTask, DetectFaceLandmarksTaskBase, DetectFacesTaskBase, DetectSingleFaceLandmarksTask, DetectSingleFaceTask, Dimensions, FACE_EXPRESSION_LABELS, FaceDetection, FaceDetectionNet, FaceExpressionNet, FaceExpressions, FaceLandmark68Net, FaceLandmark68TinyNet, FaceLandmarkNet, FaceLandmarks, FaceLandmarks5, FaceLandmarks68, FaceMatch, FaceMatcher, FaceRecognitionNet, Gender, LabeledBox, LabeledFaceDescriptors, Mtcnn, MtcnnOptions, NetInput, NeuralNetwork, ObjectDetection, Point, PredictedBox, Rect, SsdMobilenetv1, TinyFaceDetector, TinyYolov2, TinyYolov2Options, TinyYolov2SizeType, allFaces, allFacesMtcnn, allFacesSsdMobilenetv1, allFacesTinyYolov2, awaitMediaLoaded, bufferToImage, computeFaceDescriptor, createCanvas, createCanvasFromMedia, createFaceDetectionNet, createFaceRecognitionNet, createMtcnn, createSsdMobilenetv1, createTinyFaceDetector, createTinyYolov2, detectFaceLandmarks, detectFaceLandmarksTiny, detectLandmarks, detectSingleFace, env, euclideanDistance, extendWithAge, extendWithFaceDescriptor, extendWithFaceDetection, extendWithFaceExpressions, extendWithFaceLandmarks, extendWithGender, extractFaceTensors, extractFaces, fetchImage, fetchJson, fetchNetWeights, fetchOrThrow, getContext2dOrThrow, getMediaDimensions, imageTensorToCanvas, imageToSquare, inverseSigmoid, iou, isMediaElement, isMediaLoaded, isWithAge, isWithFaceDetection, isWithFaceExpressions, isWithFaceLandmarks, isWithGender, loadAgeGenderModel, loadFaceDetectionModel, loadFaceExpressionModel, loadFaceLandmarkModel, loadFaceLandmarkTinyModel, loadFaceRecognitionModel, loadMtcnnModel, loadSsdMobilenetv1Model, loadTinyFaceDetectorModel, loadTinyYolov2Model, loadWeightMap, locateFaces, matchDimensions, minBbox, mtcnn, nonMaxSuppression, normalize, padToSquare, predictAgeAndGender, recognizeFaceExpressions, resolveInput, shuffleArray, sigmoid, ssdMobilenetv1, tf, tinyFaceDetector, tinyYolov2, toNetInput, utils, validateConfig

// NAMESPACE OBJECT: ./node_modules/face-api.js/build/es6/draw/index.js
var draw_namespaceObject = {};
__webpack_require__.r(draw_namespaceObject);
__webpack_require__.d(draw_namespaceObject, {
  AnchorPosition: () => (AnchorPosition),
  DrawBox: () => (DrawBox),
  DrawBoxOptions: () => (DrawBoxOptions),
  DrawFaceLandmarks: () => (DrawFaceLandmarks),
  DrawFaceLandmarksOptions: () => (DrawFaceLandmarksOptions),
  DrawTextField: () => (DrawTextField),
  DrawTextFieldOptions: () => (DrawTextFieldOptions),
  drawContour: () => (drawContour),
  drawDetections: () => (drawDetections),
  drawFaceExpressions: () => (drawFaceExpressions),
  drawFaceLandmarks: () => (drawFaceLandmarks)
});

// EXTERNAL MODULE: ./node_modules/@tensorflow/tfjs-core/dist/tf-core.esm.js
var tf_core_esm = __webpack_require__(752);
;// ./node_modules/face-api.js/build/es6/draw/drawContour.js
function drawContour(ctx, points, isClosed) {
    if (isClosed === void 0) { isClosed = false; }
    ctx.beginPath();
    points.slice(1).forEach(function (_a, prevIdx) {
        var x = _a.x, y = _a.y;
        var from = points[prevIdx];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
    });
    if (isClosed) {
        var from = points[points.length - 1];
        var to = points[0];
        if (!from || !to) {
            return;
        }
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
    }
    ctx.stroke();
}
//# sourceMappingURL=drawContour.js.map
// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(215);
;// ./node_modules/face-api.js/build/es6/classes/Dimensions.js

var Dimensions = /** @class */ (function () {
    function Dimensions(width, height) {
        if (!isValidNumber(width) || !isValidNumber(height)) {
            throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have " + JSON.stringify({ width: width, height: height }));
        }
        this._width = width;
        this._height = height;
    }
    Object.defineProperty(Dimensions.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimensions.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Dimensions.prototype.reverse = function () {
        return new Dimensions(1 / this.width, 1 / this.height);
    };
    return Dimensions;
}());

//# sourceMappingURL=Dimensions.js.map
;// ./node_modules/face-api.js/build/es6/utils/index.js



function isTensor(tensor, dim) {
    return tensor instanceof tf_core_esm/* Tensor */.qYS && tensor.shape.length === dim;
}
function isTensor1D(tensor) {
    return isTensor(tensor, 1);
}
function isTensor2D(tensor) {
    return isTensor(tensor, 2);
}
function isTensor3D(tensor) {
    return isTensor(tensor, 3);
}
function isTensor4D(tensor) {
    return isTensor(tensor, 4);
}
function isFloat(num) {
    return num % 1 !== 0;
}
function isEven(num) {
    return num % 2 === 0;
}
function round(num, prec) {
    if (prec === void 0) { prec = 2; }
    var f = Math.pow(10, prec);
    return Math.floor(num * f) / f;
}
function isDimensions(obj) {
    return obj && obj.width && obj.height;
}
function computeReshapedDimensions(_a, inputSize) {
    var width = _a.width, height = _a.height;
    var scale = inputSize / Math.max(height, width);
    return new Dimensions(Math.round(width * scale), Math.round(height * scale));
}
function getCenterPoint(pts) {
    return pts.reduce(function (sum, pt) { return sum.add(pt); }, new Point(0, 0))
        .div(new Point(pts.length, pts.length));
}
function range(num, start, step) {
    return Array(num).fill(0).map(function (_, i) { return start + (i * step); });
}
function isValidNumber(num) {
    return !!num && num !== Infinity && num !== -Infinity && !isNaN(num) || num === 0;
}
function utils_isValidProbablitiy(num) {
    return isValidNumber(num) && 0 <= num && num <= 1.0;
}
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/classes/Point.js
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Point.prototype.add = function (pt) {
        return new Point(this.x + pt.x, this.y + pt.y);
    };
    Point.prototype.sub = function (pt) {
        return new Point(this.x - pt.x, this.y - pt.y);
    };
    Point.prototype.mul = function (pt) {
        return new Point(this.x * pt.x, this.y * pt.y);
    };
    Point.prototype.div = function (pt) {
        return new Point(this.x / pt.x, this.y / pt.y);
    };
    Point.prototype.abs = function () {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    };
    Point.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Point.prototype.floor = function () {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    };
    return Point;
}());

//# sourceMappingURL=Point.js.map
;// ./node_modules/face-api.js/build/es6/classes/Box.js


var Box = /** @class */ (function () {
    function Box(_box, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = true; }
        var box = (_box || {});
        var isBbox = [box.left, box.top, box.right, box.bottom].every(isValidNumber);
        var isRect = [box.x, box.y, box.width, box.height].every(isValidNumber);
        if (!isRect && !isBbox) {
            throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have " + JSON.stringify(box));
        }
        var _a = isRect
            ? [box.x, box.y, box.width, box.height]
            : [box.left, box.top, box.right - box.left, box.bottom - box.top], x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        Box.assertIsValidBox({ x: x, y: y, width: width, height: height }, 'Box.constructor', allowNegativeDimensions);
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    Box.isRect = function (rect) {
        return !!rect && [rect.x, rect.y, rect.width, rect.height].every(isValidNumber);
    };
    Box.assertIsValidBox = function (box, callee, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        if (!Box.isRect(box)) {
            throw new Error(callee + " - invalid box: " + JSON.stringify(box) + ", expected object with properties x, y, width, height");
        }
        if (!allowNegativeDimensions && (box.width < 0 || box.height < 0)) {
            throw new Error(callee + " - width (" + box.width + ") and height (" + box.height + ") must be positive numbers");
        }
    };
    Object.defineProperty(Box.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "left", {
        get: function () { return this.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "top", {
        get: function () { return this.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "right", {
        get: function () { return this.x + this.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottom", {
        get: function () { return this.y + this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "area", {
        get: function () { return this.width * this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "topLeft", {
        get: function () { return new Point(this.left, this.top); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "topRight", {
        get: function () { return new Point(this.right, this.top); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottomLeft", {
        get: function () { return new Point(this.left, this.bottom); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "bottomRight", {
        get: function () { return new Point(this.right, this.bottom); },
        enumerable: true,
        configurable: true
    });
    Box.prototype.round = function () {
        var _a = [this.x, this.y, this.width, this.height]
            .map(function (val) { return Math.round(val); }), x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.floor = function () {
        var _a = [this.x, this.y, this.width, this.height]
            .map(function (val) { return Math.floor(val); }), x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.toSquare = function () {
        var _a = this, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var diff = Math.abs(width - height);
        if (width < height) {
            x -= (diff / 2);
            width += diff;
        }
        if (height < width) {
            y -= (diff / 2);
            height += diff;
        }
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.rescale = function (s) {
        var scaleX = isDimensions(s) ? s.width : s;
        var scaleY = isDimensions(s) ? s.height : s;
        return new Box({
            x: this.x * scaleX,
            y: this.y * scaleY,
            width: this.width * scaleX,
            height: this.height * scaleY
        });
    };
    Box.prototype.pad = function (padX, padY) {
        var _a = [
            this.x - (padX / 2),
            this.y - (padY / 2),
            this.width + padX,
            this.height + padY
        ], x = _a[0], y = _a[1], width = _a[2], height = _a[3];
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.clipAtImageBorders = function (imgWidth, imgHeight) {
        var _a = this, x = _a.x, y = _a.y, right = _a.right, bottom = _a.bottom;
        var clippedX = Math.max(x, 0);
        var clippedY = Math.max(y, 0);
        var newWidth = right - clippedX;
        var newHeight = bottom - clippedY;
        var clippedWidth = Math.min(newWidth, imgWidth - clippedX);
        var clippedHeight = Math.min(newHeight, imgHeight - clippedY);
        return (new Box({ x: clippedX, y: clippedY, width: clippedWidth, height: clippedHeight })).floor();
    };
    Box.prototype.shift = function (sx, sy) {
        var _a = this, width = _a.width, height = _a.height;
        var x = this.x + sx;
        var y = this.y + sy;
        return new Box({ x: x, y: y, width: width, height: height });
    };
    Box.prototype.padAtBorders = function (imageHeight, imageWidth) {
        var w = this.width + 1;
        var h = this.height + 1;
        var dx = 1;
        var dy = 1;
        var edx = w;
        var edy = h;
        var x = this.left;
        var y = this.top;
        var ex = this.right;
        var ey = this.bottom;
        if (ex > imageWidth) {
            edx = -ex + imageWidth + w;
            ex = imageWidth;
        }
        if (ey > imageHeight) {
            edy = -ey + imageHeight + h;
            ey = imageHeight;
        }
        if (x < 1) {
            edy = 2 - x;
            x = 1;
        }
        if (y < 1) {
            edy = 2 - y;
            y = 1;
        }
        return { dy: dy, edy: edy, dx: dx, edx: edx, y: y, ey: ey, x: x, ex: ex, w: w, h: h };
    };
    Box.prototype.calibrate = function (region) {
        return new Box({
            left: this.left + (region.left * this.width),
            top: this.top + (region.top * this.height),
            right: this.right + (region.right * this.width),
            bottom: this.bottom + (region.bottom * this.height)
        }).toSquare().round();
    };
    return Box;
}());

//# sourceMappingURL=Box.js.map
;// ./node_modules/face-api.js/build/es6/classes/BoundingBox.js


var BoundingBox = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(BoundingBox, _super);
    function BoundingBox(left, top, right, bottom, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        return _super.call(this, { left: left, top: top, right: right, bottom: bottom }, allowNegativeDimensions) || this;
    }
    return BoundingBox;
}(Box));

//# sourceMappingURL=BoundingBox.js.map
;// ./node_modules/face-api.js/build/es6/classes/ObjectDetection.js


var ObjectDetection = /** @class */ (function () {
    function ObjectDetection(score, classScore, className, relativeBox, imageDims) {
        this._imageDims = new Dimensions(imageDims.width, imageDims.height);
        this._score = score;
        this._classScore = classScore;
        this._className = className;
        this._box = new Box(relativeBox).rescale(this._imageDims);
    }
    Object.defineProperty(ObjectDetection.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "classScore", {
        get: function () { return this._classScore; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "className", {
        get: function () { return this._className; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "box", {
        get: function () { return this._box; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "imageDims", {
        get: function () { return this._imageDims; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "imageWidth", {
        get: function () { return this.imageDims.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "imageHeight", {
        get: function () { return this.imageDims.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDetection.prototype, "relativeBox", {
        get: function () { return new Box(this._box).rescale(this.imageDims.reverse()); },
        enumerable: true,
        configurable: true
    });
    ObjectDetection.prototype.forSize = function (width, height) {
        return new ObjectDetection(this.score, this.classScore, this.className, this.relativeBox, { width: width, height: height });
    };
    return ObjectDetection;
}());

//# sourceMappingURL=ObjectDetection.js.map
;// ./node_modules/face-api.js/build/es6/classes/FaceDetection.js


var FaceDetection = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceDetection, _super);
    function FaceDetection(score, relativeBox, imageDims) {
        return _super.call(this, score, score, '', relativeBox, imageDims) || this;
    }
    FaceDetection.prototype.forSize = function (width, height) {
        var _a = _super.prototype.forSize.call(this, width, height), score = _a.score, relativeBox = _a.relativeBox, imageDims = _a.imageDims;
        return new FaceDetection(score, relativeBox, imageDims);
    };
    return FaceDetection;
}(ObjectDetection));

//# sourceMappingURL=FaceDetection.js.map
;// ./node_modules/face-api.js/build/es6/ops/minBbox.js

function minBbox(pts) {
    var xs = pts.map(function (pt) { return pt.x; });
    var ys = pts.map(function (pt) { return pt.y; });
    var minX = xs.reduce(function (min, x) { return x < min ? x : min; }, Infinity);
    var minY = ys.reduce(function (min, y) { return y < min ? y : min; }, Infinity);
    var maxX = xs.reduce(function (max, x) { return max < x ? x : max; }, 0);
    var maxY = ys.reduce(function (max, y) { return max < y ? y : max; }, 0);
    return new BoundingBox(minX, minY, maxX, maxY);
}
//# sourceMappingURL=minBbox.js.map
;// ./node_modules/face-api.js/build/es6/ops/iou.js
function iou(box1, box2, isIOU) {
    if (isIOU === void 0) { isIOU = true; }
    var width = Math.max(0.0, Math.min(box1.right, box2.right) - Math.max(box1.left, box2.left));
    var height = Math.max(0.0, Math.min(box1.bottom, box2.bottom) - Math.max(box1.top, box2.top));
    var interSection = width * height;
    return isIOU
        ? interSection / (box1.area + box2.area - interSection)
        : interSection / Math.min(box1.area, box2.area);
}
//# sourceMappingURL=iou.js.map
;// ./node_modules/face-api.js/build/es6/ops/nonMaxSuppression.js

function nonMaxSuppression(boxes, scores, iouThreshold, isIOU) {
    if (isIOU === void 0) { isIOU = true; }
    var indicesSortedByScore = scores
        .map(function (score, boxIndex) { return ({ score: score, boxIndex: boxIndex }); })
        .sort(function (c1, c2) { return c1.score - c2.score; })
        .map(function (c) { return c.boxIndex; });
    var pick = [];
    var _loop_1 = function () {
        var curr = indicesSortedByScore.pop();
        pick.push(curr);
        var indices = indicesSortedByScore;
        var outputs = [];
        for (var i = 0; i < indices.length; i++) {
            var idx = indices[i];
            var currBox = boxes[curr];
            var idxBox = boxes[idx];
            outputs.push(iou(currBox, idxBox, isIOU));
        }
        indicesSortedByScore = indicesSortedByScore.filter(function (_, j) { return outputs[j] <= iouThreshold; });
    };
    while (indicesSortedByScore.length > 0) {
        _loop_1();
    }
    return pick;
}
//# sourceMappingURL=nonMaxSuppression.js.map
;// ./node_modules/face-api.js/build/es6/ops/normalize.js


function normalize(x, meanRgb) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var r = meanRgb[0], g = meanRgb[1], b = meanRgb[2];
        var avg_r = tf_core_esm/* fill */.GSj((0,tslib_es6/* __spreadArrays */.aN)(x.shape.slice(0, 3), [1]), r);
        var avg_g = tf_core_esm/* fill */.GSj((0,tslib_es6/* __spreadArrays */.aN)(x.shape.slice(0, 3), [1]), g);
        var avg_b = tf_core_esm/* fill */.GSj((0,tslib_es6/* __spreadArrays */.aN)(x.shape.slice(0, 3), [1]), b);
        var avg_rgb = tf_core_esm/* concat */.xWs([avg_r, avg_g, avg_b], 3);
        return tf_core_esm/* sub */.jbE(x, avg_rgb);
    });
}
//# sourceMappingURL=normalize.js.map
;// ./node_modules/face-api.js/build/es6/ops/padToSquare.js

/**
 * Pads the smaller dimension of an image tensor with zeros, such that width === height.
 *
 * @param imgTensor The image tensor.
 * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
 * both sides of the minor dimension oof the image.
 * @returns The padded tensor with width === height.
 */
function padToSquare(imgTensor, isCenterImage) {
    if (isCenterImage === void 0) { isCenterImage = false; }
    return tf_core_esm/* tidy */.DZQ(function () {
        var _a = imgTensor.shape.slice(1), height = _a[0], width = _a[1];
        if (height === width) {
            return imgTensor;
        }
        var dimDiff = Math.abs(height - width);
        var paddingAmount = Math.round(dimDiff * (isCenterImage ? 0.5 : 1));
        var paddingAxis = height > width ? 2 : 1;
        var createPaddingTensor = function (paddingAmount) {
            var paddingTensorShape = imgTensor.shape.slice();
            paddingTensorShape[paddingAxis] = paddingAmount;
            return tf_core_esm/* fill */.GSj(paddingTensorShape, 0);
        };
        var paddingTensorAppend = createPaddingTensor(paddingAmount);
        var remainingPaddingAmount = dimDiff - paddingTensorAppend.shape[paddingAxis];
        var paddingTensorPrepend = isCenterImage && remainingPaddingAmount
            ? createPaddingTensor(remainingPaddingAmount)
            : null;
        var tensorsToStack = [
            paddingTensorPrepend,
            imgTensor,
            paddingTensorAppend
        ]
            .filter(function (t) { return !!t; })
            .map(function (t) { return t.toFloat(); });
        return tf_core_esm/* concat */.xWs(tensorsToStack, paddingAxis);
    });
}
//# sourceMappingURL=padToSquare.js.map
;// ./node_modules/face-api.js/build/es6/ops/index.js






function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
function inverseSigmoid(x) {
    return Math.log(x / (1 - x));
}
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/classes/Rect.js


var Rect = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(Rect, _super);
    function Rect(x, y, width, height, allowNegativeDimensions) {
        if (allowNegativeDimensions === void 0) { allowNegativeDimensions = false; }
        return _super.call(this, { x: x, y: y, width: width, height: height }, allowNegativeDimensions) || this;
    }
    return Rect;
}(Box));

//# sourceMappingURL=Rect.js.map
;// ./node_modules/face-api.js/build/es6/classes/FaceLandmarks.js







// face alignment constants
var relX = 0.5;
var relY = 0.43;
var relScale = 0.45;
var FaceLandmarks = /** @class */ (function () {
    function FaceLandmarks(relativeFaceLandmarkPositions, imgDims, shift) {
        if (shift === void 0) { shift = new Point(0, 0); }
        var width = imgDims.width, height = imgDims.height;
        this._imgDims = new Dimensions(width, height);
        this._shift = shift;
        this._positions = relativeFaceLandmarkPositions.map(function (pt) { return pt.mul(new Point(width, height)).add(shift); });
    }
    Object.defineProperty(FaceLandmarks.prototype, "shift", {
        get: function () { return new Point(this._shift.x, this._shift.y); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceLandmarks.prototype, "imageWidth", {
        get: function () { return this._imgDims.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceLandmarks.prototype, "imageHeight", {
        get: function () { return this._imgDims.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceLandmarks.prototype, "positions", {
        get: function () { return this._positions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceLandmarks.prototype, "relativePositions", {
        get: function () {
            var _this = this;
            return this._positions.map(function (pt) { return pt.sub(_this._shift).div(new Point(_this.imageWidth, _this.imageHeight)); });
        },
        enumerable: true,
        configurable: true
    });
    FaceLandmarks.prototype.forSize = function (width, height) {
        return new this.constructor(this.relativePositions, { width: width, height: height });
    };
    FaceLandmarks.prototype.shiftBy = function (x, y) {
        return new this.constructor(this.relativePositions, this._imgDims, new Point(x, y));
    };
    FaceLandmarks.prototype.shiftByPoint = function (pt) {
        return this.shiftBy(pt.x, pt.y);
    };
    /**
     * Aligns the face landmarks after face detection from the relative positions of the faces
     * bounding box, or it's current shift. This function should be used to align the face images
     * after face detection has been performed, before they are passed to the face recognition net.
     * This will make the computed face descriptor more accurate.
     *
     * @param detection (optional) The bounding box of the face or the face detection result. If
     * no argument was passed the position of the face landmarks are assumed to be relative to
     * it's current shift.
     * @returns The bounding box of the aligned face.
     */
    FaceLandmarks.prototype.align = function (detection, options) {
        if (options === void 0) { options = {}; }
        if (detection) {
            var box = detection instanceof FaceDetection
                ? detection.box.floor()
                : new Box(detection);
            return this.shiftBy(box.x, box.y).align(null, options);
        }
        var _a = Object.assign({}, { useDlibAlignment: false, minBoxPadding: 0.2 }, options), useDlibAlignment = _a.useDlibAlignment, minBoxPadding = _a.minBoxPadding;
        if (useDlibAlignment) {
            return this.alignDlib();
        }
        return this.alignMinBbox(minBoxPadding);
    };
    FaceLandmarks.prototype.alignDlib = function () {
        var centers = this.getRefPointsForAlignment();
        var leftEyeCenter = centers[0], rightEyeCenter = centers[1], mouthCenter = centers[2];
        var distToMouth = function (pt) { return mouthCenter.sub(pt).magnitude(); };
        var eyeToMouthDist = (distToMouth(leftEyeCenter) + distToMouth(rightEyeCenter)) / 2;
        var size = Math.floor(eyeToMouthDist / relScale);
        var refPoint = getCenterPoint(centers);
        // TODO: pad in case rectangle is out of image bounds
        var x = Math.floor(Math.max(0, refPoint.x - (relX * size)));
        var y = Math.floor(Math.max(0, refPoint.y - (relY * size)));
        return new Rect(x, y, Math.min(size, this.imageWidth + x), Math.min(size, this.imageHeight + y));
    };
    FaceLandmarks.prototype.alignMinBbox = function (padding) {
        var box = minBbox(this.positions);
        return box.pad(box.width * padding, box.height * padding);
    };
    FaceLandmarks.prototype.getRefPointsForAlignment = function () {
        throw new Error('getRefPointsForAlignment not implemented by base class');
    };
    return FaceLandmarks;
}());

//# sourceMappingURL=FaceLandmarks.js.map
;// ./node_modules/face-api.js/build/es6/classes/FaceLandmarks5.js



var FaceLandmarks5 = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceLandmarks5, _super);
    function FaceLandmarks5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaceLandmarks5.prototype.getRefPointsForAlignment = function () {
        var pts = this.positions;
        return [
            pts[0],
            pts[1],
            getCenterPoint([pts[3], pts[4]])
        ];
    };
    return FaceLandmarks5;
}(FaceLandmarks));

//# sourceMappingURL=FaceLandmarks5.js.map
;// ./node_modules/face-api.js/build/es6/classes/FaceLandmarks68.js



var FaceLandmarks68 = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceLandmarks68, _super);
    function FaceLandmarks68() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaceLandmarks68.prototype.getJawOutline = function () {
        return this.positions.slice(0, 17);
    };
    FaceLandmarks68.prototype.getLeftEyeBrow = function () {
        return this.positions.slice(17, 22);
    };
    FaceLandmarks68.prototype.getRightEyeBrow = function () {
        return this.positions.slice(22, 27);
    };
    FaceLandmarks68.prototype.getNose = function () {
        return this.positions.slice(27, 36);
    };
    FaceLandmarks68.prototype.getLeftEye = function () {
        return this.positions.slice(36, 42);
    };
    FaceLandmarks68.prototype.getRightEye = function () {
        return this.positions.slice(42, 48);
    };
    FaceLandmarks68.prototype.getMouth = function () {
        return this.positions.slice(48, 68);
    };
    FaceLandmarks68.prototype.getRefPointsForAlignment = function () {
        return [
            this.getLeftEye(),
            this.getRightEye(),
            this.getMouth()
        ].map(getCenterPoint);
    };
    return FaceLandmarks68;
}(FaceLandmarks));

//# sourceMappingURL=FaceLandmarks68.js.map
;// ./node_modules/face-api.js/build/es6/classes/FaceMatch.js

var FaceMatch = /** @class */ (function () {
    function FaceMatch(label, distance) {
        this._label = label;
        this._distance = distance;
    }
    Object.defineProperty(FaceMatch.prototype, "label", {
        get: function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceMatch.prototype, "distance", {
        get: function () { return this._distance; },
        enumerable: true,
        configurable: true
    });
    FaceMatch.prototype.toString = function (withDistance) {
        if (withDistance === void 0) { withDistance = true; }
        return "" + this.label + (withDistance ? " (" + round(this.distance) + ")" : '');
    };
    return FaceMatch;
}());

//# sourceMappingURL=FaceMatch.js.map
;// ./node_modules/face-api.js/build/es6/classes/LabeledBox.js



var LabeledBox = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(LabeledBox, _super);
    function LabeledBox(box, label) {
        var _this = _super.call(this, box) || this;
        _this._label = label;
        return _this;
    }
    LabeledBox.assertIsValidLabeledBox = function (box, callee) {
        Box.assertIsValidBox(box, callee);
        if (!isValidNumber(box.label)) {
            throw new Error(callee + " - expected property label (" + box.label + ") to be a number");
        }
    };
    Object.defineProperty(LabeledBox.prototype, "label", {
        get: function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    return LabeledBox;
}(Box));

//# sourceMappingURL=LabeledBox.js.map
;// ./node_modules/face-api.js/build/es6/classes/LabeledFaceDescriptors.js
var LabeledFaceDescriptors = /** @class */ (function () {
    function LabeledFaceDescriptors(label, descriptors) {
        if (!(typeof label === 'string')) {
            throw new Error('LabeledFaceDescriptors - constructor expected label to be a string');
        }
        if (!Array.isArray(descriptors) || descriptors.some(function (desc) { return !(desc instanceof Float32Array); })) {
            throw new Error('LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array');
        }
        this._label = label;
        this._descriptors = descriptors;
    }
    Object.defineProperty(LabeledFaceDescriptors.prototype, "label", {
        get: function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LabeledFaceDescriptors.prototype, "descriptors", {
        get: function () { return this._descriptors; },
        enumerable: true,
        configurable: true
    });
    LabeledFaceDescriptors.prototype.toJSON = function () {
        return {
            label: this.label,
            descriptors: this.descriptors.map(function (d) { return Array.from(d); })
        };
    };
    LabeledFaceDescriptors.fromJSON = function (json) {
        var descriptors = json.descriptors.map(function (d) {
            return new Float32Array(d);
        });
        return new LabeledFaceDescriptors(json.label, descriptors);
    };
    return LabeledFaceDescriptors;
}());

//# sourceMappingURL=LabeledFaceDescriptors.js.map
;// ./node_modules/face-api.js/build/es6/classes/PredictedBox.js



var PredictedBox = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictedBox, _super);
    function PredictedBox(box, label, score, classScore) {
        var _this = _super.call(this, box, label) || this;
        _this._score = score;
        _this._classScore = classScore;
        return _this;
    }
    PredictedBox.assertIsValidPredictedBox = function (box, callee) {
        LabeledBox.assertIsValidLabeledBox(box, callee);
        if (!utils_isValidProbablitiy(box.score)
            || !utils_isValidProbablitiy(box.classScore)) {
            throw new Error(callee + " - expected properties score (" + box.score + ") and (" + box.classScore + ") to be a number between [0, 1]");
        }
    };
    Object.defineProperty(PredictedBox.prototype, "score", {
        get: function () { return this._score; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PredictedBox.prototype, "classScore", {
        get: function () { return this._classScore; },
        enumerable: true,
        configurable: true
    });
    return PredictedBox;
}(LabeledBox));

//# sourceMappingURL=PredictedBox.js.map
;// ./node_modules/face-api.js/build/es6/classes/index.js














//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/factories/WithFaceDetection.js

function isWithFaceDetection(obj) {
    return obj['detection'] instanceof FaceDetection;
}
function extendWithFaceDetection(sourceObj, detection) {
    var extension = { detection: detection };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithFaceDetection.js.map
;// ./node_modules/face-api.js/build/es6/env/createBrowserEnv.js
function createBrowserEnv() {
    var fetch = window['fetch'] || function () {
        throw new Error('fetch - missing fetch implementation for browser environment');
    };
    var readFile = function () {
        throw new Error('readFile - filesystem not available for browser environment');
    };
    return {
        Canvas: HTMLCanvasElement,
        CanvasRenderingContext2D: CanvasRenderingContext2D,
        Image: HTMLImageElement,
        ImageData: ImageData,
        Video: HTMLVideoElement,
        createCanvasElement: function () { return document.createElement('canvas'); },
        createImageElement: function () { return document.createElement('img'); },
        fetch: fetch,
        readFile: readFile
    };
}
//# sourceMappingURL=createBrowserEnv.js.map
;// ./node_modules/face-api.js/build/es6/env/createFileSystem.js
function createFileSystem(fs) {
    var requireFsError = '';
    if (!fs) {
        try {
            fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'fs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
        }
        catch (err) {
            requireFsError = err.toString();
        }
    }
    var readFile = fs
        ? function (filePath) {
            return new Promise(function (res, rej) {
                fs.readFile(filePath, function (err, buffer) {
                    return err ? rej(err) : res(buffer);
                });
            });
        }
        : function () {
            throw new Error("readFile - failed to require fs in nodejs environment with error: " + requireFsError);
        };
    return {
        readFile: readFile
    };
}
//# sourceMappingURL=createFileSystem.js.map
;// ./node_modules/face-api.js/build/es6/env/createNodejsEnv.js


function createNodejsEnv() {
    var Canvas = __webpack_require__.g['Canvas'] || __webpack_require__.g['HTMLCanvasElement'];
    var Image = __webpack_require__.g['Image'] || __webpack_require__.g['HTMLImageElement'];
    var createCanvasElement = function () {
        if (Canvas) {
            return new Canvas();
        }
        throw new Error('createCanvasElement - missing Canvas implementation for nodejs environment');
    };
    var createImageElement = function () {
        if (Image) {
            return new Image();
        }
        throw new Error('createImageElement - missing Image implementation for nodejs environment');
    };
    var fetch = __webpack_require__.g['fetch'] || function () {
        throw new Error('fetch - missing fetch implementation for nodejs environment');
    };
    var fileSystem = createFileSystem();
    return (0,tslib_es6/* __assign */.Cl)({ Canvas: Canvas || /** @class */ (function () {
            function Canvas() {
            }
            return Canvas;
        }()), CanvasRenderingContext2D: __webpack_require__.g['CanvasRenderingContext2D'] || /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()), Image: Image || /** @class */ (function () {
            function Image() {
            }
            return Image;
        }()), ImageData: __webpack_require__.g['ImageData'] || /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()), Video: __webpack_require__.g['HTMLVideoElement'] || /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()), createCanvasElement: createCanvasElement,
        createImageElement: createImageElement,
        fetch: fetch }, fileSystem);
}
//# sourceMappingURL=createNodejsEnv.js.map
;// ./node_modules/face-api.js/build/es6/env/isBrowser.js
function isBrowser() {
    return typeof window === 'object'
        && typeof document !== 'undefined'
        && typeof HTMLImageElement !== 'undefined'
        && typeof HTMLCanvasElement !== 'undefined'
        && typeof HTMLVideoElement !== 'undefined'
        && typeof ImageData !== 'undefined'
        && typeof CanvasRenderingContext2D !== 'undefined';
}
//# sourceMappingURL=isBrowser.js.map
;// ./node_modules/face-api.js/build/es6/env/isNodejs.js
function isNodejs() {
    return typeof __webpack_require__.g === 'object'
        && "function" === 'function'
        && "object" !== 'undefined'
        // issues with gatsby.js: module.exports is undefined
        // && !!module.exports
        && typeof process !== 'undefined' && !!process.version;
}
//# sourceMappingURL=isNodejs.js.map
;// ./node_modules/face-api.js/build/es6/env/index.js





var environment;
function getEnv() {
    if (!environment) {
        throw new Error('getEnv - environment is not defined, check isNodejs() and isBrowser()');
    }
    return environment;
}
function setEnv(env) {
    environment = env;
}
function initialize() {
    // check for isBrowser() first to prevent electron renderer process
    // to be initialized with wrong environment due to isNodejs() returning true
    if (isBrowser()) {
        setEnv(createBrowserEnv());
    }
    if (isNodejs()) {
        setEnv(createNodejsEnv());
    }
}
function monkeyPatch(env) {
    if (!environment) {
        initialize();
    }
    if (!environment) {
        throw new Error('monkeyPatch - environment is not defined, check isNodejs() and isBrowser()');
    }
    var _a = env.Canvas, Canvas = _a === void 0 ? environment.Canvas : _a, _b = env.Image, Image = _b === void 0 ? environment.Image : _b;
    environment.Canvas = Canvas;
    environment.Image = Image;
    environment.createCanvasElement = env.createCanvasElement || (function () { return new Canvas(); });
    environment.createImageElement = env.createImageElement || (function () { return new Image(); });
    environment.ImageData = env.ImageData || environment.ImageData;
    environment.Video = env.Video || environment.Video;
    environment.fetch = env.fetch || environment.fetch;
    environment.readFile = env.readFile || environment.readFile;
}
var env_env = {
    getEnv: getEnv,
    setEnv: setEnv,
    initialize: initialize,
    createBrowserEnv: createBrowserEnv,
    createFileSystem: createFileSystem,
    createNodejsEnv: createNodejsEnv,
    monkeyPatch: monkeyPatch,
    isBrowser: isBrowser,
    isNodejs: isNodejs
};
initialize();
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/dom/resolveInput.js

function resolveInput(arg) {
    if (!env_env.isNodejs() && typeof arg === 'string') {
        return document.getElementById(arg);
    }
    return arg;
}
//# sourceMappingURL=resolveInput.js.map
;// ./node_modules/face-api.js/build/es6/dom/getContext2dOrThrow.js


function getContext2dOrThrow(canvasArg) {
    var _a = env_env.getEnv(), Canvas = _a.Canvas, CanvasRenderingContext2D = _a.CanvasRenderingContext2D;
    if (canvasArg instanceof CanvasRenderingContext2D) {
        return canvasArg;
    }
    var canvas = resolveInput(canvasArg);
    if (!(canvas instanceof Canvas)) {
        throw new Error('resolveContext2d - expected canvas to be of instance of Canvas');
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('resolveContext2d - canvas 2d context is null');
    }
    return ctx;
}
//# sourceMappingURL=getContext2dOrThrow.js.map
;// ./node_modules/face-api.js/build/es6/draw/DrawTextField.js


var AnchorPosition;
(function (AnchorPosition) {
    AnchorPosition["TOP_LEFT"] = "TOP_LEFT";
    AnchorPosition["TOP_RIGHT"] = "TOP_RIGHT";
    AnchorPosition["BOTTOM_LEFT"] = "BOTTOM_LEFT";
    AnchorPosition["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
})(AnchorPosition || (AnchorPosition = {}));
var DrawTextFieldOptions = /** @class */ (function () {
    function DrawTextFieldOptions(options) {
        if (options === void 0) { options = {}; }
        var anchorPosition = options.anchorPosition, backgroundColor = options.backgroundColor, fontColor = options.fontColor, fontSize = options.fontSize, fontStyle = options.fontStyle, padding = options.padding;
        this.anchorPosition = anchorPosition || AnchorPosition.TOP_LEFT;
        this.backgroundColor = backgroundColor || 'rgba(0, 0, 0, 0.5)';
        this.fontColor = fontColor || 'rgba(255, 255, 255, 1)';
        this.fontSize = fontSize || 14;
        this.fontStyle = fontStyle || 'Georgia';
        this.padding = padding || 4;
    }
    return DrawTextFieldOptions;
}());

var DrawTextField = /** @class */ (function () {
    function DrawTextField(text, anchor, options) {
        if (options === void 0) { options = {}; }
        this.text = typeof text === 'string'
            ? [text]
            : (text instanceof DrawTextField ? text.text : text);
        this.anchor = anchor;
        this.options = new DrawTextFieldOptions(options);
    }
    DrawTextField.prototype.measureWidth = function (ctx) {
        var padding = this.options.padding;
        return this.text.map(function (l) { return ctx.measureText(l).width; }).reduce(function (w0, w1) { return w0 < w1 ? w1 : w0; }, 0) + (2 * padding);
    };
    DrawTextField.prototype.measureHeight = function () {
        var _a = this.options, fontSize = _a.fontSize, padding = _a.padding;
        return this.text.length * fontSize + (2 * padding);
    };
    DrawTextField.prototype.getUpperLeft = function (ctx, canvasDims) {
        var anchorPosition = this.options.anchorPosition;
        var isShiftLeft = anchorPosition === AnchorPosition.BOTTOM_RIGHT || anchorPosition === AnchorPosition.TOP_RIGHT;
        var isShiftTop = anchorPosition === AnchorPosition.BOTTOM_LEFT || anchorPosition === AnchorPosition.BOTTOM_RIGHT;
        var textFieldWidth = this.measureWidth(ctx);
        var textFieldHeight = this.measureHeight();
        var x = (isShiftLeft ? this.anchor.x - textFieldWidth : this.anchor.x);
        var y = isShiftTop ? this.anchor.y - textFieldHeight : this.anchor.y;
        // adjust anchor if text box exceeds canvas borders
        if (canvasDims) {
            var width = canvasDims.width, height = canvasDims.height;
            var newX = Math.max(Math.min(x, width - textFieldWidth), 0);
            var newY = Math.max(Math.min(y, height - textFieldHeight), 0);
            return { x: newX, y: newY };
        }
        return { x: x, y: y };
    };
    DrawTextField.prototype.draw = function (canvasArg) {
        var canvas = resolveInput(canvasArg);
        var ctx = getContext2dOrThrow(canvas);
        var _a = this.options, backgroundColor = _a.backgroundColor, fontColor = _a.fontColor, fontSize = _a.fontSize, fontStyle = _a.fontStyle, padding = _a.padding;
        ctx.font = fontSize + "px " + fontStyle;
        var maxTextWidth = this.measureWidth(ctx);
        var textHeight = this.measureHeight();
        ctx.fillStyle = backgroundColor;
        var upperLeft = this.getUpperLeft(ctx, canvas);
        ctx.fillRect(upperLeft.x, upperLeft.y, maxTextWidth, textHeight);
        ctx.fillStyle = fontColor;
        this.text.forEach(function (textLine, i) {
            var x = padding + upperLeft.x;
            var y = padding + upperLeft.y + ((i + 1) * fontSize);
            ctx.fillText(textLine, x, y);
        });
    };
    return DrawTextField;
}());

//# sourceMappingURL=DrawTextField.js.map
;// ./node_modules/face-api.js/build/es6/draw/DrawBox.js



var DrawBoxOptions = /** @class */ (function () {
    function DrawBoxOptions(options) {
        if (options === void 0) { options = {}; }
        var boxColor = options.boxColor, lineWidth = options.lineWidth, label = options.label, drawLabelOptions = options.drawLabelOptions;
        this.boxColor = boxColor || 'rgba(0, 0, 255, 1)';
        this.lineWidth = lineWidth || 2;
        this.label = label;
        var defaultDrawLabelOptions = {
            anchorPosition: AnchorPosition.BOTTOM_LEFT,
            backgroundColor: this.boxColor
        };
        this.drawLabelOptions = new DrawTextFieldOptions(Object.assign({}, defaultDrawLabelOptions, drawLabelOptions));
    }
    return DrawBoxOptions;
}());

var DrawBox = /** @class */ (function () {
    function DrawBox(box, options) {
        if (options === void 0) { options = {}; }
        this.box = new Box(box);
        this.options = new DrawBoxOptions(options);
    }
    DrawBox.prototype.draw = function (canvasArg) {
        var ctx = getContext2dOrThrow(canvasArg);
        var _a = this.options, boxColor = _a.boxColor, lineWidth = _a.lineWidth;
        var _b = this.box, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
        var label = this.options.label;
        if (label) {
            new DrawTextField([label], { x: x - (lineWidth / 2), y: y }, this.options.drawLabelOptions).draw(canvasArg);
        }
    };
    return DrawBox;
}());

//# sourceMappingURL=DrawBox.js.map
;// ./node_modules/face-api.js/build/es6/draw/drawDetections.js





function drawDetections(canvasArg, detections) {
    var detectionsArray = Array.isArray(detections) ? detections : [detections];
    detectionsArray.forEach(function (det) {
        var score = det instanceof FaceDetection
            ? det.score
            : (isWithFaceDetection(det) ? det.detection.score : undefined);
        var box = det instanceof FaceDetection
            ? det.box
            : (isWithFaceDetection(det) ? det.detection.box : new Box(det));
        var label = score ? "" + round(score) : undefined;
        new DrawBox(box, { label: label }).draw(canvasArg);
    });
}
//# sourceMappingURL=drawDetections.js.map
;// ./node_modules/face-api.js/build/es6/dom/isMediaLoaded.js

function isMediaLoaded(media) {
    var _a = env_env.getEnv(), Image = _a.Image, Video = _a.Video;
    return (media instanceof Image && media.complete)
        || (media instanceof Video && media.readyState >= 3);
}
//# sourceMappingURL=isMediaLoaded.js.map
;// ./node_modules/face-api.js/build/es6/dom/awaitMediaLoaded.js


function awaitMediaLoaded(media) {
    return new Promise(function (resolve, reject) {
        if (media instanceof env_env.getEnv().Canvas || isMediaLoaded(media)) {
            return resolve();
        }
        function onLoad(e) {
            if (!e.currentTarget)
                return;
            e.currentTarget.removeEventListener('load', onLoad);
            e.currentTarget.removeEventListener('error', onError);
            resolve(e);
        }
        function onError(e) {
            if (!e.currentTarget)
                return;
            e.currentTarget.removeEventListener('load', onLoad);
            e.currentTarget.removeEventListener('error', onError);
            reject(e);
        }
        media.addEventListener('load', onLoad);
        media.addEventListener('error', onError);
    });
}
//# sourceMappingURL=awaitMediaLoaded.js.map
;// ./node_modules/face-api.js/build/es6/dom/bufferToImage.js

function bufferToImage_bufferToImage(buf) {
    return new Promise(function (resolve, reject) {
        if (!(buf instanceof Blob)) {
            return reject('bufferToImage - expected buf to be of type: Blob');
        }
        var reader = new FileReader();
        reader.onload = function () {
            if (typeof reader.result !== 'string') {
                return reject('bufferToImage - expected reader.result to be a string, in onload');
            }
            var img = env.getEnv().createImageElement();
            img.onload = function () { return resolve(img); };
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(buf);
    });
}
//# sourceMappingURL=bufferToImage.js.map
;// ./node_modules/face-api.js/build/es6/dom/getMediaDimensions.js


function getMediaDimensions_getMediaDimensions(input) {
    var _a = env_env.getEnv(), Image = _a.Image, Video = _a.Video;
    if (input instanceof Image) {
        return new Dimensions(input.naturalWidth, input.naturalHeight);
    }
    if (input instanceof Video) {
        return new Dimensions(input.videoWidth, input.videoHeight);
    }
    return new Dimensions(input.width, input.height);
}
//# sourceMappingURL=getMediaDimensions.js.map
;// ./node_modules/face-api.js/build/es6/dom/createCanvas.js




function createCanvas(_a) {
    var width = _a.width, height = _a.height;
    var createCanvasElement = env_env.getEnv().createCanvasElement;
    var canvas = createCanvasElement();
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
function createCanvasFromMedia(media, dims) {
    var ImageData = env_env.getEnv().ImageData;
    if (!(media instanceof ImageData) && !isMediaLoaded(media)) {
        throw new Error('createCanvasFromMedia - media has not finished loading yet');
    }
    var _a = dims || getMediaDimensions_getMediaDimensions(media), width = _a.width, height = _a.height;
    var canvas = createCanvas({ width: width, height: height });
    if (media instanceof ImageData) {
        getContext2dOrThrow(canvas).putImageData(media, 0, 0);
    }
    else {
        getContext2dOrThrow(canvas).drawImage(media, 0, 0, width, height);
    }
    return canvas;
}
//# sourceMappingURL=createCanvas.js.map
;// ./node_modules/face-api.js/build/es6/dom/imageTensorToCanvas.js




function imageTensorToCanvas(imgTensor, canvas) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var targetCanvas, _a, height, width, numChannels, imgTensor3D;
        return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    targetCanvas = canvas || env_env.getEnv().createCanvasElement();
                    _a = imgTensor.shape.slice(isTensor4D(imgTensor) ? 1 : 0), height = _a[0], width = _a[1], numChannels = _a[2];
                    imgTensor3D = tf_core_esm/* tidy */.DZQ(function () { return imgTensor.as3D(height, width, numChannels).toInt(); });
                    return [4 /*yield*/, tf_core_esm/* browser */.TaL.toPixels(imgTensor3D, targetCanvas)];
                case 1:
                    _b.sent();
                    imgTensor3D.dispose();
                    return [2 /*return*/, targetCanvas];
            }
        });
    });
}
//# sourceMappingURL=imageTensorToCanvas.js.map
;// ./node_modules/face-api.js/build/es6/dom/isMediaElement.js

function isMediaElement(input) {
    var _a = env_env.getEnv(), Image = _a.Image, Canvas = _a.Canvas, Video = _a.Video;
    return input instanceof Image
        || input instanceof Canvas
        || input instanceof Video;
}
//# sourceMappingURL=isMediaElement.js.map
;// ./node_modules/face-api.js/build/es6/dom/imageToSquare.js




function imageToSquare(input, inputSize, centerImage) {
    if (centerImage === void 0) { centerImage = false; }
    var _a = env_env.getEnv(), Image = _a.Image, Canvas = _a.Canvas;
    if (!(input instanceof Image || input instanceof Canvas)) {
        throw new Error('imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement');
    }
    var dims = getMediaDimensions_getMediaDimensions(input);
    var scale = inputSize / Math.max(dims.height, dims.width);
    var width = scale * dims.width;
    var height = scale * dims.height;
    var targetCanvas = createCanvas({ width: inputSize, height: inputSize });
    var inputCanvas = input instanceof Canvas ? input : createCanvasFromMedia(input);
    var offset = Math.abs(width - height) / 2;
    var dx = centerImage && width < height ? offset : 0;
    var dy = centerImage && height < width ? offset : 0;
    getContext2dOrThrow(targetCanvas).drawImage(inputCanvas, dx, dy, width, height);
    return targetCanvas;
}
//# sourceMappingURL=imageToSquare.js.map
;// ./node_modules/face-api.js/build/es6/dom/NetInput.js






var NetInput = /** @class */ (function () {
    function NetInput(inputs, treatAsBatchInput) {
        var _this = this;
        if (treatAsBatchInput === void 0) { treatAsBatchInput = false; }
        this._imageTensors = [];
        this._canvases = [];
        this._treatAsBatchInput = false;
        this._inputDimensions = [];
        if (!Array.isArray(inputs)) {
            throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have " + inputs);
        }
        this._treatAsBatchInput = treatAsBatchInput;
        this._batchSize = inputs.length;
        inputs.forEach(function (input, idx) {
            if (isTensor3D(input)) {
                _this._imageTensors[idx] = input;
                _this._inputDimensions[idx] = input.shape;
                return;
            }
            if (isTensor4D(input)) {
                var batchSize = input.shape[0];
                if (batchSize !== 1) {
                    throw new Error("NetInput - tf.Tensor4D with batchSize " + batchSize + " passed, but not supported in input array");
                }
                _this._imageTensors[idx] = input;
                _this._inputDimensions[idx] = input.shape.slice(1);
                return;
            }
            var canvas = input instanceof env_env.getEnv().Canvas ? input : createCanvasFromMedia(input);
            _this._canvases[idx] = canvas;
            _this._inputDimensions[idx] = [canvas.height, canvas.width, 3];
        });
    }
    Object.defineProperty(NetInput.prototype, "imageTensors", {
        get: function () {
            return this._imageTensors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "canvases", {
        get: function () {
            return this._canvases;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "isBatchInput", {
        get: function () {
            return this.batchSize > 1 || this._treatAsBatchInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "batchSize", {
        get: function () {
            return this._batchSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "inputDimensions", {
        get: function () {
            return this._inputDimensions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "inputSize", {
        get: function () {
            return this._inputSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetInput.prototype, "reshapedInputDimensions", {
        get: function () {
            var _this = this;
            return range(this.batchSize, 0, 1).map(function (_, batchIdx) { return _this.getReshapedInputDimensions(batchIdx); });
        },
        enumerable: true,
        configurable: true
    });
    NetInput.prototype.getInput = function (batchIdx) {
        return this.canvases[batchIdx] || this.imageTensors[batchIdx];
    };
    NetInput.prototype.getInputDimensions = function (batchIdx) {
        return this._inputDimensions[batchIdx];
    };
    NetInput.prototype.getInputHeight = function (batchIdx) {
        return this._inputDimensions[batchIdx][0];
    };
    NetInput.prototype.getInputWidth = function (batchIdx) {
        return this._inputDimensions[batchIdx][1];
    };
    NetInput.prototype.getReshapedInputDimensions = function (batchIdx) {
        if (typeof this.inputSize !== 'number') {
            throw new Error('getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet');
        }
        var width = this.getInputWidth(batchIdx);
        var height = this.getInputHeight(batchIdx);
        return computeReshapedDimensions({ width: width, height: height }, this.inputSize);
    };
    /**
     * Create a batch tensor from all input canvases and tensors
     * with size [batchSize, inputSize, inputSize, 3].
     *
     * @param inputSize Height and width of the tensor.
     * @param isCenterImage (optional, default: false) If true, add an equal amount of padding on
     * both sides of the minor dimension oof the image.
     * @returns The batch tensor.
     */
    NetInput.prototype.toBatchTensor = function (inputSize, isCenterInputs) {
        var _this = this;
        if (isCenterInputs === void 0) { isCenterInputs = true; }
        this._inputSize = inputSize;
        return tf_core_esm/* tidy */.DZQ(function () {
            var inputTensors = range(_this.batchSize, 0, 1).map(function (batchIdx) {
                var input = _this.getInput(batchIdx);
                if (input instanceof tf_core_esm/* Tensor */.qYS) {
                    var imgTensor = isTensor4D(input) ? input : input.expandDims();
                    imgTensor = padToSquare(imgTensor, isCenterInputs);
                    if (imgTensor.shape[1] !== inputSize || imgTensor.shape[2] !== inputSize) {
                        imgTensor = tf_core_esm/* image */.Slp.resizeBilinear(imgTensor, [inputSize, inputSize]);
                    }
                    return imgTensor.as3D(inputSize, inputSize, 3);
                }
                if (input instanceof env_env.getEnv().Canvas) {
                    return tf_core_esm/* browser */.TaL.fromPixels(imageToSquare(input, inputSize, isCenterInputs));
                }
                throw new Error("toBatchTensor - at batchIdx " + batchIdx + ", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have " + input);
            });
            var batchTensor = tf_core_esm/* stack */.t$z(inputTensors.map(function (t) { return t.toFloat(); })).as4D(_this.batchSize, inputSize, inputSize, 3);
            return batchTensor;
        });
    };
    return NetInput;
}());

//# sourceMappingURL=NetInput.js.map
;// ./node_modules/face-api.js/build/es6/dom/toNetInput.js






/**
 * Validates the input to make sure, they are valid net inputs and awaits all media elements
 * to be finished loading.
 *
 * @param input The input, which can be a media element or an array of different media elements.
 * @returns A NetInput instance, which can be passed into one of the neural networks.
 */
function toNetInput(inputs) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var inputArgArray, getIdxHint, inputArray;
        return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (inputs instanceof NetInput) {
                        return [2 /*return*/, inputs];
                    }
                    inputArgArray = Array.isArray(inputs)
                        ? inputs
                        : [inputs];
                    if (!inputArgArray.length) {
                        throw new Error('toNetInput - empty array passed as input');
                    }
                    getIdxHint = function (idx) { return Array.isArray(inputs) ? " at input index " + idx + ":" : ''; };
                    inputArray = inputArgArray.map(resolveInput);
                    inputArray.forEach(function (input, i) {
                        if (!isMediaElement(input) && !isTensor3D(input) && !isTensor4D(input)) {
                            if (typeof inputArgArray[i] === 'string') {
                                throw new Error("toNetInput -" + getIdxHint(i) + " string passed, but could not resolve HTMLElement for element id " + inputArgArray[i]);
                            }
                            throw new Error("toNetInput -" + getIdxHint(i) + " expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id");
                        }
                        if (isTensor4D(input)) {
                            // if tf.Tensor4D is passed in the input array, the batch size has to be 1
                            var batchSize = input.shape[0];
                            if (batchSize !== 1) {
                                throw new Error("toNetInput -" + getIdxHint(i) + " tf.Tensor4D with batchSize " + batchSize + " passed, but not supported in input array");
                            }
                        }
                    });
                    // wait for all media elements being loaded
                    return [4 /*yield*/, Promise.all(inputArray.map(function (input) { return isMediaElement(input) && awaitMediaLoaded(input); }))];
                case 1:
                    // wait for all media elements being loaded
                    _a.sent();
                    return [2 /*return*/, new NetInput(inputArray, Array.isArray(inputs))];
            }
        });
    });
}
//# sourceMappingURL=toNetInput.js.map
;// ./node_modules/face-api.js/build/es6/dom/extractFaces.js







/**
 * Extracts the image regions containing the detected faces.
 *
 * @param input The image that face detection has been performed on.
 * @param detections The face detection results or face bounding boxes for that image.
 * @returns The Canvases of the corresponding image region for each detected face.
 */
function extractFaces(input, detections) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var Canvas, canvas, netInput, tensorOrCanvas, _a, ctx, boxes;
        return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Canvas = env_env.getEnv().Canvas;
                    canvas = input;
                    if (!!(input instanceof Canvas)) return [3 /*break*/, 5];
                    return [4 /*yield*/, toNetInput(input)];
                case 1:
                    netInput = _b.sent();
                    if (netInput.batchSize > 1) {
                        throw new Error('extractFaces - batchSize > 1 not supported');
                    }
                    tensorOrCanvas = netInput.getInput(0);
                    if (!(tensorOrCanvas instanceof Canvas)) return [3 /*break*/, 2];
                    _a = tensorOrCanvas;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, imageTensorToCanvas(tensorOrCanvas)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    canvas = _a;
                    _b.label = 5;
                case 5:
                    ctx = getContext2dOrThrow(canvas);
                    boxes = detections.map(function (det) { return det instanceof FaceDetection
                        ? det.forSize(canvas.width, canvas.height).box.floor()
                        : det; })
                        .map(function (box) { return box.clipAtImageBorders(canvas.width, canvas.height); });
                    return [2 /*return*/, boxes.map(function (_a) {
                            var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                            var faceImg = createCanvas({ width: width, height: height });
                            getContext2dOrThrow(faceImg)
                                .putImageData(ctx.getImageData(x, y, width, height), 0, 0);
                            return faceImg;
                        })];
            }
        });
    });
}
//# sourceMappingURL=extractFaces.js.map
;// ./node_modules/face-api.js/build/es6/dom/extractFaceTensors.js




/**
 * Extracts the tensors of the image regions containing the detected faces.
 * Useful if you want to compute the face descriptors for the face images.
 * Using this method is faster then extracting a canvas for each face and
 * converting them to tensors individually.
 *
 * @param imageTensor The image tensor that face detection has been performed on.
 * @param detections The face detection results or face bounding boxes for that image.
 * @returns Tensors of the corresponding image region for each detected face.
 */
function extractFaceTensors(imageTensor, detections) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
            if (!isTensor3D(imageTensor) && !isTensor4D(imageTensor)) {
                throw new Error('extractFaceTensors - expected image tensor to be 3D or 4D');
            }
            if (isTensor4D(imageTensor) && imageTensor.shape[0] > 1) {
                throw new Error('extractFaceTensors - batchSize > 1 not supported');
            }
            return [2 /*return*/, tf_core_esm/* tidy */.DZQ(function () {
                    var _a = imageTensor.shape.slice(isTensor4D(imageTensor) ? 1 : 0), imgHeight = _a[0], imgWidth = _a[1], numChannels = _a[2];
                    var boxes = detections.map(function (det) { return det instanceof FaceDetection
                        ? det.forSize(imgWidth, imgHeight).box
                        : det; })
                        .map(function (box) { return box.clipAtImageBorders(imgWidth, imgHeight); });
                    var faceTensors = boxes.map(function (_a) {
                        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                        return tf_core_esm/* slice3d */.wck(imageTensor.as3D(imgHeight, imgWidth, numChannels), [y, x, 0], [height, width, numChannels]);
                    });
                    return faceTensors;
                })];
        });
    });
}
//# sourceMappingURL=extractFaceTensors.js.map
;// ./node_modules/face-api.js/build/es6/dom/fetchOrThrow.js


function fetchOrThrow_fetchOrThrow(url, init) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var fetch, res;
        return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetch = env_env.getEnv().fetch;
                    return [4 /*yield*/, fetch(url, init)];
                case 1:
                    res = _a.sent();
                    if (!(res.status < 400)) {
                        throw new Error("failed to fetch: (" + res.status + ") " + res.statusText + ", from url: " + res.url);
                    }
                    return [2 /*return*/, res];
            }
        });
    });
}
//# sourceMappingURL=fetchOrThrow.js.map
;// ./node_modules/face-api.js/build/es6/dom/fetchImage.js



function fetchImage(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var res, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrThrow(uri)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, (res).blob()];
                case 2:
                    blob = _a.sent();
                    if (!blob.type.startsWith('image/')) {
                        throw new Error("fetchImage - expected blob type to be of type image/*, instead have: " + blob.type + ", for url: " + res.url);
                    }
                    return [2 /*return*/, bufferToImage(blob)];
            }
        });
    });
}
//# sourceMappingURL=fetchImage.js.map
;// ./node_modules/face-api.js/build/es6/dom/fetchJson.js


function fetchJson(uri) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrThrow_fetchOrThrow(uri)];
                case 1: return [2 /*return*/, (_a.sent()).json()];
            }
        });
    });
}
//# sourceMappingURL=fetchJson.js.map
;// ./node_modules/face-api.js/build/es6/dom/fetchNetWeights.js


function fetchNetWeights(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = Float32Array.bind;
                    return [4 /*yield*/, fetchOrThrow(uri)];
                case 1: return [4 /*yield*/, (_b.sent()).arrayBuffer()];
                case 2: return [2 /*return*/, new (_a.apply(Float32Array, [void 0, _b.sent()]))()];
            }
        });
    });
}
//# sourceMappingURL=fetchNetWeights.js.map
;// ./node_modules/face-api.js/build/es6/common/getModelUris.js
function getModelUris(uri, defaultModelName) {
    var defaultManifestFilename = defaultModelName + "-weights_manifest.json";
    if (!uri) {
        return {
            modelBaseUri: '',
            manifestUri: defaultManifestFilename
        };
    }
    if (uri === '/') {
        return {
            modelBaseUri: '/',
            manifestUri: "/" + defaultManifestFilename
        };
    }
    var protocol = uri.startsWith('http://') ? 'http://' : uri.startsWith('https://') ? 'https://' : '';
    uri = uri.replace(protocol, '');
    var parts = uri.split('/').filter(function (s) { return s; });
    var manifestFile = uri.endsWith('.json')
        ? parts[parts.length - 1]
        : defaultManifestFilename;
    var modelBaseUri = protocol + (uri.endsWith('.json') ? parts.slice(0, parts.length - 1) : parts).join('/');
    modelBaseUri = uri.startsWith('/') ? "/" + modelBaseUri : modelBaseUri;
    return {
        modelBaseUri: modelBaseUri,
        manifestUri: modelBaseUri === '/' ? "/" + manifestFile : modelBaseUri + "/" + manifestFile
    };
}
//# sourceMappingURL=getModelUris.js.map
;// ./node_modules/face-api.js/build/es6/dom/loadWeightMap.js




function loadWeightMap(uri, defaultModelName) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var _a, manifestUri, modelBaseUri, manifest;
        return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getModelUris(uri, defaultModelName), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                    return [4 /*yield*/, fetchJson(manifestUri)];
                case 1:
                    manifest = _b.sent();
                    return [2 /*return*/, tf_core_esm.io.loadWeights(manifest, modelBaseUri)];
            }
        });
    });
}
//# sourceMappingURL=loadWeightMap.js.map
;// ./node_modules/face-api.js/build/es6/dom/matchDimensions.js

function matchDimensions(input, reference, useMediaDimensions) {
    if (useMediaDimensions === void 0) { useMediaDimensions = false; }
    var _a = useMediaDimensions
        ? getMediaDimensions(reference)
        : reference, width = _a.width, height = _a.height;
    input.width = width;
    input.height = height;
    return { width: width, height: height };
}
//# sourceMappingURL=matchDimensions.js.map
;// ./node_modules/face-api.js/build/es6/dom/index.js




















//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/NeuralNetwork.js





var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork(_name) {
        this._name = _name;
        this._params = undefined;
        this._paramMappings = [];
    }
    Object.defineProperty(NeuralNetwork.prototype, "params", {
        get: function () { return this._params; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NeuralNetwork.prototype, "paramMappings", {
        get: function () { return this._paramMappings; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NeuralNetwork.prototype, "isLoaded", {
        get: function () { return !!this.params; },
        enumerable: true,
        configurable: true
    });
    NeuralNetwork.prototype.getParamFromPath = function (paramPath) {
        var _a = this.traversePropertyPath(paramPath), obj = _a.obj, objProp = _a.objProp;
        return obj[objProp];
    };
    NeuralNetwork.prototype.reassignParamFromPath = function (paramPath, tensor) {
        var _a = this.traversePropertyPath(paramPath), obj = _a.obj, objProp = _a.objProp;
        obj[objProp].dispose();
        obj[objProp] = tensor;
    };
    NeuralNetwork.prototype.getParamList = function () {
        var _this = this;
        return this._paramMappings.map(function (_a) {
            var paramPath = _a.paramPath;
            return ({
                path: paramPath,
                tensor: _this.getParamFromPath(paramPath)
            });
        });
    };
    NeuralNetwork.prototype.getTrainableParams = function () {
        return this.getParamList().filter(function (param) { return param.tensor instanceof tf_core_esm/* Variable */.rTt; });
    };
    NeuralNetwork.prototype.getFrozenParams = function () {
        return this.getParamList().filter(function (param) { return !(param.tensor instanceof tf_core_esm/* Variable */.rTt); });
    };
    NeuralNetwork.prototype.variable = function () {
        var _this = this;
        this.getFrozenParams().forEach(function (_a) {
            var path = _a.path, tensor = _a.tensor;
            _this.reassignParamFromPath(path, tensor.variable());
        });
    };
    NeuralNetwork.prototype.freeze = function () {
        var _this = this;
        this.getTrainableParams().forEach(function (_a) {
            var path = _a.path, variable = _a.tensor;
            var tensor = tf_core_esm/* tensor */.OEK(variable.dataSync());
            variable.dispose();
            _this.reassignParamFromPath(path, tensor);
        });
    };
    NeuralNetwork.prototype.dispose = function (throwOnRedispose) {
        if (throwOnRedispose === void 0) { throwOnRedispose = true; }
        this.getParamList().forEach(function (param) {
            if (throwOnRedispose && param.tensor.isDisposed) {
                throw new Error("param tensor has already been disposed for path " + param.path);
            }
            param.tensor.dispose();
        });
        this._params = undefined;
    };
    NeuralNetwork.prototype.serializeParams = function () {
        return new Float32Array(this.getParamList()
            .map(function (_a) {
            var tensor = _a.tensor;
            return Array.from(tensor.dataSync());
        })
            .reduce(function (flat, arr) { return flat.concat(arr); }));
    };
    NeuralNetwork.prototype.load = function (weightsOrUrl) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (weightsOrUrl instanceof Float32Array) {
                            this.extractWeights(weightsOrUrl);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadFromUri(weightsOrUrl)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NeuralNetwork.prototype.loadFromUri = function (uri) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var weightMap;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (uri && typeof uri !== 'string') {
                            throw new Error(this._name + ".loadFromUri - expected model uri");
                        }
                        return [4 /*yield*/, loadWeightMap(uri, this.getDefaultModelName())];
                    case 1:
                        weightMap = _a.sent();
                        this.loadFromWeightMap(weightMap);
                        return [2 /*return*/];
                }
            });
        });
    };
    NeuralNetwork.prototype.loadFromDisk = function (filePath) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var readFile, _a, manifestUri, modelBaseUri, fetchWeightsFromDisk, loadWeights, manifest, _b, _c, weightMap;
            return (0,tslib_es6/* __generator */.YH)(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (filePath && typeof filePath !== 'string') {
                            throw new Error(this._name + ".loadFromDisk - expected model file path");
                        }
                        readFile = env_env.getEnv().readFile;
                        _a = getModelUris(filePath, this.getDefaultModelName()), manifestUri = _a.manifestUri, modelBaseUri = _a.modelBaseUri;
                        fetchWeightsFromDisk = function (filePaths) { return Promise.all(filePaths.map(function (filePath) { return readFile(filePath).then(function (buf) { return buf.buffer; }); })); };
                        loadWeights = tf_core_esm.io.weightsLoaderFactory(fetchWeightsFromDisk);
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, readFile(manifestUri)];
                    case 1:
                        manifest = _c.apply(_b, [(_d.sent()).toString()]);
                        return [4 /*yield*/, loadWeights(manifest, modelBaseUri)];
                    case 2:
                        weightMap = _d.sent();
                        this.loadFromWeightMap(weightMap);
                        return [2 /*return*/];
                }
            });
        });
    };
    NeuralNetwork.prototype.loadFromWeightMap = function (weightMap) {
        var _a = this.extractParamsFromWeigthMap(weightMap), paramMappings = _a.paramMappings, params = _a.params;
        this._paramMappings = paramMappings;
        this._params = params;
    };
    NeuralNetwork.prototype.extractWeights = function (weights) {
        var _a = this.extractParams(weights), paramMappings = _a.paramMappings, params = _a.params;
        this._paramMappings = paramMappings;
        this._params = params;
    };
    NeuralNetwork.prototype.traversePropertyPath = function (paramPath) {
        if (!this.params) {
            throw new Error("traversePropertyPath - model has no loaded params");
        }
        var result = paramPath.split('/').reduce(function (res, objProp) {
            if (!res.nextObj.hasOwnProperty(objProp)) {
                throw new Error("traversePropertyPath - object does not have property " + objProp + ", for path " + paramPath);
            }
            return { obj: res.nextObj, objProp: objProp, nextObj: res.nextObj[objProp] };
        }, { nextObj: this.params });
        var obj = result.obj, objProp = result.objProp;
        if (!obj || !objProp || !(obj[objProp] instanceof tf_core_esm/* Tensor */.qYS)) {
            throw new Error("traversePropertyPath - parameter is not a tensor, for path " + paramPath);
        }
        return { obj: obj, objProp: objProp };
    };
    return NeuralNetwork;
}());

//# sourceMappingURL=NeuralNetwork.js.map
;// ./node_modules/face-api.js/build/es6/common/depthwiseSeparableConv.js

function depthwiseSeparableConv(x, params, stride) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = tf_core_esm/* separableConv2d */.wdz(x, params.depthwise_filter, params.pointwise_filter, stride, 'same');
        out = tf_core_esm/* add */.WQq(out, params.bias);
        return out;
    });
}
//# sourceMappingURL=depthwiseSeparableConv.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/denseBlock.js


function denseBlock3(x, denseBlockParams, isFirstLayer) {
    if (isFirstLayer === void 0) { isFirstLayer = false; }
    return tf_core_esm/* tidy */.DZQ(function () {
        var out1 = tf_core_esm/* relu */.VVh(isFirstLayer
            ? tf_core_esm/* add */.WQq(tf_core_esm/* conv2d */.Xtf(x, denseBlockParams.conv0.filters, [2, 2], 'same'), denseBlockParams.conv0.bias)
            : depthwiseSeparableConv(x, denseBlockParams.conv0, [2, 2]));
        var out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
        var in3 = tf_core_esm/* relu */.VVh(tf_core_esm/* add */.WQq(out1, out2));
        var out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
        return tf_core_esm/* relu */.VVh(tf_core_esm/* add */.WQq(out1, tf_core_esm/* add */.WQq(out2, out3)));
    });
}
function denseBlock4(x, denseBlockParams, isFirstLayer, isScaleDown) {
    if (isFirstLayer === void 0) { isFirstLayer = false; }
    if (isScaleDown === void 0) { isScaleDown = true; }
    return tf_core_esm/* tidy */.DZQ(function () {
        var out1 = tf_core_esm/* relu */.VVh(isFirstLayer
            ? tf_core_esm/* add */.WQq(tf_core_esm/* conv2d */.Xtf(x, denseBlockParams.conv0.filters, isScaleDown ? [2, 2] : [1, 1], 'same'), denseBlockParams.conv0.bias)
            : depthwiseSeparableConv(x, denseBlockParams.conv0, isScaleDown ? [2, 2] : [1, 1]));
        var out2 = depthwiseSeparableConv(out1, denseBlockParams.conv1, [1, 1]);
        var in3 = tf_core_esm/* relu */.VVh(tf_core_esm/* add */.WQq(out1, out2));
        var out3 = depthwiseSeparableConv(in3, denseBlockParams.conv2, [1, 1]);
        var in4 = tf_core_esm/* relu */.VVh(tf_core_esm/* add */.WQq(out1, tf_core_esm/* add */.WQq(out2, out3)));
        var out4 = depthwiseSeparableConv(in4, denseBlockParams.conv3, [1, 1]);
        return tf_core_esm/* relu */.VVh(tf_core_esm/* add */.WQq(out1, tf_core_esm/* add */.WQq(out2, tf_core_esm/* add */.WQq(out3, out4))));
    });
}
//# sourceMappingURL=denseBlock.js.map
;// ./node_modules/face-api.js/build/es6/common/convLayer.js

function convLayer(x, params, padding, withRelu) {
    if (padding === void 0) { padding = 'same'; }
    if (withRelu === void 0) { withRelu = false; }
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = tf_core_esm/* add */.WQq(tf_core_esm/* conv2d */.Xtf(x, params.filters, [1, 1], padding), params.bias);
        return withRelu ? tf_core_esm/* relu */.VVh(out) : out;
    });
}
//# sourceMappingURL=convLayer.js.map
;// ./node_modules/face-api.js/build/es6/common/disposeUnusedWeightTensors.js
function disposeUnusedWeightTensors(weightMap, paramMappings) {
    Object.keys(weightMap).forEach(function (path) {
        if (!paramMappings.some(function (pm) { return pm.originalPath === path; })) {
            weightMap[path].dispose();
        }
    });
}
//# sourceMappingURL=disposeUnusedWeightTensors.js.map
;// ./node_modules/face-api.js/build/es6/common/extractConvParamsFactory.js

function extractConvParamsFactory(extractWeights, paramMappings) {
    return function (channelsIn, channelsOut, filterSize, mappedPrefix) {
        var filters = tf_core_esm/* tensor4d */.g9W(extractWeights(channelsIn * channelsOut * filterSize * filterSize), [filterSize, filterSize, channelsIn, channelsOut]);
        var bias = tf_core_esm/* tensor1d */.tGX(extractWeights(channelsOut));
        paramMappings.push({ paramPath: mappedPrefix + "/filters" }, { paramPath: mappedPrefix + "/bias" });
        return { filters: filters, bias: bias };
    };
}
//# sourceMappingURL=extractConvParamsFactory.js.map
;// ./node_modules/face-api.js/build/es6/common/extractFCParamsFactory.js

function extractFCParamsFactory(extractWeights, paramMappings) {
    return function (channelsIn, channelsOut, mappedPrefix) {
        var fc_weights = tf_core_esm/* tensor2d */.KtR(extractWeights(channelsIn * channelsOut), [channelsIn, channelsOut]);
        var fc_bias = tf_core_esm/* tensor1d */.tGX(extractWeights(channelsOut));
        paramMappings.push({ paramPath: mappedPrefix + "/weights" }, { paramPath: mappedPrefix + "/bias" });
        return {
            weights: fc_weights,
            bias: fc_bias
        };
    };
}
//# sourceMappingURL=extractFCParamsFactory.js.map
;// ./node_modules/face-api.js/build/es6/common/types.js
var SeparableConvParams = /** @class */ (function () {
    function SeparableConvParams(depthwise_filter, pointwise_filter, bias) {
        this.depthwise_filter = depthwise_filter;
        this.pointwise_filter = pointwise_filter;
        this.bias = bias;
    }
    return SeparableConvParams;
}());

//# sourceMappingURL=types.js.map
;// ./node_modules/face-api.js/build/es6/common/extractSeparableConvParamsFactory.js


function extractSeparableConvParamsFactory(extractWeights, paramMappings) {
    return function (channelsIn, channelsOut, mappedPrefix) {
        var depthwise_filter = tf_core_esm/* tensor4d */.g9W(extractWeights(3 * 3 * channelsIn), [3, 3, channelsIn, 1]);
        var pointwise_filter = tf_core_esm/* tensor4d */.g9W(extractWeights(channelsIn * channelsOut), [1, 1, channelsIn, channelsOut]);
        var bias = tf_core_esm/* tensor1d */.tGX(extractWeights(channelsOut));
        paramMappings.push({ paramPath: mappedPrefix + "/depthwise_filter" }, { paramPath: mappedPrefix + "/pointwise_filter" }, { paramPath: mappedPrefix + "/bias" });
        return new SeparableConvParams(depthwise_filter, pointwise_filter, bias);
    };
}
function loadSeparableConvParamsFactory(extractWeightEntry) {
    return function (prefix) {
        var depthwise_filter = extractWeightEntry(prefix + "/depthwise_filter", 4);
        var pointwise_filter = extractWeightEntry(prefix + "/pointwise_filter", 4);
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return new SeparableConvParams(depthwise_filter, pointwise_filter, bias);
    };
}
//# sourceMappingURL=extractSeparableConvParamsFactory.js.map
;// ./node_modules/face-api.js/build/es6/common/extractWeightEntryFactory.js

function extractWeightEntryFactory(weightMap, paramMappings) {
    return function (originalPath, paramRank, mappedPath) {
        var tensor = weightMap[originalPath];
        if (!isTensor(tensor, paramRank)) {
            throw new Error("expected weightMap[" + originalPath + "] to be a Tensor" + paramRank + "D, instead have " + tensor);
        }
        paramMappings.push({ originalPath: originalPath, paramPath: mappedPath || originalPath });
        return tensor;
    };
}
//# sourceMappingURL=extractWeightEntryFactory.js.map
;// ./node_modules/face-api.js/build/es6/common/extractWeightsFactory.js
function extractWeightsFactory(weights) {
    var remainingWeights = weights;
    function extractWeights(numWeights) {
        var ret = remainingWeights.slice(0, numWeights);
        remainingWeights = remainingWeights.slice(numWeights);
        return ret;
    }
    function getRemainingWeights() {
        return remainingWeights;
    }
    return {
        extractWeights: extractWeights,
        getRemainingWeights: getRemainingWeights
    };
}
//# sourceMappingURL=extractWeightsFactory.js.map
;// ./node_modules/face-api.js/build/es6/common/index.js










//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/extractorsFactory.js

function extractorsFactory(extractWeights, paramMappings) {
    var extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
    var extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
    function extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        var conv0 = isFirstLayer
            ? extractConvParams(channelsIn, channelsOut, 3, mappedPrefix + "/conv0")
            : extractSeparableConvParams(channelsIn, channelsOut, mappedPrefix + "/conv0");
        var conv1 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/conv1");
        var conv2 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/conv2");
        return { conv0: conv0, conv1: conv1, conv2: conv2 };
    }
    function extractDenseBlock4Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        var _a = extractDenseBlock3Params(channelsIn, channelsOut, mappedPrefix, isFirstLayer), conv0 = _a.conv0, conv1 = _a.conv1, conv2 = _a.conv2;
        var conv3 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/conv3");
        return { conv0: conv0, conv1: conv1, conv2: conv2, conv3: conv3 };
    }
    return {
        extractDenseBlock3Params: extractDenseBlock3Params,
        extractDenseBlock4Params: extractDenseBlock4Params
    };
}
//# sourceMappingURL=extractorsFactory.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/extractParams.js


function extractParams(weights) {
    var paramMappings = [];
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var extractDenseBlock4Params = extractorsFactory(extractWeights, paramMappings).extractDenseBlock4Params;
    var dense0 = extractDenseBlock4Params(3, 32, 'dense0', true);
    var dense1 = extractDenseBlock4Params(32, 64, 'dense1');
    var dense2 = extractDenseBlock4Params(64, 128, 'dense2');
    var dense3 = extractDenseBlock4Params(128, 256, 'dense3');
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        paramMappings: paramMappings,
        params: { dense0: dense0, dense1: dense1, dense2: dense2, dense3: dense3 }
    };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/common/loadConvParamsFactory.js
function loadConvParamsFactory(extractWeightEntry) {
    return function (prefix) {
        var filters = extractWeightEntry(prefix + "/filters", 4);
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return { filters: filters, bias: bias };
    };
}
//# sourceMappingURL=loadConvParamsFactory.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/loadParamsFactory.js


function loadParamsFactory(weightMap, paramMappings) {
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    var extractConvParams = loadConvParamsFactory(extractWeightEntry);
    var extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
    function extractDenseBlock3Params(prefix, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        var conv0 = isFirstLayer
            ? extractConvParams(prefix + "/conv0")
            : extractSeparableConvParams(prefix + "/conv0");
        var conv1 = extractSeparableConvParams(prefix + "/conv1");
        var conv2 = extractSeparableConvParams(prefix + "/conv2");
        return { conv0: conv0, conv1: conv1, conv2: conv2 };
    }
    function extractDenseBlock4Params(prefix, isFirstLayer) {
        if (isFirstLayer === void 0) { isFirstLayer = false; }
        var conv0 = isFirstLayer
            ? extractConvParams(prefix + "/conv0")
            : extractSeparableConvParams(prefix + "/conv0");
        var conv1 = extractSeparableConvParams(prefix + "/conv1");
        var conv2 = extractSeparableConvParams(prefix + "/conv2");
        var conv3 = extractSeparableConvParams(prefix + "/conv3");
        return { conv0: conv0, conv1: conv1, conv2: conv2, conv3: conv3 };
    }
    return {
        extractDenseBlock3Params: extractDenseBlock3Params,
        extractDenseBlock4Params: extractDenseBlock4Params
    };
}
//# sourceMappingURL=loadParamsFactory.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/extractParamsFromWeigthMap.js


function extractParamsFromWeigthMap(weightMap) {
    var paramMappings = [];
    var extractDenseBlock4Params = loadParamsFactory(weightMap, paramMappings).extractDenseBlock4Params;
    var params = {
        dense0: extractDenseBlock4Params('dense0', true),
        dense1: extractDenseBlock4Params('dense1'),
        dense2: extractDenseBlock4Params('dense2'),
        dense3: extractDenseBlock4Params('dense3')
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/FaceFeatureExtractor.js








var FaceFeatureExtractor = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceFeatureExtractor, _super);
    function FaceFeatureExtractor() {
        return _super.call(this, 'FaceFeatureExtractor') || this;
    }
    FaceFeatureExtractor.prototype.forwardInput = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('FaceFeatureExtractor - load model before inference');
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var batchTensor = input.toBatchTensor(112, true);
            var meanRgb = [122.782, 117.001, 104.298];
            var normalized = normalize(batchTensor, meanRgb).div(tf_core_esm/* scalar */.d_2(255));
            var out = denseBlock4(normalized, params.dense0, true);
            out = denseBlock4(out, params.dense1);
            out = denseBlock4(out, params.dense2);
            out = denseBlock4(out, params.dense3);
            out = tf_core_esm/* avgPool */.$jT(out, [7, 7], [2, 2], 'valid');
            return out;
        });
    };
    FaceFeatureExtractor.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    FaceFeatureExtractor.prototype.getDefaultModelName = function () {
        return 'face_feature_extractor_model';
    };
    FaceFeatureExtractor.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMap(weightMap);
    };
    FaceFeatureExtractor.prototype.extractParams = function (weights) {
        return extractParams(weights);
    };
    return FaceFeatureExtractor;
}(NeuralNetwork));

//# sourceMappingURL=FaceFeatureExtractor.js.map
;// ./node_modules/face-api.js/build/es6/common/fullyConnectedLayer.js

function fullyConnectedLayer(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        return tf_core_esm/* add */.WQq(tf_core_esm/* matMul */.NoW(x, params.weights), params.bias);
    });
}
//# sourceMappingURL=fullyConnectedLayer.js.map
;// ./node_modules/face-api.js/build/es6/faceProcessor/extractParams.js

function extractParams_extractParams(weights, channelsIn, channelsOut) {
    var paramMappings = [];
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var extractFCParams = extractFCParamsFactory(extractWeights, paramMappings);
    var fc = extractFCParams(channelsIn, channelsOut, 'fc');
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        paramMappings: paramMappings,
        params: { fc: fc }
    };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/faceProcessor/extractParamsFromWeigthMap.js

function extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap) {
    var paramMappings = [];
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractFcParams(prefix) {
        var weights = extractWeightEntry(prefix + "/weights", 2);
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return { weights: weights, bias: bias };
    }
    var params = {
        fc: extractFcParams('fc')
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/faceProcessor/util.js
function seperateWeightMaps(weightMap) {
    var featureExtractorMap = {};
    var classifierMap = {};
    Object.keys(weightMap).forEach(function (key) {
        var map = key.startsWith('fc') ? classifierMap : featureExtractorMap;
        map[key] = weightMap[key];
    });
    return { featureExtractorMap: featureExtractorMap, classifierMap: classifierMap };
}
//# sourceMappingURL=util.js.map
;// ./node_modules/face-api.js/build/es6/faceProcessor/FaceProcessor.js








var FaceProcessor = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceProcessor, _super);
    function FaceProcessor(_name, faceFeatureExtractor) {
        var _this = _super.call(this, _name) || this;
        _this._faceFeatureExtractor = faceFeatureExtractor;
        return _this;
    }
    Object.defineProperty(FaceProcessor.prototype, "faceFeatureExtractor", {
        get: function () {
            return this._faceFeatureExtractor;
        },
        enumerable: true,
        configurable: true
    });
    FaceProcessor.prototype.runNet = function (input) {
        var _this = this;
        var params = this.params;
        if (!params) {
            throw new Error(this._name + " - load model before inference");
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var bottleneckFeatures = input instanceof NetInput
                ? _this.faceFeatureExtractor.forwardInput(input)
                : input;
            return fullyConnectedLayer(bottleneckFeatures.as2D(bottleneckFeatures.shape[0], -1), params.fc);
        });
    };
    FaceProcessor.prototype.dispose = function (throwOnRedispose) {
        if (throwOnRedispose === void 0) { throwOnRedispose = true; }
        this.faceFeatureExtractor.dispose(throwOnRedispose);
        _super.prototype.dispose.call(this, throwOnRedispose);
    };
    FaceProcessor.prototype.loadClassifierParams = function (weights) {
        var _a = this.extractClassifierParams(weights), params = _a.params, paramMappings = _a.paramMappings;
        this._params = params;
        this._paramMappings = paramMappings;
    };
    FaceProcessor.prototype.extractClassifierParams = function (weights) {
        return extractParams_extractParams(weights, this.getClassifierChannelsIn(), this.getClassifierChannelsOut());
    };
    FaceProcessor.prototype.extractParamsFromWeigthMap = function (weightMap) {
        var _a = seperateWeightMaps(weightMap), featureExtractorMap = _a.featureExtractorMap, classifierMap = _a.classifierMap;
        this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
        return extractParamsFromWeigthMap_extractParamsFromWeigthMap(classifierMap);
    };
    FaceProcessor.prototype.extractParams = function (weights) {
        var cIn = this.getClassifierChannelsIn();
        var cOut = this.getClassifierChannelsOut();
        var classifierWeightSize = (cOut * cIn) + cOut;
        var featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
        var classifierWeights = weights.slice(weights.length - classifierWeightSize);
        this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
        return this.extractClassifierParams(classifierWeights);
    };
    return FaceProcessor;
}(NeuralNetwork));

//# sourceMappingURL=FaceProcessor.js.map
;// ./node_modules/face-api.js/build/es6/faceExpressionNet/FaceExpressions.js
var FACE_EXPRESSION_LABELS = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];
var FaceExpressions = /** @class */ (function () {
    function FaceExpressions(probabilities) {
        var _this = this;
        if (probabilities.length !== 7) {
            throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: " + probabilities.length);
        }
        FACE_EXPRESSION_LABELS.forEach(function (expression, idx) {
            _this[expression] = probabilities[idx];
        });
    }
    FaceExpressions.prototype.asSortedArray = function () {
        var _this = this;
        return FACE_EXPRESSION_LABELS
            .map(function (expression) { return ({ expression: expression, probability: _this[expression] }); })
            .sort(function (e0, e1) { return e1.probability - e0.probability; });
    };
    return FaceExpressions;
}());

//# sourceMappingURL=FaceExpressions.js.map
;// ./node_modules/face-api.js/build/es6/faceExpressionNet/FaceExpressionNet.js






var FaceExpressionNet = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceExpressionNet, _super);
    function FaceExpressionNet(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new FaceFeatureExtractor(); }
        return _super.call(this, 'FaceExpressionNet', faceFeatureExtractor) || this;
    }
    FaceExpressionNet.prototype.forwardInput = function (input) {
        var _this = this;
        return tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* softmax */.Vs9(_this.runNet(input)); });
    };
    FaceExpressionNet.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    FaceExpressionNet.prototype.predictExpressions = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var netInput, out, probabilitesByBatch, predictionsByBatch;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        return [4 /*yield*/, this.forwardInput(netInput)];
                    case 2:
                        out = _a.sent();
                        return [4 /*yield*/, Promise.all(tf_core_esm/* unstack */.K$i(out).map(function (t) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
                                var data;
                                return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, t.data()];
                                        case 1:
                                            data = _a.sent();
                                            t.dispose();
                                            return [2 /*return*/, data];
                                    }
                                });
                            }); }))];
                    case 3:
                        probabilitesByBatch = _a.sent();
                        out.dispose();
                        predictionsByBatch = probabilitesByBatch
                            .map(function (probabilites) { return new FaceExpressions(probabilites); });
                        return [2 /*return*/, netInput.isBatchInput
                                ? predictionsByBatch
                                : predictionsByBatch[0]];
                }
            });
        });
    };
    FaceExpressionNet.prototype.getDefaultModelName = function () {
        return 'face_expression_model';
    };
    FaceExpressionNet.prototype.getClassifierChannelsIn = function () {
        return 256;
    };
    FaceExpressionNet.prototype.getClassifierChannelsOut = function () {
        return 7;
    };
    return FaceExpressionNet;
}(FaceProcessor));

//# sourceMappingURL=FaceExpressionNet.js.map
;// ./node_modules/face-api.js/build/es6/faceExpressionNet/index.js


//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/factories/WithFaceExpressions.js

function isWithFaceExpressions(obj) {
    return obj['expressions'] instanceof FaceExpressions;
}
function extendWithFaceExpressions(sourceObj, expressions) {
    var extension = { expressions: expressions };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithFaceExpressions.js.map
;// ./node_modules/face-api.js/build/es6/draw/drawFaceExpressions.js






function drawFaceExpressions(canvasArg, faceExpressions, minConfidence, textFieldAnchor) {
    if (minConfidence === void 0) { minConfidence = 0.1; }
    var faceExpressionsArray = Array.isArray(faceExpressions) ? faceExpressions : [faceExpressions];
    faceExpressionsArray.forEach(function (e) {
        var expr = e instanceof FaceExpressions
            ? e
            : (isWithFaceExpressions(e) ? e.expressions : undefined);
        if (!expr) {
            throw new Error('drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof');
        }
        var sorted = expr.asSortedArray();
        var resultsToDisplay = sorted.filter(function (expr) { return expr.probability > minConfidence; });
        var anchor = isWithFaceDetection(e)
            ? e.detection.box.bottomLeft
            : (textFieldAnchor || new Point(0, 0));
        var drawTextField = new DrawTextField(resultsToDisplay.map(function (expr) { return expr.expression + " (" + round(expr.probability) + ")"; }), anchor);
        drawTextField.draw(canvasArg);
    });
}
//# sourceMappingURL=drawFaceExpressions.js.map
;// ./node_modules/face-api.js/build/es6/factories/WithFaceLandmarks.js



function isWithFaceLandmarks(obj) {
    return isWithFaceDetection(obj)
        && obj['landmarks'] instanceof FaceLandmarks
        && obj['unshiftedLandmarks'] instanceof FaceLandmarks
        && obj['alignedRect'] instanceof FaceDetection;
}
function extendWithFaceLandmarks(sourceObj, unshiftedLandmarks) {
    var shift = sourceObj.detection.box;
    var landmarks = unshiftedLandmarks.shiftBy(shift.x, shift.y);
    var rect = landmarks.align();
    var imageDims = sourceObj.detection.imageDims;
    var alignedRect = new FaceDetection(sourceObj.detection.score, rect.rescale(imageDims.reverse()), imageDims);
    var extension = {
        landmarks: landmarks,
        unshiftedLandmarks: unshiftedLandmarks,
        alignedRect: alignedRect
    };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithFaceLandmarks.js.map
;// ./node_modules/face-api.js/build/es6/draw/DrawFaceLandmarks.js





var DrawFaceLandmarksOptions = /** @class */ (function () {
    function DrawFaceLandmarksOptions(options) {
        if (options === void 0) { options = {}; }
        var _a = options.drawLines, drawLines = _a === void 0 ? true : _a, _b = options.drawPoints, drawPoints = _b === void 0 ? true : _b, lineWidth = options.lineWidth, lineColor = options.lineColor, pointSize = options.pointSize, pointColor = options.pointColor;
        this.drawLines = drawLines;
        this.drawPoints = drawPoints;
        this.lineWidth = lineWidth || 1;
        this.pointSize = pointSize || 2;
        this.lineColor = lineColor || 'rgba(0, 255, 255, 1)';
        this.pointColor = pointColor || 'rgba(255, 0, 255, 1)';
    }
    return DrawFaceLandmarksOptions;
}());

var DrawFaceLandmarks = /** @class */ (function () {
    function DrawFaceLandmarks(faceLandmarks, options) {
        if (options === void 0) { options = {}; }
        this.faceLandmarks = faceLandmarks;
        this.options = new DrawFaceLandmarksOptions(options);
    }
    DrawFaceLandmarks.prototype.draw = function (canvasArg) {
        var ctx = getContext2dOrThrow(canvasArg);
        var _a = this.options, drawLines = _a.drawLines, drawPoints = _a.drawPoints, lineWidth = _a.lineWidth, lineColor = _a.lineColor, pointSize = _a.pointSize, pointColor = _a.pointColor;
        if (drawLines && this.faceLandmarks instanceof FaceLandmarks68) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth;
            drawContour(ctx, this.faceLandmarks.getJawOutline());
            drawContour(ctx, this.faceLandmarks.getLeftEyeBrow());
            drawContour(ctx, this.faceLandmarks.getRightEyeBrow());
            drawContour(ctx, this.faceLandmarks.getNose());
            drawContour(ctx, this.faceLandmarks.getLeftEye(), true);
            drawContour(ctx, this.faceLandmarks.getRightEye(), true);
            drawContour(ctx, this.faceLandmarks.getMouth(), true);
        }
        if (drawPoints) {
            ctx.strokeStyle = pointColor;
            ctx.fillStyle = pointColor;
            var drawPoint = function (pt) {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pointSize, 0, 2 * Math.PI);
                ctx.fill();
            };
            this.faceLandmarks.positions.forEach(drawPoint);
        }
    };
    return DrawFaceLandmarks;
}());

function drawFaceLandmarks(canvasArg, faceLandmarks) {
    var faceLandmarksArray = Array.isArray(faceLandmarks) ? faceLandmarks : [faceLandmarks];
    faceLandmarksArray.forEach(function (f) {
        var landmarks = f instanceof FaceLandmarks
            ? f
            : (isWithFaceLandmarks(f) ? f.landmarks : undefined);
        if (!landmarks) {
            throw new Error('drawFaceLandmarks - expected faceExpressions to be FaceLandmarks | WithFaceLandmarks<WithFaceDetection<{}>> or array thereof');
        }
        new DrawFaceLandmarks(landmarks).draw(canvasArg);
    });
}
//# sourceMappingURL=DrawFaceLandmarks.js.map
;// ./node_modules/face-api.js/build/es6/draw/index.js






//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/xception/extractParams.js


function extractParams_extractorsFactory(extractWeights, paramMappings) {
    var extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
    var extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
    function extractReductionBlockParams(channelsIn, channelsOut, mappedPrefix) {
        var separable_conv0 = extractSeparableConvParams(channelsIn, channelsOut, mappedPrefix + "/separable_conv0");
        var separable_conv1 = extractSeparableConvParams(channelsOut, channelsOut, mappedPrefix + "/separable_conv1");
        var expansion_conv = extractConvParams(channelsIn, channelsOut, 1, mappedPrefix + "/expansion_conv");
        return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, expansion_conv: expansion_conv };
    }
    function extractMainBlockParams(channels, mappedPrefix) {
        var separable_conv0 = extractSeparableConvParams(channels, channels, mappedPrefix + "/separable_conv0");
        var separable_conv1 = extractSeparableConvParams(channels, channels, mappedPrefix + "/separable_conv1");
        var separable_conv2 = extractSeparableConvParams(channels, channels, mappedPrefix + "/separable_conv2");
        return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, separable_conv2: separable_conv2 };
    }
    return {
        extractConvParams: extractConvParams,
        extractSeparableConvParams: extractSeparableConvParams,
        extractReductionBlockParams: extractReductionBlockParams,
        extractMainBlockParams: extractMainBlockParams
    };
}
function xception_extractParams_extractParams(weights, numMainBlocks) {
    var paramMappings = [];
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var _b = extractParams_extractorsFactory(extractWeights, paramMappings), extractConvParams = _b.extractConvParams, extractSeparableConvParams = _b.extractSeparableConvParams, extractReductionBlockParams = _b.extractReductionBlockParams, extractMainBlockParams = _b.extractMainBlockParams;
    var entry_flow_conv_in = extractConvParams(3, 32, 3, 'entry_flow/conv_in');
    var entry_flow_reduction_block_0 = extractReductionBlockParams(32, 64, 'entry_flow/reduction_block_0');
    var entry_flow_reduction_block_1 = extractReductionBlockParams(64, 128, 'entry_flow/reduction_block_1');
    var entry_flow = {
        conv_in: entry_flow_conv_in,
        reduction_block_0: entry_flow_reduction_block_0,
        reduction_block_1: entry_flow_reduction_block_1
    };
    var middle_flow = {};
    range(numMainBlocks, 0, 1).forEach(function (idx) {
        middle_flow["main_block_" + idx] = extractMainBlockParams(128, "middle_flow/main_block_" + idx);
    });
    var exit_flow_reduction_block = extractReductionBlockParams(128, 256, 'exit_flow/reduction_block');
    var exit_flow_separable_conv = extractSeparableConvParams(256, 512, 'exit_flow/separable_conv');
    var exit_flow = {
        reduction_block: exit_flow_reduction_block,
        separable_conv: exit_flow_separable_conv
    };
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        paramMappings: paramMappings,
        params: { entry_flow: entry_flow, middle_flow: middle_flow, exit_flow: exit_flow }
    };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/xception/extractParamsFromWeigthMap.js



function extractParamsFromWeigthMap_loadParamsFactory(weightMap, paramMappings) {
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    var extractConvParams = loadConvParamsFactory(extractWeightEntry);
    var extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
    function extractReductionBlockParams(mappedPrefix) {
        var separable_conv0 = extractSeparableConvParams(mappedPrefix + "/separable_conv0");
        var separable_conv1 = extractSeparableConvParams(mappedPrefix + "/separable_conv1");
        var expansion_conv = extractConvParams(mappedPrefix + "/expansion_conv");
        return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, expansion_conv: expansion_conv };
    }
    function extractMainBlockParams(mappedPrefix) {
        var separable_conv0 = extractSeparableConvParams(mappedPrefix + "/separable_conv0");
        var separable_conv1 = extractSeparableConvParams(mappedPrefix + "/separable_conv1");
        var separable_conv2 = extractSeparableConvParams(mappedPrefix + "/separable_conv2");
        return { separable_conv0: separable_conv0, separable_conv1: separable_conv1, separable_conv2: separable_conv2 };
    }
    return {
        extractConvParams: extractConvParams,
        extractSeparableConvParams: extractSeparableConvParams,
        extractReductionBlockParams: extractReductionBlockParams,
        extractMainBlockParams: extractMainBlockParams
    };
}
function xception_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap, numMainBlocks) {
    var paramMappings = [];
    var _a = extractParamsFromWeigthMap_loadParamsFactory(weightMap, paramMappings), extractConvParams = _a.extractConvParams, extractSeparableConvParams = _a.extractSeparableConvParams, extractReductionBlockParams = _a.extractReductionBlockParams, extractMainBlockParams = _a.extractMainBlockParams;
    var entry_flow_conv_in = extractConvParams('entry_flow/conv_in');
    var entry_flow_reduction_block_0 = extractReductionBlockParams('entry_flow/reduction_block_0');
    var entry_flow_reduction_block_1 = extractReductionBlockParams('entry_flow/reduction_block_1');
    var entry_flow = {
        conv_in: entry_flow_conv_in,
        reduction_block_0: entry_flow_reduction_block_0,
        reduction_block_1: entry_flow_reduction_block_1
    };
    var middle_flow = {};
    range(numMainBlocks, 0, 1).forEach(function (idx) {
        middle_flow["main_block_" + idx] = extractMainBlockParams("middle_flow/main_block_" + idx);
    });
    var exit_flow_reduction_block = extractReductionBlockParams('exit_flow/reduction_block');
    var exit_flow_separable_conv = extractSeparableConvParams('exit_flow/separable_conv');
    var exit_flow = {
        reduction_block: exit_flow_reduction_block,
        separable_conv: exit_flow_separable_conv
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: { entry_flow: entry_flow, middle_flow: middle_flow, exit_flow: exit_flow }, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/xception/TinyXception.js









function conv(x, params, stride) {
    return tf_core_esm/* add */.WQq(tf_core_esm/* conv2d */.Xtf(x, params.filters, stride, 'same'), params.bias);
}
function reductionBlock(x, params, isActivateInput) {
    if (isActivateInput === void 0) { isActivateInput = true; }
    var out = isActivateInput ? tf_core_esm/* relu */.VVh(x) : x;
    out = depthwiseSeparableConv(out, params.separable_conv0, [1, 1]);
    out = depthwiseSeparableConv(tf_core_esm/* relu */.VVh(out), params.separable_conv1, [1, 1]);
    out = tf_core_esm/* maxPool */.jgi(out, [3, 3], [2, 2], 'same');
    out = tf_core_esm/* add */.WQq(out, conv(x, params.expansion_conv, [2, 2]));
    return out;
}
function mainBlock(x, params) {
    var out = depthwiseSeparableConv(tf_core_esm/* relu */.VVh(x), params.separable_conv0, [1, 1]);
    out = depthwiseSeparableConv(tf_core_esm/* relu */.VVh(out), params.separable_conv1, [1, 1]);
    out = depthwiseSeparableConv(tf_core_esm/* relu */.VVh(out), params.separable_conv2, [1, 1]);
    out = tf_core_esm/* add */.WQq(out, x);
    return out;
}
var TinyXception = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(TinyXception, _super);
    function TinyXception(numMainBlocks) {
        var _this = _super.call(this, 'TinyXception') || this;
        _this._numMainBlocks = numMainBlocks;
        return _this;
    }
    TinyXception.prototype.forwardInput = function (input) {
        var _this = this;
        var params = this.params;
        if (!params) {
            throw new Error('TinyXception - load model before inference');
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var batchTensor = input.toBatchTensor(112, true);
            var meanRgb = [122.782, 117.001, 104.298];
            var normalized = normalize(batchTensor, meanRgb).div(tf_core_esm/* scalar */.d_2(256));
            var out = tf_core_esm/* relu */.VVh(conv(normalized, params.entry_flow.conv_in, [2, 2]));
            out = reductionBlock(out, params.entry_flow.reduction_block_0, false);
            out = reductionBlock(out, params.entry_flow.reduction_block_1);
            range(_this._numMainBlocks, 0, 1).forEach(function (idx) {
                out = mainBlock(out, params.middle_flow["main_block_" + idx]);
            });
            out = reductionBlock(out, params.exit_flow.reduction_block);
            out = tf_core_esm/* relu */.VVh(depthwiseSeparableConv(out, params.exit_flow.separable_conv, [1, 1]));
            return out;
        });
    };
    TinyXception.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    TinyXception.prototype.getDefaultModelName = function () {
        return 'tiny_xception_model';
    };
    TinyXception.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return xception_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap, this._numMainBlocks);
    };
    TinyXception.prototype.extractParams = function (weights) {
        return xception_extractParams_extractParams(weights, this._numMainBlocks);
    };
    return TinyXception;
}(NeuralNetwork));

//# sourceMappingURL=TinyXception.js.map
;// ./node_modules/face-api.js/build/es6/ageGenderNet/extractParams.js

function ageGenderNet_extractParams_extractParams(weights) {
    var paramMappings = [];
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var extractFCParams = extractFCParamsFactory(extractWeights, paramMappings);
    var age = extractFCParams(512, 1, 'fc/age');
    var gender = extractFCParams(512, 2, 'fc/gender');
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        paramMappings: paramMappings,
        params: { fc: { age: age, gender: gender } }
    };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/ageGenderNet/extractParamsFromWeigthMap.js

function ageGenderNet_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap) {
    var paramMappings = [];
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractFcParams(prefix) {
        var weights = extractWeightEntry(prefix + "/weights", 2);
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return { weights: weights, bias: bias };
    }
    var params = {
        fc: {
            age: extractFcParams('fc/age'),
            gender: extractFcParams('fc/gender')
        }
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/ageGenderNet/types.js
var types_Gender;
(function (Gender) {
    Gender["FEMALE"] = "female";
    Gender["MALE"] = "male";
})(types_Gender || (types_Gender = {}));
//# sourceMappingURL=types.js.map
;// ./node_modules/face-api.js/build/es6/ageGenderNet/AgeGenderNet.js










var AgeGenderNet = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(AgeGenderNet, _super);
    function AgeGenderNet(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new TinyXception(2); }
        var _this = _super.call(this, 'AgeGenderNet') || this;
        _this._faceFeatureExtractor = faceFeatureExtractor;
        return _this;
    }
    Object.defineProperty(AgeGenderNet.prototype, "faceFeatureExtractor", {
        get: function () {
            return this._faceFeatureExtractor;
        },
        enumerable: true,
        configurable: true
    });
    AgeGenderNet.prototype.runNet = function (input) {
        var _this = this;
        var params = this.params;
        if (!params) {
            throw new Error(this._name + " - load model before inference");
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var bottleneckFeatures = input instanceof NetInput
                ? _this.faceFeatureExtractor.forwardInput(input)
                : input;
            var pooled = tf_core_esm/* avgPool */.$jT(bottleneckFeatures, [7, 7], [2, 2], 'valid').as2D(bottleneckFeatures.shape[0], -1);
            var age = fullyConnectedLayer(pooled, params.fc.age).as1D();
            var gender = fullyConnectedLayer(pooled, params.fc.gender);
            return { age: age, gender: gender };
        });
    };
    AgeGenderNet.prototype.forwardInput = function (input) {
        var _this = this;
        return tf_core_esm/* tidy */.DZQ(function () {
            var _a = _this.runNet(input), age = _a.age, gender = _a.gender;
            return { age: age, gender: tf_core_esm/* softmax */.Vs9(gender) };
        });
    };
    AgeGenderNet.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    AgeGenderNet.prototype.predictAgeAndGender = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var netInput, out, ages, genders, ageAndGenderTensors, predictionsByBatch;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        return [4 /*yield*/, this.forwardInput(netInput)];
                    case 2:
                        out = _a.sent();
                        ages = tf_core_esm/* unstack */.K$i(out.age);
                        genders = tf_core_esm/* unstack */.K$i(out.gender);
                        ageAndGenderTensors = ages.map(function (ageTensor, i) { return ({
                            ageTensor: ageTensor,
                            genderTensor: genders[i]
                        }); });
                        return [4 /*yield*/, Promise.all(ageAndGenderTensors.map(function (_a) {
                                var ageTensor = _a.ageTensor, genderTensor = _a.genderTensor;
                                return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
                                    var age, probMale, isMale, gender, genderProbability;
                                    return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, ageTensor.data()];
                                            case 1:
                                                age = (_b.sent())[0];
                                                return [4 /*yield*/, genderTensor.data()];
                                            case 2:
                                                probMale = (_b.sent())[0];
                                                isMale = probMale > 0.5;
                                                gender = isMale ? types_Gender.MALE : types_Gender.FEMALE;
                                                genderProbability = isMale ? probMale : (1 - probMale);
                                                ageTensor.dispose();
                                                genderTensor.dispose();
                                                return [2 /*return*/, { age: age, gender: gender, genderProbability: genderProbability }];
                                        }
                                    });
                                });
                            }))];
                    case 3:
                        predictionsByBatch = _a.sent();
                        out.age.dispose();
                        out.gender.dispose();
                        return [2 /*return*/, netInput.isBatchInput
                                ? predictionsByBatch
                                : predictionsByBatch[0]];
                }
            });
        });
    };
    AgeGenderNet.prototype.getDefaultModelName = function () {
        return 'age_gender_model';
    };
    AgeGenderNet.prototype.dispose = function (throwOnRedispose) {
        if (throwOnRedispose === void 0) { throwOnRedispose = true; }
        this.faceFeatureExtractor.dispose(throwOnRedispose);
        _super.prototype.dispose.call(this, throwOnRedispose);
    };
    AgeGenderNet.prototype.loadClassifierParams = function (weights) {
        var _a = this.extractClassifierParams(weights), params = _a.params, paramMappings = _a.paramMappings;
        this._params = params;
        this._paramMappings = paramMappings;
    };
    AgeGenderNet.prototype.extractClassifierParams = function (weights) {
        return ageGenderNet_extractParams_extractParams(weights);
    };
    AgeGenderNet.prototype.extractParamsFromWeigthMap = function (weightMap) {
        var _a = seperateWeightMaps(weightMap), featureExtractorMap = _a.featureExtractorMap, classifierMap = _a.classifierMap;
        this.faceFeatureExtractor.loadFromWeightMap(featureExtractorMap);
        return ageGenderNet_extractParamsFromWeigthMap_extractParamsFromWeigthMap(classifierMap);
    };
    AgeGenderNet.prototype.extractParams = function (weights) {
        var classifierWeightSize = (512 * 1 + 1) + (512 * 2 + 2);
        var featureExtractorWeights = weights.slice(0, weights.length - classifierWeightSize);
        var classifierWeights = weights.slice(weights.length - classifierWeightSize);
        this.faceFeatureExtractor.extractWeights(featureExtractorWeights);
        return this.extractClassifierParams(classifierWeights);
    };
    return AgeGenderNet;
}(NeuralNetwork));

//# sourceMappingURL=AgeGenderNet.js.map
;// ./node_modules/face-api.js/build/es6/ageGenderNet/index.js


//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/faceLandmarkNet/FaceLandmark68NetBase.js







var FaceLandmark68NetBase = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceLandmark68NetBase, _super);
    function FaceLandmark68NetBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaceLandmark68NetBase.prototype.postProcess = function (output, inputSize, originalDimensions) {
        var inputDimensions = originalDimensions.map(function (_a) {
            var width = _a.width, height = _a.height;
            var scale = inputSize / Math.max(height, width);
            return {
                width: width * scale,
                height: height * scale
            };
        });
        var batchSize = inputDimensions.length;
        return tf_core_esm/* tidy */.DZQ(function () {
            var createInterleavedTensor = function (fillX, fillY) {
                return tf_core_esm/* stack */.t$z([
                    tf_core_esm/* fill */.GSj([68], fillX),
                    tf_core_esm/* fill */.GSj([68], fillY)
                ], 1).as2D(1, 136).as1D();
            };
            var getPadding = function (batchIdx, cond) {
                var _a = inputDimensions[batchIdx], width = _a.width, height = _a.height;
                return cond(width, height) ? Math.abs(width - height) / 2 : 0;
            };
            var getPaddingX = function (batchIdx) { return getPadding(batchIdx, function (w, h) { return w < h; }); };
            var getPaddingY = function (batchIdx) { return getPadding(batchIdx, function (w, h) { return h < w; }); };
            var landmarkTensors = output
                .mul(tf_core_esm/* fill */.GSj([batchSize, 136], inputSize))
                .sub(tf_core_esm/* stack */.t$z(Array.from(Array(batchSize), function (_, batchIdx) {
                return createInterleavedTensor(getPaddingX(batchIdx), getPaddingY(batchIdx));
            })))
                .div(tf_core_esm/* stack */.t$z(Array.from(Array(batchSize), function (_, batchIdx) {
                return createInterleavedTensor(inputDimensions[batchIdx].width, inputDimensions[batchIdx].height);
            })));
            return landmarkTensors;
        });
    };
    FaceLandmark68NetBase.prototype.forwardInput = function (input) {
        var _this = this;
        return tf_core_esm/* tidy */.DZQ(function () {
            var out = _this.runNet(input);
            return _this.postProcess(out, input.inputSize, input.inputDimensions.map(function (_a) {
                var height = _a[0], width = _a[1];
                return ({ height: height, width: width });
            }));
        });
    };
    FaceLandmark68NetBase.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    FaceLandmark68NetBase.prototype.detectLandmarks = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var netInput, landmarkTensors, landmarksForBatch;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        landmarkTensors = tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* unstack */.K$i(_this.forwardInput(netInput)); });
                        return [4 /*yield*/, Promise.all(landmarkTensors.map(function (landmarkTensor, batchIdx) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
                                var landmarksArray, _a, _b, xCoords, yCoords;
                                return (0,tslib_es6/* __generator */.YH)(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = Array).from;
                                            return [4 /*yield*/, landmarkTensor.data()];
                                        case 1:
                                            landmarksArray = _b.apply(_a, [_c.sent()]);
                                            xCoords = landmarksArray.filter(function (_, i) { return isEven(i); });
                                            yCoords = landmarksArray.filter(function (_, i) { return !isEven(i); });
                                            return [2 /*return*/, new FaceLandmarks68(Array(68).fill(0).map(function (_, i) { return new Point(xCoords[i], yCoords[i]); }), {
                                                    height: netInput.getInputHeight(batchIdx),
                                                    width: netInput.getInputWidth(batchIdx),
                                                })];
                                    }
                                });
                            }); }))];
                    case 2:
                        landmarksForBatch = _a.sent();
                        landmarkTensors.forEach(function (t) { return t.dispose(); });
                        return [2 /*return*/, netInput.isBatchInput
                                ? landmarksForBatch
                                : landmarksForBatch[0]];
                }
            });
        });
    };
    FaceLandmark68NetBase.prototype.getClassifierChannelsOut = function () {
        return 136;
    };
    return FaceLandmark68NetBase;
}(FaceProcessor));

//# sourceMappingURL=FaceLandmark68NetBase.js.map
;// ./node_modules/face-api.js/build/es6/faceLandmarkNet/FaceLandmark68Net.js



var FaceLandmark68Net = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceLandmark68Net, _super);
    function FaceLandmark68Net(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new FaceFeatureExtractor(); }
        return _super.call(this, 'FaceLandmark68Net', faceFeatureExtractor) || this;
    }
    FaceLandmark68Net.prototype.getDefaultModelName = function () {
        return 'face_landmark_68_model';
    };
    FaceLandmark68Net.prototype.getClassifierChannelsIn = function () {
        return 256;
    };
    return FaceLandmark68Net;
}(FaceLandmark68NetBase));

//# sourceMappingURL=FaceLandmark68Net.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/extractParamsFromWeigthMapTiny.js


function extractParamsFromWeigthMapTiny(weightMap) {
    var paramMappings = [];
    var extractDenseBlock3Params = loadParamsFactory(weightMap, paramMappings).extractDenseBlock3Params;
    var params = {
        dense0: extractDenseBlock3Params('dense0', true),
        dense1: extractDenseBlock3Params('dense1'),
        dense2: extractDenseBlock3Params('dense2')
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMapTiny.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/extractParamsTiny.js


function extractParamsTiny(weights) {
    var paramMappings = [];
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var extractDenseBlock3Params = extractorsFactory(extractWeights, paramMappings).extractDenseBlock3Params;
    var dense0 = extractDenseBlock3Params(3, 32, 'dense0', true);
    var dense1 = extractDenseBlock3Params(32, 64, 'dense1');
    var dense2 = extractDenseBlock3Params(64, 128, 'dense2');
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        paramMappings: paramMappings,
        params: { dense0: dense0, dense1: dense1, dense2: dense2 }
    };
}
//# sourceMappingURL=extractParamsTiny.js.map
;// ./node_modules/face-api.js/build/es6/faceFeatureExtractor/TinyFaceFeatureExtractor.js








var TinyFaceFeatureExtractor = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(TinyFaceFeatureExtractor, _super);
    function TinyFaceFeatureExtractor() {
        return _super.call(this, 'TinyFaceFeatureExtractor') || this;
    }
    TinyFaceFeatureExtractor.prototype.forwardInput = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('TinyFaceFeatureExtractor - load model before inference');
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var batchTensor = input.toBatchTensor(112, true);
            var meanRgb = [122.782, 117.001, 104.298];
            var normalized = normalize(batchTensor, meanRgb).div(tf_core_esm/* scalar */.d_2(255));
            var out = denseBlock3(normalized, params.dense0, true);
            out = denseBlock3(out, params.dense1);
            out = denseBlock3(out, params.dense2);
            out = tf_core_esm/* avgPool */.$jT(out, [14, 14], [2, 2], 'valid');
            return out;
        });
    };
    TinyFaceFeatureExtractor.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    TinyFaceFeatureExtractor.prototype.getDefaultModelName = function () {
        return 'face_feature_extractor_tiny_model';
    };
    TinyFaceFeatureExtractor.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return extractParamsFromWeigthMapTiny(weightMap);
    };
    TinyFaceFeatureExtractor.prototype.extractParams = function (weights) {
        return extractParamsTiny(weights);
    };
    return TinyFaceFeatureExtractor;
}(NeuralNetwork));

//# sourceMappingURL=TinyFaceFeatureExtractor.js.map
;// ./node_modules/face-api.js/build/es6/faceLandmarkNet/FaceLandmark68TinyNet.js



var FaceLandmark68TinyNet = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceLandmark68TinyNet, _super);
    function FaceLandmark68TinyNet(faceFeatureExtractor) {
        if (faceFeatureExtractor === void 0) { faceFeatureExtractor = new TinyFaceFeatureExtractor(); }
        return _super.call(this, 'FaceLandmark68TinyNet', faceFeatureExtractor) || this;
    }
    FaceLandmark68TinyNet.prototype.getDefaultModelName = function () {
        return 'face_landmark_68_tiny_model';
    };
    FaceLandmark68TinyNet.prototype.getClassifierChannelsIn = function () {
        return 128;
    };
    return FaceLandmark68TinyNet;
}(FaceLandmark68NetBase));

//# sourceMappingURL=FaceLandmark68TinyNet.js.map
;// ./node_modules/face-api.js/build/es6/faceLandmarkNet/index.js




var FaceLandmarkNet = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceLandmarkNet, _super);
    function FaceLandmarkNet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FaceLandmarkNet;
}(FaceLandmark68Net));

//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/scaleLayer.js

function scale(x, params) {
    return tf_core_esm/* add */.WQq(tf_core_esm/* mul */.lKK(x, params.weights), params.biases);
}
//# sourceMappingURL=scaleLayer.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/convLayer.js


function convLayer_convLayer(x, params, strides, withRelu, padding) {
    if (padding === void 0) { padding = 'same'; }
    var _a = params.conv, filters = _a.filters, bias = _a.bias;
    var out = tf_core_esm/* conv2d */.Xtf(x, filters, strides, padding);
    out = tf_core_esm/* add */.WQq(out, bias);
    out = scale(out, params.scale);
    return withRelu ? tf_core_esm/* relu */.VVh(out) : out;
}
function convLayer_conv(x, params) {
    return convLayer_convLayer(x, params, [1, 1], true);
}
function convNoRelu(x, params) {
    return convLayer_convLayer(x, params, [1, 1], false);
}
function convDown(x, params) {
    return convLayer_convLayer(x, params, [2, 2], true, 'valid');
}
//# sourceMappingURL=convLayer.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/extractParams.js



function faceRecognitionNet_extractParams_extractorsFactory(extractWeights, paramMappings) {
    function extractFilterValues(numFilterValues, numFilters, filterSize) {
        var weights = extractWeights(numFilterValues);
        var depth = weights.length / (numFilters * filterSize * filterSize);
        if (isFloat(depth)) {
            throw new Error("depth has to be an integer: " + depth + ", weights.length: " + weights.length + ", numFilters: " + numFilters + ", filterSize: " + filterSize);
        }
        return tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* transpose */.mgz(tf_core_esm/* tensor4d */.g9W(weights, [numFilters, depth, filterSize, filterSize]), [2, 3, 1, 0]); });
    }
    function extractConvParams(numFilterValues, numFilters, filterSize, mappedPrefix) {
        var filters = extractFilterValues(numFilterValues, numFilters, filterSize);
        var bias = tf_core_esm/* tensor1d */.tGX(extractWeights(numFilters));
        paramMappings.push({ paramPath: mappedPrefix + "/filters" }, { paramPath: mappedPrefix + "/bias" });
        return { filters: filters, bias: bias };
    }
    function extractScaleLayerParams(numWeights, mappedPrefix) {
        var weights = tf_core_esm/* tensor1d */.tGX(extractWeights(numWeights));
        var biases = tf_core_esm/* tensor1d */.tGX(extractWeights(numWeights));
        paramMappings.push({ paramPath: mappedPrefix + "/weights" }, { paramPath: mappedPrefix + "/biases" });
        return {
            weights: weights,
            biases: biases
        };
    }
    function extractConvLayerParams(numFilterValues, numFilters, filterSize, mappedPrefix) {
        var conv = extractConvParams(numFilterValues, numFilters, filterSize, mappedPrefix + "/conv");
        var scale = extractScaleLayerParams(numFilters, mappedPrefix + "/scale");
        return { conv: conv, scale: scale };
    }
    function extractResidualLayerParams(numFilterValues, numFilters, filterSize, mappedPrefix, isDown) {
        if (isDown === void 0) { isDown = false; }
        var conv1 = extractConvLayerParams((isDown ? 0.5 : 1) * numFilterValues, numFilters, filterSize, mappedPrefix + "/conv1");
        var conv2 = extractConvLayerParams(numFilterValues, numFilters, filterSize, mappedPrefix + "/conv2");
        return { conv1: conv1, conv2: conv2 };
    }
    return {
        extractConvLayerParams: extractConvLayerParams,
        extractResidualLayerParams: extractResidualLayerParams
    };
}
function faceRecognitionNet_extractParams_extractParams(weights) {
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var paramMappings = [];
    var _b = faceRecognitionNet_extractParams_extractorsFactory(extractWeights, paramMappings), extractConvLayerParams = _b.extractConvLayerParams, extractResidualLayerParams = _b.extractResidualLayerParams;
    var conv32_down = extractConvLayerParams(4704, 32, 7, 'conv32_down');
    var conv32_1 = extractResidualLayerParams(9216, 32, 3, 'conv32_1');
    var conv32_2 = extractResidualLayerParams(9216, 32, 3, 'conv32_2');
    var conv32_3 = extractResidualLayerParams(9216, 32, 3, 'conv32_3');
    var conv64_down = extractResidualLayerParams(36864, 64, 3, 'conv64_down', true);
    var conv64_1 = extractResidualLayerParams(36864, 64, 3, 'conv64_1');
    var conv64_2 = extractResidualLayerParams(36864, 64, 3, 'conv64_2');
    var conv64_3 = extractResidualLayerParams(36864, 64, 3, 'conv64_3');
    var conv128_down = extractResidualLayerParams(147456, 128, 3, 'conv128_down', true);
    var conv128_1 = extractResidualLayerParams(147456, 128, 3, 'conv128_1');
    var conv128_2 = extractResidualLayerParams(147456, 128, 3, 'conv128_2');
    var conv256_down = extractResidualLayerParams(589824, 256, 3, 'conv256_down', true);
    var conv256_1 = extractResidualLayerParams(589824, 256, 3, 'conv256_1');
    var conv256_2 = extractResidualLayerParams(589824, 256, 3, 'conv256_2');
    var conv256_down_out = extractResidualLayerParams(589824, 256, 3, 'conv256_down_out');
    var fc = tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* transpose */.mgz(tf_core_esm/* tensor2d */.KtR(extractWeights(256 * 128), [128, 256]), [1, 0]); });
    paramMappings.push({ paramPath: "fc" });
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    var params = {
        conv32_down: conv32_down,
        conv32_1: conv32_1,
        conv32_2: conv32_2,
        conv32_3: conv32_3,
        conv64_down: conv64_down,
        conv64_1: conv64_1,
        conv64_2: conv64_2,
        conv64_3: conv64_3,
        conv128_down: conv128_down,
        conv128_1: conv128_1,
        conv128_2: conv128_2,
        conv256_down: conv256_down,
        conv256_1: conv256_1,
        conv256_2: conv256_2,
        conv256_down_out: conv256_down_out,
        fc: fc
    };
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/extractParamsFromWeigthMap.js


function extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings) {
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractScaleLayerParams(prefix) {
        var weights = extractWeightEntry(prefix + "/scale/weights", 1);
        var biases = extractWeightEntry(prefix + "/scale/biases", 1);
        return { weights: weights, biases: biases };
    }
    function extractConvLayerParams(prefix) {
        var filters = extractWeightEntry(prefix + "/conv/filters", 4);
        var bias = extractWeightEntry(prefix + "/conv/bias", 1);
        var scale = extractScaleLayerParams(prefix);
        return { conv: { filters: filters, bias: bias }, scale: scale };
    }
    function extractResidualLayerParams(prefix) {
        return {
            conv1: extractConvLayerParams(prefix + "/conv1"),
            conv2: extractConvLayerParams(prefix + "/conv2")
        };
    }
    return {
        extractConvLayerParams: extractConvLayerParams,
        extractResidualLayerParams: extractResidualLayerParams
    };
}
function faceRecognitionNet_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap) {
    var paramMappings = [];
    var _a = extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings), extractConvLayerParams = _a.extractConvLayerParams, extractResidualLayerParams = _a.extractResidualLayerParams;
    var conv32_down = extractConvLayerParams('conv32_down');
    var conv32_1 = extractResidualLayerParams('conv32_1');
    var conv32_2 = extractResidualLayerParams('conv32_2');
    var conv32_3 = extractResidualLayerParams('conv32_3');
    var conv64_down = extractResidualLayerParams('conv64_down');
    var conv64_1 = extractResidualLayerParams('conv64_1');
    var conv64_2 = extractResidualLayerParams('conv64_2');
    var conv64_3 = extractResidualLayerParams('conv64_3');
    var conv128_down = extractResidualLayerParams('conv128_down');
    var conv128_1 = extractResidualLayerParams('conv128_1');
    var conv128_2 = extractResidualLayerParams('conv128_2');
    var conv256_down = extractResidualLayerParams('conv256_down');
    var conv256_1 = extractResidualLayerParams('conv256_1');
    var conv256_2 = extractResidualLayerParams('conv256_2');
    var conv256_down_out = extractResidualLayerParams('conv256_down_out');
    var fc = weightMap['fc'];
    paramMappings.push({ originalPath: 'fc', paramPath: 'fc' });
    if (!isTensor2D(fc)) {
        throw new Error("expected weightMap[fc] to be a Tensor2D, instead have " + fc);
    }
    var params = {
        conv32_down: conv32_down,
        conv32_1: conv32_1,
        conv32_2: conv32_2,
        conv32_3: conv32_3,
        conv64_down: conv64_down,
        conv64_1: conv64_1,
        conv64_2: conv64_2,
        conv64_3: conv64_3,
        conv128_down: conv128_down,
        conv128_1: conv128_1,
        conv128_2: conv128_2,
        conv256_down: conv256_down,
        conv256_1: conv256_1,
        conv256_2: conv256_2,
        conv256_down_out: conv256_down_out,
        fc: fc
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/residualLayer.js



function residual(x, params) {
    var out = convLayer_conv(x, params.conv1);
    out = convNoRelu(out, params.conv2);
    out = tf_core_esm/* add */.WQq(out, x);
    out = tf_core_esm/* relu */.VVh(out);
    return out;
}
function residualDown(x, params) {
    var out = convDown(x, params.conv1);
    out = convNoRelu(out, params.conv2);
    var pooled = tf_core_esm/* avgPool */.$jT(x, 2, 2, 'valid');
    var zeros = tf_core_esm/* zeros */.Ul9(pooled.shape);
    var isPad = pooled.shape[3] !== out.shape[3];
    var isAdjustShape = pooled.shape[1] !== out.shape[1] || pooled.shape[2] !== out.shape[2];
    if (isAdjustShape) {
        var padShapeX = (0,tslib_es6/* __spreadArrays */.aN)(out.shape);
        padShapeX[1] = 1;
        var zerosW = tf_core_esm/* zeros */.Ul9(padShapeX);
        out = tf_core_esm/* concat */.xWs([out, zerosW], 1);
        var padShapeY = (0,tslib_es6/* __spreadArrays */.aN)(out.shape);
        padShapeY[2] = 1;
        var zerosH = tf_core_esm/* zeros */.Ul9(padShapeY);
        out = tf_core_esm/* concat */.xWs([out, zerosH], 2);
    }
    pooled = isPad ? tf_core_esm/* concat */.xWs([pooled, zeros], 3) : pooled;
    out = tf_core_esm/* add */.WQq(pooled, out);
    out = tf_core_esm/* relu */.VVh(out);
    return out;
}
//# sourceMappingURL=residualLayer.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/FaceRecognitionNet.js









var FaceRecognitionNet_FaceRecognitionNet = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceRecognitionNet, _super);
    function FaceRecognitionNet() {
        return _super.call(this, 'FaceRecognitionNet') || this;
    }
    FaceRecognitionNet.prototype.forwardInput = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('FaceRecognitionNet - load model before inference');
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var batchTensor = input.toBatchTensor(150, true).toFloat();
            var meanRgb = [122.782, 117.001, 104.298];
            var normalized = normalize(batchTensor, meanRgb).div(tf_core_esm/* scalar */.d_2(256));
            var out = convDown(normalized, params.conv32_down);
            out = tf_core_esm/* maxPool */.jgi(out, 3, 2, 'valid');
            out = residual(out, params.conv32_1);
            out = residual(out, params.conv32_2);
            out = residual(out, params.conv32_3);
            out = residualDown(out, params.conv64_down);
            out = residual(out, params.conv64_1);
            out = residual(out, params.conv64_2);
            out = residual(out, params.conv64_3);
            out = residualDown(out, params.conv128_down);
            out = residual(out, params.conv128_1);
            out = residual(out, params.conv128_2);
            out = residualDown(out, params.conv256_down);
            out = residual(out, params.conv256_1);
            out = residual(out, params.conv256_2);
            out = residualDown(out, params.conv256_down_out);
            var globalAvg = out.mean([1, 2]);
            var fullyConnected = tf_core_esm/* matMul */.NoW(globalAvg, params.fc);
            return fullyConnected;
        });
    };
    FaceRecognitionNet.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    FaceRecognitionNet.prototype.computeFaceDescriptor = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var netInput, faceDescriptorTensors, faceDescriptorsForBatch;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _a.sent();
                        faceDescriptorTensors = tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* unstack */.K$i(_this.forwardInput(netInput)); });
                        return [4 /*yield*/, Promise.all(faceDescriptorTensors.map(function (t) { return t.data(); }))];
                    case 2:
                        faceDescriptorsForBatch = _a.sent();
                        faceDescriptorTensors.forEach(function (t) { return t.dispose(); });
                        return [2 /*return*/, netInput.isBatchInput
                                ? faceDescriptorsForBatch
                                : faceDescriptorsForBatch[0]];
                }
            });
        });
    };
    FaceRecognitionNet.prototype.getDefaultModelName = function () {
        return 'face_recognition_model';
    };
    FaceRecognitionNet.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return faceRecognitionNet_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap);
    };
    FaceRecognitionNet.prototype.extractParams = function (weights) {
        return faceRecognitionNet_extractParams_extractParams(weights);
    };
    return FaceRecognitionNet;
}(NeuralNetwork));

//# sourceMappingURL=FaceRecognitionNet.js.map
;// ./node_modules/face-api.js/build/es6/faceRecognitionNet/index.js


function createFaceRecognitionNet(weights) {
    var net = new FaceRecognitionNet();
    net.extractWeights(weights);
    return net;
}
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/factories/WithGender.js


function isWithGender(obj) {
    return (obj['gender'] === Gender.MALE || obj['gender'] === Gender.FEMALE)
        && isValidProbablitiy(obj['genderProbability']);
}
function extendWithGender(sourceObj, gender, genderProbability) {
    var extension = { gender: gender, genderProbability: genderProbability };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithGender.js.map
;// ./node_modules/face-api.js/build/es6/factories/index.js






//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/MtcnnOptions.js
var MtcnnOptions_MtcnnOptions = /** @class */ (function () {
    function MtcnnOptions(_a) {
        var _b = _a === void 0 ? {} : _a, minFaceSize = _b.minFaceSize, scaleFactor = _b.scaleFactor, maxNumScales = _b.maxNumScales, scoreThresholds = _b.scoreThresholds, scaleSteps = _b.scaleSteps;
        this._name = 'MtcnnOptions';
        this._minFaceSize = minFaceSize || 20;
        this._scaleFactor = scaleFactor || 0.709;
        this._maxNumScales = maxNumScales || 10;
        this._scoreThresholds = scoreThresholds || [0.6, 0.7, 0.7];
        this._scaleSteps = scaleSteps;
        if (typeof this._minFaceSize !== 'number' || this._minFaceSize < 0) {
            throw new Error(this._name + " - expected minFaceSize to be a number > 0");
        }
        if (typeof this._scaleFactor !== 'number' || this._scaleFactor <= 0 || this._scaleFactor >= 1) {
            throw new Error(this._name + " - expected scaleFactor to be a number between 0 and 1");
        }
        if (typeof this._maxNumScales !== 'number' || this._maxNumScales < 0) {
            throw new Error(this._name + " - expected maxNumScales to be a number > 0");
        }
        if (!Array.isArray(this._scoreThresholds)
            || this._scoreThresholds.length !== 3
            || this._scoreThresholds.some(function (th) { return typeof th !== 'number'; })) {
            throw new Error(this._name + " - expected scoreThresholds to be an array of numbers of length 3");
        }
        if (this._scaleSteps
            && (!Array.isArray(this._scaleSteps) || this._scaleSteps.some(function (th) { return typeof th !== 'number'; }))) {
            throw new Error(this._name + " - expected scaleSteps to be an array of numbers");
        }
    }
    Object.defineProperty(MtcnnOptions.prototype, "minFaceSize", {
        get: function () { return this._minFaceSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtcnnOptions.prototype, "scaleFactor", {
        get: function () { return this._scaleFactor; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtcnnOptions.prototype, "maxNumScales", {
        get: function () { return this._maxNumScales; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtcnnOptions.prototype, "scoreThresholds", {
        get: function () { return this._scoreThresholds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MtcnnOptions.prototype, "scaleSteps", {
        get: function () { return this._scaleSteps; },
        enumerable: true,
        configurable: true
    });
    return MtcnnOptions;
}());

//# sourceMappingURL=MtcnnOptions.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/extractParams.js


function ssdMobilenetv1_extractParams_extractorsFactory(extractWeights, paramMappings) {
    function extractDepthwiseConvParams(numChannels, mappedPrefix) {
        var filters = tf_core_esm/* tensor4d */.g9W(extractWeights(3 * 3 * numChannels), [3, 3, numChannels, 1]);
        var batch_norm_scale = tf_core_esm/* tensor1d */.tGX(extractWeights(numChannels));
        var batch_norm_offset = tf_core_esm/* tensor1d */.tGX(extractWeights(numChannels));
        var batch_norm_mean = tf_core_esm/* tensor1d */.tGX(extractWeights(numChannels));
        var batch_norm_variance = tf_core_esm/* tensor1d */.tGX(extractWeights(numChannels));
        paramMappings.push({ paramPath: mappedPrefix + "/filters" }, { paramPath: mappedPrefix + "/batch_norm_scale" }, { paramPath: mappedPrefix + "/batch_norm_offset" }, { paramPath: mappedPrefix + "/batch_norm_mean" }, { paramPath: mappedPrefix + "/batch_norm_variance" });
        return {
            filters: filters,
            batch_norm_scale: batch_norm_scale,
            batch_norm_offset: batch_norm_offset,
            batch_norm_mean: batch_norm_mean,
            batch_norm_variance: batch_norm_variance
        };
    }
    function extractConvParams(channelsIn, channelsOut, filterSize, mappedPrefix, isPointwiseConv) {
        var filters = tf_core_esm/* tensor4d */.g9W(extractWeights(channelsIn * channelsOut * filterSize * filterSize), [filterSize, filterSize, channelsIn, channelsOut]);
        var bias = tf_core_esm/* tensor1d */.tGX(extractWeights(channelsOut));
        paramMappings.push({ paramPath: mappedPrefix + "/filters" }, { paramPath: mappedPrefix + "/" + (isPointwiseConv ? 'batch_norm_offset' : 'bias') });
        return { filters: filters, bias: bias };
    }
    function extractPointwiseConvParams(channelsIn, channelsOut, filterSize, mappedPrefix) {
        var _a = extractConvParams(channelsIn, channelsOut, filterSize, mappedPrefix, true), filters = _a.filters, bias = _a.bias;
        return {
            filters: filters,
            batch_norm_offset: bias
        };
    }
    function extractConvPairParams(channelsIn, channelsOut, mappedPrefix) {
        var depthwise_conv = extractDepthwiseConvParams(channelsIn, mappedPrefix + "/depthwise_conv");
        var pointwise_conv = extractPointwiseConvParams(channelsIn, channelsOut, 1, mappedPrefix + "/pointwise_conv");
        return { depthwise_conv: depthwise_conv, pointwise_conv: pointwise_conv };
    }
    function extractMobilenetV1Params() {
        var conv_0 = extractPointwiseConvParams(3, 32, 3, 'mobilenetv1/conv_0');
        var conv_1 = extractConvPairParams(32, 64, 'mobilenetv1/conv_1');
        var conv_2 = extractConvPairParams(64, 128, 'mobilenetv1/conv_2');
        var conv_3 = extractConvPairParams(128, 128, 'mobilenetv1/conv_3');
        var conv_4 = extractConvPairParams(128, 256, 'mobilenetv1/conv_4');
        var conv_5 = extractConvPairParams(256, 256, 'mobilenetv1/conv_5');
        var conv_6 = extractConvPairParams(256, 512, 'mobilenetv1/conv_6');
        var conv_7 = extractConvPairParams(512, 512, 'mobilenetv1/conv_7');
        var conv_8 = extractConvPairParams(512, 512, 'mobilenetv1/conv_8');
        var conv_9 = extractConvPairParams(512, 512, 'mobilenetv1/conv_9');
        var conv_10 = extractConvPairParams(512, 512, 'mobilenetv1/conv_10');
        var conv_11 = extractConvPairParams(512, 512, 'mobilenetv1/conv_11');
        var conv_12 = extractConvPairParams(512, 1024, 'mobilenetv1/conv_12');
        var conv_13 = extractConvPairParams(1024, 1024, 'mobilenetv1/conv_13');
        return {
            conv_0: conv_0,
            conv_1: conv_1,
            conv_2: conv_2,
            conv_3: conv_3,
            conv_4: conv_4,
            conv_5: conv_5,
            conv_6: conv_6,
            conv_7: conv_7,
            conv_8: conv_8,
            conv_9: conv_9,
            conv_10: conv_10,
            conv_11: conv_11,
            conv_12: conv_12,
            conv_13: conv_13
        };
    }
    function extractPredictionLayerParams() {
        var conv_0 = extractPointwiseConvParams(1024, 256, 1, 'prediction_layer/conv_0');
        var conv_1 = extractPointwiseConvParams(256, 512, 3, 'prediction_layer/conv_1');
        var conv_2 = extractPointwiseConvParams(512, 128, 1, 'prediction_layer/conv_2');
        var conv_3 = extractPointwiseConvParams(128, 256, 3, 'prediction_layer/conv_3');
        var conv_4 = extractPointwiseConvParams(256, 128, 1, 'prediction_layer/conv_4');
        var conv_5 = extractPointwiseConvParams(128, 256, 3, 'prediction_layer/conv_5');
        var conv_6 = extractPointwiseConvParams(256, 64, 1, 'prediction_layer/conv_6');
        var conv_7 = extractPointwiseConvParams(64, 128, 3, 'prediction_layer/conv_7');
        var box_encoding_0_predictor = extractConvParams(512, 12, 1, 'prediction_layer/box_predictor_0/box_encoding_predictor');
        var class_predictor_0 = extractConvParams(512, 9, 1, 'prediction_layer/box_predictor_0/class_predictor');
        var box_encoding_1_predictor = extractConvParams(1024, 24, 1, 'prediction_layer/box_predictor_1/box_encoding_predictor');
        var class_predictor_1 = extractConvParams(1024, 18, 1, 'prediction_layer/box_predictor_1/class_predictor');
        var box_encoding_2_predictor = extractConvParams(512, 24, 1, 'prediction_layer/box_predictor_2/box_encoding_predictor');
        var class_predictor_2 = extractConvParams(512, 18, 1, 'prediction_layer/box_predictor_2/class_predictor');
        var box_encoding_3_predictor = extractConvParams(256, 24, 1, 'prediction_layer/box_predictor_3/box_encoding_predictor');
        var class_predictor_3 = extractConvParams(256, 18, 1, 'prediction_layer/box_predictor_3/class_predictor');
        var box_encoding_4_predictor = extractConvParams(256, 24, 1, 'prediction_layer/box_predictor_4/box_encoding_predictor');
        var class_predictor_4 = extractConvParams(256, 18, 1, 'prediction_layer/box_predictor_4/class_predictor');
        var box_encoding_5_predictor = extractConvParams(128, 24, 1, 'prediction_layer/box_predictor_5/box_encoding_predictor');
        var class_predictor_5 = extractConvParams(128, 18, 1, 'prediction_layer/box_predictor_5/class_predictor');
        var box_predictor_0 = {
            box_encoding_predictor: box_encoding_0_predictor,
            class_predictor: class_predictor_0
        };
        var box_predictor_1 = {
            box_encoding_predictor: box_encoding_1_predictor,
            class_predictor: class_predictor_1
        };
        var box_predictor_2 = {
            box_encoding_predictor: box_encoding_2_predictor,
            class_predictor: class_predictor_2
        };
        var box_predictor_3 = {
            box_encoding_predictor: box_encoding_3_predictor,
            class_predictor: class_predictor_3
        };
        var box_predictor_4 = {
            box_encoding_predictor: box_encoding_4_predictor,
            class_predictor: class_predictor_4
        };
        var box_predictor_5 = {
            box_encoding_predictor: box_encoding_5_predictor,
            class_predictor: class_predictor_5
        };
        return {
            conv_0: conv_0,
            conv_1: conv_1,
            conv_2: conv_2,
            conv_3: conv_3,
            conv_4: conv_4,
            conv_5: conv_5,
            conv_6: conv_6,
            conv_7: conv_7,
            box_predictor_0: box_predictor_0,
            box_predictor_1: box_predictor_1,
            box_predictor_2: box_predictor_2,
            box_predictor_3: box_predictor_3,
            box_predictor_4: box_predictor_4,
            box_predictor_5: box_predictor_5
        };
    }
    return {
        extractMobilenetV1Params: extractMobilenetV1Params,
        extractPredictionLayerParams: extractPredictionLayerParams
    };
}
function ssdMobilenetv1_extractParams_extractParams(weights) {
    var paramMappings = [];
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var _b = ssdMobilenetv1_extractParams_extractorsFactory(extractWeights, paramMappings), extractMobilenetV1Params = _b.extractMobilenetV1Params, extractPredictionLayerParams = _b.extractPredictionLayerParams;
    var mobilenetv1 = extractMobilenetV1Params();
    var prediction_layer = extractPredictionLayerParams();
    var extra_dim = tf_core_esm/* tensor3d */.$_$(extractWeights(5118 * 4), [1, 5118, 4]);
    var output_layer = {
        extra_dim: extra_dim
    };
    paramMappings.push({ paramPath: 'output_layer/extra_dim' });
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return {
        params: {
            mobilenetv1: mobilenetv1,
            prediction_layer: prediction_layer,
            output_layer: output_layer
        },
        paramMappings: paramMappings
    };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/extractParamsFromWeigthMap.js


function ssdMobilenetv1_extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings) {
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractPointwiseConvParams(prefix, idx, mappedPrefix) {
        var filters = extractWeightEntry(prefix + "/Conv2d_" + idx + "_pointwise/weights", 4, mappedPrefix + "/filters");
        var batch_norm_offset = extractWeightEntry(prefix + "/Conv2d_" + idx + "_pointwise/convolution_bn_offset", 1, mappedPrefix + "/batch_norm_offset");
        return { filters: filters, batch_norm_offset: batch_norm_offset };
    }
    function extractConvPairParams(idx) {
        var mappedPrefix = "mobilenetv1/conv_" + idx;
        var prefixDepthwiseConv = "MobilenetV1/Conv2d_" + idx + "_depthwise";
        var mappedPrefixDepthwiseConv = mappedPrefix + "/depthwise_conv";
        var mappedPrefixPointwiseConv = mappedPrefix + "/pointwise_conv";
        var filters = extractWeightEntry(prefixDepthwiseConv + "/depthwise_weights", 4, mappedPrefixDepthwiseConv + "/filters");
        var batch_norm_scale = extractWeightEntry(prefixDepthwiseConv + "/BatchNorm/gamma", 1, mappedPrefixDepthwiseConv + "/batch_norm_scale");
        var batch_norm_offset = extractWeightEntry(prefixDepthwiseConv + "/BatchNorm/beta", 1, mappedPrefixDepthwiseConv + "/batch_norm_offset");
        var batch_norm_mean = extractWeightEntry(prefixDepthwiseConv + "/BatchNorm/moving_mean", 1, mappedPrefixDepthwiseConv + "/batch_norm_mean");
        var batch_norm_variance = extractWeightEntry(prefixDepthwiseConv + "/BatchNorm/moving_variance", 1, mappedPrefixDepthwiseConv + "/batch_norm_variance");
        return {
            depthwise_conv: {
                filters: filters,
                batch_norm_scale: batch_norm_scale,
                batch_norm_offset: batch_norm_offset,
                batch_norm_mean: batch_norm_mean,
                batch_norm_variance: batch_norm_variance
            },
            pointwise_conv: extractPointwiseConvParams('MobilenetV1', idx, mappedPrefixPointwiseConv)
        };
    }
    function extractMobilenetV1Params() {
        return {
            conv_0: extractPointwiseConvParams('MobilenetV1', 0, 'mobilenetv1/conv_0'),
            conv_1: extractConvPairParams(1),
            conv_2: extractConvPairParams(2),
            conv_3: extractConvPairParams(3),
            conv_4: extractConvPairParams(4),
            conv_5: extractConvPairParams(5),
            conv_6: extractConvPairParams(6),
            conv_7: extractConvPairParams(7),
            conv_8: extractConvPairParams(8),
            conv_9: extractConvPairParams(9),
            conv_10: extractConvPairParams(10),
            conv_11: extractConvPairParams(11),
            conv_12: extractConvPairParams(12),
            conv_13: extractConvPairParams(13)
        };
    }
    function extractConvParams(prefix, mappedPrefix) {
        var filters = extractWeightEntry(prefix + "/weights", 4, mappedPrefix + "/filters");
        var bias = extractWeightEntry(prefix + "/biases", 1, mappedPrefix + "/bias");
        return { filters: filters, bias: bias };
    }
    function extractBoxPredictorParams(idx) {
        var box_encoding_predictor = extractConvParams("Prediction/BoxPredictor_" + idx + "/BoxEncodingPredictor", "prediction_layer/box_predictor_" + idx + "/box_encoding_predictor");
        var class_predictor = extractConvParams("Prediction/BoxPredictor_" + idx + "/ClassPredictor", "prediction_layer/box_predictor_" + idx + "/class_predictor");
        return { box_encoding_predictor: box_encoding_predictor, class_predictor: class_predictor };
    }
    function extractPredictionLayerParams() {
        return {
            conv_0: extractPointwiseConvParams('Prediction', 0, 'prediction_layer/conv_0'),
            conv_1: extractPointwiseConvParams('Prediction', 1, 'prediction_layer/conv_1'),
            conv_2: extractPointwiseConvParams('Prediction', 2, 'prediction_layer/conv_2'),
            conv_3: extractPointwiseConvParams('Prediction', 3, 'prediction_layer/conv_3'),
            conv_4: extractPointwiseConvParams('Prediction', 4, 'prediction_layer/conv_4'),
            conv_5: extractPointwiseConvParams('Prediction', 5, 'prediction_layer/conv_5'),
            conv_6: extractPointwiseConvParams('Prediction', 6, 'prediction_layer/conv_6'),
            conv_7: extractPointwiseConvParams('Prediction', 7, 'prediction_layer/conv_7'),
            box_predictor_0: extractBoxPredictorParams(0),
            box_predictor_1: extractBoxPredictorParams(1),
            box_predictor_2: extractBoxPredictorParams(2),
            box_predictor_3: extractBoxPredictorParams(3),
            box_predictor_4: extractBoxPredictorParams(4),
            box_predictor_5: extractBoxPredictorParams(5)
        };
    }
    return {
        extractMobilenetV1Params: extractMobilenetV1Params,
        extractPredictionLayerParams: extractPredictionLayerParams
    };
}
function ssdMobilenetv1_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap) {
    var paramMappings = [];
    var _a = ssdMobilenetv1_extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings), extractMobilenetV1Params = _a.extractMobilenetV1Params, extractPredictionLayerParams = _a.extractPredictionLayerParams;
    var extra_dim = weightMap['Output/extra_dim'];
    paramMappings.push({ originalPath: 'Output/extra_dim', paramPath: 'output_layer/extra_dim' });
    if (!isTensor3D(extra_dim)) {
        throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have " + extra_dim);
    }
    var params = {
        mobilenetv1: extractMobilenetV1Params(),
        prediction_layer: extractPredictionLayerParams(),
        output_layer: {
            extra_dim: extra_dim
        }
    };
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/pointwiseConvLayer.js

function pointwiseConvLayer(x, params, strides) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = tf_core_esm/* conv2d */.Xtf(x, params.filters, strides, 'same');
        out = tf_core_esm/* add */.WQq(out, params.batch_norm_offset);
        return tf_core_esm/* clipByValue */.zQh(out, 0, 6);
    });
}
//# sourceMappingURL=pointwiseConvLayer.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/mobileNetV1.js


var epsilon = 0.0010000000474974513;
function depthwiseConvLayer(x, params, strides) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = tf_core_esm/* depthwiseConv2d */.Gl3(x, params.filters, strides, 'same');
        out = tf_core_esm/* batchNorm */.$v7(out, params.batch_norm_mean, params.batch_norm_variance, params.batch_norm_offset, params.batch_norm_scale, epsilon);
        return tf_core_esm/* clipByValue */.zQh(out, 0, 6);
    });
}
function getStridesForLayerIdx(layerIdx) {
    return [2, 4, 6, 12].some(function (idx) { return idx === layerIdx; }) ? [2, 2] : [1, 1];
}
function mobileNetV1(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var conv11 = null;
        var out = pointwiseConvLayer(x, params.conv_0, [2, 2]);
        var convPairParams = [
            params.conv_1,
            params.conv_2,
            params.conv_3,
            params.conv_4,
            params.conv_5,
            params.conv_6,
            params.conv_7,
            params.conv_8,
            params.conv_9,
            params.conv_10,
            params.conv_11,
            params.conv_12,
            params.conv_13
        ];
        convPairParams.forEach(function (param, i) {
            var layerIdx = i + 1;
            var depthwiseConvStrides = getStridesForLayerIdx(layerIdx);
            out = depthwiseConvLayer(out, param.depthwise_conv, depthwiseConvStrides);
            out = pointwiseConvLayer(out, param.pointwise_conv, [1, 1]);
            if (layerIdx === 11) {
                conv11 = out;
            }
        });
        if (conv11 === null) {
            throw new Error('mobileNetV1 - output of conv layer 11 is null');
        }
        return {
            out: out,
            conv11: conv11
        };
    });
}
//# sourceMappingURL=mobileNetV1.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/nonMaxSuppression.js
function nonMaxSuppression_nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    var numBoxes = boxes.shape[0];
    var outputSize = Math.min(maxOutputSize, numBoxes);
    var candidates = scores
        .map(function (score, boxIndex) { return ({ score: score, boxIndex: boxIndex }); })
        .filter(function (c) { return c.score > scoreThreshold; })
        .sort(function (c1, c2) { return c2.score - c1.score; });
    var suppressFunc = function (x) { return x <= iouThreshold ? 1 : 0; };
    var selected = [];
    candidates.forEach(function (c) {
        if (selected.length >= outputSize) {
            return;
        }
        var originalScore = c.score;
        for (var j = selected.length - 1; j >= 0; --j) {
            var iou = IOU(boxes, c.boxIndex, selected[j]);
            if (iou === 0.0) {
                continue;
            }
            c.score *= suppressFunc(iou);
            if (c.score <= scoreThreshold) {
                break;
            }
        }
        if (originalScore === c.score) {
            selected.push(c.boxIndex);
        }
    });
    return selected;
}
function IOU(boxes, i, j) {
    var boxesData = boxes.arraySync();
    var yminI = Math.min(boxesData[i][0], boxesData[i][2]);
    var xminI = Math.min(boxesData[i][1], boxesData[i][3]);
    var ymaxI = Math.max(boxesData[i][0], boxesData[i][2]);
    var xmaxI = Math.max(boxesData[i][1], boxesData[i][3]);
    var yminJ = Math.min(boxesData[j][0], boxesData[j][2]);
    var xminJ = Math.min(boxesData[j][1], boxesData[j][3]);
    var ymaxJ = Math.max(boxesData[j][0], boxesData[j][2]);
    var xmaxJ = Math.max(boxesData[j][1], boxesData[j][3]);
    var areaI = (ymaxI - yminI) * (xmaxI - xminI);
    var areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
    if (areaI <= 0 || areaJ <= 0) {
        return 0.0;
    }
    var intersectionYmin = Math.max(yminI, yminJ);
    var intersectionXmin = Math.max(xminI, xminJ);
    var intersectionYmax = Math.min(ymaxI, ymaxJ);
    var intersectionXmax = Math.min(xmaxI, xmaxJ);
    var intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) *
        Math.max(intersectionXmax - intersectionXmin, 0.0);
    return intersectionArea / (areaI + areaJ - intersectionArea);
}
//# sourceMappingURL=nonMaxSuppression.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/outputLayer.js

function getCenterCoordinatesAndSizesLayer(x) {
    var vec = tf_core_esm/* unstack */.K$i(tf_core_esm/* transpose */.mgz(x, [1, 0]));
    var sizes = [
        tf_core_esm/* sub */.jbE(vec[2], vec[0]),
        tf_core_esm/* sub */.jbE(vec[3], vec[1])
    ];
    var centers = [
        tf_core_esm/* add */.WQq(vec[0], tf_core_esm/* div */.y4m(sizes[0], tf_core_esm/* scalar */.d_2(2))),
        tf_core_esm/* add */.WQq(vec[1], tf_core_esm/* div */.y4m(sizes[1], tf_core_esm/* scalar */.d_2(2)))
    ];
    return {
        sizes: sizes,
        centers: centers
    };
}
function decodeBoxesLayer(x0, x1) {
    var _a = getCenterCoordinatesAndSizesLayer(x0), sizes = _a.sizes, centers = _a.centers;
    var vec = tf_core_esm/* unstack */.K$i(tf_core_esm/* transpose */.mgz(x1, [1, 0]));
    var div0_out = tf_core_esm/* div */.y4m(tf_core_esm/* mul */.lKK(tf_core_esm/* exp */.oNF(tf_core_esm/* div */.y4m(vec[2], tf_core_esm/* scalar */.d_2(5))), sizes[0]), tf_core_esm/* scalar */.d_2(2));
    var add0_out = tf_core_esm/* add */.WQq(tf_core_esm/* mul */.lKK(tf_core_esm/* div */.y4m(vec[0], tf_core_esm/* scalar */.d_2(10)), sizes[0]), centers[0]);
    var div1_out = tf_core_esm/* div */.y4m(tf_core_esm/* mul */.lKK(tf_core_esm/* exp */.oNF(tf_core_esm/* div */.y4m(vec[3], tf_core_esm/* scalar */.d_2(5))), sizes[1]), tf_core_esm/* scalar */.d_2(2));
    var add1_out = tf_core_esm/* add */.WQq(tf_core_esm/* mul */.lKK(tf_core_esm/* div */.y4m(vec[1], tf_core_esm/* scalar */.d_2(10)), sizes[1]), centers[1]);
    return tf_core_esm/* transpose */.mgz(tf_core_esm/* stack */.t$z([
        tf_core_esm/* sub */.jbE(add0_out, div0_out),
        tf_core_esm/* sub */.jbE(add1_out, div1_out),
        tf_core_esm/* add */.WQq(add0_out, div0_out),
        tf_core_esm/* add */.WQq(add1_out, div1_out)
    ]), [1, 0]);
}
function outputLayer(boxPredictions, classPredictions, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var batchSize = boxPredictions.shape[0];
        var boxes = decodeBoxesLayer(tf_core_esm/* reshape */.tQQ(tf_core_esm/* tile */.Vsq(params.extra_dim, [batchSize, 1, 1]), [-1, 4]), tf_core_esm/* reshape */.tQQ(boxPredictions, [-1, 4]));
        boxes = tf_core_esm/* reshape */.tQQ(boxes, [batchSize, (boxes.shape[0] / batchSize), 4]);
        var scoresAndClasses = tf_core_esm/* sigmoid */.ry7(tf_core_esm/* slice */.dik(classPredictions, [0, 0, 1], [-1, -1, -1]));
        var scores = tf_core_esm/* slice */.dik(scoresAndClasses, [0, 0, 0], [-1, -1, 1]);
        scores = tf_core_esm/* reshape */.tQQ(scores, [batchSize, scores.shape[1]]);
        var boxesByBatch = tf_core_esm/* unstack */.K$i(boxes);
        var scoresByBatch = tf_core_esm/* unstack */.K$i(scores);
        return {
            boxes: boxesByBatch,
            scores: scoresByBatch
        };
    });
}
//# sourceMappingURL=outputLayer.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/boxPredictionLayer.js


function boxPredictionLayer(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var batchSize = x.shape[0];
        var boxPredictionEncoding = tf_core_esm/* reshape */.tQQ(convLayer(x, params.box_encoding_predictor), [batchSize, -1, 1, 4]);
        var classPrediction = tf_core_esm/* reshape */.tQQ(convLayer(x, params.class_predictor), [batchSize, -1, 3]);
        return {
            boxPredictionEncoding: boxPredictionEncoding,
            classPrediction: classPrediction
        };
    });
}
//# sourceMappingURL=boxPredictionLayer.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/predictionLayer.js



function predictionLayer(x, conv11, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var conv0 = pointwiseConvLayer(x, params.conv_0, [1, 1]);
        var conv1 = pointwiseConvLayer(conv0, params.conv_1, [2, 2]);
        var conv2 = pointwiseConvLayer(conv1, params.conv_2, [1, 1]);
        var conv3 = pointwiseConvLayer(conv2, params.conv_3, [2, 2]);
        var conv4 = pointwiseConvLayer(conv3, params.conv_4, [1, 1]);
        var conv5 = pointwiseConvLayer(conv4, params.conv_5, [2, 2]);
        var conv6 = pointwiseConvLayer(conv5, params.conv_6, [1, 1]);
        var conv7 = pointwiseConvLayer(conv6, params.conv_7, [2, 2]);
        var boxPrediction0 = boxPredictionLayer(conv11, params.box_predictor_0);
        var boxPrediction1 = boxPredictionLayer(x, params.box_predictor_1);
        var boxPrediction2 = boxPredictionLayer(conv1, params.box_predictor_2);
        var boxPrediction3 = boxPredictionLayer(conv3, params.box_predictor_3);
        var boxPrediction4 = boxPredictionLayer(conv5, params.box_predictor_4);
        var boxPrediction5 = boxPredictionLayer(conv7, params.box_predictor_5);
        var boxPredictions = tf_core_esm/* concat */.xWs([
            boxPrediction0.boxPredictionEncoding,
            boxPrediction1.boxPredictionEncoding,
            boxPrediction2.boxPredictionEncoding,
            boxPrediction3.boxPredictionEncoding,
            boxPrediction4.boxPredictionEncoding,
            boxPrediction5.boxPredictionEncoding
        ], 1);
        var classPredictions = tf_core_esm/* concat */.xWs([
            boxPrediction0.classPrediction,
            boxPrediction1.classPrediction,
            boxPrediction2.classPrediction,
            boxPrediction3.classPrediction,
            boxPrediction4.classPrediction,
            boxPrediction5.classPrediction
        ], 1);
        return {
            boxPredictions: boxPredictions,
            classPredictions: classPredictions
        };
    });
}
//# sourceMappingURL=predictionLayer.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/SsdMobilenetv1Options.js
var SsdMobilenetv1Options_SsdMobilenetv1Options = /** @class */ (function () {
    function SsdMobilenetv1Options(_a) {
        var _b = _a === void 0 ? {} : _a, minConfidence = _b.minConfidence, maxResults = _b.maxResults;
        this._name = 'SsdMobilenetv1Options';
        this._minConfidence = minConfidence || 0.5;
        this._maxResults = maxResults || 100;
        if (typeof this._minConfidence !== 'number' || this._minConfidence <= 0 || this._minConfidence >= 1) {
            throw new Error(this._name + " - expected minConfidence to be a number between 0 and 1");
        }
        if (typeof this._maxResults !== 'number') {
            throw new Error(this._name + " - expected maxResults to be a number");
        }
    }
    Object.defineProperty(SsdMobilenetv1Options.prototype, "minConfidence", {
        get: function () { return this._minConfidence; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SsdMobilenetv1Options.prototype, "maxResults", {
        get: function () { return this._maxResults; },
        enumerable: true,
        configurable: true
    });
    return SsdMobilenetv1Options;
}());

//# sourceMappingURL=SsdMobilenetv1Options.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/SsdMobilenetv1.js













var SsdMobilenetv1_SsdMobilenetv1 = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(SsdMobilenetv1, _super);
    function SsdMobilenetv1() {
        return _super.call(this, 'SsdMobilenetv1') || this;
    }
    SsdMobilenetv1.prototype.forwardInput = function (input) {
        var params = this.params;
        if (!params) {
            throw new Error('SsdMobilenetv1 - load model before inference');
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var batchTensor = input.toBatchTensor(512, false).toFloat();
            var x = tf_core_esm/* sub */.jbE(tf_core_esm/* mul */.lKK(batchTensor, tf_core_esm/* scalar */.d_2(0.007843137718737125)), tf_core_esm/* scalar */.d_2(1));
            var features = mobileNetV1(x, params.mobilenetv1);
            var _a = predictionLayer(features.out, features.conv11, params.prediction_layer), boxPredictions = _a.boxPredictions, classPredictions = _a.classPredictions;
            return outputLayer(boxPredictions, classPredictions, params.output_layer);
        });
    };
    SsdMobilenetv1.prototype.forward = function (input) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    SsdMobilenetv1.prototype.locateFaces = function (input, options) {
        if (options === void 0) { options = {}; }
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a, maxResults, minConfidence, netInput, _b, _boxes, _scores, boxes, scores, i, scoresData, _c, _d, iouThreshold, indices, reshapedDims, inputSize, padX, padY, boxesData, results;
            return (0,tslib_es6/* __generator */.YH)(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = new SsdMobilenetv1Options_SsdMobilenetv1Options(options), maxResults = _a.maxResults, minConfidence = _a.minConfidence;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _e.sent();
                        _b = this.forwardInput(netInput), _boxes = _b.boxes, _scores = _b.scores;
                        boxes = _boxes[0];
                        scores = _scores[0];
                        for (i = 1; i < _boxes.length; i++) {
                            _boxes[i].dispose();
                            _scores[i].dispose();
                        }
                        _d = (_c = Array).from;
                        return [4 /*yield*/, scores.data()];
                    case 2:
                        scoresData = _d.apply(_c, [_e.sent()]);
                        iouThreshold = 0.5;
                        indices = nonMaxSuppression_nonMaxSuppression(boxes, scoresData, maxResults, iouThreshold, minConfidence);
                        reshapedDims = netInput.getReshapedInputDimensions(0);
                        inputSize = netInput.inputSize;
                        padX = inputSize / reshapedDims.width;
                        padY = inputSize / reshapedDims.height;
                        boxesData = boxes.arraySync();
                        results = indices
                            .map(function (idx) {
                            var _a = [
                                Math.max(0, boxesData[idx][0]),
                                Math.min(1.0, boxesData[idx][2])
                            ].map(function (val) { return val * padY; }), top = _a[0], bottom = _a[1];
                            var _b = [
                                Math.max(0, boxesData[idx][1]),
                                Math.min(1.0, boxesData[idx][3])
                            ].map(function (val) { return val * padX; }), left = _b[0], right = _b[1];
                            return new FaceDetection(scoresData[idx], new Rect(left, top, right - left, bottom - top), {
                                height: netInput.getInputHeight(0),
                                width: netInput.getInputWidth(0)
                            });
                        });
                        boxes.dispose();
                        scores.dispose();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    SsdMobilenetv1.prototype.getDefaultModelName = function () {
        return 'ssd_mobilenetv1_model';
    };
    SsdMobilenetv1.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return ssdMobilenetv1_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap);
    };
    SsdMobilenetv1.prototype.extractParams = function (weights) {
        return ssdMobilenetv1_extractParams_extractParams(weights);
    };
    return SsdMobilenetv1;
}(NeuralNetwork));

//# sourceMappingURL=SsdMobilenetv1.js.map
;// ./node_modules/face-api.js/build/es6/ssdMobilenetv1/index.js




function createSsdMobilenetv1(weights) {
    var net = new SsdMobilenetv1();
    net.extractWeights(weights);
    return net;
}
function createFaceDetectionNet(weights) {
    return createSsdMobilenetv1(weights);
}
// alias for backward compatibily
var FaceDetectionNet = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(FaceDetectionNet, _super);
    function FaceDetectionNet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FaceDetectionNet;
}(SsdMobilenetv1_SsdMobilenetv1));

//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/const.js

var IOU_THRESHOLD = 0.4;
var BOX_ANCHORS = [
    new Point(0.738768, 0.874946),
    new Point(2.42204, 2.65704),
    new Point(4.30971, 7.04493),
    new Point(10.246, 4.59428),
    new Point(12.6868, 11.8741)
];
var BOX_ANCHORS_SEPARABLE = [
    new Point(1.603231, 2.094468),
    new Point(6.041143, 7.080126),
    new Point(2.882459, 3.518061),
    new Point(4.266906, 5.178857),
    new Point(9.041765, 10.66308)
];
var MEAN_RGB_SEPARABLE = [117.001, 114.697, 97.404];
var DEFAULT_MODEL_NAME = 'tiny_yolov2_model';
var DEFAULT_MODEL_NAME_SEPARABLE_CONV = 'tiny_yolov2_separable_conv_model';
//# sourceMappingURL=const.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/config.js
var isNumber = function (arg) { return typeof arg === 'number'; };
function validateConfig(config) {
    if (!config) {
        throw new Error("invalid config: " + config);
    }
    if (typeof config.withSeparableConvs !== 'boolean') {
        throw new Error("config.withSeparableConvs has to be a boolean, have: " + config.withSeparableConvs);
    }
    if (!isNumber(config.iouThreshold) || config.iouThreshold < 0 || config.iouThreshold > 1.0) {
        throw new Error("config.iouThreshold has to be a number between [0, 1], have: " + config.iouThreshold);
    }
    if (!Array.isArray(config.classes)
        || !config.classes.length
        || !config.classes.every(function (c) { return typeof c === 'string'; })) {
        throw new Error("config.classes has to be an array class names: string[], have: " + JSON.stringify(config.classes));
    }
    if (!Array.isArray(config.anchors)
        || !config.anchors.length
        || !config.anchors.map(function (a) { return a || {}; }).every(function (a) { return isNumber(a.x) && isNumber(a.y); })) {
        throw new Error("config.anchors has to be an array of { x: number, y: number }, have: " + JSON.stringify(config.anchors));
    }
    if (config.meanRgb && (!Array.isArray(config.meanRgb)
        || config.meanRgb.length !== 3
        || !config.meanRgb.every(isNumber))) {
        throw new Error("config.meanRgb has to be an array of shape [number, number, number], have: " + JSON.stringify(config.meanRgb));
    }
}
//# sourceMappingURL=config.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/leaky.js

function leaky(x) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var min = tf_core_esm/* mul */.lKK(x, tf_core_esm/* scalar */.d_2(0.10000000149011612));
        return tf_core_esm/* add */.WQq(tf_core_esm/* relu */.VVh(tf_core_esm/* sub */.jbE(x, min)), min);
        //return tf.maximum(x, min)
    });
}
//# sourceMappingURL=leaky.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/convWithBatchNorm.js


function convWithBatchNorm(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = tf_core_esm/* pad */.eVF(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
        out = tf_core_esm/* conv2d */.Xtf(out, params.conv.filters, [1, 1], 'valid');
        out = tf_core_esm/* sub */.jbE(out, params.bn.sub);
        out = tf_core_esm/* mul */.lKK(out, params.bn.truediv);
        out = tf_core_esm/* add */.WQq(out, params.conv.bias);
        return leaky(out);
    });
}
//# sourceMappingURL=convWithBatchNorm.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/depthwiseSeparableConv.js


function depthwiseSeparableConv_depthwiseSeparableConv(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = tf_core_esm/* pad */.eVF(x, [[0, 0], [1, 1], [1, 1], [0, 0]]);
        out = tf_core_esm/* separableConv2d */.wdz(out, params.depthwise_filter, params.pointwise_filter, [1, 1], 'valid');
        out = tf_core_esm/* add */.WQq(out, params.bias);
        return leaky(out);
    });
}
//# sourceMappingURL=depthwiseSeparableConv.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/extractParams.js




function tinyYolov2_extractParams_extractorsFactory(extractWeights, paramMappings) {
    var extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
    function extractBatchNormParams(size, mappedPrefix) {
        var sub = tf_core_esm/* tensor1d */.tGX(extractWeights(size));
        var truediv = tf_core_esm/* tensor1d */.tGX(extractWeights(size));
        paramMappings.push({ paramPath: mappedPrefix + "/sub" }, { paramPath: mappedPrefix + "/truediv" });
        return { sub: sub, truediv: truediv };
    }
    function extractConvWithBatchNormParams(channelsIn, channelsOut, mappedPrefix) {
        var conv = extractConvParams(channelsIn, channelsOut, 3, mappedPrefix + "/conv");
        var bn = extractBatchNormParams(channelsOut, mappedPrefix + "/bn");
        return { conv: conv, bn: bn };
    }
    var extractSeparableConvParams = extractSeparableConvParamsFactory(extractWeights, paramMappings);
    return {
        extractConvParams: extractConvParams,
        extractConvWithBatchNormParams: extractConvWithBatchNormParams,
        extractSeparableConvParams: extractSeparableConvParams
    };
}
function tinyYolov2_extractParams_extractParams(weights, config, boxEncodingSize, filterSizes) {
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var paramMappings = [];
    var _b = tinyYolov2_extractParams_extractorsFactory(extractWeights, paramMappings), extractConvParams = _b.extractConvParams, extractConvWithBatchNormParams = _b.extractConvWithBatchNormParams, extractSeparableConvParams = _b.extractSeparableConvParams;
    var params;
    if (config.withSeparableConvs) {
        var s0 = filterSizes[0], s1 = filterSizes[1], s2 = filterSizes[2], s3 = filterSizes[3], s4 = filterSizes[4], s5 = filterSizes[5], s6 = filterSizes[6], s7 = filterSizes[7], s8 = filterSizes[8];
        var conv0 = config.isFirstLayerConv2d
            ? extractConvParams(s0, s1, 3, 'conv0')
            : extractSeparableConvParams(s0, s1, 'conv0');
        var conv1 = extractSeparableConvParams(s1, s2, 'conv1');
        var conv2 = extractSeparableConvParams(s2, s3, 'conv2');
        var conv3 = extractSeparableConvParams(s3, s4, 'conv3');
        var conv4 = extractSeparableConvParams(s4, s5, 'conv4');
        var conv5 = extractSeparableConvParams(s5, s6, 'conv5');
        var conv6 = s7 ? extractSeparableConvParams(s6, s7, 'conv6') : undefined;
        var conv7 = s8 ? extractSeparableConvParams(s7, s8, 'conv7') : undefined;
        var conv8 = extractConvParams(s8 || s7 || s6, 5 * boxEncodingSize, 1, 'conv8');
        params = { conv0: conv0, conv1: conv1, conv2: conv2, conv3: conv3, conv4: conv4, conv5: conv5, conv6: conv6, conv7: conv7, conv8: conv8 };
    }
    else {
        var s0 = filterSizes[0], s1 = filterSizes[1], s2 = filterSizes[2], s3 = filterSizes[3], s4 = filterSizes[4], s5 = filterSizes[5], s6 = filterSizes[6], s7 = filterSizes[7], s8 = filterSizes[8];
        var conv0 = extractConvWithBatchNormParams(s0, s1, 'conv0');
        var conv1 = extractConvWithBatchNormParams(s1, s2, 'conv1');
        var conv2 = extractConvWithBatchNormParams(s2, s3, 'conv2');
        var conv3 = extractConvWithBatchNormParams(s3, s4, 'conv3');
        var conv4 = extractConvWithBatchNormParams(s4, s5, 'conv4');
        var conv5 = extractConvWithBatchNormParams(s5, s6, 'conv5');
        var conv6 = extractConvWithBatchNormParams(s6, s7, 'conv6');
        var conv7 = extractConvWithBatchNormParams(s7, s8, 'conv7');
        var conv8 = extractConvParams(s8, 5 * boxEncodingSize, 1, 'conv8');
        params = { conv0: conv0, conv1: conv1, conv2: conv2, conv3: conv3, conv4: conv4, conv5: conv5, conv6: conv6, conv7: conv7, conv8: conv8 };
    }
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/extractParamsFromWeigthMap.js



function tinyYolov2_extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings) {
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractBatchNormParams(prefix) {
        var sub = extractWeightEntry(prefix + "/sub", 1);
        var truediv = extractWeightEntry(prefix + "/truediv", 1);
        return { sub: sub, truediv: truediv };
    }
    function extractConvParams(prefix) {
        var filters = extractWeightEntry(prefix + "/filters", 4);
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return { filters: filters, bias: bias };
    }
    function extractConvWithBatchNormParams(prefix) {
        var conv = extractConvParams(prefix + "/conv");
        var bn = extractBatchNormParams(prefix + "/bn");
        return { conv: conv, bn: bn };
    }
    var extractSeparableConvParams = loadSeparableConvParamsFactory(extractWeightEntry);
    return {
        extractConvParams: extractConvParams,
        extractConvWithBatchNormParams: extractConvWithBatchNormParams,
        extractSeparableConvParams: extractSeparableConvParams
    };
}
function tinyYolov2_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap, config) {
    var paramMappings = [];
    var _a = tinyYolov2_extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings), extractConvParams = _a.extractConvParams, extractConvWithBatchNormParams = _a.extractConvWithBatchNormParams, extractSeparableConvParams = _a.extractSeparableConvParams;
    var params;
    if (config.withSeparableConvs) {
        var numFilters = (config.filterSizes && config.filterSizes.length || 9);
        params = {
            conv0: config.isFirstLayerConv2d ? extractConvParams('conv0') : extractSeparableConvParams('conv0'),
            conv1: extractSeparableConvParams('conv1'),
            conv2: extractSeparableConvParams('conv2'),
            conv3: extractSeparableConvParams('conv3'),
            conv4: extractSeparableConvParams('conv4'),
            conv5: extractSeparableConvParams('conv5'),
            conv6: numFilters > 7 ? extractSeparableConvParams('conv6') : undefined,
            conv7: numFilters > 8 ? extractSeparableConvParams('conv7') : undefined,
            conv8: extractConvParams('conv8')
        };
    }
    else {
        params = {
            conv0: extractConvWithBatchNormParams('conv0'),
            conv1: extractConvWithBatchNormParams('conv1'),
            conv2: extractConvWithBatchNormParams('conv2'),
            conv3: extractConvWithBatchNormParams('conv3'),
            conv4: extractConvWithBatchNormParams('conv4'),
            conv5: extractConvWithBatchNormParams('conv5'),
            conv6: extractConvWithBatchNormParams('conv6'),
            conv7: extractConvWithBatchNormParams('conv7'),
            conv8: extractConvParams('conv8')
        };
    }
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: params, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/TinyYolov2Options.js
var TinyYolov2SizeType;
(function (TinyYolov2SizeType) {
    TinyYolov2SizeType[TinyYolov2SizeType["XS"] = 224] = "XS";
    TinyYolov2SizeType[TinyYolov2SizeType["SM"] = 320] = "SM";
    TinyYolov2SizeType[TinyYolov2SizeType["MD"] = 416] = "MD";
    TinyYolov2SizeType[TinyYolov2SizeType["LG"] = 608] = "LG";
})(TinyYolov2SizeType || (TinyYolov2SizeType = {}));
var TinyYolov2Options_TinyYolov2Options = /** @class */ (function () {
    function TinyYolov2Options(_a) {
        var _b = _a === void 0 ? {} : _a, inputSize = _b.inputSize, scoreThreshold = _b.scoreThreshold;
        this._name = 'TinyYolov2Options';
        this._inputSize = inputSize || 416;
        this._scoreThreshold = scoreThreshold || 0.5;
        if (typeof this._inputSize !== 'number' || this._inputSize % 32 !== 0) {
            throw new Error(this._name + " - expected inputSize to be a number divisible by 32");
        }
        if (typeof this._scoreThreshold !== 'number' || this._scoreThreshold <= 0 || this._scoreThreshold >= 1) {
            throw new Error(this._name + " - expected scoreThreshold to be a number between 0 and 1");
        }
    }
    Object.defineProperty(TinyYolov2Options.prototype, "inputSize", {
        get: function () { return this._inputSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyYolov2Options.prototype, "scoreThreshold", {
        get: function () { return this._scoreThreshold; },
        enumerable: true,
        configurable: true
    });
    return TinyYolov2Options;
}());

//# sourceMappingURL=TinyYolov2Options.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/TinyYolov2Base.js

















var TinyYolov2Base = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(TinyYolov2Base, _super);
    function TinyYolov2Base(config) {
        var _this = _super.call(this, 'TinyYolov2') || this;
        validateConfig(config);
        _this._config = config;
        return _this;
    }
    Object.defineProperty(TinyYolov2Base.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyYolov2Base.prototype, "withClassScores", {
        get: function () {
            return this.config.withClassScores || this.config.classes.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyYolov2Base.prototype, "boxEncodingSize", {
        get: function () {
            return 5 + (this.withClassScores ? this.config.classes.length : 0);
        },
        enumerable: true,
        configurable: true
    });
    TinyYolov2Base.prototype.runTinyYolov2 = function (x, params) {
        var out = convWithBatchNorm(x, params.conv0);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv1);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv2);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv3);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv4);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = convWithBatchNorm(out, params.conv5);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [1, 1], 'same');
        out = convWithBatchNorm(out, params.conv6);
        out = convWithBatchNorm(out, params.conv7);
        return convLayer(out, params.conv8, 'valid', false);
    };
    TinyYolov2Base.prototype.runMobilenet = function (x, params) {
        var out = this.config.isFirstLayerConv2d
            ? leaky(convLayer(x, params.conv0, 'valid', false))
            : depthwiseSeparableConv_depthwiseSeparableConv(x, params.conv0);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv1);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv2);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv3);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv4);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv5);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [1, 1], 'same');
        out = params.conv6 ? depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv6) : out;
        out = params.conv7 ? depthwiseSeparableConv_depthwiseSeparableConv(out, params.conv7) : out;
        return convLayer(out, params.conv8, 'valid', false);
    };
    TinyYolov2Base.prototype.forwardInput = function (input, inputSize) {
        var _this = this;
        var params = this.params;
        if (!params) {
            throw new Error('TinyYolov2 - load model before inference');
        }
        return tf_core_esm/* tidy */.DZQ(function () {
            var batchTensor = input.toBatchTensor(inputSize, false).toFloat();
            batchTensor = _this.config.meanRgb
                ? normalize(batchTensor, _this.config.meanRgb)
                : batchTensor;
            batchTensor = batchTensor.div(tf_core_esm/* scalar */.d_2(256));
            return _this.config.withSeparableConvs
                ? _this.runMobilenet(batchTensor, params)
                : _this.runTinyYolov2(batchTensor, params);
        });
    };
    TinyYolov2Base.prototype.forward = function (input, inputSize) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent(), inputSize])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    TinyYolov2Base.prototype.detect = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a, inputSize, scoreThreshold, netInput, out, out0, inputDimensions, results, boxes, scores, classScores, classNames, indices, detections;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = new TinyYolov2Options_TinyYolov2Options(forwardParams), inputSize = _a.inputSize, scoreThreshold = _a.scoreThreshold;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1:
                        netInput = _b.sent();
                        return [4 /*yield*/, this.forwardInput(netInput, inputSize)];
                    case 2:
                        out = _b.sent();
                        out0 = tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* unstack */.K$i(out)[0].expandDims(); });
                        inputDimensions = {
                            width: netInput.getInputWidth(0),
                            height: netInput.getInputHeight(0)
                        };
                        return [4 /*yield*/, this.extractBoxes(out0, netInput.getReshapedInputDimensions(0), scoreThreshold)];
                    case 3:
                        results = _b.sent();
                        out.dispose();
                        out0.dispose();
                        boxes = results.map(function (res) { return res.box; });
                        scores = results.map(function (res) { return res.score; });
                        classScores = results.map(function (res) { return res.classScore; });
                        classNames = results.map(function (res) { return _this.config.classes[res.label]; });
                        indices = nonMaxSuppression(boxes.map(function (box) { return box.rescale(inputSize); }), scores, this.config.iouThreshold, true);
                        detections = indices.map(function (idx) {
                            return new ObjectDetection(scores[idx], classScores[idx], classNames[idx], boxes[idx], inputDimensions);
                        });
                        return [2 /*return*/, detections];
                }
            });
        });
    };
    TinyYolov2Base.prototype.getDefaultModelName = function () {
        return '';
    };
    TinyYolov2Base.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return tinyYolov2_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap, this.config);
    };
    TinyYolov2Base.prototype.extractParams = function (weights) {
        var filterSizes = this.config.filterSizes || TinyYolov2Base.DEFAULT_FILTER_SIZES;
        var numFilters = filterSizes ? filterSizes.length : undefined;
        if (numFilters !== 7 && numFilters !== 8 && numFilters !== 9) {
            throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found " + numFilters + " filterSizes in config");
        }
        return tinyYolov2_extractParams_extractParams(weights, this.config, this.boxEncodingSize, filterSizes);
    };
    TinyYolov2Base.prototype.extractBoxes = function (outputTensor, inputBlobDimensions, scoreThreshold) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var width, height, inputSize, correctionFactorX, correctionFactorY, numCells, numBoxes, _a, boxesTensor, scoresTensor, classScoresTensor, results, scoresData, boxesData, row, col, anchor, score, ctX, ctY, width_1, height_1, x, y, pos, _b, classScore, label, _c;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        width = inputBlobDimensions.width, height = inputBlobDimensions.height;
                        inputSize = Math.max(width, height);
                        correctionFactorX = inputSize / width;
                        correctionFactorY = inputSize / height;
                        numCells = outputTensor.shape[1];
                        numBoxes = this.config.anchors.length;
                        _a = tf_core_esm/* tidy */.DZQ(function () {
                            var reshaped = outputTensor.reshape([numCells, numCells, numBoxes, _this.boxEncodingSize]);
                            var boxes = reshaped.slice([0, 0, 0, 0], [numCells, numCells, numBoxes, 4]);
                            var scores = reshaped.slice([0, 0, 0, 4], [numCells, numCells, numBoxes, 1]);
                            var classScores = _this.withClassScores
                                ? tf_core_esm/* softmax */.Vs9(reshaped.slice([0, 0, 0, 5], [numCells, numCells, numBoxes, _this.config.classes.length]), 3)
                                : tf_core_esm/* scalar */.d_2(0);
                            return [boxes, scores, classScores];
                        }), boxesTensor = _a[0], scoresTensor = _a[1], classScoresTensor = _a[2];
                        results = [];
                        return [4 /*yield*/, scoresTensor.array()];
                    case 1:
                        scoresData = _d.sent();
                        return [4 /*yield*/, boxesTensor.array()];
                    case 2:
                        boxesData = _d.sent();
                        row = 0;
                        _d.label = 3;
                    case 3:
                        if (!(row < numCells)) return [3 /*break*/, 12];
                        col = 0;
                        _d.label = 4;
                    case 4:
                        if (!(col < numCells)) return [3 /*break*/, 11];
                        anchor = 0;
                        _d.label = 5;
                    case 5:
                        if (!(anchor < numBoxes)) return [3 /*break*/, 10];
                        score = sigmoid(scoresData[row][col][anchor][0]);
                        if (!(!scoreThreshold || score > scoreThreshold)) return [3 /*break*/, 9];
                        ctX = ((col + sigmoid(boxesData[row][col][anchor][0])) / numCells) * correctionFactorX;
                        ctY = ((row + sigmoid(boxesData[row][col][anchor][1])) / numCells) * correctionFactorY;
                        width_1 = ((Math.exp(boxesData[row][col][anchor][2]) * this.config.anchors[anchor].x) / numCells) * correctionFactorX;
                        height_1 = ((Math.exp(boxesData[row][col][anchor][3]) * this.config.anchors[anchor].y) / numCells) * correctionFactorY;
                        x = (ctX - (width_1 / 2));
                        y = (ctY - (height_1 / 2));
                        pos = { row: row, col: col, anchor: anchor };
                        if (!this.withClassScores) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.extractPredictedClass(classScoresTensor, pos)];
                    case 6:
                        _c = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _c = { classScore: 1, label: 0 };
                        _d.label = 8;
                    case 8:
                        _b = _c, classScore = _b.classScore, label = _b.label;
                        results.push((0,tslib_es6/* __assign */.Cl)({ box: new BoundingBox(x, y, x + width_1, y + height_1), score: score, classScore: score * classScore, label: label }, pos));
                        _d.label = 9;
                    case 9:
                        anchor++;
                        return [3 /*break*/, 5];
                    case 10:
                        col++;
                        return [3 /*break*/, 4];
                    case 11:
                        row++;
                        return [3 /*break*/, 3];
                    case 12:
                        boxesTensor.dispose();
                        scoresTensor.dispose();
                        classScoresTensor.dispose();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    TinyYolov2Base.prototype.extractPredictedClass = function (classesTensor, pos) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var row, col, anchor, classesData;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        row = pos.row, col = pos.col, anchor = pos.anchor;
                        return [4 /*yield*/, classesTensor.array()];
                    case 1:
                        classesData = _a.sent();
                        return [2 /*return*/, Array(this.config.classes.length).fill(0)
                                .map(function (_, i) { return classesData[row][col][anchor][i]; })
                                .map(function (classScore, label) { return ({
                                classScore: classScore,
                                label: label
                            }); })
                                .reduce(function (max, curr) { return max.classScore > curr.classScore ? max : curr; })];
                }
            });
        });
    };
    TinyYolov2Base.DEFAULT_FILTER_SIZES = [
        3, 16, 32, 64, 128, 256, 512, 1024, 1024
    ];
    return TinyYolov2Base;
}(NeuralNetwork));

//# sourceMappingURL=TinyYolov2Base.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/TinyYolov2.js




var TinyYolov2_TinyYolov2 = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(TinyYolov2, _super);
    function TinyYolov2(withSeparableConvs) {
        if (withSeparableConvs === void 0) { withSeparableConvs = true; }
        var _this = this;
        var config = Object.assign({}, {
            withSeparableConvs: withSeparableConvs,
            iouThreshold: IOU_THRESHOLD,
            classes: ['face']
        }, withSeparableConvs
            ? {
                anchors: BOX_ANCHORS_SEPARABLE,
                meanRgb: MEAN_RGB_SEPARABLE
            }
            : {
                anchors: BOX_ANCHORS,
                withClassScores: true
            });
        _this = _super.call(this, config) || this;
        return _this;
    }
    Object.defineProperty(TinyYolov2.prototype, "withSeparableConvs", {
        get: function () {
            return this.config.withSeparableConvs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinyYolov2.prototype, "anchors", {
        get: function () {
            return this.config.anchors;
        },
        enumerable: true,
        configurable: true
    });
    TinyYolov2.prototype.locateFaces = function (input, forwardParams) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var objectDetections;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.detect(input, forwardParams)];
                    case 1:
                        objectDetections = _a.sent();
                        return [2 /*return*/, objectDetections.map(function (det) { return new FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }); })];
                }
            });
        });
    };
    TinyYolov2.prototype.getDefaultModelName = function () {
        return this.withSeparableConvs ? DEFAULT_MODEL_NAME_SEPARABLE_CONV : DEFAULT_MODEL_NAME;
    };
    TinyYolov2.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return _super.prototype.extractParamsFromWeigthMap.call(this, weightMap);
    };
    return TinyYolov2;
}(TinyYolov2Base));

//# sourceMappingURL=TinyYolov2.js.map
;// ./node_modules/face-api.js/build/es6/tinyYolov2/index.js




function createTinyYolov2(weights, withSeparableConvs) {
    if (withSeparableConvs === void 0) { withSeparableConvs = true; }
    var net = new TinyYolov2(withSeparableConvs);
    net.extractWeights(weights);
    return net;
}
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/tinyFaceDetector/TinyFaceDetectorOptions.js


var TinyFaceDetectorOptions = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(TinyFaceDetectorOptions, _super);
    function TinyFaceDetectorOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._name = 'TinyFaceDetectorOptions';
        return _this;
    }
    return TinyFaceDetectorOptions;
}(TinyYolov2Options_TinyYolov2Options));

//# sourceMappingURL=TinyFaceDetectorOptions.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/ComposableTask.js

var ComposableTask = /** @class */ (function () {
    function ComposableTask() {
    }
    ComposableTask.prototype.then = function (onfulfilled) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = onfulfilled;
                        return [4 /*yield*/, this.run()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    ComposableTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                throw new Error('ComposableTask - run is not implemented');
            });
        });
    };
    return ComposableTask;
}());

//# sourceMappingURL=ComposableTask.js.map
;// ./node_modules/face-api.js/build/es6/factories/WithFaceDescriptor.js
function extendWithFaceDescriptor(sourceObj, descriptor) {
    var extension = { descriptor: descriptor };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithFaceDescriptor.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/extractFacesAndComputeResults.js




function extractAllFacesAndComputeResults(parentResults, input, computeResults, extractedFaces, getRectForAlignment) {
    if (getRectForAlignment === void 0) { getRectForAlignment = function (_a) {
        var alignedRect = _a.alignedRect;
        return alignedRect;
    }; }
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var faceBoxes, faces, _a, _b, results;
        return (0,tslib_es6/* __generator */.YH)(this, function (_c) {
            switch (_c.label) {
                case 0:
                    faceBoxes = parentResults.map(function (parentResult) {
                        return isWithFaceLandmarks(parentResult)
                            ? getRectForAlignment(parentResult)
                            : parentResult.detection;
                    });
                    _a = extractedFaces;
                    if (_a) return [3 /*break*/, 5];
                    if (!(input instanceof tf_core_esm/* Tensor */.qYS)) return [3 /*break*/, 2];
                    return [4 /*yield*/, extractFaceTensors(input, faceBoxes)];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, extractFaces(input, faceBoxes)];
                case 3:
                    _b = _c.sent();
                    _c.label = 4;
                case 4:
                    _a = (_b);
                    _c.label = 5;
                case 5:
                    faces = _a;
                    return [4 /*yield*/, computeResults(faces)];
                case 6:
                    results = _c.sent();
                    faces.forEach(function (f) { return f instanceof tf_core_esm/* Tensor */.qYS && f.dispose(); });
                    return [2 /*return*/, results];
            }
        });
    });
}
function extractSingleFaceAndComputeResult(parentResult, input, computeResult, extractedFaces, getRectForAlignment) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var _this = this;
        return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
            return [2 /*return*/, extractAllFacesAndComputeResults([parentResult], input, function (faces) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () { return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                    return [2 /*return*/, computeResult(faces[0])];
                }); }); }, extractedFaces, getRectForAlignment)];
        });
    });
}
//# sourceMappingURL=extractFacesAndComputeResults.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/bgrToRgbTensor.js

function bgrToRgbTensor(tensor) {
    return tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* stack */.t$z(tf_core_esm/* unstack */.K$i(tensor, 3).reverse(), 3); });
}
//# sourceMappingURL=bgrToRgbTensor.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/config.js
var CELL_STRIDE = 2;
var CELL_SIZE = 12;
//# sourceMappingURL=config.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/extractParams.js



function mtcnn_extractParams_extractorsFactory(extractWeights, paramMappings) {
    var extractConvParams = extractConvParamsFactory(extractWeights, paramMappings);
    var extractFCParams = extractFCParamsFactory(extractWeights, paramMappings);
    function extractPReluParams(size, paramPath) {
        var alpha = tf_core_esm/* tensor1d */.tGX(extractWeights(size));
        paramMappings.push({ paramPath: paramPath });
        return alpha;
    }
    function extractSharedParams(numFilters, mappedPrefix, isRnet) {
        if (isRnet === void 0) { isRnet = false; }
        var conv1 = extractConvParams(numFilters[0], numFilters[1], 3, mappedPrefix + "/conv1");
        var prelu1_alpha = extractPReluParams(numFilters[1], mappedPrefix + "/prelu1_alpha");
        var conv2 = extractConvParams(numFilters[1], numFilters[2], 3, mappedPrefix + "/conv2");
        var prelu2_alpha = extractPReluParams(numFilters[2], mappedPrefix + "/prelu2_alpha");
        var conv3 = extractConvParams(numFilters[2], numFilters[3], isRnet ? 2 : 3, mappedPrefix + "/conv3");
        var prelu3_alpha = extractPReluParams(numFilters[3], mappedPrefix + "/prelu3_alpha");
        return { conv1: conv1, prelu1_alpha: prelu1_alpha, conv2: conv2, prelu2_alpha: prelu2_alpha, conv3: conv3, prelu3_alpha: prelu3_alpha };
    }
    function extractPNetParams() {
        var sharedParams = extractSharedParams([3, 10, 16, 32], 'pnet');
        var conv4_1 = extractConvParams(32, 2, 1, 'pnet/conv4_1');
        var conv4_2 = extractConvParams(32, 4, 1, 'pnet/conv4_2');
        return (0,tslib_es6/* __assign */.Cl)((0,tslib_es6/* __assign */.Cl)({}, sharedParams), { conv4_1: conv4_1, conv4_2: conv4_2 });
    }
    function extractRNetParams() {
        var sharedParams = extractSharedParams([3, 28, 48, 64], 'rnet', true);
        var fc1 = extractFCParams(576, 128, 'rnet/fc1');
        var prelu4_alpha = extractPReluParams(128, 'rnet/prelu4_alpha');
        var fc2_1 = extractFCParams(128, 2, 'rnet/fc2_1');
        var fc2_2 = extractFCParams(128, 4, 'rnet/fc2_2');
        return (0,tslib_es6/* __assign */.Cl)((0,tslib_es6/* __assign */.Cl)({}, sharedParams), { fc1: fc1, prelu4_alpha: prelu4_alpha, fc2_1: fc2_1, fc2_2: fc2_2 });
    }
    function extractONetParams() {
        var sharedParams = extractSharedParams([3, 32, 64, 64], 'onet');
        var conv4 = extractConvParams(64, 128, 2, 'onet/conv4');
        var prelu4_alpha = extractPReluParams(128, 'onet/prelu4_alpha');
        var fc1 = extractFCParams(1152, 256, 'onet/fc1');
        var prelu5_alpha = extractPReluParams(256, 'onet/prelu5_alpha');
        var fc2_1 = extractFCParams(256, 2, 'onet/fc2_1');
        var fc2_2 = extractFCParams(256, 4, 'onet/fc2_2');
        var fc2_3 = extractFCParams(256, 10, 'onet/fc2_3');
        return (0,tslib_es6/* __assign */.Cl)((0,tslib_es6/* __assign */.Cl)({}, sharedParams), { conv4: conv4, prelu4_alpha: prelu4_alpha, fc1: fc1, prelu5_alpha: prelu5_alpha, fc2_1: fc2_1, fc2_2: fc2_2, fc2_3: fc2_3 });
    }
    return {
        extractPNetParams: extractPNetParams,
        extractRNetParams: extractRNetParams,
        extractONetParams: extractONetParams
    };
}
function mtcnn_extractParams_extractParams(weights) {
    var _a = extractWeightsFactory(weights), extractWeights = _a.extractWeights, getRemainingWeights = _a.getRemainingWeights;
    var paramMappings = [];
    var _b = mtcnn_extractParams_extractorsFactory(extractWeights, paramMappings), extractPNetParams = _b.extractPNetParams, extractRNetParams = _b.extractRNetParams, extractONetParams = _b.extractONetParams;
    var pnet = extractPNetParams();
    var rnet = extractRNetParams();
    var onet = extractONetParams();
    if (getRemainingWeights().length !== 0) {
        throw new Error("weights remaing after extract: " + getRemainingWeights().length);
    }
    return { params: { pnet: pnet, rnet: rnet, onet: onet }, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParams.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/extractParamsFromWeigthMap.js


function mtcnn_extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings) {
    var extractWeightEntry = extractWeightEntryFactory(weightMap, paramMappings);
    function extractConvParams(prefix) {
        var filters = extractWeightEntry(prefix + "/weights", 4, prefix + "/filters");
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return { filters: filters, bias: bias };
    }
    function extractFCParams(prefix) {
        var weights = extractWeightEntry(prefix + "/weights", 2);
        var bias = extractWeightEntry(prefix + "/bias", 1);
        return { weights: weights, bias: bias };
    }
    function extractPReluParams(paramPath) {
        return extractWeightEntry(paramPath, 1);
    }
    function extractSharedParams(prefix) {
        var conv1 = extractConvParams(prefix + "/conv1");
        var prelu1_alpha = extractPReluParams(prefix + "/prelu1_alpha");
        var conv2 = extractConvParams(prefix + "/conv2");
        var prelu2_alpha = extractPReluParams(prefix + "/prelu2_alpha");
        var conv3 = extractConvParams(prefix + "/conv3");
        var prelu3_alpha = extractPReluParams(prefix + "/prelu3_alpha");
        return { conv1: conv1, prelu1_alpha: prelu1_alpha, conv2: conv2, prelu2_alpha: prelu2_alpha, conv3: conv3, prelu3_alpha: prelu3_alpha };
    }
    function extractPNetParams() {
        var sharedParams = extractSharedParams('pnet');
        var conv4_1 = extractConvParams('pnet/conv4_1');
        var conv4_2 = extractConvParams('pnet/conv4_2');
        return (0,tslib_es6/* __assign */.Cl)((0,tslib_es6/* __assign */.Cl)({}, sharedParams), { conv4_1: conv4_1, conv4_2: conv4_2 });
    }
    function extractRNetParams() {
        var sharedParams = extractSharedParams('rnet');
        var fc1 = extractFCParams('rnet/fc1');
        var prelu4_alpha = extractPReluParams('rnet/prelu4_alpha');
        var fc2_1 = extractFCParams('rnet/fc2_1');
        var fc2_2 = extractFCParams('rnet/fc2_2');
        return (0,tslib_es6/* __assign */.Cl)((0,tslib_es6/* __assign */.Cl)({}, sharedParams), { fc1: fc1, prelu4_alpha: prelu4_alpha, fc2_1: fc2_1, fc2_2: fc2_2 });
    }
    function extractONetParams() {
        var sharedParams = extractSharedParams('onet');
        var conv4 = extractConvParams('onet/conv4');
        var prelu4_alpha = extractPReluParams('onet/prelu4_alpha');
        var fc1 = extractFCParams('onet/fc1');
        var prelu5_alpha = extractPReluParams('onet/prelu5_alpha');
        var fc2_1 = extractFCParams('onet/fc2_1');
        var fc2_2 = extractFCParams('onet/fc2_2');
        var fc2_3 = extractFCParams('onet/fc2_3');
        return (0,tslib_es6/* __assign */.Cl)((0,tslib_es6/* __assign */.Cl)({}, sharedParams), { conv4: conv4, prelu4_alpha: prelu4_alpha, fc1: fc1, prelu5_alpha: prelu5_alpha, fc2_1: fc2_1, fc2_2: fc2_2, fc2_3: fc2_3 });
    }
    return {
        extractPNetParams: extractPNetParams,
        extractRNetParams: extractRNetParams,
        extractONetParams: extractONetParams
    };
}
function mtcnn_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap) {
    var paramMappings = [];
    var _a = mtcnn_extractParamsFromWeigthMap_extractorsFactory(weightMap, paramMappings), extractPNetParams = _a.extractPNetParams, extractRNetParams = _a.extractRNetParams, extractONetParams = _a.extractONetParams;
    var pnet = extractPNetParams();
    var rnet = extractRNetParams();
    var onet = extractONetParams();
    disposeUnusedWeightTensors(weightMap, paramMappings);
    return { params: { pnet: pnet, rnet: rnet, onet: onet }, paramMappings: paramMappings };
}
//# sourceMappingURL=extractParamsFromWeigthMap.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/getSizesForScale.js
function getSizesForScale(scale, _a) {
    var height = _a[0], width = _a[1];
    return {
        height: Math.floor(height * scale),
        width: Math.floor(width * scale)
    };
}
//# sourceMappingURL=getSizesForScale.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/pyramidDown.js

function pyramidDown(minFaceSize, scaleFactor, dims) {
    var height = dims[0], width = dims[1];
    var m = CELL_SIZE / minFaceSize;
    var scales = [];
    var minLayer = Math.min(height, width) * m;
    var exp = 0;
    while (minLayer >= 12) {
        scales.push(m * Math.pow(scaleFactor, exp));
        minLayer = minLayer * scaleFactor;
        exp += 1;
    }
    return scales;
}
//# sourceMappingURL=pyramidDown.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/MtcnnBox.js


var MtcnnBox = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(MtcnnBox, _super);
    function MtcnnBox(left, top, right, bottom) {
        return _super.call(this, { left: left, top: top, right: right, bottom: bottom }, true) || this;
    }
    return MtcnnBox;
}(Box));

//# sourceMappingURL=MtcnnBox.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/normalize.js

function normalize_normalize(x) {
    return tf_core_esm/* tidy */.DZQ(function () { return tf_core_esm/* mul */.lKK(tf_core_esm/* sub */.jbE(x, tf_core_esm/* scalar */.d_2(127.5)), tf_core_esm/* scalar */.d_2(0.0078125)); });
}
//# sourceMappingURL=normalize.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/prelu.js

function prelu(x, alpha) {
    return tf_core_esm/* tidy */.DZQ(function () {
        return tf_core_esm/* add */.WQq(tf_core_esm/* relu */.VVh(x), tf_core_esm/* mul */.lKK(alpha, tf_core_esm/* neg */.HZy(tf_core_esm/* relu */.VVh(tf_core_esm/* neg */.HZy(x)))));
    });
}
//# sourceMappingURL=prelu.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/sharedLayers.js



function sharedLayer(x, params, isPnet) {
    if (isPnet === void 0) { isPnet = false; }
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = convLayer(x, params.conv1, 'valid');
        out = prelu(out, params.prelu1_alpha);
        out = tf_core_esm/* maxPool */.jgi(out, isPnet ? [2, 2] : [3, 3], [2, 2], 'same');
        out = convLayer(out, params.conv2, 'valid');
        out = prelu(out, params.prelu2_alpha);
        out = isPnet ? out : tf_core_esm/* maxPool */.jgi(out, [3, 3], [2, 2], 'valid');
        out = convLayer(out, params.conv3, 'valid');
        out = prelu(out, params.prelu3_alpha);
        return out;
    });
}
//# sourceMappingURL=sharedLayers.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/PNet.js



function PNet(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = sharedLayer(x, params, true);
        var conv = convLayer(out, params.conv4_1, 'valid');
        var max = tf_core_esm/* expandDims */.UG6(tf_core_esm/* max */.T9B(conv, 3), 3);
        var prob = tf_core_esm/* softmax */.Vs9(tf_core_esm/* sub */.jbE(conv, max), 3);
        var regions = convLayer(out, params.conv4_2, 'valid');
        return { prob: prob, regions: regions };
    });
}
//# sourceMappingURL=PNet.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/stage1.js








function rescaleAndNormalize(x, scale) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var _a = getSizesForScale(scale, x.shape.slice(1)), height = _a.height, width = _a.width;
        var resized = tf_core_esm/* image */.Slp.resizeBilinear(x, [height, width]);
        var normalized = normalize_normalize(resized);
        return tf_core_esm/* transpose */.mgz(normalized, [0, 2, 1, 3]);
    });
}
function extractBoundingBoxes(scoresTensor, regionsTensor, scale, scoreThreshold) {
    // TODO: fix this!, maybe better to use tf.gather here
    var indices = [];
    var scoresData = scoresTensor.arraySync();
    for (var y = 0; y < scoresTensor.shape[0]; y++) {
        for (var x = 0; x < scoresTensor.shape[1]; x++) {
            if (scoresData[y][x] >= scoreThreshold) {
                indices.push(new Point(x, y));
            }
        }
    }
    var boundingBoxes = indices.map(function (idx) {
        var cell = new BoundingBox(Math.round((idx.y * CELL_STRIDE + 1) / scale), Math.round((idx.x * CELL_STRIDE + 1) / scale), Math.round((idx.y * CELL_STRIDE + CELL_SIZE) / scale), Math.round((idx.x * CELL_STRIDE + CELL_SIZE) / scale));
        var score = scoresData[idx.y][idx.x];
        var regionsData = regionsTensor.arraySync();
        var region = new MtcnnBox(regionsData[idx.y][idx.x][0], regionsData[idx.y][idx.x][1], regionsData[idx.y][idx.x][2], regionsData[idx.y][idx.x][3]);
        return {
            cell: cell,
            score: score,
            region: region
        };
    });
    return boundingBoxes;
}
function stage1(imgTensor, scales, scoreThreshold, params, stats) {
    stats.stage1 = [];
    var pnetOutputs = scales.map(function (scale) { return tf_core_esm/* tidy */.DZQ(function () {
        var statsForScale = { scale: scale };
        var resized = rescaleAndNormalize(imgTensor, scale);
        var ts = Date.now();
        var _a = PNet(resized, params), prob = _a.prob, regions = _a.regions;
        statsForScale.pnet = Date.now() - ts;
        var scoresTensor = tf_core_esm/* unstack */.K$i(tf_core_esm/* unstack */.K$i(prob, 3)[1])[0];
        var regionsTensor = tf_core_esm/* unstack */.K$i(regions)[0];
        return {
            scoresTensor: scoresTensor,
            regionsTensor: regionsTensor,
            scale: scale,
            statsForScale: statsForScale
        };
    }); });
    var boxesForScale = pnetOutputs.map(function (_a) {
        var scoresTensor = _a.scoresTensor, regionsTensor = _a.regionsTensor, scale = _a.scale, statsForScale = _a.statsForScale;
        var boundingBoxes = extractBoundingBoxes(scoresTensor, regionsTensor, scale, scoreThreshold);
        scoresTensor.dispose();
        regionsTensor.dispose();
        if (!boundingBoxes.length) {
            stats.stage1.push(statsForScale);
            return [];
        }
        var ts = Date.now();
        var indices = nonMaxSuppression(boundingBoxes.map(function (bbox) { return bbox.cell; }), boundingBoxes.map(function (bbox) { return bbox.score; }), 0.5);
        statsForScale.nms = Date.now() - ts;
        statsForScale.numBoxes = indices.length;
        stats.stage1.push(statsForScale);
        return indices.map(function (boxIdx) { return boundingBoxes[boxIdx]; });
    });
    var allBoxes = boxesForScale.reduce(function (all, boxes) { return all.concat(boxes); }, []);
    var finalBoxes = [];
    var finalScores = [];
    if (allBoxes.length > 0) {
        var ts = Date.now();
        var indices = nonMaxSuppression(allBoxes.map(function (bbox) { return bbox.cell; }), allBoxes.map(function (bbox) { return bbox.score; }), 0.7);
        stats.stage1_nms = Date.now() - ts;
        finalScores = indices.map(function (idx) { return allBoxes[idx].score; });
        finalBoxes = indices
            .map(function (idx) { return allBoxes[idx]; })
            .map(function (_a) {
            var cell = _a.cell, region = _a.region;
            return new BoundingBox(cell.left + (region.left * cell.width), cell.top + (region.top * cell.height), cell.right + (region.right * cell.width), cell.bottom + (region.bottom * cell.height)).toSquare().round();
        });
    }
    return {
        boxes: finalBoxes,
        scores: finalScores
    };
}
//# sourceMappingURL=stage1.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/extractImagePatches.js





function extractImagePatches(img, boxes, _a) {
    var width = _a.width, height = _a.height;
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var imgCtx, bitmaps, imagePatchesDatas;
        var _this = this;
        return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    imgCtx = getContext2dOrThrow(img);
                    return [4 /*yield*/, Promise.all(boxes.map(function (box) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
                            var _a, y, ey, x, ex, fromX, fromY, imgData;
                            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                                _a = box.padAtBorders(img.height, img.width), y = _a.y, ey = _a.ey, x = _a.x, ex = _a.ex;
                                fromX = x - 1;
                                fromY = y - 1;
                                imgData = imgCtx.getImageData(fromX, fromY, (ex - fromX), (ey - fromY));
                                return [2 /*return*/, env_env.isNodejs() ? createCanvasFromMedia(imgData) : createImageBitmap(imgData)];
                            });
                        }); }))];
                case 1:
                    bitmaps = _b.sent();
                    imagePatchesDatas = [];
                    bitmaps.forEach(function (bmp) {
                        var patch = createCanvas({ width: width, height: height });
                        var patchCtx = getContext2dOrThrow(patch);
                        patchCtx.drawImage(bmp, 0, 0, width, height);
                        var data = patchCtx.getImageData(0, 0, width, height).data;
                        var currData = [];
                        // RGBA -> BGR
                        for (var i = 0; i < data.length; i += 4) {
                            currData.push(data[i + 2]);
                            currData.push(data[i + 1]);
                            currData.push(data[i]);
                        }
                        imagePatchesDatas.push(currData);
                    });
                    return [2 /*return*/, imagePatchesDatas.map(function (data) {
                            var t = tf_core_esm/* tidy */.DZQ(function () {
                                var imagePatchTensor = tf_core_esm/* transpose */.mgz(tf_core_esm/* tensor4d */.g9W(data, [1, width, height, 3]), [0, 2, 1, 3]).toFloat();
                                return normalize_normalize(imagePatchTensor);
                            });
                            return t;
                        })];
            }
        });
    });
}
//# sourceMappingURL=extractImagePatches.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/RNet.js




function RNet(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var convOut = sharedLayer(x, params);
        var vectorized = tf_core_esm/* reshape */.tQQ(convOut, [convOut.shape[0], params.fc1.weights.shape[0]]);
        var fc1 = fullyConnectedLayer(vectorized, params.fc1);
        var prelu4 = prelu(fc1, params.prelu4_alpha);
        var fc2_1 = fullyConnectedLayer(prelu4, params.fc2_1);
        var max = tf_core_esm/* expandDims */.UG6(tf_core_esm/* max */.T9B(fc2_1, 1), 1);
        var prob = tf_core_esm/* softmax */.Vs9(tf_core_esm/* sub */.jbE(fc2_1, max), 1);
        var regions = fullyConnectedLayer(prelu4, params.fc2_2);
        var scores = tf_core_esm/* unstack */.K$i(prob, 1)[1];
        return { scores: scores, regions: regions };
    });
}
//# sourceMappingURL=RNet.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/stage2.js






function stage2(img, inputBoxes, scoreThreshold, params, stats) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var ts, rnetInputs, rnetOuts, scoresTensor, scores, _a, _b, indices, filteredBoxes, filteredScores, finalBoxes, finalScores, indicesNms, regions_1;
        return (0,tslib_es6/* __generator */.YH)(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ts = Date.now();
                    return [4 /*yield*/, extractImagePatches(img, inputBoxes, { width: 24, height: 24 })];
                case 1:
                    rnetInputs = _c.sent();
                    stats.stage2_extractImagePatches = Date.now() - ts;
                    ts = Date.now();
                    rnetOuts = rnetInputs.map(function (rnetInput) {
                        var out = RNet(rnetInput, params);
                        rnetInput.dispose();
                        return out;
                    });
                    stats.stage2_rnet = Date.now() - ts;
                    scoresTensor = rnetOuts.length > 1
                        ? tf_core_esm/* concat */.xWs(rnetOuts.map(function (out) { return out.scores; }))
                        : rnetOuts[0].scores;
                    _b = (_a = Array).from;
                    return [4 /*yield*/, scoresTensor.data()];
                case 2:
                    scores = _b.apply(_a, [_c.sent()]);
                    scoresTensor.dispose();
                    indices = scores
                        .map(function (score, idx) { return ({ score: score, idx: idx }); })
                        .filter(function (c) { return c.score > scoreThreshold; })
                        .map(function (_a) {
                        var idx = _a.idx;
                        return idx;
                    });
                    filteredBoxes = indices.map(function (idx) { return inputBoxes[idx]; });
                    filteredScores = indices.map(function (idx) { return scores[idx]; });
                    finalBoxes = [];
                    finalScores = [];
                    if (filteredBoxes.length > 0) {
                        ts = Date.now();
                        indicesNms = nonMaxSuppression(filteredBoxes, filteredScores, 0.7);
                        stats.stage2_nms = Date.now() - ts;
                        regions_1 = indicesNms.map(function (idx) {
                            var regionsData = rnetOuts[indices[idx]].regions.arraySync();
                            return new MtcnnBox(regionsData[0][0], regionsData[0][1], regionsData[0][2], regionsData[0][3]);
                        });
                        finalScores = indicesNms.map(function (idx) { return filteredScores[idx]; });
                        finalBoxes = indicesNms.map(function (idx, i) { return filteredBoxes[idx].calibrate(regions_1[i]); });
                    }
                    rnetOuts.forEach(function (t) {
                        t.regions.dispose();
                        t.scores.dispose();
                    });
                    return [2 /*return*/, {
                            boxes: finalBoxes,
                            scores: finalScores
                        }];
            }
        });
    });
}
//# sourceMappingURL=stage2.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/ONet.js





function ONet(x, params) {
    return tf_core_esm/* tidy */.DZQ(function () {
        var out = sharedLayer(x, params);
        out = tf_core_esm/* maxPool */.jgi(out, [2, 2], [2, 2], 'same');
        out = convLayer(out, params.conv4, 'valid');
        out = prelu(out, params.prelu4_alpha);
        var vectorized = tf_core_esm/* reshape */.tQQ(out, [out.shape[0], params.fc1.weights.shape[0]]);
        var fc1 = fullyConnectedLayer(vectorized, params.fc1);
        var prelu5 = prelu(fc1, params.prelu5_alpha);
        var fc2_1 = fullyConnectedLayer(prelu5, params.fc2_1);
        var max = tf_core_esm/* expandDims */.UG6(tf_core_esm/* max */.T9B(fc2_1, 1), 1);
        var prob = tf_core_esm/* softmax */.Vs9(tf_core_esm/* sub */.jbE(fc2_1, max), 1);
        var regions = fullyConnectedLayer(prelu5, params.fc2_2);
        var points = fullyConnectedLayer(prelu5, params.fc2_3);
        var scores = tf_core_esm/* unstack */.K$i(prob, 1)[1];
        return { scores: scores, regions: regions, points: points };
    });
}
//# sourceMappingURL=ONet.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/stage3.js







function stage3(img, inputBoxes, scoreThreshold, params, stats) {
    return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
        var ts, onetInputs, onetOuts, scoresTensor, scores, _a, _b, indices, filteredRegions, filteredBoxes, filteredScores, finalBoxes, finalScores, points, indicesNms;
        return (0,tslib_es6/* __generator */.YH)(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ts = Date.now();
                    return [4 /*yield*/, extractImagePatches(img, inputBoxes, { width: 48, height: 48 })];
                case 1:
                    onetInputs = _c.sent();
                    stats.stage3_extractImagePatches = Date.now() - ts;
                    ts = Date.now();
                    onetOuts = onetInputs.map(function (onetInput) {
                        var out = ONet(onetInput, params);
                        onetInput.dispose();
                        return out;
                    });
                    stats.stage3_onet = Date.now() - ts;
                    scoresTensor = onetOuts.length > 1
                        ? tf_core_esm/* concat */.xWs(onetOuts.map(function (out) { return out.scores; }))
                        : onetOuts[0].scores;
                    _b = (_a = Array).from;
                    return [4 /*yield*/, scoresTensor.data()];
                case 2:
                    scores = _b.apply(_a, [_c.sent()]);
                    scoresTensor.dispose();
                    indices = scores
                        .map(function (score, idx) { return ({ score: score, idx: idx }); })
                        .filter(function (c) { return c.score > scoreThreshold; })
                        .map(function (_a) {
                        var idx = _a.idx;
                        return idx;
                    });
                    filteredRegions = indices.map(function (idx) {
                        var regionsData = onetOuts[idx].regions.arraySync();
                        return new MtcnnBox(regionsData[0][0], regionsData[0][1], regionsData[0][2], regionsData[0][3]);
                    });
                    filteredBoxes = indices
                        .map(function (idx, i) { return inputBoxes[idx].calibrate(filteredRegions[i]); });
                    filteredScores = indices.map(function (idx) { return scores[idx]; });
                    finalBoxes = [];
                    finalScores = [];
                    points = [];
                    if (filteredBoxes.length > 0) {
                        ts = Date.now();
                        indicesNms = nonMaxSuppression(filteredBoxes, filteredScores, 0.7, false);
                        stats.stage3_nms = Date.now() - ts;
                        finalBoxes = indicesNms.map(function (idx) { return filteredBoxes[idx]; });
                        finalScores = indicesNms.map(function (idx) { return filteredScores[idx]; });
                        points = indicesNms.map(function (idx, i) {
                            return Array(5).fill(0).map(function (_, ptIdx) {
                                var pointsData = onetOuts[idx].points.arraySync();
                                return new Point(((pointsData[0][ptIdx] * (finalBoxes[i].width + 1)) + finalBoxes[i].left), ((pointsData[0][ptIdx + 5] * (finalBoxes[i].height + 1)) + finalBoxes[i].top));
                            });
                        });
                    }
                    onetOuts.forEach(function (t) {
                        t.regions.dispose();
                        t.scores.dispose();
                        t.points.dispose();
                    });
                    return [2 /*return*/, {
                            boxes: finalBoxes,
                            scores: finalScores,
                            points: points
                        }];
            }
        });
    });
}
//# sourceMappingURL=stage3.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/Mtcnn.js


















var Mtcnn_Mtcnn = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(Mtcnn, _super);
    function Mtcnn() {
        return _super.call(this, 'Mtcnn') || this;
    }
    Mtcnn.prototype.load = function (weightsOrUrl) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                console.warn('mtcnn is deprecated and will be removed soon');
                return [2 /*return*/, _super.prototype.load.call(this, weightsOrUrl)];
            });
        });
    };
    Mtcnn.prototype.loadFromDisk = function (filePath) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                console.warn('mtcnn is deprecated and will be removed soon');
                return [2 /*return*/, _super.prototype.loadFromDisk.call(this, filePath)];
            });
        });
    };
    Mtcnn.prototype.forwardInput = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var params, inputCanvas, stats, tsTotal, imgTensor, onReturn, _a, height, width, _b, minFaceSize, scaleFactor, maxNumScales, scoreThresholds, scaleSteps, scales, ts, out1, out2, out3, results;
            return (0,tslib_es6/* __generator */.YH)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        params = this.params;
                        if (!params) {
                            throw new Error('Mtcnn - load model before inference');
                        }
                        inputCanvas = input.canvases[0];
                        if (!inputCanvas) {
                            throw new Error('Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.');
                        }
                        stats = {};
                        tsTotal = Date.now();
                        imgTensor = tf_core_esm/* tidy */.DZQ(function () {
                            return bgrToRgbTensor(tf_core_esm/* expandDims */.UG6(tf_core_esm/* browser */.TaL.fromPixels(inputCanvas)).toFloat());
                        });
                        onReturn = function (results) {
                            // dispose tensors on return
                            imgTensor.dispose();
                            stats.total = Date.now() - tsTotal;
                            return results;
                        };
                        _a = imgTensor.shape.slice(1), height = _a[0], width = _a[1];
                        _b = new MtcnnOptions_MtcnnOptions(forwardParams), minFaceSize = _b.minFaceSize, scaleFactor = _b.scaleFactor, maxNumScales = _b.maxNumScales, scoreThresholds = _b.scoreThresholds, scaleSteps = _b.scaleSteps;
                        scales = (scaleSteps || pyramidDown(minFaceSize, scaleFactor, [height, width]))
                            .filter(function (scale) {
                            var sizes = getSizesForScale(scale, [height, width]);
                            return Math.min(sizes.width, sizes.height) > CELL_SIZE;
                        })
                            .slice(0, maxNumScales);
                        stats.scales = scales;
                        stats.pyramid = scales.map(function (scale) { return getSizesForScale(scale, [height, width]); });
                        ts = Date.now();
                        return [4 /*yield*/, stage1(imgTensor, scales, scoreThresholds[0], params.pnet, stats)];
                    case 1:
                        out1 = _c.sent();
                        stats.total_stage1 = Date.now() - ts;
                        if (!out1.boxes.length) {
                            return [2 /*return*/, onReturn({ results: [], stats: stats })];
                        }
                        stats.stage2_numInputBoxes = out1.boxes.length;
                        // using the inputCanvas to extract and resize the image patches, since it is faster
                        // than doing this on the gpu
                        ts = Date.now();
                        return [4 /*yield*/, stage2(inputCanvas, out1.boxes, scoreThresholds[1], params.rnet, stats)];
                    case 2:
                        out2 = _c.sent();
                        stats.total_stage2 = Date.now() - ts;
                        if (!out2.boxes.length) {
                            return [2 /*return*/, onReturn({ results: [], stats: stats })];
                        }
                        stats.stage3_numInputBoxes = out2.boxes.length;
                        ts = Date.now();
                        return [4 /*yield*/, stage3(inputCanvas, out2.boxes, scoreThresholds[2], params.onet, stats)];
                    case 3:
                        out3 = _c.sent();
                        stats.total_stage3 = Date.now() - ts;
                        results = out3.boxes.map(function (box, idx) { return extendWithFaceLandmarks(extendWithFaceDetection({}, new FaceDetection(out3.scores[idx], new Rect(box.left / width, box.top / height, box.width / width, box.height / height), {
                            height: height,
                            width: width
                        })), new FaceLandmarks5(out3.points[idx].map(function (pt) { return pt.sub(new Point(box.left, box.top)).div(new Point(box.width, box.height)); }), { width: box.width, height: box.height })); });
                        return [2 /*return*/, onReturn({ results: results, stats: stats })];
                }
            });
        });
    };
    Mtcnn.prototype.forward = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent(),
                            forwardParams])];
                    case 2: return [2 /*return*/, (_b.sent()).results];
                }
            });
        });
    };
    Mtcnn.prototype.forwardWithStats = function (input, forwardParams) {
        if (forwardParams === void 0) { forwardParams = {}; }
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.forwardInput;
                        return [4 /*yield*/, toNetInput(input)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(),
                            forwardParams])];
                }
            });
        });
    };
    Mtcnn.prototype.getDefaultModelName = function () {
        return 'mtcnn_model';
    };
    Mtcnn.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return mtcnn_extractParamsFromWeigthMap_extractParamsFromWeigthMap(weightMap);
    };
    Mtcnn.prototype.extractParams = function (weights) {
        return mtcnn_extractParams_extractParams(weights);
    };
    return Mtcnn;
}(NeuralNetwork));

//# sourceMappingURL=Mtcnn.js.map
;// ./node_modules/face-api.js/build/es6/tinyFaceDetector/const.js

var const_IOU_THRESHOLD = 0.4;
var const_BOX_ANCHORS = [
    new Point(1.603231, 2.094468),
    new Point(6.041143, 7.080126),
    new Point(2.882459, 3.518061),
    new Point(4.266906, 5.178857),
    new Point(9.041765, 10.66308)
];
var MEAN_RGB = [117.001, 114.697, 97.404];
//# sourceMappingURL=const.js.map
;// ./node_modules/face-api.js/build/es6/tinyFaceDetector/TinyFaceDetector.js




var TinyFaceDetector_TinyFaceDetector = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(TinyFaceDetector, _super);
    function TinyFaceDetector() {
        var _this = this;
        var config = {
            withSeparableConvs: true,
            iouThreshold: const_IOU_THRESHOLD,
            classes: ['face'],
            anchors: const_BOX_ANCHORS,
            meanRgb: MEAN_RGB,
            isFirstLayerConv2d: true,
            filterSizes: [3, 16, 32, 64, 128, 256, 512]
        };
        _this = _super.call(this, config) || this;
        return _this;
    }
    Object.defineProperty(TinyFaceDetector.prototype, "anchors", {
        get: function () {
            return this.config.anchors;
        },
        enumerable: true,
        configurable: true
    });
    TinyFaceDetector.prototype.locateFaces = function (input, forwardParams) {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var objectDetections;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.detect(input, forwardParams)];
                    case 1:
                        objectDetections = _a.sent();
                        return [2 /*return*/, objectDetections.map(function (det) { return new FaceDetection(det.score, det.relativeBox, { width: det.imageWidth, height: det.imageHeight }); })];
                }
            });
        });
    };
    TinyFaceDetector.prototype.getDefaultModelName = function () {
        return 'tiny_face_detector_model';
    };
    TinyFaceDetector.prototype.extractParamsFromWeigthMap = function (weightMap) {
        return _super.prototype.extractParamsFromWeigthMap.call(this, weightMap);
    };
    return TinyFaceDetector;
}(TinyYolov2Base));

//# sourceMappingURL=TinyFaceDetector.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/nets.js









var nets = {
    ssdMobilenetv1: new SsdMobilenetv1_SsdMobilenetv1(),
    tinyFaceDetector: new TinyFaceDetector_TinyFaceDetector(),
    tinyYolov2: new TinyYolov2_TinyYolov2(),
    mtcnn: new Mtcnn_Mtcnn(),
    faceLandmark68Net: new FaceLandmark68Net(),
    faceLandmark68TinyNet: new FaceLandmark68TinyNet(),
    faceRecognitionNet: new FaceRecognitionNet_FaceRecognitionNet(),
    faceExpressionNet: new FaceExpressionNet(),
    ageGenderNet: new AgeGenderNet()
};
/**
 * Attempts to detect all faces in an image using SSD Mobilenetv1 Network.
 *
 * @param input The input image.
 * @param options (optional, default: see SsdMobilenetv1Options constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
var ssdMobilenetv1 = function (input, options) {
    return nets.ssdMobilenetv1.locateFaces(input, options);
};
/**
 * Attempts to detect all faces in an image using the Tiny Face Detector.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyFaceDetectorOptions constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
var tinyFaceDetector = function (input, options) {
    return nets.tinyFaceDetector.locateFaces(input, options);
};
/**
 * Attempts to detect all faces in an image using the Tiny Yolov2 Network.
 *
 * @param input The input image.
 * @param options (optional, default: see TinyYolov2Options constructor for default parameters).
 * @returns Bounding box of each face with score.
 */
var tinyYolov2 = function (input, options) {
    return nets.tinyYolov2.locateFaces(input, options);
};
/**
 * Attempts to detect all faces in an image and the 5 point face landmarks
 * of each detected face using the MTCNN Network.
 *
 * @param input The input image.
 * @param options (optional, default: see MtcnnOptions constructor for default parameters).
 * @returns Bounding box of each face with score and 5 point face landmarks.
 */
var mtcnn = function (input, options) {
    return nets.mtcnn.forward(input, options);
};
/**
 * Detects the 68 point face landmark positions of the face shown in an image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
var detectFaceLandmarks = function (input) {
    return nets.faceLandmark68Net.detectLandmarks(input);
};
/**
 * Detects the 68 point face landmark positions of the face shown in an image
 * using a tinier version of the 68 point face landmark model, which is slightly
 * faster at inference, but also slightly less accurate.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns 68 point face landmarks or array thereof in case of batch input.
 */
var detectFaceLandmarksTiny = function (input) {
    return nets.faceLandmark68TinyNet.detectLandmarks(input);
};
/**
 * Computes a 128 entry vector (face descriptor / face embeddings) from the face shown in an image,
 * which uniquely represents the features of that persons face. The computed face descriptor can
 * be used to measure the similarity between faces, by computing the euclidean distance of two
 * face descriptors.
 *
 * @param inputs The face image extracted from the aligned bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Face descriptor with 128 entries or array thereof in case of batch input.
 */
var computeFaceDescriptor = function (input) {
    return nets.faceRecognitionNet.computeFaceDescriptor(input);
};
/**
 * Recognizes the facial expressions from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Facial expressions with corresponding probabilities or array thereof in case of batch input.
 */
var recognizeFaceExpressions = function (input) {
    return nets.faceExpressionNet.predictExpressions(input);
};
/**
 * Predicts age and gender from a face image.
 *
 * @param inputs The face image extracted from the bounding box of a face. Can
 * also be an array of input images, which will be batch processed.
 * @returns Predictions with age, gender and gender probability or array thereof in case of batch input.
 */
var predictAgeAndGender = function (input) {
    return nets.ageGenderNet.predictAgeAndGender(input);
};
var loadSsdMobilenetv1Model = function (url) { return nets.ssdMobilenetv1.load(url); };
var loadTinyFaceDetectorModel = function (url) { return nets.tinyFaceDetector.load(url); };
var loadMtcnnModel = function (url) { return nets.mtcnn.load(url); };
var loadTinyYolov2Model = function (url) { return nets.tinyYolov2.load(url); };
var loadFaceLandmarkModel = function (url) { return nets.faceLandmark68Net.load(url); };
var loadFaceLandmarkTinyModel = function (url) { return nets.faceLandmark68TinyNet.load(url); };
var loadFaceRecognitionModel = function (url) { return nets.faceRecognitionNet.load(url); };
var loadFaceExpressionModel = function (url) { return nets.faceExpressionNet.load(url); };
var loadAgeGenderModel = function (url) { return nets.ageGenderNet.load(url); };
// backward compatibility
var loadFaceDetectionModel = (/* unused pure expression or super */ null && (loadSsdMobilenetv1Model));
var locateFaces = (/* unused pure expression or super */ null && (ssdMobilenetv1));
var detectLandmarks = (/* unused pure expression or super */ null && (detectFaceLandmarks));
//# sourceMappingURL=nets.js.map
;// ./node_modules/face-api.js/build/es6/factories/WithAge.js
function isWithAge(obj) {
    return typeof obj['age'] === 'number';
}
function extendWithAge(sourceObj, age) {
    var extension = { age: age };
    return Object.assign({}, sourceObj, extension);
}
//# sourceMappingURL=WithAge.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/PredictFaceExpressionsTask.js







var PredictFaceExpressionsTaskBase = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictFaceExpressionsTaskBase, _super);
    function PredictFaceExpressionsTaskBase(parentTask, input, extractedFaces) {
        var _this = _super.call(this) || this;
        _this.parentTask = parentTask;
        _this.input = input;
        _this.extractedFaces = extractedFaces;
        return _this;
    }
    return PredictFaceExpressionsTaskBase;
}(ComposableTask));

var PredictAllFaceExpressionsTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictAllFaceExpressionsTask, _super);
    function PredictAllFaceExpressionsTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictAllFaceExpressionsTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResults, faceExpressionsByFace;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResults = _a.sent();
                        return [4 /*yield*/, extractAllFacesAndComputeResults(parentResults, this.input, function (faces) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
                                return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(faces.map(function (face) { return nets.faceExpressionNet.predictExpressions(face); }))];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, this.extractedFaces)];
                    case 2:
                        faceExpressionsByFace = _a.sent();
                        return [2 /*return*/, parentResults.map(function (parentResult, i) { return extendWithFaceExpressions(parentResult, faceExpressionsByFace[i]); })];
                }
            });
        });
    };
    PredictAllFaceExpressionsTask.prototype.withAgeAndGender = function () {
        return new PredictAllAgeAndGenderTask(this, this.input);
    };
    return PredictAllFaceExpressionsTask;
}(PredictFaceExpressionsTaskBase));

var PredictSingleFaceExpressionsTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictSingleFaceExpressionsTask, _super);
    function PredictSingleFaceExpressionsTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictSingleFaceExpressionsTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResult, faceExpressions;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResult = _a.sent();
                        if (!parentResult) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extractSingleFaceAndComputeResult(parentResult, this.input, function (face) { return nets.faceExpressionNet.predictExpressions(face); }, this.extractedFaces)];
                    case 2:
                        faceExpressions = _a.sent();
                        return [2 /*return*/, extendWithFaceExpressions(parentResult, faceExpressions)];
                }
            });
        });
    };
    PredictSingleFaceExpressionsTask.prototype.withAgeAndGender = function () {
        return new PredictSingleAgeAndGenderTask(this, this.input);
    };
    return PredictSingleFaceExpressionsTask;
}(PredictFaceExpressionsTaskBase));

var PredictAllFaceExpressionsWithFaceAlignmentTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictAllFaceExpressionsWithFaceAlignmentTask, _super);
    function PredictAllFaceExpressionsWithFaceAlignmentTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictAllFaceExpressionsWithFaceAlignmentTask.prototype.withAgeAndGender = function () {
        return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    };
    PredictAllFaceExpressionsWithFaceAlignmentTask.prototype.withFaceDescriptors = function () {
        return new ComputeAllFaceDescriptorsTask(this, this.input);
    };
    return PredictAllFaceExpressionsWithFaceAlignmentTask;
}(PredictAllFaceExpressionsTask));

var PredictSingleFaceExpressionsWithFaceAlignmentTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictSingleFaceExpressionsWithFaceAlignmentTask, _super);
    function PredictSingleFaceExpressionsWithFaceAlignmentTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictSingleFaceExpressionsWithFaceAlignmentTask.prototype.withAgeAndGender = function () {
        return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    };
    PredictSingleFaceExpressionsWithFaceAlignmentTask.prototype.withFaceDescriptor = function () {
        return new ComputeSingleFaceDescriptorTask(this, this.input);
    };
    return PredictSingleFaceExpressionsWithFaceAlignmentTask;
}(PredictSingleFaceExpressionsTask));

//# sourceMappingURL=PredictFaceExpressionsTask.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/PredictAgeAndGenderTask.js








var PredictAgeAndGenderTaskBase = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictAgeAndGenderTaskBase, _super);
    function PredictAgeAndGenderTaskBase(parentTask, input, extractedFaces) {
        var _this = _super.call(this) || this;
        _this.parentTask = parentTask;
        _this.input = input;
        _this.extractedFaces = extractedFaces;
        return _this;
    }
    return PredictAgeAndGenderTaskBase;
}(ComposableTask));

var PredictAllAgeAndGenderTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictAllAgeAndGenderTask, _super);
    function PredictAllAgeAndGenderTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictAllAgeAndGenderTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResults, ageAndGenderByFace;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResults = _a.sent();
                        return [4 /*yield*/, extractAllFacesAndComputeResults(parentResults, this.input, function (faces) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
                                return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(faces.map(function (face) { return nets.ageGenderNet.predictAgeAndGender(face); }))];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, this.extractedFaces)];
                    case 2:
                        ageAndGenderByFace = _a.sent();
                        return [2 /*return*/, parentResults.map(function (parentResult, i) {
                                var _a = ageAndGenderByFace[i], age = _a.age, gender = _a.gender, genderProbability = _a.genderProbability;
                                return extendWithAge(extendWithGender(parentResult, gender, genderProbability), age);
                            })];
                }
            });
        });
    };
    PredictAllAgeAndGenderTask.prototype.withFaceExpressions = function () {
        return new PredictAllFaceExpressionsTask(this, this.input);
    };
    return PredictAllAgeAndGenderTask;
}(PredictAgeAndGenderTaskBase));

var PredictSingleAgeAndGenderTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictSingleAgeAndGenderTask, _super);
    function PredictSingleAgeAndGenderTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictSingleAgeAndGenderTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResult, _a, age, gender, genderProbability;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResult = _b.sent();
                        if (!parentResult) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extractSingleFaceAndComputeResult(parentResult, this.input, function (face) { return nets.ageGenderNet.predictAgeAndGender(face); }, this.extractedFaces)];
                    case 2:
                        _a = _b.sent(), age = _a.age, gender = _a.gender, genderProbability = _a.genderProbability;
                        return [2 /*return*/, extendWithAge(extendWithGender(parentResult, gender, genderProbability), age)];
                }
            });
        });
    };
    PredictSingleAgeAndGenderTask.prototype.withFaceExpressions = function () {
        return new PredictSingleFaceExpressionsTask(this, this.input);
    };
    return PredictSingleAgeAndGenderTask;
}(PredictAgeAndGenderTaskBase));

var PredictAllAgeAndGenderWithFaceAlignmentTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictAllAgeAndGenderWithFaceAlignmentTask, _super);
    function PredictAllAgeAndGenderWithFaceAlignmentTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictAllAgeAndGenderWithFaceAlignmentTask.prototype.withFaceExpressions = function () {
        return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    PredictAllAgeAndGenderWithFaceAlignmentTask.prototype.withFaceDescriptors = function () {
        return new ComputeAllFaceDescriptorsTask(this, this.input);
    };
    return PredictAllAgeAndGenderWithFaceAlignmentTask;
}(PredictAllAgeAndGenderTask));

var PredictSingleAgeAndGenderWithFaceAlignmentTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(PredictSingleAgeAndGenderWithFaceAlignmentTask, _super);
    function PredictSingleAgeAndGenderWithFaceAlignmentTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PredictSingleAgeAndGenderWithFaceAlignmentTask.prototype.withFaceExpressions = function () {
        return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    PredictSingleAgeAndGenderWithFaceAlignmentTask.prototype.withFaceDescriptor = function () {
        return new ComputeSingleFaceDescriptorTask(this, this.input);
    };
    return PredictSingleAgeAndGenderWithFaceAlignmentTask;
}(PredictSingleAgeAndGenderTask));

//# sourceMappingURL=PredictAgeAndGenderTask.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/ComputeFaceDescriptorsTasks.js







var ComputeFaceDescriptorsTaskBase = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(ComputeFaceDescriptorsTaskBase, _super);
    function ComputeFaceDescriptorsTaskBase(parentTask, input) {
        var _this = _super.call(this) || this;
        _this.parentTask = parentTask;
        _this.input = input;
        return _this;
    }
    return ComputeFaceDescriptorsTaskBase;
}(ComposableTask));

var ComputeAllFaceDescriptorsTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(ComputeAllFaceDescriptorsTask, _super);
    function ComputeAllFaceDescriptorsTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComputeAllFaceDescriptorsTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResults, descriptors;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResults = _a.sent();
                        return [4 /*yield*/, extractAllFacesAndComputeResults(parentResults, this.input, function (faces) { return Promise.all(faces.map(function (face) {
                                return nets.faceRecognitionNet.computeFaceDescriptor(face);
                            })); }, null, function (parentResult) { return parentResult.landmarks.align(null, { useDlibAlignment: true }); })];
                    case 2:
                        descriptors = _a.sent();
                        return [2 /*return*/, descriptors.map(function (descriptor, i) { return extendWithFaceDescriptor(parentResults[i], descriptor); })];
                }
            });
        });
    };
    ComputeAllFaceDescriptorsTask.prototype.withFaceExpressions = function () {
        return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    ComputeAllFaceDescriptorsTask.prototype.withAgeAndGender = function () {
        return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    };
    return ComputeAllFaceDescriptorsTask;
}(ComputeFaceDescriptorsTaskBase));

var ComputeSingleFaceDescriptorTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(ComputeSingleFaceDescriptorTask, _super);
    function ComputeSingleFaceDescriptorTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComputeSingleFaceDescriptorTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResult, descriptor;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResult = _a.sent();
                        if (!parentResult) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, extractSingleFaceAndComputeResult(parentResult, this.input, function (face) { return nets.faceRecognitionNet.computeFaceDescriptor(face); }, null, function (parentResult) { return parentResult.landmarks.align(null, { useDlibAlignment: true }); })];
                    case 2:
                        descriptor = _a.sent();
                        return [2 /*return*/, extendWithFaceDescriptor(parentResult, descriptor)];
                }
            });
        });
    };
    ComputeSingleFaceDescriptorTask.prototype.withFaceExpressions = function () {
        return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    ComputeSingleFaceDescriptorTask.prototype.withAgeAndGender = function () {
        return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    };
    return ComputeSingleFaceDescriptorTask;
}(ComputeFaceDescriptorsTaskBase));

//# sourceMappingURL=ComputeFaceDescriptorsTasks.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/DetectFaceLandmarksTasks.js









var DetectFaceLandmarksTaskBase = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(DetectFaceLandmarksTaskBase, _super);
    function DetectFaceLandmarksTaskBase(parentTask, input, useTinyLandmarkNet) {
        var _this = _super.call(this) || this;
        _this.parentTask = parentTask;
        _this.input = input;
        _this.useTinyLandmarkNet = useTinyLandmarkNet;
        return _this;
    }
    Object.defineProperty(DetectFaceLandmarksTaskBase.prototype, "landmarkNet", {
        get: function () {
            return this.useTinyLandmarkNet
                ? nets.faceLandmark68TinyNet
                : nets.faceLandmark68Net;
        },
        enumerable: true,
        configurable: true
    });
    return DetectFaceLandmarksTaskBase;
}(ComposableTask));

var DetectAllFaceLandmarksTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(DetectAllFaceLandmarksTask, _super);
    function DetectAllFaceLandmarksTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectAllFaceLandmarksTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResults, detections, faces, _a, faceLandmarksByFace;
            var _this = this;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResults = _b.sent();
                        detections = parentResults.map(function (res) { return res.detection; });
                        if (!(this.input instanceof tf_core_esm/* Tensor */.qYS)) return [3 /*break*/, 3];
                        return [4 /*yield*/, extractFaceTensors(this.input, detections)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, extractFaces(this.input, detections)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        faces = _a;
                        return [4 /*yield*/, Promise.all(faces.map(function (face) { return _this.landmarkNet.detectLandmarks(face); }))];
                    case 6:
                        faceLandmarksByFace = _b.sent();
                        faces.forEach(function (f) { return f instanceof tf_core_esm/* Tensor */.qYS && f.dispose(); });
                        return [2 /*return*/, parentResults.map(function (parentResult, i) {
                                return extendWithFaceLandmarks(parentResult, faceLandmarksByFace[i]);
                            })];
                }
            });
        });
    };
    DetectAllFaceLandmarksTask.prototype.withFaceExpressions = function () {
        return new PredictAllFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    DetectAllFaceLandmarksTask.prototype.withAgeAndGender = function () {
        return new PredictAllAgeAndGenderWithFaceAlignmentTask(this, this.input);
    };
    DetectAllFaceLandmarksTask.prototype.withFaceDescriptors = function () {
        return new ComputeAllFaceDescriptorsTask(this, this.input);
    };
    return DetectAllFaceLandmarksTask;
}(DetectFaceLandmarksTaskBase));

var DetectSingleFaceLandmarksTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(DetectSingleFaceLandmarksTask, _super);
    function DetectSingleFaceLandmarksTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectSingleFaceLandmarksTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var parentResult, detection, faces, _a, landmarks;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.parentTask];
                    case 1:
                        parentResult = _b.sent();
                        if (!parentResult) {
                            return [2 /*return*/];
                        }
                        detection = parentResult.detection;
                        if (!(this.input instanceof tf_core_esm/* Tensor */.qYS)) return [3 /*break*/, 3];
                        return [4 /*yield*/, extractFaceTensors(this.input, [detection])];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, extractFaces(this.input, [detection])];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        faces = _a;
                        return [4 /*yield*/, this.landmarkNet.detectLandmarks(faces[0])];
                    case 6:
                        landmarks = _b.sent();
                        faces.forEach(function (f) { return f instanceof tf_core_esm/* Tensor */.qYS && f.dispose(); });
                        return [2 /*return*/, extendWithFaceLandmarks(parentResult, landmarks)];
                }
            });
        });
    };
    DetectSingleFaceLandmarksTask.prototype.withFaceExpressions = function () {
        return new PredictSingleFaceExpressionsWithFaceAlignmentTask(this, this.input);
    };
    DetectSingleFaceLandmarksTask.prototype.withAgeAndGender = function () {
        return new PredictSingleAgeAndGenderWithFaceAlignmentTask(this, this.input);
    };
    DetectSingleFaceLandmarksTask.prototype.withFaceDescriptor = function () {
        return new ComputeSingleFaceDescriptorTask(this, this.input);
    };
    return DetectSingleFaceLandmarksTask;
}(DetectFaceLandmarksTaskBase));

//# sourceMappingURL=DetectFaceLandmarksTasks.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/DetectFacesTasks.js











var DetectFacesTaskBase = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(DetectFacesTaskBase, _super);
    function DetectFacesTaskBase(input, options) {
        if (options === void 0) { options = new SsdMobilenetv1Options_SsdMobilenetv1Options(); }
        var _this = _super.call(this) || this;
        _this.input = input;
        _this.options = options;
        return _this;
    }
    return DetectFacesTaskBase;
}(ComposableTask));

var DetectAllFacesTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(DetectAllFacesTask, _super);
    function DetectAllFacesTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectAllFacesTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var _a, input, options, faceDetectionFunction;
            return (0,tslib_es6/* __generator */.YH)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, input = _a.input, options = _a.options;
                        if (!(options instanceof MtcnnOptions_MtcnnOptions)) return [3 /*break*/, 2];
                        return [4 /*yield*/, nets.mtcnn.forward(input, options)];
                    case 1: return [2 /*return*/, (_b.sent())
                            .map(function (result) { return result.detection; })];
                    case 2:
                        faceDetectionFunction = options instanceof TinyFaceDetectorOptions
                            ? function (input) { return nets.tinyFaceDetector.locateFaces(input, options); }
                            : (options instanceof SsdMobilenetv1Options_SsdMobilenetv1Options
                                ? function (input) { return nets.ssdMobilenetv1.locateFaces(input, options); }
                                : (options instanceof TinyYolov2Options_TinyYolov2Options
                                    ? function (input) { return nets.tinyYolov2.locateFaces(input, options); }
                                    : null));
                        if (!faceDetectionFunction) {
                            throw new Error('detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options');
                        }
                        return [2 /*return*/, faceDetectionFunction(input)];
                }
            });
        });
    };
    DetectAllFacesTask.prototype.runAndExtendWithFaceDetections = function () {
        var _this = this;
        return new Promise(function (res) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
            var detections;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.run()];
                    case 1:
                        detections = _a.sent();
                        return [2 /*return*/, res(detections.map(function (detection) { return extendWithFaceDetection({}, detection); }))];
                }
            });
        }); });
    };
    DetectAllFacesTask.prototype.withFaceLandmarks = function (useTinyLandmarkNet) {
        if (useTinyLandmarkNet === void 0) { useTinyLandmarkNet = false; }
        return new DetectAllFaceLandmarksTask(this.runAndExtendWithFaceDetections(), this.input, useTinyLandmarkNet);
    };
    DetectAllFacesTask.prototype.withFaceExpressions = function () {
        return new PredictAllFaceExpressionsTask(this.runAndExtendWithFaceDetections(), this.input);
    };
    DetectAllFacesTask.prototype.withAgeAndGender = function () {
        return new PredictAllAgeAndGenderTask(this.runAndExtendWithFaceDetections(), this.input);
    };
    return DetectAllFacesTask;
}(DetectFacesTaskBase));

var DetectFacesTasks_DetectSingleFaceTask = /** @class */ (function (_super) {
    (0,tslib_es6/* __extends */.C6)(DetectSingleFaceTask, _super);
    function DetectSingleFaceTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DetectSingleFaceTask.prototype.run = function () {
        return (0,tslib_es6/* __awaiter */.sH)(this, void 0, void 0, function () {
            var faceDetections, faceDetectionWithHighestScore;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DetectAllFacesTask(this.input, this.options)];
                    case 1:
                        faceDetections = _a.sent();
                        faceDetectionWithHighestScore = faceDetections[0];
                        faceDetections.forEach(function (faceDetection) {
                            if (faceDetection.score > faceDetectionWithHighestScore.score) {
                                faceDetectionWithHighestScore = faceDetection;
                            }
                        });
                        return [2 /*return*/, faceDetectionWithHighestScore];
                }
            });
        });
    };
    DetectSingleFaceTask.prototype.runAndExtendWithFaceDetection = function () {
        var _this = this;
        return new Promise(function (res) { return (0,tslib_es6/* __awaiter */.sH)(_this, void 0, void 0, function () {
            var detection;
            return (0,tslib_es6/* __generator */.YH)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.run()];
                    case 1:
                        detection = _a.sent();
                        return [2 /*return*/, res(detection ? extendWithFaceDetection({}, detection) : undefined)];
                }
            });
        }); });
    };
    DetectSingleFaceTask.prototype.withFaceLandmarks = function (useTinyLandmarkNet) {
        if (useTinyLandmarkNet === void 0) { useTinyLandmarkNet = false; }
        return new DetectSingleFaceLandmarksTask(this.runAndExtendWithFaceDetection(), this.input, useTinyLandmarkNet);
    };
    DetectSingleFaceTask.prototype.withFaceExpressions = function () {
        return new PredictSingleFaceExpressionsTask(this.runAndExtendWithFaceDetection(), this.input);
    };
    DetectSingleFaceTask.prototype.withAgeAndGender = function () {
        return new PredictSingleAgeAndGenderTask(this.runAndExtendWithFaceDetection(), this.input);
    };
    return DetectSingleFaceTask;
}(DetectFacesTaskBase));

//# sourceMappingURL=DetectFacesTasks.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/detectFaces.js


function detectSingleFace(input, options) {
    if (options === void 0) { options = new SsdMobilenetv1Options(); }
    return new DetectSingleFaceTask(input, options);
}
function detectFaces_detectAllFaces(input, options) {
    if (options === void 0) { options = new SsdMobilenetv1Options_SsdMobilenetv1Options(); }
    return new DetectAllFacesTask(input, options);
}
//# sourceMappingURL=detectFaces.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/allFaces.js





// export allFaces API for backward compatibility
function allFacesSsdMobilenetv1(input, minConfidence) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.warn('allFacesSsdMobilenetv1 is deprecated and will be removed soon, use the high level api instead');
                    return [4 /*yield*/, detectAllFaces(input, new SsdMobilenetv1Options(minConfidence ? { minConfidence: minConfidence } : {}))
                            .withFaceLandmarks()
                            .withFaceDescriptors()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function allFacesTinyYolov2(input, forwardParams) {
    if (forwardParams === void 0) { forwardParams = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.warn('allFacesTinyYolov2 is deprecated and will be removed soon, use the high level api instead');
                    return [4 /*yield*/, detectAllFaces(input, new TinyYolov2Options(forwardParams))
                            .withFaceLandmarks()
                            .withFaceDescriptors()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function allFacesMtcnn(input, forwardParams) {
    if (forwardParams === void 0) { forwardParams = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.warn('allFacesMtcnn is deprecated and will be removed soon, use the high level api instead');
                    return [4 /*yield*/, detectAllFaces(input, new MtcnnOptions(forwardParams))
                            .withFaceLandmarks()
                            .withFaceDescriptors()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var allFaces = (/* unused pure expression or super */ null && (allFacesSsdMobilenetv1));
//# sourceMappingURL=allFaces.js.map
;// ./node_modules/face-api.js/build/es6/euclideanDistance.js
function euclideanDistance(arr1, arr2) {
    if (arr1.length !== arr2.length)
        throw new Error('euclideanDistance: arr1.length !== arr2.length');
    var desc1 = Array.from(arr1);
    var desc2 = Array.from(arr2);
    return Math.sqrt(desc1
        .map(function (val, i) { return val - desc2[i]; })
        .reduce(function (res, diff) { return res + Math.pow(diff, 2); }, 0));
}
//# sourceMappingURL=euclideanDistance.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/FaceMatcher.js



var FaceMatcher = /** @class */ (function () {
    function FaceMatcher(inputs, distanceThreshold) {
        if (distanceThreshold === void 0) { distanceThreshold = 0.6; }
        this._distanceThreshold = distanceThreshold;
        var inputArray = Array.isArray(inputs) ? inputs : [inputs];
        if (!inputArray.length) {
            throw new Error("FaceRecognizer.constructor - expected atleast one input");
        }
        var count = 1;
        var createUniqueLabel = function () { return "person " + count++; };
        this._labeledDescriptors = inputArray.map(function (desc) {
            if (desc instanceof LabeledFaceDescriptors) {
                return desc;
            }
            if (desc instanceof Float32Array) {
                return new LabeledFaceDescriptors(createUniqueLabel(), [desc]);
            }
            if (desc.descriptor && desc.descriptor instanceof Float32Array) {
                return new LabeledFaceDescriptors(createUniqueLabel(), [desc.descriptor]);
            }
            throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>");
        });
    }
    Object.defineProperty(FaceMatcher.prototype, "labeledDescriptors", {
        get: function () { return this._labeledDescriptors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FaceMatcher.prototype, "distanceThreshold", {
        get: function () { return this._distanceThreshold; },
        enumerable: true,
        configurable: true
    });
    FaceMatcher.prototype.computeMeanDistance = function (queryDescriptor, descriptors) {
        return descriptors
            .map(function (d) { return euclideanDistance(d, queryDescriptor); })
            .reduce(function (d1, d2) { return d1 + d2; }, 0)
            / (descriptors.length || 1);
    };
    FaceMatcher.prototype.matchDescriptor = function (queryDescriptor) {
        var _this = this;
        return this.labeledDescriptors
            .map(function (_a) {
            var descriptors = _a.descriptors, label = _a.label;
            return new FaceMatch(label, _this.computeMeanDistance(queryDescriptor, descriptors));
        })
            .reduce(function (best, curr) { return best.distance < curr.distance ? best : curr; });
    };
    FaceMatcher.prototype.findBestMatch = function (queryDescriptor) {
        var bestMatch = this.matchDescriptor(queryDescriptor);
        return bestMatch.distance < this.distanceThreshold
            ? bestMatch
            : new FaceMatch('unknown', bestMatch.distance);
    };
    FaceMatcher.prototype.toJSON = function () {
        return {
            distanceThreshold: this.distanceThreshold,
            labeledDescriptors: this.labeledDescriptors.map(function (ld) { return ld.toJSON(); })
        };
    };
    FaceMatcher.fromJSON = function (json) {
        var labeledDescriptors = json.labeledDescriptors
            .map(function (ld) { return LabeledFaceDescriptors.fromJSON(ld); });
        return new FaceMatcher(labeledDescriptors, json.distanceThreshold);
    };
    return FaceMatcher;
}());

//# sourceMappingURL=FaceMatcher.js.map
;// ./node_modules/face-api.js/build/es6/globalApi/index.js








//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/mtcnn/index.js



function createMtcnn(weights) {
    var net = new Mtcnn();
    net.extractWeights(weights);
    return net;
}
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/tinyFaceDetector/index.js



function createTinyFaceDetector(weights) {
    var net = new TinyFaceDetector();
    net.extractWeights(weights);
    return net;
}
//# sourceMappingURL=index.js.map
;// ./node_modules/face-api.js/build/es6/resizeResults.js





function resizeResults(results, dimensions) {
    var _a = new Dimensions(dimensions.width, dimensions.height), width = _a.width, height = _a.height;
    if (width <= 0 || height <= 0) {
        throw new Error("resizeResults - invalid dimensions: " + JSON.stringify({ width: width, height: height }));
    }
    if (Array.isArray(results)) {
        return results.map(function (obj) { return resizeResults(obj, { width: width, height: height }); });
    }
    if (isWithFaceLandmarks(results)) {
        var resizedDetection = results.detection.forSize(width, height);
        var resizedLandmarks = results.unshiftedLandmarks.forSize(resizedDetection.box.width, resizedDetection.box.height);
        return extendWithFaceLandmarks(extendWithFaceDetection(results, resizedDetection), resizedLandmarks);
    }
    if (isWithFaceDetection(results)) {
        return extendWithFaceDetection(results, results.detection.forSize(width, height));
    }
    if (results instanceof FaceLandmarks || results instanceof FaceDetection) {
        return results.forSize(width, height);
    }
    return results;
}
//# sourceMappingURL=resizeResults.js.map
;// ./node_modules/face-api.js/build/es6/index.js





















//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=face-api.7ce98bd86fbb39d548ed.js.map