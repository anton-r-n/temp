(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.main.menu'] = function (msg) {
    var model = {
      class: 'test',
      selected: '/',
      items: [
        ['/', 'Home'],
        ['/page/', 'Page'],
      ],
    };
    var received = JSON.stringify($.MainMenu(model));
    var expected = JSON.stringify({
      attrs: {class: 'MainMenu test'},
      name: 'div',
      nodes: {
        name: 'ul',
        nodes: [
          {
            attrs: {class: 'selected'},
            name: 'li',
            nodes: {attrs: {href: '/'}, name: 'a', nodes: 'Home'},
          },
          {
            name: 'li',
            nodes: {attrs: {href: '/page/'}, name: 'a', nodes: 'Page'},
          },
        ],
      },
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
