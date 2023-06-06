const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados (certifique-se de ter o MongoDB instalado e em execução)
mongoose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Definição do modelo de usuário
const userSchema = new mongoose.Schema({
  login: String,
  senha: String,
  nome: String,
  email: String,
  telefone: String
});

const User = mongoose.model('User', userSchema);

// Definição do modelo de caixa
const cashierSchema = new mongoose.Schema({
  nome: String,
  email: String,
  dataNascimento: String,
  tipoLogradouro: String,
  logradouro: String,
  numeroLogradouro: String,
  telefone: String,
  sexo: String
});

const Cashier = mongoose.model('Cashier', cashierSchema);

// Rotas de Usuários
app.post('/api/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(() => res.json('Usuário adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(() => res.json('Usuário removido com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.get('/api/users', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  User.findByIdAndUpdate(userId, req.body)
    .then(() => res.json('Usuário atualizado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

// Rotas de Caixas
app.post('/api/cashiers', (req, res) => {
  const newCashier = new Cashier(req.body);
  newCashier.save()
    .then(() => res.json('Caixa adicionado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.delete('/api/cashiers/:id', (req, res) => {
  const cashierId = req.params.id;
  Cashier.findByIdAndDelete(cashierId)
    .then(() => res.json('Caixa removido com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.get('/api/cashiers', (req, res) => {
  Cashier.find()
    .then((cashiers) => res.json(cashiers))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.put('/api/cashiers/:id', (req, res) => {
  const cashierId = req.params.id;
  Cashier.findByIdAndUpdate(cashierId, req.body)
    .then(() => res.json('Caixa atualizado com sucesso!'))
    .catch((err) => res.status(400).json('Erro: ' + err));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
