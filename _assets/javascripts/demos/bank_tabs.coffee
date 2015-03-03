$("body").on "click", ".bankbox .recharge-bank-item", ->
  $(".tab_bank.show").removeClass "show"
  $(".tab_bank[data-flag='" + @id + "']").addClass "show"
