changeSection = ( hash ) ->
  $(".demo-switcher").removeClass "current"

  if hash[1..] is "code"
    $(".demo-switcher[href='#code']").addClass "current"
    $(".demo-example").hide()
    $(".demo-description").show()
  else
    $(".demo-switcher[href='#example']").addClass "current"
    $(".demo-example").show()
    $(".demo-description").hide()

$(".demo-switcher").click ->
  changeSection @hash

changeSection location.hash
