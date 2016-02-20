(function() {
  $(document).on("click", ".Nav-cell a", function() {
    var $el, cls;
    $el = $(this);
    cls = "is-active";
    $(".Navs ." + cls + ", .Grids ." + cls).removeClass(cls);
    $(".Grids [data-flag='" + ($el.attr("data-flag")) + "']").add($el).addClass(cls);
    return false;
  });

  $(document).ready(function() {
    $(".Navs [data-flag]:first").click();
    return $(".Repo, .Site").each(function() {
      if ($(this).attr("href").indexOf(location.hostname) === -1) {
        return $(this).attr("target", "_blank");
      }
    });
  });

}).call(this);
