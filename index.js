const express = require('express');
const UserApi = require('./api/usuario');
const PostApi = require('./api/postagem');
const database = require('./config/database');


const cors = require('cors');


console.log('Starting server....');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    origin: 'http://localhost:3000'  // Permitir apenas requisições deste domínio
  }));

// Middleware para permitir CORS
app.use((req, res, next) => {
    // Permite acesso de qualquer origem
    res.header("Access-Control-Allow-Origin", "*");
    // Prossiga para a próxima camada de middleware
    next();
});

app.post('/users', UserApi.criarUsuario);
app.post('/users/login', UserApi.logarUsuario);
app.get('/users', UserApi.listarUsuarios);
app.get('/users/:id', UserApi.obterUsuarioPorId);
app.put('/users/:id', UserApi.alterarUsuario);
app.delete('/users/:id', UserApi.deletarUsuario);
app.get('/users/:id/post', UserApi.obterPostagensPorAutorId);

app.post('/post', PostApi.criarPostagem);
app.get('/postl/:id', PostApi.listarPostagens);
app.get('/post/:id', PostApi.obterPostagemPorId);
app.put('/post/:id', PostApi.alterarPostagem);
app.delete('/post/:id', PostApi.deletarPostagem);



database.db.sync({ force: true })
    .then(() => {
        app.listen(8000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

    module.exports = app;



