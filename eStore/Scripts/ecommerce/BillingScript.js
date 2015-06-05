
function doCheckoutShipping() {

    var CreditCard = {
        Number: document.getElementById("credit-card-number").value,
        Expdate: document.getElementById("credit-card-expdate").value.replace("|",""),
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
    
    if (ValidateCreditCardNumber(document.getElementById("credit-card-number").value)
            && ValidateCCExpiry(document.getElementById("credit-card-expdate").value))
    {
        window.location = '/Checkout/Shipping';
    } else {
        alert("Incorrect credit card info");
    }
}

function ValidateCreditCardNumber(creditCardNumber) {

    // Get the first digit
    var firstnumber = creditCardNumber.substr(0, 1);

    // Make sure it is the correct amount of digits. Account for dashes being present
    // American Express cards always start with a "3" (actually, they always start with a "34" or "37")
    switch (firstnumber) {
        case '3':
            if (!creditCardNumber.match(/^3\d{3}[ \-]?\d{6}[ \-]?\d{5}$/)) {
                alert("This is not a valid American Express card number");
                return false;
            }
            
            break;
        case '4':
            if (!creditCardNumber.match(/^4\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/)) {
                alert("This is not a valid Visa card number");
                return false;
            }
            break;
        case '5':
            if (!creditCardNumber.match(/^5\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/)) {
                alert("This is not a valid MasterCard card number");
                return false;
            }
            break;
        case '6':
            if (!creditCardNumber.match(/^6011[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/)) {
                alert("This is not a valid Discover card number");
                return false;
            }
            break;
        default:
            return false;
    }
    
    // Here's where we use the Luhn Algorithm
    /*
    creditCardNumber = creditCardNumber.replace('-', '');
    var map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    var sum = 0;
    var last = creditCardNumber.length - 1;
    for (var i = 0; i <= last; i++) {
        sum += map[creditCardNumber[last - i] + (i & 1) * 10];
    }
    
    if (sum % 10 != 0) {
        alert('This is not a valid credit card number');
        return 'This is not a valid credit card number';
    }
    */
    // Luhn Algorithm ends

    
    // If we made it this far the credit card number is in a valid format
    //alert('This is a valid credit card number');
    return true;
}

function ValidateCCExpiry(date) {
    date = date.trim();
    var month = date.split('|')[0];
    var year = date.split('|')[1];

    month = month.trim();
    year = year.trim();
    
    if (!month.match(/^\d{1,2}$/)) {
        alert("The month isn't a one or two digit number");
        return false; // The month isn't a one or two digit number
    }
    else if (!year.match(/^\d{2}$/)) {
        alert("The year isn't 2 digits long");
        return false; // The year isn't four digits long
    }
    else if (Number(year) < new Date().getFullYear().toString().substr(2, 2)) {
        alert("The card is already expired");
        return false; // The card is already expired
    }
    else if (Number(month) < (new Date().getMonth() + 1) && year == new Date().getFullYear().toString().substr(2, 2))
    {
        alert("The card is already expired");
        return false; // The card is already expired
    }
    return true;
    
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
    document.getElementById("item-total-amount").innerHTML = "$" + (ShoppingCartVM.CartTotal + 20);
    
}