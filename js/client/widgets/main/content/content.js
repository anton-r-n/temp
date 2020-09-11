(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.MainContent = function (model) {
    model = Object(model);
    var cls = $.cls('MainContent ' + (model.class || ''));
    return $.div(cls, model.data);
  };
})(this);
