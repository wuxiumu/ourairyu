(function() {
  $(".textInputer").on({
    focus: function() {
      $(this).val("有焦点");
      return $(".textContent").show();
    },
    blur: function() {
      $(this).val("无焦点");
      return $(".textContent").hide();
    }
  });

  $(".textContent").on("mousedown", function(e) {
    e.target.unselectable = true;
    return false;
  });

}).call(this);
