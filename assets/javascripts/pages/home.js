(function() {
  var prettyDate, repo;

  repo = function(data, repoInfo) {
    var desc, homepage, info, item, name, url;
    item = $("<li>", {
      "class": "repo"
    });
    name = data.name;
    info = repoInfo[name];
    if (info) {
      name = info.name.en;
      desc = info.description;
    } else {
      desc = data.description;
    }
    homepage = data.homepage;
    if (homepage) {
      url = "<a href=\"" + homepage + "\">" + name + "</a>";
    } else {
      url = "<a href=\"" + data.html_url + "\" rel=\"external nofollow\" target=\"_blank\">" + name + "</a>";
    }
    item.append("<div />").children("div").append("<h3>" + url + "</h3>").append("<span class=\"repo_lang\">" + data.language + "</span>").append("<time>更新于" + (prettyDate(data.pushed_at)) + "</time>").append("<p>" + desc + "</p>");
    return $(".repos").append(item);
  };

  prettyDate = function(time) {
    var date, f, formats, seconds, _i, _len;
    date = Tatami.run("transformISO", time);
    seconds = (new Date() - date) / 1000;
    formats = [[60, "秒", 1], [120, " 1 分前"], [3600, "分", 60], [7200, " 1 小时前"], [86400, "小时", 3600], [172800, "昨天"], [604800, "天", 86400], [1209600, " 1 周前"], [2678400, "周", 604800]];
    for (_i = 0, _len = formats.length; _i < _len; _i++) {
      f = formats[_i];
      if (seconds < f[0]) {
        return (f[2] ? " " + (Math.floor(seconds / f[2])) + " " + f[1] + "前" : f[1]);
      }
    }
    return "很久之前";
  };

  Tatami.ready(function() {
    return Tatami.run("getRepos", repo);
  });

}).call(this);
