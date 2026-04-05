package com.example.springboot_learning.core;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import java.util.Random;

/**
 * 自定义健康检查指示器
 * 用于演示Spring Boot Actuator的自定义健康检查功能
 */
@Component
public class CustomHealthIndicator implements HealthIndicator {

    private final Random random = new Random();

    @Override
    public Health health() {
        // 模拟健康检查逻辑
        boolean isHealthy = checkHealth();
        
        if (isHealthy) {
            return Health.up()
                    .withDetail("status", "UP")
                    .withDetail("message", "应用运行正常")
                    .build();
        } else {
            return Health.down()
                    .withDetail("status", "DOWN")
                    .withDetail("message", "应用运行异常")
                    .build();
        }
    }

    /**
     * 模拟健康检查逻辑
     * @return 是否健康
     */
    private boolean checkHealth() {
        // 90%的概率返回健康
        return random.nextDouble() < 0.9;
    }
}
