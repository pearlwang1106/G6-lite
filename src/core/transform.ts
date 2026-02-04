export class TransformManager {
  private scale: number = 1;
  private tx: number = 0;
  private ty: number = 0;
  private minScale: number = 0.5;
  private maxScale: number = 5;

  public getTransform() {
    return { scale: this.scale, tx: this.tx, ty: this.ty };
  }

  public zoom(factor: number, centerX?: number, centerY?: number): void {
    const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * factor));
    
    if (centerX !== undefined && centerY !== undefined) {
      // 保持缩放中心点
      this.tx -= centerX * (newScale - this.scale) / this.scale;
      this.ty -= centerY * (newScale - this.scale) / this.scale;
    }
    
    this.scale = newScale;
  }

  public pan(dx: number, dy: number): void {
    this.tx += dx;
    this.ty += dy;
  }

  public reset(): void {
    this.scale = 1;
    this.tx = 0;
    this.ty = 0;
  }
}
