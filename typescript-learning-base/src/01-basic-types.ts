/**
 * TypeScript 基础类型示例
 * 
 * 本文件展示了 TypeScript 中所有的基础类型，包括：
 * 1. 布尔类型 (boolean)
 * 2. 数字类型 (number)
 * 3. 字符串类型 (string)
 * 4. 数组类型 (array)
 * 5. 元组类型 (tuple)
 * 6. 枚举类型 (enum)
 * 7. any 类型
 * 8. void 类型
 * 9. null 和 undefined 类型
 * 10. never 类型
 * 11. object 类型
 */

// 1. 布尔类型
const isDone: boolean = false;
console.log('布尔类型:', isDone);

// 2. 数字类型
const decimal: number = 6;      // 十进制
const hex: number = 0xf00d;     // 十六进制
const binary: number = 0b1010;  // 二进制
const octal: number = 0o744;    // 八进制
const bigInt: bigint = 100n;    // 大整数
console.log('数字类型:', decimal, hex, binary, octal, bigInt);

// 3. 字符串类型
const color: string = 'blue';
const fullName: string = `John Doe`;
const age: number = 30;
const sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;
console.log('字符串类型:', color, fullName, sentence);

// 4. 数组类型
// 方法一：类型[]
const list: number[] = [1, 2, 3];
// 方法二：Array<类型>
const list2: Array<number> = [1, 2, 3];
console.log('数组类型:', list, list2);

// 5. 元组类型
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
const x: [string, number] = ['hello', 10];
console.log('元组类型:', x);
// 访问元组元素
console.log('元组第一个元素:', x[0]);
console.log('元组第二个元素:', x[1]);

// 6. 枚举类型
// 枚举类型是对 JavaScript 标准数据类型的一个补充
enum Color {
  Red,
  Green,
  Blue
}
const c: Color = Color.Green;
console.log('枚举类型:', c); // 输出 1（默认从 0 开始）

// 可以手动指定枚举成员的值
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
console.log('手动指定值的枚举:', Direction.Up, Direction.Down, Direction.Left, Direction.Right);

// 可以通过值获取枚举成员的名称
console.log('通过值获取枚举名称:', Direction[2]); // 输出 "Down"

// 7. any 类型
// any 类型允许我们在编译时跳过类型检查
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // 也可以是布尔值
console.log('any 类型:', notSure);

// 8. void 类型
// void 类型表示没有任何返回值的函数
function warnUser(): void {
  console.log('This is a warning message');
}
warnUser();

// 9. null 和 undefined 类型
// 在严格模式下，null 和 undefined 是各自类型的唯一值
let u: undefined = undefined;
let n: null = null;
console.log('null 和 undefined 类型:', u, n);

// 10. never 类型
// never 类型表示那些永远不会发生的值的类型
// 例如，总是抛出异常的函数返回类型
function error(message: string): never {
  throw new Error(message);
}

// 死循环函数的返回类型
function infiniteLoop(): never {
  while (true) {
  }
}

// 11. object 类型
// object 类型表示非原始类型，即除 number, string, boolean, bigint, symbol, null, undefined 之外的类型
function create(o: object | null): void {
  console.log('object 类型:', o);
}

create({ prop: 0 }); // 正确
create(null); // 正确
// create(42); // 错误，数字是原始类型
// create('string'); // 错误，字符串是原始类型
// create(false); // 错误，布尔值是原始类型
