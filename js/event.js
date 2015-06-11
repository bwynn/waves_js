// setup assert testing function
function assert(value, desc) {
  var li = document.createElement('li');
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  document.getElementById('results').appendChild(li);
}

// checks for the DOM model
if (document.addEventListener) {
  // creates a bind function using DOM model
  this.addEvent = function(elem, type, fn) {
    elem.addEventListener(type, fn, false);
    return fn;
  };

  // creates an unbind funciton using DOM model
  this.removeEvent = function(elem, type, fn) {
    elem.removeEventListener(type, fn, false);
  };
}
// checks for IE model
else if (document.attachEvent) {
  // creates a bind function using IE model
  this.addEvent = function(elem, type, fn) {
    var bound = function() {
      return fn.apply(elem, arguments);
    };
    elem.attachEvent("on" + type, bound);
    return bound;
  };
  // creates an unbind function using IE model
  this.removeEvent = function (elem, type, fn) {
    elem.detachEvent("on" + type, fn);
  };
}

function fixEvent(event) {
  // predefines often-used functions
  function returnTrue() {return true;}
  function returnFalse() {return false;}

  // tests if fixing up is needed
  if (!event || !event.stopPropagation) {
    var old = event || window.event;

    // clone the old object so that we can modify the values
    event = {};

    // clones the existing properties
    for (var prop in old) {
      event[prop] = old[prop];
    }

    // the event occurred on this element
    if (!event.target) {
      event.target = event.srcElement || document;
    }

    // handle which other element the event is related to
    event.relatedTarget = event.fromElement === event.target ?
      event.toElement :
      event.fromElement;

    // stop the default browser action
    event.preventDefault = function() {
      event.returnValue = false;
      event.isDefaultPrevented = returnTrue;
    };

    event.isDefaultPrevented = returnFalse;

    // stop the event from bubbling
    event.stopPropagation = function() {
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };

    event.isPropagationStopped = returnFalse;

    // stop the event from bubbling and executing other handlers
    event.stopImmediatePropagation = function() {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    };

    event.isImmediatePropagationStopped = returnFalse;

    // handle mouse position
    if (event.clientX != null) {
      var doc = document.documentElement, body = document.body;

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // handle key presses
    event.which = event.charCode || event.keyCode;

    // fix button for mouse clicks:
    // 0 == left; 1 == middle; 2 == right
    if (event.button != null) {
      event.button = (event.button & 1 ? 0 :
        (event.button & 4 ? 1 :
          (event.button & 2 ? 2 : 0)));
    }
  }
  // returns fixed up instance
  return event;
}

(function() {
  // establishes scoped storage
  var cache = {},
      guidCounter = 1,
      expando = "data" + (new Date).getTime();

  // defines the getData() function
  this.getData = function(elem) {
    var guid = elem[expando];
    if (!guid) {
      guid = elem[expando] = guidCounter++;
      cache[guid] = {};
    }
    return cache[guid];
  };

  // defines the removeData() function
  this.removeData = function(elem) {
    var guid = elem[expando];
    if (!guid) return;
    delete cache[guid];
    try {
      delete elem[expando];
    }
    catch (e) {
      if (elem.removeAttribute) {
        elem.removeAttribute(expando);
      }
    }
  };
})();

(function() {
  var nextGuid = 1;

  this.addEvent = function (elem, type, fn) {
    // gets the associated data block
    var data = getData(elem);

    // creates handler storage
    if(!data.handlers) data.handlers = {};

    // creates array by type
    if (!data.handlers[type])
    data.handlers[type] = [];

    // marks instrumented functions
    if(!fn.guid) fn.guid = nextGuid++;

    // adds handler to list
    data.handlers[type].push(fn);

    // creates uber-handler (dispatcher)
    if(!data.dispatcher) {
      data.disabled = false;
      data.dispatcher = function(event) {

        if (data.disabled) return;
        event = fixEvent(event);

        // calls registered handlers
        var handlers = data.handlers[event.type];
        if (handlers) {
          for (var n = 0; n < handlers.length; n++) {
            handlers[n].call(elem, event);
          }
        }
      };
    }

    // registers dispatcher
    if (data.handlers[type].length == 1) {
      if (document.addEventListener) {
        elem.addEventListener(type, data.dispatcher, false);
      }
      else if (document.attachEvent) {
        elem.attachEvent("on" + type, data.dispatcher);
      }
    }
  };
});

function tidyUp(elem, type) {
  //detects empty objects
  function isEmpty(object) {
    for (var prop in object) {
      return false;
    }
    return true;
  }

  var data = getData(elem);

  // checks for type handlers
  if (data.handlers[type].length === 0) {
    delete data.handlers[type];

    if (document.removeEventListener) {
      elem.removeEventListener(type, data.dispatcher, false);
    }
    else if (document.detachEvent) {
      elem.detachEvent("on" + type, data.dispatcher);
    }
  }

  // checks for any handlers
  if (isEmpty(data.handlers)) {
    delete data.handlers;
    delete data.dispatcher;
  }

  // checks if data is needed at all
  if (isEmpty(data)) {
    removeData(elem);
  }
}

// declares the function
this.removeEvent = function(elem, type, fn) {
  // fetches the associated element data
  var data = getData(elem);

  // short-circuits if there's nothing to do
  if (!data.handlers) return;

  // sets up utility function
  var removeType = function(t) {
    data.handlers[t] = [];
    tidyUp(elem,t);
  };

  // removes all bound handlers
  if (!type) {
    for (var t in data.handlers) removeType(t);
    return;
  }

  // finds all handlers for a type
  var handlers = data.handlers[type];
  if (!handlers) return;

  // removes all handlers for a type
  if (!fn) {
    removeType(type);
    return;
  }

  // removes one bound handler
  if (fn.guid) {
    for (var n = 0; n < handlers.length; n++) {
      if (handlers[n].guid === fn.guid) {
        handlers.splice(n--, 1);
      }
    }
  }
  tidyUp(elem, type);
};

function triggerEvent(elem, event) {
  // fetches element data and reference to parent (for bubbling)
  var elemData = getData(elem),
      parent = elem.parentNode || elem.ownerDocument;

  // if the event name was passed as a string, creates an
  // event out of it
  if (typeof event === 'string') {
    event = { type:event, target:elem };
  }
  // normalizes event properties
  event = fixEvent(event);

  // if the passed element has a dispatcher, executes
  // the established handlers
  if (elemData.dispatcher) {
    elemData.dispatcher.call(elem, event);
  }

  // unless explicitly stopped, recursively calls the function to bubble
  // the event up the DOM
  if (parent && !event.isPropagationStopped()) {
    triggerEvent(parent, event);
  }

  // if at the top of the DOM, triggers the default action unless disabled
  else if (!parent && !event.isDefaultPrevented()) {
    var targetData = getData(event.target);

    // checks if the target has default action for this event
    if(event.target[event.type]) {
      // temporarily disables event dispatching on the target
      // because we've already executed the handler
      targetData.disabled = true;

      // executes any default action
      event.target[event.type]();

      // re-enables the event dispatching
      targetData.disabled = false;
    }
  }
}

function isEventSupported(eventName) {
  // create a new <div> element that we'll perform tests upon
  // we'll delete it later
  var element = document.createElement('div'),
      isSupported;

  // tests if the event is supported by checking if a property
  // supporting the event is present in the element
  eventName = 'on' + eventName;
  isSupported = (eventName in element);

  // if the simple approach fails, creates an event-handler attribute
  // and checks if it 'sticks'
  if(!isSupported) {
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] == 'function';
  }

  // regardless of the result, wipes out the temporary element
  element = null;

  return isSupported;
}

(function() {
  var isSubmitEventSupported = isEventSupported("submit");

  // defines a utility function that we'll use to check
  // if the passed element is within a form or not
  function isInForm(elem) {
    var parent = elem.parentNode;
    while (parent) {
      if (parent.nodeName.toLowerCase() === "form") {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  // predefines a handler for clicks that will check to see if
  // submit event should piggyback on this event and triggers one
  // if so
  function triggerSubmitOnClick(e) {
    var type = e.target.type;
    if((type === "submit" || type === "image") &&
        isInForm(e.target)) {
          return triggerEvent(this, "submit");
        }
  }

  /// predefines a handler for keypresses that will check to see
  // if a submit event
  function triggerSubmitOnKey(e) {
    var type = e.target.type;
    if ((type === "text" || type === "password") &&
        isInForm(e.target) && e.keyCode === 13) {
          return triggerEvent(this, "submit");
        }
  }

  // creates a special function for binding submit events
  this.addSubmit = function(elem, fn) {
    // binds the submit handler normally, and short-circuits
    // the rest of the function if browser support is adequate
    addEvent(elem, "submit", fn);
      if (isSubmitEventSupported) return;

      // but we need to add extra handlers if we're not on a form
      // Only add the handlers for the first handler bound
      if (elem.nodeName.toLowerCase() !== "form" &&
          getData(elem).handlers.submit.length === 1) {
            addEvent(elem, "click", triggerSubmitOnClick);
            addEvent(elem, "keypress", triggerOnSubmitOnKey)
          }
    };

    this.removeSubmit = function(elem, fn) {
      // unbinds the handler normally, and exits if browser
      //support is adequate
      removeEvent(elem, "submit", fn);
      if(isEventSupported("submit")) return;

      var data = getData(elem);

      // if not a form and is the last handler to be unbound,
      // removes the piggybacking handlers
      if(elem.nodeName.toLowerCase() !== "form" &&
        !data || !data.events || !data.events.submit) {
          removeEvent(elem, "click", triggerSubmitOnClick);
          removeEvent(elem, "keypress", triggerSubmitOnKey);
        }
    };
})();

(function() {
  // tests if the browser natively supports mouseenter (and hence,
  // mouseleave) events
  if (isEventSupported("mouseenter")) {
    // adds handler that invoke the handler for browsers that support
    // the events
    this.hover = function (elem, fn) {
      addEvent(elem, "mouseenter", function() {
        fn.call(elem, "mouseenter");
      });

      addEvent(elem, "mouseleave", function() {
        fn.call(elem, "mouseleave");
      });
    };
  }
  else {
    // in nonsupporting browsers, handle mosueover and mouseout using
    // a handler that detects whether the handler should fire or not
    this.hover = function (elem, fn) {
      addEvent(elem, "mouseover", function(e) {
        withinElement(this, e, "mouseenter", fn);
      });

      addEvent(elem, "mouseout", function(e) {
        withinElement(this, e, "mouseleave", fn);
      });
    };
  }

  // internal handler that fires the original handler to mimic
  // the nonstandard behavior
  function withinElement(elem, event, type, handle) {
    // gets the element we're entering from, or exiting to
    var parent = event.relatedTarget;
    // traverses upward until it hits the top of the DOM or the
    // hovered element
    while (parent && parent != elem) {
      try {
        parent = parent.parentNode;
      }
      catch(e) {
        break;
      }
    }
    if (parent != elem) {
      handle.call(elem, type);
    }
  }
})();

(function() {
  // starts off assuming that we're not ready
  var isReady = false,
      contentLoadedHandler;

  // defines a function that triggers the ready handler only once;
  // subsequent calls will do nothing
  function ready() {
    if (!isReady) {
      triggerEvent(document, "ready");
      isReady = true;
    }
  }

  // if the DOM is ready by the time we get here, just fire the handler
  if (document.readyState === "complete") {
    ready();
  }

  // for W3C browsers, creates a handler for DOMContentLoaded event
  // that fires off the ready handler and removes itself
  if (document.addEventListener) {
    contentLoadedHandler = function() {
      document.removeEventListener(
        "DOMContentLoaded", contentLoadedHandler, false);
        ready();
    };

    // establishes the just-created handler for the DOMContentLoaded
    // event
    document.addEventListener(
      "DOMContentLoaded", contentLoadedHandler, false);
  }

  // for the IE model, creates a handler that removes itself
  // and fires the ready handler if the document readyState is complete
  else if (document.attachEvent) {
    contentLoadedHandler = function() {
      if (document.readyState === "complete") {
        document.detachEvent(
          "onreadystatechange", contentLoadedHandler);
          ready();
      }
    };

    // establishes the previous handler for onreadystatechange event.
    // will likely fire late, but it is iframe-safe
    document.attachEvent(
      "onreadystatechange", contentLoadedHandler);

    var toplevel = false;
    try {
      toplevel = window.frameElement == null;
    }
    catch (e) {
    }

    // if not in an iframe, performs scroll check
    if (document.documentElement.doScroll && toplevel) {
      doScrollCheck();
    }
  }

  // defines the scroll check function, which keeps trying to scroll
  // untill success
  function doScrollCheck() {
    if (isReady) return;
    try {
      document.documentElement.doScroll("left");
    }
    catch(error) {
      setTimeout(doScrollCheck, 1);
      return;
    }
    ready();
  }
})();
