const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(express.json());
app.use(cors());

app.get('/analyst', (req, res) => {
  let query = 'SELECT * FROM analyst';
  let conditions = [];
  let params = [];

  Object.keys(req.query).forEach(key => {
    if (!key.startsWith('_') && key.toLowerCase() !== 'limit' && key.toLowerCase() !== 'start' && key.toLowerCase() !== 'page' && key.toLowerCase() !== 'id') {
      conditions.push(`${key} LIKE ?`);
      params.push(`%${req.query[key]}%`);
    }else if(key.toLowerCase() === 'id' && req.query[key]){
      conditions.push(`${key} = ?`);
      params.push(`${req.query[key]}`);
    }
  });

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Verifica se os parâmetros page, start e limit foram passados
  const start = req.query.start || 0;
  const limit = req.query.limit || 25;

  // Adiciona a cláusula LIMIT ao final da query
  query += ` LIMIT ${limit} OFFSET ${start}`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    res.json(rows);
  });
});



app.get('/analyst/:id', (req, res) => {
  const id = req.params.id;
  console.log(req)
  db.get('SELECT * FROM analyst WHERE id = ?', id, (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (!row) {
      return res.status(404).send('Analista não encontrado');
    }

    res.json(row);
  });
});

app.post('/analyst', (req, res) => {
  const { name, email, phone } = req.body;

  db.run('INSERT INTO analyst (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    res.status(200).json({
      data:{
          success : true,
          message:"Registro criado com sucesso!",
          id:this.lastID 
        }
      })
  });
});

app.put('/analyst', (req, res) => {
  const id = req.body.id;

  const updates = [];
  const values = [];

  Object.keys(req.body).forEach((key) => {
    if (key !== 'id') {
      updates.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  });

  if (updates.length === 0) {
    return res.status(400).send('Nenhum campo informado para atualização');
  }

  values.push(id);

  db.run(`UPDATE analyst SET ${updates.join(', ')} WHERE id = ?`, values, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (this.changes === 0) {
      return res.status(404).send('Analista não encontrado');
    }

    res.status(200).json({
      data:{
        success : true,
        message:"Dados atualizados com suecesso"
        }
      })
  });
});

app.delete('/analyst', (req, res) => {
  let { id } = req.body;


  db.run('DELETE FROM analyst WHERE id = ?', id, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (this.changes === 0) {
      return res.status(404).send('Analista não encontrado');
    }

    res.status(200).json({
      data:{
        success : true,
        message:"Dados removido com suecesso"
        }
      })
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
