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
      initTooltip();
      // 初始化人物卡片
      initProfile();
    }
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

  return pos;
}

/**
 * 初始化提示信息
 */
function initTooltip() {
  initTooltipHTML();

  $("[data-role='tooltip'][data-type='title'], [title]").live({
    "mouseover": function() {
      var trigger = $(this);
      var text = trigger.attr("title");

      trigger.removeAttr("title");

      // 非提示信息卡片则不往下执行
      if ( trigger.is("[data-role='tooltip']") && !trigger.is("[data-type='title']") ) {
        return false;
      }

      var tooltip = $(".comp_tooltip");
      var container = $(".card_tooltip", tooltip);
      var position = cardPosition(trigger, tooltip);

      // 无 title 属性时
      if ( text === undefined ) {
        container.text(trigger.data("tooltip_title"));
      }
      // 有 title 属性时
      else {
        container.text(text);
        trigger.data("tooltip_title", text).attr({"data-role": "tooltip", "data-type": "title"});
      }

      tooltip
        .css({ top: position.y + "px", left: position.x + "px" })
        .fadeIn();
    },
    "mouseout": function() {
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
    "mouseover": function( e ) {
      var srcEle = $(e.target);
      var trigger = srcEle.closest("[data-role='tooltip'][data-user]");
      var card = $(".comp_profile");

      if ( trigger.size() ) {
        if ( $.contains(trigger[0], srcEle[0]) ) {
          fillUserInfo(card, getUserInfo(trigger.attr("data-user")));

          var position = cardPosition(trigger, card);

          card
            .css({ top: position.y + "px", left: position.x + "px" })
            .fadeIn();
        }
      }
    },
    "mouseout": function( e ) {}
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

})( window, jQuery, CM );
