# Spring Boot学习项目

基于JDK21的Spring Boot学习项目，包含了所有重要的Java和Spring Boot知识点，通过一个知识点一个demo的方式，帮助你系统复习Java技术，成为高级开发者。

## 项目结构

```
springboot-learning/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/springboot_learning/
│   │   │       ├── Java21FeaturesDemo.java       # Java 21新特性演示
│   │   │       ├── core/
│   │   │       │   ├── User.java                 # 用户实体类
│   │   │       │   ├── UserDTO.java              # 用户数据传输对象
│   │   │       │   ├── UserService.java          # 用户服务接口
│   │   │       │   ├── UserServiceImpl.java      # 用户服务实现
│   │   │       │   ├── UserController.java       # 用户控制器
│   │   │       │   ├── Product.java              # 产品实体类
│   │   │       │   ├── ProductRepository.java    # 产品仓库
│   │   │       │   ├── ProductService.java       # 产品服务
│   │   │       │   ├── ProductController.java    # 产品控制器
│   │   │       │   ├── ValidatedUserDTO.java     # 验证用户DTO
│   │   │       │   ├── UserNotFoundException.java # 自定义异常
│   │   │       │   ├── GlobalExceptionHandler.java # 全局异常处理器
│   │   │       │   ├── ValidationController.java # 验证演示控制器
│   │   │       │   ├── CustomHealthIndicator.java # 自定义健康检查
│   │   │       │   └── ActuatorController.java   # Actuator演示控制器
│   │   └── resources/
│   │       └── application.properties            # 应用配置
│   └── test/
│       └── java/
│           └── com/example/springboot_learning/
│               ├── core/
│               │   ├── UserServiceImplTest.java  # 用户服务单元测试
│               │   └── UserControllerIntegrationTest.java # 用户控制器集成测试
├── build.gradle                                  # Gradle构建配置
├── BUILD_DEPLOY.md                               # 构建和部署指南
└── README.md                                     # 项目说明
```

## 主要功能模块

### 1. Java 21新特性演示

- **虚拟线程**：轻量级线程，由JVM管理，比传统线程更高效
- **模式匹配**：for switch和instanceof的模式匹配
- **密封类**：限制继承关系的类
- **记录类**：不可变的数据类，自动生成equals、hashCode、toString等方法
- **文本块**：支持多行字符串，更易读
- **switch表达式**：箭头语法和yield关键字
- **有序集合**：reversed()、addFirst()、addLast()等方法

### 2. Spring Boot核心功能

- **控制器**：RESTful API实现
- **服务**：业务逻辑处理
- **数据传输对象**：DTO模式
- **依赖注入**：构造方法注入
- **RESTful API**：GET、POST、PUT、DELETE方法

### 3. 数据库操作

- **JPA**：ORM框架
- **H2数据库**：内存数据库
- **仓库接口**：CRUD操作和自定义查询
- **JPQL查询**：自定义查询语句

### 4. 验证和异常处理

- **数据验证**：使用Jakarta Validation注解
- **自定义异常**：UserNotFoundException
- **全局异常处理器**：统一处理异常
- **错误响应**：标准化的错误响应格式

### 5. 监控和管理

- **Spring Boot Actuator**：应用监控
- **健康检查**：自定义健康检查指示器
- **端点**：健康、信息、指标、环境等
- **应用信息**：配置应用基本信息

### 6. 测试

- **单元测试**：UserServiceImpl的单元测试
- **集成测试**：UserController的集成测试
- **Mockito**：模拟依赖
- **MockMvc**：模拟HTTP请求

### 7. 构建和部署

- **Gradle构建**：编译、测试、打包
- **可执行jar**：独立运行
- **容器化部署**：Dockerfile
- **云平台部署**：Heroku、AWS等
- **监控和管理**：Actuator端点

## 如何运行项目

### 1. 构建项目

```bash
./gradlew build
```

### 2. 运行项目

```bash
./gradlew bootRun
```

### 3. 访问应用

- **用户管理API**：`http://localhost:8080/api/users`
- **产品管理API**：`http://localhost:8080/api/products`
- **验证演示**：`http://localhost:8080/api/validation/user`
- **Actuator端点**：`http://localhost:8080/actuator`
- **H2控制台**：`http://localhost:8080/h2-console`

### 4. 运行测试

```bash
./gradlew test
```

## 学习要点

1. **Java 21新特性**：了解虚拟线程、模式匹配、密封类等现代Java特性
2. **Spring Boot核心**：掌握控制器、服务、仓库等Spring Boot核心组件
3. **数据库操作**：学习JPA和H2数据库的使用
4. **验证和异常处理**：了解数据验证和异常处理的最佳实践
5. **监控和管理**：使用Spring Boot Actuator进行应用监控
6. **测试**：编写单元测试和集成测试
7. **构建和部署**：掌握项目构建和部署的方法

## 环境要求

- JDK 21+
- Gradle 7.0+

## 技术栈

- **Java 21**：最新的Java版本
- **Spring Boot 4.0.5**：最新的Spring Boot版本
- **Spring Web**：RESTful API
- **Spring Data JPA**：ORM框架
- **H2 Database**：内存数据库
- **Spring Boot Validation**：数据验证
- **Spring Boot Actuator**：应用监控
- **JUnit 5**：测试框架
- **Mockito**：模拟框架

## 项目目的

本项目旨在通过一个知识点一个demo的方式，帮助Java开发工程师系统复习Java技术，了解所有的Java最新用法，通过实际的项目实践成为高级开发者。

项目涵盖了从Java基础到Spring Boot高级特性的所有重要知识点，通过运行和修改代码，你可以深入了解Java和Spring Boot的最新用法，提升自己的技术水平。