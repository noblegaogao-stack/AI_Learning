/**
 * TypeScript 装饰器示例
 * 
 * 本文件展示了 TypeScript 中装饰器的各种用法，包括：
 * 1. 类装饰器
 * 2. 方法装饰器
 * 3. 属性装饰器
 * 4. 参数装饰器
 * 5. 装饰器工厂
 * 6. 装饰器组合
 * 7. 元数据
 */

// 注意：要使用装饰器，需要在 tsconfig.json 中启用 experimentalDecorators 选项
// {
//   "compilerOptions": {
//     "experimentalDecorators": true
//   }
// }

// 1. 类装饰器
// 类装饰器应用于类声明，用于修改类的行为

function sealed(constructor: Function) {
  // 密封类，防止扩展
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

console.log('类装饰器 - 密封类');
const greeter = new Greeter('world');
console.log(greeter.greet());

// 2. 方法装饰器
// 方法装饰器应用于方法声明，用于修改方法的行为

function enumerable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  @enumerable(false)
  getFullName() {
    return this.name;
  }
  
  @enumerable(true)
  getGreeting() {
    return `Hello, my name is ${this.name}`;
  }
}

console.log('\n方法装饰器 - 控制可枚举性');
const person = new Person('John');
console.log('getFullName 可枚举:', Object.prototype.propertyIsEnumerable.call(person, 'getFullName'));
console.log('getGreeting 可枚举:', Object.prototype.propertyIsEnumerable.call(person, 'getGreeting'));

// 3. 属性装饰器
// 属性装饰器应用于属性声明，用于修改属性的行为

function configurable(value: boolean) {
  return function(target: any, propertyKey: string) {
    const descriptor: PropertyDescriptor = {
      configurable: value,
      writable: value
    };
    Object.defineProperty(target, propertyKey, descriptor);
  };
}

class Product {
  @configurable(false)
  readonly name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

console.log('\n属性装饰器 - 控制可配置性');
const product = new Product('TypeScript Book');
console.log('Product name:', product.name);
// product.name = 'JavaScript Book'; // 错误，name 是只读的

// 4. 参数装饰器
// 参数装饰器应用于函数参数，用于修改参数的行为

function required(target: any, propertyKey: string, parameterIndex: number) {
  // 这里我们可以存储参数的元数据
  console.log(`参数装饰器 - 参数 ${parameterIndex} 被标记为必填`);
}

class User {
  name: string;
  
  constructor(@required name: string) {
    this.name = name;
  }
  
  updateName(@required newName: string) {
    this.name = newName;
  }
}

console.log('\n参数装饰器 - 标记必填参数');
const user = new User('John');
console.log('User name:', user.name);
user.updateName('Jane');
console.log('Updated user name:', user.name);

// 5. 装饰器工厂
// 装饰器工厂允许我们创建可配置的装饰器

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`调用方法 ${propertyKey}，参数:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`方法 ${propertyKey} 返回:`, result);
    return result;
  };
  
  return descriptor;
}

// 带参数的装饰器工厂
function logWithPrefix(prefix: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      console.log(`${prefix} - 调用方法 ${propertyKey}，参数:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`${prefix} - 方法 ${propertyKey} 返回:`, result);
      return result;
    };
    
    return descriptor;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
  
  @logWithPrefix('CALCULATOR')
  multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log('\n装饰器工厂 - 带参数的装饰器');
const calculator = new Calculator();
calculator.add(10, 5);
calculator.multiply(10, 5);

// 6. 装饰器组合
// 多个装饰器可以应用于同一个声明

function first() {
  console.log('First 装饰器');
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('First 装饰器应用');
  };
}

function second() {
  console.log('Second 装饰器');
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('Second 装饰器应用');
  };
}

class Example {
  @first()
  @second()
  method() {
    console.log('方法执行');
  }
}

console.log('\n装饰器组合 - 多个装饰器');
const example = new Example();
example.method();

// 7. 元数据
// 使用 reflect-metadata 库可以为装饰器添加元数据

// 首先需要安装 reflect-metadata：npm install reflect-metadata
// 然后导入：import 'reflect-metadata';

/*
import 'reflect-metadata';

const METADATA_KEY = 'design:type';

class MetadataExample {
  constructor(@Reflect.metadata(METADATA_KEY, String) public name: string) {}
  
  @Reflect.metadata(METADATA_KEY, Function)
  method(@Reflect.metadata(METADATA_KEY, Number) param: number): void {}
}

console.log('\n元数据 - 获取类型信息');
const metadata = Reflect.getMetadata(METADATA_KEY, MetadataExample.prototype, 'method');
console.log('方法类型:', metadata.name);
*/

// 8. 实用装饰器示例

// 计时装饰器
function timing(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`方法 ${propertyKey} 执行时间: ${end - start}ms`);
    return result;
  };
  
  return descriptor;
}

// 缓存装饰器
function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cacheMap = new Map<string, any>();
  
  descriptor.value = function(...args: any[]) {
    const key = JSON.stringify(args);
    if (cacheMap.has(key)) {
      console.log(`从缓存获取 ${propertyKey} 的结果`);
      return cacheMap.get(key);
    }
    const result = originalMethod.apply(this, args);
    cacheMap.set(key, result);
    console.log(`缓存 ${propertyKey} 的结果`);
    return result;
  };
  
  return descriptor;
}

class DataService {
  @timing
  @cache
  fetchData(id: number): string {
    // 模拟网络请求
    console.log(`获取 ID 为 ${id} 的数据`);
    return `数据 ${id}`;
  }
}

console.log('\n实用装饰器示例');
const dataService = new DataService();
// 第一次调用，会执行方法并缓存结果
dataService.fetchData(1);
// 第二次调用，会从缓存获取结果
dataService.fetchData(1);
// 不同参数，会执行方法并缓存新结果
dataService.fetchData(2);

// 9. 装饰器的执行顺序
// 装饰器的执行顺序是：
// 1. 参数装饰器，从上到下
// 2. 方法装饰器，从上到下
// 3. 访问器装饰器，从上到下
// 4. 属性装饰器，从上到下
// 5. 类装饰器，从上到下

function paramDecorator(index: number) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`参数装饰器 ${index}`);
  };
}

function methodDecorator(name: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`方法装饰器 ${name}`);
  };
}

function classDecorator(name: string) {
  return function(constructor: Function) {
    console.log(`类装饰器 ${name}`);
  };
}

@classDecorator('A')
@classDecorator('B')
class Order {
  @methodDecorator('X')
  @methodDecorator('Y')
  process(@paramDecorator(1) id: number, @paramDecorator(2) amount: number) {
    console.log(`处理订单 ${id}，金额 ${amount}`);
  }
}

console.log('\n装饰器执行顺序');
const order = new Order();
order.process(1001, 99.99);

// 10. 装饰器的实际应用

// 装饰器在实际项目中的应用场景：
// - 依赖注入
// - 路由配置
// - 表单验证
// - 日志记录
// - 性能监控
// - 权限控制

// 示例：简单的依赖注入装饰器

const dependencies = new Map<string, any>();

function inject(token: string) {
  return function(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        return dependencies.get(token);
      }
    });
  };
}

// 注册依赖
dependencies.set('logger', {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
});

class Service {
  @inject('logger')
  private logger: any;
  
  doSomething() {
    this.logger.log('Doing something...');
  }
}

console.log('\n装饰器实际应用 - 依赖注入');
const service = new Service();
service.doSomething();
