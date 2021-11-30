const chai = require("chai");
const sinon = require("sinon");
const Octokit = require("@octokit/rest");
const axios = require("axios");

describe("Assign Unit Test", () => {
  let assign = null;
  let interaction = null;
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    interaction = {
      options: {
        getString: sandbox.stub().returns("test"),
        getUser: sandbox.stub().returns("testUserId"),
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
        github_username: "testUserName",
        token: "testToken",
      },
    });
    sandbox.stub(Octokit, "Octokit").returns({
      issues: {
        addAssignees: sandbox.stub().callsFake((result) => {
          chai.expect(result.owner).to.equal("test", "Wrong owner");
          chai.expect(result.repo).to.equal("test", "Wrong repo");
          chai
            .expect(result.issue_number)
            .to.equal("test", "Wrong issue number");
          chai.expect(result.assignees).to.equal("testUserName");
        }),
      },
    });
    assign = require("../src/commands/assign");
  });
  after(() => {
    sandbox.restore();
  });
  it("Command Executes", async () => {
    return assign.execute(interaction).then(() => {
      chai.expect(interaction.deferReply.calledOnce).to.be.true;
      chai.expect(interaction.editReply.calledOnce).to.be.true;
    });
  });
});
