class GithubSource
  attr_reader :github, :user, :slug, :code

  def initialize(submission)
    @github = Github.new basic_auth: 'SaiPramati:pramati123'
    @user = submission.user
    @slug = submission.slug
    @code = submission.code
  end

  def solution
    trees = github.git_data.trees.get user.username, slug, code

    res = []
    trees.tree.each do |tree_item|
      res1 = {}
      uri = URI(tree_item.url)
      resp = JSON.parse(Net::HTTP.get(uri))
      res1["path"] = tree_item.path
      res1["type"] = tree_item.type
      res1["url"]= resp["url"]
      #res["content"] = Base64.decode64(resp["content"])
      res << res1
      
      # if tree_item.type == "blob"
      #   res1 = {}
      #   uri = URI(tree_item.url)
      #   resp = JSON.parse(Net::HTTP.get(uri))
      #   res1["path"] = tree_item.path
      #   res1["type"] = tree_item.type
      #   res1["url"]= resp["url"]
      #   #res["content"] = Base64.decode64(resp["content"])
      #   res << res1
        
      # elsif tree_item.type == "tree"
      #   res2 = {}
      #   uri = URI(tree_item.url)
      #   resp = JSON.parse(Net::HTTP.get(uri))
      #   res2["path"] = tree_item.path
      #   res2["type"] = tree_item.type
      #   res2["url"] = resp["url"]
      #   #res["content"] = Base64.decode64(resp["content"])
      #   res << res2
      # end
    end

    res
  end


end
