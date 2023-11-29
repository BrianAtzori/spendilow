import { doesNotMatch } from "assert";

// ------ TEST SETUP ------
const chaiTests = require('chai')
const chaiHttp = require('chai-http')
const cookieParser = require('cookie-parser');
const should = chaiTests.should();
chaiTests.use(chaiHttp);

// ------ APPLICATION INCLUDES & SETUP ------
const SpendilowUser = require("../../classes/spendilow-user")

// ------ ENV SETUP ------
let baseURL: string = "http://localhost:5132/"
let spendilowTestingUser: any

describe('Spendilow API 💰', function () {

    before(function () {
        console.log("Inizio dei test 🧪")
        spendilowTestingUser = {
            "email": "testing-user@spendilow-testing.test",
            "password": "Sp3ndTest87!",
            "savings": 0.00,
            "salary": 0.00,
            "profileImage": "https://i.pravatar.cc/150",
            "workfield": "Testing",
            "username": "SpendilowTestingUser"
        }
        console.log("INITIALIZATION: " + spendilowTestingUser.id)
    })

    beforeEach(function (done) {
        done()
    })

    afterEach(function (done) {
        done()
    })

    after(function (done) {
        console.log('Fine dei test! 🚀')
        done()
    })

    it('should answer current server availability on /utilities/check-server-alive GET', function (done) {
        chaiTests.request(baseURL)
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
        chaiTests.request(baseURL)
            .post('api/v1/users/new')
            .send(spendilowTestingUser)
            .end(function (err: Error, res: any) {
                console.log("SIGN UP: " + spendilowTestingUser.id)
                res.should.have.status(201)
                res.should.be.json;
                should.exist(res.header['set-cookie'])
                should.exist(res.header.authorization)
                res.body.should.have.property('id');
                res.body.should.have.property('account');
                should.exist(res.body.id)
                should.exist(res.body.account)
                spendilowTestingUser.id = res.body.id
                done();
            })
    })

    it('should delete an user on /users/del/:id', function (done) {
        chaiTests.request(baseURL)
            .delete(`api/v1/users/del/${spendilowTestingUser.id}`)
            .end(function (err: Error, res: any) {
                console.log("ID FROM TEST: " + spendilowTestingUser.id)
                res.should.have.status(200);
                done()
            })
    })
})

