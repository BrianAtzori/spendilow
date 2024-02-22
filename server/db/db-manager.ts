import { SqlError } from "mariadb";

// ------ Imports ------
const BadRequestError = require("../errors");
const dbConnectionPool = require("./db-connector");

// ------ DB ACTIONS MANAGER ------
const databaseInteraction = async (
  operation: string,
  queryData: any,
  id: any
) => {
  let connection;
  let queryResult;

  try {
    connection = await dbConnectionPool.getConnection();

    if (connection) {
      switch (operation) {
        case "CREATE_USER": {
          queryResult = await createSplUser(queryData, connection);
          break;
        }
        case "GET_USER": {
          queryResult = await readSplUser(queryData, connection);
          break;
        }
        case "GET_USER_BY_ID": {
          queryResult = await readSplUserByID(queryData, connection);
          break;
        }
        case "UPDATE_USER": {
          queryResult = await updateUserByID(queryData, connection, id);
          break;
        }
        case "DELETE_USER": {
          queryResult = await deleteSplUser(queryData, connection);
          break;
        }
        case "CREATE_TRANSACTION": {
          queryResult = await createTransactionQuery(queryData, connection);
          break;
        }
        case "GET_ALL_TRANSACTIONS": {
          queryResult = await getAllTransactions(queryData, connection);
          return queryResult;
          break;
        }
        case "GET_SINGLE_TRANSACTION": {
          queryResult = getSingleTransaction(
            queryData.spendilowUserId,
            queryData.transactionId,
            connection
          );
          return queryResult;
          break;
        }
        case "UPDATE_TRANSACTION": {
          queryResult = updateSingleTransaction(
            queryData.spendilowUserId,
            queryData.transactionId,
            queryData.spendilowTransactionMod,
            connection
          );
          return queryResult;
          break;
        }
        case "DELETE_TRANSACTION": {
          queryResult = deleteSingleTransaction(
            queryData.spendilowUserId,
            queryData.transactionId,
            connection
          );
          return queryResult;
          break;
          break;
        }
        default: {
          throw new BadRequestError(
            `I dati non sono validi, ricontrollali o contatta il supporto utente.`
          );
        }
      }
    }
  } catch (error) {
    throw new BadRequestError(
      `Il salvataggio dei dati non è stato effettuato correttamente oppure il Database non è disponibile, ricontrolla i dati inseriti o contatta il supporto utente. ERR: ${error}`
    );
  } finally {
    if (connection) {
      connection.release();
    }
    return queryResult;
  }
};

// ------ REGISTER SPENDILOW USER ------
const createSplUser = async (spendilowUser: any, connection: any) => {
  const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`isMFAActive\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

  let rows;

  let {
    id,
    email,
    password,
    isMFAActive,
    savings,
    salary,
    profileImage,
    workfield,
    username,
  } = spendilowUser;

  try {
    rows = await connection.query(query, [
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
  } catch (error) {
    console.log(error);
  }

  return rows;
};

// ------ RETRIEVE SPENDILOW USER ------
const readSplUser = async (spendilowUser: any, connection: any) => {
  const query = `SELECT * FROM \`splusers\` WHERE \`email\`=? LIMIT 1`;

  const email = spendilowUser.email;

  let rows = await connection.query(query, [email]);

  return rows[0];
};

// ------ RETRIEVE SPENDILOW USER BY ID ------
const readSplUserByID = async (spendilowUserID: any, connection: any) => {
  const query = `SELECT * FROM \`splusers\` WHERE \`id\`=? LIMIT 1`;

  let rows = await connection.query(query, [spendilowUserID]);

  return rows[0];
};

// ------ UPDATE SPENDILOW USER ------
const updateUserByID = async (spendilowUser: any, connection: any, id: any) => {
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

  let { email, savings, salary, profileimage, workfield, username } =
    spendilowUser;

  try {
    rows = await connection.query(query, [
      email,
      savings,
      salary,
      profileimage,
      workfield,
      username,
      id,
    ]);
  } catch (error) {
    console.log(error);
  }

  return rows;
};

// ------ DELETE SPENDILOW USER ------
const deleteSplUser = async (spendilowUserId: any, connection: any) => {
  const query = `DELETE FROM \`splusers\` WHERE \`splusers\`.\`id\` = ?`;

  let result = await connection.query(query, [spendilowUserId]);

  return result;
};

// ------ CREATE TRANSACTION ------
const createTransactionQuery = async (
  transactionData: any,
  connection: any
) => {
  const query = `
  INSERT INTO transactions (id, user_id, transaction_date, title, notes, tags, transaction_type, target_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

  let rows;

  let {
    id,
    user_id,
    transaction_date,
    title,
    notes,
    tags,
    transaction_type,
    target_id,
  } = transactionData;

  try {
    rows = await connection.query(query, [
      id,
      user_id,
      transaction_date,
      title,
      notes,
      tags,
      transaction_type,
      target_id,
      ,
    ]);
  } catch (error) {
    console.log(error);
  }

  return rows;
};

// ------ GET ALL TRANSACTIONS ------
const getAllTransactions = async (spendilowUserId: any, connection: any) => {
  const query = `
  SELECT *
  FROM transactions
  WHERE user_id = ?
`;

  let rows;

  try {
    rows = await connection.query(query, [spendilowUserId]);
  } catch (error) {
    console.log(error);
  }

  return rows;
};

// ------ GET SINGLE TRANSACTION ------
const getSingleTransaction = async (
  spendilowUserId: any,
  transactionId: any,
  connection: any
) => {
  const query = `
  SELECT *
  FROM transactions
  WHERE id = ? AND user_id = ?
`;

  let rows;

  try {
    rows = await connection.query(query, [transactionId, spendilowUserId]);
  } catch (error) {
    console.log(error);
  }

  return rows;
};

// ------ UPDATE SINGLE TRANSACTION ------

const updateSingleTransaction = async (
  spendilowUserId: any,
  transactionId: any,
  spendilowTransactionMod: any,
  connection: any
) => {
  const query = `
  UPDATE transactions
  SET
    transaction_date = ?,
    title = ?,
    notes = ?,
    tags = ?,
    transaction_type = ?,
    target_id = ?
  WHERE id = ? AND user_id = ?
`;

  let rows;

  let { transaction_date, title, notes, tags, transaction_type, target_id } =
    spendilowTransactionMod;

  try {
    rows = await connection.query(query, [
      transaction_date,
      title,
      notes,
      tags,
      transaction_type,
      target_id,
      transactionId,
      spendilowUserId
    ]);
  } catch (error) {
    console.log(error);
  }

  console.log(rows)

  return rows;
};

// ------ DELETE SINGLE TRANSACTION ------
const deleteSingleTransaction = async (
  spendilowUserId: any,
  transactionId: any,
  connection: any
) => {
  const query = `
  DELETE FROM transactions
  WHERE id = ? AND user_id = ?
`;

  let rows;

  try {
    rows = await connection.query(query, [transactionId, spendilowUserId]);
  } catch (error) {
    console.log(error);
  }

  return rows;
};

// ------ Exports ------
module.exports = {
  databaseInteraction,
};
