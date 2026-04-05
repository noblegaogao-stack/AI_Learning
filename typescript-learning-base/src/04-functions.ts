/**
 * TypeScript 函数示例
 * 
 * 本文件展示了 TypeScript 中函数的各种用法，包括：
 * 1. 基本函数定义
 * 2. 函数类型
 * 3. 可选参数和默认参数
 * 4. 剩余参数
 * 5. 重载
 * 6. 箭头函数
 * 7. 函数作为参数
 * 8. 函数作为返回值
 * 9. 匿名函数
 * 10. 立即执行函数表达式 (IIFE)
 */

// 1. 基本函数定义
// 函数声明
function add(x: number, y: number): number {
  return x + y;
}

// 函数表达式
const subtract = function(x: number, y: number): number {
  return x - y;
};

console.log('基本函数定义 - add:', add(10, 5));
console.log('基本函数定义 - subtract:', subtract(10, 5));

// 2. 函数类型
// 定义函数类型
let myAdd: (x: number, y: number) => number;

// 赋值
myAdd = function(x: number, y: number): number {
  return x + y;
};

console.log('函数类型:', myAdd(20, 10));

// 3. 可选参数和默认参数
// 可选参数使用 ? 标记
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

// 默认参数
function buildNameWithDefault(firstName: string, lastName: string = 'Smith'): string {
  return `${firstName} ${lastName}`;
}

console.log('可选参数:', buildName('John'));
console.log('可选参数 with lastName:', buildName('John', 'Doe'));
console.log('默认参数:', buildNameWithDefault('John'));
console.log('默认参数 with custom lastName:', buildNameWithDefault('John', 'Doe'));

// 4. 剩余参数
// 剩余参数使用 ... 标记
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log('剩余参数:', sum(1, 2, 3, 4, 5));

// 5. 重载
// 函数重载允许一个函数根据参数类型和数量有不同的实现
function padLeft(value: string, padding: number): string;
function padLeft(value: string, padding: string): string;
function padLeft(value: string, padding: any): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value;
  } else {
    return padding + value;
  }
}

console.log('重载 - number padding:', padLeft('Hello', 5));
console.log('重载 - string padding:', padLeft('Hello', '---'));

// 6. 箭头函数
// 箭头函数提供了更简洁的语法，并且继承了上下文的 this
const multiply = (x: number, y: number): number => x * y;

console.log('箭头函数:', multiply(10, 5));

// 箭头函数与 this
class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // 使用箭头函数避免 this 绑定问题
  greet = () => {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  };
}

const person = new Person('John', 30);
person.greet();

// 7. 函数作为参数
function processArray(arr: number[], callback: (num: number) => number): number[] {
  return arr.map(callback);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (num) => num * 2);
console.log('函数作为参数:', doubled);

// 8. 函数作为返回值
function createMultiplier(factor: number): (num: number) => number {
  return (num: number) => num * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log('函数作为返回值 - double:', double(5));
console.log('函数作为返回值 - triple:', triple(5));

// 9. 匿名函数
// 匿名函数没有名称，通常作为参数传递
const numbers2 = [1, 2, 3, 4, 5];
const squared = numbers2.map(function(num) {
  return num * num;
});
console.log('匿名函数:', squared);

// 10. 立即执行函数表达式 (IIFE)
// IIFE 是一种在定义后立即执行的函数
const result = (function(x: number, y: number): number {
  return x + y;
})(10, 20);

console.log('IIFE:', result);

// 11. 递归函数
function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log('递归函数 - factorial(5):', factorial(5));

// 12. 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

console.log('泛型函数:', identity<string>('Hello'), identity<number>(42));
