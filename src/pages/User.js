import React from 'react';
import UserForm from '../components/UserForm';
import './styles/user.css'

const User = () => {
  return (
    <main className='container'>
      <h1>Adicionar Usuário</h1>
      <UserForm />
    </main>
  );
};

export default User;
