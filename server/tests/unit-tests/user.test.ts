import { afterEach, beforeEach, describe, it } from "node:test";

// ------ TEST SETUPS ------
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
chai.use(chaiHttp)

// ------ APPLICATION INCLUDES ------
const dbManager = require("../../db/db-manager");
const server = require("../../app");
const SpendilowUser = require("../../classes/spendilow-user")

describe('Spendilow API', function () {
    beforeEach(function (done) {
        console.log("Inizio Test")
    })

    afterEach(function (done) {
        console.log("Fine Test")
    })

    it('should answer true to server availability check on /utilities/check-server-alive GET', function(done){
        console.log("test");
        true;
    })
})

