$("#testPagination").pagination
  page:
    total: 20
  change: ( currentPage, pageData ) ->
    console.log currentPage, pageData

$("#testTinyPaginator").pagination
  tiny: true
  page:
    total: 5
  change: ( currentPage, pageData ) ->
    console.log "from tiny", currentPage, pageData
