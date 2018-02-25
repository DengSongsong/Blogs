/*
    正则表达式学习一
*/

/* 
    ^ 和 $ 
*/
const regex = /^A/;
console.log(regex.test('And'));  //true
console.log(regex.test(' And'));  //false
console.log(regex.test('dAs'));  //false

const regex = /t$/;
console.log(regex.test('eat'));  //true
console.log(regex.test('eater'));  //false

/*
    *、+、?、{n}、{n,}、{n,m}
*/

/* '*' */
const regex = /a*/;
console.log(regex.test('ba'));   //true
console.log(regex.test('b'));   //true
console.log(regex.test('baaaa'));   //true

const regex2 = /ab*/; //匹配a后面的b
console.log(regex2.test('b'));   //false
console.log(regex2.test('ab'));   //true
console.log(regex2.test('a'));   //true
console.log(regex2.test('ae'));   //true

/* + */
const regex = /a+/
console.log(regex.test('ba'));  //true
console.log(regex.test('a'));   //true
console.log(regex.test('b'));   //false

const regex2 = /ba+/
console.log(regex2.test('ba'));  //true
console.log(regex2.test('a'));  //false
console.log(regex2.test('cbaad'));  //true

/* ? */
const regex = /ba?/;
console.log(regex.exec('ba'));  //['ba']
console.log(regex.exec('b'));   //['b']
console.log(regex.exec('bc'));  //['b']
console.log(regex.exec('baaa')); //['ba']
console.log(regex.exec('bsa'));  //['b']

const regex = /a?/;
console.log(regex.exec('a'));  //['a']
console.log(regex.exec('ad'));  //['a']
console.log(regex.exec('cad'));  //['']

/* {n} */
const regex = /ba{2}/
console.log(regex.test('b'));    //false
console.log(regex.test('ba'));   //false
console.log(regex.test('baa')); //true
console.log(regex.test('baaa')); //true

const regex2 = /a{2}/
console.log(regex2.test('baa'));    //true
console.log(regex2.test('aa'));    //true

/* {n,} */
const regex = /ba{3,}/;
console.log(regex.test('ba'));  //false
console.log(regex.test('baaa'));  //true
console.log(regex.test('aaa'));  //false

const regex2 = /a{3,}/;
console.log(regex2.test('ba'));  //false
console.log(regex2.test('baaa'));  //true
console.log(regex2.test('aaaa'));  //true

/* {n,m} */
const regex = /ba{2,3}/;
console.log(regex.test('ba'));  //false
console.log(regex.test('baaa'));  //true
console.log(regex.test('baa'));  //true
console.log(regex.test('aaa'));  //false

/* . */
const regex = /b.?/
console.log(regex.exec('ba'));     //['ba']
console.log(regex.exec('bxaa'));   //['bx']
console.log(regex.exec('bza'));    //['bz']
console.log(regex.exec('b'));      //['b']

/* \d */
const regex = /b\d/;
console.log(regex.exec('b2'));        //['b2']
console.log(regex.exec('2'));         //null
console.log(regex.exec('b2aa'));      //['b2']
console.log(regex.exec('bza'));       //null
console.log(regex.exec('b'));         //null

/* \w */
const regex = /b\w/;
console.log(regex.exec('b2'));     //['b2']
console.log(regex.exec('b2aa'));     //['b2']
console.log(regex.exec('bza'));      //['bz']
console.log(regex.exec('b_a'));      //['b_']
console.log(regex.exec('b'));       //null

const regex2 = /\w/;
console.log(regex2.exec('b2'));     //['b']
console.log(regex2.exec('%dd'));     //['d']
console.log(regex2.exec('3b'));      //['3']
console.log(regex2.exec('_a'));      //['_']
console.log(regex2.exec('b+'));       //['b']

/* \s */
const str = 'javascript is good';
console.log(str.match(/is\sgood/));    //['is good']
console.log(str.match(/javascript\sis/));    // ['javascript is']

/* \b */
const str = 'javascript is good';
console.log(str.match(/\bj/));    //['j']
console.log(str.match(/ipt\b/));    // ['ipt']

/*
    [^x]、\D、\W、\S、\B
*/

/* [^x] */
const regex = /b[^a]/;
console.log(regex.exec('ba'));     //null
console.log(regex.exec('bz'));     //['bz']
console.log(regex.exec('bya'));    //['by']

/* \D */
const regex = /b\D/;
console.log(regex.exec('b1'));    //null
console.log(regex.exec('b2'));    //null
console.log(regex.exec('ba'));     //['ba']

/* \W */
const regex = /b\W/;
console.log(regex.exec('b1'));     //null
console.log(regex.exec('ba'));     //null
console.log(regex.exec('b_'));      //null
console.log(regex.exec('b%'));      //['b%']

/* \S*/
const str = 'javascript is good';
console.log(str.match(/ja\S/));    //['jav']
console.log(str.match(/t\S/));    // null

/* \B*/
const str = 'javascript is good';
console.log(str.match(/\Bpt/));    //['pt']
console.log(str.match(/\Bj/));    // null
console.log(str.match(/ja\B/));    // ['ja']

/* […] */
const regex = /b[a-z]/;
console.log(regex.test('ba'));      //true
console.log(regex.test('bA'));       //false

/* (x) */
const regex = /(abab)+/;
console.log(regex.exec('ab'));     //null
console.log(regex.exec('abab'));     //['abab', 'abab']
console.log(regex.exec('ababab'));     //['abab', 'abab']
console.log(regex.exec('abababab'));   //['abababab','abab']
console.log(regex.exec('ababababab'));   //['abababab','abab']
console.log(regex.exec('abababababab'));   //['abababababab','abab']
console.log(regex.exec('ababababababab'));   //['abababababab','abab']
console.log(regex.exec('abababababababab'));   //['abababababababab','abab']

/* (?:X) */
const regex = /(?:abab)+/;
console.log(regex.exec('ab'));     //null
console.log(regex.exec('abab'));     //['abab']
console.log(regex.exec('ababab'));     //['abab']
console.log(regex.exec('abababab'));   //['abababab']
console.log(regex.exec('ababababab'));   //['abababab']
console.log(regex.exec('abababababab'));   //['abababababab']
console.log(regex.exec('ababababababab'));   //['abababababab']
console.log(regex.exec('abababababababab'));   //['abababababababab']

/* (?=X) */
const regex = /\d+(?=\.)/;
console.log(regex.exec('3.141'))  //['3']

/* (?!X) */
const regex = /\d+(?!\.)/;
console.log(regex.exec('3.141'))  //['141']

/* | */
const regex = /a|b/;
console.log(regex.exec('a'));  //['a']
console.log(regex.exec('b'));  //['b']
console.log(regex.exec('dddab'));  //['a']
console.log(regex.exec('c'));  //null