$(document).ready(function() {
  var selected = new Vue({
    el: '#selected',
    data: {
      repositories: {},
    },
  })

  var select = new Vue({
    el: '#select',
    data: {
      selected: $('option')[0].text,
    },
    methods: {
      add: function() {
        var repositories = selected.repositories
        var repository = this.selected
        if (!repositories[repository]) {
          repositories.$add(repository, true)
          var loader = new Loader()
          var url = repository + '/stats/activity/json'
          loader.load_activities(url, function(activities) {
            console.log("load complete")
            console.log(activities)
          })
        }
      },
    },
  })
})
