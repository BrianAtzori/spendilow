// ------ TEST SETUP ------
const chaiTests = require("chai");
const chaiHttp = require("chai-http");
const cookieParser = require("cookie-parser");
const should = chaiTests.should();
chaiTests.use(chaiHttp);

// ------ APPLICATION INCLUDES & SETUP ------
import crypto from "crypto";

// ------ ENV SETUP ------
let baseURL: string = "http://localhost:5132/";
let spendilowTestingUser: any;
let cookie: any;

describe("Spendilow API 💰", function () {
  before(function () {
    console.log("Inizio dei test 🧪");
    const id: string = crypto.randomUUID();
    spendilowTestingUser = {
      id,
      email: "testing-user@spendilow-testing.test",
      password: "Sp3ndTest87!",
      isMFAActive: false,
      savings: 0.0,
      salary: 0.0,
      profileImage: "https://i.pravatar.cc/150",
      workfield: "Testing",
      username: "SpendilowTestingUser",
    };
  });

  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    done();
  });

  after(function (done) {
    console.log("Fine dei test! 🚀");
    done();
  });

  // ------ CHECK SERVER ALIVE ------
  it("should answer current server availability on /utilities/check-server-alive GET", function (done) {
    chaiTests
      .request(baseURL)
      .get("api/v1/utilities/check-server-alive/")
      .end(function (err: Error, res: any) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property("available");
        res.body.available.should.equal(true);
        done();
      });
  });

  // ------ REGISTER USER ------
  it("should register a new user on /users/new/ POST", function (done) {
    chaiTests
      .request(baseURL)
      .post("api/v1/users/new")
      .send(spendilowTestingUser)
      .end(function (err: Error, res: any) {
        res.should.have.status(201);
        res.should.be.json;
        should.exist(res.header["set-cookie"]);
        cookie =
          res.header["set-cookie"][0] + ";" + res.header["set-cookie"][1];
        res.body.should.have.property("id");
        res.body.should.have.property("account");
        should.exist(res.body.id);
        should.exist(res.body.account);
        done();
      });
  });

  // ------ LOGIN USER ------
  it("should login a user on /users/login/ POST", function (done) {
    chaiTests
      .request(baseURL)
      .post("api/v1/users/login/")
      .send({
        email: spendilowTestingUser.email,
        password: spendilowTestingUser.password,
      })
      .end(function (err: Error, res: any) {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.header["set-cookie"]);
        res.body.should.have.property("id");
        res.body.should.have.property("email");
        should.exist(res.body.id);
        should.exist(res.body.email);
        done();
      });
  });

  // ------ MODIFY USER ------
  it("should modify an user on /authenticated-users/mod/ PATCH", function (done) {
    chaiTests
      .request(baseURL)
      .patch(`api/v1/authenticated-users/mod/`)
      .set("Cookie", cookie)
      .send({
        email: "testing-user-edited@spendilow-testing.test",
        isMFAActive: false,
        savings: 1,
        salary: 2,
        profileImage: "https://i.pravatar.cc/150",
        workfield: "Testing after editing",
        username: "SpendilowTestingUser",
      })
      .end(function (err: Error, res: any) {
        res.should.have.status(204);
        done();
      });
  });

  // ------ GET USER PROFILE ------
  it("should get user profile on /authenticated-users/get-profile/", function (done) {
    chaiTests
      .request(baseURL)
      .get(`api/v1/authenticated-users/get-profile/`)
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property("id");
        should.exist(res.body.id);

        res.body.should.have.property("email");
        should.exist(res.body.email);

        res.body.should.have.property("isMFAActive");
        should.exist(res.body.isMFAActive);

        res.body.should.have.property("isMFAActive");
        should.exist(res.body.isMFAActive);

        res.body.should.have.property("savings");
        should.exist(res.body.savings);

        res.body.should.have.property("salary");
        should.exist(res.body.salary);

        res.body.should.have.property("profileimage");
        should.exist(res.body.profileimage);

        res.body.should.have.property("workfield");
        should.exist(res.body.workfield);

        res.body.should.have.property("username");
        should.exist(res.body.username);

        done();
      });
  });

  // ------ DELETE USER ------
  it("should delete an user on /authenticated-users/del/", function (done) {
    chaiTests
      .request(baseURL)
      .delete(`api/v1/authenticated-users/del/`)
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {
        res.should.have.status(200);
        done();
      });
  });
});
