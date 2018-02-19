<p>
起初对BFC一点概念都没有，听到别人说起BFC时，不知道说的是什么，平时会用到BFC规则，但是不晓得这是BFC，今天捋一捋自己对BFC的理解。</p>

## 一、BFC的概念
<p>BFC的核心作用是用来格式化块级盒子，全称为“block formatting context”，块级格式化上下文。具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。</p>

## 二、BFC的生成
<p>满足以下任一条件即可生成BFC：</p>

1. body根元素
2. 浮动元素：float除none以外的值
3. 绝对定位元素：position(absolute,fixed)
4. display为inline-block、table-cells、flex
5. overflow除了visible以外的值(hidden、auto、scroll)

## 三、BFC的特性及作用
1. 同一个BFC下外边距会发生折叠及其解决方法

[demo1](https://github.com/DengSongsong/Blogs/blob/master/demos/BFC/index.html)

```
<style>
    div {
        width: 100px;
        height: 100px;
        background: red;
        margin: 100px;
    }
</style>
<body>
    <div></div>
    <div></div>
</body>
```
![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/BFC/1.png)
<p>
从图中可以看到，两个div元素外边距发生了折叠，第一个div元素的下边距与第二个元素的上边距有折叠，原因是这两个div元素在同一个BFC容器(body)下。
</p>
<p>若想避免外边距重叠，将这两个div元素放在不同的BFC容器中,用overflow：hidden产生BFC来解决</p>

[demo2](https://github.com/DengSongsong/Blogs/blob/master/demos/BFC/index2.html)

```
<style>
    .box {
        overflow: hidden;
    }
    .content {
        width: 100px;
        height: 100px;
        background: red;
        margin: 100px;
    }
</style>
<body>
    <div class="box">
        <div class="content"></div>
    </div>
    <div class="box">
        <div class="content"></div>
    </div>
</body>
```
![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/BFC/2.png)

2. 包含浮动元素及其解决方法
<p>
在通常情况下父元素的高度会被子元素撑开，而在这里因为其子元素为浮动元素所以父元素发生了高度坍塌，上下边界重合。浮动元素会脱离文档流
</p>

[demo3](https://github.com/DengSongsong/Blogs/blob/master/demos/BFC/index3.html)

```
<style>
    .container {
        border: 1px solid red;
    }
    .content {
        float: left;
        width: 100px;
        height: 100px;
        background-color: blue;
    }
</style>
<body>
    <div class="container">
        <div class="content"></div>
    </div>
</body>
```

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/BFC/3.png)

<p>容器内元素浮动，脱离了文档流，所以容器只剩下2px的边距高度。如果触发容器的BFC，容器将会包含浮动元素，overflow：hidden，清除浮动</p>

[demo4](https://github.com/DengSongsong/Blogs/blob/master/demos/BFC/index4.html)

```
<style>
    .container {
        border: 1px solid red;
        overflow: hidden;
    }
    .content {
        float: left;
        width: 100px;
        height: 100px;
        background-color: blue;
    }
</style>
<body>
    <div class="container">
        <div class="content"></div>
    </div>
</body>
```

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/BFC/4.png)

3. 阻止元素被浮动元素覆盖及其解决方法

[demo5](https://github.com/DengSongsong/Blogs/blob/master/demos/BFC/index5.html)

```
<style>
    .box1 {
        float: left;
        width: 100px;
        height: 100px;
         background-color: aqua;
    }
    .box2 {
        width: 200px;
        height: 150px;
        background: blue;
    }
</style>
<body>
    <div class="box1">box1</div>
    <div class="box2">box2</div>
</body>
```

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/BFC/5.png)

<p>第二个元素有部分被浮动元素所覆盖,如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 overflow: hidden</p>

[demo6](https://github.com/DengSongsong/Blogs/blob/master/demos/BFC/index6.html)

```
<style>
    .box1 {
        float: left;
        width: 100px;
        height: 100px;
        background-color: aqua;
    }
    .box2 {
        overflow: hidden;
        width: 200px;
        height: 150px;
        background: blue;
    }
</style>
<body>
    <div class="box1">box1</div>
    <div class="box2">box2</div>
</body>
```

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/BFC/6.png)