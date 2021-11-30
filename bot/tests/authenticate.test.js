const chai = require("chai");
const sinon = require("sinon");

const axios = require("axios");
const { expect } = require("chai");
const OAuth = require("@octokit/auth-oauth-app");
const Octokit = require("@octokit/rest");

describe("Authentication Unit Test", () => {
  let authenticate = null;
  let interaction = null;
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    interaction = {
      deferReply: sandbox.spy(),
      member: {
        user: {
          username: "testDiscordUsername",
          id: "testDiscordId",
        },
      },
      editReply: sandbox.spy(),
      followUp: sandbox.spy(),
    };
    sandbox.stub(OAuth, "createOAuthAppAuth").returns(() => {
        interaction.editReply();
        interaction.followUp();
        return {token: "testToken"}
    })
    sandbox.stub(Octokit, "Octokit").returns({
      rest: {
        users: {
          getAuthenticated: sinon.stub().returns({
            data: {
              login: "testUsername",
            },
          }),
        },
      },
    });
    sandbox.stub(axios, "post").callsFake((url, params) => {
      if (url == "http://backend:3001/accounts") {
        chai.expect(params.discord_id).to.equal("testDiscordId");
        chai.expect(params.github_username).to.equal("testUsername");
        chai.expect(params.discord_username).to.equal("testDiscordUsername");
        chai.expect(params.discord_email).to.equal("Test@gmail.com");
      } else if (url == "http://backend:3001/ghauth") {
        chai.expect(params.github_username).to.equal("testUsername");
        chai.expect(params.oauth_token).to.equal("testToken");
      };
    }).resolves();
    authenticate = require("../src/commands/authenticate");
  });
  after(() => {
    sandbox.restore();
  })
  it("Command Executes", async () => {
    return authenticate.execute(interaction).then(() => {
      expect(interaction.deferReply.calledOnce).to.be.true;
      expect(interaction.editReply.calledOnce).to.be.true;
      expect(interaction.followUp.calledTwice).to.be.true;
    });
  });
});
