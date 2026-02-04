import { Graph } from './graph';

export class DataProcessor {
  validate(data: any) {
    // 提供默认的数据结构
    if (!data) {
      data = { nodes: [], edges: [] };
    }
    
    if (!data.nodes) {
      data.nodes = [];
    }
    
    if (!data.edges) {
      data.edges = [];
    }
    
    // ...existing validation code...
    return data;
  }
  
  // ...existing code...
}

// 在 Graph 初始化时提供默认数据结构
const graph = new Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  data: {
    nodes: [],
    edges: [],
  },
});