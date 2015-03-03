$("body").on "click", ".bankbox .recharge-bank-item", ->
  $(".tab_bank.show").removeClass "show"
  $(".tab_bank[data-flag='" + @id + "']").addClass "show"

$("body").on "change", ".radioTabs :radio[name='bank']", ->
  $(".radioTabs .tab_bank.show").removeClass "show"
  $(".radioTabs .tab_bank[data-flag='#{$(@).val()}']").addClass "show"