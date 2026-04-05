"use strict";
/**
 * TypeScript 与 JavaScript 互操作性、构建和部署示例
 *
 * 本文件展示了 TypeScript 中与 JavaScript 的互操作性，以及 TypeScript 项目的构建和部署，包括：
 * 1. TypeScript 与 JavaScript 的互操作性
 * 2. 类型声明文件
 * 3. 构建 TypeScript 项目
 * 4. 部署 TypeScript 项目
 * 5. 性能优化
 */
// 1. TypeScript 与 JavaScript 的互操作性
// TypeScript 可以与 JavaScript 无缝集成
// 导入 JavaScript 模块
// 假设我们有一个 JavaScript 文件：
/*
// utils.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
*/
// 在 TypeScript 中导入
// import { add } from './utils';
// 2. 类型声明文件
// 类型声明文件以 .d.ts 结尾，用于为 JavaScript 代码提供类型信息
// 示例：为第三方库创建类型声明文件
/*
// types/lodash.d.ts
declare module 'lodash' {
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options?: {
      leading?: boolean;
      trailing?: boolean;
      maxWait?: number;
    }
  ): (...args: Parameters<T>) => void;
  
  export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options?: {
      leading?: boolean;
      trailing?: boolean;
    }
  ): (...args: Parameters<T>) => void;
}
*/
// 3. 构建 TypeScript 项目
// 构建命令
// tsc
// 构建配置（tsconfig.json）
/*
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/ 
    * "],;
"exclude";
["node_modules", "dist"];
    * /;
// 4. 部署 TypeScript 项目
// 部署步骤：
// 1. 构建 TypeScript 代码：tsc
// 2. 打包（可选）：webpack, rollup, esbuild
// 3. 部署到服务器或云平台
// 5. 性能优化
// TypeScript 编译优化
// 1. 使用增量编译
/*
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}
*/
// 2. 使用 faster incremental checking
/*
{
  "compilerOptions": {
    "assumeChangesOnlyAffectDirectDependencies": true
  }
}
*/
// 3. 使用 esbuild 进行快速构建
// 安装：npm install esbuild --save-dev
// 构建命令：npx esbuild src/index.ts --bundle --outfile=dist/index.js --platform=node
// 6. 实际示例
// 示例 1：TypeScript 与 JavaScript 混合项目
// JavaScript 文件：utils.js
/*
// utils.js
function calculateTotal(prices) {
  return prices.reduce((total, price) => total + price, 0);
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

module.exports = { calculateTotal, formatCurrency };
*/
// TypeScript 文件：app.ts
/*
// app.ts
import { calculateTotal, formatCurrency } from './utils';

const prices = [10.99, 5.99, 3.99];
const total = calculateTotal(prices);
const formattedTotal = formatCurrency(total);

console.log('Total:', formattedTotal);
*/
// 示例 2：为 JavaScript 库添加类型声明
// 类型声明文件：utils.d.ts
/*
// utils.d.ts
declare module './utils' {
  export function calculateTotal(prices: number[]): number;
  export function formatCurrency(amount: number): string;
}
*/
// 7. 类型声明文件的使用
// 使用 @types 包
// npm install @types/node --save-dev
// npm install @types/lodash --save-dev
// 自定义类型声明
// 示例：为全局变量添加类型声明
/*
// types/global.d.ts
declare global {
  interface Window {
    __APP_VERSION__: string;
    ga: (command: string, ...args: any[]) => void;
  }
}

export {}
*/
// 8. 构建工具集成
// 与 webpack 集成
/*
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
*/
// 与 rollup 集成
/*
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [typescript()]
};
*/
// 9. 部署到不同环境
// 部署到 Node.js 服务器
// 1. 构建：tsc
// 2. 启动：node dist/index.js
// 部署到浏览器
// 1. 构建：tsc 或使用 webpack/rollup
// 2. 将构建产物部署到静态文件服务器
// 部署到云平台
// 1. 构建：tsc
// 2. 部署到 Heroku, AWS, Azure, Google Cloud 等
// 10. 性能优化技巧
// 1. 使用类型别名和接口减少重复类型定义
// 2. 合理使用泛型，避免过度泛型化
// 3. 使用 const 断言减少类型推断开销
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 10000
};
// 4. 使用模块化设计，减少循环依赖
// 5. 优化导入，只导入需要的模块
// 好的做法：import { debounce } from 'lodash';
// 不好的做法：import * as _ from 'lodash';
// 6. 使用 tree-shaking 移除未使用的代码
// 7. 优化编译选项
/*
{
  "compilerOptions": {
    "target": "ES2020", // 选择合适的目标环境
    "module": "esnext", // 使用现代模块系统
    "moduleResolution": "node", // 使用 Node.js 模块解析
    "esModuleInterop": true, // 启用 ES 模块互操作性
    "skipLibCheck": true, // 跳过库类型检查
    "forceConsistentCasingInFileNames": true, // 强制一致的文件名大小写
    "noEmit": false, // 生成输出文件
    "declaration": true, // 生成类型声明文件
    "sourceMap": false, // 在生产环境中禁用 source map
    "removeComments": true, // 移除注释
    "noImplicitAny": true, // 禁用隐式 any 类型
    "strict": true // 启用所有严格类型检查
  }
}
*/
// 11. 实际运行示例
// 示例：TypeScript 与 JavaScript 互操作
// 假设我们有一个 JavaScript 文件：
/*
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
*/
// TypeScript 文件：index.ts
/*
// index.ts
import { add, subtract } from './math';

console.log('Add:', add(10, 5));
console.log('Subtract:', subtract(10, 5));
*/
// 构建和运行
// 1. 编译：tsc
// 2. 运行：node dist/index.js
// 12. 类型声明文件的创建和使用
// 示例：创建类型声明文件
// math.d.ts
/*
declare module './math' {
  export function add(a: number, b: number): number;
  export function subtract(a: number, b: number): number;
}
*/
// 13. 构建工具的使用
// 示例：使用 esbuild 快速构建
// 安装：npm install esbuild --save-dev
// 构建命令：npx esbuild src/index.ts --bundle --outfile=dist/index.js --platform=node
// 14. 部署示例
// 示例：部署到 Heroku
/*
// package.json
{
  "name": "typescript-app",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.0.0",
    "ts-node": "^10.0.0"
  }
}
*/
// 15. 性能优化示例
// 示例：使用 const 断言
const colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff'
};
// 类型推断为：
// {
//   readonly red: "#ff0000";
//   readonly green: "#00ff00";
//   readonly blue: "#0000ff";
// }
// 示例：优化导入
// import { debounce } from 'lodash';
// const debouncedFunction = debounce(() => {
//   console.log('Debounced function called');
// }, 1000);
// 16. 总结
// TypeScript 与 JavaScript 的互操作性使得我们可以：
// 1. 逐步将 JavaScript 项目迁移到 TypeScript
// 2. 在 TypeScript 项目中使用 JavaScript 库
// 3. 为 JavaScript 库添加类型声明，提高代码安全性
// 构建和部署 TypeScript 项目的最佳实践：
// 1. 使用合适的构建工具（tsc, webpack, rollup, esbuild）
// 2. 优化编译选项，提高构建速度和运行性能
// 3. 合理使用类型声明文件，提高代码安全性
// 4. 部署前进行充分的测试，确保代码质量
console.log('TypeScript 与 JavaScript 互操作性、构建和部署示例');
console.log('colors:', colors);
