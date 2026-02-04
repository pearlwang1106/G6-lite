#!/bin/bash
cd /Users/pearl/Develop/G6-lite

# 创建 vite.config.ts
cat > vite.config.ts << 'EOFILE'
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  server: {
    port: 5173,
    open: '/examples/index.html',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'G6Lite',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'umd'}.js`
    }
  },
  plugins: [dts()]
});
EOFILE

# 更新 package.json 的 devDependencies
cat > package.json << 'EOFILE'
{
  "name": "@antv/g6-lite",
  "version": "1.0.0",
  "description": "A lite Graph Visualization Framework in TypeScript based on WebGL",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  },
  "keywords": ["graph", "visualization", "webgl", "antv"],
  "author": "AntV Team",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^1.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
EOFILE

echo "✅ Vite 配置创建完成！"
echo ""
echo "接下来运行以下命令："
echo "1. npm install          # 安装依赖"
echo "2. npm run dev          # 启动开发服务器"