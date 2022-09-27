import mysql from 'mysql';
import { promisify } from 'util';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '13827930',
  database: 'db_app',
  multipleStatements: true
});
 pool.getConnection( (err, connection) => {
  if(err){
    if (err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.log('DATABASE CONNECTION WAS CLOSE');
    }
    if (err.code === 'ER_CON_COUNT_ERROR'){
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if (err.code === 'ECONNREFUSED'){
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }
  if (connection) connection.release();
  console.log('DB IS CONNECT');
  return;
});

pool.query = promisify(pool.query);

export default pool;