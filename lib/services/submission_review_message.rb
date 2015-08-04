class SubmissionReviewMessage < Message

  def subject
    "#{from} has invited you to review the submission"
  end

  def template_name
    'submission_review'
  end

  def recipient
    username = YAML.load_file('reviewers.yml')[ENV['RACK_ENV']][@target.fetch(:submission).language][0]
    User.find_by username: username
  end

  def from_email
    'Hootcode <hootcode@gmail.com>'
  end

  def submission
    @target.fetch(:submission)
  end

end
