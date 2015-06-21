var ShoppingCartViewModel = JSON.parse(localStorage.getItem("ShoppingCartViewModel"));
document.getElementById("CartItemsCountTopBar").innerHTML = ShoppingCartViewModel.CartItems.length + " items";
document.getElementById("CartTotalTopBar").innerHTML = "$" + (ShoppingCartViewModel.CartTotal + Number(localStorage.shipping) + Number(localStorage.tax)).toFixed(2);

function isValidAmount(number) {
    var strNumber = number.toString();
    if (strNumber.match(/[0-9]+\./)) { return false; }
    if (number == "" ||
        number == null ||
        isNaN(number) ||
        number % 1 != 0 ||
        number < 1) {
        return false;
    }
    return true;
}