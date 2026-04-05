# TypeScript 学习项目

## 项目结构

```
typescript-learning-project/
├── package.json          # 项目配置和脚本
├── tsconfig.json         # TypeScript 编译配置
├── src/                  # 示例文件目录
│   ├── 01-basic-types.ts                 # 基础类型
│   ├── 02-interfaces.ts                  # 接口
│   ├── 03-classes.ts                     # 类
│   ├── 04-functions.ts                   # 函数
│   ├── 05-generics.ts                    # 泛型
│   ├── 06-type-aliases-unions-intersections.ts  # 类型别名、联合类型和交叉类型
│   ├── 07-modules.ts                     # 模块
│   ├── 08-decorators.ts                  # 装饰器
│   ├── 09-advanced-types.ts              # 高级类型
│   └── 10-simple-interoperability.ts     # TypeScript 与 JavaScript 互操作性
└── dist/                 # 编译输出目录
```

## 如何运行示例

### 方法 1：使用 tsc 编译后运行

1. 编译 TypeScript 文件：
   ```bash
   npx tsc src/01-basic-types.ts --outDir dist --ignoreConfig
   ```

2. 运行编译后的 JavaScript 文件：
   ```bash
   node dist/01-basic-types.js
   ```

### 方法 2：使用 ts-node 直接运行

```bash
npx ts-node src/01-basic-types.ts
```

### 方法 3：使用 npm 脚本运行

```bash
npm run run:basic-types
npm run run:interfaces
npm run run:classes
# 以此类推...
```

## 示例文件内容概述

1. **01-basic-types.ts**：基础类型
   - boolean、number、string、array、tuple、enum、any、void、null/undefined、never、object 类型

2. **02-interfaces.ts**：接口
   - 基本定义、可选属性、只读属性、函数类型、可索引类型、类实现、继承、混合类型

3. **03-classes.ts**：类
   - 继承、访问修饰符（public/private/protected）、readonly、getters/setters、静态属性、抽象类、接口实现

4. **04-functions.ts**：函数
   - 基本定义、函数类型、可选参数/默认参数、剩余参数、函数重载、箭头函数、函数作为参数/返回值、匿名函数、IIFE、递归、泛型函数

5. **05-generics.ts**：泛型
   - 泛型函数、泛型类型、泛型类、泛型约束、默认泛型类型、工具类型（Partial、Readonly、Record、Pick、Omit）、高级泛型技巧

6. **06-type-aliases-unions-intersections.ts**：类型别名、联合类型和交叉类型
   - 类型别名、联合类型、交叉类型、字面量类型、类型守卫（typeof/instanceof）、类型断言、高级类型（判别式联合）

7. **07-modules.ts**：模块
   - 导出/导入、命名导出/默认导出、重新导出、模块解析、路径映射、动态导入、实际模块使用

8. **08-decorators.ts**：装饰器
   - 类装饰器、方法装饰器、属性装饰器、参数装饰器、装饰器工厂、装饰器组合、元数据、实际示例（计时、缓存、依赖注入）

9. **09-advanced-types.ts**：高级类型
   - 映射类型、条件类型、模板字面量类型、索引类型、递归类型、类型推断、实际类型（DeepReadonly、DeepPartial）

10. **10-simple-interoperability.ts**：TypeScript 与 JavaScript 互操作性
    - TypeScript 与 JavaScript 集成、类型声明文件、项目构建/部署、性能优化

## 项目配置

- **package.json**：包含了项目依赖和运行脚本
- **tsconfig.json**：包含了 TypeScript 编译配置，启用了装饰器支持和其他必要选项

## 学习建议

1. **按顺序学习**：从基础类型开始，逐步学习更复杂的概念
2. **运行示例**：每个示例文件都可以独立运行，观察输出结果
3. **修改代码**：尝试修改示例代码，看看会发生什么
4. **查阅文档**：遇到不理解的概念时，查阅 TypeScript 官方文档
5. **实践应用**：将所学知识应用到实际项目中

通过这个项目，你可以系统地学习 TypeScript 的所有核心概念，从基础到高级，最终成为一名 TypeScript 高级开发者。

祝你学习愉快！
