document.onkeydown = function (e) {
    if (e.keyCode == 13) {
        filterHandler()
    }
}

var submit = document.getElementById('submit');
submit.addEventListener('click', filterHandler);

function filterHandler() {
    var inputFilter = document.getElementById('inputFilter');
    if (inputFilter.value !== '') {
        chrome.storage.sync.get('filter', function(data) {
            if (data.filter) {
                if (!isStringInArray(inputFilter.value, data.filter.split('|'))) {
                    var getRe = data.filter + "|" + inputFilter.value + "\/{0,}.*?";
                }
            } else {
                var getRe = inputFilter.value + "\/{0,}.*?"
            }
            chrome.storage.sync.set({ 'filter': getRe });
            console.log(0)
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                var activeTab = tabs[0];
                console.log('1')
                chrome.tabs.sendMessage(activeTab.id, {"message": "updated"});
            });
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


if (/options/.test(window.location.href)) {
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

    $('#exportRules').on('click', function(){
        chrome.storage.sync.get('filter', function (data) {
            var result = {'filters': []}
            data.filter.split('|').forEach(function(item) {
                result.filters.push(item.replace('/{0,}.*?', ''))
            })
            result = JSON.stringify(result)
            var url = 'data:application/json;base64,' + btoa(result);
                
            chrome.runtime.sendMessage({'filter': url}, function(response) {
                console.log(response)
            });
        })
    })
}
