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

  // return client
  return githubApiClient;
};
