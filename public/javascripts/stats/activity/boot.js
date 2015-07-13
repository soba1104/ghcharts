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
    var data = ChartData.from_activities(activities, colors)
    var labels = data.labels
    var datasets = data.datasets
    var legends = data.legends
    new Chart($('#chart').get(0).getContext('2d')).Line({
      labels: labels,
      datasets: datasets,
    })
    lvm.legends = legends
  }
  loader.load($(location).attr('href') + '/json')
})
