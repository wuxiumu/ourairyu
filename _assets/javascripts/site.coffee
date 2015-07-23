excludedRepos = [
    18552598  # bakufu
    35932564  # learning
    19068698  # ourai.github.io
    35203272  # ourairyu
    28067674  # ourairyu-themes
    39543273  # development
    23340879  # waken
  ]

orderByLatest = ( a, b ) ->
  return -(transformISO(a.pushed_at).getTime() - transformISO(b.pushed_at).getTime())

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

Tatami.queue
  getRepos: ( callback ) ->
    $.getJSON "https://api.github.com/users/ourai/repos?callback=?", ( result ) ->
      repos = result.data

      if $.isArray repos
        $ ->
          repoCount = 0

          repos.sort orderByLatest
          
          $.each repos, ( i, r ) ->
            if Tatami.inArray(r.id, excludedRepos) is -1
              callback r
              repoCount++
            
            return

          $("[data-counter='repo']").text repoCount

          return

  transformISO: transformISO
