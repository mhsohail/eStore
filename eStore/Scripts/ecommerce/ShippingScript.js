
document.getElementById("estimated-shipping").innerHTML = "$" + localStorage.shipping;
document.getElementById("estimated-tax").innerHTML = "$" + localStorage.tax;

if (sessionStorage.PostLoginReturnUrlForShipping) {
    
    var ShippingInfo = JSON.parse(localStorage.getItem("ShippingInfo"));
    
    document.getElementById("shipping-info-email").value = ShippingInfo.Email;
    document.getElementById("shipping-info-firstname").value = ShippingInfo.FirstName;
    document.getElementById("shipping-info-lastname").value = ShippingInfo.LastName;
    document.getElementById("shipping-info-company").value = ShippingInfo.Company;
    document.getElementById("shipping-info-address").value = ShippingInfo.Address;
    document.getElementById("shipping-info-apt").value = ShippingInfo.Apt;
    document.getElementById("shipping-info-city").value = ShippingInfo.City;
    document.getElementById("shipping-info-state").value = ShippingInfo.State;
    document.getElementById("shipping-info-zipcode").value = ShippingInfo.Zipcode;
    document.getElementById("shipping-info-country").value = ShippingInfo.Country;
    document.getElementById("shipping-info-phone").value = ShippingInfo.Phone;
    
    sessionStorage.removeItem("PostLoginReturnUrlForShipping");
}

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
    
    var ShoppingCartVM = localStorage.getItem("ShoppingCartViewModel");
    var ShoppingCartVM = JSON.parse(ShoppingCartVM);
    
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
        Email: sessionStorage.getItem("loggedin_username"),
        Total: ShoppingCartVM.CartTotal
    };
    
    localStorage.setItem("Order", JSON.stringify(Order));

    if (Order.Email == null || Order.Email == "") {
        sessionStorage.setItem("PostLoginReturnUrlForShipping", "/Checkout/Shipping");
        window.location = "/Account/Login";
    }
    
    var xmlhttp0;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp0 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp0.open("POST", window.ROOT + "/api/OrderApi", true);
    xmlhttp0.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp0.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xmlhttp0.send(JSON.stringify(Order));

    xmlhttp0.onreadystatechange = function () {
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                //alert(xmlhttp0.responseText);
                //window.location = "/Payment/DPM/";
                ProcessPayment();
            }
        }
    }

    function ProcessPayment() {
        var xmlhttp1;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp1 = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp1.open("POST", window.ROOT + "/api/PaymentApi", true);
        xmlhttp1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp1.setRequestHeader("Accept", "application/json;charset=UTF-8");
        xmlhttp1.send(JSON.stringify(Order));

        xmlhttp1.onreadystatechange = function () {
            if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
                if (xmlhttp1.responseText) { // the onreadystatechange executes multiple times, so this check is required
                    console.log(xmlhttp0.responseText);
                    //window.location = "/Payment/DPM/";
                }
            }
        }
    }
    
}

GetShoppingCartVM();
function GetShoppingCartVM() {

    var ShoppingCartVM = localStorage.getItem("ShoppingCartViewModel");
    ShoppingCartVM = JSON.parse(ShoppingCartVM);

    for (var i = 0; i < ShoppingCartVM.CartItems.length; i++) {

        var DivItem = document.createElement("DIV");
        DivItem.className = "item";

        var Img = document.createElement("IMG");
        Img.src = "http://www.smartdesk360.biz/Images/ecommerce/product3.jpg";
        DivItem.appendChild(Img);

        var DivItemInfo = document.createElement("DIV");
        DivItemInfo.className = "item-info";

        var H4 = document.createElement("H4");
        H4.className = "name";
        H4.innerHTML = ShoppingCartVM.CartItems[i].Product.Name;
        DivItemInfo.appendChild(H4);

        var Table = document.createElement("TABLE");
        var Tbody = document.createElement("TBODY");

        // TR color
        var TrColor = document.createElement("TR");
        var TdColorLabel = document.createElement("TD");
        TdColorLabel.innerHTML = "Color:";

        var TdColorName = document.createElement("TD");
        TdColorName.innerHTML = ShoppingCartVM.CartItems[i].Product.Color;

        TrColor.appendChild(TdColorLabel);
        TrColor.appendChild(TdColorName);
        Tbody.appendChild(TrColor);

        // TR size
        var TrSize = document.createElement("TR");
        var TdSizeLabel = document.createElement("TD");
        TdSizeLabel.innerHTML = "Size:";

        var TdSizeAmount = document.createElement("TD");
        TdSizeAmount.innerHTML = "2.34";

        TrSize.appendChild(TdSizeLabel);
        TrSize.appendChild(TdSizeAmount);
        Tbody.appendChild(TrSize);

        // TR Qty
        var TrQty = document.createElement("TR");
        var TdQtyLabel = document.createElement("TD");
        TdQtyLabel.innerHTML = "Qty:";

        var TdQtyAmount = document.createElement("TD");
        TdQtyAmount.innerHTML = ShoppingCartVM.CartItems[i].Count;

        TrQty.appendChild(TdQtyLabel);
        TrQty.appendChild(TdQtyAmount);
        Tbody.appendChild(TrQty);

        Table.appendChild(Tbody);
        DivItemInfo.appendChild(Table);

        DivItem.appendChild(DivItemInfo);
        document.getElementById("order-summary").appendChild(DivItem);
    }

    document.getElementById("item-subtotal").innerHTML = "item subtotal (" + ShoppingCartVM.CartItems.length + ")";
    document.getElementById("item-subtotal-amount").innerHTML = "$" + ShoppingCartVM.CartTotal;
    document.getElementById("item-total-amount").innerHTML = "$" + (ShoppingCartVM.CartTotal + Number(localStorage.shipping) + Number(localStorage.tax));

}