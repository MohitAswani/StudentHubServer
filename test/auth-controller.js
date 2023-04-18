require("dotenv").config();
const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/User");
const AuthController = require("../controllers/auth");

describe("Auth Controller - DB Test", function () {
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        username: "test@test.com",
        password: "tester",
      },
    };

    AuthController.postLoginIn(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });
  });
});

describe("Auth Controller", function () {
  before(function (done) {
    mongoose
      .connect(process.env.TEST_DB_URL)
      .then((result) => {
        const user = new User({
          username: "test123",
          email: "test@test.com",
          password: "Password@1234",
          profilePic: "test",
        });

        return user.save();
      })
      .then(() => {
        console.log("User created");
        done();
      });
  });

  beforeEach(function (done) {
    done();
  });

  it("should throw a 401 error if username is not found", function (done) {
    const req = {
      body: {
        username: "test",
        password: "tester",
      },
    };

    AuthController.postLoginIn(req, {}, () => {}).then((result) => {
      console.log("sdsd",result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 401);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });

  afterEach(function (done) {
    done();
  });
});
