import React from 'react';
import UserForm from '../components/UserForm';
import './styles/user.css'
import NavBar from '../components/NavBarHome'

const User = () => {
  return (
    <>
    <NavBar />
    <main className='container'>
      <h1>Adicionar Usuário</h1>
      <UserForm />
    </main>
    </>
  );
};

export default User;
