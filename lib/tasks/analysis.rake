require 'exercism'
namespace :analysis do
  desc "Run analysis jobs for specified language"
  task :run, [:language] do |t, args|
    #run for specified language if language is provided.
    submissions = args[:language].present? ? Submission.where(language: args[:language].downcase) : Submission.all
    submissions.each do |s| 
      result = CodeAnalyzer.build({language: s.language, 
                                   code: s.code, 
                                   git_rep_info: s.git_rep_info, 
                                   user: s.user}).run
      s.update_attributes({analysis: result})
      sleep 30
    end
  end
end
