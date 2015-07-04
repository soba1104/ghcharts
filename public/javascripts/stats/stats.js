function Stats(url) {
  return {
    url: url,
    stats: {activities: []},
    activities: function() { return this.stats.activities },
    load: function() {
      $.get(url, function(data) {
        var activities = []
        for (var i = 0; i < data.length; i++) {
          var author = data[i].author
          var activity = data[i].activity
          activities.push(new Activity(author, activity))
        }
        this.stats = {activities: activities}
        this.onload()
      }.bind(this))
    },
    onload: function() {},
  }
}
