/**
 *
 * @type {string}
 */

var getNetAccess = {
    /**
     * @type {string}
     * @private
     */
    //netAccessURI_: 'https://netaccess.iitm.ac.in/',
    /**
     * @public
     */
    //getData: function() {
    //var req = new XMLHttpRequest();
    //req.open("GET", this.netAccessURI_, true);
    //req.onload = this.showData_.bind(this);
    //req.send(null);
    //},

    /**
     * @param {ProgressEvent} e The XHR ProgressEvent.
     * @private
     */
    //showData_: function (e) {
    //var txt = e.target.responseText.match(/\d*\.\d*\sMB/);
    //// document.body.appendChild(document.createTextNode(txt));
    //},

    getDataFromBack: function () {
        mem = chrome.extension.getBackgroundPage().txt_actual;
        tries = chrome.extension.getBackgroundPage().tries;
        snd = chrome.extension.getBackgroundPage().snd;
        document.getElementById('log_status').innerHTML = "Username: " + localStorage['username']+" <br>Password: " + localStorage['password'] +"<br>Tries: " + String(tries) + "<br>Mem: " + String(mem) + "<br>Sent: " + String(snd);
        //document.getElementById('log_status').innerHTML += '</br><button id="getAcc" onclick="getNetAccess.getData()" >Get Access</button>';
        //document.write(chrome.extension.getBackgroundPage().snd);
    },

    getData: function() {
    }

};


document.addEventListener('DOMContentLoaded', function () {
    //document.getElementById('log_status').innerText = "Testing";
    getNetAccess.getDataFromBack();
});

