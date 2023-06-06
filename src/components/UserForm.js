import React, { useState, useEffect } from 'react';

const UserForm = () => {
  const [user, setUser] = useState({
    login: '',
    senha: '',
    nome: '',
    email: '',
    telefone: ''
  });
  const [users, setUsers] = useState([]);
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        if (response.ok) {
          // Lógica adicional aqui, como exibir uma mensagem de sucesso
          fetchUsers(); // Atualiza a lista de usuários após o cadastro
        } else {
          console.error('Erro ao adicionar usuário');
          // Lógica adicional aqui, como exibir uma mensagem de erro
        }
      })
      .catch((error) => {
        console.error(error);
        // Lógica adicional aqui, como exibir uma mensagem de erro
      })
  };

  const fetchUsers = () => {
    fetch('http://localhost:4000/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Campos de entrada do usuário */}
        <input type="text" name="login" value={user.login} onChange={handleChange} placeholder="Login" />
        <input type="password" name="senha" value={user.senha} onChange={handleChange} placeholder="Senha" />
        <input type="text" name="nome" value={user.nome} onChange={handleChange} placeholder="Nome" />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="telefone" value={user.telefone} onChange={handleChange} placeholder="Telefone" />
        <button type="submit">Salvar</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
