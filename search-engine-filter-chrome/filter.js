//加入监听DOM树，使该脚本能够应对百度网站上的异步加载
// 可以过滤的是谷歌和百度

let getRe;
let googleRe = /www.google.com|www.google.co.jp|www.google.cn|www.google.com.hk/;
let host = window.location.host;

function init() {
    chrome.storage.sync.get('filter', function(data) {
        if (!data.filter) //如果过滤规则为空，则使用默认的过滤规则
        {   
            chrome.storage.sync.set({'filter':'www.jb51.net\/.*?|www.wuji8.com\/.*?'});
            getRe = 'www.jb51.net\/.*?|www.wuji8.com\/.*?';
            var reg = new RegExp(getRe);
            MObserver(reg);
            baiduFilter(reg);
            googleFilter(reg);
        } else {
            getRe = data.filter;
            var reg = new RegExp(getRe);
            MObserver(reg);
            baiduFilter(reg);
            googleFilter(reg);
        }
    })
}

init();

function MObserver(reg) {
    var MObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var observer = new MObserver(function(records) {
        baiduFilter(reg);
        googleFilter(reg);
    });


    var option = {
        'childList': true
    };
    observer.observe(document.body, option);
}

//block函数用来进行屏蔽
function baiduFilter(reg) {
    if (window.location.search !== '' && (host == 'www.baidu.com')) {
        var items = [];
        var urls = [];
        for (var i = 1; i < 11; i++) {
            items.push(document.getElementById(i));
            var showurl = items[i - 1].getElementsByClassName('c-showurl');

            if (showurl.length !== 0) {
                urls.push(items[i - 1].getElementsByClassName('c-showurl')[0].innerHTML);
                if (reg.test(urls[i - 1])) {
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

function googleFilter(reg) {
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
        var tab = document.getElementById('hdtb-msb');
        inputFilter(tab);
    }
}


function filterHandler() {
    var inputFilter = document.getElementById('inputFilter');
    if (inputFilter.value !== '') {
        chrome.storage.sync.get('filter', function(data) {
            getRe = data.filter + '|' + inputFilter.value + '\/.*?';
            chrome.storage.sync.set({ 'filter': getRe });
            alert('已添加过滤地址');
            window.location.reload(true);
        });
    } else {
        alert('请输入需要过滤的域名');
    }
}

function inputFilter(tab) {
    if (document.getElementById('inputFilter') === null) {
        var inputFilter = document.createElement('input');
        inputFilter.setAttribute('id', 'inputFilter');
        inputFilter.setAttribute('class', 'hdtb-dd-b');
        inputFilter.setAttribute('placeholder', '过滤域名');
        var filterButton = document.createElement('input');
        filterButton.setAttribute('type', 'submit');
        filterButton.setAttribute('value', '过滤');
        filterButton.setAttribute('id', 'filter');
        tab.appendChild(inputFilter);
        tab.appendChild(filterButton);
        document.getElementById('filter').addEventListener('click', filterHandler);
        //创建一个输入按钮
        var exportBtn = document.createElement('button');
        exportBtn.innerHTML = "导出";
        exportBtn.addEventListener('click', exportFile);
        tab.appendChild(exportBtn);
    }
}

//不能直接使用export 关键字
var exportFile =
    function a() {
        chrome.storage.sync.get('filter', function(data) {
            var result = JSON.stringify(data);
            var url = 'data:application/json;base64,' + btoa(result);
            chrome.runtime.sendMessage({'filter': url}, function(response) {
            });
        });
    };
