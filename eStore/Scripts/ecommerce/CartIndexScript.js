﻿
//alert(localStorage.getItem("ShoppingCartViewModel"));
var ShoppingCartViewModel = JSON.parse(localStorage.getItem("ShoppingCartViewModel"));

document.getElementById("checkout-sub-title").innerHTML = ShoppingCartViewModel.CartItems.length + "(items)";
document.getElementById("item-subtotal").innerHTML = "item subtotal (" + ShoppingCartViewModel.CartItems.length + ")";
document.getElementById("CartItemsCountTopBar").innerHTML = ShoppingCartViewModel.CartItems.length + " items";
document.getElementById("item-subtotal-amount").innerHTML = "$" + ShoppingCartViewModel.CartTotal;
document.getElementById("item-total-amount").innerHTML = "$" + (ShoppingCartViewModel.CartTotal + 20);
document.getElementById("CartTotalTopBar").innerHTML = "$" + (ShoppingCartViewModel.CartTotal + 20);

function getProductDetails(pid, CartItem) {
    var ProductId = (typeof pid == "undefined") ? document.getElementById("ProductId").value : pid;
    
    var xmlhttp0;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp0 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp0.open("GET", "http://localhost:4785/api/ProductsApi/" + ProductId, true);
    xmlhttp0.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp0.send();
    
    xmlhttp0.onreadystatechange = function () {
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                var product = JSON.parse(xmlhttp0.responseText);

                if (typeof pid != "undefined") {
                    PopulateShoppingCartView(product, CartItem);
                    return;
                }

                ProductGlobal.ProductId = product.ProductId;
                ProductGlobal.Name = product.Name;
                ProductGlobal.Price = product.Price;
                ProductGlobal.Color = product.Color;

                document.getElementById("product-title").innerHTML = product.Name;
                document.getElementById("discounted-price").innerHTML = "$" + product.Price;
                document.getElementById("product-color").innerHTML = "Color: " + product.Color;

            }
        }
    }/**/
}

for (var i = 0; i < ShoppingCartViewModel.CartItems.length; i++) {
    getProductDetails(ShoppingCartViewModel.CartItems[i].ProductId, ShoppingCartViewModel.CartItems[i]);
}

function PopulateShoppingCartView(Product, CartItem) {

    var Tr = document.createElement("TR");
    var Td = document.createElement("TD");

    var Img = document.createElement("IMG");
    Img.src = "http://www.smartdesk360.biz/Images/ecommerce/product3.jpg";
    Td.appendChild(Img);

    var DivItemDetail = document.createElement("DIV");
    DivItemDetail.className = "item-detail";

    var H4 = document.createElement("H4");
    H4.className = "name";
    H4.innerHTML = Product.Name;
    DivItemDetail.appendChild(H4);

    var Table = document.createElement("TABLE");

    // TR color
    var TrColor = document.createElement("TR");
    var TdColorLabel = document.createElement("TD");
    TdColorLabel.innerHTML = "Color:";
    TrColor.appendChild(TdColorLabel);

    var TdColorName = document.createElement("TD");
    TdColorName.innerHTML = Product.Color;
    TrColor.appendChild(TdColorName);
    Table.appendChild(TrColor);
    /////

    // TR size
    var TrSize = document.createElement("TR");
    var TdSizeLabel = document.createElement("TD");
    TdSizeLabel.innerHTML = "Size:";
    TrSize.appendChild(TdSizeLabel);

    var TdSizeName = document.createElement("TD");
    TdSizeName.innerHTML = "2";
    var AEdit = document.createElement("A");
    AEdit.className = "edit-col";
    AEdit.innerHTML = "edit";
    AEdit.href = "#";
    TdSizeName.appendChild(AEdit);
    TrSize.appendChild(TdSizeName);
    Table.appendChild(TrSize);
    /////

    DivItemDetail.appendChild(Table);
    Td.appendChild(DivItemDetail);
    Tr.appendChild(Td);

    // TD Qty
    var TdQty = document.createElement("TD");
    TdQty.innerHTML = CartItem.Count;
    Tr.appendChild(TdQty);
    /////

    // TD Price
    var TdPrice = document.createElement("TD");
    TdPrice.innerHTML = "$" + Product.Price;
    Tr.appendChild(TdPrice);
    /////

    // TD Total
    var TdTotal = document.createElement("TD");
    TdTotal.innerHTML = "$" + (CartItem.Count * Product.Price).toFixed(2);
    Tr.appendChild(TdTotal);
    /////
    
    document.getElementById("cart-items-tbody").appendChild(Tr);
}
