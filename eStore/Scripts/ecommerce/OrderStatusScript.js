
var xmlhttp0;
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp0 = new XMLHttpRequest();
}
else {// code for IE6, IE5
    xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp0.open("GET", "http://localhost:4785/api/OrderApi?userName=" + sessionStorage.getItem("loggedin_username"), true);
xmlhttp0.setRequestHeader("Accept", "application/json;charset=UTF-8");
xmlhttp0.send();

xmlhttp0.onreadystatechange = function () {
    if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
        if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
            
            var orders = JSON.parse(xmlhttp0.responseText);
            
            for(var i = 0; i < orders.length; i++) {
                console.log(orders[i]);

                var Tr = document.createElement("TR");

                var TdOrderId = document.createElement("TD");
                TdOrderId.innerHTML = orders[i].OrderId;
                TdOrderId.style.padding = "5px";
                Tr.appendChild(TdOrderId);
                
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
