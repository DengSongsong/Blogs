想想切页面布局还是挺重要的，今天就梳理下CSS中主要的布局方案，方便自己参考，也方便大家参考。如果大家喜欢我的文章，欢迎交流，也欢迎各位[star](https://github.com/DengSongsong/Blogs),关注我的[github](https://github.com/DengSongsong)。

## 一、Sticky footers布局
<p>
运用场景：如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。
</p>
<p>效果图：</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/1.png) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/2.gif)

### 实现方案
1. 父级fixed

[demo1](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index.html)

```
<style>
    html,body {
        height: 100%;
        margin: 0;
        padding:0;
    }
    .container {
        position: fixed;
        z-index:2;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .container-wrapper {
        width: 100%;
        min-height: 100%;
    }
    .container-main {
        padding-bottom: 50px;
        margin-top: 64px;
    }
    .container-footer {
        width: 100%;
        height: 50px;
        text-align: center;
        margin-top: -50px;
        background-color: aqua;
    }
    .clearfix {
        display: inline-block;
    }
    .clearfix:after {
        display: block;
        content: ".";
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    </style>
    <body>
    <div class="container">
        <div class="container-wrapper clearfix">
            <div class="container-main">
                ...
            </div>
        </div>
        <div class="container-footer">  
            footer 
        </div>
    </div>
</body>
``` 
2. Flexbox

[demo2](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index2.html)

```
<style>
    html,body {
        height: 100%;
        margin: 0;
        padding:0;
    }
    .container {
        position: fixed;
        z-index:2;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
    .container-wrapper {
        flex: 1;
    }
    .container-main {
        padding-bottom: 50px;
        margin-top: 64px;
    }
    .container-footer {
        width: 100%;
        height: 50px;
        flex: 0 0 50px;
        text-align: center;
        background-color: aqua;
    }
    </style>
    <body>
    <div class="container">
        <div class="container-wrapper">
            <div class="container-main">
                ...
            </div>
        </div>
        <div class="container-footer">  
            footer 
        </div>
    </div>
</body>
``` 
3. calc函数

[demo3](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index3.html)

```
<style>
    html,body {
        height: 100%;
        margin: 0;
        padding:0;
    }
    .container {
        position: fixed;
        z-index:2;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .container-wrapper {
        min-height: (100% - 50px);
    }
    .container-main {
        padding-bottom: 50px;
        margin-top: 64px;
    }
    .container-footer {
        width: 100%;
        height: 50px;
        flex: 0 0 50px;
        text-align: center;
        background-color: aqua;
    }
    </style>
    <body>
    <div class="container">
        <div class="container-wrapper">
            <div class="container-main">
                ...
            </div>
        </div>
        <div class="container-footer">  
            footer 
        </div>
    </div>
</body>
``` 

## 二、两栏布局
<p>一栏定宽，一栏自适应</p>
<p>效果图：</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/3.png) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/4.png)

### 实现方案
1. float + margin
[demo4](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index4.html)

```
<style>
    .left {
        float: left;
        width: 200px;
        height: 400px;
        background-color: blue;
        text-align: center;
    }
    .right {
        height: 400px;
        margin-left: 200px;
        background-color: yellow;
        text-align: center;
    }
</style>
<body>
    <div class="left">定宽</div>
    <div class="right">自适应</div>
</body>
```
2. BFC实现
[demo5](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index5.html)

```
<style>
    left {
        float: left;
        width: 200px;
        height: 400px;
        background-color: blue;
        text-align: center;
    }

    .right {
        overflow: hidden;/*生成BFC*/
        height: 400px;
        background-color: yellow;
        text-align: center;
    }
</style>
<body>
    <div class="left">定宽</div>
    <div class="right">自适应</div>
</body>
```
3. flexBox实现
[demo6](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index6.html)

```
<style>
    .container {
        width: 100%;
        display: flex;
    }
    .left {
        width: 200px;
        height: 400px;
        flex: 0 0 200px;
        background-color: blue;
        text-align: center;
    }

    .right {
        flex: 1;
        height: 400px;
        background-color: yellow;
        text-align: center;
    }
</style>
<body>
    <div class="container">
        <div class="left">定宽</div>
        <div class="right">自适应</div>
    </div>
</body>
```

## 三、三栏布局
<p>左右定宽 中间自适应</p>
<p>效果图：</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/5.png)

### 实现方案

1. float + margin + float
[demo7](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index7.html)

```
<style>
    .left {
        float: left;
        width: 200px;
        height: 400px;
        text-align: center;
        background-color: blue;
    }
    .middle {
        height: 400px;
        margin-left: 200px; 
        margin-right: 200px;
        text-align: center;
        background-color: red;
    }
    .right {
        float: right;
        width: 200px;
        height: 400px;
        text-align: center;
        background-color: yellow;
    }
</style>
<body>
    <div class="left">定宽left</div>
    <div class="right">定宽right</div>
    <div class="middle">自适应middle</div>
</body>
```

2. position + margin + position
[demo8](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index8.html)

```
<style>
        * {
            margin: 0;
            padding: 0;
        }
        .left {
            width: 200px;
            height: 400px;
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            background-color: blue;
        }
        .middle {
            height: 400px;
            margin: 0 200px;
            text-align: center;
            background-color: red;
        }
        .right {
            position: absolute;
            top: 0;
            right: 0;
            width: 200px;
            height: 400px;
            text-align: center;
            background-color: yellow;
        }
</style>
<body>
    <div class="left">定宽left</div>
    <div class="middle">自适应middle</div>
    <div class="right">定宽right</div>
</body>
```

3. flex
[demo9](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index9.html)

```
<style>
        * {
            margin: 0;
            padding: 0;
        }
        .wrapper {
            display: flex;
        }
        .left {
            width: 200px;
            height: 400px;
            flex: 0 0 200px; 
            text-align: center;
            background-color: blue;
        }
        .middle {
            height: 400px;
            flex: 1;
            text-align: center;
            background-color: red;
        }
        .right {
            width: 200px;
            height: 400px;
            flex: 0 0 200px;
            text-align: center;
            background-color: yellow;
        }
</style>
<body>
    <div class="wrapper">
        <div class="left">定宽left</div>
        <div class="middle">自适应middle</div>
        <div class="right">定宽right</div> 
    </div>
</body>
```

4. 圣杯布局
[demo10](https://github.com/DengSongsong/Blogs/blob/master/demos/cssLayout/index10.html)

```
<style>
        * {
            margin: 0;
            padding: 0;
        }
        .wrapper {
           overflow: hidden;/*清除浮动*/
        }
        .left {
            float:left;
            width: 200px;
            height: 400px;
            margin-left: -100%;
            text-align: center;
            background-color: blue;
        }
        .middle {
            float:left;
            width: 100%;
            text-align: center;
        }
        .main{
            height: 400px;
            margin: 0 200px;
            background: red;
        }
        .right {
            float:left;
            width: 200px;
            height: 400px;
            margin-left: -200px;
            text-align: center;
            background-color: yellow;
        }
</style>
<body>
    <div class="wrapper">
        <div class="middle">
            <div class="main">自适应middle</div>
        </div>
        <div class="left">定宽left</div>
        <div class="right">定宽right</div> 
    </div>
</body>
```

最后，附上博文地址[github](https://github.com/DengSongsong/Blogs/issues/7)地址如果觉得有用的话希望[star](https://github.com/DengSongsong/Blogs)下，欢迎一起交流，我们一起进步~~~