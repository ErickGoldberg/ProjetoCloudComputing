import React, { useState, useEffect } from 'react';
import editImage from '../img/editar.png'
import deleteImage from '../img/excluir.png'

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
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://ec2-52-201-73-66.compute-1.amazonaws.com/api/users')
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

    if (editingUserId) {
      fetch(`http://ec2-52-201-73-66.compute-1.amazonaws.com/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Usuário atualizado com sucesso');
            setUser({
              login: '',
              senha: '',
              nome: '',
              email: '',
              telefone: ''
            });
            setEditingUserId(null);
            fetchUsers();
          } else {
            console.error('Erro ao atualizar usuário');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    } else {
      fetch('http://ec2-52-201-73-66.compute-1.amazonaws.com/api/users', {
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
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    if (userToEdit) {
      setUser(userToEdit);
      setEditingUserId(userId);
    }
  };

  const handleDelete = (userId) => {
    fetch(`http://ec2-52-201-73-66.compute-1.amazonaws.com/api/users/${userId}`, {
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
        <label>Login:</label> <br/>
        <input type="text" name="login" value={user.login} onChange={handleChange}  className='inputs' required/> <br/>
        <label>Senha:</label> <br/>
        <input type="password" name="senha" value={user.senha} onChange={handleChange}  className='inputs' pattern="(?=.*[A-Za-z])(?=.*\d).{8,}" required/> <br/>
        <label>Nome:</label> <br/>
        <input type="text" name="nome" value={user.nome} onChange={handleChange}  className='inputs' pattern="[A-Za-z\s]+" title="Apenas letras são permitidas" required/> <br/>
        <label>Email:</label> <br/>
        <input type="email" name="email" value={user.email} onChange={handleChange}  className='inputs' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Digite um email válido" required/> <br/>
        <label>Telefone:</label> <br/>
        <input type="tel" name="telefone" value={user.telefone} onChange={handleChange}  className='inputs' pattern="[0-9]{10,}" title="Digite um número de telefone válido"  required/> <br/>
        <button type="submit" disabled={isSubmitting} className='saveButton'>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <h1 className='listTitle'>Lista de Usuários:</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.nome}
            <button className='iconsImg' onClick={() => handleEdit(user._id)}><img src={editImage} className='icons'></img></button>
            <button className='iconsImg' onClick={() => handleDelete(user._id)}><img src={deleteImage} className='icons'></img></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
