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
                localStorage.ShoppingCartViewModel = xmlhttp1.responseText;
                alert(localStorage.ShoppingCartViewModel);
                //var ShoppingCartViewModel = JSON.parse(xmlhttp1.responseText);
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