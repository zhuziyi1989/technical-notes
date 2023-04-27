---
nav:
  title: 关于面试
  order: 2
group:
  title: 网络原理
  order: 4
title: 网络原理
order: 4
---

# 前端知识体系 - 网络原理

## 1. 知识体系大纲

### 五(七)层英特网协议栈

- （应用层）HTTP/DNS/FTP/SMTP 等
- （传输层）TCP/IP 协议
- （网络层）IP/ARP 寻址，路由器
- （数据链路层）封装成帧，交换机
- （物理层）光纤/网线/无线电磁波等

### HTTP 相关常识

- HTTP 协议的主要特点：无连接、无状态
- HTTP 报文的组成部分：请求报文（请求方法、URL、http 协议版本、请求头、请求体）和响应报文（http 协议版本、状态码、响应头、响应体）
- 请求方法：get（会被浏览器主动缓存，适合传输少量且不敏感数据）、post、put（更新数据）、delete（删除数据）、HEAD、OPTIONS
- 持久连接：HTTP1.0 的轮询（资源、性能上浪费） 和 HTTP1.1 中的长连接（通过使用 `Connection:keep-alive` 进行长连接。客户端只请求一次，但是服务器会将继续保持连接，当再次请求时，避免了重新建立连接。）管线化是什么？
- HTTP 协议版本：1.x 和 2.x 的区别？2.x 以二进制传输、多路复用、头部压缩 参考[第 5 题](#5. 简单讲解一下 HTTP2 的多路复用？)。
- HTTPS（http+ssl/tsl）参考[第 4 题](#4. 详解 HTTPS ？)。
- 强缓存 & 协商缓存 强缓存会直接从浏览器里面拿数据，关键字段 Expires 和 Cache-Control。协商缓存会先访问服务器看缓存是否过期，再决定是否从浏览器里面拿数据，关键字段优先级 “Etag / If-None-Match” > “Last-Modified / If-Modified-Since”
- 跨域的原因及处理方式，参考[第 3 题](#3. 跨域资源共享(CORS) 机制)。
- 如何防范 CSRF 攻击？窃取 Cookie 等包含用户验证的信息，伪造请求非法获取资源。<u>采取 POST 请求、验证码、检测 Referer、Token</u>
- 如何防御 XSS 攻击？注入恶意 Script 代码
- 常用的状态码 200（请求成功） 301（永久转移） 302(临时转移) 304（缓存读取 Etag ）307(与 302 相似，但不能将 post 转移至 get) 400（语法错误）401（未经授权）403（禁止访问） 404（找不到） 500 501 503（可能是服务端资源被耗尽）
- 服务器用`私匙`去解密请求的数据，客服端用自己生成的`随机密匙`解密服务器响应的数据（不能用公匙解密）[HTTPS 加密过程详解](https://segmentfault.com/a/1190000019976390)

### 使用适当的 HTTP 请求方法

| 请求方法  | 描述                                                                                                                       |
| :-------: | :------------------------------------------------------------------------------------------------------------------------- |
|  `HEAD`   | 可以针对任何资源发出，以仅获取 HTTP 标头信息。                                                                             |
|   `GET`   | 用于检索资源。会被浏览器主动缓存，适合传输少量且不敏感数据。                                                               |
|  `POST`   | 用于创建资源，可用于传输大量且敏感数据。                                                                                   |
|  `PATCH`  | 用于通过部分 JSON 数据更新资源。例如，问题资源具有`title`和`body`属性。一个`PATCH`请求可以接受的一个或多个属性的更新资源。 |
|   `PUT`   | 用于替换资源或集合。对于`PUT`没有`body`属性的请求，请确保将`Content-Length`标头设置为零。                                  |
| `DELETE`  | 用于删除资源。                                                                                                             |
| `OPTIONS` | 预检。                                                                                                                     |

### TCP/IP 相关原理及延伸

- 为什么握手需要三次，而挥手却需要四次？ ➤ 为了防止*已失效的*连接请求报文段突然又传送到了服务端，因而产生错误。握手过程中传送的包里不包含数据。
- 为什么要四次挥手？ ➤ 主机双方相互确认结束报文的发送，并应答对方。
- 为什么要等待 2MSL？ ➤ ①.保证 TCP 协议的全双工连接能够*可靠关闭*；②.保证这次连接的*重复数据段从网络中消失*。备注：MSL 是任何报文段被丢弃前在网络内的最长时间。

参考资料：

- [关于 TCP/IP，必知必会的十个问题](https://juejin.im/post/598ba1d06fb9a03c4d6464ab)
- [通俗大白话来理解 TCP 协议的三次握手和四次分手 #14](https://github.com/jawil/blog/issues/14)
- [掘金搜索 TCP 结果](https://juejin.im/search?query=tcp&type=all)

## 2. 从输入 URL 到页面加载显示完成的过程

略...

## 3. 跨域资源共享(CORS) 机制

策略：同源策略 ( [源]被定义为 URI、主机名和端口号的组合 )

作用：浏览器作为"安全裁判"，用于隔离潜在恶意数据的重要安全机制，无法跨域访问 Cookie、LocalStorage、IndexDB、获取和操作 DOM、发送 AJAX。

解决方案：

- JSONP (异步加载 script 标签，兼容性好，但数据量小，GET 请求)
- Hash（ Hash 的改变，页面不会刷新，通过`onhashchange`事件监听）
- WebSocket (该协议不受同源政策限制)
- 反向代理（Nginx 服务内部配置 Access-Control-Allow-Origin 选项为 \*）
- CORS 前后端协作设置请求头部，如设置 Access-Control-Allow-Origin 等头部信息( "简单请求"；[`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法预检请求 )
- iframe 嵌套通讯。关键技术：① 改变片段标识符，通过 `hashchange` 事件监听；② 利用 `window.name` 属性(影响性能)
- HTML5 新 API：`window.postMessage()`，通过`message`事件监听。

思考题：

- 为什么 form 表单提交没有跨域问题，但 ajax 提交有跨域问题？提示：<u>因为原页面用 form 提交到另一个域名之后，原页面的脚本无法获取新页面中的内容。</u>
- 原生`XMLHttpRequest`对象发送 Ajax 的几个步骤：① 创建 XMLHttpRequest 对象；② 使用 open 方法设置请求的参数，即 open(method, url, 是否异步；③ 发送请求，即 send()；④ 注册事件，即注册 onreadystatechange 事件，状态改变时就会调用。

参考资料：

- [HTTP 访问控制（CORS） - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [前端跨域及其解决方案](https://tech.jandou.com/cross-domain.html)

## 4. 详解 HTTPS ？

客服端取`公钥`，验证公钥合法性，生成`随机密钥`，客服端用`随机密钥`解密。

服务端用`私钥`解密，用会话`随机密钥`加密

## 5. 简单讲解一下 HTTP2 的多路复用？

在 HTTP/1 中，每次请求都会建立一次 TCP 连接，也就是我们常说的 3 次握手 4 次挥手，这在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

- 第一个：串行的文件传输。当请求 a 文件时，b 文件只能等待，等待 a 连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是 1 秒，那么 a 文件用时为 3 秒，b 文件传输完成用时为 6 秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
- 第二个：连接数过多。我们假设 Apache 设置了最大并发数为 300，因为浏览器限制，浏览器发起的最大请求数为 6（Chrome），也就是服务器能承载的最高并发为 50，当第 51 个人访问时，就需要等待前面某个请求处理完成。

HTTP2 采用二进制格式传输，取代了 HTTP1.x 的文本格式，二进制格式解析更高效。
多路复用代替了 HTTP1.x 的序列和阻塞机制，所有的相同域名请求都通过同一个 TCP 连接并发完成。在 HTTP1.x 中，并发多个请求需要多个 TCP 连接，浏览器为了控制资源会有 6-8 个 TCP 连接都限制。
HTTP2 中

- <u>同域名下所有通信都在单个连接上完成，消除了因多个 TCP 连接而带来的延时和内存消耗。</u>
- <u>单个连接上可以并行交错的请求和响应，之间互不干扰</u>

**总结**：HTTP/2 的`多路复用`就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是`帧（frame）和流（stream）`。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。[More...](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/14)

## 6. DNS 域名解析过程？

### 正向代理和反向代理的区别？

### 如何部署大型 CDN ？

1. DNS 部署（ CNAME 的原理，按线路、地区等方式返回指定 IP）

2. CDN 需要一套自动化管理程序，可向源服务器自动、周期性的缓存资源。

3. nginx 可以作为做缓存服务器，以达到负载均衡的目的

### 跨域认证问题(JWT)

1. session + Cookie
2. JSON Web Token

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案

> 阮一峰：[JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

7. ## 如何取消中止一次请求？

   ```javascript
   const controller = new AbortController(); // 使用 AbortController 对象中止
   ```

   比如`Promise.all`一旦执行就没有 API 来取消中止它们，因为 promise 中没有“取消”的概念。 `AbortController`可以帮助我们解决这个问题，但它不是 Promise API 的一部分。
