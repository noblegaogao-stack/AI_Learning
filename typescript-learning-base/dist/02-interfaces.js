"use strict";
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
// 使用接口
function greet(person) {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
}
const user = {
    name: 'John',
    age: 30
};
console.log('基本接口:', greet(user));
function createSquare(config) {
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
const p1 = { x: 10, y: 20 };
// p1.x = 5; // 错误，x 是只读属性
console.log('只读属性:', p1);
const search = (source, subString) => {
    return source.includes(subString);
};
console.log('函数类型接口:', search('Hello World', 'World'));
const myArray = ['Bob', 'Fred'];
console.log('数字索引签名:', myArray[0]);
const myDict = {
    'apple': 1,
    'banana': 2
};
console.log('字符串索引签名:', myDict['apple']);
class Clock {
    constructor() {
        this.currentTime = new Date();
    }
    setTime(d) {
        this.currentTime = d;
    }
}
const clock = new Clock();
console.log('类类型接口 - 当前时间:', clock.currentTime);
clock.setTime(new Date(2023, 11, 25));
console.log('类类型接口 - 设置后时间:', clock.currentTime);
const square = {
    color: 'red',
    penWidth: 2,
    sideLength: 10
};
console.log('接口继承:', square);
function createCounter() {
    const counter = ((start) => `Counting from ${start}`);
    counter.interval = 1000;
    counter.reset = () => console.log('Counter reset');
    return counter;
}
const c = createCounter();
console.log('混合类型接口 - 函数调用:', c(10));
console.log('混合类型接口 - 属性访问:', c.interval);
c.reset();
