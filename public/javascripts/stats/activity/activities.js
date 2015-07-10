function Activities(d) {
  return {
    data: d,
    dates: function() {
      var dates_h = this.group_by_date()
      var dates_a = Object.keys(dates_h)
      return dates_a.sort()
    },
    users: function() {
      var users_h = this.group_by_user()
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
    filter_by_user_abs: function(num) {
      var data = this.data
      var users_h = this.group_by_user()
      var users_a = []
      for (var u in users_h) {
        var acts = users_h[u]
        var abs = acts.reduce(function(s, a) {
          return s + a.add - a.del
        }, 0)
        users_a.push([u, abs])
      }
      users_a = users_a.sort(function(u0, u1) {
        var s0 = u0[1]
        var s1 = u1[1]
        return s1 - s0
      }).slice(0, num).map(function(u) { return u[0] })
      users_h = {}
      for (var i = 0; i < users_a.length; i++) {
        users_h[users_a[i]] = true
      }
      return new Activities(data.filter(function(act) {
        return users_h[act.user]
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
    group_by_user: function() {
      var data = this.data
      var groups = {}
      for (var i = 0; i < data.length; i++) {
        var act = data[i]
        groups[act.user] = groups[act.user] || []
        groups[act.user].push(act)
      }
      return groups
    },
  }
}
