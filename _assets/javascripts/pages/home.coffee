repo = ( data, repoInfo ) ->
  url = data.homepage ? data.html_url
  target = if url.indexOf(location.hostname) is -1 then "blank" else "self"

  $(".Projects").append """
                        <div class="Grid-item">
                          <div class="Card">
                            <a href="#{url}" target="_#{target}" class="Repo">
                              <h3 class="Repo-name">#{data.name}</h3>
                              <span class="Repo-language">#{data.language ? ""}</span>
                              <span class="Repo-stargazers">#{data.stargazers_count} 个人关注</span>
                              <p class="Repo-description">#{data.description}</p>
                            </a>
                          </div>
                        </div>
                        """

  return

prettyDate = ( time ) ->
  date = Tatami.run "transformISO", time
  seconds = (new Date() - date) / 1000
  formats = [
      [60, "秒", 1]
      [120, " 1 分前"]
      [3600, "分", 60]
      [7200, " 1 小时前"]
      [86400, "小时", 3600]
      [172800, "昨天"]
      [604800, "天", 86400]
      [1209600, " 1 周前"]
      [2678400, "周", 604800]
    ]

  for f in formats
    return (if f[2] then " #{Math.floor(seconds / f[2])} #{f[1]}前" else f[1]) if seconds < f[0]

  return "很久之前"

Tatami.ready ->
  Tatami.run "getRepos", repo
