(function(){Tatami.ready(function(){return $("#apiCount").text(Tatami.keys(Tatami).length),$("#documentation h3").each(function(a){var b,c,d,e;return b=$(this),c=b.attr("id"),void 0===c&&(c="heading"+(a+1),b.attr("id",c)),d=$(".layout-sub"),d.append('<a href="#'+c+'" class="toc-title">'+b.text()+"</a>").append('<ul class="toc-section"></ul>'),e=$(".toc-section:last",d),$("dt",b.next("dl")).each(function(){var a,b;return b=$(this),a=b.text(),c="api_"+a,b.attr("id",c),e.append('<li>- <a href="#'+c+'">'+a+"</a></li>")})}),$("[data-download]").on("click",function(){var a;return a=this.getAttribute("href"),Tatami.download(Tatami.pathname(a),a),!1})})}).call(this);