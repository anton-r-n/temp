(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.main.main'] = function (msg) {
    var model = {
      content: 'content',
      title: 'App',
      menu: [['/', 'Home']],
      modal: 'modal',
    };
    var received = JSON.stringify($.Main(model));
    var expected = JSON.stringify({
      attrs: {class: 'Main'},
      name: 'div',
      nodes: [
        {widget: 'MainModal'},
        {widget: 'MainHeader', title: 'App'},
        {widget: 'MainMenu', items: [['/', 'Home']], selected: '/'},
        {widget: 'MainContent', data: 'content'},
        {widget: 'MainTooltip'},
      ],
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
