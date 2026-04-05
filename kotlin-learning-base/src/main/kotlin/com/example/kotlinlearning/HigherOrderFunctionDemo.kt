package com.example.kotlinlearning

object HigherOrderFunctionDemo {
    // 1. 函数作为参数
    fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
        return operation(a, b)
    }
    
    // 2. 函数作为返回值
    fun createMultiplier(factor: Int): (Int) -> Int {
        return { number -> number * factor }
    }
    
    // 3. 高阶函数与集合操作
    fun processList(numbers: List<Int>, transform: (Int) -> Int): List<Int> {
        return numbers.map(transform)
    }
    
    // 4. 内联函数
    // inline关键字可以减少函数调用的开销
    inline fun measureTime(block: () -> Unit) {
        val start = System.currentTimeMillis()
        block()
        val end = System.currentTimeMillis()
        println("Execution time: ${end - start}ms")
    }
    
    fun run() {
        println("===== 高阶函数演示 =====")
        
        // 测试函数作为参数
        val sum = calculate(10, 20) { a, b -> a + b }
        val product = calculate(10, 20) { a, b -> a * b }
        println("Sum: $sum")
        println("Product: $product")
        
        // 测试函数作为返回值
        val double = createMultiplier(2)
        val triple = createMultiplier(3)
        println("Double 5: ${double(5)}")
        println("Triple 5: ${triple(5)}")
        
        // 测试高阶函数与集合操作
        val numbers = listOf(1, 2, 3, 4, 5)
        val squared = processList(numbers) { it * it }
        val doubled = processList(numbers) { it * 2 }
        println("Original list: $numbers")
        println("Squared list: $squared")
        println("Doubled list: $doubled")
        
        // 测试内联函数
        println("Measuring time:")
        measureTime {
            Thread.sleep(100)
            println("Task completed")
        }
        
        // 5. 函数类型的变量
        val operation: (Int, Int) -> Int = { a, b -> a + b }
        println("Operation result: ${operation(10, 20)}")
        
        // 6. 柯里化函数
        fun curriedAdd(a: Int): (Int) -> Int {
            return { b -> a + b }
        }
        
        val add5 = curriedAdd(5)
        println("Add 5 to 10: ${add5(10)}")
        
        // 7. 函数组合
        fun compose(f: (Int) -> Int, g: (Int) -> Int): (Int) -> Int {
            return { x -> f(g(x)) }
        }
        
        val add2 = { x: Int -> x + 2 }
        val multiply3 = { x: Int -> x * 3 }
        val composed = compose(add2, multiply3)
        println("Composed function result: ${composed(5)}")
    }
}