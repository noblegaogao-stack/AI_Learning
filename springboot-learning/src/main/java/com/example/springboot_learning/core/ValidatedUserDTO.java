package com.example.springboot_learning.core;

import jakarta.validation.constraints.*;

/**
 * 带有验证注解的用户DTO
 * 用于演示Spring Boot的数据验证功能
 */
public class ValidatedUserDTO {
    @NotBlank(message = "姓名不能为空")
    @Size(min = 2, max = 50, message = "姓名长度必须在2到50个字符之间")
    private String name;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 18, message = "年龄必须大于等于18岁")
    @Max(value = 120, message = "年龄必须小于等于120岁")
    private int age;

    // 构造方法
    public ValidatedUserDTO() {
    }

    public ValidatedUserDTO(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // Getter和Setter方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // toString方法
    @Override
    public String toString() {
        return "ValidatedUserDTO{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                '}';
    }
}
