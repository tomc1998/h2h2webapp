/**
 * @file Helper functions for ajax requests.
 */

/**
 * Performs and AJAX request, returning the response as a promise.
 * @param {string} type - The type of the request. "GET", "POST", etc.
 * @param {string} url  - The URL to send the request to.
 * @param {Object[]} [headers] - Request headers. 
 * @param {string} headers[].header - The header name
 * @param {string} headers[].value - The header value
 * @returns {Promise} A promise, which when fulfilled, will contain the
 * 'response' of the XMLHttpRequest.
 */
function ajax(type, url, headers) {
  if (typeof headers === "undefined") {
    headers = [];
  }

  // Open promise
  var promise = new RSVP.Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          resolve(this.response);
        }
        else {
          reject(this);
        }
      }
    }
    req.open(type, url, true);
    // Set request headers
    for (var ii = 0; ii < headers.length; ++ii) {
      req.setRequestHeader(headers[ii].header, headers[ii].value);
    }
    req.send();
  });

  return promise;
}
