# G6-lite

A lightweight Graph Visualization Framework in TypeScript based on WebGL.

[English](#english) | [中文](#中文)

## 中文

### 简介

G6-lite 是一个基于 WebGL 的轻量级图可视化框架，提供高性能的图表渲染和灵活的交互体验。

### 特性

- 🚀 **高性能渲染** - 基于 WebGL 的硬件加速渲染
- 🎯 **丰富的交互** - 支持节点 hover、缩放、平移等交互
- 🛠️ **易用工具栏** - 内置放大、缩小、复原、全屏功能
- 📦 **TypeScript** - 完整的 TypeScript 支持
- 🎨 **灵活定制** - 支持自定义节点、边和样式

### 安装

```bash
npm install @antv/g6-lite
```

### 快速开始

```typescript
import { Graph } from '@antv/g6-lite';

// 创建容器
const container = document.getElementById('container');

// 初始化图
const graph = new Graph({
  container,
  width: container.clientWidth,
  height: container.clientHeight,
});

// 添加节点
graph.addNode({
  id: 'node-1',
  label: 'Node 1',
  x: 100,
  y: 100,
});

graph.addNode({
  id: 'node-2',
  label: 'Node 2',
  x: 300,
  y: 100,
});

// 添加边
graph.addEdge({
  source: 'node-1',
  target: 'node-2',
});

// 渲染
graph.render();
```

### API 文档

#### Graph 类

##### 构造函数

```typescript
constructor(config: GraphConfig)
```

**参数：**
- `container` - DOM 容器元素
- `width` - 画布宽度（可选）
- `height` - 画布高度（可选）
- `data` - 初始图数据（可选）
- `behaviors` - 交互行为配置（可选）
- `transforms` - 变换配置（可选）

##### 方法

**addNode(node)**
- 添加节点
- 参数：`{ id, label, x, y }`

**addEdge(edge)**
- 添加边
- 参数：`{ source, target }`

**getData()**
- 获取当前图数据
- 返回：`GraphData`

**updateData(data)**
- 更新图数据
- 参数：`Partial<GraphData>`

**setSize(size)**
- 设置画布大小
- 参数：`[width, height]`

**render()**
- 重新渲染画布

**destroy()**
- 销毁图实例

### 交互说明

| 操作 | 说明 |
|------|------|
| 鼠标滚轮 | 缩放画布 |
| 鼠标拖拽 | 平移画布 |
| 节点悬停 | 节点高亮显示 |
| 工具栏 (+) | 放大 |
| 工具栏 (−) | 缩小 |
| 工具栏 (↺) | 重置视图 |
| 工具栏 (⛶) | 全屏模式 |

### 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 预览 examples
npm run dev:examples

# 构建
npm run build

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 项目结构

```
src/
├── core/
│   ├── data/          # 数据处理
│   ├── renderer.ts    # WebGL 渲染器
│   ├── interaction.ts # 交互管理
│   └── transform.ts   # 变换管理
├── ui/
│   └── toolbar.ts     # 工具栏组件
├── types.ts           # 类型定义
├── utils.ts           # 工具函数
├── graph.ts           # 主图类
└── index.ts           # 入口文件
```

### 浏览器支持

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 许可证

MIT

---

## English

### Introduction

G6-lite is a lightweight graph visualization framework based on WebGL, providing high-performance chart rendering and flexible interactive experience.

### Features

- 🚀 **High Performance** - Hardware-accelerated rendering with WebGL
- 🎯 **Rich Interactions** - Support for node hover, zoom, pan, and more
- 🛠️ **Built-in Toolbar** - Zoom in, zoom out, reset, and fullscreen controls
- 📦 **TypeScript Support** - Full TypeScript support
- 🎨 **Flexible Customization** - Support for custom nodes, edges, and styles

### Installation

```bash
npm install @antv/g6-lite
```

### Quick Start

```typescript
import { Graph } from '@antv/g6-lite';

const container = document.getElementById('container');

const graph = new Graph({
  container,
  width: container.clientWidth,
  height: container.clientHeight,
});

graph.addNode({
  id: 'node-1',
  label: 'Node 1',
  x: 100,
  y: 100,
});

graph.addNode({
  id: 'node-2',
  label: 'Node 2',
  x: 300,
  y: 100,
});

graph.addEdge({
  source: 'node-1',
  target: 'node-2',
});

graph.render();
```

### API Reference

#### Graph Class

##### Constructor

```typescript
constructor(config: GraphConfig)
```

**Parameters:**
- `container` - DOM container element
- `width` - Canvas width (optional)
- `height` - Canvas height (optional)
- `data` - Initial graph data (optional)
- `behaviors` - Behavior configuration (optional)
- `transforms` - Transform configuration (optional)

##### Methods

**addNode(node)**
- Add a node
- Parameter: `{ id, label, x, y }`

**addEdge(edge)**
- Add an edge
- Parameter: `{ source, target }`

**getData()**
- Get current graph data
- Returns: `GraphData`

**updateData(data)**
- Update graph data
- Parameter: `Partial<GraphData>`

**setSize(size)**
- Set canvas size
- Parameter: `[width, height]`

**render()**
- Re-render the canvas

**destroy()**
- Destroy the graph instance

### Interactions

| Operation | Description |
|-----------|-------------|
| Mouse wheel | Zoom canvas |
| Mouse drag | Pan canvas |
| Node hover | Highlight node |
| Toolbar (+) | Zoom in |
| Toolbar (−) | Zoom out |
| Toolbar (↺) | Reset view |
| Toolbar (⛶) | Fullscreen mode |

### Development

```bash
npm install
npm run dev
npm run dev:examples
npm run build
npm run lint
npm run format
```

### License

MIT
