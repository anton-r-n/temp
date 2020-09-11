(function (w) {
  var $ = (w.$ = w.$ || {});
  var svgns = 'http://www.w3.org/2000/svg';
  var _;

  /* Accept classes as string or list of strings */
  function expand(attrs) {
    if (!attrs) return _;
    if (typeof attrs === 'string') return {class: attrs};
    if (attrs instanceof Array) return {class: attrs.join(' ')};
    return attrs;
  }

  /* @constructor */
  function Node(name, attrs, props, events, nodes, xmlns, _) {
    _ = this;
    _.attrs = expand(attrs);
    _.name = name;
    _.props = props;
    _.events = events;
    _.nodes = nodes;
    _.xmlns = xmlns;
  }

  $.node = function (name, attrs, nodes) {
    return new Node(name, attrs, _, _, nodes);
  };

  $.div = function (attrs, nodes) {
    return new Node('div', attrs, _, _, nodes);
  };

  $.span = function (attrs, nodes) {
    return new Node('span', attrs, _, _, nodes);
  };

  $.svg = function (name, attrs, nodes) {
    return new Node(name, attrs, _, _, nodes, svgns);
  };
})(this);
