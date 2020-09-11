(function (w) {
  var $ = (w.$ = w.$ || {});
  var TIMEOUT = 30000;

  /**
   * Creates a request
   * @param {String} method HTTP Method.
   * @param {String} url URL.
   * @param {Function} callback Callback function.
   * @return {Object} XMLHttpRequest instance.
   */
  $.request = function (method, url, callback) {
    var xhr = new w.XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.open(method, url, true);
    xhr.setRequestHeader('Cache-Control', 'no-store');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function () {
      xhr.readyState === 4 && response(xhr, callback);
    };
    return xhr;
  };

  function response(xhr, callback) {
    var data = {name: 'pre', nodes: 'Data error'};
    if (callback instanceof Function) {
      if (xhr.status === 200) {
        try {
          data = JSON.parse(xhr.responseText);
        } catch (e) {
          data.nodes = 'Response ' + e;
        }
      } else {
        data.nodes = [
          'Response Error',
          'Response Status: ' + xhr.status + ' ' + xhr.statusText,
          'Resource: ' + xhr.responseURL,
        ].join('\n');
      }
      callback(data);
    }
  }
})(this);
