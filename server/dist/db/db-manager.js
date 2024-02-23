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
                    return queryResult;
                    break;
                }
                case "GET_USER": {
                    queryResult = yield readSplUser(queryData, connection);
                    return queryResult;
                    break;
                }
                case "GET_USER_BY_ID": {
                    queryResult = yield readSplUserByID(queryData, connection);
                    return queryResult;
                    break;
                }
                case "UPDATE_USER": {
                    queryResult = yield updateUserByID(queryData, connection, id);
                    return queryResult;
                    break;
                }
                case "DELETE_USER": {
                    queryResult = yield deleteSplUser(queryData, connection);
                    return queryResult;
                    break;
                }
                case "CREATE_TRANSACTION": {
                    queryResult = yield createTransactionQuery(queryData, connection);
                    return queryResult;
                    break;
                }
                case "GET_ALL_TRANSACTIONS": {
                    queryResult = yield getAllTransactions(queryData, connection);
                    return queryResult;
                    break;
                }
                case "GET_SINGLE_TRANSACTION": {
                    queryResult = getSingleTransaction(queryData.spendilowUserId, queryData.transactionId, connection);
                    return queryResult;
                    break;
                }
                case "UPDATE_TRANSACTION": {
                    queryResult = updateSingleTransaction(queryData.spendilowUserId, queryData.transactionId, queryData.spendilowTransactionMod, connection);
                    return queryResult;
                    break;
                }
                case "DELETE_TRANSACTION": {
                    queryResult = deleteSingleTransaction(queryData.spendilowUserId, queryData.transactionId, connection);
                    return queryResult;
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
    let rows = {
        successState: false,
        payload: {},
    };
    let { id, email, password, isMFAActive, savings, salary, profileImage, workfield, username, } = spendilowUser;
    try {
        rows.payload = yield connection.query(query, [
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
        if (rows.payload.affectedRows === 1) {
            rows.successState = true;
        }
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ RETRIEVE SPENDILOW USER ------
const readSplUser = (spendilowUser, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM \`splusers\` WHERE \`email\`=? LIMIT 1`;
    const email = spendilowUser.email;
    let rows = {
        successState: false,
        payload: {},
    };
    try {
        rows.payload = yield connection.query(query, [email]);
        rows.successState = true;
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ RETRIEVE SPENDILOW USER BY ID ------
const readSplUserByID = (spendilowUserId, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM \`splusers\` WHERE \`id\`=? LIMIT 1`;
    let rows = {
        successState: false,
        payload: {},
    };
    try {
        rows.payload = yield connection.query(query, [spendilowUserId]);
        rows.successState = true;
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ UPDATE SPENDILOW USER ------
const updateUserByID = (spendilowUser, connection, id) => __awaiter(void 0, void 0, void 0, function* () {
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
    let rows = {
        successState: false,
        payload: {},
    };
    let { email, savings, salary, profileimage, workfield, username } = spendilowUser;
    try {
        rows.payload = yield connection.query(query, [
            email,
            savings,
            salary,
            profileimage,
            workfield,
            username,
            id,
        ]);
        if (rows.payload.affectedRows === 1) {
            rows.successState = true;
        }
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ DELETE SPENDILOW USER ------
const deleteSplUser = (spendilowUserId, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM \`splusers\` WHERE \`splusers\`.\`id\` = ?`;
    let rows = {
        successState: false,
        payload: {},
    };
    try {
        rows.payload = yield connection.query(query, [spendilowUserId]);
        if (rows.payload.affectedRows === 1) {
            rows.successState = true;
        }
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ CREATE TRANSACTION ------
const createTransactionQuery = (transactionData, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  INSERT INTO transactions (id, user_id, amount, transaction_date, title, notes, tags, transaction_type, target_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    let rows = {
        successState: false,
        payload: {},
    };
    let { id, user_id, amount, transaction_date, title, notes, tags, transaction_type, target_id, } = transactionData;
    try {
        rows.payload = yield connection.query(query, [
            id,
            user_id,
            amount,
            transaction_date,
            title,
            notes,
            tags,
            transaction_type,
            target_id,
            ,
        ]);
        if (rows.payload.affectedRows === 1) {
            rows.successState = true;
        }
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ GET ALL TRANSACTIONS ------
const getAllTransactions = (spendilowUserId, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  SELECT *
  FROM transactions
  WHERE user_id = ?
`;
    let rows = {
        successState: false,
        payload: {},
    };
    try {
        rows.payload = yield connection.query(query, [spendilowUserId]);
        rows.successState = true;
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ GET SINGLE TRANSACTION ------
const getSingleTransaction = (spendilowUserId, transactionId, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  SELECT *
  FROM transactions
  WHERE id = ? AND user_id = ?
`;
    let rows = {
        successState: false,
        payload: {},
    };
    try {
        rows = yield connection.query(query, [transactionId, spendilowUserId]);
        rows.successState = true;
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ UPDATE SINGLE TRANSACTION ------
const updateSingleTransaction = (spendilowUserId, transactionId, spendilowTransactionMod, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  UPDATE transactions
  SET
    amount = ?,
    transaction_date = ?,
    title = ?,
    notes = ?,
    tags = ?,
    transaction_type = ?,
    target_id = ?
  WHERE id = ? AND user_id = ?
`;
    let rows = {
        successState: false,
        payload: {},
    };
    let { amount, transaction_date, title, notes, tags, transaction_type, target_id, } = spendilowTransactionMod;
    try {
        rows = yield connection.query(query, [
            amount,
            transaction_date,
            title,
            notes,
            tags,
            transaction_type,
            target_id,
            transactionId,
            spendilowUserId,
        ]);
        if (rows.payload.affectedRows === 1) {
            rows.successState = true;
        }
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    console.log(rows);
    return rows;
});
// ------ DELETE SINGLE TRANSACTION ------
const deleteSingleTransaction = (spendilowUserId, transactionId, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
  DELETE FROM transactions
  WHERE id = ? AND user_id = ?
`;
    let rows = {
        successState: false,
        payload: {},
    };
    try {
        rows = yield connection.query(query, [transactionId, spendilowUserId]);
        if (rows.payload.affectedRows === 1) {
            rows.successState = true;
        }
    }
    catch (error) {
        rows.payload = error.sqlMessage;
    }
    return rows;
});
// ------ Exports ------
module.exports = {
    databaseInteraction,
};
