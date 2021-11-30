const chai = require("chai");
const sinon = require("sinon");
const Octokit = require("@octokit/rest");
const axios = require("axios");

describe("Issue Unit Test", () => {
  let issue = null;
  let interaction = null;
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    interaction = {
      options: {
        getString: sandbox.stub().returns("test"),
      },
      member: {
        user: {
          id: "testId",
        },
      },
      deferReply: sandbox.spy(),
      editReply: sandbox.spy(),
    };
    sandbox.stub(axios, "get").returns({
      body: {
        token: "testToken",
      },
    });

    sandbox.stub(Octokit, "Octokit").returns({
      issues: {
        create: sandbox.stub().callsFake((result) => {
          chai.expect(result.owner).to.equal("test", "Wrong Owner");
          chai.expect(result.repo).to.equal("test", "Wrong Repo");
          chai.expect(result.title).to.equal("test", "Wrong title");
        }),
      },
    });

    issue = require("../src/commands/issue");
  });
  after(() => {
    sandbox.restore();
  });
  it("Command Executes", async () => {
    return issue.execute(interaction).then(() => {
      chai.expect(interaction.deferReply.calledOnce).to.be.true;
      chai.expect(interaction.editReply.calledOnce).to.be.true;
    });
  });
});
