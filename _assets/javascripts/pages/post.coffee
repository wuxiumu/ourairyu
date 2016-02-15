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
  $toc = $("<ul class=\"Article-toc\" />")
  $item = null

  $("h2, h3", $(".Article-content")).each ->
    $h = $(@)
    $list = $("ul", $item)

    if @tagName.toLowerCase() is "h2"
      $item = $(addTocItem $h)

      $item.append("<ul />") if $list.size() is 0
      $item.appendTo $toc
    else
      $list.append addTocItem($h)

  return $toc

$(document).ready ->
  $toc = generateToc()

  $(".Article-meta").append($toc) unless $("li", $toc).size() is 0
