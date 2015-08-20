require 'sidekiq'
module Jobs
  class Analyze
    include Sidekiq::Worker
    sidekiq_options :queue => :analyze

    def perform(submission_key)
      # This exists solely to get the job scheduled.
      # There is a stand-alone worker that processes
      # the jobs.
      # See https://github.com/exercism/rikki
      submission = ::Submission.find_by key: submission_key
      puts "<==========perfroming analyis=============>"
      if submission
        result = ::CodeAnalyzer.build({ language: submission.language,
                                              code: submission.code,
                                              git_rep_info: submission.git_rep_info,
                                              user: submission.user }).run
        submission.update_attributes({analysis: result})
      end
    end
  end
end
