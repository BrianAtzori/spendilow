"use strict";
// import mariadb
var mariadb = require("mariadb");
// create a new connection dbConnectionPool
const dbConnectionPool = mariadb.createdbConnectionPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// expose the ability to create new connections
module.exports = {
    getConnection: function () {
        return new Promise(function (resolve, reject) {
            dbConnectionPool
                .getConnection()
                .then(function (connection) {
                resolve(connection);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    },
};
