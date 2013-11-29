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
    }

    // tooltip 存储数据集合
    if ( !$("body").data("tooltip") ) {
      $("body").data("tooltip", {user: [], title: []});
    }

    $("[title]").each(function() {
      removeTitleAttr($(this));
    });

    $("[data-role='tooltip']").live({
      "mouseover": function() {
        var trigger = $(this);
        var offset = trigger.offset();
        var tooltip = getTooltip(trigger, true);

        if ( tooltip ) {
          tooltip
            .css({
              top: (offset.top - tooltip.outerHeight(true)) + "px",
              left: (offset.left - (trigger.attr("data-title") ? 15 : 45)) + "px"
            })
            .fadeIn();
        }
      },
      "mouseout": function() {
        getTooltip($(this)).fadeOut();
      }
    });
  }
});

function cardWrapper() {
  var card = $("<div class=\"CM-tooltip\" />");

  card
    .append("<div class=\"card_wrapper\" />")
    .appendTo($("body"));

  return card;
}

function removeTitleAttr( trigger ) {
  var text = trigger.attr("title");

  trigger.removeAttr("title");

  if ( !trigger.attr("data-user") ) {
    var set = $("body").data("tooltip").title;

    trigger
      .data("tooltip_title", text)
      .attr({
          "data-role": "tooltip",
          "data-title": set.length
        });

    set.push(trigger);
  }
}

/**
 * 获取工具提示容器
 */
function getTooltip( trigger, setting ) {
  var tooltip;

  // 用户资料卡
  if ( $.isNumeric(trigger.attr("data-user")) ) {
    tooltip = setting === true ? userCard(getUserInfo(trigger.attr("data-user")), trigger) : $(".comp_profile");
  }
  // 工具提示
  else if ( $.isNumeric(trigger.attr("data-title")) ) {
    tooltip = setting === true ? tooltipCard(trigger) : $(".comp_tooltip");
  }

  return tooltip || null;
}

function tooltipCard( trigger ) {
  // var index = parseFloat(trigger.attr("data-title"));
  var text = trigger.data("tooltip_title");
  var card = $(".comp_tooltip");

  if ( !card.size() ) {
    card = cardWrapper();

    $(".card_wrapper", card.addClass("comp_tooltip")).append("<div class=\"card_tooltip\" />");
  }

  $(".card_tooltip", card).text(text);

  return card;
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
 * 用户信息卡片
 */
function userCard( user_info, target ) {
  var card;

  if ( user_info ) {
    card = $(".comp_profile");

    if ( card.size() === 0 ) {
      card = createCard();
    }

    fillUserInfo(card, user_info);
  }

  return card;
}

/**
 * 创建用户卡片
 */
function createCard() {
  var card = cardWrapper();

  card
    .addClass("comp_profile")
    .children(".card_wrapper")
    .append("<div class=\"card_profile\" /><div class=\"card_operation\" />");

  var areaInfo = $(".card_profile", card);

  areaInfo.append("<a class=\"avatar_link\"><img class=\"avatar\"></a>");
  areaInfo.append("<a class=\"name_link\" />");
  areaInfo.append("<div class=\"class_info\"><span class=\"profile_class\" /><span class=\"profile_id\" /></div>")

  $(".card_operation", card).append("<button class=\"LG_Button\" type=\"button\"><i>+</i><span>Follow</span></button>");

  return card;
}

/**
 * 填充用户卡片的信息
 */
function fillUserInfo( card, user_info ) {
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

})( window, jQuery, CM );
