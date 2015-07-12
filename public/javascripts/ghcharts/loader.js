function Loader() {
  return {
    load_activities: function(url, cbk) {
      $.get(url, function(data) {
        var acts = []
        for (var i = 0; i < data.length; i++) {
          acts.push(new Activity(data[i]))
        }
        cbk(new Activities(acts))
      }.bind(this))
    },
  }
}
