import { SqlError } from "mariadb";

// ------ Imports ------
const BRError = require("../errors");
const dbConnectionPool = require("./db-connector");

// ------ DB ACTIONS MANAGER ------
const databaseInteraction = async (operation: string, queryData: any) => {

    let connection;
    let queryResult;

    try {
        connection = await dbConnectionPool.getConnection();

        if (connection) {
            switch (operation) {
                case 'CREATE_USER': {
                    queryResult = await createSplUser(queryData, connection)
                }
                case 'GET_USER': {
                    queryResult = await readSplUser(queryData, connection);
                }
                default: {
                    throw new BRError(`I dati non sono validi, ricontrollali o contatta il supporto utente.`)
                }
            }
        }
    }
    catch (error) {
        throw new BRError(`Il salvataggio dei dati non è stato effettuato correttamente oppure il Database non è disponibile, ricontrolla i dati inseriti o contatta il supporto utente. ERR: ${error}`)
    }
    finally {
        if (connection) {
            connection.release();
        }
        return queryResult
    }

}

// ------ REGISTER SPENDILOW USER ------
const createSplUser = async (spendilowUser: any, connection: any) => {

    const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    let result;

    let { id, email, password, savings, salary, profileImage, workfield, username } = spendilowUser

    try {
        result = await connection.query(query, [id, email, password, savings, salary, profileImage, workfield, username]);
    }
    catch (error: any) {
        throw new SqlError("Errore durante il salvataggio dei dati dell'utente, ricontrolla i dati inseriti oppure contatta il supporto utente.");
    }

    return result;
}

// ------ RETRIEVE SPENDILOW USER ------
const readSplUser = async (spendilowUser: any, connection: any) => {
    const query = `SELECT * FROM \`splusers\` WHERE \`email\`=? LIMIT 1`

    const email = spendilowUser.email;

    let rows = await connection.query(query, [email]);

    return rows[0]
}

// ------ Exports ------
module.exports = {
    databaseInteraction
}