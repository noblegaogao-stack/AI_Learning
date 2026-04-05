"use strict";
/**
 * TypeScript 类示例
 *
 * 本文件展示了 TypeScript 中类的各种用法，包括：
 * 1. 基本类定义
 * 2. 继承
 * 3. 公共、私有和受保护的修饰符
 * 4. 只读修饰符
 * 5. 存取器（getter 和 setter）
 * 6. 静态属性
 * 7. 抽象类
 * 8. 高级类特性
 */
// 1. 基本类定义
class Greeter {
    // 构造函数
    constructor(message) {
        this.greeting = message;
    }
    // 方法
    greet() {
        return `Hello, ${this.greeting}`;
    }
}
const greeter = new Greeter('world');
console.log('基本类定义:', greeter.greet());
// 2. 继承
// TypeScript 支持类的继承，使用 extends 关键字
class Animal {
    move(distanceInMeters = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}
const dog = new Dog();
dog.bark();
dog.move(10);
// 更复杂的继承示例
class Cat extends Animal {
    // 重写父类方法
    move(distanceInMeters = 5) {
        console.log('Cat is moving...');
        super.move(distanceInMeters);
    }
}
const cat = new Cat();
cat.move(15);
// 3. 公共、私有和受保护的修饰符
// public（默认）：可以在任何地方访问
// private：只能在类内部访问
// protected：可以在类内部和子类中访问
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    getAge() {
        return this.age; // 可以在类内部访问 private 属性
    }
}
class Employee extends Person {
    constructor(name, age, gender, employeeId) {
        super(name, age, gender);
        this.employeeId = employeeId;
    }
    getEmployeeInfo() {
        return `${this.name}, ${this.gender}, ID: ${this.employeeId}`; // 可以访问 protected 属性 gender
    }
}
const person = new Person('John', 30, 'Male');
console.log('公共修饰符:', person.name);
console.log('私有修饰符访问:', person.getAge());
const employee = new Employee('Jane', 25, 'Female', 'EMP001');
console.log('受保护修饰符访问:', employee.getEmployeeInfo());
// console.log(employee.age); // 错误，age 是私有属性
// console.log(employee.gender); // 错误，gender 是受保护属性
// 4. 只读修饰符
// readonly 修饰符表示属性只能在声明时或构造函数中赋值
class Octopus {
    constructor(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
}
const dad = new Octopus('Man with the 8 strong legs');
console.log('只读属性:', dad.name, dad.numberOfLegs);
// dad.name = 'Man with the 3 strong legs'; // 错误，name 是只读属性
// 5. 存取器（getter 和 setter）
// 存取器允许我们控制对对象属性的访问
class Employee2 {
    constructor() {
        this._fullName = '';
    }
    get fullName() {
        return this._fullName;
    }
    set fullName(newName) {
        if (newName && newName.length > 3) {
            this._fullName = newName;
        }
        else {
            console.log('Name must be longer than 3 characters');
        }
    }
}
const employee2 = new Employee2();
employee2.fullName = 'Bob Smith';
console.log('存取器 - getter:', employee2.fullName);
employee2.fullName = 'Jo'; // 会触发错误提示
// 6. 静态属性
// 静态属性属于类本身，而不是类的实例
class MathUtil {
    static calculateCircumference(diameter) {
        return this.pi * diameter;
    }
}
MathUtil.pi = 3.14159;
console.log('静态属性:', MathUtil.pi);
console.log('静态方法:', MathUtil.calculateCircumference(10));
// 7. 抽象类
// 抽象类不能直接实例化，只能作为其他类的基类
class Department {
    constructor(name) {
        this.name = name;
    }
    // 普通方法
    printName() {
        console.log('Department name:', this.name);
    }
}
class AccountingDepartment extends Department {
    constructor() {
        super('Accounting');
    }
    // 实现抽象方法
    describe() {
        console.log('Accounting department - responsible for financial reporting');
    }
}
const accounting = new AccountingDepartment();
accounting.printName();
accounting.describe();
class Duck extends Animal {
    fly() {
        console.log('Duck is flying');
    }
    swim() {
        console.log('Duck is swimming');
    }
    quack() {
        console.log('Quack! Quack!');
    }
}
const duck = new Duck();
duck.quack();
duck.fly();
duck.swim();
duck.move(5);
