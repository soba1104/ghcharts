$(document).ready(function() {
  var loader = new Loader()
  loader.onload = function(activities) {
    activities = activities.filter_by_span(10)
    console.log(activities.data)
    console.log(activities.users())
    console.log(activities.group_by_date())
  }
  loader.load($(location).attr('href') + '/json')
})
