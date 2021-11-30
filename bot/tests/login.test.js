const chai = require("chai");
const sinon = require("sinon");
const Octokit = require("@octokit/rest");
const axios = require("axios");
const jwt = require('jsonwebtoken');

describe("login Unit Test", () => {
  let login = null;
  let interaction = null;
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    interaction = {
      member: {
        user: {
          id: "testId",
        },
      },
      deferReply: sandbox.spy(),
      editReply: sandbox.stub().callsFake((param) => {
        chai.expect(param.content).to.equal("Link = http://frontend:3000/login?token=test");
      }),
    };
    sandbox.stub(jwt, "sign").returns("test")
    sandbox.stub(axios, "get").returns({
      body: {
        token: "testToken",
      },
    });
    login = require("../src/commands/login");
  });
  after(() => {
    sandbox.restore();
  });
  it("Command Executes", async () => {
    return login.execute(interaction).then(() => {
      chai.expect(interaction.deferReply.calledOnce).to.be.true;
      chai.expect(interaction.editReply.calledOnce).to.be.true;
    });
  });
});
