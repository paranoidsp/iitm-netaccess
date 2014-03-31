var txt_actual = localStorage["txt_actual"];
//localStorage['username'] = '';
//localStorage['password'] = '';
var username = localStorage["username"];
var password = localStorage["password"];
var tries = 0;
var snd = '';

if ((typeof username == 'undefined') || (typeof password == 'undefined')){
    localStorage['username'] = prompt("Username: ");
    localStorage['password'] = prompt("Password: ");
    chrome.tabs.create({url:"popup.html"}) ;
}
if ((username == '') || (password == '')){
    localStorage['username'] = prompt("Username: ");
    localStorage['password'] = prompt("Password: ");
    chrome.tabs.create({url:"popup.html"}) ;
}

function getUsername(){
    return localStorage['username'];
}

function getPassword(){
    return localStorage['password'];
}


function getAccess(){


    var req = new XMLHttpRequest();
    req.onreadystatechange = function() 
    {
        if (req.readyState == 4) 
        {
            txt_actual = getMem(req.responseText);
            if(txt_actual < 500){
                updateBadge(txt_actual,1);
                tries = 0;
                localStorage['run'] = 1;
            }
            else if(txt_actual < 800){
                updateBadge(txt_actual,2);
                tries = 0;
                localStorage['run'] = 1;
            }
            else if(txt_actual < 1028){
                updateBadge(txt_actual,3);
                tries = 0;
                localStorage['run'] = 1;
            }
            else
            {
                // This var makes sure the extension doesn't get stuck when
                // you're not connected to the net.
                tries = tries + 1;
                if(tries<10){
                    updateBadge("Trying to Log In",3);
                    doLogin();
                }
                else
                    updateBadge("Not Logged In",3);
            }
        }
    }
    req.open("GET", 'https://netaccess.iitm.ac.in/', true);
    req.send(null);
}

function getMem(txt){
    var a = String(txt).match(/\d*\.\d*\sMB/);

    // TODO: 
    // Correct this
    if(a==null)
        return b;
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
    snd = "userLogin=" + encodeURIComponent(localStorage['username'])+"&userPassword="+encodeURIComponent(localStorage['password'])+"&submit=";
    log.send(snd);
}

function showNetAccess(){
    chrome.windows.create({'url': 'https://netaccess.iitm.ac.in/','type': 'popup'},function(window) {
            });
}

function showData(){
    document.write("Username: " + localStorage['username']+" <br>Password: " + localStorage['password'] +"<br>Tries: " + String(tries) + "<br>Mem: " + String(mem) + "<br>Sent: " + String(snd));
}

//chrome.browserAction.onClicked.addListener(showData);
getAccess();
setInterval(getAccess,6000);
