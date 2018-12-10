chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        url=request.filter;
        timestamp = Math.round(new Date().getTime()/1000)
        chrome.downloads.download({
             url: url,
             filename: 'filterRules_' + timestamp + '.json'
        });
    }
);
