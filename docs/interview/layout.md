---
nav:
  title: 面试
  order: 2
group:
  title: 骨架和布局
  order: 1
---

# 骨架和布局

## 1. HTML 结构的语义和加载顺序

- HTML 语义：让人更容易读懂（增加代码可读性）；让搜索引擎更容易读懂，有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重（SEO）；在没有 CSS 样式下，页面也能呈现出很好地内容结构、代码结构。
- HTML 解析过程中，script 标签加载、解析顺序？ [图解 script 标签中的 async 和 defer 属性](https://juejin.cn/post/6894629999215640583)

## 2. 定位（[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)）

- BOM 盒模型(IE 盒模型的内容含 border 和 padding，box-sizing: border-box; W3C 盒模型 box-sizing: content-box) [box-sizing MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- 定位 Position（absolute/relative/fixed/[sticky](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning#position_sticky)）
- 浮动 float（清除浮动？空标签 clear:both、伪类、父级设置 overflow:hidden）
- [块级格式化上下文（BFC）](https://zhuanlan.zhihu.com/p/25321647) 可触发 BFC：根元素、浮动元素、绝对定位、display(inline-block、table-cells、flex)、overflow(hidden、auto、scroll)
- 文档流（定位流、浮动流和普通流）
- [z-index](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning#介绍_z-index) 描述元素的堆叠顺序

## 3. 布局

- 纯 CSS 盒子水平垂直居中的实现方法 [Demo](https://interview.jandou.com/demo/box-center.html)
- Flex
- Grid

## 4.移动端布局方案

- flex （[图解 CSS3 Flexbox 属性](https://www.w3cplus.com/css3/a-visual-guide-to-css3-flexbox-properties.html) 、[一份 Flex 完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)）
  - 问题 1：解释 CSS 语句 “flex: 0 1 auto” flex-grow flex-shrink flex-basis [参考链接](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/380)
  - 请注意`float`，`clear`、`vertical-align`对弹性项目没有影响。
- css-grid
- rem 单位的概念
- vw 和 vh（按视窗的百分比计算，1vw 为窗口的 1%，100vw 撑满，[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)）
- 媒体查询
- 百分比布局

问题例子：

- 因使用了标准盒模型，盒子的 border 必然导致盒子挤出去，那么如何实现边框？
  答：用阴影或者 outline 来画线更加巧妙。
- [水平垂直居中方案与 flexbox 布局](https://www.cnblogs.com/coco1s/p/4444383.html)

## CSS 选择器

- 权重（！important → 行内 → id → class/属性/伪类 → 元素标签 → 其他）

- 选择器 nth-child() [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)

  ```css
  /* 举例 */
  nth-child(3n+5)/*匹配第5、第8、第11...*/
  nth-child(5n-1)/*匹配第5-1=4、第10-1=9、…、第5的倍数减1*/
  nth-child(3n±0)/*相当于(3n)*/
  nth-child(±0n+3)/*相当于(3)*/
  ```

## CSS3 动画

- 三个重要属性：`transition`、`transform`、`animation`

## 收集性能问题

### 1. 相对自身移动的比较

`position: relative;` 和 `transform: translate(1px, 1px);` 均是相对自己的位置在移动，有什么区别呢？

> 参考答案：
>
> 1. 从页面布局的角度看效果是一样的。
> 2. 从动画角度来说使用 transform 时，可以让 GPU 参与运算，动画的 FPS 更高。position 时，最小的动画变化的单位是 1px，transform 参与时，可以做到更小（动画效果更加平滑）position 是为页面布局而生的。transform 是为动画而生的。
> 3. 表现效果相似，但 **translate 不会引起浏览器的重绘和重排**。
