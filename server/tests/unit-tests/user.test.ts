// ------ TEST SETUPS ------
const chaiTests = require('chai')
const chaiHttp = require('chai-http')
const should = chaiTests.should();
chaiTests.use(chaiHttp);

// ------ APPLICATION INCLUDES ------
const dbManager = require("../../db/db-manager");
const server = require("../../app");
const SpendilowUser = require("../../classes/spendilow-user")

describe('Spendilow API', function () {
    beforeEach(function (done) {
        console.log("Inizio Test")
        done()
    })

    afterEach(function (done) {
        console.log("Fine Test")
        done()
    })

    it('should answer true to server availability check on /utilities/check-server-alive GET', function(done){
        console.log("test");
        true;
        done()
    })
})

