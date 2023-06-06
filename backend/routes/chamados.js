const express = require('express');
const router = express.Router();

const Chamado = require('../models/chamado');

router.post('/', (req, res) => {
  const newChamado = new Chamado(req.body);
  newChamado.save()
    .then(() => res.json('Chamado adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

module.exports = router;
