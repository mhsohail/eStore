
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

}