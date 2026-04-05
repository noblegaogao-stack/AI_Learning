package com.example.kotlinlearning

object DelegateDemo {
    // 1. 类委托
    // 实现接口时，可以委托给其他对象
    interface Printer {
        fun print(message: String)
    }
    
    class ConsolePrinter : Printer {
        override fun print(message: String) {
            println("Console: $message")
        }
    }
    
    class LoggingPrinter(printer: Printer) : Printer by printer {
        // 可以重写委托的方法
        override fun print(message: String) {
            println("[LOG] Printing:")
            // 调用委托对象的方法
            (this as Printer).print(message)
        }
    }
    
    // 2. 属性委托
    // 自定义属性委托
    class ObservableProperty<T>(private var value: T) {
        operator fun getValue(thisRef: Any?, property: Any?): T {
            println("Getting ${property?.toString()}: $value")
            return value
        }
        
        operator fun setValue(thisRef: Any?, property: Any?, newValue: T) {
            println("Setting ${property?.toString()}: $newValue")
            value = newValue
        }
    }
    
    // 3. 使用lazy委托
    val lazyValue: String by lazy {
        println("Computing lazy value")
        "Hello, Lazy"
    }
    
    // 4. 使用Delegates.observable
    import kotlin.properties.Delegates
    var observableValue: String by Delegates.observable("Initial value") {
        property, oldValue, newValue ->
        println("${property.name} changed from $oldValue to $newValue")
    }
    
    fun run() {
        println("===== 委托演示 =====")
        
        // 测试类委托
        println("Testing class delegation:")
        val consolePrinter = ConsolePrinter()
        val loggingPrinter = LoggingPrinter(consolePrinter)
        loggingPrinter.print("Hello, World!")
        
        // 测试属性委托
        println("\nTesting property delegation:")
        class Person {
            var name by ObservableProperty("Alice")
            var age by ObservableProperty(30)
        }
        
        val person = Person()
        println("Person name: ${person.name}")
        person.name = "Bob"
        println("Person name: ${person.name}")
        
        // 测试lazy委托
        println("\nTesting lazy delegation:")
        println("First access: $lazyValue")
        println("Second access: $lazyValue")
        
        // 测试Delegates.observable
        println("\nTesting observable delegation:")
        println("Initial value: $observableValue")
        observableValue = "New value"
        observableValue = "Updated value"
        
        // 5. 使用map作为委托
        println("\nTesting map delegation:")
        val map = mapOf(
            "name" to "Charlie",
            "age" to 25
        )
        
        class PersonFromMap(map: Map<String, Any?>) {
            val name: String by map
            val age: Int by map
        }
        
        val personFromMap = PersonFromMap(map)
        println("Person from map: name=${personFromMap.name}, age=${personFromMap.age}")
    }
}