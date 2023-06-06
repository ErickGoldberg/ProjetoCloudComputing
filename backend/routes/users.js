const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(() => res.json('Usuário adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

module.exports = router;
