const express = require('express');
const router = express.Router();
const db = require('./database.js');

router.get('/:resource', (req, res) => {
    const resource = req.params.resource;
    let query = `SELECT * FROM ${resource}`;
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

router.get('/:resource/:id', (req, res) => {
    const id = req.params.id;
    const resource = req.params.resource;

    db.get(`SELECT * FROM ${resource} WHERE id = ?`, id, (err, row) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send('Erro interno do servidor');
        }

        if (!row) {
        return res.status(404).send(`${resource} não encontrado`);
        }

        res.json(row);
    });
});

router.post('/:resource', (req, res) => {
    const resource = req.params.resource;
    const { name, email, phone } = req.body;

    db.run(`INSERT INTO ${resource} (name, email, phone) VALUES (?, ?, ?)`, [name, email, phone], function(err) {
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

router.put('/:resource', async (req, res) => {
    try {
      const resource = req.params.resource;
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
  
      const result = await db.run(`UPDATE ${resource} SET ${updates.join(', ')} WHERE id = ?`, values);
  
      if (result.changes === 0) {
        return res.status(404).send('Registro não encontrado');
      }
  
      res.status(200).send('Registro atualizado com sucesso');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Ocorreu um erro ao atualizar o registro');
    }
  });

  router.delete('/:resource/:id', (req, res) => {
    const resource = req.params.resource;
    const id = req.params.id;
  
    db.run(`DELETE FROM ${resource} WHERE id = ?`, id, function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Erro interno do servidor');
      }
  
      if (this.changes === 0) {
        return res.status(404).send('Registro não encontrado');
      }
  
      return res.send('Registro excluído com sucesso');
    });
  });

  module.exports = router;
  