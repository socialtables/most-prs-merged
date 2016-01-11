# Most PRs Merged

## Description

This is a simple Node.js-based CLI tool that reports the # of Github Pull Requests merged by a specified user or multiple users within an organization

## Instructions

* Clone down the repository
* Switch to specified Node version in `.nvmrc` -- `nvm use`
* Install all the dependencies -- `npm install`
* Install the binary on your system -- `npm link`
* Make sure specified environment variables are defined in `.env` file!
* Execute the binary:

```sh

$ most-prs-merged

Starting Date:  2016-01-01
Organization:  socialtables


Name             # of PRs Merged
---------------  ---------------
roloyolo         15
danberger        5
mr.bigglesworth  2

```

### .env files

The app relies on a number of env variables to run correctly. Most of these are
required in all environments for the app to work as expected, but some are used
for specific purposes and are not necessary (or even unwanted) in some environments.

We use [dotenv](https://github.com/bkeepers/dotenv) to manage these dependencies
locally. Before running the app for the first time, you must add a `.env` file
to the working directory. Below is an example .env file which contains all
env variables, with comments for special use.

```sh
GITHUB_OAUTH_TOKEN=<your-github-oauth-token> ## __<Required>__
GITHUB_USER="socialtables" ## __<Optional>__ This can be a Github username or organization name
STARTING_DATE="2016-01-01" ## __<Optional>__ FORMAT: "YYYY-MM-DD"
```