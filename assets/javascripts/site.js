(function() {
  var orderByLatest, repoInfo, transformISO;

  repoInfo = {
    miso: {
      name: {
        zh: "味噌",
        en: "Miso"
      },
      description: "对 JavaScript 新建对象的成员方法进行统一的参数验证及返回值"
    },
    ronin: {
      name: {
        zh: "浪人",
        en: "Rōnin"
      },
      description: "DOM 无关的 JavaScript 解决方案、增强库"
    },
    tatami: {
      name: {
        zh: "畳",
        en: "Tatami"
      },
      description: "为新项目的前端开发提供基础设施"
    },
    matcha: {
      name: {
        zh: "抹茶",
        en: "Matcha"
      },
      description: "UI 库"
    }
  };

  orderByLatest = function(a, b) {
    return -(transformISO(a.pushed_at).getTime() - transformISO(b.pushed_at).getTime());
  };


  /*
   * 将 ISO 日期字符串转换为本地日期对象
   */

  transformISO = function(ISO_date) {
    var date, date_arr;
    date = new Date(ISO_date);
    if (isNaN(date)) {
      date_arr = ISO_date.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/);
      date = new Date;
      date.setUTCFullYear(date_arr[1], date_arr[2] - 1, date_arr[3]);
      date.setUTCHours(date_arr[4], date_arr[5], date_arr[6]);
    }
    return date;
  };

  Tatami.queue({
    getRepos: function(callback) {
      return $.getJSON("https://api.github.com/users/ourai/repos?callback=?", function(result) {
        var repos;
        repos = result.data;
        if ($.isArray(repos)) {
          return $(function() {
            repos.sort(orderByLatest);
            return $.each(repos, function(i, r) {
              if (r.name !== "ourai.github.io" && r.language) {
                return callback(r, repoInfo);
              }
            });
          });
        }
      });
    },
    transformISO: transformISO
  });

}).call(this);
