package com.example.kotlinlearning

object SealedClassDemo {
    // 密封类定义
    // sealed关键字表示该类的子类只能在同一文件中定义
    sealed class Result {
        // 密封类的子类
        data class Success(val data: String) : Result()
        data class Error(val message: String) : Result()
        object Loading : Result()
    }
    
    fun run() {
        println("===== 密封类演示 =====")
        
        // 1. 创建密封类的实例
        val successResult = Result.Success("Data loaded successfully")
        val errorResult = Result.Error("Failed to load data")
        val loadingResult = Result.Loading
        
        // 2. 使用when表达式处理密封类
        // 由于密封类的子类是有限的，when表达式可以 exhaustive
        fun processResult(result: Result) {
            when (result) {
                is Result.Success -> println("Success: ${result.data}")
                is Result.Error -> println("Error: ${result.message}")
                Result.Loading -> println("Loading...")
                // 不需要else分支，因为when表达式已经覆盖了所有可能的情况
            }
        }
        
        println("Processing success result:")
        processResult(successResult)
        
        println("Processing error result:")
        processResult(errorResult)
        
        println("Processing loading result:")
        processResult(loadingResult)
        
        // 3. 密封类与数据类结合
        // 密封类的子类可以是数据类，这样可以方便地存储数据
        
        // 4. 密封类的层次结构
        // 密封类可以有多层继承结构
        sealed class Expression
        data class Number(val value: Int) : Expression()
        data class Sum(val left: Expression, val right: Expression) : Expression()
        data class Multiply(val left: Expression, val right: Expression) : Expression()
        
        // 5. 递归处理密封类
        fun evaluate(expression: Expression): Int {
            return when (expression) {
                is Number -> expression.value
                is Sum -> evaluate(expression.left) + evaluate(expression.right)
                is Multiply -> evaluate(expression.left) * evaluate(expression.right)
            }
        }
        
        val expr = Sum(Number(10), Multiply(Number(2), Number(3)))
        println("Expression: $expr")
        println("Result: ${evaluate(expr)}")
        
        // 6. 密封类的优势
        // 1. 类型安全：编译器会检查when表达式是否覆盖了所有可能的情况
        // 2. 代码清晰：子类只能在同一文件中定义，便于管理
        // 3. 可扩展性：可以添加新的子类，但需要更新所有使用when表达式的地方
    }
}