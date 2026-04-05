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
function identity<T>(arg: T): T {
  return arg;
}

// 使用泛型函数
const output1 = identity<string>('myString');
const output2 = identity<number>(42);
const output3 = identity<boolean>(true);

console.log('基本泛型函数:', output1, output2, output3);

// 类型推断 - 不需要明确指定类型
const output4 = identity('Hello'); // 自动推断为 string 类型
console.log('类型推断:', output4);

// 2. 泛型类型
// 可以定义泛型类型，如泛型函数类型、泛型接口等
type Identity<T> = (arg: T) => T;

const myIdentity: Identity<number> = (arg) => arg;
console.log('泛型类型:', myIdentity(100));

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity2<T>(arg: T): T {
  return arg;
}

const myIdentity2: GenericIdentityFn<string> = identity2;
console.log('泛型接口:', myIdentity2('Hello'));

// 3. 泛型类
// 泛型类允许我们创建可重用的类，这些类可以处理多种类型
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
  
  constructor(zeroValue: T, add: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = add;
  }
}

const myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log('泛型类 - number:', myGenericNumber.add(myGenericNumber.zeroValue, 5));

const stringNumeric = new GenericNumber<string>('', (x, y) => x + y);
console.log('泛型类 - string:', stringNumeric.add(stringNumeric.zeroValue, 'test'));

// 4. 泛型约束
// 泛型约束允许我们限制泛型可以接受的类型
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log('Length:', arg.length);
  return arg;
}

console.log('泛型约束:', loggingIdentity({ length: 10, value: 3 }));
// loggingIdentity(3); // 错误，数字没有 length 属性

// 5. 泛型默认类型
// 可以为泛型参数设置默认类型
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

console.log('泛型默认类型 - 默认:', createArray(3, 'x'));
console.log('泛型默认类型 - 显式指定:', createArray<number>(3, 5));

// 6. 泛型工具类型
// TypeScript 提供了一些内置的泛型工具类型

// Partial<T> - 将 T 的所有属性变为可选
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = { title: 'Learn TypeScript', description: 'Study hard' };
const todo2 = updateTodo(todo1, { description: 'Study harder' });
console.log('Partial<T>:', todo2);

// Readonly<T> - 将 T 的所有属性变为只读
const readonlyTodo: Readonly<Todo> = { title: 'Learn TypeScript', description: 'Study hard' };
// readonlyTodo.title = 'Learn React'; // 错误，属性是只读的
console.log('Readonly<T>:', readonlyTodo);

// Record<K, T> - 构造一个类型，其属性键为 K，属性值为 T
const record: Record<string, number> = {
  'apple': 1,
  'banana': 2,
  'orange': 3
};
console.log('Record<K, T>:', record);

// Pick<T, K> - 从 T 中选择一组属性 K
type TodoPreview = Pick<Todo, 'title'>;
const todoPreview: TodoPreview = { title: 'Learn TypeScript' };
console.log('Pick<T, K>:', todoPreview);

// Omit<T, K> - 从 T 中排除一组属性 K
type TodoWithoutDescription = Omit<Todo, 'description'>;
const todoWithoutDescription: TodoWithoutDescription = { title: 'Learn TypeScript' };
console.log('Omit<T, K>:', todoWithoutDescription);

// 7. 高级泛型技巧

// 泛型与联合类型
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log('泛型与联合类型:', getFirstElement([1, 2, 3]));
console.log('泛型与联合类型 - 空数组:', getFirstElement([]));

// 泛型与映射类型
type Keys = 'name' | 'age' | 'gender';
type Person = {
  [K in Keys]: string | number;
};

const person: Person = {
  name: 'John',
  age: 30,
  gender: 'Male'
};
console.log('泛型与映射类型:', person);

// 泛型与条件类型
type IsNumber<T> = T extends number ? true : false;
type A = IsNumber<number>; // true
type B = IsNumber<string>; // false

// 条件类型示例
function isNumber<T>(value: T): value is T & number {
  return typeof value === 'number';
}

const value: unknown = 42;
if (isNumber(value)) {
  console.log('条件类型 - value 是数字:', value.toFixed(2));
}

// 8. 泛型与类继承
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark(): void {
    console.log('Woof!');
  }
}

class Cat extends Animal {
  meow(): void {
    console.log('Meow!');
  }
}

function createAnimal<T extends Animal>(AnimalClass: new (name: string) => T, name: string): T {
  return new AnimalClass(name);
}

const dog = createAnimal(Dog, 'Buddy');
dog.bark();

const cat = createAnimal(Cat, 'Whiskers');
cat.meow();

console.log('泛型与类继承:', dog.name, cat.name);
