function Activity(data) {
  function normalize(s) { return s < 10 ? '0' + s : s }
  var date = new Date(data.time * 1000)
  var year = date.getFullYear()
  var month = normalize(date.getMonth() + 1)
  var day = normalize(date.getDate())
  var datestr = year + '/' + month + '/' + day

  return {
    user: data.user,
    add: data.add,
    del: data.del,
    time: data.time,
    date: datestr,
  }
}
