#!/usr/bin/env node

require("./load-env-and-validate.js");

const resultsTable = require("./lib/results-table.js");
const githubApi = require("./lib/github-api.js")(process.env.GITHUB_OAUTH_TOKEN);

/***************************************************

  Step 1: Search for all PRs that match criteria

***************************************************/
const user = process.env.GITHUB_USER || "socialtables";
const startingDate = process.env.STARTING_DATE || "2016-01-01";
const searchTerm = `user:${user} type:pr is:merged merged:>=${startingDate}`;

githubApi.search.issues({
  "q": searchTerm,
  "per_page": 100
}, (err, res) => {
  if (err) {
    throw new Error("Failed to fetch PRs from Github: ", err);
  }
  console.log( JSON.stringify(res) );
});