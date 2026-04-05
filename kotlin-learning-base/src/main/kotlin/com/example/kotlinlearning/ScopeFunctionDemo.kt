package com.example.kotlinlearning

object ScopeFunctionDemo {
    data class Person(var name: String, var age: Int)
    
    fun run() {
        println("===== 作用域函数演示 =====")
        
        // 1. let函数
        // 用于对非空对象执行操作，返回最后一个表达式的值
        val person: Person? = Person("Alice", 30)
        val result = person?.let {
            println("Name: ${it.name}, Age: ${it.age}")
            it.age + 1
        }
        println("let result: $result")
        
        // 2. run函数
        // 用于对对象执行操作，返回最后一个表达式的值
        val person2 = Person("Bob", 25)
        val result2 = person2.run {
            name = "Robert"
            age = 26
            "Person updated: $this"
        }
        println("run result: $result2")
        println("Updated person: $person2")
        
        // 3. with函数
        // 用于对对象执行操作，返回最后一个表达式的值
        val person3 = Person("Charlie", 35)
        val result3 = with(person3) {
            name = "Charles"
            age = 36
            "Person updated: $this"
        }
        println("with result: $result3")
        println("Updated person: $person3")
        
        // 4. apply函数
        // 用于对对象执行操作，返回对象本身
        val person4 = Person("David", 40).apply {
            name = "Dave"
            age = 41
        }
        println("apply result: $person4")
        
        // 5. also函数
        // 用于对对象执行操作，返回对象本身
        val person5 = Person("Eve", 28).also {
            println("Original person: $it")
            it.name = "Eva"
            it.age = 29
        }
        println("also result: $person5")
        
        // 6. 作用域函数的选择
        // - let: 用于处理非空对象，返回结果
        // - run: 用于执行多个操作，返回结果
        // - with: 用于执行多个操作，返回结果（非扩展函数）
        // - apply: 用于初始化或配置对象，返回对象本身
        // - also: 用于执行副作用操作，返回对象本身
        
        // 7. 链式调用
        val person6 = Person("Frank", 50)
            .also { println("Before: $it") }
            .apply {
                name = "Francis"
                age = 51
            }
            .also { println("After: $it") }
        
        // 8. 空安全与作用域函数
        val nullablePerson: Person? = null
        nullablePerson?.let {
            println("Person is not null: $it")
        } ?: println("Person is null")
    }
}