## 一、Sticky footers布局
<p>
运用场景：如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。
</p>
<p>效果图：</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/1.png) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/cssLayout/2.gif)

### 实现方案
1. 父级fixed

[demo1](1)

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

[demo2](2)

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

[demo3](3)

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

### 实现方案
1. float + margin
2. BFC实现
3. flexBox实现