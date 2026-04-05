package com.example.kotlinlearning

import kotlinx.coroutines.*

object CoroutineDemo {
    fun run() {
        println("===== 协程演示 =====")
        
        // 1. 基本协程
        runBlocking {
            println("Start of runBlocking")
            launch {
                delay(1000)
                println("Hello from launch")
            }
            println("End of runBlocking")
        }
        
        // 2. 挂起函数
        runBlocking {
            println("Calling suspend function")
            val result = doSomething()
            println("Result: $result")
        }
        
        // 3. 协程作用域
        CoroutineScope(Dispatchers.Default).launch {
            println("Coroutine in Default dispatcher")
        }
        
        // 4. 等待协程完成
        runBlocking {
            val job = launch {
                delay(1000)
                println("Job completed")
            }
            println("Waiting for job")
            job.join()
            println("Job joined")
        }
        
        // 5. 异步操作
        runBlocking {
            val deferred1 = async {
                delay(1000)
                "Result 1"
            }
            val deferred2 = async {
                delay(1500)
                "Result 2"
            }
            
            println("Waiting for async results")
            val result1 = deferred1.await()
            val result2 = deferred2.await()
            println("Async results: $result1, $result2")
        }
        
        // 6. 协程取消
        runBlocking {
            val job = launch {
                repeat(10) {
                    delay(100)
                    println("Working... $it")
                }
            }
            delay(500)
            println("Cancelling job")
            job.cancel()
            job.join()
            println("Job cancelled")
        }
        
        // 7. 异常处理
        runBlocking {
            try {
                val job = launch {
                    throw Exception("Coroutine exception")
                }
                job.join()
            } catch (e: Exception) {
                println("Caught exception: ${e.message}")
            }
        }
    }
    
    // 挂起函数
    suspend fun doSomething(): String {
        delay(1000)
        return "Done"
    }
}