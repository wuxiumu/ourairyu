/*!
 * the project global object of CIMU-EDU
 *
 * Copyright 2013, Ourai Lin
 *
 * Date: Thu Apr 25 16:51:10 2013
 */
;(function( window, $, __, undefined ) {

"use strict";

var _P = $.extend(true, {}, __);

_P.init("systemDialog", function( e, path ) {
  $(this)
    .addClass("system_dialog")
    .append("<img class=\"dialog_image\" src=\"" + path + "image/warning.png\"><div data-role=\"dialog-content\" class=\"dialog_text\" />");
});

/**
 * 将 location.hash 转换为 object
 * 
 * @private
 * @method  parseHash
 * @return  {Object}
 */
function parseHash() {
  var hash = location.hash.substring(1);
  var hashObj = {};

  $.each( hash.split("&"), function( i, str ) {
    str = str.split("=");

    if ( str[0] !== "" ) {
      hashObj[str[0]] = str[1];
    }
  });

  return hashObj;
}

/**
 * 更新 hash
 * 
 * @private
 * @method  updateHash
 * @param   {String} key
 * @param   {String} value
 * @return  {String}
 */
function updateHash( key, value ) {
  var hash = location.hash.substring(1);
  var result = "";

  // 保证 key & value 为字符串并且非空
  if ( $.type(key) === "string" && key !== "" && $.type(value) === "string" && $.trim(value) !== "" ) {
    // 键值对
    var kvGroup = key + "=" + value;

    if ( hash === "" ) {
      result = kvGroup;
    }
    else {
      var hashReg = new RegExp(key + "=\[^&\]*");

      if ( hashReg.test(hash) ) {
        result = hash.replace( hashReg, function( w ) {
          return kvGroup;
        });
      }
      else {
        result = hash + "&" + kvGroup;
      }
    }

    location.hash = result;
  }

  return result;
}

/**
 * 生成组件标识
 * 
 * @private
 * @method  generateFlag
 * @param   {jQuery DOM} j_dom
 * @param   {String} attr_name
 * @return  {String}
 */
function generateFlag( j_dom, attr_name ) {
    var flag = "";
    var selector;
    var prefix;

    // Tab
    if ( j_dom.hasClass("comp_tab_wrapper") ) {
        selector = ".comp_tab_wrapper";
        prefix = "TG_";
    }
    // Pagination
    else if ( j_dom.hasClass("pagination") ) {
        selector = ".pagination";
        prefix = "P_";
    }

    // 当所传组件单元合法时才进行处理
    if ( $.type(selector) === "string" ) {
        var idx = j_dom.index(selector) + 1;
        var attr_val = j_dom.attr( attr_name );

        if ( attr_val === undefined || attr_val === "" ) {
            flag = prefix + idx;
        }
        else {
            var temp = $(selector + "[" + attr_name + "='" + attr_val + "'']");

            // 已经存在其他具有相同标识的
            if ( temp.size() > 0 && temp.is( j_dom ) === false ) {
                flag = attr_val + "_" + idx;
            }
            else {
                flag = attr_val;
            }
        }

        // 将 hash key 与 jQuery DOM 的关系储存
        // setHashData( flag, j_dom );
    }

    return flag;
}

/**
 * 将组件与 hash 的关系储存起来
 * 
 * @private
 * @method  setHashData
 * @param   {String} key
 * @param   {jQuery DOM} j_dom
 * @return
 */
function setHashData( key, j_dom ) {
    var setName = "associatedHashKey";
    var dataSet = $("body").data( setName );

    if ( $.isPlainObject( dataSet ) === false ) {
        dataSet = {};
    }

    if ( dataSet[key] === undefined ) {
        dataSet[key] = j_dom;

        $("body").data( setName, dataSet );
    }
}

/**
 * 通过 hash key 取出相关联的组件
 * 
 * @private
 * @method  getHashData
 * @param   {String} key
 * @return  {jQuery DOM}
 */
function getHashData( key ) {
    var j_dom = null;
    var setName = "associatedHashKey";
    var dataSet = $("body").data( setName );

    if ( $.isPlainObject( dataSet ) ) {
        j_dom = dataSet[key] || null;
    }

    return j_dom;
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

$.extend( _P, {
  /**
   * Get current language
   *
   * @method  lang
   * @return  {String}
   */
  lang: function() {
    return ($("html").attr("lang") || navigator.language || navigator.browserLanguage).split("-")[0];
  },

  /**
   * 帐号
   */
  account: function() {
    var self = this;
    var prefix = "account_";
    var rv;

    if ( !$.browser.msie || $.browser.version > 8 ) {
      if ( arguments.length ) {
        var info = arguments[0];

        // 存储指定帐号信息
        if ( $.isPlainObject(info) ) {
          self.save(prefix + info.email, JSON.stringify(info));
        }
        // 批量存储帐号信息
        else if ( $.isArray(info) ) {
          $.each( info, function( n ) {
            self.account( n );
          });
        }
        // 获取指定帐号
        else if ( typeof info === "string" ) {
          var key = prefix + info;

          rv = self.access(key);

          // 更新指定帐号的信息
          if ( rv !== null && $.isPlainObject(arguments[1]) ) {
            rv = $.extend(rv, arguments[1]);

            self.save(key, rv);
          }
        }
      }
      // 获取列表
      else {
        var ls = window.localStorage;

        rv = [];

        $.each( ls, function( i ) {
          var k = ls.key(i);

          if ( k.indexOf(prefix) === 0 ) {
            rv.push(self.access(k));
          }
        });
      }
    }

    return rv || null;
  },

  /**
   * 当前用户信息
   */
  currentUser: function() {
    return /\.+/.test(arguments[0]) ? 
      this.save("current_user", arguments[0]) :
      this.account(this.access("current_user"));
  },

  /**
   * 获取用户信息
   */
  user: function( user_id, callback ) {
    var isAsync = $.isFunction(callback);
    var returnValue;

    $.ajax({
      url: "/users/user_info_json",
      data: {
          "user_id": user_id
        },
      async: isAsync,
      success: function( data ) {
        if ( isAsync ) {
          callback.call(window, data);
        }
        else {
          returnValue = data;
        }
      }
    });

    return returnValue;
  },

  /**
   * 系统提示
   *
   * @method  notification
   * @param   {String} message
   * @param   {String} type
   * @return
   */
  notification: function( message, type ) {
    var header = $(".layout-header");
    var headerExists = header.size() === 1;
    var headerHeight = header.outerHeight();
    var bread = $("#breadcrumb");
    var breadTop = parseInt(bread.css("padding-top"), 10);
    var block = $("#notification");
    var blockExists = block.size() === 1;
    var allowedState = ["success", "error"];

    if ( $.type(message) === "string" ) {
      if ( blockExists === false ) {
        if ( headerExists ) {
          header.after("<div id=\"notification\" style=\"top: " + headerHeight + "px;\"></div>");
        }
        else {
          $("body").prepend("<div id=\"notification\" style=\"top: 0;\"></div>");
        }
        
        block = $("#notification")
        blockExists = true;
      }

      block.html( message );

      if ( $.inArray(type, allowedState) > -1 ) {
        block.addClass(type);
      }

      if ( headerExists && parseInt(block.css("top"), 10) === 0 ) {
        block.css("top", (headerHeight + "px"));
      }
      else if ( parseFloat(block.css("top")) < 0 ) {
        block.css("top", "0");
      }
    }

    // 存在提示块时才执行代码
    if ( blockExists ) {
        var top = header.size() ? "0" : ("-" + block.outerHeight() + "px");

        bread.css("padding-top", (block.outerHeight() + breadTop) + "px");

        setTimeout(function() {
            bread.animate({ "padding-top": breadTop + "px" }, "normal");
            block.animate({ "top": top }, "normal", function() {
                // 移除提示块的状态 class
                $.each(allowedState, function( i, state ) {
                    block.removeClass( state );
                });
            });
        }, 3000);
    }
  },

  /**
   * 获取当前分页的页码
   * 
   * @method  page
   * @return  {Integer}
   */
  page: function() {
      var page = Number(parseHash()["p"]);

      return isNaN(page) ? 0 : page;
  },

  hash: parseHash,

  /**
   * 将（tab、pagination）组件的位置与 hash 关联
   * 
   * @method  associateHash
   * @param   {DOM} comp_unit
   * @param   {String} value
   * @return
   */
  associateHash: function( comp_unit, value ) {
      var j_dom = $(comp_unit);
      var attrKey = "data-flag";
      var selector;

      // Tab
      if ( j_dom.hasClass("comp_tab_trigger") ) {
          selector = ".comp_tab_wrapper";
      }
      // Pagination
      else if ( j_dom.attr("data-remote") !== undefined && j_dom.attr("data-page") !== undefined ) {
          selector = ".pagination";
      }

      if ( $.type(selector) === "string" ) {
          var wrp = j_dom.closest(selector);
          var flag = generateFlag(wrp, attrKey);

          // 更新容器标识
          wrp.attr( attrKey, flag );
          // 更新 hash
          updateHash( flag, value );
      }
  },

  /**
   * 激活与 hash key 相关联的组件单元
   * 
   * @method  activate
   * @param   {jQuery DOM} collection
   * @return
   */
  activate: function( collection ) {
      var hash = this.hash();

      $(collection).each(function() {
          var j_dom = $(this);
          var key = generateFlag( j_dom, "data-flag" );
          var flag = hash[key];
          var selector = "";
          var comp_unit = null;

          // Tab
          if ( j_dom.hasClass("comp_tab_wrapper") ) {
            selector = ".comp_tab_trigger";

            // 不设置默认 tab
            if ( j_dom.attr("data-setdefault") === "false" ) {
              return;
            }

            // 优先通过 hash 定位
            if ( flag !== undefined ) {
              comp_unit = $((selector + "[data-flag='" + flag + "']"), j_dom);

              if ( comp_unit.size() === 0 ) {
                comp_unit = null;
              }
            }

            if ( comp_unit === null ) {
              comp_unit = $((selector + ".current"), j_dom);

              if ( comp_unit.size() === 0 ) {
                comp_unit = $((selector + ":first"), j_dom);
              }
            }
          }
          // Pagination
          else if ( j_dom.hasClass("pagination") ) {
              if ( $.isNumeric(flag) && flag !== "1" ) {
                  var lastPage = $("[data-remote][data-page]:not(.next_page .last_page):last-child", j_dom);

                  flag *= 1;

                  // 在页码范围内
                  if ( flag > 0 && flag <= lastPage.attr("data-page") * 1 ) {
                      var url = lastPage.attr( "href" ).replace(/\&page=\d+/, function() { return "&page=" + flag; });

                      comp_unit = lastPage.clone();

                      comp_unit.hide().attr({"href": url, "data-page": flag}).appendTo( j_dom );
                  }
              }
          }

          if ( comp_unit !== null ) {
              comp_unit.click();
          }
      });
  },

  /**
   * 返回到顶部
   */
  top: function() {
    if ( $(".comp_return").size() === 0 ) {
      var text = this.i18n("w.v.backtotop");
      var btn = $("<button class=\"comp_return hidden\" type=\"button\" />");

      btn.text(text).appendTo($("body"));

      btn.click(function() {
        if ( document.body.scrollTop ) {
          $("body").animate({scrollTop: 0});
        }
        else if ( document.documentElement.scrollTop ) {
          $("html").animate({scrollTop: 0});
        }

        return false;
      });

      $(window).scroll(function(e) {
        if ( (document.body.scrollTop || document.documentElement.scrollTop) > 200 ) {
          btn.removeClass("hidden");
        }
        else {
          btn.addClass("hidden");
        }
      });
    }
  },

  /**
   * 构造接收人列表所需要的树结构 HTML
   *
   * @method  constructStudents
   * @param   {Array} data
   * @return  {String}
   */
  DL_StudentListHTML: function( data ) {
    var _inst = this,
        htmlObj = {},
        html = [];

    // 班级信息
    $.each( data, function( idx, receiver ) {
        var grade = receiver.class_grade,
            name = grade.name;

        if ( htmlObj[name] === undefined ) {
            htmlObj[name] = { info: grade, students: [] };
        }

        htmlObj[name].students.push( _inst.DL_StudentItemHTML({ "value": receiver.id, "text": receiver.name, "avatar": receiver.avatar }) + "</li>" );
    });

    // 拼装 HTML
    $.each( htmlObj, function( name, grade ) {
        var hasStudents = grade.students.length > 0;

        html.push( _inst.DL_StudentItemHTML({ "value": grade.info.id, "text": name }, hasStudents ) );

        if ( hasStudents ) {
            html.push("<ul class=\"DL-tree\" data-level=\"2\" data-tree=\"" + DoubleList.unique("tree") + "\">");
            html.push( grade.students.join("") );
            html.push("</ul>");
        }

        html.push("</li>");
    });

    return html.join("");
  },

  /**
   * 构建学生双列表中的树节点
   * 
   * @method  constructTreeNode
   * @param   {JSON} data
   * @param   {Boolean} hasChildren
   * @return  {String}
   */
  DL_StudentItemHTML: function( data, hasChildren ) {
      var node = [];

      node.push("<li");

      if ( data.avatar === undefined ) {
          node.push(" class=\"DL-expanded" + (hasChildren ? " DL-haschildren" : "") + "\"");
      }
      // 加上学生的标记
      else {
          node.push(" data-flag=\"student\"");
      }

      node.push(" data-node=\"" + DoubleList.unique("node") + "\" data-value=\"" + data.value + "\"><div class=\"DL-node\">");

      // 班级
      if ( data.avatar === undefined ) {
          node.push("<i class=\"DL-trigger\">trigger</i>");
      }
      // 学生
      else {
          node.push("<img src=\"" + data.avatar + "\" class=\"avatar_16 DL-avatar\" alt=\"" + data.text + "\">");
      }

      node.push("<span>" + data.text + "</span></div>");

      return node.join("");
  },

  /**
   * 计算 ul、ol 列表条目的行及列
   *
   * @method  calculateRowsColumns
   * @return
   */
  calculateRowsColumns: function() {
    $("[data-column-count]").each(function() {
      var list, items, itemSize, count, row;

      if ( $(this).data("calculated") !== true && this.nodeName.toLowerCase() in { "ol": true, "ul": true } ) {
        list = $(this);
        count = list.attr("data-column-count");

        if ( $.isNumeric(count) ) {
          items = list.children("li");
          itemSize = items.size();
          count *= 1;
          row = Math.ceil(itemSize/count);

          items.each(function( idx ) {
            var item = $(this);

            if ( idx < count ) {
              item.addClass("first-row");
            }

            if ( Math.ceil((idx + 1)/count) === row ) {
              item.addClass("last-row");
            }

            if ( (idx + 1) % count === 1 ) {
              item.addClass("first");
            }

            if ( row === 1 ) {
              if ( idx === itemSize - 1 ) {
                item.addClass("last");
              }
            }
            else {
              if ( (idx + 1) % count === 0 ) {
                item.addClass("last");
              }
            }
          });

          list.data("calculated", true);
        }
      }
    });
  },

  /**
   * 计算时间段
   * 
   * @method  timePeriod
   * @return
   */
  timePeriod: function() {
    var lib = this;

    $("[data-timediff]").each(function() {
      var ele = $(this);
      var baseMin = 60;
      var baseHour = 60 * baseMin;
      var baseDay = 24 * baseHour;
      var timeDiff = ele.attr("data-timediff") * 1;
      var timeWarn = ele.attr("data-timewarn") * 1;
      var time;
      var unit;
      var text;
      var isWarn;

      if ( ele.data("has_calculated") !== true ) {
        if ( timeDiff < 0 ) {
          text = lib.i18n( "w.adj.expired" );
        }
        else {
          if ( $.isNumeric(timeWarn) ) {
            isWarn = timeDiff <= timeWarn;
          }

          if ( timeDiff >= baseDay ) {
            time = Math.floor(timeDiff/baseDay);
            unit = lib.i18n( "w.n.day" );
          }
          else if ( timeDiff >= baseHour ) {
            time = Math.floor(timeDiff/baseHour);
            unit = lib.i18n( "w.n.hour" );
          }
          else if ( timeDiff >= baseMin ) {
            time = Math.floor(timeDiff/baseMin);
            unit = lib.i18n( "w.n.minute" );
          }
          else {
            time = timeDiff;
            unit = lib.i18n( "w.n.second" );
          }

          text = lib.i18n(("p.message.time_" + (ele.attr("data-timetype") || "left")), { time: time, unit: unit.toLowerCase() });

          if ( ele.hasClass("label") ) {
            var labelClass;

            if ( isWarn === undefined || isWarn === true ) {
              labelClass = "label-warning";
            }
            else if ( isWarn === false ) {
              labelClass = "label-info";
            }

            if ( labelClass !== undefined ) {
              ele.addClass( labelClass );
            }
          }
        }

        ele.html( text ).data("has_calculated", true);

        if ( ele.hasClass("transparent") ) {
          ele.animate({opacity: 1}, "fast", function() {
            ele.removeClass("transparent");
          });
        }
      }
    });
  },

  /**
   * 批量处理文字省略
   *
   * @method dotx3
   * @return
   */
  dotx3: function() {
      $("[data-ellipsis='true']").each(function() {
          var p = $(this),
              p_h = p.attr("data-dot-height"),
              p_t = p.attr("data-dot-text-expand"),
              p_t_c = p.attr("data-dot-text-collapse"),
              p_href = p.attr("data-dot-href");

          if ( p.data("has_ellipsis") !== true ) {
              if ( $.isNumeric(p_h) ) {
                  p.height(p_h);
              }

              p.wrap("<div class=\"ellipsis-wrapper\" />");

              p.dotdotdot({
                  wrap: "letter",
                  callback: function( isTruncated, orgContent ) {
                      var _p = $(this),
                          link, text;

                      if ( p_t ) {
                          text = _p.text();

                          _p.empty().append("<span>" + text + "</span>")
                          _p.after("<a class=\"ellipsis-read-more fr\" href=\"javascript:void(0);\">" + p_t + "</a>");

                          link = _p.siblings(".ellipsis-read-more");

                          if ( p_href ) {
                              link.attr("href", p_href);
                          }
                          else {
                              link.data("orgContent", orgContent.text());
                              link.data("newContent", $("span", _p).text());

                              link.click(function() {
                                  var l = $(this),
                                      pp = l.siblings("[data-ellipsis]"),
                                      s = pp.find("span"),
                                      attr = "data-dot-expanded";

                                  if ( pp.attr(attr) ) {
                                      s.text(l.data("newContent"));
                                      pp.removeAttr(attr).height(pp.attr("data-dot-height"));
                                      l.text(p_t);
                                  }
                                  else {
                                      s.text(l.data("orgContent"));
                                      pp.attr(attr, "true").css("height", "auto");
                                      l.text(p_t_c);
                                  }

                                  return false;
                              });
                          }
                      }
                  }
              });

              p.data("has_ellipsis", true);
          }
      });
  },

  grades: function( campus, callback ) {
      if ( $.isFunction( callback ) ) {
          $.get(
              "/admin/class_grades/grade_json_list.json",
              { "campus_id": campus },
              function( data ) {
                  callback( data );
              }
          );
      }
  }
});

window.CM = _P;

})( window, window.jQuery, window.Hanger );
