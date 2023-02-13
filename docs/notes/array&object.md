---
nav:
  title: 笔记
  order: 2
group:
  title: Array
  order: 3
---

# 数组和对象的方法

## 原生数组方法

- `arr.concat(arr1, arr2, arrn);`--合并两个或多个数组。此方法**不会**修改原有数组，而是返回一个新数组
- `arr.fill(value,start,end) ;`--用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。⚠️ 此方法**会**修改原有数组
- `arr.filter() ;`--方法创建一个新数组, 其保留 通过所提供函数测试的 所有元素。[此方法**不会**修改原有数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- `arr.join(",");`--将一个数组的所有元素连接成一个字符串返回。**不会**修改原有数组
- `arr.sort();`--采用“原地算法”对数组的元素进行排序，并返回数组。⚠️[此方法**会**修改原有数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- `arr.unshift(e1, e2, en);`--添加元素到数组的头部，返回该数组的新长度。⚠️ 此方法**会**修改原有数组
- `arr.push(e1, e2, en);`--添加元素到数组的尾部，返回该数组的新长度。⚠️ 此方法**会**修改原有数组
- `arr.pop();`--删除数组尾部的元素。⚠️ 此方法**会**修改原有数组
- `arr.shift();`删除数组头部的元素。⚠️ 此方法**会**修改原有数组
- `arr.splice(index, count);`--删除任意位置元素的方法。⚠️ 此方法**会**修改原有数组
- `arr.reverse();`--将数组中元素的位置颠倒，并返回该数组。⚠️ 此方法**会**修改原有数组
- `arr.slice(start, end);`--包头不包尾的截取数组中的一段，并返回新数组。**不会**修改原有数组
- `arr.splice(index, count, e1, e2, en);`--添加元素到数组的任何位置。⚠️ 此方法**会**修改原有数组
- `arr.indexOf(searchElement，fromIndex);`--返回在数组中可以找到一个给定元素的**第一个索引**，如果不存在，则返回-1。
- `arr.includes(searchElement，fromIndex);` // ES6 --判断一个数组是否包含一个指定的值，根据情况，返回布尔值。
- `arr.map((currentValue,index,array) => {} ,this);`--创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。[⚠️ 此方法**会**修改原有数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- `arr.forEach((currentValue,index,array) => {} ,this);`--对数组的每个元素执行一次给定的函数。
- `arr.from(arrayLike,(currentValue) => {} ,this);`--从一个类似数组或可迭代对象创建一个新的数组，浅拷贝的数组实例。[⚠️ 此方法**会**修改原有数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- `arr.find((element,index,array) => {} ,this);`--返回数组中满足提供的测试函数的**第一个元素的值**。否则返回 _undefined_。
- `arr.findIndex((element,index,array) => {} ,this);`-- 返回数组中满足提供的测试函数的**第一个元素的索引**。若没有找到对应元素则返回-1。
- `arr.flat(depth);`--会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。[此方法**不会**修改原有数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- `arr.flatMap((currentValue,index,array) => {} ,this);`--首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。与 map 连着深度值为 1 的 flat 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。此方法**不会**修改原有数组

## 原生对象方法

- `Object.assign();` --将所有可枚举属性的值从一个或多个源对象分配到目标对象，它将[返回目标对象](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fassign)
- `Object.defineProperty() ;`--直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
- `Object.hasOwnProperty(prop);`--对象自身属性中是否具有指定的属性（返回布尔值）
- `Object.getOwnPropertyNames();`--返回一个由指定对象的所有自身属性的属性名组成的数组
- `Object.propertyIsEnumerable(prop);`--判断指定的属性是否可枚举（返回布尔值）
- `Object.valueOf();`--返回指定对象的原始值
- `Object.toString();`--返回一个表示该对象的字符串，**Object.prototype.toString.call()**
- `Object.create();`--创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。
- `Class.prototype.isPropertyOf(object);`--测试一个对象是否存在于另一个对象的原型链上
- `Object.keys() ;`--方法会返回一个由一个给定对象的自身可枚举属性组成的数组
- `Object.values();`--方法返回一个给定对象自身的所有可枚举属性值的数组
- `Object.entries();`--方法返回一个给定对象自身可枚举属性的键值对数组
- `Object.setPrototypeOf() ;`--方法设置一个指定的对象的原型
- `Object.getPrototypeOf() ;`--方法返回指定对象的原型
