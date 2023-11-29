"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ------ TEST SETUP ------
const chaiTests = require('chai');
const chaiHttp = require('chai-http');
const cookieParser = require('cookie-parser');
const should = chaiTests.should();
chaiTests.use(chaiHttp);
// ------ APPLICATION INCLUDES & SETUP ------
const dbManager = require("../../db/db-manager");
const server = require("../../app");
const SpendilowUser = require("../../classes/spendilow-user");
// ------ ENV SETUP ------
let baseURL = "http://localhost:5132/";
let spendilowTestingUser;
describe('Spendilow API 💰', function () {
    before(function () {
        console.log("Inizio dei test... 🧪");
        spendilowTestingUser = new SpendilowUser({
            "email": "testing-user@spendilow-testing.test",
            "password": "Sp3ndTest87!",
            "savings": 0.00,
            "salary": 0.00,
            "profileImage": "https://i.pravatar.cc/150",
            "workfield": "Testing",
            "username": "SpendilowTestingUser"
        });
    });
    beforeEach(function (done) {
        server();
        done();
    });
    afterEach(function (done) {
        done();
    });
    after(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbManager.databaseInteraction('DELETE_TEST_USER', spendilowTestingUser); //DONE BECAUSE UUID ISSUE
            console.log("Fine dei test...✋🏻");
        });
    });
    it('should answer current server availability on /utilities/check-server-alive GET', function (done) {
        chaiTests.request(baseURL)
            .get('api/v1/utilities/check-server-alive/')
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('available');
            res.body.available.should.equal(true);
            done();
        });
    });
    it('should register a new user on /users/new/ POST', function (done) {
        chaiTests.request(baseURL)
            .post('api/v1/users/new')
            .send(spendilowTestingUser)
            .end(function (err, res) {
            res.should.have.status(201);
            res.should.be.json;
            should.exist(res.header['set-cookie']);
            should.exist(res.header.authorization);
            res.body.should.have.property('id');
            res.body.should.have.property('account');
            should.exist(res.body.id);
            should.exist(res.body.account);
            done();
        });
    });
});
