(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.main.modal'] = function (msg) {
    var received = JSON.stringify($.MainModal());
    var expected = JSON.stringify({
      attrs: {class: 'MainModal msgModal msgEscape'},
      name: 'div',
      props: {},
      events: {},
      nodes: [],
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
