ChartData = function(labels, datasets, legends) {
  return {
    labels: labels,
    datasets: datasets,
    legends: legends
  }
}

ChartData.from_activities = function(activities, colors) {
  var num = colors.length
  activities = activities.filter_by_span(num)
  activities = activities.filter_by_user_abs(num)

  var dates_a = activities.dates()
  dates_a = dates_a.sort(function(d0, d1) {
    return d0 > d1 ? 1 : -1;
  })

  var users_a = activities.users_order_by_abs()
  var users_h = activities.group_by_user()
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
  return new ChartData(labels, datasets, legends)
}
