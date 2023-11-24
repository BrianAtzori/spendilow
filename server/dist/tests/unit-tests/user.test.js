"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ------ TEST SETUPS ------
const chaiTests = require('chai');
const chaiHttp = require('chai-http');
const should = chaiTests.should();
chaiTests.use(chaiHttp);
const dbManager = require("../../db/db-manager");
const server = require("../../app");
const SpendilowUser = require("../../classes/spendilow-user");
describe('Spendilow API 💰', function () {
    beforeEach(function (done) {
        console.log("Inizio dei test... 🧪");
        server();
        done();
    });
    afterEach(function (done) {
        console.log("Fine dei test...✋🏻");
        done();
    });
    it('should answer current server availability on /utilities/check-server-alive GET', function (done) {
        chaiTests.request('http://localhost:5132/')
            .get('api/v1/utilities/check-server-alive/')
            .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('available');
            res.body.available.should.equal(true);
            done();
        });
    });
});
