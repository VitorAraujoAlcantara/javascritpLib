function ajaxRequest() {
    var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; /*activeX versions to check for in IE*/
    if (window.ActiveXObject) { /*Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)*/
        for (var i = 0; i < activexmodes.length; i++) {
            try {
                return new ActiveXObject(activexmodes[i]);
            }
            catch (e) {
                /*suppress error*/
            }
        }
    }
    else if (window.XMLHttpRequest) /* if Mozilla, Safari etc*/
        return new XMLHttpRequest();
    else
        return false;
}

function ajax() {
    var request = new ajaxRequest();
    this.params = null;
    this.url = null;
    var assync = true;
    var method = 'POST';
    var responseText = null;
    var onSuccess = function (response) {

    };
    var onError = function (response) {

    };
    var onStart = function () {

    };
    var onFinalize = function () {

    };
    this.setOnSuccess = function (fn) {
        onSuccess = fn;
    };

    this.setOnError = function (fn) {
        onError = fn;
    };

    this.setOnStart = function (fn) {
        onStart = fn;
    };

    this.setOnFinalize = function (fn) {
        onFinalize = fn;
    };
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            try {
                if (request.status === 200 || window.location.href.indexOf("http") === -1) {
                    responseText = request.responseText;
                    onSuccess(responseText);
                }
                else {
                    onError(responseText);
                }
            }
            finally {
                onFinalize();
            }
        }
    };
    this.setMethodAsGet = function () {
        method = 'GET';
    };

    this.setMethodAsPost = function () {
        method = 'POST';
    };

    this.sendAsJson = function () {
        onStart();
        request.open(method, this.url, assync);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(this.params));
    };
    this.sendAsFields = function () {
        onStart();
        request.open(method, this.url, assync);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(JSON.stringify(this.params));
    };
}


