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
  }
}
