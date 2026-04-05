"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 注意：要使用装饰器，需要在 tsconfig.json 中启用 experimentalDecorators 选项
// {
//   "compilerOptions": {
//     "experimentalDecorators": true
//   }
// }
// 1. 类装饰器
// 类装饰器应用于类声明，用于修改类的行为
function sealed(constructor) {
    // 密封类，防止扩展
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
let Greeter = class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return `Hello, ${this.greeting}`;
    }
};
Greeter = __decorate([
    sealed,
    __metadata("design:paramtypes", [String])
], Greeter);
console.log('类装饰器 - 密封类');
const greeter = new Greeter('world');
console.log(greeter.greet());
// 2. 方法装饰器
// 方法装饰器应用于方法声明，用于修改方法的行为
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
class Person {
    constructor(name) {
        this.name = name;
    }
    getFullName() {
        return this.name;
    }
    getGreeting() {
        return `Hello, my name is ${this.name}`;
    }
}
__decorate([
    enumerable(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person.prototype, "getFullName", null);
__decorate([
    enumerable(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person.prototype, "getGreeting", null);
console.log('\n方法装饰器 - 控制可枚举性');
const person = new Person('John');
console.log('getFullName 可枚举:', Object.prototype.propertyIsEnumerable.call(person, 'getFullName'));
console.log('getGreeting 可枚举:', Object.prototype.propertyIsEnumerable.call(person, 'getGreeting'));
// 3. 属性装饰器
// 属性装饰器应用于属性声明，用于修改属性的行为
function configurable(value) {
    return function (target, propertyKey) {
        const descriptor = {
            configurable: value,
            writable: value
        };
        Object.defineProperty(target, propertyKey, descriptor);
    };
}
class Product {
    constructor(name) {
        this.name = name;
    }
}
__decorate([
    configurable(false),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
console.log('\n属性装饰器 - 控制可配置性');
const product = new Product('TypeScript Book');
console.log('Product name:', product.name);
// product.name = 'JavaScript Book'; // 错误，name 是只读的
// 4. 参数装饰器
// 参数装饰器应用于函数参数，用于修改参数的行为
function required(target, propertyKey, parameterIndex) {
    // 这里我们可以存储参数的元数据
    console.log(`参数装饰器 - 参数 ${parameterIndex} 被标记为必填`);
}
let User = class User {
    constructor(name) {
        this.name = name;
    }
    updateName(newName) {
        this.name = newName;
    }
};
__decorate([
    __param(0, required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], User.prototype, "updateName", null);
User = __decorate([
    __param(0, required),
    __metadata("design:paramtypes", [String])
], User);
console.log('\n参数装饰器 - 标记必填参数');
const user = new User('John');
console.log('User name:', user.name);
user.updateName('Jane');
console.log('Updated user name:', user.name);
// 5. 装饰器工厂
// 装饰器工厂允许我们创建可配置的装饰器
function log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`调用方法 ${propertyKey}，参数:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`方法 ${propertyKey} 返回:`, result);
        return result;
    };
    return descriptor;
}
// 带参数的装饰器工厂
function logWithPrefix(prefix) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`${prefix} - 调用方法 ${propertyKey}，参数:`, args);
            const result = originalMethod.apply(this, args);
            console.log(`${prefix} - 方法 ${propertyKey} 返回:`, result);
            return result;
        };
        return descriptor;
    };
}
class Calculator {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
}
__decorate([
    log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "add", null);
__decorate([
    logWithPrefix('CALCULATOR'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "multiply", null);
console.log('\n装饰器工厂 - 带参数的装饰器');
const calculator = new Calculator();
calculator.add(10, 5);
calculator.multiply(10, 5);
// 6. 装饰器组合
// 多个装饰器可以应用于同一个声明
function first() {
    console.log('First 装饰器');
    return function (target, propertyKey, descriptor) {
        console.log('First 装饰器应用');
    };
}
function second() {
    console.log('Second 装饰器');
    return function (target, propertyKey, descriptor) {
        console.log('Second 装饰器应用');
    };
}
class Example {
    method() {
        console.log('方法执行');
    }
}
__decorate([
    first(),
    second(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Example.prototype, "method", null);
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
function timing(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`方法 ${propertyKey} 执行时间: ${end - start}ms`);
        return result;
    };
    return descriptor;
}
// 缓存装饰器
function cache(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const cacheMap = new Map();
    descriptor.value = function (...args) {
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
    fetchData(id) {
        // 模拟网络请求
        console.log(`获取 ID 为 ${id} 的数据`);
        return `数据 ${id}`;
    }
}
__decorate([
    timing,
    cache,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], DataService.prototype, "fetchData", null);
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
function paramDecorator(index) {
    return function (target, propertyKey, parameterIndex) {
        console.log(`参数装饰器 ${index}`);
    };
}
function methodDecorator(name) {
    return function (target, propertyKey, descriptor) {
        console.log(`方法装饰器 ${name}`);
    };
}
function classDecorator(name) {
    return function (constructor) {
        console.log(`类装饰器 ${name}`);
    };
}
let Order = class Order {
    process(id, amount) {
        console.log(`处理订单 ${id}，金额 ${amount}`);
    }
};
__decorate([
    methodDecorator('X'),
    methodDecorator('Y'),
    __param(0, paramDecorator(1)),
    __param(1, paramDecorator(2)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Order.prototype, "process", null);
Order = __decorate([
    classDecorator('A'),
    classDecorator('B')
], Order);
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
const dependencies = new Map();
function inject(token) {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            get() {
                return dependencies.get(token);
            }
        });
    };
}
// 注册依赖
dependencies.set('logger', {
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
});
class Service {
    doSomething() {
        this.logger.log('Doing something...');
    }
}
__decorate([
    inject('logger'),
    __metadata("design:type", Object)
], Service.prototype, "logger", void 0);
console.log('\n装饰器实际应用 - 依赖注入');
const service = new Service();
service.doSomething();
