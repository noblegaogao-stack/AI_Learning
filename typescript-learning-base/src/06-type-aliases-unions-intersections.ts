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

// 1. 类型别名
// 类型别名允许我们为类型创建一个新名称

type StringOrNumber = string | number;

type UserId = string | number;

function printId(id: UserId): void {
  console.log('ID:', id);
}

printId(101);
printId('202');

// 类型别名可以用于复杂类型
type Person = {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
};

const person: Person = {
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

let value: string | number;
value = 'Hello';
console.log('联合类型 - string:', value);
value = 42;
console.log('联合类型 - number:', value);

// 联合类型与接口
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

type Pet = Bird | Fish;

function getPet(): Pet {
  // 模拟返回一个 Bird 或 Fish
  return {
    fly() {
      console.log('Flying');
    },
    layEggs() {
      console.log('Laying eggs');
    }
  } as Bird;
}

const pet = getPet();
pet.layEggs(); // 可以调用两个类型共有的方法
// pet.fly(); // 错误，不能确定 pet 是 Bird 类型

// 3. 交叉类型
// 交叉类型表示一个值同时具有多种类型的特性

interface A {
  a: number;
}

interface B {
  b: string;
}

type C = A & B;

const c: C = {
  a: 1,
  b: 'hello'
};

console.log('交叉类型:', c);

// 交叉类型与类
class Base {
  baseProp: string = 'base';
}

class Derived extends Base {
  derivedProp: number = 42;
}

interface Additional {
  additionalProp: boolean;
}

type Combined = Derived & Additional;

const combined: Combined = {
  baseProp: 'base',
  derivedProp: 42,
  additionalProp: true
};

console.log('交叉类型与类:', combined);

// 4. 字面量类型
// 字面量类型允许我们指定一个值必须是某个特定的字面量

type Direction = 'north' | 'south' | 'east' | 'west';

function move(direction: Direction): void {
  console.log('Moving', direction);
}

move('north');
move('south');
// move('northeast'); // 错误，不是有效的 Direction

// 数字字面量类型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return Math.floor(Math.random() * 6) + 1 as DiceRoll;
}

console.log('数字字面量类型 - 骰子滚动:', rollDice());

// 5. 类型守卫
// 类型守卫允许我们在运行时检查一个值的类型

// typeof 类型守卫
function isNumber(x: any): x is number {
  return typeof x === 'number';
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

function processValue(value: string | number): void {
  if (isNumber(value)) {
    console.log('Processing number:', value.toFixed(2));
  } else if (isString(value)) {
    console.log('Processing string:', value.toUpperCase());
  }
}

processValue(42);
processValue('hello');

// instanceof 类型守卫
class Dog {
  bark(): void {
    console.log('Woof!');
  }
}

class Cat {
  meow(): void {
    console.log('Meow!');
  }
}

function animalSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else if (animal instanceof Cat) {
    animal.meow();
  }
}

animalSound(new Dog());
animalSound(new Cat());

// 6. 类型断言
// 类型断言允许我们告诉 TypeScript 一个值的类型

// 尖括号语法
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
console.log('类型断言 - 尖括号语法:', strLength);

// as 语法
let someValue2: any = 'this is also a string';
let strLength2: number = (someValue2 as string).length;
console.log('类型断言 - as 语法:', strLength2);

// 7. 高级类型技巧

// 可辨识联合类型
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(shape: Shape): number {
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

// 映射类型与类型别名
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person2 {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person2>;

const readonlyPerson: ReadonlyPerson = {
  name: 'John',
  age: 30
};

// readonlyPerson.name = 'Jane'; // 错误，属性是只读的
console.log('映射类型与类型别名:', readonlyPerson);

// 条件类型与类型别名
type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null | undefined>; // string

type B = NonNullable<number | null>; // number

const value1: A = 'hello';
const value2: B = 42;

console.log('条件类型与类型别名:', value1, value2);
