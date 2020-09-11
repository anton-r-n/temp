(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  $.server = function (model) {
    var d = new w.Document('');
    $.direct(d.documentElement, html(model || ''));
    return d.toString();
  };

  function html(model) {
    return {
      name: 'html',
      attrs: {lang: model.lang || 'en'},
      nodes: [head(model), body(model)],
    };
  }

  function head(model) {
    return {
      name: 'head',
      nodes: [
        {name: 'meta', attrs: {charset: 'utf-8'}},
        {name: 'title', nodes: '' + (model.title || 'App title')},
        linkStyles(),
        linkIcon(),
      ].concat($.arr(model.links), $.arr(model.meta)),
    };
  }

  function linkStyles() {
    var commit = $.commit ? '' + $.commit : 'version';
    return {
      name: 'link',
      attrs: {
        rel: 'stylesheet',
        href: '/static/' + commit + '/app.css',
      },
    };
  }

  function linkIcon() {
    return {
      name: 'link',
      attrs: {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    };
  }

  function body(model) {
    var commit = $.commit ? '' + $.commit : 'version';
    var app_js = '/static/' + commit + '/app.js';
    var nodes = model.name === 'body' ? model.nodes : model;
    return {
      name: 'body',
      attrs: model.attrs,
      nodes: $.arr(nodes).concat([
        {name: 'script', attrs: {src: app_js}},
        {name: 'script', nodes: '$.app(' + JSON.stringify(model) + ')'},
      ]),
    };
  }
})(this);
