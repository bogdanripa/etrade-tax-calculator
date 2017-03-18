var s1 = document.createElement('script'); s1.src = chrome.extension.getURL('adbe.js');
(document.head||document.documentElement).appendChild(s1); s1.onload = function() {
    s1.parentNode.removeChild(s1);
};


var s2 = document.createElement('script'); s2.src = chrome.extension.getURL('calculate.js');
(document.head||document.documentElement).appendChild(s2); s2.onload = function() {
    s2.parentNode.removeChild(s2);
};


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "initRomaniaTaxes") {
        document.dispatchEvent(new CustomEvent('initRomaniaTaxes', {
	        detail: {
		        something: '123'
	        }
        }));
	}
});
