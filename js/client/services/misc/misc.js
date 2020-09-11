(function (w) {
  /* Namespace */
  var $ = (w.$ = w.$ || {});

  $.arr = function (a) {
    return a != null ? (Array.isArray(a) ? a : [a]) : [];
  };

  $.randomId = function () {
    return 'id' + Math.random().toString(36).substr(2, 10);
  };

  $.cls = function (v) {
    return ('' + v).replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
  };

  $.processEvent = function (e) {
    return !(
      e.defaultPrevented ||
      e.button > 0 ||
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    );
  };

  $.external = function (link) {
    return /external/.test(link.className);
  };

  /** Polyfill for Element.matches() method. */
  (function () {
    var _proto = w.Element.prototype;
    if (!_proto.matches) {
      _proto.matches =
        _proto.matchesSelector ||
        _proto.mozMatchesSelector ||
        _proto.msMatchesSelector ||
        _proto.oMatchesSelector ||
        _proto.webkitMatchesSelector;
    }
  })();

  $.closest = function (base, target, selector) {
    if (base.contains(target)) {
      while (target !== base) {
        if (target.matches(selector)) {
          return target;
        }
        target = target.parentNode;
      }
    }
  };

  function replacer(key, value) {
    if (key.substr(0, 2) !== '__') return value;
  }

  $.json = function (obj) {
    return JSON.stringify(obj, replacer);
  };
})(this);
