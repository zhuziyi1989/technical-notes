---
nav:
  title: 关于面试
  order: 2
group:
  title: 自测目录
  order: 7
title: 前端框架
order: 4
---

### Vue

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

### React

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

- 适当地使用`shouldComponentUpdate`生命周期方法。 它避免了子组件的不必要的渲染。
- 如何在重新加载页面时保留数据 localstorage 多表单应用优化 [示意图](https://image.fundebug.com/2019-05-31-10.png)

### Node.js

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
