require("dotenv").load();

if (!process.env.GITHUB_OAUTH_TOKEN) {
  throw new Error("Error: GITHUB_OAUTH_TOKEN env variable not specified!");
}
