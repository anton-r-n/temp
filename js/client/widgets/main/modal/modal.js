(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  var stack = [];

  /* Widget */
  $.MainModal = function (model) {
    model = Object(model);

    function open(data) {
      stack.push(data);
      $.direct(model.__ref, model);
    }

    function close(e) {
      stack.pop();
      $.direct(model.__ref, model);
    }

    var node = $.div(
      'MainModal msgModal msgEscape',
      stack.map(layer, {click: close})
    );
    node.props = {msgModal: open, msgEscape: close};
    node.events = {
      mousedown: function (e) {
        if ($.processEvent(e)) e.stopPropagation();
      },
    };
    return node;
  };

  function layer(data) {
    var button = $.div('buttonClose');
    button.events = this;
    var container = $.div('container', [button, data]);
    return $.div('layer', [$.div('shadow'), container]);
  }
})(this);
