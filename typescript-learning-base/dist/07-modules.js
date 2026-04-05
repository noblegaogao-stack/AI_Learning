"use strict";
/**
 * TypeScript 模块示例
 *
 * 本文件展示了 TypeScript 中模块的各种用法，包括：
 * 1. 基本模块导出和导入
 * 2. 命名导出和默认导出
 * 3. 重新导出
 * 4. 模块解析
 * 5. 高级模块技巧
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.API_URL = void 0;
exports.getUser = getUser;
exports.default = greet;
exports.testModule = testModule;
// 首先，我们需要了解模块的基本概念：
// - 模块是自包含的代码单元
// - 模块可以导出值（变量、函数、类、类型等）
// - 模块可以导入其他模块导出的值
// 1. 基本模块导出和导入
// 假设我们有一个名为 math.ts 的文件：
/*
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
*/
// 然后我们可以在另一个文件中导入这些函数：
/*
// app.ts
import { add, subtract } from './math';

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
*/
// 2. 命名导出和默认导出
// 命名导出示例：
/*
// utils.ts
export const PI = 3.14159;

export function calculateArea(radius: number): number {
  return PI * radius * radius;
}

export class Circle {
  constructor(private radius: number) {}
  
  getArea(): number {
    return calculateArea(this.radius);
  }
}
*/
// 默认导出示例：
/*
// logger.ts
export default function logger(message: string): void {
  console.log(`[LOG]: ${message}`);
}
*/
// 导入默认导出：
/*
// app.ts
import logger from './logger';

logger('Hello, TypeScript!');
*/
// 3. 重新导出
// 重新导出示例：
/*
// index.ts
export * from './math';
export * from './utils';
export { default as logger } from './logger';
*/
// 4. 模块解析
// TypeScript 支持两种模块解析策略：
// - Node.js 解析策略（CommonJS）
// - Classic 解析策略
// Node.js 解析策略示例：
/*
// 导入本地模块
import { add } from './math';

// 导入第三方模块
import * as _ from 'lodash';

// 导入内置模块
import * as fs from 'fs';
*/
// 5. 高级模块技巧
// 命名空间与模块
// 注意：在现代 TypeScript 中，推荐使用模块而不是命名空间
// 模块路径映射
// 可以在 tsconfig.json 中配置路径映射，简化导入路径：
/*
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
*/
// 然后可以这样导入：
/*
import { add } from '@/math';
*/
// 动态导入
// 动态导入允许我们在运行时按需导入模块
async function loadModule() {
    // 动态导入 math 模块
    const math = await Promise.resolve().then(() => __importStar(require('./math')));
    console.log('动态导入 - add:', math.add(10, 5));
    console.log('动态导入 - subtract:', math.subtract(10, 5));
}
// 导出一个变量
exports.API_URL = 'https://api.example.com';
// 导出一个函数
function getUser(id) {
    return {
        id: typeof id === 'string' ? parseInt(id) : id,
        name: `User ${id}`,
        email: `user${id}@example.com`
    };
}
// 导出一个类
class UserService {
    getUsers() {
        return [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ];
    }
}
exports.UserService = UserService;
// 导出默认值
function greet(user) {
    return `Hello, ${user.name}!`;
}
// 现在我们可以在其他文件中导入这些导出的内容
// 示例导入：
/*
// app.ts
import greet, { User, UserId, API_URL, getUser, UserService } from './07-modules';

// 使用默认导出
const user = { id: 1, name: 'John', email: 'john@example.com' };
console.log(greet(user));

// 使用命名导出
console.log('API URL:', API_URL);

const userId: UserId = '2';
const user2 = getUser(userId);
console.log('User:', user2);

const userService = new UserService();
console.log('Users:', userService.getUsers());
*/
// 7. 模块的循环依赖
// 循环依赖是指两个或多个模块相互依赖的情况
// 虽然 TypeScript 支持循环依赖，但应尽量避免，因为它会使代码难以理解和维护
// 示例：
/*
// A.ts
import { B } from './B';

export class A {
  constructor() {
    new B();
  }
}
*/
/*
// B.ts
import { A } from './A';

export class B {
  constructor() {
    // 注意：这里不能直接实例化 A，否则会导致无限递归
    // new A();
  }
}
*/
// 8. 模块的类型声明
// 对于没有 TypeScript 类型定义的第三方模块，我们可以创建类型声明文件
/*
// types/custom.d.ts
declare module 'some-third-party-library' {
  export function doSomething(): void;
  export const version: string;
}
*/
// 然后就可以在代码中导入并使用这个模块了
/*
import { doSomething, version } from 'some-third-party-library';

doSomething();
console.log('Version:', version);
*/
// 9. 模块的编译选项
// 在 tsconfig.json 中，我们可以配置模块相关的编译选项：
/*
{
  "compilerOptions": {
    "module": "commonjs", // 模块系统（commonjs, es2015, esnext 等）
    "moduleResolution": "node", // 模块解析策略
    "esModuleInterop": true, // 启用 ES 模块互操作性
    "allowSyntheticDefaultImports": true // 允许合成默认导入
  }
}
*/
// 10. 实际运行示例
// 为了演示模块的使用，我们创建一个简单的示例
// 导出的内容可以在其他文件中使用
console.log('模块示例文件已加载');
// 导出的函数可以在本文件中使用
function testModule() {
    console.log('测试模块功能');
    const user = getUser(1);
    console.log('获取用户:', user);
    console.log('问候用户:', greet(user));
}
// 调用测试函数
testModule();
