
getReceiptDetails();
function getReceiptDetails() {
    var ReceiptId = document.getElementById("ReceiptId").value;
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", window.ROOT + "/api/ReceiptsApi/" + ReceiptId, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText) { // the onreadystatechange executes multiple times, so this check is required
                var Receipt = JSON.parse(xmlhttp.responseText);
                
                var ReceiptHtml = "<tr><td>Transaction ID</td><td>" + Receipt.TransactionId + "</td></tr>";
                ReceiptHtml += "<tr><td>Message</td><td>" + Receipt.Message + "</td></tr>";
                ReceiptHtml += "<tr><td>Amount</td><td>" + Receipt.PayedAmount + "</td></tr>";

                document.getElementById("receipt").innerHTML = ReceiptHtml;

                /*
                console.log(product);
                if (typeof pid != "undefined") {
                    PopulateShoppingCartView(product, refreshCart, cartItem);
                    return;
                }

                ProductGlobal.ProductId = product.ProductId;
                ProductGlobal.Name = product.Name;
                ProductGlobal.Price = product.Price;
                ProductGlobal.Color = product.Color;

                document.getElementById("product-title").innerHTML = product.Name;
                document.getElementById("discounted-price").innerHTML = "$" + product.Price;
                document.getElementById("product-color").innerHTML = "Color: " + product.Color;
                */
            }
        }
    }
}