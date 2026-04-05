# 构建和部署指南

本指南介绍如何构建和部署Spring Boot学习项目。

## 环境要求

- JDK 21+
- Gradle 7.0+

## 构建项目

### 1. 编译和测试

```bash
# Windows
./gradlew build

# Linux/macOS
./gradlew build
```

### 2. 只编译，不运行测试

```bash
./gradlew build -x test
```

### 3. 运行测试

```bash
./gradlew test
```

### 4. 查看构建结果

构建成功后，可执行jar文件会生成在 `build/libs/` 目录下：

```
build/libs/springboot-learning-0.0.1-SNAPSHOT.jar
```

## 运行项目

### 1. 使用Gradle运行

```bash
./gradlew bootRun
```

### 2. 使用java命令运行jar文件

```bash
java -jar build/libs/springboot-learning-0.0.1-SNAPSHOT.jar
```

### 3. 运行参数

可以通过命令行参数或环境变量覆盖配置：

```bash
java -jar build/libs/springboot-learning-0.0.1-SNAPSHOT.jar --server.port=8081
```

## 部署方式

### 1. 传统部署

将构建生成的jar文件复制到服务器，使用java命令运行：

```bash
java -jar springboot-learning-0.0.1-SNAPSHOT.jar
```

### 2. 容器化部署

#### 创建Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY build/libs/springboot-learning-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### 构建Docker镜像

```bash
docker build -t springboot-learning .
```

#### 运行Docker容器

```bash
docker run -p 8080:8080 springboot-learning
```

### 3. 云平台部署

#### Heroku

1. 登录Heroku CLI
2. 创建新应用
3. 推送代码
4. 配置环境变量
5. 部署应用

#### AWS

1. 创建EC2实例
2. 安装Java 21
3. 上传jar文件
4. 配置系统服务
5. 启动应用

## 监控和管理

应用集成了Spring Boot Actuator，可以通过以下端点监控和管理应用：

- 健康检查：`/actuator/health`
- 信息：`/actuator/info`
- 指标：`/actuator/metrics`
- 环境：`/actuator/env`
- 配置属性：`/actuator/configprops`
- 映射：`/actuator/mappings`
- 线程：`/actuator/threaddump`
- 堆转储：`/actuator/heapdump`

## 开发工具

### 代码格式化

使用Gradle的spotless插件格式化代码：

```bash
./gradlew spotlessApply
```

### 静态代码分析

使用Checkstyle进行代码风格检查：

```bash
./gradlew checkstyleMain
```

## 故障排除

### 构建失败

- 检查JDK版本是否为21+
- 检查网络连接
- 清理Gradle缓存：`./gradlew clean`

### 运行失败

- 检查端口是否被占用
- 检查数据库连接配置
- 查看应用日志

### 测试失败

- 检查测试用例
- 查看测试日志
- 确保测试环境配置正确

## 最佳实践

1. 使用版本控制系统管理代码
2. 编写单元测试和集成测试
3. 使用CI/CD流程自动化构建和部署
4. 监控应用运行状态
5. 定期更新依赖版本
