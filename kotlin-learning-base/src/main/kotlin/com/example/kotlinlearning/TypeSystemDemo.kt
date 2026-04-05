package com.example.kotlinlearning

object TypeSystemDemo {
    fun run() {
        println("===== 类型系统演示 =====")
        
        // 1. 基本类型
        println("1. 基本类型:")
        val int: Int = 42
        val long: Long = 100L
        val double: Double = 3.14
        val float: Float = 2.71f
        val boolean: Boolean = true
        val char: Char = 'A'
        val string: String = "Hello"
        
        println("Int: $int")
        println("Long: $long")
        println("Double: $double")
        println("Float: $float")
        println("Boolean: $boolean")
        println("Char: $char")
        println("String: $string")
        
        // 2. 类型转换
        println("\n2. 类型转换:")
        val intToLong: Long = int.toLong()
        val longToInt: Int = long.toInt()
        val intToDouble: Double = int.toDouble()
        val doubleToInt: Int = double.toInt()
        
        println("Int to Long: $intToLong")
        println("Long to Int: $longToInt")
        println("Int to Double: $intToDouble")
        println("Double to Int: $doubleToInt")
        
        // 3. 可空类型
        println("\n3. 可空类型:")
        val nullableInt: Int? = null
        val nonNullableInt: Int = 42
        
        println("Nullable Int: $nullableInt")
        println("Non-nullable Int: $nonNullableInt")
        
        // 4. 泛型
        println("\n4. 泛型:")
        val genericList: List<Int> = listOf(1, 2, 3, 4, 5)
        val genericMap: Map<String, Int> = mapOf("one" to 1, "two" to 2)
        
        println("Generic List: $genericList")
        println("Generic Map: $genericMap")
        
        // 5. 泛型函数
        println("\n5. 泛型函数:")
        fun <T> printList(list: List<T>) {
            list.forEach { println(it) }
        }
        
        printList(listOf(1, 2, 3))
        printList(listOf("a", "b", "c"))
        
        // 6. 泛型类
        println("\n6. 泛型类:")
        class Box<T>(val value: T)
        
        val intBox = Box(42)
        val stringBox = Box("Hello")
        
        println("Int Box: ${intBox.value}")
        println("String Box: ${stringBox.value}")
        
        // 7. 类型擦除
        println("\n7. 类型擦除:")
        val list1 = listOf(1, 2, 3)
        val list2 = listOf("a", "b", "c")
        
        println("List1 class: ${list1::class.simpleName}")
        println("List2 class: ${list2::class.simpleName}")
        
        // 8. 类型别名
        println("\n8. 类型别名:")
        typealias UserId = Int
        typealias UserMap = Map<String, UserId>
        
        val userId: UserId = 1001
        val userMap: UserMap = mapOf("Alice" to 1001, "Bob" to 1002)
        
        println("User ID: $userId")
        println("User Map: $userMap")
        
        // 9. 密封类和枚举类
        println("\n9. 密封类和枚举类:")
        enum class Direction {
            NORTH, SOUTH, EAST, WEST
        }
        
        val direction = Direction.NORTH
        println("Direction: $direction")
        println("Direction name: ${direction.name}")
        println("Direction ordinal: ${direction.ordinal}")
        
        // 10. 智能类型转换
        println("\n10. 智能类型转换:")
        fun processValue(value: Any) {
            when (value) {
                is Int -> println("Value is an Int: $value")
                is String -> println("Value is a String: $value")
                is List<*> -> println("Value is a List with size: ${value.size}")
                else -> println("Value is of unknown type")
            }
        }
        
        processValue(42)
        processValue("Hello")
        processValue(listOf(1, 2, 3))
    }
}