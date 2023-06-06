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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:4000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          console.log('Usuário adicionado com sucesso');
          setUser({
            login: '',
            senha: '',
            nome: '',
            email: '',
            telefone: ''
          });
          fetchUsers();
        } else {
          console.error('Erro ao adicionar usuário');
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error(error);
      });
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:4000/api/users/${userId}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Usuário removido com sucesso');
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="login" value={user.login} onChange={handleChange} placeholder="Login" />
        <input type="password" name="senha" value={user.senha} onChange={handleChange} placeholder="Senha" />
        <input type="text" name="nome" value={user.nome} onChange={handleChange} placeholder="Nome" />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="telefone" value={user.telefone} onChange={handleChange} placeholder="Telefone" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.nome}
            <button onClick={() => handleDelete(user._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
