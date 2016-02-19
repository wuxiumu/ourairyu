###
# 重置侧边栏位置
#
# TODO: 当有页头横幅并且其高度随着页面拉伸发生变化时，
#       需要重新设置侧边栏位置
###
repositionSidebar = ->
  $sidebar = $(".Page-sidebar")

  $header = $(".Article-header")
  $footer = $(".Article-footer")

  if $sidebar.size()
    if $footer.size()
      offsetTop = $footer.offset().top - $header.offset().top + $footer.outerHeight(true) + 20

      $(".Widget:first", $sidebar).addClass "is-separated"
    else
      offsetTop = $header.css("padding-top")

    $sidebar.css "margin-top", offsetTop

  return $sidebar

$(document).ready ->
  repositionSidebar()
