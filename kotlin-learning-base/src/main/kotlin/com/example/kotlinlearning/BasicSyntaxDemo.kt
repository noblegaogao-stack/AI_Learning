package com.example.kotlinlearning

object BasicSyntaxDemo {
    fun run() {
        println("===== 基础语法演示 =====")
        
        // 1. 变量声明
        // val 声明不可变变量（类似Java的final）
        val name = "Kotlin"
        // var 声明可变变量
        var age = 5
        println("Name: $name, Age: $age")
        
        // 2. 类型推断
        // Kotlin会自动推断类型，但也可以显式声明
        val explicitInt: Int = 42
        val explicitString: String = "Hello"
        println("Explicit types: $explicitInt, $explicitString")
        
        // 3. 函数定义
        fun sum(a: Int, b: Int): Int {
            return a + b
        }
        
        // 单表达式函数
        fun multiply(a: Int, b: Int) = a * b
        
        println("Sum: ${sum(10, 20)}")
        println("Multiply: ${multiply(5, 6)}")
        
        // 4. 控制流
        // if-else 表达式
        val max = if (10 > 5) 10 else 5
        println("Max: $max")
        
        // when 表达式（替代Java的switch）
        val number = 3
        val result = when (number) {
            1 -> "One"
            2 -> "Two"
            3 -> "Three"
            else -> "Other"
        }
        println("When result: $result")
        
        // 5. 循环
        // for 循环
        println("For loop:")
        for (i in 1..5) {
            println(i)
        }
        
        // while 循环
        println("While loop:")
        var counter = 0
        while (counter < 3) {
            println(counter)
            counter++
        }
        
        // 6. 字符串模板
        val message = "Hello, $name! You are $age years old."
        println("String template: $message")
        
        // 7. 空安全操作符
        // 注意：这里只是简单介绍，详细的空安全在NullSafetyDemo中讲解
        val nullableString: String? = null
        val length = nullableString?.length ?: 0
        println("Nullable string length: $length")
    }
}