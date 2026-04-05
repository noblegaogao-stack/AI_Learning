package com.example.springboot_learning.core;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 验证演示控制器
 * 用于演示Spring Boot的数据验证功能
 */
@RestController
@RequestMapping("/api/validation")
public class ValidationController {

    /**
     * 演示数据验证
     * @param userDTO 带有验证注解的用户DTO
     * @return 验证结果
     */
    @PostMapping("/user")
    public ResponseEntity<String> validateUser(@Valid @RequestBody ValidatedUserDTO userDTO) {
        // 如果验证通过，返回成功消息
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("用户创建成功: " + userDTO);
    }
}
