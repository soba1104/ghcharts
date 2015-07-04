function Stats(url) {
  return {
    url: url,
    stats: [],
    get: function(i) { return this.stats[i] },
    length: function() { return this.stats.length },
    load: function() {
      $.get(url, function(data) {
        var stats = []
        for (var i = 0; i < data.length; i++) {
          stats.push(new Stat(data[i]))
        }
        this.stats = stats
        this.onload()
      }.bind(this))
    },
    onload: function() {},
  }
}
