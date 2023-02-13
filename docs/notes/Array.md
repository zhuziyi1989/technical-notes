---
nav:
  title: 笔记
  order: 2
group:
  title: Array
  order: 4
---

# Array 数组的简单应用

## 创建包含 0-99 整数的数组

```javascript
// for 循环
var arr = [];
for(var i = 0; i < 100; i++){
  arr.push(i);
}
// map 循环
Object.keys(Array.apply(null, {length: 100})).map(function(item){
  return parseInt(item);
})
//  利用 Array.from
Array.from(new Array(100).keys());
// 利用展开运算符
[...Array(100).keys()]；
[...Array.from({length:100}).keys()]；
```

## [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

🍇 map()对数组的每个元素进行一定的操作（映射）后，会返回一个新的数组; 常用在处理服务器返回的大量数据。

```javascript
const items = [
  {
    name: '祝梓毅',
    sex: '男',
    age: 31,
    birthday: 1989,
    weight: '60',
    hobby: '足球',
  },
  {
    name: '王小丫',
    sex: '女',
    age: 26,
    birthday: 1995,
    weight: '51',
    hobby: '羽毛球',
  },
];

/* 重新格式化对象数组中的对象 */
let obj = {};
const new1 = items.map(function (item, index, arr) {
  obj[item.sex] = item.hobby;
  obj[item.weight] = item.age;
  return obj; //注意这个返回值
});
// new1 [{60: 31,男: "足球"}, {51: 26,女: "羽毛球"}]

/* 获取json数组中的某个属性集合 (然后修改一个键的值) */
const new2 = items.map((item) => item.age.toFixed(2));
//["1000.00", "2000.00"]

/* 新增一个键，并赋予值 */
let new3 = items.map((item) => {
  item['newKey'] = item.sex + '-VIP';
  return item; //注意这个返回值
});
console.log('+++++', new3);
```

## 快速的让一个数组乱序

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
  return Math.random() - 0.5;
});
console.log(arr);
```

## 判断是否是数组

- `Array.isArray(arr）`
- `Object.prototype.toString.call(arr) === '[Object Array]'`
- `arr instanceof Array`
- `array.constructor === Array`

## Array.slice() 与 Array.splice() 的区别？

`arr.slice(开始位置（含）, 结束位置（不含）)：`“读取”数组指定的元素，**不会**对原数组进行修改；

`arr.splice(index, count, [insert Elements])：`操作”数组指定的元素，会修改原数组，返回被删除的元素；

- index ：`是操作的起始位置
- count = 0 ：`插入元素，`count > 0 ：`删除元素；
- [insert Elements] ：`向数组新插入的元素；

## 数组去重方法总结

- 利用 ES6 Set 去重（ES6 中最常用）

```javascript
//ES6 中的 Set 去重
function unique(array) {
  return Array.from(new Set(array));
  // 或者 return [...new Set(array)]
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
//{}没有去重
```

- 利用 for 嵌套 for，然后 splice 去重（ES5 中最常用）

```javascript
//双层 for 循环
function unique(arr) {
  let len = arr.length;
  //双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减 1
        len--;
        j--;
      }
    }
  }
  return arr;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
// [1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", Object {  }, Object {  }]
// NaN和{}没有去重，两个null直接消失了
```

- 利用 indexOf 去重

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  //新数组
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    //去查找新数组中有没有这个值，如果没有，就推入到新数组，否则就跳出循环
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]
//NaN、{} 没有去重
```

- 利用 sort()

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  arr = arr.sort();
  var arrry = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arrry.push(arr[i]);
    }
  }
  return arrry;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[0, 1, 15, NaN, NaN, "NaN", {…}, {…}, "a", false, null, "true", true, undefined]
//NaN、{} 没有去重
```

- 利用对象的属性不能相同的特点进行去重

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  var arrry = [];
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      arrry.push(arr[i]);
      obj[arr[i]] = 1;
    } else {
      obj[arr[i]]++;
    }
  }
  return arrry;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", 15, false, undefined, null, NaN, 0, "a",  {...}]
// //两个true直接去掉了，NaN和{}去重
```

- 利用 includes

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      //includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
//{}没有去重
```

- 利用 hasOwnProperty

```javascript
function unique(arr) {
  var obj = {};
  return arr.filter(function (item, index, arr) {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]
//所有的都去重了
```

- 利用 filter

```javascript
function unique(arr) {
  return arr.filter(function (item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
//{}没有去重
```

- 利用递归去重

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      //includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
//{}没有去重
```

- 利用 Map 数据结构去重

```javascript
function unique(arr) {
  let map = new Map();
  let array = new Array(); // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      // 如果有该key值
      map.set(arr[i], true);
    } else {
      map.set(arr[i], false); // 如果没有该key值
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a",  {...}, {...}]
//{}没有去重
```

- 利用 reduce+includes

```javascript
function unique(arr) {
  return arr.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    [],
  );
}
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
```

- [...new Set(arr)]

```javascript
[...new Set(arr)];
//代码就是这么少----（其实，严格来说并不算是一种，相对于第一种方法来说只是简化了代码）
```

<br />
<Alert status='success' variant='left-accent'>
 就这么多了！
</Alert>
<br />
