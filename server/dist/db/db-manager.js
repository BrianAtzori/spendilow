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
const BRError = require("../errors");
const dbConnectionPool = require("./db-connector");
// ------ DB ACTIONS MANAGER ------
const databaseInteraction = (operation, queryData) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    let queryResult;
    try {
        connection = yield dbConnectionPool.getConnection();
        if (connection) {
            switch (operation) {
                case 'CREATE_USER': {
                    queryResult = yield createSplUser(queryData, connection);
                }
                case 'GET_USER': {
                    queryResult = yield readSplUser(queryData, connection);
                }
                default: {
                    throw new BRError(`I dati non sono validi, ricontrollali o contatta il supporto utente.`);
                }
            }
        }
    }
    catch (error) {
        throw new BRError(`Il salvataggio dei dati non è stato effettuato correttamente oppure il Database non è disponibile, ricontrolla i dati inseriti o contatta il supporto utente. ERR: ${error}`);
    }
    finally {
        if (connection) {
            connection.release();
        }
        console.log(queryResult);
        return queryResult;
    }
});
// ------ REGISTER SPENDILOW USER ------
const createSplUser = (spendilowUser, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    let result;
    let { id, email, password, savings, salary, profileImage, workfield, username } = spendilowUser;
    try {
        result = yield connection.query(query, [id, email, password, savings, salary, profileImage, workfield, username]);
    }
    catch (error) {
        error.errno === 1062 ? result = "DUPLICATED_VALUE" : result = undefined;
        return result;
    }
    return result;
});
// ------ RETRIEVE SPENDILOW USER ------
const readSplUser = (spendilowUser, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM \`splusers\` WHERE \`email\`=? LIMIT 1`;
    let { email } = spendilowUser;
    let rows = yield connection.query(query, [email]);
    return rows[0];
});
// ------ Exports ------
module.exports = {
    databaseInteraction
};
