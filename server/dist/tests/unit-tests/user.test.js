"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ------ TEST SETUP ------
const chaiTests = require('chai');
const chaiHttp = require('chai-http');
const cookieParser = require('cookie-parser');
const should = chaiTests.should();
chaiTests.use(chaiHttp);
// ------ APPLICATION INCLUDES & SETUP ------
const crypto_1 = __importDefault(require("crypto"));
// ------ ENV SETUP ------
let baseURL = "http://localhost:5132/";
let spendilowTestingUser;
let spendilowRefreshToken;
describe('Spendilow API 💰', function () {
    before(function () {
        console.log("Inizio dei test 🧪");
        const id = crypto_1.default.randomUUID();
        spendilowTestingUser = {
            id,
            "email": "testing-user@spendilow-testing.test",
            "password": "Sp3ndTest87!",
            "savings": 0.00,
            "salary": 0.00,
            "profileImage": "https://i.pravatar.cc/150",
            "workfield": "Testing",
            "username": "SpendilowTestingUser"
        };
    });
    beforeEach(function (done) {
        done();
    });
    afterEach(function (done) {
        done();
    });
    after(function (done) {
        console.log('Fine dei test! 🚀');
        done();
    });
    // ------ CHECK SERVER ALIVE ------
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
    // ------ REGISTER USER ------
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
    // ------ LOGIN USER ------
    it('should login a user on /users/login/ POST', function (done) {
        chaiTests.request(baseURL)
            .post('api/v1/users/login/')
            .send({
            email: spendilowTestingUser.email,
            password: spendilowTestingUser.password
        })
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            should.exist(res.header['set-cookie']);
            spendilowRefreshToken = res.header['set-cookie'][0].split(';')[0];
            should.exist(res.header.authorization);
            res.body.should.have.property('id');
            res.body.should.have.property('email');
            should.exist(res.body.id);
            should.exist(res.body.email);
            done();
        });
    });
    // ------ REFRESH USER TOKENS ------
    it('should refresh user keys on /users/refresh-auth/ GET', function (done) {
        chaiTests.request(baseURL)
            .get('api/v1/users/refresh-auth/')
            .set('Cookie', spendilowRefreshToken)
            .end(function (err, res) {
            res.should.have.status(200);
            should.exist(res.header.authorization);
            res.body.should.have.property('id');
            res.body.should.have.property('email');
            should.exist(res.body.id);
            should.exist(res.body.email);
            done();
        });
    });
    // ------ DELETE USER ------
    it('should delete an user on /users/del/:id', function (done) {
        chaiTests.request(baseURL)
            .delete(`api/v1/users/del/${spendilowTestingUser.id}`)
            .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
});
