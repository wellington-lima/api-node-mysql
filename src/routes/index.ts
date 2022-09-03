import { Router } from 'express'
import con from '../config/database'

const route = Router()

route.get('/', (request, response) => {
  return response.json({ msg: 'App Index'})
})

route.get('/livros', async(request, response) => {
  const sql = "SELECT * FROM livros";

  try {
    const livros = await con.query(sql);
    return response.status(200).json(livros[0])
  } catch (error) {
    throw new Error(`Erro ao consultar livros: ${error}`)  
  }
  
})

route.get('/livros/:id', async(request, response) => {
  const id = parseInt(request.params.id)
  const sql = "SELECT * FROM livros WHERE `id` = ?";

  try {
    const livro = await con.query(sql, [id]);
    return response.status(200).json(livro[0]);

  } catch (error) {
    throw new Error(`Erro ao consultar livros: ${error}`);
  }
})

route.post('/livros/', async(request, response) => {
  const { titulo, paginas } = request.body

  const sql = "INSERT INTO livros (titulo, paginas) VALUES (?,?)";

  try {
    await con.query(sql, [titulo, paginas]);
    return response.status(200).json({ msg: 'Livro cadastrado com sucesso' })
    
  } catch (error) {
    throw new Error(`Erro ao cadastrar livro: ${error}`)  
  }
})

route.put('/livros/:id', async(request, response) => {
  const id = parseInt(request.params.id)
  const { titulo, paginas } = request.body

  const sql = "UPDATE livros SET `titulo`=?, `paginas`=? WHERE `id`=?";
  
  try {
    await con.query(sql, [titulo, paginas, id]);
    return response.status(200).json({ msg: 'Livro editado com sucesso' })
    
  } catch (error) {
    throw new Error(`Erro ao editar livro: ${error}`);
  }
})

route.delete('/livros/:id', async(request, response) => {
  const id = parseInt(request.params.id)

  const sql = "DELETE FROM livros WHERE `id`=?";
  
  try {
    await con.query(sql, [id]);
    return response.status(200).json({ msg: 'Livro ecluido com sucesso' });
    
  } catch (error) {
    throw new Error(`Erro ao excluir livro: ${error}`);
    
  }
})

export default route