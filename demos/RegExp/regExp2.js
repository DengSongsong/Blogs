/*
    正则表达式学习之基础二
*/

/* 匹配模式 */
let str = 'aaab';
let regex1 = /a+/; //贪婪模式
let regex2 = /a+?/; //非贪婪模式
console.log(str.match(regex1)); //['aaa']，捕获了所有的a
console.log(str.match(regex2)); //['a']，只捕获到第一个a

/* 方法 */

/* exec() */
const regex = /\d+/;
console.log(regex.exec('123javascript')); //['123']

/* test() */
const regex = /abc/;
console.log(regex.test('abcab'));     //true
console.log(regex.test('abacd'));     //false

/* match() */
const str = 'this is javascripts'
console.log(str.match(/\bi.\s\w+/)); //['is javascripts']

/* replace() */
var str = 'this is javascripts'
console.log(str.replace(/\b(i.)\s(\w+)/, '$1 perfect $2'));    //'this is perfect javascripts'

// var str = 'this is javascripts'
str.replace(/\b(i.)\s(\w+)/, (...args) => {
   console.log(args); //[ 'is javascripts', 'is', 'javascripts', 5, 'this is javascripts']
});   

/* search() */
const str = 'this is javascripts'
console.log(str.search(/\bi.\s\w+/)); //5

/* split() */
const str = 'this is javascripts'
console.log(str.split(/\s/)); //[ 'this', 'is', 'javascripts' ]