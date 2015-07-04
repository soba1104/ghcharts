function Author(name, activity) {
  return {
    name: name,
    activity: activity,
    span: function(span) {
      return (new Author(this.name, this.activity.span(span)))
    }
  }
}
