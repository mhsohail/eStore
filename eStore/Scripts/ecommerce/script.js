// global product object
var ProductGlobal = {};

document.getElementById("add-quantity").onclick = function() {
    if (!isValidAmount(document.getElementById("prodQty").value)) {
        document.getElementById("prodQty").value = 0;
    }

    document.getElementById("prodQty").value++;
};

document.getElementById("deduct-quantity").onclick = function() {
    if (!isValidAmount(document.getElementById("prodQty").value)) {
        document.getElementById("prodQty").value = 0;
    }

    if (document.getElementById("prodQty").value == 1) {
        return;
    }
    document.getElementById("prodQty").value--;
};

function addToCart() {
    
    if (!isValidAmount(document.getElementById("prodQty").value))
    {
        alert("Enter valid amount");
        return;
    }
    var qty = document.getElementById("prodQty").value;
    
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
    
    xmlhttp1.open("POST", window.ROOT + "/api/ShoppingCartApi?qty="+qty, true);
    xmlhttp1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp1.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp1.send(ShoppingCartViewModel);
    
    xmlhttp1.onreadystatechange = function () {
        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
            if (xmlhttp1.responseText) { // the onreadystatechange executes multiple times, so this check is required
                var scvm = JSON.parse(xmlhttp1.responseText);
                
                if (scvm.NewProduct == null) {
                    UpdateShoppingCart(xmlhttp1.responseText, true);
                    cartRefreshed = false;
                } else {
                    UpdateShoppingCart(xmlhttp1.responseText, false);
                }
            }
        }
    }
}

    getProductDetails();
    function getProductDetails(pid, refreshCart, cartItem) {
        var ProductId = ((typeof pid == "undefined") ? document.getElementById("ProductId").value : pid);
        var xmlhttp0;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp0 = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp0.open("GET", window.ROOT + "/api/ProductsApi/" + ProductId, true);
        xmlhttp0.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp0.send();

        xmlhttp0.onreadystatechange = function () {
            if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
                if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                    var product = JSON.parse(xmlhttp0.responseText);
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
    
    function UpdateShoppingCart(ShoppingCartViewModelJson, refreshCart) {

        localStorage.setItem("ShoppingCartViewModel", ShoppingCartViewModelJson);
        var ShoppingCartViewModel = JSON.parse(ShoppingCartViewModelJson);
    
        document.getElementById("CartCountSidebarBtn").innerHTML = ShoppingCartViewModel.CartItems.length + "<span></span>";
        document.getElementById("ShoppingCartCountSidebar").innerHTML = "(" + ShoppingCartViewModel.CartItems.length + " ITEMS)";
        document.getElementById("cart-total-sidebar").innerHTML = "subtotal: $" + ShoppingCartViewModel.CartTotal;

        for (var i = 0; i < ShoppingCartViewModel.CartItems.length; i++) {
            getProductDetails(ShoppingCartViewModel.CartItems[i].ProductId, refreshCart, ShoppingCartViewModel.CartItems[i]);
        }
    }

    var cartRefreshed = false;
    function PopulateShoppingCartView(Product, refreshCart, cartItem) {
        if (typeof Product != "undefined") {
        
            if (refreshCart && !cartRefreshed) {
                //alert(refreshCart);
                document.getElementById("cart-items").innerHTML = "";
                cartRefreshed = true;
            }

            var DivItem = document.createElement("DIV");
            DivItem.className = "item";

            var Img = document.createElement("IMG");
            Img.src = "http://www.smartdesk360.biz/Images/ecommerce/product3.jpg";
            DivItem.appendChild(Img);

            var DivItemInfo = document.createElement("DIV");
            DivItemInfo.className = "item-info";

            var DivProductName = document.createElement("DIV");
            DivProductName.className = "product-name";
            DivProductName.innerHTML = Product.Name;

            var Table = document.createElement("TABLE");
            var Tbody = document.createElement("TBODY");

            var TrColor = document.createElement("TR");
            var TdColorLabel = document.createElement("TD");
            TdColorLabel.innerHTML = "Color:";

            var TdColorName = document.createElement("TD");
            TdColorName.innerHTML = Product.Color;

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
            TdQtyAmount.innerHTML = cartItem.Count;

            TrQty.appendChild(TdQtyLabel);
            TrQty.appendChild(TdQtyAmount);

            Tbody.appendChild(TrQty);
            Table.appendChild(Tbody);

            var TrPrice = document.createElement("TR");
            var TdPriceLabel = document.createElement("TD");
            TdPriceLabel.innerHTML = "Price:";

            var TdPriceAmount = document.createElement("TD");
            TdPriceAmount.innerHTML = Product.Price;

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
            var ProductId = Product.ProductId;
            DivRemoveItem.onclick = (function (ProductId) {
                return function () {
                    deleteFromCart(ProductId, this);
                };
            })(ProductId);

            DivItem.appendChild(DivRemoveItem);

            document.getElementById("cart-items").appendChild(DivItem);
        
        }
    }

    function deleteFromCart(ProductId, _this) {
    
        var ShoppingCartViewModelJson = localStorage.getItem("ShoppingCartViewModel");

        var xmlhttp2;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp2 = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xmlhttp2.open("DELETE", window.ROOT + "/api/ShoppingCartApi/" + ProductId, true);
        xmlhttp2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp2.send(ShoppingCartViewModelJson);
    
        xmlhttp2.onreadystatechange = function () {
            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                if (xmlhttp2.responseText) { // the onreadystatechange executes multiple times, so this check is required
                
                    localStorage.setItem("ShoppingCartViewModel", xmlhttp2.responseText);
                
                    var ShoppingCartViewModel = JSON.parse(localStorage.getItem("ShoppingCartViewModel"));
                
                    document.getElementById("cart-total-sidebar").innerHTML = "subtotal: $" + ShoppingCartViewModel.CartTotal;
                    document.getElementById("ShoppingCartCountSidebar").innerHTML = "(" + ShoppingCartViewModel.CartItems.length + " ITEMS)";
                    document.getElementById("CartCountSidebarBtn").innerHTML = ShoppingCartViewModel.CartItems.length + "<span></span>";

                    findParentNode("item", _this);
                }
            }
        }
    
    }

    function findParentNode(parentClassName, childObj) {
        var testObj = childObj.parentNode;
        var count = 1;
        while (testObj.className != parentClassName) {
            testObj = testObj.parentNode;
            count++;
        }
        // now you have the object you are looking for - do something with it
        testObj.remove();
    }
    
    document.getElementById("facebook-icon").onclick = function () {
        if (typeof window.fbAsyncInit !== 'undefined') {
            window.fbAsyncInit(); return;
        }

        window.fbAsyncInit = function () {
            FB.init({
                appId: '396373413884119',
                xfbml: true,
                version: 'v2.3'
            });

            // other code goes here
            // share current page - simple share
            FB.ui({
                method: 'share',
                //href: window.location.origin + window.location.pathname,
                href: "http://vdovalley.com/Videos/Details/2709",
            }, function (response) { });

            // share current page - complex share
            /*FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object: 'https://developers.facebook.com/docs/',
                })
            }, function (response) {
                // Debug response (optional)
                console.log(response);
            });
            */

            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token 
                    // and signed request each expire
                    var uid = response.authResponse.userID;
                    var userAccessToken = response.authResponse.accessToken;

                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                    alert("Not authorized");
                } else {
                    // the user isn't logged in to Facebook.
                    alert("Not logged in");
                    FB.login(function (response) {
                        // handle the response
                    }, {
                        scope: 'publish_actions',
                        return_scopes: true
                    });
                }
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };