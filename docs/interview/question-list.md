---
nav:
  title: 关于面试
  order: 2
group:
  title: 自测问题
  order: 7
title: 前端框架
order: 4
---

## Vue

- vue 响应式原理
- vue 虚拟 dom & diff 算法
- vue3 解决了什么问题？
- vue 为什么不能检测数组和对象的变化,怎么处理(为什么通过索引操作数组不能触发响应式)
- vue-router 原理
- v-model 实现原理
- vue.nexttick
- computed 的实现原理
- Watch 的运行原理
- slot 插槽
- `this.$refs.xx` 在 mounted 中获取 DOM 元素为 undefined
- 循环列表数据更新后，获取列表 DOM 的顺序问题
- Vue 中 8 种组件通信方式？ [link](./vue)

## React

- 虚拟 DOM（对象）
- Diff 算法（key）
- Props（只读、参数） 和 State（状态）
- PropTypes(类型检查，联想 typescript)
- Hooks（破解函数组件无状态化 useState，useEffect，useContext，useReducer）
- Rers
- 高阶组件(纯函数)
- 有状态组件和无状态组件
- MVVM 模型
- 生命周期
- 数据绑定
- 状态管理
- 组件之间的通信 Context、Props、redux
- 组件抽象
- [redux](https://tech.meituan.com/2017/07/14/redux-design-code.html) 状态管理 action(dispatch)→reducer→store
- react-router-dom（BrowserRouter 和 HashRoauter） Link
- 错误边界 发生错误，优雅降级，退回 UI
- Fragments 多个组件包裹问题
- [为什么 props 复制给 state 会产生 bug ?](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

- 适当地使用`shouldComponentUpdate`生命周期方法。 它避免了子组件的不必要的渲染。
- 如何在重新加载页面时保留数据 localstorage 多表单应用优化 [示意图](https://image.fundebug.com/2019-05-31-10.png)

## Node.js

| NodeJS 相关知识                                                                                                             |
| :-------------------------------------------------------------------------------------------------------------------------- |
| [模块机制](https://juejin.cn/post/6844904030905303054) es6(静态加载 编译时执行) common.js(动态加载 运行时执行 require 缓存) |
| [require 原理](http://www.ruanyifeng.com/blog/2015/05/require.html)                                                         |
| [事件循环](https://learnku.com/articles/38802)                                                                              |
| [cluster 原理](https://www.cnblogs.com/dashnowords/p/10958457.html)                                                         |
| [流机制](https://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/)                                        |
| [pipe 原理](https://cloud.tencent.com/developer/article/1630068)                                                            |
| [守护进程](https://juejin.cn/post/6844903444839399438)                                                                      |
| [进程通信](http://www.ayqy.net/blog/nodejs进程间通信/)                                                                      |
| [异常处理](http://www.alloyteam.com/2013/12/node-js-series-exception-caught/)                                               |

## JavaScript 基础

- [闭包](https://github.com/mqyqingfeng/Blog/issues/9)
- [原型(链)](https://github.com/mqyqingfeng/Blog/issues/2)
- [继承](https://github.com/mqyqingfeng/Blog/issues/16)（继承模式）
- [作用域](https://github.com/mqyqingfeng/Blog/issues/6)
- [变量提升](https://github.com/mqyqingfeng/Blog/issues/5)
- [立即执行函数](https://segmentfault.com/a/1190000003985390)
- DOM 事件和事件流
- 事件循环(宏任务和微任务、Node 和浏览器的事件循环区别)
- ES6/7/8 新特性
- 箭头函数和普通函数的区别
- map & set 数据结构
- 遍历 map/forEach/fliter/some/one...
- 遍历对象
- new 过程发生了什么？
- generator/yield
- Promise 原理(手写 Promise.all 方法)
- async/await
- [聊聊 this](https://github.com/mqyqingfeng/Blog/issues/7)，延伸 call、apply、bind 区别、手写实现
- 前端性能优化
  - 首屏加载优化
  - 防抖和节流（手写）
  - 回流和重绘，如何避免？
- 跨域形成原因以及解决方案
- 深拷贝和浅拷贝(JSON.stringify、JSON.parse 这种方案的弊端)
- ES6 模块和 CommonJS 的区别
- service worker 、 web worker
- 函数式编程
- 浮点数精度（进制转换问题）
- JSBridge 的通信原理
- JavaScript 调用 Native，主要通过注入 API 和 拦截 URL SCHEME，iframe.src

### 网络 & 操作系统

- 综合：从输入 url 到获得页面经历的
- HTTP2/3 版本做了哪些改进？
- [HTTP 缓存](https://juejin.cn/post/6944891188826603528)（强缓存、协商缓存）
  - cache-control:max-age，Expires，Pragma，Etag(hash/MD5/SHA128/SHA256)，Last-Modified(GMT)
  - 不同 http 版本差异
  - ETag:W/"50b1c1d4f775c61:df3" （W/前缀代表使用弱类型验证）
- HTTPS 实现的过程
- 请求头、响应头、常见状态码
- 七层网络协议
- GET & POST...
- CSRF & XSS
- TCP/UDP
- websocket

### 操作系统

- 进程和线程
- 进程通信
- 进程调度策略
- 锁死
- IO 多路复用

### 工具

#### Webpack 常见问题

- 与 Webpack 类似的工具还有哪些 [🔗 参考 1](https://juejin.cn/post/7010554587438383117)
- 谈谈你为什么选择使用或放弃 webpack
- Loader 和 Plugin 的不同
- 有哪些常见的 Loader？他们能解决什么问题？
- 有哪些常见的 Plugin？他们能解决什么问题？
- 如何利用 Webpack 来优化前端性能
- 如何提高 Webpack 的构建速度?
- 如何对 bundle 体积进行监控和分析？
- 怎么配置单页应用？怎么配置多页应用？
- 如何在 Vue 和 React 项目中实现按需加载？
- monorepo 这种项目有什么好处，具体是如何打包的？
- Source Map 是什么？生产环境怎么用？
- 什么是长缓存？
- 在 Webpack 中如何做到长缓存优化？
- Webpack 中 hash chunkhash contenthash 有什么区别？
- Webpack 的实现原理
- Webpack 的构建流程是什么？
- 是否写过 Loader ?描述一下编写 Loader 的思路？
- 是否写过 Plugin ?描述一下编写 Plugin 的思路？
- inline pre post normal loader 执行先后顺序是？
- Webpack 打包的原理是什么？聊一聊 babel 和抽象语法树
- dev-server 的原理是什么？描述一下它的具体流程
- 请说一下 DIlPlugin 和 DllReferencePlugin 的工作原理
- Webpack 的热更新是如何做到的？说明其原理？
- Tree shaking 了解过么？它的实现原理说一下
- Webpack 5
- Webpack 5 中有哪些新特性
- Webpack 5 中的 Module Federation 对微前端的意义
- webpack Tree shaking

#### Git 工具的使用

- Git rebase 和 merge 的区别？

### 客户端

- 回流和重绘
- V8 引擎（JS 引擎、GUI 渲染引擎、延时引擎、异步）

### 设计模式

- MVVM
- MVC
- MVP
- 重构
- 常用设计模式
