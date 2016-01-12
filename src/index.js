#!/usr/bin/env node
"use strict";

require("./load-env-and-validate.js");

const resultsTable = require("./lib/results-table.js");
const githubApiClient = require("./lib/github-api.js")(process.env.GITHUB_OAUTH_TOKEN);

/***************************************************

  Step 1: Search for all PRs that match criteria

***************************************************/
const user = process.env.GITHUB_USER || "socialtables";
const startingDate = process.env.STARTING_DATE || "2016-01-01";
const searchTerm = `user:${user} type:pr is:merged merged:>=${startingDate}`;

githubApiClient.findPullRequests(searchTerm, (err, pullRequest) => {

  for(const pr of pullRequest) {
    githubApiClient.pullRequests.get({ })
  }

});