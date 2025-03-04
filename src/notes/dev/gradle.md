---
title: Gradle使用指南
icon: fab fa-markdown
order: 2
category:
  - maven
tag:
  - Markdown
---
# Gradle 8.10 全栈开发指南（2025 Ubuntu 专版）

## 一、环境部署与优化

### 1.1 最新版安装（Ubuntu）
```bash
# 安装JDK21
sudo apt install openjdk-21-jdk

# 通过sdkman安装Gradle
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install gradle 8.10

# 安装GraalVM 23.0.0
sdk install java 23.0.0-graal
gu install native-image
```

### 1.2 镜像加速配置
```groovy
// ~/.gradle/init.gradle
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public' }
        mavenCentral()
    }
}
```

## 二、核心生命周期命令

### 2.1 基础构建流程
```bash
gradle clean           # 清理构建产物
gradle build           # 编译并打包项目
gradle test            # 执行单元测试
gradle run             # 运行应用程序
gradle dependencies    # 显示依赖树
```

### 2.2 多模块项目操作
```bash
gradle :app:build      # 构建指定子模块
gradle build --parallel # 并行构建加速
gradle build --scan    # 生成构建分析报告
```

## 三、SpringBoot集成实践

### 3.1 项目配置模板
```groovy
// build.gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.2.0'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

bootRun {
    jvmArgs = ['-Dspring.profiles.active=dev']
}
```

### 3.2 热部署配置
```groovy
// build.gradle
dependencies {
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
}
```

## 四、GraalVM原生镜像构建

### 4.1 项目配置
```groovy
// build.gradle
plugins {
    id 'org.graalvm.buildtools.native' version '0.10.2'
}

graalvmNative {
    binaries {
        main {
            imageName = 'app'
            buildArgs.add('-O4')
            buildArgs.add('--initialize-at-build-time=org.slf4j')
        }
    }
}
```

### 4.2 构建与运行
```bash
gradle nativeCompile   # 生成原生可执行文件
./build/native/nativeCompile/app  # 运行（启动速度<0.1s）
```

## 五、常见问题排查方案

### 5.1 依赖冲突处理
```groovy
// build.gradle
dependencies {
    implementation('com.example:lib') {
        exclude group: 'org.slf4j', module: 'slf4j-api'
    }
}
```

### 5.2 构建失败排查
```bash
gradle build --stacktrace # 显示完整堆栈信息
gradle clean --refresh-dependencies # 刷新依赖缓存
```

### 5.3 GraalVM构建问题
```bash
# 反射配置文件
src/main/resources/META-INF/native-image/reflect-config.json
```

## 六、高级配置技巧

### 6.1 构建性能优化
```groovy
// gradle.properties
org.gradle.caching=true
org.gradle.parallel=true
org.gradle.daemon=true
```

### 6.2 自定义构建扫描
```bash
gradle build --scan -Dscan.tag.ENV=prod
```

## 七、实用扩展插件

### 7.1 代码质量检查
```groovy
plugins {
    id 'checkstyle'
    id 'pmd'
}

checkstyle {
    toolVersion = '10.12.5'
    configFile = file("config/checkstyle/checkstyle.xml")
}
```
> **文档版本**：2025.3.5 | 
> **测试环境**：Ubuntu 22.04 LTS + JDK17 + Maven 3.9.9  