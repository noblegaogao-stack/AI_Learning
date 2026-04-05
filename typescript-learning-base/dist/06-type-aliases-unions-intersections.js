"use strict";
/**
 * TypeScript 类型别名、联合类型和交叉类型示例
 *
 * 本文件展示了 TypeScript 中类型别名、联合类型和交叉类型的各种用法，包括：
 * 1. 类型别名
 * 2. 联合类型
 * 3. 交叉类型
 * 4. 字面量类型
 * 5. 类型守卫
 * 6. 类型断言
 * 7. 高级类型技巧
 */
function printId(id) {
    console.log('ID:', id);
}
printId(101);
printId('202');
const person = {
    name: 'John',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};
console.log('类型别名 - Person:', person);
// 2. 联合类型
// 联合类型表示一个值可以是几种类型中的一种
let value;
value = 'Hello';
console.log('联合类型 - string:', value);
value = 42;
console.log('联合类型 - number:', value);
function getPet() {
    // 模拟返回一个 Bird 或 Fish
    return {
        fly() {
            console.log('Flying');
        },
        layEggs() {
            console.log('Laying eggs');
        }
    };
}
const pet = getPet();
pet.layEggs(); // 可以调用两个类型共有的方法
const c = {
    a: 1,
    b: 'hello'
};
console.log('交叉类型:', c);
// 交叉类型与类
class Base {
    constructor() {
        this.baseProp = 'base';
    }
}
class Derived extends Base {
    constructor() {
        super(...arguments);
        this.derivedProp = 42;
    }
}
const combined = {
    baseProp: 'base',
    derivedProp: 42,
    additionalProp: true
};
console.log('交叉类型与类:', combined);
function move(direction) {
    console.log('Moving', direction);
}
move('north');
move('south');
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
console.log('数字字面量类型 - 骰子滚动:', rollDice());
// 5. 类型守卫
// 类型守卫允许我们在运行时检查一个值的类型
// typeof 类型守卫
function isNumber(x) {
    return typeof x === 'number';
}
function isString(x) {
    return typeof x === 'string';
}
function processValue(value) {
    if (isNumber(value)) {
        console.log('Processing number:', value.toFixed(2));
    }
    else if (isString(value)) {
        console.log('Processing string:', value.toUpperCase());
    }
}
processValue(42);
processValue('hello');
// instanceof 类型守卫
class Dog {
    bark() {
        console.log('Woof!');
    }
}
class Cat {
    meow() {
        console.log('Meow!');
    }
}
function animalSound(animal) {
    if (animal instanceof Dog) {
        animal.bark();
    }
    else if (animal instanceof Cat) {
        animal.meow();
    }
}
animalSound(new Dog());
animalSound(new Cat());
// 6. 类型断言
// 类型断言允许我们告诉 TypeScript 一个值的类型
// 尖括号语法
let someValue = 'this is a string';
let strLength = someValue.length;
console.log('类型断言 - 尖括号语法:', strLength);
// as 语法
let someValue2 = 'this is also a string';
let strLength2 = someValue2.length;
console.log('类型断言 - as 语法:', strLength2);
function area(shape) {
    switch (shape.kind) {
        case 'square':
            return shape.size * shape.size;
        case 'rectangle':
            return shape.width * shape.height;
        case 'circle':
            return Math.PI * shape.radius * shape.radius;
        default:
            return 0;
    }
}
console.log('可辨识联合类型 - square:', area({ kind: 'square', size: 5 }));
console.log('可辨识联合类型 - rectangle:', area({ kind: 'rectangle', width: 4, height: 6 }));
console.log('可辨识联合类型 - circle:', area({ kind: 'circle', radius: 3 }));
const readonlyPerson = {
    name: 'John',
    age: 30
};
// readonlyPerson.name = 'Jane'; // 错误，属性是只读的
console.log('映射类型与类型别名:', readonlyPerson);
const value1 = 'hello';
const value2 = 42;
console.log('条件类型与类型别名:', value1, value2);
