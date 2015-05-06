$("a.test_output").click(function() {
  $("p.show-test-output").toggle();
});

$('#team_usernames').select2({
  multiple: true,
  delay: 250,
  ajax: {
    url: "/get_usernames",
    dataType: 'json',
    data: function (params) {
      return { query: params.term };
    },
    processResults: function (data, page) {
      return { results: data };
    },
    cache: true
  },
});
