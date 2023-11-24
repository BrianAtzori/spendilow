"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
// ------ TEST SETUPS ------
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
// ------ APPLICATION INCLUDES ------
const dbManager = require("../../db/db-manager");
// const server = require("../../app");
const SpendilowUser = require("../../classes/spendilow-user");
(0, node_test_1.describe)('Spendilow API', function () {
    (0, node_test_1.beforeEach)(function (done) {
        console.log("Inizio Test");
    });
    (0, node_test_1.afterEach)(function (done) {
        console.log("Fine Test");
    });
    (0, node_test_1.it)('should answer true to server availability check on /utilities/check-server-alive GET', function (done) {
        console.log("test");
        true;
    });
});
