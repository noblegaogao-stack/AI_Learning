"use strict";
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
const readonlyPerson = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};
const partialPerson = {
    name: 'Jane'
};
const nullablePerson = {
    name: 'John',
    age: null,
    email: 'john@example.com'
};
console.log('映射类型 - Readonly:', readonlyPerson);
console.log('映射类型 - Partial:', partialPerson);
console.log('映射类型 - Nullable:', nullablePerson);
const greeting = 'Hello, TypeScript!';
const colorWithHex = 'red: #ff0000';
// T[K] 索引访问类型
const person3 = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};
const tree = {
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
const list = {
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
function identity(arg) {
    return arg;
}
const number = identity(42); // 类型推断为 number
const string = identity('Hello'); // 类型推断为 string
function add(a, b) {
    return a + b;
}
// 7. 高级类型技巧
// 类型守卫与类型推断
function isString(value) {
    return typeof value === 'string';
}
function processValue(value) {
    if (isString(value)) {
        // 类型推断为 string
        console.log(value.toUpperCase());
    }
}
// 类型断言与类型推断
const value = 'Hello';
const stringValue = value;
console.log('类型断言:', stringValue.toUpperCase());
function getStatusMessage(status) {
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
function isNumber(value) {
    return typeof value === 'number';
}
function isString2(value) {
    return typeof value === 'string';
}
function processValue2(value) {
    if (isNumber(value)) {
        // 类型缩小为 number
        console.log(value.toFixed(2));
    }
    else if (isString2(value)) {
        // 类型缩小为 string
        console.log(value.toUpperCase());
    }
}
processValue2(42);
processValue2('hello');
const deepReadonlyPerson = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};
const deepPartialPerson = {
    name: 'John',
    address: {
        street: '123 Main St'
    }
};
console.log('深度部分类型:', deepPartialPerson);
const userResponse = {
    data: {
        id: 1,
        name: 'John',
        email: 'john@example.com'
    },
    error: null,
    status: 200
};
console.log('类型安全的 API 响应:', userResponse.data.name);
function createConfig(baseConfig, overrides) {
    return { ...baseConfig, ...overrides };
}
const config = createConfig({
    apiUrl: 'https://api.example.com',
    timeout: 10000,
    retries: 3
}, {
    timeout: 5000
});
console.log('类型安全的配置:', config);
