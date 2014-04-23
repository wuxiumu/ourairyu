(function() {
  var orderByLatest, repo, updateTime;

  orderByLatest = function(a, b) {
    return -((new Date(a.updated_at)).getTime() - (new Date(b.updated_at)).getTime());
  };

  repo = function(data) {
    var item;
    item = $("<li>", {
      "class": "repo"
    });
    item.append("<div />").children("div").append("<h3><a href=\"" + (data.homepage || data.html_url) + "\" rel=\"external nofollow\">" + data.name + "</a></h3>").append("<span class=\"repo_lang\">" + (data.language || "none") + "</span>").append("<time>Last updated: " + (updateTime(data.updated_at)) + "</time>").append("<p>" + data.description + "</p>");
    return item;
  };

  updateTime = function(time) {
    var d;
    d = new Date(time);
    return "" + (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" + (d.getSeconds());
  };

  $.getJSON("https://api.github.com/users/ourai/repos", function(repos) {
    if ($.isArray(repos)) {
      $(".repo_count").text(repos.length - 1);
      repos.sort(orderByLatest);
      return $.each(repos, function(i, r) {
        if (r.name !== "ourai.github.io") {
          return $(".repos").append(repo(r));
        }
      });
    }
  });

}).call(this);
