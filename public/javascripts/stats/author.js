function Author(name, activity, span) {
  var dates = []
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
    name: name,
    activity: activity,
    dates: dates,
    adds: adds,
    dels: dels,

    span: function(span) {
      return (new Author(this.name, this.activity, span))
    }
  }
}
