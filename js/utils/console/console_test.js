(function (w) {
  w.test = w.test || {};

  w.test['utils.console'] = function (msg) {
    return w.assertEqual(true, null != w.console, msg);
  };

  w.test['utils.console.log'] = function (msg) {
    return w.assertEqual('function', typeof w.console.log, msg);
  };

  w.test['utils.console.error'] = function (msg) {
    return w.assertEqual('function', typeof w.console.log, msg);
  };
})(this);
