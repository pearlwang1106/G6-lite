import { Graph } from '../src/index';

/**
 * 基础使用示例
 * 展示如何创建一个简单的图和基本配置
 */

// 1. 创建图数据
const graphData = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
    { id: 'node4', label: 'Node 4' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
    { source: 'node3', target: 'node4' },
    { source: 'node1', target: 'node4' },
  ],
};

// 2. 初始化图实例
const graph = new Graph({
  container: 'graph-container',
  data: graphData,
  animation: false,
  // 基础样式配置
  node: {
    style: {
      fill: '#1890ff',
      stroke: '#096dd9',
    },
    state: {
      highlight: {
        fill: '#FF5733',
      },
      dim: {
        fillOpacity: 0.3,
      },
    },
  },
  edge: {
    style: {
      stroke: '#ccc',
      endArrow: true,
    },
    state: {
      highlight: {
        stroke: '#FF5733',
        strokeWidth: 2,
      },
      dim: {
        strokeOpacity: 0.1,
      },
    },
  },
});

// 3. 获取图数据
const currentData = graph.getData();
console.log('Current graph data:', currentData);

// 4. 更新图数据（添加新节点）
graph.updateData({
  nodes: [
    ...currentData.nodes,
    { id: 'node5', label: 'Node 5' },
  ],
  edges: [
    ...currentData.edges,
    { source: 'node4', target: 'node5' },
  ],
});

console.log('Graph initialized successfully!');
