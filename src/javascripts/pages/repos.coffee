repo = ( data, repoInfo ) ->
  item = $("<section>", class: "project")
  name = data.name
  info = repoInfo[name]

  if info
    name = info.name.en
    desc = info.description
  else
    desc = data.description

  homepage = data.homepage

  if homepage
    url = "<a href=\"http://#{location.host}/projects/#{data.name}/\">#{name}</a>"
  else
    url = "<a href=\"#{data.html_url}\" rel=\"external nofollow\" target=\"_blank\">#{name}</a>"

  item
    .append "<header></header><div class=\"project-description\"><p>#{desc}</p></div>"
    .children "header"
    .append "<h2 class=\"project-name\">#{url}</h2>"

  $(".repos").append item

Tatami.ready ->
  Tatami.run "getRepos", repo
