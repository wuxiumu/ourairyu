$(".demo-switcher").click ->
  hash = @hash[1..]

  $(this).addClass("current").siblings(".demo-switcher").removeClass("current")

  if hash is "example"
    $(".demo-example").show()
    $(".demo-code").hide()
  else if hash is "code"
    $(".demo-example").hide()
    $(".demo-code").show()

  return false
