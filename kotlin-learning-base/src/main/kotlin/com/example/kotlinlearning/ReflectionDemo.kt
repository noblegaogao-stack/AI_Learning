package com.example.kotlinlearning

import kotlin.reflect.KClass
import kotlin.reflect.full.declaredFunctions
import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.full.memberFunctions
import kotlin.reflect.full.primaryConstructor

object ReflectionDemo {
    data class Person(val name: String, val age: Int) {
        fun sayHello() {
            println("Hello, my name is $name")
        }
        
        fun getAge() = age
    }
    
    fun run() {
        println("===== 反射演示 =====")
        
        // 1. 获取类引用
        val personClass: KClass<Person> = Person::class
        println("Class name: ${personClass.simpleName}")
        
        // 2. 获取主构造函数
        val constructor = personClass.primaryConstructor
        println("Primary constructor: $constructor")
        
        // 3. 创建实例
        val person = constructor?.call("Alice", 30)
        println("Created person: $person")
        
        // 4. 获取成员属性
        println("\nMember properties:")
        personClass.declaredMemberProperties.forEach { property ->
            println("Property: ${property.name}, Type: ${property.returnType}")
        }
        
        // 5. 获取成员函数
        println("\nMember functions:")
        personClass.declaredFunctions.forEach { function ->
            println("Function: ${function.name}, Parameters: ${function.parameters}")
        }
        
        // 6. 调用方法
        println("\nCalling methods:")
        val sayHelloFunction = personClass.memberFunctions.find { it.name == "sayHello" }
        sayHelloFunction?.call(person)
        
        val getAgeFunction = personClass.memberFunctions.find { it.name == "getAge" }
        val age = getAgeFunction?.call(person)
        println("Person age: $age")
        
        // 7. 访问属性
        println("\nAccessing properties:")
        val nameProperty = personClass.declaredMemberProperties.find { it.name == "name" }
        val nameValue = nameProperty?.get(person)
        println("Person name: $nameValue")
        
        val ageProperty = personClass.declaredMemberProperties.find { it.name == "age" }
        val ageValue = ageProperty?.get(person)
        println("Person age: $ageValue")
        
        // 8. 反射与泛型
        println("\nReflection with generics:")
        val list = listOf(1, 2, 3)
        val listClass = list::class
        println("List class: ${listClass.simpleName}")
        
        // 9. 反射与注解
        println("\nReflection with annotations:")
        val annotatedClass = AnnotatedClass::class
        val annotations = annotatedClass.annotations
        annotations.forEach { annotation ->
            println("Annotation: ${annotation.annotationClass.simpleName}")
        }
    }
    
    @Target(AnnotationTarget.CLASS)
    annotation class MyAnnotation(val value: String)
    
    @MyAnnotation("Test")
    class AnnotatedClass {
        val value = "Annotated"
    }
}