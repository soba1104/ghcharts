function Stats(url) {
  return {
    url: url,
    stats: [],
    get: function(i) { return this.stats[i] },
    length: function() { return this.stats.length },
    span: function(span, stats) {
      stats = stats ? stats : this.stats
      return stats.map(function(s) {
        s.span(span)
      })
    },
    load: function() {
      $.get(url, function(data) {
        var stats = []
        for (var i = 0; i < data.length; i++) {
          var name = data[i].author
          var activity = data[i].activity
          stats.push(new Author(name, activity))
        }
        this.stats = stats
        this.onload()
      }.bind(this))
    },
    onload: function() {},
  }
}
