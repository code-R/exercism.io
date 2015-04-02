$('#git-tree-content').on('select_node.jstree', function(e, data){
  var gitNode = data.node.data;
  if(gitNode.type === 'file'){
  $.ajax('blob/content', {
    type: 'get',
    data: { sha: gitNode.sha , key: key},
    success : function(response) {
      $('#git-code').html(response.data);
    },
    error: function() {
      alert("Error");
    }
  });
}
}).jstree({ 'core' : {
  'data' : tree_content 
   } 
});