$(document).ready(function() {
  var chart = new Chart($('#chart').get(0).getContext('2d'))
  var line = null
  var current_activities = new Activities([])

  var legends = new Vue({
    el: '#legends',
    data: {
      legends: [],
    },
  })

  var selected = new Vue({
    el: '#selected',
    data: {
      repositories: {},
    },
    methods: {
      del: function(e) {
        var repo = e.target.value
        console.log(repo)
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
            console.log("load complete")
            console.log(new_activities)
            current_activities = current_activities.merge(new_activities)
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
            var data = ChartData.from_activities(current_activities, colors)
            if (line) {
              line.destroy()
            }
            line = chart.Line({
              labels: data.labels,
              datasets: data.datasets,
            })
            legends.legends = data.legends
          })
        }
      },
    },
  })
})
