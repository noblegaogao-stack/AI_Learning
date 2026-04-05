package com.example.kotlinlearning

object NullSafetyDemo {
    fun run() {
        println("===== 空安全演示 =====")
        
        // 1. 可空类型
        // 在类型后面加 ? 表示该类型可以为null
        val nullableString: String? = null
        val nonNullableString: String = "Hello"
        
        println("Nullable string: $nullableString")
        println("Non-nullable string: $nonNullableString")
        
        // 2. 安全调用操作符 ?.
        // 如果对象不为null，调用方法；否则返回null
        val length1 = nullableString?.length
        val length2 = nonNullableString.length
        println("Nullable length: $length1")
        println("Non-nullable length: $length2")
        
        // 3. Elvis操作符 ?: 
        // 如果左侧表达式不为null，返回左侧表达式；否则返回右侧表达式
        val result1 = nullableString ?: "Default value"
        val result2 = nonNullableString ?: "Default value"
        println("Elvis result 1: $result1")
        println("Elvis result 2: $result2")
        
        // 4. 非空断言操作符 !!
        // 告诉编译器该值不为null，如果为null会抛出异常
        try {
            val length3 = nullableString!!.length
            println("Non-null assertion result: $length3")
        } catch (e: NullPointerException) {
            println("Non-null assertion threw NPE: ${e.message}")
        }
        
        // 5. 安全转换操作符 as?
        // 尝试转换类型，如果失败返回null
        val obj: Any? = "Hello"
        val str: String? = obj as? String
        val num: Int? = obj as? Int
        println("Safe cast to string: $str")
        println("Safe cast to int: $num")
        
        // 6. let函数与空安全结合
        // 当对象不为null时执行代码块
        nullableString?.let {
            println("Nullable string is not null: $it")
        } ?: println("Nullable string is null")
        
        nonNullableString.let {
            println("Non-nullable string: $it")
        }
        
        // 7. 空安全的集合操作
        val nullableList: List<String>? = null
        val size = nullableList?.size ?: 0
        println("Nullable list size: $size")
        
        // 8. 延迟初始化
        lateinit var lateInitVar: String
        lateInitVar = "Initialized"
        println("Late init variable: $lateInitVar")
    }
}