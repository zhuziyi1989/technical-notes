/*
 * @Author: zhuziyi 
 * @Date: 2018-08-03 16:39:22 
 * @Last Modified by: zhuziyi
 * @Last Modified time: 2019-02-26 21:30:24
 */


/**
 * 一个字符串的字符组合成的字符串集合
 */
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) =>
    acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};
console.log(anagrams('123')) // [ '123', '132', '213', '231', '312', '321' ]

/**
 * 数组去重 ①
 */
function unique(arr) {
  let hashTable = {};
  let data = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!hashTable[arr[i]]) {
      hashTable[arr[i]] = true; // 
      data.push(arr[i]);
    }
  }
  return data
}
console.log(unique([1, 2, 3, 4, 4, 56])) //[ 1, 2, 3, 4, 56 ]

/**
 * 关于Symbol
 */

// 数据类型： 原始数据类型（ 因此不能使用 new 初始化）
// Symbol不支持数字强制转换字符串


/**
 * 逗号操作符
 */
var x = 20;
var temp = {
  x: 40,
  foo: function () {
    var x = 10;
    return this.x;
  }
};
(temp.foo, temp.foo)(); // 20，而不是40

// 即逗号操作符会从左到右计算它的操作数， 返回最后一个操作数的值。
// 所以 (temp.foo, temp.foo)(); 等价于 var fun = temp.foo; fun();，
// fun调用时this指向window， 所以返回20。


/**
 * 进制转换
 */

parseInt('1111101000', 2).toString(10); //二进制 1111101000 转换成十进制

// 1.十进制转其他 
var a = 100; // a为十进制
console.log(a.toString(2)); //1100100   十进制 → 二进制
console.log(a.toString(8)); //144       十进制 → 八进制
console.log(a.toString(16)); //64       十进制 → 十六进制

// 2.其他转十进制 
// Number.parseInt(string[, radix]) 第二个参数代表当前数字的进制
var b = '110'; // b为字符串
console.log(parseInt(b, 2)); // b为二进制
console.log(parseInt(b, 8)); // b为八进制
console.log(parseInt(b, 16)); // b为十六进制

// 3.其他进制转其他进制
// 这里需要转换两次， 首先使用parseInt转换到十进制， 然后使用toString转换到目标进制。
var c = '147';
var c_8 = parseInt(c, 8); //这里把 c 视为八进制，c_8为十进制
var c_16 = c_8.toString(16) // 将c_8为十进制转换为十六进制
console.log(c_16); // 67