(function (w) {
  var $ = (w.$ = w.$ || {});

  $.FormInput = function (model) {
    model = Object(model);
    var nodes =
      model.type === 'hidden'
        ? input(model)
        : $.node('label', '', [label(model), input(model)]);
    return $.div('FormInput', nodes);
  };

  function label(model) {
    return model.label ? $.span('label', model.label + ' ') : null;
  }

  function input(model) {
    var attrs = {
      name: model.name || '',
      type: model.type || 'text',
      value: model.value || '',
      class: $.cls((model.class || '') + ' text'),
    };
    if (model.id) attrs.id = model.id;
    return $.node('input', attrs);
  }
})(this);
