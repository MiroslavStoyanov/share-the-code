const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userService = require("./userService");

describe("User service tests", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe("getById", () => {
    it("Should return user given the user Id", async () => {
      //Arrange
      const stubValue = {
        id: faker.random.uuid(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdDate: faker.date.past(),
      };
      const findByIdStub = sandbox
        .stub(mongoose.Model, "findById")
        .returns(Promise.resolve(stubValue));

      //Act
      const user = await userService.getById(stubValue.id);

      //Assert
      expect(findByIdStub.calledOnce).to.be.true;
      expect(user.id).to.equal(stubValue.id);
      expect(user.username).to.equal(stubValue.username);
      expect(user.password).to.equal(stubValue.password);
      expect(user.email).to.equal(stubValue.email);
      expect(user.firstName).to.equal(stubValue.firstName);
      expect(user.lastName).to.equal(stubValue.lastName);
      expect(user.createdDate).to.equal(stubValue.createdDate);
    });

    it("Should return error message when no user id is provided", async () => {
      //Arrange
      const findByIdStub = sandbox
        .stub(mongoose.Model, "findById")
        .returns(Promise.reject({ errorMessage: "User Id is not provided" }));

      //Act
      try {
        await userService.getById(null);
      } catch (err) {
        //Assert
        expect(findByIdStub.calledOnce).to.be.true;
        expect(err.errorMessage).to.equal("User Id is not provided");
      }
    });
  });

  describe("getAll", () => {
    it("Should return all users", async () => {
      //Arrange
      const usersStub = [
        {
          id: faker.random.uuid(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          createdDate: faker.date.past(),
        },
        {
          id: faker.random.uuid(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          createdDate: faker.date.past(),
        },
        {
          id: faker.random.uuid(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          createdDate: faker.date.past(),
        },
      ];
      const findStub = sandbox
        .stub(mongoose.Model, "find")
        .returns(Promise.resolve(usersStub));

      //Act
      const users = await userService.getAll();

      //Assert
      expect(findStub.calledOnce).to.be.true;
      expect(users).to.eql(usersStub);
    });

    it("Should return null when there are no users", async () => {
      //Arrange
      const findStub = sandbox
        .stub(mongoose.Model, "find")
        .returns(Promise.resolve(null));

      //Act
      const users = await userService.getAll();

      //Assert
      expect(findStub.calledOnce).to.be.true;
      expect(users).to.eql(null);
    });
  });

  describe("authenticate", () => {
    it("Should authenticate the user and return user details and token", async () => {
      //Arrange
      const loginDetailsStub = {
        username: faker.internet.userName(),
        password: faker.internet.password()
      };
      const findOneStub = sandbox
        .stub(mongoose.Model, "findOne")
        .returns(Promise.resolve(loginDetailsStub));
      const compareStub = sandbox
        .stub(bcrypt, "compare")
        .returns(Promise.resolve(true));

      //Act
      user = await userService.authenticate(loginDetailsStub);

      //Assert
      expect(findOneStub.calledTwice).to.be.true;
      expect(compareStub.calledOnce).to.be.true;
      expect(user).to.not.be.null;
      expect(user.token).to.equal("someRandomToken");
    });
  });
});
