"use strict";
/**
 * TypeScript 泛型示例
 *
 * 本文件展示了 TypeScript 中泛型的各种用法，包括：
 * 1. 基本泛型函数
 * 2. 泛型类型
 * 3. 泛型类
 * 4. 泛型约束
 * 5. 泛型默认类型
 * 6. 泛型工具类型
 * 7. 高级泛型技巧
 */
// 1. 基本泛型函数
// 泛型允许我们编写可重用的函数，这些函数可以处理多种类型
function identity(arg) {
    return arg;
}
// 使用泛型函数
const output1 = identity('myString');
const output2 = identity(42);
const output3 = identity(true);
console.log('基本泛型函数:', output1, output2, output3);
// 类型推断 - 不需要明确指定类型
const output4 = identity('Hello'); // 自动推断为 string 类型
console.log('类型推断:', output4);
const myIdentity = (arg) => arg;
console.log('泛型类型:', myIdentity(100));
function identity2(arg) {
    return arg;
}
const myIdentity2 = identity2;
console.log('泛型接口:', myIdentity2('Hello'));
// 3. 泛型类
// 泛型类允许我们创建可重用的类，这些类可以处理多种类型
class GenericNumber {
    constructor(zeroValue, add) {
        this.zeroValue = zeroValue;
        this.add = add;
    }
}
const myGenericNumber = new GenericNumber(0, (x, y) => x + y);
console.log('泛型类 - number:', myGenericNumber.add(myGenericNumber.zeroValue, 5));
const stringNumeric = new GenericNumber('', (x, y) => x + y);
console.log('泛型类 - string:', stringNumeric.add(stringNumeric.zeroValue, 'test'));
function loggingIdentity(arg) {
    console.log('Length:', arg.length);
    return arg;
}
console.log('泛型约束:', loggingIdentity({ length: 10, value: 3 }));
// loggingIdentity(3); // 错误，数字没有 length 属性
// 5. 泛型默认类型
// 可以为泛型参数设置默认类型
function createArray(length, value) {
    return Array(length).fill(value);
}
console.log('泛型默认类型 - 默认:', createArray(3, 'x'));
console.log('泛型默认类型 - 显式指定:', createArray(3, 5));
function updateTodo(todo, fieldsToUpdate) {
    return { ...todo, ...fieldsToUpdate };
}
const todo1 = { title: 'Learn TypeScript', description: 'Study hard' };
const todo2 = updateTodo(todo1, { description: 'Study harder' });
console.log('Partial<T>:', todo2);
// Readonly<T> - 将 T 的所有属性变为只读
const readonlyTodo = { title: 'Learn TypeScript', description: 'Study hard' };
// readonlyTodo.title = 'Learn React'; // 错误，属性是只读的
console.log('Readonly<T>:', readonlyTodo);
// Record<K, T> - 构造一个类型，其属性键为 K，属性值为 T
const record = {
    'apple': 1,
    'banana': 2,
    'orange': 3
};
console.log('Record<K, T>:', record);
const todoPreview = { title: 'Learn TypeScript' };
console.log('Pick<T, K>:', todoPreview);
const todoWithoutDescription = { title: 'Learn TypeScript' };
console.log('Omit<T, K>:', todoWithoutDescription);
// 7. 高级泛型技巧
// 泛型与联合类型
function getFirstElement(arr) {
    return arr[0];
}
console.log('泛型与联合类型:', getFirstElement([1, 2, 3]));
console.log('泛型与联合类型 - 空数组:', getFirstElement([]));
const person = {
    name: 'John',
    age: 30,
    gender: 'Male'
};
console.log('泛型与映射类型:', person);
// 条件类型示例
function isNumber(value) {
    return typeof value === 'number';
}
const value = 42;
if (isNumber(value)) {
    console.log('条件类型 - value 是数字:', value.toFixed(2));
}
// 8. 泛型与类继承
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    bark() {
        console.log('Woof!');
    }
}
class Cat extends Animal {
    meow() {
        console.log('Meow!');
    }
}
function createAnimal(AnimalClass, name) {
    return new AnimalClass(name);
}
const dog = createAnimal(Dog, 'Buddy');
dog.bark();
const cat = createAnimal(Cat, 'Whiskers');
cat.meow();
console.log('泛型与类继承:', dog.name, cat.name);
