$(".tab-trigger").click(function() {
	var t = $(this),
		w = t.closest(".tab-wrapper");

	if ( !t.hasClass("current") ) {
		$(".current", w).removeClass("current");

		t.addClass("current");
		$("[data-flag='" + t.attr("data-flag") + "']", w).addClass("current");
	}

	return false;
});