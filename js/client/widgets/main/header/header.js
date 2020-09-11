(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.MainHeader = function (model) {
    model = Object(model);
    if (!model.title) return null;
    var cls = $.cls('MainHeader ' + (model.class || ''));
    var link = $.node('a', {class: 'title', href: '/'}, model.title);
    return $.div(cls, link);
  };
})(this);
