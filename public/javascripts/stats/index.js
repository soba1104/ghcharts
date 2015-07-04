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
    var limit = 10
    var end = Math.min(stats.length(), colors.length)
    for (var i = 0; i < end; i++) {
      var stat = stats.get(i)
      var author = stat.author
      var labels = stat.dates.slice(-limit)
      var adds = stat.adds.slice(-limit)
      var dels = stat.dels.slice(-limit)
      var color = colors[i]
      var datasets = [
        {
          fillColor: 'rgba(255, 255, 255, 0)',
          strokeColor: color,
          pointColor: color,
          pointStrokeColor: '#fff',
          data: adds,
        },
        {
          fillColor: 'rgba(255, 255, 255, 0)',
          strokeColor: color,
          pointColor: color,
          pointStrokeColor: '#fff',
          data: dels,
        },
      ]
      new Chart($('#chart').get(0).getContext('2d')).Line({
        labels: labels,
        datasets: datasets,
      })
      lvm.legends = [
        {
          author: author,
          color: color,
        }
      ]
    }
  }
  stats.load()
})
