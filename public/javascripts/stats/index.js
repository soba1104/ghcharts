$(document).ready(function() {
  $.get($(location).attr('href') + '/json', function(data) {
    var stat = data[0]
    var author = stat.author
    var activity = stat.activity
    var labels = []
    var adds = []
    var dels = []
    for (var i = 0; i < activity.length; i++) {
      var date = new Date(activity[i].w * 1000)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var datestr = year + '/' + month + '/' + day
      var add = activity[i].a
      var del = -activity[i].d

      labels.push(datestr)
      adds.push(add)
      dels.push(del)
    }
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
    new Chart($('#line').get(0).getContext('2d')).Line({
      labels: labels,
      datasets: datasets,
    })
  })
})
