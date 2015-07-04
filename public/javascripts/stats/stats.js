function Stats(url) {
  return {
    url: url,
    stats: {activities: []},
    activities: function() { return this.stats.activities },
    load: function() {
      $.get(url, function(data) {
        //var repository = data.repository
        var acts = data.activities.map(function(act) {
          return new Activity(
            act.author,
            act.activity
          )
        })
        this.stats = {activities: new Activities(acts)}
        this.onload()
      }.bind(this))
    },
    onload: function() {},
  }
}
