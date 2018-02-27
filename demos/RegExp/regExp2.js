/*
    正则表达式学习之基础二
*/

/* 匹配模式 */
// let str = 'aaab';
// let regex1 = /a+/; //贪婪模式
// let regex2 = /a+?/; //非贪婪模式
// console.log(str.match(regex1)); //['aaa']，捕获了所有的a
// console.log(str.match(regex2)); //['a']，只捕获到第一个a

/* 方法 */

/* exec() */
// const regex = /\d+/;
// console.log(regex.exec('123javascript')); //['123']

/* test() */
// const regex = /abc/;
// console.log(regex.test('abcab'));     //true
// console.log(regex.test('abacd'));     //false

/* match() */
// const str = 'this is javascripts'
// console.log(str.match(/\bi.\s\w+/)); //['is javascripts']

/* replace() */
// var str = 'this is javascripts'
// console.log(str.replace(/\b(i.)\s(\w+)/, '$1 perfect $2'));    //'this is perfect javascripts'

// var str = 'this is javascripts'
// str.replace(/\b(i.)\s(\w+)/, (...args) => {
//    console.log(args); //[ 'is javascripts', 'is', 'javascripts', 5, 'this is javascripts']
// });   

/* search() */
// const str = 'this is javascripts'
// console.log(str.search(/\bi.\s\w+/)); //5

/* split() */
// const str = 'this is javascripts'
// console.log(str.split(/\s/)); //[ 'this', 'is', 'javascripts' ]

/* $ */
// var str = "#8080";
// var output = str.replace(/#(\d+)/,"$1"+"~~");//自然也可以写成 "$1~~"
// console.log(RegExp.$1);//8080
// console.log(output);//8080~~

/* $1、$2、...、$99 */
// let str = 'aa22AA';
// console.log(str.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$1')); // "aa"
// console.log(str.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$2')); // "22"
// console.log(str.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$3')); // "AA"
//猜想 如果是 $4 回事什么呢？ undefined ? 
// console.log(str.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$4')); // "$4"
//所以，要是没有该子项，则当成普通字符串处理了
    
/* $& */
// console.log(str.replace(/([a-z]+)(\d+)([A-Z]+)/g, '$&')); //"aa22AA"

/* $` */
// console.log(str.replace(/(\d+)/g, '$`')); //"aaaaAA"

/* $' */
// console.log(str.replace(/(\d+)/g, "$'")); //"aaAAAA"

/* $$ */
// console.log(str.replace(/(\d+)/g, '$$')); //"aa$AA"

/* 反向引用 */
// let str = 'abcaabbccabc';
// console.log(str.match(/([abc])\1/g));//[ 'aa', 'bb', 'cc' ]

let str = 'abcaabbccabc';
console.log(str.match(/([abc])\2/g));//null