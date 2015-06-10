var ShoppingCartViewModel = JSON.parse(localStorage.getItem("ShoppingCartViewModel"));
document.getElementById("CartItemsCountTopBar").innerHTML = ShoppingCartViewModel.CartItems.length + " items";
document.getElementById("CartTotalTopBar").innerHTML = "$" + (ShoppingCartViewModel.CartTotal + Number(localStorage.shipping) + Number(localStorage.tax));