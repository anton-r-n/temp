(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.MainMenu = function (model) {
    model = Object(model);
    if (!model.items) return null;
    var cls = $.cls('MainMenu ' + (model.class || ''));
    var nodes = $.arr(model.items).map(item, model.selected);
    return $.div(cls, $.node('ul', '', nodes));
  };

  function item(item) {
    item = $.arr(item);
    var cls = this === item[0] ? 'selected' : '';
    return $.node('li', cls, $.node('a', {href: item[0]}, item[1]));
  }
})(this);
