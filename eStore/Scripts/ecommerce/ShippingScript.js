
function doPlaceOrder() {
    
    var ShippingInfo = {
        Email: document.getElementById("shipping-info-email").value,
        FirstName: document.getElementById("shipping-info-firstname").value,
        LastName: document.getElementById("shipping-info-lastname").value,
        Company: document.getElementById("shipping-info-company").value,
        Address: document.getElementById("shipping-info-address").value,
        Apt: document.getElementById("shipping-info-apt").value,
        City: document.getElementById("shipping-info-city").value,
        State: document.getElementById("shipping-info-state").value,
        Zipcode: document.getElementById("shipping-info-zipcode").value,
        Country: document.getElementById("shipping-info-country").value,
        Phone: document.getElementById("shipping-info-phone").value
    };

    localStorage.setItem("ShippingInfo", JSON.stringify(ShippingInfo));


    var Order = {
        Username: "mhsohail",
        FirstName: "Muhammad",
        LastName: "Sohail",
        Address: "Street 10, Islamabad",
        City: "Islamabad",
        State: "Punjab",
        PostalCode: "43600",
        Country: "Pakistan",
        Phone: "0303-5332033",
        Email: "sohailx2x@gmail.com",
        Total: 100
    };
    
    var xmlhttp0;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp0 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp0.open("POST", "http://localhost:4785/api/OrderApi", true);
    xmlhttp0.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp0.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xmlhttp0.send(JSON.stringify(Order));

    xmlhttp0.onreadystatechange = function () {
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                //alert(xmlhttp0.responseText);
                window.location = "/Payment/DPM";
            }
        }
    }

}