$(document).ready(function() {
            $(".tree_anchor").click(function(e) {
                e.preventDefault();
                var resp = $(this).attr("href")
               // alert(resp);
                $.ajax({
                  url: resp,
                  dataType: "json",
                  success: function (returndata)
                  {
                     // $("#result").html(returndata[0]["object"]["sha"]);
                      console.log(returndata)
                      alert('Load was performed.');
                  }  
                });
                             
            });    
            $(".blob_anchor").click(function(e) {
                e.preventDefault();
                var resp = $(this).attr("href")
               // alert(resp);
                $.ajax({
                  url: resp,
                  dataType: "json",
                  success: function (response)
                  {   var content = window.atob(response['content']);
                      $("#result").html("#<%= md(content)%>);
                      console.log(window.atob(response['content']));
                      //alert('Load was performed.');
                  }  
                });
                
            });
        });