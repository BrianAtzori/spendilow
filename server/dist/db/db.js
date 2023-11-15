"use strict";
// ------ IMPORT MARIA DB ------
let mariaDB = require("mariadb");
// ------ CREATE CONNECTION POOL ------
const pool = mariaDB.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// ------ EXPORT CONNECTION ------
module.exports = {
    getConnection: function () {
        return new Promise(function (resolve, reject) {
            pool
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
