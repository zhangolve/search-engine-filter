// ==UserScript==
// @name         搜索引擎结果过滤器
// @namespace    https://github.com/zhangolve/search-engine-filter
// @version      0.2
// @description  filter something you don't like on some search engine like google or baidu
// @author       zhangolve@gmail.com
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @match        https://www.baidu.com/*
// @match        https://www.google.co.jp/search?*
// @match        https://www.google.com/*
// @match        https://www.google.com.hk/*
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_deleteValue
// @grant             GM_addStyle
// ==/UserScript==

// 加入监听DOM树，使该脚本能够应对百度网站上的异步加载
var re = 'www.open-open.com\/.*?';
var googleRe = /www.google.com|www.google.co.jp|www.google.cn|www.google.com.hk/;
var getRe = GM_getValue('re', re);
var reg = new RegExp(getRe);
var host = window.location.host;

function filter() {
  var inputFilter = document.getElementById('inputFilter');
  if (inputFilter.value !== '') {
    getRe = getRe + '|' + inputFilter.value + '\/.*?';
    GM_setValue('re', getRe);
    alert('已添加过滤地址');
    window.location.reload(true);
  } else {
    alert('请输入需要过滤的域名');
  }
}

function addStyle() {
  GM_addStyle('#inputFilter {width: 140px;height:25px;font-size:14px} #filter{width:40px;height:25px;color:red} ');
}

function baiduFilter() {
  // 当在search页面上时才进行加载脚本，防止在其他百度页面出现问题
  if (window.location.search !== '' && (host === 'www.baidu.com')) {
    $('.result').each(function(index, item) {
        if (reg.test($(item).text())) {
            $(item).remove()
        }
    })

    // 屏蔽右侧广告
    $('#content_right').remove();
    // 添加一个自定义屏蔽网站添加栏，用于添加自定义的屏蔽网站
    var sTab = document.querySelector('.s_tab_inner');
    if (document.getElementById('inputFilter') === null) {
      sTab.style.display = 'inline-block';
      var inputFilter = document.createElement('input');
      inputFilter.setAttribute('id', 'inputFilter');
      inputFilter.setAttribute('placeholder', '过滤域名');
      var filterButton = document.createElement('input');
      filterButton.setAttribute('type', 'submit');
      filterButton.setAttribute('value', '过滤');
      filterButton.setAttribute('id', 'filter');
      sTab.appendChild(inputFilter);
      sTab.appendChild(filterButton);
      document.getElementById('filter').addEventListener('click', filter);
    }
  }
}


function googleFilter() {
  if (googleRe.test(host)) {
    var queryList = document.getElementsByClassName('g');
    var queryNum = queryList.length;
    for (var i = 0; i < queryNum; i++) {
      var item = queryList[i];
      var node = item.getElementsByClassName('_Rm');
      if (node.length !== 0) {
        var url = node[0].innerHTML;
        if (reg.test(url)) {
          item.remove();
        }
      }
    }
  }
}

var MObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


// mutationobserver-shim v0.3.2 (github.com/megawac/MutationObserver.js)
// Authors: Graeme Yeates (github.com/megawac)
if(!MObserver) {
  window.MutationObserver=window.MutationObserver||function(w){function v(a){this.i=[];this.m=a}function I(a){(function c(){var d=a.takeRecords();d.length&&a.m(d,a);a.h=setTimeout(c,v._period)})()}function p(a){var b={type:null,target:null,addedNodes:[],removedNodes:[],previousSibling:null,nextSibling:null,attributeName:null,attributeNamespace:null,oldValue:null},c;for(c in a)b[c]!==w&&a[c]!==w&&(b[c]=a[c]);return b}function J(a,b){var c=C(a,b);return function(d){var f=d.length,n;b.a&&3===a.nodeType&&
  a.nodeValue!==c.a&&d.push(new p({type:"characterData",target:a,oldValue:c.a}));b.b&&c.b&&A(d,a,c.b,b.f);if(b.c||b.g)n=K(d,a,c,b);if(n||d.length!==f)c=C(a,b)}}function L(a,b){return b.value}function M(a,b){return"style"!==b.name?b.value:a.style.cssText}function A(a,b,c,d){for(var f={},n=b.attributes,k,g,x=n.length;x--;)k=n[x],g=k.name,d&&d[g]===w||(D(b,k)!==c[g]&&a.push(p({type:"attributes",target:b,attributeName:g,oldValue:c[g],attributeNamespace:k.namespaceURI})),f[g]=!0);for(g in c)f[g]||a.push(p({target:b,
  type:"attributes",attributeName:g,oldValue:c[g]}))}function K(a,b,c,d){function f(b,c,f,k,y){var g=b.length-1;y=-~((g-y)/2);for(var h,l,e;e=b.pop();)h=f[e.j],l=k[e.l],d.c&&y&&Math.abs(e.j-e.l)>=g&&(a.push(p({type:"childList",target:c,addedNodes:[h],removedNodes:[h],nextSibling:h.nextSibling,previousSibling:h.previousSibling})),y--),d.b&&l.b&&A(a,h,l.b,d.f),d.a&&3===h.nodeType&&h.nodeValue!==l.a&&a.push(p({type:"characterData",target:h,oldValue:l.a})),d.g&&n(h,l)}function n(b,c){for(var g=b.childNodes,
  q=c.c,x=g.length,v=q?q.length:0,h,l,e,m,t,z=0,u=0,r=0;u<x||r<v;)m=g[u],t=(e=q[r])&&e.node,m===t?(d.b&&e.b&&A(a,m,e.b,d.f),d.a&&e.a!==w&&m.nodeValue!==e.a&&a.push(p({type:"characterData",target:m,oldValue:e.a})),l&&f(l,b,g,q,z),d.g&&(m.childNodes.length||e.c&&e.c.length)&&n(m,e),u++,r++):(k=!0,h||(h={},l=[]),m&&(h[e=E(m)]||(h[e]=!0,-1===(e=F(q,m,r,"node"))?d.c&&(a.push(p({type:"childList",target:b,addedNodes:[m],nextSibling:m.nextSibling,previousSibling:m.previousSibling})),z++):l.push({j:u,l:e})),
  u++),t&&t!==g[u]&&(h[e=E(t)]||(h[e]=!0,-1===(e=F(g,t,u))?d.c&&(a.push(p({type:"childList",target:c.node,removedNodes:[t],nextSibling:q[r+1],previousSibling:q[r-1]})),z--):l.push({j:e,l:r})),r++));l&&f(l,b,g,q,z)}var k;n(b,c);return k}function C(a,b){var c=!0;return function f(a){var k={node:a};!b.a||3!==a.nodeType&&8!==a.nodeType?(b.b&&c&&1===a.nodeType&&(k.b=G(a.attributes,function(c,f){if(!b.f||b.f[f.name])c[f.name]=D(a,f);return c})),c&&(b.c||b.a||b.b&&b.g)&&(k.c=N(a.childNodes,f)),c=b.g):k.a=
  a.nodeValue;return k}(a)}function E(a){try{return a.id||(a.mo_id=a.mo_id||H++)}catch(b){try{return a.nodeValue}catch(c){return H++}}}function N(a,b){for(var c=[],d=0;d<a.length;d++)c[d]=b(a[d],d,a);return c}function G(a,b){for(var c={},d=0;d<a.length;d++)c=b(c,a[d],d,a);return c}function F(a,b,c,d){for(;c<a.length;c++)if((d?a[c][d]:a[c])===b)return c;return-1}v._period=30;v.prototype={observe:function(a,b){for(var c={b:!!(b.attributes||b.attributeFilter||b.attributeOldValue),c:!!b.childList,g:!!b.subtree,
  a:!(!b.characterData&&!b.characterDataOldValue)},d=this.i,f=0;f<d.length;f++)d[f].s===a&&d.splice(f,1);b.attributeFilter&&(c.f=G(b.attributeFilter,function(a,b){a[b]=!0;return a}));d.push({s:a,o:J(a,c)});this.h||I(this)},takeRecords:function(){for(var a=[],b=this.i,c=0;c<b.length;c++)b[c].o(a);return a},disconnect:function(){this.i=[];clearTimeout(this.h);this.h=null}};var B=document.createElement("i");B.style.top=0;var D=(B="null"!=B.attributes.style.value)?L:M,H=1;return v}(void 0);
  MObserver = MutationObserver;  
}
  var observer = new MObserver(function () {
  baiduFilter();
  googleFilter();
  addStyle();
});

var option = {
  childList: true
};

observer.observe(document.body, option);
