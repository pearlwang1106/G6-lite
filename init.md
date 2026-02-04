## 背景
AntV 经过多年迭代，已经形成了 2、6、7、8 四个方向，其中 6 代表着六度空间理论，用来做图数据的分析和可视化，其中 G6 是用于做图分析，X6 用于做图编辑。

中间在架构设计中，出现一些遗留问题，G 层为了统一 AntV 底层渲染，并且抹平 Canvas、SVG、WebGL 的能力差异，导致上层的 G2、G6 的性能上退化很多。而对于 G2 来说，性能下降带来的影响远小于 G6。

具体表现就是 G6 5.x 版本性能上相比 G6 4.x 有 50% 的性能降幅，对于大数据量，甚至卡死。可以 GitHub issue 中搜索一下。#7566

## 技术方案
性能问题主要的原因：

1. G 在架构上追求的太多，导致的损耗和累赘
2. G6 在可视化 UI 能力上过于灵活，导致 DOM 结构复杂，渲染元素翻倍，到来性能的降低

考虑到历史问题除了难解决之外，解决也会带来很大的 break change，而且 AntV 在 WebGL 技术上的探索和储备相对来说还不够。所以建议方案：

完全基于 WebGL 技术，构建一个轻量的、高性能的渲染引擎，为海量图数据的分析提供可视化能力。

- 定位：A lite Graph Visualization Framework in TypeScript based on Webgl.

## API 设计

和 antv/G6 保持类似的 API 设计，方便用户迁移和使用。

## 基本使用

下面是一个例子，期望使用方式和 G6 保持类似：
import { Graph } from '@antv/g6-lite';

const graph = new Graph({
  container: containerId,
  data: { ...value?.graphData },
  behaviors: [
    'zoom-canvas',
    {
      key: 'drag-canvas', //交互 key，即唯一标识
      type: 'drag-canvas',
    },
    'drag-element',
    'click-select',
    {
      type: 'hover-activate',
      degree: 1,
      state: 'highlight',
      inactiveState: 'dim',
      enable: true,
      key: 'hover-activate',
      direction: 'out',
    },
    'auto-adapt-label',
    {
      type: 'optimize-viewport-transform',
    },
  ],
  node: {
    state: {
      highlight: {
        fill: '#FF5733',
      },
    },
  },
  edge: {
    style: {
      labelBackgroundFill: '#FFF',
      labelBackground: true,
      endArrow: true,
      endArrowOpacity: 1,
    },
    state: {
      highlight: {
        stroke: '#FF5733',
      },
      dim: {
        strokeOpacity: 0.05,
        endArrowOpacity: 0.05,
      },
    },
  },
  animation: false,
  transforms: [
    'process-parallel-edges',
    {
      type: 'map-node-size',
      scale: 'linear',
      maxSize: 60,
      minSize: 20,
      mapLabelSize: [12, 24],
    },
  ],
});


## 核心考虑的点

- 开源技术库的架构和 API 设计封装（数据处理、布局算法、渲染流程、交互逻辑）
- WebGL、WebGPU 高新能的布局和渲染
