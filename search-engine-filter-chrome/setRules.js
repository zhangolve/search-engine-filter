// 添加过滤规则
var setInitialFilter = function() {
    chrome.storage.sync.get('filter', function(data) {
        var filter = data.filter;
        console.log(data.filter)
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
            if (data.filter) {
                if (!isStringInArray(inputFilter.value, data.filter.split('|'))) {
                    var getRe = data.filter + "|" + inputFilter.value + "\/{0,}.*?";
                }
            } else {
                var getRe = inputFilter.value + "\/{0,}.*?"
            }
            chrome.storage.sync.set({ 'filter': getRe });
            window.location.reload(true);
        });
    } else {
        alert('请输入需要过滤的域名');
    }
};


var isStringInArray = function (s, arr) {
    var s = new RegExp(s)
    var flag = false
    arr.forEach(function(item) {
        if (s.test(item)) {
            flag = true
        }
    })
    return flag
}


var listFilter = function () {
    chrome.storage.sync.get('filter', function (data) {
        if (data.filter.length > 0) { 
            let rs = data.filter.trim().split('|')
            var index = 0
            rs.forEach(function(item) {
                $('#rules tbody').append('<tr><td> ' + item.replace('/{0,}.*?', '') + '</td><td><button class="deleteRules" data="' + index + '" >删除</button></td> </tr>')
                index += 1
            })
        }
    })
}


$(document).on('click', '.deleteRules', function() {
    var index = $(this).attr('data')
    chrome.storage.sync.get('filter', function(data) {
        let rs = data.filter.split('|')
        rs.splice(index, 1)
        chrome.storage.sync.set({'filter': rs.join('|')})
    })
    window.location.reload(true)
})

listFilter()
