initFloatSidebar = ->
  sidebar = $(".Sidebar-content")

  if sidebar.size() > 0
    topToDoc = sidebar.offset().top
    parentTopToDoc = sidebar.parent().offset().top
    topToParent = topToDoc - parentTopToDoc  # 不通过 sidebar.css("top"); 获取值是避免没设置 top 的情况（即值为 auto）。

    $(window).on "scroll", ( evt ) ->
      scrollTop = document.body.scrollTop or document.documentElement.scrollTop

      if scrollTop < document.documentElement.scrollHeight - sidebar.height()
        if scrollTop > parentTopToDoc
          sidebar.addClass "is-fixed"
        else
          sidebar.removeClass "is-fixed"

$(document).ready initFloatSidebar
