const chai = require("chai");
const sinon = require("sinon");
const Octokit = require("@octokit/rest");
const axios = require("axios");

describe("Fork Unit Test", () => {
  let fork = null;
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
    sandbox.stub(Octokit, "Octokit").returns({
      issues: {
        createFork: sandbox.stub().callsFake((result) => {
            chai.expect(result.owner).to.equal("test", "Wrong Owner")
            chai.expect(result.repo).to.equal("test", "Wrong Repo")
        }),
      },
    });
    sandbox.stub(axios, "get").returns({
      body: {
        token: "testToken",
      },
    });
    fork = require("../src/commands/fork");
  });
  after(() => {
    sandbox.restore();
  })
  it("Command Executes", async () => {
    return fork.execute(interaction).then(() => {
      chai.expect(interaction.deferReply.calledOnce).to.be.true;
      chai.expect(interaction.editReply.calledOnce).to.be.true;
    });
  });
});
