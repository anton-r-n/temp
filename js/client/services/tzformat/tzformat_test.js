(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['services.tzformat.iso'] = function (msg) {
    var expected = '2017-08-05T18:08:46Z';
    var received = $.tzformat(1501956526349, 'ISO', 0);
    return w.assertEqual(expected, received, msg);
  };
})(this);
