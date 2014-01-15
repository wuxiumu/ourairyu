(function() {

function initAll() {
  $(document).ready(function() {
    var hash = CM.hash();

    // 激活页面中的 tab
    CM.activate( $(".comp_tab_wrapper") );

    // 初始化各自定义组件
    $("[data-role]").each(function() {
      var comp = $(this),
        role = comp.attr("data-role"),
        type = comp.attr("data-type") || "";

      switch(role) {
        case "component":
          if ( type === "select" ) {
            initComponentSelect( comp[0] );
          }
          break;
        case "dialog":
          initComponentDialog( this );
          break;
      }
    });

    initComponentTabs();

    if ( $.isFunction($.fn.chosen) ) {
      $(".comp_chosen").chosen(chosenOptions());
    }
  });

  // Tabs
  $(".comp_tab_trigger").live( "click", function() {
    var tab = $(this);
    var fire = tab.closest(".comp_tab_wrapper").attr("data-firecurrent") === "true";

    // 已选中时不做任何操作
    if ( fire || tab.hasClass("current") === false ) {
      var flagAttr = "data-flag";
      var flag = tab.attr( flagAttr );
      var flagStr = "[" + flagAttr + "='" + flag + "']";
      var wrapper = tab.closest(".comp_tab_wrapper");
      var group = tab.closest(".comp_tab_group");
      var curTab = group.children(".comp_tab_trigger.current");
      var callback = tab.data("comp_callback_tab");

      // 当前 tab 标识
      if ( curTab.size() > 0 ) {
        curTab.removeClass( "current" );
        $("[class*='comp_tab_'][" + flagAttr + "='" + curTab.attr(flagAttr) + "']:not(.comp_tab_trigger)", wrapper).removeClass( "current" );
      }

      // 触发器不是“当前标签”
      if ( !tab.is(curTab) ) {
        group.children(".comp_tab_trigger" + flagStr).addClass( "current" );
        wrapper.find("[class*='comp_tab_']" + flagStr + ":not(.comp_tab_trigger)").addClass( "current" );

        CM.associateHash( this, flag );
      }

      if ( $.isFunction( callback ) ) {
        callback.apply(this, [flag]);
      }
    }

    return false;
  });

  // 向前/向后按钮
  $(".comp_tab_controller button").live("click", function() {
    var btn = $(this);
    var set = $(".comp_tab_group", btn.closest(".comp_tab_wrapper"));
    var index = set.data("tab_index") || 0;
    var dir = 1;

    if ( btn.hasClass("prev") ) {
      index--;
      dir = -1;
    }

    moveTabs.apply($(".comp_tab_trigger", set).eq(index), [btn, dir, index]);
  });

  // Submit of search button
  $(".comp_search_button").live("click", function() {
    var btn = $(this),
      form = btn.closest("form");

    if ( form.size() > 0 ) {
      txt = btn.siblings(".comp_search_text");

      // 避免低版本 IE 将 placeholder 值当作 value 提交
      if ( txt.val() === txt.attr("placeholder") ) {
        txt.val("");
      }

      form.submit();
    }

    return false;
  });

  initDocumentEvents();
}

/**
 * 初始化 profile card 相关事件
 */
function initDocumentEvents() {
  var hoverMark = "data-hover";
  var target;
  var trigger;
  var card;

  $(document).bind({
    "click": function( e ) {
      var ele = $(e.target);

      if ( ele.attr("data-role") !== "component" &&
          ele.closest("[data-role='component'][data-type='select']").size() === 0 &&
          $("[data-role='component'][data-type='select'].expanded").size() ) {
        $("[data-role='component'][data-type='select'].expanded").removeClass("expanded");
      }
    }/*,
    "mouseover": function( e ) {
      target = $(e.target);
      trigger = target.closest("[data-role]");
      card = $(".comp_profile");

      // 自定义提示
      if ( trigger.size() ) {
        var user_id = trigger.attr("data-user");

        trigger.attr(hoverMark, true);

        // 用户卡片
        if ( $.isNumeric(user_id) && (card.size() === 0 || card.css("display") === "none") ) {
          userCard(getUserInfo(user_id), trigger);
        }
      }
      else if ( card.size() && (target.is(card) || $.contains(card[0], target[0])) ) {
        card.attr(hoverMark, true);
      }
    },
    "mouseout": function( e ) {
      target = $(e.target);
      trigger = target.closest("[data-role]");
      card = $(".comp_profile");

      if ( trigger.size() ) {
        trigger.removeAttr(hoverMark);

        setTimeout(function() {
          if ( !card.attr(hoverMark) ) {
            card.fadeOut();
          }
        }, 500);
      }
      else if ( card.size() ) {
        if ( card.is(":visible") && !target.closest(".comp_profile").size() ) {
          trigger = card.data("card_trigger");

          card
            .removeAttr(hoverMark)
            .removeData("card_trigger");

          if ( !trigger || !trigger.attr(hoverMark) ) {
            card.hide();
          }
        }
      }
    }*/
  });
}

window.initComponentTabs = function() {
  $(".comp_tab_group").each(function() {
    var g = $(this);
    var realWidth = 0;

    $(".comp_tab_trigger", g).each(function() {
      realWidth += $(this).outerWidth();
    });

    if ( realWidth > g.width() ) {
      g
        .removeClass("fl")
        .wrap("<div class=\"comp_tab_slider\" />")
        .wrap("<div class=\"comp_tab_blockset\" />");

      var slider = g.closest(".comp_tab_slider");

      slider.addClass("clr").prepend("<div class=\"comp_tab_controller\" />");

      var ctrl = $(".comp_tab_controller", slider);

      ctrl
        .addClass("fr")
        .append("<button class=\"tri prev\" button=\"button\" disabled=\"disabled\">" + CM.i18n("p.move.prev") + "</button>")
        .append("<button class=\"tri next\" button=\"button\">" + CM.i18n("p.move.next") + "</button>");
    }

    g.data("tab_width", g.width());
    g.data("tab_realwidth", realWidth);
  });
};

/**
 * 初始化下拉列表组件
 * 
 * @method	initComponentSelect
 * @param	{DOM} comp_select
 * @return
 */
window.initComponentSelect = function( comp_select ) {
	var sel = $(comp_select);
	var field = sel.attr("data-hidden-field") || "";
	var query = formatQueryString(decodeURI(location.search.substring(1)), field);

	$("li[data-value='" + query[field] + "']", sel).attr("data-selected", "true");

	$("dt", sel).click(function() {
		var cls = "expanded";

		if ( sel.hasClass(cls) ) {
			sel.removeClass(cls);
		}
		else {
			sel.addClass(cls);
		}

		return false;
	});

	$("li[data-value]", sel).live("click", function() {
		var opt = $(this);
		var txt = opt.text();
		var value = opt.attr("data-value");
		var hid = $("#" + field);
		var callback = sel.data("comp_callback_select");

		opt.siblings("[data-selected]").removeAttr("data-selected");
		opt.attr("data-selected", "true");

		$("dt span", sel).text(txt);

		sel.removeClass("expanded");

		if ( sel.data("comp_inited") === true ) {
			// 回调函数
			if ( $.isFunction(callback) ) {
				callback.apply(this, [value, txt]);
			}

			if ( hid.size() === 0 ) {
				hid = $("[name*='" + field + "']");
			}

			// 指定更新字段
			hid.val(value).closest("form").submit();

		}

		if ( sel.attr("data-prevent") !== "false" )	{
			return false;
		}
	});

	if ( $("li[data-selected='true']", sel).size() === 0 ) {
		$("li[data-value='']:first", sel).click();
	}
	else {
		$("li[data-selected='true']", sel).click();
	}

	sel.data("comp_inited", true);
};

/**
 * 初始化对话框组件
 * 
 * @private
 * @method	initComponentDialog
 * @param	{DOM} comp_dialog
 * @return
 */
window.initComponentDialog = function( comp_dialog ) {
	var dlg = $(comp_dialog);

	dlg.dialog({
		autoOpen: false,
		title: dlg.attr("data-title"),
		width: dlg.attr("data-width"),
		height: dlg.attr("data-height") || "auto",
		modal: true,
		buttons: [
			{
				"text": CM.i18n("w.v.determine"),
				"click": $.noop
			},
			{
				"text": CM.i18n("w.v.cancel"),
				"click": function() {
					$(this).dialog("close");
				}
			}
		]
	})
	// 为按钮添加标记
	.on("dialogopen", function() {
    var flag = "button_inited";

    if ( $(this).data(flag) !== true ) {
      $(".ui-dialog-buttonset .ui-button", $(this).closest(".ui-dialog")).each(function() {
        var btn = $(this);
        var flag;

        switch( $.trim( btn.text() ) ) {
          case CM.i18n("w.v.determine"):
            flag = "ok";
            break;
          case CM.i18n("w.v.cancel"):
            flag = "cancel";
            break;
          case CM.i18n("w.int.yes"):
            flag = "yes";
            break;
          case CM.i18n("w.int.no"):
            flag = "no";
            break;
        }

        if ( flag !== undefined ) {
        	btn.addClass( "ui-button-" + flag );
        }
      });

      $(this).data(flag, true);
    }
	});
};

/**
 * 格式化查询字符串
 * 
 * @private
 * @method	formatQueryString
 * @param	{String} source
 * @param	{String} label
 * @return	{JSON}
 */
function formatQueryString( source, label ) {
	var result = {};
	var regExp = new RegExp("q\\[.*" + label.substring(2) + ".*\\]", "i");

	$.each( source.split("&"), function( i, n ) {
		n = n.split("=");

		result[n[0].replace(regExp, function( w ) {
			return label;
		})] = n[1];
	});

	return result;
}

/**
 * 移动 tab
 *
 * @private
 * @method  moveTabs
 * @param {jQuery DOM} btn      点击的按钮
 * @param {Integer} direction   移动方向，1 为向右，-1 为向左
 * @param {Integer} index       基准 tab 的索引（用于获取步进值）
 * @return
 */
function moveTabs( btn, direction, index ) {
  var tab = $(this);
  var tabWidth = tab.outerWidth();
  var set = tab.closest(".comp_tab_group");
  var width = set.data("tab_width");
  var realWidth = set.data("tab_realwidth");
  var gap = parseFloat(set.css("margin-left"));
  var diff = realWidth - width - Math.abs(gap);
  var newGap;

  if ( set.attr("data-locked") === undefined ) {
    // 向左
    if ( direction < 0 ) {
      var remained = set.data("tab_remain");

      newGap = gap + tabWidth;
      btn.siblings(".next").removeAttr("disabled");

      if ( remained ) {
        newGap += remained;
        set.removeData("tab_remain");
      }

      set.animate({ marginLeft: newGap + "px" }, "normal", function() {
        set.data("tab_index", index);
        set.removeAttr("data-locked");

        if ( parseFloat(set.css("margin-left")) === 0 ) {
          btn.attr("disabled", true);
        }
      });
    }
    // 向右
    else if ( direction > 0 ) {
      btn.siblings(".prev").removeAttr("disabled");

      if ( tabWidth > diff ) {
        newGap = gap - diff;
        set.data("tab_remain", diff);
      }
      else {
        newGap = gap - tabWidth;
        set.removeData("tab_remain");
      }

      set.animate({ marginLeft: newGap + "px" }, "normal", function() {
        set.removeAttr("data-locked");

        if ( width + Math.abs(newGap) === realWidth ) {
          btn.attr("disabled", true);
        }
        else {
          set.data("tab_index", index + 1);
        }
      });
    }
  }
}

/**
 * jquery chosen 配置参数
 */
function chosenOptions() {
  var opts = {};

  if ( CM.config("lang") === "zh" ) {
    $.extend(opts, {
      no_results_text: "没有找到",
      placeholder_text_single: "请选择",
      placeholder_text_multiple: "请选择"
    });
  }

  return opts;
}

initAll();

})();
