(function() {
  "use strict";
  var $, changePage, defaults, getSettings, htmlClass, htmlSel, mathAdd, mathMinus, normalPagers, pager, setDefaultPage, tinyPagers, turnPage;

  $ = jQuery;

  defaults = {
    tiny: false,
    page: {
      total: 0,
      separator: "...",
      defaultPage: 1,
      firstText: "&laquo;",
      lastText: "&raquo;",
      prevText: "&lsaquo;",
      nextText: "&rsaquo;"
    },
    change: function(currentPage, pageData) {}
  };

  htmlClass = function(part, flag) {
    var cls;
    cls = "Pagination";
    if (part) {
      cls += "-" + part;
    }
    if (flag) {
      cls += "--" + flag;
    }
    return cls;
  };

  htmlSel = function(part, flag) {
    return "." + (htmlClass(part, flag));
  };

  pager = function(page, text, classStr) {
    return "<a href=\"javascript:void(0);\" data-page=\"" + page + "\" class=\"" + (classStr != null ? classStr : "") + "\">" + text + "</a>";
  };

  normalPagers = function(data) {
    var page, pages, separator;
    pages = [];
    page = 1;
    separator = "<span class=\"" + (htmlClass("separator")) + "\">" + data.separator + "</span>";
    while (pages.length < data.total) {
      pages.push(pager(page, page, htmlClass("page")));
      page++;
    }
    pages.unshift(pager("", data.prevText, htmlClass("page", "previous")));
    pages.unshift(pager(1, data.firstText, htmlClass("page", "first")));
    pages.push(pager("", data.nextText, htmlClass("page", "next")));
    pages.push(pager(data.total, data.lastText, htmlClass("page", "last")));
    pages.push("<span class=\"" + (htmlClass("page", "current")) + "\"></span>");
    pages.push(separator + separator);
    return pages.join("");
  };

  tinyPagers = function(data) {
    var html;
    html = [];
    html.push(pager("", data.prevText, htmlClass("page", "previous")));
    html.push(pager("", data.nextText, htmlClass("page", "next")));
    return html.join("");
  };

  getSettings = function(pagination) {
    return pagination.data("Pagination-settings");
  };

  setDefaultPage = function(page, isTiny, paginator) {
    if (isTiny) {
      return changePage(1, paginator, "prev");
    } else {
      return $("" + (htmlSel("page")) + "[data-page='" + page + "']", paginator).trigger("click");
    }
  };

  $.fn.pagination = function(settings) {
    return $(this).each(function() {
      var cls, container, flag, isTiny, pageData;
      container = $(this);
      flag = "Pagination-inited";
      if (container.data(flag) !== true) {
        cls = htmlClass();
        settings = $.extend(true, {}, defaults, settings);
        pageData = settings.page;
        isTiny = settings.tiny === true;
        if (isTiny) {
          container.addClass("" + cls + "--tiny").append(tinyPagers(pageData));
        } else {
          container.addClass(cls).append(normalPagers(pageData));
        }
        container.data("Pagination-settings", settings).data(flag, true);
        return setDefaultPage(pageData.defaultPage, isTiny, container);
      }
    });
  };

  turnPage = function(page, pagination) {
    var beforePages, behindPages, currentPage, gaps, idx, pages, specifiedPage, total;
    total = getSettings(pagination).page.total;
    currentPage = $(htmlSel("page", "current"), pagination);
    specifiedPage = $("" + (htmlSel("page")) + "[data-page='" + page + "']", pagination);
    pages = $(htmlSel("page"), pagination);
    currentPage.text(page);
    $(htmlSel("page", "previous"), pagination).attr("data-page", page - 1);
    $(htmlSel("page", "next"), pagination).attr("data-page", page + 1);
    pages.show();
    $("" + (htmlSel("page")) + "[data-page='2']", pagination).after($("" + (htmlSel("separator")) + ":eq(0)", pagination));
    $("" + (htmlSel("page")) + "[data-page='" + (total - 1) + "']", pagination).before($("" + (htmlSel("separator")) + ":eq(1)", pagination));
    specifiedPage.hide().before(currentPage);
    beforePages = $("" + (htmlSel("page", "first")) + ", " + (htmlSel("page", "previous")), pagination);
    if (page === 1) {
      beforePages.hide();
    } else {
      beforePages.show();
    }
    behindPages = $("" + (htmlSel("page", "last")) + ", " + (htmlSel("page", "next")), pagination);
    if (page === total) {
      behindPages.hide();
    } else {
      behindPages.show();
    }
    gaps = $(htmlSel("separator"), pagination);
    idx = $(htmlSel("page"), pagination).index(specifiedPage);
    if ((total - 5 < page && page < 6)) {
      return gaps.hide();
    } else {
      if (page > 5) {
        gaps.eq(0).show();
        pages.slice(2, idx - (page === total ? 2 : 1)).hide();
      } else {
        gaps.eq(0).hide();
      }
      if (page < total - 4) {
        gaps.eq(1).show();
        return pages.slice(idx + (page === 1 ? 3 : 2), total - 2).hide();
      } else {
        return gaps.eq(1).hide();
      }
    }
  };

  $(document).on("click", "" + (htmlSel()) + " [data-page]", function() {
    var page, pagerTrigger, pagination, settings, _ref;
    pagerTrigger = $(this);
    if (!pagerTrigger.is(":hidden") && !pagerTrigger.hasClass("Pagination-state--disabled")) {
      pagination = pagerTrigger.closest(htmlSel());
      settings = getSettings(pagination);
      page = pagerTrigger.attr("data-page") * 1;
      turnPage(page, pagination);
      if ((_ref = settings.change) != null) {
        _ref.apply(pagerTrigger, [page, settings.page]);
      }
    }
    return false;
  });

  mathAdd = function(num) {
    return ++num;
  };

  mathMinus = function(num) {
    return --num;
  };

  changePage = function(page, pagination, direction) {
    var disableCls, flag, mainTrigger, nextSel, prevSel, subTrigger;
    prevSel = "" + (htmlSel("page", "previous"));
    nextSel = "" + (htmlSel("page", "next"));
    flag = "data-page";
    disableCls = "Pagination-state--disabled";
    if (direction === "prev") {
      mainTrigger = $(prevSel, pagination);
      subTrigger = $(nextSel, pagination);
      mainTrigger.attr(flag, mathMinus(page));
      subTrigger.removeClass(disableCls).attr(flag, mathMinus(subTrigger.attr(flag)));
      if (page === 1) {
        mainTrigger.addClass(disableCls);
        return subTrigger.attr(flag, 2);
      }
    } else {
      mainTrigger = $(nextSel, pagination);
      subTrigger = $(prevSel, pagination);
      mainTrigger.attr(flag, mathAdd(page));
      subTrigger.removeClass(disableCls).attr(flag, mathAdd(subTrigger.attr(flag)));
      if (page === getSettings(pagination).page.total) {
        mainTrigger.addClass(disableCls);
        return subTrigger.attr(flag, mathMinus(page));
      }
    }
  };

  $(document).on("click", "" + (htmlSel()) + "--tiny " + (htmlSel("page", "previous")) + ", " + (htmlSel()) + "--tiny " + (htmlSel("page", "next")), function() {
    var page, pagerTrigger, pagination, settings, _ref;
    pagerTrigger = $(this);
    page = pagerTrigger.attr("data-page") * 1;
    pagination = pagerTrigger.closest("" + (htmlSel()) + "--tiny");
    settings = getSettings(pagination);
    if (!pagerTrigger.hasClass("Pagination-state--disabled")) {
      changePage(page, pagination, pagerTrigger.hasClass(htmlClass("page", "previous")) ? "prev" : "next");
      if ((_ref = settings.change) != null) {
        _ref.apply(pagerTrigger, [page, settings.page]);
      }
    }
    return false;
  });

}).call(this);
