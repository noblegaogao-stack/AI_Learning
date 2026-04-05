package com.example.springboot_learning.core;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Actuator演示控制器
 * 用于展示如何使用Spring Boot Actuator的各个端点
 */
@RestController
@RequestMapping("/api/actuator-demo")
public class ActuatorController {

    /**
     * 获取Actuator端点信息
     * @return Actuator端点列表
     */
    @GetMapping("/endpoints")
    public Map<String, String> getActuatorEndpoints() {
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("健康检查", "/actuator/health");
        endpoints.put("信息", "/actuator/info");
        endpoints.put("指标", "/actuator/metrics");
        endpoints.put("环境", "/actuator/env");
        endpoints.put("配置属性", "/actuator/configprops");
        endpoints.put("映射", "/actuator/mappings");
        endpoints.put("线程", "/actuator/threaddump");
        endpoints.put("堆转储", "/actuator/heapdump");
        return endpoints;
    }

    /**
     * 获取应用状态
     * @return 应用状态信息
     */
    @GetMapping("/status")
    public Map<String, String> getApplicationStatus() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "运行中");
        status.put("message", "Spring Boot应用运行正常");
        status.put("java.version", System.getProperty("java.version"));
        status.put("spring.boot.version", "4.0.5");
        return status;
    }
}
