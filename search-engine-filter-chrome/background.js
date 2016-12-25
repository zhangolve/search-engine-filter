

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   
   alert(request.filter);
   url=request.filter;
    chrome.downloads.download({
                url: url,
                filename: 'filename_of_exported_file.json'
            });
  });