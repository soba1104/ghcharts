function Stats(url) {
  return {
    url: url,
    labels: [],
    dates: [],
    dels: [],
    load: function() {
      $.get(url, function(data) {
        var stat = data[0]
        var author = stat.author
        var activity = stat.activity
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
        this.dates = dates
        this.adds = adds
        this.dels = dels
        this.onload()
      }.bind(this))
    },
    onload: function() {},
  }
}
