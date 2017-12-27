---
title: 使用Docker部署FlarumChina
date: 2017-08-07 10:49:51
tags: [DOCKER]
---

## 前期准备

服务器安装 Docker 和 Docker Compose

参考教程：
http://get.daocloud.io/#install-docker

没有服务器的可以在本地安装 Docker 或使用 DaoCloud 的胶囊主机, 能免费体验 120 分钟，足够学习使用

路径：自有主机 -> 集群管理 -> 添加主机

![深度截图_选择区域_20170807083400.png](https://i.loli.net/2017/08/07/5987e1158c3a8.png)

<!-- more -->

## 安装 Flarum

我们使用到的镜像是 [raincal/docker-flarum-china](https://github.com/Raincal/docker-flarum-china)

### Ports
`8888`

### Volume
- /flarum/app/assets : FlarumChina 资源目录
- /flarum/app/extensions : FlarumChina 插件目录

### 环境变量
| 变量 | 描述 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------------- |
| **UID** | Flarum user id | *optional* | 991
| **GID** | Flarum group id | *optional* | 991
| **DEBUG** | Flarum debug mode | *optional* | false
| **FORUM_URL** | Forum URL | **required** | none
| **DB_HOST** | MariaDB instance ip/hostname | *optional* | mariadb
| **DB_USER** | MariaDB database username | *optional* | flarum
| **DB_NAME** | MariaDB database name | *optional* | flarum
| **DB_PASS** | MariaDB database password | **required** | none
| **DB_PREF** | Flarum tables prefix | *optional* | none
| **UPLOAD_MAX_SIZE** | The maximum size of an uploaded file | *optional* | 50M
| **MEMORY_LIMIT** | maximum amount of memory used by php | *optional* | 128M

### 编写 docker-compose.yml 文件

```bash
mkdir flarum && cd flarum
vi docker-compose.yml
```

根据自身情况 修改

FORUM_URL

DB_PASS

MYSQL_ROOT_PASSWORD

MYSQL_PASSWORD

等环境变量

```yml
flarum:
  image: raincal/docker-flarum-china:0.1.0-beta.7-stable
  container_name: flarum
  links:
    - mariadb:mariadb
  environment:
    - FORUM_URL=https://forum.domain.tld
    - DB_PASS=123456
  volumes:
    - /mnt/docker/flarum/assets:/flarum/app/assets
    - /mnt/docker/flarum/extensions:/flarum/app/extensions

mariadb:
  image: mariadb:10.1
  container_name: mariadb
  volumes:
    - /mnt/docker/mysql/db:/var/lib/mysql
  environment:
    - MYSQL_ROOT_PASSWORD=123456
    - MYSQL_DATABASE=flarum
    - MYSQL_USER=flarum
    - MYSQL_PASSWORD=123456

nginx:
  image: wonderfall/boring-nginx
  container_name: nginx
  links:
    - flarum:flarum
  ports:
    - "80:8000"
    - "443:4430"
  volumes:
    - /mnt/docker/nginx/sites-enabled:/sites-enabled
    - /mnt/docker/nginx/conf:/conf.d
    - /mnt/docker/nginx/log:/var/log/nginx
    - /mnt/docker/nginx/certs:/certs
```

### 启动应用

`docker-compose up -d`

若使用胶囊主机，可以到 自有主机 -> Stack -> 创建新 Stack

![深度截图_选择区域_20170807084450.png](https://i.loli.net/2017/08/07/5987e1158bc73.png)

### 设置 nginx 反向代理

通过 ssh 连接到胶囊主机

`ssh ubuntu@52.80.37.119`

![深度截图_选择区域_20170807093749.png](https://i.loli.net/2017/08/07/5987e115741b5.png)

```sh
docker exec -it nginx ngxproxy

Welcome to ngxproxy utility.
We're about to create a new virtual host (AKA server block).

Name: flarum
Domain: forum.domain.tld
Webroot (default is /): 
Container: flarum
Port (default is 80): 8888
HTTPS [y/n]: n
Max body size in MB (integer/null): 50

Done! flarum.conf has been generated.
Reload nginx now? [y/n]: y
nginx successfully reloaded.
```

完成后访问外网IP 52.80.37.119，本地环境的话访问 localhost 开始安装 flarum

**管理员密码需要大于8位**

![screencapture-joudo-tk-1502095912645.png](https://ooo.0o0.ooo/2017/08/07/59882ebce3203.png)

![screencapture-54-222-128-207-1502096436141.png](https://ooo.0o0.ooo/2017/08/07/59882ebd28ba8.png)
