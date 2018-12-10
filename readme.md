# 功能

- 可以通过往输入框中添加过滤网站，形式如 www.jb51.net ,www.abc.com 等，无须使用http:// 作为开头。也可以过滤掉特定的内容来源，比如百度文库(wenku.baidu.com )

# screenshot
![popup](https://static.ooops.me/md-upload-1544087896481.png)


![options](https://static.ooops.me/md-upload-1544087979623.png)

# 安装

安装方法

## 油猴脚本安装

这是油猴脚本，所以请首先安装 tempermonkey

Firefox 用户请戳 https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
chrome 用户请戳 https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en

然后安装： https://greasyfork.org/zh-CN/scripts/25788-search-engine-filter

## chrome 扩展安装

Chrome应用商店下载地址： 
https://chrome.google.com/webstore/detail/search-engine-filter/clkhhmchimakdcfbdohhnkjlljkimmgi/related?hl=zh-CN

# 使用方法

## 添加过滤规则

安装好后，在打开百度搜索或谷歌搜索，进入搜索页面后会自行根据过滤规则进行过滤，~~默认的过滤规则是过滤掉来自www.jb51.net ，也就是垃圾脚本之家的内容。~~ 用户可以通过在输入框中输入自定义的过滤规则，将自己讨厌的不想看到的搜索内容过滤掉。

具体的使用方法，请看GIF。图示为百度搜索时的使用方法，谷歌搜索类似。

![](http://7ktu2f.com1.z0.glb.clouddn.com/search-engine-filter.gif)

## 删除过滤规则

如果是Chrome 扩展的话，右键点击地址栏上本扩展图标，选择options,打开options页面，对过滤规则进行增删操作。

# 其他须知

由于油猴脚本与Chrome扩展的实现方式不同，Chrome扩展目前做到的是将过滤规则存放到站点的localStorage当中，这导致谷歌和百度的屏蔽规则并不相同，也让用户可以根据自己使用谷歌和百度的情况自定义搜索规则。

而使用油猴脚本，则是无论你是在谷歌搜索页还是百度搜索页添加的过滤规则，都将同时作用于这些搜索引擎。

# Github

https://github.com/zhangolve/search-engine-filter  

喜欢的可以给个star,目前油猴脚本功能上已经稳定了，Chrome 扩展还有很大待开发余地。

# Contributors

- [zhangolve ](https://github.com/zhangolve)
- [kosmgco](https://github.com/kosmgco)


# 题外话

## 为什么会开发这个脚本（扩展）

之所以会写这个脚本，最早来源于我讨厌在百度搜索页面出现的脚本之家的内容，该网站排版差，内容质量差，却依靠着SEO 和不为人知的套路，总是能够占据技术类搜索词汇首页的位置，每次通过百度点开这个网站都让我后悔不已，浪费了我的时间。这个时候，你可能就会问了，你为啥不用谷歌呢，我想说在大多数的技术问题搜索上，谷歌当然是很牛的，但是有些情况下，百度也有他的优势。举例来说，有些时候，我只是想搜索一个英文单词，看看他的汉语意思，点击一个网页去看更相信的相关内容。我并不需要使用谷歌。因此，我就动了想要写一个在百度搜索页面过滤来自脚本之家网站内容脚本的念头。后来，做了这个简单的功能之后，给它起了一个简单粗暴的名字,fuckjb51 。

之后，又陆续给这个脚本添加了几个小功能，比如能够添加自定义的过滤url，搜索引擎也不再只限制在百度这一个上了，而是拓展到了包括谷歌原站，谷歌日本，谷歌香港等站点，原来的项目名，fuckjb51也就不再适合了，因此改成了现在的名字search-engine-filter（搜索引擎页面内容过滤）

后来，我又想到其实可以做一个 Chrome 扩展，毕竟在百度搜索页展示一个多余的输入框和醒目的按钮并不是很好的设计。而 Chrome 扩展也能方便使用Chrome 的人群。在v1.0.1版本中，仍然采用在搜索结果页面中添加输入框和提交按钮的方式来交互，后期可能会对这一交互方式进行更改。
