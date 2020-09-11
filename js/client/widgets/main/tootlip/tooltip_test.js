(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.main.tooltip'] = function (msg) {
    var model = {class: 'test', data: 'data'};
    var received = JSON.stringify($.MainTooltip(model));
    var expected = JSON.stringify({
      attrs: {class: 'MainTooltip test'},
      name: 'div',
      nodes: 'data',
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
