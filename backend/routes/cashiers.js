const express = require('express');
const router = express.Router();

const Cashier = require('../models/cashier');

router.post('/', (req, res) => {
  const newCashier = new Cashier(req.body);
  newCashier.save()
    .then(() => res.json('Caixa adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

module.exports = router;
