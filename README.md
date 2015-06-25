## Hootcode
Hootcode is a fork of [Exercism](http://exercism.io). It's a work-in-progress with support for GitHub based project hosting and more.

## Contributing

If you would like to contribute to exercism, then please read the
[CONTRIBUTING.md](./CONTRIBUTING.md)
document, which describes the various parts of the system and how they fit together.

## Building
Please refert to the [BUILDING.md](./BUILDING.md) file for detailed instructions on how to get hootcode running locally.

### Styleguide

Our styleguide is under [/styleguide](http://exercism.io/styleguide) and built with [KSS](https://github.com/kneath/kss), which enables you to write examples to `*.scss` files.

## Sending Emails
You need to have mailcatches installed.
```zsh
gem install mailcatcher
```

[MailCatcher](http://mailcatcher.me) is used to catch and view emails locally.

Do the following to test an email:

* Start MailCatcher: `mailcatcher` or `mailcatcher -f` to run in the foreground
* Send a test message. For example, `ruby test/services/notification_message_test.rb` will send a test notification email.
* Open [localhost:1080](http://localhost:1080) and you should see the test email

If you want to send emails, you will need to fill out the relevant environment variables in `.env` and uncomment the lines so the variables get exported.

## Console

There's a script in `bin/console` that will load pry with the exercism environment loaded.
This will let you poke around at the objects in the system, such as finding users and changing
things about submissions or comments, making it easier to test specific things.

```ruby
user = User.find_by_username 'whatever'
user.submissions
```

## Testing

1. Create a test database: `createdb -O exercism exercism_test`
2. Prepare the test environment: `RACK_ENV=test rake db:migrate`
3. Make sure MailCatcher is running: `mailcatcher`
4. Run the test suite: `rake` or `rake test`

To run a single test suite, you can do so with:

```bash
ruby path/to/the_test.rb
```

If it complains about dependencies, then either we forgot to require the correct dependencies (a distinct possibility), or we are dependening on a particular tag of a gem installed directly from GitHub (this happens on occasion).

If there's a git dependency, you can do this:

```bash
bundle exec ruby path/to/the_test.rb
```

For the require, you'll need to figure out what the missing dependency is. Feel free to [open a GitHub
issue](https://github.com/exercism/exercism.io/issues). It's likely that someone familiar with the codebase will be able to identify the problem immediately.

### Code Coverage

To enable code coverage run:

```bash
COVERAGE=1 rake test
```

Browse the results located in `coverage/index.html`

## Deployment

Let Heroku know that Lineman will be building our assets. From the command line:
```bash
heroku config:set BUILDPACK_URL=https://github.com/testdouble/heroku-buildpack-lineman-ruby.git
```

## License

GNU Affero General Public License

Copyright (C) 2015 Katrina Owen, _@kytrinyx.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.
