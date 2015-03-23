$(document).ready(function() {
            //$(".tree_anchor").click(function(e) {
            $(document).on("click",".tree_anchor",function(e){
              //  e.preventDefault();
                var resp = $(this).attr("data-url");
                //alert(resp);
                $.ajax({
                  url: "/get_tree_source",
                  type: "GET",
                  dataType: "json",
                  data: {github_api_url: resp},
                  success: function (returndata)
                  {
                     $("#tree_res").html(returndata.key1);
                       console.log(returndata);
                      
                  },
                  error: function(res,stat,err)
                  {
                  	//console.log(res.responseText);
                  	alert("Something went wrong" + err.Message);
                  	
                  }  
                });
                             
            });   
            // $(".blob_anchor").on("click", function(e) {
              $(document).on("click",".blob_anchor",function(e){
                //e.preventDefault();
                var resp = $(this).attr("data-url");
               // alert(resp);
                $.ajax({
                  url: '/get_blob_source?github_api_url=' + resp,
                  dataType: "json",
                  success: function (response)
                  {   
                    console.log(response);
                    // var content = window.atob(response['content']);
                    //   var path = response['path'];
                      $("#result").html(response.key1);
                    //   console.log(window.atob(response['content']));
                      //alert('Load was performed.');
                  }, 
                  error: function(e) 
                  {
                  	alert("Something went wrong");
                  	return false;
                  }
                });
                
            });
        });