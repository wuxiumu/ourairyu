(function(){var t;t=function(){var t,e,i,n;return i=$(".Page-sidebar"),e=$(".Article-header"),t=$(".Article-footer"),i.size()&&(t.size()?(n=t.offset().top-e.offset().top+t.outerHeight(!0)+20,$(".Widget:first",i).addClass("is-separated")):n=e.css("padding-top"),i.css("margin-top",n)),i},$(document).ready(function(){return t()})}).call(this),function(){var t,e,i,n;i=function(t,e){return $(e,$(".Article-content")).index(t)+1},t=function(t){var e,n,o;return e=t.attr("id"),o=t.get(0).tagName.toLowerCase(),e||(n=i(t,o),e=("h2"===o?"h":"subH")+"eading-"+n,t.attr("id",e)),'<li><a href="#'+e+'">'+t.text()+"</a></li>"},e=function(){var e,i;return i=$('<ul class="nav" />'),e=null,$("h2, h3",$(".Article-content")).each(function(){var n;return n=$(this),"h2"===this.tagName.toLowerCase()?(e=$(t(n)),0===$("ul",e).size()&&e.append('<ul class="nav" />'),e.appendTo(i)):$("ul",e).append(t(n))}),i},n=function(t){var e,i,n;return n=".Widget--toc",i=$(n),e=$(".Article-content"),i.find(".Widget-body").append(t).closest(n).on({"affixed-top.bs.affix":function(){return $(this).css("position","static")},"affixed.bs.affix":function(){return $(this).css("position","fixed")}}).affix({offset:{top:i.offset().top,bottom:function(){return $(document).height()-(e.offset().top+e.outerHeight(!0))}}}),$("body").scrollspy({target:n})},$(document).ready(function(){var t,i;return t=$(".Widget--toc"),1===t.size()?(i=e(),$("li",i).size()>0?n(i):t.remove()):void 0})}.call(this),function(){}.call(this);