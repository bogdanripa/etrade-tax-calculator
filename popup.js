function run() {
   chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {action: "initRomaniaTaxes"}, function(response) {
       alert(response.message);
    });
   });
}

// document.addEventListener('DOMContentLoaded', function () {
// 	alert(2);
//       document.querySelector('button').addEventListener('click', run);      
// });

run();