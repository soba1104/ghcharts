function Activity(data) {
  var date = new Date(data.time * 1000)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var datestr = year + '/' + month + '/' + day

  return {
    add: data.add,
    del: data.del,
    time: data.time,
    date: datestr,
  }
}
