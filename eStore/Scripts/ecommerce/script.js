// global product object
var ProductGlobal = {};

function addToCart() {
    if (localStorage.ShoppingCartViewModel) {

    } else {
        localStorage.setItem("ShoppingCartViewModel", '{"CartItems":[],"CartTotal":0.0,"NewProduct":null}');
    }
    
    var ShoppingCartViewModel = JSON.parse(localStorage.getItem("ShoppingCartViewModel"));
    ShoppingCartViewModel.NewProduct = ProductGlobal;

    var ShoppingCartViewModel = JSON.stringify(ShoppingCartViewModel);

    var xmlhttp1;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp1 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp1.open("POST", "http://localhost:4785/api/ShoppingCartApi", true);
    xmlhttp1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp1.send(ShoppingCartViewModel);
    
    xmlhttp1.onreadystatechange = function () {
        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
            if (xmlhttp1.responseText) { // the onreadystatechange executes multiple times, so this check is required
                UpdateShoppingCart(xmlhttp1.responseText)
            }
        }
    }

}

getProductDetails();
function getProductDetails() {
    var ProductId = document.getElementById("ProductId").value;
    
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
                
                ProductGlobal.ProductId = product.ProductId;
                ProductGlobal.Name = product.Name;
                ProductGlobal.Price = product.Price;
                ProductGlobal.Color = product.Color;

                document.getElementById("product-title").innerHTML = product.Name;
                document.getElementById("discounted-price").innerHTML = "$" + product.Price;
                document.getElementById("product-color").innerHTML = "Color: " + product.Color;

            }
        }
    }
}

getShoppingCart();
function getShoppingCart() {
    if (!localStorage.ShoppingCartViewModel) {
        localStorage.setItem("ShoppingCartViewModel", '{"CartItems":[],"CartTotal":0.0,"NewProduct":null}');
    }

    UpdateShoppingCart(localStorage.getItem("ShoppingCartViewModel"));
}

function UpdateShoppingCart(ShoppingCartViewModelJson) {

    localStorage.setItem("ShoppingCartViewModel", ShoppingCartViewModelJson);
    var ShoppingCartViewModel = JSON.parse(ShoppingCartViewModelJson);

    document.getElementById("CartCountSidebarBtn").innerHTML = ShoppingCartViewModel.CartItems.length + "<span></span>";
    document.getElementById("ShoppingCartCountSidebar").innerHTML = "(" + ShoppingCartViewModel.CartItems.length + " ITEMS)";

    for (var i = 0; i < ShoppingCartViewModel.CartItems.length; i++) {
        
        Product = getProductDetails(ShoppingCartViewModel.CartItems[i].ProductId);

        var DivItem = document.createElement("DIV");
        DivItem.className = "item";

        var Img = document.createElement("IMG");
        Img.src = "http://www.smartdesk360.biz/Images/ecommerce/product3.jpg";
        DivItem.appendChild(Img);

        var DivItemInfo = document.createElement("DIV");
        DivItemInfo.className = "item-info";

        var DivProductName = document.createElement("DIV");
        DivProductName.className = "product-name";
        DivProductName.innerHTML = ShoppingCartViewModel.CartItems[i].Name;

        var Table = document.createElement("TABLE");
        var Tbody = document.createElement("TBODY");

        var TrColor = document.createElement("TR");
        var TdColorLabel = document.createElement("TD");
        TdColorLabel.innerHTML = "Color:";

        var TdColorName = document.createElement("TD");
        TdColorName.innerHTML = ShoppingCartViewModel.CartItems[i].Color;

        TrColor.appendChild(TdColorLabel);
        TrColor.appendChild(TdColorName);

        Tbody.appendChild(TrColor);
        Table.appendChild(Tbody);

        var TrSize = document.createElement("TR");
        var TdSizeLabel = document.createElement("TD");
        TdSizeLabel.innerHTML = "Size:";

        var TdSizeAmount = document.createElement("TD");
        TdSizeAmount.innerHTML = "2.34";

        TrSize.appendChild(TdSizeLabel);
        TrSize.appendChild(TdSizeAmount);

        Tbody.appendChild(TrSize);
        Table.appendChild(Tbody);

        var TrQty = document.createElement("TR");
        var TdQtyLabel = document.createElement("TD");
        TdQtyLabel.innerHTML = "Qty:";

        var TdQtyAmount = document.createElement("TD");
        TdQtyAmount.innerHTML = "2.34";

        TrQty.appendChild(TdQtyLabel);
        TrQty.appendChild(TdQtyAmount);

        Tbody.appendChild(TrQty);
        Table.appendChild(Tbody);

        var TrPrice = document.createElement("TR");
        var TdPriceLabel = document.createElement("TD");
        TdPriceLabel.innerHTML = "Price:";

        var TdPriceAmount = document.createElement("TD");
        TdPriceAmount.innerHTML = ShoppingCartViewModel.CartItems[i].Price;

        TrPrice.appendChild(TdPriceLabel);
        TrPrice.appendChild(TdPriceAmount);

        Tbody.appendChild(TrPrice);
        Table.appendChild(Tbody);

        DivItemInfo.appendChild(DivProductName);
        DivItemInfo.appendChild(Table);

        DivItem.appendChild(DivItemInfo);

        DivRemoveItem = document.createElement("DIV");
        DivRemoveItem.innerHTML = "remove";
        DivRemoveItem.className = "remove-item";
        var ProductId = ShoppingCartViewModel.CartItems[i].ProductId;
        DivRemoveItem.onclick = (function (ProductId) {
            return function () {
                //showParam(opt);
                alert(ProductId);
            };
        })(ProductId);

        DivItem.appendChild(DivRemoveItem);

        document.getElementById("cart-items").appendChild(DivItem);
    }
}



/*
<div class="item">
                    <img src="http://www.smartdesk360.biz/Images/ecommerce/product3.jpg">
                    <div class="item-info">
                        <div class="product-name">product name</div>
                        <table>
                            <tbody><tr>
                                <td>Color:</td>
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <td>Size:</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>Qty:</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>$10.00</td>
                            </tr>
                        </tbody></table>
                    </div>
                    <div class="remove-item">remove</div>
                </div>
                <div class="item">
                    <img src="http://www.smartdesk360.biz/Images/ecommerce/product3.jpg">
                    <div class="item-info">
                        <div class="product-name">product name</div>
                        <table>
                            <tbody><tr>
                                <td>Color:</td>
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <td>Size:</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>Qty:</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>$10.00</td>
                            </tr>
                        </tbody></table>
                    </div>
                    <div class="remove-item">remove</div>
                </div>
            </div>

*/