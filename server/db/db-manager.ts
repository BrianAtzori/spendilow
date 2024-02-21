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

// ------ Exports ------
module.exports = {
  databaseInteraction,
};
