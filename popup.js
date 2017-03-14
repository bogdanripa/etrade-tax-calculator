function compute_taxes() {
   chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {action: "initRomaniaTaxes"}, function(response) {
       alert(response.message);
    });
   });
}

function go_to_orders() {
   chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: "https://us.etrade.com/etx/sp/stockplan/#/myAccount/orders?ploc=c-newnav-acct-etcs"});
   });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('go-to-orders').addEventListener('click', go_to_orders);      
    document.getElementById('compute-taxes').addEventListener('click', compute_taxes);      
});

