$( document ).ready(function() {
  // $('#jstree_demo_div').jstree({ 'core' : {
  //     'data' : [
  //        'Simple root node',
  //        {
  //          'text' : 'Root node 2',
  //          'state' : {
  //            'opened' : true,
  //            'selected' : true
  //          },
  //          'children' : [
  //            { 'text' : 'Child 1' },
  //            'Child 2'
  //          ]
  //       }
  //     ]
  // } });

  $('#jstree_demo_div').on("select_node.jstree", function(e, data){
    console.log(data);
    if(data.node.icon == "jstree-file"){
      // $.get("abc?path=" + data.node.id, function( data ) {
      //   alert( "Load was performed." );
      // });
      $.ajax('abc', {
        type: 'get',
        data: { path: data.node.id },
        dataType: 'json',
        success : function(data) {
          $("#code").html(data.data);
        },
        error: function() {
            alert("Error");
        }
      });
    }
  }).jstree({
    'core' : {
      'data' : {
        'url' : "/abc",
        'data' : function (node) {
          return {
            'path' : node.id
          };
        }
      }
    }
  });

});
