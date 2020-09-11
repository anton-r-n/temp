(function (w) {
  w.test = w.test || {};

  w.assertEqual = function (a, b, msg) {
    if (a !== b) {
      w.console.log('fail', msg);
      w.console.log('--', 'Expected equal:');
      w.console.log('--', a);
      w.console.log('--', b);
      return false;
    }
    w.console.log('ok  ', msg);
    return true;
  };

  function pad(num) {
    var c = '' + num;
    while (c.length < 4) c = ' ' + c;
    return c;
  }

  var filter = (function () {
    if (typeof process !== 'undefined') return process.argv[2];
    else if (w.arguments) return w.arguments[0];
  })();

  w.runTests = function () {
    var k,
      total = 0,
      passed = 0,
      start = new Date();

    for (k in w.test)
      if (!filter || k.indexOf(filter) > -1) {
        total++;
        passed += w.test[k](pad(total) + ' ' + k);
      }

    w.console.log(passed === total ? '[PASSED]' : '[FAILED]');
    w.console.log('Tests:', total, 'time:', new Date() - start, 'ms');
  };
})(this);
