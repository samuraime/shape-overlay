import React, { Component } from 'react';
import ShapeOverlay from '../dist/index';

export default class App extends Component {
  state = {
    open: null,
    toggleable: true,
  }

  handleToggle = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
      toggleable: false,
    });
  }

  handleAnimationStart = (event) => {
    console.log(event.type);
  }

  handleAnimationEnd = (event) => {
    console.log(event.type);
    this.setState({
      toggleable: true,
    });
  }

  render() {
    const { open, toggleable } = this.state;
    const shapeFunction = (x) => {
      const range = 4 * Math.random() + 6;
      const radian = x * Math.PI;
      return (Math.sin(-radian) + Math.sin(-radian * range) + 2) / 4;
    };

    return (
      <div>
        <ShapeOverlay
          open={open}
          width="100vw"
          height="100vh"
          layerDelay={100}
          layerCount={3}
          layerColors={['hsl(0, 0%, 0%)', 'hsl(0, 0%, 20%)', 'hsl(0, 0%, 40%)']}
          pointCount={30}
          duration={1000}
          timingFunction="cubicInOut"
          shapeFunction={shapeFunction}
          shapeRatio={0.3}
          onAnimationStart={this.handleAnimationStart}
          onAnimationEnd={this.handleAnimationEnd}
        />
        <button
          type="button"
          onClick={this.handleToggle}
          disabled={!toggleable}
          style={{
            position: 'absolute',
            right: 50,
            top: 50,
            width: 50,
            height: 50,
            borderRadius: '50%',
          }}
        >
          Toggle
        </button>
      </div>
    );
  }
}
