//加入监听DOM树，使该脚本能够应对百度网站上的异步加载
// 可以过滤的是谷歌和百度

let getRe;
let googleRe = /www.google.com|www.google.co.jp|www.google.cn|www.google.com.hk/;
let bingRe = /cn.bing.com|www.bing.com/;
let host = window.location.host;

function init() {
    chrome.storage.sync.get('filter', function(data) {
        if (!data.filter) { //如果过滤规则为空，则不过滤
            getRe = '^$';
            var reg = new RegExp(getRe);
        } else {
            getRe = data.filter;
            var reg = new RegExp(getRe);
        }
        MObserver(reg);
        baiduFilter(reg);
        googleFilter(reg);
        bingFilter(reg)
    })
}

init();

function MObserver(reg) {
    var MObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MObserver(function(records) {
        baiduFilter(reg);
        googleFilter(reg);
        bingFilter(reg)
    });

    var option = {
        'childList': true
    };
    observer.observe(document.body, option);
}

function baiduFilter(reg) {
    if (window.location.search !== '' && (host == 'www.baidu.com')) {
        $('.result').each(function(index, item) {
            let showurl = $(item).find('.c-showurl').text()
            if (showurl.length != 0 && reg.test(showurl)) {
               $(item).remove()
            }
        })
    }
}

function googleFilter(reg) {
    if (googleRe.test(host)) {
        $('.g').each(function(index, item) {
            if (reg.test($(item).text())) {
                $(item).remove()
            }
        })
    }
}

function bingFilter(reg) {
    if (bingRe.test(host)) {
        $('.b_algo').each(function (index, item) {
            if (reg.test($(item).text())) {
                $(item).remove()
            }
        })
    }
}
