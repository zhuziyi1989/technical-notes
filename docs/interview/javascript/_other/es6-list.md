---
nav:
  title: 关于面试
  order: 2
group:
  title: JavaScript
  order: 5
title: ES6+ 新特性
order: 2
---

## ES6+ 新特性

1. ### 变量声明 let、const ❗️（暂时性死区）

2. ### 函数的默认参数

3. ### 多行字符串

4. ### 模版字符串 ` `` `

5. ### 箭头函数（Arrow Functions）❗️（this 指向）

6. ### 二进制和八进制字面量

7. ### 对象和数组解构 ❗️

8. ### Spread / Rest 操作符 `...`❗️

9. ### 对象超类 `super`

10. ### 遍历数据结构的统一方法 `for … of`

    区别于 `for…in`

11. ### 类 Class

12. ### 异步的 Prominse❗️（resolve、rejected、pending）

13. ### 模块化`import 和 export`

14. ### 新的基础数据类型 `Symbols`

15. ### `generator`函数

16. ### 新的数据结构（`Map`和`Set`）❗️

17. ### `Math` / `Number` / `String` / `Array` / `Object`中新的方法 ❗️

```javascript
// 举个例子，说明 ES6 的一些新特性
let es6 = (width = 50, color = 'red', url = 'https://jandou.com', obj) => {
  let oValue = 0o10;
  console.log(oValue); // 8

  let bValue = 0b10; // 二进制使用 `0b` 或者 `0B`
  console.log(bValue); // 2

  const { b: b_new } = obj;

  console.log(b_new);

  console.log(`
		您所访问的网址是：${url}，
		元素的宽度等于：${width}，
		元素的颜色为：${color}，
	`);
};

es6(88, 'blue', 'https://baidu.com', { a: 1, b: 2, c: 3 });
```
