(function() {
  var initFloatSidebar;

  initFloatSidebar = function() {
    var parentTopToDoc, sidebar, topToDoc, topToParent;
    sidebar = $(".Sidebar-content");
    if (sidebar.size() > 0) {
      topToDoc = sidebar.offset().top;
      parentTopToDoc = sidebar.parent().offset().top;
      topToParent = topToDoc - parentTopToDoc;
      return $(window).on("scroll", function(evt) {
        var scrollTop;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop < document.documentElement.scrollHeight - sidebar.height()) {
          if (scrollTop > parentTopToDoc) {
            return sidebar.addClass("is-fixed");
          } else {
            return sidebar.removeClass("is-fixed");
          }
        }
      });
    }
  };

  $(document).ready(initFloatSidebar);

}).call(this);
