(function() {
  var changeSection;

  changeSection = function(hash) {
    var viewCode;
    viewCode = hash.slice(1) === "code";
    $(".demo-switcher").removeClass("current");
    $("html").attr("data-preview", !viewCode);
    if (viewCode) {
      $(".demo-switcher[href='#code']").addClass("current");
      $(".demo-example").hide();
      return $(".demo-description").show();
    } else {
      $(".demo-switcher[href='#example']").addClass("current");
      $(".demo-example").show();
      return $(".demo-description").hide();
    }
  };

  $(".demo-switcher").click(function() {
    return changeSection(this.hash);
  });

  changeSection(location.hash);

}).call(this);
