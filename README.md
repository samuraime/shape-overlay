# ShapeOverlay

@[ykob](https://github.com/ykob) [shape-overlays](https://github.com/ykob/shape-overlays) React 实现

## Install

```sh
npm install shape-overlay --save
```

## Usage

```jsx
import react from 'react';
import ShapeOverlay from 'shape-overlay';

export default function TestComponent() {
  return (
    <ShapeOverlay open />
  );
}
```

## API

| Props | Type | Default | Description |
| :---: | :--: | :-----: | ----------- |
| open | `boolean` | null | 声明式打开或者关闭动画层. 动画正在进行时改变此属性不会生效 |
| pointCount | `number` | 15 | 每层的节点个数 |
| duration | `number` | 600 | 单层动画完成时间, 总完成时间约为 duration + delayPerLayer * layerCount + duration * shapeRatio |
| timingFunction | `enum` | cubicInOut | 动画函数, exponentialIn, exponentialOut, exponentialInOut, sineOut, circularInOut, cubicIn, cubicOut, cubicInOut, quadraticOut, quarticOut |
| shapeFunction | `function` | | 曲线节点位置函数, (xPosition) => number. 输入, 返回值∈[0, 1]. 默认函数x => (Math.sin(x * 8 * Math.PI) + 1) / 2 |
| shapeRatio | `number` | 0.3 | 遮罩曲线图形部分占图层最大比例 |
| layerCount | `number` | 1 | 层数 |
| layerColors | `string[]` | [] | 每层的颜色 |
| layerDelay | `number` | 100 | 每层展示延迟(millisecond) |
| onAnimationStart | `function` | null | 动画开始事件 |
| onAnimationEnd | `function` | null | 动画结束事件 |

Note: 动画进行中不要修改props. 勿谓言之不预也.

## License

[MIT](LICENSE)
