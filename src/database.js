const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Demasiadas conexiones abiertas');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('DB está conectada');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;