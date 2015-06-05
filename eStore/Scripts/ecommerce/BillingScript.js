
function doCheckoutShipping() {

    var CreditCard = {
        Number: document.getElementById("credit-card-number").value,
        Expdate: document.getElementById("credit-card-expdate").value,
        CVC: document.getElementById("credit-card-cvc").value,
        FirstName: document.getElementById("credit-card-firstname").value,
        LastName: document.getElementById("credit-card-lastname").value
    };

    var BillingAddress = {
        FirstName: document.getElementById("billing-addr-firstname").value,
        LastName: document.getElementById("billing-addr-lastname").value,
        Company: document.getElementById("billing-addr-company").value,
        Address: document.getElementById("billing-addr-address").value,
        Apt: document.getElementById("billing-addr-apt").value,
        City: document.getElementById("billing-addr-city").value,
        State: document.getElementById("billing-addr-state").value,
        Zipcode: document.getElementById("billing-addr-zipcode").value,
        Country: document.getElementById("billing-addr-country").value,
        Phone: document.getElementById("billing-addr-phone").value,
        Email: document.getElementById("billing-addr-email").value
    };

    var BillingInfo = {
        CreditCardInfo: CreditCard,
        BillingAddressInfo: BillingAddress
    }

    localStorage.setItem("BillingInfo", JSON.stringify(BillingInfo));
    
    window.location = '/Checkout/Shipping';
}