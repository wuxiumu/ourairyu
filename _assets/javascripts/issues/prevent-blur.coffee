$(".textInputer").on
  focus: ->
    $(this).val "有焦点"
    $(".textContent").show()
  blur: ->
    $(this).val "无焦点"
    $(".textContent").hide()

$(".textContent").on "mousedown", ( e ) ->
  e.target.unselectable = true
  return false
