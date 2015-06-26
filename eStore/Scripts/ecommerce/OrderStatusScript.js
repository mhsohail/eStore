
var xmlhttp0;
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp0 = new XMLHttpRequest();
}
else {// code for IE6, IE5
    xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
}

if (document.getElementById("UserId").value == null || document.getElementById("UserId").value == "") {
    alert("You must log in to see orders");
} else {
    xmlhttp0.open("GET", window.ROOT + "/api/OrdersApi?UserId=" + document.getElementById("UserId").value, true);
    xmlhttp0.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xmlhttp0.send();

    xmlhttp0.onreadystatechange = function () {
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required

                var orders = JSON.parse(xmlhttp0.responseText);

                for (var i = 0; i < orders.length; i++) {

                    var Tr = document.createElement("TR");

                    var TdOrderId = document.createElement("TD");
                    TdOrderId.innerHTML = orders[i].OrderId;
                    TdOrderId.style.padding = "5px";
                    Tr.appendChild(TdOrderId);

                    var TdReceiptId = document.createElement("TD");
                    var a = document.createElement("A");
                    a.href = "/Receipts/Details/" + orders[i].OrderId;
                    a.innerHTML = orders[i].OrderId;
                    TdReceiptId.appendChild(a);
                    TdReceiptId.style.padding = "5px";
                    Tr.appendChild(TdReceiptId);

                    var TdOrderDate = document.createElement("TD");
                    TdOrderDate.innerHTML = orders[i].OrderDate;
                    TdOrderDate.style.padding = "5px";
                    Tr.appendChild(TdOrderDate);

                    var TdAddress = document.createElement("TD");
                    TdAddress.innerHTML = orders[i].Address;
                    TdAddress.style.padding = "5px";
                    Tr.appendChild(TdAddress);

                    var TdCity = document.createElement("TD");
                    TdCity.innerHTML = orders[i].City;
                    TdCity.style.padding = "5px";
                    Tr.appendChild(TdCity);

                    var TdState = document.createElement("TD");
                    TdState.innerHTML = orders[i].State;
                    TdState.style.padding = "5px";
                    Tr.appendChild(TdState);

                    var TdZipcode = document.createElement("TD");
                    TdZipcode.innerHTML = orders[i].PostalCode;
                    TdZipcode.style.padding = "5px";
                    Tr.appendChild(TdZipcode);

                    var TdCountry = document.createElement("TD");
                    TdCountry.innerHTML = orders[i].Country;
                    TdCountry.style.padding = "5px";
                    Tr.appendChild(TdCountry);

                    var TdTotal = document.createElement("TD");
                    TdTotal.innerHTML = "$" + orders[i].Total;
                    TdTotal.style.padding = "5px";
                    Tr.appendChild(TdTotal);

                    document.getElementById("orders").appendChild(Tr);
                }
            }
        }
    }
}