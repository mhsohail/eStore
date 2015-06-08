function doLogin() {
    
    var tokenKey = 'accessToken';
    var loginData = {
        grant_type: 'password',
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    $.ajax({
        type: 'POST',
        url: '/Token',
        data: loginData
    }).done(function (data) {
        // Cache the access token and username in session storage.
        sessionStorage.setItem(tokenKey, data.access_token);
        sessionStorage.setItem("loggedin_username", data.userName);
        sessionStorage.setItem("loggedin_data", JSON.stringify(data));
        window.location = '/Account/Index';
    }).fail(function () {

    });
    
    /*
    var loginData = {
        grant_type: 'password',
        username: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    $(function () {
        $.ajax({
            url: "/Token",
            dataType: "application/x-www-form-urlencoded",
            data: loginData,
            success: function (result) {
                alert("feeee");
            }
        });
    });
    
    var xmlhttp0;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp0 = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp0 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp0.open("POST", "/Token", true);
    xmlhttp0.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp0.send(JSON.stringify(loginData));

    xmlhttp0.onreadystatechange = function () {
        if (xmlhttp0.readyState == 4 && xmlhttp0.status == 200) {
            if (xmlhttp0.responseText) { // the onreadystatechange executes multiple times, so this check is required
                alert(xmlhttp0.responseText);
            }
        }
    }
    */
}

/*
self.login = function () {
    self.result('');

    var loginData = {
        grant_type: 'password',
        username: self.loginEmail(),
        password: self.loginPassword()
    };
    
    $.ajax({
        type: 'POST',
        url: '/Token',
        data: loginData
    }).done(function (data) {
        self.user(data.userName);
        // Cache the access token in session storage.
        sessionStorage.setItem(tokenKey, data.access_token);
    }).fail(showError);
}
*/