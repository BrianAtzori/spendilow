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
Object.defineProperty(exports, "__esModule", { value: true });
const SpendilowUser = require("../classes/spendilow-user");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const pool = require('../db/db');
// ------ REGISTER USER ------
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effetuata correttamente, ricontrolla i dati inseriti.");
    }
    const { id, email, password, savings, salary, profileImage, workfield, username } = new SpendilowUser(Object.assign({}, req.body));
    let conn;
    try {
        // establish a connection to MariaDB
        conn = yield pool.getConnection();
        // create a new query
        const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
        // execute the query and set the result to a new variable
        let rows = yield conn.query(query, [id, email, password, savings, salary, profileImage, workfield, username]);
        // return the results
        res.json(rows.warningStatus);
    }
    catch (err) {
        throw err;
    }
});
// ------ LOGIN USER ------
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login User");
    res.json("OK");
});
// ------ MODIFY USER ------
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Mod User");
    res.json("OK");
});
// ------ DELETE USER ------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Del User");
    res.json("OK");
});
// ------ Exports ------
module.exports = { registerUser, loginUser, modifyUser, deleteUser };
