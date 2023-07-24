// db da aplicacao

async function connect(){

    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    // local de connection
    //const connection = await mysql.createConnection("mysql://root:root@localhost:3306/db_clicksolid");
    const connection =  mysql.createConnection({
        host: 'localhost', 
        port: 3306,
        user: 'root',
        database: 'db_clicksolid',
        password: ''
    });
    console.log("conectado ao mysql");
    // variavel global que vai guardar as connections
    global.connection = connection;

    return connection;
}
// mantem connection com o db
//connection();

async function selectAluno(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM alunos');
    return rows
}

// funcao para acrecentar dados ao banco de dados
async function insertAluno(alunos) {
    const conn = await connect();
    const sql = 'INSERT INTO alunos(id_alunos, nome_do_aluno, idade_do_aluno) VALUES(?, ?, ?);';
    const values = [alunos.id_alunos, alunos.nome_do_aluno, alunos.idade_do_aluno];
    return await conn.query(sql, values);
}
//funcao para alterar o aluno do db

async function updateAlunos(id_alunos, alunos) {
    const conn = await connect();
    const sql =  'UPDATE alunos SET nome_do_aluno=?, idade_do_aluno=? WHERE id_aluno=?';
    const values = [alunos.id_alunos, alunos.nome_do_aluno, alunos.idade_do_aluno, id_alunos];
    return await conn.query(sql, values)
}

// funcao feita para deletar os alunos solicitado
async function deleteAluno(id_aluno) {
    const conn = await connect();
    const sql = 'DELETE FROM alunos WHERE id_aluno=?;';
    return await conn.query(sql, [id_aluno]);
}

module.exports = {selectAluno, insertAluno, updateAlunos, deleteAluno}

