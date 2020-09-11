(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.Main = function (model) {
    model = Object(model);
    var cls = $.cls('Main ' + (model.class || ''));
    var selected = trailingSlash(w.location.pathname);
    return $.div(cls, [
      {widget: 'MainModal'},
      {widget: 'MainHeader', title: model.title},
      {widget: 'MainMenu', items: model.menu, selected: selected},
      {widget: 'MainContent', data: model.content},
      {widget: 'MainTooltip'},
    ]);
  };

  function trailingSlash(path) {
    if (path[path.length - 1] !== '/') {
      path += '/';
    }
    return path;
  }
})(this);
