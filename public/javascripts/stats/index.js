$(document).ready(function() {
  var stats = new Stats($(location).attr('href') + '/json')

  var lvm = new Vue({
    el: '#legends',
    data: {
      legends: [],
    },
  })

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

  stats.onload = function() {
    var labels = []
    var datasets = []
    var legends = []
    var activities = stats.activities()
    var end = Math.min(activities.length, colors.length)
    for (var i = 0; i < end; i++) {
      var activity = activities[i].span(10)
      var author = activity.author
      var adds = activity.adds
      var dels = activity.dels
      var color = colors[i]

      labels = activity.dates
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
        author: author,
        color: color,
      })
    }
    new Chart($('#chart').get(0).getContext('2d')).Line({
      labels: labels,
      datasets: datasets,
    })
    lvm.legends = legends
  }
  stats.load()
})
