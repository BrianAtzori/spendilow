import { SqlError } from "mariadb";

const BadRequestError = require("../errors");
const dbConnectionPool = require("./db-connector");

interface DatabaseOperationResult {
  successState: boolean;
  payload: any;
}

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
          return queryResult;
          break;
        }
        case "GET_USER": {
          queryResult = await readSplUser(queryData, connection);
          return queryResult;
          break;
        }
        case "GET_USER_BY_ID": {
          queryResult = await readSplUserByID(queryData, connection);
          return queryResult;
          break;
        }
        case "UPDATE_USER": {
          queryResult = await updateUserByID(queryData, connection, id);
          return queryResult;
          break;
        }
        case "DELETE_USER": {
          queryResult = await deleteSplUser(queryData, connection);
          return queryResult;
          break;
        }
        case "CREATE_TRANSACTION": {
          queryResult = await createTransactionQuery(queryData, connection);
          return queryResult;
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
        }
        case "DELETE_USER_TRANSACTIONS": {
          queryResult = deleteUserTransactions(queryData, connection);
          return queryResult;
          break;
        }
        case "CREATE_BUDGET": {
          queryResult = await createBudgetQuery(queryData, connection);
          return queryResult;
          break;
        }
        case "GET_ALL_BUDGETS": {
          queryResult = await getAllBudgets(queryData, connection);
          return queryResult;
          break;
        }
        case "DELETE_USER_BUDGETS": {
          queryResult = deleteUserBudgets(queryData, connection);
          return queryResult;
          break;
        }
        case "GET_SINGLE_BUDGET": {
          queryResult = getSingleBudget(
            queryData.spendilowUserId,
            queryData.budgetId,
            connection
          );
          return queryResult;
          break;
        }
        case "GET_BUDGET_TRANSACTIONS": {
          queryResult = getBudgetTransactions(
            queryData.spendilowUserId,
            queryData.budgetId,
            connection
          );
          return queryResult;
          break;
        }
        case "UPDATE_BUDGET": {
          queryResult = updateSingleBudget(
            queryData.spendilowUserId,
            queryData.budgetId,
            queryData.spendilowBudgetMod,
            connection
          );
          return queryResult;
          break;
        }
        case "DELETE_BUDGET": {
          queryResult = deleteSingleBudget(
            queryData.spendilowUserId,
            queryData.budgetId,
            connection
          );
          return queryResult;
          break;
        }
        case "DELETE_BUDGET_FROM_TRANSACTIONS": {
          queryResult = deleteBudgetFromTransactions(
            queryData.spendilowUserId,
            queryData.budgetId,
            connection
          );
          return queryResult;
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

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  let {
    id,
    email,
    password,
    isMFAActive,
    savings,
    salary,
    profileimage,
    workfield,
    username,
  } = spendilowUser;

  try {
    rows.payload = await connection.query(query, [
      id,
      email,
      password,
      isMFAActive,
      savings,
      salary,
      profileimage,
      workfield,
      username,
    ]);

    if (rows.payload.affectedRows === 1) {
      rows.successState = true;
    }
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ RETRIEVE SPENDILOW USER ------
const readSplUser = async (spendilowUser: any, connection: any) => {
  const query = `SELECT * FROM \`splusers\` WHERE \`email\`=? LIMIT 1`;

  const email = spendilowUser.email;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [email]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ RETRIEVE SPENDILOW USER BY ID ------
const readSplUserByID = async (spendilowUserId: any, connection: any) => {
  const query = `SELECT * FROM \`splusers\` WHERE \`id\`=? LIMIT 1`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ UPDATE SPENDILOW USER ------
const updateUserByID = async (spendilowUser: any, connection: any, id: any) => {
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

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  let { email, savings, salary, profileimage, workfield, username } =
    spendilowUser;

  try {
    rows.payload = await connection.query(query, [
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
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ DELETE SPENDILOW USER ------
const deleteSplUser = async (spendilowUserId: any, connection: any) => {
  const query = `DELETE FROM \`splusers\` WHERE \`splusers\`.\`id\` = ?`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId]);
    if (rows.payload.affectedRows === 1) {
      rows.successState = true;
    }
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ CREATE TRANSACTION ------
const createTransactionQuery = async (
  transactionData: any,
  connection: any
) => {
  const query = `
  INSERT INTO transactions (id, user_id, amount, transaction_date, title, notes, tags, transaction_type, target_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  let {
    id,
    user_id,
    amount,
    transaction_date,
    title,
    notes,
    tags,
    transaction_type,
    target_id,
  } = transactionData;

  try {
    rows.payload = await connection.query(query, [
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
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ GET ALL TRANSACTIONS ------
const getAllTransactions = async (spendilowUserId: any, connection: any) => {
  const query = `
  SELECT *
  FROM transactions
  WHERE user_id = ?
  ORDER BY transaction_date DESC
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
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

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [
      transactionId,
      spendilowUserId,
    ]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
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
    amount = ?,
    transaction_date = ?,
    title = ?,
    notes = ?,
    tags = ?,
    transaction_type = ?,
    target_id = ?
  WHERE id = ? AND user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  let {
    amount,
    transaction_date,
    title,
    notes,
    tags,
    transaction_type,
    target_id,
  } = spendilowTransactionMod;

  try {
    rows.payload = await connection.query(query, [
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
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

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

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [
      transactionId,
      spendilowUserId,
    ]);
    if (rows.payload.affectedRows === 1) {
      rows.successState = true;
    }
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ DELETE USER TRANSACTION ------
const deleteUserTransactions = async (
  spendilowUserId: any,
  connection: any
) => {
  const query = `
  DELETE FROM transactions
  WHERE user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ CREATE BUDGET ------
const createBudgetQuery = async (budgetData: any, connection: any) => {
  const query = `
  INSERT INTO budget (id, name, description, user_id) VALUES (?, ?, ?, ?);`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  let { id, name, description, user_id } = budgetData;

  try {
    rows.payload = await connection.query(query, [
      id,
      name,
      description,
      user_id,
    ]);

    if (rows.payload.affectedRows === 1) {
      rows.successState = true;
    }
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ GET SINGLE BUDGET ------
const getSingleBudget = async (
  spendilowUserId: any,
  budgetId: any,
  connection: any
) => {
  const query = `
  SELECT *
  FROM budget
  WHERE id = ? AND user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [budgetId, spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ GET TRANSACTIONS OF A BUDGET ------
async function getBudgetTransactions(
  spendilowUserId: any,
  budgetId: any,
  connection: any
): Promise<any> {
  const query = `
  SELECT *
  FROM transactions
  WHERE target_id = ? AND user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [budgetId, spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
}

// ------ UPDATE SINGLE BUDGET ------
const updateSingleBudget = async (
  spendilowUserId: any,
  budgetId: any,
  spendilowBudgetMod: any,
  connection: any
) => {
  const query = `
  UPDATE budget
  SET
    name = ?,
    description = ?
  WHERE id = ? AND user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  let { name, description } = spendilowBudgetMod;

  try {
    rows.payload = await connection.query(query, [
      name,
      description,
      budgetId,
      spendilowUserId,
    ]);

    if (rows.payload.affectedRows === 1) {
      rows.successState = true;
    }
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ GET ALL BUDGETS ------
async function getAllBudgets(
  spendilowUserId: any,
  connection: any
): Promise<any> {
  const query = `
  SELECT *
  FROM budget
  WHERE user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
}

// ------ DELETE SINGLE BUDGET ------
const deleteSingleBudget = async (
  spendilowUserId: any,
  budgetId: any,
  connection: any
) => {
  const query = `
  DELETE FROM budget
  WHERE id = ? AND user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [budgetId, spendilowUserId]);
    if (rows.payload.affectedRows === 1) {
      rows.successState = true;
    }
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ DELETE USER BUDGETS ------
const deleteUserBudgets = async (spendilowUserId: any, connection: any) => {
  const query = `
  DELETE FROM budget
  WHERE user_id = ?
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

// ------ DELETE BUDGET FROM TRANSACTIONS ------
const deleteBudgetFromTransactions = async (
  spendilowUserId: any,
  budgetId: any,
  connection: any
) => {
  const query = `
  UPDATE transactions
  SET target_id = NULL
  WHERE user_id = ? AND target_id = ?;
`;

  let rows: DatabaseOperationResult = {
    successState: false,
    payload: {},
  };

  try {
    rows.payload = await connection.query(query, [spendilowUserId, budgetId]);
    rows.successState = true;
  } catch (error: any) {
    rows.payload = error.sqlMessage;
  }

  return rows;
};

module.exports = {
  databaseInteraction,
};
