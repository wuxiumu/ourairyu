(function(){var a,b,c,d;a=function(a,b){return-(d(a.pushed_at).getTime()-d(b.pushed_at).getTime())},c=function(a){var c;return c=$("<li>",{"class":"repo"}),c.append("<div />").children("div").append('<h3><a href="'+(a.homepage||a.html_url)+'" rel="external nofollow">'+a.name+"</a></h3>").append('<span class="repo_lang">'+a.language+"</span>").append("<time>Last updated: "+b(a.pushed_at)+"</time>").append("<p>"+a.description+"</p>"),c},d=function(a){var b,c;return b=new Date(a),isNaN(b)&&(c=a.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/),b=new Date,b.setUTCFullYear(c[1],c[2]-1,c[3]),b.setUTCHours(c[4],c[5],c[6])),b},b=function(a){var b,c,e,f,g,h;for(b=d(a),f=(new Date-b)/1e3,e=[[60,"seconds",1],[120,"1 minute ago"],[3600,"minutes",60],[7200,"1 hour ago"],[86400,"hours",3600],[172800,"Yesterday"],[604800,"days",86400],[1209600,"1 week ago"],[2678400,"weeks",604800]],g=0,h=e.length;h>g;g++)if(c=e[g],f<c[0])return c[2]?""+Math.floor(f/c[2])+" "+c[1]+" ago":c[1];return"A while ago"},$.getJSON("https://api.github.com/users/ourai/repos?callback=?",function(b){var d;return d=b.data,$.isArray(d)?$(function(){return d.sort(a),$.each(d,function(a,b){return"ourai.github.io"!==b.name&&b.language?$(".repos").append(c(b)):void 0})}):void 0})}).call(this);