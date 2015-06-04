
function addToCart() {
    document.cookie = 'ShoppingCart = {"CartItems":[],"CartTotal":0.0,"NewProduct":{}}';
    var cookies = document.cookie.split(";");
    alert(cookies[0]);
}

getProductDetails();
function getProductDetails() {
    var ProductId = document.getElementById("ProductId").value;
    alert(ProductId);

    var xmlhttp0;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp0 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp0.open("GET", "http://localhost:26307/api/ProductsApi/" + ProductId, true);
    xmlhttp0.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp0.send(jsonProduct);
}