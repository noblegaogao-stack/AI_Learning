/**
 * TypeScript 接口示例
 * 
 * 本文件展示了 TypeScript 中接口的各种用法，包括：
 * 1. 基本接口定义
 * 2. 可选属性
 * 3. 只读属性
 * 4. 函数类型接口
 * 5. 可索引类型接口
 * 6. 类类型接口
 * 7. 接口继承
 * 8. 混合类型接口
 */

// 1. 基本接口定义
// 接口定义了对象的结构，指定了对象应该包含哪些属性以及它们的类型
interface Person {
  name: string;
  age: number;
}

// 使用接口
function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

const user: Person = {
  name: 'John',
  age: 30
};

console.log('基本接口:', greet(user));

// 2. 可选属性
// 可选属性使用 ? 标记，表示该属性可以不存在
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const defaultConfig = {
    color: 'white',
    width: 100
  };
  // 合并默认配置和传入的配置
  const finalConfig = { ...defaultConfig, ...config };
  return {
    color: finalConfig.color,
    area: finalConfig.width * finalConfig.width
  };
}

const square1 = createSquare({ color: 'red' });
const square2 = createSquare({ width: 50 });
const square3 = createSquare({ color: 'blue', width: 200 });
console.log('可选属性:', square1, square2, square3);

// 3. 只读属性
// 只读属性使用 readonly 标记，表示该属性只能在对象创建时赋值
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 20 };
// p1.x = 5; // 错误，x 是只读属性
console.log('只读属性:', p1);

// 4. 函数类型接口
// 接口可以定义函数的类型，指定函数的参数类型和返回类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const search: SearchFunc = (source, subString) => {
  return source.includes(subString);
};

console.log('函数类型接口:', search('Hello World', 'World'));

// 5. 可索引类型接口
// 可索引类型接口定义了通过索引访问的类型，如数组或对象
// 数字索引签名
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ['Bob', 'Fred'];
console.log('数字索引签名:', myArray[0]);

// 字符串索引签名
interface Dictionary {
  [key: string]: number;
}

const myDict: Dictionary = {
  'apple': 1,
  'banana': 2
};
console.log('字符串索引签名:', myDict['apple']);

// 6. 类类型接口
// 接口可以定义类必须实现的方法和属性
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  
  setTime(d: Date): void {
    this.currentTime = d;
  }
}

const clock = new Clock();
console.log('类类型接口 - 当前时间:', clock.currentTime);
clock.setTime(new Date(2023, 11, 25));
console.log('类类型接口 - 设置后时间:', clock.currentTime);

// 7. 接口继承
// 接口可以继承其他接口，实现接口的组合
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

const square: Square = {
  color: 'red',
  penWidth: 2,
  sideLength: 10
};
console.log('接口继承:', square);

// 8. 混合类型接口
// 接口可以同时描述函数和对象的结构
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function createCounter(): Counter {
  const counter = ((start: number) => `Counting from ${start}`) as Counter;
  counter.interval = 1000;
  counter.reset = () => console.log('Counter reset');
  return counter;
}

const c = createCounter();
console.log('混合类型接口 - 函数调用:', c(10));
console.log('混合类型接口 - 属性访问:', c.interval);
c.reset();
