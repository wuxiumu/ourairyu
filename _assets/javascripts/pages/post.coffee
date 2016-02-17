#= require share.min
#= require initializers/time

getHeadingNo = ( $h, tagName ) ->
  return $(tagName, $(".Article-content")).index($h) + 1

# 添加目录条目
addTocItem = ( $h ) ->
  id = $h.attr("id")
  tagName = $h.get(0).tagName.toLowerCase()

  if not id
    idx = getHeadingNo($h, tagName)
    id = "#{if tagName is "h2" then "h" else "subH"}eading-#{idx}"

    $h.attr "id", id

  return "<li><a href=\"##{id}\">#{$h.text()}</a></li>"

# 生成目录
generateToc = ->
  $toc = $("<div class=\"Article-toc\"><h3>文章目录</h3><ul class=\"nav\" /></div>")
  $item = null

  $("h2, h3", $(".Article-content")).each ->
    $h = $(@)
    $list = $("ul", $item)

    if @tagName.toLowerCase() is "h2"
      $item = $(addTocItem $h)

      $item.append("<ul class=\"nav\" />") if $list.size() is 0
      $item.appendTo $toc.children("ul")
    else
      $list.append addTocItem($h)

  return $toc

$(document).ready ->
  $toc = generateToc()

  if $("li", $toc).size() > 0
    $(".Article-meta").append $toc

    $(".Article-toc")
      .on
        "affixed-top.bs.affix": ->
          $(@).css("position", "static")
        "affixed.bs.affix": ->
          $(@).css("position", "fixed")
      .affix
        offset:
          top: $(".Article-toc").offset().top
          bottom: ->
            return $(document).height() - ($(".Article-content").offset().top + $(".Article-content").outerHeight(true))

    $("body").scrollspy target: ".Article-toc"