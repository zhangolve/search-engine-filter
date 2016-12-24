//加入监听DOM树，使该脚本能够应对百度网站上的异步加载
let re;
if (localStorage.getItem('filter') === null) {
    re = 'www.jb51.net\/.*?';
} else {
    re = localStorage.getItem('filter');
}
var googleRe = /www.google.com|www.google.co.jp|www.google.cn|www.google.com.hk/;
//var getRe = GM_getValue('re', re);
localStorage.setItem('filter', re);
var getRe = localStorage.getItem('filter');
var reg = new RegExp(getRe);
var host = window.location.host;
var MObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var observer = new MObserver(function(records) {
    baiduFilter();
    googleFilter();

});
var option = {
    'childList': true,

};
observer.observe(document.body, option);

//block函数用来进行屏蔽
function baiduFilter() {

    //当在search页面上时才进行加载脚本，防止在其他百度页面出现问题  
    if (window.location.search !== '' && (host == 'www.baidu.com')) {
        var items = [];
        var urls = [];
        for (var i = 1; i < 11; i++) {
            items.push(document.getElementById(i));
            var showurl = items[i - 1].getElementsByClassName('c-showurl');

            if (showurl.length !== 0) {
                urls.push(items[i - 1].getElementsByClassName('c-showurl')[0].innerHTML);
                if (reg.test(urls[i - 1])) {
                    console.log(urls[i - 1]);
                    items[i - 1].remove();
                }
            }
        }



        //添加一个自定义屏蔽网站添加栏，用于添加自定义的屏蔽网站

        var button = document.getElementById('su');
        var s_tab = document.getElementById('s_tab');
        inputFilter(s_tab);

    }
}

function googleFilter() {

    if (googleRe.test(host)) {
        var queryList = document.getElementsByClassName('g');
        var queryNum = queryList.length;
        for (var i = 0; i < queryNum; i++) {
            let item = queryList[i];
            var node = item.getElementsByClassName('_Rm');
            if (node.length !== 0) {
                var url = node[0].innerHTML;

                if (reg.test(url)) {
                    item.remove();
                }
            }
        }
        var tab=document.getElementById('hdtb-msb');
        inputFilter(tab);
    }
}


function filter() {
    var inputFilter = document.getElementById('inputFilter');
    if (inputFilter.value !== '') {
        getRe = localStorage.getItem('filter');
        getRe = getRe + '|' + inputFilter.value + '\/.*?';
        //GM_setValue('re', getRe);
        localStorage.setItem('filter', getRe);
        alert('已添加过滤地址');
        window.location.reload(true);
    } else {
        alert('请输入需要过滤的域名');
    }
}

function inputFilter(tab) {
    if (document.getElementById('inputFilter') === null) {
        var inputFilter = document.createElement('input');
        inputFilter.setAttribute('id', 'inputFilter');
        inputFilter.setAttribute('class','hdtb-dd-b');
        
        inputFilter.setAttribute('placeholder', '过滤域名');
        var filterButton = document.createElement('input');
        filterButton.setAttribute('type', 'submit');
        filterButton.setAttribute('value', '过滤');
        filterButton.setAttribute('id', 'filter');
        tab.appendChild(inputFilter);
        tab.appendChild(filterButton);
        document.getElementById('filter').addEventListener('click', filter);
    }
}
