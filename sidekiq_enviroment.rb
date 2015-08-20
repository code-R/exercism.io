$:.unshift File.expand_path("./../lib", __FILE__)

require 'bundler'
Bundler.require
I18n.enforce_available_locales = false


require 'sidekiq'
require 'app'

