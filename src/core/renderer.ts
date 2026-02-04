import type { GraphData } from '../types';

export class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private hoveredNodeId: string | null = null;

  constructor(container: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.display = 'block';
    container.appendChild(this.canvas);
    this.gl = this.canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true }) as WebGLRenderingContext;
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.program = this.createProgram();
  }

  private createProgram(): WebGLProgram {
    const vertexShaderSource = `
      attribute vec2 position;
      uniform mat4 projection;
      
      void main() {
        gl_Position = projection * vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec4 color;
      
      void main() {
        gl_FragColor = color;
      }
    `;

    const vertexShader = this.compileShader(vertexShaderSource, this.gl.VERTEX_SHADER);
    const fragmentShader = this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
    
    const program = this.gl.createProgram() as WebGLProgram;
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    return program;
  }

  private compileShader(source: string, type: number): WebGLShader {
    const shader = this.gl.createShader(type) as WebGLShader;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  public setHoveredNode(nodeId: string | null): void {
    this.hoveredNodeId = nodeId;
  }

  private getProjectionMatrix(width: number, height: number, transform: any): number[] {
    const scale = transform.scale || 1;
    const tx = transform.tx || 0;
    const ty = transform.ty || 0;

    return [
      (2 * scale) / width, 0, 0, 0,
      0, (-2 * scale) / height, 0, 0,
      0, 0, 1, 0,
      -1 + (2 * tx) / width, 1 - (2 * ty) / height, 0, 1
    ];
  }

  public resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  public render(data: GraphData, transform: any = { scale: 1, tx: 0, ty: 0 }): void {
    this.gl.clearColor(1, 1, 1, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    const projection = this.getProjectionMatrix(this.canvas.width, this.canvas.height, transform);

    // 绘制边
    if (data && data.edges) {
      data.edges.forEach(edge => {
        this.drawEdge(edge, data.nodes, projection);
      });
    }

    // 绘制节点
    if (data && data.nodes) {
      data.nodes.forEach(node => {
        const isHovered = this.hoveredNodeId === node.id;
        this.drawNode(node, projection, isHovered);
      });
    }
  }

  private drawNode(node: any, projection: number[], isHovered: boolean = false): void {
    const x = node.x || 0;
    const y = node.y || 0;
    const radius = isHovered ? 15 : 10;
    const segments = 64;

    const positions: number[] = [x, y];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      positions.push(x + Math.cos(angle) * radius);
      positions.push(y + Math.sin(angle) * radius);
    }

    const color = isHovered ? [0.0, 0.4, 1.0, 1.0] : [0.098, 0.557, 1.0, 1.0];
    this.drawBuffer(positions, projection, color, this.gl.TRIANGLE_FAN);

    // 绘制节点边框
    if (isHovered) {
      const borderPositions: number[] = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        borderPositions.push(x + Math.cos(angle) * radius);
        borderPositions.push(y + Math.sin(angle) * radius);
      }
      this.drawBuffer(borderPositions, projection, [0.0, 0.2, 0.8, 1.0], this.gl.LINE_LOOP);
    }
  }

  private drawEdge(edge: any, nodes: any[], projection: number[]): void {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    if (sourceNode && targetNode) {
      const positions = [sourceNode.x, sourceNode.y, targetNode.x, targetNode.y];
      this.drawBuffer(positions, projection, [0.6, 0.6, 0.6, 1.0], this.gl.LINE_STRIP);
    }
  }

  private drawBuffer(positions: number[], projection: number[], color: number[], mode: number): void {
    this.gl.useProgram(this.program);

    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    const positionLoc = this.gl.getAttribLocation(this.program, 'position');
    this.gl.enableVertexAttribArray(positionLoc);
    this.gl.vertexAttribPointer(positionLoc, 2, this.gl.FLOAT, false, 0, 0);

    const projLoc = this.gl.getUniformLocation(this.program, 'projection');
    this.gl.uniformMatrix4fv(projLoc, false, new Float32Array(projection));

    const colorLoc = this.gl.getUniformLocation(this.program, 'color');
    this.gl.uniform4fv(colorLoc, new Float32Array(color));

    this.gl.drawArrays(mode, 0, positions.length / 2);
  }
}
