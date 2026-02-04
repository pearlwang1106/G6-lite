export interface ToolbarConfig {
  container: HTMLElement;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
}

export class Toolbar {
  private container: HTMLElement;
  private toolbarEl: HTMLElement;
  private callbacks: {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
    onFullscreen: () => void;
  };

  constructor(config: ToolbarConfig) {
    this.container = config.container;
    this.callbacks = {
      onZoomIn: config.onZoomIn,
      onZoomOut: config.onZoomOut,
      onReset: config.onReset,
      onFullscreen: config.onFullscreen,
    };
    this.toolbarEl = this.create();
  }

  private create(): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'g6-toolbar';
    toolbar.innerHTML = `
      <button class="g6-toolbar-btn g6-zoom-in" title="放大">
        <span>+</span>
      </button>
      <button class="g6-toolbar-btn g6-zoom-out" title="缩小">
        <span>−</span>
      </button>
      <button class="g6-toolbar-btn g6-reset" title="复原">
        <span>↺</span>
      </button>
      <button class="g6-toolbar-btn g6-fullscreen" title="全屏">
        <span>⛶</span>
      </button>
    `;

    // 绑定事件
    toolbar.querySelector('.g6-zoom-in')!.addEventListener('click', () => this.callbacks.onZoomIn());
    toolbar.querySelector('.g6-zoom-out')!.addEventListener('click', () => this.callbacks.onZoomOut());
    toolbar.querySelector('.g6-reset')!.addEventListener('click', () => this.callbacks.onReset());
    toolbar.querySelector('.g6-fullscreen')!.addEventListener('click', () => this.callbacks.onFullscreen());

    this.container.appendChild(toolbar);
    this.applyStyles();

    return toolbar;
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .g6-toolbar {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 8px;
        background: rgba(255, 255, 255, 0.95);
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 10;
      }

      .g6-toolbar-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid #d9d9d9;
        background: #fff;
        color: #333;
        font-size: 16px;
        cursor: pointer;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .g6-toolbar-btn:hover {
        color: #1890ff;
        border-color: #1890ff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .g6-toolbar-btn:active {
        transform: scale(0.95);
      }

      .g6-toolbar-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  }

  public destroy(): void {
    this.toolbarEl.remove();
  }
}
