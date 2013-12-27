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
// var storage = {
//     i18n: {}
//   };
// var queue = {
//     events: {
//       globalMouseMove: []
//     },
//     callbacks: []
//   };

// Main objects
var _H = {};        // For internal usage
var Hanger = {};    // For external usage

_H.storage = {
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

$.extend( _H, {
/* ==================================
 * 核心方法
 * ================================== */
  /**
   * 全局配置
   * 
   * @private
   * @method    setup
   */
  setup: function() {},

  /**
   * 克隆对象并返回副本
   * 
   * @private
   * @method  clone
   * @param {Object} source 源对象，只能为数组或者纯对象
   * @return  {Object}
   */
  clone: function( source ) {},

  /**
   * 沙箱运行环境（只能运行一次）
   * 
   * @private
   * @method  sandbox
   * @param {Object} setting  系统环境配置
   * @return  {Object/Boolean}
   */
  sandbox: function( setting ) {},

  /**
   * 请求处理
   * 
   * @private
   * @method  request
   * @param {Object/String} options   请求参数列表/请求地址
   * @param {Function} succeed      请求成功时的回调函数（code > 0）
   * @param {Function} fail       请求失败时的回调函数（code <= 0）
   * @param {Boolean} synch       是否为同步，默认为异步
   * @return  {Object} jqXHR
   */
  request: function( options, succeed, fail, synch ) {},

  /**
   * 将处理函数绑定到内部命名空间
   * 
   * @private
   * @method  bindHandler
   * @return  {Undefined}
   */
  bindHandler: function() {},

  /**
   * 执行指定函数
   * 
   * @private
   * @method  runHandler
   * @param {String} name 函数名
   * @param {List}      参数
   * @return  {Variant}   返回值
   */
  runHandler: function( func_name ) {},

  /**
   * 将函数加到指定队列中
   * 
   * @private
   * @method  pushHandler
   * @param {Function} handler  函数
   * @param {String} queue    队列名
   */
  pushHandler: function( handler, queue ) {},

  /**
   * 获取指定的数据集
   * 
   * @private
   * @method  getDataset
   * @param {String} name   数据集名称
   * @param {Boolean} isCopy  是否返回副本
   * @return  {Object}
   */
  getDataset: function( name, copy ) {},

  /**
   * 设置及获取国际化信息
   * 
   * @private
   * @method  internationalization
   * @return  {Object}
   */
  Internationalization: function() {}
});

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
  var text = storage;

  $.each( ns_str.split("."), function( idx, part ) {
    return typeof( text = text[ part ] ) in { "string": true, "object": true };
  });

  return text;
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
