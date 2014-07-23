repo = ( data, repoInfo ) ->
  item = $("<li>", class: "repo")
  name = data.name
  info = repoInfo[name]

  if info
    name = info.name.en
    desc = info.description
  else
    desc = data.description

  homepage = data.homepage

  if homepage
    url = "<a href=\"#{homepage}\">#{name}</a>"
  else
    url = "<a href=\"#{data.html_url}\" rel=\"external nofollow\" target=\"_blank\">#{name}</a>"

  item
    .append "<div />"
    .children "div"
    .append "<h3>#{url}</h3>"
    .append "<span class=\"repo_lang\">#{data.language}</span>"
    .append "<time>更新于#{prettyDate data.pushed_at}</time>"
    .append "<p>#{desc}</p>"

  $(".repos").append item

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

# $(".project-description").each ->
#   $(this).dotdotdot()
#   $(this).attr("title", $(this).triggerHandler("originalContent")[0].nodeValue) if $(this).triggerHandler "isTruncated"
