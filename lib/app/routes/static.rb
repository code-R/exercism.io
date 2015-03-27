module ExercismWeb
  module Routes
    class Static < Core
      get '/abc' do
        content_type :json

        # SaiVardhan/hamming
        # res = [
        #   {"id"=>"ajson1", "parent"=>"#", "text"=>"Simple root node"},
        #   {"id"=>"ajson2", "parent"=>"#", "text"=>"Root node 2"},
        #   {"id"=>"ajson3", "parent"=>"ajson2", "text"=>"Child 1"},
        #   {"id"=>"ajson4", "parent"=>"ajson2", "text"=>"Child 2"}
        # ]
        Octokit.configure do |c|
          c.login = 'SaiPramati'
          c.password = 'pramati123'
        end
        path = params[:path] == "#" ? "" : params[:path]
        contents = Octokit.contents("prasadsurase/calculator", path: path)

        if contents.is_a? Array
          res = []
          contents.each do |cont|
            cont.text = cont.name
            cont.id = cont.path
            if(cont.type == 'dir')
              cont.children = true
            else
              cont.icon = "jstree-file"
            end
            res << cont.to_hash
          end
        else
          response = Base64.decode64(contents.content)
          marked_content = ConvertsMarkdownToHTML.convert("```javascript\n#{response}\n```")
          res = { data: marked_content }
        end

        res.to_json
      end

      get '/git_tree' do
        erb :"site/git_tree"
      end

      get '/rikki' do
        erb :"site/rikki"
      end

      get '/donate' do
        erb :"site/donate"
      end

      get '/privacy' do
        erb :"site/privacy"
      end

      get '/about' do
        erb :"site/about", locals: {active_languages: active_languages, upcoming_languages: upcoming_languages, planned_languages: planned_languages}
      end

      get '/getting-started' do
        erb :"site/getting-started", locals: {active_languages: active_languages}
      end

      get "/installing-cli" do
        erb :"site/installing-cli", locals: { active_languages: active_languages }
      end

      get "/java-exercises" do
        erb :"site/java-exercises"
      end

      get "/ruby-exercises" do
        erb :"site/ruby-exercises"
      end

      get "/javascript-exercises" do
        erb :"site/javascript-exercises"
      end

      get "/create-assignment" do
        erb :"site/create-assignment", locals: { active_languages: active_languages }
      end

      get "/submit-assignment" do
        erb :"site/submit-assignment", locals: { active_languages: active_languages }
      end

      get '/bork' do
        raise RuntimeError.new("Hi Bugsnag, you're awesome!")
      end

      get '/no-such-page' do
        status 404
        erb :"errors/not_found"
      end
    end
  end
end
