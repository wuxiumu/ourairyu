(function() {
  $("#testPagination").pagination({
    page: {
      total: 20
    },
    change: function(currentPage, pageData) {
      return console.log(currentPage, pageData);
    }
  });

  $("#testTinyPaginator").pagination({
    tiny: true,
    page: {
      total: 5
    },
    change: function(currentPage, pageData) {
      return console.log("from tiny", currentPage, pageData);
    }
  });

}).call(this);
