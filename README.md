# react temp

> 使用`react`,`typescript`等主流技术搭建的模版工程。

## 功能清单

- [x] `api` 封装
- [x] `assets` 静态资源
- [x] `components` 组件
- [x] `config` 配置项
- [x] `hooks` hooks
- [x] `layout` 基座
- [x] `locale` 国际化
- [x] `modules` 业务模块
- [x] `pages` 页面
- [x] `plugins` 插件
- [x] `router` 路由
- [x] `saga` redux-saga
- [x] `types` 类型声明
- [x] `utils` 工具类

## 目录结构

```md
├── .husky githooks 配置
├── .vscode 工作区配置
├── public # 静态资源
| ├── config.js # 配置文件
| ├── favicon.ico # favicon 图标
|
├── src # 源代码
| ├── api
| ├── assets
| ├── components
| ├── config
| ├── hooks
| ├── layout
| ├── locale
| ├── plugins
| ├── reducers
| ├── router
| ├── saga
| ├── types
| ├── utils
| |
| ├── index.scss
| ├── index.tsx
| ├── react-app-env.d.ts
| ├── reportWebVitals.ts
| ├── setupTests.ts
|
├── .browserslistrc
├── .cz-config.js
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── .markdownlint.json
├── .prettierignore
├── .prettier.js
├── .stylelintignore
├── .stylelintrc.js
├── commitlint.config.js
├── config.overrides.js
├── cspell.config.js
├── package.json
├── README.md
├── tsconfig.json
```

## 常用脚本

- 安装依赖

  ```bash
  pnpm i
  ```

- 开发编译

  ```bash
  pnpm start
  ```

- 生产打包

  ```bash
  pnpm build
  ```

- 格式化代码

  ```bash
  pnpm format
  ```

- `lint` 校验代码

  ```bash
  pnpm lint
  ```

- 生成 `CHANGELOG.md`

  ```bash
  pnpm changelog
  ```

- `commit` 代码

  ```bash
  git cz
  ```
