var protocol = window.location.protocol;
var curlink = window.location.href;

if(protocol == "http:"){
    curlink = curlink.replace("http", "https");
    var link = "<a href='" + curlink + "'>点击</a>"
    var text = "你正在使用不安全的HTTP，" + link + "切换到HTTPS。"
    document.getElementById("http.alert").innerHTML=text;
} else if (protocol == "https:"){
    document.getElementById("http.alert").innerHTML="";
}
