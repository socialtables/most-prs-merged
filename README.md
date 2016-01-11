# Most PRs Merged

## Description

This is a simple Node.js-based CLI tool that reports the # of Github Pull Requests merged by each member of a specified organization

## Instructions

* Clone down the repository
* Install all the dependencies -- `npm install`
* Install the binary on your system -- `npm link`
* Make sure specified environment variables are defined in `.env` file!
* Execute the binary:

```sh

$ most-prs-merged

## TODO: show example output of command
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
GITHUB_OAUTH_TOKEN=<your-github-oauth-token>
GITHUB_ORG=<your-github-org-name>
MERGED_AFTER_DATE="2016-01-01" ## FORMAT: "YYYY-MM-DD"
```