
function registerAccount() {
    
    var RegisterBindingModel = {
        UserName: "sohail",
        Email: document.getElementById("email").value,
        CompanyName: document.getElementById("company-name").value,
        FirstName: document.getElementById("first-name").value,
        LastName: document.getElementById("last-name").value,
        ScreenName: document.getElementById("screen-name").value,
        Gender: document.getElementsByName("sex")[0].value,
        Password: document.getElementById("password").value,
        ConfirmPassword: document.getElementById("confirm-password").value,
        ReceiveNewsLetter: document.getElementById("receive-newsletter").checked
    };
    
    var xmlhttp0;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp0 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp0.open("POST", window.ROOT + "/api/AccountApi/Register", true);
    xmlhttp0.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp0.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xmlhttp0.send(JSON.stringify(RegisterBindingModel));
    
    xmlhttp0.onreadystatechange = function () {
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                //alert("deeee");
                window.location = '/Account';
            }
        }

        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 400) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                alert(xmlhttp0.responseText);
            }
        }
        
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 500) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                alert(xmlhttp0.responseText);
            }
        }
    }
    
}