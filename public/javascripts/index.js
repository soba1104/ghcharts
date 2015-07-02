$(document).ready(function() {
  var data = {
    labels: [
      '2015-04-05',
      '2015-04-12',
      '2015-04-19',
      '2015-04-26',
      '2015-05-03',
      '2015-05-10',
      '2015-05-17',
      '2015-05-24',
      '2015-05-31',
      '2015-06-07',
      '2015-06-14',
      '2015-06-21',
      '2015-06-28',
    ],
    datasets: [
      {
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: 'rgba(255, 228, 225, 1)',
        pointColor: 'rgba(255, 228, 225, 1)',
        pointStrokeColor: '#fff',
        data: [56, 868, 552, 116, 0, 59, 6, 11, 59, 8, 114, 109, 23],
      },
      {
        fillColor: 'rgba(255, 255, 255, 0)',
        strokeColor: 'rgba(230, 230, 250, 1)',
        pointColor: 'rgba(230, 230, 250, 1)',
        pointStrokeColor: '#fff',
        data: [-0, -187, -232, -20, -0, -30, -0, -9, -16, -0, -9, -51, -4],
      },
    ]
  }
  console.log($('#line').get(0).getContext('2d'))
  new Chart($('#line').get(0).getContext('2d')).Line(data)
})
