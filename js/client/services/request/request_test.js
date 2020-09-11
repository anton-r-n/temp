(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['services.request'] = function (msg) {
    var received = $.request() instanceof w.XMLHttpRequest;
    return w.assertEqual(true, received, msg);
  };
})(this);
