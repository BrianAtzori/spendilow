
// ------ Imports ------
const riella = require("../errors");
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
                default: {
                    throw new riella(`Il salvataggio dei dati non è stato effetuato correttamente, ricontrolla i dati inseriti o contatta il supporto utente.`)
                }
            }
        }

        return queryResult;
    }
    catch (error) {
        throw new riella(`Il salvataggio dei dati non è stato effetuato correttamente, ricontrolla i dati inseriti o contatta il supporto utente. ERR: ${error}`)
    }
    finally {
        if (connection) return connection.release();
    }
}

// ------ REGISTER SPENDILOW USER ------
const createSplUser = async (spendilowUser: any, connection: any) => {

    const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    let { id, email, password, savings, salary, profileImage, workfield, username } = spendilowUser

    let rows = await connection.query(query, [id, email, password, savings, salary, profileImage, workfield, username]);

    return rows

}

// ------ Exports ------
module.exports = {
    databaseInteraction
}