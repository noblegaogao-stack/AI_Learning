package com.example.springboot_learning.core;

/**
 * 用户未找到异常
 * 用于演示自定义异常处理
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
