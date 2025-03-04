---
title: Docker
icon: fab fa-markdown
order: 1
category:
  - Linux
tag:
  - Markdown
---

## 一、Docker环境部署

### 1.1 安装Docker引擎
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# CentOS
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
```

### 1.2 配置镜像加速
```bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 二、镜像管理

### 2.1 镜像生命周期
```bash
# 构建镜像
docker build -t myapp:v1 -f Dockerfile .

# 推送镜像
docker tag myapp:v1 registry.example.com/myapp:v1
docker push registry.example.com/myapp:v1

# 导入导出
docker save -o myapp.tar myapp:v1
docker load -i myapp.tar
```

### 2.2 镜像查询与清理
```bash
# 模糊搜索镜像
docker images --filter=reference='*redis*'

# 删除悬空镜像（推荐）
docker image prune

# 强制清理匹配镜像（慎用）
docker rmi -f $(docker images -q --filter "reference=*test*")
```

## 三、容器操作

### 3.1 容器生命周期
```bash
# 运行容器（推荐参数）
docker run -dit --name webserver \
  -p 8080:80 \
  -v /data:/app \
  --restart=unless-stopped \
  nginx:alpine

# 批量操作容器
docker stop $(docker ps -aq --filter "status=running")
docker rm -v $(docker ps -aq --filter "status=exited")
```

### 3.2 容器诊断
```bash
# 实时日志查看
docker logs -f --tail 100 webserver

# 进入容器调试
docker exec -it webserver sh

# 资源监控
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

## 四、网络与存储

### 4.1 网络配置
```bash
# 创建自定义网络
docker network create --driver=bridge --subnet=172.18.0.0/16 mynet

# 端口映射检查
docker port webserver 80

# DNS配置
docker run --dns 8.8.8.8 --dns-search example.com alpine nslookup google.com
```

### 4.2 数据持久化
```bash
# 创建数据卷
docker volume create mysql_data

# 挂载检查
docker inspect --format='{{ .Mounts }}' mysql

# 安全备份
docker run --rm -v mysql_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/mysql_backup.tar.gz -C /data .
```

## 五、Docker Compose

### 5.1 多服务编排
```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### 5.2 常用操作
```bash
# 启动服务栈
docker-compose up -d

# 查看服务日志
docker-compose logs -f --tail=100

# 水平扩展服务
docker-compose up -d --scale web=3
```

## 六、维护与优化

### 6.1 系统清理
```bash
# 安全清理（推荐）
docker system prune --volumes

# 强制清理（慎用）
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -aq)

# 定时任务配置（每天凌晨清理）
0 0 * * * /usr/bin/docker system prune -af --filter "until=24h"
```

### 6.2 性能调优
```bash
# 资源限制运行
docker run -it --cpus=0.5 --memory=512m --memory-swap=1g alpine

# 存储驱动优化
dockerd --storage-driver=overlay2

# 日志轮转配置
docker run --log-driver=json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  nginx
```

## 七、安全最佳实践

### 7.1 容器安全
```bash
# 非root用户运行
docker run -u 1001:1001 alpine

# 只读文件系统
docker run --read-only -v /data:/app/data alpine

# 能力限制
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx
```

### 7.2 镜像安全
```dockerfile
# 多阶段构建示例
FROM golang:1.18 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o /myapp

FROM alpine:3.16
COPY --from=builder /myapp /myapp
USER 1001
ENTRYPOINT ["/myapp"]
```

> **文档版本**：1.0.0 | **更新日期**：2025-03-05  