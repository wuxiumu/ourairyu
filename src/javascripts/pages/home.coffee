repoInfo =
  miso:
    name:
      zh: "味噌"
      en: "Miso"
    description: "对 JavaScript 新建对象的成员方法进行统一的参数验证及返回值"
  ronin:
    name:
      zh: "浪人"
      en: "Rōnin"
    description: "DOM 无关的 JavaScript 解决方案、增强库"
  tatami:
    name:
      zh: "畳"
      en: "Tatami"
    description: "为新项目的前端开发提供基础设施"
  matcha:
    name:
      zh: "抹茶"
      en: "Matcha"
    description: "UI 库"


orderByLatest = ( a, b ) ->
  return -(transformISO(a.pushed_at).getTime() - transformISO(b.pushed_at).getTime())

repo = ( data ) ->
  item = $("<li>", class: "repo")
  name = data.name
  info = repoInfo[name]

  if info
    name = info.name.en
    desc = info.description
  else
    desc = data.description

  item
    .append "<div />"
    .children "div"
    .append "<h3><a href=\"#{(data.homepage || data.html_url)}\" rel=\"external nofollow\" target=\"_blank\">#{name}</a></h3>"
    .append "<span class=\"repo_lang\">#{data.language}</span>"
    .append "<time>更新于#{prettyDate data.pushed_at}</time>"
    .append "<p>#{desc}</p>"

  return item

###
# 将 ISO 日期字符串转换为本地日期对象
###
transformISO = ( ISO_date ) ->
  date = new Date ISO_date

  # IE9- 不支持 ISO 8601 扩展格式
  # refer to: http://msdn.microsoft.com/zh-cn/library/ff743760(v=vs.94).aspx
  if isNaN date
    date_arr = ISO_date.match /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/
    date = new Date

    date.setUTCFullYear date_arr[1], date_arr[2] - 1, date_arr[3]
    date.setUTCHours date_arr[4], date_arr[5], date_arr[6]

  return date

prettyDate = ( time ) ->
  date = transformISO time
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

$.getJSON "https://api.github.com/users/ourai/repos?callback=?", ( result ) ->
  repos = result.data

  if $.isArray repos
    $ ->
      repos.sort orderByLatest

      $.each repos, ( i, r ) ->
        if r.name isnt "ourai.github.io" and r.language
          $(".repos").append repo r

# $(".project-description").each ->
#   $(this).dotdotdot()
#   $(this).attr("title", $(this).triggerHandler("originalContent")[0].nodeValue) if $(this).triggerHandler "isTruncated"
