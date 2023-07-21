// db da aplicacao



async function connection(){

    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;


    const mysql = require("mysql2/promise");
    // local de connection
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/db_clicksolid");
    console.log("conectado ao mysql");
    // variavel global que vai guardar as connections
    global.connection;

    return connection;
}
// mantem connection com o db
connection();

async function selectAluno(){
    const conn = await connection();
    return await conn.query('SELECT * FROM cl');
}

module.exports = {selectAluno}

