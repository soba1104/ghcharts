$(document).ready(function() {
  var selected = new Vue({
    el: '#selected',
    data: {
      repositories: [],
    },
  })

  var select = new Vue({
    el: '#select',
    data: {
      selected: $('option')[0].text,
    },
    watch: {
      selected: function(n, o) {
        console.log(o + ' => ' + n)
      },
    },
    methods: {
      add: function() {
        selected.repositories.push(this.selected)
      },
    },
  })
})
