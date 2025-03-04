---
title: 开发环境搭建
icon: fab fa-markdown
order: 3
category:
  - Linux
tag:
  - Markdown
---

#### sudo 免密码

```shell
sudo vim /etc/sudoers
# wsl(新建 sudoer 配置文件)
sudo vim /etc/sudoers.d/<用户名>
```

2、在上面的文件里添加 sudo 免密配置

```properties
<用户名> ALL=(ALL) NOPASSWD:ALL
```

#### ssh配置

```shell
# 编辑sshd配置
sudo vim /etc/ssh/sshd_config

# 允许使用root用户通过SSH进行远程登录
PermitRootLogin yes
# 允许使用密码进行SSH认证
PasswordAuthentication yes

# 保持长连接
ClientAliveInterval 0
ClientAliveCountMax 0
```

#### 修改分辨率

```shell
# 列出可用的分辨率
xrandr -q
# 修改分辨率
xrandr --output <显示器名称> --mode <分辨率>

# 例如：
xrandr --output HDMI-1 --mode 1920x1080_60.00

# 添加分辨率
# 使用 cvt 命令生成新的模式行。例如，要创建一个 1920x1080 的分辨率：
cvt 1920 1080
# 这将输出一个类似于以下内容的模式行：
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
# Modeline "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync

# 复制输出中的整个 Modeline 行（不包括 # 号），然后使用 xrandr 命令添加新的模式：
xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync

# 然后，使用 xrandr 命令将新模式添加到您的显示器上：

xrandr --addmode <显示器名称> 1920x1080_60.00

# 如果您的显示器是主显示器，则可以使用 --output 参数指定它的名称。例如，如果您的显示器名称为 HDMI-1，则可以使用以下命令将新分辨率添加到显示器上：

xrandr --output HDMI-1 --mode 1920x1080_60.00
请注意，这些命令可能需要根据您的系统和硬件进行调整。W
```

#### 修改用户目录的中文文件夹为英文

```shell
# xdg-user-dirs-gtk-update 是一个用于更新用户目录的工具，通常情况下已经预装在大多数 Linux 发行版中。如果您使用的是 Debian、Ubuntu、Fedora、openSUSE 或 Arch Linux 等主流发行版，那么 xdg-user-dirs-gtk-update 应该已经预装在您的系统中了，无需手动安装。如果您使用的是其他发行版或者自己编译的系统，则可能需要手动安装该工具
sudo apt install xdg-user-dirs-gtk

export LANG=en_US

xdg-user-dirs-gtk-update
# 跳出对话框询问是否将目录转化为英文路径,同意并关闭

export LANG=zh_CN.UTF-8
```

#### nmap扫描

```shell
# nmap扫描所有端口
nmap -p- 127.0.0.1
# 扫描指定端口是否开启
nmap -p 6379 127.0.0.1
```

#### 在 Debian 上安装 MySQL

```shell
# (ubuntu自带mysql源，可直接跳到最后一步安装)

# 将 MySQL APT 存储库添加到系统，先到MySQL存储库下载页面，并使用以下wget命令下载最新的发行包：
wget http://repo.mysql.com/mysql-apt-config_0.8.33-1_all.deb

# 下载完成后，通过以下命令安装:
sudo dpkg -i mysql-apt-config_0.8.33-1_all.deb
# 你将会看到MySQL配置安装菜单，选择你要安装的版本。
# 默认选择了 MySQL 8.0，如果要安装 MySQL 5.7，请选择 MySQL Server ＆ Cluster（当前选择：mysql-8.0），然后选择对应的 MySQL 版本。
# 通过按 Tab 键选择 “确定”，然后按 Enter 键

# 更新软件包，并安装MySQL
sudo apt update
sudo apt install mysql-server
```

### 配置mysql

```shell

mysql_secure_installation
# 命令查看MySQL数据库自动设置的随机账户与密码
cat /etc/mysql/debian.cnf
# 使用这组账户与密码进行MySQL登录
mysql -u user -p pass
use mysql;
update user set authentication_string='' where user='root';

# 查看所有用户及其权限
SELECT user,host FROM mysql.user;

# 修改MySQL用户密码
alter user 'root'@'localhost' identified with mysql_native_password by 'password';
# 刷新权限
flush privileges;
# 退出mysql命令行
exit
# 重启mysql服务
systemctl restart mysql
service mysql restart

# 创建用户
CREATE USER 'username'@'host' IDENTIFIED BY 'password';

# 修改host
update user set host = '%' where user = 'root';

RENAME USER 'root'@'localhost' TO 'root'@'%';

# 赋予用户权限
GRANT privileges ON databasename.tablename TO 'username'@'host'；
# 例(在table1库中的user 授权miko用户):
GRANT SELECT,INSERT ON table1.user TO 'miko'@'%';
GRANT ALL ON *.* TO 'username'@'host';
grant all privileges on *.* to 'username'@'host';

# 撤销用户权限命令:
REVOKE privilege ON databasename.tablename FROM 'username'@'host';

# 权限种类privileges
# select,insert,update,delete,create,drop,index,alter,grant,references,reload,shutdown,process,file

# 通过mysqladmin修改密码
mysqladmin -u username -h hostname -p password "newpwd"
# Enter password: oldpwd

# 删除用户命令:
DROP USER 'username'@'host';

## linux修改配置文件实现远程连接（寻找bind-address所在的文件位置）
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
## 默认情况下，为127.0.0.1
## bind-address = 0.0.0.0
```

### Node Version Manager (nvm) 笔记

```shell
# nvm下载
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm --version
```

```shell
# nvm使用

# 列出所有远程服务器的版本
nvm ls-remote

# 安装最新版本的Node.js
nvm install latest

# 安装指定版本的Node.js
nvm install 20.11.0

# 查看当前已安装的Node.js版本,可以缩写为 nvm ls
nvm list

# 切换到指定版本的Node.js
nvm use 20.11.0

# 删除指定版本的Node.js
nvm uninstall 14.17.0

# 设置Node镜像地址
nvm node_mirror https://npmmirror.com/mirrors/node/

# 设置npm镜像地址
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

#### npm换源

```shell
# npm查看当前源
npm config get registry

# npm更换国内源镜像
npm config set registry https://registry.npmmirror.com/

npm 官方原始镜像：https://registry.npmjs.org/
淘宝 NPM 镜像：https://registry.npmmirror.com/
阿里云 NPM 镜像：https://npm.aliyun.com/
腾讯云 NPM 镜像：https://mirrors.cloud.tencent.com/npm/
华为云 NPM 镜像：https://mirrors.huaweicloud.com/repository/npm/
网易 NPM 镜像：https://mirrors.163.com/npm/
中科院大学开源镜像站：http://mirrors.ustc.edu.cn/
```

#### MAVEN配置

```shell
# debian和ubuntu使用apt下载(一般版本较低，但无需配置环境变量)
apt install maven
# 官网下载
wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz
tar -xzvf apache-maven-3.9.9-bin.tar.gz -C /opt

#配置环境变量
export MAVEN_HOME=/opt/apache-maven-3.9.9
export M2_HOME=/opt/apache-maven-3.9.9
export PATH=$M2_HOME/bin:$PATH

# 验证maven环境
mvn -v
```

#### MAVEN配置阿里云

```shell
# 在<mirrors>下添加
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <mirrorOf>*</mirrorOf>
      <url>https://maven.aliyun.com/repository/public/</url>
    </mirror>
```
#### JAVA环境配置

```shell
# 安装jdk
apt install openjdk-17-jdk
apt install openjdk-21-jdk

# 查看安装jdk的版本
update-java-alternatives --list
# jdk版本更换
update-java-alternatives --set /usr/lib/jvm/java-1.17.0-openjdk-amd64

#临时配置环境变量
export JAVA_HOME=/usr/lib/jvm/java-1.17.0-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

#### Git配置

```shell
# 配置用户名
git config --global user.name "username"
# 配置密码
git config --global user.password "password"
# 配置用户邮箱
git config --global user.email "email"
# 保存认证信息
git config --global credential.helper store

# windows下防止克隆文件时自动转换换行符
git config --global core.autocrlf input
```

#### 配置代理服务

```shell
su -
# v2ray
https://github.com/233boy/v2ray
# v2ray一键安装脚本
bash <(curl -s -L https://git.io/v2ray.sh)
# 或者
bash <(wget -qO- -o- https://git.io/v2ray.sh)

# Xray
https://233boy.com/xray/xray-script/
# Xray一键安装脚本
bash <(wget -qO- -o- https://github.com/233boy/Xray/raw/main/install.sh)
# 下载clash连接的yaml模板
http://v2xtls.org/clash_template2.yaml
```
