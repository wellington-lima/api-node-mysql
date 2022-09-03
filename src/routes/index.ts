import { Router } from 'express'
import con from '../config/database'

const route = Router()

route.get('/', (request, response) => {
  return response.json({ msg: 'App Index'})
})

route.get('/livros', (request, response) => {
  const sql = "SELECT * FROM livros";

  con.query(sql, (err, livros) => {
    if(err) {
      throw new Error(`Erro ao consultar livros: ${err}`)  
    }
  
    return response.status(200).json(livros)
  })
})

route.get('/livros/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const sql = "SELECT * FROM livros WHERE `id` = ?";

  con.query(sql, [id], (err, livros) => {
    if(err) {
      throw new Error(`Erro ao consultar livros: ${err}`)  
    }
  
    return response.status(200).json(livros)
  })
})

route.post('/livros/', (request, response) => {
  const { titulo, paginas } = request.body

  const sql = "INSERT INTO livros (titulo, paginas) VALUES (?,?)";

  con.query(sql, [titulo, paginas], (err, livros) => {
    if(err) {
      throw new Error(`Erro ao cadastrar livro: ${err}`)  
    }
  
    return response.status(200).json({ msg: 'Livro cadastrado com sucesso' })
  })
})

route.put('/livros/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const { titulo, paginas } = request.body

  const sql = "UPDATE livros SET `titulo`=?, `paginas`=? WHERE `id`=?";
  
  con.query(sql, [titulo, paginas, id], (err, livros) => {
    if(err) {
      throw new Error(`Erro ao editar livro: ${err}`)  
    }
  
    return response.status(200).json({ msg: 'Livro editado com sucesso' })
  })
})

route.delete('/livros/:id', (request, response) => {
  const id = parseInt(request.params.id)

  const sql = "DELETE FROM livros WHERE `id`=?";
  
  con.query(sql, [id], (err, livros) => {
    if(err) {
      throw new Error(`Erro ao excluir livro: ${err}`)  
    }
  
    return response.status(200).json({ msg: 'Livro ecluido com sucesso' })
  })
})

export default route