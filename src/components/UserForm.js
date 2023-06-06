import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [user, setUser] = useState({
    login: '',
    senha: '',
    nome: '',
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', user)
      .then((response) => {
        console.log(response.data);
        // Lógica adicional aqui, como exibir uma mensagem de sucesso
      })
      .catch((error) => {
        console.error(error);
        // Lógica adicional aqui, como exibir uma mensagem de erro
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" value={user.login} onChange={handleChange} placeholder="Login" />
      <input type="password" name="senha" value={user.senha} onChange={handleChange} placeholder="Senha" />
      <input type="text" name="nome" value={user.nome} onChange={handleChange} placeholder="Nome" />
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="telefone" value={user.telefone} onChange={handleChange} placeholder="Telefone" />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default UserForm;
