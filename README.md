# react temp

## 简介

> 使用`react`,`typescript`等主流技术搭建的一个供学习参考的模版工程。

## 包含

- **技术栈**：使用 `react`,`typescript`等技术开发
- **ajax**：二次封装`axios`，统一管理接口
- **主题**：可自行修改主题样式
- **国际化**：完善的国际化方案
- **路由**：动态路由生成方案
- **组件**：二次封装了常用的组件
- **工具**：常用的指令，过滤器，`storage`存储，工具函数

## 目录结构

```md
|- .husky
|- .vscode
|- public # 静态资源
| |- config.js # 配置文件
| |- favicon.ico # favicon 图标
|- src # 源代码
| |- api
| |- actions
| |- assets
| |- components
| |- config
| |- layout
| |- locale
| |- plugin
| |- reducers
| |- router
| |- saga
| |- store
| |
| |- index.scss
| |- index.tsx
| |- react-app-env.d.ts
| |- reportWebVitals.ts
| |- setupTests.ts
|
|- .browserslistrc
|- .cz-config.js
|- .editorconfig
|- .eslintignore
|- .eslintrc.js
|- .gitattributes
|- .gitignore
|- .markdownlint.json
|- .prettierignore
|- .prettier.js
|- .stylelintignore
|- .stylelintrc.js
|- commitlint.config.js
|- cspell.config.js
|- package.json
|- README.md
|- tsconfig.json
```

## 常用脚本

### 安装依赖

```sh
pnpm i
```

### 编译

```sh
pnpm start
```

### 打包

```sh
pnpm build
```

### 校验

```sh
pnpm lint
```
