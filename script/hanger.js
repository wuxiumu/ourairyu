/*!
 * Hanger - Scaffolding of a project
 * by Ourai Lin, ourairyu@hotmail.coms
 *
 * Full source at https://github.com/ourai/Hanger
 * Copyright (c) 2013 Ourairyu http://ourai.ws/
 */
;(function( window, $, undefined ) {

"use strict";

// Node-types
var ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = 2;
var TEXT_NODE = 3;
var CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = 12;

// Save a reference to some core methods
var ls = window.localStorage;

// Regular expressions
var REG_NAMESPACE = /^[0-9A-Z_.]+[^_.]?$/i;

// Normal variables
// var queue = {
//     events: {
//       globalMouseMove: []
//     },
//     callbacks: []
//   };

// Main objects
var _H = {};        // For internal usage
var Hanger = {};    // For external usage

var storage = {
  /**
   * 配置
   */
  config: {
    debug: true,
    platform: "",
    lang: (document.documentElement.lang ||
      document.documentElement.getAttribute("lang") ||
      navigator.language ||
      navigator.browserLanguage).split("-")[0]
  },

  /**
   * 函数
   *
   * @property  fn
   * @type      {Object}
   */
  fn: {
    prepare: [],
    ready: [],
    handler: {}
  },

  /**
   * 缓冲区，存储临时数据
   *
   * @property  buffer
   * @type      {Object}
   */
  buffer: {},

  /**
   * 对象池
   * 
   * @property  pool
   * @type      {Object}
   */
  pool: {},

  /**
   * 国际化
   *
   * @property  i18n
   * @type      {Object}
   */
  i18n: {}
};

$.extend( Hanger, {
/*
 * ======================================
 *  核心方法
 * ======================================
 */
  /**
   * 沙箱
   * 
   * @method  sandbox
   * @param {Object} setting  系统环境配置
   * @return  {Object}      （修改后的）系统环境配置
   */
  sandbox: function( setting ) {
    return _H.sandbox( setting );
  },
  
  /**
   * 获取指定的内部数据载体
   * 
   * @method  storage
   * @param {String} name   载体名称
   * @param {Boolean} isCopy  是否返回副本
   * @return  {Object}
   */
  storage: function( name, isCopy ) {
    return _H.getDataset( name, isCopy );
  },

  /**
   * Asynchronous JavaScript and XML
   * 
   * @method  ajax
   * @param {Object/String} options   请求参数列表/请求地址
   * @param {Function} succeed      请求成功时的回调函数（code > 0）
   * @param {Function} fail       请求失败时的回调函数（code <= 0）
   */
  ajax: function( options, succeed, fail ) {
    return _H.request( options, succeed, fail );
  },
  
  /**
   * Synchronous JavaScript and XML
   * 
   * @method  sjax
   * @param {Object/String} options   请求参数列表/请求地址
   * @param {Function} succeed      请求成功时的回调函数（code > 0）
   * @param {Function} fail       请求失败时的回调函数（code <= 0）
   */
  sjax: function( options, succeed, fail ) {
    return _H.request( options, succeed, fail, true );
  },
  
  /**
   * 将外部处理函数引入到沙盒中
   * 
   * @method  queue
   * @return
   */
  queue: function() {
    return _H.bindHandler.apply( _H, [].slice.call(arguments, 0) );
  },
  
  /**
   * 执行指定函数
   * 
   * @method  run
   * @param {String} funcName 函数名
   * @param {List}        函数的参数
   * @return  {Variant}     函数执行的返回值
   */
  run: function( funcName ) {
    return _H.runHandler( funcName, [].slice.call(arguments, 1) );
  },

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
   * 设置及获取国际化信息
   * 
   * @method  i18n
   * @return  {String}
   */
  i18n: function() {
    var args = arguments;
    var key = args[0];
    var result = null;

    // 批量存储
    // 调用方式：func({})
    if ( $.isPlainObject(key) ) {
      $.extend(storage.i18n, key);
    }
    else if ( REG_NAMESPACE.test(key) ) {
      var data = args[1];

      // 单个存储（用 namespace 格式字符串）
      if ( args.length === 2 && typeof data === "string" && !REG_NAMESPACE.test(data) ) {
        // to do sth.
      }
      // 取出并进行格式替换
      else if ( $.isPlainObject(data) ) {
        result = getStorageData("i18n." + key);
        result = (typeof result === "string" ? result : "").replace( /\{%\s*([A-Z0-9_]+)\s*%\}/ig, function( txt, k ) {
          return data[k];
        });
      }
      // 拼接多个数据
      else {
        result = "";

        $.each(args, function(i, txt) {
          if ( typeof txt === "string" && REG_NAMESPACE.test(txt) ) {
            var r = getStorageData("i18n." + txt);

            result += (typeof r === "string" ? r : "");
          }
        });
      }
    }

    return result;
  },

  /**
   * Get current language
   *
   * @method  lang
   * @return  {String}
   */
  lang: function() {
    return storage.config.lang;
  },

  /**
   * Save data
   */
  save: function() {
    var args = arguments;
    var key = args[0];
    var val = args[1];
    var oldVal;

    // Use localStorage
    if ( ls ) {
      if ( typeof key === "string" ) {
        oldVal = this.access(key);

        ls.setItem(key, encodeURI($.isPlainObject(oldVal) ? JSON.stringify($.extend(oldVal, val)) : val));
      }
    }
    // Use cookie
    else {
      
    }
  },

  /**
   * Access data
   */
  access: function() {
    var key = arguments[0];
    var result;

    if ( typeof key === "string" ) {
      // localStorage
      if ( ls ) {
        result = ls.getItem(key);

        if ( result !== null ) {
          result = decodeURI(result);

          try {
            result = JSON.parse(result);
          }
          catch (e) {
            result = result;
          }
        }
      }
      // Cookie
      else {

      }
    }

    return result || null;
  },

  // 把全局事件添加到队列中
  addGlobalEvent: function( event_name, handler ) {
    if ( typeof event_name === "string" && $.isFunction(handler) ) {
      if ( event_name === "mousemove" ) {
        queue.events.globalMouseMove.push( handler );
      }
    }
  }
});

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
  var result = storage;

  $.each(ns_str.split("."), function( idx, part ) {
    var rv = result.hasOwnProperty(part);

    result = result[part];

    return rv;
  });

  return result;
}

// if ( queue.events.globalMouseMove.length ) {
//   $(document).bind({
//     "mousemove": function( e ) {
//       $.each( queue.events.globalMouseMove, function( idx, func ) {
//         func.call(null, e);
//       });
//     }
//   })
// }

window.Hanger = Hanger;

})( window, window.jQuery );
