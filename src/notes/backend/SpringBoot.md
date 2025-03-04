---
title: SpringBoot
icon: pen-to-square
order: 2
date: 2025-03-05
category:
  - 后端
tag:
  - 框架
---

# SpringBoot

Spring Boot 是一个用于简化 Spring 应用程序开发的框架，它提供了一种开箱即用的方式来创建和部署 Spring 应用程序。以下是 Spring Boot 的一些核心知识点：

## 1. 什么是SpringBoot？

Spring Boot 是一个基于 Spring 框架的扩展，用于简化 Spring 应用程序的开发和部署。它通过自动配置、起步依赖和内嵌服务器等功能，减少了开发者的配置工作量，并使得应用程序能够以独立的 JAR 文件形式运行。

## 2. 核心特性

### 2.1 自动配置

- **自动化配置**：Spring Boot 根据项目的依赖和配置自动完成 Spring 配置，减少了需要手动编写的配置代码。它通过 `@SpringBootApplication` 注解及其内部的 `@EnableAutoConfiguration` 注解实现自动配置。

### 2.2 起步依赖

- **Starter POMs**：提供了一些预定义的依赖组合，以便快速启动项目。例如：
  - `spring-boot-starter-web`：用于构建 Web 应用程序。
  - `spring-boot-starter-data-jpa`：用于与 JPA 数据库进行集成。
  - `spring-boot-starter-test`：用于测试支持。

### 2.3 内嵌服务器

- **内嵌服务器支持**：Spring Boot 支持内嵌 Tomcat、Jetty 和 Undertow 服务器。这使得应用程序可以打包为一个可执行的 JAR 文件，并在没有外部服务器的情况下运行。

### 2.4 Actuator

- **应用监控**：提供了用于监控和管理 Spring Boot 应用程序的端点。这些端点包括：
  - `/actuator/health`：用于检查应用程序的健康状态。
  - `/actuator/info`：提供应用程序的元数据和配置信息。
  - `/actuator/env`：显示应用程序的环境属性。

### 2.5 配置文件

- **application.properties / application.yml**：Spring Boot 使用 `application.properties` 或 `application.yml` 文件来管理应用程序的配置。这些文件支持不同的配置环境，如开发、测试和生产环境。

### 2.6 运行和部署

- **运行**：通过执行 `java -jar <your-application>.jar` 命令可以运行 Spring Boot 应用程序。
- **部署**：Spring Boot 应用程序可以作为独立的 JAR 文件或 WAR 文件进行部署，简化了部署流程。

## 3. Spring Boot 注解

### 3.1 @SpringBootApplication

- **作用**：这是 Spring Boot 应用程序的核心注解，包含了 `@Configuration`、`@EnableAutoConfiguration` 和 `@ComponentScan` 注解，标识一个 Spring Boot 应用程序的入口点。

### 3.2 @RestController 和 @RequestMapping

- **@RestController**：用于创建 RESTful Web 服务的控制器，结合 `@ResponseBody` 注解自动将返回的对象转换为 JSON。
- **@RequestMapping**：用于定义请求的映射路径和方法（GET、POST 等）。

### 3.3 @Component, @Service, @Repository

- **@Component**：用于标识一个普通的 Spring 组件，作为 Spring 容器中的一个 Bean。
- **@Service**：用于标识业务逻辑组件，自动被 Spring 扫描和注册。
- **@Repository**：用于标识数据访问组件，自动被 Spring 扫描和注册，并且会对数据库访问异常进行数据访问异常转换。

## 4. 配置和属性

### 4.1 配置文件位置

- **默认位置**：`src/main/resources/application.properties` 或 `src/main/resources/application.yml`。
- **环境特定配置**：可以在 `application-{profile}.properties` 或 `application-{profile}.yml` 中定义不同环境的配置，例如 `application-dev.properties` 和 `application-prod.properties`。

### 4.2 配置属性

- **自定义配置**：可以通过 `@Value` 注解或 `@ConfigurationProperties` 注解注入配置属性。
- **示例**：
  - `@Value("${server.port}")`：注入属性值。
  - `@ConfigurationProperties(prefix = "myapp")`：将属性绑定到 Java 对象上。

## 5. Spring Boot 的启动类

- **主启动类**：通常包含 `main` 方法，用于启动 Spring Boot 应用程序。主启动类通常使用 `@SpringBootApplication` 注解标识，并调用 `SpringApplication.run()` 方法启动应用程序。

## 6. 总结

Spring Boot 通过自动配置、起步依赖、内嵌服务器和 Actuator 等功能简化了 Spring 应用程序的开发和部署过程。它提供了一种开箱即用的方式来构建和管理 Spring 应用程序，使得开发者能够更专注于业务逻辑的实现。
