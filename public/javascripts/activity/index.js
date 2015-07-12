$(document).ready(function() {
  var svm = new Vue({
    el: '#select',
    data: {
      selected: $('option')[0].text,
    },
    watch: {
      selected: function(n, o) {
        console.log(o + ' => ' + n)
      },
    },
  })
})
