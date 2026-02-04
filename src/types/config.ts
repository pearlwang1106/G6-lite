export interface NodeStyle {
  fill?: string;
  stroke?: string;
  [key: string]: any;
}

export interface EdgeStyle {
  stroke?: string;
  endArrow?: boolean;
  [key: string]: any;
}

export interface StateStyle {
  [state: string]: any;
}

export interface NodeConfig {
  style?: NodeStyle;
  state?: {
    [stateName: string]: StateStyle;
  };
}

export interface EdgeConfig {
  style?: EdgeStyle;
  state?: {
    [stateName: string]: StateStyle;
  };
}

export interface BehaviorConfig {
  key?: string;
  type: string;
  [key: string]: any;
}

export interface TransformConfig {
  type: string;
  [key: string]: any;
}

export interface GraphConfig {
  container: string | HTMLElement;
  data: GraphData;
  behaviors?: (string | BehaviorConfig)[];
  node?: NodeConfig;
  edge?: EdgeConfig;
  animation?: boolean;
  transforms?: (string | TransformConfig)[];
  [key: string]: any;
}
