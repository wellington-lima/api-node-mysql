import mysql from 'mysql2/promise'

const con = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'livros',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
})

export default con