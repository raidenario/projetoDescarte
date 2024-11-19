// bibliotecas: mysql2

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartwaste'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL como ID ' + connection.threadId);

  // Teste uma consulta
  connection.query('SELECT * FROM locaisDescarte', (error, results) => {
    if (error) throw error;
    console.log(results); 
    connection.end(); 
  });
});

