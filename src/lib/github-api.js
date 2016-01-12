"use strict";

const async = require("async");
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
        return callback(err);
      }

      res.items.forEach((i) => {
        const [,,,,user,repo,,number] = i.url.split("/");
        pullRequests.push({ user, repo, number });
      });

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

  function getFullPullRequestData(pullRequests, callback) {
    const requests = pullRequests.map((pr) => {
      return function(cb) {
        githubApiClient.pullRequests.get({
          "user": pr.user,
          "repo": pr.repo,
          "number": pr.number
        }, (err, res) => {
          if (err) {
            return cb(err);
          }
          cb(null, res);
        });
      };
    });

    async.parallelLimit(requests, 10, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  };

  // expose public interface
  return Object.assign(githubApiClient, {
    findPullRequests,
    getFullPullRequestData
  });

}; // End of module
