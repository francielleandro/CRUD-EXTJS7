const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(express.json());

app.get('/analyst', (req, res) => {
  db.all('SELECT * FROM analyst', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidors');
    }

    res.json(rows);
  });
});

app.get('/analyst/:id', (req, res) => {
  const id = req.params.id;

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

    res.json({ id: this.lastID });
  });
});

app.put('/analyst/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  db.run('UPDATE analyst SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (this.changes === 0) {
      return res.status(404).send('Analista não encontrado');
    }

    res.sendStatus(204);
  });
});

app.delete('/analyst/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM analyst WHERE id = ?', id, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (this.changes === 0) {
      return res.status(404).send('Analista não encontrado');
    }

    res.sendStatus(204);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
