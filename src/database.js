const mysql = require('mysql');
const { database } = require('./keys');

const mysqlConnection = mysql.createConnection(database);

mysqlConnection.connect( err => {
    if(err){
        console.log('Error en Db: '+ err);
    }else{
        console.log('Conectado a la DB');
    }
});

module.exports = mysqlConnection;