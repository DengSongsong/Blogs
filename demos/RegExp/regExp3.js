/**
 * 正则表达式学习之进阶
 */

/* 零宽断言 */

/* (?=x) */
let str = '3.14';
console.log(str.match(/\d+(?=\.)/));    //['3']

/* (?!x) */
let str = '3.14';
console.log(str.match(/\d+(?!\.)/));    //['14']

/* (?<=x) */
let str = '3.14';
console.log(str.match(/\d+(?<=\.)/));    //error

let str = '123abc789';
// 没有使用环视，匹配到了结果，abc直接被替换
let regex = str.replace(/abc/, 456);
console.log(regex);  //123456789

// 使用了顺序肯定环视，捕获到了a前面的位置，所以abc没有被替换，只是将3替换成了3456
regex = str.replace(/3(?=abc)/, 3456);
console.log(regex);   //123456abc789

// 使用了顺序否定环视，由于3后面跟着abc，不满足条件，故捕获失败，所以原字符串没有被替换
regex = str.replace(/3(?!abc)/, 3456);
console.log(regex);   //123abc789

// 使用了顺序否定环视，捕获到了abc后面的位置，将7替换成了3456
regex = str.replace(/7(?!abc)/, 3456);
console.log(regex);   //123abc345689

/* 千位分隔符 */
let str = '1234567890';
let format = str.replace(/(?!^)(?=([0-9]{3})+$)/g, ',');
console.log(format); // 1,234,567,890

let str = '1234567890';
let format = str.replace(/\B(?=([0-9]{3})+(?!\d))/g, ',');
console.log(format); // 1,234,567,890

/* 去除字符串左右两边的空格 */
let str = ' javascript is good ';
let format = str.replace(/(^\s*)|(\s*$)/g, "");
console.log(format);    //javascript is good

/* 首字母大写 */
let str = 'hello world';
String.prototype.firstUpperCase = function(){
    return this.replace(/(?:^|\s)[a-z]/g, s => {
        return s.toUpperCase();
    });
};
console.log(str.firstUpperCase());  //Hello World

/* 解析url参数 */
function urlParse(url) {
    // let regex = /[?&][^?&]+=[^?&]+/g;
    let regex = /[?&](\w)+=(\w)+/g;
    // let arr = url.match(regex);
    let arr = url.match(regex);//[ '?id=123', '&username=jxufe', '&age=12' ]
    console.log(arr);
    let obj = {};
    if(arr) {
        arr.forEach(item => {
            let tempArr = item.substring(1).split('=');
            console.log(tempArr);// [ 'id', '123' ]、[ 'username', 'jxufe' ]、[ 'age', '12' ]
            let key = decodeURIComponent(tempArr[0]);
            let value = decodeURIComponent(tempArr[1]);
            obj[key] = value;
        })
    }
    console.log(obj);//{ id: '123', username: 'jxufe', age: '12' }
    return obj;
}
urlParse('www.jxufe.edu.cn?id=123&username=jxufe&age=12');

function getParamName(url, key) {
    let match = RegExp(`[?$]${key}=([^&]*)`);
    let arr = url.match(match); // ['?id=123','123']
    let value = decodeURIComponent(arr[1]); //123
    return value;
}
getParamName('www.jxufe.edu.cn?id=123&username=jxufe&age=12', 'id');

/* 时间格式转换 */
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) { //匹配yyyy
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        console.log(fmt);// 2018-MM-dd hh:mm
    }
    let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
    };
    for(let k in o) {
        // 匹配MM dd hh mm
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k]+ '';
            // 值替换
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt;
}
function padLeftZero(str) {
    // 002 -> 02; 0028 -> 28
	return ('00' + str).substr(str.length);
}
// 时间戳
let timeStr = 1519823106;
let date = new Date(timeStr*1000);
formatDate(date, 'yyyy-MM-dd hh:mm');