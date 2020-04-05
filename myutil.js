var protocol = window.location.protocol;
var curlink = window.location.href;

// 地址后加斜杠
if ((window.location.href).endsWith('/') == false ) {
    window.location.assign(window.location.href + '/');
    
} else if(protocol == "http:"){ // 强制HTTPS
    curlink = curlink.replace("http", "https");
    var text = "你正在使用不安全的HTTP，点确定切换到HTTPS。"
    //document.getElementById("http.alert").innerHTML=text;
    var j = confirm(text);
    if(j == true){
        window.location.assign(curlink);
    }
}

