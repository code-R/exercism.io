FROM ruby:2.1.5

RUN mkdir /exercism

WORKDIR /exercism

ADD . /exercism

RUN bundle install
