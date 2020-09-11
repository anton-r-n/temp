(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});
  w.test = w.test || {};

  w.test['services.direct.0'] = function (msg) {
    var model = {name: 'div', nodes: 0};
    var expected = '<div>0</div>';
    var received = $.direct(null, model).toString();
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.null'] = function (msg) {
    var expected = '';
    var received = $.direct().toString();
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.values'] = function (msg) {
    var model = {name: 'div', nodes: ['', 0, false, true, null, undefined]};
    var expected = '<div>0falsetrue</div>';
    var received = $.direct(null, model).toString();
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.text'] = function (msg) {
    var expected = 'some value';
    var received = $.direct(null, expected).toString();
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.tag'] = function (msg) {
    var received = $.direct(null, {name: 'div'}).outerHTML;
    var expected = '<div></div>';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.tag.name'] = function (msg) {
    var received;
    var model = {name: '1', nodes: 'content'};
    try {
      $.direct(null, model).outerHTML;
    } catch (e) {
      received = !!e;
    }
    return w.assertEqual(true, received, msg);
  };

  w.test['services.direct.attrs'] = function (msg) {
    var model = {name: 'div', attrs: {class: 'test'}, nodes: 'content'};
    var received = $.direct(null, model).outerHTML;
    var expected = '<div class="test">content</div>';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.attrs.str'] = function (msg) {
    var received;
    var model = {name: 'div', attrs: 'test', nodes: 'content'};
    try {
      $.direct(null, model).outerHTML;
    } catch (e) {
      received = !!e;
    }
    return w.assertEqual(true, received, msg);
  };

  w.test['services.direct.attrs.arr'] = function (msg) {
    var received;
    var model = {name: 'div', attrs: [1, 2, 3], nodes: 'content'};
    try {
      $.direct(null, model).outerHTML;
    } catch (e) {
      received = !!e;
    }
    return w.assertEqual(true, received, msg);
  };

  w.test['services.direct.nested'] = function (msg) {
    var nested = [{name: 'span', nodes: 'content'}, {name: 'br'}];
    var model = {name: 'div', attrs: {class: 'test'}, nodes: nested};
    var received = $.direct(null, model).outerHTML;
    var expected = '<div class="test"><span>content</span><br /></div>';
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.widget'] = function (msg) {
    var widget = 'WidgetTest';
    var model = {widget: widget, text: 'text'};
    $[widget] = function (model) {
      return {name: 'span', nodes: model.text};
    };
    var received = $.direct(null, model).outerHTML;
    var expected = '<span>text</span>';
    delete $[widget];
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.widget.invalid'] = function (msg) {
    var expected = 'Widget not found';
    var model = {widget: 'a'};
    var tmp = w.console.error;
    var received;
    w.console.error = function (err) {
      received = err;
    };
    $.direct(null, model).toString();
    w.console.error = tmp;
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.widget.error'] = function (msg) {
    var expected = 'Widget not found';
    var model = {widget: 'Widget'};
    var tmp = w.console.error;
    var received;
    w.console.error = function (err) {
      received = err;
    };
    $.direct(null, model).toString();
    w.console.error = tmp;
    return w.assertEqual(expected, received, msg);
  };

  w.test['services.direct.preserve'] = function (msg) {
    var expected = 'orig class';
    var div = w.document.createElement('div');
    div.className = expected;
    $.direct(div, {name: 'div', attrs: {id: 'id'}});
    var received = div.className;
    return w.assertEqual(expected, received, msg);
  };
})(this);
