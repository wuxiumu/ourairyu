generateBonusList = ( num ) ->
  id = "bonus#{num}"

  return "<li><input id=\"#{id}\" type=\"checkbox\" name=\"bonus\"><label for=\"#{id}\"><span class=\"Bonus-bag\"></span><span class=\"Bonus-coupon\">#{id}</span></label></li>"

$(document).ready ->
  $(".Bonus-list").append (generateBonusList(i) for i in [1..9])
