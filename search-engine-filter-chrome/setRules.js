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
            console.log(data.filter)
            if (data.filter) {
                var getRe = data.filter + "|" + inputFilter.value + "\/.*?";
            } else {
                var getRe = inputFilter.value + "\/.*?"
            }
            chrome.storage.sync.set({ 'filter': getRe });
            window.location.reload(true);
        });
    } else {
        alert('请输入需要过滤的域名');
    }
};


var listFilter = function () {
    chrome.storage.sync.get('filter', function (data) {
        let rs = data.filter.split('|')
        var index = 0
        rs.forEach(function(item) {
            $('#rules tbody').append('<tr><td> ' + item.replace('/.*?', '') + '</td><td><button class="deleteRules" data="' + index + '" >删除</button></td> </tr>')
            index += 1
        })
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
