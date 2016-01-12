"use strict";

const GitHubApi = require("github");

module.exports = function(oauthToken) {

  // Instantiate
  const githubApiClient = new GitHubApi({
    // required
    version: "3.0.0"
  });

  // Set credentials
  githubApiClient.authenticate({
    type: "oauth",
    token: oauthToken
  });

  // Define custom methods
  function findPullRequests(searchTerm, callback) {
    let pullRequests = [];

    const requestCallbackHandler = (err, res) => {
      if (err) {
        throw new Error("Failed to fetch PRs from Github: ", err);
      }

      res.items.forEach((i) => pullRequests.push({ number: res.number, });

      if (githubApiClient.hasNextPage(res)) {
        githubApiClient.getNextPage(res, requestCallbackHandler);
      }
      else {
        callback(null, pullRequests);
      }
    };

    githubApiClient.search.issues({
      "q": searchTerm,
      "per_page": 100
    }, requestCallbackHandler);
  };

  // expose public interface
  return Object.assign(githubApiClient, {
    findPullRequests
  });

}; // End of module
