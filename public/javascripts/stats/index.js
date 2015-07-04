$(document).ready(function() {
  var stats = new Stats($(location).attr('href') + '/json')

  var lvm = new Vue({
    el: '#legends',
    data: {
      legends: [],
    },
  })

  stats.onload = function() {
    var limit = 10
    var stat = stats.get(0)
    var author = stat.author
    var labels = stat.dates.slice(-limit)
    var adds = stat.adds.slice(-limit)
    var dels = stat.dels.slice(-limit)
    var color = 'rgba(255, 228, 225, 1)'
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
        name: author,
        color: color,
      }
    ]
  }
  stats.load()
})
