$('#git_tree_content').on("select_node.jstree", function(e, data){
  $.ajax('blob/content', {
    type: 'get',
    data: { sha: data.node.data , key: key},
    success : function(data) {
      $("#git_code").html(data.data);
    },
    error: function() {
      alert("Error");
    }
  });
}).jstree({ 'core' : {
  'data' : tree_content 
   } 
});