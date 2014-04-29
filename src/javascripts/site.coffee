$ ->
  $("a[rel*='external']").on "click", ->
    window.open @href
    return false
