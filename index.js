// constante que chama o db
(async () => {
    const db = require("./db");
    console.log("conectou");
    // nao coloquei select * from para nao atrapalar os DBA da empresa, isso pode dar ruim
    // em um banco de dados muito grande
    console.log("SELECT * FROM alunos");
    const alunos = await db.selectAluno();
    console.log(alunos);

    const insert = await db.insertAluno();
    console.log(insert);

    const delet = await db.deleteAluno();
    console.log(delet);

    const up = await db.updateAlunos();
    console.log(up);

})();


const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

//porta de entrada, caminho e app
const port = 3000;
var path = require('path');
const { connect } = require("http2");
const { connected } = require("process");
const app = express();

var login = "admin";
var password = "12345678";

// comando feito para acessar o assencion. com a senha de acesso
app.use(session({secret:'admin'}));
app.use(bodyParser.urlencoded({extended:true}));

//comandos de renderizacao
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/post-test',(res, req) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});

app.post('/',(req, res)=>{
    console.log(req.body.login);
    res.render('index')
});
app.get('/',(req, res)=> {
    if(req.session.login){
        res.render('logado');
        console.log("meu user é:" + req.session.login)    
    }else {
        req.render('index');
    }
    
});
app.post('/', (res, req)=>{
    if(req.body.password == password && req.body.login == login) {
        // logado com sucesso
        req.session.login = login;
        res.render('ligado');
    }else {
        res.render('index');
    }
  
})


app.listen(port,()=> {
    console.log('servidor na nuvem');
});
