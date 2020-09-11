(function (w) {
  var define = Object.defineProperty;

  /* prettier-ignore */
  var emptyTags =
    'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'
    .split(',');

  function noop() {}

  function toString() {
    var k;
    var tagName = this.nodeName.toLowerCase();
    var result = '<' + tagName;
    for (k in this.attributes) {
      result += ' ' + k + '="' + escapeHtml(this.attributes[k]) + '"';
    }
    if (emptyTags.indexOf(tagName) > -1) {
      return result + ' />';
    }
    return result + '>' + this.childNodes.join('') + '</' + tagName + '>';
  }

  function Document(title) {
    this._title = title || '';
    this._html = this.documentElement = new Element('html', this);
    this.head = this._html.appendChild(new Element('head', this));
    this.body = this._html.appendChild(new Element('body', this));
    this.head.appendChild(metaElt(this));
    this.head.appendChild(titleElt(this._title, this));
  }

  function metaElt(doc) {
    var meta = new Element('meta', doc);
    meta.setAttribute('charset', 'utf-8');
    return meta;
  }

  function titleElt(value, doc) {
    var title = new Element('title', doc);
    title.appendChild(new TextNode(value, doc));
    return title;
  }

  Document.prototype = {
    activeElement: {blur: noop},
    createElement: createElement,
    createElementNS: createElement,
    createEvent: noop,
    createTextNode: createTextNode,
    nodeName: '#document',
    nodeType: 9,
    toString: documentToString,
  };

  Object.defineProperty(Document.prototype, 'title', {
    get: function () {
      return this._title;
    },
    set: function (value) {
      var head = _findNode(this._html, 'head');
      var title = _findNode(head, 'title');
      this._title = valStr(value) || '';
      if (title) {
        title.replaceChild(new TextNode(this._title), title.firstChild);
      }
      return this._titleStr;
    },
  });

  function _findNode(node, name) {
    var nodes = (node && node.childNodes) || [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName === name) return nodes[i];
    }
  }

  function createElement(tagName) {
    return new Element(tagName, this);
  }

  function createTextNode(data) {
    return new TextNode(data, this);
  }

  function documentToString() {
    return '<!DOCTYPE html>' + this.documentElement;
  }

  function escapeScript(str) {
    return str.replace(/\\/g, '\\\\').replace(/\//g, '\\/');
  }

  function TextNode(data, doc) {
    this.nodeType = 3;
    this.nodeValue = data;
    this._document = doc;
  }

  var textProto = (TextNode.prototype = {
    toString: function () {
      var parent = this.parentNode;
      var script = parent && parent.nodeName === 'script';
      return (script ? escapeScript : escapeHtml)(this.nodeValue);
    },
  });

  define(textProto, 'ownerDocument', {
    get: function () {
      return this._document;
    },
  });

  function Element(name, doc) {
    this.nodeName = nameStr(name);
    this.attributes = {};
    this.childNodes = [];
    this.nodeType = 1;
    this._document = doc;
  }

  var eltProto = (Element.prototype = {
    addEventListener: noop,
    removeEventListener: noop,
    setAttribute: setAttribute,
    removeAttribute: removeAttribute,
    appendChild: appendChild,
    removeChild: removeChild,
    replaceChild: replaceChild,
    insertBefore: insertBefore,
    toString: toString,
    valueOf: toString,
  });

  define(eltProto, 'ownerDocument', {
    get: function () {
      return this._document;
    },
  });

  define(eltProto, 'outerHTML', {
    get: function () {
      return this.toString();
    },
  });

  define(eltProto, 'innerHTML', {
    get: function () {
      return this.childNodes.join('');
    },
  });

  define(eltProto, 'firstChild', {
    get: function () {
      return this.childNodes[0];
    },
  });

  define(eltProto, 'lastChild', {
    get: function () {
      return this.childNodes[this.childNodes.length - 1];
    },
  });

  define(eltProto, 'className', {
    get: function () {
      return '' + this.attributes['class'];
    },
    set: function (value) {
      this.attributes['class'] = '' + value;
    },
  });

  define(eltProto, 'href', {
    get: function () {
      return this.nodeName === 'a' ? this.attributes['href'] : this._href;
    },
    set: function (value) {
      value = valStr(value);
      if (this.nodeName === 'a') {
        this.attributes['href'] = value;
      } else {
        this._href = value;
      }
      return value;
    },
  });

  function nameStr(v) {
    v = '' + v;
    if (!/^[:_a-z][:_\-a-z0-9]{0,127}$/i.test(v)) {
      throw 'InvalidCharacterError: String contains an invalid character';
    }
    return v;
  }

  function valStr(v) {
    return ('' + v).replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
  }

  function escapeHtml(v) {
    return ('' + v)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Sets the value of an attribute on the specified element. If the attribute
   * already exists, the value is updated; otherwise a new attribute is added
   * with the specified name and value.
   */
  function setAttribute(k, v) {
    this.attributes[nameStr(k)] = valStr(v);
  }

  /**
   * Removes the attribute with the specified name from the element.
   */
  function removeAttribute(k) {
    delete this.attributes['' + k];
  }

  /**
   * Adds a node to the end of the list of children of a specified parent node.
   * If the node already has a parent, the node is first removed, then appended
   * at the new position.
   */
  function appendChild(childNode) {
    if (childNode.parentNode) {
      childNode.parentNode.removeChild(childNode);
    }
    childNode.parentNode = this;
    childNode._document = this.ownerDocument;
    this.childNodes.push(childNode);
    return childNode;
  }

  /**
   * Removes a child node from the DOM and returns the removed node.
   */
  function removeChild(childNode) {
    var idx = this.childNodes.indexOf(childNode);
    if (idx > -1) {
      this.childNodes.splice(idx, 1)[0];
      childNode.parentNode = null;
    }
    return childNode;
  }

  /**
   * Replaces a child node within the given (parent) node.
   */
  function replaceChild(newChild, oldChild) {
    if (newChild !== oldChild) {
      var idx = this.childNodes.indexOf(oldChild);
      if (idx > -1) {
        this.childNodes[idx] = newChild;
        newChild.parentNode = this;
        oldChild.parentNode = null;
      }
    }
    return oldChild;
  }

  /**
   * Inserts a node before a reference node as a child of a specified parent
   * node. If the given node already exists in the document, insertBefore()
   * moves it from its current position to the new position.
   */
  function insertBefore(newNode, refNode) {
    if (newNode !== refNode) {
      if (newNode.parentNode) {
        newNode.parentNode.removeChild(newNode);
      }
      var idx = this.childNodes.indexOf(refNode);
      if (idx > -1) {
        this.childNodes.splice(idx, 0, newNode);
        newNode.parentNode = this;
      } else {
        this.appendChild(newNode);
      }
    }
    return newNode;
  }

  function XMLHttpRequest() {}

  XMLHttpRequest.prototype = {
    abort: noop,
    getAllResponseHeaders: noop,
    getResponseHeader: noop,
    open: noop,
    overrideMimeType: noop,
    send: noop,
    setRequestHeader: noop,
  };

  /* Export */
  if (!w.location) w.location = {pathname: '/'};
  if (!w.document) w.document = new Document();
  if (!w.Document) w.Document = Document;
  if (!w.Element) w.Element = Element;
  if (!w.HTMLElement) w.HTMLElement = Element;
  if (!w.XMLHttpRequest) w.XMLHttpRequest = XMLHttpRequest;
  if (!w.addEventListener) w.addEventListener = noop;
  if (!w.removeEventListener) w.removeEventListener = noop;
  if (!w.scrollTo) w.scrollTo = noop;
  if (!w.setTimeout) w.setTimeout = noop;
  if (!w.setInterval) w.setInterval = noop;
})(this);
