(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['app.app.base'] = function (msg) {
    $.app({nodes: {name: 'div', nodes: 'app'}});
    var expected = '<body><div>app</div></body>';
    var received = w.document.body.outerHTML;
    return w.assertEqual(expected, received, msg);
  };

  w.test['app.app.msg'] = function (msg) {
    var expected = 's1message';
    var received = '';
    var handler = function (message) {
      received += message;
    };
    var nodes = {'.s1': [{s1: handler}]};
    var qsa = w.document.querySelectorAll;
    w.document.querySelectorAll = function (selector) {
      return nodes[selector];
    };
    $.msg('s1', 's1message');
    w.document.querySelectorAll = qsa;
    return w.assertEqual(expected, received, msg);
  };
})(this);
