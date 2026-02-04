import { Graph } from '../src/index';

/**
 * 高级使用示例
 * 展示如何使用行为、转换和复杂的配置
 */

const graphData = {
  nodes: [
    { id: 'alice', label: 'Alice', size: 30 },
    { id: 'bob', label: 'Bob', size: 25 },
    { id: 'charlie', label: 'Charlie', size: 28 },
    { id: 'david', label: 'David', size: 22 },
    { id: 'eve', label: 'Eve', size: 26 },
  ],
  edges: [
    { source: 'alice', target: 'bob', weight: 5 },
    { source: 'alice', target: 'charlie', weight: 3 },
    { source: 'bob', target: 'david', weight: 4 },
    { source: 'charlie', target: 'eve', weight: 2 },
    { source: 'david', target: 'eve', weight: 6 },
  ],
};

// 创建图实例，配置行为和转换
const graph = new Graph({
  container: 'graph-container',
  data: graphData,
  animation: true,
  
  // 配置行为（交互）
  behaviors: [
    'zoom-canvas',           // 缩放画布
    {
      key: 'drag-canvas',
      type: 'drag-canvas',   // 拖拽画布
    },
    'drag-element',          // 拖拽元素
    'click-select',          // 点击选择
    {
      type: 'hover-activate',  // 悬停激活
      degree: 1,
      state: 'highlight',
      inactiveState: 'dim',
      enable: true,
      key: 'hover-activate',
      direction: 'out',
    },
    'auto-adapt-label',      // 自动适配标签
  ],

  // 节点配置
  node: {
    style: {
      fill: '#1890ff',
      stroke: '#096dd9',
      lineWidth: 2,
    },
    state: {
      highlight: {
        fill: '#FF5733',
        stroke: '#FF2E00',
        lineWidth: 3,
      },
      dim: {
        fillOpacity: 0.3,
        strokeOpacity: 0.3,
      },
      selected: {
        fill: '#FFD700',
        stroke: '#FFA500',
      },
    },
  },

  // 边配置
  edge: {
    style: {
      stroke: '#999',
      lineWidth: 1,
      endArrow: true,
      endArrowOpacity: 0.8,
      labelBackground: true,
      labelBackgroundFill: '#FFF',
    },
    state: {
      highlight: {
        stroke: '#FF5733',
        lineWidth: 2,
        endArrowOpacity: 1,
      },
      dim: {
        strokeOpacity: 0.1,
        endArrowOpacity: 0.1,
      },
      selected: {
        stroke: '#FFD700',
        lineWidth: 2,
      },
    },
  },

  // 数据转换
  transforms: [
    'process-parallel-edges',  // 处理平行边
    {
      type: 'map-node-size',
      scale: 'linear',
      maxSize: 60,
      minSize: 20,
      mapLabelSize: [12, 24],
    },
  ],
});

// 使用示例
console.log('=== Graph Initialization Demo ===');

// 1. 获取当前数据
const data = graph.getData();
console.log('Graph nodes count:', data.nodes.length);
console.log('Graph edges count:', data.edges.length);

// 2. 数据更新示例
const newNode = {
  id: 'frank',
  label: 'Frank',
  size: 24,
};

const newEdge = {
  source: 'eve',
  target: 'frank',
  weight: 3,
};

graph.updateData({
  nodes: [...data.nodes, newNode],
  edges: [...data.edges, newEdge],
});

console.log('Updated graph data successfully');

// 3. 模拟事件交互
setTimeout(() => {
  console.log('Graph ready for interaction');
}, 1000);
