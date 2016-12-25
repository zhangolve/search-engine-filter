var submit=document.getElementById('submit');
submit.addEventListener('click', filter);

function filter() {
    var inputFilter = document.getElementById('inputFilter');
    if (inputFilter.value !== '') {
        chrome.storage.sync.get('filter', function(data) {
            getRe = getRe + '|' + inputFilter.value + '\/.*?';
            chrome.storage.sync.set({ 'filter': getRe });
            alert('已添加过滤地址');
            window.location.reload(true);
        });

    } else {
        alert('请输入需要过滤的域名');
    }
}
