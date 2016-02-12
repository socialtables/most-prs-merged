#!/usr/bin/env node-harmony
"use strict";

require("./load-env-and-validate.js");

const resultsTable = require("./lib/results-table.js");
const githubApiClient = require("./lib/github-api.js")(process.env.GITHUB_OAUTH_TOKEN);

/***************************************************

  Step 1: Search for all PRs that match criteria

***************************************************/
const user = process.env.GITHUB_USER || "socialtables";
const startingDate = process.env.STARTING_DATE || "2016-01-01"; // YYYY-MM-DD
const searchTerm = `user:${user} type:pr is:merged merged:>=${startingDate}`;

githubApiClient.findPullRequests(searchTerm, (err, pullRequests) => {

  if (err) {
    throw new Error(err);
  }

  /***************************************************

    Step 2: Get full data for Pull Requests (including merged_by)

  ***************************************************/
  githubApiClient.getFullPullRequestData(pullRequests, (err, fullPullRequestData) => {
    if (err) {
      throw new Error(err);
    }

    /***************************************************

      Step 3: Aggregate data by creating a map that maps Github username -> merged PRs count

    ***************************************************/
    const nameToCountData = fullPullRequestData.reduce((loginToCountMap, pr) => {

      const mergedByInfoExists = pr.merged_by && pr.merged_by.login;
      const entryExistsInMap = loginToCountMap[pr.merged_by.login] !== undefined;

      if (mergedByInfoExists && entryExistsInMap) {
        loginToCountMap[pr.merged_by.login]++;
      }
      else if (mergedByInfoExists && !entryExistsInMap) {
        loginToCountMap[pr.merged_by.login] = 1;
      }

      return loginToCountMap;

    }, {});

    /***************************************************

      Step 4: Add data to table and sort by count

    ***************************************************/
    Object.keys(nameToCountData).forEach((name) => {
      resultsTable.addRow({ name: name, count: nameToCountData[name] });
    });
    resultsTable.sortByCount();

    /***************************************************

      Step 5: Output to Terminal

    ***************************************************/
    console.log(`Starting Date:  ${startingDate}`);
    console.log(`Organization:  ${user}`);
    console.log("\n");
    console.log(resultsTable.toString());

  });

});
