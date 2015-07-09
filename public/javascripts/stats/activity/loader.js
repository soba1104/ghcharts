function Loader() {
  return {
    load: function(url) {
      $.get(url, function(data) {
        this.onload(new Activities(data))
      }.bind(this))
    },
    onload: function(activities) {},
  }
}
