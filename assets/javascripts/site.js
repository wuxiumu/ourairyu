(function() {
  $(function() {
    return $("a[rel*='external']").on("click", function() {
      window.open(this.href);
      return false;
    });
  });

}).call(this);
