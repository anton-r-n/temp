(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['services.shortcuts.node'] = function (msg) {
    var received = JSON.stringify($.node('div', {id: 'abc'}));
    var expected = '{"attrs":{"id":"abc"},"name":"div"}';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.shortcuts.div'] = function (msg) {
    var received = JSON.stringify($.div({id: 'abc'}));
    var expected = '{"attrs":{"id":"abc"},"name":"div"}';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.shortcuts.span'] = function (msg) {
    var received = JSON.stringify($.span({id: 'abc'}));
    var expected = '{"attrs":{"id":"abc"},"name":"span"}';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.shortcuts.svg'] = function (msg) {
    var received = JSON.stringify($.svg('path', {d: '0,0'}));
    var expected =
      '{"attrs":{"d":"0,0"},"name":"path",' +
      '"xmlns":"http://www.w3.org/2000/svg"}';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.shortcuts.class.str'] = function (msg) {
    var received = JSON.stringify($.div('abc'));
    var expected = '{"attrs":{"class":"abc"},"name":"div"}';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.shortcuts.class.list'] = function (msg) {
    var received = JSON.stringify($.div(['ab', 'c']));
    var expected = '{"attrs":{"class":"ab c"},"name":"div"}';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.shortcuts.nodes'] = function (msg) {
    var received = JSON.stringify($.div('', 'abc'));
    var expected = '{"name":"div","nodes":"abc"}';
    return w.assertEqual(expected, received, msg);
  };
})(this);
