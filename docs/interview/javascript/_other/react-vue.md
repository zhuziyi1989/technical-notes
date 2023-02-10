---
nav:
  title: 关于面试
  order: 2
group:
  title: JavaScript
  order: 5
title: 框架的使用
order: 5
---

# 框架的使用

## 1、解释单向数据流和双向数据绑定

只有 UI 控件 才存在双向，非 UI 控件 只有单向。全局性数据流使用单向，易跟踪调试。局部性数据流使用双向，简单易用。

- [单向数据绑定和双向数据绑定的优缺点，适合什么场景？](https://www.zhihu.com/question/49964363)
- [React 应用的架构模式 Flux](http://stylechen.com/react-flux.html)

## 2、如何理解虚拟 DOM?

<details>

<summary>查看解析</summary>

参考资料：[如何理解虚拟 DOM? @zhihu](https://www.zhihu.com/question/29504639)

- 步骤一：用 JS 对象模拟 DOM 树
- 步骤二：比较两棵虚拟 DOM 树的差异 → 深度优先遍历，标记并记录差异 → 差异类型 → 列表对比算法
- 步骤三：把差异应用到真正的 DOM 树上

关键技术：batching(批处理)、Diff 算法的优化:

```text
batching(批处理)：将所有DOM的操作搜集打包在js对象中完成，然后一次性的递交给真实DOM（性能上只刷新一次）
Diff算法的优化：将标准的diff算法的O(n^3)复杂度降低到了O(n)，主要得益于对新旧DOM树进行了一个深度的优先遍历，并对每个节点做唯一 id 标记
```

逐层进行节点比较
![dom-diff](../../assets/images/dom-diff.jpg)

更多解析：[深入浅出 React（四）：虚拟 DOM Diff 算法解析](https://infoq.cn/article/react-dom-diff)

> Tips：由于特有的 DOM Diff 算法，我们在实现自己的组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，我们有时可以通过 CSS 隐藏或显示某些节点，而不是真的移除或添加 DOM 节点。

优势：结合 Node Server 层来说，实现服务端与浏览器端的同构更为方便。

类比：CPU 内存(纯 JS 操作)和硬盘(纯 DOM 操作)的关系。

</details>

## 3、Vue 双向绑定实现原理

➤ 参考资料：[《剖析 Vue 原理&实现双向绑定 MVVM》](https://segmentfault.com/a/1190000006599500)

- 单向数据流架构在哪些方面适合 MVC ？

  MVC 拥有大约 50 年的悠久历史，并已演变为 MVP，MVVM 和 MV \*。两者之间的相互关系是什么？如果 MVC 是架构模式，那么单向数据流是什么？这些竞争模式是否能解决同样的问题？

## 4、Vue 对比其他框架(主要关注 React)

1. React 需要开发者更多的关注子组件的重渲染，如何的避免这个问题引起的性能问题，然而在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。你可以理解为每一个组件都已经自动获得了 `shouldComponentUpdate`，并且没有上述的子树问题限制。因此 Vue 的这个特点使得开发者不再需要考虑此类优化，<u>从而能够更好地专注于应用本身。</u>
2. Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的。React 则是选择把这些问题交给社区维护，因此创建了一个更分散的生态系统。但相对的，React 的生态系统相比 Vue 更加繁荣。
3. React 比 Vue 更好的地方，比如更丰富的生态系统，React 国际大厂的维护，Vue 初期则是个人开发者。

> 更多对比查看 Vue 官方解释<https://cn.vuejs.org/v2/guide/comparison#React>

## 5、客户端 MVC 与服务器端或经典 MVC 有何不同？

`提示：经典 MVC 是适用于桌面应用程序的 Smalltalk MVC。在 Web 应用中，至少有两个不同的数据 MVC 周期。`

## 6、不可变数据结构（immutable data structures）解决了哪些问题？

可变数据的好处是 **节省内存**或 **利用可变性做一些事情**，但在复杂的开发中它的副作用也挺多，于是出现了浅拷贝和深拷贝，JavaScript 原生方法里都是浅拷贝(例如 Object.assign、Object.freeze、ES6 中的解构)，在实际开发中浅拷贝通常不够用，于是 Facebook 推出来了不可变数据结构 Immutable.js

在 React 开发中，频繁操作 `State 对象`或是 `Store`，Render 方法根据数据改变来执行，可变数据可能导致性能上的浪费，如果配合 immutable.js 快速、安全、方便，可以避免这种问题。

immutable.js 在数据比较上也有优化，只需要对外层数据判断即可(如果数据结构比较深，可避免数据比较带来的性能问题)，但 API 上设计过于细致，导致库脚本本身比较重，因此不太适用于移动端。

➤ 参考资料：[facebook immutable.js 意义何在，使用场景？](https://www.zhihu.com/question/28016223)

## 7、hash 模式和 history 模式的区别

hash 模式是依靠 onhashchange 事件(监听 location.hash 的改变)，而 history 模式是主要是依靠的 HTML5 history 中新增的两个方法，pushState()可以改变 url 地址且不会发送请求，replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改。

## 8、大型应用程序是否应使用静态类型？

`如何比较 TypeScript/Flow 与 Elm/ReasonML/PureScript 等 JS 转换语言？这些方法的优缺点是什么？`

## 9、Vue 和 React 的一些优点和区别？

几个切入点：

- 数据驱动
- 数据单向流
- 虚拟 DOM（可减少直接操作 DOM，性能上的优化）
- Vue 的双向绑定（vue2.x 实现原理：**Object.defineProperty()来实现数据劫持**、发布者-订阅者模式。[参考资料](https://juejin.im/entry/5923973da22b9d005893805a) 但 Vue3.x 版本之后就改用 Proxy 进行实现。[参考资料](https://www.cnblogs.com/tugenhua0707/p/10261170.html)）
- 无缝结合 webpack 等打包工具，使得开发模式更现代，具有模块化、组件化式的。

区别：

- 模板渲染的方式区别：

  ​ React 在 JSX 中使用**原生的 JS 语法**来实现<u>插值，条件渲染，循环渲染</u>等等。而 Vue 则需要依赖<u>指令</u>来进行，更加容易上手但是封装的程度更高，调试成本更大，难以定位 Bug。

- 性能差异：

  ​ 在 React 中组件的更新渲染是从数据发生变化的<u>根组件开始往子组件</u>逐层重新渲染，而组件的生命周期有 shouldComponentUpdate()函数供给开发者优化组件在不需要更新的时候返回 false。而在 Vue 中是通过 watcher 监听到数据的变化之后通过自己的 diff 算法，在 virtualDom 中直接找到以最低成本更新视图的方式。

- Vue 更适合开发周期更短的相对小型的项目，React 更适合构建稳定大型的应用，可定制化的能力更强。

## 10、React 生命周期图谱

➤ 参考资料：<https://t.cn/RmV1t56> 废弃了三个带有 Will 的钩子函数，是为 react 新版本的异步渲染做铺垫。

![lifeCycle](../../assets/images/lifeCycle.jpg)

## 11、React 组合 vs 继承

### 组合方式

组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

1. 包含关系
2. 特例关系

## 12、React 组件模式有哪几种？

1. 有状态(stateful)组件 和 无状态(stateless)组件

2. 容器(Container) 组件 和 展示(Presentational) 组件

3. 高阶组件(Higher order components , HOC ）

## 13、高阶组件概念

高阶组件是**_参数为组件_**，**_返回值_**为新组件的函数。(组件以参数形式进入，返回一个新组件，说白了就是抽象，并没多高阶...)

### 一些建议

1.  HOC 是纯函数，没有副作用。
2.  HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能。

## HOC 与容器组件模式的区别？

## 什么事柯里化？

柯里化：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

Currying 使用场景：参数复用、延迟执行。

1. 渲染回调（Render Callbacks）：`this.props.children`方式，也就是函数作为子组件。

2. 新的 API：Hooks

> 参考：[[译]React 组件模式](https://github.com/yueshuiniao/blog/issues/1)

## 优化一个 react 组件的性能

1. 减少渲染的节点的量
2. 减少不必要的嵌套
3. 减少 setState 的操作次数
4. 在需要大量滚动列表的组件，可使用虚拟列表[react-virtualized](https://github.com/bvaughn/react-virtualized)
5. 避免直接使用**箭头函数**作为**事件处理器**，因为每一次渲染都会<u>重新创建一个新的事件处理器</u>。

## React 组件之间通信方式？

### 常见应用场景

1. 父组件 → 子组件：利用`props`实现数据传递
2. 子组件 → 父组件：

   - 回调函数实现，依靠父组件传下来的 `callback` 函数执行，改变 父组件 组件的状态，或者把 子组件 的 state 通知 父组件 。
   - 自定义事件机制

3. 跨层级（祖孙）组件：

   - 层层组件传递`props`

   - 使用`context`技术

4. 兄弟组件：通常是依赖共有的顶级容器（即共有父组件）处理
5. 无嵌套关系组件：自定义事件机制，常用的有发布/订阅模式，通常是依赖共有的顶级容器处理或者第三方的状态管理器（如 Redux/Mbox）。其实原理都是相通的，兄弟 A （发布者）的 value 发生变化，分发的时候把 value 值告诉一个中间者 C（订阅者） ，C 会自动告知 B，实现 B 的自动 render 。

### 大型应用解决方案

如果你的项目非常大，那可能需要一个状态管理工具，通过状态管理工具把组件之间的关系，和关系的处理逻辑从组建中抽象出来，并集中化到统一的地方来处理，Redux 就是一个非常不错的状态管理工具，当然还有这些 Mobx、Rematch、reselect 不错的工具。

### Redux 相关理解

1. Web 应用是一个状态机，视图与状态是一一对应的。其次，所有的状态，保存在一个对象里面（即单一数据源）。

2. Redux 就是一个 JavaScript 状态容器(Store)，这个状态(State)只读，想要改变必须使用纯函数(Reducers)来执行修改。

![redux-1.png](../../assets/images/redux-1.png)

Redux 的工作流程:

![redux-2.png](../../assets/images/redux-2.png)

> 参考：
>
> - [React 组件之间的通信](https://github.com/sunyongjian/blog/issues/27)
> - [ReactJS 组件间沟通的一些方法（From Alloyteam）](http://www.alloyteam.com/2016/01/some-methods-of-reactjs-communication-between-components/)
> - [Redux 从设计到源码](https://tech.meituan.com/2017/07/14/redux-design-code.html)

## Fragments

多个组件并排渲染，需要使用一个 HTML 比偶钱包过，一般增加一个 `<div>` 即可，但引起了 DOM 结构的冗([rǒng])余，于是出现了 `Fragment`，直接用 `<React.Fragment>` 代替 `<div>`

## 单页面应用路由实现原理

[以 React-Router 为例](https://github.com/youngwind/blog/issues/109#)

## React Hooks

参考资料：

1. [精读《怎么用 React Hooks 造轮子》](https://juejin.im/post/5bf20ce6e51d454a324dd0e6)
2. [Hook 官方解读](https://zh-hans.reactjs.org/docs/hooks-intro.html)
