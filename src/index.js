import React, { Component } from 'react';
import PropTypes from 'prop-types';
import easing from './easing';

/**
 * @param {Number} x [0, 1]
 * @return [0, 1]
 */
const defaultShapeFunction = x => (Math.sin(x * 8 * Math.PI) + 1) / 2;

export default class ShapeOverlay extends Component {
  static propTypes = {
    open: PropTypes.bool,
    pointCount: PropTypes.number,
    layerDelay: PropTypes.number,
    layerCount: PropTypes.number,
    layerColors: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    timingFunction: PropTypes.oneOf(Object.keys(easing)),
    shapeFunction: PropTypes.func,
    shapeRatio: PropTypes.number,
    onAnimationStart: PropTypes.func,
    onAnimationEnd: PropTypes.func,
  }

  static defaultProps = {
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
    shapeFunction: defaultShapeFunction,
  }

  constructor(props) {
    super(props);

    const initialState = this.getState(props);
    this.state = {
      ...initialState,
      box: 100,
      paths: [],
      isAnimating: false,
    };
  }

  componentDidMount() {
    const { open } = this.props;
    this.setup(open);
  }

  componentWillReceiveProps(nextProps) {
    const { open } = this.props;

    const keys = ['layerCount', 'layerDelay', 'pointCount', 'shapeRatio', 'duration'];
    const shouldResetState = keys.some(key => (
      this.props[key] !== nextProps[key] // eslint-disable-line
    ));

    if (shouldResetState) {
      const nextState = this.getState(nextProps);
      this.setState(nextState);
    }

    if (nextProps.open !== open) {
      this.setup(nextProps.open);
    }
  }

  getState(props) {
    const {
      pointCount, layerDelay, layerCount, shapeRatio, duration,
    } = props;
    const pointDelayRange = shapeRatio * duration;

    return {
      pointCount,
      layerDelay,
      layerCount,
      duration,
      pointDelayRange,
      layerPoints: this.getLayerPoints(pointDelayRange),
    };
  }

  getLayerPoints(pointDelayRange) {
    const { pointCount, shapeFunction } = this.props;
    return Array(pointCount).fill().map((p, i) => {
      const x = i / (pointCount - 1);
      return shapeFunction(x) * pointDelayRange;
    });
  }

  getPaths() {
    const { timingFunction } = this.props;
    const {
      layerCount, pointCount, layerDelay, duration, layerPoints, timeStart, box, isOpened,
    } = this.state;
    const timeDiff = Date.now() - timeStart;

    return Array(layerCount).fill().map((layer, layerIndex) => {
      const time = isOpened
        ? timeDiff - layerDelay * layerIndex
        : timeDiff - layerDelay * (layerCount - layerIndex - 1);
      const points = Array(pointCount).fill().map((p, i) => {
        const progress = Math.min(Math.max(time - layerPoints[i], 0) / duration, 1);
        const easingdProgress = easing[timingFunction](progress);
        return easingdProgress * box;
      });

      const prefix = isOpened ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
      const suffix = isOpened ? 'V 0 H 0' : 'V 100 H 0';
      const unitX = 1 / (pointCount - 1) * box;
      const path = points.slice(0, -1).reduce((prevPath, point, i) => {
        const nextPointX = (i + 1) * unitX;
        const controlPointX = nextPointX - unitX / 2;
        return `${prevPath} C ${controlPointX} ${points[i]} ${controlPointX} ${points[i + 1]} ${nextPointX} ${points[i + 1]} `;
      }, '');
      return `${prefix}${path}${suffix}`;
    });
  }

  setup(open) {
    if (typeof open !== 'boolean') {
      return;
    }

    const { isAnimating } = this.state;

    if (isAnimating) {
      return;
    }

    const { onAnimationStart } = this.props;
    if (onAnimationStart) {
      onAnimationStart(new CustomEvent('animationstart'));
    }

    this.setState({
      timeStart: Date.now(),
      isOpened: open,
      isAnimating: true,
    }, this.update);
  }

  update = () => {
    const {
      duration, layerCount, layerDelay, timeStart, pointDelayRange,
    } = this.state;
    const { layerColors, onAnimationEnd } = this.props;
    const current = Date.now() - timeStart;
    const maxDuration = duration + layerDelay * layerCount + pointDelayRange;

    if (current < maxDuration) {
      requestAnimationFrame(this.update);

      const paths = this.getPaths().map((path, i) => ({
        key: i,
        fill: layerColors[i],
        path,
      }));

      this.setState({
        paths,
      });
      return;
    }

    this.setState({
      isAnimating: false,
    }, () => {
      if (onAnimationEnd) {
        onAnimationEnd(new CustomEvent('animationend'));
      }
    });
  }

  render() {
    const { box, paths } = this.state;
    const {
      open,
      layerDelay,
      layerCount,
      pointCount,
      layerColors,
      duration,
      timingFunction,
      shapeFunction,
      shapeRatio,
      onAnimationStart,
      onAnimationEnd,
      style,
      ...restProps
    } = this.props;
    const finalStyle = {
      backgroundColor: layerColors[0],
      ...style,
    };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${box} ${box}`}
        preserveAspectRatio="none"
        style={finalStyle}
        {...restProps}
      >
        {paths.map(({ key, path, fill }) => (
          <path key={key} d={path} fill={fill} />
        ))}
      </svg>
    );
  }
}
