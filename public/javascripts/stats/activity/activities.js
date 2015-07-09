function Activities(data) {
  return {
    data: data,
    filter_by_span: function(span) {
      var data = this.data
      var dates_h = {}
      for (var i = 0; i < data.length; i++) {
        var act = data[i]
        dates_h[act.date] = true
      }
      var dates_a = Object.keys(dates_h)
      var dates = dates_a.sort().slice(-span)
      var s = dates[0]
      var e = dates[dates.length - 1]
      return new Activities(data.filter(function(act) {
        return s <= act.date && act.date <= e
      }))
    }
  }
}
