---
nav:
  title: 关于面试
  order: 2
group:
  title: 软件工程
  order: 6
title: 算法
order: 7
---

# 算法

| 清单目录                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------ |
| [斐波那契数列](https://leetcode-cn.com/problems/fibonacci-number/)                                                 |
| [合并二维有序数组成一维有序数组](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)      |
| [链表：反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)                                       |
| [链表：链表有环](https://leetcode-cn.com/problems/linked-list-cycle/)                                              |
| [堆栈队列：判断括号字符串是否有效](https://leetcode-cn.com/problems/valid-parenthesis-string/)                     |
| [返回数组中第 k 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)                     |
| [找出数组中和为 sum 的 n 个数](https://wizardforcel.gitbooks.io/the-art-of-programming-by-july/content/02.03.html) |
| [贪心：具有给定数值的最小字符串](https://leetcode-cn.com/problems/smallest-string-with-a-given-numeric-value/)     |
| [二叉树：最大深度](https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/)                                   |
| [二叉树：层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)                            |
| [剪枝：判断数独是否有效](https://leetcode-cn.com/problems/valid-sudoku/)                                           |
| [二分查找：求解平方根](https://leetcode-cn.com/problems/sqrtx/)                                                    |
| [字典树：实现一个字典树](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)                             |
| [爬楼梯问题](https://leetcode-cn.com/problems/climbing-stairs/)                                                    |
| [最短距离](https://leetcode-cn.com/problems/shortest-distance-to-a-character/)                                     |
| [LRU 缓存](https://leetcode-cn.com/problems/lru-cache/)                                                            |
| [翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)                                                 |

## 一、初级

### 1.快速排序

```javascript
//常规快速排序算法，递归的利用
function quicksort(arr) {
  if (arr.length == 0) return [];
  let left = [];
  let right = [];
  let pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quicksort(left).concat(pivot, quicksort(right));
}
console.log(quicksort([2, 4, 5, 49, 63, 4, 5, 55, 2, 4, 43])); // [2, 2, 4, 4, 4, 5, 5, 43, 49, 55, 63]
/*
简单版本的缺点是，它需要Ω(n)的额外存储空间，也就跟归并排序一样不好。
额外需要的存储器空间配置，在实际上的实现，也会极度影响速度和高速缓存的性能。
*/
```

### 2.冒泡排序

```javascript
let bubbleSort = (arrary) => {
  const length = arrary.length;
  for (let i = 0; i <= length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (arrary[i] > arrary[j]) {
        let temp = arrary[i];
        arrary[i] = arrary[j];
        arrary[j] = temp;
      }
    }
  }
  return arrary;
};

console.log(`${bubbleSort([1, 20, 5])}`);

/*
for(①;②;③){
    ④；
}
               ↓———————————————|
  start → ① → ② → true → ④ → ③
                 ↓
               false
                 ↓
                end
*/
```

### 3.Fibonacci（[斐波那契](https://baike.baidu.com/item/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97)）

```javascript
* 斐波那契数列：0、1、1、2、3、5、8、13、21、34、…

环 O(n)
function fibonacci(n){
  var fibo = Array(0,1);
  if (n === 0) return 0;
 if (n <= 2) return 1;
 for(let i = 2; i<=n; i++){
  fibo[i] = fibo[i-1]+fibo[i-2]
 }
  return fibo[n];
}
fibonacci(12); //  = 144

//递归方法 O(2n)
function fibonacciX(n){
  if(n <= 1) {
      return n;
  } else {
      return fibonacciX(n-1) + fibonacciX(n-2);
  }
}
fibonacciX(15); //  = 610

//递归方法之 ES6简写 O(2n)-
const fibonacciX = (n) =>  (n <= 1 ? n : fibonacciX(n-1) + fibonacciX(n-2))
fibonacciX(20); //  = 6765
```

### 4. 洗牌算法

### 5.[两数之和](https://leetcode-cn.com/problems/two-sum/)

## 二、进阶

### 1. 哈希表问题

参考：[前端进阶算法 8：头条正在面的哈希表问题 #49
](https://github.com/sisterAn/JavaScript-Algorithms/issues/49)
