// ------ TEST SETUP ------
const chaiTests = require("chai");
const chaiHttp = require("chai-http");
const should = chaiTests.should();
chaiTests.use(chaiHttp);

// ------ APPLICATION INCLUDES & SETUP ------
import crypto from "crypto";

// ------ ENV SETUP ------
let baseURL: string = "http://localhost:5132/";
let spendilowTestingBudgetsUser: any;
let spendilowTestBudget: any;
let singleSpendilowTestBudget: any;
let cookie: any;

describe("Spendilow API 💰 - Budgets Tests", function () {
  before(function () {
    const currentDate = new Date();

    console.log(
      "Inizio dei test 🧪 - " +
        currentDate.getDate() +
        "/" +
        (currentDate.getMonth() + 1) +
        " - " +
        currentDate.getHours() +
        ":" +
        currentDate.getMinutes()
    );

    const id: string = crypto.randomUUID();

    spendilowTestingBudgetsUser = {
      id,
      email: "budget@spendilow-testing.test",
      password: "Sp3ndTest87!",
      isMFAActive: false,
      savings: 0.0,
      salary: 0.0,
      profileimage: "https://i.pravatar.cc/150",
      workfield: "Testing for Budget",
      username: "SpendilowTestingUser",
    };

    spendilowTestBudget = {
      name: "Test Budget",
      description:
        "Reprehenderit sunt quis veniam commodo officia minim dolor irure amet culpa do commodo. Est adipisicing dolore eiusmod minim consectetur ipsum pariatur cupidatat minim ut ad sint non mollit. Officia sint consequat sunt ad excepteur ullamco et mollit ut. Sit nisi deserunt qui enim velit id nulla laborum velit aliquip esse in est. Non magna cupidatat occaecat elit velit incididunt velit incididunt deserunt.",
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

  // ------ REGISTER BUDGET USER ------
  it("should register the budget user on /users/new/ POST", function (done) {
    chaiTests
      .request(baseURL)
      .post("api/v1/users/new")
      .send(spendilowTestingBudgetsUser)
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

  // ------ LOGIN BUDGET USER ------
  it("should login the budget user on /users/login/ POST", function (done) {
    chaiTests
      .request(baseURL)
      .post("api/v1/users/login/")
      .send({
        email: spendilowTestingBudgetsUser.email,
        password: spendilowTestingBudgetsUser.password,
      })
      .end(function (err: Error, res: any) {
        res.should.have.status(200);
        res.should.be.json;
        should.exist(res.header["set-cookie"]);
        cookie =
          res.header["set-cookie"][0] + ";" + res.header["set-cookie"][1];
        res.body.should.have.property("id");
        res.body.should.have.property("email");
        should.exist(res.body.id);
        should.exist(res.body.email);
        done();
      });
  });

  // ------ CREATE BUDGET ------
  it("should create a new budget on /authenticated-users/budgets/new POST", function (done) {
    chaiTests
      .request(baseURL)
      .post("api/v1/authenticated-users/budgets/new/")
      .set("Cookie", cookie)
      .send(spendilowTestBudget)
      .end(function (err: Error, res: any) {
        res.should.have.status(201);
        res.should.be.json;

        res.body.should.have.property("success");
        should.exist(res.body.success);
        res.body.success.should.equal(true);

        res.body.should.have.property("message");
        should.exist(res.body.message);

        done();
      });
  });

  // ------ GET ALL BUDGETS ------
  it("should get all the user budgets on /authenticated-users/budgets/get/all GET", function (done) {
    chaiTests
      .request(baseURL)
      .get("api/v1/authenticated-users/budgets/get/all")
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {
        res.should.have.status(200);
        res.should.be.json;

        res.body.budgets[0].should.have.property("id");
        should.exist(res.body.budgets[0].id);

        singleSpendilowTestBudget = res.body.budgets[0].id;

        res.body.budgets[0].should.have.property("user_id");
        should.exist(res.body.budgets[0].user_id);

        res.body.budgets[0].should.have.property("description");
        should.exist(res.body.budgets[0].description);

        res.body.budgets[0].should.have.property("name");
        should.exist(res.body.budgets[0].name);

        done();
      });
  });

  // ------ GET SINGLE BUDGET ------
  it("should get a single user budget given the ID on /authenticated-users/budgets/get/:id GET", function (done) {
    chaiTests
      .request(baseURL)
      .get(
        `api/v1/authenticated-users/budgets/get/${singleSpendilowTestBudget}`
      )
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {

        res.should.have.status(200);
        res.should.be.json;

        res.body.budget.should.have.property("id");
        should.exist(res.body.budget.id);

        res.body.budget.should.have.property("name");
        should.exist(res.body.budget.name);

        res.body.budget.should.have.property("description");
        should.exist(res.body.budget.description);

        res.body.should.have.property("transactions");
        should.exist(res.body.transactions);

        done();
      });
  });

  // ------ UPDATE SINGLE BUDGET ------
  it("should edit a single user budget given the ID on /authenticated-users/budgets/mod/:id", function (done) {
    chaiTests
      .request(baseURL)
      .patch(
        `api/v1/authenticated-users/budgets/mod/${singleSpendilowTestBudget}`
      )
      .send({
        name: "Test Budget with updates",
        description: "With updates",
      })
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {
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

  // ------ DELETE SINGLE BUDGET ------
  it("should delete a single user budget given the ID on /authenticated-users/budgets/del/:id", function (done) {
    chaiTests
      .request(baseURL)
      .delete(
        `api/v1/authenticated-users/budgets/del/${singleSpendilowTestBudget}`
      )
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {
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

  // ------ DELETE BUDGET USER ------
  it("should delete the transaction user on /authenticated-users/del/ DELETE", function (done) {
    chaiTests
      .request(baseURL)
      .delete(`api/v1/authenticated-users/del/`)
      .set("Cookie", cookie)
      .end(function (err: Error, res: any) {
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
