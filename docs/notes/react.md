---
group:
  title: React
  order: 1
---

# 父组件调用子组件方法

## 前言

本文是小结类文章，主要总结一下工作中遇到的父组件调用子组件方法。当然除了用 ref 之外还有很多其他方式，本文仅仅列举 ref 的方式。分别介绍父子组件都为 class；父子组件都是 hooks；父组件是 class 子组件是 hooks；父组件是 hooks，子组件是 class 的各种情况的调用方式。

## 父子组件都为 class

父子组件都是 class，父组件调用子组件方式比较传统，方法如下：

```jsx
import React, { Component } from 'react';
// 父组件
class Parent extends Component {
  render() {
    return (
      <div>
        <Child onRef={(ref) => (this._child = ref)} />
        <a onClick={this.click}>点击</a>
      </div>
    );
  }
  click = (e) => {
    this._child.myName();
  };
}
//子组件
class Child extends Component {
  componentDidMount() {
    //必须在这里声明，所以 ref 回调可以引用它
    this.props.onRef(this);
  }
  myName = () => alert('我是子组件的一个消息！');
  render() {
    return <div>我是子组件</div>;
  }
}

export default () => <Parent />;
```

## 父子组件都为 hooks

一般我们会结合 useRef，useImperativeHandle,forwardRef 等 hooks 来使用，官方推荐 useImperativeHandle,forwardRef 配合使用，经过实践发现 forwardRef 不用其实也是可以的，只要子组件把暴露给父组件的方法都放到 useImperativeHandle 里面就可以了。

```jsx
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from 'react';

// 子组件 hooks
const Child = (props, ref) => {
  const [val, setVal] = useState(0);
  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    changeVal: (newVal) => {
      setVal(newVal);
    },
  }));
  return <div>子组件 → {val}</div>;
};

// 转化子组件
const ChildComp = forwardRef(Child);

// 父组件 hooks
const Parent = () => {
  const childRef = useRef();
  const updateChildState = () => {
    // changeVal就是子组件暴露给父组件的方法
    childRef.current.changeVal(100);
  };
  return (
    <>
      <ChildComp ref={childRef} />
      <button onClick={updateChildState}>触发子组件方法</button>
    </>
  );
};

export default () => <Parent />;
```

## 父组件为 class,子组件为 hooks

其实就是上面的结合体。 子组件还是用 useImperativeHandle ，可以结合 forwardRef ，也可以不用。

```jsx
import React, { Component, useImperativeHandle, useState } from 'react';

// 子组件 hooks
const Child = (props, ref) => {
  const [val, setVal] = useState(0);
  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    changeVal: (newVal) => {
      setVal(newVal);
    },
  }));
  return <div>子组件 → {val}</div>;
};

// 父组件 class
class Parent extends Component {
  child = {}; //主要加这个
  updateChildState = () => {
    console.log(this.child.changeVal(99));
  };
  onRef = (ref) => {
    this.child = ref;
  };
  render() {
    return (
      <>
        <Child onRef={this.onRef} />
        <button onClick={this.updateChildState}>触发子组件方法</button>
      </>
    );
  }
}

// 导出
export default () => <Parent />;
```

## 父组件为 hooks，子组件是 class

这里其实和上面差不多，react 主要 dom 省略，仅展示精华部分

    //父组件hooks
     let richTextRef = {};
    // richTextRef.reseditorState();调用子组件方法
      <RichText
          getRichText={getRichText}
          content={content}
          onRef={ref => richTextRef = ref}
      />

    //子组件class
      componentDidMount = () => {
        this.props.onRef && this.props.onRef(this);// 关键部分
      }

       reseditorState = (content) => {
        this.setState({
          editorState: content ||'-',
        })
      }

## 小结

本文主要是总结，有些朋友在 hooks 或者 class 混合使用的时候，不清楚怎么调用子组件方法，这里总结一下，希望对各位小伙伴有所帮助。

<https://www.haorooms.com/post/react_class_hooks_dy>
