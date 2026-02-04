import type { BehaviorConfig } from '../../types';

export class BehaviorManager {
  private behaviors: Map<string, BehaviorConfig> = new Map();

  public register(config: string | BehaviorConfig): void {
    const behaviorConfig = typeof config === 'string' 
      ? { type: config, key: config }
      : { key: config.type, ...config };

    const key = behaviorConfig.key || behaviorConfig.type;
    this.behaviors.set(key, behaviorConfig);
  }

  public getBehaviors(): BehaviorConfig[] {
    return Array.from(this.behaviors.values());
  }
}
