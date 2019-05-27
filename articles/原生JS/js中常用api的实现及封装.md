##new的实现
<p>
通过new操作符生成的对象（实例对象），构造函数的this指向实例函数。
</p>

```
function Demo() {
  this.name = 'new'
}
let demo = new Demo()
console.log(demo.name) // new
```

<p>
new的实现过程：
</p>

```
function newFn() {
  // 创建一个新的对象
  let obj = {}
  let constructor = [...arguments].shift()
  // 将obj的原型指向构造函数，此时obj可以访问构造函数原型中的属性
  obj.__proto__ = constructor.prototype
  // 改变构造函数的this的指向，使其指向obj， 此时obj也可以访问构造函数中的属性了
  let result = constructor.apply(obj, [...arguments].slice(1))
  return typeof result === 'object' : result: obj
 }
```

<p>
如果不打算让new后面的函数作为构造器，只是作为函数使用，可以通过下面的操作来实现一些特殊的效果
</p>

```
function Demo() {
  this.name = 'new'
  console.log(this) // Demo { name: 'new' } this的指向不会发生变化
  return {}
}
let demo = new Demo()
console.log(demo.name) // undefined
```
