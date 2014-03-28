/**
 *
 * @type {string}
 */

var kittenGenerator = {
  /**
   * @type {string}
   * @private
   */
    searchOnFlickr_: 'https://netaccess.iitm.ac.in/',
  /**
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var txt = e.target.responseText.match(/\d*\.\d*\sMB/);
    document.body.appendChild(document.createTextNode(txt));
  },

};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.requestKittens();
});
