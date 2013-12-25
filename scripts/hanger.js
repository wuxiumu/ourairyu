/*!
 * Hanger - Scaffolding of a project
 *
 * Copyright 2013, Ourai Lin
 *
 * Date: Fri Nov 29 23:57:00 2013
 */
;(function( window, $, undefined ) {

"use strict";

//  ELEMENT_NODE: 1
//  ATTRIBUTE_NODE: 2
//  TEXT_NODE: 3
//  CDATA_SECTION_NODE: 4
//  ENTITY_REFERENCE_NODE: 5
//  ENTITY_NODE: 6
//  PROCESSING_INSTRUCTION_NODE: 7
//  COMMENT_NODE: 8
//  DOCUMENT_NODE: 9
//  DOCUMENT_TYPE_NODE: 10
//  DOCUMENT_FRAGMENT_NODE: 11
//  NOTATION_NODE: 12

// Node-types
var ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = 2;

var _H = {
    /**
     * 获取 DOM 的「data-*」属性集
     * 
     * @method  data
     * @return  {Object}
     */
    data: function() {
      var target = arguments[0];

      if ( target ) {
        var node = $(target).get(0);

        if ( node.nodeType === ELEMENT_NODE ) {
          var returnValue = {};

          if ( $.isPlainObject(node.dataset) ) {
            returnValue = node.dataset;
          }
          else if ( node.outerHTML ) {
            returnValue = constructDatasetByHTML(node.outerHTML);
          }
          else if ( node.attributes && $.isNumeric(node.attributes.length) ) {
            returnValue = constructDatasetByAttributes(node.attributes);
          }
        }
      }

      return returnValue;
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

window.Hanger = _H;

})( window, window.jQuery );
