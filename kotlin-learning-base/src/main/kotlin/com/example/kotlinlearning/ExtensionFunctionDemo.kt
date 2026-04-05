package com.example.kotlinlearning

object ExtensionFunctionDemo {
    // 1. 为String类添加扩展函数
    fun String.isEmail(): Boolean {
        val emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$".toRegex()
        return emailRegex.matches(this)
    }
    
    // 2. 为Int类添加扩展函数
    fun Int.isEven(): Boolean {
        return this % 2 == 0
    }
    
    fun Int.isOdd(): Boolean {
        return this % 2 != 0
    }
    
    // 3. 为List<T>添加扩展函数
    fun <T> List<T>.printElements() {
        this.forEach { println(it) }
    }
    
    // 4. 扩展属性
    val String.lengthInWords: Int
        get() = this.split(" ").size
    
    // 5. 带接收者的Lambda
    fun buildString(action: StringBuilder.() -> Unit): String {
        val sb = StringBuilder()
        sb.action()
        return sb.toString()
    }
    
    fun run() {
        println("===== 扩展函数演示 =====")
        
        // 测试String扩展函数
        val email = "user@example.com"
        val notEmail = "user.example.com"
        println("$email is email: ${email.isEmail()}")
        println("$notEmail is email: ${notEmail.isEmail()}")
        
        // 测试Int扩展函数
        val number = 42
        println("$number is even: ${number.isEven()}")
        println("$number is odd: ${number.isOdd()}")
        
        // 测试List扩展函数
        val numbers = listOf(1, 2, 3, 4, 5)
        println("List elements:")
        numbers.printElements()
        
        // 测试扩展属性
        val sentence = "Hello Kotlin World"
        println("Sentence: $sentence")
        println("Length in words: ${sentence.lengthInWords}")
        
        // 测试带接收者的Lambda
        val result = buildString {
            append("Hello ")
            append("Kotlin ")
            append("Extension Functions")
        }
        println("Built string: $result")
        
        // 6. 扩展函数的作用域
        // 扩展函数可以在文件级别定义，也可以在类中定义
        // 当在类中定义时，扩展函数只能在该类内部使用
        
        // 7. 扩展函数的优先级
        // 如果类的成员函数与扩展函数同名，成员函数会优先被调用
        
        // 8. 扩展函数的空安全
        fun String?.safeLength(): Int {
            return this?.length ?: 0
        }
        
        val nullableString: String? = null
        val nonNullableString: String = "Hello"
        println("Nullable string length: ${nullableString.safeLength()}")
        println("Non-nullable string length: ${nonNullableString.safeLength()}")
    }
}