function Activities(data) {
  return {
    data: data,
    filter_by_span: function(span) {
      var times = []
      var data = this.data
      for (var i = 0; i < data.length; i++) {
        var act = data[i]
        console.log("time = " + act.date)
      }
    }
  }
}
