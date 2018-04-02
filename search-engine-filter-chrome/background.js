

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   url=request.filter;
    chrome.downloads.download({
                url: url,
                filename: 'filterRules.json'
            });
  });

