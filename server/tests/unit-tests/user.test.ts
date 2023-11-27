// ------ TEST SETUPS ------
const chaiTests = require('chai')
const chaiHttp = require('chai-http')
const cookieParser = require('cookie-parser');
const should = chaiTests.should();
chaiTests.use(chaiHttp);

// ------ APPLICATION INCLUDES & SETUP ------
import { Request, Response, } from 'express' //TS Import
const dbManager = require("../../db/db-manager");
const server = require("../../app");
const SpendilowUser = require("../../classes/spendilow-user")

describe('Spendilow API 💰', function () {
    beforeEach(function (done) {
        console.log("Inizio dei test... 🧪")
        server()
        done()
    })

    afterEach(function (done) {
        console.log("Fine dei test...✋🏻")
        done()
    })

    it('should answer current server availability on /utilities/check-server-alive GET', function (done) {
        chaiTests.request('http://localhost:5132/')
            .get('api/v1/utilities/check-server-alive/')
            .end(function (err: Error, res: any) {
                res.should.have.status(200)
                res.should.be.json;
                res.body.should.have.property('available');
                res.body.available.should.equal(true)
                done();
            })
    })

    it('should register a new user on /users/new/ POST', function (done) {
        chaiTests.request('http://localhost:5132/')
            .post('api/v1/users/new')
            .send({
                "email": "5@email.com",
                "password": "password123",
                "savings": 5000.50,
                "salary": 60000.00,
                "profileImage": "https://i.pravatar.cc/150",
                "workfield": "Tecnologia",
                "username": "esempiouser"
            })
            .end(function (err: Error, res: any) {
                console.log(res.headers)
                // console.log(res.header.authorization)
                // res.should.have.status(201)
                // res.should.be.json;
                // res.body.should.have.property('id');
                // res.body.should.have.property('account');
                // // res.header.cookies['spendilow-refresh-token'].should.exist;
                // res.body.id.should.exist;
                // res.body.account.should.exist;
                done();
            })
    })
})

