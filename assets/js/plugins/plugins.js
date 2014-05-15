// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

/*
// usage:
$(window).smartresize(function(){
  // code that takes it easy...
});
*/

(function($){

  $.fn.wrapChildren = function(options) {

    var options = $.extend({
      childElem : undefined,
      sets : 1,
      wrapper : '<div>'
      }, options || {});

    if (options.childElem === undefined) return this;

    return this.each(function() {
      var elems = $(this).children(options.childElem), arr = [];

      elems.each(function(i,value) {
        arr.push(value);
        if (((i + 1) % options.sets === 0) || (i === elems.length -1)) {
          var set = $(arr);
          arr = [];
          set.wrapAll($(options.wrapper));
        }
      });
    });
  }

})(jQuery);

/*
childElem - the element nodeType of the immediate children to wrap
sets - how you want to group the child elements. For example, sets of 3 in your case. Default is 1
wrapper - the element to wrap the child elements in. default is
<div>

Usage: ` $(function() {

$('#entries').wrapChildren({ childElem : 'a' , sets: 3});

});
*/

/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Easy element scrolling using jQuery.
 * @author Ariel Flesler
 * @version 1.4.12
 */

;(function(plugin) {
    // AMD Support
    // if (typeof define === 'function' && define.amd) {
    //     define(['jquery'], plugin);
    // } else {
    //     plugin(jQuery);
    // }
    plugin(jQuery);
}(function($) {

  var $scrollTo = $.scrollTo = function( target, duration, settings ) {
    return $(window).scrollTo( target, duration, settings );
  };

  $scrollTo.defaults = {
    axis:'xy',
    duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
    limit:true
  };

  // Returns the element that needs to be animated to scroll the window.
  // Kept for backwards compatibility (specially for localScroll & serialScroll)
  $scrollTo.window = function( scope ) {
    return $(window)._scrollable();
  };

  // Hack, hack, hack :)
  // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
  $.fn._scrollable = function() {
    return this.map(function() {
      var elem = this,
        isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

        if (!isWin)
          return elem;

      var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

      return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
        doc.body :
        doc.documentElement;
    });
  };

  $.fn.scrollTo = function( target, duration, settings ) {
    if (typeof duration == 'object') {
      settings = duration;
      duration = 0;
    }
    if (typeof settings == 'function')
      settings = { onAfter:settings };

    if (target == 'max')
      target = 9e9;

    settings = $.extend( {}, $scrollTo.defaults, settings );
    // Speed is still recognized for backwards compatibility
    duration = duration || settings.duration;
    // Make sure the settings are given right
    settings.queue = settings.queue && settings.axis.length > 1;

    if (settings.queue)
      // Let's keep the overall duration
      duration /= 2;
    settings.offset = both( settings.offset );
    settings.over = both( settings.over );

    return this._scrollable().each(function() {
      // Null target yields nothing, just like jQuery does
      if (target == null) return;

      var elem = this,
        $elem = $(elem),
        targ = target, toff, attr = {},
        win = $elem.is('html,body');

      switch (typeof targ) {
        // A number will pass the regex
        case 'number':
        case 'string':
          if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
            targ = both( targ );
            // We are done
            break;
          }
          // Relative/Absolute selector, no break!
          targ = win ? $(targ) : $(targ, this);
          if (!targ.length) return;
        case 'object':
          // DOMElement / jQuery
          if (targ.is || targ.style)
            // Get the real position of the target
            toff = (targ = $(targ)).offset();
      }

      var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

      $.each( settings.axis.split(''), function( i, axis ) {
        var Pos = axis == 'x' ? 'Left' : 'Top',
          pos = Pos.toLowerCase(),
          key = 'scroll' + Pos,
          old = elem[key],
          max = $scrollTo.max(elem, axis);

        if (toff) {// jQuery / DOMElement
          attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

          // If it's a dom element, reduce the margin
          if (settings.margin) {
            attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
            attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
          }

          attr[key] += offset[pos] || 0;

          if(settings.over[pos])
            // Scroll to a fraction of its width/height
            attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
        } else {
          var val = targ[pos];
          // Handle percentage values
          attr[key] = val.slice && val.slice(-1) == '%' ?
            parseFloat(val) / 100 * max
            : val;
        }

        // Number or 'number'
        if (settings.limit && /^\d+$/.test(attr[key]))
          // Check the limits
          attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

        // Queueing axes
        if (!i && settings.queue) {
          // Don't waste time animating, if there's no need.
          if (old != attr[key])
            // Intermediate animation
            animate( settings.onAfterFirst );
          // Don't animate this axis again in the next iteration.
          delete attr[key];
        }
      });

      animate( settings.onAfter );

      function animate( callback ) {
        $elem.animate( attr, duration, settings.easing, callback && function() {
          callback.call(this, targ, settings);
        });
      };

    }).end();
  };

  // Max scrolling position, works on quirks mode
  // It only fails (not too badly) on IE, quirks mode.
  $scrollTo.max = function( elem, axis ) {
    var Dim = axis == 'x' ? 'Width' : 'Height',
      scroll = 'scroll'+Dim;

    if (!$(elem).is('html,body'))
      return elem[scroll] - $(elem)[Dim.toLowerCase()]();

    var size = 'client' + Dim,
      html = elem.ownerDocument.documentElement,
      body = elem.ownerDocument.body;

    return Math.max( html[scroll], body[scroll] )
       - Math.min( html[size]  , body[size]   );
  };

  function both( val ) {
    return $.isFunction(val) || typeof val == 'object' ? val : { top:val, left:val };
  };

    // AMD requirement
    return $scrollTo;
}));
