orderByLatest = ( a, b ) ->
  return -((new Date(a.updated_at)).getTime() - (new Date(b.updated_at)).getTime())

repo = ( data ) ->
  item = $("<li>", class: "repo")

  item
    .append "<div />"
    .children "div"
    .append "<h3><a href=\"#{(data.homepage || data.html_url)}\" rel=\"external nofollow\">#{data.name}</a></h3>"
    .append "<span class=\"repo_lang\">#{(data.language || "none")}</span>"
    .append "<time>Last updated: #{updateTime data.updated_at}</time>"
    .append "<p>#{data.description}</p>"

  return item

updateTime = ( time ) ->
  d = new Date(time)

  return "#{d.getFullYear()}-#{d.getMonth() + 1}-#{d.getDate()} #{d.getHours()}:#{d.getMinutes()}:#{d.getSeconds()}"

$.getJSON "https://api.github.com/users/ourai/repos?callback=?", ( result ) ->
  repos = result.data

  if $.isArray repos
    $ ->
      $(".repo_count").text repos.length - 1

      repos.sort orderByLatest

      $.each repos, ( i, r ) ->
        if r.name isnt "ourai.github.io"
          $(".repos").append repo r
