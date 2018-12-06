// 添加过滤规则
var setInitialFilter = function() {
    chrome.storage.sync.get('filter', function(data) {
        var filter = data.filter;
        if(!filter) {
            chrome.storage.sync.set({'filter':'www.jb51.net\/.*?|www.wuji8.com\/.*?'});
        }
    })    
};

setInitialFilter();

var submit = document.getElementById('submit');
submit.addEventListener('click', filterHandler);

function filterHandler() {
    var inputFilter = document.getElementById('inputFilter');
    if (inputFilter.value !== '') {
        // 需要增加网址的正则判断
        chrome.storage.sync.get('filter', function(data) {
            var getRe = data.filter + "|" + inputFilter.value + "\/.*?";
            chrome.storage.sync.set({ 'filter': getRe });
            alert('已添加过滤地址');
            window.location.reload(true);
        });
    } else {
        alert('请输入需要过滤的域名');
    }
};

