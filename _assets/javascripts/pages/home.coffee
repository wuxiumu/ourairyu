$(document).on "click", ".Nav-cell a", ->
  $el = $(@)
  cls = "is-active"

  $(".Navs .#{cls}, .Grids .#{cls}").removeClass cls

  $(".Grids [data-flag='#{$el.attr "data-flag"}']")
    .add $el
    .addClass cls

  return false

Tatami.ready ->
  $(".Navs [data-flag]:first").click()

  $(".Repo").each ->
    $(@).attr("target", "_blank") if $(@).attr("href").indexOf(location.hostname) is -1
