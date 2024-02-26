"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ------ TEST SETUP ------
const chaiTests = require("chai");
const chaiHttp = require("chai-http");
const should = chaiTests.should();
chaiTests.use(chaiHttp);
// ------ APPLICATION INCLUDES & SETUP ------
const crypto_1 = __importDefault(require("crypto"));
// ------ ENV SETUP ------
let baseURL = "http://localhost:5132/";
let spendilowTestingTransactionsUser;
let spendilowTestTransaction;
let singleSpendilowTestTransaction;
let cookie;
describe("Spendilow API 💰 - Transactions Tests", function () {
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
        spendilowTestingTransactionsUser = {
            id,
            email: "transactions@spendilow-testing.test",
            password: "Sp3ndTest87!",
            isMFAActive: false,
            savings: 0.0,
            salary: 0.0,
            profileimage: "https://i.pravatar.cc/150",
            workfield: "Testing for Transactions",
            username: "SpendilowTestingUser",
        };
        spendilowTestTransaction = {
            amount: 10.8,
            transaction_date: "1970/01/01",
            title: "Transazione di test",
            notes: "Transazione generata per il testing",
            tags: "Testing;DiTest;",
            transaction_type: "Budget",
            target_id: null,
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
    // ------ REGISTER TRANSACTION USER ------
    it("should register the transaction user on /users/new/ POST", function (done) {
        chaiTests
            .request(baseURL)
            .post("api/v1/users/new")
            .send(spendilowTestingTransactionsUser)
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
    // ------ LOGIN TRANSACTION USER ------
    it("should login the transaction user on /users/login/ POST", function (done) {
        chaiTests
            .request(baseURL)
            .post("api/v1/users/login/")
            .send({
            email: spendilowTestingTransactionsUser.email,
            password: spendilowTestingTransactionsUser.password,
        })
            .end(function (err, res) {
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
    // ------ CREATE TRANSACTION ------
    it("should create a new transaction on /authenticated-users/transactions/new POST", function (done) {
        chaiTests
            .request(baseURL)
            .post("api/v1/authenticated-users/transactions/new/")
            .set("Cookie", cookie)
            .send(spendilowTestTransaction)
            .end(function (err, res) {
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
    // ------ BULK TRANSACTIONS CREATION------
    it("should create in bulk the dummy transactions on /authenticated-users/transactions/generate/ GET", function (done) {
        chaiTests
            .request(baseURL)
            .get("api/v1/authenticated-users/transactions/generate/")
            .set("Cookie", cookie)
            .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            done();
        });
    });
    // ------ GET ALL TRANSACTIONS ------
    it("should get all the user transactions on /authenticated-users/transactions/get/all GET", function (done) {
        chaiTests
            .request(baseURL)
            .get("api/v1/authenticated-users/transactions/get/all")
            .set("Cookie", cookie)
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.transactions[0].should.have.property("id");
            should.exist(res.body.transactions[0].id);
            singleSpendilowTestTransaction = res.body.transactions[0].id;
            res.body.transactions[0].should.have.property("user_id");
            should.exist(res.body.transactions[0].user_id);
            res.body.transactions[0].should.have.property("amount");
            should.exist(res.body.transactions[0].amount);
            res.body.transactions[0].should.have.property("transaction_date");
            should.exist(res.body.transactions[0].transaction_date);
            res.body.transactions[0].should.have.property("title");
            should.exist(res.body.transactions[0].title);
            res.body.transactions[0].should.have.property("notes");
            should.exist(res.body.transactions[0].notes);
            res.body.transactions[0].should.have.property("tags");
            should.exist(res.body.transactions[0].tags);
            res.body.transactions[0].should.have.property("transaction_type");
            should.exist(res.body.transactions[0].transaction_type);
            res.body.transactions[0].should.have.property("target_id");
            should.exist(res.body.transactions[0].target_id);
            done();
        });
    });
    // ------ GET SINGLE TRANSACTION ------
    it("should get a single user transaction given the ID on /authenticated-users/transactions/get/:id GET", function (done) {
        chaiTests
            .request(baseURL)
            .get(`api/v1/authenticated-users/transactions/get/${singleSpendilowTestTransaction}`)
            .set("Cookie", cookie)
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.transaction.should.have.property("id");
            should.exist(res.body.transaction.id);
            res.body.transaction.should.have.property("user_id");
            should.exist(res.body.transaction["user_id"]);
            res.body.transaction.should.have.property("amount");
            should.exist(res.body.transaction.amount);
            res.body.transaction.should.have.property("transaction_date");
            should.exist(res.body.transaction.transaction_date);
            res.body.transaction.should.have.property("title");
            should.exist(res.body.transaction.title);
            res.body.transaction.should.have.property("notes");
            should.exist(res.body.transaction.notes);
            res.body.transaction.should.have.property("tags");
            should.exist(res.body.transaction.tags);
            res.body.transaction.should.have.property("transaction_type");
            should.exist(res.body.transaction.transaction_type);
            res.body.transaction.should.have.property("target_id");
            should.exist(res.body.transaction.target_id);
            done();
        });
    });
    // ------ UPDATE SINGLE TRANSACTION ------
    it("should edit a single user transaction given the ID on /authenticated-users/transactions/mod/:id", function (done) {
        chaiTests
            .request(baseURL)
            .patch(`api/v1/authenticated-users/transactions/mod/${singleSpendilowTestTransaction}`)
            .send({
            amount: 10,
            transaction_date: "1970/01/01",
            title: "Transazione di test per verificare la modifica",
            notes: "Transazione generata per il testing, poi modificata",
            tags: "Testing;DiTest;Modificata;",
            transaction_type: "Budget",
            target_id: null,
        })
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
    // ------ DELETE SINGLE TRANSACTION ------
    it("should delete a single user transaction given the ID on /authenticated-users/transactions/get/:id", function (done) {
        chaiTests
            .request(baseURL)
            .delete(`api/v1/authenticated-users/transactions/del/${singleSpendilowTestTransaction}`)
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
    // ------ DELETE TRANSACTION USER ------
    it("should delete the transaction user on /authenticated-users/del/ DELETE", function (done) {
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
