export class BehaviorManager {
  private behaviors: Map<string, any> = new Map();
  private callbacks: Map<string, Function[]> = new Map();

  public register(behavior: any): void {
    this.behaviors.set(behavior.name, behavior);
  }

  public on(event: string, callback: Function): void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);
  }

  public emit(event: string, data: any): void {
    const callbacks = this.callbacks.get(event) || [];
    callbacks.forEach(cb => cb(data));
  }

  public getNodeAtPosition(x: number, y: number, nodes: any[]): any | null {
    for (const node of nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= 10) {
        return node;
      }
    }
    return null;
  }
}
