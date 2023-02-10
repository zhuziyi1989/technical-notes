---
nav:
  title: 关于面试
  order: 2
group:
  title: 软件工程
  order: 6
title: 前端构架
order: 6
---

# 前端构架和开发效率

### Git 重点和难点总结(单独)

### 代码编辑器 Vscode

### 项目管理工具、BUG 管理工具

### Webpack 相关技术难点(单独)

- [webpack 热更新流程 #238](https://github.com/kaola-fed/blog/issues/238)
- EventSource → Websocket
- webpack 中 loader 和 plugin 的区别是什么？
  - loader，是一个转换器，将 A 文件进行编译成 B 文件，比如：将 A.less 转换为 B.css，单纯的文件转换过程。
  - plugin，是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

### ES6 代码转成 ES5 代码的实现思路是什么

Babel 是如何把 ES6 转成 ES5 呢，其大致分为三步：

- 将代码字符串解析成**抽象语法树**，即所谓的 AST
- 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
- 根据处理后的 AST 再生成代码字符串
