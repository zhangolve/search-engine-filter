// ==UserScript==
// @name         fuckjb51
// @namespace    https://github.com/zhangolve/fuckjb51
// @version      0.2
// @description  filter something you don't like on baidu
// @author       zhangolve contact   zhangolve@gmail.com
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @match        https://www.baidu.com/*
// @match        https://www.google.co.jp/search?*
// @match        https://www.google.com/*
// @match        https://www.google.com.hk/*
// @grant             GM_setValue
// @grant             GM_getValue
// @grant              GM_deleteValue
// @grant              GM_addStyle
// ==/UserScript==

//加入监听DOM树，使该脚本能够应对百度网站上的异步加载
var re = 'www.open-open.com\/.*?';
var googleRe=/www.google.com|www.google.co.jp|www.google.cn|www.google.com.hk/;
var getRe = GM_getValue('re', re);
var reg = new RegExp(getRe);
var host=window.location.host;
var MObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var observer = new MObserver(function(records){
    baiduFilter();
    googleFilter();
    addStyle();
});

var option = {
    'childList': true,
};

observer.observe(document.body, option);

//block函数用来进行屏蔽
function baiduFilter() {
    
    //当在search页面上时才进行加载脚本，防止在其他百度页面出现问题  
    if (window.location.search !== ''&&(host=='www.baidu.com')) {
        var items = [];
        var urls = [];
        for (var i = 1; i < 11; i++) {
            items.push(document.getElementById(i));
            var showurl = items[i - 1].getElementsByClassName('c-showurl');
            
            if (showurl.length !== 0) {
                urls.push(items[i - 1].getElementsByClassName('c-showurl')[0].innerHTML);
                if (reg.test(urls[i - 1])) {
                    console.log(urls[i-1]);  
                    items[i - 1].remove();
                }
            }
        }

        //添加一个自定义屏蔽网站添加栏，用于添加自定义的屏蔽网站
        var button = document.getElementById('su');
        var s_tab = document.getElementById('s_tab');
        if(document.getElementById('inputFilter')===null) {
            var inputFilter = document.createElement('input');
            inputFilter.setAttribute('id', 'inputFilter');
            inputFilter.setAttribute('placeholder', '过滤域名');
            var filterButton = document.createElement('input');
            filterButton.setAttribute('type', 'submit');
            filterButton.setAttribute('value', '过滤');
            filterButton.setAttribute('id', 'filter');
            s_tab.appendChild(inputFilter);
            s_tab.appendChild(filterButton);
            document.getElementById('filter').addEventListener('click', filter);
        }
    }
}


function googleFilter(){
   
    if( googleRe.test(host)) {
        console.log('1');
        var queryList=document.getElementsByClassName('g');
        var queryNum=queryList.length;
        for(var i=0;i<queryNum;i++) {
            let item=queryList[i];
            var node=item.getElementsByClassName('_Rm');
            if(node.length!==0) {
                var url=node[0].innerHTML;
                  
                if(reg.test(url)) {
                    item.remove();
                }
            }
        } 
    }
}     


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

function addStyle(){
    GM_addStyle('#inputFilter {width: 140px;height:25px;font-size:14px} #filter{width:40px;height:25px;color:red} ');
}

