"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ------ TEST SETUP ------
const chaiTests = require("chai");
const chaiHttp = require("chai-http");
const cookieParser = require("cookie-parser");
const should = chaiTests.should();
chaiTests.use(chaiHttp);
// ------ APPLICATION INCLUDES & SETUP ------
const crypto_1 = __importDefault(require("crypto"));
// ------ ENV SETUP ------
let baseURL = "http://localhost:5132/";
let spendilowTestingUser;
let cookie;
describe("Spendilow API 💰 - Users Tests", function () {
    before(function () {
        const currentDate = new Date();
        console.log("Inizio dei test 🧪 - " +
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            " - " +
            currentDate.getHours() +
            ":" +
            currentDate.getMinutes());
        const id = crypto_1.default.randomUUID();
        spendilowTestingUser = {
            id,
            email: "testing-user@spendilow-testing.test",
            password: "Sp3ndTest87!",
            isMFAActive: false,
            savings: 0.0,
            salary: 0.0,
            profileimage: "https://i.pravatar.cc/150",
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
            .end(function (err, res) {
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
            .end(function (err, res) {
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
            .end(function (err, res) {
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
            profileimage: "https://i.pravatar.cc/150",
            workfield: "Testing after editing",
            username: "SpendilowTestingUser",
        })
            .end(function (err, res) {
            res.should.have.status(204);
            done();
        });
    });
    // ------ GET USER PROFILE ------
    it("should get user profile on /authenticated-users/get-profile/ GET", function (done) {
        chaiTests
            .request(baseURL)
            .get(`api/v1/authenticated-users/get-profile/`)
            .set("Cookie", cookie)
            .end(function (err, res) {
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
    // ------ LOGOUT USER PROFILE ------
    it("should logout an user on /authenticated-users/logout/ GET", function (done) {
        chaiTests
            .request(baseURL)
            .get(`api/v1/authenticated-users/logout/`)
            .set("Cookie", cookie)
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            should.exist(res.header["set-cookie"]);
            res.body.should.have.property("logged-out");
            should.exist(res.body["logged-out"]);
            res.body["logged-out"].should.be.equal(true);
            done();
        });
    });
    // ------ DELETE USER ------
    it("should delete an user on /authenticated-users/del/ DELETE", function (done) {
        chaiTests
            .request(baseURL)
            .delete(`api/v1/authenticated-users/del/`)
            .set("Cookie", cookie)
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property("success");
            should.exist(res.body.success);
            res.body.success.should.equal(true);
            res.body.should.have.property("message");
            should.exist(res.body.message);
            done();
        });
    });
});
