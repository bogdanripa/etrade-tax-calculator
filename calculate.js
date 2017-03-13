var updateDates2 = function() {
    
    var scope = angular.element($('.ordersGrantTbl')).scope()
    var settled = scope.oh.openOrder.filter(function(e){return e.orderStatus == "Settled"})

	var totalProfits = 0;

	// for each row
	for (var i=0;i<settled.length; i++) {
        var order = settled[i]
		var lineComission = 0;
		var stockPrice = 0;
		var RSU = true;

		// get the selling proce per share for the table
		var sellingPricePerShare = order.executedPrice

		var lineGrossRevenue = 0;
		var lineProfit = 0;

		// if selling ESPP
		if (order.plantype == 'ESPP') {
			RSU = false;
		}

		// calculate the line-level lineComission
		lineComission = order.disbursementDetails[0].commission+
                        order.disbursementDetails[0].disbursementFee+
                        order.disbursementDetails[0].brokerageAssistFee+
                        order.disbursementDetails[0].secFee;

        console.log("---------------------",order.soldQty,"*",order.executedPrice)

		// for all grants in this transaction
		for (var grant of order.purchaseGrantDetails) {

			var sharesCount = grant.sharesSellSold

			lineGrossRevenue += sellingPricePerShare * sharesCount;

			var date = grant.vestDate;
            var stockPrice = 0;

			var dateObj = new Date(date);

			if (RSU || (!RSU && (dateObj <= new Date('12/31/2011') || dateObj >= new Date('12/31/2013')))) {
				// if RSU or ESPP, but before 2012 or after 2013
				// use the market value
                
                while(stockPrice == 0){
				    stockPrice = adobeStockValues[date] || 0;
                    console.debug("\t\t go back 1 day and get close price", date, stockPrice)
                    // go back 1 day nasdaq was closed  
                    var dateMinus1 = new Date(dateObj.getTime()-24*60*60*1000)
                    var d=dateMinus1.toISOString().split("T")[0].split('-')
                    date = d[1]+"/"+d[2]+"/"+d[0]
                }
			} else {
				// if ESPP between and taxes were not paid on the diff
				// use the grant purchase value
				stockPrice = grant.purchasePrice;
			}

			lineProfit += stockPrice * sharesCount;
		}
        console.info("profit ",lineGrossRevenue-lineProfit-lineComission," => ",lineGrossRevenue,"-",lineProfit,"-",lineComission )
		
	}

	totalProfits = parseInt(totalProfits*100)/100;
    console.info("total profit ", totalProfits)

}

var initRomaniaTaxes = function() {
    updateDates2()
}


document.addEventListener('initRomaniaTaxes', function(e) {
    initRomaniaTaxes()
});

console.info(">>", angular);
