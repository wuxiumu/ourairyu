(function() {
  $("body").on("click", ".bankbox .recharge-bank-item", function() {
    $(".tab_bank.show").removeClass("show");
    return $(".tab_bank[data-flag='" + this.id + "']").addClass("show");
  });

}).call(this);
