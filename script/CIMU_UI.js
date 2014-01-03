;(function( window, $, _P, undefined ) {

$.extend( _P, {
  /**
   * 自定义提示信息卡片
   *
   * @method  tooltip
   * @return
   */
  tooltip: function() {
    // 非 IE8 以下浏览器才有功能
    if ( !$.browser.msie || $.browser.version > 7 ) {
      // tooltip 存储数据集合
      CM.data("tooltip", {user: [], title: []});

      // 初始化提示信息
      // initTooltip();
      // 初始化人物卡片
      initProfile();
      // 自定义 HTML
      initSelfHTML();
    }
  },

  drag: function() {
    var itemPointTop;               // 鼠标位置到被托起条目上边界的距离
    var lastedY;                    // 鼠标位置的上一次纵坐标
    var dir;

    $("[data-draggable='true'] > li").live({
      "mousedown": function( e ) {
        var t = $(e.target);

        if ( !t.is(".button-admin") ) {
          $(this).addClass("dragging");

          itemPointTop = e.pageY - $(this).offset().top;
          lastedY = e.pageY;
        }
      }
    });

    $(document).bind({
      "mousemove": function( e ) {
        var d = $(".dragging");

        if ( d.size() ) {
          var list = $("[data-draggable='true']");
          var boundaryTop = list.offset().top;

          dir = e.pageY < lastedY ? -1 : 1;     // -1 为向上移动；1 为向下移动
          lastedY = e.pageY;

          if ( e.pageY > boundaryTop && e.pageY < (boundaryTop + list.outerHeight() - d.outerHeight() + itemPointTop) ) {
            // 添加占位
            if ( !$(".drag-placeholder").size() ) {
              $("body").addClass("txt-forbid");

              d
                .css({
                  "position": "absolute",
                  "z-index": "999999"
                })
                .after("<li class=\"drag-placeholder content-list-item\" />")
            }

            // 被拖动元素的位置
            d.css("top", (e.pageY - boundaryTop - itemPointTop));

            moveElement( e.pageY, dir, itemPointTop );
          }
        }
      },
      "mouseup": function( e ) {
        resetDrag();
        saveData();
      }
    });
  }
});

/**
 * 卡片通用 HTML 外套
 */
function cardWrapper() {
  var card = $("<div class=\"CM-tooltip\" />");

  card.append("<div class=\"card_wrapper\" />").appendTo($("body"));

  return card;
}

/**
 * 卡片显示位置
 */
function cardPosition( trigger, card ) {
  card.css({
      "visibility": "hidden",
      "display": "block",
      "z-index": "-99999"
    });

  var pos = {x: 0, y: 0};
  var offset = trigger.offset();
  var card_h = card.outerHeight(true);
  var card_w = card.outerWidth(true);

  if ( offset.top < card_h ) {
    pos.y = offset.top + trigger.outerHeight(true);

    card.addClass("dir-t");
  }
  else {
    pos.y = offset.top - card_h;

    card.removeClass("dir-t");
  }

  pos.x = offset.left - parseFloat(card.css("padding-left"));

  card.css({
      "display": "none",
      "visibility": "visible",
      "z-index": "99999"
    });

  return pos;
}

/**
 * 初始化提示信息
 */
function initTooltip() {
  initTooltipHTML();

  $("[data-role='tooltip'][data-types='title'], [title]").live({
    "mouseover": function() {
      var trigger = $(this);
      var text = trigger.attr("title");

      trigger.removeAttr("title");

      // 非提示信息卡片则不往下执行
      if ( trigger.is("[data-role='tooltip']") && !trigger.is("[data-types='title']") ) {
        return false;
      }

      var tooltip = $(".comp_tooltip");
      var container = $(".card_tooltip", tooltip);
      var position = cardPosition(trigger, tooltip);

      trigger.attr("data-hover", true);

      setTimeout(function() {
        if ( trigger.attr("data-hover") ) {
          // 无 title 属性时
          if ( text === undefined ) {
            container.text(trigger.data("tooltip_title"));
          }
          // 有 title 属性时
          else {
            container.text(text);
            trigger.data("tooltip_title", text).attr({"data-role": "tooltip", "data-types": "title"});
          }

          tooltip
            .css({ top: position.y + "px", left: position.x + "px" })
            .fadeIn();
        }
      }, 300);
    },
    "mouseout": function() {
      $(this).removeAttr("data-hover");
      $(".comp_tooltip").fadeOut();
    }
  });
}

function initTooltipHTML() {
  var cls = "comp_tooltip";

  if ( $("." + cls).size() === 0 ) {
    $(".card_wrapper", cardWrapper().addClass(cls)).append("<div class=\"card_tooltip\" />");
  }
}

/**
 * 初始化人物卡片
 */
function initProfile() {
  initProfileHTML();

  $(document).bind({
    "mousemove": function( e ) {
      var srcEle = $(e.target);
      var trigger = srcEle.closest("[data-role='tooltip'][data-user]");
      var card = $(".comp_profile");

      if ( trigger.size() ) {
        if ( card.css("display") === "none" && (srcEle.is(trigger) || $.contains(trigger[0], srcEle[0])) ) {
          fillUserInfo(card, getUserInfo(trigger.attr("data-user")));

          var position = cardPosition(trigger, card);

          card
            .css({ top: position.y - 10 + "px", left: position.x - 35 + "px" })
            .fadeIn();
        }
      }
      else if ( card.css("display") !== "none" ) {
        if ( window.profile_timer === undefined || $.contains(card[0], e.target) ) {
          if ( $.contains(card[0], e.target) ) {
            clearTimeout(window.profile_timer);
            window.profile_timer = undefined;
          }
          else {
            window.profile_timer = setTimeout(function() {
              if ( $.contains(card[0], e.target) ) {
                window.profile_timer = undefined;
              }
              else {
                card.fadeOut(400, function() {
                  window.profile_timer = undefined;
                });
              }
            }, 300);
          }
        }
      }
    }
  });
}

function initProfileHTML() {
  var cls = "comp_profile";
  var card = $("." + cls);

  if ( card.size() === 0 ) {
    card = cardWrapper().addClass(cls);

    $(".card_wrapper", card).append("<div class=\"card_profile\" /><div class=\"card_operation\" />");

    var areaInfo = $(".card_profile", card);

    areaInfo.append("<a class=\"avatar_link\"><img class=\"avatar\"></a>");
    areaInfo.append("<a class=\"name_link\" />");
    areaInfo.append("<div class=\"class_info\"><span class=\"profile_class\" /><span class=\"profile_id\" /></div>")

    $(".card_operation", card).append("<button class=\"LG_Button\" type=\"button\"><i>+</i><span>Follow</span></button>");
  }
}

/**
 * 自定义 HTML
 */
function initSelfHTML() {
  initSelfHTMLCard();

  $(document).bind({
    "mousemove": function( e ) {
      var srcEle = $(e.target);
      var trigger = srcEle.closest("[data-role='tooltip'][data-html]");
      var card = $(".comp_selfhtml");

      if ( trigger.size() ) {
        if ( card.css("display") === "none" && (srcEle.is(trigger) || $.contains(trigger[0], srcEle[0])) ) {
          $(".card_html", card).html(trigger.attr("data-html"));

          var position = cardPosition(trigger, card);

          card
            .css({ top: position.y - 10 + "px", left: position.x - 35 + "px" })
            .fadeIn();
        }
      }
      else if ( card.css("display") !== "none" ) {
        if ( window.selfhtml_timer === undefined || $.contains(card[0], e.target) ) {
          if ( $.contains(card[0], e.target) ) {
            clearTimeout(window.selfhtml_timer);
            window.selfhtml_timer = undefined;
          }
          else {
            window.selfhtml_timer = setTimeout(function() {
              if ( $.contains(card[0], e.target) ) {
                window.selfhtml_timer = undefined;
              }
              else {
                card.fadeOut(400, function() {
                  window.selfhtml_timer = undefined;
                });
              }
            }, 300);
          }
        }
      }
    }
  });
}

function initSelfHTMLCard() {
  var cls = "comp_selfhtml";

  if ( $("." + cls).size() === 0 ) {
    $(".card_wrapper", cardWrapper().addClass(cls)).append("<div class=\"card_html\" />");
  }
}

/**
 * 获取用户信息
 */
function getUserInfo( user_id ) {
  var users = $("body").data("users");
  var info;

  if ( !users ) {
    $("body").data("users", []);
    users = $("body").data("users")
  }

  info = users[user_id];

  if ( !info ) {
    info = _P.user(user_id);
    users[user_id] = info;
    $("body").data("users", users);
  }

  return info || null;
}

/**
 * 填充用户卡片的信息
 */
function fillUserInfo( card, user_info ) {
  if ( user_info ) {
    $(".avatar_link, .name_link", card).attr("href", user_info.home_page);
    $(".name_link", card).text( user_info.name );

    if ( user_info.class_grade ) {
      $(".profile_class", card).text( user_info.class_grade );
    }

    if ( user_info.serial_number ) {
      $(".profile_id", card).text( user_info.serial_number );
    }

    $(".avatar", card).attr({ "src": user_info.avatar_url, "alt": user_info.name })
  }
}

function moveElement( y, dir, itemPointTop ) {
  var d = $(".dragging");
  var p = $(".drag-placeholder");
  var t;

  if ( dir > 0 ) {
    t = p.next();

    if ( t.size() && y > t.offset().top + t.outerHeight()/2 + itemPointTop - d.outerHeight() ) {
      d.before(t);
      $("[data-draggable='true']").data("drag-moved", true);
    }
  }
  else {
    t = p.prev().prev();
    
    if ( t.size() && y < (t.offset().top + t.outerHeight()/2 + itemPointTop) ) {
      p.after(t);
      $("[data-draggable='true']").data("drag-moved", true);
    }
  }
}

function resetDrag() {
  $("body").removeClass("txt-forbid");

  if ( $(".dragging").size() ) {
    $(".dragging")
      .css({
        "position": "static",
        "z-index": "auto",
        "top": "auto"
      })
      .removeClass("dragging");

    $(".drag-placeholder").remove();
  }
}

function saveData() {
  if ( $("[data-draggable='true']").data("drag-moved") ) {
    var idxMap = [];
    var list = $("[data-draggable='true']");
    var url = list.attr("data-url");

    if ( url ) {
      list.children("li").each(function() {
        idxMap.push("{\"id\":" + $(this).attr("data-id") + ",\"index\":" + $(this).index() + "}");
      });

      idxMap = "[" + idxMap.join(",") + "]";

      $.post(url, {"dragdrop": idxMap});
    }

    $("[data-draggable='true']").removeData("drag-moved");
  }
}

})( window, jQuery, CM );
