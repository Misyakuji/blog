---
title: maven使用指南
icon: fab fa-markdown
order: 2
category:
  - maven
tag:
  - Markdown
---

# Apache Maven 3.9.9 全栈开发指南

## 一、环境部署与优化

### 1.1 最新版安装（Ubuntu）
```bash
# 安装JDK17
sudo apt install openjdk-17-jdk

# 下载并解压Maven
wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz
sudo tar -xzf apache-maven-3.9.9-bin.tar.gz -C /opt
echo 'export PATH=$PATH:/opt/apache-maven-3.9.9/bin' >> ~/.bashrc
source ~/.bashrc
```

### 1.2 阿里云镜像配置
```xml
<!-- ~/.m2/settings.xml -->
<settings>
  <mirrors>
    <mirror>
      <id>aliyun</id>
      <url>https://maven.aliyun.com/repository/public</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  
  <profiles>
    <profile>
      <id>jdk17</id>
      <activation>
        <jdk>17</jdk>
      </activation>
      <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
      </properties>
    </profile>
  </profiles>
</settings>
```

## 二、核心生命周期命令

### 2.1 基础构建流程
```bash
mvn clean               # 清理构建产物
mvn compile             # 编译主代码
mvn test                # 执行单元测试
mvn package             # 生成JAR/WAR包
mvn install             # 安装到本地仓库
mvn deploy              # 部署到远程仓库
```

### 2.2 多模块项目操作
```bash
mvn -pl user-service clean install    # 构建指定模块
mvn -pl order-service -am install     # 构建模块及依赖
mvn -T 4 clean install                # 4线程并行构建
```

## 三、SpringBoot集成实践

### 3.1 项目配置模板
```xml
<!-- pom.xml -->
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.3.0</version>
</parent>

<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <excludes>
          <exclude>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
          </exclude>
        </excludes>
      </configuration>
    </plugin>
  </plugins>
</build>
```

### 3.2 热部署配置
```bash
# 添加开发工具依赖
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <optional>true</optional>
</dependency>
```

## 四、GraalVM原生镜像构建

### 4.1 环境配置
```bash
# 安装GraalVM 23.0.0
sdk install java 23.0.0-graal
gu install native-image
```

### 4.2 项目配置
```xml
<!-- pom.xml -->
<plugin>
  <groupId>org.graalvm.buildtools</groupId>
  <artifactId>native-maven-plugin</artifactId>
  <version>0.10.0</version>
  <executions>
    <execution>
      <goals>
        <goal>compile-no-fork</goal>
      </goals>
    </execution>
  </executions>
  <configuration>
    <mainClass>com.example.Application</mainClass>
    <buildArgs>
      --initialize-at-build-time=org.slf4j
      -H:+ReportExceptionStackTraces
    </buildArgs>
  </configuration>
</plugin>
```

### 4.3 构建与运行
```bash
mvn -Pnative native:compile  # 生成原生可执行文件
./target/app                 # 运行原生应用（启动速度<0.1s）
```

## 五、常见问题排查方案

### 5.1 依赖冲突
```bash
# 分析依赖树
mvn dependency:tree -Dincludes=com.google.guava 

# 排除冲突依赖
<exclusions>
  <exclusion>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
  </exclusion>
</exclusions>
```

### 5.2 测试失败处理
```xml
<!-- 跳过测试 -->
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <skipTests>true</skipTests>
  </configuration>
</plugin>
```

### 5.3 打包失败排查
```bash
# 检查POM配置
mvn help:effective-pom

# 强制更新依赖
mvn clean install -U
```

## 六、高级配置技巧

### 6.1 离线模式构建
```bash
mvn -o clean install  # 禁用网络下载
```

### 6.2 镜像仓库发布
```xml
<!-- settings.xml 添加发布凭证 -->
<servers>
  <server>
    <id>ossrh</id>
    <username>${env.OSSRH_USER}</username>
    <password>${env.OSSRH_PASS}</password>
  </server>
</servers>
```

> **文档版本**：2025.3.5 | 
> **测试环境**：Ubuntu 22.04 LTS + JDK17 + Maven 3.9.9  
