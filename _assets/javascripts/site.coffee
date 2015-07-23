# id: 18552598, remark: "bakufu"
# id: 35932564, remark: "learning"
# id: 19068698, remark: "ourai.github.io"
# id: 35203272, remark: "ourairyu"
# id: 28067674, remark: "ourairyu-themes"
# id: 39543273, remark: "development"
# id: 23340879, remark: "waken"
excludedRepos = [
    18552598
    35932564
    19068698
    35203272
    28067674
    39543273
    23340879
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
