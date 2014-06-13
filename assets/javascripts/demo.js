(function() {
  var changeSection;

  changeSection = function(hash) {
    $(".demo-switcher").removeClass("current");
    if (hash.slice(1) === "code") {
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
