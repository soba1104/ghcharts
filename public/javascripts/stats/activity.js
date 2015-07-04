function Activity(data, span) {
  var dates = []
  var adds = []
  var dels = []
  for (var i = 0; i < data.length; i++) {
    var date = new Date(data[i].w * 1000)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var datestr = year + '/' + month + '/' + day
    var add = data[i].a
    var del = -data[i].d

    dates.push(datestr)
    adds.push(add)
    dels.push(del)
  }
  if (span) {
    dates = dates.slice(-span)
    adds = adds.slice(-span)
    dels = dels.slice(-span)
  }

  return {
    data: data,
    dates: dates,
    adds: adds,
    dels: dels,
    span: function(span) {
      return (new Activity(this.data, span))
    },
  }
}
