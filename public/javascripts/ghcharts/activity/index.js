$(document).ready(function() {
  var chart = new Chart($('#chart').get(0).getContext('2d'))
  var line = null
  var current_activities = new Activities([])

  var colors = [
    'rgba(255, 0, 0, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(0, 255, 255, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(192, 192, 192, 1)',
    'rgba(128, 0, 0, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(0, 0, 128, 1)',
    'rgba(128, 128, 0, 1)',
    'rgba(0, 128, 128, 1)',
    'rgba(128, 0, 128, 1)',
  ]

  var legends = new Vue({
    el: '#legends',
    data: {
      legends: [],
    },
  })

  var draw = function() {
    if (line) {
      line.stop()
      line.destroy()
      line = null
      legends.legends = []
    }
    if (current_activities.size() > 0) {
      var data = ChartData.from_activities(current_activities, colors)
      line = chart.Line({
        labels: data.labels,
        datasets: data.datasets,
      })
      legends.legends = data.legends
    }
  }

  var selected = new Vue({
    el: '#selected',
    data: {
      repositories: {},
    },
    methods: {
      del: function(e) {
        var repository = e.target.value
        current_activities = current_activities.remove_repository(repository)
        selected.repositories.$delete(repository)
        draw()
      },
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
          var url = repository + '/activity/json'
          loader.load_activities(url, function(new_activities) {
            current_activities = current_activities.merge(new_activities)
            draw()
          })
        }
      },
    },
  })
})
