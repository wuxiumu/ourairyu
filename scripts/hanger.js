/*!
 * Hanger - Scaffolding of a project
 *
 * Copyright 2013, Ourai Lin
 *
 * Date: Fri Nov 29 23:57:00 2013
 */
;(function( window, $, undefined ) {

"use strict";

// Node-types
var ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = 2;
var TEXT_NODE = 3
var CDATA_SECTION_NODE = 4
var ENTITY_REFERENCE_NODE = 5
var ENTITY_NODE = 6
var PROCESSING_INSTRUCTION_NODE = 7
var COMMENT_NODE = 8
var DOCUMENT_NODE = 9
var DOCUMENT_TYPE_NODE = 10
var DOCUMENT_FRAGMENT_NODE = 11
var NOTATION_NODE = 12

// Regular expressions
var REG_NAMESPACE = /^[0-9A-Z_.]+[^_.]?$/i;

// Normal variables
var storage = {
    i18n: {}
  };

var _H = {
    /**
     * 获取 DOM 的「data-*」属性集
     * 
     * @method  data
     * @return  {Object}
     */
    data: function() {
      var args = arguments;
      var length = args.length;
      var result;

      if ( length > 0 ) {
        var target = args[0];
        var node = $(target).get(0);

        // 获取 DOM 的「data-*」属性集
        if ( node && node.nodeType === ELEMENT_NODE ) {
          result = {};

          if ( $.isPlainObject(node.dataset) ) {
            result = node.dataset;
          }
          else if ( node.outerHTML ) {
            result = constructDatasetByHTML(node.outerHTML);
          }
          else if ( node.attributes && $.isNumeric(node.attributes.length) ) {
            result = constructDatasetByAttributes(node.attributes);
          }
        }
        // 存储数据到内部/从内部获取数据
        else {
          if ( typeof target === "string" && REG_NAMESPACE.test(target) ) {
            if ( length === 1 ) {
              result = getStorageData(target);
            }
            else if ( $.isPlainObject(args[1]) ) {
              if ( !storage.hasOwnProperty(target) ) {
                storage[target] = args[1];
              }
              else {
                $.extend(storage[target], args[1]);
              }

              result = args[1];
            }
          }
          else {
            $.each(args, function(i, n) {
              $.extend(storage, n);
            });
          }
        }
      }

      return result || null;
    },

    /**
     * Internationalization
     *
     * When the first argument is a plain object, is a setter.
     * When the first argument is a string, maybe a getter.
     *
     * @method  i18n
     * @return  {Object}
     */
    i18n: function() {
      var args = arguments;
      var data = args[0];
      var result = null;

      // Save i18n data at internal object.
      if ( $.isPlainObject( data ) ) {
        $.extend( storage.i18n, data );
      }
      // Get i18n text.
      else if ( typeof data === "string" && REG_NAMESPACE.test( data ) ) {
        var pairs = args[1];

        if ( $.isPlainObject( pairs ) ) {
          result = getStorageData( "i18n." + data );
          result = (typeof result === "string" ? result : "").replace( /\{%\s*([A-Z0-9_]+)\s*%\}/ig, function( text, key ) {
            return pairs[ key ];
          });
        }
        else {
          result = "";

          $.each( args, function( i, txt ) {
            if ( typeof txt === "string" && REG_NAMESPACE.test( txt ) ) {
              var r = getStorageData( "i18n." + txt );

              result += (typeof r === "string" ? r : "");
            }
          });
        }
      }

      return result;
    }
  };

// 通过 HTML 转换
function constructDatasetByHTML( html ) {
  var dataset = {};

  $.each( (html.match( /(data(-[a-z]+)+=[^\s>]*)/ig ) || []), function( idx, attr ) {
    attr = attr.match( /data-(.*)="([^\s"]*)"/i );

    dataset[$.camelCase(attr[1])] = attr[2];
  });

  return dataset;
}

// 通过属性节点转换
function constructDatasetByAttributes( attributes ) {
  var dataset = {};

  $.each( attributes, function( idx, attr ) {
    var match;

    if ( attr.nodeType === ATTRIBUTE_NODE && (match = attr.nodeName.match( /^data-(.*)$/i )) ) {
      dataset[$.camelCase(match(1))] = attr.nodeValue;
    }
  });

  return dataset;
}

/**
 * Get data from internal storage.
 *
 * @private
 * @method  getStorageData
 * @param   ns_str {String}   Namespace string
 * @return  {String}
 */
function getStorageData( ns_str ) {
  var text = storage;

  $.each( ns_str.split("."), function( idx, part ) {
    return typeof( text = text[ part ] ) in { "string": true, "object": true };
  });

  return text;
}

window.Hanger = _H;

})( window, window.jQuery );
