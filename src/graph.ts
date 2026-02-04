import type { GraphConfig, GraphData } from './types';
import { DataProcessor } from './core/data';
import { WebGLRenderer } from './core/renderer';
import { BehaviorManager } from './core/interaction';
import { TransformManager } from './core/transform';
import { Toolbar } from './ui/toolbar';
import { getContainer, getContainerSize } from './utils';

export class Graph {
  private config: GraphConfig;
  private container: HTMLElement;
  private dataProcessor: DataProcessor;
  private renderer: WebGLRenderer;
  private behaviorManager: BehaviorManager;
  private transformManager: TransformManager;
  private toolbar: Toolbar;
  private data: GraphData;
  private isFullscreen: boolean = false;

  constructor(config: GraphConfig) {
    this.config = config;
    this.container = getContainer(config.container);
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    
    // Initialize data structure with defaults
    const defaultData: GraphData = { nodes: [], edges: [] };
    const data = { ...defaultData, ...config.data };
    
    // Initialize core modules
    this.dataProcessor = new DataProcessor(data);
    this.renderer = new WebGLRenderer(this.container);
    this.behaviorManager = new BehaviorManager();
    this.transformManager = new TransformManager();

    // Initialize data structure
    this.data = {
      nodes: [],
      edges: [],
      ...config.data,
    };

    // Setup
    this.setupBehaviors();
    this.setupTransforms();
    this.setupToolbar();
    this.setupInteraction();
    this.resize();
    this.render();
  }

  private setupBehaviors(): void {
    const behaviors = this.config.behaviors || [];
    behaviors.forEach(behavior => {
      this.behaviorManager.register(behavior);
    });
  }

  private setupTransforms(): void {
    const transforms = this.config.transforms || [];
    transforms.forEach(transform => {
      this.transformManager.register(transform);
    });
  }

  private setupToolbar(): void {
    this.toolbar = new Toolbar({
      container: this.container,
      onZoomIn: () => this.handleZoomIn(),
      onZoomOut: () => this.handleZoomOut(),
      onReset: () => this.handleReset(),
      onFullscreen: () => this.handleFullscreen(),
    });
  }

  private handleZoomIn(): void {
    this.transformManager.zoom(1.2);
    this.render();
  }

  private handleZoomOut(): void {
    this.transformManager.zoom(0.8);
    this.render();
  }

  private handleReset(): void {
    this.transformManager.reset();
    this.render();
  }

  private handleFullscreen(): void {
    if (!this.isFullscreen) {
      const elem = this.container as any;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      this.isFullscreen = true;
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  private setupInteraction(): void {
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const transform = this.transformManager.getTransform();
      const worldX = (x - transform.tx) / transform.scale;
      const worldY = (y - transform.ty) / transform.scale;
      
      const hoveredNode = this.behaviorManager.getNodeAtPosition(worldX, worldY, this.data.nodes);
      this.renderer.setHoveredNode(hoveredNode ? hoveredNode.id : null);
      this.render();
    });

    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = this.container.getBoundingClientRect();
      const centerX = e.clientX - rect.left;
      const centerY = e.clientY - rect.top;
      
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      this.transformManager.zoom(factor, centerX, centerY);
      this.render();
    });

    let isPanning = false;
    let lastX = 0, lastY = 0;

    this.container.addEventListener('mousedown', (e) => {
      isPanning = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    this.container.addEventListener('mousemove', (e) => {
      if (isPanning) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        this.transformManager.pan(dx, dy);
        lastX = e.clientX;
        lastY = e.clientY;
        this.render();
      }
    });

    this.container.addEventListener('mouseup', () => {
      isPanning = false;
    });

    this.container.addEventListener('mouseleave', () => {
      isPanning = false;
    });
  }

  private resize(): void {
    const { width, height } = getContainerSize(this.container);
    this.renderer.resize(width, height);
  }

  private render(): void {
    const transform = this.transformManager.getTransform();
    this.renderer.render(this.data, transform);
  }

  public getData(): GraphData {
    return this.dataProcessor.getData();
  }

  public updateData(data: Partial<GraphData>): void {
    this.dataProcessor.updateData(data);
  }

  public addNode(node: any): void {
    this.data.nodes.push(node);
    this.dataProcessor.updateData({ nodes: this.data.nodes });
    this.render();
  }

  public addEdge(edge: any): void {
    this.data.edges.push(edge);
    this.dataProcessor.updateData({ edges: this.data.edges });
    this.render();
  }

  public setSize(size: [number, number]): void {
    const [width, height] = size;
    this.renderer.resize(width, height);
    this.render();
  }

  public destroy(): void {
    this.toolbar.destroy();
  }
}
