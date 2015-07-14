function Loader() {
  return {
    load: function(url) {
      $.get(url, function(data) {
        var acts = []
        for (var i = 0; i < data.length; i++) {
          acts.push(new Activity(data[i]))
        }
        this.onload(new Activities(acts))
      }.bind(this))
    },
    onload: function(activities) {},
  }
}
