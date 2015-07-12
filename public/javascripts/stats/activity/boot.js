$(document).ready(function() {
  var lvm = new Vue({
    el: '#legends',
    data: {
      legends: [],
    },
  })

  var loader = new Loader()
  loader.onload = function(activities) {
    var colors = [
      'rgba(255, 0, 0, 1)',
      'rgba(0, 255, 0, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(0, 255, 255, 1)',
      'rgba(255, 0, 255, 1)',
      'rgba(192, 192, 192, 1)',
      'rgba(128, 0, 0, 1)',
      'rgba(0, 128, 0, 1)',
      'rgba(0, 0, 128, 1)',
      'rgba(128, 128, 0, 1)',
      'rgba(0, 128, 128, 1)',
      'rgba(128, 0, 128, 1)',
    ]
    var num = colors.length
    activities = activities.filter_by_span(num)
    activities = activities.filter_by_user_abs(num)
    var dates_a = activities.dates()
    var users_a = activities.users_order_by_abs()
    var users_h = activities.group_by_user()
    dates_a = dates_a.sort(function(d0, d1) {
      return d0 > d1 ? 1 : -1;
    })
    var datasets = []
    var legends = []
    for (var i = 0; i < users_a.length; i++) {
      var user = users_a[i]
      var acts = users_h[user]
      var dates_h = {}
      for (var j = 0; j < acts.length; j++) {
        var act = acts[j]
        dates_h[act.date] = act
      }
      var adds = []
      var dels = []
      for (var j = 0; j < dates_a.length; j++) {
        var date = dates_a[j]
        var act = dates_h[date]
        if (act) {
          adds.push(act.add)
          dels.push(-act.del)
        } else {
          adds.push(0)
          dels.push(0)
        }
      }
      var color = colors[legends.length]
      datasets.push({
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: color,
        pointColor: color,
        pointStrokeColor: '#fff',
        data: adds,
      })
      datasets.push({
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: color,
        pointColor: color,
        pointStrokeColor: '#fff',
        data: dels,
      })
      legends.push({
        user: user,
        color: color,
      })
    }
    var labels = dates_a
    new Chart($('#chart').get(0).getContext('2d')).Line({
      labels: labels,
      datasets: datasets,
    })
    lvm.legends = legends
  }
  loader.load($(location).attr('href') + '/json')
})
