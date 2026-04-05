# Kotlin 学习项目

这是一个为Android开发工程师准备的Kotlin学习项目，包含了12个核心知识点的demo，每个demo都有详细的注释和示例代码。通过学习这些demo，您可以快速掌握Kotlin的使用方法，成为一名高级Kotlin开发者。

## 项目结构

```
src/main/kotlin/com/example/kotlinlearning/
├── Main.kt              # 主入口文件，用于运行各个demo
├── BasicSyntaxDemo.kt   # 基础语法
├── NullSafetyDemo.kt    # 空安全
├── DataClassDemo.kt     # 数据类
├── SealedClassDemo.kt   # 密封类
├── ExtensionFunctionDemo.kt  # 扩展函数
├── HigherOrderFunctionDemo.kt  # 高阶函数
├── LambdaDemo.kt        # Lambda表达式
├── CoroutineDemo.kt     # 协程
├── DelegateDemo.kt      # 委托
├── ReflectionDemo.kt    # 反射
├── ScopeFunctionDemo.kt # 作用域函数
└── TypeSystemDemo.kt    # 类型系统
```

## 如何使用

1. 确保您的系统安装了Kotlin和Gradle
2. 进入项目目录：`cd d:\workspaces\AI_Learing\kotlin-learning-base`
3. 构建项目：`gradle build`
4. 运行项目：`gradle run`
5. 根据提示输入demo编号，查看对应的知识点演示

## 知识点覆盖

### 1. 基础语法
- 变量声明（val和var）
- 类型推断
- 函数定义（包括单表达式函数）
- 控制流（if-else、when表达式）
- 循环（for、while）
- 字符串模板

### 2. 空安全
- 可空类型（Type?）
- 安全调用操作符（?.）
- Elvis操作符（?:）
- 非空断言操作符（!!）
- 安全转换操作符（as?）
- let函数与空安全结合
- 延迟初始化（lateinit）

### 3. 数据类
- 自动生成的方法（equals()、hashCode()、toString()）
- copy()方法
- 解构声明
- 组件函数（component1()、component2()等）

### 4. 密封类
- 受限的继承结构
- 与when表达式的结合使用
- 递归处理密封类

### 5. 扩展函数
- 为现有类添加新方法
- 扩展属性
- 带接收者的Lambda
- 扩展函数的作用域和优先级

### 6. 高阶函数
- 函数作为参数
- 函数作为返回值
- 内联函数
- 柯里化函数
- 函数组合

### 7. Lambda表达式
- 基本语法
- 作为函数参数
- 省略参数类型
- 单个参数的简化（it）
- 闭包
- 与集合操作的结合

### 8. 协程
- 基本使用
- 挂起函数
- 协程作用域
- 等待协程完成
- 异步操作
- 协程取消
- 异常处理

### 9. 委托
- 类委托
- 属性委托
- lazy委托
- Delegates.observable
- 使用map作为委托

### 10. 反射
- 获取类引用
- 获取构造函数
- 创建实例
- 获取成员属性和函数
- 调用方法
- 访问属性
- 反射与注解

### 11. 作用域函数
- let函数
- run函数
- with函数
- apply函数
- also函数
- 链式调用
- 空安全与作用域函数

### 12. 类型系统
- 基本类型
- 类型转换
- 可空类型
- 泛型
- 泛型函数和类
- 类型擦除
- 类型别名
- 密封类和枚举类
- 智能类型转换

## 技术栈

- Kotlin 1.9.24
- Gradle 7.0+
- Kotlin Coroutines 1.7.3

## 学习建议

1. 从基础语法开始，逐步学习各个知识点
2. 运行每个demo，观察输出结果
3. 修改demo中的代码，尝试不同的用法
4. 将所学知识应用到实际项目中
5. 查阅Kotlin官方文档，深入理解各个特性

通过这个项目的学习，您将掌握Kotlin的核心特性，为Android开发打下坚实的基础。