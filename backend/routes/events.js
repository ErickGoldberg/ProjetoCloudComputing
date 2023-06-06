const express = require('express');
const router = express.Router();

const Event = require('../models/event');

// Rota para adicionar um evento
router.post('/', (req, res) => {
  const newEvent = new Event(req.body);
  newEvent.save()
    .then(() => res.json('Evento adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

// Outras rotas relacionadas a eventos podem ser adicionadas aqui

module.exports = router;
