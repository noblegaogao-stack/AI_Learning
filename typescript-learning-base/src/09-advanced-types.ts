/**
 * TypeScript 高级类型示例
 * 
 * 本文件展示了 TypeScript 中高级类型的各种用法，包括：
 * 1. 映射类型
 * 2. 条件类型
 * 3. 模板字面量类型
 * 4. 索引类型
 * 5. 递归类型
 * 6. 类型推断
 * 7. 高级类型技巧
 */

// 1. 映射类型
// 映射类型允许我们基于现有类型创建新类型

// 基本映射类型
interface Person {
  name: string;
  age: number;
  email: string;
}

// 只读映射类型
type ReadonlyPerson = {
  readonly [P in keyof Person]: Person[P];
};

// 可选映射类型
type PartialPerson = {
  [P in keyof Person]?: Person[P];
};

// 可空映射类型
type NullablePerson = {
  [P in keyof Person]: Person[P] | null;
};

const readonlyPerson: ReadonlyPerson = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

const partialPerson: PartialPerson = {
  name: 'Jane'
};

const nullablePerson: NullablePerson = {
  name: 'John',
  age: null,
  email: 'john@example.com'
};

console.log('映射类型 - Readonly:', readonlyPerson);
console.log('映射类型 - Partial:', partialPerson);
console.log('映射类型 - Nullable:', nullablePerson);

// 2. 条件类型
// 条件类型允许我们根据类型关系选择类型

type IsNumber<T> = T extends number ? true : false;
type A = IsNumber<number>; // true
type B = IsNumber<string>; // false

// 条件类型与泛型
type NonNullable<T> = T extends null | undefined ? never : T;
type C = NonNullable<string | null | undefined>; // string
type D = NonNullable<number | null>; // number

// 条件类型与映射类型
type Extract<T, U> = T extends U ? T : never;
type E = Extract<string | number | boolean, string>; // string

// 3. 模板字面量类型
// 模板字面量类型允许我们基于字符串字面量创建新类型

type Greeting = `Hello, ${string}!`;
const greeting: Greeting = 'Hello, TypeScript!';

// 模板字面量类型与联合类型
type Color = 'red' | 'green' | 'blue';
type ColorHex = `#${string}`;
type ColorWithHex = `${Color}: ${ColorHex}`;

const colorWithHex: ColorWithHex = 'red: #ff0000';

// 模板字面量类型与映射类型
interface Person2 {
  name: string;
  age: number;
}

type Getter<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type PersonGetter = Getter<Person2>;
// 类型为：
// {
//   getName: () => string;
//   getAge: () => number;
// }

// 4. 索引类型
// 索引类型允许我们通过索引访问类型的属性

// keyof 操作符
interface Person3 {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof Person3; // 'name' | 'age' | 'email'

// T[K] 索引访问类型
const person3: Person3 = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

type NameType = Person3['name']; // string
type AgeType = Person3['age']; // number

// 5. 递归类型
// 递归类型允许我们定义自引用的类型

// 递归接口
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const tree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    },
    right: {
      value: 5
    }
  },
  right: {
    value: 3
  }
};

console.log('递归类型 - 树结构:', tree);

// 递归类型别名
type LinkedList<T> = T & { next?: LinkedList<T> };

const list: LinkedList<{ value: number }> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3
    }
  }
};

console.log('递归类型 - 链表:', list);

// 6. 类型推断
// TypeScript 可以根据上下文推断类型

// 类型推断与泛型
function identity<T>(arg: T): T {
  return arg;
}

const number = identity(42); // 类型推断为 number
const string = identity('Hello'); // 类型推断为 string

// 类型推断与条件类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = ReturnType<typeof add>; // number

// 7. 高级类型技巧

// 类型守卫与类型推断
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // 类型推断为 string
    console.log(value.toUpperCase());
  }
}

// 类型断言与类型推断
const value: unknown = 'Hello';
const stringValue = value as string;
console.log('类型断言:', stringValue.toUpperCase());

// 类型别名与联合类型
type Status = 'success' | 'error' | 'loading';

function getStatusMessage(status: Status): string {
  switch (status) {
    case 'success':
      return '操作成功';
    case 'error':
      return '操作失败';
    case 'loading':
      return '加载中';
    default:
      return '未知状态';
  }
}

console.log('类型别名与联合类型:', getStatusMessage('success'));

// 类型保护与类型缩小
function isNumber(value: any): value is number {
  return typeof value === 'number';
}

function isString2(value: any): value is string {
  return typeof value === 'string';
}

function processValue2(value: string | number) {
  if (isNumber(value)) {
    // 类型缩小为 number
    console.log(value.toFixed(2));
  } else if (isString2(value)) {
    // 类型缩小为 string
    console.log(value.toUpperCase());
  }
}

processValue2(42);
processValue2('hello');

// 8. 实用高级类型示例

// 深度只读类型
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

interface Person4 {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type DeepReadonlyPerson = DeepReadonly<Person4>;

const deepReadonlyPerson: DeepReadonlyPerson = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

// deepReadonlyPerson.name = 'Jane'; // 错误，name 是只读的
// deepReadonlyPerson.address.street = '456 Elm St'; // 错误，street 是只读的

// 深度部分类型
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

const deepPartialPerson: DeepPartial<Person4> = {
  name: 'John',
  address: {
    street: '123 Main St'
  }
};

console.log('深度部分类型:', deepPartialPerson);

// 类型差异
type Diff<T, U> = T extends U ? never : T;
type F = Diff<string | number | boolean, string>; // number | boolean

// 类型交集
type Intersection<T, U> = T extends U ? T : never;
type G = Intersection<string | number | boolean, string | number>; // string | number

// 9. 类型系统的边界

// 类型系统的表达能力
// TypeScript 的类型系统是图灵完备的，可以表达复杂的逻辑

// 示例：类型级别的斐波那契数列
type Fibonacci<T extends number> = T extends 0
  ? 0
  : T extends 1
  ? 1
  : Add<Fibonacci<Subtract<T, 1>>, Fibonacci<Subtract<T, 2>>>;

type Add<T extends number, U extends number> = {
  0: U;
  1: Add<Decrement<T>, Increment<U>>;
}[T extends 0 ? 0 : 1];

type Subtract<T extends number, U extends number> = {
  0: T;
  1: Subtract<Decrement<T>, Decrement<U>>;
}[U extends 0 ? 0 : 1];

type Increment<T extends number> = T extends 0
  ? 1
  : T extends 1
  ? 2
  : T extends 2
  ? 3
  : T extends 3
  ? 4
  : T extends 4
  ? 5
  : never;

type Decrement<T extends number> = T extends 1
  ? 0
  : T extends 2
  ? 1
  : T extends 3
  ? 2
  : T extends 4
  ? 3
  : T extends 5
  ? 4
  : never;

// 注意：这只是一个示例，实际使用中可能会遇到类型系统的性能限制
type Fib5 = Fibonacci<5>; // 5

// 10. 实际应用示例

// 类型安全的 API 响应处理
interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const userResponse: ApiResponse<User> = {
  data: {
    id: 1,
    name: 'John',
    email: 'john@example.com'
  },
  error: null,
  status: 200
};

console.log('类型安全的 API 响应:', userResponse.data.name);

// 类型安全的配置对象
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

type PartialConfig = Partial<Config>;

function createConfig(baseConfig: Config, overrides?: PartialConfig): Config {
  return { ...baseConfig, ...overrides };
}

const config = createConfig(
  {
    apiUrl: 'https://api.example.com',
    timeout: 10000,
    retries: 3
  },
  {
    timeout: 5000
  }
);

console.log('类型安全的配置:', config);
