#= require jquery-1.11.3.min
#= require initializers/time

addTocItem = ( $h ) ->
  return "<li><a href=\"##{$h.attr("id")}\">#{$h.text()}</a></li>"

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
      console.log $item, $toc
    else
      $list.append addTocItem($h)

  return $toc

$(document).ready ->
  $toc = generateToc()

  $("article.container footer").append($toc) unless $("li", $toc).size() is 0
