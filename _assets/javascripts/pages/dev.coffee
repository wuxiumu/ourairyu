#= require jquery-1.11.3.min

$(document).on "click", ".Nav-cell a", ->
  $el = $(@)
  cls = "is-active"

  $(".Navs .#{cls}, .Grids .#{cls}").removeClass cls

  $(".Grids [data-flag='#{$el.attr "data-flag"}']")
    .add $el
    .addClass cls

  return false

$(document).ready ->
  $(".Navs [data-flag]:first").click()

  $(".Repo, .Site").each ->
    $(@).attr("target", "_blank") if $(@).attr("href").indexOf(location.hostname) is -1
