import type { TransformConfig } from '../../../types';

export class TransformManager {
  private transforms: TransformConfig[] = [];

  public register(config: string | TransformConfig): void {
    const transformConfig = typeof config === 'string'
      ? { type: config }
      : config;

    this.transforms.push(transformConfig);
  }

  public getTransforms(): TransformConfig[] {
    return this.transforms;
  }
}
