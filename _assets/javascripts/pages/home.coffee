repo = ( data ) ->
  url = data.homepage
  url = data.html_url if not url? or $.trim(url) is ""
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

Tatami.ready ->
  Tatami.run "getRepos", repo
