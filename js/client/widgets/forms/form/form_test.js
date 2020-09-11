(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.forms.form'] = function (msg) {
    var received = JSON.stringify($.Form());
    var expected = JSON.stringify({
      name: 'form',
      attrs: {
        class: 'Form',
        enctype: 'application/json',
        method: 'get',
        action: '',
      },
      events: {},
      nodes: [],
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
