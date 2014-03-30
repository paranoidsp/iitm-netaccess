function getAccess(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() 
    {
        if (req.readyState == 4) 
        {
            var txt_actual = getMem(req.responseText);
            if(txt_actual < 500)
                updateBadge(txt_actual,1);
            else if (txt_actual < 800)
                updateBadge(txt_actual,2);
            else if (txt_actual < 1028)
                updateBadge(txt_actual,3);
            else
            {
                updateBadge("Not Logged In",3);
                doLogin("ee11b097","Pap&97");
            }
        }
    }
    req.open("GET", 'https://netaccess.iitm.ac.in/', true);
    req.send(null);
}

function getMem(txt){
    var a = String(txt).match(/\d*\.\d*\sMB/);
    var b = String(a);
    if(b.substring(3,4) == "."){
        return b.substring(0,3) ;}
    else{
        return b.substring(0,4) ;}
}

function updateBadge(txt_actual,cond)
{
    if (cond == 1)
    {    
        chrome.browserAction.setBadgeBackgroundColor({ color: [131, 225, 145, 205] });
        chrome.browserAction.setBadgeText({text:String(txt_actual)});
    }
    else if(cond == 2)
    {
        chrome.browserAction.setBadgeBackgroundColor({ color: [225, 94, 0, 205] });
        chrome.browserAction.setBadgeText({text:String(txt_actual)});   
    }
    else if(cond == 3)
    {
        chrome.browserAction.setBadgeBackgroundColor({ color: [225, 0, 0, 205] });
        chrome.browserAction.setBadgeText({text:String(txt_actual)});   
    }
}

function doLogin(user, pass){
    var log = new XMLHttpRequest();
    log.onreadystatechange = function () {
        if(log.readyState == 4){
            updateBadge("Logged In",1);
            getAccess();

        }
    }
    log.open("POST",'https://netaccess.iitm.ac.in/account/login',true);
    log.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    log.send("userLogin=ee11b097&userPassword=Pap%2697&submit=");
}

//chrome.browserAction.onClicked.addListener(getAccess);
getAccess();
setInterval(getAccess,6000);
