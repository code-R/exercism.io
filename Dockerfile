FROM ruby:2.1.5

RUN mkdir /exercism

WORKDIR /exercism

ADD Gemfile /exercism/Gemfile

ADD Gemfile.lock /exercism/Gemfile.lock

RUN bundle install

ADD . /exercism

ADD config/docker/docker_db.yml /exercism/config/database.yml
