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



