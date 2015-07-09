function Activities(d) {
  return {
    data: d,
    dates: function() {
      var dates_h = this.group_by_date()
      var dates_a = Object.keys(dates_h)
      return dates_a.sort()
    },
    users: function() {
      var data = this.data
      var users_h = {}
      for (var i = 0; i < data.length; i++) {
        var act = data[i]
        users_h[act.user] = true
      }
      var users_a = Object.keys(users_h)
      return users_a
    },
    filter_by_span: function(span) {
      var data = this.data
      var dates = this.dates().slice(-span)
      var s = dates[0]
      var e = dates[dates.length - 1]
      return new Activities(data.filter(function(act) {
        return s <= act.date && act.date <= e
      }))
    },
    group_by_date: function() {
      var data = this.data
      var groups = {}
      for (var i = 0; i < data.length; i++) {
        var act = data[i]
        groups[act.date] = groups[act.date] || []
        groups[act.date].push(act)
      }
      return groups
    },
  }
}
