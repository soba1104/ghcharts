$(document).ready(function() {
  var loader = new Loader()
  loader.onload = function(activities) {
  }
  loader.load($(location).attr('href') + '/json')
})
