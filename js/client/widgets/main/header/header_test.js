(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.main.header'] = function (msg) {
    var model = {class: 'test', title: 'Title'};
    var received = JSON.stringify($.MainHeader(model));
    var expected = JSON.stringify({
      attrs: {class: 'MainHeader test'},
      name: 'div',
      nodes: {
        attrs: {class: 'title', href: '/'},
        name: 'a',
        nodes: 'Title',
      },
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
