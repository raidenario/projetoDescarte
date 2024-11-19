const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const { Sequelize } = require('sequelize');

const locaisRouter = require('./routes/locaisDescarte');
app.use('/api', locaisRouter)

const sequelize = require('./database');
const LocaisDescarte = require('./models/locaisDescarte');

sequelize.sync({alter : true})
    .then(() => console.log('Modelos sincronizados com o banco de dados'))
    .catch(error => console.error('Error ao sincronizar os modelos: ', error));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Testar a conexão
sequelize
    .authenticate()
    .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));
