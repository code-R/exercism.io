# Building

## Requirements 
#### Ruby
It's recommended that you use environment managers like [RVM](https://rvm.io), [rbenv](https://github.com/sstephenson/rbenv) or [chruby](https://github.com/postmodern/chruby). The instructions here assume you are using RVM.

RVM, after finishing installation, may ask you to add your user to `rvm` group. Here's how to do that.

```zsh
sudo usermod -a -G rvm $(whoami)
```
You will also be required to be on a login shell for using RVM. On Ubuntu, you can do that as follows.
- <kbd>Right Click</kbd> on **Terminal**        
- **Profiles** > **Profile Preferences** > **Command** 
- Make sure *Run command as a login shell* is checked. 
- Logout and login

#### PostgreSQL
PostgreSQL 9.2 or higher is required.

```zsh
sudo apt-get install postgresql libpq-dev
```

#### NodeJS
Follow instructions [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) 

## GitHub Application Setup
You need to [create app on GitHub](https://github.com/settings/applications/new)  and get the **API Key**  and **Secret Key**. This is required in order to make your local instance talk to GitHub.

- **Application Name :** Anything you want. E.g - HootcodeDev  
- **Homepage URL :** `http://localhost:4567`  
- **Application Callback URL :** `http://localhost:4567/github/callback`  
- <kbd>Register Application</kbd>

Copy the generated **Client ID** and **Client Secret**. These will be later required for setting up environment.

## Setting Up Environment
Go to root of your local project directory and run the following commands.
```zsh
cp .ruby-version.example .ruby-version
cp config/env .env
```
**.env** contains the port on which your local app will run. Default is `4567`. It also stores the keys  **Client ID** and **Client Secret** generated during *GitHub Application Setup* step.

Open **.env** file in a text editor and update the values of following. Leave everything else as is for now.
```
EXERCISM_GITHUB_CLIENT_ID
EXERCISM_GITHUB_CLIENT_SECRET
```
## Setting Up Dependencies
Dependencies are maintained using RubyGems & Bundler.

#### Install Bundler
```zsh
gem install bundler
```
**NOTE :** This SHOULD NOT require `sudo`. If this does not work, make sure you have added your user to the `rvm` group. 

Once **bundler** is installed, navigate to root directory and run...
```zsh
bundle install # note it's bundle and not bundler
```
## Setting Up Database
You will need to create a user named **exercism** with whatever password you have configured in **/config/database.yml**. By default it's `apples`

You can do so by logging in as **postgres**.
```zsh
sudo su - postgres
createuser --superuser -P exercism
```

- `rake db:setup` - Create the PostgreSQL database
- `rake db:migrate` - Run the database migrations
- `rake db:seeds:fetch` - Fetch the seed data
- `rake db:seed` - Seed the database

## Starting Server
From root directory run...
```zsh
foreman start 
# OR SOMETIMES
bundle exec foreman start
```
Navigate to [http://localhost:4567](http://localhost:4567).

## Frontend Development
You need to have [lineman](https://github.com/linemanjs/lineman)  installed  globally. You will also need to run `npm intall` inside `frontend` directory for fetching other dependencies.
```zsh
sudo npm install -g lineman
cd frontend
npm install
```
You can then either run...
```zsh
lineman run # builds assets and keeps watching for changes
# OR
lineman build # builds minified assets once.
```
## Compiling SASS
[Compass](http://compass-style.org/) is used for compiling SASS and other mixins. 
- `compass compile` Compiles SASS/SCSS based on **/config.rb**. 
- `compass watch` Watches for file modifications.







 




