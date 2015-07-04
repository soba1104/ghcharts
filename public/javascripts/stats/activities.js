function Activities(activities) {
  return {
    activities: activities,
    num: function() { return activities.length },
    get: function(i) { return activities[i] },
    span: function(span) {
      return new Activities(activities.map(function(act) {
        return act.span(span)
      }))
    },
    order_by: function(order) {
      return new Activities(activities.sort(function(a0, a1) {
        var s0 = a0.score[order]
        var s1 = a1.score[order]
        return s1 - s0
      }))
    },
  }
}
