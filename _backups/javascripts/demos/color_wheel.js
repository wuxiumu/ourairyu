(function() {
	
$("#consoleArea").submit(function() {
	var form = $(this),
		inputs = $(":text", form),
		params = {},
		isDraw = true,
		canvas = $("#content"),
		HueCircle;
	
	inputs.each(function() {
		var ipt = $(this),
			val = ipt.val(),
			text = ipt.closest("dd").prev().text();
		
		if ( $.isNumeric(val) ) {
			val *= 1;
			
			if ( val <= 0  ) {
				isDraw = false;
				text += "的值必须大于0，请重新填入。";
			}
			
			params[ipt.attr("name")] = val;
		}
		else {
			isDraw = false;
			text += "的值必须为数字，请重新填入。";
		}
		
		if ( isDraw === false ) {
			alert( text );
			ipt.focus();
			return false;
		}
	});
	
	if ( isDraw ) {
		HueCircle = Polygon(params.p_count, params.h_radius);
	
		canvas.empty();
		HueCircle.offset(250, 250);
		HueCircle.draw(canvas[0], params.p_radius);
	}
	
	return false;
});

if ( $.browser.mozilla ) {
	$("body").append("<div id=\"overlay\" />");
	$("html, body").css("overflow", "hidden");
	
	alert("对不起，暂时不支持 Mozilla Firefox 浏览器。\n请用其他浏览器查看，谢谢！");
}
else {

	$("#consoleArea").submit();
}
	
})();