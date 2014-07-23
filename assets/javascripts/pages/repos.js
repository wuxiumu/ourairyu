(function() {
  var repo;

  repo = function(data, repoInfo) {
    var desc, homepage, info, item, name, url;
    item = $("<section>", {
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
    item.append("<header></header><div class=\"repo-desc\"><p>" + desc + "</p></div>").children("header").append("<h2 class=\"repo-name\">" + url + "</h2>");
    return $(".layout-content").append(item);
  };

  Tatami.ready(function() {
    return Tatami.run("getRepos", repo);
  });

}).call(this);
