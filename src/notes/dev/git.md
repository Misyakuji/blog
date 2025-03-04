---
title: Git使用指南
icon: fab fa-markdown
order: 2
category:
  - git
tag:
  - Markdown
---

# Git 2025 终极指南

## 一、环境配置与初始化

### 1.1 安装最新版 Git
```bash
# Ubuntu 安装（支持2025 LTS版本）
sudo apt update && sudo apt upgrade -y
sudo apt install git -y

# 验证安装版本
git --version
# 输出示例：git version 2.47.1 
```

### 1.2 全局配置（必须）
```bash
git config --global user.name "YourName"
git config --global user.email "your@email.com"
git config --global core.editor "vim"          # 设置默认编辑器
git config --global init.defaultBranch main    # 默认分支名 
```

### 1.3 SSH 密钥配置
```bash
ssh-keygen -t ed25519 -C "your@email.com"      # 生成更安全的密钥
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519                     # 添加密钥到代理
cat ~/.ssh/id_ed25519.pub                     # 复制到代码平台 
```

---

## 二、核心工作流程

### 2.1 项目初始化
```bash
git clone git@github.com:user/repo.git        # 克隆远程仓库
cd repo
git checkout -b dev                          # 创建开发分支
```

### 2.2 日常开发流程
```bash
# 修改文件后...
git add .                                     # 添加所有修改
git commit -m "feat: 添加用户登录功能"          # 语义化提交信息
git pull origin main --rebase                # 变基更新
git push origin dev                          # 推送到远程 
```

### 2.3 分支管理策略
| 分支类型   | 命名规范       | 生命周期 | 操作权限 |
|------------|----------------|----------|----------|
| main       | main           | 永久     | 只读     |
| release    | release/v1.2.3 | 中期     | 开发     |
| hotfix     | hotfix/#issue  | 短期     | 开发     |
| feature    | feature/login  | 短期     | 开发     |

---

## 三、高阶操作技巧

### 3.1 代码合并与冲突解决
```bash
git checkout main
git merge dev                                # 合并开发分支
# 出现冲突时：
git status                                  # 查看冲突文件
vim <conflict-file>                        # 手动解决冲突
git add . && git commit -m "解决合并冲突" 
```

### 3.2 历史记录操作
```bash
git log --graph --oneline                   # 图形化历史
git rebase -i HEAD~3                       # 交互式变基
git reset --soft HEAD~1                    # 撤销上次提交 
```

### 3.3 紧急修复流程
```bash
git stash                                   # 暂存当前修改
git checkout -b hotfix/security-patch
# 修复代码...
git commit -m "紧急修复安全漏洞"
git push origin hotfix/security-patch
git stash pop                              # 恢复工作现场 
```

---

## 四、企业级最佳实践

### 4.1 Git Flow 扩展
```bash
git flow init                              # 初始化git-flow
git flow feature start payment-integration
git flow feature finish payment-integration 
```

### 4.2 自动化检查配置
```bash
# .git/hooks/pre-commit
#!/bin/sh
npm run lint                              # 提交前代码检查
npm test                                  # 运行单元测试 
```

### 4.3 大文件存储
```bash
git lfs install                          # 启用LFS
git lfs track "*.psd"                   # 跟踪设计文件
git add .gitattributes 
```

---

## 五、故障排查指南

### 5.1 常见错误处理
```bash
# 误删文件恢复
git checkout HEAD -- <file>              # 从最新提交恢复

# 提交到错误分支
git reset HEAD~1 --soft                 # 撤销提交
git stash
git checkout correct-branch
git stash pop 

# 文件权限问题
git config --global core.fileMode false  # 忽略权限变更 
```

### 5.2 网络问题排查
```bash
ssh -T git@github.com                    # 测试SSH连接
git remote -v                            # 检查远程地址
git config --global http.postBuffer 524288000  # 增大缓存 
```

---

## 六、性能优化配置

### 6.1 仓库瘦身
```bash
git gc --aggressive --prune=now         # 清理历史垃圾
git repack -ad                           # 重新打包对象 
```

### 6.2 全局忽略配置
```bash
# ~/.gitignore_global
.DS_Store
.idea/
*.log 
```

> **文档版本**：2025.3.5 | **测试环境**：Ubuntu 22.04 LTS  