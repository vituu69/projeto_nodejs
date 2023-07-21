// constante que chama o db
(async () => {
    const db = require("./db");
    console.log("conectou");
    console.log("SELECT * FROM alunos");
    const alunos = await db.selectAluno();
    console.log(alunos);
})();




const express = require('express');
const session = require('express-session');

//porta de entrada, caminho e app
const port = 3000;
const path = ('path');
const app = express();

// comando feito para acessar o assencion. com a senha de acesso
app.use(session({secret:'admin'}));

//comandos de renderizacao
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '__views'));

app.get('/', (req, res)=> {
    req.render('index');
});
app.post('/', (res, req)=>{
    res.render('index')
})

app.listen(port, ()=> {
    consolle.log('servidor na nuvem');
});
