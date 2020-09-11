(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.Form = function (model) {
    model = Object(model);

    function submit(e) {
      e.preventDefault();
      if (typeof model.callback === 'function') {
        model.callback('Hi!');
      }
    }
    return {
      name: 'form',
      attrs: attrs(model.attrs || 1),
      events: {submit: submit},
      nodes: $.arr(model.nodes).map(field),
    };
  };

  function attrs(attrs) {
    return {
      class: $.cls('Form ' + (attrs.class || '')),
      enctype: attrs.enctype || 'application/json',
      method: attrs.method || 'get',
      action: attrs.action || '',
    };
  }

  function field(node) {
    return node.type == 'hidden' ? node : $.div('field', node);
  }
})(this);
