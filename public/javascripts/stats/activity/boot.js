$(document).ready(function() {
  var loader = new Loader()
  loader.onload = function(activities) {
    activities.filter_by_span(10)
  }
  loader.load($(location).attr('href') + '/json')
})
