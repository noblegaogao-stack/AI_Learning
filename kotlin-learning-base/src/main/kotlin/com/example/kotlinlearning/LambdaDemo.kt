package com.example.kotlinlearning

object LambdaDemo {
    fun run() {
        println("===== Lambda表达式演示 =====")
        
        // 1. Lambda的基本语法
        // 语法：{ 参数 -> 函数体 }
        val sum = { a: Int, b: Int -> a + b }
        println("Sum of 10 and 20: ${sum(10, 20)}")
        
        // 2. Lambda作为函数参数
        val numbers = listOf(1, 2, 3, 4, 5)
        val evenNumbers = numbers.filter { it % 2 == 0 }
        println("Even numbers: $evenNumbers")
        
        // 3. 省略参数类型
        // 当编译器可以推断类型时，可以省略参数类型
        val doubled = numbers.map { it * 2 }
        println("Doubled numbers: $doubled")
        
        // 4. 单个参数的简化
        // 当Lambda只有一个参数时，可以使用it代替参数名
        val squared = numbers.map { it * it }
        println("Squared numbers: $squared")
        
        // 5. 无参数的Lambda
        val hello = { println("Hello, Lambda!") }
        hello()
        
        // 6. Lambda的返回值
        // Lambda的最后一个表达式的值就是它的返回值
        val max = { a: Int, b: Int -> if (a > b) a else b }
        println("Max of 10 and 20: ${max(10, 20)}")
        
        // 7. 闭包
        // Lambda可以访问外部变量，并且可以修改它们
        var counter = 0
        val increment = { counter++ }
        increment()
        increment()
        println("Counter: $counter")
        
        // 8. 带接收者的Lambda
        // 可以使用with或apply函数来创建带接收者的Lambda
        val person = Person("Alice", 30)
        with(person) {
            println("Name: $name, Age: $age")
        }
        
        // 9. 函数引用
        // 可以使用::操作符来引用函数
        val numbers2 = listOf(1, 2, 3, 4, 5)
        val sortedNumbers = numbers2.sortedWith(Comparator { a, b -> a.compareTo(b) })
        println("Sorted numbers: $sortedNumbers")
        
        // 10. Lambda与集合操作
        val fruits = listOf("apple", "banana", "orange", "grape")
        
        // filter
        val longFruits = fruits.filter { it.length > 5 }
        println("Fruits with length > 5: $longFruits")
        
        // map
        val upperCaseFruits = fruits.map { it.toUpperCase() }
        println("Upper case fruits: $upperCaseFruits")
        
        // any
        val hasApple = fruits.any { it == "apple" }
        println("Has apple: $hasApple")
        
        // all
        val allLongerThan3 = fruits.all { it.length > 3 }
        println("All fruits longer than 3: $allLongerThan3")
        
        // find
        val firstLongFruit = fruits.find { it.length > 5 }
        println("First long fruit: $firstLongFruit")
    }
    
    data class Person(val name: String, val age: Int)
}