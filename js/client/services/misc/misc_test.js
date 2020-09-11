(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['services.misc.arr'] = function (msg) {
    return w.assertEqual('[1,2,3]', JSON.stringify($.arr([1, 2, 3])), msg);
  };

  w.test['services.misc.arr.null'] = function (msg) {
    return w.assertEqual('[]', JSON.stringify($.arr(null)), msg);
  };

  w.test['services.misc.arr.value'] = function (msg) {
    return w.assertEqual('[0]', JSON.stringify($.arr(0)), msg);
  };

  w.test['services.misc.arr.empty'] = function (msg) {
    return w.assertEqual('[""]', JSON.stringify($.arr('')), msg);
  };

  w.test['services.misc.arr.string'] = function (msg) {
    return w.assertEqual('["abc"]', JSON.stringify($.arr('abc')), msg);
  };

  w.test['services.misc.randomId'] = function (msg) {
    return w.assertEqual(true, /^id[a-z0-9]{10}$/.test($.randomId()), msg);
  };
})(this);
