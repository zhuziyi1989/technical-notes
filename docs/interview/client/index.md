---
nav:
  title: 关于面试
  order: 2
group:
  title: 客户端原理
  order: 2
title: 客户端原理
order: 2
---

# 前端知识体系 - 客户端原理

## 1. HTML5 的一些新的 API

`HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加

- 绘画 `canvas`、`svg`
- 用于媒介回放的 `video` 和 `audio` 元素
- `localStorage` 长期存储数据，浏览器关闭后数据不丢失
- `sessionStorage` 的数据在浏览器关闭后自动删除
- 语意化更好的内容元素`article`、`footer`、`header`、`nav`、`section`
- 表单控件`calendar`、`date`、`time`、`email`、`url`、`search`
- 其他新的特性`webworker`, `websocket`, `Geolocation`

## 2 客户端及其内核原理

- 浏览器内核：V8 引擎、其他
- 进程(系统层面)：操作系统分配资源的最小单位，独立。比如一个 Chome 程序，或一个标签页。
- 线程(内核层面)：操作系统能够进行运算调度的最小单位，共享。渲染线程/JS 引擎/事件触发/定时器触发/异步 HTTP 请求，
- 回流和重绘，以及优化方案 [link](https://juejin.im/post/5c39aeba6fb9a049b41cb0ee)

## 浏览器内核

渲染引擎和`JS`引擎

## JS 引擎的基础概念

调用堆栈：

```text
V8引擎主要由两部分组成:
 ① 内存堆：这是内存分配发生的地方
 ② 调用栈：这是你的代码执行时的地方
```

概念：[Call Stack — MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)

堆栈溢出？堆栈溢出的产生是由于过多的函数调用，导致调用堆栈无法容纳这些调用的返回地址，一般在递归中产生。

参考资料：[JavaScript 如何工作：对引擎、运行时、调用堆栈的概述](https://juejin.im/post/5a05b4576fb9a04519690d42)

## 事件循环(EventLoop)

JavaScript 语言的两个特点：单线程(why? 确保程序执行的一致性)、非阻塞(why? 可完成异步任务)

执行优先级：同步任务 > 微任务(new Promise()) > 宏任务(setTimeout())

```javascript
(function () {
  console.log('1.这是同步开始');

  setTimeout(function cb() {
    console.log('7.这是来自第一个回调的消息');
  });

  console.log('2.这是一条同步消息');

  setTimeout(function cb1() {
    console.log('8.这是来自第二个回调的消息');
  }, 0);

  console.log('3.这是一条同步消息');

  new Promise(function (resolve, reject) {
    console.log('4.这是一条同步消息'); //注意这也是同步消息
    resolve('ok');
  }).then(function (val) {
    console.log('6.这是来自第三个回调的消息' + val);
  });

  console.log('5.这是同步结束');

  return 6.5; // 同步消息结束立即执行
})();
```

参考资料：[并发模型与事件循环(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop) 、[详解 JavaScript 中的事件循环机制(知乎)](https://zhuanlan.zhihu.com/p/33058983)、[JavaScript 定时器与执行机制解析(alloyteam)](http://www.alloyteam.com/2016/05/javascript-timer/)

### 简述 Node.js 中的事件循环？

`事件循环`是 Node.js 处理 **非阻塞 I/O 操作** 的机制，尽管 JavaScript 是单线程处理的。当有可能的时候，它们会把操作转移到系统内核中去。
