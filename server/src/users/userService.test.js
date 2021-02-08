const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const mongoose = require("mongoose");
const User = require("./userModel");
const userService = require("./userService");
const userController = require("./userController");

describe("User service tests", () => {
  const stubValue = {
    id: faker.random.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    createdDate: faker.date.past(),
    updatedAt: faker.date.past(),
  };

  describe("getById", () => {
    it("Should return the user for the current user Id", async () => {
      const findByIdStub = sinon.stub(mongoose.Model, "findById").returns(Promise.resolve(stubValue));
      const user = await userService.getById(stubValue.id);
      expect(findByIdStub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
    });
  });
});
