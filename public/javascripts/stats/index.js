$(document).ready(function() {
  var stats = new Stats($(location).attr('href') + '/json')
  stats.onload = function() {
    var limit = 10
    var labels = stats.dates.slice(-limit)
    var adds = stats.adds.slice(-limit)
    var dels = stats.dels.slice(-limit)
    var datasets = [
      {
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: 'rgba(255, 228, 225, 1)',
        pointColor: 'rgba(255, 228, 225, 1)',
        pointStrokeColor: '#fff',
        data: adds,
      },
      {
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: 'rgba(230, 230, 250, 1)',
        pointColor: 'rgba(230, 230, 250, 1)',
        pointStrokeColor: '#fff',
        data: dels,
      },
    ]
    new Chart($('#chart').get(0).getContext('2d')).Line({
      labels: labels,
      datasets: datasets,
    })
  }
  stats.load()
})
