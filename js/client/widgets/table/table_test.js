(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['widgets.table'] = function (msg) {
    var data = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    var model = {widget: 'Table', data: data};
    var received = JSON.stringify($.Table(model));
    var expected = JSON.stringify({
      attrs: {class: 'Table'},
      name: 'div',
      nodes: [
        {name: 'h3', nodes: ''},
        {
          name: 'table',
          nodes: {
            name: 'tbody',
            nodes: [
              {widget: 'TableRow', data: [1, 2, 3]},
              {widget: 'TableRow', data: [4, 5, 6]},
            ],
          },
        },
      ],
    });
    return w.assertEqual(expected, received, msg);
  };

  w.test['widgets.table.row'] = function (msg) {
    var model = {widget: 'TableRow', data: [1, 2, 3]};
    var received = JSON.stringify($.TableRow(model));
    var expected = JSON.stringify({
      name: 'tr',
      nodes: [
        {widget: 'TableCell', data: 1},
        {widget: 'TableCell', data: 2},
        {widget: 'TableCell', data: 3},
      ],
    });
    return w.assertEqual(expected, received, msg);
  };

  w.test['widgets.table.cell'] = function (msg) {
    var model = {widget: 'TableCell', data: 1};
    var received = JSON.stringify($.TableCell(model));
    var expected = JSON.stringify({name: 'td', nodes: 1});
    return w.assertEqual(expected, received, msg);
  };

  w.test['widgets.table.cell.0'] = function (msg) {
    var model = {widget: 'TableCell', data: 0};
    var received = JSON.stringify($.TableCell(model));
    var expected = JSON.stringify({name: 'td', nodes: 0});
    return w.assertEqual(expected, received, msg);
  };
})(this);
