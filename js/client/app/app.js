(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  var doc = w.document;
  var loc = doc.location;
  var state;

  $.app = function (model) {
    if (!model) {
      /* Request data from API */
      $.request('GET', loc.pathname + loc.search, $.app).send();
    } else {
      /* Render from model */
      state = model;
      doc.title = model.title || doc.title;
      $.direct(doc.body, {name: 'body', nodes: model.nodes});
    }
  };

  $.msg = function (name, message) {
    var i,
      handler,
      nodes = doc.querySelectorAll('.' + name);
    for (i = 0; i < nodes.length; i++) {
      handler = nodes[i][name];
      if (typeof handler === 'function') handler(message);
    }
  };

  function keydown(e) {
    if (e.ctrlKey && e.keyCode === 188) {
      /*  ctrl + comma */
      doc.body.getAttribute('grid') == 'show'
        ? doc.body.removeAttribute('grid')
        : doc.body.setAttribute('grid', 'show');
    } else if (!e.defaultPrevented && e.keyCode === 27) {
      /* escape */
      if (doc.body.getAttribute('grid') == 'show') {
        doc.body.removeAttribute('grid');
      } else {
        $.msg('msgEscape');
      }
    }
  }
  w.addEventListener('keydown', keydown);

  function click(e) {
    if ($.processEvent(e)) {
      var link = $.closest(doc.body, e.target, 'a[href]');
      if (link && !$.external(link)) {
        e.preventDefault();
        update(link.pathname + link.search);
      }
    }
  }
  w.addEventListener('click', click);

  function update(url) {
    $.request('GET', url, $.app).send();
    w.history.pushState($.json(state), '', url);
    w.scrollTo(0, 0);
  }

  function mousedown(e) {
    if ($.processEvent(e)) $.msg('msgEscape');
  }
  w.addEventListener('mousedown', mousedown);

  function popstate(e) {
    var model;
    try {
      model = JSON.parse(e.state);
    } catch (e) {}
    $.app();
  }
  w.addEventListener('popstate', popstate);
})(this);
