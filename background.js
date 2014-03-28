
function getAccess(){
    //$.ajax({url: "net"})
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            updateBadge(getMem(req.responseText));
            //updateBadge("Hello");//getMem(req.responseText));
            //alert(req.responseText);
        }
    }
    req.open("GET", 'https://netaccess.iitm.ac.in/', true);
    req.send(null);
}

function getMem(txt){
    var a = String(txt).match(/\d*\.\d*\sMB/);
    var b = String(a);
    //var b = a.substring(0,4);
    if(b.substring(3,4) == "."){
        return b.substring(0,3) ;}
    else{
        return b.substring(0,4) ;}
}

function updateBadge(txt){
    chrome.browserAction.setBadgeBackgroundColor({ color: [4, 171, 239, 205] });
    chrome.browserAction.setBadgeText({text:String(txt)});
}

//chrome.browserAction.onClicked.addListener(getAccess);
getAccess();
setInterval(getAccess(),60000);



