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
// ------ Imports ------
const riella = require("../errors");
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
                default: {
                    throw new riella(`Il salvataggio dei dati non è stato effetuato correttamente, ricontrolla i dati inseriti o contatta il supporto utente.`);
                }
            }
        }
        return queryResult;
    }
    catch (error) {
        throw new riella(`Il salvataggio dei dati non è stato effetuato correttamente, ricontrolla i dati inseriti o contatta il supporto utente. ERR: ${error}`);
    }
    finally {
        if (connection)
            return connection.release();
    }
});
// ------ REGISTER SPENDILOW USER ------
const createSplUser = (spendilowUser, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    let { id, email, password, savings, salary, profileImage, workfield, username } = spendilowUser;
    let rows = yield connection.query(query, [id, email, password, savings, salary, profileImage, workfield, username]);
    return rows;
});
// ------ Exports ------
module.exports = {
    databaseInteraction
};
