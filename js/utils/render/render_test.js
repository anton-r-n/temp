(function (w) {
  w.test = w.test || {};

  w.test['utils.render.document'] = function (msg) {
    var doc = new w.Document('test');
    var img = doc.createElement('img');
    img.setAttribute('src', 'url');
    doc.body.appendChild(img);
    var received = '' + doc;
    var expected = [
      '<!DOCTYPE html><html><head><meta charset="utf-8" />',
      '<title>test</title></head><body><img src="url" /></body></html>',
    ].join('');
    return w.assertEqual(expected, received, msg);
  };

  w.test['utils.render.default.ownerDocument'] = function (msg) {
    var doc = new w.Document('test');
    var received = doc === doc.body.ownerDocument;
    return w.assertEqual(true, received, msg);
  };

  w.test['utils.render.element.ownerDocument'] = function (msg) {
    var doc = new w.Document('test');
    var img = doc.createElement('img');
    var received = img.ownerDocument === doc;
    return w.assertEqual(true, received, msg);
  };

  w.test['utils.render.element'] = function (msg) {
    var doc = new w.Document('test');
    var div = doc.createElement('div');
    var expected = '<div><img /></div>';
    div.appendChild(doc.createElement('img'));
    var received = '' + div;
    return w.assertEqual(expected, received, msg);
  };

  w.test['utils.render.element.name'] = function (msg) {
    var received;
    var doc = new w.Document('test');
    try {
      doc.createElement('-div');
    } catch (e) {
      received = !!e;
    }
    return w.assertEqual(true, received, msg);
  };

  w.test['utils.render.attribute.name'] = function (msg) {
    var received;
    var doc = new w.Document('test');
    var div = doc.createElement('div');
    try {
      div.setAttribute('-', 1);
    } catch (e) {
      received = !!e;
    }
    return w.assertEqual(true, received, msg);
  };

  w.test['utils.render.escapeHTML'] = function (msg) {
    var doc = new w.Document('test');
    var img = doc.createElement('img');
    img.setAttribute('title', '<">');
    doc.body.appendChild(img);
    doc.title = '<>';
    var expected = [
      '<!DOCTYPE html><html><head><meta charset="utf-8" /><title>&lt;&gt;',
      '</title></head><body><img title="&lt;&quot;&gt;" /></body></html>',
    ].join('');
    var received = '' + doc;
    return w.assertEqual(expected, received, msg);
  };
})(this);
