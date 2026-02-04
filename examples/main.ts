import { Graph } from '../src/index';

const container = document.getElementById('container');

if (container) {
  const graph = new Graph({
    container,
    width: container.clientWidth,
    height: container.clientHeight,
  });

  // 添加节点
  graph.addNode({
    id: 'node-1',
    label: 'Node 1',
    x: 100,
    y: 100,
  });

  graph.addNode({
    id: 'node-2',
    label: 'Node 2',
    x: 300,
    y: 100,
  });

  // 添加边
  graph.addEdge({
    source: 'node-1',
    target: 'node-2',
  });

  // 渲染
  graph.render();

  // 处理窗口缩放
  window.addEventListener('resize', () => {
    graph.setSize([container.clientWidth, container.clientHeight]);
  });
}
