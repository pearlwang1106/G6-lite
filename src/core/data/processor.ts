import type { GraphData } from '../../types';

export class DataProcessor {
  private data: GraphData;

  constructor(data: GraphData) {
    this.data = this.validate(data);
  }

  private validate(data: GraphData | undefined): GraphData {
    // 提供默认值
    if (!data) {
      data = { nodes: [], edges: [] };
    }

    if (!data.nodes || !Array.isArray(data.nodes)) {
      data.nodes = [];
    }
    if (!data.edges || !Array.isArray(data.edges)) {
      data.edges = [];
    }
    return data;
  }

  public getData(): GraphData {
    return this.data;
  }

  public updateData(data: Partial<GraphData>): void {
    if (data.nodes) this.data.nodes = data.nodes;
    if (data.edges) this.data.edges = data.edges;
  }
}
