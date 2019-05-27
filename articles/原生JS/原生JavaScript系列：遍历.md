&emsp;&emsp;`JavaScript`中可以实现遍历的数据类型主要是对象，其中包括普通对象与数组。实现遍历的方式有很多，本文梳理下`JavaScript`中能实现遍历的方式。

## 对象&&数组

### for...in

&emsp;&emsp;语句以任意顺序遍历一个对象自有的、继承的、可枚举的、非`Symbol`的属性。对于每个不同的属性，语句都会被执行。

语法：

```javaScript
for (variable in object) {
  xxx
}
```
> 参数：
>> variable：在每次迭代时，将不同的属性名分配给变量。<br/>
>> object：被迭代枚举其属性的对象。

&emsp;&emsp;从定义上来看，`for...in`语句遍历对象和组数都是可以的，但是此方式使用在数组可能会带来一些我们并不想看到的东西，看下面的实例一：

```javaScript
// 实例一
Array.prototype.name = 'fe'
let arr = [10, 20, 30, 40, 50]
arr.str = 'hello'
for(let index in arr) {
  console.log(index) // 0, 1, 2, 3, 4, str, name
}
```
&emsp;&emsp;上面的实例一输出结果可以看出，直接得到不是数组元素值，而是数组的索引值（键名），同时还有其自定义属性以及其原型链上的属性和方法‘str’，‘name’两项，数组本身也是对象。

&emsp;&emsp;即使使用`getOwnPropertyNames()`或执行`hasOwnProperty()` 来确定某属性是否是对象本身的属性可以避免原型链上的属性和方法不输出，但还是不能避免自定义的属性输出。实例二：

```javaScript
// 实例二
Array.prototype.name = 'fe'
let arr = [10, 20, 30, 40, 50]
arr.str = 'hello'
for(let index in arr) {
  if (arr.hasOwnProperty(index)) {
    console.log(index) //  0, 1, 2, 3, 4, str
  }
}
```
数组使用`for...in`遍历，可能会存在以下几个问题：
 
1. 得到的index索引值为字符串，不能直接做几何运算，需要先做数据类型转换处理；
2. 可能以任意顺序做遍历的，即遍历顺序可能不是按照数组内部顺序；
3. 会遍历数组所有可枚举的属性，包括原型。 

&emsp;&emsp;在一定程度上来看，使用`for...in` 遍历数组是一个很糟糕的选择，不推荐使用`for...in` 语句遍历数组，对开发经验欠缺的新人不友好，比较容易踩到坑，会遇到很多意想不到的问题。遍历数组更多的推荐是`for...of`与`foreach` 这两种方式，下面也会详细的梳理这两种方式。

>注意点：
>> - `for...in`比较适合遍历普通对象，遍历得到的结果是对象的键名，其顺序也是无序的，无关顺序。也可以通过`break`或者`return false`中断遍历。
>> - 在迭代过程中最好不要在对象上进行添加、修改或者删除属性的操作，除非是对当前正在被访问的属性。

```javaScript
// 实例三
let obj = {
  name: 'fe',
  age: 18
}
for(let key in obj) {
  console.log(key) // name age
}
```

### for...of
&emsp;&emsp;语句在可迭代对象（包括 `Array`，`Map`，`Set`，`String`，`TypedArray`，`arguments` 对象，`NodeList` 对象等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。该语句是ES6新增遍历方式，功能还是比较强大的。<br/>

<span>语法：</span>

```javaScript
for (variable of iterable) {
  xxx
}
```
> 参数：
>> variable：在每次迭代中，将不同属性的值分配给变量。<br/>
>> iterable：一个具有可枚举属性并且可以迭代的对象。


```javaScript
// 实例四
let arr = [10, 20, 30, 40, 50]
arr.str = 'hello'
for(let value of arr) {
  console.log(value) // 10 20 30 40 50
}
```
&emsp;&emsp;`for...of`语句常用在遍历数组，从实例四看出，`for...of`可以直接得到数组索引中的值，但是不会将其实例属性的值返回。原因在于`for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性，所以`for...of`循环不会返回数组`arr`的`str`属性。

&emsp;&emsp;话说我们平时的开发中常用`for..of`遍历数组，从上面的定义来看，`for...of`不仅仅能遍历数组，也可以遍历`String`（字符串）、`Map`、`Set`等数据结构，是因为这几个数据结构默认内置了遍历器接口，`Iterator接口`，即`Symbol.iterator`方法。

&emsp;&emsp;也就是说有了遍历器接口，数据结构就可以用`for...of`循环遍历。遍历器（`Iterator`）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 `Iterator 接口`，就可以完成遍历操作。`Iterator接口`与`for...of`都是ES6提出的特性，`Iterator接口`也就主要供`for...of`消费。

```javaScript
// 实例五
let arr = [10, 20, 30, 40, 50]
arr.str = 'hello'
let item = arr[Symbol.iterator]() // 遍历器对象
console.log(item.next()) // { value: 10, done: false }
console.log(item.next()) // { value: 20, done: false }
console.log(item.next()) // { value: 30, done: false }
console.log(item.next()) // { value: 40, done: false }
console.log(item.next()) // { value: 50, done: false }
console.log(item.next()) // { value: undefined, done: true }
```
&emsp;&emsp;实例五是`Iterator`的遍历过程，通过手动调用其对象的`next()`方法实现信息获取。默认的`Iterator接口`部署在数据结构的`Symbol.iterator`属性。对于原生部署`Iterator接口`的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历。可以参考实例四。

```javaScript
// 实例六
let str = 'abc'
let item = str[Symbol.iterator]()

console.log(item.next()) // { value: 'a', done: false }
console.log(item.next()) // { value: 'b', done: false }
console.log(item.next()) // { value: 'c', done: false }
console.log(item.next()) // { value: undefined, done: true }

for (let item of str) {
  console.log(item) // a b c
}
```
&emsp;&emsp;实例六为字符串的遍历演示，还有其他几种数据结构(`Map`，`Set`，`TypedArray`，`arguments`对象，`NodeList`对象)原生部署了`Iterator接口`，可以直接使用`for...of`完成遍历，在此不在提供代码实例，可以自行测试。

&emsp;&emsp;`for..of`不能遍历对象，因为对象默认没有部署`Iterator接口`，没 有默认部署`Iterator接口`原因在于对象属性是无序的，哪个属性先遍历，哪个属性后遍历无法确定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。也可以手动为对象部署`Iterator接口`，看下面的实例七。

```javaScript
// 实例七
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true }
        }
      }
    };
  }
}
for (let item of obj) {
  console.log(item) // hello world
}
```

总结下`for..of`的几个特征：

1. 不仅能遍历数组，同时也能遍历部署了遍历器接口`Iterator接口`的数据结构；
2. 相对比较简洁直接遍历数组的方式；
3. 避开了`for-in`循环的所有缺陷。

## 对象

### Object.keys()
&emsp;&emsp;返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用`for...in`循环遍历该对象时返回的顺序一致。

<span>语法：</span>

```javaScript
Object.keys(obj)
```
> 参数：
>> obj：要返回其枚举自身属性的对象

&emsp;&emsp;返回一个所有元素为字符串的数组，其元素来自于从给定的`object`上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。
```javaScript
// 实例八
let obj = {
  name: 'fe',
  age: 18
}
let result = Object.keys(obj)
console.log(result) // [ 'name', 'age' ]
```
> 注意点：
>> - 在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 `TypeError`。在ES6中，非对象的参数将被强制转换为一个对象。

```javaScript
consoloe.log(Object.keys('foo')) // TypeError: "foo" is not an object (ES5)
consoloe.log(Object.keys('foo')) // ["0", "1", "2"] (ES6)
```
&emsp;&emsp;对象也可以通过和`Object.keys(obj)`搭配，使用`for...of`来遍历普通对象的属性。

```javaScript
// 实例九
let obj = {
  name: 'fe',
  age: 18
}
for(let key of  Object.keys(obj)) {
  console.log(obj[key]) // fe 18
}
```

## 数组

### for循环
&emsp;&emsp;用于创建一个循环，它包含了三个可选的表达式，三个可选的表达式包围在圆括号中并由分号分隔， 后跟一个在循环中执行的语句（通常是一个块语句）。

<span>语法：</span>

```javaScript
for ([initialization]; [condition]; [final-expression]) {
  statement
}
```
> 参数：
>> - initialization：一个表达式 (包含赋值语句) 或者变量声明；<br/>
>> - condition：一个条件表达式被用于确定每一次循环是否能被执行；<br/>
>> - final-expression：每次循环的最后都要执行的表达式；<br/>
>> - statement：只要condition的结果为true就会被执行的语句。<br/>`
```javaScript
// 实例十 
let arr = [1, 2, 3]
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]) // 1 2 3
}
```
&emsp;&emsp;`for循环`为编程语言中最原始的一种遍历方式，涵盖了几乎所有的编程语言，在JavaScript中其只能遍历数组，不能遍历对象。实例十是`for循环`最常规的写法。我们不注意的话，也比较容易带来本可以避免的几个“问题”，我们需要注意：

1. `在for循环`中使用`var`或者未声明的变量，变量作用于全局，会来不必要的麻烦，使用`let`声明变量生成块级作用域，或者形成闭包；
2. 在循环开始以变量的形式缓存下数组长度，可以获得更好的效率，若在循环内部有可能改变数组长度, 请务必慎重处理, 避免数组越界。
```javaScript
// 实例十一
let arr = [1, 2, 3]
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(arr[i]) // 1 2 3
}
```
### forEach
&emsp;&emsp;按升序为数组中含有效值的每一项执行一次`callback` 函数，那些已删除或者未初始化的项将被跳过。

<span>语法：</span>

```javaScript
 array.forEach(function(currentValue, index, arr), thisValue)
```
> 参数：
>> - currentValue(必选)：数组当前项的值<br/>
>> - index(可选)：数组当前项的索引<br/>
>> - arr(可选)：数组对象本身<br/>
>> - thisValue(可选)：当执行回调函数时用作 `this` 的值(参考对象)，默认值为`undefined`<br/>


> 注意点：
>> - 没有办法中止或者跳出`forEach`循环，除了抛出一个异常。
>> - 只能用`return`退出本次回调，进行下一次回调，并总是返回`undefined` 值，即使你`return`了一个值。
>> - `forEach`被调用时，不直接改变调用它的对象，但是对象可能会被`callback` 改变。

常见规则（同样适用于`filter`、`map`方法）：

1. 对于空数组是不会执行回调函数的。
2. 遍历的范围在第一次调用`callback`前就会确定。
3. 为每个数组元素执行`callback`函数。
4. 函数在执行时，原数组中新增加的元素将不会被`callback`访问到。
5. 如果已经存在的值被改变，则传递给`callback`的值是遍历到他们那一刻的值。
6. 被删除的元素将不会被访问到。

```javaScript
// 实例十二
let arr = [1, 2, 3, , 5] // 倒数第二个元素为空，不会遍历
let result = arr.forEach((item, index, array) => {
  arr[0] = '修改元素值'
  console.log(item) // 1 2 3 5
})
console.log(arr) // ["修改元素值", 2, 3, , 5]
```

```javaScript
// 实例十三
let arr = [1, 2, 3, , 5] // 倒数第二个元素为空，不会遍历
let result = arr.forEach((item, index, array) => {
  arr[1] = '修改元素值'
  console.log(item) // 1 修改元素值 3 5
})
console.log(arr) // [1, '修改元素值', 3, , 5]
```
&emsp;&emsp;实例十二和实例十三都对数组元素值做了修改，然而实例十二中`item`值没有变化，实例十三中`item`值变化了，为啥？？？

&emsp;&emsp;实例十二在执行`forEach`时，修改了`arr[0]`的值，数组`arr`的值发生了改变，然后控制台输出`item`的值没有变，原因是仅仅是修改了`arr[0]`的值，`item`的值没有变化，控制台输出的`item`的值依旧还是之前`forEach`保存的`item`的值。

&emsp;&emsp;实例十三在执行`forEach`时，修改了`arr[1]`的值，控制台输出`item`与数组`arr`的值均发生变化，在第一次遍历的时候，数组`arr`的第二个元素值已经变化了，在第二次遍历的时候，`forEach`回调函数的参数值发生了变化，即控制台输出`item`值发生变化。

&emsp;&emsp;如果已经存在的值被改变，则传递给`callback`的值是`forEach`遍历到他们那一刻的值。
```javaScript
// 实例十四
let arr = [1, 2, 3, , 5] // 倒数第二个元素为空，不会遍历
let result = arr.forEach((item, index, array) => {
  arr.push('添加到尾端，不会被遍历') // 调用 forEach 后添加到数组中的项不会被 callback 访问到
  console.log(item) // 1 2 3 5
  return item // return只能结束本次回调 会执行下次回调
  console.log('不会执行，因为return 会执行下一次循环回调')
})
console.log(result) // 即使return了一个值,也还是返回undefined
```

```javaScript
// 实例十五
let arr = [1, 2, 3, , 5] // 倒数第二个元素为空，不会遍历
let result = arr.forEach((item, index, array) => {
  if (item === 2) {
    arr.shift()
  }
  console.log(item) // 1 2 5
})
```
&emsp;&emsp;已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 `shift()`），之后的元素将被跳过。

### filter
&emsp;&emsp;“过滤”，为数组中的每个元素调用一次`callback`函数，并利用所有使得`callback`返回`true`或等价于`true`的值的元素创建一个新数组。

<span>语法：</span>

```javaScript
let newArray = arr.filter(function(currentValue, index, arr), thisValue)
```
> 参数：
>> - currentValue(必选)：数组当前项的值；<br/>
>> - index(可选)：数组当前项的索引；<br/>
>> - arr(可选)：数组对象本身；<br/>
>> - thisValue(可选)：当执行回调函数时用作 `this` 的值(参考对象)，默认值为`undefined`。

> 注意点：
>> - 不修改调用它的原数组本身，当然在`callback`执行时改变原数组另说；
>> - `callback`函数返回值不一定非要是`Boolean`值，只要是弱等于`== true/false`也没问题。

```javaScript
// 实例十六
let arr = [1, 2, 3, , 5] // 倒数第二个元素为空，不会遍历
let result = arr.filter(function(item, index, array) {
  arr.push(6) // 在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到
  arr[1] = 4 // 如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值
  console.log(item) // 1 4 3 5
  return item < 5 // 返回数组arr中小于5的元素
})
console.log(result) // [1, 4, 3]
```
```javaScript
// 实例十七
let arr = [0, 1, 2, 3, 4] 
let result = arr.filter(function(item, index, array) {
  return item // 做类型转换
})
console.log(result) // [1, 2, 3, 4]
```

### map
&emsp;&emsp;创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。其基本用法与`forEach`类似，不同在于map的`callback`需要有`return`值。

<span>语法：</span>

```javaScript
let newArray = arr.map(function(currentValue, index, arr), thisValue)
```
> 参数：
>> - currentValue(必选)：数组当前项的值
>> - index(可选)：数组当前项的索引
>> - arr(可选)：数组对象本身
>> - thisValue(可选)：当执行回调函数时用作`this`的值(参考对象)，默认值为`undefined`

> 注意点：
>> -  不修改调用它的原数组本身，当然在`callback`执行时改变原数组另说。
>> - `callback`函数只会在有值的索引上被调用；那些从来没被赋过值或者使用`delete`删除的索引则不会被调用。

&emsp;&emsp;`map`方法的主要作用其实是对原数组映射产生新数组，看实例十八：

```javaScript
// 实例十八
let arr = [1, 2, 3]
let result = arr.map(function(item, index, array) {
  return item * 2
})
console.log(result) // [2, 4, 6]
console.log(arr) // [1, 2, 3] // 原数组arr没有变
```

### reduce
&emsp;&emsp;对累加器和数组中的每个元素（从左到右）应用一个函数，最终合并为一个值。

<span>语法：</span>

```javaScript
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```
> 参数：
>> - total(必选)：累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
>> - currentValue(必选)：数组中正在处理的元素
>> - currentIndex(可选)：数组中正在处理的当前元素的索引 如果提供了initialValue，则起始索引号为`0`，否则为`1`
>> - arr(可选)：调用`reduce()`的数组
>> - initialValue(可选)：作为第一次调用`callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用`reduce`将报错

> 注意点：
>> - 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。

<p>
回调函数第一次执行时：
</p>

- 如果调用`reduce()`时提供了`initialValue`，`total`取值为`initialValue`，`currentValue`取数组中的第一个值；
- 如果没有提供`initialValue`，那么`total`取数组中的第一个值，`currentValue`取数组中的第二个值；
- 如果数组为空且没有提供`initialValue`，会抛出`TypeError`；
- 如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`， 或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。
```javaScript
// 实例十九
let sum = [1, 2, 3].reduce(function (total, currentValue, currentIndex) {
  return total + currentValue
})
console.log(sum) // 6
```
## 结语
&emsp;&emsp;本文梳理了对象和数组几种比较常用的遍历方式。数组的方法有很多，有部分内容本文没有涉及到，例如`some`，`every`，`reduceRight`，`find`，`findIndex`等方法，感兴趣的同学可以自行了解。<br/>
&emsp;&emsp;笔者现在还是一个前端新人，对遍历的实现方式不太清楚，借此梳理的机会，熟悉相关的实现，文章如有不正确的地方欢迎各位大佬指正，后台留言，也希望有幸看到文章的同学也有收获，一起成长！

——本文首发于个人公众号———
![](xxx)
最后，欢迎大家关注我的公众号，一起学习交流。