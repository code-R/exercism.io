$:.unshift File.expand_path("./../lib", __FILE__)

require 'bundler'
Bundler.require
I18n.enforce_available_locales = false

if ENV['RACK_ENV'] != 'production'
  require 'dotenv'
  Dotenv.load
end

require 'app'
require 'api'

ENV['RACK_ENV'] ||= 'development'

key = ENV['NEW_RELIC_LICENSE_KEY']
if key
  NewRelic::Agent.manual_start(license_key: key)
end

if ENV['RACK_ENV'].to_sym == :development
  require 'new_relic/rack/developer_mode'
  use NewRelic::Rack::DeveloperMode
end

use ActiveRecord::ConnectionAdapters::ConnectionManagement
run ExercismWeb::App

map '/api/v1/' do
  run ExercismAPI::App
end

require 'sidekiq/web'
Sidekiq::Web.use Rack::Session::Cookie, :secret => ENV['RACK_SESSION_COOKIE']
run Rack::URLMap.new('/' => ExercismWeb::App, '/sidekiq' => Sidekiq::Web)
