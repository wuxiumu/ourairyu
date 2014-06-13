(function() {
  $(".demo-switcher").click(function() {
    var hash;
    hash = this.hash.slice(1);
    $(this).addClass("current").siblings(".demo-switcher").removeClass("current");
    if (hash === "example") {
      $(".demo-example").show();
      $(".demo-code").hide();
    } else if (hash === "code") {
      $(".demo-example").hide();
      $(".demo-code").show();
    }
    return false;
  });

}).call(this);
