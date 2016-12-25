# 正则表达式匹配问题

在创建正则表达式对象时如果使用了“g”标识符或者设置它了的﻿global属性值为ture时，那么新创建的正则表达式对象将使用模式对要将要匹配的字符串进行全局匹配。在全局匹配模式下可以对指定要查找的字符串执行多次匹配。每次匹配使用当前正则对象的lastIndex属性的值作为在目标字符串中开始查找的起始位置。lastIndex属性的初始值为0，找到匹配的项后lastIndex的值被重置为匹配内容的下一个字符在字符串中的位置索引，用来标识下次执行匹配时开始查找的位置。如果找不到匹配的项lastIndex的值会被设置为0。当没有设置正则对象的全局匹配标志时lastIndex属性的值始终为0，每次执行匹配仅查找字符串中第一个匹配的项。可以通下面的代码来查看在执行匹配相应的lastIndex 属性的值。

        var str = "123#abc";
        var re = /abc/ig;
        console.log(re.test(str)); //输出ture
        console.log(re.lastIndex); //输出7
        console.log(re.test(str)); //输出false
        console.log(re.lastIndex); //输出0
        console.log(re.test(str)); //输出ture
        console.log(re.lastIndex); //输出7
        console.log(re.test(str)); //输出false
        console.log(re.lastIndex); //输出0



# 遇到的问题

![](http://7ktu2f.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20161207160257.png)

审查元素发现有些div中没有 ```c-showurl``` 这个类的，但是又一个  ```g``` 类，因此需要对这个类进行处理。

![](http://7ktu2f.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20161207212929.png)

由于是对innerHTML进行正则判断，因此偶尔会出现这种问题，待解决。

# Mutation 


Observer（变动观察器）是监视DOM变动的接口。当DOM对象树发生任何变动时，Mutation Observer会得到通知。

要概念上，它很接近事件。可以理解为，当DOM发生变动会触发Mutation Observer事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说DOM发生变动立刻会触发相应的事件；Mutation Observer则是异步触发，DOM发生变动以后，并不会马上触发，而是要等到当前所有DOM操作都结束后才触发。

这样设计是为了应付DOM变动频繁的情况。举例来说，如果在文档中连续插入1000个段落（p元素），会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而Mutation Observer完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次。

# git 切换远程

git 无法对github仓库进行clone push 等常规操作

设置git 代理，前提是有代理，能够进行科学上网。


    git config --global http.proxy sock5://127.0.0.1:1080 


查看

    git remote -v

查看remote的状态

切换使用 
        
        git set-url http://github.com/zhangolve/example

