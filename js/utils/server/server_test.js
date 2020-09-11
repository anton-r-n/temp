(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  $.commit = '1';
  w.test = w.test || {};

  w.test['utils.server.html'] = function (msg) {
    var received = $.server();
    var expected =
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>A' +
      'pp title</title><link rel="stylesheet" href="/static/1/app.css" /><li' +
      'nk rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /></he' +
      'ad><body><script src="/static/1/app.js"></script><script>$.app("")</s' +
      'cript></body></html>';
    return w.assertEqual(expected, received, msg);
  };

  w.test['utils.server.escape'] = function (msg) {
    var received = $.server({name: 'body', nodes: '</script>'});
    var expected =
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>A' +
      'pp title</title><link rel="stylesheet" href="/static/1/app.css" /><li' +
      'nk rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /></he' +
      'ad><body>&lt;/script&gt;<script src="/static/1/app.js"></script><scri' +
      'pt>$.app({"name":"body","nodes":"<\\/script>"})</script></body></html>';
    return w.assertEqual(expected, received, msg);
  };
})(this);
