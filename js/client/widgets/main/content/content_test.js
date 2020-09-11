(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.main.content'] = function (msg) {
    var model = {class: 'test', data: 'data'};
    var received = JSON.stringify($.MainContent(model));
    var expected = JSON.stringify({
      attrs: {class: 'MainContent test'},
      name: 'div',
      nodes: 'data',
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
