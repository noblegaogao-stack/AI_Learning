package com.example.kotlinlearning

object DataClassDemo {
    // 数据类定义
    // data关键字会自动生成equals()、hashCode()、toString()、copy()等方法
    data class User(val id: Int, val name: String, val email: String)
    
    fun run() {
        println("===== 数据类演示 =====")
        
        // 1. 创建数据类实例
        val user1 = User(1, "Alice", "alice@example.com")
        val user2 = User(2, "Bob", "bob@example.com")
        val user3 = User(1, "Alice", "alice@example.com")
        
        // 2. 自动生成的toString()方法
        println("User1: $user1")
        println("User2: $user2")
        
        // 3. 自动生成的equals()方法
        println("user1 == user2: ${user1 == user2}")
        println("user1 == user3: ${user1 == user3}")
        
        // 4. 自动生成的hashCode()方法
        println("user1 hashCode: ${user1.hashCode()}")
        println("user3 hashCode: ${user3.hashCode()}")
        
        // 5. copy()方法
        // 复制对象并修改部分属性
        val user4 = user1.copy(email = "alice.new@example.com")
        println("Original user: $user1")
        println("Copied user: $user4")
        
        // 6. 解构声明
        // 将数据类的属性解构为变量
        val (id, name, email) = user1
        println("Destructured: id=$id, name=$name, email=$email")
        
        // 7. 数据类的组件函数
        // 数据类自动生成component1()、component2()等方法
        println("Component 1: ${user1.component1()}")
        println("Component 2: ${user1.component2()}")
        println("Component 3: ${user1.component3()}")
        
        // 8. 数据类与集合
        val users = listOf(user1, user2, user3, user4)
        println("Users list: $users")
        
        // 9. 数据类的不可变性
        // 数据类的属性默认是val（不可变），如果需要可变属性，需要显式声明为var
        data class MutableUser(var id: Int, var name: String, var email: String)
        val mutableUser = MutableUser(1, "Charlie", "charlie@example.com")
        mutableUser.name = "Charlie Brown"
        println("Mutable user: $mutableUser")
    }
}