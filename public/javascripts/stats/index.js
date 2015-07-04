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
    var author = stats.author
    var labels = stats.dates.slice(-limit)
    var adds = stats.adds.slice(-limit)
    var dels = stats.dels.slice(-limit)
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
