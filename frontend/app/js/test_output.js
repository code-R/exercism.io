$("a.test_output").click(function() {
  $("p.show-test-output").toggle();
});
$("#team_usernames").autocomplete({
  source: function(request, response){
    $.ajax({
      type: "GET",
      url: "/get_usernames",
      dataType: "json",               
      data: {
        q: request.term
      },
      success: function (data) {
        console.log("response", response(data));
        response(data);
      }              
    });
  },
});
