<p>
对于一个前端的初学者来说，首先要做好的事就是切页面了，切页面不得不说的就是布局了，布局的重要性不言而喻，为了良好的用户体验，提出了许多不一样的布局：响应式布局，弹性布局，流动布局等等，也流入出了许多的框架。最近在看关于移动端的响应式布局，其中涉及到比较多的就是大小属性的设置：px、vw、vh、%、em、rem等等，今天自己就捋一捋rem的用法。
</p>

## 说在前面
<p>
一想到写移动端的页面，就要考虑自己写的页面能够适应各种不同的移动设备，起初想想要做到感觉好难啊，最初想到的就是用第三方的框架，用别人写的东西应该会很方便。然而万一不能用该怎么办啊，所以还是要学会自己写原生的页面布局，也就会有今天的这篇文章了。先看看自己用普通百分比、像素来写的页面和后来改用rem写的页面的对比：
</p>

## 普通百分百布局与rem布局的比较
1. 小分辨率（375*667）
![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/1.png) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/62.png)
2. 小分辨率（414*736）
![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/6p.png)![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/2.png)
3. 大分辨率
![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/ipa1.png)![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/ipa2.png)

<p>
简单的对比下就看出了效果。当不用别人的框架，该怎么去写。最容易想到的就是用百分比来写，这种写法对设备的宽度有用，宽度是固定的，对高度不起什么作用，大部分人的做法就是宽度用百分来设置，高度用px来设置，但这种的做法体验并不是很好，用分辨率小的设备感觉不是很差，一旦换成了分辨率比较大的设备效果就差很多了，大部分的标签元素都会被拉伸。高度固定，换成了大的分辨率各种元素效果还是原来的，各种元素固定了大小，体验并不是很好。
</p>

## rem的使用
<p>
rem是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位，通过根元素进行适配的。
</p>

* 普通使用
<p>
大部分是通过设置html的字体大小就可以控制rem的大小，例如：html的字体大小为20px，那么就说20px为1rem，接下来的所有元素的大小都基于这个比例来换算。这种的算法是存在问题的，当我们计算页面的宽度rem值得时候都是使用某一款移动设备的分辨率来计算的，下面的例子我用的是iphone6的分辨率375*667，它的宽度为375px，20px为1rem，那么375px就是18.75rem。看下面的代码：
</p>

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <!--<script type="text/javascript" src="js/rem.js" ></script>-->
        <title></title>
        <style>
            html{
                font-size:20px;
            }
            *{
                border: 0;
                padding: 0;
                margin: 0;
            }
            #box1{
                width: 18.75rem;
                height: 7.5rem;
                float: left;
                background-color: red;
            
            }
            #box2{
                width: 18.75rem;
                height: 7.5rem;
                float: left;
                background-color: #00FFFF;
                font-size: 0.6rem;
            }
            #box3{
                width: 18.75rem;
                height: 17rem;
                float: left;
                background-color: #B22222;
            }
            #box4{
                width: 18.75rem;
                height: 20rem;
                float: left;
                background-color: #BFBFBF;
            }
            #box5{
                width: 18.75rem;
                height: 22rem;
                float: left;
                background-color: cadetblue;
            }
            #input1{
                width: 80%;
                height: 2rem;
                float: left;
                border-radius: 2rem;
                margin-left: 1.5rem;
                margin-top: 0.6rem;
            }
        </style>
    </head>
    <body>
        <div id="box1">
            <input type="text" id="input1" />
        </div>
        <div id="box2">手手手手手手手手手手手手手手手手手手手手手手手</div>
        <div id="box3">段段段段段段段段段段段段段段段段段段段段段段段</div>
        <div id="box4">方方方方方方方方方方方方方方方方方方方方方方方方</div>
        <div id="box5">哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦</div>
    </body>
</html>

```
<p>
上面的代码在375*667的分辨率下刚好能够占满宽度，当你切换到其他的分辨率（如414*736）时问题就来了，看图：
</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/6.png)![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/6p2.png)

<p>
这个问题的原因很简单，这种写法即使用的是rem也起不来作用，宽度和高度都是固定的，width为18.75rem就是375px，切换成其它分辨率（如414*736），它的宽度还是375px，空白处还是显示出来了，很多人会认为可以把宽度设置成百分比的形式，或者用媒介查询@media,或是viewport设置中的那个deviceWidth（<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">）的方式来解决问题，当然这些方式均能解决宽度的问题，然而高度的问题又该怎么办呢？看下面：
</p>

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <script type="text/javascript" src="js/jquery-3.1.1.min.js" ></script>
        <script type="text/javascript" src="js/jquery-1.8.3.min.js" ></script>
        <!--<script type="text/javascript" src="js/rem.js" ></script>-->
        <title></title>
        <style>
            html{
                font-size:20px;
            }
            *{
                border: 0;
                padding: 0;
                margin: 0;
            }
            #box1{
                width: 100%;
                height: 7.5rem;
                float: left;
                background-color: red;
            
            }
            #box2{
                width: 100%;
                height: 7.5rem;
                float: left;
                background-color: #00FFFF;
                font-size: 0.6rem;
            }
            #box3{
                width: 100%;
                height: 17rem;
                float: left;
                background-color: #B22222;
            }
            #box4{
                width: 100%;
                height: 20rem;
                float: left;
                background-color: #BFBFBF;
            }
            #box5{
                width: 100%;
                height: 22rem;
                float: left;
                background-color: cadetblue;
            }
            #input1{
                width: 80%;
                height: 2rem;
                float: left;
                border-radius: 2rem;
                margin-left: 1.5rem;
                margin-top: 0.6rem;
            }
        </style>
    </head>
    <body>
        <div id="box1">
            <input type="text" id="input1" />
        </div>
        <div id="box2">手手手手手手手手手手手手手手手手手手手手手手手</div>
        <div id="box3">段段段段段段段段段段段段段段段段段段段段段段段</div>
        <div id="box4">方方方方方方方方方方方方方方方方方方方方方方方方</div>
        <div id="box5">哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦</div>
    </body>
</html>
```
<p>
看效果：
</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/3.jpg) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/4~%7BL%60%241AE%7B%7D_%60W%248OOV4XCG.png)

<p>
看图就知道了，宽度可以适应不同的移动设备，然而高度一直都没有发生变化，一直都是150px，页面效果并不好看，分辨率大了，页面被拉伸，高度显得变小了。
</p>

* 正确使用
<p>
动态计算html的font-size，核心是切换不同移动设备通过js获取设备宽度，然后按比例计算html的font-size的值，动态变化。
</p>

```
var d = document.documentElement;//获取html元素
var cw = d.clientWidth || 750;
d.style.fontSize = (20 * (cw / 375)) > 40 ? 40 + 'px' : (20 * (cw / 375)) + 'px';
```
<p>
上述代码解释：
</p>

1. 设计稿横向分辨率为375（iphone6），计划20px为1rem；
2. 布局的时候，各元素的css尺寸= 20 * （设备宽度/设计稿竖向分辨率）。

<p>
完整代码：
</p>

```
window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), 
                        (function() {//判断是屏幕旋转还是resize
    function c() {
        var d = document.documentElement;//获取html元素
        var cw = d.clientWidth || 750;
        d.style.fontSize = (20 * (cw / 375)) > 40 ? 40 + 'px' : (20 * (cw / 375)) + 'px';
    }
    c();
    return c;
})(), false);
```
<p>
上面的做法就可以动态的设置各种标签元素的宽和高，按比例的调试适应不同的移动设备。例如下：
上面的代码中是以iphone6为设计稿的，box1的height为7.5rem(150px)，如果切换成iphone6 plus的大小，box1的height=(414/375)7.5=8.28rem,也就是8.2820=165.6px，与iphone6时的高度是不一样的，写页面时会更加的美观。看效果：
</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/50C114D616C65EFFBC1BFD66F52C1C9D.png) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/165.png)

<p>
看上面显示的效果就可以看出来，和计算出的结果是一样的，方法正确。以后可以用了。看看整体效果：
</p>

![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/ok.png) ![](https://raw.githubusercontent.com/DengSongsong/Blogs/master/images/SMJ3K9YYMCK9%24%25BT%40M5T3R7.png)
<p>

页面元素完全没有被拉伸的效果，按照一定的比例缩放，保持页面效果美观。
</p>

## [源码](https://github.com/DengSongsong/Blogs/blob/master/demos/rem/index.html)

最后，附上博文地址[github](https://github.com/DengSongsong/Blogs/issues/3)地址如果觉得有用的话希望[star](https://github.com/DengSongsong/Blogs)下，欢迎一起交流~~~