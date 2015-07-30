Tatami.ready ->
  $("#documentation h3").each ( idx ) ->
    h = $(this)
    id = h.attr "id"

    if id is undefined
      id = "heading#{idx + 1}"
      h.attr "id", id

    toc = $(".toc")
    
    toc
      .append "<a href=\"#{location.pathname}##{id}\" class=\"toc-title\">#{h.text()}</a>"
      .append "<ul class=\"toc-section\"></ul>"

    ul = $(".toc-section:last", toc)

    h.next("dl").children("dt").each ->
      dt = $(this)
      api = dt.text()
      id = "api_#{api}"

      dt.attr "id", id
      ul.append "<li>- <a href=\"#{location.pathname}##{id}\">#{api}</a></li>"

  $("[data-download]").on "click", ->
    url = this.getAttribute "href"

    Tatami.download Tatami.pathname(url), url
    
    return false
