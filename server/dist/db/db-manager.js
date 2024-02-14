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
// ------ Imports ------
const BadRequestError = require("../errors");
const dbConnectionPool = require("./db-connector");
// ------ DB ACTIONS MANAGER ------
const databaseInteraction = (operation, queryData, id) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    let queryResult;
    try {
        connection = yield dbConnectionPool.getConnection();
        if (connection) {
            switch (operation) {
                case "CREATE_USER": {
                    queryResult = yield createSplUser(queryData, connection);
                    break;
                }
                case "GET_USER": {
                    queryResult = yield readSplUser(queryData, connection);
                    break;
                }
                case "GET_USER_BY_ID": {
                    queryResult = yield readSplUserByID(queryData, connection);
                    break;
                }
                case "UPDATE_USER": {
                    queryResult = yield updateUserByID(queryData, connection, id);
                    break;
                }
                case "DELETE_USER": {
                    queryResult = yield deleteSplUser(queryData, connection);
                    break;
                }
                default: {
                    throw new BadRequestError(`I dati non sono validi, ricontrollali o contatta il supporto utente.`);
                }
            }
        }
    }
    catch (error) {
        throw new BadRequestError(`Il salvataggio dei dati non è stato effettuato correttamente oppure il Database non è disponibile, ricontrolla i dati inseriti o contatta il supporto utente. ERR: ${error}`);
    }
    finally {
        if (connection) {
            connection.release();
        }
        return queryResult;
    }
});
// ------ REGISTER SPENDILOW USER ------
const createSplUser = (spendilowUser, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`isMFAActive\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    let rows;
    let { id, email, password, isMFAActive, savings, salary, profileImage, workfield, username, } = spendilowUser;
    try {
        rows = yield connection.query(query, [
            id,
            email,
            password,
            isMFAActive,
            savings,
            salary,
            profileImage,
            workfield,
            username,
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return rows;
});
// ------ RETRIEVE SPENDILOW USER ------
const readSplUser = (spendilowUser, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM \`splusers\` WHERE \`email\`=? LIMIT 1`;
    const email = spendilowUser.email;
    let rows = yield connection.query(query, [email]);
    return rows[0];
});
// ------ RETRIEVE SPENDILOW USER BY ID ------
const readSplUserByID = (spendilowUserID, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM \`splusers\` WHERE \`id\`=? LIMIT 1`;
    let rows = yield connection.query(query, [spendilowUserID]);
    return rows[0];
});
// ------ UPDATE SPENDILOW USER ------
const updateUserByID = (spendilowUser, connection, id) => __awaiter(void 0, void 0, void 0, function* () {
    let rows;
    const query = `
    UPDATE \`splusers\` 
    SET 
      email = ?,
      savings = ?,
      salary = ?,
      profileimage = ?,
      workfield = ?,
      username = ?
    WHERE id = ?
  `;
    let { email, savings, salary, profileImage, workfield, username } = spendilowUser;
    try {
        rows = yield connection.query(query, [
            email,
            savings,
            salary,
            profileImage,
            workfield,
            username,
            id,
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return rows;
});
// ------ DELETE SPENDILOW USER ------
const deleteSplUser = (spendilowUserId, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM \`splusers\` WHERE \`splusers\`.\`id\` = ?`;
    let result = yield connection.query(query, [spendilowUserId]);
    "RESULT: " + result;
    return result;
});
// ------ Exports ------
module.exports = {
    databaseInteraction,
};
