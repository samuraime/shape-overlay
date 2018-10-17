"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _easing = _interopRequireDefault(require("./easing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {Number} x [0, 1]
 * @return [0, 1]
 */
var defaultShapeFunction = function defaultShapeFunction(x) {
  return (Math.sin(x * 8 * Math.PI) + 1) / 2;
};

var ShapeOverlay =
/*#__PURE__*/
function (_Component) {
  _inherits(ShapeOverlay, _Component);

  function ShapeOverlay(props) {
    var _this;

    _classCallCheck(this, ShapeOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShapeOverlay).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function () {
      var _this$state = _this.state,
          duration = _this$state.duration,
          layerCount = _this$state.layerCount,
          layerDelay = _this$state.layerDelay,
          timeStart = _this$state.timeStart,
          pointDelayRange = _this$state.pointDelayRange;
      var _this$props = _this.props,
          layerColors = _this$props.layerColors,
          onAnimationEnd = _this$props.onAnimationEnd;
      var current = Date.now() - timeStart;
      var maxDuration = duration + layerDelay * layerCount + pointDelayRange;

      if (current < maxDuration) {
        requestAnimationFrame(_this.update);

        var paths = _this.getPaths().map(function (path, i) {
          return {
            key: i,
            fill: layerColors[i],
            path: path
          };
        });

        _this.setState({
          paths: paths
        });

        return;
      }

      _this.setState({
        isAnimating: false
      }, function () {
        if (onAnimationEnd) {
          onAnimationEnd(new CustomEvent('animationend'));
        }
      });
    });

    var initialState = _this.getState(props);

    _this.state = _objectSpread({}, initialState, {
      box: 100,
      paths: [],
      isAnimating: false
    });
    return _this;
  }

  _createClass(ShapeOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var open = this.props.open;
      this.setup(open);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var open = this.props.open;
      var keys = ['layerCount', 'layerDelay', 'pointCount', 'shapeRatio', 'duration'];
      var shouldResetState = keys.some(function (key) {
        return _this2.props[key] !== nextProps[key] // eslint-disable-line
        ;
      });

      if (shouldResetState) {
        var nextState = this.getState(nextProps);
        this.setState(nextState);
      }

      if (nextProps.open !== open) {
        this.setup(nextProps.open);
      }
    }
  }, {
    key: "getState",
    value: function getState(props) {
      var pointCount = props.pointCount,
          layerDelay = props.layerDelay,
          layerCount = props.layerCount,
          shapeRatio = props.shapeRatio,
          duration = props.duration;
      var pointDelayRange = shapeRatio * duration;
      return {
        pointCount: pointCount,
        layerDelay: layerDelay,
        layerCount: layerCount,
        duration: duration,
        pointDelayRange: pointDelayRange,
        layerPoints: this.getLayerPoints(pointDelayRange)
      };
    }
  }, {
    key: "getLayerPoints",
    value: function getLayerPoints(pointDelayRange) {
      var _this$props2 = this.props,
          pointCount = _this$props2.pointCount,
          shapeFunction = _this$props2.shapeFunction;
      return Array(pointCount).fill().map(function (p, i) {
        var x = i / (pointCount - 1);
        return shapeFunction(x) * pointDelayRange;
      });
    }
  }, {
    key: "getPaths",
    value: function getPaths() {
      var timingFunction = this.props.timingFunction;
      var _this$state2 = this.state,
          layerCount = _this$state2.layerCount,
          pointCount = _this$state2.pointCount,
          layerDelay = _this$state2.layerDelay,
          duration = _this$state2.duration,
          layerPoints = _this$state2.layerPoints,
          timeStart = _this$state2.timeStart,
          box = _this$state2.box,
          isOpened = _this$state2.isOpened;
      var timeDiff = Date.now() - timeStart;
      return Array(layerCount).fill().map(function (layer, layerIndex) {
        var time = isOpened ? timeDiff - layerDelay * layerIndex : timeDiff - layerDelay * (layerCount - layerIndex - 1);
        var points = Array(pointCount).fill().map(function (p, i) {
          var progress = Math.min(Math.max(time - layerPoints[i], 0) / duration, 1);

          var easingdProgress = _easing.default[timingFunction](progress);

          return easingdProgress * box;
        });
        var prefix = isOpened ? "M 0 0 V ".concat(points[0], " ") : "M 0 ".concat(points[0], " ");
        var suffix = isOpened ? 'V 0 H 0' : 'V 100 H 0';
        var unitX = 1 / (pointCount - 1) * box;
        var path = points.slice(0, -1).reduce(function (prevPath, point, i) {
          var nextPointX = (i + 1) * unitX;
          var controlPointX = nextPointX - unitX / 2;
          return "".concat(prevPath, " C ").concat(controlPointX, " ").concat(points[i], " ").concat(controlPointX, " ").concat(points[i + 1], " ").concat(nextPointX, " ").concat(points[i + 1], " ");
        }, '');
        return "".concat(prefix).concat(path).concat(suffix);
      });
    }
  }, {
    key: "setup",
    value: function setup(open) {
      if (typeof open !== 'boolean') {
        return;
      }

      var isAnimating = this.state.isAnimating;

      if (isAnimating) {
        return;
      }

      var onAnimationStart = this.props.onAnimationStart;

      if (onAnimationStart) {
        onAnimationStart(new CustomEvent('animationstart'));
      }

      this.setState({
        timeStart: Date.now(),
        isOpened: open,
        isAnimating: true
      }, this.update);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          box = _this$state3.box,
          paths = _this$state3.paths;

      var _this$props3 = this.props,
          open = _this$props3.open,
          layerDelay = _this$props3.layerDelay,
          layerCount = _this$props3.layerCount,
          pointCount = _this$props3.pointCount,
          layerColors = _this$props3.layerColors,
          duration = _this$props3.duration,
          timingFunction = _this$props3.timingFunction,
          shapeFunction = _this$props3.shapeFunction,
          shapeRatio = _this$props3.shapeRatio,
          onAnimationStart = _this$props3.onAnimationStart,
          onAnimationEnd = _this$props3.onAnimationEnd,
          style = _this$props3.style,
          restProps = _objectWithoutProperties(_this$props3, ["open", "layerDelay", "layerCount", "pointCount", "layerColors", "duration", "timingFunction", "shapeFunction", "shapeRatio", "onAnimationStart", "onAnimationEnd", "style"]);

      var finalStyle = _objectSpread({
        backgroundColor: layerColors[0]
      }, style);

      return _react.default.createElement("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 ".concat(box, " ").concat(box),
        preserveAspectRatio: "none",
        style: finalStyle
      }, restProps), paths.map(function (_ref) {
        var key = _ref.key,
            path = _ref.path,
            fill = _ref.fill;
        return _react.default.createElement("path", {
          key: key,
          d: path,
          fill: fill
        });
      }));
    }
  }]);

  return ShapeOverlay;
}(_react.Component);

exports.default = ShapeOverlay;

_defineProperty(ShapeOverlay, "propTypes", {
  open: _propTypes.default.bool,
  pointCount: _propTypes.default.number,
  layerDelay: _propTypes.default.number,
  layerCount: _propTypes.default.number,
  layerColors: _propTypes.default.arrayOf(_propTypes.default.string),
  duration: _propTypes.default.number,
  timingFunction: _propTypes.default.oneOf(Object.keys(_easing.default)),
  shapeFunction: _propTypes.default.func,
  shapeRatio: _propTypes.default.number,
  onAnimationStart: _propTypes.default.func,
  onAnimationEnd: _propTypes.default.func
});

_defineProperty(ShapeOverlay, "defaultProps", {
  open: null,
  pointCount: 32,
  layerDelay: 100,
  layerColors: [],
  layerCount: 1,
  shapeRatio: 0.3,
  duration: 600,
  onAnimationStart: null,
  onAnimationEnd: null,
  timingFunction: 'cubicInOut',
  shapeFunction: defaultShapeFunction
});