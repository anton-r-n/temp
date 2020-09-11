(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.MainTooltip = function (model) {
    model = Object(model);
    var cls = $.cls('MainTooltip ' + (model.class || ''));
    return $.div(cls, model.data);
  };
})(this);
