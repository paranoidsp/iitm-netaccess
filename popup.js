/**
 *
 * @type {string}
 */

var getNetAccess = {
  /**
   * @type {string}
   * @private
   */
    netAccessURI_: 'https://netaccess.iitm.ac.in/',
  /**
   * @public
   */
  getData: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.netAccessURI_, true);
    req.onload = this.showData_.bind(this);
    req.send(null);
  },

  /**
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showData_: function (e) {
    var txt = e.target.responseText.match(/\d*\.\d*\sMB/);
    document.body.appendChild(document.createTextNode(txt));
  },

};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  getNetAccess.getData();
});
