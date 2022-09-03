import mysql from 'mysql2'

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'livros'
})

export default con