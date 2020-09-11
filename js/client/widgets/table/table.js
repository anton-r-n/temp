(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  /* Widget */
  $.Table = function (model) {
    model = Object(model);
    var rows = $.arr(model.data).map(function (r) {
      return {widget: 'TableRow', data: r, editable: model.editable};
    });
    var tbody = $.node('tbody', '', rows);
    var table = $.node('table', '', tbody);
    var caption = $.node('h3', '', model.caption || '');
    return $.div('Table', [caption, table]);
  };

  /* Widget */
  $.TableRow = function (model) {
    model = Object(model);
    var cells = $.arr(model.data).map(function (d) {
      return {widget: 'TableCell', data: d};
    });
    if (model.editable) {
      function edit(e) {
        if ($.processEvent(e)) $.msg('msgModal', editForm(model));
      }
      var button = $.node('button', 'button', 'Edit');
      button.events = {click: edit};
      cells.push({widget: 'TableCell', data: button});
    }
    return $.node('tr', '', cells);
  };

  /* Widget */
  $.TableCell = function (model) {
    model = Object(model);
    return $.node('td', '', model.data);
  };

  function editForm(model) {
    var data = model.data;
    var form = {widget: 'Form'};
    form.attrs = {
      enctype: 'application/json',
      method: 'post',
      class: 'block',
    };
    form.callback = function (data) {
      $.msg('msgEscape');
      console.log('-- cb', data);
    };
    form.nodes = data.slice(1).map(function (value, idx) {
      return {
        widget: 'FormInput',
        label: 'Field',
        name: 'field' + idx,
        value: value,
      };
    });
    form.nodes.push({
      widget: 'FormInput',
      type: 'hidden',
      name: 'id',
      value: data[0],
    });
    form.nodes.push({
      name: 'div',
      nodes: {
        name: 'input',
        attrs: {
          class: 'button',
          type: 'submit',
          value: 'Save',
        },
      },
    });
    return form;
  }
})(this);
