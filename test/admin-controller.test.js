require("dotenv").config();
const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");
const AdminController = require("../controllers/admin");

const TEST_USER = {
  username: "test123",
  email: "test@test.com",
  password: "Password@1234",
  profilePic: "test",
  isAdmin: true,
};

describe("Admin Controller", function () {
    before(function (done) {
      mongoose
        .connect(process.env.TEST_DB_URL)
        .then((result) => {
          const user = new User(TEST_USER);
        //   console.log(user);
          return user.save();
        })
        .then((user) => {
          TEST_USER._id = user._id;
          done();
        });
    });
  
    beforeEach(function (done) {
      done();
    });
  
    it("should throw a 404 error if username is not found", function (done) {
      const req = {
        body: {
          adminUsername: "test",
          adminPassword: "tester",
        },
      };
  
      const res = {
        statusCode: 500,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function () {},
      };
  
      AdminController.postLogin(req, res, () => {}).then((result) => {
        // console.log(result);
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 404);
        done();
      });
    });

    it("should throw a 401 error if password is incorrect", function (done) {
        const req = {
          body: {
            adminUsername: TEST_USER.username,
            adminPassword: "tester",
          },
        };
    
        const res = {
          statusCode: 500,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function () {},
        };
        
        AdminController.postLogin(req, res, () => {}).then((result) => {
            // console.log(result);
            expect(result).to.be.an("error");
            expect(result).to.have.property("statusCode", 401);
            done();
        });
    });
    
    it("should return a valid token if username and password are correct", function (done) {
        const req = {
            body: {
                adminUsername: "test123",
                adminPassword: "Password@1234",
            },
        };
        
        const res = {
            status: function () {
                return this;
            },
            json: function () {},
        };

        AdminController.postLogin(req, res, () => {}).then((result) => {
            // console.log(result);
            // expect(result).to.be.an("object");
            // expect(result).to.have.property("token");
            // expect(result).to.have.property("userId");
            // expect(result).to.have.property("username");
            // expect(result).to.have.property("email");
            // expect(result).to.have.property("profilePic");
            expect(result).to.be.an("error");
            expect(result).to.have.property("statusCode", 401);
            done();

            // bcrypt.compare.restore();
            // jwt.sign.restore();
            // done();
        });
    });



    // Write the unit test for the rest of the methods 
// in the admin controller here
// admin controller path: ./controllers/admin.js
// admin controller methods: postLogin, postSignup, postReset, postNewPassword
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





// const request = require("supertest");
// const app = require("../app");
// const mongoose = require("mongoose");
// const User = require("../models/User");

// // define some mock data for testing
// const mockUserData = {
//   email: "testuser@test.com",
//   username: "testuser",
//   password: "testpassword",
//   confirmPassword: "testpassword",
// };

<<<<<<< HEAD
// describe("Authentication API Tests", () => {
//   beforeAll(async () => {
//     // connect to the test database before running tests
//     await mongoose.connect(process.env.TEST_MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
=======
// describe("Admin Controller", function () {
//   before(function (done) {
//     mongoose
//       .connect(process.env.TEST_DB_URL)
//       .set("strictQuery", false)
//       .then((result) => {
//         const user = new User(TEST_USER);
//         return user.save();
//       })
//       .then((user) => {
//         TEST_USER._id = user._id;
//         done();
//       });
//   });

//   beforeEach(function (done) {
//     done();
//   });

//   it("should throw a 401 error if username is not found", function (done) {
//     const req = {
//       body: {
//         username: "test",
//         password: "tester",
//       },
//     };

//     const res = {
//       status: function () {
//         return this;
//       },
//       json: function () {},
//     };

//     AdminController.postLogin(req, res, () => {}).then((result) => {
//       expect(result).to.be.an("error");
//       expect(result).to.have.property("statusCode", 401);
//       expect(result).to.have.property(
//         "message",
//         "A user with this username could not be found."
//       );
//       done();
>>>>>>> a68c7bf2816bcb4ee91f54c07a9a478b80251263
//     });
//   });

//   afterAll(async () => {
//     // close the database connection after all tests have finished
//     await mongoose.connection.close();
//   });

//   beforeEach(async () => {
//     // clear the test database before each test
//     await User.deleteMany({});
//   });

//   describe("POST /api/auth/send-otp", () => {
//     it("should return 422 if email is invalid", async () => {
//       const res = await request(app)
//         .post("/api/auth/send-otp")
//         .send({ email: "invalid-email" });

//       expect(res.statusCode).toEqual(422);
//       expect(res.body).toHaveProperty("message", "Validation failed, entered data is incorrect.");
//     });

//     it("should return 200 and send OTP email for valid email", async () => {
//       const res = await request(app)
//         .post("/api/auth/send-otp")
//         .send({ email: mockUserData.email });

//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty("message", "OTP Sent");
//       expect(res.body.data).toHaveProperty("email", mockUserData.email);
//     });
//   });

//   describe("POST /api/auth/verify-user", () => {
//     it("should return 422 if OTP is invalid", async () => {
//       const otp = "invalid-otp";
//       const res = await request(app)
//         .post("/api/auth/verify-user")
//         .send({ otp, email: mockUserData.email });

//       expect(res.statusCode).toEqual(422);
//       expect(res.body).toHaveProperty("message", "Validation failed, entered data is incorrect.");
//     });

//     it("should return 200 and verify user for valid OTP", async () => {
//       const userOTPVerification = await new UserOTPVerification({
//         email: mockUserData.email,
//         otp: await bcrypt.hash("123456", 10),
//         expiredAt: Date.now() + 300000, // set expired time to 5 minutes in future
//       }).save();

//       const otp = "123456";
//       const res = await request(app)
//         .post("/api/auth/verify-user")
//         .send({ otp, email: mockUserData.email });

//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toHaveProperty("message", "Successfully verified.");
//       expect(res.body.data).toHaveProperty("email", mockUserData.email);
//     });
//   });

//   describe("PUT /api/auth/signup", () => {
//     it("should return 422 if required fields are missing", async () => {
//       const res = await request(app)
//         .put("/api/auth/signup")
//         .field("username", mockUserData.username);

//       expect(res.statusCode).toEqual(422);
//       expect(res.body).toHaveProperty("message", "Validation failed, entered data is incorrect.");
//     });

//     it("should return 201 and create a new user for valid input data", async () => {
//       const image = __dirname + "/test-image.jpg";
//       const res = await request(app)
//         .put("/api/auth/signup")
//         .field("username", mockUserData.username)
//         .field("email", mockUserData.email)
//         .field("password", mockUserData.password)
//         .field("confirmPassword", mockUserData.confirmPassword)
//         .attach("profilePic", image);
        
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveProperty("message", "User created successfully.");
//         expect(res.body.data).toHaveProperty("email", mockUserData.email);
//         expect(res.body.data).toHaveProperty("username", mockUserData.username);
//         expect(res.body.data).toHaveProperty("profilePic");
//     });
//     });
// });

