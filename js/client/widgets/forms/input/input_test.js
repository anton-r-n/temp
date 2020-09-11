(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.forms.input'] = function (msg) {
    var model = {id: 'id2', label: 'label2', name: 'name2'};
    var received = JSON.stringify($.FormInput(model));
    var expected = JSON.stringify({
      attrs: {class: 'FormInput'},
      name: 'div',
      nodes: {
        name: 'label',
        nodes: [
          {
            attrs: {class: 'label'},
            name: 'span',
            nodes: 'label2 ',
          },
          {
            attrs: {
              name: 'name2',
              type: 'text',
              value: '',
              class: 'text',
              id: 'id2',
            },
            name: 'input',
          },
        ],
      },
    });
    return w.assertEqual(expected, received, msg);
  };
})(this);
