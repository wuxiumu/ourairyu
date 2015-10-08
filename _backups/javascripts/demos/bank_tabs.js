(function() {
  $("body").on("click", ".bankbox .recharge-bank-item", function() {
    $(".tab_bank.show").removeClass("show");
    return $(".tab_bank[data-flag='" + this.id + "']").addClass("show");
  });

  $("body").on("change", ".radioTabs :radio[name='bank']", function() {
    $(".radioTabs .tab_bank.show").removeClass("show");
    return $(".radioTabs .tab_bank[data-flag='" + ($(this).val()) + "']").addClass("show");
  });

}).call(this);
