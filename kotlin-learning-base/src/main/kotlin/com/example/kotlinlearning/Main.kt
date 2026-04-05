package com.example.kotlinlearning

fun main() {
    println("===== Kotlin 学习项目 =====")
    println("1. 基础语法")
    println("2. 空安全")
    println("3. 数据类")
    println("4. 密封类")
    println("5. 扩展函数")
    println("6. 高阶函数")
    println("7. Lambda 表达式")
    println("8. 协程")
    println("9. 委托")
    println("10. 反射")
    println("11. 作用域函数")
    println("12. 类型系统")
    
    println("\n请输入要运行的demo编号:")
    val input = readlnOrNull()?.toIntOrNull()
    
    when (input) {
        1 -> BasicSyntaxDemo.run()
        2 -> NullSafetyDemo.run()
        3 -> DataClassDemo.run()
        4 -> SealedClassDemo.run()
        5 -> ExtensionFunctionDemo.run()
        6 -> HigherOrderFunctionDemo.run()
        7 -> LambdaDemo.run()
        8 -> CoroutineDemo.run()
        9 -> DelegateDemo.run()
        10 -> ReflectionDemo.run()
        11 -> ScopeFunctionDemo.run()
        12 -> TypeSystemDemo.run()
        else -> println("无效的编号")
    }
}