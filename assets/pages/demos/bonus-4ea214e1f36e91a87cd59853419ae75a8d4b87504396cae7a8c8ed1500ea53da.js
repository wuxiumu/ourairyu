(function() {
  var generateBonusList;

  generateBonusList = function(num) {
    var id;
    id = "bonus" + num;
    return "<li><input id=\"" + id + "\" type=\"checkbox\" name=\"bonus\"><label for=\"" + id + "\"><span class=\"Bonus-bag\"></span><span class=\"Bonus-coupon\">" + id + "</span></label></li>";
  };

  $(document).ready(function() {
    var i;
    return $(".Bonus-list").append((function() {
      var j, results;
      results = [];
      for (i = j = 1; j <= 9; i = ++j) {
        results.push(generateBonusList(i));
      }
      return results;
    })());
  });

}).call(this);
