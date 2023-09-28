# react temp

> 使用`react`,`typescript`搭建的模版工程

## 使用文档

- [功能清单](#功能清单)
- [目录结构](#目录结构)
- [开发环境](#开发环境)
- [常用脚本](#常用脚本)
- [打包发布](#打包发布)

## 功能清单

- [x] `api` 封装
- [x] `app` app入口
- [x] `assets` 静态资源
- [x] `components` 组件
- [x] `hooks` hooks
- [x] `interface` 接口
- [x] `layout` 基座
- [x] `locale` 国际化
- [x] `pages` 页面
- [x] `plugins` 插件
- [x] `redux` redux-saga
- [x] `utils` 工具类

## 目录结构

```md
├── .husky githooks 配置
├── .vscode 工作区配置
├── config 配置项
├── public 静态资源
| ├── config.js 全局变量
| ├── favicon.ico favicon 图标
| ├── index.html 入口文件
|
├── src # 源代码
| ├── api
| ├── app
| ├── assets
| ├── components
| ├── hooks
| ├── interface
| ├── layout
| ├── locale
| ├── pages
| ├── plugins
| ├── redux
| ├── utils
|     ├── contant 常量
|     ├── storage 本地存储
|     ├── tools 公共方法
|
| ├── index.tsx
| ├── react-app-env.d.ts
|
├── typings # 声明文件
|
├── .browserslistrc
├── .cz-config.js
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .markdownlint.json
├── .prettierignore
├── .prettier.js
├── .stylelintignore
├── .stylelintrc.js
├── babel.config.js
├── commitlint.config.js
├── craco.config.js
├── crowdin.yaml
├── package.json
├── package.sh
├── postcss.config.js
├── README.md
├── tsconfig.json
```

## 开发环境

<p align="left">
    <a href="https://npmjs.com/package/node"><img src="https://img.shields.io/badge/node-%3E%3D16.18.0-green" alt="node"></a>
    <a href="https://npmjs.com/package/npm"><img src="https://img.shields.io/badge/npm-%3E%3D8.19.0-blue" alt="npm"></a>
</p>

> `npm` 或 `yarn` 安装依赖，`typescript` 编写代码。

- 全局安装 `yarn`

  ```bash
  npm i yarn -g
  ```

- 使用 `eslint`， `stylelint` 校验代码，`prettier` 格式化代码。需要安装相关的 `vscode` 插件

  - `eslint`: [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint&ssr=false#review-details]
  - `stylelint`: [https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint&ssr=false#review-details]
  - `prettier`: [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode&ssr=false#review-details]

## 常用脚本

- 安装依赖

  ```bash
  yarn
  ```

- 开发编译

  ```bash
  yarn start
  ```

- `commit` 代码

  ```bash
  yarn commit
  ```

- `lint` 校验代码

  ```bash
  yarn lint
  ```

- 生成 `nginx.conf`

  ```bash
  yarn exportNginx
  ```

## 打包发布

- 生成 `Docker` 镜像

  ```bash
   sh package.sh
  ```

- `Docker` 生产环境部署

  ```bash
  docker load -i xxx.tar.gz
  docker run -d -p 31181:31181 ${imageID}
  ```
  
- `Docker` 更换镜像的操作

  ```bash
   docker ps | grep txwl-dashboard
   docker stop ${containerID}
   docker images | grep txwl-dashboard
   docker rmi -f ${imageID}
   docker load -i xxx.tar.gz
   docker run -d -p 31181:31181 ${imageID}
  ```

- `Nginx` 前场Nginx API 代理配置

  ```bash
    修改 nginxApi.conf 配置
    然后把该配置 nginxApi 复制到镜目录下替换nginxApi.conf 
    /etc/nginx/nginxApi.conf 
    docker cp nginxApi.conf  容器名:/etc/nginx/
    nginx -t
    nginx -s reload
  ```
