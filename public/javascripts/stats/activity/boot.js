$(document).ready(function() {
  var loader = new Loader()
  loader.onload = function(activities) {
    activities = activities.filter_by_span(10)
    activities = activities.filter_by_user_abs(10)
    var dates = activities.dates()
    var users = activities.users()
    console.log(activities.data)
    console.log(activities.users())
    console.log(activities.group_by_date())
  }
  loader.load($(location).attr('href') + '/json')
})
