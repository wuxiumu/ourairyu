(function(){var o;o=function(){var o,e,t,n;return e=$(".Sidebar-content"),e.size()>0?(t=e.offset().top,o=e.parent().offset().top,n=t-o,$(window).on("scroll",function(t){var n;return n=document.body.scrollTop||document.documentElement.scrollTop,n<document.documentElement.scrollHeight-e.height()?n>o?e.addClass("is-fixed"):e.removeClass("is-fixed"):void 0})):void 0},$(document).ready(o)}).call(this);